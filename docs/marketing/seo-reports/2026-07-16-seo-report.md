# SEO-Report wAIser.dev — Woche zum 16.07.2026

*Automatisch erstellt. Quellen: Google Search Console (sc-domain:waiser.dev, letzte 28 Tage, Datenstand 14.07.) und Umami Cloud (letzte 7 Tage, 09.07.–16.07.). Vergleichsbasis: der Report vom 13.07.2026.*

## Auf einen Blick

Der organische Kanal wächst weiter: **6 Klicks** (Vorwoche 4) bei **82 Impressionen** (66) und **7,3 % CTR** (6,1 %). Die Brand-Query „nils weiser" hat ihren **ersten Klick** geholt und steht auf Position **5,0** (vorher 5,2). Der große Sprung der Woche kommt aus der Indexierung: **35 indexierte Seiten** statt 8 — der Sitemap-Fix vom 06.07. ist jetzt im Index angekommen. Umami zählt **30 Besucher** (17), **79 Views** (59) und erstmals **google.com mit 25 % Referrer-Anteil**. Und `cta-email-pitch`, letzte Woche noch bei 0 und als möglicher Tracking-Bug verdächtigt, feuerte **3×** — der Email-CTA funktioniert.

## Veränderung

**GSC — stetig aufwärts, Brand-Query liefert.**

| Kennzahl (GSC, 28 T.) | 06.07. | 13.07. | 16.07. | Trend |
|---|---|---|---|---|
| Klicks | 0 | 4 | **6** | +50 % |
| Impressionen | 33 | 66 | **82** | +24 % |
| Ø-CTR | 0 % | 6,1 % | **7,3 %** | besser |
| Ø-Position | 11 | 17 | **16,1** | leicht besser |
| „nils weiser" (Position) | 6,9 | 5,2 | **5,0** | erster Klick! |
| „waiser" (Position) | 21,2 | 25,6 | 26,4 | weiter schwach |
| Indexierte Seiten | 8 (30.06.) | 8 (30.06.) | **35 (10.07.)** | +27 |

Die Startseite trägt das Wachstum: `https://waiser.dev/` liegt bei **5 Klicks, 28 Impressionen, 17,9 % CTR, Position 6,3** (Vorwoche: 3 / 22 / 13,6 % / 7,0). Der DE-Post `loops-statt-prompts-cherny` hat seine Impressionen auf **15 verdoppelt** (Position 7,5). Neu in den Rankings: der EN-Post `multi-agent-ai-crewai` (7 Impressionen, Pos. 36,7), `blog/en/` (4, Pos. 6,0), `zh/ki-modell-evaluation` (4, Pos. 55,8) und `en/geo-wundermittel-wissenschaft` (3, Pos. 6,7). Insgesamt ranken jetzt **16 URLs** — die Sitemap-Seiten sickern sichtbar in die Suche.

**Umami — mehr Traffic, aber spike-getrieben.** 30 Besucher / 41 Visits / 79 Views gegenüber 17 / 23 / 59 in der Vorwoche. Der Zuwachs hängt fast komplett an einem **Ausreißer am 14.07. (~39 Views)** — entsprechend sprang die Bounce-Rate von 37 % auf **73 %** und die Umami-eigenen Deltas (gegen die Vorperiode 02.–09.07.) sind negativ. Die Besuchsdauer hält sich bei **1 min 51 s**. LinkedIn bleibt Hauptkanal (56 %), aber **google.com wächst auf 4 Besucher / 25 %** (Vorwoche 3 / 17 %) — der organische Kanal legt die dritte Woche in Folge zu.

## Auffälligkeiten

**Indexierung: der Sprung ist da — und bringt eine neue Baustelle mit.** Von 8 auf **35 indexierte Seiten** (Stand 10.07.), das ist der Sitemap-Effekt. Gleichzeitig stehen jetzt **18 Seiten auf „Gecrawlt – zurzeit nicht indexiert"** (Validierung nicht gestartet, Trend steigend) — bei 54 eingereichten URLs ist das die normale Warteschlange einer frischen Sitemap, sollte aber in 2–3 Wochen abschmelzen. Kritischer: Die Validierungen für **„Seite mit Weiterleitung" (2)** und **„Alternative Seite mit richtigem kanonischen Tag" (1)** sind von „Gestartet" auf **„Fehlgeschlagen"** gekippt. Die Duplicate-Canonical-Prüfungen bleiben bestanden (0 Seiten).

**www/http weiterhin nicht konsolidiert — dritte Woche.** `http://www.waiser.dev/` rankt weiter als eigene URL (6 Impressionen, Position 21,7) und „waiser" rutschte weiter auf **26,4** (21,2 → 25,6 → 26,4 über drei Wochen). Die fehlgeschlagene Weiterleitungs-Validierung oben ist mutmaßlich dasselbe Problem. Solange die Signale gesplittet sind, bleibt die namensgleiche Brand-Query gedeckelt.

**Der Lead-Pfad funktioniert nachweislich auf beiden CTAs.** `cta-email-pitch` feuerte **3×** (Vorwoche 0 — der vermutete Tracking-Bug ist damit widerlegt), `cta-book-call` **1×**, `lang-switch` **6×**. Insgesamt 47 Events über 11 Event-Typen. Das Scroll-Muster bleibt stark: Wer die Startseite zu 75 % scrollt, liest sie zu Ende (13 / 13).

**Geo: DACH hält 70 %, Philippinen wieder auffällig.** Deutschland 37 %, Schweiz 20 %, Österreich 13 %. Die Philippinen sind mit **6 Besuchern / 20 %** wieder da (Vorwoche 12 %) — passt zum Bounce-Spike am 14.07. und bleibt bot-verdächtig. Sitemap unverändert in Ordnung: Status „Erfolgreich", 54 erkannte Seiten, zuletzt gelesen 06.07.

## Empfehlungen

1. **www/http-Konsolidierung jetzt wirklich abschließen (hoch, dritte Woche offen).** Die GSC-Validierung ist fehlgeschlagen — im GitHub-Pages-Repo prüfen, ob die Custom Domain auf `waiser.dev` steht und „Enforce HTTPS" aktiv ist, dann testen, dass `http://www.waiser.dev/` per 301 auf `https://waiser.dev/` landet, und in GSC die Validierung für „Seite mit Weiterleitung" neu starten. Das blockiert die Brand-Query „waiser" (Pos. 26,4).
2. **„Gecrawlt – zurzeit nicht indexiert" (18 Seiten) gezielt abbauen (mittel).** Für die stärksten Kandidaten (Blog-Indizes `/blog/`, `/blog/en/`, `/blog/zh/` plus die neu rankenden Posts `multi-agent-ai-crewai` EN/DE) per URL-Prüfung die Indexierung beantragen und die interne Verlinkung von der Startseite auf die Blog-Sektion prüfen.
3. **DE-Content-Kurs halten (mittel).** `karpathy-claude-md` ist jetzt der meistbesuchte Blogpost (7 Besucher), `loops-statt-prompts-cherny` verdoppelt seine Google-Impressionen. Der nächste DE-Post im Agents/Claude-Workflow-Cluster kann direkt an beide anschließen und intern verlinken.
4. **Bounce-Spike beobachten, nicht überreagieren (niedrig).** Der 14.07.-Ausreißer (73 % Bounce, PH-Anteil 20 %) sieht nach Bot/Crawler aus. Falls das Muster nächste Woche anhält, in Umami die Sessions des Spike-Tags prüfen und ggf. per IP/Bot-Filter ausschließen.

---

### Rohdaten

**Google Search Console — Leistung, letzte 28 Tage (Stand 14.07.2026)**

| Kennzahl | Wert | Vorwoche |
|---|---|---|
| Klicks | 6 | 4 |
| Impressionen | 82 | 66 |
| Ø-CTR | 7,3 % | 6,1 % |
| Ø-Position | 16,1 | 17 |

Top-Suchanfragen (3 gelistet):

| Query | Klicks | Impr. | CTR | Position |
|---|---|---|---|---|
| nils weiser | 1 | 15 | 6,7 % | 5,0 |
| waiser | 0 | 7 | 0 % | 26,4 |
| 如何判断模型回答是否相关 | 0 | 4 | 0 % | 55,8 |

*(Zum Vergleich 3 Monate: zusätzlich „crewai" mit 1 Impression, Position 64.)*

Top-Seiten (10 von 16):

| Seite | Klicks | Impr. | CTR | Position |
|---|---|---|---|---|
| https://waiser.dev/ | 5 | 28 | 17,9 % | 6,3 |
| https://waiser.dev/index.html | 1 | 1 | 100 % | 2,0 |
| .../blog/posts/de/loops-statt-prompts-cherny.html | 0 | 15 | 0 % | 7,5 |
| .../blog/posts/zh/genetische-algorithmen-java.html | 0 | 8 | 0 % | 40,6 |
| .../blog/posts/en/multi-agent-ai-crewai.html | 0 | 7 | 0 % | 36,7 |
| **http://www.waiser.dev/** | 0 | 6 | 0 % | 21,7 |
| https://waiser.dev/blog/en/ | 0 | 4 | 0 % | 6,0 |
| .../blog/posts/zh/ki-modell-evaluation.html | 0 | 4 | 0 % | 55,8 |
| .../blog/posts/en/geo-wundermittel-wissenschaft.html | 0 | 3 | 0 % | 6,7 |
| .../blog/posts/de/multi-agent-ai-crewai.html | 0 | 2 | 0 % | 6,0 |

**Google Search Console — Indexierung (Stand 10.07.2026)**

35 indexiert (Vorwoche: 8, Stand 30.06.), 21 nicht indexiert, 3 aktive Gründe: „Gecrawlt – zurzeit nicht indexiert" **18** (Google-Systeme, Validierung nicht gestartet, Trend steigend), „Seite mit Weiterleitung" **2** (Validierung **fehlgeschlagen**), „Alternative Seite mit richtigem kanonischen Tag" **1** (Validierung **fehlgeschlagen**). Bestanden mit 0 Seiten: beide Duplikat-Kategorien, „Gefunden – zurzeit nicht indexiert".

**Google Search Console — Sitemap**

`https://waiser.dev/sitemap.xml` — Status **Erfolgreich**, **54 erkannte Seiten**, eingereicht 06.07.2026, zuletzt gelesen 06.07.2026 (unverändert zur Vorwoche).

**Umami — letzte 7 Tage (09.07.–16.07.2026)**

| Kennzahl | Wert | Vorwochen-Report | Δ (Umami vs. Vorperiode) |
|---|---|---|---|
| Besucher | 30 | 17 | −16 % |
| Visits | 41 | 23 | −35 % |
| Views | 79 | 59 | −69 % |
| Bounce-Rate | 73 % | 37 % | +23 % |
| Ø-Besuchsdauer | 1 min 51 s | 1 min 41 s | −74 % |

*(Die negativen Umami-Deltas beziehen sich auf die Vorperiode 02.–09.07., die den LinkedIn-/Views-Spike um den 08.07. enthielt. Tages-Spike diese Woche: 14.07. mit ~39 Views.)*

Top-Seiten: `/` (15, 36 %), `/blog/posts/de/karpathy-claude-md.html` (7, 17 %), `/blog/posts/de/geo-wundermittel-wissenschaft.html` (4, 10 %), `/blog/posts/de/loops-statt-prompts-cherny.html` (4, 10 %), `/blog/posts/de/agent-memory-poisoning-mem0.html` (3, 7 %), `/blog/` (2), `/impressum.html` (2), `/blog/en/` (2), `/#scan` (2), `/blog/posts/de/anthropic-skills-guide.html` (1).

Top-Referrer: linkedin.com (9, 56 %), **google.com (4, 25 %)**, lnkd.in (1, 6 %), com.linkedin.android (1, 6 %), github.com (1, 6 %).

Top-Länder: Deutschland 37 %, Philippinen 20 %, Schweiz 20 %, Österreich 13 %, Irland 3 %, Kanada 3 %, USA 3 %. (DACH: 70 %)

Browser: Chrome 80 %, iOS 10 %, iOS (Webview) 3 %, Safari 3 %, Edge 3 %.

Custom Events (47 gesamt, 11 Event-Typen — Vorwoche: 74 / 18 Typen):

| Event | Count |
|---|---|
| scroll-75-home | 13 |
| scroll-100-home | 13 |
| lang-switch | 6 |
| scroll-75-article | 4 |
| scroll-100-article | 3 |
| **cta-email-pitch** | **3** |
| easter-egg-visited | 1 |
| **cta-book-call** | **1** |
| scan-fallback | 1 |
| black-hole-completed | 1 |
| black-hole-activated | 1 |
