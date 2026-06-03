---
title: Marketing & Analytics Doc
type: entity
project: website
path: MARKETING.md
related:
  - "[[seo-geo-layer]]"
  - "[[tailwind-build]]"
  - "[[performance-optimization]]"
  - "[[external-services]]"
created: 2026-06-01
updated: 2026-06-01
confidence: high
---

# Marketing & Analytics Doc

**Kind:** integration · **Path:** `MARKETING.md`

## Summary

Operational record of Umami analytics, SEO fixes, performance passes, and content/channel tracking.

## Details

`MARKETING.md` is the project's growth/ops journal (not code). It records:

- the Umami Cloud setup (script URL, website ID `d04784b7-…`, dashboard link, embedded
  defer-loaded in `index.html` and the easter-egg),
- the SEO surface (sitemap counts, hreflang strategy, schema, internal-linking math),
- a dated May 2026 Google Search Console indexing-fix log,
- the content map (blog topics, latest post, courses/skills mentions).

It also captures the Lighthouse-driven **performance history**: client logos → WebP
(~1.2MB → ~52KB), Tailwind Play CDN → prebuilt CSS, font preloading, and the ttf → woff2
conversion pass. See [[performance-optimization]]. It links to the project `CLAUDE.md` for the
how-to and lists the available `/seo` skills.

**Drift note:** it references `courses/` and a `skills/` showcase that are **not** present as
committed root directories in the current tree (the project hint/CLAUDE.md echo the same). Keep
this in mind when linting.

## Related

- [[seo-geo-layer]] — the SEO surface this doc tracks and explains.
- [[tailwind-build]] — the CDN→prebuilt-CSS perf win logged here.
- [[performance-optimization]] — the Lighthouse campaign this doc records.
- [[external-services]] — Umami and the other services this doc configures.
