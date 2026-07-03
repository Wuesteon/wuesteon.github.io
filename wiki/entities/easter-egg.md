---
title: Easter Egg — Der Panther
type: entity
project: website
path: easter-egg/
related:
  - "[[blackhole-effect]]"
  - "[[terminal-design-system]]"
  - "[[i18n-system]]"
  - "[[canvas-effects]]"
created: 2026-06-01
updated: 2026-06-01
confidence: high
---

# Easter Egg — Der Panther

**Kind:** app · **Path:** `easter-egg/`

## Summary

Standalone Rilke "Der Panther" themed interactive terminal/game experience, noindexed.

## Details

A self-contained mini-experience at `easter-egg/index.html` themed on Rilke's 1902 poem
"Der Panther": a caged-panther canvas animation behind a bar overlay, atmospheric
scan-lines/vignette, poem-fragment overlays, and audio (`audio/oro_theme_cropped.mp3`).

It ships its own assets independent of the main JS layer:

- `js/terminal.js` (~860 lines, interactive command-line interface),
- `js/panther-game.js` (~850 lines, the panther/cage canvas game),
- `js/chains-liberation.js` (~1090 lines),
- `js/panther-translations.js` (~2080 lines, its own `PantherI18n` dictionary).

Styling is `css/game.css` plus the shared `css/styles.css` `@font-face` rules.

It sets `<meta name="robots" content="noindex, nofollow">`, is `Disallow`ed in `robots.txt`, and
is the **one place** where [[shared-components]] / `components.js` deliberately skips loading the
[[blackhole-effect]]. It reuses Umami analytics and tracks events via a local `trackEvent()`
helper.

This is Canvas 2D (no Three.js) — see [[canvas-effects]]. Its translation dictionary is separate
from the main [[i18n-system]] (`PantherI18n`, not the global `translations` object).

## Related

- [[blackhole-effect]] — the sibling Canvas-2D toy; this page is the lone exception to its injection.
- [[terminal-design-system]] — the site design system (now Blackwall); this standalone toy keeps its own self-contained palette rather than the shipped red theme.
- [[i18n-system]] — the easter-egg has its OWN `PantherI18n` dictionary, separate from the site one.
- [[canvas-effects]] — the "vanilla Canvas 2D, lazily loaded, noindexed" concept.
