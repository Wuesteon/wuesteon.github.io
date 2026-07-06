# Scan Phase B — Backend Tiers + Categorization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the `waiser-scan` backend honest, deeper, and smarter — add the recognition-gated Gemini public-knowledge fallback (Tier 2) with an audit log, deepen Tier-0 harvest with an SPA-shape escalation signal, widen+coerce the analyze schema for lead categorization, persist `source` in the cached result with a bounded source-specific TTL, correct the per-path cost accounting, detect the bot protector for the frontend CTA, delete the dead `src/stub.js`, make `zh` a real 3-way language with its own cache key, add a total scan deadline, and export the SSRF CIDR set for Phase C's superset test.

**Architecture:** All changes are server-side in the existing Node 22 stdlib service. `createApp({ scrapeFn, guardFn, analyzeFn, knowledgeFn, ... })` gains a `knowledgeFn` dependency and orchestrates the ladder (Tier 0 → [Tier 1 skipped until Phase C] → Tier 2 → CTA) under a wall-clock deadline. `analyze.js` gains categorization fields with server-side enum coercion from a shared constant. `cache.js` gains additive `leads` columns via an idempotent migration and a source-aware TTL on reads. Tier 1 (`renderFn`) is wired as an injected dependency that is **absent in Phase B** (unset `RENDER_URL` ⇒ skipped) — the ladder is written to fall straight from Tier 0 to Tier 2 when `renderFn` is not provided, so Phase C slots in without re-plumbing.

**Tech Stack:** Node 22 ESM, `node --test`, `better-sqlite3`, `@google/genai` (injected as `gemini.generateJSON` in tests). No new dependencies.

## Global Constraints

- Tests use `node --test`; every Gemini/scrape/render dependency is **injected** (`createApp(deps)`, `analyze({ gemini })`, `gem = (obj) => ({ generateJSON: async () => obj })`). Tests never hit the network or a real model. (`test/*.test.js`)
- `GEMINI_MODEL=gemini-3.5-flash`; `MAX_GEMINI_CALLS_PER_DAY=600` is a **per-call** budget (`costcap.reserve()` increments once per call). (`src/config.js`, `deploy` env)
- SSRF blocklist is authoritative in `src/domain.js` `isBlockedIP` (blocks `0.0.0.0/8, 10/8, 100.64/10, 127/8, 169.254/16, 172.16/12, 192.168/16`, v6 `::1, fe80::/10, fc00::/7`). Phase C's nftables set must be a **superset** — Phase B exports these CIDRs as the single source of truth.
- Error→HTTP mapping lives in `src/errors.js` (`STATUS`/`MESSAGES`); never serialize `e.message`/`e.detail`/`e.stack` into a response body (GATE 3, `server.js`).
- **Never fabricate.** Tier 2 serves a result only when the hardened recognition gate passes; otherwise the honest CTA. (spec Decision 3/4)
- Do NOT push or deploy. Commit to the branch. Deployment (git-pull + `systemctl restart`) is a separate op the user runs.
- Reference: `website/docs/superpowers/specs/2026-07-06-scan-fetch-fallback-ladder-design.md`. Authoritative for rationale; this plan for steps.

## File Structure

- `src/domain.js` — MODIFY. Export a `BLOCKED_CIDRS` constant (v4 + v6) as the single source of truth; `isBlockedIP` reads from it. Consumed by Phase C's nftables superset test.
- `src/analyze.js` — MODIFY. Add `industry`/`company_type`/`region` to schema + prompt; add server-side enum coercion; import the shared enum constant.
- `src/categories.js` — CREATE. The shared enum constant (`INDUSTRIES`, `COMPANY_TYPES`, `REGIONS`) + a `coerceCategory` helper, imported by both `analyze.js` schema and coercer (can't drift).
- `src/knowledge.js` — CREATE. `makeKnowledge({ gemini })` → `analyzeKnowledge({ domain, lang, timeoutMs })` returning the recognition-gated payload `{ known, confidence, evidence, score, verdict, ops, industry, company_type, region }` (raw; the gate lives in `server.js`).
- `src/scrape.js` — MODIFY. Concurrent internal-page fetch; add `support/faq/help/careers/jobs/news/press` to `USEFUL`; raise `TOTAL_CHAR_CAP`; return an SPA-shape signal (`{ …, blockedStatus, spaShaped }`) so the ladder can decide Tier-1 escalation and Tier-2 eligibility.
- `src/protector.js` — CREATE. `detectProtector(headers)` → `'DataDome'|'Cloudflare'|'Akamai'|null` from response headers; used to enrich the block response.
- `src/cache.js` — MODIFY. Idempotent `leads` migration (PRAGMA-guarded); `source` inside `result_json`; source-aware TTL on `get`; `/admin/stats` `by_industry`/`by_type`/`by_region`.
- `src/server.js` — MODIFY. Ladder orchestration + total scan deadline; Tier-2 hardened gate + audit log; per-path cost accounting (Tier 2 no guard); 3-way `zh` + `zh` cache key; emit `source`+`protector`+`blocked`; wire `knowledgeFn`; pass `renderFn` through (absent in Phase B).
- **DELETE:** `src/stub.js`, `test/stub.test.js`.
- Tests: extend `analyze.test.js`, `scrape.test.js`, `cache.test.js`, `server.test.js`; new `categories.test.js`, `knowledge.test.js`, `protector.test.js`, `domain.test.js` (superset export).

---

### Task 1: Delete the dead backend stub

**Files:**
- Delete: `src/stub.js`, `test/stub.test.js`

- [ ] **Step 1: Confirm it's dead** — `grep -rn "stub" src/ | grep -v '//' ` shows only `stub.js` self-references (no importer in `server.js`).
- [ ] **Step 2: Delete both files**
```bash
git rm src/stub.js test/stub.test.js
```
- [ ] **Step 3: Run the suite — still green (was 131, now fewer by the stub tests)**
```bash
npm test 2>&1 | tail -5   # expect pass, 0 fail
```
- [ ] **Step 4: Commit**
```bash
git commit -m "chore: delete dead src/stub.js (hash-seeded fake-result generator; same modulo bug)"
```

---

### Task 2: Export the SSRF CIDR set as the single source of truth

**Files:**
- Modify: `src/domain.js` (add `export const BLOCKED_CIDRS = {...}`; refactor `isBlockedIP` to consume it)
- Test: `test/domain.test.js` (add coverage that the export lists all currently-blocked ranges)

**Interfaces:**
- Produces: `export const BLOCKED_CIDRS = { v4: [['0.0.0.0',8],['10.0.0.0',8],['100.64.0.0',10],['127.0.0.0',8],['169.254.0.0',16],['172.16.0.0',12],['192.168.0.0',16]], v6: ['::1','fe80::/10','fc00::/7'] }` — consumed by Phase C's nftables generator/superset test.

- [ ] **Step 1: Failing test** — in `test/domain.test.js`:
```js
import { BLOCKED_CIDRS, isBlockedIP } from '../src/domain.js';
test('BLOCKED_CIDRS covers every v4 range isBlockedIP rejects', () => {
  for (const [net] of BLOCKED_CIDRS.v4) assert.equal(isBlockedIP(net), true);
  assert.equal(BLOCKED_CIDRS.v4.some(([n]) => n === '100.64.0.0'), true); // CGNAT present
  assert.equal(BLOCKED_CIDRS.v4.some(([n]) => n === '0.0.0.0'), true);
});
```
- [ ] **Step 2: Run — fails** (`BLOCKED_CIDRS` not exported). `node --test test/domain.test.js`
- [ ] **Step 3: Implement** — hoist the CIDR list in `domain.js` into `BLOCKED_CIDRS` and rewrite `isBlockedIP`'s v4 checks to iterate it (keep the v6 `startsWith` logic; add the v6 strings to `BLOCKED_CIDRS.v6` for the export only). Exact code mirrors the existing `inCidr(long,'10.0.0.0',8)||…` chain (`domain.js:100-104`).
- [ ] **Step 4: Run — passes; full suite green**
- [ ] **Step 5: Commit** `git commit -am "refactor(domain): export BLOCKED_CIDRS as SSRF source of truth (for nftables superset)"`

---

### Task 3: Shared category enum + coercion helper

**Files:**
- Create: `src/categories.js`
- Test: `test/categories.test.js`

**Interfaces:**
- Produces: `export const INDUSTRIES = ['retail','legal','healthcare','professional-services','agency','tech-saas','manufacturing','hospitality','real-estate','finance','education','public-sector','ecommerce','other']`; `export const COMPANY_TYPES=['b2b','b2c','mixed']`; `export const REGIONS=['CH','DE','AT','EU','US','other']`; `export function coerceCategory(raw)` → `{ industry, company_type, region }` all guaranteed in-enum (unknown → `'other'`/`'mixed'`/`'other'`), case-insensitive, trims whitespace.

- [ ] **Step 1: Failing test**
```js
import { coerceCategory, INDUSTRIES } from '../src/categories.js';
test('coerces unknown/dirty values into the enum', () => {
  assert.deepEqual(coerceCategory({ industry:'Retail', company_type:'B2B ', region:'Switzerland' }),
                   { industry:'retail', company_type:'b2b', region:'other' });
  assert.deepEqual(coerceCategory({ industry:'law firm' }),
                   { industry:'other', company_type:'mixed', region:'other' });
  assert.equal(INDUSTRIES.includes('legal'), true);
});
```
- [ ] **Step 2: Run — fails.**
- [ ] **Step 3: Implement** `src/categories.js` with the three arrays + `coerceCategory`:
```js
const norm = (v) => String(v || '').trim().toLowerCase();
export function coerceCategory(raw) {
  const r = raw || {};
  const pick = (list, v, dflt) => list.includes(norm(v)) ? norm(v) : dflt;
  return {
    industry: pick(INDUSTRIES, r.industry, 'other'),
    company_type: pick(COMPANY_TYPES, r.company_type, 'mixed'),
    region: (function(){ const u=String(r.region||'').trim().toUpperCase(); return REGIONS.includes(u)?u:'other'; })(),
  };
}
```
- [ ] **Step 4: Run — passes.**
- [ ] **Step 5: Commit** `git commit -am "feat(categories): shared industry/type/region enums + coerceCategory"`

---

### Task 4: Widen analyze schema with coerced categorization

**Files:**
- Modify: `src/analyze.js` (add fields to `SCHEMA` + `SYSTEM` prompt; call `coerceCategory` on the result)
- Test: `test/analyze.test.js` (new cases)

**Interfaces:**
- Consumes: `coerceCategory` (Task 3).
- Produces: `analyze(...)` return gains `industry, company_type, region` (always in-enum). Existing `{ score, verdict, ops, blocked }` unchanged.

- [ ] **Step 1: Failing test** — extend `analyze.test.js`:
```js
test('categorization fields are coerced into the enum', async () => {
  const r = await analyze({ gemini: gem({ ...good, industry:'Law Firm', company_type:'B2B', region:'DE' }), text:'t', lang:'en' });
  assert.equal(r.industry, 'other');   // "Law Firm" not in enum
  assert.equal(r.company_type, 'b2b');
  assert.equal(r.region, 'DE');
});
```
- [ ] **Step 2: Run — fails** (fields absent).
- [ ] **Step 3: Implement** — add `industry/company_type/region` (type `string`) to `SCHEMA.properties`; extend `SYSTEM(lang)` to instruct the model to classify into the exact enums; after existing validation, spread `coerceCategory(r)` into the return object.
- [ ] **Step 4: Run — passes; full suite green.**
- [ ] **Step 5: Commit** `git commit -am "feat(analyze): classify industry/company_type/region (coerced to shared enums)"`

---

### Task 5: SPA-shape signal + deepened, concurrent Tier-0 harvest

**Files:**
- Modify: `src/scrape.js` (USEFUL additions; `TOTAL_CHAR_CAP` 12000→18000; concurrent internal fetch; return `spaShaped` + carry the homepage HTTP status)
- Test: `test/scrape.test.js` (new cases for `pickInternalLinks` + SPA-shape)

**Interfaces:**
- Produces: `scrape(...)` return gains `spaShaped: boolean` (thin extracted text ∧ large raw HTML / root-mount / heavy script). `pickInternalLinks` now also matches `support|faq|help|hilfe|careers|karriere|jobs|news|presse|press`. A helper `isSpaShaped(html, text)` is exported for unit testing.

- [ ] **Step 1: Failing tests**
```js
import { pickInternalLinks, isSpaShaped } from '../src/scrape.js';
test('picks the new useful page types', () => {
  const html = '<a href="/support">Support</a><a href="/careers">Jobs</a><a href="/news">News</a>';
  const links = pickInternalLinks(html, 'https://x.com/', { max: 5 });
  assert.equal(links.some(u=>u.endsWith('/support')), true);
  assert.equal(links.some(u=>u.endsWith('/careers')), true);
});
test('SPA shell = thin text + big html + root mount → spaShaped', () => {
  const shell = '<div id="root"></div>' + '<script>'+'x'.repeat(5000)+'</script>';
  assert.equal(isSpaShaped(shell, 'Loading'), true);
  assert.equal(isSpaShaped('<p>'+'real content '.repeat(80)+'</p>', 'real content '.repeat(80)), false);
});
```
- [ ] **Step 2: Run — fails.**
- [ ] **Step 3: Implement** — add the words to `USEFUL`; bump `TOTAL_CHAR_CAP`; add `export function isSpaShaped(html, text)` (heuristic: `text.replace(/\s+/g,'').length < 800 && (html.length > 12000 || /<div[^>]+id=["'](root|app|__next)["']/i.test(html) || (html.match(/<script/gi)||[]).length >= 8)`); make internal-page fetch concurrent with `Promise.allSettled` (bounded by `maxInternalPages`) instead of the sequential `for` loop (`scrape.js:176-198`) — preserve the budget/skip-on-failure semantics; compute `spaShaped` from the homepage html+text and include it in the return.
- [ ] **Step 4: Run — passes; full suite green** (existing scrape tests must still pass — the concurrent rewrite keeps the same return contract plus `spaShaped`).
- [ ] **Step 5: Commit** `git commit -am "feat(scrape): concurrent deepened harvest + SPA-shape signal"`

---

### Task 6: Protector detection from response headers

**Files:**
- Create: `src/protector.js`; Test: `test/protector.test.js`
- Modify: `src/scrape.js`/`src/server.js` to capture the homepage response headers on a block and pass them through (minimal — the block path).

**Interfaces:**
- Produces: `export function detectProtector(headers)` → `'DataDome'|'Cloudflare'|'Akamai'|null`. Header map is lower-cased keys.

- [ ] **Step 1: Failing test**
```js
import { detectProtector } from '../src/protector.js';
test('names the protector from headers', () => {
  assert.equal(detectProtector({ 'x-datadome':'1' }), 'DataDome');
  assert.equal(detectProtector({ server:'DataDome' }), 'DataDome');
  assert.equal(detectProtector({ 'cf-ray':'abc' }), 'Cloudflare');
  assert.equal(detectProtector({ server:'AkamaiGHost' }), 'Akamai');
  assert.equal(detectProtector({ server:'nginx' }), null);
});
```
- [ ] **Step 2: Run — fails.**
- [ ] **Step 3: Implement** `detectProtector` (check `x-datadome`/`server~DataDome` → DataDome; `cf-ray`/`server~cloudflare` → Cloudflare; `server~Akamai`/`x-akamai*` → Akamai; else null).
- [ ] **Step 4: Run — passes.**
- [ ] **Step 5: Commit** `git commit -am "feat(protector): detect DataDome/Cloudflare/Akamai from response headers"`

*(Wiring the protector into the block response is done in Task 9.)*

---

### Task 7: Recognition-gated knowledge module (Tier 2 payload)

**Files:**
- Create: `src/knowledge.js`; Test: `test/knowledge.test.js`

**Interfaces:**
- Consumes: injected `gemini.generateJSON`, `coerceCategory` (Task 3).
- Produces: `export function makeKnowledge({ gemini })` → `{ analyzeKnowledge({ domain, lang, timeoutMs }) }` returning the RAW model payload validated/coerced: `{ known:boolean, confidence:number, evidence:string, score, verdict, ops:[{t,d,fit}×3], industry, company_type, region }`. The **gate** (known/confidence/name-in-verdict/evidence) lives in `server.js` (Task 8), NOT here — this module only produces a well-formed payload.

- [ ] **Step 1: Failing test**
```js
import { makeKnowledge } from '../src/knowledge.js';
const gem = (obj) => ({ generateJSON: async () => obj });
test('returns coerced, well-formed knowledge payload', async () => {
  const k = makeKnowledge({ gemini: gem({ known:true, confidence:0.9, evidence:'Swiss retail co-op, Basel HQ',
    score:80, verdict:'Coop is a major Swiss retailer.', industry:'Retail', company_type:'B2C', region:'CH',
    ops:[{t:'A',d:'a',fit:'hi'},{t:'B',d:'b',fit:'md'},{t:'C',d:'c',fit:'md'}] }) });
  const r = await k.analyzeKnowledge({ domain:'coop.ch', lang:'en' });
  assert.equal(r.known, true); assert.equal(r.industry, 'retail'); assert.equal(r.ops.length, 3);
});
test('malformed payload → known:false (never throws a fabricated result)', async () => {
  const k = makeKnowledge({ gemini: gem({ confidence:'x', ops:null }) });
  const r = await k.analyzeKnowledge({ domain:'x.de', lang:'en' });
  assert.equal(r.known, false);
});
```
- [ ] **Step 2: Run — fails.**
- [ ] **Step 3: Implement** `knowledge.js` — a defensive `SYSTEM` prompt (recognize genuinely or `known:false`; supply `evidence`); a `SCHEMA` with `known/confidence/evidence/score/verdict/ops/industry/company_type/region`; parse defensively (any validation failure ⇒ `{ known:false }`), coerce ops (reuse the `analyze.js` ops-mapping pattern) + `coerceCategory`.
- [ ] **Step 4: Run — passes.**
- [ ] **Step 5: Commit** `git commit -am "feat(knowledge): recognition-gated public-knowledge payload module"`

---

### Task 8: Idempotent leads migration + source-aware cache TTL + /admin/stats

**Files:**
- Modify: `src/cache.js`; Test: `test/cache.test.js`

**Interfaces:**
- Produces: `leads` gains `industry,company_type,region,source`; `recordLead(domain, outcome, extra?)` accepts optional `{ industry, company_type, region, source }`; `cache.put(lang, domain, out, model)` stores `out.source` inside `result_json`; `cache.get(lang, domain)` applies a **source-aware TTL** (`live`→`CACHE_TTL_DAYS`; `knowledge`→7d; `rendered`→1d) and returns null when stale; `leadStats()` adds `byIndustry/byType/byRegion`.

- [ ] **Step 1: Failing tests**
```js
test('migration is idempotent across reopen on an old-schema DB', () => {
  const db = openCache({ path:':memory:', ttlDays:0 }); // simulate: create, then re-run migration
  db.recordLead('x.de', 'result');
  assert.doesNotThrow(() => db._migrate && db._migrate()); // re-running adds no dup column
});
test('knowledge result expires at 7d regardless of CACHE_TTL_DAYS=0', () => {
  const now = { v: 1_000_000 };
  const db = openCache({ path:':memory:', ttlDays:0, now: () => now.v });
  db.put('en','coop.ch',{ score:80, verdict:'v', ops:[], source:'knowledge' },'m');
  now.v += 6*86400*1000; assert.ok(db.get('en','coop.ch'));           // <7d: hit, still labeled
  assert.equal(db.get('en','coop.ch').source, 'knowledge');
  now.v += 2*86400*1000; assert.equal(db.get('en','coop.ch'), null);  // >7d: expired
});
```
*(If `openCache` doesn't accept an injectable `now`, add it — mirror `costcap.js`'s `today` injection.)*
- [ ] **Step 2: Run — fails.**
- [ ] **Step 3: Implement** —
  - Move the `leads` DDL to include the new columns for fresh DBs, AND add a `migrate()` that reads `PRAGMA table_info(leads)` and `ALTER TABLE leads ADD COLUMN` for any missing of `industry/company_type/region/source`, wrapped per-column in try/catch, **called once after** the `db.exec(CREATE …)` block (not inside it).
  - `put`: include `source` in the stored JSON (it already stores the result object — ensure `source` is a property).
  - `get`: after fetching, read `source` from the parsed JSON, compute max-age (`knowledge`=7d, `rendered`=1d, else `ttlDays`), compare against `scraped_at`; return null if stale.
  - `recordLead(domain, outcome, extra)`: `UPSERT` the category columns when `extra` present.
  - `leadStats()`: add `byIndustry`/`byType`/`byRegion` via `GROUP BY … WHERE col IS NOT NULL` (bucket NULL as `(uncategorized)` in the reducer, following the `COALESCE(SUM,0)` discipline).
- [ ] **Step 4: Run — passes; full suite green** (existing cache tests must still pass — TTL default path unchanged for `live`/absent source).
- [ ] **Step 5: Commit** `git commit -am "feat(cache): idempotent leads migration, source-aware TTL, category stats"`

---

### Task 9: Ladder orchestration — Tier-2 gate, per-path cost, deadline, zh, source/protector

**Files:**
- Modify: `src/server.js`; Test: `test/server.test.js`
- Modify: `src/errors.js` if a new soft outcome label is needed (reuse existing codes where possible).

**Interfaces:**
- Consumes: `knowledgeFn` (new injected dep wrapping `makeKnowledge`), `renderFn` (injected, **may be undefined in Phase B**), `detectProtector`, `scrape`'s `spaShaped`+`blockedStatus`.
- Produces: response bodies now may carry `source:"live"|"rendered"|"knowledge"`, `blocked:true`, `protector:"…"`; the cache-hit reply carries `source`; leads recorded with categories; `zh` handled as its own language + cache key.

- [ ] **Step 1: Failing tests** (extend `test/server.test.js`, using the injected-fn harness):
```js
test('Tier-0 miss + knowledge gate PASS → 200 source=knowledge, blocked', async () => {
  const { app } = build({
    scrapeFn: async () => { const e=new Error('blocked'); e.code='FETCH_FAILED'; e.blockedStatus=403; e.headers={'x-datadome':'1'}; throw e; },
    knowledgeFn: async () => ({ known:true, confidence:0.9, evidence:'Basel HQ, Swiss retail', verdict:'Coop is a Swiss retailer coop.ch', score:80, industry:'retail', company_type:'b2c', region:'CH', ops:[{t:'A',d:'a',fit:'hi'},{t:'B',d:'b',fit:'md'},{t:'C',d:'c',fit:'md'}] }),
  });
  const res = await call(app, '/api/scan?url=coop.ch&lang=en');
  assert.equal(res.status, 200); const b = JSON.parse(res.body);
  assert.equal(b.source, 'knowledge'); assert.equal(b.blocked, true);
});
test('knowledge gate FAIL (unknown) → honest block CTA, no fabricated body', async () => {
  const { app } = build({
    scrapeFn: async () => { const e=new Error('blocked'); e.code='FETCH_FAILED'; e.blockedStatus=403; e.headers={'server':'DataDome'}; throw e; },
    knowledgeFn: async () => ({ known:false, confidence:0.2 }),
  });
  const res = await call(app, '/api/scan?url=nobody-knows.de&lang=en');
  assert.ok(res.status >= 400); const b = JSON.parse(res.body);
  assert.equal(b.blocked, true); assert.equal(b.protector, 'DataDome'); assert.equal(b.source, undefined);
});
test('knowledge NOT attempted when Tier-0 failed WITHOUT a real block (thin/NXDOMAIN)', async () => {
  let called = false;
  const { app } = build({ scrapeFn: async () => { throw new (await import('../src/errors.js')).ScanError('THIN_CONTENT'); },
                          knowledgeFn: async () => { called = true; return { known:true, confidence:1 }; } });
  const res = await call(app, '/api/scan?url=empty.de&lang=en');
  assert.equal(called, false);   // no real 403 → Tier 2 ineligible
  assert.equal(res.status, 422);
});
test('cache hit re-serves source=knowledge (banner survives)', async () => {
  const { app, cache } = build({ /* same as pass case */ });
  await call(app, '/api/scan?url=coop.ch&lang=en');
  const res2 = await call(app, '/api/scan?url=coop.ch&lang=en');
  assert.equal(JSON.parse(res2.body).source, 'knowledge');
});
test('zh has its own cache key (does not return an en body)', async () => {
  const { app } = build({ analyzeFn: async ({lang}) => ({ score:80, verdict:'lang='+lang, ops:[{t,d,fit}] }) });
  const en = JSON.parse((await call(app,'/api/scan?url=x.de&lang=en')).body);
  const zh = JSON.parse((await call(app,'/api/scan?url=x.de&lang=zh')).body);
  assert.notEqual(en.verdict, zh.verdict); // different cache entries
});
```
- [ ] **Step 2: Run — fails.**
- [ ] **Step 3: Implement in `server.js`** —
  - **Lang:** `const lang = ({de:'de',en:'en',zh:'zh'})[raw] || 'en'`; cache key already includes `lang` (`cache.get(lang, domain)`) so `zh` separates automatically. Pass `lang` to `analyzeFn`/`knowledgeFn`.
  - **Deadline:** at handler start, `const deadline = Date.now() + config.scanDeadlineMs` (add `SCAN_DEADLINE_MS` default 24000 to config); before starting Tier 1 or Tier 2, if `Date.now() > deadline` short-circuit to the honest CTA.
  - **Ladder:** wrap the Tier-0 `scrapeFn` call; on success → guard + analyze (reserves: 2), record lead with categories, `source:'live'`, cache with `source`. On a Tier-0 throw, inspect: capture `blockedStatus`/`headers`/`code`. If `renderFn` is defined and `spaShaped`/403 → Tier 1 (Phase C); else fall through. **Tier 2 eligibility:** only if the Tier-0 failure was a real block (`code==='FETCH_FAILED'` with `blockedStatus===403`, or `BLOCKED`) — NOT `THIN_CONTENT`/NXDOMAIN. If eligible: `costcap.reserve()` (1, **no guard** — no scraped text), call `knowledgeFn`, apply the **gate**: `known===true && confidence>=0.8 && verdictIncludesRegistrableName(domain, payload.verdict) && payload.evidence` → build `{ source:'knowledge', blocked:true, score, verdict, ops }`, **audit-log** `{domain, evidence, confidence}` (via `console.log('[scan] knowledge', …)` or a `cache.recordLead` extra), record lead with categories + `source:'knowledge'`, cache it, return 200. Gate fail → honest block error with `blocked:true` + `protector: detectProtector(headers)`.
  - **Block response:** the honest CTA path returns the existing error status but the body gains `blocked:true` and `protector`. Extend `errorResponse` usage: after computing `code`, if it's a block, merge `{ blocked:true, protector }` into the reply body (a small change to the catch-all `reply(...)`).
  - **`verdictIncludesRegistrableName`:** helper — the domain's registrable label (strip TLD) appears (case-insensitive) in the verdict.
- [ ] **Step 4: Run — passes; full suite green.**
- [ ] **Step 5: Commit** `git commit -am "feat(server): ladder orchestration — Tier-2 hardened gate, per-path cost, deadline, zh, source/protector"`

---

### Task 10: Wire the real dependencies + config + full-suite verification

**Files:**
- Modify: `src/server.js` (the real `createApp({...})` bootstrap at `:472`); `src/config.js` (`scanDeadlineMs`).
- Modify: `.env.example` (document `SCAN_DEADLINE_MS`, `RENDER_URL` (unset in Phase B)).

- [ ] **Step 1: Wire `knowledgeFn`** in the production bootstrap: `knowledgeFn: ({ domain, lang }) => makeKnowledge({ gemini }).analyzeKnowledge({ domain, lang, timeoutMs: config.analysisTimeoutMs })`. Leave `renderFn` unset (Phase C).
- [ ] **Step 2: Add `scanDeadlineMs`** to `config.js` (`SCAN_DEADLINE_MS`, default 24000).
- [ ] **Step 3: Run the FULL suite** `npm test 2>&1 | tail -8` — expect all pass, 0 fail.
- [ ] **Step 4: Smoke the real endpoint locally** (optional, needs a `GEMINI_API_KEY`): `npm start` then `curl 'localhost:8790/api/scan?url=codify.ch&lang=zh'` → 200 with a Chinese verdict; `curl 'localhost:8790/api/scan?url=coop.ch&lang=en'` → either a 200 `source:knowledge` (if the model knows Coop) or a `blocked:true, protector:"DataDome"` CTA body — never a fabricated live result.
- [ ] **Step 5: Commit** `git commit -am "feat(server): wire knowledgeFn + scan deadline; document RENDER_URL (Phase C)"`

---

### Task 11: Verify Caddy overwrites X-Forwarded-For (documentation/ops check)

**Files:**
- Modify: `README.md` (deploy runbook — add an XFF note); no code.

- [ ] **Step 1:** Add a runbook line: the per-IP rate limit reads `x-forwarded-for[0]` (`server.js:204`), which is the only per-attacker gate on the (Phase C) render fan-out; confirm the Caddyfile reverse-proxy **sets/overwrites** `X-Forwarded-For` (Caddy's `reverse_proxy` does by default) rather than trusting a client-supplied header. Note to re-verify when Phase C lands.
- [ ] **Step 2: Commit** `git commit -am "docs: note XFF-overwrite requirement for the per-IP limit (render fan-out gate)"`

---

## Self-Review (plan vs spec)

- **Tier 2 hardened gate + audit log** (spec §Tier 2): Tasks 7 (payload) + 9 (gate: real-403 eligibility + `known` + `confidence≥0.8` + name-in-verdict + evidence + audit log) — covered.
- **Deepened Tier-0 + SPA-shape** (spec §Tier 0): Task 5 (concurrent harvest, USEFUL additions, `TOTAL_CHAR_CAP`, `isSpaShaped`) — covered; the escalation predicate is SPA-shape not char-count.
- **Widened + coerced schema, shared constant** (spec §Categorization, enum-only after review): Tasks 3 (constant + coerce) + 4 (analyze) — covered; `size_estimate`/`industry_detail` correctly **absent** per Decision 6.
- **Idempotent migration + source-aware TTL + /admin/stats** (spec §Caching, §Storage, §Reporting): Task 8 — covered (PRAGMA-guarded ALTER outside the always-run exec; 7d knowledge TTL; NULL-safe aggregations; no `by_size`).
- **`source` in `scans.result_json` + cache-hit banner survives** (spec §Caching #1): Task 8 (`put`/`get`) + Task 9 (cache-hit reply includes `source`; test asserts re-scan still `knowledge`) — covered.
- **Per-path cost, Tier 2 no guard** (spec §Cost accounting): Task 9 (Tier 2 reserves 1, no guardFn call; categorization rides inside analyze = 0 extra) — covered.
- **Protector detection + block body** (spec §Honest blocked-CTA): Tasks 6 + 9 — covered.
- **Delete `src/stub.js`** (spec §bug fixes / Decision 4): Task 1 — covered.
- **3-way `zh` + own cache key** (spec §bug 3): Task 9 (lang map + separate cache entry test) — covered. The `zh` analysis-*body* language is the open owner decision; default here is option (a) (pass `zh` to prompts) — flagged, and the test asserts separation regardless.
- **Total scan deadline** (spec §Latency budget): Task 9 (deadline short-circuit) — covered.
- **BLOCKED_CIDRS export for Phase C superset** (spec §SSRF layer 2): Task 2 — covered.
- **XFF overwrite** (spec review gap): Task 11 — covered (doc/ops).
- **Placeholder scan:** every task has concrete test + implementation code or an exact algorithm; the `openCache({now})` injection is called out explicitly where needed.
- **Type/name consistency:** `coerceCategory`, `INDUSTRIES/COMPANY_TYPES/REGIONS`, `isSpaShaped`, `detectProtector`, `makeKnowledge().analyzeKnowledge`, `knowledgeFn`, `renderFn`, `BLOCKED_CIDRS`, `verdictIncludesRegistrableName`, `spaShaped`, `blockedStatus`, `source` used consistently across Tasks 2–10.
