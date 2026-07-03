---
title: Blog System
type: entity
project: website
path: blog/
related:
  - "[[i18n-system]]"
  - "[[main-interactions]]"
  - "[[seo-geo-layer]]"
  - "[[write-blog-post-skill]]"
  - "[[terminal-design-system]]"
  - "[[i18n]]"
created: 2026-06-01
updated: 2026-07-03
confidence: high
---

# Blog System

**Kind:** feature · **Path:** `blog/`

## Summary

Bilingual blog: parallel DE/EN Blackwall listing pages and **16 posts per language** (32 total),
all restyled into the `.art-*` article layout. Listings render from the `POSTS` array in
`js/site.js`; article pages self-enhance (read-time + related posts) via `enhanceArticle()`.

## Details

The blog is a static, hand-authored content tree. `blog/index.html` (DE) and `blog/en/index.html`
(EN) are the **Blackwall listing pages** — a `.blog-hero` with a glitch `.gtext` title, a
`.blog-filter` row of category `.chip`s (ALL · AI SECURITY · AGENTS · CLAUDE CODE · CLAUDE ·
RESEARCH · DEVELOPMENT), and an empty `#blog-list` grid. Individual articles live as standalone
HTML in `blog/posts/de/` and `blog/posts/en/` (16 slugs per language, e.g.
`agent-memory-poisoning-mem0`, `loops-statt-prompts-cherny`,
`opus-4-8-dynamische-workflows-erst-recht-audit`, `karpathy-claude-md`, `multi-agent-ai-crewai`).

**Data-driven listings.** Both listing grids are populated at runtime by `js/site.js`: a single
`POSTS` array holds the 16 posts (each with `id`, `cat`, and localized `de`/`en` objects carrying
`href`, `title`, `excerpt`, `date`, `read`). `renderBlogList()` filters by the active `.chip`
category and maps each post through `tcardHTML()` into a `.tcard` (category badge, read-time,
title, excerpt, date, arrow). The homepage feed reuses the same array (`renderHomeFeed()`, first
3). Clicking a chip re-filters; toggling language re-renders via the `window.onLanguageChange`
hook. So adding a post's listing entry means editing `POSTS` in `js/site.js`, not the index HTML.

**Article layout (`.art-*`).** Every post is restyled into the Blackwall article template:
`.art-hero` (an `.art-back` "◄ ALL POSTS" link, an `.art-cat` category badge, the `.art-title`
`h1`, and an `.art-meta` author line "NW · Nils Weiser" + `[data-art-date]` + `[data-art-read]`),
an `.art-hr` rule, the prose `<article class="art-body">`, an `.art-share` author card with a
"work with me" CTA, and an `.art-more` "Weitere Field Notes / More" section whose
`#art-more-grid` holds related posts.

**Self-enhancing pages.** On each article, `enhanceArticle()` in `js/site.js` matches the current
file to `POSTS` (by filename in either the `de` or `en` `href`), writes the correct read-time into
`[data-art-read]`, and renders the **next 3 posts** (wrapping around the array) as related
`.tcard`s into `#art-more-grid`. See [[main-interactions]].

**Stylesheet loading differs by page.** Listing pages load only the Blackwall CSS
(`css/tokens.css` + `css/blackwall.css`) plus vendored GSAP, and run `translations.js`,
`components.js`, `main.js`, `site.js`. **Posts** additionally keep the legacy stack: they load
five sheets — `css/tailwind.css`, `css/tokens.css`, `css/blackwall.css`, `css/styles.css`, and the
`css/blog-post.css` theme-bridge (which re-skins the legacy post components to the red palette,
loaded last so it overrides). Posts are 3 levels deep, so they reference shared assets with
`../../../`.

Each post carries its own SEO head: localized `<title>`, canonical, de/en/x-default hreflang
alternates matching the sitemap, and a JSON-LD `@graph` (`BlogPosting` with author/publisher linked
to the homepage `#person`, plus `BreadcrumbList`). Some posts pull in extra libraries (e.g. D3) for
in-article visualizations.

Adding a post means creating DE+EN files in the `.art-*` layout, adding the entry to `POSTS` in
`js/site.js`, adding any new translation keys, and regenerating `llms.txt`/`sitemap`. See
[[write-blog-post-skill]] and [[i18n]] for why the tree is duplicated.

## Related

- [[i18n-system]] — redirects between the DE/EN post trees on language toggle (uses `slugMap` for
  the 4 posts with differing slugs).
- [[main-interactions]] — `js/site.js` holds `POSTS`, `tcardHTML()`, `renderBlogList()`, and
  `enhanceArticle()`.
- [[seo-geo-layer]] — per-post canonical/hreflang/JSON-LD + sitemap + llms entries.
- [[write-blog-post-skill]] — the authoring workflow for new posts.
- [[terminal-design-system]] — the Blackwall CSS + `blog-post.css` bridge styling the `.art-*` and
  `.tcard` components.
- [[i18n]] — the structural (duplicated-tree) i18n concept the blog embodies.
