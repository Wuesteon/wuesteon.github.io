# Design: Scan fetch/fallback ladder + honest results + lead categorization

- **Date:** 2026-07-06
- **Status:** Approved + reviewed (two-agent architecture/engineering review incorporated; ready for implementation plan)
- **Repos touched:** `waiser-scan` (backend, `/opt/waiser-scan` on the Contabo VPS) and `website` (frontend, GitHub Pages)
- **Owner context:** wAIser.dev is an AI-Agent / AI-Security consultancy. Honesty and SSRF hardening are first-class requirements, not nice-to-haves — the scan is a public lead-gen tool and must never fabricate results or expose the VPS to SSRF.

## Problem

The "waiser scan // agent-fit" widget on the homepage is a core lead-generation feature. Two defects surfaced while scanning `coop.ch`:

1. **It fabricates results on failure.** `coop.ch` sits behind DataDome and returns `403` to the scraper, so the backend correctly answers `502 FETCH_FAILED`. The frontend then *silently* falls back to `stubCompany()` — a deterministic fake generator seeded from a hash of the domain — and presents it as a real scan (the "88 AGENT-FIT" the user saw was fake).
2. **The fabricated result is itself buggy.** `stubCompany()` picks with `(h + i*7) % P.length` over a 7-element pool, so the step is a multiple of the pool size and the index never advances — it always yields **one** card, while the verdict text promises "these three agents." Hence "3 gefunden" + a single card. **The same bug exists in the backend `src/stub.js` (5-element pool, masked only because gcd(7,5)=1); it is currently dead code but must also be deleted.**

Underlying quality gap: even a *successful* scan of a large company can be thin, because Tier 0 harvests marketing content (homepage + a few "what we do" pages) while the task ("where would autonomous agents save time") needs operational signal (support/FAQ/careers pages).

Additional missed opportunity: the backend already runs Gemini over the whole company but stores only `domain + request-count + outcome` as lead intelligence — the industry/type Gemini implicitly determines is discarded.

## Goals

- Never fabricate a result. Every outcome is truthful: a real scan, a browser-rendered scan, a clearly-labeled public-knowledge best-effort, or an honest "can't scan / book a call" message.
- Recover sites that block the plain fetch but are not DataDome-grade (JS-rendered SPAs, light UA/Cloudflare gating) via a self-hosted headless-browser tier.
- Give big/known brands that *are* unscrapeable a useful, clearly-labeled sample instead of a dead end.
- Deepen Tier 0 so large companies get a better-grounded analysis.
- Capture structured company categorization as lead intelligence ("which kinds of companies are interested in us").
- Fix the frontend bugs.

## Non-goals

- Beating DataDome / hard-Akamai (coop.ch, migros.ch). Accepted as unwinnable; those fall through to the knowledge tier or the honest CTA.
- Fingerprint-spoofing to evade sites that actively block. The browser tier renders like a normal browser and blocks subresources; it is not an evasion arms-race. (On-brand constraint for an AI-Security consultancy.)
- Changing the fixed 3-opportunity output contract (evaluated and deferred — see Decisions).

---

## The fallback ladder

Every scan walks these tiers server-side in `waiser-scan`, stopping at the first that yields enough content. A **total server-side scan deadline** (§Latency budget) bounds the whole walk. The frontend renders whatever comes back, keyed off HTTP status plus a new `source` field.

```
GET /api/scan?url=<domain>&lang=<de|en|zh>        [server-side wall-clock budget ~24s]
│
├─ Tier 0  Plain pinned fetch (undici, SSRF-pinned)      [existing, deepened]
│          homepage + internal pages (concurrent) → extractText
│          enough content?  ── yes ──▶  guard + Gemini analyze  → 200 source:"live"
│          └─ miss (403 / SPA-shaped thin) ↓
│
├─ Tier 1  Browser render (Scrapling sidecar)            [NEW; fires only on Tier-0 miss + SPA-shape]
│          Node passes {url, pinnedIp, family} → 127.0.0.1:8791
│          Camoufox renders JS → returns body.innerText (+finalUrl,status,headers)
│          Node: sanitizeInjection(innerText) → thin-gate → guard + analyze
│          enough content?  ── yes ──▶  200 source:"rendered"
│          └─ THIN_AFTER_RENDER / RENDER_FAILED / RENDER_BUSY / sidecar-down ↓
│
├─ Tier 2  Gemini public-knowledge (recognition-gated)   [NEW; last resort; NO guard call]
│          eligible ONLY if Tier-0 saw a real block (403/bot-wall), not NXDOMAIN/thin
│          Gemini (domain only): { known, confidence, score, verdict, ops, evidence }
│          known && confidence>=0.8 && registrable-name-in-verdict && evidence present
│            ──▶  200 source:"knowledge", blocked:true   (audit-logged)
│          └─ unknown / low-confidence / fails anchors ↓
│
└─ Tier 3  Honest CTA                                    → 4xx/5xx { error, blocked:true }
           "site blocks automated scans — I look at those personally. Book a call ▸"
```

- Tier 1 is the exception, not the rule — the fast/cheap/safe Tier 0 still serves the overwhelming majority of scans, so latency and VPS load stay bounded. Tier 1 fires **only on an SPA-shape signal**, not on raw thinness (§Tier 0).
- `costcap.reserve()` accounting is **per-Gemini-call** and defined per ladder path (§Cost accounting). Tier 2 has no scraped text, so it does **not** call the guard.
- Graceful downgrade: any tier failing (sidecar down, unset, busy, over the time budget) falls through to the next; the browser tier can never take the whole scan down.

---

## Tier 0 — deepened harvest (`waiser-scan/src/scrape.js`)

Keep the exactly-3-ops output; improve the *input* so big companies get grounded picks — **without** regressing the SMB ICP into the browser tier.

- `TOTAL_CHAR_CAP`: 12000 → **18000** (still token-safe for `gemini-3.5-flash`; ~4.5k tokens).
- **Fetch internal pages concurrently** (bounded), and keep `maxInternalPages` low. **Do NOT raise it to 5 sequential** — that adds up to +10s to an already-up-to-20s worst case (homepage 5s + 3×5s sequential today) and blows the client abort (§Latency budget). Concurrent fetch of 3–5 pages is the correct lever; the number is chosen in the plan to fit the time budget.
- Extend the `USEFUL` internal-link priority list with the page types that carry the "repetitive work" signal this task needs:
  - support / FAQ / help / hilfe
  - careers / karriere / jobs
  - news / presse / press
- **`EXCLUDE`** still drops login/legal/cart; `kontakt`/`contact` remain excluded; support/help are added as *distinct* useful types so a support hub is harvested even though the contact page is not.

### Tier-1 escalation predicate (SPA-shape, NOT char-count) — REVIEW FIX

`minContentChars = 500` stays as the hard "is there anything at all" gate (`scrape.js:201` → `THIN_CONTENT`). Escalation to the browser tier must **not** trigger on "500 < chars < some higher floor" — that would push a legitimate ~700–1000-char SMB homepage (plumber, law office — the core ICP) into the render tier, which renders the *same* thin content → `THIN_AFTER_RENDER` → Tier 2 → unknown → honest CTA. A site that returns a good report today would return "can't scan" tomorrow.

Instead, Tier 1 is eligible only when the fetch result is **SPA-shaped**: little extracted text **but** a large raw HTML body and/or a single root mount node (`<div id="root">`, `<div id="app">`, `ng-app`, `__next`) and/or heavy `<script>` with little prose — i.e. evidence that rendering will actually help. A thin *static* site (small text ∧ small HTML) falls straight through to Tier 2 / CTA with no wasted render. Also escalate on a hard `403`/bot-wall. Both branches are unit-tested (static-thin does **not** escalate).

---

## Tier 1 — Scrapling render sidecar

### Boundary

A separate, minimal Python service. Its own systemd unit, its own unprivileged user (`waiser-render`), **loopback-only** on `127.0.0.1:8791`. Node stays the only public-facing door. Node validates + resolves the domain with its existing SSRF check *first*, then calls the sidecar with an already-validated domain **and the pinned IP**.

Contract (revised per review — pass the pinned IP; return layout-resolved visible text, not raw HTML):

```
POST 127.0.0.1:8791/render   { "url": "https://<validated-domain>/", "pinnedIp": "<ip>", "family": 4, "lang": "de" }
  200 → { "text": "<document.body.innerText>", "title": "...", "finalUrl": "...", "status": 200, "headers": {…} }
  422 → { "error": "THIN_AFTER_RENDER" }   # rendered but still no visible text
  502 → { "error": "RENDER_FAILED" }       # blocked (DataDome), timeout, off-origin finalUrl, crash
  503 → { "error": "RENDER_BUSY" }         # semaphore saturated → Node falls straight to Tier 2
```

The sidecar **only renders** — it never calls Gemini and makes no trust decisions.

**Why `innerText`, not raw HTML (REVIEW FIX):** Node must NOT re-run its regex `extractText` on rendered markup. `extractText`'s hidden-node strip (`scrape.js:36`) is a raw-string regex hunting a literal `style="display:none"`; rendered React/Vue applies visibility via CSSOM (no such string) and JS can reveal hidden nodes post-load, so the strip **silently fails** and hidden-injected instructions leak through. The browser's `document.body.innerText` already derives visible text correctly via real layout (honours `display:none`/`visibility:hidden`). So:
- **raw-fetch path:** `sanitizeInjection(extractText(html))`
- **render path:** `sanitizeInjection(sidecar.text)` — same endpoint (sanitized visible text), better hidden-content handling.

The spec's earlier claim "injection defenses identical regardless of path" was **false** and is corrected: defenses end at the *same place* (sanitized visible text) but the *mechanism differs by path*. `sanitizeInjection` (`scrape.js:42-46`) is now the sole app-layer injection filter on the render path, so its marker list is load-bearing and reviewed for coverage; the Gemini **guard** call remains the primary injection backstop and still runs on the extracted text (path-independent).

### SSRF containment — combined 4-layer design (REVIEW FIX)

A headless browser does its own DNS and follows its own redirects/JS-navigations; Node's per-hop `resolveAndPin` (`scrape.js:132-143`) does **not** run on that path. So for the render tier there is no app-layer pin unless we add one, and the kernel firewall is genuinely load-bearing. Four non-overlapping layers, outermost authoritative:

1. **Pinned resolution (browser cannot resolve anything else).** Node passes the already-validated `pinnedIp`; the sidecar launches Camoufox with `--host-resolver-rules="MAP <domain> <pinnedIp>"` (or a per-render single-answer resolver) so the browser can resolve **only** the one validated `domain→ip`. A redirect/JS-nav to `evil-internal.corp` simply **fails to resolve** — it can't even attempt the connect. This closes the DNS-rebind / CNAME-to-internal TOCTOU at the browser.
2. **nftables egress-deny — provably a SUPERSET of `isBlockedIP`.** The kernel floor. Its denylist is derived from the **same CIDRs** as `src/domain.js` `isBlockedIP` (`domain.js:92-104`), which blocks — and the earlier spec's nftables list **omitted** — `0.0.0.0/8`, `100.64.0.0/10` (CGNAT, routable in Contabo's fabric), and IPv6 `fe80::/10` link-local (not just `::1`). Full floor set: `0.0.0.0/8, 10/8, 100.64/10, 127/8, 169.254/16, 172.16/12, 192.168/16` and v6 `::1, fe80::/10, fc00::/7` (+ IPv4-mapped-v6). A CI/deploy test parses both the nftables ruleset and `isBlockedIP`'s CIDRs and asserts the firewall is a **strict superset** so they can't drift. A boot-time (`ExecStartPost`) self-test attempts an outbound connect to `169.254.169.254:80` and fails the unit if it succeeds. **Implementation gates on this item.**
3. **Subresource blocking.** Block non-document resource types (image/media/font/websocket) — attack-surface reduction + faster pages.
4. **`finalUrl` re-validation.** The sidecar 502s if the rendered `finalUrl`'s registrable domain ≠ requested domain (off-origin redirect); Node re-runs `resolveAndPin(finalUrl)` before trusting/caching under that domain (result-attribution integrity).

### Resource & concurrency (REVIEW FIX)

The per-IP rate limit (`ratelimit.js`, 20/hr) and singleflight (dedups only identical `lang:domain`) do **not** bound *global* concurrent renders — N distinct visitors scanning N distinct SPA domains all pass and all reach Tier 1. So:

- The **sidecar owns a hard global semaphore** (e.g. 2 concurrent renders) + a bounded FIFO queue + a short queue-wait; on saturation it returns `503 RENDER_BUSY` and Node **falls straight through to Tier 2** (never blocks).
- **`MemoryMax=` on BOTH systemd units** — the new `waiser-render` unit (so the kernel kills the *sidecar*, not the box, under pressure) and a retrofit onto the existing `waiser-scan.service` (which currently has none). Concrete numbers (VPS total RAM, Node RSS, budgeted browser RSS ceiling, pool size) go in the plan; Camoufox is ~300–500 MB resident per context.
- **Browser lifecycle:** lazy-warm with an idle-evict timer (spin up on first render, tear down after N minutes idle) so steady-state RSS is ~0 and only bursts pay the cold start. (Cold start is several seconds — folded into the render budget.)
- **Timeout** enforced in **two** places: in Python around `page.goto`/settle (~12s) **and** as a Node-side client timeout on the `127.0.0.1:8791` call (belt-and-suspenders, mirroring the existing `perRequestTimeoutMs` discipline).

### Deploy delta — Phase C is a multi-day milestone, not a runbook append (REVIEW FIX)

Camoufox (a patched Firefox) is **not** analogous to the single-static-binary Node service: it needs `/dev/shm` (or `--disable-dev-shm-usage`), writable profile/cache/crashpad dirs, fontconfig, and many GTK/X libs, which fight `ProtectSystem=strict` + "no write paths except runtime dir". Its SSRF hardening is genuinely new territory (Node's app-layer pinning doesn't transfer). Therefore:

- **Spike the hardened `waiser-render.service` FIRST** — enumerate the exact `ReadWritePaths`, decide `--disable-dev-shm-usage` vs. `PrivateTmp`, get the egress self-test green — before wiring `RENDER_URL`.
- **Pin the Camoufox version** and document an upgrade cadence.
- New `deploy/waiser-render.service`, an nftables rules file, and `requirements.txt` (Scrapling + Camoufox).
- Node `.env` gains `RENDER_URL=http://127.0.0.1:8791`. **Unset ⇒ Tier 1 disabled**, so the Node/backend changes and frontend ship before the sidecar exists (staged rollout).

---

## Tier 2 — Gemini public-knowledge fallback (recognition-gated + evidence-anchored)

Fires only after Tier 0 and Tier 1 both fail **and Tier 0 observed a real block** (403/bot-wall, not NXDOMAIN/thin). One Gemini call, structured so the gate and payload return together, given **only the domain** (no scraped text). **No guard call** (there is no scraped text to guard).

```json
{
  "known":      "boolean  — does the model genuinely recognize THIS company?",
  "confidence": "number   — 0..1 self-rated",
  "evidence":   "string   — verifiable anchors: HQ city / sector / a real product or brand name",
  "score":      "number",
  "verdict":    "string",
  "ops":        "[{t,d,fit} × 3]"
}
```

### Hardened gate (REVIEW FIX)

Tier-2 result is served **only if ALL** hold, else discard the payload entirely and fall to Tier 3:
1. Tier 0 saw a real block signal (403 / known bot-wall header) — gated *before* the call, so an unresolvable/empty domain never reaches a "known company" answer;
2. `known === true`;
3. `confidence >= 0.8` (raised from 0.6 — a self-rating, biased high; a false CTA is far cheaper than a false company);
4. the domain's **registrable name appears in the returned `verdict`/company name**, and `evidence` is non-empty and non-generic.

Every `known:true` decision is **audit-logged** (domain + evidence + confidence) — because CI can only test the gate logic (injected model), never the model's real recognition, the audit log is the owner's sole visibility into the actual fabrication rate (see Owner decisions). Prompt remains explicit/defensive: recognize genuinely or set `known=false`; do not guess or invent.

### Labeling (the honesty contract)

`source:"knowledge"` drives a **mandatory** banner above the report, in the visitor's language:

- **DE:** "Diese Website blockiert automatisierte Analysen — daher basiert dieses Ergebnis auf öffentlich verfügbaren Informationen, nicht auf einem Live-Scan."
- **EN:** "This site blocks automated scanning — so this result is based on publicly available information, not a live scan of the site."
- **中文:** "该网站屏蔽了自动扫描——因此本结果基于公开可得的信息，而非对网站的实时扫描。"

The score still animates but sits under the banner, so it never reads as a measured scan. A "Book a call" CTA rides along.

---

## Cost accounting — per-Gemini-CALL, per ladder path (REVIEW FIX)

`costcap.reserve()` increments the daily `meters` counter on **every call** (`costcap.js`), and today it is called **twice per scan** (guard `server.js:129` + analyze `server.js:139`). So `MAX_GEMINI_CALLS_PER_DAY=600` already means ~**300 scans/day**, not 600. The ladder must define reserves per path and must not double-charge or run a meaningless guard:

| Path | guard | analyze | recognition | total reserves |
|---|---|---|---|---|
| Tier 0 — live | ✓ | ✓ | — | **2** |
| Tier 1 — rendered | ✓ (on rendered text) | ✓ | — | **2** |
| Tier 2 — knowledge | **✗ (no text)** | — | ✓ (folded w/ analysis) | **1** |

- Categorization rides **inside** the existing analyze call (widened schema, same `generateJSON`) → **0 extra reserves**.
- Tier 2 must **not** call the guard (no scraped text — meaningless spend and a latent null path).
- Open owner decision: keep the cap call-denominated (accept ~300 scans/day at 600) or switch to scan-denominated.

---

## Caching & coherence (REVIEW FIX)

Two problems the earlier spec missed:

1. **`source` must live in the cached `scans` result, not only the `leads` row.** The cache serves the response from `scans.result_json` (`server.js:117,146`), which stored only `{score,verdict,ops}`. If `source` isn't in there, a **cache hit re-serves a knowledge result without `source`**, the frontend treats it as a live scan, and the mandatory banner **silently disappears on the second scan** — the common path for a popular blocked brand (coop.ch scanned repeatedly). Fix: put `source` **inside `result_json`**; the cache-hit reply (`server.js:117`) includes it.
2. **Bounded, source-specific TTL** independent of `CACHE_TTL_DAYS` (which is `0` = never-expires in prod). Otherwise a once-blocked domain is served the knowledge answer **forever**, even after it becomes scrapeable. `cache.get` computes effective TTL from `source`: `live` = `CACHE_TTL_DAYS`; `knowledge` = 7 days (mirroring the `blocked` table); `rendered` = short (e.g. 24h, since render is fragile). Returns null past it → the domain gets re-attempted from Tier 0. This is a `cache.get`/`put` signature change (`cache.js:52-59`).
3. **Reconcile with the `blocked` table:** a `blocked:true` knowledge result must NOT also set the hard `blocked` marker (which would force every future scan to 451 and never re-attempt Tier 0). Only genuine content-policy/DataDome-confirmed blocks set that marker; a knowledge result is a cacheable *answer*, not a block.

---

## Company categorization (lead intelligence)

Gemini already reads the whole company; widen the analyze schema and persist structured fields on the lead row instead of discarding them. Categorization runs on every tier that has signal — `live`, `rendered`, and the Tier-2 `knowledge` path. Unknown-blocked Tier-3 leads stay uncategorized (honest). **Company-level public info only — no personal data.**

### New analyze/schema fields — enum-only (REVIEW DECISION: dropped size_estimate + industry_detail)

- `industry` — **closed enum** (so it aggregates): `retail, legal, healthcare, professional-services, agency, tech-saas, manufacturing, hospitality, real-estate, finance, education, public-sector, ecommerce, other`.
- `company_type` — `b2b | b2c | mixed`.
- `region` — inferred from TLD/language/content (e.g. `CH`, `DE`, `AT`, `EU`, `US`, `other`).
- ~~`size_estimate`~~ — **dropped.** A website is near-noise for company size (a polished site ≠ a big company); persisting it as a first-class column with a `by_size` chart invited reading signal into noise in the exact view meant to drive outreach. Owner decision: keep only reliable, aggregatable fields.
- ~~`industry_detail`~~ — **dropped** as redundant next to the 14-value enum (free text doesn't aggregate).

### Enum coercion — one shared constant (REVIEW FIX)

`analyze.js` currently validates only `score/verdict/ops` and the Gemini `responseSchema` uses no `enum` constraints, so the model could return `industry:"law firm"` and poison `by_industry`. Add **server-side coercion** for every new field: an allowlist per field, unknown → `other`/`mixed`/`other`, mirroring the existing defensive `fit === 'hi' ? 'hi' : 'md'` (`analyze.js:42`). The enum lives in **one shared constant** imported by both the schema and the coercer so they can't drift.

### Storage — idempotent migration (REVIEW FIX)

The `leads` table currently: `domain, requests, first_seen, last_seen, last_outcome`. Add columns: `industry, company_type, region, source`. SQLite has **no** `ADD COLUMN IF NOT EXISTS`, and `cache.js` runs its DDL as one `db.exec` on every `openCache` (`cache.js:8-22`) — a naive `ALTER` **crash-loops the service on the second boot** against the live prod DB. Migration must: read `PRAGMA table_info(leads)` and conditionally `ALTER` per missing column, **outside** the always-run `db.exec` block, wrapped per-column. All new columns are NULL for existing rows.

### Reporting (`/admin/stats`)

Add aggregations: `by_industry`, `by_type`, `by_region` (counts), each handling NULL/old rows (`WHERE … IS NOT NULL` or a `'(uncategorized)'` bucket; follow the existing `COALESCE(SUM,0)` discipline at `cache.js:45`). No `by_size`. Cross-referenced with `source:"knowledge"`, surfaces "which blocked-but-known brands scanned us" (often the most interesting leads).

---

## Frontend result states (`website/js/extras.js` + `website/index.html`)

The frontend is a thin renderer that keys off **HTTP status first, then `source`** (REVIEW FIX — `blocked`/`source` do NOT exist on the wire today; a 502 never reaches the report renderer, so routing must be status-first):

| Backend response | State | Banner |
|---|---|---|
| `200`, `source:"live"`/`"rendered"` (or `source` absent, pre-Phase-B) | Normal report — score + 3 op cards | none (a real scan) |
| `200`, `source:"knowledge"` | Report + **mandatory public-knowledge banner** above it | Tier-2 copy (DE/EN/中文) |
| `4xx`/`5xx` block/unscannable (`FETCH_FAILED`, `BLOCKED`, `THIN_CONTENT`, or `blocked:true` when present) | Honest message + **Book a call** CTA | "site sits behind bot protection — I look at those personally" (DE/EN/中文); protector named when Phase B provides it |
| `429` `DAILY_LIMIT` / `RATE_LIMITED` | Honest limit message (+ CTA for daily limit) | existing soft-error copy |
| service unreachable / edge 5xx (no JSON body) | Honest "live scan unavailable, book a call" | no fabricated demo |

Phase A routes purely off status + `error` code (both exist today). `blocked:true`/`source` become **Phase-B enhancements** that only refine copy (e.g. naming the protector, showing the knowledge banner); Phase A works without them and no path renders fabricated data.

### DOM change (REVIEW FIX — was omitted)

`index.html` has no banner container — `#az-report` is head/score/ops/cta with the CTA hardcoded inside `.az-cta`. **Add `website/index.html` to the Phase-A file list**: add a `#az-banner` slot above `#az-report`, and confirm the blocked-CTA state reuses `#az-console` (it currently does) or gets its own element.

### Honest blocked-CTA copy (templated + protector-aware)

Template the domain. Name the protector **only when provable** from response headers (`Server: DataDome`/`X-DataDome`; `cf-ray`→Cloudflare; `AkamaiGHost`→Akamai), else generic "Bot-Schutz". Example (DE): *"coop.ch sitzt hinter Bot-Schutz (DataDome) — automatisierte Analysen werden blockiert. Genau solche Fälle schaue ich mir persönlich an. Gespräch buchen ▸"*. Localized DE/EN/中文, with a `#contact` CTA (mirrors the existing `DAILY_LIMIT` pattern).

## The frontend bug fixes (`website/js/extras.js`)

1. **Delete the fabricated stub** — remove `stubCompany()` and the `POOL_EN/DE/ZH` arrays (`extras.js:45-106`). Kills the fake "88" *and* the single-card bug by deletion. **Also delete the dead backend `waiser-scan/src/stub.js` + `test/stub.test.js`** (identical bug, loaded gun for any future "demo" refactor — REVIEW FIX).
2. **Animation-clobbers-error race** — the naive race the earlier spec described doesn't literally exist (`Promise.all` waits for both, animation has a 9s cap + `done` flag). The *real* issue: on a fast soft error, `Promise.all` still waits up to 9s before painting the honest message, and animation writes keep clobbering. Fix: attach `.catch`/`.finally` to `scanP` that sets `done=true` and resolves `animP` immediately (expose a `fin`/cancel handle). Cover the `REDUCED` branch. Test: a fast 502 paints the honest message and "✓ analysis complete" never appears.
3. **中文** — remove the stub (fixes the zh-fabrication). Chrome and all banners/CTAs use the real 中文 copy. **`zh` gets its OWN cache key** at `server.js:101` (today `zh→en` so zh/en share a `scans` entry — one poisons the other). See Owner decisions for the zh analysis-*body* language.

---

## Latency budget (REVIEW FIX — was asserted, now budgeted)

The frontend aborts at 28s (`extras.js:138`) with a comment claiming "~26s worst case" that is already optimistic (Tier 0 alone is up to ~20s today). The ladder must be time-bounded:

- **A total server-side scan deadline (~24s)** threaded through the ladder as a wall-clock budget object; each tier checks remaining time before starting, and **short-circuits to Tier 2 / CTA rather than starting a tier it can't finish**. Notably: skip Tier 2 if the clock is already past budget.
- **Tier-0 internal pages fetched concurrently** (not 5 sequential) so the deepened harvest fits the budget.
- **Client abort recomputed** in lockstep and set above the server deadline; the comment updated with the real per-tier budget (Tier-0 cap, Tier-1 render cap ~12s, Tier-2 cap). The 9s animation cap is cosmetic and independent — fine as-is.

---

## Review findings incorporated (two-agent review, 2026-07-06)

A system-architect and a senior-engineer independently reviewed this spec against the code, then cross-discussed and converged. Both verdicts: **sound-with-changes** (architecture correct, six decisions defensible, but concrete defects). All accepted findings are folded into the sections above. Summary of the **12 must-fix items**:

1. Phase A routes off **HTTP status + `error` code**, not `blocked`/`source` (don't exist on the wire); add the `502→honest-no-stub` test (the actual reported bug has none today).
2. **4-layer render SSRF**: nftables denylist a provable **superset of `isBlockedIP`** (adds `0.0.0.0/8`, `100.64.0.0/10`, `fe80::/10`) with a superset-diff CI test + boot-time egress self-test; **pin browser resolution** via `--host-resolver-rules` (contract passes `{url,pinnedIp,family}`); `finalUrl` off-origin rejection + Node re-validation.
3. Sidecar returns **`innerText`** (+`sanitizeInjection`), NOT raw HTML through `extractText`; correct the false "identical defenses" claim.
4. Tier-1 escalation on **SPA-shape**, never a raw char-count floor (else the SMB ICP regresses to "can't scan").
5. **`source` in `scans.result_json`** + **source-specific bounded TTL** (knowledge 7d, rendered short) independent of `CACHE_TTL_DAYS`; reconcile with the `blocked` marker.
6. **Per-path `costcap` table** (Tier0=2, Tier1=2, Tier2=1 **no guard**); categorization rides inside analyze (0 extra).
7. **Total ~24s scan deadline** + concurrent internal fetch; client abort recomputed.
8. **Sidecar semaphore + `RENDER_BUSY`** fallthrough; **`MemoryMax=` on both units**; lazy-warm + idle-evict.
9. **Delete backend `src/stub.js` + test** (dead, same bug).
10. **Recognition gate hardened**: requires a real Tier-0 403 + registrable-name-in-verdict + `evidence` + `confidence ≥ 0.8` + audit log.
11. **Enum coercion** via one shared constant; **idempotent migration** via `PRAGMA table_info` outside the always-run `exec`; `/admin/stats` handles NULLs.
12. **`zh` own cache key**; **verify Caddy overwrites (not appends) `x-forwarded-for`** (the per-IP limit is the only per-attacker gate on render fan-out).

Operational reframe accepted: **Phase C is a multi-day milestone**, not a runbook append (Camoufox vs `ProtectSystem=strict`; spike the hardened unit first; pin the version).

---

## Decisions

1. **Scrapling vs DataDome:** do not attempt DataDome/hard-Akamai. Browser tier targets the beatable middle (SPAs, light gating). Evidence: Scrapling's own community reports StealthyFetcher is detected by DataDome; no reliable 2026 open-source bypass.
2. **SSRF containment:** OS-level nftables egress firewall as the authoritative floor **plus** per-render pinned resolution (belt + suspenders), over a validating forward proxy. (Refined by review — nftables alone was under-powered for a render-one-URL workload.)
3. **Knowledge fallback:** recognition-gated + evidence-anchored + requires a real Tier-0 block. Never invents for unknown domains.
4. **Fabricated stub:** remove entirely, **frontend and backend** (`src/stub.js` too). Nothing invented; service-down shows an honest message.
5. **Tier 0 depth:** deepen input (char cap + concurrent useful-page harvest), keep exactly 3 sharp ops; escalate to Tier 1 only on SPA-shape.
6. **Categorization:** enum-only — `industry`, `company_type`, `region`. **`size_estimate` and `industry_detail` dropped** (noise / redundant; reversed the earlier "keep size" call per review).
7. **Recognition-gate testing:** ship the hardened gate + mandatory audit log; **no periodic real-model canary** (owner accepts CI tests only the gate logic, and audit-log spot-checks are the fabrication-rate visibility).

## Owner decisions still open (non-blocking)

- **Cost cap denomination:** keep per-Gemini-call (≈300 scans/day at 600) or switch to scan-denominated. Product/cost call.
- **`zh` analysis-body language:** (a) generate the verdict/ops in Chinese (recommended — matches the trilingual site and the already-Chinese banner) or (b) English body under Chinese chrome (today's EN-fallback convention). Either is technically fine.

---

## Build sequencing

Loosely-coupled; ship the cheap honest wins first, the browser tier last. Each phase is independently deployable and leaves the site truthful.

1. **Phase A — Frontend honesty (website).** Delete the stub (frontend); route honest states off HTTP status + `error` code; add `#az-banner` to `index.html`; honest blocked-CTA (templated, DE/EN/中文); render `source`-keyed states + knowledge banner (degrades gracefully — absent `source` ⇒ report). Retires the fake "88" and the single-card bug immediately. First test written: `502 → honest message, no stub, no "✓ analysis complete"`.
2. **Phase B — Backend tiers + categorization (waiser-scan).** Tier-2 knowledge (hardened gate + audit log), deepened Tier-0 (concurrent harvest + SPA-shape gate), widened+coerced analyze schema, idempotent `leads` migration, `/admin/stats`, emit `source` (in `scans.result_json`) + source-specific TTL, per-path cost accounting, protector detection, delete `src/stub.js`, 3-way `zh` cache key, total scan deadline. Verify Caddy XFF overwrite. No new infra; git-pull + `systemctl restart`.
3. **Phase C — Scrapling sidecar (waiser-render).** Own multi-day milestone: spike the hardened systemd unit + nftables superset + egress self-test FIRST, then the Python render service (pinned resolution, innerText, semaphore, MemoryMax, lazy-warm), then wire Node's `RENDER_URL`. Until wired, Tier 1 is cleanly skipped and A+B stand alone.

## Testing

- **Tier 0:** `pickInternalLinks` covers new useful types (support/faq/careers/news), confirms contact/legal excluded; **SPA-shape gate** — static-thin does NOT escalate, SPA-shaped does; concurrent-fetch fits the budget.
- **Ladder ordering** (injected `scrapeFn`/`renderFn`/`analyzeFn`): each miss → correct next tier; `source` set correctly; sidecar down/busy/unset (`RENDER_URL`) → Tier 2, `renderFn` never called when unset; over-budget → short-circuit.
- **Tier 2 gate:** `known:true,conf 0.9,name-in-verdict,evidence,real-403` → knowledge; each missing precondition (`known:false`; `conf 0.4`; name absent; no 403 at Tier 0; malformed/NaN) → CTA, never a fabricated payload. (Tests the **gate**, not the model's recognition.)
- **Cost:** per-path reserve counts; Tier 2 does NOT call guard; over-cap at Tier 2 → `DAILY_LIMIT` message precedence.
- **Cache honesty:** scan a knowledge-brand → re-scan → 2nd still carries `source:"knowledge"`; knowledge entry expires at 7d; a later live scan overwrites stale knowledge; knowledge result does NOT set the hard `blocked` marker.
- **Categorization:** enum coercion (`industry:"law firm"`→`other`, etc.) via the shared constant; migration idempotent across two `openCache` on an old-schema DB (no crash, old rows read NULL); `/admin/stats` aggregations don't crash on NULL.
- **SSRF:** CI test diffs nftables set vs `isBlockedIP` (strict superset); documented VPS boot-time egress self-test (connect to `169.254.169.254` refused) — noted as an `ExecStartPost` unit check, NOT a CI test; `finalUrl` off-origin → rejected + re-validated.
- **Frontend:** all result states render per status+`source`; knowledge banner present iff `source:"knowledge"`; **`502 → honest, no stub, no "✓ analysis complete"`** (the reported bug); fast-soft-error animation cancel; `zh` e2e (Chinese banner, own cache key).
- **Out-of-CI:** recognition-gate hallucination is measured via manual audit-log spot-checks (no automated canary, per Decision 7).

## Files touched (anticipated)

- `website/index.html` — `#az-banner` slot; blocked-CTA element.
- `website/js/extras.js` — stub removal, status+source-keyed states, banners, CTA, animation-cancel.
- `website/js/translations.js` — banner/CTA strings (DE/EN/中文).
- `waiser-scan/src/scrape.js` — concurrent harvest, useful types, SPA-shape gate, `sanitizeInjection` on render text.
- `waiser-scan/src/analyze.js` — widened+coerced schema; shared enum constant.
- `waiser-scan/src/server.js` — ladder orchestration, scan deadline, Tier 2 (hardened gate + audit log), per-path cost, protector detection, `source` in `result_json`, 3-way `zh`.
- `waiser-scan/src/cache.js` — idempotent `leads` migration, categorization columns, source-specific TTL, `/admin/stats`, `blocked`-marker reconciliation.
- `waiser-scan/src/domain.js` — export the CIDR set for the nftables superset test (shared source of truth).
- `waiser-scan/src/render.js` *(new)* — sidecar HTTP client (pinned-IP contract, Node-side timeout).
- `waiser-scan/render/` *(new, Python)* — Scrapling sidecar (pinned resolution, innerText, semaphore, finalUrl check).
- `waiser-scan/deploy/` — `waiser-render.service` (+ MemoryMax retrofit on `waiser-scan.service`), nftables rules + superset/self-test, runbook.
- **Deleted:** `waiser-scan/src/stub.js`, `waiser-scan/test/stub.test.js`.
