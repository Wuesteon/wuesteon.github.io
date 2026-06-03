---
title: Blog System
type: entity
project: website
path: blog/
related:
  - "[[i18n-system]]"
  - "[[seo-geo-layer]]"
  - "[[write-blog-post-skill]]"
  - "[[terminal-design-system]]"
  - "[[i18n]]"
created: 2026-06-01
updated: 2026-06-01
confidence: high
---

# Blog System

**Kind:** feature · **Path:** `blog/`

## Summary

Bilingual blog: parallel DE/EN index pages and 14 posts per language as standalone HTML files.

## Details

The blog is a static, hand-authored content tree. `blog/index.html` (DE) and `blog/en/index.html`
(EN) are card-grid listing pages; individual articles live as standalone HTML in `blog/posts/de/`
and `blog/posts/en/` (14 slugs per language, e.g. `opus-4-8-dynamische-workflows-erst-recht-audit`,
`ambient-ai-die-naechste-ki-generation`, `karpathy-claude-md`, `multi-agent-ai-crewai`).

Posts are **3 levels deep**, so they reference shared assets with `../../../` and load
`tailwind.css` **before** `styles.css` (so custom rules override utilities).

Each post carries its own SEO head: localized `<title>`, canonical, de/en/x-default hreflang
alternates matching the sitemap, JSON-LD `@graph` (`BlogPosting` with author/publisher linked to
the homepage `#person`, plus `BreadcrumbList`), and a hand-curated `.related-posts` section
(3 same-language topical links) for internal-linking equity. Some posts pull in **D3.js v7** from
CDN for visualizations (rendered into `.d3-container`).

Adding a post means creating DE+EN files, updating both index grids, adding translations,
regenerating Tailwind if new classes appear, and regenerating `llms.txt`/`sitemap`. See
[[write-blog-post-skill]] for the documented workflow and [[i18n]] for why the tree is duplicated.

## Related

- [[i18n-system]] — redirects between the DE/EN post trees on language toggle (uses `slugMap`).
- [[seo-geo-layer]] — per-post canonical/hreflang/JSON-LD + sitemap + llms entries.
- [[write-blog-post-skill]] — the (gitignored) authoring workflow for new posts.
- [[terminal-design-system]] — `.blog-card`, `.related-posts`, `.d3-container` styling.
- [[i18n]] — the structural (duplicated-tree) i18n concept the blog embodies.
