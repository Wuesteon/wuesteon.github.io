# Honest Scan Console Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the waiser.dev hero scan console honest — never show "✓ complete" before the real result exists, and never claim a live fetch for a bot-walled (knowledge-sourced) result.

**Architecture:** Frontend only. Replace the timer-gated fake console in `website/js/extras.js` with a fetch-driven three-phase console: neutral typed lines → a "working" pulse that holds until the real `scanP` settles → a final line derived from the real `data.source`. A shared `finalLine(source)` helper feeds both the animated and reduced-motion paths; a per-run token guards concurrent submits; a ~33s safety cap routes only to the honest error (never to completion); an `aria-live` node makes progress audible without announcing "complete" early.

**Tech Stack:** Vanilla ES5-style IIFE (`js/extras.js`), i18n via `js/translations.js` (DE/EN/ZH), no build step, no test harness. Verification is browser-driven against the live API.

## Global Constraints

- Frontend only. Do NOT change `waiser-scan` backend or any network contract.
- No new dependencies, no build tooling, no framework. Match the existing ES5-style, `var`-based, IIFE code in `js/extras.js`.
- Preserve `esc()` XSS discipline: the user domain is escaped once at its single chokepoint in `scanLines`; final/working/status lines are static localized copy and must NOT template raw `currentDomain`.
- i18n idiom: user-facing strings added to `translations.js` MUST also have an inline DE/EN/ZH fallback at the call site using the existing `var tmpl=t(key); if(tmpl) return tmpl;` pattern — a missing key must fall back, never render blank. Typed console lines stay inline-per-language (as `scanLines` is today), NOT bare `t()`.
- Honesty rule (the whole point): the green `✓` and the words "live analysis" appear ONLY for `source === 'live' || source === 'rendered'`. Every other source value (`knowledge`, unknown, `undefined`, `null`) → the terse non-`✓` public-knowledge line. Completion text of any kind must never paint before `scanP` settles.
- All three languages (DE/EN/ZH) updated together for every user-facing string.
- Reduced-motion (`prefers-reduced-motion`) path must use the SAME `finalLine(source)` helper — no separate hardcoded completion string.
- Commit after each task. Conventional commit messages.

---

### Task 1: Add localized strings for the console (working, reassurance, final lines) + fix the "~15s" hint

**Files:**
- Modify: `website/js/translations.js` — DE block (~line 85–101), EN block (~line 255–270), ZH block (~line 423–434)

**Interfaces:**
- Produces (translation keys, consumed by Tasks 2–3):
  - `bw.scan.working` — the held "analysing with AI" line (no trailing ✓)
  - `bw.scan.workingSlow` — reassurance sub-line shown after ~4s
  - `bw.scan.final.live` — final line for a live/rendered result (leading `✓`)
  - `bw.scan.final.knowledge` — final line for a knowledge/unknown result (leading `·`, no ✓)
  - `bw.scan.aria.scanning` — aria-live "Scanning {domain}" announcement (contains `{domain}` placeholder)

- [ ] **Step 1: Add the five keys to the DE block**

In `js/translations.js`, inside the German translations object (right after `"bw.scan.unavailable": ...` at ~line 101), add:

```js
    "bw.scan.working": "mit KI analysieren",
    "bw.scan.workingSlow": "das kann bei größeren Seiten ein paar Sekunden dauern …",
    "bw.scan.final.live": "✓ Live-Analyse abgeschlossen",
    "bw.scan.final.knowledge": "· Ergebnis aus öffentlichem Wissen (kein Live-Scan)",
    "bw.scan.aria.scanning": "Scanne {domain}",
```

- [ ] **Step 2: Update the DE "~15s" hint to be honest about longer waits**

In the DE block, change `"bw.scan.hint"` (~line 92) so the trailing time reads `~20s` instead of `~15s` (a real bot-walled scan legitimately takes 15–20s). Keep the rest of the string identical; only the number changes.

- [ ] **Step 3: Add the five keys to the EN block**

After `"bw.scan.unavailable": ...` (~line 270) add:

```js
    "bw.scan.working": "analysing with AI",
    "bw.scan.workingSlow": "this can take a few seconds for larger sites …",
    "bw.scan.final.live": "✓ live analysis complete",
    "bw.scan.final.knowledge": "· result from public knowledge (no live scan)",
    "bw.scan.aria.scanning": "Scanning {domain}",
```

- [ ] **Step 4: Update the EN hint**

Change EN `"bw.scan.hint"` (line 262) from `...takes ~15s` to `...takes ~20s`. Full line becomes:
`"◆ Reads your public site only · no signup · takes ~20s",`

- [ ] **Step 5: Add the five keys to the ZH block**

After ZH `"bw.scan.unavailable"` (~line 434 region) add:

```js
    "bw.scan.working": "使用 AI 分析中",
    "bw.scan.workingSlow": "较大的网站可能需要几秒钟 …",
    "bw.scan.final.live": "✓ 实时分析完成",
    "bw.scan.final.knowledge": "· 结果基于公开信息（非实时扫描）",
    "bw.scan.aria.scanning": "正在扫描 {domain}",
```

- [ ] **Step 6: Update the ZH hint**

Change ZH `"bw.scan.hint"` (~line 430) trailing `约需 15 秒` → `约需 20 秒`.

- [ ] **Step 7: Verify the file still parses**

Run: `cd website && node -e "require('./js/translations.js')" 2>&1 || node --check js/translations.js`
Expected: no syntax error. (If translations.js is a browser global, not a CommonJS module, use `node --check js/translations.js` which validates syntax without executing.)

- [ ] **Step 8: Commit**

```bash
cd website && git add js/translations.js
git commit -m "i18n: add honest scan-console strings (working/final/aria) + honest ~20s hint"
```

---

### Task 2: Add the `az-live` aria-live status node to the markup

**Files:**
- Modify: `website/index.html` (~line 166–169, the `.az-out` block)

**Interfaces:**
- Produces: a `<div id="az-live">` visually-hidden `aria-live="polite"` element, and `aria-hidden="true"` on `#az-console`. Task 3 writes text into `#az-live`.

- [ ] **Step 1: Mark the typed console decorative and add the live region**

In `index.html`, in the `.az-out` block, change the console line and add a live node immediately after it. Current (line 167):

```html
            <div class="az-console mono" id="az-console"></div>
```

becomes:

```html
            <div class="az-console mono" id="az-console" aria-hidden="true"></div>
            <div id="az-live" aria-live="polite" class="sr-only"></div>
```

- [ ] **Step 2: Ensure an `sr-only` visually-hidden style exists**

Run: `cd website && grep -rn "sr-only\|visually-hidden" css/ | head`
- If a visually-hidden utility class already exists, use that class name instead of `sr-only` in Step 1 (adjust the class).
- If NONE exists, add this to the site's main CSS (the file that styles `.az-*`; find it with `grep -rln "az-console" css/`):

```css
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;}
```

- [ ] **Step 3: Verify the element exists and is hidden**

Run: `cd website && grep -n 'id="az-live"' index.html && grep -n 'sr-only\|visually-hidden' index.html css/*.css | head`
Expected: the `az-live` node is present and a matching hidden-style class is defined.

- [ ] **Step 4: Commit**

```bash
cd website && git add index.html css/
git commit -m "a11y: add polite aria-live status node for scan progress; mark typed console aria-hidden"
```

---

### Task 3: Rewrite the console to be fetch-driven (the core change)

**Files:**
- Modify: `website/js/extras.js` — `scanLines` (~lines 62–91), the submit handler's animation block (~lines 199–264), and add two helper functions.

**Interfaces:**
- Consumes: translation keys from Task 1; `#az-live` from Task 2; existing `fetchScan`, `finish`, `unavailableMessage`, `esc`, `t`, `lang`, `currentDomain`, `con` (`#az-console`), `runBtn`, `REDUCED`.
- Produces: `finalLine(source)` → localized string; `announce(text)` → writes to `#az-live`; a module-scoped `runSeq` counter.

**Context — current behavior being replaced:** `scanLines(domain)` returns fixed lines ending in "✓ analysis complete". The submit handler runs `fetchScan` (`scanP`) and a typing animation (`animP`) capped at 9s, then `Promise.all([scanP, animP])` calls `finish()`. The reduced path hardcodes `doneMsg`. This all changes.

- [ ] **Step 1: Replace `scanLines` with neutral, leader-free, inline-per-language lines**

Replace the entire `scanLines(domain)` function (~lines 62–91) with:

```js
  // Neutral progress lines — TRUE whether or not the live fetch succeeds (a
  // bot-walled site yields a public-knowledge result, so no line may assert a
  // successful fetch/parse). The completion/"ok" claims are gone; the console
  // holds on a working line until the REAL fetch settles (see submit handler).
  // domain is user-typed → escaped here, the single chokepoint before innerHTML.
  function scanLines(domain){
    domain = esc(domain);
    if(lang()==='de') return [
      {c:'p',x:'$ waiser scan '},{c:'w',x:domain},{nl:1},
      {c:'c',x:'  Seite abrufen …'},{nl:1},
      {c:'c',x:'  Seite & Struktur prüfen …'},{nl:1},
      {c:'c',x:'  Agent-Chancen kartieren …'},{nl:1}
    ];
    if(lang()==='zh') return [
      {c:'p',x:'$ waiser scan '},{c:'w',x:domain},{nl:1},
      {c:'c',x:'  访问网站 …'},{nl:1},
      {c:'c',x:'  检查网站与结构 …'},{nl:1},
      {c:'c',x:'  梳理智能体机会 …'},{nl:1}
    ];
    return [
      {c:'p',x:'$ waiser scan '},{c:'w',x:domain},{nl:1},
      {c:'c',x:'  reaching site …'},{nl:1},
      {c:'c',x:'  checking site & structure …'},{nl:1},
      {c:'c',x:'  mapping agent opportunities …'},{nl:1}
    ];
  }
```

- [ ] **Step 2: Add `finalLine(source)` and `announce(text)` helpers**

Add these near the other copy helpers (e.g. just above `knowledgeBanner`, ~line 182). `finalLine` is honest-by-default: `✓ live` ONLY for live/rendered; everything else → the public-knowledge line.

```js
  // Final console line, derived from the REAL result. Honest-by-default: the
  // green ✓ + "live analysis" wording is reserved for a genuine live/rendered
  // scan; knowledge/unknown/undefined → the terse public-knowledge line (the
  // full disclosure lives in the report banner). Keys have inline fallbacks so a
  // missing translation never blanks the line.
  function finalLine(source){
    var live = (source==='live' || source==='rendered');
    var key = live ? 'bw.scan.final.live' : 'bw.scan.final.knowledge';
    var tmpl = t(key); if(tmpl) return tmpl;
    var l=lang();
    if(live){
      if(l==='de') return '✓ Live-Analyse abgeschlossen';
      if(l==='zh') return '✓ 实时分析完成';
      return '✓ live analysis complete';
    }
    if(l==='de') return '· Ergebnis aus öffentlichem Wissen (kein Live-Scan)';
    if(l==='zh') return '· 结果基于公开信息（非实时扫描）';
    return '· result from public knowledge (no live scan)';
  }

  // Write to the polite aria-live region (SR-only). Never announces "complete"
  // until called from the settle path.
  var liveEl = document.getElementById('az-live');
  function announce(text){ if(liveEl){ liveEl.textContent = text; } }
```

- [ ] **Step 3: Add the module-scoped run counter**

Near the top of the IIFE where other module vars are declared (e.g. beside `currentDomain`, ~line 94), add:

```js
  var runSeq = 0; // increments per submit; stale runs bail (concurrent-submit guard)
```

- [ ] **Step 4: Replace the submit handler's animation + resolution block**

Replace the block from `var scanP = fetchScan(domain).catch(...)` through the end of the `Promise.all([...]).then(...).catch(...)` chain (~lines 211–263) with the fetch-driven version below. Keep everything ABOVE it (preventDefault, domain validation, `currentDomain`, `trackScan('scan-submit')`, the `scanning`/`runLabel` setup, `runBtn.disabled=true`, and the `out/report/con` reset at ~line 208) unchanged.

```js
    var run = ++runSeq;
    var stopped = false;               // set true the instant the fetch settles
    var typingDone = false, result = null, settledErr = null;
    announce((function(){
      var tmpl=t('bw.scan.aria.scanning');
      var d=esc(domain);
      if(tmpl) return tmpl.replace('{domain}', d);
      return (lang()==='de'?'Scanne ':(lang()==='zh'?'正在扫描 ':'Scanning '))+d;
    })());

    var scanP = fetchScan(domain).catch(function(err){
      if(err && err.soft){ throw err; }
      console.warn('[scan] unavailable', err && (err.status||err.message));
      var e2=new Error('unavailable'); e2.soft=true; e2.code='UNAVAILABLE'; e2.status=err&&err.status; e2.message=unavailableMessage(); throw e2;
    });

    // Safety net: just past fetchScan's 30s AbortController. If the fetch somehow
    // never settles, route to the honest error — NEVER to a fake completion.
    var safety = setTimeout(function(){
      if(stopped || run!==runSeq) return;
      settledErr = { soft:true, code:'UNAVAILABLE', message:unavailableMessage() };
      onSettled();
    }, 33000);

    function paintFinal(){
      if(run!==runSeq) return;
      runBtn.disabled=false; runBtn.textContent=runLabel;
      if(settledErr){
        var msg=settledErr.message||unavailableMessage();
        var html='<span class="h">'+msg+'</span>';
        if(settledErr.code==='BLOCKED_SITE' || settledErr.code==='DAILY_LIMIT'){
          html+='<div style="margin-top:14px"><a href="#contact" class="btn btn--pri">'+bookCtaLabel()+'</a></div>';
        }
        con.innerHTML=html; hideBanner(); announce(msg);
        trackScan('scan-error', { code: settledErr.code||'UNAVAILABLE', status: settledErr.status, lang: lang() });
        return;
      }
      // success: render the report, then the honest final console line.
      try {
        finish(domain, result, runLabel);
      } catch(e){
        // finish() throws a soft error on an unusable 2xx body — treat as error.
        settledErr = (e && e.soft) ? e : { soft:true, code:'UNAVAILABLE', message:unavailableMessage() };
        return paintFinal();
      }
      var fl = finalLine(result && result.source);
      var cls = (result && (result.source==='live'||result.source==='rendered')) ? 'g' : 'c';
      con.innerHTML += '\n<span class="'+cls+'">'+esc(fl)+'</span>';
      announce(fl);
    }

    // Resolution gate: paint the final state only when BOTH the fetch has settled
    // AND the neutral typing has finished (or been short-circuited). A warm/cached
    // fetch that resolves mid-typing short-circuits typing (see the loop below).
    function onSettled(){
      if(run!==runSeq || stopped){ if(run!==runSeq) return; }
      stopped = true; clearTimeout(safety);
      if(typingDone) paintFinal();
      // else: the typing loop, seeing `stopped`, will jump to paintFinal().
    }

    scanP.then(function(data){ result=data; onSettled(); },
               function(err){ settledErr=err; onSettled(); });

    if(REDUCED){
      con.innerHTML='<span class="c">'+(lang()==='de'?'Scanne…':(lang()==='zh'?'扫描中…':'Scanning…'))+'</span>';
      typingDone = true;
      if(stopped) paintFinal(); // fetch may have already settled
    } else {
      var LINES=scanLines(domain), buf='', li=0, ci=0, workingShown=false, slowTimer=null;
      var WORK = t('bw.scan.working') || (lang()==='de'?'mit KI analysieren':(lang()==='zh'?'使用 AI 分析中':'analysing with AI'));
      var SLOW = t('bw.scan.workingSlow') || (lang()==='de'?'das kann bei größeren Seiten ein paar Sekunden dauern …':(lang()==='zh'?'较大的网站可能需要几秒钟 …':'this can take a few seconds for larger sites …'));
      function showWorking(){
        if(workingShown) return; workingShown=true;
        con.innerHTML = buf + '<span class="c">  '+esc(WORK)+' </span><span class="azcur"></span>';
        slowTimer = setTimeout(function(){
          if(stopped || run!==runSeq || typingDone===false) {}
          if(!stopped && run===runSeq){ con.innerHTML = buf + '<span class="c">  '+esc(WORK)+'</span>\n<span class="c">  '+esc(SLOW)+' </span><span class="azcur"></span>'; }
        }, 4000);
      }
      (function type(){
        if(run!==runSeq) return;                 // superseded by a newer submit
        if(stopped){                             // fetch already settled → finish now
          if(slowTimer) clearTimeout(slowTimer);
          typingDone = true; con.innerHTML = buf; return paintFinal();
        }
        if(li>=LINES.length){                    // typed lines done → working phase
          typingDone = true; showWorking();
          if(stopped){ if(slowTimer) clearTimeout(slowTimer); con.innerHTML = buf; return paintFinal(); }
          return; // hold; scanP settling (onSettled) will paint the final state
        }
        var L=LINES[li];
        if(L.nl){ buf+='\n'; li++; ci=0; return setTimeout(type, 90); }
        var txt=L.x;
        if(ci<txt.length){ if(ci===0){ buf+='<span class="'+L.c+'">'; } buf+=txt[ci]; ci++; con.innerHTML=buf+'</span><span class="azcur"></span>'; setTimeout(type, txt[ci-1]==='.'?10:16); }
        else { buf+='</span>'; li++; ci=0; setTimeout(type, 60); }
      })();
    }
```

- [ ] **Step 5: Verify the file parses**

Run: `cd website && node --check js/extras.js`
Expected: no syntax error.

- [ ] **Step 6: Commit**

```bash
cd website && git add js/extras.js
git commit -m "feat(scan): fetch-driven honest console — hold until result, honest final line, a11y announce, run guard, 33s safety net"
```

---

### Task 4: Browser verification against the live API

**Files:** none (verification only). Uses Claude-in-Chrome against `https://waiser.dev` (or a local static serve of the site) and the live `scan.waiser.dev` API.

**Note on serving:** verify against the deployed site if the branch is previewable, OR serve the working tree locally (`cd website && python3 -m http.server 8080`) and open `http://localhost:8080`. The API call goes to the live `scan.waiser.dev` either way (CORS allows `https://waiser.dev`; for localhost the API's `access-control-allow-origin` is `https://waiser.dev`, so if CORS blocks localhost, verify on the deployed preview instead).

- [ ] **Step 1: Live-scan a scrapable site (framer.com)**

Open the page, type `framer.com`, run the scan. Observe: neutral lines type out, a brief working pulse, then the final line `✓ live analysis complete` (green), the report renders, and NO knowledge banner. Confirm `✓` never appears before the report.

- [ ] **Step 2: Scan a bot-walled site (bmw.com)**

Type `bmw.com`, run. Observe: neutral lines type; the working line holds; at ~4s the reassurance sub-line appears; the console holds the full ~15–20s; then the final line `· result from public knowledge (no live scan)` (NOT a green ✓), the report renders WITH the knowledge banner. Confirm no premature "complete".

- [ ] **Step 3: Cached-repeat (framer.com again)**

Immediately re-scan `framer.com`. Observe the cached result resolves fast without multi-second theater — typing short-circuits and the final line paints promptly.

- [ ] **Step 4: Reduced-motion**

In Chrome DevTools, emulate `prefers-reduced-motion: reduce` (Rendering tab), then scan `bmw.com`. Observe the static "Scanning…" placeholder, then the correct honest final line `· result from public knowledge …` — NOT "✓ analysis complete".

- [ ] **Step 5: aria-live check**

With DevTools, inspect `#az-live` during a `bmw.com` scan. Confirm it holds "Scanning bmw.com" during the wait and updates to the final knowledge line only after settle (never an early "complete").

- [ ] **Step 6: Record and report**

Capture a short gif of the bmw.com case (Step 2) showing the held working line → honest final line. Report all six observations. If any step fails, STOP and report — do not mark the task complete.

---

## Notes for the executor

- There is no unit-test harness in `website/`. TDD-by-test-file does not apply here; the "test" for the core task is the browser verification in Task 4. Treat Task 4 as the gate — Task 3 is not "done" until Task 4's observations pass.
- Do not touch the backend or the network contract. `source`, `blocked`, `cached` come from the API as-is.
- Keep the ES5 `var`/IIFE style; no `let`/`const`/arrow-only refactors of surrounding code.
