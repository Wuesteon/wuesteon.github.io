---
title: SEO / GEO Layer
type: entity
project: website
path: sitemap.xml
related:
  - "[[blog-system]]"
  - "[[homepage]]"
  - "[[marketing-doc]]"
  - "[[write-blog-post-skill]]"
  - "[[geo-ai-citation]]"
created: 2026-06-01
updated: 2026-06-01
confidence: high
---

# SEO / GEO Layer

**Kind:** layer · **Path:** `sitemap.xml` (plus `robots.txt`, `llms.txt`, `llms-full.txt`, per-page heads)

## Summary

Static SEO + AI-citation surface: sitemap with hreflang, robots.txt, llms.txt/llms-full.txt,
per-page canonical + JSON-LD.

## Details

A cluster of root artifacts plus per-page head markup:

- `sitemap.xml` lists home + DE/EN blog indexes + all posts, each with `xhtml:link` hreflang
  alternates.
- `robots.txt` allows all, disallows `/easter-egg/` and `/blackhole/`, and points to both the
  sitemap and the llms files.
- `llms.txt` is a curated index of the site and every post (title + one-line summary in both
  languages).
- `llms-full.txt` (~194KB) inlines full article text — both exist for AI-assistant / GEO citation
  rather than Google indexing. See [[geo-ai-citation]].

On-page, each document declares canonical + hreflang (the homepage uses `x-default` **only** to
avoid duplicate-canonical; indexes/posts carry de/en/x-default) and JSON-LD: `Person`+`WebSite` on
the homepage, `BlogPosting`+`BreadcrumbList` per post, with authors/publishers cross-referencing
the homepage `#person` node.

[[marketing-doc]] (`MARKETING.md`) documents the May 2026 GSC indexing fixes and the linking
strategy. **Regenerate `sitemap.xml` + the llms files after adding posts** — they are not
auto-generated at deploy time.

## Related

- [[blog-system]] — the content this layer indexes; per-post heads carry their own SEO payload.
- [[homepage]] — carries `Person`/`WebSite` JSON-LD and the `x-default`-only hreflang.
- [[marketing-doc]] — operational log of SEO fixes and the internal-linking strategy.
- [[write-blog-post-skill]] — authoring workflow that updates this layer when posts are added.
- [[geo-ai-citation]] — the llms.txt / AI-citation concept behind `llms.txt` + `llms-full.txt`.
