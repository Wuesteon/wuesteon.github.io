# Repositioning: AI Agents + AI Security (Core Competencies rebrand)

## Goal

Stop offering standalone Full-Stack/Mobile app development as a primary
service. Reposition the "Core Competencies" section (and the site's
supporting copy) around two flagship offerings — **AI Agents** and **AI
Security** — while keeping Full-Stack/Mobile visible only as a
scarcity-framed "Custom Development" option for selective, high-value
requests.

This is a psychological (scarcity/positioning) change plus a matching visual
treatment — no new sections, no new pages, no portfolio/proof block for the
GitHub repos (kept as background context only, not linked from the site in
this pass).

## Why

- Nils no longer wants inbound demand for generic app/fullstack work; he
  wants to filter for AI agent and AI security engagements.
- He has real, underused proof for both: production experience building
  agent systems (CrewAI, LangChain, early hand-built agents) and a 2nd place
  finish in a prompt injection challenge — currently invisible on the site.
- Removing the offers outright would look like a capability gap. Framing
  Custom Dev as "selected projects only" preserves optionality (still take
  great fullstack/mobile projects) while signaling scarcity instead of
  availability.

## Scope

Three-card "Core Competencies" section on `index.html`, plus every other
place on the homepage that currently states the old "AI + App development"
positioning, so the page doesn't contradict itself:

1. Core Competencies cards (`index.html` services section, `js/translations.js`
   `services.*` keys)
2. Hero subtitle (`hero.subtitle`, DE + EN)
3. Hero terminal JSON code block (`#terminal-code` in `index.html`, hardcoded
   markup, not translated)
4. About section focus list (`about.terminal.item3`, DE + EN)
5. Meta tags: `<title>`, `meta description`, OG title/description, Twitter
   title/description, and the `Person`/`WebSite` JSON-LD (`jobTitle`,
   `description`, `knowsAbout`)

Out of scope: new sections, portfolio/case-study block, linking the GitHub
repos, changing `hero.title` ("IT Consultant & AI Developer" stays as-is —
neutral umbrella term), changing stats/contact/footer copy.

## Content changes

### Card 1 — AI Agents (was "AI Solutions", cyan accent, `ai.orchestrate()`)

- Title: **AI Agents** (same string DE/EN)
- DE description: "Von autonomen Agenten über automatisierte Workflows bis
  hin zu selbst gehosteten LLMs. Massgeschneiderte KI-Systeme mit voller
  Datensouveränität – Ihre KI, Ihre Infrastruktur, Ihre Kontrolle."
- EN description: "From autonomous agents to automated workflows and
  self-hosted LLMs. Custom AI systems with full data sovereignty – your AI,
  your infrastructure, your control."
- Tech badges: unchanged (Ollama, RAG, Hugging Face, CrewAI, LangChain,
  Speech to Text, Gemini, OpenAI, Document Processing)
- Icon/gradient: unchanged (cyan/green gradient, existing SVG icon)

### Card 2 — AI Security (new, replaces the "Full-Stack Development" slot)

- Title: **AI Security**
- Accent color: red/amber (new — distinct from cyan and the muted Card 3)
  border/gradient classes, e.g. `from-red-500/20 to-orange-500/20` with
  `border-red-500/30`, icon `text-red-400`
- Code label: `security.audit()`
- DE description: "Security Audits und Hardening für KI-Systeme und moderne
  Web-Infrastruktur. Von Prompt-Injection-Schutz bis Cloud-Security – damit
  Ihre KI-Lösung nicht zur Angriffsfläche wird. (2. Platz bei einer
  Prompt-Injection-Challenge.)"
- EN description: "Security audits and hardening for AI systems and modern
  web infrastructure. From prompt injection defense to cloud security – so
  your AI solution doesn't become an attack surface. (2nd place in a prompt
  injection challenge.)"
- Tech badges: Security Audits, Pentesting, OWASP, Data Sovereignty,
  Self-Hosted Infra, Cloud Hardening
- Icon: a shield/lock SVG (reuse existing icon style — 24x24 outline,
  `stroke-width="1.5"`, consistent with the other two cards)

### Card 3 — Custom Development (merges old Full-Stack + Mobile cards, scarcity framing)

- Title: **Custom Development**
- Scarcity badge above the title, small pill: DE "Nur ausgewählte Projekte" /
  EN "Selected projects only" — `text-gray-500 border border-gray-700
  rounded-full px-3 py-1 text-xs font-mono` with a ✦ or lock glyph prefix
- Code label: keep the existing `app.launch()` or switch to `custom.build()`
  — use `custom.build()` since it now covers both web and mobile
- DE description: "Full-Stack Web- und Mobile-Entwicklung übernehme ich nur
  noch punktuell – für Projekte, die besonders gut passen."
- EN description: "I now take on full-stack web and mobile development only
  selectively – for projects that are an especially strong fit."
- Tech badges (trimmed, merged from both old cards): React Native,
  SvelteKit/React, Supabase, TypeScript, iOS/Android
- Visual de-emphasis (the scarcity signal, design side):
  - Icon box: `border-gray-600` instead of a colored `/30` border, no
    gradient background (flat `bg-gray-800/50` or similar), icon
    `text-gray-400` instead of a saturated color
  - Card itself keeps the same `.card` base class/padding/grid position as
    the other two (still a 3-column grid, still legible) — only the icon
    box, badge pill, and text tone are muted
  - No new CSS classes needed beyond the badge pill; reuse `tech-badge` for
    the bottom tags

### Grid layout

Stays `grid md:grid-cols-3 gap-8` — 3 cards, same as today. Card order:
AI Agents, AI Security, Custom Development.

## Site-wide consistency changes

- `hero.subtitle` (DE): "Spezialisiert auf AI Agents und AI Security. Ich
  transformiere komplexe Probleme in elegante, sichere technische Lösungen.
  Schnelle Iteration, moderne Technologien, messbare Ergebnisse."
- `hero.subtitle` (EN): "Specialized in AI agents and AI security. I
  transform complex problems into elegant, secure technical solutions.
  Rapid iteration, modern technologies, measurable results."
- Hero terminal JSON (`index.html` `#terminal-code`, hardcoded, no i18n key):
  in the `"expertise"` array, replace `"Full-Stack Development"` with
  `"AI Security"`. Keep `"AI Agents"`, `"LLM Integration"`,
  `"Cloud Architecture"` as-is.
- `about.terminal.item3` (DE): "Full-Stack Development" → "AI Security"
- `about.terminal.item3` (EN): "Full-Stack Development" → "AI Security"
  (item1 "AI Systems & Automation" / "KI-Systeme & Automation" and item2
  "Applied AI" already fit; item4 "Cloud Architecture" unchanged)

## Meta tags / SEO / structured data

- `<title>`: "Nils Weiser - AI Agent Specialist & AI Security"
- `meta name="description"`: "Nils Weiser - AI Agent Specialist aus dem
  Bodenseeraum. AI Agents, AI Security, technische Beratung. Vom Konzept
  bis zur Auslieferung."
- `og:title` / `twitter:title`: same as `<title>`
- `og:description` / `twitter:description`: same as meta description
  (em-dash variant already used for OG, keep consistent with existing
  style: "Nils Weiser — AI Agent Specialist aus dem Bodenseeraum. AI
  Agents, AI Security, technische Beratung. Vom Konzept bis zur
  Auslieferung.")
- JSON-LD `Person`:
  - `jobTitle`: "AI Agent Specialist"
  - `description`: "AI Agent Specialist aus dem Bodenseeraum. AI Agents, AI
    Security, technische Beratung. Vom Konzept bis zur Auslieferung."
  - `knowsAbout`: replace `"App Development"` with `"AI Security"`, keep
    `"Artificial Intelligence"`, `"AI Strategy"`, `"Web Development"`, `"IT
    Consulting"`; add `"Prompt Injection Defense"`
- JSON-LD `WebSite.description`: mirror the em-dash OG description above

Note: the page currently only has one canonical/x-default URL (DE content
with a client-side EN toggle), so meta tags stay German-first, matching
existing convention — no separate EN meta tag set exists today.

## Design details (Card 3 muted treatment)

No new global CSS classes required. Inline Tailwind utility changes only,
consistent with how the other two cards already use inline gradient/border
utility classes on their icon box `div`. The scarcity badge pill reuses the
existing `font-mono text-xs` sizing convention already used elsewhere
(status indicator, tech badges) so it doesn't introduce a new typographic
pattern.

## Testing / verification

Static site, no build step for HTML/JS changes (Tailwind classes used are
already present in `css/tailwind.css` from the existing cards — badge pill,
gray borders, and gray text utilities are all already in use elsewhere on
the page, e.g. status indicator, tech badges, muted text). Verify with:

- Open `index.html` locally, check both DE (default) and EN (toggle) render
  correctly for hero, services cards, and about section
- Confirm no leftover references to old `services.fullstack.*` /
  `services.mobile.*` keys are orphaned in `translations.js` (rename in
  place rather than leaving dead keys — `services.fullstack.*` becomes
  `services.security.*`, `services.mobile.*` becomes
  `services.custom.*`, or similar; exact key naming decided during
  implementation)
- Grep the repo for any other page (e.g. blog posts, llms.txt) that quotes
  the old "KI & App Entwicklung" tagline verbatim — out of scope to fix
  here, but worth a quick check so we know if a follow-up is needed
- Visual check: Card 3 reads as clearly de-emphasized next to Cards 1–2 at
  both desktop and mobile widths (3-col grid collapses to 1-col below `md`)
