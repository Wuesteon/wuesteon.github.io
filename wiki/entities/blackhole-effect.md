---
title: Black Hole Effect
type: entity
project: website
path: blackhole/
related:
  - "[[shared-components]]"
  - "[[easter-egg]]"
  - "[[terminal-design-system]]"
  - "[[canvas-effects]]"
created: 2026-06-01
updated: 2026-06-01
confidence: high
---

# Black Hole Effect

**Kind:** feature · **Path:** `blackhole/`

## Summary

Canvas-2D "page destruction" particle singularity triggered by the footer "Don't click me" button.

## Details

`blackhole/blackhole.js` (~320 lines, IIFE) is an elaborate Canvas-2D animation that "sucks the
page into a singularity": a `Particle` class swirls ~3000 colored particles (purple/cyan/orange
palette) toward a center, with configurable consume delay/duration, screen shake, and a flash.
`blackhole/blackhole.css` defines the overlay, singularity, accretion disk, and event-horizon
visuals.

It is loaded **lazily**, not on page load: `components.js`'s `loadBlackHoleEffect(basePath)` injects
the CSS link, appends the `#black-hole-overlay` markup (from `getBlackHoleOverlay()`), and appends
the script — on every page **except** the easter-egg. The footer's `#black-hole-trigger` button
starts it. The directory is `Disallow`ed in `robots.txt` so it is never indexed.

Despite the project hint, this is **Canvas 2D**, not Three.js/WebGL. See [[canvas-effects]].

## Related

- [[shared-components]] — `loadBlackHoleEffect()` lives in `components.js` and injects this lazily.
- [[easter-egg]] — the one page where `components.js` deliberately skips loading this effect.
- [[terminal-design-system]] — the site design system (now Blackwall); this standalone toy keeps its own particle palette (purple/cyan/orange), independent of the shipped red theme.
- [[canvas-effects]] — the cross-cutting "vanilla Canvas 2D, no Three.js" concept.
