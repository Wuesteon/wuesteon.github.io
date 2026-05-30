# Marketing — waiser.dev

Marketing data, analytics, SEO assets, and growth tracking for the personal portfolio site.

## Site

- **Domain:** waiser.dev (deployed via GitHub Pages, repo: `wuesteon.github.io`)
- **Languages:** DE / EN (i18n via `js/translations.js`)
- **Auto-deploy:** GitHub Pages from `main` branch

## Analytics

- **Umami Cloud**
  - Script: `https://cloud.umami.is/script.js`
  - Website ID: `d04784b7-9e58-43ad-b71b-73328369d474`
  - Embedded in `index.html` (defer loaded)
  - Dashboard: https://cloud.umami.is/analytics/eu/websites/d04784b7-9e58-43ad-b71b-73328369d474

## SEO

- **Sitemap:** `sitemap.xml` — 29 URLs (home + blog DE/EN + 13 DE + 13 EN posts),
  each with `xhtml:link` hreflang alternates. Submitted in Google Search Console.
- **robots.txt:** present — `Allow: /`, disallows `/easter-egg/` + `/blackhole/`,
  references the sitemap.
- **llms.txt:** `llms.txt` (curated index of site + all posts) and `llms-full.txt`
  (full article text inlined) at site root, referenced from `robots.txt`. For
  AI-assistant/GEO citation, not Google indexing. Regenerate after adding posts.
- **Meta:** title/description + canonical per page; OG + Twitter cards on homepage.
- **Hreflang:** homepage is a single bilingual URL → `x-default` only (no de/en
  pair, which previously caused duplicate-canonical errors). Blog indexes and all
  posts carry de/en/x-default alternates that match the sitemap.
- **Schema markup (JSON-LD):**
  - Homepage: `@graph` with `Person` (`#person`) + `WebSite` (`#website`).
  - Every blog post: `@graph` with `BlogPosting` (author/publisher linked to
    `#person`, `dateModified`, `mainEntityOfPage`) + `BreadcrumbList`.
- **Internal linking:** every post is linked from its blog index; each post also
  has a hand-curated "Related posts" section (3 same-language topical links,
  `.related-posts` component in `styles.css`) → 78 internal links/language.

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

- **Blog:** `blog/` — posts in DE + EN under `blog/posts/de/` and `blog/posts/en/`
- **Topics:** Claude Code, Skills, AI agents, CrewAI, Playwright MCP, legal AI, model evaluation
- **Courses:** `courses/`
- **Skills:** `skills/` (showcase of published Claude skills)

## Performance

Lighthouse-driven optimization pass (mobile, May 2026). Baseline mobile score 71,
LCP 10.5 s — bottlenecks were oversized client logos and a render-blocking Tailwind
runtime. Fixes:

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
  Note: the client-logo "oversize" Lighthouse warning was investigated and left
  as-is — the logos are already at correct 2× retina resolution; resizing down
  would blur them on retina screens for a ~14 KB non-saving.
- **A11y/best-practice:** raised the clients-strip label contrast (`text-gray-500`
  → `text-gray-400`) and wrapped homepage content in a `<main>` landmark.

## Social / Channels

- _Add LinkedIn, Twitter/X, GitHub profile links here_

## Campaigns / Reports

- _Add campaign plans, monthly reports, A/B test logs here_

## Tooling

- Available SEO skills: `seo-audit`, `seo-technical`, `seo-content`, `seo-geo`, `seo-schema`, `seo-sitemap`, `seo-dataforseo` (run via `/seo`)
