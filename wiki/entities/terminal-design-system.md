---
title: Terminal Design System (styles.css)
type: entity
project: website
path: css/styles.css
related:
  - "[[tailwind-build]]"
  - "[[homepage]]"
  - "[[blog-system]]"
  - "[[blackhole-effect]]"
  - "[[performance-optimization]]"
created: 2026-06-01
updated: 2026-06-01
confidence: high
---

# Terminal Design System (styles.css)

**Kind:** layer · **Path:** `css/styles.css`

## Summary

All custom CSS: terminal-window aesthetic, cyan/green glow, cards, buttons, blog and related-post
styles, fonts.

## Details

`css/styles.css` is the hand-written companion to Tailwind and defines the site's identity. It
opens with seven `@font-face` rules (self-hosted Inter + JetBrains Mono, woff2-first with ttf
fallback), then `:root` design tokens, and a terminal/dev aesthetic:

- `.terminal-window` / `.terminal-header` / `.terminal-dot` (red/yellow/green) / `.terminal-body`,
- a blinking `.cursor`,
- code-syntax color classes (`.code-keyword`, `.code-string`, `.code-property`, …),
- glow effects (`.glow-text`, `.glow-cyan`, `.glow-green`).

It also styles layout/components:

- `.hero-bg` with grid-pattern overlay,
- `.card` (with hover gradient border),
- `.btn` / `.btn-primary` / `.btn-secondary`,
- `.section-dark` / `.section-darker`, `.section-title`,
- blog-specific `.blog-card`, `.related-posts`, and D3 `.d3-container` styles.

Loaded **after** `css/tailwind.css` on every page so its custom rules layer on top of utilities.
The woff2-first/ttf-fallback `@font-face` strategy is a load-bearing performance convention — see
[[performance-optimization]].

## Related

- [[tailwind-build]] — produces `css/tailwind.css`, loaded before this file.
- [[homepage]] — primary consumer of the terminal/hero styles.
- [[blog-system]] — uses `.blog-card`, `.related-posts`, `.d3-container`.
- [[blackhole-effect]] — shares the cyan/green glow palette (but ships its own CSS).
- [[performance-optimization]] — the font self-hosting + woff2 strategy this file embodies.
