# Design: `scan.waiser.dev` Agent Opportunity Scan endpoint

**Date:** 2026-07-03
**Status:** Approved (design), pending spec review → implementation plan
**Owner:** Nils Weiser

## Problem

The waiser.dev homepage (`index.html#scan`, driven by `js/extras.js`) already ships an
"Agent Opportunity Scan" UI: the visitor drops their company URL and gets a fit score,
a verdict, and three tailored AI-agent opportunities. Today the result is **faked** —
`analyzeCompany()` in `js/extras.js:85` derives a plausible-looking score and picks three
opportunities from a static pool via a hash of the domain. Nothing actually reads the
visitor's site.

We want a real backend that:
1. Scrapes the visitor's public website.
2. Uses an LLM (Google Gemini) to infer what the company/person does and where AI agents
   would help most.
3. Caches the result per domain in a local database, so a previously scanned domain is
   served instantly and for free.
4. Is exposed only for use by the waiser.dev frontend (best-effort origin locking +
   real abuse/cost controls).

## Non-goals

- **Hard origin-locking.** waiser.dev is a static GitHub Pages site; all scan logic runs
  in the visitor's browser. A browser `fetch()` sends `Origin`/`Referer`, but both are
  trivially forgeable with curl, and a static page cannot hold a server secret. "Only from
  waiser.dev" therefore means *block other websites' browsers via CORS, and cap abuse/cost
  at the app layer* — not a cryptographic lock. This is accepted, not a bug to solve.
- No user accounts, no PII storage, no analytics beyond what already exists (Umami).
- No crawling beyond a small bounded set of the target's own public pages.

## Key decisions (locked)

| Decision | Choice | Rationale |
|---|---|---|
| Scan engine | Real fetch + LLM analysis | User wants a genuine read of the visitor's site. |
| Persistence | Local **SQLite** cache keyed by normalized domain | "Save the project in a local database cache; if already scraped, deliver it again." Doubles as the hard cost cap. |
| LLM provider | **Google Gemini** (Flash tier) | User choice; already used across other projects; cheapest with a generous tier. |
| Exposure | `scan.waiser.dev` **A-record → Caddy** with Let's Encrypt TLS | waiser.dev DNS is on Namecheap, not Cloudflare. One DNS record, no provider migration. VPS IP becomes public; security rests on app-layer controls. |
| Code location | **Dedicated git repo** (not the static site repo) | Keeps the GitHub Pages repo pure-static; isolates the Node service. |
| Runtime | **Node 22** (already on openclaw_M), `systemd` service on `127.0.0.1:8790` | Loopback-only; Caddy is the only public entry. |

## Architecture

```
Browser (waiser.dev, GitHub Pages)
   │  GET https://scan.waiser.dev/api/scan?url=acme.com
   ▼  (direct HTTPS — GitHub Pages cannot reverse-proxy)
Caddy on openclaw_M  (scan.waiser.dev :443, Let's Encrypt auto-TLS)
   │  reverse_proxy → 127.0.0.1:8790   (loopback only)
   ▼
Node service "waiser-scan" (systemd)
   ├── normalize + validate domain            (domain.js — SSRF guard)
   ├── rate-limit check per IP                (ratelimit.js; cache hits exempt)
   ├── SQLite cache lookup ──hit──▶ return cached JSON (instant, free)
   │        │ miss
   │        ▼
   ├── fetch public site, capped              (scrape.js)
   ├── extract readable text
   ├── Gemini → {score, verdict, ops[3]} JSON (analyze.js)
   ├── write to SQLite cache                  (cache.js)
   └── return JSON { score, verdict, ops:[{t,d,fit}], cached:false }
```

### Response contract (must not change)

The frontend already expects this exact shape (see the `BACKEND HOOK` comment at
`js/extras.js:80-84`):

```json
{
  "score": 86,
  "verdict": "Strong fit. These three agents would pay for themselves fast.",
  "ops": [
    { "t": "Customer Support Agent", "d": "Deflect repetitive tickets…", "fit": "hi" },
    { "t": "Lead Qualification Agent", "d": "Reads every inbound enquiry…", "fit": "hi" },
    { "t": "Document Processing", "d": "Extract, summarise and file…", "fit": "md" }
  ]
}
```

- `score`: integer, roughly 60–99.
- `verdict`: one-sentence string, localized (see i18n below).
- `ops`: **exactly 3** items. `fit` ∈ `{"hi","md"}` (drives the impact badge; the frontend
  has no `"lo"` styling, so the backend must only emit `hi`/`md`).
- Backend may add `cached: bool` and `lang` fields; the frontend ignores unknown fields.

### i18n

The frontend is DE/EN. The scan console text and impact labels are already localized
client-side. The **verdict** and the **opportunity `t`/`d` strings come from the backend**,
so the backend must produce them in the caller's language. The frontend passes the current
language as a query param: `GET /api/scan?url=…&lang=de|en` (default `en`). The Gemini prompt
instructs output in that language. Cache key therefore includes language:
effective key = `lang + ":" + domain` (a domain scanned in DE and EN are two cache rows).

## Components

Each is a small, independently testable module.

### `server.js`
- HTTP listener on `127.0.0.1:8790` (configurable).
- Routes:
  - `GET /api/scan?url=<domain>&lang=<de|en>` — main endpoint.
  - `GET /health` — returns `200 {"ok":true}` for Caddy/uptime checks.
- CORS: `Access-Control-Allow-Origin: https://waiser.dev` only; handle `OPTIONS` preflight.
- Orchestrates: validate → rate-limit → cache → scrape → analyze → cache-write → respond.
- Error envelope: `{ "error": "<code>", "message": "<human>" }` with appropriate status
  (400 bad url, 429 rate-limited, 502 upstream/LLM failure, 500 internal). Never leaks
  stack traces or the Gemini key.

### `domain.js`  — the security-critical module
- `normalizeDomain(raw)`: strip scheme, `www.`, path, query; lowercase; trim. Mirror the
  frontend's `cleanDomain()` (`js/extras.js:78`) so keys match.
- `validatePublicHostname(host)`: must be a syntactically valid public domain.
  **Reject**: IP-literal targets, `localhost`, `*.local`, `*.internal`, non-FQDN,
  and (after DNS resolution) any host resolving to private/loopback/link-local/CGNAT
  ranges (10/8, 172.16/12, 192.168/16, 127/8, 169.254/16, ::1, fc00::/7, 100.64/10).
- This guard runs **before** any fetch, and the resolved-IP re-check runs again inside
  `scrape.js` after DNS resolution (defense in depth against DNS rebinding).

### `scrape.js`
- Fetch homepage over HTTPS (fallback HTTP) with hard caps:
  - Total time budget ≤ ~15s; per-request timeout ≤ ~8s.
  - Response size cap ≤ ~2 MB; bail if larger.
  - Only `Content-Type: text/html`.
  - Follow ≤ 3 redirects; re-run the private-IP check on each redirect target.
  - Custom `User-Agent: waiser-scan/1.0 (+https://waiser.dev)`.
- Optionally fetch up to ~3 internal same-origin links (e.g. `/about`, `/services`,
  `/pricing` if present) under the same total budget.
- Extract readable text (strip scripts/styles/nav boilerplate), truncate to a token-safe
  length (~12k chars) before sending to Gemini.
- Returns `{ finalUrl, title, text }` or throws a typed error (`FETCH_FAILED`,
  `NOT_HTML`, `TOO_LARGE`, `BLOCKED_TARGET`).

### `analyze.js`
- Builds the Gemini prompt: system framing ("You analyze a company's public website and
  identify where autonomous AI agents would save the most time"), the scraped text, and a
  strict JSON-output instruction matching the response contract, in the requested language.
- Calls Gemini Flash via the official SDK (`@google/generative-ai`) with `responseMimeType:
  application/json` / a response schema where supported.
- Parses + validates the JSON: exactly 3 ops, `fit ∈ {hi,md}`, score clamped to 60–99,
  verdict non-empty. On any violation, retry once; if still bad, throw `ANALYZE_FAILED`.
- The **opportunity pool from `js/extras.js:45-62`** is passed to the model as a menu of
  canonical agent types to choose/adapt from, so results stay on-brand and consistent —
  the model picks and tailors, it doesn't invent wildly off-topic agents.

### `cache.js`
- SQLite (via `node:sqlite` if available on Node 22, else `better-sqlite3`).
- Schema:
  ```sql
  CREATE TABLE IF NOT EXISTS scans (
    key        TEXT PRIMARY KEY,   -- "<lang>:<domain>"
    domain     TEXT NOT NULL,
    lang       TEXT NOT NULL,
    result_json TEXT NOT NULL,
    model      TEXT NOT NULL,
    scraped_at INTEGER NOT NULL    -- unix seconds
  );
  ```
- `get(lang, domain)` → parsed result or `null` (respecting optional TTL).
- `put(lang, domain, result, model)`.
- TTL: `CACHE_TTL_DAYS` env, default `0` = never expire (matches "just deliver it again").
  A future re-scan can be forced with `&fresh=1` (bypasses read, still writes) — optional,
  low priority.
- DB file: `/var/lib/waiser-scan/scans.sqlite` (root-only dir).

### `ratelimit.js`
- In-memory sliding-window per client IP (from `X-Forwarded-For` set by Caddy, else socket).
- Default `RATE_LIMIT=20` scans/hour/IP. **Cache hits do not count** (they're free).
- On exceed: `429` with a friendly message. In-memory is acceptable (single instance;
  resets on restart) — the SQLite cache is the durable cost ceiling, the limiter just
  smooths bursts.

### Configuration
Root-only `/etc/waiser-scan/.env`:
```
GEMINI_API_KEY=…
PORT=8790
ALLOWED_ORIGIN=https://waiser.dev
RATE_LIMIT=20
CACHE_TTL_DAYS=0
```

## Security posture (summary)

- **Origin**: CORS locked to `https://waiser.dev`. Best-effort (curl can forge). Not the
  primary defense.
- **Cost ceiling**: SQLite cache (one Gemini call per domain+lang, ever) + per-IP
  rate-limit. This is the real abuse control.
- **SSRF**: the primary security work. Reject private/internal targets pre-fetch, re-check
  resolved IP and every redirect target, cap size/time, HTML-only. Prevents the endpoint
  being used to probe internal networks or as an amplifier.
- **Secrets**: Gemini key in root-only env, never in the repo or browser.
- **No PII**: cache holds only public domain + generated analysis.
- **VPS IP is public** (A-record). No inbound ports open beyond Caddy :443 (+ existing 22,
  xray). The Node service is loopback-only.

## Frontend change

One commit to the website repo, `js/extras.js`:
- Replace the synchronous `analyzeCompany(domain)` stub with an `async` call to
  `https://scan.waiser.dev/api/scan?url=<domain>&lang=<lang>`.
- Keep the existing typing animation; it plays while the fetch is in flight.
- On network error / non-200 / timeout, **fall back to the current deterministic stub**
  so the UI never dead-ends (the hash-based result stays as graceful degradation).
- No new Tailwind classes → no `tailwind/build.sh` run needed.

## Deployment

1. **Dedicated repo** (e.g. `waiser-scan`), cloned to `/opt/waiser-scan` on openclaw_M.
2. `npm ci` (deps: Gemini SDK, sqlite driver; no framework needed — `node:http`).
3. `systemd` unit `waiser-scan.service` running `node server.js` as a dedicated non-root
   user where possible, `EnvironmentFile=/etc/waiser-scan/.env`, restart-on-failure.
4. **Caddy** block added:
   ```
   scan.waiser.dev {
       reverse_proxy 127.0.0.1:8790
   }
   ```
   **TLS caveat (must handle):** the current global Caddyfile sets `auto_https off`
   (for the IP-only xray block on `:27991`). That global directive disables automatic
   HTTPS/cert issuance for *all* sites, so simply adding the `scan.waiser.dev` block
   above would leave it HTTP-only and break the browser call (mixed content).
   Resolution: remove the global `auto_https off` and instead scope HTTP-only behavior
   to the xray site (it listens on an explicit `:27991` with no hostname, so it is
   unaffected by automatic HTTPS regardless), letting Caddy auto-provision a Let's
   Encrypt cert for the named `scan.waiser.dev` site. Confirm the xray block still
   serves correctly after the change during deploy.
5. **DNS**: user adds Namecheap `A` record `scan → 37.60.244.84`.
6. Verify: TLS provisions, `GET https://scan.waiser.dev/health` → 200, end-to-end scan
   works, 2nd scan of same domain returns `cached:true` instantly.

## Testing

- **Unit** (Node built-in `node:test`):
  - `domain.js`: normalization + SSRF rejection (private IPs, localhost, IP literals,
    malformed input) — the critical suite.
  - `cache.js`: get/put round-trip, TTL expiry, key includes lang.
  - `analyze.js`: valid Gemini JSON parses; malformed JSON triggers retry then fallback;
    ops count/fit/score validation (Gemini SDK mocked).
- **Integration**: local `curl` against `127.0.0.1:8790` with `scrape.js`/Gemini mocked;
  assert response contract; assert 2nd call is a cache hit; assert `429` after limit.
- **Manual smoke** post-deploy: real scan of a known domain + a repeat (cache) + a blocked
  target (e.g. `http://localhost`) returns 400.

## Open questions / deferred

- **Force-refresh** (`&fresh=1`) and a tiny admin way to purge/inspect a cached domain —
  nice-to-have, deferred.
- **Dedicated non-root service user** — preferred; confirm feasible on the VPS during deploy.
- **Rate-limit durability** — in-memory is fine for v1; revisit if abuse appears.
