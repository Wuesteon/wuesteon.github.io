# SEO-Report wAIser.dev — Woche zum 13.07.2026

*Automatisch erstellt. Quellen: Google Search Console (sc-domain:waiser.dev, letzte 28 Tage) und Umami Cloud (letzte 7 Tage, 06.07.–13.07.). Vergleichsbasis: der Report vom 06.07.2026.*

## Auf einen Blick

Die Woche bringt den ersten echten organischen Durchbruch: **4 Klicks** in der Google Search Console — die ersten überhaupt, nach 0 in der Vorwoche. Die Impressionen haben sich auf **66** verdoppelt (vorher 33), die Ø-CTR steht bei **6,1 %** (vorher 0 %). Die Brand-Query „nils weiser" ist von Position 6,9 auf **5,2** vorgerückt. Die Sitemap ist repariert: Google liest jetzt alle **54 URLs** (vorher 31, Stand 04.06.). Und das Event-Tracking, das letzte Woche komplett stumm war, feuert: **74 Events** inkl. dem ersten `cta-book-call` und 5× `lang-switch`. Der Umami-Traffic ist mit **17 Besuchern** ruhiger als in der Vorwoche (32), aber die Herkunft passt endlich zur Positionierung: **78 % DACH** (DE 48 %, CH 24 %, AT 6 %) statt zuvor 75 % USA.

## Veränderung

**Google organisch — der Knoten platzt.** Alle drei Empfehlungen mit Priorität „hoch" aus dem letzten Report wurden angegangen, und die Zahlen reagieren:

| Kennzahl (GSC, 28 T.) | 06.07. | 13.07. | Trend |
|---|---|---|---|
| Klicks | 0 | **4** | erste Klicks überhaupt |
| Impressionen | 33 | **66** | +100 % |
| Ø-CTR | 0 % | **6,1 %** | — |
| Ø-Position | 11 | 17 | scheinbar schlechter (s. u.) |
| „nils weiser" (Position) | 6,9 | **5,2** | deutlich besser |
| „waiser" (Position) | 21,2 | 25,6 | schlechter |

Die **Ø-Position von 17 ist kein Rückschritt, sondern ein Mix-Effekt**: Durch die neu gelesene Sitemap sind Seiten in den Index gerutscht, die naturgemäß tief ranken — allen voran der 中文-Post `blog/posts/zh/genetische-algorithmen-java.html` (8 Impressionen, Position 40,6) und die zugehörige chinesische Query auf Position 54. Die Seiten, auf die es ankommt, sind stabil bis besser: `https://waiser.dev/` liegt bei Position 7,0 mit **3 Klicks und 13,6 % CTR**, `https://waiser.dev/index.html` sogar bei Position 2,0 (1 Klick, 100 % CTR). Der DE-Post `loops-statt-prompts-cherny.html` hält Position 6,4.

**Der Sitemap-Fix hat gewirkt.** `sitemap.xml` wurde am 06.07. neu eingereicht und noch am selben Tag gelesen — Status „Erfolgreich", **54 erkannte Seiten**. Zum Vergleich: letzte Woche waren es 31 Seiten mit Lesedatum 04.06. Die 中文-Version ist Google damit erstmals bekannt, und genau von dort kommen jetzt Impressionen (die chinesische Query „如何判断模型回答是否相关", 2 Impressionen).

**Umami — Traffic ruhiger, Qualität besser.** 17 Besucher / 23 Visits / 59 Views gegenüber 32 / 39 / 84 in der Vorwoche (Jun 29 – Jul 6). Der LinkedIn-Spike der Vorwoche ist abgeklungen; dafür sind Bounce-Rate (**37 %**, −10 %) und Besuchsdauer (**1 min 41 s**, +10 %) besser als je zuvor. Erstmals taucht **google.com als Referrer** auf (3 Besucher, 17 %) — das ist der organische Kanal, der anläuft.

> **Datenhinweis:** Der Vorwochen-Report nannte für Jun 29 – Jul 6 die Werte 100 Besucher / 119 Visits / 266 Views / 86 % Bounce / 2 min 54 s. Umami zeigt für **exakt dieselbe Periode heute 32 / 39 / 84 / 26 % / 55 s**. Die Zahlen lassen sich nicht in Deckung bringen — plausibelste Erklärung ist eine nachträgliche Bot-Bereinigung durch Umami (der letzte Report hatte selbst „Bot/Monitoring"-Traffic aus Manila vermutet). Die Trends oben sind daher gegen Umamis **heutige** Werte gerechnet, nicht gegen die Zahlen im alten Report.

## Auffälligkeiten

**Das Event-Tracking läuft — und der Lead-Pfad lebt.** Letzte Woche feuerten 0 Conversion-, 0 `lang-switch`- und 0 Scroll-Events. Diese Woche: **74 Events, 13 unique**, darunter der **erste `cta-book-call` überhaupt**, 5× `lang-switch` (der 3-Sprachen-Umschalter wird also genutzt und getrackt) und funktionierende Scroll-Tiefe (`scroll-75-home` 31×, `scroll-100-home` 27×). Bemerkenswert ist das Verhältnis: Auf 31 `scroll-75-home`-Events kommen 27 `scroll-100-home` — wer die Startseite zu drei Vierteln scrollt, liest sie fast immer zu Ende. Auch die Aufmerksamkeitsverteilung hat sich normalisiert: `easter-egg-visited` fiel von 11× auf 2×, die Spielerei zieht die Aufmerksamkeit nicht mehr vom Inhalt ab. `cta-email-pitch` steht weiterhin bei 0.

**Die www-/http-Variante ist immer noch nicht konsolidiert.** `http://www.waiser.dev/` rankt weiterhin als **eigene URL** (7 Impressionen, Position 21,4) — praktisch unverändert zur Vorwoche (9 Impressionen, Position 21,2). Und genau das schlägt sich in der Brand-Query nieder: **„waiser" ist von Position 21,2 auf 25,6 abgerutscht**, während „nils weiser" auf 5,2 vorrückte. Die gesplitteten Signale bremsen genau die Query, bei der die Domain namensgleich ist. Das ist die wichtigste offene Baustelle.

**Die Indexierungsdaten sind veraltet.** Die Seitenindexierung steht unverändert auf **8 indexiert / 3 nicht indexiert**, mit Stand **30.06.2026** — also 13 Tage alt und **noch vor** dem Sitemap-Neueinreichen vom 06.07. Der Sprung von 11 auf ~54 bekannte Seiten ist hier schlicht noch nicht angekommen. Immerhin: die Validierung für „Seite mit Weiterleitung" (1) und „Alternative Seite mit richtigem kanonischen Tag" (1) steht jetzt auf **„Gestartet"** (vorher „fehlgeschlagen" bzw. „nicht gestartet"), und „Duplikat – vom Nutzer nicht als kanonisch festgelegt" ist mit 0 Seiten **„Bestanden"**. Die Hreflang-/Canonical-Fixes aus dem Mai halten also.

**Geo-Verteilung dreht Richtung DACH.** Deutschland 48 %, Schweiz 24 %, Österreich 6 % — **78 % DACH**, gegenüber 11 % DE in der Vorwoche. Die USA sind von 75 % auf 6 % gefallen. Das passt jetzt zur Bodensee-/Schweiz-Positionierung. Passend dazu sind **alle Top-Blogposts DE-Versionen** (`loops-statt-prompts-cherny` 9, `karpathy-claude-md` 9, `agent-memory-poisoning-mem0` 3, `geo-wundermittel-wissenschaft` 3, `anthropic-skills-guide` 3). Die Philippinen halten sich mit 12 % (4 Besucher) — derselbe bot-verdächtige Rest wie letzte Woche.

## Empfehlungen

1. **www/http endlich auf die Apex-HTTPS-Domain konsolidieren (hoch, unverändert offen).** `http://www.waiser.dev/` rankt seit zwei Wochen als eigene URL und zieht „waiser" auf Position 25,6. Bei GitHub Pages heißt das: im Repo-Setting die Custom Domain auf `waiser.dev` fixieren und „Enforce HTTPS" aktivieren, damit `www`/`http` sauber per 301 auf `https://waiser.dev/` weiterleiten. Das ist der einzige echte Blocker zwischen der Brand-Query und Position 1.
2. **Indexierung der 54 URLs nachziehen (hoch).** Die Sitemap wird gelesen, aber der Indexierungsbericht hinkt hinterher. Für die drei Blog-Indizes (`/blog/`, `/blog/en/`, `/blog/zh/`) und 2–3 starke Posts pro Sprache manuell „URL prüfen → Indexierung beantragen" auslösen. Der zh-Post rankt bereits auf 40,6 — da ist Substanz, die nur Sichtbarkeit braucht.
3. **Auf DE-Content doppeln (mittel).** Die Daten sind eindeutig: DACH-Publikum, DE-Posts, DE-Traffic. `loops-statt-prompts-cherny` und `karpathy-claude-md` tragen zusammen ein Drittel aller Seitenaufrufe. Der nächste Post sollte DE-first sein und thematisch an diese beiden andocken (Agents/Claude-Workflow), statt breiter zu streuen.
4. **`cta-email-pitch` prüfen (mittel).** `cta-book-call` feuert jetzt — `cta-email-pitch` steht weiter bei 0. Bei nur 17 Besuchern kann das schlicht Stichprobe sein, aber es lohnt ein kurzer Klicktest, ob das `data-umami-event`-Attribut am Email-CTA korrekt gesetzt ist (der Book-a-Call-Zwilling funktioniert nachweislich).

---

### Rohdaten

**Google Search Console — Leistung, letzte 28 Tage (13.06.–10.07.2026)**

| Kennzahl | Wert |
|---|---|
| Klicks | 4 |
| Impressionen | 66 |
| Ø-CTR | 6,1 % |
| Ø-Position | 17 |

Top-Suchanfragen:

| Query | Klicks | Impr. | CTR | Position |
|---|---|---|---|---|
| nils weiser | 0 | 15 | 0 % | 5,2 |
| waiser | 0 | 8 | 0 % | 25,6 |
| 如何判断模型回答是否相关 | 0 | 2 | 0 % | 54,0 |

*(Die 4 Klicks sind keiner gelisteten Query zugeordnet — GSC anonymisiert seltene Suchanfragen. Auch die Query-Impressionen summieren sich nur auf 25 von 66.)*

Top-Seiten:

| Seite | Klicks | Impr. | CTR | Position |
|---|---|---|---|---|
| https://waiser.dev/ | 3 | 22 | 13,6 % | 7,0 |
| https://waiser.dev/index.html | 1 | 1 | 100 % | 2,0 |
| .../blog/posts/zh/genetische-algorithmen-java.html | 0 | 8 | 0 % | 40,6 |
| .../blog/posts/de/loops-statt-prompts-cherny.html | 0 | 7 | 0 % | 6,4 |
| **http://www.waiser.dev/** | 0 | 7 | 0 % | 21,4 |

**Google Search Console — Indexierung (Stand 30.06.2026, veraltet)**

8 indexiert, 3 nicht indexiert. Gründe: „Seite mit Weiterleitung" (1, Validierung *gestartet*), „Alternative Seite mit richtigem kanonischen Tag" (1, Validierung *gestartet*), „Duplikat – vom Nutzer nicht als kanonisch festgelegt" (0, *bestanden*).

**Google Search Console — Sitemap**

`https://waiser.dev/sitemap.xml` — Status **Erfolgreich**, **54 erkannte Seiten**, eingereicht 06.07.2026, zuletzt gelesen 06.07.2026. *(Vorwoche: 31 Seiten, zuletzt gelesen 04.06.2026.)*

**Umami — letzte 7 Tage (06.07.–13.07.2026)**

| Kennzahl | Wert | Δ (Umami) |
|---|---|---|
| Besucher | 17 | −36 % |
| Visits | 23 | −33 % |
| Views | 59 | −29 % |
| Bounce-Rate | 37 % | −10 % |
| Ø-Besuchsdauer | 1 min 41 s | +10 % |

Vorperiode (Jun 29 – Jul 6) laut Umami heute: 32 Besucher / 39 Visits / 84 Views / 26 % Bounce / 55 s.
Letzte 30 Tage: 222 Besucher / 267 Visits / 496 Views / 85 % Bounce / 1 min 54 s.

Top-Seiten: `/` (13, 24 %), `/blog/posts/de/loops-statt-prompts-cherny.html` (9, 17 %), `/blog/posts/de/karpathy-claude-md.html` (9, 17 %), `/blog/` (6, 11 %), `/index.html` (4, 7 %), `/blog/posts/de/agent-memory-poisoning-mem0.html` (3), `/blog/posts/de/geo-wundermittel-wissenschaft.html` (3), `/blog/posts/de/anthropic-skills-guide.html` (3), `/index.html#services` (2), `/impressum.html` (2).

Top-Referrer: linkedin.com (11, 61 %), **google.com (3, 17 %)**, lnkd.in (2, 11 %), bing.com (1, 6 %), com.linkedin.android (1, 6 %).

Top-Länder: Deutschland 48 %, Schweiz 24 %, Philippinen 12 %, Österreich 6 %, USA 6 %, Kanada 3 %.

Browser: Chrome 67 %, iOS 15 %, Edge 9 %, Safari 6 %, iOS (Webview) 3 %.

Custom Events (74 gesamt, 13 unique — Vorwoche: 18 / 5):

| Event | Count |
|---|---|
| scroll-75-home | 31 |
| scroll-100-home | 27 |
| scroll-75-article | 11 |
| scroll-100-article | 5 |
| lang-switch | 5 |
| black-hole-activated | 3 |
| scan-fallback | 3 |
| easter-egg-command-milestone | 2 |
| black-hole-completed | 2 |
| easter-egg-visited | 2 |
| easter-egg-hidden-command | 1 |
| chains-liberation-declined | 1 |
| easter-egg-liberation | 1 |
| chains-liberation-started | 1 |
| panther-awakened | 1 |
| easter-egg-poem-completed | 1 |
| related-post-click | 1 |
| **cta-book-call** | **1** |

`cta-email-pitch`: 0.
