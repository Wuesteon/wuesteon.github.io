---
title: Performance optimization passes
type: concept
project: website
path: MARKETING.md
related:
  - "[[tailwind-build]]"
  - "[[terminal-design-system]]"
  - "[[marketing-doc]]"
created: 2026-06-01
updated: 2026-06-01
confidence: high
---

# Performance optimization passes

## Summary

Lighthouse-driven work: WebP logos, Tailwind CDN→static CSS, font preloading, and ttf→woff2
conversion.

## Details

[[marketing-doc]] (`MARKETING.md`) documents a deliberate, iterative perf campaign (mobile,
May 2026) starting from a **71 score / 10.5s LCP**. Fixes, in order:

1. Client logos converted to display-resolution WebP (~1.2MB → ~52KB; original PNGs kept as
   unreferenced masters in `logos/`).
2. The render-blocking Tailwind Play CDN replaced by the prebuilt 16KB `css/tailwind.css` (see
   [[tailwind-build]]).
3. Preloading the three above-the-fold fonts.
4. Converting all seven font weights from ttf to woff2 (~66% smaller) while correcting the preload
   set to the actually-critical fonts.

The self-hosted woff2-first / ttf-fallback `@font-face` strategy (in
[[terminal-design-system]]) and the WebP-served / PNG-master logo strategy are both load-bearing
conventions a contributor **must preserve**. One Lighthouse "oversize logo" warning was
deliberately left as-is to avoid blurring on retina.

## Related

- [[tailwind-build]] — the CDN→prebuilt-CSS swap, the biggest LCP/TBT win.
- [[terminal-design-system]] — holds the woff2-first `@font-face` rules.
- [[marketing-doc]] — the journal where the Lighthouse history is recorded.
