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
    },
    zh: {
        'nav.services': '服务',
        'nav.about': '关于',
        'nav.contact': '联系',
        'nav.blog': '博客',
        'hero.status': '可承接新项目',
        'hero.title': 'IT 顾问 & AI 开发者',
        'hero.subtitle': '专注于 AI 智能体与 AI 安全。我把复杂问题转化为优雅、安全的技术方案。快速迭代、现代技术、可衡量的成果。',
        'hero.cta': '启动项目',
        'hero.cta2': '查看服务',
        'hero.techStack': '技术栈',
        'stats.projects': '已完成项目',
        'stats.years': '年经验',
        'stats.satisfaction': '% 满意度',
        'stats.response': '小时响应时间',
        'services.kicker': '我提供什么',
        'services.title': '我的核心能力',
        'services.subtitle': '专注于推动您业务前进的前瞻性技术',
        'services.ai.title': 'AI 智能体',
        'services.ai.description': '从自主智能体到自动化工作流，再到自托管 LLM。定制化 AI 系统，完全掌控数据主权——您的 AI、您的基础设施、您的掌控。',
        'services.security.title': 'AI 安全',
        'services.security.description': '面向 AI 系统与现代 Web 基础设施的安全审计与加固。从提示注入防护到云安全——让您的 AI 方案不致沦为攻击面。（提示注入挑战赛第 2 名。）',
        'services.custom.badge': '✦ 仅限精选项目',
        'services.custom.title': '定制开发',
        'services.custom.description': '全栈 Web 与移动开发我如今只选择性承接——面向格外契合的项目。',
        'about.kicker': '我是谁',
        'about.title': '愿景与驱动力',
        'about.description1': '作为您的 IT 顾问，我的职责不仅是交付技术方案，更是为即将到来的未来铺路。我的工作由一个愿景驱动：通过 AI 与创新应用创造新的可能。',
        'about.description2': '透明、伙伴式协作，以及对品质毫不动摇的追求，是我工作的基石——以共同成就非凡。',
        'about.description3': '在 AI 时代，速度至关重要：快速迭代、快速验证、真实成果。正确运用新技术者，能在数周内完成过去需要数月的事。',
        'about.cta': '一起合作',
        'about.terminal.title': '关于我',
        'about.terminal.p1': '作为 IT 顾问与开发者，我将深厚的技术功底与创造创新方案的愿景结合在一起。',
        'about.terminal.focus': '专注',
        'about.terminal.item1': 'AI 系统与自动化',
        'about.terminal.item2': '应用 AI',
        'about.terminal.item3': 'AI 安全',
        'about.terminal.item4': '云架构',
        'about.terminal.values': '价值观',
        'about.terminal.values.text': '透明 | 品质 | 创新',
        'contact.kicker': '联系',
        'contact.title': '让我们聊聊',
        'contact.description': '准备好讨论您的下一个项目了吗？期待收到您的消息，一起探索创新之路。',
        'contact.location': '瑞士',
        'contact.cta': '发送邮件',
        'footer.rights': '版权所有。',
        'footer.status': '在线',
        'blog.title': '博客',
        'blog.subtitle': '关于 AI、开发与技术的思考与洞见',
        'blog.kicker': '最新文章',
        'blog.readMore': '阅读更多',
        'blog.backToList': '返回博客',
        'blog.publishedOn': '发布于',
        'clients.title': '受行业领先企业信赖',

        /* ===== Blackwall redesign ===== */
        'nav.freeScan': '免费扫描',
        'nav.security': '安全',
        'nav.cta': '扫描我的网站',
        'bw.hero.eyebrow': '让你的智能体',
        'bw.hero.ship': '打造会&nbsp;',
        'bw.hero.kin.acts': '行动的 AI。',
        'bw.hero.kin.defends': '防御的 AI。',
        'bw.hero.kin.scales': '扩展的 AI。',
        'bw.hero.kin.ships': '快速交付的 AI。',
        'bw.hero.sub': '我打造能真正干活的自主 AI 智能体——并在攻击者之前把它们攻破。从想法到上线，只需数周。',
        'bw.hero.cta1': '免费扫描我的网站 ▸',
        'bw.hero.cta2': '预约通话',
        'bw.hero.proof': '受 <b>Coop</b>、<b>Charité BIH</b> 及 10+ 团队信赖 · 提示注入挑战赛 <b>第 2 名</b>',
        'bw.scan.kicker': '// 免费 · 智能体机会扫描',
        'bw.scan.title': '看看我会为<span class="rip">你</span>打造什么——只需 15 秒。',
        'bw.scan.sub': '输入你的公司网址。我的 AI 会读取你的网站，精准定位自主智能体最能为你的团队省时的环节。无需注册。',
        'bw.scan.placeholder': 'your-company.com',
        'bw.scan.run': '开始扫描 ▸',
        'bw.scan.hint': '◆ 仅读取你的公开网站 · 无需注册 · 约需 15 秒',
        'bw.scan.completeLabel': '// 扫描完成 · 目标',
        'bw.scan.fitLabel': '智能体契合度',
        'bw.scan.ctaBtn': '预约通话来打造这些 ▸',
        'bw.svc.kicker': '// 我做什么',
        'bw.svc.title': '我发挥价值的三种方式。',
        'bw.svc.1.title': 'AI <span class="rip">智能体</span>',
        'bw.svc.1.desc': '能真正干活的自主智能体、工作流与自托管 LLM——完全的数据主权。Ollama、CrewAI、LangChain、RAG。',
        'bw.svc.1.cta': '预约通话 ▸',
        'bw.svc.2.title': 'AI <span class="rip">安全</span>',
        'bw.svc.2.desc': '面向 AI 系统的红队与加固——从提示注入防护到云端。提示注入挑战赛第 2 名。',
        'bw.svc.2.cta': '预约通话 ▸',
        'bw.svc.3.title': '定制<span class="rip">开发</span>',
        'bw.svc.3.gate': '受邀制',
        'bw.svc.3.desc': '选择性承接——面向技术上有趣且真正契合的项目。跟我说说，我们再看。React Native、SvelteKit、Supabase、TypeScript。',
        'bw.svc.3.cta': '介绍项目 →',
        'bw.stats.1': '客户合作',
        'bw.stats.2': '提示注入挑战赛',
        'bw.stats.3': '已发布实战笔记',
        'bw.stats.4': '可自托管',
        'bw.clients.label': '为真正在造东西的团队部署',
        'bw.breach.kicker': '// 实战中的 AI 安全',
        'bw.breach.title': '我在攻击者之前攻破智能体。',
        'bw.breach.intro': '一个已加固的智能体，两条消息即被投毒——无需越狱。这正是我猎捕的失效模式。',
        'bw.breach.mockTitle': 'agent-session // 已入侵',
        'bw.breach.m1': '已发送消息',
        'bw.breach.m2': '已绕过防御',
        'bw.breach.m3': '所需 API 调用',
        'bw.breach.m4': '收集器被接受',
        'bw.breach.resultTitle': '两条消息投毒智能体。',
        'bw.breach.resultBody': '每一道防御都被测试并攻破。完整拆解见博客。',
        'bw.feed.kicker': '// 实战笔记',
        'bw.feed.title': '来自博客',
        'bw.feed.all': '全部文章 ▸',
        'bw.contact.kicker': '// 联系',
        'bw.contact.title': '让我们聊聊。',
        'bw.contact.send': '发送邮件 ▸',
        'bw.contact.lead': '两种入口，取决于你的需求。',
        'bw.contact.a.tag': '预约通话',
        'bw.contact.a.title': 'AI 智能体 & AI 安全',
        'bw.contact.a.desc': '要打造智能体还是加固它们？选个时段——我们在通话里理清范围。',
        'bw.contact.a.for': '面向 <b>AI 智能体</b> & <b>AI 安全</b>',
        'bw.contact.a.cta': '预约通话 ▸',
        'bw.contact.b.tag': '受邀制',
        'bw.contact.b.title': '定制开发',
        'bw.contact.b.desc': '选择性承接，所以暂无日历。先把项目邮件给我——是什么、为什么有趣。若契合，我们再谈。',
        'bw.contact.b.for': '仅面向 <b>定制开发</b>',
        'bw.contact.b.cta': '邮件介绍项目 →',
        'bw.cta.title': '让你的<br>智能体更 w<span class="ai rip">AI</span>ser。',
        'bw.cta.sub': '从免费扫描开始，或直接把问题告诉我。我来打造智能体并将其加固。',
        'bw.cta.btn': '免费扫描我的网站 ▸',
        'bw.foot.tagline': 'w<span class="ai">AI</span>ser<span class="tld">.dev</span> · Nils Weiser',
        'bw.blog.kicker': '// 来自另一侧的实战笔记',
        'bw.blog.title': '<span class="rip">博客</span>',
        'bw.blog.sub': '关于 AI 智能体、AI 安全，以及正在学会脱离我们而行动的机器——原始记录，在踪迹消散前发布。',
        'bw.blog.ctaTitle': '有个棘手的<br><span class="rip">AI 难题？</span>',
        'bw.blog.ctaSub': '无论是打造智能体还是攻破它们——只要有趣，我都想听听。',
        'bw.blog.ctaBtn': '启动项目 ▸',
        'bw.404.kicker': '// 信号丢失',
        'bw.404.title': '此页已熄灭。',
        'bw.404.body': '踪迹未能解析——你要找的页面不存在、已移动，或从未在此。让我们回到真实的东西。',
        'bw.404.home': '◄ 返回首页',
        'bw.404.blog': '阅读博客'
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
    return translations[currentLang][key]
        || (translations.en && translations.en[key])
        || key;
}
