// Translations
const translations = {
    de: {
        'nav.services': 'Services',
        'nav.about': 'Über mich',
        'nav.contact': 'Kontakt',
        'nav.blog': 'Blog',
        'hero.status': 'Verfügbar für neue Projekte',
        'hero.title': 'IT Consultant & AI Developer',
        'hero.subtitle': 'Spezialisiert auf AI Agents und AI Security. Ich transformiere komplexe Probleme in elegante, sichere technische Lösungen. Schnelle Iteration, moderne Technologien, messbare Ergebnisse.',
        'hero.cta': 'Projekt starten',
        'hero.cta2': 'Services ansehen',
        'hero.techStack': 'Tech Stack',
        'stats.projects': 'Projekte abgeschlossen',
        'stats.years': 'Jahre Erfahrung',
        'stats.satisfaction': '% Zufriedenheit',
        'stats.response': 'h Antwortzeit',
        'services.kicker': 'Was ich anbiete',
        'services.title': 'Meine Kernkompetenzen',
        'services.subtitle': 'Spezialisiert auf zukunftsweisende Technologien, die Ihr Unternehmen voranbringen',
        'services.ai.title': 'AI Agents',
        'services.ai.description': 'Von autonomen Agenten über automatisierte Workflows bis hin zu selbst gehosteten LLMs. Massgeschneiderte KI-Systeme mit voller Datensouveränität – Ihre KI, Ihre Infrastruktur, Ihre Kontrolle.',
        'services.security.title': 'AI Security',
        'services.security.description': 'Security Audits und Hardening für KI-Systeme und moderne Web-Infrastruktur. Von Prompt-Injection-Schutz bis Cloud-Security – damit Ihre KI-Lösung nicht zur Angriffsfläche wird. (2. Platz bei einer Prompt-Injection-Challenge.)',
        'services.custom.badge': '✦ Nur ausgewählte Projekte',
        'services.custom.title': 'Custom Development',
        'services.custom.description': 'Full-Stack Web- und Mobile-Entwicklung übernehme ich nur noch punktuell – für Projekte, die besonders gut passen.',
        'about.kicker': 'Wer ich bin',
        'about.title': 'Vision & Antrieb',
        'about.description1': 'Als Ihr IT-Consultant sehe ich meine Aufgabe darin, nicht nur technologische Lösungen zu liefern, sondern den Weg für das Kommende zu bereiten. Meine Arbeit ist getrieben von der Vision, durch KI und innovative Applikationen neue Möglichkeiten zu schaffen.',
        'about.description2': 'Transparenz, partnerschaftliche Zusammenarbeit und ein unerschütterlicher Qualitätsanspruch sind die Grundpfeiler meiner Arbeit, um gemeinsam Grosses zu erreichen.',
        'about.description3': 'Im Zeitalter der KI zählt Geschwindigkeit: Schnell iterieren, Ideen validieren und Ergebnisse liefern. Wer die neuen Technologien richtig einsetzt, erreicht in Wochen, was früher Monate dauerte.',
        'about.cta': 'Zusammenarbeiten',
        'about.terminal.title': 'Über Mich',
        'about.terminal.p1': 'Als IT-Consultant und Entwickler verbinde ich tiefgreifendes technisches Know-how mit der Vision, innovative Lösungen zu schaffen.',
        'about.terminal.focus': 'Fokus',
        'about.terminal.item1': 'KI-Systeme & Automation',
        'about.terminal.item2': 'Applied AI',
        'about.terminal.item3': 'AI Security',
        'about.terminal.item4': 'Cloud Architecture',
        'about.terminal.values': 'Werte',
        'about.terminal.values.text': 'Transparenz | Qualität | Innovation',
        'contact.kicker': 'Kontakt',
        'contact.title': 'Lassen Sie uns sprechen',
        'contact.description': 'Bereit, Ihr nächstes Projekt zu diskutieren? Ich freue mich darauf, von Ihnen zu hören und gemeinsam innovative Wege zu gehen.',
        'contact.location': 'Schweiz',
        'contact.cta': 'E-Mail senden',
        'footer.rights': 'Alle Rechte vorbehalten.',
        'footer.status': 'Online',
        'blog.title': 'Blog',
        'blog.subtitle': 'Gedanken und Erkenntnisse zu KI, Entwicklung und Technologie',
        'blog.kicker': 'Neueste Artikel',
        'blog.readMore': 'Weiterlesen',
        'blog.backToList': 'Zurück zum Blog',
        'blog.publishedOn': 'Veröffentlicht am',
        'clients.title': 'Vertrauen von führenden Unternehmen',

        /* ===== Blackwall redesign ===== */
        'nav.freeScan': 'Gratis-Scan',
        'nav.security': 'Security',
        'nav.cta': 'Website scannen',
        'bw.hero.eyebrow': 'Mach deine Agenten',
        'bw.hero.ship': 'Bau KI, die&nbsp;',
        'bw.hero.kin.acts': 'handelt.',
        'bw.hero.kin.defends': 'verteidigt.',
        'bw.hero.kin.scales': 'skaliert.',
        'bw.hero.kin.ships': 'schnell liefert.',
        'bw.hero.sub': 'Ich baue autonome KI-Agenten, die echte Arbeit erledigen – und breche sie, bevor Angreifer es tun. Von der Idee zur Produktion in Wochen.',
        'bw.hero.cta1': 'WEBSITE GRATIS SCANNEN ▸',
        'bw.hero.cta2': 'GESPRÄCH BUCHEN',
        'bw.hero.proof': 'Vertraut von <b>Coop</b>, <b>Charité BIH</b> &amp; 10+ Teams · <b>2. Platz</b> Prompt-Injection-Challenge',
        'bw.scan.kicker': '// GRATIS · AGENT-POTENZIAL-SCAN',
        'bw.scan.title': 'Sieh, was ich für <span class="rip">dich</span> bauen würde — in 15 Sekunden.',
        'bw.scan.sub': 'Gib deine Firmen-URL ein. Meine KI liest deine Website und zeigt dir genau, wo autonome Agenten deinem Team am meisten Zeit sparen. Keine Anmeldung.',
        'bw.scan.placeholder': 'deine-firma.de',
        'bw.scan.run': 'SCAN STARTEN ▸',
        'bw.scan.hint': '◆ Liest nur deine öffentliche Website · keine Anmeldung · dauert ~15s',
        'bw.scan.completeLabel': '// SCAN ABGESCHLOSSEN · ZIEL',
        'bw.scan.fitLabel': 'AGENT-FIT',
        'bw.scan.ctaBtn': 'GESPRÄCH BUCHEN, UM DIESE ZU BAUEN ▸',
        'bw.svc.kicker': '// WAS ICH MACHE',
        'bw.svc.title': 'Drei Wege, wie ich etwas bewege.',
        'bw.svc.1.title': 'AI <span class="rip">Agents</span>',
        'bw.svc.1.desc': 'Autonome Agenten, Workflows und selbst gehostete LLMs, die echte Arbeit erledigen — volle Datensouveränität. Ollama, CrewAI, LangChain, RAG.',
        'bw.svc.1.cta': 'TERMIN BUCHEN ▸',
        'bw.svc.2.title': 'AI <span class="rip">Security</span>',
        'bw.svc.2.desc': 'Red-Teaming und Hardening für KI-Systeme — von Prompt-Injection-Abwehr bis Cloud. 2. Platz bei einer Prompt-Injection-Challenge.',
        'bw.svc.2.cta': 'TERMIN BUCHEN ▸',
        'bw.svc.3.title': 'Custom <span class="rip">Development</span>',
        'bw.svc.3.gate': 'Auf Anfrage',
        'bw.svc.3.desc': 'Selektiv — für Projekte, die technisch reizvoll sind und wirklich passen. Erzähl mir davon, dann sehen wir weiter. React Native, SvelteKit, Supabase, TypeScript.',
        'bw.svc.3.cta': 'PROJEKT PITCHEN →',
        'bw.stats.1': 'Kundenprojekte',
        'bw.stats.2': 'Prompt-Injection-Challenge',
        'bw.stats.3': 'Field Notes veröffentlicht',
        'bw.stats.4': 'Self-Hosted möglich',
        'bw.clients.label': 'Im Einsatz für Teams, die das Echte bauen',
        'bw.breach.kicker': '// AI SECURITY IN DER PRAXIS',
        'bw.breach.title': 'Ich breche Agenten, bevor Angreifer es tun.',
        'bw.breach.intro': 'Ein gehärteter Agent, vergiftet in zwei Nachrichten — kein Jailbreak nötig. Das ist die Schwachstelle, die ich jage.',
        'bw.breach.mockTitle': 'agent-session // kompromittiert',
        'bw.breach.m1': 'NACHRICHTEN GESENDET',
        'bw.breach.m2': 'ABWEHR UMGANGEN',
        'bw.breach.m3': 'API-CALLS NÖTIG',
        'bw.breach.m4': 'HARVESTER AKZEPTIERT',
        'bw.breach.resultTitle': 'Agent in zwei Nachrichten vergiftet.',
        'bw.breach.resultBody': 'Jede Abwehr getestet und gebrochen. Die komplette Analyse gibt es im Blog.',
        'bw.feed.kicker': '// FIELD NOTES',
        'bw.feed.title': 'Aus dem Blog',
        'bw.feed.all': 'ALLE BEITRÄGE ▸',
        'bw.contact.kicker': '// KONTAKT',
        'bw.contact.title': 'Lass uns sprechen.',
        'bw.contact.send': 'E-MAIL SENDEN ▸',
        'bw.contact.lead': 'Zwei Wege rein — je nachdem, was du brauchst.',
        'bw.contact.a.tag': 'Termin buchen',
        'bw.contact.a.title': 'AI Agents & AI Security',
        'bw.contact.a.desc': 'Agenten bauen oder härten? Schnapp dir einen Slot — wir klären es im Call.',
        'bw.contact.a.for': 'Für <b>AI Agents</b> & <b>AI Security</b>',
        'bw.contact.a.cta': 'TERMIN BUCHEN ▸',
        'bw.contact.b.tag': 'Auf Anfrage',
        'bw.contact.b.title': 'Custom Development',
        'bw.contact.b.desc': 'Selektiv, deshalb noch kein Kalender. Schreib mir zuerst kurz zum Projekt — worum es geht, warum es spannend ist. Wenn es passt, sprechen wir.',
        'bw.contact.b.for': 'Nur für <b>Custom Development</b>',
        'bw.contact.b.cta': 'PER E-MAIL PITCHEN →',
        'bw.cta.title': 'Mach deine<br>Agenten w<span class="ai rip">AI</span>ser.',
        'bw.cta.sub': 'Starte mit einem Gratis-Scan oder schildere mir einfach das Problem. Ich baue den Agenten und härte ihn.',
        'bw.cta.btn': 'WEBSITE GRATIS SCANNEN ▸',
        'bw.foot.tagline': 'w<span class="ai">AI</span>ser<span class="tld">.dev</span> · Nils Weiser',
        'bw.blog.kicker': '// FIELD NOTES VON DER ANDEREN SEITE',
        'bw.blog.title': 'Der <span class="rip">Blog</span>',
        'bw.blog.sub': 'Notizen zu KI-Agenten, AI Security und den Maschinen, die lernen, sich ohne uns zu bewegen — roh aufgezeichnet, veröffentlicht, bevor die Spur verblasst.',
        'bw.blog.ctaTitle': 'Ein hartes<br><span class="rip">KI-Problem?</span>',
        'bw.blog.ctaSub': 'Ob Agenten bauen oder brechen — wenn es interessant ist, will ich davon hören.',
        'bw.blog.ctaBtn': 'PROJEKT STARTEN ▸',
        'bw.404.kicker': '// SIGNAL VERLOREN',
        'bw.404.title': 'Diese Seite ging aus.',
        'bw.404.body': 'Die Spur löste sich nicht auf — die gesuchte Seite existiert nicht, wurde verschoben oder war nie hier. Zurück zu etwas Echtem.',
        'bw.404.home': '◄ ZURÜCK ZUR STARTSEITE',
        'bw.404.blog': 'ZUM BLOG'
    },
    en: {
        'nav.services': 'Services',
        'nav.about': 'About',
        'nav.contact': 'Contact',
        'nav.blog': 'Blog',
        'hero.status': 'Available for new projects',
        'hero.title': 'IT Consultant & AI Developer',
        'hero.subtitle': 'Specialized in AI agents and AI security. I transform complex problems into elegant, secure technical solutions. Rapid iteration, modern technologies, measurable results.',
        'hero.cta': 'Start project',
        'hero.cta2': 'View services',
        'hero.techStack': 'Tech Stack',
        'stats.projects': 'Projects completed',
        'stats.years': 'Years experience',
        'stats.satisfaction': '% Satisfaction',
        'stats.response': 'h Response time',
        'services.kicker': 'What I offer',
        'services.title': 'My Core Competencies',
        'services.subtitle': 'Specialized in forward-thinking technologies that drive your business forward',
        'services.ai.title': 'AI Agents',
        'services.ai.description': 'From autonomous agents to automated workflows and self-hosted LLMs. Custom AI systems with full data sovereignty – your AI, your infrastructure, your control.',
        'services.security.title': 'AI Security',
        'services.security.description': 'Security audits and hardening for AI systems and modern web infrastructure. From prompt injection defense to cloud security – so your AI solution doesn\'t become an attack surface. (2nd place in a prompt injection challenge.)',
        'services.custom.badge': '✦ Selected projects only',
        'services.custom.title': 'Custom Development',
        'services.custom.description': 'I now take on full-stack web and mobile development only selectively – for projects that are an especially strong fit.',
        'about.kicker': 'Who I am',
        'about.title': 'Vision & Drive',
        'about.description1': 'As your IT consultant, I see my role not just in delivering technological solutions, but in paving the way for what\'s to come. My work is driven by the vision of creating new possibilities through AI and innovative applications.',
        'about.description2': 'Transparency, collaborative partnership, and an unwavering commitment to quality are the cornerstones of my work, to achieve great things together.',
        'about.description3': 'In the age of AI, speed matters: rapid iteration, fast validation, real results. Those who leverage new technologies correctly achieve in weeks what used to take months.',
        'about.cta': 'Work together',
        'about.terminal.title': 'About Me',
        'about.terminal.p1': 'As an IT consultant and developer, I combine deep technical expertise with the vision to create innovative solutions.',
        'about.terminal.focus': 'Focus',
        'about.terminal.item1': 'AI Systems & Automation',
        'about.terminal.item2': 'Applied AI',
        'about.terminal.item3': 'AI Security',
        'about.terminal.item4': 'Cloud Architecture',
        'about.terminal.values': 'Values',
        'about.terminal.values.text': 'Transparency | Quality | Innovation',
        'contact.kicker': 'Contact',
        'contact.title': 'Let\'s Talk',
        'contact.description': 'Ready to discuss your next project? I look forward to hearing from you and exploring innovative paths together.',
        'contact.location': 'Switzerland',
        'contact.cta': 'Send email',
        'footer.rights': 'All rights reserved.',
        'footer.status': 'Online',
        'blog.title': 'Blog',
        'blog.subtitle': 'Thoughts and insights on AI, development, and technology',
        'blog.kicker': 'Latest Articles',
        'blog.readMore': 'Read more',
        'blog.backToList': 'Back to Blog',
        'blog.publishedOn': 'Published on',
        'clients.title': 'Trusted by leading companies',

        /* ===== Blackwall redesign ===== */
        'nav.freeScan': 'Free scan',
        'nav.security': 'Security',
        'nav.cta': 'Scan my site',
        'bw.hero.eyebrow': 'Make your agents',
        'bw.hero.ship': 'Ship AI that&nbsp;',
        'bw.hero.kin.acts': 'acts.',
        'bw.hero.kin.defends': 'defends.',
        'bw.hero.kin.scales': 'scales.',
        'bw.hero.kin.ships': 'ships.',
        'bw.hero.sub': 'I build autonomous AI agents that do real work — and break them before attackers can. From idea to production in weeks.',
        'bw.hero.cta1': 'SCAN MY SITE FREE ▸',
        'bw.hero.cta2': 'BOOK A CALL',
        'bw.hero.proof': 'Trusted by <b>Coop</b>, <b>Charité BIH</b> &amp; 10+ teams · <b>2nd place</b> prompt-injection challenge',
        'bw.scan.kicker': '// FREE · AGENT OPPORTUNITY SCAN',
        'bw.scan.title': 'See what I\'d build for <span class="rip">you</span> — in 15 seconds.',
        'bw.scan.sub': 'Drop your company URL. My AI reads your site and maps exactly where autonomous agents would save your team the most time. No signup.',
        'bw.scan.placeholder': 'your-company.com',
        'bw.scan.run': 'RUN SCAN ▸',
        'bw.scan.hint': '◆ Reads your public site only · no signup · takes ~15s',
        'bw.scan.completeLabel': '// SCAN COMPLETE · TARGET',
        'bw.scan.fitLabel': 'AGENT FIT',
        'bw.scan.ctaBtn': 'BOOK A CALL TO BUILD THESE ▸',
        'bw.svc.kicker': '// WHAT I DO',
        'bw.svc.title': 'Three ways I move the needle.',
        'bw.svc.1.title': 'AI <span class="rip">Agents</span>',
        'bw.svc.1.desc': 'Autonomous agents, workflows and self-hosted LLMs that do real work — full data sovereignty. Ollama, CrewAI, LangChain, RAG.',
        'bw.svc.1.cta': 'BOOK A CALL ▸',
        'bw.svc.2.title': 'AI <span class="rip">Security</span>',
        'bw.svc.2.desc': 'Red-teaming and hardening for AI systems — prompt-injection defense to cloud. 2nd place in a prompt-injection challenge.',
        'bw.svc.2.cta': 'BOOK A CALL ▸',
        'bw.svc.3.title': 'Custom <span class="rip">Development</span>',
        'bw.svc.3.gate': 'By invitation',
        'bw.svc.3.desc': 'Selective — for projects that are technically interesting and a genuine fit. Tell me about it and we\'ll see. React Native, SvelteKit, Supabase, TypeScript.',
        'bw.svc.3.cta': 'PITCH A PROJECT →',
        'bw.stats.1': 'Client engagements',
        'bw.stats.2': 'Prompt-injection challenge',
        'bw.stats.3': 'Field notes published',
        'bw.stats.4': 'Self-hosted option',
        'bw.clients.label': 'Deployed for teams building the real thing',
        'bw.breach.kicker': '// AI SECURITY IN PRACTICE',
        'bw.breach.title': 'I break agents before attackers do.',
        'bw.breach.intro': 'A hardened agent, poisoned in two messages — no jailbreak required. This is the failure mode I hunt.',
        'bw.breach.mockTitle': 'agent-session // compromised',
        'bw.breach.m1': 'MESSAGES SENT',
        'bw.breach.m2': 'DEFENSES BYPASSED',
        'bw.breach.m3': 'API CALLS NEEDED',
        'bw.breach.m4': 'HARVESTER ACCEPTED',
        'bw.breach.resultTitle': 'Agent poisoned in two messages.',
        'bw.breach.resultBody': 'Every defense tested and broken. The full teardown lives on the blog.',
        'bw.feed.kicker': '// FIELD NOTES',
        'bw.feed.title': 'From the blog',
        'bw.feed.all': 'ALL POSTS ▸',
        'bw.contact.kicker': '// CONTACT',
        'bw.contact.title': 'Let\'s talk.',
        'bw.contact.send': 'SEND EMAIL ▸',
        'bw.contact.lead': 'Two ways in, depending on what you need.',
        'bw.contact.a.tag': 'Book a call',
        'bw.contact.a.title': 'AI Agents & AI Security',
        'bw.contact.a.desc': 'Building agents or hardening them? Grab a slot — we\'ll scope it on a call.',
        'bw.contact.a.for': 'For <b>AI Agents</b> & <b>AI Security</b>',
        'bw.contact.a.cta': 'BOOK A CALL ▸',
        'bw.contact.b.tag': 'By invitation',
        'bw.contact.b.title': 'Custom Development',
        'bw.contact.b.desc': 'Selective, so no calendar yet. Email me the project first — what it is, why it\'s interesting. If it fits, we\'ll talk.',
        'bw.contact.b.for': 'For <b>Custom Development</b> only',
        'bw.contact.b.cta': 'PITCH BY EMAIL →',
        'bw.cta.title': 'Make your<br>agents w<span class="ai rip">AI</span>ser.',
        'bw.cta.sub': 'Start with a free scan, or just tell me the problem. I\'ll ship the agent and harden it.',
        'bw.cta.btn': 'SCAN MY SITE FREE ▸',
        'bw.foot.tagline': 'w<span class="ai">AI</span>ser<span class="tld">.dev</span> · Nils Weiser',
        'bw.blog.kicker': '// FIELD NOTES FROM THE FAR SIDE',
        'bw.blog.title': 'The <span class="rip">Blog</span>',
        'bw.blog.sub': 'Notes on AI agents, AI security and the machines learning to move without us — recorded raw, published before the trace resolves.',
        'bw.blog.ctaTitle': 'Got a hard<br><span class="rip">AI problem?</span>',
        'bw.blog.ctaSub': 'Whether it\'s building agents or breaking them — if it\'s interesting, I want to hear about it.',
        'bw.blog.ctaBtn': 'START A PROJECT ▸',
        'bw.404.kicker': '// SIGNAL LOST',
        'bw.404.title': 'This page went dark.',
        'bw.404.body': 'The trace didn\'t resolve — the page you\'re after doesn\'t exist, moved, or was never here. Let\'s get you back to something real.',
        'bw.404.home': '◄ BACK TO HOME',
        'bw.404.blog': 'READ THE BLOG'
    }
};

// Language switching - detect from URL for blog pages, otherwise from localStorage
let currentLang = (function() {
    const path = window.location.pathname;
    if (path.includes('/blog/en/') || path.includes('/posts/en/')) return 'en';
    return localStorage.getItem('lang') || 'de';
})();

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    (document.getElementById('html-root') || document.documentElement).setAttribute('lang', lang);

    // Redirect between DE/EN blog pages
    const path = window.location.pathname;
    const slugMap = {
        deToEn: {
            'mit-ai-halluzinationen.html': 'mit-ai-hallucinations.html',
            'ambient-ai-die-naechste-ki-generation.html': 'ambient-ai-the-next-ai-generation.html',
            'loops-statt-prompts-cherny.html': 'loops-not-prompts-cherny.html',
            'opus-4-8-dynamische-workflows-erst-recht-audit.html': 'opus-4-8-dynamic-workflows-erst-recht-audit.html'
        },
        enToDe: {
            'mit-ai-hallucinations.html': 'mit-ai-halluzinationen.html',
            'ambient-ai-the-next-ai-generation.html': 'ambient-ai-die-naechste-ki-generation.html',
            'loops-not-prompts-cherny.html': 'loops-statt-prompts-cherny.html',
            'opus-4-8-dynamic-workflows-erst-recht-audit.html': 'opus-4-8-dynamische-workflows-erst-recht-audit.html'
        }
    };
    if (path.includes('/blog/')) {
        // Blog post pages: /blog/posts/de/ <-> /blog/posts/en/
        if (path.includes('/posts/de/') && lang === 'en') {
            const file = path.split('/').pop();
            const mapped = slugMap.deToEn[file] || file;
            window.location.href = path.replace('/posts/de/', '/posts/en/').replace(/[^/]+$/, mapped);
            return;
        } else if (path.includes('/posts/en/') && lang === 'de') {
            const file = path.split('/').pop();
            const mapped = slugMap.enToDe[file] || file;
            window.location.href = path.replace('/posts/en/', '/posts/de/').replace(/[^/]+$/, mapped);
            return;
        }
        // Blog index: /blog/ <-> /blog/en/
        const isEnglishIndex = path.includes('/blog/en/');
        if (lang === 'en' && !isEnglishIndex && !path.includes('/posts/')) {
            window.location.href = path.replace('/blog/', '/blog/en/');
            return;
        } else if (lang === 'de' && isEnglishIndex) {
            window.location.href = path.replace('/blog/en/', '/blog/');
            return;
        }
    }

    // Update page title based on current page
    const currentPath = window.location.pathname;
    const isHomePage = (currentPath === '/' || currentPath === '' || currentPath === '/index.html');
    const isBlogPage = currentPath.includes('/blog/');

    if (isHomePage) {
        document.title = lang === 'de'
            ? 'Nils Weiser - AI Agent Specialist & AI Security'
            : 'Nils Weiser - AI Agent Specialist & AI Security';
    } else if (isBlogPage) {
        // Only overwrite the title if the page explicitly opts in via [data-page-title].
        // Blog posts already render a localized <title> per file, so leaving it untouched
        // preserves the correct DE/EN title set by the HTML.
        const titleEl = document.querySelector('[data-page-title]');
        if (titleEl) {
            document.title = `${titleEl.dataset.pageTitle} | Nils Weiser`;
        }
    }

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key] !== undefined) {
            const attr = element.getAttribute('data-i18n-attr');
            if (attr) {
                element.setAttribute(attr, translations[lang][key]);
            } else if (element.hasAttribute('data-i18n-html')) {
                element.innerHTML = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });

    document.querySelectorAll('#lang-de, .lang-de-indicator').forEach(el => {
        el.classList.toggle('active', lang === 'de');
    });
    document.querySelectorAll('#lang-en, .lang-en-indicator').forEach(el => {
        el.classList.toggle('active', lang === 'en');
    });

    // Let JS-rendered content (blog feed, scan tool) re-render in the new language.
    // Scripts register a callback via window.onLanguageChange.
    if (typeof window.onLanguageChange === 'function') {
        try { window.onLanguageChange(lang); } catch (e) { /* no-op */ }
    }
}

function getCurrentLang() {
    return currentLang;
}

function getTranslation(key) {
    return translations[currentLang][key] || key;
}
