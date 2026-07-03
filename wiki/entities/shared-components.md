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
  - "[[main-interactions]]"
  - "[[runtime-component-injection]]"
created: 2026-06-01
updated: 2026-07-03
confidence: high
---

# Shared Components (header/footer/back-to-top)

**Kind:** module · **Path:** `js/components.js`

## Summary

Runtime-injected **Blackwall** header, footer, and back-to-top markup with auto base-path
detection and the red-umbrella logo mark.

## Details

`js/components.js` is how the site avoids duplicating chrome across dozens of HTML files. After the
redesign it emits Blackwall `.nav` / `.foot` markup.

- `getHeader(basePath, activePage, useAnchorLinks)` builds the fixed `.nav`: a `.brand` link
  carrying the **red-umbrella logo mark** (`logos/mark.svg`) plus the `wAIser.dev` wordmark
  (`w<span class="ai">AI</span>ser<span class="tld">.dev</span>`), then a `.links` group — Free
  scan (`#scan`), Services (`#services`), Security (`#security`), Blog, Contact, a `.btn--pri`
  **nav CTA** ("Scan my site"), and the DE/EN `#lang-toggle` button. It chooses anchor links on the
  homepage vs full paths elsewhere (`useAnchorLinks`), selects the DE vs EN blog link from the URL,
  and adds `class="on"` to the Blog link on blog pages. Nav labels use `data-i18n` keys
  (`nav.freeScan`, `nav.services`, `nav.security`, `nav.blog`, `nav.contact`, `nav.cta`).
- `getFooter(basePath)` renders the `.foot`: a `.foot__brand` repeating the mark + wordmark
  "· Nils Weiser", `.foot__links` (Blog, Services, Impressum, Datenschutz, GitHub, LinkedIn, Email,
  and the `#black-hole-trigger` "Don't click me" easter-egg button), and a copyright line
  "© <year> · Bodenseeraum · Schweiz" (`#currentYear`).
- `getBackToTopButton()` returns the `.back-to-top` scroll control (arrow SVG).

The IDs `#lang-toggle` / `#lang-de` / `#lang-en`, `#black-hole-trigger`, and `#currentYear` are
preserved so existing wiring binds unchanged: [[main-interactions]] (`js/main.js`) delegates the
language toggle, and `js/site.js` clones the `.links` anchors + adds a mirrored
`#lang-toggle-mobile` when it builds the mobile drawer.

On `DOMContentLoaded` it computes `detectBasePath()` (path-depth → `''` / `'../'` / `'../../'` /
`'../../../'`), `detectActivePage()`, and `isHomePage()`, then replaces the placeholder divs via
`outerHTML`. It also sets the footer year and calls `loadBlackHoleEffect(basePath)` on every page
**except** `/easter-egg`. This file is the single source of truth for navigation and footer chrome
across the whole site.

Note there are still two independent `DOMContentLoaded` handlers in the JS layer — one here and one
in [[main-interactions]] (`js/main.js`) — plus a third builder in `js/site.js` (the mobile drawer),
all of which run after this module injects the `.nav`.

## Related

- [[homepage]] — drops the placeholder divs this module fills.
- [[blog-system]] — blog index/post pages also rely on this injection (with deeper basePaths).
- [[blackhole-effect]] — lazily injected by `loadBlackHoleEffect()` from this module.
- [[i18n-system]] — the DE/EN `#lang-toggle` markup is built here; `setLanguage()` consumes it.
- [[main-interactions]] — `js/site.js` clones this nav's links into the mobile drawer; `js/main.js`
  binds the toggle.
- [[runtime-component-injection]] — the cross-cutting pattern this module implements.
