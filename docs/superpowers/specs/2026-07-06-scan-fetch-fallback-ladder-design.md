# Design: Scan fetch/fallback ladder + honest results + lead categorization

- **Date:** 2026-07-06
- **Status:** Approved (brainstorming complete, ready for implementation plan)
- **Repos touched:** `waiser-scan` (backend, `/opt/waiser-scan` on the Contabo VPS) and `website` (frontend, GitHub Pages)
- **Owner context:** wAIser.dev is an AI-Agent / AI-Security consultancy. Honesty and SSRF hardening are first-class requirements, not nice-to-haves — the scan is a public lead-gen tool and must never fabricate results or expose the VPS to SSRF.

## Problem

The "waiser scan // agent-fit" widget on the homepage is a core lead-generation feature. Two defects surfaced while scanning `coop.ch`:

1. **It fabricates results on failure.** `coop.ch` sits behind DataDome and returns `403` to the scraper, so the backend correctly answers `502 FETCH_FAILED`. The frontend then *silently* falls back to `stubCompany()` — a deterministic fake generator seeded from a hash of the domain — and presents it as a real scan (the "88 AGENT-FIT" the user saw was fake).
2. **The fabricated result is itself buggy.** `stubCompany()` picks with `(h + i*7) % P.length` over a 7-element pool, so the step is a multiple of the pool size and the index never advances — it always yields **one** card, while the verdict text promises "these three agents." Hence "3 gefunden" + a single card.

Underlying quality gap: even a *successful* scan of a large company can be thin, because Tier 0 harvests marketing content (homepage + a few "what we do" pages) while the task ("where would autonomous agents save time") needs operational signal (support/FAQ/careers pages).

Additional missed opportunity: the backend already runs Gemini over the whole company but stores only `domain + request-count + outcome` as lead intelligence — the industry/type/size Gemini implicitly determines is discarded.

## Goals

- Never fabricate a result. Every outcome is truthful: a real scan, a browser-rendered scan, a clearly-labeled public-knowledge best-effort, or an honest "can't scan / book a call" message.
- Recover sites that block the plain fetch but are not DataDome-grade (JS-rendered SPAs, light UA/Cloudflare gating) via a self-hosted headless-browser tier.
- Give big/known brands that *are* unscrapeable a useful, clearly-labeled sample instead of a dead end.
- Deepen Tier 0 so large companies get a better-grounded analysis.
- Capture structured company categorization as lead intelligence ("which kinds of companies are interested in us").
- Fix the three frontend bugs.

## Non-goals

- Beating DataDome / hard-Akamai (coop.ch, migros.ch). Accepted as unwinnable; those fall through to the knowledge tier or the honest CTA.
- Fingerprint-spoofing to evade sites that actively block. The browser tier renders like a normal browser and blocks subresources; it is not an evasion arms-race. (On-brand constraint for an AI-Security consultancy.)
- Changing the fixed 3-opportunity output contract (evaluated and deferred — see Decisions).

## The fallback ladder

Every scan walks these tiers server-side in `waiser-scan`, stopping at the first that yields enough content. The frontend renders whatever comes back, keyed off a new `source` field.

```
GET /api/scan?url=<domain>&lang=<de|en|zh>
│
├─ Tier 0  Plain pinned fetch (undici, SSRF-pinned)      [existing, deepened]
│          homepage + internal pages → extractText
│          enough content?  ── yes ──▶  Gemini analyze  → source:"live"
│          └─ no / 403 / thin ↓
│
├─ Tier 1  Browser render (Scrapling sidecar)            [NEW; fires only on Tier-0 miss]
│          Node validates domain (existing check) → calls 127.0.0.1:8791
│          Camoufox renders JS → HTML → same extractText/sanitize/thin-gate
│          enough content?  ── yes ──▶  Gemini analyze  → source:"rendered"
│          └─ no / DataDome-hard / sidecar down ↓
│
├─ Tier 2  Gemini public-knowledge (recognition-gated)   [NEW; last resort]
│          Gemini (domain only): { known, confidence, score, verdict, ops }
│          known && confidence >= 0.6  ──▶  source:"knowledge", blocked:true
│          └─ unknown / low confidence ↓
│
└─ Tier 3  Honest CTA                                    → { error, blocked:true }
           "site blocks automated scans — I look at those personally. Book a call ▸"
```

- Tier 1 is the exception, not the rule — the fast/cheap/safe Tier 0 still serves the overwhelming majority of scans, so latency and VPS load stay bounded.
- Each tier's `costcap.reserve()` gating is preserved so the daily Gemini ceiling still holds.
- Graceful downgrade: any tier failing (including the sidecar being down or unset) falls through to the next; the browser tier can never take the whole scan down.

## Tier 0 — deepened harvest (`waiser-scan/src/scrape.js`)

Keep the exactly-3-ops output; improve the *input* so big companies get grounded picks.

- `TOTAL_CHAR_CAP`: 12000 → **18000** (still token-safe for `gemini-3.5-flash`; ~4.5k tokens).
- `maxInternalPages`: 3 → **5**.
- Extend the `USEFUL` internal-link priority list with the page types that carry the "repetitive work" signal this task needs:
  - support / FAQ / help / hilfe
  - careers / karriere / jobs
  - news / presse / press
- Raise the analysis quality floor above the bare `minContentChars = 500` thin gate (exact threshold decided in the plan; 500 stays as the hard "is there anything at all" gate, a higher bar informs whether to prefer Tier 1/Tier 2 for richer content). *(Implementation note: keep this conservative to avoid pushing borderline-but-fine SMB sites into the browser tier unnecessarily.)*

`EXCLUDE` still drops login/legal/cart. Note `kontakt`/`contact` remain excluded; support/help are added as *distinct* useful types so a support hub is harvested even though the contact page is not.

## Tier 1 — Scrapling render sidecar

### Boundary

A separate, minimal Python service. Its own systemd unit, its own unprivileged user (`waiser-render`), **loopback-only** on `127.0.0.1:8791`. Node stays the only public-facing door. Node validates the domain with its existing SSRF check *first*, then calls the sidecar with an already-validated domain.

Contract:

```
POST 127.0.0.1:8791/render     { "url": "https://<validated-domain>/", "lang": "de" }
  200 → { "html": "<rendered DOM>", "finalUrl": "...", "title": "..." }
  422 → { "error": "THIN_AFTER_RENDER" }   # rendered but still no content
  502 → { "error": "RENDER_FAILED" }       # blocked (DataDome), timeout, crash
```

The sidecar **only renders** — it never calls Gemini and makes no trust decisions. Node runs the returned HTML through its *same* `extractText` + `sanitizeInjection` + thin-content gate, so injection defenses and content rules are identical regardless of fetch path.

### SSRF containment (kernel-enforced — chosen model)

Defense in depth:

1. **nftables egress deny** on the `waiser-render` user: DROP all outbound to `10/8, 172.16/12, 192.168/16, 169.254.0.0/16, 127/8, ::1, fc00::/7`. Even a DNS-rebind or a subresource pointed at cloud metadata physically cannot leave the box. This is the primary, kernel-level backstop.
2. **systemd hardening** on the unit: `PrivateTmp`, `ProtectSystem=strict`, `NoNewPrivileges`, `RestrictAddressFamilies=AF_INET AF_INET6`, no write paths except its own runtime dir.
3. **Block non-document subresources** in Scrapling (image/media/font/websocket) — smaller attack surface, faster pages.
4. **Hard per-render timeout (~12s)** and a **single-browser concurrency cap** (warm Camoufox pool of 1–2 contexts) so a burst can't exhaust VPS RAM.

### Deploy delta

- New `deploy/waiser-render.service`, an nftables rules file, and `requirements.txt` (Scrapling + Camoufox). Runbook additions mirror the existing Node setup.
- Node `.env` gains `RENDER_URL=http://127.0.0.1:8791`. **Unset ⇒ Tier 1 disabled**, so the Node/backend changes and frontend can ship before the sidecar exists (staged rollout).

## Tier 2 — Gemini public-knowledge fallback (recognition-gated)

Fires only after Tier 0 and Tier 1 both fail. One Gemini call, structured so the gate and the payload return together, given **only the domain** (no scraped text):

```json
{
  "known":      "boolean  — does the model genuinely recognize THIS company?",
  "confidence": "number   — 0..1 self-rated",
  "score":      "number",
  "verdict":    "string",
  "ops":        "[{t,d,fit} × 3]"
}
```

Server gate: `known === true && confidence >= 0.6` → return `source:"knowledge", blocked:true`. Otherwise discard the payload entirely and fall to Tier 3.

Prompt is explicit and defensive: *"You are given only a domain name, no website content. If you do not genuinely recognize this specific company from public knowledge, set known=false — do NOT guess or invent. Only if you recognize it, provide a public-knowledge best-effort analysis and set known=true with your honest confidence."* This means an unknown `random-gmbh.de` returns `known:false` → CTA, never a fabricated company.

### Labeling (the honesty contract)

`source:"knowledge"` drives a **mandatory** banner above the report, in the visitor's language:

- **DE:** "Diese Website blockiert automatisierte Analysen — daher basiert dieses Ergebnis auf öffentlich verfügbaren Informationen, nicht auf einem Live-Scan."
- **EN:** "This site blocks automated scanning — so this result is based on publicly available information, not a live scan of the site."
- **中文:** "该网站屏蔽了自动扫描——因此本结果基于公开可得的信息，而非对网站的实时扫描。"

The score still animates but sits under the banner, so it never reads as a measured scan. A "Book a call" CTA rides along.

### Cost & caching

One `costcap.reserve()` before the call (respects the daily ceiling). Result is cached like any scan (keyed by lang+domain) with `source` preserved, so a repeat scan of a blocked brand is free and stays labeled. Only fires on the rare all-tiers-failed path, so spend impact is small.

## Company categorization (lead intelligence)

Gemini already reads the whole company; widen the analyze schema and persist structured fields on the lead row instead of discarding them. Categorization runs on every tier that has signal — `live`, `rendered`, and the Tier-2 `knowledge` path (Gemini knows Coop is retail). Unknown-blocked Tier-3 leads stay uncategorized (honest).

**Company-level public info only — no personal data.**

### New analyze/schema fields

- `industry` — **closed enum** (so it aggregates): `retail, legal, healthcare, professional-services, agency, tech-saas, manufacturing, hospitality, real-estate, finance, education, public-sector, ecommerce, other`.
- `company_type` — `b2b | b2c | mixed`.
- `region` — inferred from TLD/language/content (e.g. `CH`, `DE`, `AT`, `EU`, `US`, `other`).
- `size_estimate` — `solo | smb | mid | enterprise`. **Best-effort, low-confidence** (a polished site ≠ a big company). Stored and surfaced as an explicit guess, never as verified fact.
- `industry_detail` — short free text for nuance (does not replace the enum).

### Storage (`waiser-scan/src/cache.js`)

The `leads` table currently: `domain, requests, first_seen, last_seen, last_outcome`. Add columns: `industry, company_type, region, size_estimate, industry_detail, source`. Additive SQLite migration (`CREATE TABLE IF NOT EXISTS` + `ALTER TABLE ADD COLUMN` guarded for existing DBs).

### Reporting (`/admin/stats`)

Add aggregations: `by_industry` (counts), `by_type`, `by_region`, and `by_size` (labeled low-confidence). Surfaces "which kinds of companies are interested" and, cross-referenced with `source:"knowledge"`, "which blocked-but-known brands scanned us" (often the most interesting leads).

## Frontend result states (`website/js/extras.js`)

The frontend becomes a thin renderer keyed off `source`. Four states:

| Backend response | State | Banner |
|---|---|---|
| `source:"live"` or `"rendered"` | Normal report — score + 3 op cards | none (a real scan) |
| `source:"knowledge"` (200) | Report + **mandatory public-knowledge banner** above it | Section "Tier 2" copy (DE/EN/中文) |
| Hard block / unscannable, unknown (`4xx`/`5xx` with `blocked:true`, no `source`) | Honest message + **Book a call** CTA | "site sits behind bot protection — I look at those personally" (DE/EN/中文) |
| `429 DAILY_LIMIT` / `RATE_LIMITED` | Honest limit message (+ CTA for daily limit) | existing soft-error copy |
| service unreachable / edge 5xx (no JSON body) | Honest "live scan unavailable, book a call" | no fabricated demo |

The frontend keys purely off the response: a `200` with any `source` renders a report (with the knowledge banner iff `source:"knowledge"`); everything else is an honest message. It never needs to know which tier produced a `200`. Note the ladder guarantees a blocked-but-known brand is already resolved server-side to a `200 source:"knowledge"` — so the CTA row is reached only when Tier 2 also declined (unknown/low-confidence) or for the genuine soft errors. `rendered` is visually identical to `live` — the visitor needn't know a browser was used; it's still a real scan of their site.

### Honest blocked-CTA copy (templated + protector-aware)

Template the domain. Name the protector **only when provable** from response headers (`Server: DataDome`/`X-DataDome`; `cf-ray`→Cloudflare; `AkamaiGHost`→Akamai), else generic "Bot-Schutz". Example (DE): *"coop.ch sitzt hinter Bot-Schutz (DataDome) — automatisierte Analysen werden blockiert. Genau solche Fälle schaue ich mir persönlich an. Gespräch buchen ▸"*. Localized DE/EN/中文, with a `#contact` CTA (mirrors the existing `DAILY_LIMIT` pattern).

## The three bug fixes (`website/js/extras.js`)

1. **Delete the fabricated stub.** Remove `stubCompany()` and the `POOL_EN/DE/ZH` arrays (`extras.js:45-106`). Kills the fake "88" *and* the single-card bug by deletion; every path becomes truthful. (Primary fix for the reported complaint.)
2. **Animation-clobbers-error race.** On a fast soft error (daily-limit/block/thin), the still-running typing animation overwrites the honest message and finishes with "✓ analysis complete" and no report. Cancel the animation when the fetch promise settles, before painting the error.
3. **中文 fake-result gap.** Backend knows only `de`/`en` (`server.js:101`), so a 中文 visitor got real English results but a *Chinese* stub. Removing the stub fixes the fabrication. The frontend chrome and all banners/CTAs use the real 中文 copy in this spec regardless. **Open decision for the plan:** whether the analysis *body* (verdict + ops text) is generated in Chinese for `zh` visitors. Options — (a) add `zh` to the analyze/knowledge prompts so the body is Chinese (matches site language; small prompt change, Gemini handles zh well), or (b) map `zh → en` for the analysis body only, keeping Chinese chrome (mirrors today's EN-fallback convention for untranslated surfaces). Recommend (a) for consistency with the trilingual site; confirm in the plan.

## Decisions (resolved during brainstorming)

1. **Scrapling vs DataDome:** do not attempt DataDome/hard-Akamai. Browser tier targets the beatable middle (SPAs, light gating). Evidence: Scrapling's own community reports StealthyFetcher is detected by DataDome; no reliable 2026 open-source bypass.
2. **SSRF containment:** OS-level nftables egress firewall (kernel-enforced) over a validating forward proxy or subresource-blocking-only. Strongest and browser-agnostic.
3. **Knowledge fallback:** recognition-gated (Gemini must genuinely know the company) over always-attempt or skip-entirely. Best trust/usefulness balance; never invents for unknown domains.
4. **Fabricated stub:** remove entirely (not "keep as service-down demo"). Nothing on the page is ever invented; service-down shows an honest message.
5. **Tier 0 depth:** deepen harvest, keep exactly 3 sharp ops (not scale-to-6, not leave-as-is). Better input, unchanged output contract, minimal blast radius.
6. **Categorization:** full profile including `size_estimate`, with size explicitly labeled best-effort/low-confidence.

## Build sequencing

Loosely-coupled; ship the cheap honest wins first, the browser tier last. Each phase is independently deployable and leaves the site in a truthful state.

1. **Phase A — Frontend honesty (website).** Remove stub, fix the animation race, honest blocked-CTA (templated + protector-aware, DE/EN/中文), render the `source`-keyed states and the knowledge banner. *Immediately retires the fake "88" and the single-card bug.* Requires only backend fields that already exist plus the new banner copy; degrades gracefully if the backend hasn't shipped `source` yet (absent `source` ⇒ treat as `live`).
2. **Phase B — Backend Tier 2 + categorization + Tier 0 depth + protector detection (waiser-scan).** Knowledge fallback, deepened harvest, widened analyze schema, `leads` migration, `/admin/stats` aggregations, emit `source`, capture the protector from response headers for the CTA. No new infra. Deployable via the existing git-pull + `systemctl restart` runbook.
3. **Phase C — Scrapling sidecar (waiser-render).** The heavy lift: Python service, Camoufox, nftables egress policy, systemd hardening, runbook. Node wires `RENDER_URL` (until set, Tier 1 is simply skipped — everything above already works without it).

## Testing

- **Tier 0 harvest:** unit tests for `pickInternalLinks` covering the new useful types (support/faq/careers/news) and confirming contact/legal still excluded; cap/page-count changes.
- **Ladder ordering:** `server.js` tests with injected `scrapeFn`/`renderFn`/`analyzeFn` asserting each miss falls through to the correct next tier and `source` is set correctly; sidecar-down ⇒ falls to Tier 2; unset `RENDER_URL` ⇒ Tier 1 skipped.
- **Tier 2 gate:** `known:false`/low-confidence ⇒ Tier 3 (no fabricated payload); `known:true` high-confidence ⇒ `source:"knowledge"` + `blocked:true`.
- **Categorization:** schema validation forces enum values; migration is idempotent on an existing DB; `/admin/stats` aggregations count correctly.
- **SSRF (sidecar):** integration test that a render targeting a private/metadata IP is dropped (egress policy), and that redirects/subresources to internal hosts cannot connect.
- **Frontend:** the four result states render correctly per `source`; the knowledge banner is always present when `source:"knowledge"`; the animation race no longer clobbers error messages; no code path can render fabricated data.

## Files touched (anticipated)

- `website/js/extras.js` — stub removal, source-keyed states, banners, CTA, animation-race fix.
- `website/js/translations.js` — new banner/CTA strings (DE/EN/中文) if routed through i18n.
- `waiser-scan/src/scrape.js` — deepened harvest.
- `waiser-scan/src/analyze.js` — widened schema (categorization).
- `waiser-scan/src/server.js` — ladder orchestration, Tier 2, protector detection, pass `zh`, `source` in responses/leads.
- `waiser-scan/src/cache.js` — `leads` migration, categorization columns, `/admin/stats` aggregations.
- `waiser-scan/src/render.js` *(new)* — sidecar HTTP client (Node side).
- `waiser-scan/render/` *(new, Python)* — Scrapling sidecar service.
- `waiser-scan/deploy/` — `waiser-render.service`, nftables rules, runbook updates.
