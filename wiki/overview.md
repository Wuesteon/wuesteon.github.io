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
updated: 2026-07-03
confidence: high
---

# waiser.dev — Project Overview

## One-liner

waiser.dev — the bilingual (DE/EN) static HTML/CSS/JS portfolio and blog of **Nils Weiser, AI
Agent Specialist & AI Security** (Bodenseeraum, Schweiz), redesigned in the "Blackwall" cyberpunk
theme (red-on-near-black) and deployed on GitHub Pages with no build step.

## Positioning

As of the "Blackwall" redesign (merged to `main` in commit `682aeef`), the site is positioned
around **AI Agents · AI Security · Custom Development**. The wordmark `wAIser` is a pun (weiser =
"wise" in German + the embedded **AI**), and the site-wide tagline is **"Make your agents wAIser."**
Custom Development is framed as invitation-only ("Auf Anfrage" / scarcity). The old "IT Consultant
& AI Developer" positioning and the terminal cyan/green identity are gone from every shipped page.

## Stack

- HTML5 (multi-page static site)
- Vanilla JavaScript (ES, no framework, no bundler)
- **Blackwall design system** — hand-authored CSS in `css/tokens.css` (3-layer design tokens +
  self-hosted `@font-face`) and `css/blackwall.css` (all component styles). See
  [[terminal-design-system]].
- **GSAP + ScrollTrigger**, vendored locally in `js/vendor/` (no CDN), for the homepage
  choreography (progress bar, nav-solidify, word reveals, stat count-up, breach sequence).
- Self-hosted fonts: **Chakra Petch** (display/wordmark), **Space Grotesk** (body), **Space Mono**
  (labels/code) — 9 woff2 files, root-absolute `/fonts/` paths, no Google CDN.
- Canvas 2D API (blackhole + panther easter-egg animations)
- **Legacy** Tailwind CSS v3.4.17 (committed `css/tailwind.css`) + legacy `css/styles.css` — now
  loaded **only** on blog posts and the two legal pages for back-compat; NOT on the homepage,
  blog indexes, or 404. See [[tailwind-build]].
- Umami Cloud analytics
- GitHub Pages hosting
- Schema.org JSON-LD structured data

## Entry points

- `index.html` — homepage / primary entry (Blackwall "Momentum" hero)
- `blog/index.html` — DE blog index
- `blog/en/index.html` — EN blog index
- `js/translations.js`, `js/components.js`, `js/main.js`, `js/site.js`, `js/extras.js` — the
  site-wide script layer (see below)
- `js/vendor/gsap.min.js`, `js/vendor/ScrollTrigger.min.js` — vendored animation engine
- `css/tokens.css`, `css/blackwall.css` — the design-system entry points
- `blog/posts/de/`, `blog/posts/en/` — per-language post trees (16 posts each = 32 total)
- `blackhole/blackhole.js` — lazy Canvas-2D effect
- `easter-egg/index.html` — standalone "Der Panther" experience
- `CLAUDE.md`, `MARKETING.md` — contributor guide + growth/ops journal

## Architecture

waiser.dev is a fully static, multi-page website served as-is by GitHub Pages from the `main`
branch (custom domain pinned in `CNAME` → waiser.dev). There is no runtime backend, no server
code, and no client framework. Since the Blackwall redesign each top-level page links the design
tokens then the component styles (`css/tokens.css` then `css/blackwall.css`), vendors the animation
engine (`js/vendor/gsap.min.js` then `js/vendor/ScrollTrigger.min.js`), and loads the shared script
layer (`translations.js` → `components.js` → `main.js` → `site.js` → `extras.js`). Blog posts and
the two legal pages additionally load the legacy `css/tailwind.css` + `css/styles.css` under the
`css/blog-post.css` theme-bridge (see below). The only "build" is the now-legacy, optional Tailwind
compile in `tailwind/`; nothing needs to run for the shipped pages to work. See [[static-no-build]],
[[terminal-design-system]], and [[tailwind-build]].

The **design system** is a three-layer token model in `css/tokens.css`: Layer 1 primitives (the
brand red ramp `--red-50…--red-900` with `--red-500 #ff2a3c` core / `--red-400 #ff5a68` hot, the
ink/neutral ramp `--ink-0 #050507` page bg …, plus a `--cyan-500 #2ae0ff` glitch channel), Layer 2
semantic role aliases (`--color-bg`, `--color-brand`, `--color-text` …), and Layer 3 back-compat
shorthands (`--red`, `--hot`, `--ice`, `--bg`, `--surf`, `--line`, `--mut`) so `blackwall.css` and
legacy CSS can reference either vocabulary. `css/blackwall.css` holds every component: the fixed
`.nav`/`.foot`, the `.mh` Momentum hero, "living" glitch buttons (`.btn--pri`), service tilt cards
(`.scard`), post teaser cards (`.tcard`), the security `.breach` sequence, the `.az-*` Agent
Opportunity Scan, the `.art-*` article layout, `.lang-toggle`, and the `.mnav` mobile drawer.
`css/blog-post.css` is a theme-bridge that re-skins the legacy post components to the red palette.
See [[terminal-design-system]].

The shared chrome (header, footer, back-to-top button) is not duplicated across files; instead each
page drops empty placeholder `<div>`s (`#header-placeholder`, `#footer-placeholder`,
`#back-to-top-placeholder`), and `js/components.js` replaces them at `DOMContentLoaded` with markup
returned by `getHeader()`, `getFooter()`, and `getBackToTopButton()`. The Blackwall `getHeader()`
emits the `.nav` with the **red-umbrella** logo mark (`logos/mark.svg`), the `wAIser.dev` wordmark
(`w<span class="ai">AI</span>ser<span class="tld">.dev</span>`), the nav links (Free scan / Services
/ Security / Blog / Contact + a "Scan my site" CTA), the `#lang-toggle`, and the footer keeps the
`#black-hole-trigger` easter egg + `#currentYear`. `components.js` still auto-detects the page's
directory depth via `detectBasePath()` (returning `''`, `'../'`, `'../../'`, or `'../../../'`) so
injected links resolve from the homepage, the blog indexes, and the three-levels-deep posts alike.
See [[shared-components]] and [[runtime-component-injection]].

Internationalization (DE default, EN alternate) is implemented client-side in `js/translations.js`,
now extended with ~70 new `bw.*` keys (DE/EN parity) for the redesigned copy. A `translations`
object holds key→string maps for `de` and `en`; `setLanguage()` swaps every `[data-i18n]` element
(with `data-i18n-html` for innerHTML and `data-i18n-attr` for attributes), toggles `<html lang>`,
persists to `localStorage`, and updates the DE/EN toggle. A `window.onLanguageChange` hook lets
scripts re-render (`site.js` re-renders the JS-built post feeds/cards and re-syncs the living-button
labels on toggle). The blog is not translated in-place — it has parallel directory trees (`blog/` +
`blog/posts/de/` for German, `blog/en/` + `blog/posts/en/` for English), and `setLanguage()`
redirects between matching DE/EN URLs, applying a `slugMap` for the **four** posts whose DE/EN
filenames differ (`mit-ai-halluzinationen`↔`mit-ai-hallucinations`,
`ambient-ai-die-naechste-ki-generation`↔`ambient-ai-the-next-ai-generation`,
`loops-statt-prompts-cherny`↔`loops-not-prompts-cherny`,
`opus-4-8-dynamische-workflows-erst-recht-audit`↔`opus-4-8-dynamic-workflows-erst-recht-audit`).
See [[i18n-system]] and [[i18n]].

The **homepage** (`index.html`) is a long-scroll Blackwall layout under a `<main>` landmark:
`#home` (`.mh` Momentum hero — the `wAIser` wordmark with a hover/glitch chromatic split, a kinetic
rotating headline "Ship AI that acts./defends./scales./ships.", subtitle, CTAs, and client proof),
`#scan` (`.analyze` — the **Agent Opportunity Scan** tool), `#services` (`.vrows` — three service
value-rows including the invitation-only Custom Development), a `.clients` client-logo marquee,
`#security` (`.breach` — an animated "poisoned in two messages" security sequence), `#blog`
(`.feed` — the first three posts), `#contact` (a **two-path** contact block: book-a-call via
Calendly for Agents/Security vs. an email pitch for Custom Dev), and a `.cta-end` closer ("Make
your agents wAIser."). `js/site.js` owns the interactive behavior: it holds the `POSTS` array (the
16 real posts, DE/EN localized, with real hrefs), builds the post teaser cards (`tcardHTML()`),
renders the home feed / blog list / related-posts (`renderHomeFeed` / `renderBlogList` /
`enhanceArticle`), drives the client-logo marquee + AI scan beam, runs the GSAP choreography, builds
the mobile drawer, and upgrades `.btn--pri` into "living" glitch buttons. `js/extras.js` runs the
hero terminal typer and the Agent Opportunity Scan (a **client-side, deterministic simulation** per
domain, bilingual, marked `// BACKEND HOOK` for a future real scanner). `js/main.js` is now thin
(i18n init + delegated lang-toggle wiring); nav-solidify, mobile drawer, reveals, and smooth-scroll
are handled by `site.js` / CSS. See [[homepage]] and [[main-interactions]].

All **32 blog posts** (16 DE + 16 EN) were restyled into the `.art-*` article layout: an
`.art-hero` (category badge + author meta + read-time), `.art-body` prose, an `.art-share` author
card, and `.art-more` related posts. Each post loads the legacy `css/tailwind.css` + `css/styles.css`
under the `css/blackwall.css` + `css/blog-post.css` theme-bridge, and `js/site.js` (its
`enhanceArticle()` fills the read-time and renders three related posts into `#art-more-grid`). D3.js
is no longer used by any post. The blog index pages (`blog/index.html`, `blog/en/index.html`) are
Blackwall listings with category filter chips, populated from the same `POSTS` array. See
[[blog-system]].

Two hidden interactive "toys" live outside the indexed site and are `Disallow`ed in `robots.txt`:
`blackhole/` (an "epic page destruction" Canvas-2D particle singularity triggered by the footer's
"Don't click me" button — loaded lazily on every page except the easter-egg via
`loadBlackHoleEffect()` in `components.js`) and `easter-egg/` (a standalone Rilke "Der Panther"
experience with its own translations, audio, and CSS). These are pure Canvas 2D — there is no
Three.js in the shipped site, and the redesign mockup's `#field` hero canvas is explicitly
**disabled** in `site.js`. See [[blackhole-effect]], [[easter-egg]], and [[canvas-effects]].

Content/SEO/GEO concerns are handled by static artifacts at the root: `sitemap.xml` (37 URLs, with
hreflang `xhtml:link` alternates), `robots.txt`, hand-curated `llms.txt` and full-text
`llms-full.txt` (repositioned to the AI Agent / AI Security framing) for AI-assistant citation, plus
per-page canonical/hreflang tags and JSON-LD (`Person`+`WebSite` on the homepage,
`BlogPosting`+`BreadcrumbList` per post). `MARKETING.md` is the operational log; `CLAUDE.md` is the
contributor guide. A local-only `skills/write-blog-post/` Claude skill (gitignored) documents the
blog-authoring workflow. See [[seo-geo-layer]], [[geo-ai-citation]], [[marketing-doc]], and
[[write-blog-post-skill]].

## External services

See [[external-services]] for the full table. In brief:

- **GitHub Pages** — static hosting, auto-deploy from the `main` branch, custom domain via `CNAME`.
- **Umami Cloud** (`cloud.umami.is`) — privacy-friendly, cookieless analytics; website ID
  `d04784b7-9e58-43ad-b71b-73328369d474`; defer-loaded in `index.html` and the easter-egg.
- **Calendly** — the "book a call" path in the homepage `#contact` block. **The link is still a
  placeholder** (`calendly.com/DEIN-LINK`) — see `TODO-GO-LIVE.md`; this is the one go-live blocker.
- **Tailwind CSS v3.4.17 standalone CLI** — legacy; still fetched from GitHub releases for the local
  build, but the committed `css/tailwind.css` is now only consumed by posts/legal pages.
- **Google Search Console** — SEO/indexing monitoring (referenced in `MARKETING.md`, not embedded).
- **Perplexity MCP** — used only by the local `write-blog-post` skill for research (authoring-time).

GSAP + ScrollTrigger and all fonts are **self-hosted / vendored** — no jsDelivr, no Google Fonts,
no D3 CDN. There is no runtime third-party JS beyond Umami.

## Key flows

### 1. Page load & shared-chrome injection

1. Browser loads a page (e.g. `index.html`), which preloads the above-the-fold woff2 fonts, links
   `css/tokens.css` then `css/blackwall.css`, and loads the vendored GSAP + ScrollTrigger followed
   by `translations.js`, `components.js`, `main.js`, `site.js`, `extras.js`.
2. On `DOMContentLoaded`, `components.js` runs `detectBasePath()` / `detectActivePage()` /
   `isHomePage()`.
3. It replaces `#header-placeholder`, `#footer-placeholder`, `#back-to-top-placeholder` with the
   Blackwall `getHeader()` / `getFooter()` / `getBackToTopButton()` markup (red-umbrella mark,
   `wAIser.dev` wordmark, `#lang-toggle`, `#black-hole-trigger`).
4. It sets the footer year and (except on `/easter-egg`) calls `loadBlackHoleEffect()` to lazily
   inject the black-hole CSS/overlay/JS.
5. `main.js` calls `setLanguage(currentLang)` (applying `data-i18n`) and delegates the lang-toggle
   click; `site.js` renders the JS-built feeds, builds the mobile drawer, upgrades living buttons,
   and (on `window.load`) runs the GSAP choreography.

### 2. Language toggle (DE/EN)

1. User clicks `#lang-toggle` (nav) or `#lang-toggle-mobile` (drawer, built by `site.js`).
2. `main.js` delegates the click and calls `setLanguage(currentLang === 'de' ? 'en' : 'de')`.
3. `setLanguage` persists to `localStorage`, sets `<html lang>`, updates the segmented toggle, and
   swaps every `[data-i18n]` / `data-i18n-html` / `data-i18n-attr` node.
4. It fires `window.onLanguageChange`, so `site.js` re-renders the JS-built post cards and re-syncs
   the living-button labels from the live translation.
5. On a blog page it instead redirects to the mirror-language URL (`/blog/` ↔ `/blog/en/`,
   `/posts/de/` ↔ `/posts/en/`), applying `slugMap` for the four divergent filenames.

### 3. Agent Opportunity Scan (homepage `#scan`)

1. User enters a domain in `#az-form` and submits.
2. `js/extras.js` cleans the domain, types a bilingual "scan" console animation into `#az-console`,
   then renders a deterministic per-domain report (score + three agent-opportunity cards) into
   `#az-report`. It is a **client-side simulation** (`analyzeCompany()`), marked `// BACKEND HOOK`
   for swapping in a real scraper/analysis API later.

### 4. Authoring & publishing a blog post

1. (Optional) `write-blog-post` skill: research via Perplexity MCP and plan structure.
2. Create the German HTML in `blog/posts/de/<slug>.html` (copy an existing Blackwall post),
   referencing shared assets with `../../../`. Post CSS order is `tailwind.css` → `tokens.css` →
   `blackwall.css` → `styles.css` → `blog-post.css`; use the `.art-*` layout (`.art-hero`,
   `.art-body`, `.art-share`, `.art-more`), and load `js/site.js`.
3. Create the English translation in `blog/posts/en/<slug>.html`. If the EN slug differs from the
   DE slug, add both directions to the `slugMap` in `translations.js`.
4. Add the post to the `POSTS` array in `js/site.js` (id, cat, and DE/EN `{href,title,excerpt,
   date,read}`) so it appears in the home feed, blog index, and related-posts.
5. If any new Tailwind utility class was used in the post, run `./tailwind/build.sh` and commit
   `css/tailwind.css`; regenerate `sitemap.xml` + `llms.txt`/`llms-full.txt`.
6. `git add/commit/push` to `main` → GitHub Pages auto-deploys.

### 5. Black-hole easter-egg trigger

1. `loadBlackHoleEffect()` has already injected `blackhole.css`, the `#black-hole-overlay` markup,
   and `blackhole.js` on page load.
2. User clicks the footer `#black-hole-trigger` ("Don't click me") button.
3. `blackhole.js` spawns swirling `Particle`s toward a center singularity with shake/flash,
   "consuming" the page.

## Gotchas

- **No bundler/framework** — edit HTML by hand and copy existing files as templates; the only
  templating is runtime JS injection of the header/footer.
- **The design system is `css/tokens.css` + `css/blackwall.css`, not Tailwind.** Top-level pages
  (homepage, blog indexes, 404) do NOT load `tailwind.css` or `styles.css` at all. Only blog posts
  and the two legal pages still load them (as legacy, under the `blog-post.css` bridge). Don't add
  Tailwind utilities to the homepage expecting them to apply.
- Adding a post is a **`POSTS`-array edit in `js/site.js`** plus two HTML files — the home feed,
  blog index, and related-posts are all rendered from that one array. Forgetting it means the post
  exists but is never listed.
- The Agent Opportunity Scan (`#scan`) is a **client-side simulation** — it does not call any
  backend. The real scanner is a `// BACKEND HOOK` TODO in `js/extras.js`.
- The **Calendly link is a placeholder** (`calendly.com/DEIN-LINK`) — the one open go-live blocker,
  tracked in `TODO-GO-LIVE.md`.
- GSAP + ScrollTrigger are **vendored** in `js/vendor/` (no CDN) and must load in that order
  (`gsap.min.js` then `ScrollTrigger.min.js`) before `site.js`.
- Fonts are **Chakra Petch / Space Grotesk / Space Mono** (self-hosted woff2, root-absolute
  `/fonts/`, no Google CDN). The old **Inter / JetBrains Mono** woff2/ttf files remain in `fonts/`
  but are unused by shipped pages — don't reintroduce them.
- **No Three.js and no active hero canvas**: the mockup's `#field` canvas is disabled in `site.js`;
  the only Canvas 2D left is the black-hole/easter-egg toys.
- **D3.js is no longer used by any post** — the old `d3js.org` CDN dependency is gone.
- i18n for the blog is structural (duplicate DE/EN files + redirect), not in-place — adding a post
  means creating BOTH language files AND updating the `POSTS` array AND (if the slug differs) the
  `slugMap`.
- **Four** posts have divergent DE/EN filenames and are special-cased in the `slugMap` in
  `translations.js`; any future divergent slug must be added there or the language toggle 404s.
- Homepage hreflang is `x-default` ONLY (no de/en pair) on purpose — re-adding a de/en pair to the
  single bilingual homepage URL reintroduces the duplicate-canonical GSC error.
- After adding/removing posts you must regenerate `sitemap.xml`, `llms.txt`, and `llms-full.txt`;
  these are not auto-generated at deploy time.
- `robots.txt` disallows `/easter-egg/` and `/blackhole/`, and the easter-egg sets a noindex meta —
  don't accidentally link them in the sitemap.
- Client logos are served as display-res `.webp` (some `.svg`); the `.png` masters in `logos/` are
  intentionally unreferenced. The logo set lives in the `LOGOS` array in `js/site.js`. The new
  **red-umbrella** octagon mark is `logos/mark.svg` (nav/footer) + `favicon.svg`.
- The old Tailwind CLI binary (`tailwind/tailwindcss`, ~46MB) is gitignored; the whole `tailwind/`
  build is now effectively dead for shipped top-level pages and only matters if a post/legal page
  introduces a new utility class.
