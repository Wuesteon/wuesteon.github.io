# Scan Phase C — Scrapling Render Sidecar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Tier 1 to the fetch ladder — a self-hosted headless-browser render sidecar that recovers sites the plain fetch can't read (JS-rendered SPAs, light UA/Cloudflare gating), while staying SSRF-safe on the production VPS. Deliver ALL code committed and tested; the VPS deployment (install Camoufox, apply nftables, set `RENDER_URL`) is a separate op the owner runs.

**Architecture:** A minimal Python service (`render/`) running Scrapling/Camoufox, loopback-only on `127.0.0.1:8791`, under its own unprivileged `waiser-render` systemd user hardened with an **nftables egress denylist that is a provable superset of `src/domain.js` `BLOCKED_CIDRS`** (the kernel floor) plus **per-render DNS pinning** (`--host-resolver-rules` maps the one validated `domain→ip`, so the browser can't resolve anything else). The sidecar returns the rendered page's **`innerText`** (correct `display:none` semantics), not raw HTML. Node's already-built `handleScan` wires a `renderFn` (via `src/render.js`) that fires **only** on a Tier-0 miss when the result is SPA-shaped or a light block, within the scan deadline; `RENDER_URL` unset ⇒ Tier 1 stays skipped (the ladder already handles this).

**Tech Stack:** Python 3.11+, [Scrapling](https://github.com/D4Vinci/Scrapling) + Camoufox (patched Firefox), a stdlib `http.server` (no web framework — mirror the Node service's minimalism). Node side: `node --test`. nftables + systemd on Debian (the Contabo VPS).

## Global Constraints

- **nftables egress must be a provable SUPERSET of `BLOCKED_CIDRS`** (`src/domain.js`) — a CI test diffs the two so the kernel floor can never be narrower than the app check. (spec §Tier 1 SSRF layer 2; the exact bug the review caught.)
- The browser fetch happens ENTIRELY inside the sidecar and does NOT go through Node's per-hop `resolveAndPin`. So on this path **nftables is the load-bearing egress control, not defense-in-depth** — it must be verified on every deploy (a boot-time self-test), and the browser's DNS is pinned so it can't reach a non-initial origin.
- Sidecar returns **`document.body.innerText`** (layout-resolved visible text), NOT raw HTML. Node runs `sanitizeInjection` on it (NOT the regex `extractText`). Correct the "identical defenses" framing. (review C13.)
- Sidecar owns a **hard global render semaphore** (≤2) + bounded queue; on saturation returns `503 RENDER_BUSY` so Node falls straight to Tier 2. **`MemoryMax=` on BOTH** the new `waiser-render` unit and (retrofit) `waiser-scan.service`. (review C6/C12.)
- Do NOT push or deploy. Commit to `feat/scan-tiers` (the Phase B branch) in `waiser-scan`. **Deployment is a separate op the owner runs** (install Camoufox binary, apply nftables, set `RENDER_URL`, `systemctl enable`). Phase C code must be inert until `RENDER_URL` is set.
- Reference: `website/docs/superpowers/specs/2026-07-06-scan-fetch-fallback-ladder-design.md` §Tier 1. Node's `renderFn` contract is already defined by Phase B (`src/server.js` — Tier 1 slot, currently skipped).

## File Structure

- `render/server.py` — CREATE. The sidecar HTTP server: `POST /render {url, pinnedIp, family, lang}` → `{text, title, finalUrl, status, headers}`; `/health`. Owns the semaphore + queue + timeout; refuses off-origin `finalUrl`.
- `render/browser.py` — CREATE. Camoufox pool: lazy-warm + idle-evict; a `render_one(url, pinned_ip)` that launches with `--host-resolver-rules`, blocks subresources, waits for settle, returns `body.innerText` + title + finalUrl + response status/headers.
- `render/ssrf.py` — CREATE. Reads `BLOCKED_CIDRS` (exported from Node as JSON at build time, see Task 1) and provides the nftables rule generation + a `is_public_ip()` guard as an in-process second check.
- `render/test_render.py` — CREATE. `python -m unittest`: semaphore/queue behavior, off-origin refusal, innerText extraction on a static HTML fixture (no real browser — inject a fake renderer), nftables-superset diff vs `BLOCKED_CIDRS`.
- `deploy/waiser-render.service` — CREATE. Hardened systemd unit (own user, MemoryMax, egress self-test in ExecStartPost).
- `deploy/nftables-waiser-render.nft` — CREATE. The egress denylist, generated from `BLOCKED_CIDRS`.
- `deploy/render-cidrs.json` — CREATE (generated). `BLOCKED_CIDRS` serialized, the shared source of truth for both the nft file and the superset test.
- `deploy/waiser-scan.service` — MODIFY. Add `MemoryMax=` retrofit.
- `src/render.js` — CREATE (Node). `makeRenderClient({ url, timeoutMs })` → `renderFn({ domain, pinnedIp, family, lang })` calling the sidecar; Node-side timeout; maps `503`→treat-as-miss.
- `src/server.js` — MODIFY. Wire the Tier-1 slot: when `renderFn` is set AND (Tier-0 was SPA-shaped OR a light block) AND in budget, resolve+pin the IP, call `renderFn`, run `sanitizeInjection` + thin-gate + guard + analyze → `source:'rendered'`.
- `test/render.test.js` — CREATE (Node). `renderFn` client behavior (injected fetch): 200→text, 503→null/miss, timeout→miss.
- `test/server.test.js` — EXTEND. Tier-1 fires on SPA-shape; renderFn miss → Tier 2; renderFn success → `source:'rendered'`.
- `README.md` — MODIFY. Phase C deploy runbook (Camoufox install, nftables apply, self-test, RENDER_URL).

---

### Task 1: Export BLOCKED_CIDRS to a build artifact (shared by nft + tests)

**Files:**
- Create: `deploy/gen-cidrs.js` (a tiny Node script that imports `BLOCKED_CIDRS` and writes `deploy/render-cidrs.json`)
- Create (generated, committed): `deploy/render-cidrs.json`

- [ ] **Step 1:** Write `deploy/gen-cidrs.js`:
```js
import { BLOCKED_CIDRS } from '../src/domain.js';
import { writeFileSync } from 'node:fs';
writeFileSync(new URL('./render-cidrs.json', import.meta.url), JSON.stringify(BLOCKED_CIDRS, null, 2) + '\n');
console.log('wrote render-cidrs.json');
```
- [ ] **Step 2:** Run it: `node deploy/gen-cidrs.js` → commits `deploy/render-cidrs.json`.
- [ ] **Step 3:** Commit. `git add deploy/gen-cidrs.js deploy/render-cidrs.json && git commit -m "build: export BLOCKED_CIDRS to deploy/render-cidrs.json (shared by nft + superset test)"`

---

### Task 2: nftables egress denylist generated from the CIDR artifact + superset test

**Files:**
- Create: `deploy/gen-nftables.js` (generates `deploy/nftables-waiser-render.nft` from `render-cidrs.json`)
- Create (generated, committed): `deploy/nftables-waiser-render.nft`
- Create: `test/nftables.test.js` (Node — asserts the .nft blocks every CIDR in the artifact)

**Interfaces:**
- Produces: an nft ruleset that DROPs egress from the `waiser-render` uid to every `BLOCKED_CIDRS` range (v4 + v6), default-allow otherwise (public IPs only). The superset test parses the .nft and asserts each `BLOCKED_CIDRS` entry appears.

- [ ] **Step 1: Failing test** — `test/nftables.test.js`:
```js
import { test } from 'node:test'; import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { BLOCKED_CIDRS } from '../src/domain.js';
test('nftables ruleset is a superset of BLOCKED_CIDRS', () => {
  const nft = readFileSync(new URL('../deploy/nftables-waiser-render.nft', import.meta.url), 'utf8');
  for (const [net, bits] of BLOCKED_CIDRS.v4) assert.ok(nft.includes(`${net}/${bits}`), `missing ${net}/${bits}`);
  for (const c of BLOCKED_CIDRS.v6) assert.ok(nft.includes(c), `missing ${c}`);
});
```
- [ ] **Step 2: Run — fails** (no .nft yet).
- [ ] **Step 3: Implement `deploy/gen-nftables.js`** — read `render-cidrs.json`, emit a table `inet waiser_render_egress` with an `oif` output chain that, matched by `meta skuid waiser-render`, `ip daddr { <v4 cidrs> } drop` + `ip6 daddr { <v6 cidrs> } drop` + `169.254.169.254 drop` (explicit metadata), everything else accept. Write the .nft. Run it to generate the file. (Exact nft syntax in the file; the generator interpolates the CIDR lists.)
- [ ] **Step 4: Run — passes.**
- [ ] **Step 5: Commit** `git add deploy/gen-nftables.js deploy/nftables-waiser-render.nft test/nftables.test.js && git commit -m "feat(deploy): nftables egress denylist generated from BLOCKED_CIDRS + superset test"`

---

### Task 3: SSRF helper (in-process second check) — `render/ssrf.py`

**Files:**
- Create: `render/ssrf.py`; `render/test_render.py` (start the test file with the ssrf cases)

**Interfaces:**
- Produces: `load_blocked_cidrs(path)` → parsed structure; `is_public_ip(ip)` → bool (rejects everything in `BLOCKED_CIDRS`, mirrors Node's `isBlockedIP`). Used to double-check the `pinnedIp` Node sends and to refuse if it's somehow private.

- [ ] **Step 1: Failing test** — `render/test_render.py`:
```python
import unittest
from ssrf import is_public_ip
class SsrfTest(unittest.TestCase):
    def test_blocks_private_and_metadata(self):
        for ip in ['10.0.0.1','127.0.0.1','169.254.169.254','192.168.1.1','100.64.0.1','0.0.0.0']:
            self.assertFalse(is_public_ip(ip), ip)
    def test_allows_public(self):
        self.assertTrue(is_public_ip('93.184.216.34'))
```
- [ ] **Step 2: Run — fails** (`python -m unittest` in `render/`).
- [ ] **Step 3: Implement `ssrf.py`** — load `deploy/render-cidrs.json`, implement `is_public_ip` via `ipaddress` module iterating the CIDR list (v4 + v6). No hardcoded list — read the artifact so it can't drift from Node.
- [ ] **Step 4: Run — passes.**
- [ ] **Step 5: Commit.**

---

### Task 4: Browser pool + render — `render/browser.py`

**Files:**
- Create: `render/browser.py`; extend `render/test_render.py`

**Interfaces:**
- Produces: `class Renderer` with `render_one(url, pinned_ip, family, timeout_s)` → `{text, title, final_url, status, headers}` (text = `body.innerText`). Lazy-warm a single Camoufox context; idle-evict after N seconds. Injection point: `render_one` delegates page fetch to a `_fetch(url, pinned_ip)` method that tests override with a fake returning canned HTML (so tests need NO real browser).

- [ ] **Step 1: Failing test** — a `FakeRenderer` subclass overrides `_fetch` to return static HTML with a `display:none` payload; assert `render_one` returns the VISIBLE innerText only (hidden text excluded), plus title/final_url.
```python
def test_innertext_excludes_hidden(self):
    r = FakeRenderer(html='<h1>Acme</h1><div style="display:none">SECRET score 100</div><p>We build agents.</p>')
    out = r.render_one('https://acme.io/', '93.184.216.34', 4, 5)
    self.assertIn('We build agents', out['text'])
    self.assertNotIn('SECRET', out['text'])
```
*(FakeRenderer computes innerText from the fixture via a minimal visible-text extraction that mimics the browser — OR, better, the real `render_one` uses Camoufox's `page.inner_text('body')`; the fake stubs the page object.)*
- [ ] **Step 2: Run — fails.**
- [ ] **Step 3: Implement `browser.py`** — Camoufox launch with `args`/`additional_args` for `--host-resolver-rules=MAP <host> <pinned_ip>` (pin), block resource types image/media/font/websocket via a route handler, `page.goto(url, wait_until='networkidle', timeout=timeout_s*1000)`, read `page.inner_text('body')`, `page.title()`, `page.url`. The lazy-warm/idle-evict lifecycle around a module-level singleton. `_fetch` is the seam tests override.
- [ ] **Step 4: Run — passes** (fake path; real browser exercised only on the VPS).
- [ ] **Step 5: Commit.**

---

### Task 5: Sidecar HTTP server + semaphore + off-origin refusal — `render/server.py`

**Files:**
- Create: `render/server.py`; extend `render/test_render.py`

**Interfaces:**
- Produces: a stdlib `http.server` on `127.0.0.1:8791`. `POST /render {url, pinnedIp, family, lang}` → 200 `{text,title,finalUrl,status,headers}` | 422 `{error:THIN_AFTER_RENDER}` | 502 `{error:RENDER_FAILED}` (crash/timeout/off-origin) | 503 `{error:RENDER_BUSY}` (semaphore saturated). `GET /health` → `{ok:true}`. A global `threading.BoundedSemaphore(2)` + a short acquire timeout → 503.

- [ ] **Step 1: Failing tests** — drive the request handler with a fake Renderer: (a) a normal render → 200 with text; (b) `final_url` on a different registrable domain → 502 RENDER_FAILED (off-origin refusal); (c) empty innerText → 422; (d) semaphore exhausted (acquire fails) → 503.
- [ ] **Step 2: Run — fails.**
- [ ] **Step 3: Implement `server.py`** — parse JSON body, `is_public_ip(pinnedIp)` guard (private → 502), acquire semaphore (timeout → 503), `render_one(...)`, registrable-domain check on `final_url` vs requested host (mismatch → 502), thin check (empty → 422), else 200. `/health`. Bind loopback only.
- [ ] **Step 4: Run — passes.**
- [ ] **Step 5: Commit.**

---

### Task 6: Node render client — `src/render.js`

**Files:**
- Create: `src/render.js`; `test/render.test.js`

**Interfaces:**
- Consumes: `config.renderUrl`.
- Produces: `export function makeRenderClient({ url, timeoutMs })` → `async renderFn({ domain, pinnedIp, family, lang })` → `{ text, title, finalUrl }` on 200, or **throws a tagged miss** (so `handleScan` falls through) on 422/502/503/timeout. Node-side AbortController timeout.

- [ ] **Step 1: Failing test** — `test/render.test.js` with an injected `fetchImpl`: 200 → returns text; 503 → throws (miss); a hanging fetch → aborts and throws (miss).
- [ ] **Step 2: Run — fails.**
- [ ] **Step 3: Implement `render.js`** — POST JSON to `${url}/render` with an AbortController(timeoutMs); on 200 return parsed `{text,title,finalUrl}`; on any non-200 or abort throw `new ScanError('RENDER_FAILED')` (a miss the ladder treats as Tier-1 fail). Injaction: accept `fetchImpl` param defaulting to global `fetch`.
- [ ] **Step 4: Run — passes.**
- [ ] **Step 5: Commit.**

---

### Task 7: Wire Tier 1 into the ladder — `src/server.js`

**Files:**
- Modify: `src/server.js` (fill the Tier-1 slot); extend `test/server.test.js`
- Modify: production bootstrap — set `renderFn` from `makeRenderClient` when `config.renderUrl` is non-empty.

**Interfaces:**
- Consumes: `renderFn` (now real), `resolveAndPin` (already imported), `scraped.spaShaped`, the Tier-0 error's `blockedStatus`.
- Produces: on a Tier-0 miss where `renderFn` is set AND (the fetched homepage was SPA-shaped OR a light block) AND `Date.now() < deadline`: resolve+pin the domain → `renderFn({domain, pinnedIp, family, lang})` → `sanitizeInjection(text)` → thin-gate → guard (reserve) → analyze → `source:'rendered'`. Any renderFn throw → fall through to Tier 2.

- [ ] **Step 1: Failing tests** (extend `test/server.test.js`):
```js
test('SPA-shaped Tier-0 thin → Tier 1 render → source=rendered', async () => {
  const { app } = harness({
    scrapeFn: async () => { const e = new (await import('../src/scrape.js')).ScanErrorMaybe; }, // see note
    // simpler: scrapeFn throws THIN with spaShaped hint OR returns thin+spaShaped — match the real signal path
    renderFn: async () => ({ text: 'Rendered content about our SPA product.', title: 'SPA', finalUrl: 'https://spa.io/' }),
    analyzeFn: async () => ({ score: 77, verdict: 'ok', industry:'tech-saas', company_type:'b2b', region:'US', ops: [/*3*/], blocked:{blocked:false} }),
  });
  const b = JSON.parse((await call(app, '/api/scan?url=spa.io&lang=en')).body);
  assert.equal(b.source, 'rendered');
});
test('renderFn miss (RENDER_FAILED) → falls through to Tier 2', async () => { /* renderFn throws; knowledgeFn known → knowledge */ });
test('renderFn unset → Tier 1 skipped (unchanged Phase-B behavior)', async () => { /* no renderFn → straight to Tier 2/CTA */ });
```
*(NOTE: decide the exact SPA-shape signal path in code — the cleanest is: Tier-0 `scrape()` returns `{spaShaped:true}` on a thin-but-SPA page rather than throwing THIN, so `handleScan` can branch to Tier 1 on `scraped && needsRender(scraped)`. Adjust `scrape.js` to NOT throw THIN when spaShaped — return the thin text + spaShaped so the ladder decides. Add that as Step 3a.)*
- [ ] **Step 2: Run — fails.**
- [ ] **Step 3a: Adjust `scrape.js`** — when combined text is thin BUT `isSpaShaped`, do NOT throw `THIN_CONTENT`; return `{ ..., text, spaShaped:true, thin:true }` so the ladder can try Tier 1. A thin, non-SPA page still throws `THIN_CONTENT` (unchanged).
- [ ] **Step 3b: Implement the Tier-1 branch** in `handleScan` between Tier 0 and Tier 2: `if (renderFn && needsRender(scraped, tier0err) && Date.now() < deadline) { const {ip,family} = await resolveAndPin(domain); const r = await renderFn({domain, pinnedIp:ip, family, lang}).catch(()=>null); if (r) { const text = sanitizeInjection(r.text); if (enough(text)) { reserve+guard+analyze → finishResult(...,'rendered') } } }`. `needsRender` = `(scraped && scraped.spaShaped) || isLightBlock(tier0err)`.
- [ ] **Step 4: Run — passes; full suite green.**
- [ ] **Step 5: Commit.**

---

### Task 8: Hardened systemd unit + MemoryMax retrofit + deploy runbook

**Files:**
- Create: `deploy/waiser-render.service`
- Modify: `deploy/waiser-scan.service` (add `MemoryMax=`)
- Modify: `README.md` (Phase C runbook)

- [ ] **Step 1: Write `deploy/waiser-render.service`** — `User=waiser-render`, `ExecStart=/opt/waiser-scan/render/venv/bin/python render/server.py`, `EnvironmentFile`, hardening (`NoNewPrivileges`, `ProtectSystem=strict`, `PrivateTmp`, `ProtectHome`, `RestrictAddressFamilies=AF_INET AF_INET6`), `ReadWritePaths` for the browser profile/cache dir + `/dev/shm` decision (or `--disable-dev-shm-usage`), `MemoryMax=1200M`, and an `ExecStartPost=/opt/waiser-scan/deploy/egress-selftest.sh` that curls `http://169.254.169.254/` and FAILS the unit if it succeeds (kernel egress must block it). Pin the Camoufox version in `requirements.txt`.
- [ ] **Step 2: Add `MemoryMax=` to `deploy/waiser-scan.service`** (e.g. `MemoryMax=512M`) so the browser sidecar can't OOM-kill the Node service via the box.
- [ ] **Step 3: Write `deploy/egress-selftest.sh`** — `curl -s -m 3 -o /dev/null http://169.254.169.254/ && { echo "EGRESS LEAK: metadata reachable"; exit 1; } || exit 0`.
- [ ] **Step 4: Write the README Phase C runbook** — create `waiser-render` user; python venv + `pip install -r render/requirements.txt` + `python -m camoufox fetch` (download the browser); apply nftables (`nft -f deploy/nftables-waiser-render.nft`, persist); install the unit; set `RENDER_URL=http://127.0.0.1:8791` in `/etc/waiser-scan/.env`; `systemctl enable --now waiser-render`; verify `/health` + run the egress self-test; restart `waiser-scan` so it picks up `RENDER_URL`. Note the Camoufox upgrade cadence.
- [ ] **Step 5: Commit.**

---

### Task 9: Full verification (code-level; VPS deploy is the owner's op)

- [ ] **Step 1:** `npm test` (Node) — all green, incl. new render + nftables + Tier-1 tests.
- [ ] **Step 2:** `cd render && python -m unittest` — all green (ssrf, browser-fake, server, off-origin, semaphore).
- [ ] **Step 3:** Regenerate artifacts and confirm they're committed and consistent: `node deploy/gen-cidrs.js && node deploy/gen-nftables.js && git diff --exit-code deploy/` (no drift).
- [ ] **Step 4:** Confirm `RENDER_URL` unset still yields the Phase-B ladder (Tier 1 skipped) — a server test already covers this.
- [ ] **Step 5:** Final commit + a short "Phase C ready to deploy" note in the plan. **Do not deploy.**

---

## Self-Review (plan vs spec)

- **Sidecar boundary + contract** (spec §Tier 1): Tasks 5 (server) + 6 (Node client) — `{url,pinnedIp,family,lang}` → `{text,title,finalUrl,...}`, loopback-only — covered.
- **4-layer SSRF** (spec §Tier 1 SSRF): pinned resolution (Task 4 `--host-resolver-rules`) + nftables superset (Task 2) + subresource block (Task 4) + finalUrl off-origin refusal (Task 5) — covered. Boot-time egress self-test (Task 8). In-process `is_public_ip` second check (Task 3).
- **innerText not HTML** (review C13): Tasks 4 + 5 (return `body.innerText`) + Task 7 (`sanitizeInjection`, NOT `extractText`) — covered.
- **Semaphore + RENDER_BUSY + MemoryMax on both units** (review C6/C12): Tasks 5 + 8 — covered.
- **SPA-shape gate, not char floor** (review C4): Task 7 Step 3a (scrape returns spaShaped/thin instead of throwing THIN for SPAs) + `needsRender` — covered; thin static still 422.
- **RENDER_URL unset ⇒ Tier 1 skipped** (spec staged rollout): Task 7 (guarded on `renderFn`) — covered; a test asserts it.
- **Deploy is the owner's op** (owner decision): Task 8 runbook + Task 9 "do not deploy" — covered.
- **Camoufox version pinned + upgrade cadence** (review C7): Task 8 — covered.
- **Placeholder scan:** Task 7's test sketch has a `NOTE` resolving the SPA-signal path (Step 3a) — that's a real design instruction, not a placeholder; the implementer follows Step 3a. All other steps have concrete code/algorithms.
- **Type/name consistency:** `renderFn({domain,pinnedIp,family,lang})`, `render_one(url,pinned_ip,family,timeout_s)`, `is_public_ip`, `makeRenderClient`, `needsRender`, `spaShaped`, `RENDER_BUSY`/`RENDER_FAILED`/`THIN_AFTER_RENDER`, `BLOCKED_CIDRS` used consistently across Tasks 1–8 and against the Phase-B Node side already built.
