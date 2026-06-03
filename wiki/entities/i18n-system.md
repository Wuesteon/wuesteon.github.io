---
title: i18n / Translation System
type: entity
project: website
path: js/translations.js
related:
  - "[[homepage]]"
  - "[[blog-system]]"
  - "[[shared-components]]"
  - "[[i18n]]"
created: 2026-06-01
updated: 2026-06-01
confidence: high
---

# i18n / Translation System

**Kind:** module · **Path:** `js/translations.js`

## Summary

Client-side DE/EN translation dictionary plus language toggle and cross-language blog redirects.

## Details

Holds the `translations` object (DE + EN key→string maps covering nav, hero, stats, services,
about, contact, footer, blog, clients). `currentLang` is initialized from the URL (EN if under
`/blog/en/` or `/posts/en/`) else from `localStorage` (default `de`).

`setLanguage(lang)`:

- persists the choice to `localStorage`,
- sets `<html lang>`,
- swaps every `[data-i18n]` element's text (or `innerHTML` when `data-i18n-html` is present),
- toggles the active state of the DE/EN indicator spans.

Its subtle responsibility is **blog navigation**: because the blog is physically duplicated per
language, toggling language on a blog page triggers a **redirect** — `/blog/` ↔ `/blog/en/` for
indexes and `/posts/de/` ↔ `/posts/en/` for posts — using a `slugMap` to handle the one post whose
filename differs across languages (`mit-ai-halluzinationen.html` ↔ `mit-ai-hallucinations.html`).
It also conditionally rewrites the document title (homepage hardcoded; blog posts honor an opt-in
`[data-page-title]`). Exposes `getCurrentLang()` and `getTranslation(key)`.

German is the default/canonical language. See [[i18n]] for the broader two-mechanism pattern.

## Related

- [[homepage]] — homepage strings are swapped in place by `setLanguage()`.
- [[blog-system]] — the duplicated DE/EN file trees this module redirects between.
- [[shared-components]] — the DE/EN toggle UI built in `components.js` is driven by `setLanguage()`.
- [[i18n]] — the cross-cutting "duplicated-tree i18n" concept.
