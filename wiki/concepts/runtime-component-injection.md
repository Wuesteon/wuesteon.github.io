---
title: Runtime component injection & base-path detection
type: concept
project: website
path: js/components.js
related:
  - "[[shared-components]]"
  - "[[static-no-build]]"
  - "[[blackhole-effect]]"
created: 2026-06-01
updated: 2026-06-01
confidence: high
---

# Runtime component injection & base-path detection

## Summary

Header/footer/back-to-top are placeholders replaced on `DOMContentLoaded`, with link paths derived
from URL depth.

## Details

Because there's no template engine (see [[static-no-build]]), `js/components.js` is the DRY
mechanism: pages embed empty `#header-placeholder` / `#footer-placeholder` /
`#back-to-top-placeholder` divs and the script swaps them via `outerHTML`.

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

## Related

- [[shared-components]] — the concrete module (`js/components.js`) that implements this.
- [[static-no-build]] — the no-template-engine constraint that necessitates runtime injection.
- [[blackhole-effect]] — also lazily injected by the same `DOMContentLoaded` handler.
