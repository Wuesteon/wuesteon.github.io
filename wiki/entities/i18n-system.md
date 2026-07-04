---
title: i18n / Translation System
type: entity
project: website
path: js/translations.js
related:
  - "[[homepage]]"
  - "[[blog-system]]"
  - "[[shared-components]]"
  - "[[main-interactions]]"
  - "[[i18n]]"
created: 2026-06-01
updated: 2026-07-04
confidence: high
---

# i18n / Translation System

**Kind:** module · **Path:** `js/translations.js`

## Summary

Client-side **DE/EN/中文 (zh)** translation dictionary plus a three-way language selector and
cross-language blog redirects, extended for the Blackwall redesign with ~70 `bw.*` keys, a
`data-i18n-attr` attribute channel, an `onLanguageChange` hook, and a `slugMap` covering the 4
DE-vs-EN posts with differing slugs (zh reuses the EN filename). Chinese was added 2026-07-04 as a
full third language: a complete `zh` dictionary (134 keys at parity with EN), `zh` cases in the
JS-rendered content (`POSTS[].zh` in `site.js`, the Agent Scan pool/labels/verdict/scan-lines in
`extras.js`), a `/blog/posts/zh/` tree (16 posts) + `/blog/zh/` index, and reciprocal hreflang.
**Fallback is English, not German:** `getTranslation()` and the JS branches fall back to `en` for
any missing `zh` value.

## Details

Holds the `translations` object (DE + EN key→string maps). Alongside the legacy keys (nav, hero,
stats, services, about, contact, footer, blog, clients) it now carries the **Blackwall namespace**
`bw.*` — ~70 new keys covering the Momentum hero (`bw.hero.*`, incl. the rotating headline words
`bw.hero.kin.*`), the Agent Opportunity Scan (`bw.scan.*`), the three service value-rows
(`bw.svc.*`, incl. the invitation-only `bw.svc.3.gate`), stats, the client marquee, the breach
sequence (`bw.breach.*`), the blog feed/hero (`bw.feed.*`, `bw.blog.*`), the two-path contact
(`bw.contact.a.*` / `bw.contact.b.*`), the end-CTA (`bw.cta.*`), the footer, and the 404 page
(`bw.404.*`). DE, EN and **zh** are at **full parity** across the keys. `currentLang` is initialized
from the URL (**zh** if under `/blog/zh/` or `/posts/zh/`; EN if under `/blog/en/` or `/posts/en/`)
else from `localStorage` (default `de`).

`setLanguage(lang)`:

- persists the choice to `localStorage` and sets `<html lang>` (via `#html-root` or the document
  element),
- for each `[data-i18n]` element applies the value through **one of three channels**:
  `data-i18n-attr="<attr>"` sets that attribute (used for the scan input `placeholder`),
  `data-i18n-html` sets `innerHTML` (used where the copy contains markup — e.g. the `wAIser`
  wordmark spans, `.rip` highlights, `<b>`/`<br>`), otherwise plain `textContent`,
- toggles the active state of both the nav indicators (`#lang-de`/`#lang-en`) and the mobile-drawer
  indicators (`.lang-de-indicator`/`.lang-en-indicator`),
- finally invokes the **`window.onLanguageChange(lang)` hook** if present, so JS-rendered content
  (the blog feed, blog list, article enhancer, and living-button labels registered by `js/site.js`)
  re-renders in the new language after the `data-i18n` text has been swapped.

Its subtle responsibility is **blog navigation**: because the blog is physically duplicated per
language, toggling language on a blog page triggers a **redirect** — `/blog/` ↔ `/blog/en/` for
indexes and `/posts/de/` ↔ `/posts/en/` for posts — using a `slugMap` that now covers the **four**
posts whose filenames differ across languages:
`mit-ai-halluzinationen` ↔ `mit-ai-hallucinations`,
`ambient-ai-die-naechste-ki-generation` ↔ `ambient-ai-the-next-ai-generation`,
`loops-statt-prompts-cherny` ↔ `loops-not-prompts-cherny`,
`opus-4-8-dynamische-workflows-erst-recht-audit` ↔ `opus-4-8-dynamic-workflows-erst-recht-audit`.
It also conditionally rewrites the document title (homepage hardcoded to "Nils Weiser - AI Agent
Specialist & AI Security"; blog posts honor an opt-in `[data-page-title]`, otherwise leave the
per-file localized `<title>` intact). Exposes `getCurrentLang()` and `getTranslation(key)` (the
latter used by `site.js` to read live button labels and by `extras.js` to localize the scan).

German is the default/canonical language. See [[i18n]] for the broader two-mechanism pattern.

## Related

- [[homepage]] — Blackwall `bw.*` strings are swapped in place by `setLanguage()`.
- [[blog-system]] — the duplicated DE/EN file trees this module redirects between (via `slugMap`).
- [[shared-components]] — the DE/EN `#lang-toggle` UI built in `components.js` is driven by
  `setLanguage()`.
- [[main-interactions]] — `js/site.js` registers `window.onLanguageChange`; `js/main.js` calls
  `setLanguage()`.
- [[i18n]] — the cross-cutting "duplicated-tree i18n" concept.
