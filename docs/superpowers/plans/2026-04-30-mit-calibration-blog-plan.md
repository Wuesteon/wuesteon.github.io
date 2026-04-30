# "MIT löst KI-Halluzinationen?" Blog Post Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a bilingual (DE primary, EN translation) blog post on waiser.dev analyzing the MIT "Beyond Binary Rewards" paper (Damani et al., arXiv:2507.16806v1) under the skeptical headline "MIT löst KI-Halluzinationen?".

**Architecture:** Two static HTML files (DE + EN) following the existing `karpathy-claude-md.html` template pattern, each containing an inline SVG diagram comparing RLVR and RLCR reward landscapes. Two blog index files (`blog/index.html`, `blog/en/index.html`) get a new card prepended to their grids.

**Tech Stack:** Static HTML, Tailwind CDN, custom CSS in `css/styles.css`, no build step. Inline SVG (no D3.js needed).

**Spec:** [docs/superpowers/specs/2026-04-30-mit-calibration-blog-design.md](../specs/2026-04-30-mit-calibration-blog-design.md)

---

## File structure

- Create: `blog/posts/de/mit-ai-halluzinationen.html` — German article (primary)
- Create: `blog/posts/en/mit-ai-hallucinations.html` — English translation
- Modify: `blog/index.html` — add new card at the top of the grid (after line 32 opening `<div class="grid ...">`)
- Modify: `blog/en/index.html` — add new English card at the top of the grid

**Slug rationale:** Localized slugs (`halluzinationen` vs `hallucinations`) match the language of the content and improve SEO per language. The existing `karpathy-claude-md.html` uses identical slugs because the term is already English-only; for this post the German term differs meaningfully.

**Naming sanity check:** All anchor `href` values in DE files point to `posts/de/mit-ai-halluzinationen.html`. All anchor `href` values in EN files point to `../posts/en/mit-ai-hallucinations.html` (the EN index sits one level deeper). Verify path depth matches the existing `karpathy-claude-md.html` references in the same files.

---

## Task 1: Create the German article file

**Files:**
- Create: `blog/posts/de/mit-ai-halluzinationen.html`

- [ ] **Step 1: Create the DE article file**

Create `blog/posts/de/mit-ai-halluzinationen.html` with this exact content:

```html
<!DOCTYPE html>
<html lang="de" id="html-root">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MIT löst KI-Halluzinationen? Was die neue Calibration-Reward-Forschung wirklich zeigt | Nils Weiser</title>
    <meta name="description" content="Eine neue MIT-Studie verspricht weniger KI-Halluzinationen durch kalibrierte Belohnungssignale. Was steckt dahinter – und was bedeutet das für Entwickler heute?">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="../../../css/styles.css">
    <style>
        .reward-diagram {
            background: linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%);
            border: 1px solid rgba(6, 182, 212, 0.2);
            border-radius: 12px;
            padding: 1.5rem;
            margin: 2rem 0;
        }
        .reward-diagram svg {
            width: 100%;
            height: auto;
            max-width: 720px;
            display: block;
            margin: 0 auto;
        }
        .reward-caption {
            font-size: 0.875rem;
            color: #9ca3af;
            text-align: center;
            margin-top: 1rem;
            font-style: italic;
        }
        .stat-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 1rem;
            margin: 2rem 0;
        }
        .stat-card {
            background: rgba(6, 182, 212, 0.05);
            border: 1px solid rgba(6, 182, 212, 0.2);
            border-radius: 8px;
            padding: 1.25rem;
            text-align: center;
        }
        .stat-value {
            font-family: 'JetBrains Mono', monospace;
            font-size: 1.5rem;
            color: #22d3ee;
            font-weight: 600;
            margin-bottom: 0.25rem;
        }
        .stat-label {
            font-size: 0.75rem;
            color: #9ca3af;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .caveat-card {
            background: rgba(236, 72, 153, 0.05);
            border-left: 3px solid #ec4899;
            border-radius: 6px;
            padding: 1rem 1.25rem;
            margin: 1rem 0;
        }
        .caveat-card h4 {
            color: #ec4899;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.875rem;
            margin-bottom: 0.5rem;
        }
        .tool-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.25rem 0.75rem;
            background: rgba(6, 182, 212, 0.1);
            border: 1px solid rgba(6, 182, 212, 0.3);
            border-radius: 9999px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.75rem;
            color: #22d3ee;
            margin: 0.25rem;
        }
        .confidence-output {
            background: rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(6, 182, 212, 0.2);
            border-radius: 8px;
            padding: 1rem;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.8rem;
            color: #d1d5db;
            margin: 1.5rem 0;
            overflow-x: auto;
        }
        .confidence-output .tag { color: #22d3ee; }
        .confidence-output .conf { color: #ec4899; }
    </style>
    <script defer src="https://cloud.umami.is/script.js" data-website-id="d04784b7-9e58-43ad-b71b-73328369d474"></script>
</head>
<body class="bg-gray-950 text-gray-100">

    <div id="header-placeholder"></div>

    <!-- Article Header -->
    <section class="hero-bg pt-32 pb-12">
        <div class="grid-pattern"></div>
        <div class="container mx-auto px-6 relative z-10">
            <div class="max-w-3xl mx-auto">
                <a href="../../" class="inline-flex items-center gap-2 text-cyan-400 font-mono text-sm mb-6 hover:underline" data-i18n="blog.backToList">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                    </svg>
                    Zurück zum Blog
                </a>
                <div class="flex items-center gap-3 mb-4 flex-wrap">
                    <span class="blog-tag">KI-Forschung</span>
                    <span class="blog-tag">Reinforcement Learning</span>
                    <span class="blog-tag">LLM Calibration</span>
                    <span class="blog-date">30. Apr 2026</span>
                </div>
                <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                    MIT löst KI-Halluzinationen?
                </h1>
                <p class="text-xl text-gray-400">
                    Eine neue Studie aus Cambridge verspricht zuverlässigere Modelle durch kalibrierte Belohnungssignale. Was sie wirklich zeigt – und was das für Entwickler heute bedeutet.
                </p>
            </div>
        </div>
    </section>

    <!-- Article Content -->
    <article class="section-dark py-16">
        <div class="container mx-auto px-6">
            <div class="article-content">

                <p>
                    Die Antwort vorweg: Nein. Aber das, was MIT in <a href="https://arxiv.org/abs/2507.16806" target="_blank" rel="noopener noreferrer">Beyond Binary Rewards: Training LMs to Reason about Their Uncertainty</a> tatsächlich gezeigt hat, ist interessanter als die Schlagzeile. Die Autoren – Damani, Puri, Slocum, Shenfeld, Choshen, Kim und Andreas – belegen, dass die Art, wie wir Reasoning-Modelle aktuell trainieren, Halluzinationen nicht nur zulässt, sondern aktiv produziert. Und sie haben einen Fix für eine bestimmte Klasse des Problems.
                </p>

                <h2>Das Muster, das jeder Entwickler kennt</h2>

                <p>
                    Wer mit Claude, GPT oder DeepSeek-R1 produktiv arbeitet, kennt das Bild: Das Modell antwortet mit absoluter Sicherheit – und liegt komplett daneben. Andrej Karpathy hat dieses Verhalten in mehreren Posts beschrieben, und meine letzte <a href="karpathy-claude-md.html">Analyse einer CLAUDE.md mit 25.000 Sternen</a> war im Kern eine Sammlung von Verhaltensregeln gegen genau dieses Muster.
                </p>

                <p>
                    Das MIT-Paper liefert jetzt die Erklärung auf Trainings-Ebene. Die These in einem Satz: <strong>Reinforcement Learning mit binären Korrektheits-Signalen – der heutige Standard für Reasoning-Modelle wie o1, DeepSeek-R1 oder die Qwen-Reasoning-Serie – belohnt Raten genauso wie Wissen.</strong> Wer abstinent bleibt, wird genauso bestraft wie wer falsch liegt. Konsequenz: Modelle lernen, mit Selbstvertrauen zu bluffen.
                </p>

                <p>
                    Die Autoren formulieren das in der Einleitung sehr direkt: Reasoning-Modelle zeigen nach RL-Training "schlechtere Kalibrierung und höhere Halluzinations-Raten verglichen mit dem Basis-Modell". Der Trainingsschritt, der die Modelle besser im Lösen schwerer Aufgaben macht, macht sie gleichzeitig unzuverlässiger im Eingestehen, wenn sie etwas nicht wissen.
                </p>

                <h2>Warum binäre Belohnung Bluffen trainiert</h2>

                <p>
                    Der Kern der Sache lässt sich in einem Diagramm zeigen. Links: das Standard-Setup. Rechts: der Vorschlag der Autoren.
                </p>

                <div class="reward-diagram">
                    <svg viewBox="0 0 720 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Vergleich der Belohnungsfunktionen RLVR und RLCR">
                        <!-- Left panel: RLVR -->
                        <g transform="translate(40, 30)">
                            <text x="140" y="0" text-anchor="middle" fill="#22d3ee" font-family="JetBrains Mono, monospace" font-size="13" font-weight="600">RLVR — Standard</text>
                            <!-- axes -->
                            <line x1="20" y1="200" x2="280" y2="200" stroke="#4b5563" stroke-width="1"/>
                            <line x1="20" y1="40" x2="20" y2="200" stroke="#4b5563" stroke-width="1"/>
                            <!-- y-axis labels -->
                            <text x="14" y="45" text-anchor="end" fill="#9ca3af" font-family="JetBrains Mono, monospace" font-size="10">1.0</text>
                            <text x="14" y="124" text-anchor="end" fill="#9ca3af" font-family="JetBrains Mono, monospace" font-size="10">0.5</text>
                            <text x="14" y="204" text-anchor="end" fill="#9ca3af" font-family="JetBrains Mono, monospace" font-size="10">0.0</text>
                            <text x="-100" y="10" transform="rotate(-90)" text-anchor="middle" fill="#9ca3af" font-family="JetBrains Mono, monospace" font-size="10">Reward</text>
                            <!-- x-axis labels -->
                            <text x="20" y="218" text-anchor="middle" fill="#9ca3af" font-family="JetBrains Mono, monospace" font-size="10">0</text>
                            <text x="280" y="218" text-anchor="middle" fill="#9ca3af" font-family="JetBrains Mono, monospace" font-size="10">1</text>
                            <text x="150" y="240" text-anchor="middle" fill="#9ca3af" font-family="JetBrains Mono, monospace" font-size="10">Verbalisierte Konfidenz q</text>
                            <!-- correct line (solid at y=1.0 -> 40) -->
                            <line x1="20" y1="40" x2="280" y2="40" stroke="#22d3ee" stroke-width="2"/>
                            <text x="288" y="44" fill="#22d3ee" font-family="JetBrains Mono, monospace" font-size="10">korrekt</text>
                            <!-- wrong line (dotted at y=0.0 -> 200) -->
                            <line x1="20" y1="200" x2="280" y2="200" stroke="#22d3ee" stroke-width="2" stroke-dasharray="4,4"/>
                            <text x="288" y="204" fill="#22d3ee" font-family="JetBrains Mono, monospace" font-size="10">falsch</text>
                        </g>
                        <!-- Right panel: RLCR -->
                        <g transform="translate(400, 30)">
                            <text x="140" y="0" text-anchor="middle" fill="#ec4899" font-family="JetBrains Mono, monospace" font-size="13" font-weight="600">RLCR — kalibriert</text>
                            <!-- axes -->
                            <line x1="20" y1="200" x2="280" y2="200" stroke="#4b5563" stroke-width="1"/>
                            <line x1="20" y1="40" x2="20" y2="200" stroke="#4b5563" stroke-width="1"/>
                            <!-- y-axis labels (-1 to 1, midpoint at y=120) -->
                            <text x="14" y="45" text-anchor="end" fill="#9ca3af" font-family="JetBrains Mono, monospace" font-size="10">1.0</text>
                            <text x="14" y="124" text-anchor="end" fill="#9ca3af" font-family="JetBrains Mono, monospace" font-size="10">0.0</text>
                            <text x="14" y="204" text-anchor="end" fill="#9ca3af" font-family="JetBrains Mono, monospace" font-size="10">-1.0</text>
                            <!-- zero baseline -->
                            <line x1="20" y1="120" x2="280" y2="120" stroke="#374151" stroke-width="1" stroke-dasharray="2,2"/>
                            <text x="20" y="218" text-anchor="middle" fill="#9ca3af" font-family="JetBrains Mono, monospace" font-size="10">0</text>
                            <text x="280" y="218" text-anchor="middle" fill="#9ca3af" font-family="JetBrains Mono, monospace" font-size="10">1</text>
                            <text x="150" y="240" text-anchor="middle" fill="#9ca3af" font-family="JetBrains Mono, monospace" font-size="10">Verbalisierte Konfidenz q</text>
                            <!-- correct curve: R = 1 - (q-1)^2, y goes from 120 (q=0, R=0) to 40 (q=1, R=1) -->
                            <path d="M 20 120 Q 150 50 280 40" stroke="#ec4899" stroke-width="2" fill="none"/>
                            <text x="288" y="44" fill="#ec4899" font-family="JetBrains Mono, monospace" font-size="10">korrekt</text>
                            <!-- wrong curve: R = -q^2, y goes from 120 (q=0, R=0) to 200 (q=1, R=-1) -->
                            <path d="M 20 120 Q 150 130 280 200" stroke="#ec4899" stroke-width="2" stroke-dasharray="4,4" fill="none"/>
                            <text x="288" y="204" fill="#ec4899" font-family="JetBrains Mono, monospace" font-size="10">falsch</text>
                        </g>
                    </svg>
                    <p class="reward-caption">
                        Links: Unter der Standard-Belohnung ist die Konfidenz des Modells egal – ein selbstsicher falscher und ein zögernd richtiger Output sind exakt gleich viel wert. Rechts: Die Calibration-Reward bestraft selbstsicher-falsche Antworten und belohnt kalibrierte Konfidenz. Nach <em>Damani et al. 2025, Figure 2</em>.
                    </p>
                </div>

                <p>
                    Im linken Diagramm ist die Belohnung eine Stufenfunktion: 1 wenn die Antwort stimmt, 0 wenn nicht. Die Konfidenz-Variable q kommt im Reward gar nicht vor. Das Modell hat keinen Anreiz, ehrlich über seine Unsicherheit zu sprechen – es kann nur durch Raten gewinnen. Die Autoren formalisieren das als das eigentliche Trainingsziel: maximiere Korrektheit, ignoriere alles andere.
                </p>

                <p>
                    Im rechten Diagramm wird die Belohnung selbst zu einer Funktion der Konfidenz. Eine richtige Antwort mit q=1.0 bekommt vollen Reward. Eine richtige Antwort mit q=0.3 bekommt nur Teil-Reward – das Modell hatte recht, aber wusste es nicht. Eine falsche Antwort mit q=0.9 wird hart bestraft – das Modell hat selbstbewusst gelogen. Eine falsche Antwort mit q=0.1 ("ich rate nur") bekommt nur eine milde Strafe.
                </p>

                <h2>Der Fix: RLCR in einem Absatz</h2>

                <p>
                    Die Autoren nennen ihr Verfahren <strong>RLCR (Reinforcement Learning with Calibration Rewards)</strong>. Die Belohnungsfunktion ist:
                </p>

                <p>
                    <code>R = Korrektheit + (1 − (q − Korrektheit)²)</code>
                </p>

                <p>
                    Der hintere Term ist der <em>Brier-Score</em>, eine seit Jahrzehnten in der Wettervorhersage etablierte Regel zur Bewertung kalibrierter Wahrscheinlichkeiten. Theorem 1 des Papers beweist die zentrale Eigenschaft: diese Reward-Funktion maximiert <em>gleichzeitig</em> Genauigkeit und Kalibrierung – ohne Tradeoff. Das Modell lernt nicht, lieber unsicher als sicher zu sein. Es lernt, eine Konfidenz auszugeben, die der tatsächlichen Erfolgswahrscheinlichkeit entspricht.
                </p>

                <p>
                    In der Praxis sieht der Output dann so aus (vereinfacht aus dem Paper, Figure 1a):
                </p>

                <div class="confidence-output">
<span class="tag">&lt;think&gt;</span> Die Frage zielt auf den Eurovision-Beitrag, mit dem Lulu 1969 das UK vertrat […] <span class="tag">&lt;/think&gt;</span><br>
<span class="tag">&lt;answer&gt;</span> "Boom Bang-a-Bang" <span class="tag">&lt;/answer&gt;</span><br>
<span class="tag">&lt;analysis&gt;</span> Die Unsicherheit ist hoch: Lulu vertrat das UK 1969, der genaue Song ist aber nicht weit verbreitet bekannt […] <span class="tag">&lt;/analysis&gt;</span><br>
<span class="tag">&lt;confidence&gt;</span> <span class="conf">0.3</span> <span class="tag">&lt;/confidence&gt;</span>
                </div>

                <p>
                    Vier strukturierte Felder: Reasoning, Antwort, eine Selbst-Analyse der Unsicherheit, eine numerische Konfidenz. Trainiert wird das Modell darauf, dass diese Konfidenz nicht beliebig ist, sondern statistisch zur Realität passt.
                </p>

                <h2>Die Zahlen, die zählen</h2>

                <div class="stat-grid">
                    <div class="stat-card">
                        <div class="stat-value">0.37 → 0.03</div>
                        <div class="stat-label">ECE HotpotQA</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">0.26 → 0.10</div>
                        <div class="stat-label">ECE Math</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">~63 %</div>
                        <div class="stat-label">Accuracy gehalten</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">12×</div>
                        <div class="stat-label">bessere Kalibrierung</div>
                    </div>
                </div>

                <p>
                    Auf HotpotQA – Mehr-Hop-Fragen über Wikipedia – sinkt der Expected Calibration Error von 0.37 auf 0.03. Anders gelesen: ein RLVR-trainiertes Modell, das mit Konfidenz 0.9 antwortet, liegt im Schnitt zu 53 % richtig. Ein RLCR-Modell mit der gleichen Konfidenz trifft die echte Erfolgsrate fast exakt. Auf der Math-Suite (GSM8K, MATH500, Big-Math) fällt der ECE von 0.26 auf 0.10. Die Genauigkeit bleibt dabei praktisch unverändert.
                </p>

                <p>
                    Das interessanteste Ergebnis steckt in den Out-of-Distribution-Tests. Wenn man die trainierten Modelle auf <em>neuen</em> Datensätzen evaluiert (TriviaQA, SimpleQA, GPQA, CommonsenseQA), passiert etwas Verstörendes: Standard-RL macht die Kalibrierung nicht nur nicht besser, es macht sie <em>schlechter</em> als das untrainierte Basis-Modell. RLCR ist die einzige Methode im Vergleich, die ihre Kalibrierungs-Gewinne auf neue Aufgaben überträgt.
                </p>

                <p>
                    Als Bonus zeigen die Autoren noch, dass die verbalisierte Konfidenz für Test-Time-Scaling nutzbar ist: konfidenz-gewichtete Mehrheitsabstimmung schlägt sowohl Vanilla-Mehrheitsabstimmung als auch reine Max-Konfidenz-Auswahl. Wer ohnehin self-consistency oder Best-of-N verwendet, bekommt aus der gleichen Trainingsmethode automatisch ein besseres Voting-Signal.
                </p>

                <h2>Hat MIT also Halluzinationen gelöst? (Der ehrliche Teil)</h2>

                <p>
                    Drei Dinge sollte man im gleichen Atemzug nennen:
                </p>

                <div class="caveat-card">
                    <h4>Was es löst</h4>
                    <p class="text-gray-300 text-sm">
                        Kalibrierung auf Aufgaben mit verifizierbarer Ground Truth – QA, Mathematik, strukturiertes Reasoning. Modelle, die so trainiert sind, wissen statistisch verlässlich, wann sie raten.
                    </p>
                </div>

                <div class="caveat-card">
                    <h4>Was es nicht löst</h4>
                    <p class="text-gray-300 text-sm">
                        Offene faktische Halluzinationen in Domänen ohne Ground Truth. RL braucht ein Korrektheits-Signal. "Fasse meine Codebase zusammen" oder "schreibe einen Marketing-Text über X" sind keine verifizierbaren Tasks – hier hilft das Verfahren nicht direkt.
                    </p>
                </div>

                <div class="caveat-card">
                    <h4>Skalen-Vorbehalt</h4>
                    <p class="text-gray-300 text-sm">
                        Trainiert wurde auf Qwen2.5-7B. Ob die Effekte bei Frontier-Scale-Modellen genauso stabil sind, ist offen. Die theoretischen Eigenschaften (Theorem 1) gelten unabhängig von der Modellgröße, die empirischen Generalisierungseffekte nicht zwangsläufig.
                    </p>
                </div>

                <p>
                    Der eigentliche Punkt liegt aber tiefer: <strong>Binäre Belohnungssignale sind aktiv schädlich für Kalibrierung.</strong> Das ist eine Erkenntnis, mit der das gesamte Post-Training-Feld sich auseinandersetzen muss – einschließlich der Labs, deren Modelle wir heute in Produktion verwenden. Die Forschung hat damit weniger ein Loch gestopft als einen systematischen Fehler im aktuellen Trainings-Paradigma offengelegt.
                </p>

                <h2>Was Entwickler heute schon tun können</h2>

                <p>
                    Bis RLCR in Frontier-Modellen ankommt – wenn es das tut – vergehen Monate bis Jahre. Aber das Fehlermuster, das die Studie diagnostiziert, lässt sich auf der Anwendungs-Ebene zumindest teilweise abfedern:
                </p>

                <ul>
                    <li><strong>Konfidenz im Prompt verlangen.</strong> Die Modelle sind nicht perfekt kalibriert, aber wer sie zwingt, eine Konfidenz mit auszugeben, bekommt zumindest ein Signal, an dem sich nachgelagerte Logik orientieren kann. Schwellwert setzen, niedrige Konfidenz an Validierung weiterleiten.</li>
                    <li><strong>Niedrig-Konfidenz-Outputs in Agent-Systemen routen.</strong> Bei Multi-Step-Agenten sollten kritische Entscheidungen mit niedriger Selbsteinschätzung an Verifikations-Schritte oder menschliche Reviews weitergegeben werden.</li>
                    <li><strong>Self-Consistency mit Confidence-Weighting.</strong> Wer Best-of-N oder Majority-Vote verwendet, sollte Stimmen mit der vom Modell gemeldeten Konfidenz gewichten. Das ist das gleiche Voting-Schema, das im Paper besser abschneidet als reine Mehrheitsabstimmung.</li>
                    <li><strong>CLAUDE.md-Regeln gegen Bluffen.</strong> Die <a href="karpathy-claude-md.html">"Frag nach, wenn mehrdeutig"-Regel</a>, die Karpathy in seinen Coding-Beobachtungen vorschlägt, ist im Rückblick eine Verhaltens-Korrektur für genau das Trainings-Problem, das dieses Paper auf RL-Ebene diagnostiziert. Beide Ansätze adressieren die gleiche Grundpathologie aus unterschiedlichen Richtungen.</li>
                </ul>

                <h2>Das eigentliche Ergebnis</h2>

                <p>
                    MIT hat KI-Halluzinationen nicht gelöst. Sie haben gezeigt, dass die Art, wie wir Modelle trainieren, sie systematisch produziert – und dass eine kleine Änderung am Reward-Signal mathematisch beweisbar Modelle erzeugt, die sowohl genauer als auch ehrlicher über ihre Grenzen sind.
                </p>

                <p>
                    Das ist größer als die Schlagzeile. Eine Schlagzeile verspricht ein Ende des Problems. Diese Studie liefert eine andere Diagnose: Das Problem ist im Training selbst angelegt. Wer das verstanden hat, weiß auch, woran man ihn als Anwender erkennt – und was man auf der Prompt- und System-Ebene dagegen tun kann, lange bevor das nächste Frontier-Modell den Fix in der Architektur mitbringt.
                </p>

                <hr style="border-color: #374151; margin: 2rem 0;">

                <p><strong>Quellen:</strong></p>
                <div style="margin: 1rem 0;">
                    <a href="https://arxiv.org/abs/2507.16806" target="_blank" rel="noopener noreferrer" class="tool-badge">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                        arXiv 2507.16806
                    </a>
                    <a href="https://news.mit.edu/2026/teaching-ai-models-to-say-im-not-sure-0422" target="_blank" rel="noopener noreferrer" class="tool-badge">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                        MIT News
                    </a>
                </div>

                <p>
                    Bauen Sie an KI-Systemen, in denen Modell-Konfidenz und Halluzinations-Risiko eine Rolle spielen? <a href="../../../index.html#contact">Lassen Sie uns sprechen.</a> Ich helfe beim Design von Agent-Architekturen, die Unsicherheit als Signal behandeln statt sie zu verstecken.
                </p>

            </div>
        </div>
    </article>

    <div id="footer-placeholder"></div>
    <div id="back-to-top-placeholder"></div>

    <script src="../../../js/components.js"></script>
    <script src="../../../js/translations.js"></script>
    <script src="../../../js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify the file renders in a browser**

Run: `python3 -m http.server 8000` from the website root, then open `http://localhost:8000/blog/posts/de/mit-ai-halluzinationen.html` in a browser.

Expected: page loads with header/footer, hero section shows the title "MIT löst KI-Halluzinationen?", the SVG diagram renders with two side-by-side panels (cyan left, pink right), the stat grid shows four cards, the caveat cards have pink left borders, the confidence output block shows colored tags, no console errors, no broken paths.

- [ ] **Step 3: Commit the DE article**

```bash
git add blog/posts/de/mit-ai-halluzinationen.html
git commit -m "$(cat <<'EOF'
✨ feat: add German blog post on MIT calibration-reward research

Skeptical analysis of Damani et al. (MIT, 2025) "Beyond Binary Rewards":
explains why standard RL training degrades calibration, walks through
the RLCR fix, and translates the finding into practical guidance for
builders. Includes inline SVG comparing RLVR and RLCR reward landscapes.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Create the English article file

**Files:**
- Create: `blog/posts/en/mit-ai-hallucinations.html`

- [ ] **Step 1: Create the EN article file**

Create `blog/posts/en/mit-ai-hallucinations.html` with this exact content (mirrors Task 1 with English text and `lang="en"`):

```html
<!DOCTYPE html>
<html lang="en" id="html-root">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Did MIT solve AI hallucinations? What the new calibration-reward research actually shows | Nils Weiser</title>
    <meta name="description" content="A new MIT paper promises fewer AI hallucinations through calibrated reward signals. What it actually shows – and what it means for developers today.">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="../../../css/styles.css">
    <style>
        .reward-diagram {
            background: linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%);
            border: 1px solid rgba(6, 182, 212, 0.2);
            border-radius: 12px;
            padding: 1.5rem;
            margin: 2rem 0;
        }
        .reward-diagram svg {
            width: 100%;
            height: auto;
            max-width: 720px;
            display: block;
            margin: 0 auto;
        }
        .reward-caption {
            font-size: 0.875rem;
            color: #9ca3af;
            text-align: center;
            margin-top: 1rem;
            font-style: italic;
        }
        .stat-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 1rem;
            margin: 2rem 0;
        }
        .stat-card {
            background: rgba(6, 182, 212, 0.05);
            border: 1px solid rgba(6, 182, 212, 0.2);
            border-radius: 8px;
            padding: 1.25rem;
            text-align: center;
        }
        .stat-value {
            font-family: 'JetBrains Mono', monospace;
            font-size: 1.5rem;
            color: #22d3ee;
            font-weight: 600;
            margin-bottom: 0.25rem;
        }
        .stat-label {
            font-size: 0.75rem;
            color: #9ca3af;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .caveat-card {
            background: rgba(236, 72, 153, 0.05);
            border-left: 3px solid #ec4899;
            border-radius: 6px;
            padding: 1rem 1.25rem;
            margin: 1rem 0;
        }
        .caveat-card h4 {
            color: #ec4899;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.875rem;
            margin-bottom: 0.5rem;
        }
        .tool-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.25rem 0.75rem;
            background: rgba(6, 182, 212, 0.1);
            border: 1px solid rgba(6, 182, 212, 0.3);
            border-radius: 9999px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.75rem;
            color: #22d3ee;
            margin: 0.25rem;
        }
        .confidence-output {
            background: rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(6, 182, 212, 0.2);
            border-radius: 8px;
            padding: 1rem;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.8rem;
            color: #d1d5db;
            margin: 1.5rem 0;
            overflow-x: auto;
        }
        .confidence-output .tag { color: #22d3ee; }
        .confidence-output .conf { color: #ec4899; }
    </style>
    <script defer src="https://cloud.umami.is/script.js" data-website-id="d04784b7-9e58-43ad-b71b-73328369d474"></script>
</head>
<body class="bg-gray-950 text-gray-100">

    <div id="header-placeholder"></div>

    <!-- Article Header -->
    <section class="hero-bg pt-32 pb-12">
        <div class="grid-pattern"></div>
        <div class="container mx-auto px-6 relative z-10">
            <div class="max-w-3xl mx-auto">
                <a href="../../" class="inline-flex items-center gap-2 text-cyan-400 font-mono text-sm mb-6 hover:underline" data-i18n="blog.backToList">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                    </svg>
                    Back to Blog
                </a>
                <div class="flex items-center gap-3 mb-4 flex-wrap">
                    <span class="blog-tag">AI Research</span>
                    <span class="blog-tag">Reinforcement Learning</span>
                    <span class="blog-tag">LLM Calibration</span>
                    <span class="blog-date">Apr 30, 2026</span>
                </div>
                <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                    Did MIT solve AI hallucinations?
                </h1>
                <p class="text-xl text-gray-400">
                    A new study from Cambridge promises more reliable models through calibrated reward signals. What it actually shows – and what it means for developers today.
                </p>
            </div>
        </div>
    </section>

    <!-- Article Content -->
    <article class="section-dark py-16">
        <div class="container mx-auto px-6">
            <div class="article-content">

                <p>
                    Short answer first: no. But what MIT actually showed in <a href="https://arxiv.org/abs/2507.16806" target="_blank" rel="noopener noreferrer">Beyond Binary Rewards: Training LMs to Reason about Their Uncertainty</a> is more interesting than the headline. Damani, Puri, Slocum, Shenfeld, Choshen, Kim, and Andreas demonstrate that the way we currently train reasoning models doesn't merely allow hallucinations – it actively produces them. And they have a fix for one specific class of the problem.
                </p>

                <h2>The pattern every developer knows</h2>

                <p>
                    Anyone working seriously with Claude, GPT, or DeepSeek-R1 has seen it: the model answers with absolute confidence – and is completely wrong. Andrej Karpathy has described this behavior across multiple posts, and my recent <a href="karpathy-claude-md.html">analysis of a CLAUDE.md with 25,000 stars</a> was, at its core, a collection of behavioral rules aimed at exactly this pattern.
                </p>

                <p>
                    The MIT paper now provides the explanation at the training level. The thesis in one sentence: <strong>reinforcement learning with binary correctness signals – today's standard for reasoning models like o1, DeepSeek-R1, or the Qwen reasoning series – rewards guessing exactly as much as knowing.</strong> Abstaining is penalized identically to being wrong. The consequence: models learn to bluff with confidence.
                </p>

                <p>
                    The authors put it bluntly in the introduction: post-RL reasoning models exhibit "worsened calibration and increased hallucination rates compared to base models." The training step that makes models better at solving hard problems simultaneously makes them less reliable at admitting when they don't know.
                </p>

                <h2>Why binary rewards train models to guess</h2>

                <p>
                    The crux fits in one diagram. Left: the standard setup. Right: the authors' proposal.
                </p>

                <div class="reward-diagram">
                    <svg viewBox="0 0 720 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Comparison of RLVR and RLCR reward functions">
                        <!-- Left panel: RLVR -->
                        <g transform="translate(40, 30)">
                            <text x="140" y="0" text-anchor="middle" fill="#22d3ee" font-family="JetBrains Mono, monospace" font-size="13" font-weight="600">RLVR — Standard</text>
                            <line x1="20" y1="200" x2="280" y2="200" stroke="#4b5563" stroke-width="1"/>
                            <line x1="20" y1="40" x2="20" y2="200" stroke="#4b5563" stroke-width="1"/>
                            <text x="14" y="45" text-anchor="end" fill="#9ca3af" font-family="JetBrains Mono, monospace" font-size="10">1.0</text>
                            <text x="14" y="124" text-anchor="end" fill="#9ca3af" font-family="JetBrains Mono, monospace" font-size="10">0.5</text>
                            <text x="14" y="204" text-anchor="end" fill="#9ca3af" font-family="JetBrains Mono, monospace" font-size="10">0.0</text>
                            <text x="-100" y="10" transform="rotate(-90)" text-anchor="middle" fill="#9ca3af" font-family="JetBrains Mono, monospace" font-size="10">Reward</text>
                            <text x="20" y="218" text-anchor="middle" fill="#9ca3af" font-family="JetBrains Mono, monospace" font-size="10">0</text>
                            <text x="280" y="218" text-anchor="middle" fill="#9ca3af" font-family="JetBrains Mono, monospace" font-size="10">1</text>
                            <text x="150" y="240" text-anchor="middle" fill="#9ca3af" font-family="JetBrains Mono, monospace" font-size="10">Verbalized confidence q</text>
                            <line x1="20" y1="40" x2="280" y2="40" stroke="#22d3ee" stroke-width="2"/>
                            <text x="288" y="44" fill="#22d3ee" font-family="JetBrains Mono, monospace" font-size="10">correct</text>
                            <line x1="20" y1="200" x2="280" y2="200" stroke="#22d3ee" stroke-width="2" stroke-dasharray="4,4"/>
                            <text x="288" y="204" fill="#22d3ee" font-family="JetBrains Mono, monospace" font-size="10">wrong</text>
                        </g>
                        <!-- Right panel: RLCR -->
                        <g transform="translate(400, 30)">
                            <text x="140" y="0" text-anchor="middle" fill="#ec4899" font-family="JetBrains Mono, monospace" font-size="13" font-weight="600">RLCR — calibrated</text>
                            <line x1="20" y1="200" x2="280" y2="200" stroke="#4b5563" stroke-width="1"/>
                            <line x1="20" y1="40" x2="20" y2="200" stroke="#4b5563" stroke-width="1"/>
                            <text x="14" y="45" text-anchor="end" fill="#9ca3af" font-family="JetBrains Mono, monospace" font-size="10">1.0</text>
                            <text x="14" y="124" text-anchor="end" fill="#9ca3af" font-family="JetBrains Mono, monospace" font-size="10">0.0</text>
                            <text x="14" y="204" text-anchor="end" fill="#9ca3af" font-family="JetBrains Mono, monospace" font-size="10">-1.0</text>
                            <line x1="20" y1="120" x2="280" y2="120" stroke="#374151" stroke-width="1" stroke-dasharray="2,2"/>
                            <text x="20" y="218" text-anchor="middle" fill="#9ca3af" font-family="JetBrains Mono, monospace" font-size="10">0</text>
                            <text x="280" y="218" text-anchor="middle" fill="#9ca3af" font-family="JetBrains Mono, monospace" font-size="10">1</text>
                            <text x="150" y="240" text-anchor="middle" fill="#9ca3af" font-family="JetBrains Mono, monospace" font-size="10">Verbalized confidence q</text>
                            <path d="M 20 120 Q 150 50 280 40" stroke="#ec4899" stroke-width="2" fill="none"/>
                            <text x="288" y="44" fill="#ec4899" font-family="JetBrains Mono, monospace" font-size="10">correct</text>
                            <path d="M 20 120 Q 150 130 280 200" stroke="#ec4899" stroke-width="2" stroke-dasharray="4,4" fill="none"/>
                            <text x="288" y="204" fill="#ec4899" font-family="JetBrains Mono, monospace" font-size="10">wrong</text>
                        </g>
                    </svg>
                    <p class="reward-caption">
                        Left: under the standard reward, the model's confidence is irrelevant – a confidently wrong and a hesitantly correct output are worth exactly the same. Right: the calibration reward punishes confidently-wrong answers and rewards calibrated confidence. After <em>Damani et al. 2025, Figure 2</em>.
                    </p>
                </div>

                <p>
                    On the left, the reward is a step function: 1 if the answer is right, 0 if not. The confidence variable q doesn't appear in the reward at all. The model has no incentive to be honest about uncertainty – it can only win by guessing. The authors formalize this as the actual training objective: maximize correctness, ignore everything else.
                </p>

                <p>
                    On the right, the reward itself becomes a function of confidence. A correct answer at q=1.0 gets full reward. A correct answer at q=0.3 gets only partial reward – the model was right but didn't know it. A wrong answer at q=0.9 is heavily punished – the model lied with confidence. A wrong answer at q=0.1 ("I'm just guessing") gets only a mild penalty.
                </p>

                <h2>The fix: RLCR in one paragraph</h2>

                <p>
                    The authors call their method <strong>RLCR (Reinforcement Learning with Calibration Rewards)</strong>. The reward function:
                </p>

                <p>
                    <code>R = correctness + (1 − (q − correctness)²)</code>
                </p>

                <p>
                    The trailing term is the <em>Brier score</em>, a rule used for decades in weather forecasting to evaluate calibrated probabilities. Theorem 1 of the paper proves the central property: this reward function maximizes accuracy <em>and</em> calibration simultaneously – with no tradeoff. The model doesn't learn to prefer uncertainty over certainty. It learns to output a confidence that matches its true probability of being correct.
                </p>

                <p>
                    In practice the output looks like this (simplified from the paper, Figure 1a):
                </p>

                <div class="confidence-output">
<span class="tag">&lt;think&gt;</span> The question asks for the song with which Lulu represented the UK in 1969 […] <span class="tag">&lt;/think&gt;</span><br>
<span class="tag">&lt;answer&gt;</span> "Boom Bang-a-Bang" <span class="tag">&lt;/answer&gt;</span><br>
<span class="tag">&lt;analysis&gt;</span> Uncertainty is high: Lulu represented the UK in 1969, but the specific song isn't widely known […] <span class="tag">&lt;/analysis&gt;</span><br>
<span class="tag">&lt;confidence&gt;</span> <span class="conf">0.3</span> <span class="tag">&lt;/confidence&gt;</span>
                </div>

                <p>
                    Four structured fields: reasoning, answer, a self-analysis of the uncertainty, a numerical confidence. The model is trained so that this confidence isn't arbitrary but statistically tracks reality.
                </p>

                <h2>The numbers that matter</h2>

                <div class="stat-grid">
                    <div class="stat-card">
                        <div class="stat-value">0.37 → 0.03</div>
                        <div class="stat-label">ECE HotpotQA</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">0.26 → 0.10</div>
                        <div class="stat-label">ECE Math</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">~63%</div>
                        <div class="stat-label">Accuracy held</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">12×</div>
                        <div class="stat-label">better calibration</div>
                    </div>
                </div>

                <p>
                    On HotpotQA – multi-hop questions over Wikipedia – Expected Calibration Error drops from 0.37 to 0.03. Translated: an RLVR-trained model that answers with confidence 0.9 is on average right 53% of the time. An RLCR model at the same confidence almost exactly matches its true success rate. On the math suite (GSM8K, MATH500, Big-Math), ECE falls from 0.26 to 0.10. Accuracy stays essentially unchanged.
                </p>

                <p>
                    The most striking result hides in the out-of-distribution tests. When the trained models are evaluated on <em>new</em> datasets (TriviaQA, SimpleQA, GPQA, CommonsenseQA), something disturbing happens: standard RL doesn't merely fail to improve calibration – it makes it <em>worse</em> than the untrained base model. RLCR is the only method in the comparison that transfers its calibration gains to new tasks.
                </p>

                <p>
                    As a bonus, the authors show verbalized confidence is usable for test-time scaling: confidence-weighted majority vote beats both vanilla majority vote and pure max-confidence selection. If you're already using self-consistency or best-of-N, the same training recipe gives you a better voting signal for free.
                </p>

                <h2>So did MIT solve hallucinations? (The honest part)</h2>

                <p>
                    Three things to say in the same breath:
                </p>

                <div class="caveat-card">
                    <h4>What it solves</h4>
                    <p class="text-gray-300 text-sm">
                        Calibration on tasks with verifiable ground truth – QA, math, structured reasoning. Models trained this way reliably know when they're guessing.
                    </p>
                </div>

                <div class="caveat-card">
                    <h4>What it doesn't solve</h4>
                    <p class="text-gray-300 text-sm">
                        Open-ended factual hallucinations in domains without ground truth. RL needs a correctness signal. "Summarize my codebase" or "write marketing copy about X" aren't verifiable tasks – the method doesn't directly help here.
                    </p>
                </div>

                <div class="caveat-card">
                    <h4>Scale caveat</h4>
                    <p class="text-gray-300 text-sm">
                        Training was on Qwen2.5-7B. Whether the effects hold at frontier scale is genuinely open. The theoretical properties (Theorem 1) hold regardless of model size; the empirical generalization effects don't necessarily.
                    </p>
                </div>

                <p>
                    The deeper point lies underneath: <strong>binary reward signals are actively harmful for calibration.</strong> That's a finding the entire post-training field needs to sit with – including the labs whose models we run in production today. The research has plugged less of a hole than it has surfaced a systematic flaw in the current training paradigm.
                </p>

                <h2>What developers can do today</h2>

                <p>
                    Months to years will pass before RLCR shows up in frontier models – if it ever does. But the failure pattern the study diagnoses is at least partially mitigatable at the application layer:
                </p>

                <ul>
                    <li><strong>Demand confidence in the prompt.</strong> The models aren't perfectly calibrated, but forcing them to emit a confidence value gives downstream logic something to work with. Set a threshold, route low-confidence outputs to validation.</li>
                    <li><strong>Route low-confidence outputs in agent systems.</strong> In multi-step agents, critical decisions with low self-rated confidence should be passed to verification steps or human review.</li>
                    <li><strong>Self-consistency with confidence weighting.</strong> If you use best-of-N or majority vote, weight votes by the model-reported confidence. This is the same voting scheme the paper shows beats plain majority vote.</li>
                    <li><strong>CLAUDE.md rules against bluffing.</strong> The <a href="karpathy-claude-md.html">"ask when ambiguous" rule</a> Karpathy proposes in his coding observations is, in retrospect, a behavioral patch for exactly the training-level problem this paper diagnoses on the RL side. Both approaches address the same underlying pathology from different directions.</li>
                </ul>

                <h2>The actual result</h2>

                <p>
                    MIT didn't solve AI hallucinations. They showed that the way we train models systematically produces them – and that a small change to the reward signal mathematically provably yields models that are simultaneously more accurate and more honest about their limits.
                </p>

                <p>
                    That's bigger than the headline. A headline promises an end to the problem. This study delivers a different diagnosis: the problem is built into the training itself. Once you understand that, you also know how to spot it as a user – and what to do about it at the prompt and system layer, long before the next frontier model ships the fix in its architecture.
                </p>

                <hr style="border-color: #374151; margin: 2rem 0;">

                <p><strong>Sources:</strong></p>
                <div style="margin: 1rem 0;">
                    <a href="https://arxiv.org/abs/2507.16806" target="_blank" rel="noopener noreferrer" class="tool-badge">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                        arXiv 2507.16806
                    </a>
                    <a href="https://news.mit.edu/2026/teaching-ai-models-to-say-im-not-sure-0422" target="_blank" rel="noopener noreferrer" class="tool-badge">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                        MIT News
                    </a>
                </div>

                <p>
                    Building AI systems where model confidence and hallucination risk matter? <a href="../../../index.html#contact">Let's talk.</a> I help design agent architectures that treat uncertainty as signal instead of hiding it.
                </p>

            </div>
        </div>
    </article>

    <div id="footer-placeholder"></div>
    <div id="back-to-top-placeholder"></div>

    <script src="../../../js/components.js"></script>
    <script src="../../../js/translations.js"></script>
    <script src="../../../js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify the EN file renders in a browser**

With the local server still running, open `http://localhost:8000/blog/posts/en/mit-ai-hallucinations.html`.

Expected: same layout as DE version but with English text throughout, hero shows "Did MIT solve AI hallucinations?", SVG renders identically, all paths resolve, no console errors.

- [ ] **Step 3: Commit the EN article**

```bash
git add blog/posts/en/mit-ai-hallucinations.html
git commit -m "$(cat <<'EOF'
🌐 feat: add English translation of MIT calibration-reward post

Mirrors blog/posts/de/mit-ai-halluzinationen.html with English copy and
the same inline SVG diagram comparing RLVR and RLCR reward landscapes.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Add the new card to the German blog index

**Files:**
- Modify: `blog/index.html` (insert new article block after line 32, before the existing Karpathy card on line 34)

- [ ] **Step 1: Insert the new card at the top of the grid**

In `blog/index.html`, find this block:

```html
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

                <!-- Blog Post: Karpathy CLAUDE.md - 14. Apr 2026 -->
```

Replace it with:

```html
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

                <!-- Blog Post: MIT Calibration-Reward - 30. Apr 2026 -->
                <article class="blog-card fade-in-up">
                    <div class="blog-card-image flex items-center justify-center">
                        <svg class="w-16 h-16 text-cyan-400/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                        </svg>
                    </div>
                    <div class="blog-card-content">
                        <div class="flex items-center gap-3 mb-3 flex-wrap">
                            <span class="blog-tag">KI-Forschung</span>
                            <span class="blog-tag">Reinforcement Learning</span>
                            <span class="blog-tag">LLM Calibration</span>
                            <span class="blog-date">30. Apr 2026</span>
                        </div>
                        <h2 class="text-xl font-bold text-white mb-3">
                            <a href="posts/de/mit-ai-halluzinationen.html" class="hover:text-cyan-400 transition-colors">
                                MIT löst KI-Halluzinationen?
                            </a>
                        </h2>
                        <p class="text-gray-400 text-sm mb-4">
                            Eine neue Studie aus Cambridge verspricht zuverlässigere Modelle durch kalibrierte Belohnungssignale. Was sie wirklich zeigt – und was das für Entwickler heute bedeutet.
                        </p>
                        <a href="posts/de/mit-ai-halluzinationen.html" class="text-cyan-400 text-sm font-mono hover:underline" data-i18n="blog.readMore">
                            Weiterlesen →
                        </a>
                    </div>
                </article>

                <!-- Blog Post: Karpathy CLAUDE.md - 14. Apr 2026 -->
```

- [ ] **Step 2: Verify the DE blog index in a browser**

Open `http://localhost:8000/blog/index.html`.

Expected: the new "MIT löst KI-Halluzinationen?" card appears as the first card in the grid, the link clicks through to the article, the SVG icon (clipboard with checkmark) renders, the date "30. Apr 2026" displays.

- [ ] **Step 3: Commit the index update**

```bash
git add blog/index.html
git commit -m "$(cat <<'EOF'
✨ feat: add MIT calibration-reward post to German blog index

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Add the new card to the English blog index

**Files:**
- Modify: `blog/en/index.html` (insert new article block after the grid opens, before the existing Karpathy card)

- [ ] **Step 1: Insert the new card at the top of the EN grid**

In `blog/en/index.html`, find this block:

```html
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

                <!-- Blog Post: Karpathy CLAUDE.md - Apr 14, 2026 -->
```

Replace it with:

```html
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

                <!-- Blog Post: MIT Calibration-Reward - Apr 30, 2026 -->
                <article class="blog-card fade-in-up">
                    <div class="blog-card-image flex items-center justify-center">
                        <svg class="w-16 h-16 text-cyan-400/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                        </svg>
                    </div>
                    <div class="blog-card-content">
                        <div class="flex items-center gap-3 mb-3 flex-wrap">
                            <span class="blog-tag">AI Research</span>
                            <span class="blog-tag">Reinforcement Learning</span>
                            <span class="blog-tag">LLM Calibration</span>
                            <span class="blog-date">Apr 30, 2026</span>
                        </div>
                        <h2 class="text-xl font-bold text-white mb-3">
                            <a href="../posts/en/mit-ai-hallucinations.html" class="hover:text-cyan-400 transition-colors">
                                Did MIT solve AI hallucinations?
                            </a>
                        </h2>
                        <p class="text-gray-400 text-sm mb-4">
                            A new study from Cambridge promises more reliable models through calibrated reward signals. What it actually shows – and what it means for developers today.
                        </p>
                        <a href="../posts/en/mit-ai-hallucinations.html" class="text-cyan-400 text-sm font-mono hover:underline" data-i18n="blog.readMore">
                            Read more
                        </a>
                    </div>
                </article>

                <!-- Blog Post: Karpathy CLAUDE.md - Apr 14, 2026 -->
```

- [ ] **Step 2: Verify the EN blog index in a browser**

Open `http://localhost:8000/blog/en/index.html`.

Expected: the new "Did MIT solve AI hallucinations?" card appears first, the link resolves correctly to `../posts/en/mit-ai-hallucinations.html`, no broken paths, no console errors.

- [ ] **Step 3: Commit the EN index update**

```bash
git add blog/en/index.html
git commit -m "$(cat <<'EOF'
🌐 feat: add MIT calibration-reward post to English blog index

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Final verification

- [ ] **Step 1: Click-through both languages end to end**

With the local server running:
1. `http://localhost:8000/blog/index.html` → click new card → article loads
2. From the article, click "Zurück zum Blog" → returns to DE index
3. `http://localhost:8000/blog/en/index.html` → click new card → EN article loads
4. From the EN article, click "Back to Blog" → returns to EN index
5. From either article, click the Karpathy cross-link → relevant Karpathy article loads

Expected: every link resolves, the SVG diagram renders cleanly on each article page, the page is responsive (resize browser to ~400px width and confirm the SVG scales and the stat grid wraps).

- [ ] **Step 2: Confirm no untracked files remain**

```bash
git status
```

Expected: working tree clean.

- [ ] **Step 3: Push to GitHub Pages**

```bash
git push origin main
```

Expected: push succeeds, GitHub Pages auto-deploys within ~1 minute.

---

## Self-review notes

- **Spec coverage:** All 8 article sections are encoded in Task 1 (DE) and Task 2 (EN). Visual matches spec section 3. Stats match spec section 5. Caveats match spec section 6. Practitioner takeaways match spec section 7. Both index updates match spec file structure.
- **No placeholders:** All HTML content is fully written out in both tasks.
- **Type/path consistency:** DE article paths use `posts/de/mit-ai-halluzinationen.html` consistently in `blog/index.html`. EN article paths use `../posts/en/mit-ai-hallucinations.html` consistently in `blog/en/index.html` (matching the EN index's existing depth pattern, verified against the existing Karpathy card). CSS class names (`reward-diagram`, `stat-card`, `caveat-card`, `confidence-output`) are defined once in each article file's `<style>` block and referenced consistently in the body.
- **Cross-links:** Both articles link internally to `karpathy-claude-md.html` (sibling file in the same `posts/de/` or `posts/en/` directory — same pattern as `claude-code-skills.html` cross-link in the existing Karpathy article).
