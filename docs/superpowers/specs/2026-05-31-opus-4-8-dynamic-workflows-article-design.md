# Design — Blog-Artikel: Opus 4.8 & dynamische Workflows

**Datum:** 2026-05-31
**Typ:** Blog-Post (DE + EN) für waiser.dev
**Status:** Approved (Design), bereit für Implementierung

## Ziel & Framing

Ein persönlicher Erfahrungsbericht, der **Opus 4.8 + dynamische Workflows** erklärt
und mit einer realen Session belegt — aber **mehr Zukunftsblick als technisches
Logbuch**. Kernfrage: Was bedeutet es, dass ein Modell jetzt einen ganzen Plan in
ein Skript gießen und einen Schwarm von Agents parallel abarbeiten lassen kann?

Die Erst-Recht-Session ist der **Beweis-Anker** ("ich hab's selbst erlebt"), nicht
das Hauptthema.

## Meta

- **Sprachen:** DE (`blog/posts/de/`) + EN (`blog/posts/en/`)
- **Slug:** `opus-4-8-dynamische-workflows-erst-recht-audit.html` (DE) /
  `opus-4-8-dynamic-workflows-erst-recht-audit.html` (EN)
- **Titel (DE):** „Opus 4.8 & dynamische Workflows: Wie 7 Agents meine Legal-Tech-Plattform in 5 Minuten auditiert haben"
- **Tags:** Opus 4.8 · Dynamic Workflows · Multi-Agent · Security
- **Datum:** 31. Mai 2026
- **Projekt offen genannt:** Erst Recht (Legal Consultation Platform) —
  SvelteKit + Svelte 5 + FastAPI/CrewAI + Supabase. Bezeichnung durchgängig
  **„Legal-Tech-Plattform" / „KI-Rechtsberatungs-Plattform"**, NICHT „Bezahl-Plattform".

## Verifizierte Fakten (Quelle: echter Workflow-Run + Session-Doku)

- **Tool:** echtes dynamisches Workflow-Tool, Run `wf_bdce4196-c77`
- **Modell:** Opus 4.8 auf allen Agents
- **Phase 1 „Audit":** 7 parallele Read-only-Subagents, ~814,5k Tokens, 233 Tool-Calls
- **Phase 2 „Synthesize":** Roh-Audits → priorisierte Findings-Liste mit Severities
- **Wall-Clock:** ~30 Min serielle Arbeit → **5m 11s** (langsamster Agent: `lawyer-upgrade`)
- **Ergebnis:** 6 Fix-Commits (`644ad54`→`8c0fa56`), ~3.400 Zeilen Code + ~2.100 Doku auf `main`
- **Adversarialer Clou:** Der erste Fix für eine sicherheitskritische Schwachstelle
  sah sauber aus, war bei der Live-Gegenprüfung aber ein No-Op (Ursache lag tiefer als
  der erste Blick vermuten ließ). Erst die erneute Live-Verifikation behob das Problem
  wirklich. (Ausnutzbare Details bewusst NICHT in Artikel/Spec — siehe Redaction.)
- **Feld-Mismatch-Beispiele:** im Artikel nur abstrakt erwähnt (DB ↔ Backend ↔ Frontend);
  keine konkreten Felder/Endpunkte einer laufenden Plattform offenlegen.

Per-Agent (Phase Audit):

| Agent | Tokens | Tools | Dauer |
|---|---|---|---|
| audit:backend-api | 177,5k | 36 | 4m 32s |
| audit:lawyer-upgrade | 157,7k | 34 | 5m 11s |
| audit:database | 111,9k | 40 | 4m 36s |
| audit:payment-stripe | 108,4k | 25 | 4m 34s |
| audit:frontend-wiring | 100,8k | 39 | 4m 1s |
| audit:build-tests-deps | 86,5k | 34 | 4m 27s |
| audit:email-notifications | 71,7k | 25 | 3m 27s |

## Opus 4.8 Fakten (Quellen verlinken)

- Release 28. Mai 2026, 41 Tage nach 4.7
- Effort-Controls; ehrlicheres Reasoning (~4× seltener übersehene Code-Fehler;
  flaggt Unsicherheiten, weniger unbelegte Behauptungen)
- Günstigerer Fast-Mode; bessere agentische Urteilskraft
- Dynamische Workflows = Research-Preview; bis zu 16 gleichzeitig / 1.000 Agents total
- Kern: Plan zieht ins Skript (deterministisch), nicht ins Kontextfenster

Quellen: anthropic.com/news/claude-opus-4-8, code.claude.com/docs/en/workflows,
techcrunch / thenewstack Berichterstattung.

## Aufbau

1. **Hook** — 7 Agents, echte live Legal-Tech-Plattform, 5 Min → priorisierte
   Findings-Liste. Pivot: „Das ist nicht die Story — die Story ist, was es bedeutet,
   dass das jetzt geht."
2. **Opus 4.8 in einem Absatz** — nur Relevantes, keine Benchmark-Dumps.
3. **Die Verschiebung: Plan zieht ins Skript** — konzeptionelles Herzstück, möglichst
   ohne Code. Kontextfenster war das Limit; jetzt orchestriert ein Skript den Schwarm.
4. **Mein 5-Minuten-Beweis** — Erst-Recht-Session knapp; schlanke Tabelle; der
   adversariale Moment als Prinzip erzählt („das Modell hat sich selbst misstraut").
5. **Was das aufschließt — Zukunftsblick (größter Abschnitt):**
   - Codebase-weite Migrationen/Audits, die heute zu groß sind
   - selbst-gegenprüfende Recherche statt Halluzination
   - Schwer-Entscheidungen aus mehreren unabhängigen Blickwinkeln
   - Verifikation als Default (Agents widerlegen Agents adversarial)
   - Wiederholbarkeit: Schwarm als gespeicherter, rerunbarer Prozess
   - Rollenwandel: vom Prompt-Tipper zum Dirigenten — gerade für kleine Teams/Solo
6. **Ehrliche Kehrseite** — Research-Preview, Token-Kosten, „mehr Agents ≠ besser",
   wann es sich NICHT lohnt.
7. **CTA** — Erst Recht + „so etwas für dein Team?"

## Visuelles (bestehendes CSS-Muster aus ki-agenten-workflows-superpowers.html)

- `phase-card` für die 2 Phasen (Audit → Synthesize)
- 1 schlanke Token/Zeit-Tabelle
- 1 `insight-box` für den No-Op-Moment
- Rest Prosa (weniger Code als sonst)

## Integration / Pflichtschritte

- Beide Posts in `blog/index.html` (DE) + `blog/en/index.html` (EN) Grids eintragen
- `sitemap.xml`: 2 neue URLs (DE+EN) mit hreflang-Alternates → von 29 auf 31
- `llms.txt` (+ ggf. `llms-full.txt`) Eintrag ergänzen
- Schema: BlogPosting + BreadcrumbList pro Post (wie Bestand)
- Canonical + hreflang de/en/x-default pro Post
- Related-posts (3 same-language Links) pro Post
- Tailwind: nur Bestands-Utilities verwenden → kein Rebuild nötig (sonst build.sh)
- MARKETING.md: Post-Anzahl/Sitemap-Stand aktualisieren

## Was NICHT in den Artikel kommt

- SQL-Tutorials / Zeile-für-Zeile-Migrationen
- Vollständige Findings-Severity-Liste (nur als Beleg, knapp)
- Interne Pfade/Dateinamen über das Nötige hinaus
