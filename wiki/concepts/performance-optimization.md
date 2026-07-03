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
updated: 2026-07-03
confidence: high
---

# Performance optimization passes

## Summary

Perf posture after the Blackwall redesign: self-hosted Chakra Petch / Space Grotesk / Space
Mono woff2 with above-the-fold preloads, GSAP vendored locally, and **zero third-party asset
requests except Umami analytics**. Earlier passes (WebP logos, Tailwind CDN→static, ttf→woff2)
carried over.

## Details

### Blackwall-era posture (current)

- **Self-hosted fonts, no Google CDN.** `css/tokens.css` declares `@font-face` for three
  families as **woff2 only** (Chakra Petch 400/500/600/700, Space Grotesk 400/500/700, Space
  Mono 400/700 — 9 files in `fonts/`), using root-absolute `/fonts/` paths so one rule serves
  every URL depth. Rules use `font-display:swap`. This is a load-bearing GDPR + perf
  convention (see [[terminal-design-system]]).
- **Preloads.** Every shipped page preloads the three above-the-fold woff2:
  `ChakraPetch-Bold` (headings/wordmark), `SpaceGrotesk-Regular` (body), `SpaceMono-Regular`
  (labels/terminal), each with `as="font" type="font/woff2" crossorigin`.
- **GSAP vendored locally.** `js/vendor/gsap.min.js` + `js/vendor/ScrollTrigger.min.js` are
  served from the origin — **no jsDelivr / CDN** — so the scroll animation library adds no
  third-party request and no CDN round-trip.
- **Third-party requests ≈ zero.** The only external asset on top-level pages is the deferred
  Umami analytics script (`cloud.umami.is`). No font CDN, no Tailwind Play CDN, no GSAP CDN.
- **Reduced-motion is cheap.** A `prefers-reduced-motion` block in `tokens.css` collapses all
  `--dur-*` durations at the token layer, and `js/site.js` sets final animation states
  directly instead of tweening.
- **The hero canvas is disabled** (`js/site.js` hides `#field`) — no particle field / WebGL
  cost on load. See [[canvas-effects]].

### Historical passes (still in effect where relevant)

[[marketing-doc]] (`MARKETING.md`) documents the earlier Lighthouse campaign (mobile, May
2026) from a **71 / 10.5s LCP** baseline:

1. Client logos converted to display-resolution WebP (~1.2MB → ~52KB; PNG masters kept
   unreferenced in `logos/`). Still true.
2. The render-blocking Tailwind Play CDN replaced by a prebuilt static `css/tailwind.css`.
   **Superseded:** top-level pages now ship **no Tailwind at all** (Blackwall CSS instead);
   `tailwind.css` survives only on posts/legal (see [[tailwind-build]]).
3. Preloading above-the-fold fonts. Carried forward, now targeting the Blackwall woff2 set.
4. ttf→woff2 conversion (~66% smaller). The Blackwall fonts ship **woff2-only** (no ttf
   fallback needed), continuing this convention.

The WebP-served / PNG-master logo strategy and the self-hosted woff2 font strategy remain
load-bearing conventions a contributor **must preserve**.

## Related

- [[tailwind-build]] — now legacy; the old CDN→prebuilt swap is moot for top-level pages.
- [[terminal-design-system]] — holds the Blackwall self-hosted woff2 `@font-face` rules.
- [[marketing-doc]] — the journal where the Lighthouse history is recorded.
