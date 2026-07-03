---
title: Glossary
type: glossary
project: website
path: "-"
related:
  - "[[overview]]"
  - "[[index]]"
created: 2026-06-01
updated: 2026-07-03
confidence: high
---

# Glossary

Domain and project-specific terms used throughout this wiki and the codebase. Terms reflect the
**"Blackwall" redesign** (commit `682aeef`); superseded terminal-theme terms are marked
_(deprecated)_ at the bottom.

| Term | Definition |
| --- | --- |
| **waiser.dev** | The production domain of the site (custom domain via `CNAME`), Nils Weiser's personal portfolio + blog. Positioned as **AI Agent Specialist & AI Security**. |
| **Blackwall** | The site's cyberpunk design system and visual identity: brand red (`--red-500 #ff2a3c` core, `--red-400 #ff5a68` hot) with a `--cyan-500 #2ae0ff` glitch channel, on near-black (`--ink-0 #050507`). Lives in `css/tokens.css` (3-layer tokens + self-hosted `@font-face`) and `css/blackwall.css` (all component styles). See [[terminal-design-system]]. |
| **wAIser wordmark** | The domain rendered as `w<span class="ai">AI</span>ser<span class="tld">.dev</span>` so the embedded **AI** is highlighted — a pun on _weiser_ ("wise" in German) + AI. Used in the nav `.brand`, footer, and the `.mh` hero (`.mh__wm`, with a hover/glitch chromatic red/cyan channel-split). |
| **"Make your agents wAIser"** | The site-wide tagline / end-CTA (`.cta-end`), reinforcing the wordmark pun. |
| **Custom Development (Auf Anfrage)** | The third service, framed **invitation-only** / scarcity ("Auf Anfrage"). On the homepage its contact path is an email pitch (vs. the Calendly "book a call" path for Agents/Security). |
| **design tokens (3-layer)** | `css/tokens.css`: Layer 1 primitives (red + ink ramps, cyan/green/amber accents, type scale), Layer 2 semantic aliases (`--color-bg`, `--color-brand`, `--color-text` …), Layer 3 back-compat shorthands (`--red`, `--hot`, `--ice`, `--bg`, `--surf`, `--line`, `--mut`). Loaded before `blackwall.css`. |
| **red-umbrella mark** | The new octagon logo (`logos/mark.svg` + `favicon.svg`): chromatic red/cyan channel-split, radial spokes, red center diamond. Used in nav, footer, and favicon. |
| **art-\* layout** | The Blackwall article layout applied to all 32 blog posts (`css/blackwall.css`): `.art-hero` (category badge + author meta + read-time), `.art-body` (prose), `.art-share` (author card), `.art-more` (related posts rendered into `#art-more-grid` by `js/site.js`). |
| **Agent Opportunity Scan** | The homepage `#scan` tool (`.az-*` styles, `#az-form`; logic in `js/extras.js`): the visitor enters a domain and gets a bilingual "scan" console animation + a score and three agent-opportunity cards. **Client-side, deterministic per-domain simulation**, marked `// BACKEND HOOK` for a future real scanner. |
| **living button** | A `.btn--pri` upgraded by `js/site.js` (`upgradeLivingButtons`) into a Cyberpunk glitch button: channel-split + shear + text-scramble on hover/focus, with ambient "surges" on the hero CTA. |
| **breach sequence** | The homepage `#security` block (`.breach`): a GSAP-animated "agent poisoned in two messages" security demo (mock session + metrics + result), teasing the AI-security blog posts. |
| **tcard** | A blog-post teaser card (`.tcard`, built by `tcardHTML()` in `js/site.js`) used in the home feed, blog index, and related-posts. |
| **`POSTS` array** | The single content source in `js/site.js`: 16 posts, each with `id`, `cat`, and DE/EN `{href,title,excerpt,date,read}`. Drives the home feed, blog listing (with filter chips), and related-posts. Adding a post means editing this array (plus two HTML files). |
| **Chakra Petch / Space Grotesk / Space Mono** | The self-hosted Blackwall fonts (9 woff2 files, root-absolute `/fonts/`, no Google CDN): Chakra Petch = display/wordmark, Space Grotesk = body, Space Mono = labels/code/terminal. (Old Inter/JetBrains files remain in `fonts/` but are unused.) |
| **vendored GSAP** | GSAP + ScrollTrigger self-hosted in `js/vendor/gsap.min.js` + `ScrollTrigger.min.js` (no jsDelivr CDN); powers the homepage choreography (progress bar, nav-solidify, word reveals, stat count-up, breach sequence). |
| **GitHub Pages** | The static host; the repo (`wuesteon.github.io`) auto-deploys from the `main` branch with no build server. |
| **i18n (DE/EN)** | Internationalization. German is default/canonical; English is an alternate via in-place `data-i18n` swaps (UI) and mirrored file trees + redirects (blog). The i18n engine gained ~70 `bw.*` keys in the redesign. See [[i18n]]. |
| **data-i18n** | HTML attribute marking an element whose text `setLanguage()` replaces from the `translations` dictionary; `data-i18n-html` swaps `innerHTML`, `data-i18n-attr` swaps a named attribute. |
| **onLanguageChange** | A `window.onLanguageChange` hook fired by `setLanguage()`; `js/site.js` registers it to re-render JS-built post cards/feeds and re-sync living-button labels on toggle. |
| **slugMap** | The DE↔EN filename map in `js/translations.js` for the **four** posts whose slugs differ across languages (`mit-ai-halluzinationen`↔`mit-ai-hallucinations`, `ambient-ai-die-naechste-ki-generation`↔`ambient-ai-the-next-ai-generation`, `loops-statt-prompts-cherny`↔`loops-not-prompts-cherny`, `opus-4-8-dynamische-workflows-erst-recht-audit`↔`opus-4-8-dynamic-workflows-erst-recht-audit`). |
| **basePath** | The relative path prefix (`''`, `'../'`, `'../../'`, `'../../../'`) computed by `detectBasePath()` so runtime-injected links resolve from any directory depth. See [[runtime-component-injection]]. |
| **Calendly** | The "book a call" contact path for the Agents/Security offer (homepage `#contact`). **The link is still a placeholder** (`calendly.com/DEIN-LINK`) — the one open go-live blocker (`TODO-GO-LIVE.md`). |
| **Umami** | A privacy-friendly, cookieless web analytics service (`cloud.umami.is`) embedded site-wide; website ID `d04784b7-9e58-43ad-b71b-73328369d474`. |
| **llms.txt / llms-full.txt** | Root files following the llms.txt convention: a curated index and a full-text dump of the site for AI-assistant (GEO) citation, repositioned to the AI Agent / AI Security framing, referenced from `robots.txt`. See [[geo-ai-citation]]. |
| **GEO** | Generative Engine Optimization — optimizing to be cited/surfaced by AI answer engines (ChatGPT, Perplexity, AI Overviews), complementary to classic SEO. |
| **hreflang / x-default** | Link-rel alternates declaring language/region equivalents of a URL; `x-default` is the fallback. The homepage uses `x-default` only to avoid duplicate-canonical errors. |
| **JSON-LD @graph** | Schema.org structured data embedded per page (`Person`/`WebSite` on home, `BlogPosting`/`BreadcrumbList` per post) with `@id` cross-references like `#person`. |
| **Black hole effect** | A Canvas-2D particle "page destruction" animation in `blackhole/`, triggered by the footer `#black-hole-trigger` ("Don't click me") button, lazily injected by `components.js`. See [[blackhole-effect]]. |
| **Der Panther easter-egg** | A standalone, noindexed Rilke-poem-themed interactive canvas experience under `easter-egg/`, with its own JS, translations, CSS, and audio. See [[easter-egg]]. |
| **Bodenseeraum** | The Lake Constance region (DE/CH border area) — the author's stated location/market; site copy reads "Bodenseeraum · Schweiz". |

## Deprecated (pre-Blackwall)

These terms described the old terminal identity and are **no longer present** on shipped pages.
Kept for provenance when reading old commits.

| Term | Status |
| --- | --- |
| **Terminal theme** | _Deprecated._ The old visual identity in `css/styles.css` (dark bg, terminal windows with red/yellow/green dots, monospace, cyan/green glow). Replaced by [[terminal-design-system]]. `css/styles.css` survives only as legacy CSS loaded under the Blackwall bridge on posts + legal pages. |
| **Tailwind as primary styling** | _Deprecated._ The committed `css/tailwind.css` is no longer the primary styling of top-level pages; it is loaded only on blog posts + legal pages for back-compat utility classes. See [[tailwind-build]] (now legacy) and [[terminal-design-system]]. |
| **Inter / JetBrains Mono** | _Deprecated._ The old self-hosted body/mono fonts; their woff2/ttf files remain in `fonts/` but are unused by shipped pages (replaced by Chakra Petch / Space Grotesk / Space Mono). |
| **Three.js boot effect** | _Never shipped / removed._ There is no Three.js; the redesign mockup's `#field` hero canvas is explicitly disabled in `js/site.js`. |
| **D3.js visualizations** | _Deprecated._ No blog post loads the `d3js.org` CDN any longer. |

## Related

- [[overview]] — where most of these terms first appear in context.
- [[index]] — the catalog of all wiki pages.
