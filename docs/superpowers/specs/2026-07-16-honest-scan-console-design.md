# Honest Scan Console — Design

**Date:** 2026-07-16
**Scope:** Frontend only (`website/js/extras.js`, `website/js/translations.js`). No backend change.
**Status:** Design, pending user review before implementation.

## Problem

The hero scan widget on waiser.dev types a fake console animation while the real
`scan.waiser.dev/api/scan` request runs. Two bugs, both rooted in the console
being scripted fiction disconnected from the real request state:

1. **Premature completion.** The typing animation is capped at 9s
   (`setTimeout(fin, 9000)`) and always ends on `✓ analysis complete`. A real
   scan of a bot-walled site takes 15–20s (8s fetch timeout + Gemini knowledge
   call). So `✓ complete` paints at 9s while the fetch is still in flight for
   another 6–11s — the user sees "complete" for up to ~11s before the result.
2. **Generic + sometimes-lying text.** The console lines are 100% static and
   identical every scan. For a bot-walled site the result is `source:'knowledge'`
   (public knowledge, no live scrape) — but the console still types
   "fetching public pages … ok", asserting a live fetch that never happened.

## Settled product decisions (already approved by the user)

- **Approach:** "loop until done, honest ending" — keep the typed console for
  personality, but never fake completion; hold until the real fetch settles.
  NOT full backend SSE streaming.
- **Blocked-site handling:** "neutral early lines + honest final line" — early
  typed lines stay true regardless of outcome; the source (live vs knowledge)
  is asserted only in the final line, after the fetch settles. No console re-typing.

## Current architecture (what stays, what changes)

`website/js/extras.js` — vanilla IIFE, no framework, no build, no test harness.

**Unchanged:**
- `fetchScan(domain)` (~93–133): 30s `AbortController`; routes off HTTP status +
  `error`/`blocked`/`source`; turns every failure into an honest soft error.
- `finish(domain, data, runLabel)` report rendering: verdict/ops/score/reasons.
- The knowledge **banner** (`knowledgeBanner()`, shown when `data.source==='knowledge'`).
- All soft-error copy (`softMessage`/`blockedMessage`/`unavailableMessage`) + CTA.
- `esc()` XSS discipline and the single domain-escape chokepoint.

**Changed:** the submit handler's animation block (~199–264) and `scanLines`
(~62–91), plus new localized strings.

## Design

A console driven by the **real fetch promise**, not a timer. Three phases.

### Phase 1 — Typing (neutral, leader-free, inline-per-language)
Type a few **neutral** lines that are true whether or not the fetch succeeds.
The honesty test for each line: *would it be false if the site returned 403?*
- EN: `reaching site …`, `checking site & structure …`, `mapping agent opportunities …`
- DE: `Seite abrufen …`, `Seite & Struktur prüfen …`, `Agent-Chancen kartieren …`
- ZH: `访问网站 …`, `检查网站与结构 …`, `梳理智能体机会 …`

Removed: the fake `ok`/`3 found` right-hand column, the dot-leaders (they only
aligned that now-removed column; ZH double-width would misalign them anyway),
and the `✓ analysis complete` line. The `$ waiser scan <domain>` header line
stays, with `<domain>` escaped via the existing `esc()` chokepoint.

**Pattern:** these lines stay **inline per-language** exactly like `scanLines`
does today — NOT bare `t()` keys. Rationale: `t()` returns `''` on a missing
key, which would paint a blank console line. (Inline 3× duplication is the
already-established pattern for this function.)

### Phase 2 — Working (pulse, held until the fetch settles)
After the last typed line, show one live line — `analysing with AI` + a pulsing
cursor. It holds here with **no completion cap** until `scanP` settles. This is
what makes `✓ complete` impossible before the result exists.
- After the pulse has held ~4s, append one reassurance sub-line (honest — it *is*
  still working): EN "this can take a few seconds for larger sites …" / DE "das
  kann bei größeren Seiten ein paar Sekunden dauern …" / ZH "较大的网站可能需要几秒钟 …".

### Phase 3 — Resolution (final line from the REAL result)
When `scanP` settles, a **shared `finalLine(source)`** helper writes the final
line, honest-by-default:
- `source === 'live' || source === 'rendered'` → `✓ live analysis complete`
  (green ✓ reserved for genuine live success only).
- **every other value** (`knowledge`, unknown, `undefined`, `null`) → a terse,
  factual, non-✓ line: EN `· result from public knowledge (no live scan)` /
  DE `· Ergebnis aus öffentlichem Wissen (kein Live-Scan)` /
  ZH `· 结果基于公开信息（非实时扫描）`. The full disclosure stays in the report
  banner; the console line is deliberately terse to avoid double-disclaimer.
- On error/blocked/unavailable → the existing honest soft-error message replaces
  the console (unchanged behavior).

`finalLine(source)` is called from BOTH the animated path AND the reduced-motion
path, so wording can never diverge. Both final-line variants use the established
`var tmpl=t(key); if(tmpl) return tmpl;` + inline-fallback idiom.

## Control flow (the load-bearing rewrite)

Today: `Promise.all([scanP, animP])` gates `finish()`, with `animP` capped at 9s.
This is replaced because a no-cap pulse that only ends when `scanP` settles is
redundant with chaining off `scanP` directly, AND keeping `Promise.all` leaks the
pulse forever on the reject path (every blocked/soft-error case rejects `scanP`).

New flow:
- `var runSeq` module-scoped; each submit does `var run = ++runSeq`. The pulse
  tick and BOTH settlement callbacks bail if `run !== runSeq` (concurrent-submit
  guard — with the 9s cap gone, the overlap window is otherwise the full 30s).
- A `stopped` flag (per run). The pulse's `setTimeout` loop checks it each tick.
- Drive resolution directly off `scanP.then(onResult, onError)`:
  - `onResult(data)`: set `stopped=true`; if `run` is stale, return; write
    `finalLine(data.source)`; then call `finish()` **inside a try/catch** that
    routes a thrown unusable-body error to `onError` (preserving today's
    behavior where `finish()` may throw a soft error).
  - `onError(err)`: set `stopped=true`; if `run` is stale, return; render the
    existing honest soft-error message + CTA (today's `.catch` body), re-enable
    the button.
- **Fetch-settles-before-typing-finishes** (warm/cached, `scanP` resolves in
  <1s): `scanP` settling short-circuits the typing phase (like today's
  `cancelAnim` at line 242) — jump straight to `finalLine`. A `cached:true`
  result skips the pulse entirely; no multi-second theater over an existing result.
- **Safety cap:** a single `setTimeout(~33000)` (just past `fetchScan`'s 30s
  abort) that, if reached, routes to `onError(unavailable)` — NEVER to a fake
  completion. This is the net for a wedged socket where the abort somehow doesn't
  reject; it protects completion honesty, not a timed ending.

## Accessibility

- The typing `<div id="az-console">` becomes `aria-hidden="true"` (decorative).
- Add one visually-hidden `aria-live="polite"` status node. It receives exactly
  two updates per scan: on submit → "Scanning {domain}" (localized); on settle →
  the resolved final line / error message. The SR therefore never hears
  "complete" prematurely and never hears the intermediate typed lines.
- Reduced-motion path: keep the static "Scanning…" placeholder, then write the
  final line via the SAME `finalLine(source)` helper — the current hardcoded
  `doneMsg` ("✓ analysis complete") at line 245 is deleted (it is bug #1 + #2 for
  reduced-motion users).

## i18n

- New typed lines: inline per-language in `scanLines` (as today).
- New final-line + reassurance strings: add keys to `translations.js`
  (`bw.scan.final.live`, `bw.scan.final.knowledge`, `bw.scan.working`,
  `bw.scan.working.slow`) AND inline DE/EN/ZH fallbacks at the call site, per the
  existing `t()`+fallback idiom — a missing key must fall back, never blank.
- No dot-leaders in new lines. Any future leader must be counted in display
  columns (CJK glyph = 2), not characters.

## XSS

No new user-data `innerHTML` sink: neutral lines and final lines are static
localized copy. The only user datum, the domain, stays escaped via the single
`esc(domain)` chokepoint in `scanLines`. The final/working lines must NOT
template `currentDomain` (raw) — if ever needed, escape via `esc()` like
`blockedMessage` does.

## Verification

No unit-test harness in `website/`. Drive the real page in a browser
(Claude-in-Chrome) against the live API:
- **framer.com** (live) → neutral typing → pulse → `✓ live analysis complete`;
  report renders; NO banner.
- **bmw.com** (bot-walled, ~18s) → neutral typing → pulse HOLDS the full ~18s
  (reassurance sub-line appears at ~4s) → `· result from public knowledge (no
  live scan)`; report renders WITH the knowledge banner; `✓ complete` never
  appears early.
- A cached repeat of framer.com (<1s) → no multi-second theater; final line
  resolves promptly.
- Reduced-motion emulation → static placeholder → correct honest final line
  (not "✓ complete" for the knowledge case).
- Confirm the `aria-live` node's text via DOM inspection at each phase.
Capture a short before/after screen recording (gif) of the bmw.com case.

## Out of scope (noted, not built)

- Backend SSE/real per-stage streaming (the rejected heavier option).
- The Tier-1 browser-render sidecar (backend infra; would let bot-walled sites be
  scraped live instead of served from knowledge).
