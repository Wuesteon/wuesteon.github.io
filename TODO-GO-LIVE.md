# TODO — vor & nach dem Go-Live (Blackwall Redesign)

Stand: 2026-07-03 · Branch `worktree-blackwall-redesign`

Das Redesign ist **fertig und getestet**. Zwei Dinge sind noch offen — nur **eines** blockiert den Live-Gang.

---

## 🔴 Blocker — muss vor Live erledigt sein

- [ ] **Calendly-Link einsetzen**
  Der "Termin buchen / Book a call"-Button (Kontaktbereich, Pfad A) zeigt aktuell auf
  den Platzhalter `https://calendly.com/DEIN-LINK` → führt sonst ins Leere.
  **Datei:** `index.html` (eine Stelle, Zeile ~234, im Kontaktbereich `.cpath--primary`).
  → Echten Calendly-/Cal.com-Link einsetzen. (Claude kann das in 1 Sekunde machen,
    sobald du den Link schickst.)

---

## 🟡 Optional — kann nach Live nachgezogen werden

- [ ] **Website-Scannen: echtes Backend (statt Simulation)**
  Der "Agent Opportunity Scan" auf der Startseite läuft aktuell als **bewusste
  Client-Simulation**: er liest die URL, "scannt" ~15s und zeigt 3 plausible,
  deterministische Agent-Vorschläge. Das **funktioniert** und ist als Lead-Magnet
  völlig okay — **kein Live-Blocker**.
  Wenn es später echt werden soll: den markierten `// BACKEND HOOK` in
  `js/extras.js` (Funktion `analyzeCompany`) durch einen echten API-Call ersetzen
  (Scraper/Analyse-Endpoint, der `{ score, verdict, ops:[{t,d,fit}] }` liefert).
  Braucht ein Backend (z.B. Supabase Edge Function / kleiner Worker) — GitHub Pages
  allein kann das nicht. → Späteres Projekt.

---

## ✅ Bereits erledigt in dieser Session

- [x] Komplettes Blackwall-Redesign (Design-System, Fonts + GSAP self-hosted)
- [x] DE/EN-Toggle für alle neuen Inhalte (122+ Keys, Parität)
- [x] Alle 32 Blog-Posts restyled (Inhalt + SEO + URLs erhalten)
- [x] Blog-Listen (DE/EN), Legal-Seiten, 404
- [x] Sitemap / llms.txt aktualisiert
- [x] Grid-Landschaft statisch
- [x] Custom Development als "Auf Anfrage" (Scarcity-UX)
- [x] Zwei Kontakt-Wege (Termin buchen vs. E-Mail-Pitch)
- [x] End-CTA mit wAIser-Wortwitz ("Mach deine Agenten wAIser")
- [x] Neues red-umbrella Logo (Nav, Footer, Favicon)
- [x] DE/EN-Button verschönert (segmentierter Pill)

---

## 🚀 Live gehen

Sobald der Calendly-Link drin ist:
1. Branch nach `main` mergen (oder via PR) — **GitHub Pages deployt automatisch von `main`**.
2. Nach dem Deploy einmal `https://waiser.dev/` prüfen (Hard-Reload, Cache).
3. Fertig. 🎉
