---
title: Shared Components (header/footer/back-to-top)
type: entity
project: website
path: js/components.js
related:
  - "[[homepage]]"
  - "[[blog-system]]"
  - "[[blackhole-effect]]"
  - "[[i18n-system]]"
  - "[[runtime-component-injection]]"
created: 2026-06-01
updated: 2026-06-01
confidence: high
---

# Shared Components (header/footer/back-to-top)

**Kind:** module · **Path:** `js/components.js`

## Summary

Runtime-injected header, footer, and back-to-top markup with auto base-path detection.

## Details

`js/components.js` is how the site avoids duplicating chrome across dozens of HTML files.

- `getHeader(basePath, activePage, useAnchorLinks)` builds the fixed nav (logo, desktop nav,
  hamburger + mobile menu, DE/EN toggle), choosing anchor links (`#services`) on the homepage vs
  full paths elsewhere, and selecting the DE vs EN blog link based on the URL.
- `getFooter(basePath)` renders the GitHub/LinkedIn links, the `#black-hole-trigger`
  ("Don't click me") button, Impressum/Datenschutz links (`${basePath}impressum.html`,
  `${basePath}datenschutz.html`), and an online status indicator.
- `getBackToTopButton()` returns the scroll-to-top control.

On `DOMContentLoaded` it computes `detectBasePath()` (path-depth → `''` / `'../'` / `'../../'` /
`'../../../'`), `detectActivePage()`, and `isHomePage()`, then replaces the placeholder divs via
`outerHTML`. It also sets the footer year and calls `loadBlackHoleEffect(basePath)` on every page
**except** `/easter-egg`. This file is the single source of truth for navigation and footer across
the whole site.

Note there are two independent `DOMContentLoaded` handlers in the JS layer — one here and one in
[[main-interactions]] (`js/main.js`); both run.

## Related

- [[homepage]] — drops the placeholder divs this module fills.
- [[blog-system]] — blog index/post pages also rely on this injection (with deeper basePaths).
- [[blackhole-effect]] — lazily injected by `loadBlackHoleEffect()` from this module.
- [[i18n-system]] — the DE/EN toggle markup is built here; `setLanguage()` consumes it.
- [[runtime-component-injection]] — the cross-cutting pattern this module implements.
