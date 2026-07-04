---
title: Wiki Operation Log
type: log
project: website
path: "-"
related:
  - "[[index]]"
  - "[[CLAUDE]]"
created: 2026-06-01
updated: 2026-07-03
confidence: high
---

# Wiki Operation Log

Append-only record of ingest / query / lint operations on this wiki. Newest entries at the bottom.

---

## 2026-06-01 — INGEST: wiki bootstrapped from codebase exploration

Bootstrapped the LLM Wiki for the `website` project (waiser.dev) from a read-only structured
exploration of the codebase.

**Pages created: 20**

- Schema & meta (4): `CLAUDE.md`, `index.md`, `log.md`, `overview.md`.
- Architecture (2): `architecture/data-model.md`, `architecture/external-services.md`.
- Concepts (6): `concepts/static-no-build.md`, `concepts/runtime-component-injection.md`,
  `concepts/i18n.md`, `concepts/geo-ai-citation.md`, `concepts/performance-optimization.md`,
  `concepts/canvas-effects.md`.
- Entities (12): `entities/homepage.md`, `entities/shared-components.md`,
  `entities/i18n-system.md`, `entities/main-interactions.md`, `entities/blog-system.md`,
  `entities/blackhole-effect.md`, `entities/easter-egg.md`, `entities/terminal-design-system.md`,
  `entities/tailwind-build.md`, `entities/seo-geo-layer.md`, `entities/marketing-doc.md`,
  `entities/write-blog-post-skill.md`, `entities/legal-pages.md`.
- Reference (1): `glossary.md`.

(12 entities + 6 concepts + 2 architecture + 1 glossary + overview + index + log + schema = 23
content files; the "20 pages" count above groups the schema/meta into one bucket — total markdown
files written is 23.)

**Drift flagged for future LINT passes:**
- The project hint and the repo's own `CLAUDE.md`/`MARKETING.md` mention a "Three.js boot effect" —
  there is **no Three.js** in the repo; the black-hole and easter-egg are pure Canvas 2D. Recorded
  in [[overview]] gotchas and [[canvas-effects]].
- `MARKETING.md`/`CLAUDE.md` reference `courses/` and a committed `skills/` showcase that are
  **not** present in the current tree (`skills/` is gitignored). Recorded in [[marketing-doc]].
- The map listed a `blog-diagrams` related slug that had no corresponding entity; rather than
  create a dangling link, blog diagram handling (`blog/diagrams/`, draw.io XML → SVG) is documented
  inline within [[blog-system]] and [[write-blog-post-skill]].

---

## 2026-07-03 — INGEST: "Blackwall" redesign (commit 682aeef)

waiser.dev was fully redesigned into the cyberpunk-red **"Blackwall"** system and merged to
`main`. This is a positioning + design-system + JS-layer overhaul; the OLD terminal cyan/green
theme, the Tailwind-as-primary-styling, and the "IT Consultant & AI Developer" framing are GONE
on shipped top-level pages. Docs updated to the new state.

**Positioning:** Nils Weiser = **AI Agent Specialist & AI Security** (wAIser.dev). Tagline
"Make your agents wAIser" (wAIser = weiser/wise + AI). Services: AI Agents · AI Security ·
invitation-only **Custom Development** ("Auf Anfrage", scarcity-framed). Location: Bodenseeraum,
Schweiz.

**Design system (new source files):**
- `css/tokens.css` — 3-layer design tokens (primitives → semantic → back-compat aliases
  `--red`/`--hot`/`--ice`/`--bg`/`--line`/`--mut`) + self-hosted `@font-face` (root-absolute
  `/fonts/`). Brand red `#ff2a3c` (core) / `#ff5a68` (hot) / cyan glitch `#2ae0ff` on near-black
  `#050507`.
- `css/blackwall.css` — all component styles (`.nav .foot .mh` hero, `.btn--pri` living buttons,
  `.scard .tcard .breach .az-*` agent-scan, `.art-*` article layout, `.lang-toggle`, …).
- `css/blog-post.css` — theme-bridge re-skinning legacy post components to red.
- `css/styles.css` + `css/tailwind.css` — now **legacy**: `styles.css` loaded on posts (under
  `blog-post.css`); `tailwind.css` loaded on posts / legal for utilities. NOT on
  homepage / blog-index / 404. The `tailwind/` build tooling is effectively dead for top-level pages.

**Fonts:** self-hosted woff2, no Google CDN — Chakra Petch (display/wordmark), Space Grotesk
(body), Space Mono (labels/code). 9 new woff2 in `fonts/`; old Inter/JetBrains woff2 remain but
are unused by shipped pages.

**JS layer:** `js/vendor/gsap.min.js` + `ScrollTrigger.min.js` (vendored, no CDN);
`js/translations.js` extended with ~70 `bw.*` keys (DE/EN parity, `data-i18n[-html|-attr]`,
`onLanguageChange`, `slugMap`); `js/components.js` emits Blackwall `.nav`/`.foot` + red-umbrella
logo (`logos/mark.svg`), `#lang-toggle`, `#black-hole-trigger`; `js/site.js` = `POSTS` array
(16 posts, DE/EN, real hrefs), home-feed / blog-list / article enhancers, logo marquee + AI scan
beam, GSAP choreography, mobile drawer, living-button upgrader (the mockup `#field` canvas is
DISABLED); `js/extras.js` = hero terminal typer + client-side SIMULATED "Agent Opportunity Scan"
(marked `// BACKEND HOOK`); `js/main.js` thin i18n init + lang-toggle wiring.

**Logo:** new red-umbrella octagon mark (`logos/mark.svg` + `favicon.svg`), chromatic red/cyan
channel-split — used in nav, footer, favicon.

**Pages:** `index.html` (Momentum hero, kinetic rotating headline, agent scan, 3 service
value-rows incl. invitation-only Custom Development, stats, client marquee, security "breach"
sequence, blog feed, two-path contact, end-CTA "Make your agents wAIser"); `blog/index.html` +
`blog/en/index.html` (Blackwall listings + filter chips); all 32 posts restyled into `.art-*`;
`datenschutz.html` + `impressum.html` + `404.html` restyled.

**Preserved:** DE/EN toggle, all 32 posts + URLs + per-post SEO (BlogPosting / BreadcrumbList
JSON-LD, hreflang), Umami analytics (same ID `d04784b7-…`), `sitemap.xml` (37 URLs),
`llms.txt` / `llms-full.txt` (repositioned), easter-egg + blackhole hidden sections, robots.txt,
CNAME.

**Docs updated this pass:** root `../CLAUDE.md` (the `### website/` entry — Stack + description
to Blackwall / AI Agent Specialist), `MARKETING.md` (positioning, Umami embedding, sitemap 37,
schema, content map, performance posture, Calendly TODO), [[marketing-doc]] (summary refresh).

**Drift flagged for future LINT passes:**
- [[terminal-design-system]] documents the OLD cyan/green theme — now REPLACED by the Blackwall
  system. Repurpose that page to document `css/tokens.css` + `css/blackwall.css` (do not delete).
- [[tailwind-build]], [[canvas-effects]], [[homepage]], [[shared-components]], [[i18n-system]],
  [[main-interactions]], [[blog-system]], [[performance-optimization]], [[seo-geo-layer]] all
  describe pre-Blackwall behaviour and need Lint against the new source files above.
- The prior "no Three.js" note still holds; the redesign additionally DISABLES the mockup `#field`
  hero canvas in `js/site.js`.
- Open go-live TODO: Calendly link is a placeholder (`calendly.com/DEIN-LINK`) — see
  `TODO-GO-LIVE.md`.

(These wiki content pages were flagged, not yet rewritten — they are owned by other agents this pass.)

## 2026-07-04 — Chinese (中文) added as third site language

Full trilingual expansion (DE/EN/中文). Updated `[[i18n-system]]` and `[[blog-system]]` + index:
- `js/translations.js`: complete `zh` dictionary (134 keys, EN-fallback in `getTranslation`), 3-way
  `currentLang` init + `setLanguage` routing + `slugMap` zh mappings (zh reuses EN filename).
- 3-way DE/EN/中文 selector (`components.js` nav + `site.js` mobile drawer + `main.js` `data-lang` click wiring).
- JS-rendered zh: `POSTS[].zh` for all 16 posts (`site.js`), Agent Scan `POOL_ZH`/labels/verdict/scanLines/
  softMessage (`extras.js`). Blog feed/enhancer fall back to `en` (was `de`).
- `blog/zh/index.html` + 16 `blog/posts/zh/*.html` (zh head/JSON-LD `inLanguage:"zh"`, bodies translated),
  reciprocal `hreflang` across de/en/zh (+ x-default→DE), sitemap.xml + llms.txt zh entries.
- Bugfix: `siteBase()` now handles `/blog/zh/` + `/blog/posts/zh/` depth (was mis-resolving to double `/blog/`).
- Deferred: `llms-full.txt` zh section (full bodies) — add post-launch if wanted.
