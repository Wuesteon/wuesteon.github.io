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
updated: 2026-06-01
confidence: high
---

# Offline-first / no-build static site

## Summary

Everything is plain HTML/CSS/JS served as-is; the only build is an optional, committed Tailwind
compile.

## Details

There is no backend, bundler, `package.json`, or CI build for the site itself. `open index.html` or
`python3 -m http.server 8000` runs the whole thing. GitHub Pages serves the repo directly from
`main`, with the custom domain in `CNAME` (waiser.dev). The single optional step is
`./tailwind/build.sh` (see [[tailwind-build]]), whose OUTPUT (`css/tailwind.css`) is committed so
even that isn't required at request time.

This constraint **shapes the architecture**:

- shared chrome must be injected at runtime by JS ([[shared-components]]) rather than templated at
  build time,
- i18n must be client-side ([[i18n-system]]),
- the blog is physically duplicated per language ([[i18n]]) instead of being rendered from a data
  source.

Contributors edit HTML by hand and copy existing files as templates.

## Related

- [[tailwind-build]] — the lone (optional, committed) build step.
- [[shared-components]] — runtime chrome injection that substitutes for templating.
- [[runtime-component-injection]] — the DRY mechanism this constraint forces.
- [[i18n-system]] — client-side translation that substitutes for server rendering.
- [[i18n]] — the duplicated-tree blog i18n that follows from "no data source."
