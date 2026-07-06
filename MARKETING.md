# Marketing — wAIser.dev

Marketing data, analytics, SEO assets, and growth tracking for the personal portfolio site.

## Positioning

- **Who:** Nils Weiser — **AI Agent Specialist & AI Security** (wAIser.dev).
- **Tagline / pun:** "Make your agents wAIser" (wAIser = weiser/wise + AI).
- **Services:** AI Agents · AI Security · **Custom Development** (the last is
  invitation-only / "Auf Anfrage", scarcity-framed — pitch by email, not a booking).
- **Location:** Bodenseeraum, Schweiz.
- **Two-path contact:** book-a-call (Calendly) for AI Agents / AI Security; email
  pitch for invitation-only Custom Development.
- **Design:** cyberpunk-red "Blackwall" system (redesign shipped 2026-07). See the
  project `CLAUDE.md` for the design/build details.

## Site

- **Domain:** waiser.dev (deployed via GitHub Pages, repo: `wuesteon.github.io`)
- **Languages:** DE / EN (i18n via `js/translations.js`, extended with ~70 `bw.*` keys)
- **Auto-deploy:** GitHub Pages from `main` branch

## Analytics

- **Umami Cloud** (unchanged through the Blackwall redesign)
  - Script: `https://cloud.umami.is/script.js`
  - Website ID: `d04784b7-9e58-43ad-b71b-73328369d474`
  - Embedded (defer loaded) on `index.html`, both blog indexes
    (`blog/index.html`, `blog/en/index.html`), the legal pages
    (`datenschutz.html`, `impressum.html`), `404.html`, and `easter-egg/`
  - Dashboard: https://cloud.umami.is/analytics/eu/websites/d04784b7-9e58-43ad-b71b-73328369d474
  - **Custom events** (2026-07, beyond default pageviews): `cta-book-call` /
    `cta-email-pitch` (homepage contact CTAs, via `data-umami-event`),
    `lang-switch` (`{lang}` payload, fires once per user-initiated DE/EN/中文
    toggle, not on page load), `scroll-75-home` / `scroll-100-home` and
    `scroll-75-article` / `scroll-100-article` (scroll-depth, namespaced by
    page type so homepage engagement and article read-depth don't blend),
    `related-post-click` (`{post: <slug>}`, in-article "art-more" related-post
    links only — not the home feed or blog index cards). Tracking helper:
    `trackEvent()` in `js/main.js`.

## SEO

- **Sitemap:** `sitemap.xml` — 54 URLs (home + blog DE/EN/中文 indexes + 16 DE + 16 EN
  + 16 中文 posts + datenschutz + impressum), each with `xhtml:link` hreflang alternates
  (de/en/zh/x-default). Submitted in Google Search Console. Chinese (中文) added 2026-07-04.
- **robots.txt:** present — `Allow: /`, disallows `/easter-egg/` + `/blackhole/`,
  references the sitemap.
- **llms.txt:** `llms.txt` (curated index of site + all posts, incl. a "Blog posts (Chinese)"
  section) and `llms-full.txt` (full article text inlined) at site root, referenced from
  `robots.txt`. For AI-assistant/GEO citation, not Google indexing. Regenerate after adding
  posts. NOTE: `llms-full.txt` does not yet carry the 中文 bodies (deferred at the 2026-07-04
  Chinese launch); add a zh full-text section post-launch if wanted.
- **Meta:** title/description + canonical per page; OG + Twitter cards on homepage.
- **Hreflang:** homepage is a single trilingual URL (DE/EN/中文 via in-page toggle) →
  `x-default` only (no per-language pair, which previously caused duplicate-canonical
  errors). Blog indexes and all posts carry de/en/zh/x-default alternates (x-default → DE)
  that match the sitemap; the zh tree reuses the EN filenames.
- **Schema markup (JSON-LD):**
  - Homepage: `@graph` with `Person` (`#person`, `jobTitle: "AI Agent Specialist"`,
    `knowsAbout` incl. AI Agents / AI Security / Prompt Injection Defense / Red Teaming,
    `addressRegion: "Bodenseeraum"`, `addressCountry: "CH"`) + `WebSite` (`#website`).
  - Every blog post: `@graph` with `BlogPosting` (author/publisher linked to
    `#person`, `dateModified`, `mainEntityOfPage`) + `BreadcrumbList`.
- **Internal linking:** every post is linked from its blog index; each post also
  has a hand-curated "more" / related-posts section (same-language topical links,
  now rendered in the Blackwall `.art-more` article layout). The homepage blog feed
  and both blog indexes are driven by the `POSTS` array in `js/site.js` (16 posts,
  DE/EN localized).

### Indexing fixes — May 2026 (Google Search Console)

GSC reported duplicate-canonical and "Discovered/Crawled – not indexed" issues
shortly after the SEO sweep launch. Root causes + fixes:

- Homepage declared `hreflang="de"` **and** `="en"` both pointing at the same
  single bilingual URL → fixed to `x-default` only.
- Blog index pages (`blog/`, `blog/en/`) had **no** canonical/hreflang → added.
- Sitemap was **missing 2 EN posts** (`ambient-ai-the-next-ai-generation`,
  `anthropic-skills-guide`) → added; now 13 DE + 13 EN.
- Added BreadcrumbList schema + related-post cross-links site-wide to improve
  crawl equity for the not-yet-indexed pages.

**Open follow-up (GSC, manual):** resubmit sitemap, "Request indexing" on home +
blog indexes, "Start validation" on each error row. "Discovered – not indexed"
is largely new-domain authority and resolves over weeks, not instantly.

## Content

- **Blog:** `blog/` — 32 posts (16 DE + 16 EN) under `blog/posts/de/` and
  `blog/posts/en/`, all restyled into the Blackwall `.art-*` article layout
  (`art-hero` category badge + author meta + read-time, `art-body`, `art-share`
  author card, `art-more` related posts). Listings (`blog/index.html`,
  `blog/en/index.html`) use Blackwall filter chips over the `POSTS` array.
- **Topics** (on-positioning): **AI Security** (agent memory poisoning / Mem0,
  Claude finding zero-days), **AI Agents** (Ambient AI, CrewAI multi-agent, agent
  workflows / superpowers, Opus 4.8 dynamic workflows), Claude Code / Skills,
  Playwright MCP, legal AI, model evaluation.
- **Latest post (2026-06-27):** `agent-memory-poisoning-mem0` (DE/EN) — AI-security
  first-hand report: poisoning a "security-conscious" AI agent in 2 messages via Mem0.
- **Skills:** `skills/` (showcase of published Claude skills; `skills/` is gitignored,
  not committed).

## Performance

**Blackwall posture (2026-07 redesign).** No third-party CSS/JS/font CDNs on the
top-level pages: all fonts self-hosted as woff2 (Chakra Petch / Space Grotesk /
Space Mono, no Google Fonts), GSAP + ScrollTrigger vendored locally in
`js/vendor/` (no jsDelivr), styling via committed `css/tokens.css` +
`css/blackwall.css`. The three above-the-fold woff2 fonts are `rel="preload"`ed in
`index.html` (ChakraPetch-Bold, SpaceGrotesk-Regular, SpaceMono-Regular). The old
Tailwind runtime is gone from top-level pages; `css/tailwind.css` is loaded only on
blog posts / legal pages. Umami is the only external script (privacy-friendly, defer).

### Historical: Lighthouse pass (mobile, May 2026) — pre-Blackwall

Baseline mobile score 71, LCP 10.5 s — bottlenecks were oversized client logos and a
render-blocking Tailwind runtime. Fixes (largely superseded by the Blackwall redesign,
which dropped Tailwind and the Inter/JetBrains Mono fonts from top-level pages):

- **Client logos → WebP** at display resolution (2× retina). The logo slider dropped
  from ~1.2 MB to ~52 KB (e.g. `bmt.png` 256 KB → `bmt.webp` ~5 KB). Originals kept
  as `.png` masters in `logos/` (unreferenced).
- **Tailwind Play CDN → prebuilt `css/tailwind.css`** (124 KB render-blocking JS
  runtime → 16 KB static, minified CSS). Build tooling in `tailwind/` (see CLAUDE.md).
- **Font preloading** for the three above-the-fold fonts in `index.html` (longest
  critical-path chain at ~690 ms).
- **Fonts → WOFF2** (May 2026, 2nd pass). Mobile Lighthouse showed LCP 5.2 s with a
  ~2,290 ms render delay; the uncompressed `.ttf` fonts (~400 KB Inter, ~270 KB
  JetBrains Mono each) dominated the critical path. Converted all 7 weights to
  `.woff2` (~66% smaller) and corrected the preload set to the actually-critical
  fonts (Inter-Regular/Bold + JetBrainsMono-SemiBold). `.ttf` kept as fallback.
  (These Inter/JetBrains woff2 files still sit in `fonts/` but are no longer
  referenced by any shipped page after the Blackwall redesign.)
  Note: the client-logo "oversize" Lighthouse warning was investigated and left
  as-is — the logos are already at correct 2× retina resolution; resizing down
  would blur them on retina screens for a ~14 KB non-saving.
- **A11y/best-practice:** raised the clients-strip label contrast (`text-gray-500`
  → `text-gray-400`) and wrapped homepage content in a `<main>` landmark.

## Social / Channels

- _Add LinkedIn, Twitter/X, GitHub profile links here_

## Campaigns / Reports

- **Open go-live TODO (Blackwall):** the homepage "book a call" CTA points at a
  placeholder Calendly link (`calendly.com/DEIN-LINK`). Replace with the real
  Calendly before the AI Agents / AI Security lead path is live. Tracked in
  `TODO-GO-LIVE.md`.
- _Add campaign plans, monthly reports, A/B test logs here_

## Tooling

- Available SEO skills: `seo-audit`, `seo-technical`, `seo-content`, `seo-geo`, `seo-schema`, `seo-sitemap`, `seo-dataforseo` (run via `/seo`)
