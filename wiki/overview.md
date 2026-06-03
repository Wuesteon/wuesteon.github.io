---
title: waiser.dev — Project Overview
type: overview
project: website
path: "-"
related:
  - "[[homepage]]"
  - "[[shared-components]]"
  - "[[i18n-system]]"
  - "[[main-interactions]]"
  - "[[blog-system]]"
  - "[[blackhole-effect]]"
  - "[[easter-egg]]"
  - "[[terminal-design-system]]"
  - "[[tailwind-build]]"
  - "[[seo-geo-layer]]"
  - "[[marketing-doc]]"
  - "[[write-blog-post-skill]]"
  - "[[legal-pages]]"
  - "[[static-no-build]]"
  - "[[runtime-component-injection]]"
  - "[[i18n]]"
  - "[[geo-ai-citation]]"
  - "[[performance-optimization]]"
  - "[[canvas-effects]]"
  - "[[data-model]]"
  - "[[external-services]]"
created: 2026-06-01
updated: 2026-06-01
confidence: high
---

# waiser.dev — Project Overview

## One-liner

waiser.dev — the bilingual (DE/EN) static HTML/CSS/JS portfolio and AI/dev blog of IT consultant
Nils Weiser, deployed on GitHub Pages with no build step beyond a committed Tailwind CLI output.

## Stack

- HTML5 (multi-page static site)
- Vanilla JavaScript (ES, no framework, no bundler)
- Tailwind CSS v3.4.17 (standalone CLI, prebuilt + committed `css/tailwind.css`)
- Custom CSS (`css/styles.css`, CSS custom properties)
- Canvas 2D API (blackhole + panther easter-egg animations)
- D3.js v7 via CDN (blog post visualizations)
- Self-hosted fonts: Inter + JetBrains Mono (woff2 with ttf fallback)
- Umami Cloud analytics
- GitHub Pages hosting
- Schema.org JSON-LD structured data

## Entry points

- `index.html` — homepage / primary entry
- `blog/index.html` — DE blog index
- `blog/en/index.html` — EN blog index
- `js/main.js`, `js/components.js`, `js/translations.js` — the three site-wide deferred scripts
- `blog/posts/de/`, `blog/posts/en/` — per-language post trees
- `blackhole/blackhole.js` — lazy Canvas-2D effect
- `easter-egg/index.html` — standalone "Der Panther" experience
- `CLAUDE.md`, `MARKETING.md` — contributor guide + growth/ops journal

## Architecture

waiser.dev is a fully static, multi-page website served as-is by GitHub Pages from the `main`
branch (custom domain pinned in `CNAME` → waiser.dev). There is no runtime backend, no server
code, and no client framework. Each page is a hand-authored HTML document that links the same
two stylesheets (`css/tailwind.css` then `css/styles.css`) and the same three deferred scripts
(`js/components.js`, `js/translations.js`, `js/main.js`). The only "build" is an optional,
committed step: the standalone Tailwind v3 CLI in `tailwind/` scans HTML and `js/**/*.js` and
emits the minified `css/tailwind.css`; pages always consume the prebuilt file, so nothing must
run for the site to work. See [[static-no-build]] and [[tailwind-build]].

The shared chrome (header, footer, back-to-top button) is not duplicated across files; instead
each page drops empty placeholder `<div>`s (`#header-placeholder`, `#footer-placeholder`,
`#back-to-top-placeholder`), and `js/components.js` replaces them at `DOMContentLoaded` with
markup returned by `getHeader()`, `getFooter()`, and `getBackToTopButton()`. `components.js`
also auto-detects the page's directory depth via `detectBasePath()` (returning `''`, `'../'`,
`'../../'`, or `'../../../'`) so injected links resolve correctly from the homepage, the blog
indexes, and the three-levels-deep blog posts alike. See [[shared-components]] and
[[runtime-component-injection]].

Internationalization (DE default, EN alternate) is implemented entirely client-side in
`js/translations.js`. A `translations` object holds key→string maps for `de` and `en`;
`setLanguage()` swaps the text of every `[data-i18n]` element, toggles `<html lang>`, persists
the choice to `localStorage`, and updates the DE/EN toggle UI. Crucially, the blog is not
translated in-place — it has parallel directory trees (`blog/` + `blog/posts/de/` for German,
`blog/en/` + `blog/posts/en/` for English), and `setLanguage()` redirects between the matching
DE/EN URLs (with a small `slugMap` for the one post whose filename differs between languages:
`mit-ai-halluzinationen` ↔ `mit-ai-hallucinations`). See [[i18n-system]] and [[i18n]].

The homepage (`index.html`) is a single-section-scroll layout (`#home`, `#services`, `#about`,
`#contact`) wrapped in a `<main>` landmark, plus a client-logo strip. `js/main.js` wires up the
interactive behaviors: an `IntersectionObserver` that adds `.visible` to `.fade-in-up` elements
and runs animated stat counters, the hamburger mobile menu (with outside-click close), 80px-offset
smooth anchor scrolling, and the scroll-reveal back-to-top button. The hero contains a static
terminal/code-block aesthetic (cyan/green "glow" theme) rather than a live typing engine. See
[[homepage]] and [[main-interactions]].

Two hidden interactive "toys" live outside the indexed site and are `Disallow`ed in `robots.txt`:
`blackhole/` (an "epic page destruction" Canvas-2D particle singularity triggered by the footer's
"Don't click me" button — loaded lazily on every page except the easter-egg via
`loadBlackHoleEffect()` in `components.js`) and `easter-egg/` (a standalone Rilke "Der Panther"
themed game/terminal experience with its own translations, audio, and game CSS). Despite the
project hint, these effects are pure Canvas 2D — there is no Three.js anywhere in the repo. See
[[blackhole-effect]], [[easter-egg]], and [[canvas-effects]].

Content/SEO/GEO concerns are handled by static artifacts at the root: `sitemap.xml` (with
hreflang `xhtml:link` alternates), `robots.txt`, hand-curated `llms.txt` and full-text
`llms-full.txt` for AI-assistant citation, plus per-page canonical/hreflang tags and JSON-LD
(`Person`+`WebSite` on the homepage, `BlogPosting`+`BreadcrumbList` per post). `MARKETING.md` is
the operational log for analytics, SEO fixes, and performance passes; `CLAUDE.md` is the
contributor guide. A local-only `skills/write-blog-post/` Claude skill (gitignored) documents the
blog-authoring workflow. See [[seo-geo-layer]], [[geo-ai-citation]], [[marketing-doc]], and
[[write-blog-post-skill]].

## External services

See [[external-services]] for the full table. In brief:

- **GitHub Pages** — static hosting, auto-deploy from the `main` branch, custom domain via `CNAME`.
- **Umami Cloud** (`cloud.umami.is`) — privacy-friendly, cookieless analytics; website ID
  `d04784b7-9e58-43ad-b71b-73328369d474`; defer-loaded in `index.html` and the easter-egg.
- **D3.js v7** via `d3js.org` CDN — visualizations inside select blog posts.
- **Tailwind CSS v3.4.17 standalone CLI** — fetched from GitHub releases for the local build
  (not a runtime dependency).
- **Google Search Console** — SEO/indexing monitoring (referenced in `MARKETING.md`, not embedded).
- **Perplexity MCP** — used only by the local `write-blog-post` skill for research (authoring-time).

## Key flows

### 1. Page load & shared-chrome injection

1. Browser loads a page (e.g. `index.html`) which links `css/tailwind.css` then `css/styles.css`
   and defers `components.js`, `translations.js`, `main.js`.
2. On `DOMContentLoaded`, `components.js` runs `detectBasePath()` / `detectActivePage()` /
   `isHomePage()`.
3. It replaces `#header-placeholder`, `#footer-placeholder`, `#back-to-top-placeholder` with
   `getHeader()` / `getFooter()` / `getBackToTopButton()` markup.
4. It sets the footer year and (except on `/easter-egg`) calls `loadBlackHoleEffect()` to lazily
   inject the black-hole CSS/overlay/JS.
5. `main.js`'s `DOMContentLoaded` handler calls `setLanguage(currentLang)`, sets up the
   `IntersectionObserver`, mobile menu, smooth scroll, and back-to-top.

### 2. Language toggle (DE/EN)

1. User clicks the `#lang-toggle` (or mobile) button.
2. `main.js` calls `setLanguage(currentLang === 'de' ? 'en' : 'de')`.
3. `setLanguage` persists to `localStorage`, sets `<html lang>`, and updates the DE/EN indicator UI.
4. If on a non-blog page: it swaps every `[data-i18n]` element's text from the translations
   dictionary in place.
5. If on a blog page: it redirects to the mirror-language URL (`/blog/` ↔ `/blog/en/`,
   `/posts/de/` ↔ `/posts/en/`), applying `slugMap` for the one differing filename.

### 3. Authoring & publishing a blog post

1. (Optional) `write-blog-post` skill: research via Perplexity MCP and plan structure.
2. Create the German HTML in `blog/posts/de/<slug>.html` (copy an existing post / `TEMPLATE.html`),
   referencing shared assets with `../../../` and `tailwind.css` before `styles.css`.
3. Create the English translation in `blog/posts/en/<slug>.html` and a hand-curated
   `.related-posts` section in both.
4. Generate any diagrams as draw.io XML in `blog/diagrams/`, export to SVG manually, and swap into
   `<img>` placeholders; add D3.js CDN if needed.
5. Add a card entry to `blog/index.html` (DE) and `blog/en/index.html` (EN); add any new strings to
   `js/translations.js`.
6. If new Tailwind utility classes were used, run `./tailwind/build.sh` and commit `css/tailwind.css`;
   regenerate `sitemap.xml` + `llms.txt`/`llms-full.txt`.
7. `git add/commit/push` to `main` → GitHub Pages auto-deploys.

### 4. Black-hole easter-egg trigger

1. `loadBlackHoleEffect()` has already injected `blackhole.css`, the `#black-hole-overlay` markup,
   and `blackhole.js` on page load.
2. User clicks the footer `#black-hole-trigger` ("Don't click me") button.
3. `blackhole.js` spawns ~3000 swirling `Particle`s toward a center singularity with shake/flash,
   "consuming" the page over the configured durations.

## Gotchas

- **No bundler/framework** — edit HTML by hand and copy existing files as templates; there is no
  component templating at build time, only runtime JS injection.
- If a newly added Tailwind utility class doesn't apply, you forgot to run `./tailwind/build.sh`
  and commit the regenerated `css/tailwind.css`. The content scan must include `js/**/*.js` or
  runtime-injected header/footer classes get purged.
- The Tailwind CLI binary (`tailwind/tailwindcss`, ~46MB) is gitignored; re-download it via the
  command in `build.sh`'s header before building.
- The entire `skills/` directory and `CLAUDE.md` and `/blog/linkedin_posts` are gitignored — they
  are local-only and not part of the deployed site.
- **Project hint is partially inaccurate**: there is NO Three.js anywhere (the black-hole and
  easter-egg are Canvas 2D), and there is no `courses/` or committed `skills/` showcase directory
  in the current tree despite `MARKETING.md`/`CLAUDE.md` mentioning them.
- Blog posts live 3 levels deep; always reference shared assets with `../../../` and load
  `css/tailwind.css` BEFORE `css/styles.css` so custom styles override utilities.
- i18n for the blog is structural (duplicate DE/EN files + redirect), not in-place — adding a post
  means creating BOTH language files AND updating BOTH index grids AND `translations.js`.
- The one post whose DE/EN filenames differ (`mit-ai-halluzinationen` ↔ `mit-ai-hallucinations`)
  is special-cased in the `slugMap` in `translations.js`; any future divergent slug must be added
  there or the language toggle 404s.
- Homepage hreflang is `x-default` ONLY (no de/en pair) on purpose — re-adding a de/en pair to the
  single bilingual homepage URL reintroduces the duplicate-canonical GSC error.
- After adding/removing posts you must regenerate `sitemap.xml`, `llms.txt`, and `llms-full.txt`;
  these are not auto-generated at deploy time.
- `robots.txt` disallows `/easter-egg/` and `/blackhole/`, and the easter-egg sets a noindex meta —
  don't accidentally link them in the sitemap.
- Client logos are served as display-res `.webp` (~5KB); the `.png` masters in `logos/` are
  intentionally unreferenced. Add a new logo as a 2x WebP, not PNG.
- Fonts are self-hosted woff2-first with ttf fallback (no Google Fonts, for privacy); adding a
  weight requires converting ttf→woff2 and adding a woff2-first `@font-face` rule.
