# Scan Phase A — Frontend Honesty Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the homepage scan widget truthful — delete the fabricated stub, route every result state off HTTP status + an optional `source` field, add the mandatory public-knowledge banner slot, honest protector-aware blocked-CTA (DE/EN/中文), and fix the animation-clobbers-error race — so the reported fake "88 AGENT-FIT" / single-card bug is gone and no code path can render invented data.

**Architecture:** Pure static-site change in the `website` repo (`js/extras.js`, `index.html`, `js/translations.js`). The frontend becomes a thin renderer: it inspects the fetch Response (status + JSON body) and picks one of four states. Phase A depends on **no** new backend fields — it routes off HTTP status + `error` code that exist today; `source`/`blocked` are consumed opportunistically (Phase B adds them) but their absence degrades to a correct result. Verification uses a **self-contained fetch-stub harness** run in headless Chrome (the repo has no test runner and we won't add one).

**Tech Stack:** Vanilla ES5-style JS (matches existing `extras.js`), no build step, no dependencies. Verification via `python3 -m http.server` + Claude-in-Chrome browser automation, plus a throwaway harness HTML in the scratchpad that stubs `window.fetch`.

## Global Constraints

- Repo is a **static site with no build and no runtime dependencies** — do NOT add a test framework, bundler, or npm dependency. (`website/CLAUDE.md`)
- `extras.js` is guarded on element presence and written in ES5-ish style (`var`, function expressions, no arrow/`const`) — match it exactly.
- i18n: three languages DE (canonical) / EN / 中文 (`zh`). Untranslated UI falls back to **English**, not German. New user-facing strings go in `js/translations.js` under `bw.scan.*` in all three blocks. (`website/CLAUDE.md`)
- If any new Tailwind utility class is introduced in HTML/JS, re-run `./tailwind/build.sh` and commit `css/tailwind.css`. (Phase A adds no new utility classes — reuse existing `.btn`/`.btn--pri`/`.az-*`.)
- **Never render fabricated data on any path.** Service-down / block / thin → honest message. (spec Decision 4)
- Do NOT push or deploy. Commit to the current branch (`docs/scan-fallback-ladder-spec`) only.
- Reference: `website/docs/superpowers/specs/2026-07-06-scan-fetch-fallback-ladder-design.md` (§Frontend result states, §The frontend bug fixes, §Latency budget). This plan is authoritative for steps; the spec for rationale.

## File Structure

- `website/js/extras.js` — MODIFY. Remove `stubCompany()` + `POOL_EN/DE/ZH` (`:45-106`); rewrite the submit handler's fetch-outcome branching to be status-first with 4 render states; add `renderBanner()`/`renderBlocked()` helpers; fix the animation-cancel race by resolving `animP` when `scanP` settles.
- `website/index.html` — MODIFY. Add a `#az-banner` slot above `#az-report` (`:168`); the blocked-CTA reuses `#az-console` (current behavior).
- `website/js/translations.js` — MODIFY. Add `bw.scan.banner.knowledge`, `bw.scan.blocked.generic`, `bw.scan.blocked.named`, `bw.scan.blocked.cta`, `bw.scan.unavailable` in the DE (~85), EN (~250), 中文 (~413) blocks.
- `scratchpad/phaseA-harness.html` — CREATE (throwaway, not committed). Loads `extras.js` against a stubbed `fetch` to assert DOM outcomes headlessly.

---

### Task 1: Verification harness (fetch-stub) + capture the current buggy behavior

**Files:**
- Create: `/private/tmp/claude-501/-Users-wuesteon-PROJECTS-website/b50affbd-97a3-4973-b302-a03b709c1ed6/scratchpad/phaseA-harness.html` (throwaway)

**Interfaces:**
- Produces: a headless-runnable page exposing `window.__runCase(fixture)` that resets the scan DOM, stubs `window.fetch` to resolve/reject with a given `{status, body}` or network error, submits the form, waits for settle, and writes a JSON verdict object to `#result` (`{ reportShown, bannerText, consoleText, scoreText, opCount, sawCompleteLine }`). This is the assertion surface for Tasks 3–7.

- [ ] **Step 1: Write the harness that reproduces today's bug (report a fake result on 502)**

Create the harness embedding the *current* scan markup (copy `#az-*` structure from `index.html:166-174`), loading `../js/translations.js` and `../js/extras.js` via relative `file://`… — but since `file://` cross-origin can block, serve the repo root with `python3 -m http.server 8000` and load the harness by absolute path is not possible (it's outside the repo). Instead: place the harness INSIDE the repo at `website/scratchpad-phaseA.html` (gitignored — `scratchpad/` is already in `.gitignore`; add `scratchpad-phaseA.html` too), so it can `<script src="js/extras.js">` same-origin under the local server.

Harness body (key logic):

```html
<script>
window.__cases = {
  http502: { kind:'resolve', status:502, body:{error:'FETCH_FAILED', message:'x'} },
  http200live: { kind:'resolve', status:200, body:{score:88, verdict:'v', ops:[{t:'a',d:'d',fit:'hi'},{t:'b',d:'d',fit:'md'},{t:'c',d:'d',fit:'md'}]} },
  http200knowledge:{ kind:'resolve', status:200, body:{score:80, verdict:'v', source:'knowledge', blocked:true, ops:[{t:'a',d:'d',fit:'hi'},{t:'b',d:'d',fit:'md'},{t:'c',d:'d',fit:'md'}]} },
  http429daily:{ kind:'resolve', status:429, body:{error:'DAILY_LIMIT', message:'x'} },
  neterr:  { kind:'reject' }
};
window.__runCase = function(name){
  var c = window.__cases[name];
  window.fetch = function(){ return c.kind==='reject'
    ? Promise.reject(new TypeError('network'))
    : Promise.resolve({ ok:c.status>=200&&c.status<300, status:c.status, json:function(){return Promise.resolve(c.body);} }); };
  // reset DOM (clear #az-console, hide #az-report/#az-banner), set #az-url, submit #az-form
  // then poll until #az-run is re-enabled OR 11s, then write verdict JSON to #result
};
</script>
```

Motion-reduce forced ON in the harness (`matchMedia` stub returning `matches:true`) so cases resolve fast and deterministically without the 9s animation.

- [ ] **Step 2: Run the harness against current `extras.js` and confirm the bug**

Serve + drive in headless Chrome:
```bash
cd /Users/wuesteon/PROJECTS/website && python3 -m http.server 8000  # background
```
Load `http://localhost:8000/scratchpad-phaseA.html`, call `__runCase('http502')`, read `#result`.
Expected (BUG, pre-fix): `reportShown:true, scoreText:"88", opCount:1` — i.e. a **fake report with one card on a 502**. This documents the regression the fix must eliminate.

- [ ] **Step 3: Add the harness filename to `.gitignore`**

```bash
grep -q 'scratchpad-phaseA.html' .gitignore || printf 'scratchpad-phaseA.html\n' >> .gitignore
```

- [ ] **Step 4: Commit the ignore rule only** (harness stays uncommitted)

```bash
git add .gitignore && git commit -m "chore: gitignore Phase A verification harness"
```

---

### Task 2: Add the `#az-banner` slot to the report markup

**Files:**
- Modify: `website/index.html:168` (insert a sibling before `#az-report`)

**Interfaces:**
- Produces: an empty, hidden `#az-banner` element that `renderBanner()` (Task 5) fills and shows; sits above `#az-report` inside `#az-out`.

- [ ] **Step 1: Insert the banner container**

In `index.html`, between `#az-console` (`:167`) and `#az-report` (`:168`), add:

```html
            <div class="az-banner" id="az-banner" style="display:none"></div>
```

- [ ] **Step 2: Add minimal styling for the banner in `css/styles.css`**

Reuse the terminal/warn palette already used by the widget (match existing `.az-*` rules — find the `.az-report` block and add nearby):

```css
.az-banner{display:none;margin:0 0 14px;padding:10px 14px;border:1px solid var(--warn,#e0b341);
  border-radius:8px;background:rgba(224,179,65,.08);color:var(--warn,#e0b341);font-size:.85rem;line-height:1.5;}
```

(Uses a CSS variable with a literal fallback — no new Tailwind class, so no `build.sh` needed.)

- [ ] **Step 3: Verify it renders hidden by default** — reload the harness page; `#az-banner` present, `display:none`. No commit yet (paired with Task 5's logic); or commit the inert markup now:

```bash
git add index.html css/styles.css && git commit -m "feat(scan): add hidden #az-banner slot above the report"
```

---

### Task 3: Delete the fabricated stub + route 502/blocked to an honest message (the core bug fix)

**Files:**
- Modify: `website/js/extras.js` — remove `POOL_EN`/`POOL_DE`/`POOL_ZH` and `stubCompany()` (`:45-106`); change the fetch `.catch` so non-soft errors no longer return a stub.

**Interfaces:**
- Consumes: `window.__runCase` (Task 1).
- Produces: on a `502`/network error, the widget shows an honest message in `#az-console` and **never** a report; `opCount:0`, `reportShown:false`.

- [ ] **Step 1: Write the failing assertion (via harness)**

Drive `__runCase('http502')`, read `#result`. Desired: `reportShown:false, scoreText:"" , opCount:0, consoleText` contains the honest "live scan unavailable / book a call" copy. Pre-change this FAILS (still shows the fake report from Task 1 Step 2).

- [ ] **Step 2: Delete the stub data + function**

Remove `POOL_EN` (`extras.js:45-53`), `POOL_DE` (`:54-62`), `POOL_ZH` (`:63-71`) and `stubCompany()` (`:100-106`). Keep `pool()`/`label()`/`verdictText()` only if still referenced; the ops-render uses `label(o.fit)` (`extras.js:235`) so **keep `label()`**, and it reads localized pool text — but ops now come from the backend, so `pool()`/`verdictText()`/the `POOL_*` are unused → delete `pool()` and `verdictText()` too. (Grep after deletion: `grep -n 'POOL_\|stubCompany\|verdictText\|pool()' js/extras.js` must return nothing.)

- [ ] **Step 3: Rewrite the fetch `.catch` to stop returning a stub**

Replace (`extras.js:182-187`):
```js
var scanP = fetchScan(domain).catch(function(err){
  if(err && err.soft){ throw err; }
  if(typeof umami!=='undefined'){ try{ umami.track('scan-fallback',{status:err&&err.status}); }catch(e){} }
  console.warn('[scan] fallback', err && (err.status||err.message));
  return stubCompany(domain);
});
```
with:
```js
var scanP = fetchScan(domain).catch(function(err){
  // network error / edge 5xx with no soft body → honest "unavailable", never a stub
  if(err && err.soft){ throw err; }
  if(typeof umami!=='undefined'){ try{ umami.track('scan-fallback',{status:err&&err.status}); }catch(e){} }
  console.warn('[scan] unavailable', err && (err.status||err.message));
  var e2 = new Error('unavailable'); e2.soft = true; e2.code = 'UNAVAILABLE';
  e2.message = unavailableMessage(); throw e2;
});
```
Add helper near `softMessage` (`extras.js:155`):
```js
function unavailableMessage(){
  var l=lang();
  if(typeof getTranslation==='function'){ var t=getTranslation('bw.scan.unavailable'); if(t) return t; }
  if(l==='de') return 'Der Live-Scan ist gerade nicht erreichbar. Bitte später erneut versuchen — oder direkt ein Gespräch buchen.';
  if(l==='zh') return '实时扫描暂时不可用。请稍后再试——或直接预约一次通话。';
  return "The live scan is temporarily unavailable. Please try again later — or just book a call.";
}
```
Now `fetchScan`'s non-ok branch (`extras.js:150`) throws a non-soft error → caught here → converted to a soft `UNAVAILABLE` → falls into the existing `.catch` at `extras.js:215` which paints `#az-console`. **Note:** `FETCH_FAILED` (502) currently hits `extras.js:150` `if(!res.ok)`. Task 4 makes the honest-block copy protector-aware; for now the UNAVAILABLE path is honest and correct.

- [ ] **Step 4: Run the harness — 502 now honest, no fake report**

`__runCase('http502')` → `reportShown:false, opCount:0`, console shows the unavailable copy. `__runCase('http200live')` still renders a real 3-card report (`opCount:3, scoreText:"88"`). PASS.

- [ ] **Step 5: Commit**

```bash
git add js/extras.js && git commit -m "fix(scan): delete fabricated stub; 502/network → honest message, never a fake result"
```

---

### Task 4: Distinguish hard-block (bot protection) from generic-unavailable + protector-aware CTA

**Files:**
- Modify: `website/js/extras.js` — in `fetchScan`, treat `FETCH_FAILED`/`BLOCKED` bodies (and any `blocked:true`) as a soft "blocked" case with the personal-outreach CTA; add `blockedMessage()`.
- Modify: `website/js/translations.js` — add `bw.scan.blocked.generic`, `bw.scan.blocked.named`, `bw.scan.blocked.cta` (Task 6 fills copy; keys referenced here).

**Interfaces:**
- Consumes: response JSON that MAY carry `error` (`FETCH_FAILED`/`BLOCKED`), `blocked:true`, and (Phase B) a `protector` string.
- Produces: on a block, `#az-console` shows "site sits behind bot protection — I look at those personally" + a "Book a call" button linking `#contact`.

- [ ] **Step 1: Failing assertion**

Add harness case `http502blocked: {status:502, body:{error:'FETCH_FAILED', message:'x', blocked:true, protector:'DataDome'}}`. Drive it → expect `consoleText` contains the *named-protector* blocked copy and a `#contact` CTA anchor exists. Also `http502` (no `blocked`, no `protector`) → generic "bot protection" copy (we treat `FETCH_FAILED` as a probable block). Pre-change FAILS (both show the generic UNAVAILABLE copy).

- [ ] **Step 2: Branch FETCH_FAILED/BLOCKED into a blocked-soft case in `fetchScan`**

In `fetchScan` (`extras.js:140-152`), after reading `res`, before the generic `!res.ok`:
```js
return res.json().then(function(b){
  if(res.status===451 || res.status===422 || res.status===429){
    var e=new Error('soft'); e.soft=true; e.status=res.status; e.code=b.error; e.message=softMessage(res.status,b); throw e;
  }
  if(res.status>=200 && res.status<300){ return b; }
  // non-2xx with a JSON body: treat FETCH_FAILED / BLOCKED / any blocked:true as a bot-protection block
  if(b && (b.error==='FETCH_FAILED' || b.error==='BLOCKED' || b.blocked===true)){
    var eb=new Error('blocked'); eb.soft=true; eb.status=res.status; eb.code='BLOCKED_SITE';
    eb.blocked=true; eb.message=blockedMessage(b && b.protector); throw eb;
  }
  var e2=new Error('http '+res.status); e2.status=res.status; throw e2; // → UNAVAILABLE in outer catch
});
```
(Requires reworking `fetchScan` to always `res.json()` first; guard for a body-less response with `.json().catch(function(){return {};})`.)

Add:
```js
function blockedMessage(protector){
  var l=lang(), key = protector ? 'bw.scan.blocked.named' : 'bw.scan.blocked.generic';
  var tmpl = (typeof getTranslation==='function') ? getTranslation(key) : '';
  if(tmpl){ return tmpl.replace('{protector}', protector||'').replace('{domain}', currentDomain); }
  // literal fallbacks
  if(l==='de') return protector ? ('Diese Seite sitzt hinter Bot-Schutz ('+protector+') — automatisierte Analysen werden blockiert. Genau solche Fälle schaue ich mir persönlich an.')
                                : 'Diese Seite blockiert automatisierte Analysen (Bot-Schutz). Genau solche Fälle schaue ich mir persönlich an.';
  if(l==='zh') return protector ? ('该网站位于机器人防护（'+protector+'）之后——自动分析被拦截。这类情况我会亲自来看。')
                                : '该网站屏蔽了自动分析（机器人防护）。这类情况我会亲自来看。';
  return protector ? ('This site sits behind bot protection ('+protector+') — automated scans are blocked. I look at cases like this personally.')
                   : 'This site blocks automated scanning (bot protection). I look at cases like this personally.';
}
```
Capture `currentDomain` at submit time (set `currentDomain = domain;` in the submit handler after `cleanDomain`).

- [ ] **Step 3: Render a Book-a-call CTA for the blocked case in the outer `.catch`**

In the `.catch` at `extras.js:215-226`, the `DAILY_LIMIT` branch already appends a CTA. Generalize: append the same CTA when `err.code==='BLOCKED_SITE'` OR `err.code==='DAILY_LIMIT'`:
```js
if(err.code==='DAILY_LIMIT' || err.code==='BLOCKED_SITE'){
  var cta = (typeof getTranslation==='function' && getTranslation('bw.scan.blocked.cta')) ||
            (lang()==='de'?'GESPRÄCH BUCHEN ▸':(lang()==='zh'?'预约通话 ▸':'BOOK A CALL ▸'));
  html += '<div style="margin-top:14px"><a href="#contact" class="btn btn--pri">'+cta+'</a></div>';
}
```

- [ ] **Step 4: Run harness — blocked cases show honest protector-aware copy + CTA**

`http502blocked` → named copy ("…(DataDome)…") + `#contact` CTA. `http502` → generic block copy + CTA. `http200live` → still a real report. `neterr` → UNAVAILABLE copy (no CTA needed, but harmless if present). PASS.

- [ ] **Step 5: Commit**

```bash
git add js/extras.js && git commit -m "feat(scan): honest protector-aware bot-protection message + book-a-call CTA on block"
```

---

### Task 5: Render the mandatory public-knowledge banner on `source:"knowledge"`

**Files:**
- Modify: `website/js/extras.js` — in `finish()`, show `#az-banner` with the knowledge copy iff `data.source==='knowledge'`, else keep it hidden.

**Interfaces:**
- Consumes: a `200` body with `source:"knowledge"` (Phase B emits it; Phase A renders it).
- Produces: when `source:"knowledge"`, the banner is visible above the report with the "based on public info, not a live scan" copy; for `live`/`rendered`/absent, banner stays hidden.

- [ ] **Step 1: Failing assertion**

`__runCase('http200knowledge')` → expect `bannerText` contains the knowledge copy AND `reportShown:true` AND `opCount:3`. `__runCase('http200live')` → `bannerText:""` (hidden). Pre-change FAILS (no banner logic).

- [ ] **Step 2: Add banner rendering in `finish()`**

In `finish()` (`extras.js:229`), after setting target/verdict, before rendering ops:
```js
var banner=document.getElementById('az-banner');
if(banner){
  if(data.source==='knowledge'){
    banner.textContent = (typeof getTranslation==='function' && getTranslation('bw.scan.banner.knowledge')) || knowledgeBannerFallback();
    banner.style.display='block';
  } else { banner.style.display='none'; banner.textContent=''; }
}
```
Add:
```js
function knowledgeBannerFallback(){
  var l=lang();
  if(l==='de') return 'Diese Website blockiert automatisierte Analysen — daher basiert dieses Ergebnis auf öffentlich verfügbaren Informationen, nicht auf einem Live-Scan.';
  if(l==='zh') return '该网站屏蔽了自动扫描——因此本结果基于公开可得的信息，而非对网站的实时扫描。';
  return "This site blocks automated scanning — so this result is based on publicly available information, not a live scan of the site.";
}
```

- [ ] **Step 3: Ensure the banner is reset between scans**

At submit time (where `report.style.display='none'` is set, `extras.js:181`), also hide the banner:
```js
var _b=document.getElementById('az-banner'); if(_b){ _b.style.display='none'; _b.textContent=''; }
```

- [ ] **Step 4: Run harness — knowledge banner appears only for knowledge**

`http200knowledge` → banner visible + report shown; `http200live` → banner hidden. PASS.

- [ ] **Step 5: Commit**

```bash
git add js/extras.js && git commit -m "feat(scan): mandatory public-knowledge banner on source=knowledge results"
```

---

### Task 6: Add the DE/EN/中文 i18n strings

**Files:**
- Modify: `website/js/translations.js` — DE block (~line 85), EN (~250), 中文 (~413).

**Interfaces:**
- Produces: `bw.scan.banner.knowledge`, `bw.scan.blocked.generic`, `bw.scan.blocked.named` (with `{protector}` placeholder), `bw.scan.blocked.cta`, `bw.scan.unavailable` in all three blocks. `getTranslation()` falls back to EN for any missing key.

- [ ] **Step 1: Add the five keys to the DE block** (after `bw.scan.ctaBtn`, `:96`)

```js
    "bw.scan.banner.knowledge": "Diese Website blockiert automatisierte Analysen — daher basiert dieses Ergebnis auf öffentlich verfügbaren Informationen, nicht auf einem Live-Scan.",
    "bw.scan.blocked.generic": "Diese Seite blockiert automatisierte Analysen (Bot-Schutz). Genau solche Fälle schaue ich mir persönlich an — buch dir ein Gespräch.",
    "bw.scan.blocked.named": "Diese Seite sitzt hinter Bot-Schutz ({protector}) — automatisierte Analysen werden blockiert. Genau solche Fälle schaue ich mir persönlich an — buch dir ein Gespräch.",
    "bw.scan.blocked.cta": "GESPRÄCH BUCHEN ▸",
    "bw.scan.unavailable": "Der Live-Scan ist gerade nicht erreichbar. Bitte später erneut versuchen — oder direkt ein Gespräch buchen.",
```

- [ ] **Step 2: Add to the EN block** (after `bw.scan.ctaBtn`, `:260`)

```js
    "bw.scan.banner.knowledge": "This site blocks automated scanning — so this result is based on publicly available information, not a live scan of the site.",
    "bw.scan.blocked.generic": "This site blocks automated scanning (bot protection). I look at cases like this personally — book a call.",
    "bw.scan.blocked.named": "This site sits behind bot protection ({protector}) — automated scans are blocked. I look at cases like this personally — book a call.",
    "bw.scan.blocked.cta": "BOOK A CALL ▸",
    "bw.scan.unavailable": "The live scan is temporarily unavailable. Please try again later — or just book a call.",
```

- [ ] **Step 3: Add to the 中文 block** (after `bw.scan.ctaBtn`, `:423`)

```js
    "bw.scan.banner.knowledge": "该网站屏蔽了自动扫描——因此本结果基于公开可得的信息，而非对网站的实时扫描。",
    "bw.scan.blocked.generic": "该网站屏蔽了自动分析（机器人防护）。这类情况我会亲自来看——欢迎预约通话。",
    "bw.scan.blocked.named": "该网站位于机器人防护（{protector}）之后——自动分析被拦截。这类情况我会亲自来看——欢迎预约通话。",
    "bw.scan.blocked.cta": "预约通话 ▸",
    "bw.scan.unavailable": "实时扫描暂时不可用。请稍后再试——或直接预约一次通话。",
```

- [ ] **Step 4: Verify all three languages resolve**

In the harness, switch `localStorage` lang to each of `de`/`en`/`zh`, re-run `http502blocked` and `http200knowledge`; confirm the console/banner text is in the selected language (and `zh` shows Chinese, not English fallback).

- [ ] **Step 5: Commit**

```bash
git add js/translations.js && git commit -m "i18n(scan): banner/blocked/unavailable strings (DE/EN/中文)"
```

---

### Task 7: Fix the animation-clobbers-error race

**Files:**
- Modify: `website/js/extras.js` — resolve/cancel the typing animation the moment `scanP` settles, so a fast error paints immediately and "✓ analysis complete" never appears on an error.

**Interfaces:**
- Consumes: the animation closure's `done` flag + `fin()` resolver (`extras.js:197-210`).
- Produces: on a fast soft error, `#az-console` shows the honest message and the success line ("✓ analysis complete" / "✓ Analyse abgeschlossen" / "✓ 分析完成") is never written.

- [ ] **Step 1: Failing assertion**

Add a harness case that resolves the fetch **rejection fast** but leaves REDUCED-motion OFF (so the animation would otherwise run ~9s). Assert: within ~1s the honest message is shown AND `sawCompleteLine:false`. Pre-change FAILS (message waits up to 9s and/or the done line appears). *(Note: harness must NOT force reduced-motion for this one case.)*

- [ ] **Step 2: Expose a cancel handle from the animation and trigger it on settle**

Change the animation Promise (`extras.js:197-211`) to store `fin` on an outer var:
```js
var cancelAnim=null;
if(REDUCED){ /* unchanged */ animP=Promise.resolve(); }
else {
  animP=new Promise(function(resolve){
    var done=false, fin=function(){ if(done) return; done=true; resolve(); };
    cancelAnim=fin;                       // <-- expose
    /* …existing typing loop… */
    setTimeout(fin, 9000);
  });
}
// settle the animation as soon as the fetch settles (success OR error)
scanP.then(function(){ if(cancelAnim) cancelAnim(); }, function(){ if(cancelAnim) cancelAnim(); });
```
This makes `Promise.all([scanP, animP])` resolve promptly on a fast result instead of waiting up to 9s. The success `.then` still writes the done line only on success (`extras.js:213`), the error `.catch` writes the honest message — cancelling the animation first prevents the typing loop from clobbering it.

- [ ] **Step 3: Guard the typing loop against writing after cancel**

The loop already checks `if(done) return;` at the top of `type()` (`extras.js:201`) — confirm the final `con.innerHTML=buf` write can't land after `fin()`. Since `fin()` sets `done=true` synchronously and the next `type()` tick early-returns, the last partial write may still be present; so on the error path, the `.catch` sets `con.innerHTML=html` (`extras.js:224`) which OVERWRITES it. Confirm ordering: `Promise.all(...).catch` runs after both settle → paints last. Good. (No code change if confirmed; else move the error paint into the `cancelAnim` continuation.)

- [ ] **Step 4: Run harness — fast error paints immediately, no done line**

Fast-reject case → honest message within ~1s, `sawCompleteLine:false`. `http200live` (motion on) → still animates then shows the report + done line. PASS.

- [ ] **Step 5: Commit**

```bash
git add js/extras.js && git commit -m "fix(scan): cancel typing animation on fetch settle so errors aren't clobbered"
```

---

### Task 8: Full end-to-end verification in real Chrome + against the live backend

**Files:** none (verification only).

- [ ] **Step 1: Drive the REAL page (not the harness) with a stubbed fetch for all 5 states**

Serve the repo, open `http://localhost:8000/` in Chrome, and in the console stub `window.fetch` to each fixture in turn (live / knowledge / 502-blocked-DataDome / 429-daily / network-error). Confirm visually: real report renders for live; knowledge shows the banner above the report; 502 shows the honest DataDome message + Book-a-call, **no "88", no single card, no "✓ analysis complete"**; daily-limit and network-error show honest copy.

- [ ] **Step 2: Live smoke test against `scan.waiser.dev`**

Un-stub fetch. Scan `codify.ch` (known to return a real 200) → real 3-card report. Scan `coop.ch` (returns 502 today) → the honest bot-protection message + CTA (this is the exact scenario that started the project; confirm the fake "88" is gone). Capture a screenshot of the coop.ch result to the scratchpad.

- [ ] **Step 3: Grep-confirm no fabrication code remains**

```bash
grep -nE 'POOL_|stubCompany|verdictText' js/extras.js   # expect: no matches
```

- [ ] **Step 4: Final Phase-A commit / summary** (docs only, if any). No push.

---

## Self-Review (plan vs spec)

- **Spec §Frontend result states (status-first routing):** Tasks 3 (502→honest), 4 (block distinction + CTA), 5 (knowledge banner) — covered. The four states map to Tasks 3/4/5 + existing soft-error (429) handling.
- **Spec §The frontend bug fixes:** bug 1 (delete stub) = Task 3; bug 2 (animation race) = Task 7; bug 3 (中文, own banner copy) = Task 6 (+ the zh cache key is Phase B, correctly out of scope here). Deleting the *backend* `src/stub.js` is Phase B (correctly not here).
- **Spec §Honest blocked-CTA (templated + protector-aware):** Task 4 (`{protector}`, `{domain}`) + Task 6 copy — covered.
- **Spec §DOM change (`#az-banner`):** Task 2 — covered; `index.html` added to touched files.
- **Spec "no fabricated data on any path":** Tasks 3 + 8 Step 3 (grep gate) — covered.
- **Graceful degradation (absent `source` ⇒ report):** Task 5 Step 2 (`else` hides banner; a `200` without `source` still renders via `finish()`) — covered.
- **Placeholder scan:** every code step shows real code; no TBD. The one "confirm ordering" in Task 7 Step 3 is a verification step with a defined fallback, not a placeholder.
- **Type/name consistency:** `blockedMessage(protector)`, `unavailableMessage()`, `knowledgeBannerFallback()`, `currentDomain`, `cancelAnim`, `bw.scan.{banner.knowledge,blocked.generic,blocked.named,blocked.cta,unavailable}` used consistently across Tasks 3–7. `label()` retained (still used by ops render); `pool()`/`verdictText()`/`POOL_*` deleted (unused after stub removal) — confirmed by the Task 3 grep gate.
