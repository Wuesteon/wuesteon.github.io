# Design: Add Chinese (中文) as a Third Site Language

**Date:** 2026-07-04
**Project:** website (wAIser.dev)
**Status:** Approved — ready for implementation planning

## Goal

Add Chinese (`zh`) as a full third language alongside the existing German (`de`,
canonical) and English (`en`), so the entire site — homepage UI, the Agent Scan
tool, the blog index, and all 16 blog articles — is available in Chinese, with a
three-way DE / EN / 中文 language switcher.

## Current architecture (as found)

The i18n system has **two independent mechanisms**, both currently hardcoded to
exactly two languages:

1. **In-place `data-i18n` swap** (`js/translations.js`): a `translations` object
   with `de` and `en` key→string maps (~130 keys each, incl. the `bw.*`
   Blackwall namespace). `setLanguage(lang)` walks `[data-i18n]` elements and
   applies text via one of three channels: `data-i18n-attr` (attribute),
   `data-i18n-html` (innerHTML, for markup like the wAIser wordmark), or plain
   `textContent`. It persists to `localStorage`, sets `<html lang>`, toggles the
   `.active` state of the nav indicators (`#lang-de`/`#lang-en`) and drawer
   indicators (`.lang-de-indicator`/`.lang-en-indicator`), and calls the
   `window.onLanguageChange(lang)` hook.

2. **Duplicated file tree + redirect** for the blog: `/blog/` (DE index),
   `/blog/en/` (EN index), `/blog/posts/de/`, `/blog/posts/en/`. Toggling
   language on a blog page **redirects** to the mirror file, using a `slugMap`
   for the 4 posts whose DE/EN filenames differ.

**JS-rendered content** reads the language at runtime and currently branches
binary (`lang()==='de' ? DE : EN`), meaning *anything non-DE renders as English*:

- `js/site.js` — the `POSTS` array (16 posts, each with `de`/`en` objects
  holding `href/title/excerpt/date/read`), the blog feed + list renderers, the
  living-button label re-sync, and the mobile drawer that clones the toggle
  (`site.js:551-553`).
- `js/extras.js` — the Agent Opportunity Scan: `POOL_DE`/`POOL_EN`, `label()`,
  `verdictText()`, `scanLines()`, the "scanning…" states, `softMessage()` error
  copy, and the `&lang=` query param sent to `scan.waiser.dev`.

**The switcher** is a two-way toggle: `main.js:14` flips
`currentLang === 'de' ? 'en' : 'de'` on click of `#lang-toggle` /
`#lang-toggle-mobile`.

**Per-page HTML**: every blog post hardcodes `<html lang>`, a localized
`<title>`, `<meta name="description">`, `<link rel="canonical">`, and hreflang
`<link>`s. The seo layer (`sitemap.xml`, `llms.txt`) also enumerates URLs.

## Design

### Language model

- `zh` becomes a first-class language value everywhere `de`/`en` appear.
- **Fallback rule:** where a Chinese translation is not yet present (e.g. a blog
  post not yet translated during phased rollout), fall back to **English**, not
  German. This is implemented once in `getTranslation()` and in the JS-rendered
  branches, so partial rollout never shows a broken/empty state.
- Blog slugs under `/posts/zh/` **reuse the English filenames** (ASCII-safe, no
  new slugMap entries needed beyond the existing 4 differing posts, which map
  zh→en filenames the same way en does).

### Switcher: two-way toggle → three-way selector

- `components.js` nav `#lang-toggle`: three spans `#lang-de` / `#lang-en` /
  `#lang-zh` (labels `DE` · `EN` · `中文`), separated by `|`, active one carries
  `.active`.
- `main.js` click wiring: replace the binary flip. Click resolves the specific
  language from the clicked span's id (or a `data-lang` attribute) rather than
  toggling, so all three are directly reachable in one click.
- `site.js` drawer clone (`551-553`): mirror the three-way markup with
  `.lang-de-indicator` / `.lang-en-indicator` / `.lang-zh-indicator`.
- `setLanguage()`: extend the `#lang-*` / `.lang-*-indicator` active-state
  toggling to three languages.

### `translations.js`

- Add a complete `zh: { … }` block mirroring every key in `de`/`en` (~130 keys,
  incl. all `bw.*`). Markup-bearing values (wordmark spans, `.rip`, `<b>`,
  `<br>`, `&nbsp;`, arrows like `▸`/`→`) are preserved; only human-readable text
  is translated.
- `currentLang` init: add `/blog/zh/` and `/posts/zh/` URL detection → `zh`.
- `setLanguage()` blog redirect: add `/blog/zh/` ↔ others and `/posts/zh/` ↔
  others routing; `slugMap` gains `zh` mappings (reusing EN filenames).
- `getTranslation()` fallback: `translations[currentLang][key] ?? translations.en[key] ?? key`.

### JS-rendered content

- `site.js` `POSTS`: each of the 16 entries gains a `zh: { href, title,
  excerpt, date, read }` (href → `blog/posts/zh/<en-filename>`). Renderers pick
  `post[lang] || post.en`.
- `extras.js`: add `POOL_ZH`, and `zh` cases to `label()`, `verdictText()`,
  `scanLines()`, the scanning/among-error strings, and `softMessage()`. The
  `&lang=zh` param is passed through to the scan backend (backend may or may not
  support it; harmless).

### Blog HTML

- `blog/zh/index.html`: Chinese mirror of `blog/en/index.html`.
- `blog/posts/zh/<en-filename>.html` × 16: `<html lang="zh">`, translated
  `<title>` / `<meta description>`, `<link rel="canonical">` to the zh URL, and
  a full hreflang set (de/en/zh + x-default).
- **All existing DE + EN posts** and both index pages gain a `hreflang="zh"`
  `<link>` pointing at the zh mirror (hreflang must be reciprocal).

### SEO layer

- `sitemap.xml`: add the zh URLs.
- `llms.txt` / `llms-full.txt`: add zh entries where the DE/EN posts are listed.

## Phasing (each phase independently shippable)

- **Phase A — Plumbing + UI (no prose):** three-way switcher (`components.js`,
  `main.js`, `site.js` drawer, `setLanguage` active-state), `zh` dictionary in
  `translations.js`, `zh` branches in `site.js`/`extras.js`, `/zh/` routing +
  slugMap, EN fallback. **Outcome:** homepage + scan tool fully Chinese; blog
  feed cards render (zh title/excerpt) with EN-post fallback links until Phase C.
- **Phase B — Blog index + post scaffolding:** `blog/zh/index.html`, the 16
  `blog/posts/zh/` files created with correct lang/title/meta/canonical, full
  reciprocal hreflang across all three language trees, sitemap + llms entries.
  (Article *bodies* may be a placeholder/English pending Phase C.)
- **Phase C — Article prose:** translate the 16 article bodies to Chinese. Done
  as **one sample post first** (user reviews quality), then the remaining 15 via
  **parallel subagents** (one per post), then verify.

## Testing / verification

- Static site, no test runner. Verify by driving the real page:
  - Load `index.html`, switch to 中文 → all UI strings Chinese, active indicator
    correct, `localStorage.lang==='zh'`, `<html lang="zh">`.
  - Run the Agent Scan in 中文 → terminal lines, labels, verdict, opportunity
    cards all Chinese; error states Chinese.
  - Blog feed cards show Chinese titles/excerpts; clicking a card lands on the
    correct `/posts/zh/` file (or EN fallback pre-Phase-C).
  - Toggle DE↔EN↔ZH on a blog post → redirects to the correct mirror.
  - Validate hreflang reciprocity (every post references all three + x-default).
- No Tailwind rebuild needed unless a new utility class is introduced (blog
  posts use `css/tailwind.css`; copying existing post structure adds none).

## Out of scope

- Automatic browser-language detection for `zh` (keep explicit choice + the
  existing localStorage/URL rules).
- Translating the legal pages' German-mandated text (Impressum/Datenschutz stay
  German by legal requirement; their UI chrome still localizes via `data-i18n`).
- Backend scan API Chinese output (frontend passes `&lang=zh`; backend support
  is a separate concern).
