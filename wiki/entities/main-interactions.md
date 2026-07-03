---
title: Core Interactions (site.js / extras.js / main.js)
type: entity
project: website
path: js/site.js
related:
  - "[[homepage]]"
  - "[[blog-system]]"
  - "[[shared-components]]"
  - "[[terminal-design-system]]"
  - "[[i18n-system]]"
created: 2026-06-01
updated: 2026-07-03
confidence: high
---

# Core Interactions (site.js / extras.js / main.js)

**Kind:** module · **Path:** `js/site.js` (+ `js/extras.js`, `js/main.js`)

## Summary

The Blackwall behavioral layer, now split across three files: `site.js` (content + GSAP
choreography + mobile drawer + living buttons), `extras.js` (hero terminal typer + Agent
Opportunity Scan), and a thin `main.js` (i18n init + delegated lang-toggle).

## Details

### `js/site.js` — content rendering + choreography

- **Content data:** the `POSTS` array (16 posts, DE/EN localized) plus `tcardHTML()`,
  `renderHomeFeed()` (first 3 → `#home-feed`), `renderBlogList()` (filtered by the active `.chip`
  category → `#blog-list`), and `enhanceArticle()` (on a post: fills `[data-art-read]` and renders
  the next 3 related posts into `#art-more-grid`). See [[blog-system]].
- **Client marquee + AI scan beam:** builds a duplicated logo track into `#logo-track` from `LOGOS`,
  and (unless reduced-motion) runs a `requestAnimationFrame` "beam" that adds `.scan` to logos near
  screen-center.
- **`window.onLanguageChange` hook:** registered so that after `setLanguage()` swaps `data-i18n`
  text, the JS-rendered content re-renders in the new language (home feed, blog list, article
  enhancer, living-button labels).
- **GSAP choreography** (on `window.load`, guarded on `typeof gsap`): the scroll `.progress` bar
  (`scrub`), **nav-solidify** (toggles `.solid` on `.nav` past 80px), per-word reveals for
  `[data-split]`, `.stat` **count-ups** with animated bars (and a typewriter variant for
  `[data-text]` stats), `.reveal-up` / `[data-stagger]` card rises, the **breach sequence**
  (a paused timeline played by a triple-redundant trigger — IntersectionObserver + scroll/resize
  check + ScrollTrigger), and the end-CTA rise. Also runs `attachTilt()` (3D pointer tilt on
  `.tilt` cards). The mockup `#field` canvas is **disabled** here (`display:none`).
- **Mobile drawer** (`initMobileDrawer()`): universal builder that clones the injected `.nav`'s
  `.links` anchors into a slide-in `.mnav` panel + burger, marking the CTA and adding a mirrored
  `#lang-toggle-mobile`. Runs after DOM ready because [[shared-components]] injects `.nav` in its
  own handler.
- **Living buttons** (`upgradeLivingButtons` / IIFE): upgrades every `.btn--pri` into a Cyberpunk
  glitch button (channel-split + shear + text-scramble on hover/focus; ambient "surge" only on the
  hero CTA). Because the toggle rewrites a button's `textContent`, it exposes
  `upgradeLivingButtons()` for `onLanguageChange` to reset + rebuild i18n button labels from the
  live translation.

### `js/extras.js` — hero terminal + Agent Opportunity Scan

- **Hero terminal typer** (optional; `#nterm-body`): types a bilingual "what I do for you"
  sequence, with a static fallback under reduced-motion.
- **Agent Opportunity Scan** (`#az-form`): the homepage `#scan` tool. Fully **client-side and
  SIMULATED** — `analyzeCompany(domain)` deterministically picks 3 agent opportunities from a
  bilingual pool (`POOL_DE`/`POOL_EN`) via a string hash and derives a plausible fit score, then a
  typed console log animates before the report renders (score count-up + staggered opportunity
  cards). Language-aware via `getCurrentLang()`. The network call is stubbed and clearly marked
  `// BACKEND HOOK`.

### `js/main.js` — thin init

Intentionally minimal: on `DOMContentLoaded` it calls `setLanguage(currentLang)` (applies
`data-i18n`, sets `<html lang>`, toggles indicators), delegates clicks on
`#lang-toggle, #lang-toggle-mobile` to flip the language, and sets the footer year as a fallback.
Nav-solidify, mobile drawer, reveals, back-to-top, and smooth scroll (CSS `scroll-behavior`) are
handled by `site.js` / CSS, so `main.js` stays thin.

Multiple `DOMContentLoaded`/`load` entry points coexist across `components.js`, `main.js`, and
`site.js`; they run independently, with `site.js` deliberately building on the `.nav` that
`components.js` injects.

## Related

- [[homepage]] — the page whose interactions these scripts drive (hero, scan, breach, feed).
- [[blog-system]] — `POSTS`, `tcardHTML()`, `renderBlogList()`, `enhanceArticle()` live in `site.js`.
- [[shared-components]] — injects the `.nav` that `site.js`'s mobile drawer clones and `main.js` binds.
- [[terminal-design-system]] — supplies the `.tcard`, `.stat`, `.breach`, `.living`, reveal classes.
- [[i18n-system]] — `main.js` invokes `setLanguage()`; `site.js` registers `window.onLanguageChange`.
