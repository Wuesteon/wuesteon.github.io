---
title: Wiki Index — waiser.dev
type: index
project: website
path: "-"
related:
  - "[[overview]]"
  - "[[CLAUDE]]"
  - "[[log]]"
  - "[[glossary]]"
created: 2026-06-01
updated: 2026-06-01
confidence: high
---

# Wiki Index — waiser.dev

Master catalog of every page in this wiki. The raw source of truth is the codebase under
`/Users/wuesteon/PROJECTS/website/`; this wiki is the summarized view. See [[CLAUDE]] for the
schema and the Ingest/Query/Lint workflows.

## Overview

- [[overview]] — Executive summary, stack, entry points, full architecture prose, external
  services, key flows, and gotchas.
- [[CLAUDE]] — The wiki schema: layout, frontmatter spec, double-bracket `wikilink` convention, and
  Ingest/Query/Lint workflows.

## Architecture & Concepts

- [[data-model]] — Why there's no DB: the four "data" surfaces (translations dict, `localStorage`,
  JSON-LD entities, sitemap/llms catalogs).
- [[external-services]] — Hosting, analytics, CDNs, and authoring-time tooling (mostly not runtime
  dependencies).
- [[static-no-build]] — Everything is plain HTML/CSS/JS; the only build is an optional, committed
  Tailwind compile.
- [[runtime-component-injection]] — Header/footer/back-to-top are placeholders swapped on
  `DOMContentLoaded`, with link paths derived from URL depth.
- [[i18n]] — Bilingual DE/EN: in-place `data-i18n` swaps for UI, mirrored file trees + redirects
  for the blog.
- [[geo-ai-citation]] — `llms.txt` + `llms-full.txt` + per-post JSON-LD for AI-assistant citation
  (distinct from Google SEO).
- [[performance-optimization]] — Lighthouse-driven passes: WebP logos, Tailwind CDN→static CSS,
  font preloading, ttf→woff2.
- [[canvas-effects]] — The "wow" moments are vanilla Canvas 2D (no Three.js), lazily loaded and
  noindexed.

## Entities

- [[homepage]] — Single-page portfolio: hero, services, about, contact, client-logo strip
  (`index.html`).
- [[shared-components]] — Runtime-injected header/footer/back-to-top with auto base-path detection
  (`js/components.js`).
- [[i18n-system]] — DE/EN translation dictionary + language toggle + cross-language blog redirects
  (`js/translations.js`).
- [[main-interactions]] — Scroll-reveal, stat counters, mobile menu, smooth scroll, back-to-top
  (`js/main.js`).
- [[blog-system]] — Bilingual blog: parallel DE/EN index pages + 14 posts per language (`blog/`).
- [[blackhole-effect]] — Canvas-2D "page destruction" particle singularity (`blackhole/`).
- [[easter-egg]] — Standalone Rilke "Der Panther" terminal/game experience, noindexed
  (`easter-egg/`).
- [[terminal-design-system]] — All custom CSS: terminal aesthetic, glow, cards, blog styles, fonts
  (`css/styles.css`).
- [[tailwind-build]] — Standalone Tailwind v3 CLI compiling the committed `css/tailwind.css`
  (`tailwind/`).
- [[seo-geo-layer]] — Sitemap + robots + llms + per-page canonical/hreflang/JSON-LD
  (`sitemap.xml` et al.).
- [[marketing-doc]] — Operational record of analytics, SEO fixes, and performance passes
  (`MARKETING.md`).
- [[write-blog-post-skill]] — Local-only (gitignored) Claude skill for bilingual blog authoring
  (`skills/write-blog-post/`).
- [[legal-pages]] — German-required Impressum + Datenschutz pages (`impressum.html`,
  `datenschutz.html`).

## Reference

- [[glossary]] — Domain and project-specific terms (waiser.dev, basePath, GEO, hreflang,
  Bodenseeraum, …).
- [[log]] — Append-only operation log for this wiki.
