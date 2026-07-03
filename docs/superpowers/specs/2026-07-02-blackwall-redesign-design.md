# waiser.dev — "Blackwall" Complete Redesign

**Date:** 2026-07-02
**Branch:** `worktree-blackwall-redesign`
**Status:** Approved design → implementation

## Summary

Port the finished "Blackwall" design (delivered in `~/Downloads/waiser-site/`) onto the
live static site, **preserving everything the mockup silently drops**: DE/EN i18n, all 32
real blog posts at their current URLs, self-hosted assets (fonts + GSAP), legal pages,
Umami analytics, SEO files, and the hidden sections (easter-egg, blackhole, skills,
research).

The design shifts the visual system from the current **terminal cyan/green** aesthetic to
a **cyberpunk red (`#ff2a3c`) on near-black (`#050507`)** system called "Blackwall": Chakra
Petch / Space Grotesk / Space Mono typography, GSAP scroll choreography, a HUD overlay
(corners, scanlines, progress bar), glitch effects, and an interactive client-side "Agent
Opportunity Scan" lead-gen tool.

## Source of truth

The mockup at `~/Downloads/waiser-site/` is the **visual/behavioral source of truth**.
Its files:

- `index.html` — homepage (Team A "Momentum" hero variant, inline `<style>` block)
- `blog.html`, `article.html`, `404.html` — secondary pages
- `assets/tokens.css` — 3-layer design token system (primitives → semantic → back-compat)
- `assets/blackwall.css` — all component styles
- `assets/site.js` — behavior (blog render, logo rail, GSAP choreography, mobile menu, living buttons)
- `assets/extras.js` — hero terminal typer + Agent Opportunity Scan
- `assets/articles.js` — JS blog-post bodies + single-post renderer (mockup only; **NOT used** in final)
- `logos/*` (12, incl. new `bit.svg`, `primeo.svg`), `thumbs/*`, `favicon.svg`, `assets/og-image.png`

## Decisions (locked)

| Decision | Choice |
|---|---|
| Language | **Keep DE/EN toggle.** Translate all new Blackwall copy to German. |
| Blog content | **Migrate all 32 real posts** into the Blackwall article layout. |
| Blog architecture | **Keep folder-per-post + real URLs** (`blog/posts/{de,en}/{slug}.html`). No `?id=` engine. |
| Fonts / GSAP | **Self-host everything.** No Google Fonts CDN, no jsDelivr. |
| Scan tool | **Ship client-side simulated** (deterministic per-domain), with the marked backend hook. |
| Preserve | Legal pages, Umami, SEO files (llms.txt, robots, sitemap, CNAME, JSON-LD), hidden sections. |

## Architecture

### Design-system layer
- **`css/tokens.css`** — copied verbatim from the mockup's `assets/tokens.css`, then extended
  with self-hosted `@font-face` rules (see Fonts).
- **`css/blackwall.css`** — copied from mockup's `assets/blackwall.css`, plus any
  article/legal component styles needed for restyled posts (see Blog).
- Loading order on every redesigned page: `tokens.css` → `blackwall.css`.
- The old `css/styles.css` and `css/tailwind.css` remain in the repo only for pages not yet
  migrated during development; the **final state references neither** on any shipped page.
  (Tailwind build/`tailwind/` dir becomes dead once all pages are migrated — leave the
  directory but stop referencing the output.)

### Fonts (self-hosted)
- Download **Chakra Petch** (400/500/600/700), **Space Grotesk** (400/500/700),
  **Space Mono** (400/700) from Google Fonts as TTF, convert each to **woff2**
  (`fonttools` + `brotli`, per the existing CLAUDE.md convention), store in `fonts/`.
- Add woff2 `@font-face` rules to `tokens.css` (or a small `css/fonts.css` imported first).
- `rel="preload"` the ~3 above-the-fold weights (hero wordmark = Chakra Petch 700,
  hero subtitle body = Space Grotesk 400, terminal/mono = Space Mono 400).
- **No** `fonts.googleapis.com` / `fonts.gstatic.com` links anywhere.

### GSAP (self-hosted)
- Vendor `gsap.min.js` (3.12.5) and `ScrollTrigger.min.js` into `js/vendor/`.
- Reference locally: `<script src="js/vendor/gsap.min.js">` etc.
- **No** `cdn.jsdelivr.net`.

### JavaScript layer
Ported into the site's `js/`:
- **`js/site.js`** — from mockup `assets/site.js`. The `POSTS` array is the single source
  for the homepage feed and blog listing. Each `POSTS` entry gains a real `href`
  (`blog/posts/{lang}/{slug}.html`) **and** DE/EN fields (title/excerpt/date localized).
  `tcardHTML()` links to the real file (not `article.html?id=`).
- **`js/extras.js`** — from mockup `assets/extras.js`: hero terminal + Agent Opportunity
  Scan. Scan copy is bilingual.
- **`js/translations.js`** — the **existing** i18n engine, **extended** with every new
  Blackwall string (nav, hero, scan, services, stats, breach, contact, CTA, footer, blog,
  legal). Keep the existing `setLanguage()` / `getCurrentLang()` / localStorage mechanism.
- **`js/components.js`** — reworked to emit the Blackwall nav + footer (with the DE/EN
  toggle and mobile drawer) so header/footer stay DRY across all pages, OR the nav/footer
  is inlined per-page if that's cleaner with the mockup's markup. Decide during
  implementation; DRY via components.js is preferred to match the current architecture.
- **`js/main.js`** — fold any still-needed generic behaviors (smooth scroll offset,
  back-to-top) into site.js or keep as a thin module. Mockup's `site.js` already covers
  nav-solidify, mobile menu, reveals.
- `articles.js` from the mockup is **discarded** (we use real post files, not a JS renderer).

### i18n integration (critical)
The mockup markup has no `data-i18n` attributes. To keep the DE/EN toggle:
- Add `data-i18n="<key>"` attributes to every translatable text node in the new markup
  (index, blog index, legal, 404, nav, footer).
- Add all `de`/`en` string pairs to `translations.js`.
- The JS-rendered content (POSTS feed, scan tool, hero terminal) reads the current language
  from `getCurrentLang()` and re-renders on language change (subscribe to the toggle, or
  re-run the render in `setLanguage`).
- `<html lang>` is updated by the toggle as today.
- Some visual/brand strings stay identical across languages (e.g. the `wAIser` wordmark,
  mono labels like `// FIELD NOTES`); these need no translation.

## Pages

### `index.html`
Full Blackwall port using the mockup's "Momentum" hero. Sections in order:
Hero (rotating kinetic headline + wordmark glitch) → Agent Scan → Value rows (3 services)
→ Stats → Clients marquee → Breach/Security sequence → Blog feed (3 latest, real posts) →
Contact terminal → End CTA → Footer.
Restore: Umami script, canonical, hreflang `x-default`, OG/Twitter meta, Person + WebSite
JSON-LD (updated to AI Agent Specialist positioning), font preloads, DE/EN toggle in nav.
All copy bilingual via `data-i18n`.

### Blog listing — `blog/index.html` (DE) + `blog/en/index.html` (EN)
Blackwall `blog-hero` + filter chips + `feed__grid` of real post cards.
Cards are rendered from `POSTS` (localized) linking to real files. Category chips filter
by `cat`. Keep both DE and EN index files (current structure) so each language has its own
listing URL; the language toggle swaps between them.

### Blog posts — `blog/posts/{de,en}/*.html` (32 files)
Restyle each existing post into the Blackwall article layout (`.art-hero`, `.art-body`,
`.art-callout`, `.art-share`, `.art-more`, code blocks with the red terminal chrome).
**Hard requirements per post:**
- **Preserve all prose/content verbatim** — only the presentation changes. No text added or
  removed (translations already exist per language).
- **Preserve per-post SEO**: `<title>`, meta description, canonical, hreflang DE/EN/x-default,
  BlogPosting + BreadcrumbList JSON-LD, OG/Twitter.
- **Preserve the URL** (filename unchanged).
- Map custom components (`attack-box`, `result-card`, `experiment-card`, `pill-*`,
  `code-block`, `warning-box`, `defense-box`, `results-table`, `source-list`) onto Blackwall
  equivalents — either new `.art-*` variants added to `blackwall.css`, or restyled in place.
  These custom blocks must remain visually coherent in the new system (red accents, dark
  surfaces), not broken.
- Reference `../../../css/tokens.css` + `../../../css/blackwall.css` (3 levels up), and the
  vendored GSAP + `js/site.js` etc.
- Keep header/footer injection (via reworked `components.js`) so nav/toggle/footer are
  consistent.
- Update the "more field notes" / related-posts section to link real sibling posts.

### Legal — `datenschutz.html`, `impressum.html`
Restyle into Blackwall (dark surfaces, red accents, `.art-body`-style prose). Preserve all
legal text verbatim. Add to footer nav. The current legal pages are **German-only** (no
`data-i18n`) and inject header/footer via `components.js` — so they inherit the reworked
Blackwall nav/footer automatically; the legal body stays German. No EN legal translation.

### `404.html`
New Blackwall 404 from the mockup (adapted: self-hosted assets, nav/footer via components,
DE/EN).

### SEO / meta files
- `sitemap.xml` — regenerate to list `/`, both blog indexes, all 32 real post URLs (DE+EN),
  legal pages. **Not** the mockup's `?id=` URLs.
- `robots.txt` — keep (already correct; points to sitemap).
- `llms.txt`, `llms-full.txt` — update positioning/URLs to match the new site.
- `CNAME` — unchanged (`waiser.dev`).
- JSON-LD across pages updated to the AI Agent Specialist / AI Security positioning.

### Hidden sections (preserve, reachable)
- `easter-egg/`, `blackhole/`, `skills/`, `research/` — keep as-is and reachable. Restyle
  only if trivial and low-risk; otherwise leave functioning untouched. Do not break their
  asset paths.

## Assets

- Copy from mockup: `favicon.svg`, new logos `logos/bit.svg` + `logos/primeo.svg`.
- **OG image:** adopt the mockup's new `assets/og-image.png` but place it at the existing
  path `og-default.png` (overwrite), so all current meta/JSON-LD references keep working
  without a repath sweep.
- Client logo rail uses the mockup's 12-logo `LOGOS` array.
- Keep existing `logos/*.webp` masters.

## Non-goals / YAGNI

- No real backend for the scan tool (client-side simulation only).
- No migration to the `?id=` JS blog engine.
- No new blog posts — only restyle existing ones.
- No redesign of the hidden sections' internals.
- No removal of `tailwind/` build tooling (just stop referencing its output on shipped pages).

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| Blog content loss/alteration during restyle | Diff visible text before/after each post; content must be byte-identical modulo markup. |
| Broken internal links | Keep all post URLs; validate every nav/footer/anchor link across DE/EN. |
| Lost per-post SEO | Preserve title/meta/canonical/hreflang/JSON-LD in each restyled post. |
| Third-party requests (GDPR) | Self-host fonts + GSAP; zero external requests post-migration (except Umami, which is intentional/consented). |
| i18n regressions | Every new string keyed; toggle re-renders JS content; test both languages. |
| Reduced-motion / a11y | Preserve the mockup's `prefers-reduced-motion` handling and aria attributes. |
| Mobile | Test the burger drawer + responsive breakpoints on all page types. |

## Order of work (phases)

1. **Foundation** — tokens.css (+fonts), blackwall.css, self-host fonts, vendor GSAP,
   favicon/og, new logos.
2. **i18n + components** — extend translations.js; rework components.js for Blackwall
   nav/footer with DE/EN toggle + mobile drawer.
3. **Homepage** — full index.html port, bilingual, analytics + SEO + JSON-LD.
4. **Blog system** — DE/EN listings + site.js POSTS wired to real posts + extras.js scan.
5. **32 posts** — restyle into `.art-*` (parallelized; the bulk of the work).
6. **Legal + 404** — restyle.
7. **SEO/meta** — sitemap, llms, robots, JSON-LD, hreflang sweep.
8. **Verify** — visual (light of dark theme), link check, DE/EN parity, reduced-motion,
   mobile, content-diff of posts. Then finish-branch (merge/PR).

## Definition of done

- Every page renders in the Blackwall system with working DE/EN toggle.
- All 32 posts restyled, content preserved, URLs + SEO intact.
- Zero third-party asset requests (fonts + GSAP local); Umami intact.
- Legal + 404 restyled; hidden sections still reachable.
- Sitemap/llms/JSON-LD updated and consistent.
- Verified across languages, mobile, and reduced-motion.
