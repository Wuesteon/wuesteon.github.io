---
title: Blackwall Design System
type: entity
project: website
path: css/blackwall.css
related:
  - "[[tailwind-build]]"
  - "[[homepage]]"
  - "[[blog-system]]"
  - "[[blackhole-effect]]"
  - "[[performance-optimization]]"
created: 2026-06-01
updated: 2026-07-03
confidence: high
---

# Blackwall Design System

**Kind:** layer · **Path:** `css/tokens.css` + `css/blackwall.css` (+ `css/blog-post.css` bridge)

> **Supersedes the old "Terminal Design System" (cyan/green).** The terminal-window
> aesthetic, `--terminal-*` tokens, and self-hosted Inter + JetBrains Mono are GONE from
> shipped top-level pages after the **Blackwall** redesign (merged to `main`, `682aeef`).
> The old `css/styles.css` survives only as a legacy layer under the [[blog-system]]
> post pages (see the bridge below). This page now documents the Blackwall system.

## Summary

Blackwall is the site's cyberpunk-red design system: a 3-layer token file (`css/tokens.css`)
plus all component styles (`css/blackwall.css`), rendered as red neon on near-black. A small
`css/blog-post.css` bridge re-skins the legacy terminal blog-post components to red.

## Details

### Palette

Cyberpunk **red on near-black**:

- `#ff2a3c` — core brand red (`--red-500`)
- `#ff5a68` — hot red (`--red-400`, alias `--hot`)
- `#2ae0ff` — cyan "glitch channel" accent (`--cyan-500`, alias `--ice`)
- `#050507` — page background (`--ink-0`, alias `--bg`); this is also the HTML `theme-color`

Success green `#3ad17a` and warning amber `#f5a623` round out the accents; threat semantics
(`--threat-critical/moderate/low`) map onto red/amber/ink for the security/blog content.

### `css/tokens.css` — 3-layer design tokens

Single source of truth, loaded **before** `blackwall.css`. Three layers:

1. **PRIMITIVES** — raw ramps never used directly in UI: `--red-50…--red-900`, the
   neutral ink ramp `--ink-0…--ink-1000`, accents, alpha helpers (`--red-a06…--red-a50`,
   `--white-a04…--white-a10`), type families, a fluid clamp-based type scale
   (`--text-2xs…--text-6xl`, where `--text-6xl` is the hero wordmark), tracking, line
   heights, a 4px spacing scale (+ viewport-rhythm `--space-section`), radii (incl. the
   signature `--clip-cut` cyberpunk corner-cut polygon), borders, shadows, red neon
   `--glow-*`, motion easings/durations, a z-index scale, and layout containers.
2. **SEMANTIC ALIASES** — role-based vars components actually reference: `--color-bg`,
   `--color-surface`, `--color-nav`, `--color-text`, `--color-brand`, `--color-border`,
   `--color-focus`, `--threat-*`, etc.
3. **BACK-COMPAT ALIASES** — legacy shorthand used across the codebase mapped onto the new
   tokens so nothing had to be rewritten: `--red`, `--hot`, `--ice`, `--bg`, `--surf`,
   `--line`, `--mut`.

`tokens.css` also holds the **self-hosted `@font-face` rules** (woff2 only, **no Google
CDN** — GDPR + perf) using **root-absolute `/fonts/` paths** so one rule serves every URL
depth (homepage, `/blog/`, `/blog/posts/de/…`). A `prefers-reduced-motion` block collapses
all `--dur-*` durations to `.01ms` at the token layer.

### Fonts

Three self-hosted families (9 woff2 files in `fonts/`):

- **Chakra Petch** (400/500/600/700) — `--font-display`: headings + the wAIser wordmark
- **Space Grotesk** (400/500/700) — `--font-body`: prose + UI
- **Space Mono** (400/700) — `--font-mono`: labels, code, terminal typer

(The old `Inter-*.woff2` and `JetBrainsMono-*.woff2` remain in `fonts/` but are **unused**
by shipped pages.) See [[performance-optimization]] for the preload set.

### `css/blackwall.css` — component styles

All component styling lives here (loaded after `tokens.css`). Notable components:

- **Chrome:** `.nav` (solidifies on scroll), `.foot`, the `.brand` red-umbrella wordmark
  (`.brand__wm`, glitch), `.lang-toggle`.
- **Hero:** the `.mh` MOMENTUM hero (kinetic rotating headline, GSAP-driven) and the older
  `.hero` scaffold. The mockup's `<canvas id="field">` is present but **disabled** in
  [[canvas-effects]] — no particles/Three.js.
- **Living buttons:** `.btn`, `.btn--pri` (primary, animated glow), `.btn--sec`.
- **Cards/sections:** `.scard` (service value-rows incl. invitation-only Custom
  Development), `.tcard` (blog teaser card), `.feed`, `.clients` logo marquee, `.chip`
  blog-filter chips, `.badge`.
- **Security "breach" sequence:** `.breach`, `.breach__mock`, `.breach__ring`,
  `.breach__result` — GSAP scroll-triggered.
- **Agent scan tool:** the `.az-*` family (`.az-card`, `.az-input`, `.az-run`, `.az-report`,
  `.az-score`, `.az-console`, `.azcur` …) styling the client-side "Agent Opportunity Scan".
- **Contact two-path:** `.contact`, `.cpath` (`.cpath--primary` book-a-call vs.
  `.cpath--muted` email-pitch).
- **Article layout:** the `.art-*` family used by all restyled blog posts — `.art-hero`
  (category badge + author meta + read-time), `.art-body`, `.art-callout`, `.art-share`
  author card, `.art-more` related-posts grid, `.art-back`.

### `css/blog-post.css` — theme bridge

A **theme-bridge** that re-skins the legacy terminal (cyan/green) blog-post components to
Blackwall red **without touching any post HTML**. It (1) remaps the legacy `--terminal-*`
custom properties so every `var()` in `styles.css` turns red, (2) overrides hardcoded
cyan/teal/blue/green literals `styles.css` sets directly, and (3) overrides post-specific
components defined in each post's inline `<style>` block (`.result-card`, `.attack-box`,
`.agent-card`, pills, tables, diagrams). On a post the real load order is
`tailwind.css → tokens.css → blackwall.css → styles.css → blog-post.css` (bridge wins on
source order over the legacy CSS).

## Load matrix (which pages load what)

- **Homepage / blog index / 404:** `tokens.css` + `blackwall.css` only (no Tailwind, no
  `styles.css`).
- **Blog posts:** `tailwind.css` + `tokens.css` + `blackwall.css` + `styles.css` +
  `blog-post.css`.
- **Legal (`datenschutz.html`, `impressum.html`):** same 5-file stack as posts.

`css/styles.css` and `css/tailwind.css` are **legacy-only** now — see [[tailwind-build]].

## Related

- [[tailwind-build]] — Tailwind is now legacy; loaded only on posts/legal for utilities.
- [[homepage]] — primary consumer of the `.mh` hero, `.scard`, `.az-*`, `.breach`, `.cpath`.
- [[blog-system]] — uses `.tcard`, the `.art-*` article layout, and the `blog-post.css` bridge.
- [[blackhole-effect]] — hidden section; ships its own CSS, not Blackwall.
- [[performance-optimization]] — the self-hosted woff2 + preload strategy this system embodies.
