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
updated: 2026-07-03
confidence: high
---

# Marketing & Analytics Doc

**Kind:** integration · **Path:** `MARKETING.md`

## Summary

Operational record of the wAIser.dev positioning (AI Agent Specialist & AI Security),
Umami analytics, SEO surface, performance posture, and content/channel tracking —
refreshed for the 2026-07 "Blackwall" redesign.

## Details

`MARKETING.md` is the project's growth/ops journal (not code). It records:

- the **positioning**: Nils Weiser = **AI Agent Specialist & AI Security** (wAIser.dev),
  tagline "Make your agents wAIser"; services AI Agents · AI Security ·
  invitation-only Custom Development; location Bodenseeraum / Schweiz; the two-path
  contact (Calendly book-a-call vs. email pitch),
- the Umami Cloud setup (script URL, website ID `d04784b7-…`, dashboard link) —
  unchanged through the redesign but now embedded defer-loaded on `index.html`, both
  blog indexes, the legal pages, `404.html`, and the easter-egg,
- the SEO surface (sitemap now **37 URLs**, hreflang strategy, JSON-LD schema with the
  new `jobTitle: "AI Agent Specialist"` / Bodenseeraum `Person`, internal-linking),
- a dated May 2026 Google Search Console indexing-fix log,
- the content map (32 posts in the `.art-*` article layout, security/agents topics,
  `POSTS` array in `js/site.js`),
- the open go-live TODO: the placeholder Calendly link (`calendly.com/DEIN-LINK`).

It captures the **performance** posture: the Blackwall no-CDN stance (self-hosted
Chakra Petch / Space Grotesk / Space Mono woff2, vendored GSAP, `css/tokens.css` +
`css/blackwall.css`) plus the older Lighthouse history (WebP logos, Tailwind→prebuilt
CSS, ttf→woff2) now marked as largely superseded. See [[performance-optimization]].
It links to the project `CLAUDE.md` for the how-to and lists the available `/seo` skills.

**Drift note:** Tailwind (`css/tailwind.css` + `tailwind/`) is now **legacy** — kept
only for blog posts / legal pages, not top-level pages. The old Inter/JetBrains woff2
and the `.png` logo masters remain in the tree but are unreferenced by shipped pages.
`skills/` is gitignored (not a committed showcase). Keep these in mind when linting.

## Related

- [[seo-geo-layer]] — the SEO surface this doc tracks and explains.
- [[tailwind-build]] — the CDN→prebuilt-CSS perf win logged here.
- [[performance-optimization]] — the Lighthouse campaign this doc records.
- [[external-services]] — Umami and the other services this doc configures.
