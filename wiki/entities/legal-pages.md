---
title: Legal Pages
type: entity
project: website
path: impressum.html
related:
  - "[[shared-components]]"
  - "[[external-services]]"
created: 2026-06-01
updated: 2026-06-01
confidence: high
---

# Legal Pages

**Kind:** page-section · **Path:** `impressum.html` (and `datenschutz.html`)

## Summary

German-required Impressum and Datenschutz (privacy) static pages linked from the footer.

## Details

`impressum.html` (legal disclosure) and `datenschutz.html` (privacy policy) are small standalone
pages required under German/EU law, linked from the injected footer — [[shared-components]]'s
`getFooter()` references `${basePath}impressum.html` and `${basePath}datenschutz.html`.

They reuse the shared stylesheets and the component-injection pattern. The privacy page is relevant
to the Umami analytics integration (cookieless, privacy-friendly — see [[external-services]]), and
the site deliberately self-hosts fonts (no Google Fonts) for the same privacy reasons noted in the
easter-egg head comment.

## Related

- [[shared-components]] — the footer links to these pages via `getFooter()`.
- [[external-services]] — Umami's cookieless/privacy-friendly nature is documented in the privacy page.
