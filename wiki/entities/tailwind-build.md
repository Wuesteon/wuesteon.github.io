---
title: Tailwind Build Pipeline (legacy)
type: entity
project: website
path: tailwind/
related:
  - "[[terminal-design-system]]"
  - "[[performance-optimization]]"
  - "[[homepage]]"
  - "[[static-no-build]]"
created: 2026-06-01
updated: 2026-07-03
confidence: high
---

# Tailwind Build Pipeline (legacy)

**Kind:** pipeline-stage · **Path:** `tailwind/`

> **LEGACY after the Blackwall redesign.** Top-level shipped pages (homepage, blog index,
> 404) no longer load Tailwind at all — they use the hand-authored Blackwall CSS
> (`css/tokens.css` + `css/blackwall.css`, see [[terminal-design-system]]). The `tailwind/`
> build still exists and `css/tailwind.css` is still committed, but it is now loaded **only**
> on blog posts and the legal pages, purely for a handful of utility classes in that legacy
> HTML. The build is effectively **dead for the top-level pages**.

## Summary

Standalone Tailwind v3 CLI that compiles a committed, minified `css/tailwind.css`. Now legacy:
the output is loaded only on posts/legal (utility classes), not on homepage/blog-index/404.

## Details

`tailwind/` holds the pinned Tailwind v3.4.17 standalone CLI (`tailwindcss`, gitignored ~46MB
binary, re-downloadable via the `build.sh` header), `tailwind.config.js`, `input.css`, and
`build.sh`. Running `./tailwind/build.sh` scans the configured `content` globs — **including
`js/**/*.js`** so classes injected by `components.js` aren't purged — and writes the minified
`css/tailwind.css`, which IS committed.

### Where `css/tailwind.css` is (and isn't) loaded now

- **NOT loaded:** `index.html`, `blog/index.html`, `blog/en/index.html`, `404.html` — these
  are pure Blackwall (`tokens.css` + `blackwall.css`).
- **Loaded (first in the stack):** every blog post under `blog/posts/**` and the legal pages
  `datenschutz.html` / `impressum.html`, as
  `tailwind.css → tokens.css → blackwall.css → styles.css → blog-post.css`. Tailwind here just
  supplies leftover utility classes in the legacy post/legal markup; the visual theme comes
  from Blackwall + the `blog-post.css` bridge.

### Practical guidance

- New/edited **top-level pages** must be styled with Blackwall CSS — do **not** reach for
  Tailwind utilities there (they won't load).
- The old **footgun** only still applies to posts/legal: if a Tailwind utility used in that
  legacy HTML doesn't apply, re-run `build.sh` and commit the regenerated `css/tailwind.css`.
- Historically this replaced the render-blocking `cdn.tailwindcss.com` runtime (124KB of
  in-browser compilation that dominated LCP/TBT) — see [[performance-optimization]]. That win
  is now moot for top-level pages, which ship zero Tailwind.

## Related

- [[terminal-design-system]] — the Blackwall CSS that replaced Tailwind as primary styling.
- [[performance-optimization]] — the historical CDN→prebuilt-CSS swap; superseded by Blackwall.
- [[homepage]] — no longer consumes `css/tailwind.css`.
- [[static-no-build]] — this remains the only (optional, committed, now legacy) build step.
