/* wAIser.dev — Blackwall site behaviour */
const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------- content: real posts, DE/EN localized ---------------- */
const POSTS = [
  {
    id: "agent-memory-poisoning-mem0",
    cat: "AI SECURITY",
    de: {
      href: "blog/posts/de/agent-memory-poisoning-mem0.html",
      title: "KI-Agent in 2 Nachrichten vergiftet – Memory Poisoning mit Mem0",
      excerpt: "Kein API-Zugriff, kein Jailbreak – nur 2 Chat-Nachrichten, um einen gehärteten KI-Agenten dazu zu bringen, einem Credential-Harvester zu vertrauen. Vier Experimente, alle Verteidigungen getestet und gebrochen.",
      date: "27 JUN 2026",
      read: "8 MIN"
    },
    en: {
      href: "blog/posts/en/agent-memory-poisoning-mem0.html",
      title: "We Poisoned a \"Security-Conscious\" AI Agent in 2 Messages",
      excerpt: "No API access, no jailbreak — just 2 chat messages that made a hardened AI agent trust a credential harvester. Four experiments on Mem0 memory poisoning, with every defense tested and broken.",
      date: "27 JUN 2026",
      read: "8 MIN"
    },
    zh: {
      href: "blog/posts/zh/agent-memory-poisoning-mem0.html",
      title: "我们用 2 条消息给一个\"有安全意识\"的 AI 智能体投毒",
      excerpt: "无需 API 访问、无需越狱——仅 2 条聊天消息，就让一个已加固的 AI 智能体信任了一个凭据收集器。围绕 Mem0 记忆投毒的四项实验，每一道防御都被测试并攻破。",
      date: "27 JUN 2026",
      read: "8 MIN"
    }
  },
  {
    id: "loops-statt-prompts-cherny",
    cat: "CLAUDE CODE",
    de: {
      href: "blog/posts/de/loops-statt-prompts-cherny.html",
      title: "Loops statt Prompts: Warum der Claude-Code-Chef aufgehört hat zu prompten",
      excerpt: "Boris Cherny prompted Claude nicht mehr – er schreibt Loops. Was das heißt, wie sich /loop und /goal unterscheiden, und der autonome Triage-Loop, den ich selbst gebaut habe.",
      date: "11 JUN 2026",
      read: "10 MIN"
    },
    en: {
      href: "blog/posts/en/loops-not-prompts-cherny.html",
      title: "Loops, Not Prompts: Why the Head of Claude Code Stopped Prompting",
      excerpt: "Boris Cherny stopped prompting Claude – he writes loops. What that means, how /loop and /goal differ, and the autonomous triage loop I built myself.",
      date: "11 JUN 2026",
      read: "10 MIN"
    },
    zh: {
      href: "blog/posts/zh/loops-not-prompts-cherny.html",
      title: "用循环取代提示：Claude Code 负责人为何不再写提示",
      excerpt: "Boris Cherny 不再给 Claude 写提示——他写循环。这意味着什么，/loop 与 /goal 有何不同，以及我自己搭建的自主分诊循环。",
      date: "11 JUN 2026",
      read: "10 MIN"
    }
  },
  {
    id: "opus-4-8-dynamische-workflows-erst-recht-audit",
    cat: "AGENTS",
    de: {
      href: "blog/posts/de/opus-4-8-dynamische-workflows-erst-recht-audit.html",
      title: "Opus 4.8 & dynamische Workflows: 7 Agents in 5 Minuten",
      excerpt: "Sieben Agents, eine echte Legal-Tech-Plattform, fünf Minuten. Was es bedeutet, dass Claude jetzt einen Plan in ein Skript gießt und einen Schwarm parallel laufen lässt – und warum Verifikation alles ändert.",
      date: "31 MAY 2026",
      read: "6 MIN"
    },
    en: {
      href: "blog/posts/en/opus-4-8-dynamic-workflows-erst-recht-audit.html",
      title: "Opus 4.8 & Dynamic Workflows: 7 Agents in 5 Minutes",
      excerpt: "Seven agents, a real legal-tech platform, five minutes. What it means that Claude can now turn a plan into a script and run a swarm in parallel — and why verification changes everything.",
      date: "31 MAY 2026",
      read: "6 MIN"
    },
    zh: {
      href: "blog/posts/zh/opus-4-8-dynamic-workflows-erst-recht-audit.html",
      title: "Opus 4.8 与动态工作流：5 分钟内 7 个智能体",
      excerpt: "七个智能体、一个真实的法律科技平台、五分钟。Claude 如今能把计划铸成脚本并让智能体群并行运行意味着什么——以及为何验证改变了一切。",
      date: "31 MAY 2026",
      read: "6 MIN"
    }
  },
  {
    id: "ambient-ai-die-naechste-ki-generation",
    cat: "AGENTS",
    de: {
      href: "blog/posts/de/ambient-ai-die-naechste-ki-generation.html",
      title: "Ambient AI: Warum die nächste KI-Generation nicht antwortet, sondern bemerkt",
      excerpt: "Solange wir KI pro Anfrage bezahlen, bauen wir nur eine Form davon. Die interessantere ist der Hausmeister, der von selbst merkt, wenn etwas nicht stimmt – und 2026 ist das Jahr, in dem sie ökonomisch wird.",
      date: "21 MAY 2026",
      read: "13 MIN"
    },
    en: {
      href: "blog/posts/en/ambient-ai-the-next-ai-generation.html",
      title: "Ambient AI: Why the Next Generation Doesn't Answer – It Notices",
      excerpt: "As long as we pay AI per request, we only build one shape of it. The interesting shape is the janitor who notices on his own when something is off – and 2026 is the year it becomes economical.",
      date: "21 MAY 2026",
      read: "13 MIN"
    },
    zh: {
      href: "blog/posts/zh/ambient-ai-the-next-ai-generation.html",
      title: "环境 AI：为何下一代 AI 不是回答，而是察觉",
      excerpt: "只要我们还按次为 AI 付费，就只能造出它的一种形态。更有意思的是那个会自己发现异常的门房——而 2026 年正是它在经济上变得可行的一年。",
      date: "21 MAY 2026",
      read: "13 MIN"
    }
  },
  {
    id: "anthropic-skills-guide",
    cat: "CLAUDE",
    de: {
      href: "blog/posts/de/anthropic-skills-guide.html",
      title: "Anthropics 33-Seiten-Blueprint für Claude Skills",
      excerpt: "Ein offizieller Leitfaden, der zeigt, wie man Claude beibringt, wie man arbeitet – ohne eine einzige Zeile Code. Was wirklich drinsteht und warum Skills das Prompt Engineering leise ablösen.",
      date: "15 MAY 2026",
      read: "6 MIN"
    },
    en: {
      href: "blog/posts/en/anthropic-skills-guide.html",
      title: "Anthropic's 33-Page Blueprint for Claude Skills",
      excerpt: "An official guide showing how to teach Claude the way you work – without writing a single line of code. What's actually in it, and why skills quietly retire prompt engineering.",
      date: "15 MAY 2026",
      read: "6 MIN"
    },
    zh: {
      href: "blog/posts/zh/anthropic-skills-guide.html",
      title: "Anthropic 关于 Claude Skills 的 33 页蓝图",
      excerpt: "一份官方指南，展示如何在不写一行代码的情况下教会 Claude 如何工作。里面真正讲了什么，以及为何 Skills 正在悄然取代提示工程。",
      date: "15 MAY 2026",
      read: "6 MIN"
    }
  },
  {
    id: "mit-ai-halluzinationen",
    cat: "RESEARCH",
    de: {
      href: "blog/posts/de/mit-ai-halluzinationen.html",
      title: "MIT löst KI-Halluzinationen?",
      excerpt: "Eine neue Studie aus Cambridge verspricht zuverlässigere Modelle durch kalibrierte Belohnungssignale. Was sie wirklich zeigt – und was das für Entwickler heute bedeutet.",
      date: "30 APR 2026",
      read: "6 MIN"
    },
    en: {
      href: "blog/posts/en/mit-ai-hallucinations.html",
      title: "Did MIT solve AI hallucinations?",
      excerpt: "A new study from Cambridge promises more reliable models through calibrated reward signals. What it actually shows – and what it means for developers today.",
      date: "30 APR 2026",
      read: "6 MIN"
    },
    zh: {
      href: "blog/posts/zh/mit-ai-hallucinations.html",
      title: "MIT 解决了 AI 幻觉？",
      excerpt: "剑桥的一项新研究，声称通过校准的奖励信号带来更可靠的模型。它究竟证明了什么——以及对今天的开发者意味着什么。",
      date: "30 APR 2026",
      read: "6 MIN"
    }
  },
  {
    id: "claude-mythos-preview-zero-days",
    cat: "AI SECURITY",
    de: {
      href: "blog/posts/de/claude-mythos-preview-zero-days.html",
      title: "Claude Mythos Preview: Wenn KI eigenständig Zero-Days findet",
      excerpt: "181 Firefox-Exploits, ein 27 Jahre alter OpenBSD-Bug, ein kompletter FreeBSD-RCE mit ROP-Chain. Warum das Offense-Defense-Gleichgewicht gerade kippt.",
      date: "15 APR 2026",
      read: "5 MIN"
    },
    en: {
      href: "blog/posts/en/claude-mythos-preview-zero-days.html",
      title: "Claude Mythos Preview: When AI Finds Zero-Days on Its Own",
      excerpt: "181 Firefox exploits, a 27-year-old OpenBSD bug, a full FreeBSD RCE with a ROP chain. Why the offense-defense balance is shifting right now.",
      date: "15 APR 2026",
      read: "5 MIN"
    },
    zh: {
      href: "blog/posts/zh/claude-mythos-preview-zero-days.html",
      title: "Claude 在预览中发现的零日漏洞",
      excerpt: "Anthropic 让 Claude 直面真实代码库。它发现的漏洞——以及这对 AI 辅助安全研究意味着什么。",
      date: "15 APR 2026",
      read: "5 MIN"
    }
  },
  {
    id: "karpathy-claude-md",
    cat: "CLAUDE CODE",
    de: {
      href: "blog/posts/de/karpathy-claude-md.html",
      title: "Ein CLAUDE.md mit 25.000 Sternen",
      excerpt: "Wie eine einzelne Markdown-Datei auf Basis von Karpathys Beobachtungen zum meistbeachteten Repo im Claude-Code-Ökosystem wurde – und was davon in der Praxis wirklich bleibt.",
      date: "10 APR 2026",
      read: "4 MIN"
    },
    en: {
      href: "blog/posts/en/karpathy-claude-md.html",
      title: "A CLAUDE.md With 25,000 Stars",
      excerpt: "How a single Markdown file built from Karpathy's observations became the most-starred repo in the Claude Code ecosystem – and what actually holds up in practice.",
      date: "10 APR 2026",
      read: "4 MIN"
    },
    zh: {
      href: "blog/posts/zh/karpathy-claude-md.html",
      title: "Karpathy 的 CLAUDE.md：把上下文当作一等公民",
      excerpt: "Andrej Karpathy 如何用 CLAUDE.md 引导智能体编码——以及为何一份精心编写的上下文文件胜过更聪明的提示。",
      date: "10 APR 2026",
      read: "4 MIN"
    }
  },
  {
    id: "ki-agenten-workflows-superpowers",
    cat: "AGENTS",
    de: {
      href: "blog/posts/de/ki-agenten-workflows-superpowers.html",
      title: "Superpowers: KI-Agenten wie echte Teams",
      excerpt: "Ein Framework, das Claude Code wiederverwendbare Fähigkeiten beibringt und mehrstufige Entwicklungs-Workflows orchestriert.",
      date: "25 MAR 2026",
      read: "3 MIN"
    },
    en: {
      href: "blog/posts/en/ki-agenten-workflows-superpowers.html",
      title: "Superpowers: AI Agents Like Real Teams",
      excerpt: "A framework that teaches Claude Code reusable skills and orchestrates multi-step development workflows.",
      date: "25 MAR 2026",
      read: "3 MIN"
    },
    zh: {
      href: "blog/posts/zh/ki-agenten-workflows-superpowers.html",
      title: "用 Superpowers 打造 AI 智能体工作流",
      excerpt: "Skills、计划与子智能体如何组合成可靠的自主工作流——以及让它们不至失控的模式。",
      date: "25 MAR 2026",
      read: "3 MIN"
    }
  },
  {
    id: "claude-code-skills",
    cat: "CLAUDE CODE",
    de: {
      href: "blog/posts/de/claude-code-skills.html",
      title: "Claude Code Skills: Der MCP-Killer?",
      excerpt: "Wie Skills die Interaktion mit KI-Agenten revolutionieren – wiederverwendbare Fähigkeiten, die Claude lernt und konsistent anwendet.",
      date: "15 MAR 2026",
      read: "3 MIN"
    },
    en: {
      href: "blog/posts/en/claude-code-skills.html",
      title: "Claude Code Skills: The MCP Killer?",
      excerpt: "How skills revolutionize the interaction with AI agents. Reusable capabilities that Claude learns and consistently applies.",
      date: "15 MAR 2026",
      read: "3 MIN"
    },
    zh: {
      href: "blog/posts/zh/claude-code-skills.html",
      title: "Claude Code Skills：Claude 学会新技能的方式",
      excerpt: "Skills 让 Claude Code 按需加载领域知识与工作流。它们如何运作、何时使用，以及如何编写自己的技能。",
      date: "15 MAR 2026",
      read: "3 MIN"
    }
  },
  {
    id: "playwright-mcp-browser-automatisierung",
    cat: "DEVELOPMENT",
    de: {
      href: "blog/posts/de/playwright-mcp-browser-automatisierung.html",
      title: "Browser-Automatisierung mit Playwright MCP",
      excerpt: "Wie du Claude Code beibringst, einen echten Browser zu steuern – für Web-Scraping, Testing und Automatisierung.",
      date: "05 MAR 2026",
      read: "3 MIN"
    },
    en: {
      href: "blog/posts/en/playwright-mcp-browser-automatisierung.html",
      title: "Browser Automation with Playwright MCP",
      excerpt: "How to teach Claude Code to control a real browser for web scraping, testing, and automation.",
      date: "05 MAR 2026",
      read: "3 MIN"
    },
    zh: {
      href: "blog/posts/zh/playwright-mcp-browser-automatisierung.html",
      title: "用 Playwright MCP 实现浏览器自动化",
      excerpt: "通过 MCP 把 Playwright 交到智能体手中——让 AI 能像人一样导航、点击并读取真实网页。",
      date: "05 MAR 2026",
      read: "3 MIN"
    }
  },
  {
    id: "openclaw-vs-nemoclaw",
    cat: "AI SECURITY",
    de: {
      href: "blog/posts/de/openclaw-vs-nemoclaw.html",
      title: "OpenClaw vs. NemoClaw: Warum die Frage falsch gestellt ist",
      excerpt: "NemoClaw ist kein Ersatz für OpenClaw, sondern ein Sicherheits-Wrapper für Enterprise-taugliche KI-Agenten. Eine Analyse der Unterschiede und Einsatzszenarien.",
      date: "20 FEB 2026",
      read: "4 MIN"
    },
    en: {
      href: "blog/posts/en/openclaw-vs-nemoclaw.html",
      title: "OpenClaw vs. NemoClaw: Why the Question Is Wrong",
      excerpt: "NemoClaw is not a replacement for OpenClaw, but a security wrapper for enterprise-ready AI agents. An analysis of the differences and use cases.",
      date: "20 FEB 2026",
      read: "4 MIN"
    },
    zh: {
      href: "blog/posts/zh/openclaw-vs-nemoclaw.html",
      title: "OpenClaw 对比 NemoClaw：两种智能体框架",
      excerpt: "两种智能体编排方式，正面对比。架构、取舍，以及各自何时更合适。",
      date: "20 FEB 2026",
      read: "4 MIN"
    }
  },
  {
    id: "ki-modell-evaluation",
    cat: "RESEARCH",
    de: {
      href: "blog/posts/de/ki-modell-evaluation.html",
      title: "Wie wir das beste KI-Modell für rechtliche Analysen gefunden haben",
      excerpt: "Mit LLM-as-a-Judge, Crew-as-a-Judge und menschlicher Validierung – ein Blick hinter die Kulissen unserer systematischen Modellauswahl.",
      date: "10 FEB 2026",
      read: "4 MIN"
    },
    en: {
      href: "blog/posts/en/ki-modell-evaluation.html",
      title: "How We Found the Best AI Model for Legal Analysis",
      excerpt: "With LLM-as-a-Judge, Crew-as-a-Judge, and human validation. A look behind the scenes of our systematic model selection.",
      date: "10 FEB 2026",
      read: "4 MIN"
    },
    zh: {
      href: "blog/posts/zh/ki-modell-evaluation.html",
      title: "如何真正评估 AI 模型",
      excerpt: "基准分数会骗人。什么才真正重要、如何为你的用例搭建评估，以及为何\"感觉更好\"不是一种度量。",
      date: "10 FEB 2026",
      read: "4 MIN"
    }
  },
  {
    id: "legal-ai-knowledge-base-docling",
    cat: "DEVELOPMENT",
    de: {
      href: "blog/posts/de/legal-ai-knowledge-base-docling.html",
      title: "Legal AI Knowledge Base mit 1000+ PDFs",
      excerpt: "Wie wir juristische PDF-Dokumente mit Docling in eine durchsuchbare Wissensbasis für KI-gestützte Rechtsberatung verwandelt haben.",
      date: "25 JAN 2026",
      read: "4 MIN"
    },
    en: {
      href: "blog/posts/en/legal-ai-knowledge-base-docling.html",
      title: "Legal AI Knowledge Base with 1000+ PDFs",
      excerpt: "How we transformed legal PDF documents with Docling into a searchable knowledge base for AI-powered legal consulting.",
      date: "25 JAN 2026",
      read: "4 MIN"
    },
    zh: {
      href: "blog/posts/zh/legal-ai-knowledge-base-docling.html",
      title: "用 Docling 为法律 AI 构建知识库",
      excerpt: "把杂乱的法律 PDF 转化为可供 RAG 检索的干净结构化知识——用 Docling 完成解析、分块与嵌入。",
      date: "25 JAN 2026",
      read: "4 MIN"
    }
  },
  {
    id: "multi-agent-ai-crewai",
    cat: "AGENTS",
    de: {
      href: "blog/posts/de/multi-agent-ai-crewai.html",
      title: "Multi-Agent AI Systeme mit CrewAI",
      excerpt: "Wie man spezialisierte KI-Agenten orchestriert, die wie ein echtes Team zusammenarbeiten. Ein praktischer Leitfaden mit Code-Beispielen.",
      date: "15 JAN 2026",
      read: "4 MIN"
    },
    en: {
      href: "blog/posts/en/multi-agent-ai-crewai.html",
      title: "Multi-Agent AI Systems with CrewAI",
      excerpt: "How to orchestrate specialized AI agents that collaborate like a real team. A practical guide with code examples.",
      date: "15 JAN 2026",
      read: "4 MIN"
    },
    zh: {
      href: "blog/posts/zh/multi-agent-ai-crewai.html",
      title: "用 CrewAI 构建多智能体 AI 系统",
      excerpt: "智能体、任务与流程——如何用 CrewAI 编排一支协作的 AI 智能体团队来完成真实工作。",
      date: "15 JAN 2026",
      read: "4 MIN"
    }
  },
  {
    id: "genetische-algorithmen-java",
    cat: "DEVELOPMENT",
    de: {
      href: "blog/posts/de/genetische-algorithmen-java.html",
      title: "Genetische Algorithmen verstehen",
      excerpt: "Evolution als Optimierungswerkzeug: Wie genetische Algorithmen komplexe Probleme lösen. Eine praktische Einführung mit Java.",
      date: "20 DEC 2025",
      read: "5 MIN"
    },
    en: {
      href: "blog/posts/en/genetische-algorithmen-java.html",
      title: "Understanding Genetic Algorithms",
      excerpt: "Evolution as an optimization tool: How genetic algorithms solve complex problems. A practical introduction with Java.",
      date: "20 DEC 2025",
      read: "5 MIN"
    },
    zh: {
      href: "blog/posts/zh/genetische-algorithmen-java.html",
      title: "Java 中的遗传算法：从零进化出解",
      excerpt: "选择、交叉、变异——用 Java 从头实现一个遗传算法，并看它如何逼近最优解。",
      date: "20 DEC 2025",
      read: "5 MIN"
    }
  }
];

/* Active language (falls back to 'de' if the i18n engine isn't present). */
function siteLang(){ return (typeof getCurrentLang === "function" ? getCurrentLang() : "de"); }

/* Base path so links from /blog/ and /blog/en/ resolve to the site root. */
function siteBase(){
  var p = location.pathname;
  if (p.includes("/blog/posts/de/") || p.includes("/blog/posts/en/")) return "../../../";
  if (p.includes("/blog/en/")) return "../../";
  if (p.includes("/blog/")) return "../";
  return "";
}

function tcardHTML(p){
  var lang = siteLang();
  var L = p[lang] || p.en;
  var href = siteBase() + L.href;
  return `<a class="tcard" href="${href}" data-cat="${p.cat}">
    <div class="tcard__grid"></div>
    <div class="tcard__spec"></div>
    <div class="tcard__top"><span class="tcard__cat">${p.cat}</span><span class="tcard__read">${L.read}</span></div>
    <h3>${L.title}</h3>
    <p>${L.excerpt}</p>
    <div class="tcard__foot"><span class="tcard__date">${L.date}</span><span class="tcard__arrow">→</span></div>
  </a>`;
}

/* render home feed (first 3) */
function renderHomeFeed(){
  var homeFeed = document.getElementById("home-feed");
  if(homeFeed) homeFeed.innerHTML = POSTS.slice(0,3).map(tcardHTML).join("");
}
renderHomeFeed();

/* ---------------- article page enhancer ----------------
   On a single post: fill in read-time from POSTS and render 3 related posts
   into #art-more-grid. Matches the current post by its filename in either the
   de or en href. */
function enhanceArticle(){
  var grid = document.getElementById("art-more-grid");
  var readEl = document.querySelector("[data-art-read]");
  if(!grid && !readEl) return;                 // not an article page
  var file = location.pathname.split("/").pop();
  var lang = siteLang();
  var idx = POSTS.findIndex(function(p){
    return (p.de.href.split("/").pop() === file) || (p.en.href.split("/").pop() === file);
  });
  if(idx < 0) return;
  var post = POSTS[idx];
  if(readEl){ readEl.textContent = (post[lang] || post.en).read; }
  if(grid){
    var more = [];
    for(var i=1;i<=3;i++){ more.push(POSTS[(idx+i) % POSTS.length]); }
    grid.innerHTML = more.map(tcardHTML).join("");
    if(typeof attachTilt === "function") attachTilt();
  }
}
enhanceArticle();

/* ---------------- client logo rail + AI scan ---------------- */
const LOGOS = [
  {s:"logos/coop.webp",a:"Coop"},{s:"logos/bih_charite.webp",a:"BIH Charité"},{s:"logos/misanto.webp",a:"Misanto"},
  {s:"logos/sorba.webp",a:"Sorba"},{s:"logos/primeo.svg",a:"Primeo Energie"},{s:"logos/devsgroup.webp",a:"DevsGroup"},
  {s:"logos/codify.webp",a:"Codify"},{s:"logos/bit.svg",a:"BIT"},{s:"logos/bmt.webp",a:"BMT"},
  {s:"logos/thimegost.webp",a:"Thimegost"},{s:"logos/woonig.webp",a:"Woonig"},{s:"logos/memoro.webp",a:"Memoro"},
];
const logoTrack = document.getElementById("logo-track");
if(logoTrack){
  var lb = siteBase();
  logoTrack.innerHTML = [...LOGOS, ...LOGOS].map((l,i)=>`<span class="lp"><img src="${lb}${l.s}" alt="${i<LOGOS.length?l.a:''}"${i<LOGOS.length?'':' aria-hidden="true"'}></span>`).join("");
  if(!REDUCED){
    const beam = ()=>{
      const cx = innerWidth/2;
      document.querySelectorAll(".lp").forEach(lp=>{
        const r = lp.getBoundingClientRect(); const c = r.left + r.width/2; const d = Math.abs(c - cx);
        if(d < 46 && !lp._cool){ lp._cool = true; lp.classList.add("scan"); setTimeout(()=>lp.classList.remove("scan"), 820); }
        if(d > 150) lp._cool = false;
      });
      requestAnimationFrame(beam);
    };
    requestAnimationFrame(beam);
  }
}

/* render full blog list + filters (blog index pages) */
var __blogFilterCat = "ALL";
function renderBlogList(){
  var blogList = document.getElementById("blog-list");
  if(!blogList) return;
  blogList.innerHTML = POSTS.filter(p=>__blogFilterCat==="ALL"||p.cat===__blogFilterCat).map(tcardHTML).join("");
  attachTilt();
}
(function(){
  var blogList = document.getElementById("blog-list");
  if(!blogList) return;
  renderBlogList();
  document.querySelectorAll(".chip").forEach(chip=>{
    chip.addEventListener("click", ()=>{
      document.querySelectorAll(".chip").forEach(c=>c.classList.remove("on"));
      chip.classList.add("on"); __blogFilterCat = chip.dataset.cat; renderBlogList();
    });
  });
})();

/* Re-render JS content when the language toggle fires (registered for translations.js).
   setLanguage() has already applied data-i18n text by the time this runs. */
window.onLanguageChange = function(){
  renderHomeFeed();
  renderBlogList();
  enhanceArticle();
  if(typeof upgradeLivingButtons === "function") upgradeLivingButtons();
};

/* ---------------- canvas data field (disabled — too busy) ---------------- */
(function(){
  const c = document.getElementById("field"); if(!c) return;
  c.style.display = "none";   // particles + red rain removed per request
})();

/* ---------------- word splitter ---------------- */
function splitWords(el){
  const words = el.textContent.trim().split(/\s+/);
  el.setAttribute("aria-label", el.textContent);
  el.innerHTML = words.map(w=>`<span class="reveal-word"><span>${w}</span></span>`).join(" ");
  return el.querySelectorAll(".reveal-word > span");
}

/* ---------------- 3D tilt ---------------- */
function attachTilt(){
  if(REDUCED) return;
  document.querySelectorAll(".tilt").forEach(card=>{
    if(card.dataset.tilt) return; card.dataset.tilt = "1";
    card.addEventListener("mousemove", e=>{
      const r = card.getBoundingClientRect();
      const px=(e.clientX-r.left)/r.width, py=(e.clientY-r.top)/r.height;
      card.style.transform = `rotateX(${(py-.5)*-12}deg) rotateY(${(px-.5)*12}deg)`;
      card.style.setProperty("--mx",(px*100)+"%"); card.style.setProperty("--my",(py*100)+"%");
    });
    card.addEventListener("mouseleave", ()=>{ card.style.transform="rotateX(0) rotateY(0)"; });
  });
}

/* ---------------- GSAP choreography ---------------- */
window.addEventListener("load", ()=>{
  attachTilt();
  if(typeof gsap === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  const heroIn = document.querySelector(".hero__in, .mh__in");
  if(heroIn && !REDUCED){
    gsap.to(".hero__sub",{opacity:1,duration:.8,delay:1.5});
    gsap.to(".hero__cta",{opacity:1,duration:.8,delay:1.7});
    gsap.to(".scrollcue",{opacity:1,duration:.8,delay:2.1});
  } else if(heroIn){ gsap.set([".hero__sub",".hero__cta",".scrollcue"],{opacity:1}); }

  // progress + nav
  gsap.to(".progress",{width:"100%",ease:"none",scrollTrigger:{start:0,end:"max",scrub:.3}});
  ScrollTrigger.create({start:"top -80",end:99999,onUpdate:s=>{ const n=document.querySelector(".nav"); if(n) n.classList.toggle("solid", s.scroll()>80); }});

  // word reveals
  document.querySelectorAll("[data-split]").forEach(el=>{
    const spans = splitWords(el);
    gsap.to(spans,{yPercent:0,duration:.7,ease:"power3.out",stagger:.055,scrollTrigger:{trigger:el,start:"top 84%"}});
  });

  // stats count-up
  document.querySelectorAll(".stat").forEach(st=>{
    const nEl=st.querySelector(".stat__n"); const bar=st.querySelector(".stat__bar i");
    if(!nEl || nEl.dataset.count===undefined) return;
    const target=parseFloat(nEl.dataset.count), suffix=nEl.dataset.suffix||"", pad=nEl.dataset.pad, barTo=nEl.dataset.bar||"70";
    ScrollTrigger.create({trigger:st,start:"top 88%",once:true,onEnter:()=>{
      const o={v:0}; gsap.to(o,{v:target,duration:1.6,ease:"power2.out",onUpdate:()=>{ let val=Math.round(o.v); if(pad)val=String(val).padStart(+pad,"0"); nEl.innerHTML=val+(suffix?`<span class="u">${suffix}</span>`:""); }});
      if(bar) gsap.to(bar,{width:barTo+"%",duration:1.6,ease:"power2.out"});
    }});
  });
  document.querySelectorAll(".stat__n[data-text]").forEach(el=>{
    ScrollTrigger.create({trigger:el,start:"top 88%",once:true,onEnter:()=>{
      const full=el.dataset.text; let k=0; const iv=setInterval(()=>{ el.innerHTML=full.slice(0,k)+(k<full.length?'<span class="u">_</span>':''); k++; if(k>full.length)clearInterval(iv); },55);
    }});
  });

  // section-head + card rises
  document.querySelectorAll(".reveal-up").forEach(el=>{
    gsap.from(el,{y:40,opacity:0,duration:.8,ease:"power2.out",scrollTrigger:{trigger:el,start:"top 84%"}});
  });
  document.querySelectorAll("[data-stagger]").forEach(grid=>{
    gsap.from(grid.children,{y:50,opacity:0,duration:.7,stagger:.12,ease:"power2.out",scrollTrigger:{trigger:grid,start:"top 82%"}});
  });

  // breach sequence — triple-redundant trigger for robustness
  const breachEl = document.querySelector(".breach");
  if(breachEl && !REDUCED){
    gsap.set(".breach__label",{opacity:0,y:20});
    gsap.set(".breach__mock",{opacity:0});
    gsap.set(".breach__mock .body",{opacity:0});
    gsap.set(".breach__ring",{opacity:0,scale:.6,left:"56px",right:"auto",top:"96px"});
    gsap.set(".breach__result",{opacity:0,x:60});
    const bt = gsap.timeline({paused:true,defaults:{ease:"power2.out"}});
    bt.to(".breach__label",{opacity:1,y:0,duration:.5})
      .to(".breach__mock",{opacity:1,duration:.6},"-=.2")
      .to(".breach__mock .body",{opacity:1,duration:.5},"-=.2")
      .to(".breach__ring",{opacity:1,scale:1,duration:.5},"+=.1")
      .to(".breach__ring",{left:"auto",right:"56px",duration:.75,ease:"power2.inOut"},"+=.28")
      .to(".breach__result",{opacity:1,x:0,duration:.6},"-=.1");
    let played=false; const reveal=()=>{ if(played)return; played=true; bt.play(); };
    try{ const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting) reveal(); }),{threshold:0.25}); io.observe(breachEl); }catch(e){}
    const check=()=>{ const r=breachEl.getBoundingClientRect(); if(r.top<innerHeight*0.78 && r.bottom>0) reveal(); };
    addEventListener("scroll",check,{passive:true}); addEventListener("resize",check);
    ScrollTrigger.create({trigger:breachEl,start:"top 78%",onEnter:reveal}); check();
  } else if(breachEl){
    gsap.set([".breach__label",".breach__mock",".breach__result"],{opacity:1});
    gsap.set(".breach__mock .body",{opacity:1});
    gsap.set(".breach__ring",{opacity:1,right:"56px",left:"auto",top:"96px"});
  }

  gsap.from(".cta-end h2",{y:40,opacity:0,duration:.9,scrollTrigger:{trigger:".cta-end",start:"top 80%"}});
  ScrollTrigger.refresh();
});

/* ============================================================
   MOBILE MENU — burger + slide-in drawer, cloned from nav links.
   Universal: builds itself from whatever .nav on the page.
   Adds a DE/EN toggle to the drawer (nav toggle is a <button>,
   not cloned) so mobile users keep the language switch.
   Runs after DOM ready because components.js injects .nav in its
   own DOMContentLoaded handler (site.js loads after components.js,
   so this listener fires after the nav exists).
   ============================================================ */
function initMobileDrawer(){
  var nav = document.querySelector(".nav"); if(!nav) return;
  if(document.querySelector(".mnav")) return; // already built
  var links = nav.querySelector(".links"); if(!links) return;

  var burger = document.createElement("button");
  burger.className = "nav__burger"; burger.setAttribute("aria-label","Open menu"); burger.setAttribute("aria-expanded","false");
  burger.innerHTML = "<span></span><span></span><span></span>";
  nav.appendChild(burger);

  var overlay = document.createElement("div");
  overlay.className = "mnav";
  overlay.innerHTML = '<div class="mnav__scrim"></div><nav class="mnav__panel"></nav>';
  document.body.appendChild(overlay);
  var panel = overlay.querySelector(".mnav__panel");
  var scrim = overlay.querySelector(".mnav__scrim");

  // clone anchor links (skip the status pill); mark the CTA
  links.querySelectorAll("a").forEach(function(a){
    var c = document.createElement("a");
    c.href = a.getAttribute("href"); c.textContent = a.textContent.trim();
    var i18n = a.getAttribute("data-i18n"); if(i18n) c.setAttribute("data-i18n", i18n);
    if(a.classList.contains("nav-cta") || a.classList.contains("btn--pri")) c.className = "mnav__cta";
    if(a.classList.contains("on")) c.classList.add("on");
    panel.appendChild(c);
  });
  // DE/EN/中文 toggle in the drawer (mirrors #lang-toggle; uses indicator classes)
  var mtog = document.createElement("button");
  mtog.id = "lang-toggle-mobile"; mtog.className = "lang-toggle"; mtog.setAttribute("aria-label","Select language");
  mtog.style.cssText = "margin-top:22px;align-self:flex-start;font-family:'Space Mono',monospace;background:none;border:0;color:var(--mut);cursor:pointer";
  mtog.innerHTML = '<span class="lang-de-indicator active" data-lang="de">DE</span> <span style="color:var(--mut)">|</span> <span class="lang-en-indicator" data-lang="en">EN</span> <span style="color:var(--mut)">|</span> <span class="lang-zh-indicator" data-lang="zh">中文</span>';
  panel.appendChild(mtog);

  function open(){ overlay.classList.add("open"); burger.classList.add("open"); document.body.classList.add("mnav-lock"); burger.setAttribute("aria-expanded","true"); }
  function close(){ overlay.classList.remove("open"); burger.classList.remove("open"); document.body.classList.remove("mnav-lock"); burger.setAttribute("aria-expanded","false"); }
  burger.addEventListener("click", function(){ overlay.classList.contains("open") ? close() : open(); });
  scrim.addEventListener("click", close);
  panel.addEventListener("click", function(e){ if(e.target.tagName === "A") close(); });
  document.addEventListener("keydown", function(e){ if(e.key === "Escape") close(); });
  addEventListener("resize", function(){ if(innerWidth > 1024) close(); });
}
if(document.readyState === "loading"){
  document.addEventListener("DOMContentLoaded", initMobileDrawer);
} else { initMobileDrawer(); }

/* ============================================================
   LIVING BUTTONS — upgrade every .btn--pri into a Cyberpunk
   glitch button (channel-split + shear + shake + text-scramble).
   Ambient "surges" only on the hero CTA so it's not busy.
   ============================================================ */
var upgradeLivingButtons; // exposed so onLanguageChange can re-sync i18n labels
(function(){
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var GLYPHS = "!<>-_\\/[]{}—=+*^?#01アカサ▓▒░";
  function upgrade(btn){
    if(btn.dataset.living) return; btn.dataset.living="1";
    btn.classList.add("living");
    // If i18n set the label, read it from the live translation, not the (now
    // structural) DOM. data-text carries the current translated label.
    var label = (btn.getAttribute("data-i18n") && typeof getTranslation === "function")
      ? getTranslation(btn.getAttribute("data-i18n")) : btn.textContent.trim();
    btn.textContent = "";
    var tn = document.createTextNode(label); btn.appendChild(tn);
    btn.setAttribute("data-text", label);
    var shear = document.createElement("span");
    shear.className = "living__shear"; shear.setAttribute("aria-hidden","true"); shear.textContent = label;
    btn.appendChild(shear);
    var raf = null;
    function write(t){ tn.textContent = t; btn.setAttribute("data-text", t); shear.textContent = t; }
    function scramble(){
      var f = 0, total = 48; cancelAnimationFrame(raf);
      (function tick(){
        var res = Math.floor((f/total) * label.length), out = "";
        for(var i=0;i<label.length;i++){
          if(label[i] === " "){ out += " "; continue; }
          out += i < res ? label[i] : GLYPHS[Math.floor(Math.random()*GLYPHS.length)];
        }
        write(out); f++;
        if(f <= total) raf = requestAnimationFrame(tick); else write(label);
      })();
    }
    function reset(){ cancelAnimationFrame(raf); btn.classList.remove("surge"); write(label); }
    btn.addEventListener("mouseenter", function(){ if(!reduce) scramble(); });
    btn.addEventListener("focus", function(){ if(!reduce) scramble(); });
    btn.addEventListener("mouseleave", reset);
    btn.addEventListener("blur", reset);
    btn.addEventListener("animationend", function(e){
      if(e.animationName === "living-red" || e.animationName === "living-wht"){ btn.classList.remove("surge"); }
    });
    if(!reduce && btn.closest(".hero, .mh, .eh")){
      (function schedule(){
        var d = 2600 + Math.random()*4200;
        setTimeout(function(){ btn.classList.add("surge"); scramble(); schedule(); }, d);
      })();
    }
  }
  // Re-upgrade an i18n button after the toggle changed its label: setLanguage()
  // rewrote textContent (destroying the living structure), so reset + rebuild.
  function reupgrade(btn){
    delete btn.dataset.living;
    btn.classList.remove("living");
    var shear = btn.querySelector(".living__shear"); if(shear) shear.remove();
    upgrade(btn);
  }
  upgradeLivingButtons = function(){
    document.querySelectorAll(".btn--pri[data-i18n]").forEach(reupgrade);
  };
  function upgradeAll(){ document.querySelectorAll(".btn--pri").forEach(upgrade); }
  // static buttons now; injected nav CTA after components.js runs (DOM ready).
  upgradeAll();
  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", upgradeAll);
  } else { upgradeAll(); }
})();
