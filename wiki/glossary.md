---
title: Glossary
type: glossary
project: website
path: "-"
related:
  - "[[overview]]"
  - "[[index]]"
created: 2026-06-01
updated: 2026-06-01
confidence: high
---

# Glossary

Domain and project-specific terms used throughout this wiki and the codebase.

| Term | Definition |
| --- | --- |
| **waiser.dev** | The production domain of the site (custom domain via `CNAME`), Nils Weiser's personal IT-consulting portfolio + blog. |
| **GitHub Pages** | The static host; the repo (`wuesteon.github.io`) auto-deploys from the `main` branch with no build server. |
| **i18n (DE/EN)** | Internationalization. German is default/canonical; English is an alternate via in-place `data-i18n` swaps (UI) and mirrored file trees + redirects (blog). See [[i18n]]. |
| **data-i18n** | HTML attribute marking an element whose text `setLanguage()` replaces from the `translations` dictionary; the `data-i18n-html` variant swaps `innerHTML`. |
| **basePath** | The relative path prefix (`''`, `'../'`, `'../../'`, `'../../../'`) computed by `detectBasePath()` so runtime-injected links resolve from any directory depth. See [[runtime-component-injection]]. |
| **Umami** | A privacy-friendly, cookieless web analytics service (`cloud.umami.is`) embedded site-wide; website ID `d04784b7-9e58-43ad-b71b-73328369d474`. |
| **llms.txt / llms-full.txt** | Root files following the llms.txt convention: a curated index and a full-text dump of the site for AI-assistant (GEO) citation, referenced from `robots.txt`. See [[geo-ai-citation]]. |
| **GEO** | Generative Engine Optimization — optimizing to be cited/surfaced by AI answer engines (ChatGPT, Perplexity, AI Overviews), complementary to classic SEO. |
| **hreflang / x-default** | Link-rel alternates declaring language/region equivalents of a URL; `x-default` is the fallback. The homepage uses `x-default` only to avoid duplicate-canonical errors. |
| **JSON-LD @graph** | Schema.org structured data embedded per page (`Person`/`WebSite` on home, `BlogPosting`/`BreadcrumbList` per post) with `@id` cross-references like `#person`. |
| **Black hole effect** | A Canvas-2D particle "page destruction" animation in `blackhole/`, triggered by the footer "Don't click me" button, lazily injected by `components.js`. See [[blackhole-effect]]. |
| **Der Panther easter-egg** | A standalone, noindexed Rilke-poem-themed interactive canvas game/terminal under `easter-egg/`, with its own JS, translations, CSS, and audio. See [[easter-egg]]. |
| **Terminal theme** | The site's visual identity in `css/styles.css`: dark background, terminal windows with red/yellow/green dots, monospace code blocks, and cyan/green glow effects. See [[terminal-design-system]]. |
| **Tailwind standalone CLI** | The pinned v3.4.17 Tailwind binary in `tailwind/` used to compile the committed `css/tailwind.css` offline, replacing the render-blocking Play CDN. See [[tailwind-build]]. |
| **Bodenseeraum** | The Lake Constance region (DE/CH border area) — the author's stated location/market in site copy and SEO descriptions. |

## Related

- [[overview]] — where most of these terms first appear in context.
- [[index]] — the catalog of all wiki pages.
