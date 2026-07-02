# AI Agents + AI Security Repositioning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand the "Core Competencies" section and every homepage copy block that echoes the old "AI + App development" positioning to "AI Agents + AI Security," with Full-Stack/Mobile demoted to a scarcity-framed "Custom Development" card.

**Architecture:** Pure static-content edit — no build step, no test framework in this repo for HTML/copy (`tailwind/build.sh` only needs re-running if a *new* utility class is introduced; this plan reuses only utility classes already present elsewhere on the page, confirmed against `css/tailwind.css` and `css/styles.css`). Each task edits `index.html` and/or `js/translations.js` directly and is verified by opening the page in a browser and visually/textually diffing against the spec.

**Tech Stack:** Static HTML, Tailwind (prebuilt `css/tailwind.css`), vanilla JS i18n (`js/translations.js`), `css/styles.css` for custom classes.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-02-ai-agents-security-repositioning-design.md`
- Content language is German by default (`lang="de"`); EN is a client-side toggle via `data-i18n` keys in `js/translations.js`. Meta tags stay German-first (no separate EN meta tag set exists today — confirmed in spec).
- Do not introduce new Tailwind utility classes that aren't already used elsewhere on the page — every class used in this plan (`border-gray-600`, `border-gray-700`, `text-gray-400`, `text-gray-500`, `bg-gray-800/50`, `from-red-500/20`, `to-orange-500/20`, `border-red-500/30`, `text-red-400`, `rounded-full`, `font-mono`) is a standard Tailwind utility already compiled into `css/tailwind.css` (verify in Task 1). If any class is missing from the compiled CSS, re-run `./tailwind/build.sh` and commit the regenerated `css/tailwind.css` (see Task 6).
- Out of scope (do not touch): `llms.txt`, `llms-full.txt`, blog posts, GitHub repo links, `hero.title`, stats/contact/footer copy, adding new sections.
- Every `data-i18n` key edited in `index.html` must have a matching key updated in **both** the `de` and `en` blocks of `js/translations.js` — the site breaks silently (falls back to raw key or stale text) if one language is missed.
- Preserve existing HTML structure/classes not called out for change (e.g. `class="card fade-in-up"`, `style="transition-delay: ..."`, the SVG icon wrapper pattern) — follow the existing pattern for the new AI Security icon rather than inventing a new markup shape.

---

## Task 1: Verify required Tailwind utility classes are already compiled

**Files:**
- Read only: `css/tailwind.css`

**Interfaces:**
- Produces: confirmation (pass/fail) that Task 3's and Task 4's utility classes exist in the compiled CSS, gating whether Task 6 (rebuild) is needed.

- [ ] **Step 1: Grep the compiled CSS for every new utility class this plan will use**

Run:
```bash
cd /Users/wuesteon/PROJECTS/website
for cls in "border-gray-600" "border-gray-700" "text-gray-400" "text-gray-500" "bg-gray-800\/50" "from-red-500\/20" "to-orange-500\/20" "border-red-500\/30" "text-red-400" "rounded-full"; do
  echo "== $cls =="
  grep -c -- "$cls" css/tailwind.css
done
```
Expected: every class prints a count >= 1 (Tailwind's minifier may rename via `\/` escaping for the slash in `/20`, `/30`, `/50` — grep still matches literal `\/` in the minified output since Tailwind CSS escapes slashes in class selectors).

- [ ] **Step 2: Record the result**

If **all** counts are >= 1: proceed directly to Task 2, and skip Task 6's rebuild step (mark it not-needed when you reach it).
If **any** count is 0: note which class(es) are missing — Task 6 will need to actually run `./tailwind/build.sh` after the HTML changes land, instead of being a no-op verification step.

- [ ] **Step 3: Commit**

No file changes in this task — nothing to commit. Proceed to Task 2.

---

## Task 2: Rename translation keys and update DE/EN copy for all three cards

**Files:**
- Modify: `js/translations.js:21-26` (DE block), `js/translations.js:75-80` (EN block)

**Interfaces:**
- Produces: new i18n keys `services.ai.title`, `services.ai.description` (title text changes, key names unchanged), `services.security.title`, `services.security.description`, `services.security.badge` (all new), `services.custom.title`, `services.custom.description`, `services.custom.badge` (new keys, replacing `services.fullstack.*` and `services.mobile.*` which are deleted).
- Consumes: nothing (first task touching translations.js).

- [ ] **Step 1: Edit the DE block**

In `js/translations.js`, replace lines 21-26:

```javascript
        'services.ai.title': 'KI-Lösungen',
        'services.ai.description': 'Von intelligenten Agenten über automatisierte Workflows bis hin zu selbst gehosteten LLMs. Massgeschneiderte KI-Lösungen mit voller Datensouveränität – Ihre KI, Ihre Infrastruktur, Ihre Kontrolle.',
        'services.fullstack.title': 'Full-Stack Entwicklung',
        'services.fullstack.description': 'End-to-End Webentwicklung von der Datenbank bis zum Frontend. Robuste APIs, skalierbare Architektur und moderne Tech-Stacks für produktionsreife Anwendungen.',
        'services.mobile.title': 'Mobile Apps',
        'services.mobile.description': 'Cross-Plattform Mobile-Entwicklung für iOS und Android. Exzellente UX, native Performance und nahtlose Backend-Integration.',
```

with:

```javascript
        'services.ai.title': 'AI Agents',
        'services.ai.description': 'Von autonomen Agenten über automatisierte Workflows bis hin zu selbst gehosteten LLMs. Massgeschneiderte KI-Systeme mit voller Datensouveränität – Ihre KI, Ihre Infrastruktur, Ihre Kontrolle.',
        'services.security.title': 'AI Security',
        'services.security.description': 'Security Audits und Hardening für KI-Systeme und moderne Web-Infrastruktur. Von Prompt-Injection-Schutz bis Cloud-Security – damit Ihre KI-Lösung nicht zur Angriffsfläche wird. (2. Platz bei einer Prompt-Injection-Challenge.)',
        'services.custom.badge': 'Nur ausgewählte Projekte',
        'services.custom.title': 'Custom Development',
        'services.custom.description': 'Full-Stack Web- und Mobile-Entwicklung übernehme ich nur noch punktuell – für Projekte, die besonders gut passen.',
```

- [ ] **Step 2: Edit the EN block**

In `js/translations.js`, replace lines 75-80 (same content, English source block — line numbers shift by however many lines Step 1 added/removed above them, so locate by matching text, not by line number):

```javascript
        'services.ai.title': 'AI Solutions',
        'services.ai.description': 'From intelligent agents to automated workflows and self-hosted LLMs. Custom AI solutions with full data sovereignty – your AI, your infrastructure, your control.',
        'services.fullstack.title': 'Full-Stack Development',
        'services.fullstack.description': 'End-to-end web development from database to frontend. Robust APIs, scalable architecture, and modern tech stacks for production-ready applications.',
        'services.mobile.title': 'Mobile Apps',
        'services.mobile.description': 'Cross-platform mobile development for iOS and Android. Excellent UX, native performance, and seamless backend integration.',
```

with:

```javascript
        'services.ai.title': 'AI Agents',
        'services.ai.description': 'From autonomous agents to automated workflows and self-hosted LLMs. Custom AI systems with full data sovereignty – your AI, your infrastructure, your control.',
        'services.security.title': 'AI Security',
        'services.security.description': 'Security audits and hardening for AI systems and modern web infrastructure. From prompt injection defense to cloud security – so your AI solution doesn\'t become an attack surface. (2nd place in a prompt injection challenge.)',
        'services.custom.badge': 'Selected projects only',
        'services.custom.title': 'Custom Development',
        'services.custom.description': 'I now take on full-stack web and mobile development only selectively – for projects that are an especially strong fit.',
```

- [ ] **Step 3: Verify no orphaned old keys remain**

Run:
```bash
cd /Users/wuesteon/PROJECTS/website
grep -n "services.fullstack\|services.mobile" js/translations.js
```
Expected: no output (empty result — both old key families fully removed from both language blocks).

- [ ] **Step 4: Verify new keys are present in both blocks**

Run:
```bash
cd /Users/wuesteon/PROJECTS/website
grep -c "'services.security.title'\|'services.security.description'\|'services.custom.title'\|'services.custom.description'\|'services.custom.badge'" js/translations.js
```
Expected: `10` (5 keys × 2 language blocks).

- [ ] **Step 5: Commit**

```bash
cd /Users/wuesteon/PROJECTS/website
git add js/translations.js
git commit -m "content: rebrand service copy to AI Agents / AI Security / Custom Development"
```

---

## Task 3: Rebuild the AI Agents card (Card 1) and AI Security card (Card 2) markup in index.html

**Files:**
- Modify: `index.html:246-303` (the "AI Solutions Card" and "Full-Stack Development Card" divs)

**Interfaces:**
- Consumes: `services.ai.title`, `services.ai.description`, `services.security.title`, `services.security.description` from Task 2.
- Produces: updated card markup for Cards 1–2 that Task 4 (Card 3) and Task 5 (verification) build on.

- [ ] **Step 1: Replace the AI Solutions card comment and heading**

In `index.html`, change line 246 from:
```html
                <!-- AI Solutions Card -->
```
to:
```html
                <!-- AI Agents Card -->
```

- [ ] **Step 2: Update the AI Agents card title text (line 255)**

Change:
```html
                            <h3 class="text-xl font-bold text-white mb-1" data-i18n="services.ai.title">KI-Lösungen</h3>
```
to:
```html
                            <h3 class="text-xl font-bold text-white mb-1" data-i18n="services.ai.title">AI Agents</h3>
```
(The `data-i18n` attribute is unchanged — only the static fallback text inside the tag changes to match the new German default copy set in Task 2.)

- [ ] **Step 3: Replace lines 275-303 (Full-Stack Development Card) with the new AI Security card**

Replace this entire block (old lines 275-303):
```html
                <!-- Full-Stack Development Card -->
                <div class="card fade-in-up" style="transition-delay: 0.1s">
                    <div class="flex items-start gap-4 mb-6">
                        <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/30">
                            <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                            </svg>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-white mb-1" data-i18n="services.fullstack.title">Full-Stack Entwicklung</h3>
                            <p class="text-purple-400 text-sm font-mono">stack.build()</p>
                        </div>
                    </div>
                    <p class="text-gray-400 mb-6" data-i18n="services.fullstack.description">
                        End-to-End Webentwicklung von der Datenbank bis zum Frontend. Robuste APIs, skalierbare Architektur und moderne Tech-Stacks für produktionsreife Anwendungen.
                    </p>
                    <div class="flex flex-wrap gap-2">
                        <span class="tech-badge text-xs">Google Cloud Platform</span>
                        <span class="tech-badge text-xs">Angular/React/SvelteKit</span>
                        <span class="tech-badge text-xs">Nginx</span>
                        <span class="tech-badge text-xs">Supabase</span>
                        <span class="tech-badge text-xs">Node.js</span>
                        <span class="tech-badge text-xs">Python</span>
                        <span class="tech-badge text-xs">Go</span>
                        <span class="tech-badge text-xs">TypeScript</span>
                        <span class="tech-badge text-xs">PostgreSQL</span>
                        <span class="tech-badge text-xs">NoSQL</span>
                    </div>
                </div>
```

with:
```html
                <!-- AI Security Card -->
                <div class="card fade-in-up" style="transition-delay: 0.1s">
                    <div class="flex items-start gap-4 mb-6">
                        <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center border border-red-500/30">
                            <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75L11.25 15 15 9.75M12 3c-2.755 0-5.455.232-8.083.678-.533.09-.917.556-.917 1.096v1.044a12.005 12.005 0 006.83 10.855l.415.207a2.25 2.25 0 001.51 0l.415-.207a12.005 12.005 0 006.83-10.855V4.774c0-.54-.384-1.007-.917-1.096A48.99 48.99 0 0012 3z"/>
                            </svg>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-white mb-1" data-i18n="services.security.title">AI Security</h3>
                            <p class="text-red-400 text-sm font-mono">security.audit()</p>
                        </div>
                    </div>
                    <p class="text-gray-400 mb-6" data-i18n="services.security.description">
                        Security Audits und Hardening für KI-Systeme und moderne Web-Infrastruktur. Von Prompt-Injection-Schutz bis Cloud-Security – damit Ihre KI-Lösung nicht zur Angriffsfläche wird. (2. Platz bei einer Prompt-Injection-Challenge.)
                    </p>
                    <div class="flex flex-wrap gap-2">
                        <span class="tech-badge text-xs">Security Audits</span>
                        <span class="tech-badge text-xs">Pentesting</span>
                        <span class="tech-badge text-xs">OWASP</span>
                        <span class="tech-badge text-xs">Data Sovereignty</span>
                        <span class="tech-badge text-xs">Self-Hosted Infra</span>
                        <span class="tech-badge text-xs">Cloud Hardening</span>
                    </div>
                </div>
```

(The shield/checkmark SVG path is Heroicons' "shield-check" outline icon, matching the existing icon style convention: `24x24` viewBox, `stroke-width="1.5"`, `stroke-linecap="round"`, `stroke-linejoin="round"`.)

- [ ] **Step 4: Commit**

```bash
cd /Users/wuesteon/PROJECTS/website
git add index.html
git commit -m "content: rebuild AI Agents and AI Security cards in Core Competencies"
```

---

## Task 4: Replace the Mobile Apps card with the muted Custom Development card

**Files:**
- Modify: `index.html:305-328` (the "Mobile Apps Card" div, immediately following the block edited in Task 3)

**Interfaces:**
- Consumes: `services.custom.badge`, `services.custom.title`, `services.custom.description` from Task 2.
- Produces: final third card, completing the 3-card grid.

- [ ] **Step 1: Replace lines 305-328 (Mobile Apps Card) with the new Custom Development card**

Replace this entire block (old lines 305-328):
```html
                <!-- Mobile Apps Card -->
                <div class="card fade-in-up" style="transition-delay: 0.2s">
                    <div class="flex items-start gap-4 mb-6">
                        <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center border border-orange-500/30">
                            <svg class="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                            </svg>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-white mb-1" data-i18n="services.mobile.title">Mobile Apps</h3>
                            <p class="text-orange-400 text-sm font-mono">app.launch()</p>
                        </div>
                    </div>
                    <p class="text-gray-400 mb-6" data-i18n="services.mobile.description">
                        Cross-Plattform Mobile-Entwicklung für iOS und Android. Exzellente UX, native Performance und nahtlose Backend-Integration.
                    </p>
                    <div class="flex flex-wrap gap-2">
                        <span class="tech-badge text-xs">React Native</span>
                        <span class="tech-badge text-xs">Ionic</span>
                        <span class="tech-badge text-xs">iOS</span>
                        <span class="tech-badge text-xs">Android</span>
                        <span class="tech-badge text-xs">Expo</span>
                    </div>
                </div>
```

with:
```html
                <!-- Custom Development Card (scarcity-framed) -->
                <div class="card fade-in-up" style="transition-delay: 0.2s">
                    <span class="inline-flex items-center gap-1.5 text-gray-500 border border-gray-700 rounded-full px-3 py-1 text-xs font-mono mb-4" data-i18n="services.custom.badge">✦ Nur ausgewählte Projekte</span>
                    <div class="flex items-start gap-4 mb-6">
                        <div class="w-12 h-12 rounded-lg bg-gray-800/50 flex items-center justify-center border border-gray-600">
                            <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                            </svg>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-white mb-1" data-i18n="services.custom.title">Custom Development</h3>
                            <p class="text-gray-400 text-sm font-mono">custom.build()</p>
                        </div>
                    </div>
                    <p class="text-gray-400 mb-6" data-i18n="services.custom.description">
                        Full-Stack Web- und Mobile-Entwicklung übernehme ich nur noch punktuell – für Projekte, die besonders gut passen.
                    </p>
                    <div class="flex flex-wrap gap-2">
                        <span class="tech-badge text-xs">React Native</span>
                        <span class="tech-badge text-xs">SvelteKit/React</span>
                        <span class="tech-badge text-xs">Supabase</span>
                        <span class="tech-badge text-xs">TypeScript</span>
                        <span class="tech-badge text-xs">iOS/Android</span>
                    </div>
                </div>
```

(Reuses the Full-Stack card's original icon path — the "bolt/lightning build" glyph — now in muted gray, since Custom Dev now covers both former cards' scope. The icon box drops the colored gradient/border in favor of `bg-gray-800/50` / `border-gray-600`, and the badge pill above the title is the scarcity signal called for in the spec.)

- [ ] **Step 2: Commit**

```bash
cd /Users/wuesteon/PROJECTS/website
git add index.html
git commit -m "content: replace Mobile Apps card with muted Custom Development card"
```

---

## Task 5: Update hero subtitle, hero terminal JSON, and About focus list

**Files:**
- Modify: `js/translations.js` (`hero.subtitle` DE + EN, `about.terminal.item3` DE + EN)
- Modify: `index.html:129` (hardcoded terminal JSON, not i18n-driven)

**Interfaces:**
- Consumes: nothing new.
- Produces: nothing consumed by later tasks — this is a leaf content task.

- [ ] **Step 1: Update `hero.subtitle` in the DE block of `js/translations.js`**

Find:
```javascript
        'hero.subtitle': 'Spezialisiert auf KI-Agenten und moderne App-Entwicklung. Ich transformiere komplexe Probleme in elegante technische Lösungen. Schnelle Iteration, moderne Technologien, messbare Ergebnisse.',
```
Replace with:
```javascript
        'hero.subtitle': 'Spezialisiert auf AI Agents und AI Security. Ich transformiere komplexe Probleme in elegante, sichere technische Lösungen. Schnelle Iteration, moderne Technologien, messbare Ergebnisse.',
```

- [ ] **Step 2: Update `hero.subtitle` in the EN block of `js/translations.js`**

Find:
```javascript
        'hero.subtitle': 'Specialized in AI agents and modern app development. I transform complex problems into elegant technical solutions. Rapid iteration, modern technologies, measurable results.',
```
Replace with:
```javascript
        'hero.subtitle': 'Specialized in AI agents and AI security. I transform complex problems into elegant, secure technical solutions. Rapid iteration, modern technologies, measurable results.',
```

- [ ] **Step 3: Update `about.terminal.item3` in the DE block**

Find:
```javascript
        'about.terminal.item3': 'Full-Stack Development',
```
(this exact string appears once in the DE block) — replace the DE occurrence with:
```javascript
        'about.terminal.item3': 'AI Security',
```

- [ ] **Step 4: Update `about.terminal.item3` in the EN block**

Find the second occurrence of the same line (in the EN block further down the file) and replace it identically:
```javascript
        'about.terminal.item3': 'AI Security',
```

- [ ] **Step 5: Verify exactly two occurrences were changed and none of the old string remains**

Run:
```bash
cd /Users/wuesteon/PROJECTS/website
grep -n "about.terminal.item3" js/translations.js
grep -c "Full-Stack Development" js/translations.js
```
Expected: the first command shows two lines, both ending in `'AI Security',`. The second command outputs `0`.

- [ ] **Step 6: Update the hardcoded hero terminal JSON in `index.html:129`**

Find (around line 123-134):
```html
                            <pre><code>{
  <span class="code-property">"name"</span>: <span class="code-string">"Nils Weiser"</span>,
  <span class="code-property">"role"</span>: <span class="code-string">"IT Consultant & Developer"</span>,
  <span class="code-property">"expertise"</span>: [
    <span class="code-string">"AI Agents"</span>,
    <span class="code-string">"LLM Integration"</span>,
    <span class="code-string">"Full-Stack Development"</span>,
    <span class="code-string">"Cloud Architecture"</span>
  ],
  <span class="code-property">"available"</span>: <span class="code-keyword">true</span>,
  <span class="code-property">"location"</span>: <span class="code-string">"Switzerland"</span>
}</code></pre>
```
Replace the single line:
```html
    <span class="code-string">"Full-Stack Development"</span>,
```
with:
```html
    <span class="code-string">"AI Security"</span>,
```
(leave every other line in this block untouched — `"AI Agents"`, `"LLM Integration"`, `"Cloud Architecture"` all already fit the new positioning).

- [ ] **Step 7: Commit**

```bash
cd /Users/wuesteon/PROJECTS/website
git add index.html js/translations.js
git commit -m "content: align hero subtitle, terminal JSON, and about focus list with AI Agents/Security positioning"
```

---

## Task 6: Update meta tags and JSON-LD structured data

**Files:**
- Modify: `index.html:6-42` (`<title>`, meta description, OG tags, Twitter tags, JSON-LD `@graph`)

**Interfaces:**
- Consumes: nothing.
- Produces: nothing consumed by later tasks — this is a leaf content task.

- [ ] **Step 1: Update `<title>` (line 6)**

Find:
```html
    <title>Nils Weiser - IT Consulting: KI & App Entwicklung</title>
```
Replace with:
```html
    <title>Nils Weiser - AI Agent Specialist & AI Security</title>
```

- [ ] **Step 2: Update meta description (line 7)**

Find:
```html
    <meta name="description" content="Nils Weiser - IT Consultant & Developer aus dem Bodenseeraum. KI-Strategien, Web-Apps, technische Beratung. Vom Konzept bis zur Auslieferung.">
```
Replace with:
```html
    <meta name="description" content="Nils Weiser - AI Agent Specialist aus dem Bodenseeraum. AI Agents, AI Security, technische Beratung. Vom Konzept bis zur Auslieferung.">
```

- [ ] **Step 3: Update `og:title` (line 12)**

Find:
```html
    <meta property="og:title" content="Nils Weiser - IT Consulting: KI & App Entwicklung">
```
Replace with:
```html
    <meta property="og:title" content="Nils Weiser - AI Agent Specialist & AI Security">
```

- [ ] **Step 4: Update `og:description` (line 13)**

Find:
```html
    <meta property="og:description" content="Nils Weiser — IT Consultant & Developer aus dem Bodenseeraum. KI-Strategien, Web-Apps, technische Beratung. Vom Konzept bis zur Auslieferung.">
```
Replace with:
```html
    <meta property="og:description" content="Nils Weiser — AI Agent Specialist aus dem Bodenseeraum. AI Agents, AI Security, technische Beratung. Vom Konzept bis zur Auslieferung.">
```

- [ ] **Step 5: Update `twitter:title` (line 17)**

Find:
```html
    <meta name="twitter:title" content="Nils Weiser - IT Consulting: KI & App Entwicklung">
```
Replace with:
```html
    <meta name="twitter:title" content="Nils Weiser - AI Agent Specialist & AI Security">
```

- [ ] **Step 6: Update `twitter:description` (line 18)**

Find:
```html
    <meta name="twitter:description" content="Nils Weiser — IT Consultant & Developer aus dem Bodenseeraum. KI-Strategien, Web-Apps, technische Beratung. Vom Konzept bis zur Auslieferung.">
```
Replace with:
```html
    <meta name="twitter:description" content="Nils Weiser — AI Agent Specialist aus dem Bodenseeraum. AI Agents, AI Security, technische Beratung. Vom Konzept bis zur Auslieferung.">
```

- [ ] **Step 7: Update the JSON-LD `Person` block (lines 24-42)**

Find:
```json
      "jobTitle": "IT Consultant & Developer",
      "description": "IT Consultant & Developer aus dem Bodenseeraum. KI-Strategien, Web-Apps, technische Beratung. Vom Konzept bis zur Auslieferung.",
      "knowsAbout": [
        "Artificial Intelligence",
        "AI Strategy",
        "App Development",
        "Web Development",
        "IT Consulting"
      ],
```
Replace with:
```json
      "jobTitle": "AI Agent Specialist",
      "description": "AI Agent Specialist aus dem Bodenseeraum. AI Agents, AI Security, technische Beratung. Vom Konzept bis zur Auslieferung.",
      "knowsAbout": [
        "Artificial Intelligence",
        "AI Strategy",
        "AI Security",
        "Prompt Injection Defense",
        "Web Development",
        "IT Consulting"
      ],
```

- [ ] **Step 8: Update the JSON-LD `WebSite.description` (around line 49)**

Find:
```json
      "description": "Nils Weiser — IT Consultant & Developer aus dem Bodenseeraum. KI-Strategien, Web-Apps, technische Beratung. Vom Konzept bis zur Auslieferung.",
```
Replace with:
```json
      "description": "Nils Weiser — AI Agent Specialist aus dem Bodenseeraum. AI Agents, AI Security, technische Beratung. Vom Konzept bis zur Auslieferung.",
```

- [ ] **Step 9: Validate the JSON-LD block is still syntactically valid JSON**

Run:
```bash
cd /Users/wuesteon/PROJECTS/website
python3 -c "
import re, json
html = open('index.html').read()
m = re.search(r'<script type=\"application/ld\+json\">(.*?)</script>', html, re.DOTALL)
json.loads(m.group(1))
print('valid JSON-LD')
"
```
Expected output: `valid JSON-LD` (no exception).

- [ ] **Step 10: Commit**

```bash
cd /Users/wuesteon/PROJECTS/website
git add index.html
git commit -m "content: update meta tags and JSON-LD to AI Agent Specialist / AI Security positioning"
```

---

## Task 7: Rebuild Tailwind CSS if Task 1 found missing utility classes, then do full visual verification

**Files:**
- Modify (conditional): `css/tailwind.css` (only if Task 1 Step 2 found a missing class)
- Read only: `index.html`, `js/translations.js`

**Interfaces:**
- Consumes: the pass/fail result recorded in Task 1.
- Produces: final verified, working page — end state of this plan.

- [ ] **Step 1: Conditionally rebuild Tailwind**

If Task 1 found all classes already present: skip to Step 2.

If Task 1 found missing classes, run:
```bash
cd /Users/wuesteon/PROJECTS/website
./tailwind/build.sh
git add css/tailwind.css
git commit -m "build: regenerate tailwind.css for new Core Competencies utility classes"
```

- [ ] **Step 2: Open the page locally**

Run:
```bash
cd /Users/wuesteon/PROJECTS/website
python3 -m http.server 8000
```
Then open `http://localhost:8000/index.html` in a browser.

- [ ] **Step 3: Visually verify the Core Competencies section (German, default)**

Check:
- Card 1 title reads "AI Agents", cyan icon box unchanged, description mentions "autonomen Agenten" / "Datensouveränität"
- Card 2 title reads "AI Security", red/orange icon box with shield-check icon, description mentions "Prompt-Injection-Schutz" and "2. Platz", badges show Security Audits/Pentesting/OWASP/Data Sovereignty/Self-Hosted Infra/Cloud Hardening
- Card 3 shows a small pill badge above the title reading "✦ Nur ausgewählte Projekte" in muted gray, title "Custom Development", gray/muted icon box (no colored gradient), description mentions "nur noch punktuell", badges show React Native/SvelteKit/React/Supabase/TypeScript/iOS-Android
- All three cards are same width/height alignment in the 3-column grid (Card 3 must not look broken or misaligned despite the extra badge pill — visually confirm the badge doesn't push the card taller than its siblings in a way that looks unintentional; if it does, that's expected since Card 3 has one extra line — verify it still reads as intentional, not broken)

- [ ] **Step 4: Toggle to English and repeat the same checks**

Click the language toggle in the header. Verify all the same text points above render in English per Task 2/5's EN strings, and that no key shows up as a raw `services.*`/`hero.*`/`about.*` string (which would indicate a missed key).

- [ ] **Step 5: Verify hero section**

Check the hero subtitle text matches Task 5's new copy (DE and EN), and the terminal code block's `"expertise"` array shows `"AI Security"` instead of `"Full-Stack Development"` (this line is static HTML, not i18n-toggled, so it must already read correctly in both language states).

- [ ] **Step 6: Verify About section**

Scroll to the About terminal window; confirm the focus list's third item reads "AI Security" (DE) / "AI Security" (EN toggle) instead of "Full-Stack Development".

- [ ] **Step 7: Verify meta tags in rendered page source**

Run:
```bash
curl -s http://localhost:8000/index.html | grep -E "<title>|og:title|og:description|twitter:title|twitter:description"
```
Expected: all five lines show "AI Agent Specialist & AI Security" (title tags) or the matching description copy from Task 6.

- [ ] **Step 8: Stop the local server**

Press `Ctrl+C` in the terminal running `python3 -m http.server 8000`.

- [ ] **Step 9: Final full-repo diff review**

Run:
```bash
cd /Users/wuesteon/PROJECTS/website
git log --oneline -8
git diff 62ecdaa..HEAD --stat
```
Expected: commit log shows all task commits from this plan in order; diff stat shows only `index.html`, `js/translations.js`, and (conditionally) `css/tailwind.css` changed — no unrelated files touched.
