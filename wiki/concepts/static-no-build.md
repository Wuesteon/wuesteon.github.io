---
title: Offline-first / no-build static site
type: concept
project: website
path: "-"
related:
  - "[[tailwind-build]]"
  - "[[shared-components]]"
  - "[[runtime-component-injection]]"
  - "[[i18n-system]]"
  - "[[i18n]]"
created: 2026-06-01
updated: 2026-07-03
confidence: high
---

# Offline-first / no-build static site

## Summary

Everything is plain HTML/CSS/JS served as-is; there is no runtime build. Even the optional,
committed Tailwind compile is now **legacy** — the Blackwall design system CSS is hand-authored.

## Details

There is no backend, bundler, `package.json`, or CI build for the site itself. `open index.html` or
`python3 -m http.server 8000` runs the whole thing. GitHub Pages serves the repo directly from
`main`, with the custom domain in `CNAME` (waiser.dev). All third-party libraries are vendored
in-repo too: GSAP + ScrollTrigger live at `js/vendor/*.min.js` (no CDN), and fonts are
self-hosted woff2 in `fonts/` — so nothing has to be fetched or compiled at request time.

After the **Blackwall** redesign the styling is **hand-authored CSS** (`css/tokens.css` 3-layer
design tokens + `css/blackwall.css` components + the `css/blog-post.css` bridge — see
[[terminal-design-system]]), authored by hand, not generated. The lone build step,
`./tailwind/build.sh`, is now **legacy/optional**: top-level pages ship no Tailwind, and its
committed output (`css/tailwind.css`) is only loaded on posts/legal for a few utility classes
(see [[tailwind-build]]). It is never required at request time.

This constraint **shapes the architecture**:

- shared chrome must be injected at runtime by JS ([[shared-components]]) rather than templated at
  build time,
- i18n must be client-side ([[i18n-system]]),
- the blog is physically duplicated per language ([[i18n]]) instead of being rendered from a data
  source.

Contributors edit HTML by hand and copy existing files as templates.

## Related

- [[tailwind-build]] — the lone (optional, committed) build step, now legacy.
- [[terminal-design-system]] — the hand-authored Blackwall CSS that replaced Tailwind styling.
- [[shared-components]] — runtime chrome injection that substitutes for templating.
- [[runtime-component-injection]] — the DRY mechanism this constraint forces.
- [[i18n-system]] — client-side translation that substitutes for server rendering.
- [[i18n]] — the duplicated-tree blog i18n that follows from "no data source."
