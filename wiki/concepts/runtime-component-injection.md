---
title: Runtime component injection & base-path detection
type: concept
project: website
path: js/components.js
related:
  - "[[shared-components]]"
  - "[[main-interactions]]"
  - "[[static-no-build]]"
  - "[[blackhole-effect]]"
created: 2026-06-01
updated: 2026-07-03
confidence: high
---

# Runtime component injection & base-path detection

## Summary

Header/footer/back-to-top are placeholders replaced on `DOMContentLoaded`, with link paths derived
from URL depth. Post-redesign the injected markup is the Blackwall `.nav` / `.foot`.

## Details

Because there's no template engine (see [[static-no-build]]), `js/components.js` is the DRY
mechanism: pages embed empty `#header-placeholder` / `#footer-placeholder` /
`#back-to-top-placeholder` divs and the script swaps them via `outerHTML`. The emitted markup is now
the Blackwall chrome — the `.nav` (red-umbrella `logos/mark.svg` mark + `wAIser.dev` wordmark,
`.links`, a `.btn--pri` nav CTA, and the `#lang-toggle`) and the `.foot` (mark + wordmark, legal +
social links, the `#black-hole-trigger` easter-egg, and the `#currentYear` copyright). See
[[shared-components]].

The clever part is `detectBasePath()`, which inspects `window.location.pathname` and returns the
correct relative prefix so injected nav and footer links resolve from any directory depth:

| Location | basePath |
| --- | --- |
| root (`/`) | `''` |
| `/blog/` | `'../'` |
| `/blog/en/` | `'../../'` |
| `/blog/posts/*/` | `'../../../'` |

Sibling helpers `detectActivePage()`, `isHomePage()` (anchor vs full-path links), and the EN-blog
detection in `getHeader()` decide link forms. The same handler injects the lazy
[[blackhole-effect]] everywhere except the easter-egg.

Because the `.nav` is injected here on `DOMContentLoaded`, downstream scripts that depend on it run
afterward: [[main-interactions]] (`js/site.js`) builds the mobile drawer by cloning the injected
`.links`, and `js/main.js` binds the `#lang-toggle`. The design-token IDs/classes
(`#lang-toggle`, `#currentYear`, `#black-hole-trigger`) are preserved across the redesign so this
wiring keeps working unchanged.

## Related

- [[shared-components]] — the concrete module (`js/components.js`) that implements this.
- [[main-interactions]] — clones the injected `.nav` links into the mobile drawer; binds the toggle.
- [[static-no-build]] — the no-template-engine constraint that necessitates runtime injection.
- [[blackhole-effect]] — also lazily injected by the same `DOMContentLoaded` handler.
