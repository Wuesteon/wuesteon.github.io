---
title: Homepage (index.html)
type: entity
project: website
path: index.html
related:
  - "[[shared-components]]"
  - "[[main-interactions]]"
  - "[[i18n-system]]"
  - "[[seo-geo-layer]]"
  - "[[terminal-design-system]]"
created: 2026-06-01
updated: 2026-07-03
confidence: high
---

# Homepage (index.html)

**Kind:** page-section · **Path:** `index.html`

## Summary

Single-page "Blackwall Momentum" landing page positioning Nils Weiser as **AI Agent Specialist &
AI Security** (wAIser.dev): kinetic hero, an interactive Agent Opportunity Scan, three service
value-rows, stats, a client marquee, a security "breach" sequence, a 3-post blog feed, a two-path
contact block, and an end-CTA.

## Details

The site's root document (`<body class="t-momentum">`) and primary entry point. It is styled by the
[[terminal-design-system]] Blackwall system — `css/tokens.css` (design tokens + self-hosted
`@font-face`) then `css/blackwall.css` — and loads **no** Tailwind and **no** `styles.css`. A
page-scoped `<style>` block in the `<head>` defines the Momentum-hero specifics (`.mh*`, `.kin`,
`.vrow*`). Global chrome sits behind `<main>`: `.progress` bar, a disabled `#field` canvas,
`.scanlines`, and four `.hud-corner` elements.

Structured as anchor-navigable sections inside `<main>`:

- `#home` — the **Momentum hero** (`.mh`): the glitching `wAIser` wordmark (`#hero-title`, chromatic
  red/cyan channel-split), a kinetic rotating headline `.kin` that cycles the localized words
  `acts. / defends. / scales. / ships.` after the fixed lead "Ship AI that", a subtitle, two CTAs
  (**SCAN MY SITE FREE** → `#scan`, **BOOK A CALL** → `#contact`), and a `.mh__proof` trust line.
- `#scan` — the **Agent Opportunity Scan** (`.analyze` / `.az-*`): a terminal-styled form
  (`#az-form`) driven by `js/extras.js`. Client-side SIMULATED, deterministic per domain; types a
  fake console log then renders a fit score + three agent opportunities. Marked `// BACKEND HOOK`.
- `#services` — three **value-rows** (`.vrow`) under "// WHAT I DO": **AI Agents** (01),
  **AI Security** (02), and **Custom Development** (03) — the last is INVITATION-ONLY, carrying a
  `.vrow--scarce` treatment and a `.vrow__gate` "By invitation / Auf Anfrage" pill with a `PITCH A
  PROJECT →` CTA instead of "book a call".
- `.stats` — four `.stat` counters (client engagements, "2ND" prompt-injection challenge, field
  notes published, self-hosted option) animated by GSAP in `js/site.js`.
- `.clients` — a logo **marquee** (`#logo-track`) built + duplicated by `js/site.js` from the
  `LOGOS` list, with an "AI scan beam" that highlights logos near screen-center.
- `#security` — the **breach sequence** (`.breach`): a GSAP-choreographed reveal of a
  "compromised" agent-session mock (2 messages → 100% defenses bypassed) that references the
  memory-poisoning post.
- `#blog` — the **blog feed** (`.feed`): first three POSTS rendered as `.tcard`s into `#home-feed`
  by `js/site.js`, plus an ALL POSTS button.
- `#contact` — the **two-path contact**: Path A (`.cpath--primary`) "book a call" via a Calendly
  link for **AI Agents & AI Security**; Path B (`.cpath--muted`) "pitch by email" mailto for the
  invitation-only **Custom Development**. Plus a `.contact__term` terminal showing email +
  "Bodenseeraum · Schweiz".
- `.cta-end` — closing CTA **"Make your agents wAIser."** (`w<span class="ai rip">AI</span>ser`
  wordmark pun) → back to `#scan`.

All visible copy uses `data-i18n` (text), `data-i18n-html` (rich markup, e.g. the wordmark spans),
and `data-i18n-attr` (the scan input `placeholder`) keys resolved by [[i18n-system]]
(`js/translations.js`) — the Blackwall copy lives under the `bw.*` namespace.

The `<head>` carries the homepage's SEO payload repositioned to the new brand: `<title>` "Nils
Weiser — AI Agent Specialist & AI Security · wAIser.dev", canonical `https://waiser.dev/`,
`hreflang="x-default"` only (deliberately **no** de/en pair — the page is one bilingual URL toggled
in place), OG/Twitter cards, a JSON-LD `@graph` with `Person` (`jobTitle` "AI Agent Specialist",
`addressRegion` "Bodenseeraum") and `WebSite`, three self-hosted **woff2** font preloads
(Chakra Petch Bold, Space Grotesk Regular, Space Mono Regular — no Google CDN), the SVG favicon
(`favicon.svg`), and the deferred Umami script. It drops the header/footer placeholders consumed by
[[shared-components]] (`js/components.js`).

Script load order at end of `<body>`: vendored `js/vendor/gsap.min.js` + `ScrollTrigger.min.js`
(no CDN), then `translations.js`, `components.js`, `main.js`, `site.js`, `extras.js`, plus two
inline scripts (wordmark glitch surge + kinetic word rotator + hero reveal). The GSAP choreography
(progress bar, nav-solidify, word/stat/card reveals, breach timeline), mobile drawer, and living
buttons all come from [[main-interactions]] (`js/site.js`); `js/main.js` is thin (i18n init +
delegated lang-toggle).

**Open TODO:** the Path-A Calendly URL is still the placeholder `calendly.com/DEIN-LINK`
(tracked in `TODO-GO-LIVE.md`).

## Related

- [[shared-components]] — injects this page's Blackwall header/footer at runtime.
- [[main-interactions]] — the GSAP choreography, mobile drawer, living buttons, and scan tool.
- [[i18n-system]] — resolves the `bw.*` `data-i18n` keys; toggle swaps text in place (homepage not
  redirected).
- [[seo-geo-layer]] — the canonical/hreflang/JSON-LD payload in this page's `<head>`.
- [[terminal-design-system]] — the Blackwall CSS (`css/tokens.css` + `css/blackwall.css`) that
  defines the aesthetic.
