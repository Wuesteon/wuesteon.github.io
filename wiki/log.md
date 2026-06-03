---
title: Wiki Operation Log
type: log
project: website
path: "-"
related:
  - "[[index]]"
  - "[[CLAUDE]]"
created: 2026-06-01
updated: 2026-06-01
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
