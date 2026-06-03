---
title: Tailwind Build Pipeline
type: entity
project: website
path: tailwind/
related:
  - "[[terminal-design-system]]"
  - "[[performance-optimization]]"
  - "[[homepage]]"
  - "[[static-no-build]]"
created: 2026-06-01
updated: 2026-06-01
confidence: high
---

# Tailwind Build Pipeline

**Kind:** pipeline-stage · **Path:** `tailwind/`

## Summary

Standalone Tailwind v3 CLI that compiles a committed, minified `css/tailwind.css` (replacing the
Play CDN).

## Details

`tailwind/` holds the pinned Tailwind v3.4.17 standalone CLI (`tailwindcss`, gitignored ~46MB
binary, re-downloadable via the `build.sh` header), `tailwind.config.js`, `input.css`, and
`build.sh`.

Running `./tailwind/build.sh` scans the configured `content` globs — **including `js/**/*.js`** so
classes injected by `components.js` / header / footer aren't purged — and writes the minified
`css/tailwind.css` (~16KB), which IS committed and loaded by every page.

This replaced the render-blocking `cdn.tailwindcss.com` runtime (124KB of in-browser JS
compilation that dominated LCP/TBT) — see [[performance-optimization]].

**The key contributor footgun:** if a newly added utility class doesn't apply, you forgot to
re-run `build.sh` and commit the regenerated CSS.

## Related

- [[terminal-design-system]] — the custom CSS loaded after the Tailwind output.
- [[performance-optimization]] — the CDN→prebuilt-CSS swap is a documented perf win.
- [[homepage]] — every page consumes the committed `css/tailwind.css`.
- [[static-no-build]] — this is the only (optional, committed) build step in the project.
