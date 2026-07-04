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
updated: 2026-07-03
confidence: high
---

# Wiki Index — waiser.dev

Master catalog of every page in this wiki. The raw source of truth is the codebase under
`/Users/wuesteon/PROJECTS/website/`; this wiki is the summarized view. See [[CLAUDE]] for the
schema and the Ingest/Query/Lint workflows.

> **State:** reflects the **"Blackwall" redesign** (merged to `main`, commit `682aeef`). The site
> is now positioned as **Nils Weiser — AI Agent Specialist & AI Security** (wAIser.dev, "Make your
> agents wAIser"). The design system is [[terminal-design-system]] (`css/tokens.css` +
> `css/blackwall.css`); Tailwind is **legacy** (posts/legal pages only). See [[overview]].

## Overview

- [[overview]] — Executive summary, positioning, stack, entry points, full architecture prose,
  external services, key flows, and gotchas (Blackwall state).
- [[CLAUDE]] — The wiki schema: layout, frontmatter spec, double-bracket `wikilink` convention, and
  Ingest/Query/Lint workflows.

## Architecture & Concepts

- [[data-model]] — Why there's no DB: the "data" surfaces (the `POSTS` array in `js/site.js`, the
  translations dict, `localStorage`, JSON-LD entities, sitemap/llms catalogs).
- [[external-services]] — Hosting, analytics, Calendly, and authoring-time tooling (mostly not
  runtime dependencies; GSAP/fonts are self-hosted).
- [[static-no-build]] — Everything is plain HTML/CSS/JS; the only build is the now-legacy, optional
  Tailwind compile (posts/legal only).
- [[runtime-component-injection]] — Header/footer/back-to-top are placeholders swapped on
  `DOMContentLoaded` with Blackwall `.nav`/`.foot` markup, link paths derived from URL depth.
- [[i18n]] — Trilingual DE/EN/中文: in-place `data-i18n` swaps (+ `data-i18n-html`/`data-i18n-attr`) for
  UI, mirrored file trees + redirects (with a 4-entry `slugMap`) for the blog.
- [[geo-ai-citation]] — `llms.txt` + `llms-full.txt` + per-post JSON-LD for AI-assistant citation
  (repositioned to AI Agent / AI Security), distinct from Google SEO.
- [[performance-optimization]] — Lighthouse-driven passes: WebP logos, self-hosted vendored GSAP,
  self-hosted woff2 fonts, font preloading.
- [[canvas-effects]] — The remaining Canvas-2D "toys" (black hole + easter-egg); no Three.js and
  the mockup's `#field` hero canvas is disabled.

## Entities

- [[homepage]] — Long-scroll Blackwall page: Momentum hero (`.mh`), Agent Scan (`#scan`), service
  value-rows, client marquee, security `.breach`, blog feed, two-path contact, end-CTA
  (`index.html`).
- [[shared-components]] — Runtime-injected Blackwall `.nav`/`.foot`/back-to-top with the
  red-umbrella mark and auto base-path detection (`js/components.js`).
- [[i18n-system]] — DE/EN/中文 translation dictionary (~70 `bw.*` keys, zh added 2026-07-04, EN fallback) + 3-way language selector +
  `onLanguageChange` hook + cross-language blog redirects/`slugMap` (`js/translations.js`).
- [[main-interactions]] — The Blackwall behavioral layer across three files: `js/site.js` (the
  `POSTS` array, card/feed rendering, client marquee + AI scan beam, GSAP choreography, mobile
  drawer, living-button upgrader), `js/extras.js` (hero terminal typer + the client-side simulated
  Agent Opportunity Scan, bilingual, `// BACKEND HOOK`), and a thin `js/main.js` (i18n init +
  delegated lang-toggle wiring).
- [[blog-system]] — Trilingual blog: parallel DE/EN/中文 index pages + 16 posts per language (48 total)
  in the `.art-*` article layout (`blog/`).
- [[blackhole-effect]] — Canvas-2D "page destruction" particle singularity (`blackhole/`).
- [[easter-egg]] — Standalone Rilke "Der Panther" experience, noindexed (`easter-egg/`).
- [[terminal-design-system]] — The Blackwall design system: 3-layer tokens + self-hosted fonts
  (`css/tokens.css`) and all component styles (`css/blackwall.css`), plus the `css/blog-post.css`
  theme-bridge. This page was **repurposed** from the old terminal (cyan/green) design system,
  which the Blackwall redesign replaced (file slug kept as `terminal-design-system`).
- [[tailwind-build]] — **Legacy** standalone Tailwind v3 CLI compiling the committed
  `css/tailwind.css`, now consumed only by blog posts + legal pages (`tailwind/`).
- [[seo-geo-layer]] — Sitemap (37 URLs) + robots + llms + per-page canonical/hreflang/JSON-LD
  (`sitemap.xml` et al.).
- [[marketing-doc]] — Operational record of analytics, SEO fixes, and performance passes
  (`MARKETING.md`).
- [[write-blog-post-skill]] — Local-only (gitignored) Claude skill for bilingual blog authoring
  (`skills/write-blog-post/`).
- [[legal-pages]] — German-required Impressum + Datenschutz pages, restyled to Blackwall
  (`impressum.html`, `datenschutz.html`).

## Reference

- [[glossary]] — Domain and project-specific terms (Blackwall, wAIser wordmark, art-* layout, agent
  scan, living button, red-umbrella mark, Bodenseeraum, GEO, hreflang, …).
- [[log]] — Append-only operation log for this wiki.
