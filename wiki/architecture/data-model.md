---
title: Data Model
type: architecture
project: website
path: "-"
related:
  - "[[i18n-system]]"
  - "[[seo-geo-layer]]"
  - "[[blog-system]]"
  - "[[geo-ai-citation]]"
created: 2026-06-01
updated: 2026-06-01
confidence: high
---

# Data Model

## Summary

There is **no database or persistent data model** — the site is fully static. The closest things
to "data" are in-memory dictionaries, browser storage, embedded structured data, and hand/tooling-
maintained content catalogs.

## The four "data" surfaces

1. **The `translations` object** in `js/translations.js` — an in-memory DE/EN key→string
   dictionary, with a `slugMap` for cross-language post filename differences
   (`mit-ai-halluzinationen` ↔ `mit-ai-hallucinations`). See [[i18n-system]].
2. **`localStorage['lang']`** — stores the visitor's language preference across visits.
3. **JSON-LD structured-data "entities"** embedded per page — `Person` / `WebSite` on the
   homepage, `BlogPosting` / `BreadcrumbList` per post — cross-linked by `@id` (e.g. `#person`).
   See [[seo-geo-layer]].
4. **`sitemap.xml` and `llms.txt` / `llms-full.txt`** — hand/tooling-maintained content catalogs.
   See [[geo-ai-citation]].

**Blog "content"** is just one HTML file per post per language under `blog/posts/{de,en}/` — see
[[blog-system]]. There is no CMS, API, or query layer.

## Related

- [[i18n-system]] — the `translations` dictionary and `slugMap`.
- [[seo-geo-layer]] — the JSON-LD entity graph cross-linked by `@id`.
- [[blog-system]] — content-as-HTML-files, the closest thing to a content store.
- [[geo-ai-citation]] — the `llms.txt` / `llms-full.txt` content catalogs.
