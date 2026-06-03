---
title: Canvas-2D interactive effects
type: concept
project: website
path: "-"
related:
  - "[[blackhole-effect]]"
  - "[[easter-egg]]"
  - "[[terminal-design-system]]"
  - "[[runtime-component-injection]]"
created: 2026-06-01
updated: 2026-06-01
confidence: high
---

# Canvas-2D interactive effects

## Summary

The "wow" moments (black hole, panther easter-egg) are vanilla Canvas 2D animations, lazily loaded
and noindexed.

## Details

The site's playful, hidden features are built with the raw **Canvas 2D API** and
`requestAnimationFrame`, **not** a 3D/WebGL/Three.js engine (none exists in the repo, contrary to
the project hint).

- The black-hole effect (`blackhole/blackhole.js`) is a ~3000-particle swirling singularity
  triggered by the footer "Don't click me" button and injected lazily on most pages. See
  [[blackhole-effect]].
- The easter-egg (`easter-egg/`) is a larger, fully self-contained Rilke "Der Panther" experience
  with its own canvas game, terminal, translations, and audio. See [[easter-egg]].

Both are `Disallow`ed in `robots.txt` (and the easter-egg also sets a `noindex` meta), keeping them
out of search while remaining discoverable by curious users. They share the cyan/green terminal
aesthetic ([[terminal-design-system]]) but bring their own CSS/JS rather than relying on the main
JS layer. The black-hole is wired in via the lazy injection in [[runtime-component-injection]].

## Related

- [[blackhole-effect]] — the footer-triggered particle singularity.
- [[easter-egg]] — the standalone Der Panther canvas game/terminal.
- [[terminal-design-system]] — the shared visual identity these effects echo.
- [[runtime-component-injection]] — how the black-hole effect is lazily loaded.
