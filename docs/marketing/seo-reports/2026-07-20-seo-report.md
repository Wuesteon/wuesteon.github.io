# SEO-Report wAIser.dev — Woche zum 20.07.2026

*Automatisch erstellt. Quellen: Google Search Console (sc-domain:waiser.dev, letzte 28 Tage, letzte Aktualisierung vor ~3 Std.; Indexierungsdaten Stand 10.07.) und Umami Cloud (letzte 7 Tage, 13.07.–20.07.). Vergleichsbasis: der Report vom 16.07.2026.*

## Auf einen Blick

Die Woche gehört der Brand-Query: **„nils weiser" steht jetzt auf Position 3,4** (16.07.: 5,0 — das Ziel Richtung 1 rückt näher). Die **Impressionen wachsen auf 101** (82, +23 %), die Klicks bleiben bei **6**, die CTR sinkt entsprechend auf **5,9 %** (7,3 %), Ø-Position verbessert auf **14,2** (16,1). Es ranken jetzt **20 URLs** (16). Umami zählt **33 Besucher** (30), **45 Visits** (41) und **83 Views** (79) bei stabil hoher Bounce-Rate von 73 %. Neu und bemerkenswert: Der **Website-Scan wurde 6× abgeschickt (5× erfolgreich)** — das Tool wird erstmals sichtbar genutzt — und der DE-Post `ki-modell-evaluation` ist mit **7 Besuchern** der neue Top-Blogpost.

## Veränderung

**GSC — Sichtbarkeit wächst, Klicks stagnieren.**

| Kennzahl (GSC, 28 T.) | 06.07. | 13.07. | 16.07. | 20.07. | Trend |
|---|---|---|---|---|---|
| Klicks | 0 | 4 | 6 | **6** | flach |
| Impressionen | 33 | 66 | 82 | **101** | +23 % |
| Ø-CTR | 0 % | 6,1 % | 7,3 % | **5,9 %** | runter (Impressionseffekt) |
| Ø-Position | 11 | 17 | 16,1 | **14,2** | besser |
| „nils weiser" (Position) | 6,9 | 5,2 | 5,0 | **3,4** | stark verbessert |
| „waiser" (Position) | 21,2 | 25,6 | 26,4 | **26,4** | weiter schwach |
| Rankende URLs | — | — | 16 | **20** | +4 |

Die Startseite bleibt Klick-Träger: `https://waiser.dev/` mit **5 Klicks, 30 Impressionen, 16,7 % CTR, Position 5,3** (Vorwoche 5/28/17,9 %/6,3). Der DE-Post `loops-statt-prompts-cherny` wächst weiter: **25 Impressionen** (15) bei Position 7,6 — aber weiterhin **0 Klicks**. Neu in den Rankings u. a. `en/loops-not-prompts-cherny` (3 Impressionen, Pos. 8,3). Im 3-Monats-Fenster tauchen erstmals die Non-Brand-Queries **„loops statt prompts" (Pos. 9,0)** und „crewai" (Pos. 64) auf.

**Umami — leicht mehr Besucher, längere Sessions, LinkedIn dominiert wieder.** 33 Besucher / 45 Visits / 83 Views gegenüber 30/41/79. Die Besuchsdauer steigt auf **2 min 24 s** (1 min 51 s). Der Google-Referrer fällt allerdings auf **1 Besucher** zurück (Vorwoche 4) — LinkedIn trägt mit **78 %** (16 von ~18 verweisenden Besuchen inkl. lnkd.in/App) wieder fast den ganzen referred Traffic. Der Views-Spike der Woche lag am **14.07. (~39 Views)** — derselbe Ausreißer, der schon im letzten Report als bot-verdächtig markiert war.

## Auffälligkeiten

**Impressionen +23 %, Klicks +0 — die CTR-Schere öffnet sich.** Google zeigt die Seite deutlich öfter (101 Impressionen), aber die neuen Impressionen kommen von Positionen ohne Klickpotenzial (Blogposts auf Pos. 7–56, `loops-statt-prompts-cherny`: 25 Impressionen / 0 Klicks). Das ist die normale Zwischenphase nach dem Indexierungsschub — jetzt entscheiden Titles/Descriptions, ob daraus Klicks werden.

**Brand-Query gespalten: „nils weiser" 3,4 — „waiser" 26,4 (vierte Woche).** `http://www.waiser.dev/` rankt weiterhin als eigene URL (6 Impressionen, Pos. 21,7), die www/http-Konsolidierung ist unverändert offen, die GSC-Validierungen für „Seite mit Weiterleitung" (2) und „Alternative Seite mit kanonischem Tag" (1) stehen weiter auf **Fehlgeschlagen**.

**Indexierung eingefroren, Sitemap seit zwei Wochen nicht gelesen.** Die Indexierungsdaten tragen unverändert den Stand **10.07.** (35 indexiert / 21 nicht, davon 18 „Gecrawlt – zurzeit nicht indexiert", Validierung nicht gestartet), und die Sitemap wurde zuletzt am **06.07.** gelesen (Status Erfolgreich, 54 Seiten). Kein neuer Crawl-Zyklus sichtbar — die 18 Warteschlangen-Seiten bewegen sich nicht.

**Der Scan wird benutzt — aber der Funnel endet dort.** Neu diese Woche: **scan-submit 6×, scan-success 5×, scan-error 1×** (Vorwoche: nur 1 scan-fallback). Gleichzeitig: **cta-book-call 0×, cta-email-pitch 1×**. Wer den Scan nutzt, konvertiert danach nicht weiter. Übrige Events: scroll-100-home 5, scroll-75-home 5, scroll-75-article 4, lang-switch 3, scroll-100-article 2 (~32 Events, 11 Typen; Vorwoche 47/11).

**Geo & Bounce unverändert auffällig.** DACH 66 % (DE 39 %, CH 18 %, AT 9 %), Philippinen weiter **12 %**, Bounce-Rate konstant **73 %** — der 14.07.-Spike und das PH-Muster bleiben bot-verdächtig, jetzt die dritte Woche in Folge.

## Empfehlungen

1. **www/http-Konsolidierung abschließen (hoch, vierte Woche offen).** Im GitHub-Pages-Repo Custom Domain `waiser.dev` + „Enforce HTTPS" verifizieren, `http://www.waiser.dev/` → `https://waiser.dev/` per 301 testen, dann in GSC beide fehlgeschlagenen Validierungen neu starten. Solange blockiert das die Brand-Query „waiser" (Pos. 26,4) — im Kontrast zur stark steigenden „nils weiser".
2. **Crawl-Zyklus anstoßen (hoch).** Sitemap in GSC neu einreichen (zuletzt gelesen 06.07.) und für die 18 „Gecrawlt – zurzeit nicht indexiert"-Seiten die Validierung starten; die wichtigsten Blog-Indizes (`/blog/`, `/blog/en/`, `/blog/zh/`) per URL-Prüfung zur Indexierung anmelden.
3. **CTR-Arbeit an den rankenden Posts (mittel).** `loops-statt-prompts-cherny` (25 Impressionen, 0 Klicks, Pos. 7,6) und die Startseite sind die größten Hebel: Title/Meta-Description auf Klickanreiz umschreiben (Nutzenversprechen statt Themenlabel). Ziel: aus dem Impressionswachstum endlich Klicks machen.
4. **Scan-Funnel verlängern (mittel).** 6 Scan-Submits, aber 0 Book-Calls: Nach `scan-success` direkt einen kontextuellen CTA anzeigen („Ergebnis besprechen? 15-min-Call") und das als eigenes Event tracken. Der Scan ist gerade der aktivste Engagement-Punkt der Seite.

---

### Rohdaten

**Google Search Console — Leistung, letzte 28 Tage (Abruf 20.07.2026)**

| Kennzahl | Wert | Vorwoche (16.07.) |
|---|---|---|
| Klicks | 6 | 6 |
| Impressionen | 101 | 82 |
| Ø-CTR | 5,9 % | 7,3 % |
| Ø-Position | 14,2 | 16,1 |

Top-Suchanfragen (28 T., 3 gelistet):

| Query | Klicks | Impr. | CTR | Position |
|---|---|---|---|---|
| nils weiser | 1 | 17 | 5,9 % | 3,4 |
| waiser | 0 | 7 | 0 % | 26,4 |
| 如何判断模型回答是否相关 | 0 | 4 | 0 % | 55,8 |

*(3-Monats-Fenster zusätzlich: „loops statt prompts" 1 Impression / Pos. 9,0; „crewai" 1 Impression / Pos. 64.)*

Top-Seiten (10 von 20):

| Seite | Klicks | Impr. | CTR | Position |
|---|---|---|---|---|
| https://waiser.dev/ | 5 | 30 | 16,7 % | 5,3 |
| https://waiser.dev/index.html | 1 | 1 | 100 % | 2,0 |
| .../blog/posts/de/loops-statt-prompts-cherny.html | 0 | 25 | 0 % | 7,6 |
| .../blog/posts/zh/genetische-algorithmen-java.html | 0 | 8 | 0 % | 40,6 |
| .../blog/posts/en/multi-agent-ai-crewai.html | 0 | 7 | 0 % | 36,7 |
| **http://www.waiser.dev/** | 0 | 6 | 0 % | 21,7 |
| https://waiser.dev/blog/en/ | 0 | 4 | 0 % | 6,0 |
| .../blog/posts/en/geo-wundermittel-wissenschaft.html | 0 | 4 | 0 % | 7,3 |
| .../blog/posts/zh/ki-modell-evaluation.html | 0 | 4 | 0 % | 55,8 |
| .../blog/posts/en/loops-not-prompts-cherny.html | 0 | 3 | 0 % | 8,3 |

**Google Search Console — Indexierung (Stand 10.07.2026, unverändert zur Vorwoche)**

35 indexiert, 21 nicht indexiert, 3 aktive Gründe: „Gecrawlt – zurzeit nicht indexiert" **18** (Google-Systeme, Validierung nicht gestartet), „Seite mit Weiterleitung" **2** (Validierung **fehlgeschlagen**), „Alternative Seite mit richtigem kanonischen Tag" **1** (Validierung **fehlgeschlagen**). Bestanden mit 0 Seiten: beide Duplikat-Kategorien, „Gefunden – zurzeit nicht indexiert".

**Google Search Console — Sitemap**

`https://waiser.dev/sitemap.xml` — Status **Erfolgreich**, **54 erkannte Seiten**, eingereicht 06.07.2026, zuletzt gelesen **06.07.2026** (unverändert seit zwei Wochen).

**Umami — letzte 7 Tage (13.07.–20.07.2026)**

| Kennzahl | Wert | Vorwochen-Report | Δ (Umami vs. Vorperiode) |
|---|---|---|---|
| Besucher | 33 | 30 | −2 % |
| Visits | 45 | 41 | −2 % |
| Views | 83 | 79 | −27 % |
| Bounce-Rate | 73 % | 73 % | +5 % |
| Ø-Besuchsdauer | 2 min 24 s | 1 min 51 s | −21 % |

*(Tages-Spike: 14.07. mit ~39 Views — in beiden Wochenfenstern enthalten, daher die negativen Umami-Deltas.)*

Top-Seiten: `/` (14, 33 %), `/blog/posts/de/ki-modell-evaluation.html` (7, 17 %, **neu**), `/blog/posts/de/loops-statt-prompts-cherny.html` (4, 10 %), `/blog/posts/en/agent-memory-poisoning-mem0.html` (3, 7 %), `/blog/posts/de/geo-wundermittel-wissenschaft.html` (3, 7 %), `/blog/posts/de/agent-memory-poisoning-mem0.html` (3, 7 %), `/blog/posts/de/anthropic-skills-guide.html` (2), `/blog/posts/de/karpathy-claude-md.html` (2), `/#scan` (2), `/blog/` (2).

Top-Referrer: linkedin.com (14, 78 %), lnkd.in (1), google.com (1 — Vorwoche 4), github.com (1), com.linkedin.android (1).

Top-Länder: Deutschland 39 %, Schweiz 18 %, Philippinen 12 %, Österreich 9 %, USA 9 %, Irland 6 %, Kanada 3 %, Türkei 3 %. (DACH: 66 %)

Browser: Chrome 70 %, iOS (Webview) 9 %, iOS 6 %, Safari 6 %, Edge (Chromium) 6 %, Edge 3 %.

Custom Events (~32 gesamt, 11 Event-Typen — Vorwoche: 47 / 11):

| Event | Count |
|---|---|
| **scan-submit** | **6** |
| scroll-100-home | 5 |
| scroll-75-home | 5 |
| **scan-success** | **5** |
| scroll-75-article | 4 |
| lang-switch | 3 |
| scroll-100-article | 2 |
| cta-email-pitch | 1 |
| scan-error | 1 |
| cta-book-call | 0 |
| scan-fallback | 0 |
