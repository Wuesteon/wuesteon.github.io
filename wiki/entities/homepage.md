---
title: Homepage (index.html)
type: entity
project: website
path: index.html
related:
  - "[[shared-components]]"
  - "[[i18n-system]]"
  - "[[seo-geo-layer]]"
  - "[[tailwind-build]]"
  - "[[terminal-design-system]]"
created: 2026-06-01
updated: 2026-06-01
confidence: high
---

# Homepage (index.html)

**Kind:** page-section · **Path:** `index.html`

## Summary

Single-page portfolio with hero, services, about, contact, and a client-logo strip.

## Details

The site's root document and primary entry point. Structured as anchor-navigable sections inside a
`<main id="main">` landmark:

- `#home` — hero with status badge, `h1`, subtitle, two CTAs, and a static terminal/code-block
  showing an `expertise.json` snippet.
- a clients logo slider section.
- `#services` — three cards: AI Solutions, Full-Stack, Mobile.
- `#about` — a terminal-window "About Me" block plus vision prose and animated stat counters.
- `#contact` — email CTA, location.

All visible copy uses `data-i18n` keys resolved by [[i18n-system]] (`js/translations.js`).

The `<head>` carries the homepage's SEO payload: canonical `https://waiser.dev/`,
`hreflang="x-default"` only (deliberately **no** de/en pair — that previously caused
duplicate-canonical errors), OG/Twitter cards, JSON-LD `@graph` with `Person` (`#person`) and
`WebSite` (`#website`), three woff2 font preloads, and the deferred Umami script. It drops the
header/footer/back-to-top placeholders consumed by [[shared-components]] (`js/components.js`) and
ends with the three deferred JS includes.

The interactive behaviors on this page — scroll-reveal fade-ins, stat counters, mobile menu,
smooth anchor scroll, back-to-top — are wired up by [[main-interactions]] (`js/main.js`). The
look (terminal windows, cyan/green glow) comes from [[terminal-design-system]] (`css/styles.css`).

## Related

- [[shared-components]] — injects this page's header, footer, and back-to-top button at runtime.
- [[i18n-system]] — resolves the `data-i18n` keys; toggle swaps text in place (homepage is not
  redirected).
- [[seo-geo-layer]] — the canonical/hreflang/JSON-LD payload in this page's `<head>`.
- [[tailwind-build]] — produces the `css/tailwind.css` this page consumes.
- [[terminal-design-system]] — the custom CSS that defines the hero/terminal aesthetic.
- [[main-interactions]] — the behavioral layer (`js/main.js`) for this page.
