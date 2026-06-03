---
title: External Services
type: architecture
project: website
path: "-"
related:
  - "[[overview]]"
  - "[[marketing-doc]]"
  - "[[seo-geo-layer]]"
  - "[[blog-system]]"
  - "[[tailwind-build]]"
  - "[[write-blog-post-skill]]"
  - "[[legal-pages]]"
created: 2026-06-01
updated: 2026-06-01
confidence: high
---

# External Services

## Summary

The site has no backend, so "external services" are hosting, analytics, two CDNs, and
authoring-time tooling — most are not runtime dependencies.

## Services

| Service | Role | Notes |
| --- | --- | --- |
| **GitHub Pages** | Static hosting | Auto-deploy from the `main` branch; custom domain via `CNAME` (waiser.dev). Repo `wuesteon.github.io`. |
| **Umami Cloud** (`cloud.umami.is`) | Analytics | Privacy-friendly, cookieless; website ID `d04784b7-9e58-43ad-b71b-73328369d474`; embedded defer-loaded in `index.html` and the easter-egg. Cookieless nature documented in [[legal-pages]]. |
| **D3.js v7** (`d3js.org` CDN) | Data viz | Loaded only inside select [[blog-system]] posts (rendered into `.d3-container`). |
| **Tailwind CSS v3.4.17 standalone CLI** | Build tooling | Fetched from GitHub releases for the local build (see [[tailwind-build]]); **not** a runtime dependency — the output CSS is committed. |
| **Google Search Console** | SEO/indexing monitoring | Referenced in [[marketing-doc]], not embedded in any page. |
| **Perplexity MCP** | Research | Used only by the local [[write-blog-post-skill]] for authoring-time research; not in the deployed site. |

## Related

- [[overview]] — the architecture-level summary of these services.
- [[marketing-doc]] — configures/records Umami and GSC.
- [[seo-geo-layer]] — the SEO surface GSC monitors.
- [[blog-system]] — the only consumer of the D3.js CDN.
- [[tailwind-build]] — uses the Tailwind standalone CLI (build-time only).
- [[write-blog-post-skill]] — the only consumer of Perplexity MCP (authoring-time).
- [[legal-pages]] — privacy page covering the cookieless Umami integration.
