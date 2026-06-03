---
title: GEO / AI-citation layer (llms.txt)
type: concept
project: website
path: llms.txt
related:
  - "[[seo-geo-layer]]"
  - "[[blog-system]]"
  - "[[marketing-doc]]"
created: 2026-06-01
updated: 2026-06-01
confidence: high
---

# GEO / AI-citation layer (llms.txt)

## Summary

`llms.txt` + `llms-full.txt` + per-post JSON-LD position the site for AI-assistant citation,
distinct from Google SEO.

## Details

Beyond classic SEO, the site treats AI assistants as a first-class traffic/citation source.

- `llms.txt` is a curated, link-annotated index of the site and every post in both languages.
- `llms-full.txt` (~194KB) inlines full article bodies so an assistant can quote primary text
  without crawling.

Both are referenced from `robots.txt`. This is the emerging "llms.txt convention" for Generative
Engine Optimization (GEO).

The author **dogfoods** the topic — multiple blog posts are about Claude, skills, and agents — and
the JSON-LD (`Person` / `WebSite` / `BlogPosting` / `BreadcrumbList`) gives both Google and LLMs
explicit entity structure. These files must be **regenerated whenever posts are added** (see
[[seo-geo-layer]]).

## Related

- [[seo-geo-layer]] — the concrete artifacts (`llms.txt`, `llms-full.txt`, JSON-LD) live there.
- [[blog-system]] — the post bodies inlined into `llms-full.txt`.
- [[marketing-doc]] — records the GEO/AI-citation strategy and SEO surface.
