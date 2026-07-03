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
updated: 2026-07-03
confidence: high
---

# Canvas-2D interactive effects

## Summary

The hidden "wow" moments (black hole, panther easter-egg) are vanilla Canvas 2D animations,
lazily loaded and noindexed. The **hero** canvas, by contrast, is now **disabled** — GSAP
(vendored locally) drives the Blackwall hero motion instead.

## Details

### Hero: canvas disabled, GSAP drives the motion

The Blackwall hero markup in `index.html` still contains a `<canvas id="field">`
(index.html:124), but it is **switched off** at runtime. `js/site.js` grabs the element and
sets `c.style.display = "none"` under the comment *"canvas data field (disabled — too busy) …
particles + red rain removed per request"* (js/site.js:408-411). So there is **no Three.js /
WebGL boot effect and no particle field** on the shipped hero — the old terminal-era boot
canvas is gone.

Instead, the hero and the rest of the page are animated by **GSAP + ScrollTrigger, vendored
locally** at `js/vendor/gsap.min.js` and `js/vendor/ScrollTrigger.min.js` (loaded from
`index.html`, **no jsDelivr/CDN**). `js/site.js` choreographs everything: the scroll
`.progress` bar, `.nav` solidify-on-scroll, staggered headline reveals, stats count-up, the
security `.breach` sequence, section reveals, and the end-CTA. A small inline script in
`index.html` fades in the `.mh` hero sub/CTA/proof rows on `load` (guarded by
`prefers-reduced-motion`). The hero terminal **typer** and the "Agent Opportunity Scan" tool
live in `js/extras.js` (DOM/`requestAnimationFrame`, not canvas). All of this respects
reduced-motion (tokens collapse `--dur-*`; site.js sets final states directly).

### Hidden sections: still vanilla Canvas 2D

The site's playful, hidden features are still built with the raw **Canvas 2D API** and
`requestAnimationFrame`, **not** a 3D/WebGL/Three.js engine (none exists in the repo):

- The black-hole effect (`blackhole/blackhole.js`) is a ~3000-particle swirling singularity
  triggered by the footer/nav `#black-hole-trigger` easter egg and injected lazily on most
  pages. See [[blackhole-effect]].
- The easter-egg (`easter-egg/`) is a larger, fully self-contained Rilke "Der Panther"
  experience with its own canvas game, terminal, translations, and audio. See [[easter-egg]].

Both are `Disallow`ed in `robots.txt` (and the easter-egg also sets a `noindex` meta), keeping
them out of search while remaining discoverable. They ship their own CSS/JS rather than
relying on the main JS layer. These hidden sections were **not** restyled into Blackwall red;
they keep their original look. The black-hole is wired in via the lazy injection in
[[runtime-component-injection]].

## Related

- [[blackhole-effect]] — the footer/nav-triggered particle singularity (still Canvas 2D).
- [[easter-egg]] — the standalone Der Panther canvas game/terminal.
- [[terminal-design-system]] — now the Blackwall design system; the hero canvas it references
  is disabled, GSAP-driven motion replaces it.
- [[runtime-component-injection]] — how the black-hole effect is lazily loaded.
