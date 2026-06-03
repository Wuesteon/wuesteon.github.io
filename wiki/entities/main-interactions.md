---
title: Core Interactions (main.js)
type: entity
project: website
path: js/main.js
related:
  - "[[homepage]]"
  - "[[shared-components]]"
  - "[[terminal-design-system]]"
  - "[[i18n-system]]"
created: 2026-06-01
updated: 2026-06-01
confidence: high
---

# Core Interactions (main.js)

**Kind:** module · **Path:** `js/main.js`

## Summary

Wires up language toggle, scroll-reveal animations, stat counters, mobile menu, smooth scroll,
and back-to-top.

## Details

The behavioral layer. On `DOMContentLoaded` it:

- calls `setLanguage(currentLang)` (from [[i18n-system]]),
- binds the desktop and mobile language toggles,
- sets up an `IntersectionObserver` (threshold `0.1`) that adds `.visible` to `.fade-in-up`
  elements as they enter the viewport and kicks off `animateCounter()` for any `.stat-number`
  (counting up to a `data-target` value over ~50 ticks).

It also initializes:

- the mobile hamburger menu — `initMobileMenu()` (toggle, link-close, outside-click close),
- 80px-header-offset smooth anchor scrolling — `initSmoothScrolling()`,
- the scroll-thresholded back-to-top button — `initBackToTop()` (visible past 500px).

Note there are two `DOMContentLoaded` handlers in the JS layer (one here, one in
[[shared-components]] / `components.js`); both run independently.

## Related

- [[homepage]] — the page whose interactions this script drives.
- [[shared-components]] — the other `DOMContentLoaded` handler; injects the elements `main.js` binds.
- [[terminal-design-system]] — supplies the `.fade-in-up`, `.stat-number`, glow classes this toggles.
- [[i18n-system]] — `main.js` invokes `setLanguage()` and binds the toggle buttons.
