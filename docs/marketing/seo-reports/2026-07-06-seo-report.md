# SEO-Report wAIser.dev — Woche zum 06.07.2026

*Automatisch erstellt. Quellen: Google Search Console (sc-domain:waiser.dev, letzte 28 Tage) und Umami Cloud (letzte 7 Tage). Dies ist der **erste** Report in diesem Ordner — als Trend-Referenz dienen daher die Woche-über-Woche-Vergleiche aus Umami; ab dem nächsten Lauf wird gegen diesen Report verglichen.*

## Auf einen Blick

Die Woche war organisch (Google) noch sehr ruhig, über den LinkedIn-Kanal dagegen der bisher stärkste Ausschlag: 100 Besucher (+156 % zur Vorwoche), 119 Visits (+170 %) und 266 Seitenaufrufe (+421 %) bei einer Ø-Besuchsdauer von 2 min 54 s (+1099 %). Google Search Console zeigt für die letzten 28 Tage 33 Impressionen, 0 Klicks und eine Ø-Position von 11; die Brand-Suche „nils weiser" steht bei Position ~6,9, „waiser" hängt bei Position ~21. Indexiert sind 8 von 11 Google bekannten Seiten. Die Bounce-Rate liegt bei 86 % — typisch für einen Social-Traffic-Spike auf Content.

## Veränderung

Ein Vorgänger-Report existiert noch nicht, daher der Blick auf die Umami-Wochenvergleiche: Der Traffic ist quer über alle Kennzahlen deutlich gestiegen (Besucher +156 %, Views +421 %, Dauer +1099 %), getrieben nahezu vollständig von LinkedIn (linkedin.com + lnkd.in ≈ 80 % der bekannten Referrer). Das ist kein organischer Google-Effekt — die GSC-Zahlen bleiben klein (33 Impressionen, 0 Klicks) und spiegeln weiterhin eine junge Domain mit noch dünner Autorität wider. Die Brand-Positionen sind der eigentliche organische Kern und ab jetzt die Leitmetrik: „nils weiser" ~6,9, „waiser" ~21,2 (Ziel Richtung Position 1).

## Auffälligkeiten

**Sitemap wird nicht mehr frisch gelesen.** In GSC steht `sitemap.xml` auf „Erfolgreich", aber mit nur **31 erkannten Seiten** und „zuletzt gelesen: 04.06.2026" — über einen Monat alt. Die Datei enthält laut Projekt inzwischen 54 URLs inkl. der am 04.07. gelaunchten 中文-Seiten; diese kennt Google also noch gar nicht. Entsprechend niedrig ist die Abdeckung: Google sind insgesamt nur **11 Seiten** bekannt (8 indexiert, 3 nicht), von 54 in der Sitemap.

**www-/http-Variante rankt separat und schwach.** Unter den Top-Seiten taucht `http://www.waiser.dev/` als **eigene** URL auf (9 Impressionen, Position ~21,2) — parallel zur eigentlichen `https://waiser.dev/` (11 Impressionen, Position ~6,5). Genau diese Variante zieht auch die Brand-Query „waiser" auf Position 21 nach unten. Sehr wahrscheinlich verursacht sie zudem die Indexierungsmeldungen „Seite mit Weiterleitung" (1, Validierung nicht gestartet) und „Alternative Seite mit richtigem kanonischen Tag" (1, Validierung fehlgeschlagen). Die dritte nicht-indexierte Seite ist „Gecrawlt – zurzeit nicht indexiert" (1) — das ist normale Neu-Domain-Trägheit. Die früheren Duplicate-Canonical-Gründe stehen aktuell bei 0 Seiten, sind also ausgeräumt.

**Geo-Verteilung passt nicht zur Positionierung.** Der Traffic kam zu 75 % aus den USA und zu 10 % von den Philippinen (Manila), nur 11 % aus Deutschland und 0 % aus der Schweiz — während wAIser.dev auf den Bodenseeraum/DACH zielt. Die Manila-Zugriffe wirken im Activity-Feed wie eine einzelne, sich wiederholende Session (mehrfach `/index.html`, gleiche Umgebung) und sind eher Bot/Monitoring als echte Nachfrage.

**Conversion-Events feuern nicht.** Trotz 100 Besuchern wurden diese Woche **keine** `cta-book-call`- oder `cta-email-pitch`-Events ausgelöst, ebenso keine `lang-switch`- oder Scroll-Depth-Events. Die 18 gemessenen Events (5 unique) sind ausschließlich Spielereien/Engagement: `easter-egg-visited` 11×, `black-hole-completed` 2×, `black-hole-activated` 2×, `scan-fallback` 2×, `related-post-click` 1×. Passend dazu ist `/easter-egg/index.html` mit Abstand die zweitstärkste Seite (10 Besucher) — die Aufmerksamkeit fließt in die Spielerei, nicht in den Lead-Pfad.

## Empfehlungen

1. **Sitemap neu einreichen und Indexierung anstoßen (hoch).** In GSC `sitemap.xml` erneut einreichen, damit Google die aktuellen 54 URLs (inkl. 中文) liest, und für Startseite + beide Blog-Indizes „URL prüfen → Indexierung beantragen" auslösen. Ohne frisches Lesen bleibt die chinesische Sprachversion praktisch unsichtbar.
2. **www/http auf die Apex-HTTPS-Domain konsolidieren (hoch).** Sicherstellen, dass `http://www.waiser.dev/` sauber per 301 auf `https://waiser.dev/` weiterleitet bzw. korrekt kanonisiert. Das bündelt die aufgeteilten Signale, sollte die Brand-Query „waiser" von Position ~21 Richtung der ~6er-Position der Hauptseite ziehen und räumt zugleich die zwei „Weiterleitung"/„Alternative Seite"-Indexierungsmeldungen ab. Danach in GSC „Validierung starten".
3. **Lead-Pfad scharf schalten (hoch).** Der Calendly-Link der „Book a call"-CTA ist laut `TODO-GO-LIVE.md` noch Platzhalter — solange fällt jede Conversion aus (0 CTA-Events bei 100 Besuchern). Realen Calendly-Link setzen und die CTA-Sichtbarkeit auf der Startseite prüfen, damit der Social-Traffic auch konvertieren kann.
4. **DACH-Reichweite statt US-Streuung (mittel).** Der LinkedIn-Spike funktioniert, trifft aber überwiegend ein US-/internationales Publikum. Für die Bodensee-/Schweiz-Positionierung gezielt deutschsprachig posten; parallel prüfen, warum `lang-switch` 0-mal feuert (funktioniert der 3-Sprachen-Umschalter im Tracking?).

---

### Rohdaten

**Google Search Console — Leistung, letzte 28 Tage**

| Kennzahl | Wert |
|---|---|
| Klicks | 0 |
| Impressionen | 33 |
| Ø-CTR | 0 % |
| Ø-Position | 11 |

Top-Suchanfragen: „nils weiser" (9 Impr., Pos. 6,9), „waiser" (9 Impr., Pos. 21,2). Im 3-Monats-Fenster zusätzlich „crewai" (1 Impr.).

Top-Seiten: `https://waiser.dev/` (11 Impr., Pos. 6,5), `http://www.waiser.dev/` (9 Impr., Pos. 21,2), `.../blog/posts/de/loops-statt-prompts-cherny.html` (4 Impr., Pos. 6,3).

**Google Search Console — Indexierung (Stand 30.06.2026)**

8 indexiert, 3 nicht indexiert. Gründe: „Alternative Seite mit richtigem kanonischen Tag" (1, fehlgeschlagen), „Seite mit Weiterleitung" (1, nicht gestartet), „Gecrawlt – zurzeit nicht indexiert" (1). Duplicate-Gründe: 0 Seiten.

**Google Search Console — Sitemap**

`https://waiser.dev/sitemap.xml` — Status Erfolgreich, 31 erkannte Seiten, eingereicht 30.05.2026, zuletzt gelesen 04.06.2026 (Datei enthält laut Projekt 54 URLs).

**Umami — letzte 7 Tage (Δ zur Vorwoche)**

| Kennzahl | Wert | Δ |
|---|---|---|
| Besucher | 100 | +156 % |
| Visits | 119 | +170 % |
| Views | 266 | +421 % |
| Bounce-Rate | 86 % | −8 % |
| Ø-Besuchsdauer | 2 min 54 s | +1099 % |

Top-Seiten: `/` (23), `/easter-egg/index.html` (10), `/blog/` (9), `/blog/posts/en/claude-code-skills.html` (7), `/blog/posts/de/loops-statt-prompts-cherny.html` (7), `/index.html` (6), `/blog/en/` (5), `/blog/posts/de/agent-memory-poisoning-mem0.html` (5).

Top-Referrer: linkedin.com (7, 70 %), bing.com (1), lnkd.in (1), github.com (1).

Top-Länder: USA 75 %, Deutschland 11 %, Philippinen 10 %, je 1 %: Australien, Japan, Österreich, Niederlande.

Browser: Chrome 60 %, Firefox 15 %, Safari 13 %, Edge 6 %, Opera 3 %, iOS 3 %.

Custom Events (18 gesamt, 5 unique): `easter-egg-visited` 11, `black-hole-completed` 2, `black-hole-activated` 2, `scan-fallback` 2, `related-post-click` 1. **Keine** `cta-book-call`, `cta-email-pitch`, `lang-switch` oder Scroll-Depth-Events.
