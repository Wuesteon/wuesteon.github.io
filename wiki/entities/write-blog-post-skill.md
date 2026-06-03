---
title: write-blog-post Skill
type: entity
project: website
path: skills/write-blog-post/
related:
  - "[[blog-system]]"
  - "[[seo-geo-layer]]"
  - "[[static-no-build]]"
created: 2026-06-01
updated: 2026-06-01
confidence: high
---

# write-blog-post Skill

**Kind:** feature · **Path:** `skills/write-blog-post/`

## Summary

Local-only (gitignored) Claude Code skill documenting the bilingual blog-authoring + draw.io
diagram workflow.

## Details

`skills/write-blog-post/SKILL.md` plus `references/` (`DRAWIO-EXAMPLES.md`, `TEMPLATE.html`) and
`assets/` encode the repeatable process for adding a post:

1. Perplexity-MCP research → content planning.
2. Write the German HTML (with EN translation).
3. Generate technical diagrams as draw.io XML (which the user manually exports to SVG and swaps
   into placeholder `<img>` tags — diagrams live in `blog/diagrams/`).
4. Update the blog index grid and `js/translations.js`.

The `TEMPLATE.html` captures the site's terminal-themed post structure (head / SEO / JSON-LD /
related-posts).

**Important:** the entire `skills/` directory is listed in `.gitignore`, so it is local Claude Code
configuration, **not part of the deployed site**. It documents the same conventions enforced in
`blog/posts` and the [[seo-geo-layer]].

## Related

- [[blog-system]] — the content tree this skill knows how to extend (including `blog/diagrams/`).
- [[seo-geo-layer]] — the canonical/hreflang/JSON-LD + sitemap/llms conventions the skill enforces.
- [[static-no-build]] — explains why authoring is hand-copying HTML templates, not templating.
