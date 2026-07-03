# Chinese (中文) Third Language — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Chinese (`zh`) as a full third language (homepage UI, Agent Scan tool, blog index, all 16 blog articles) alongside German (`de`, canonical) and English (`en`), with a three-way DE / EN / 中文 switcher.

**Architecture:** Extend the existing two-mechanism i18n system — the in-place `data-i18n` swap dictionary (`js/translations.js`) and the duplicated blog file tree — to a third language. JS-rendered content (`js/site.js` blog feed + `js/extras.js` scan tool) gains explicit `zh` branches. A new `/blog/posts/zh/` tree reuses the English filenames. Untranslated surfaces fall back to English, so every intermediate commit is a working trilingual site.

**Tech Stack:** Static HTML/CSS/vanilla JS (no framework, no test runner, no build except optional Tailwind). Verification is browser-driven via the local `python3 -m http.server 8000` and Chrome. Spec: `docs/superpowers/specs/2026-07-04-chinese-third-language-design.md`.

## Global Constraints

- **Fallback language is English, not German.** Everywhere a `zh` value is missing, fall back to `en`. `getTranslation()`, `tcardHTML`, `enhanceArticle`, and all `js/extras.js` branches must implement this. (This CHANGES the current `|| p.de` fallbacks in `site.js` to `|| p.en`.)
- **Canonical/default language stays `de`** (localStorage default, unchanged).
- **ZH blog slugs reuse the EN filenames** under `/blog/posts/zh/` (ASCII, no new slugMap entries beyond mirroring the existing 4 differing posts zh→en).
- **Preserve markup in translated strings:** wordmark spans (`w<span class="ai">AI</span>ser`), `.rip` highlights, `<b>`, `<br>`, `&nbsp;`, and arrow glyphs (`▸`, `→`, `◄`, `◆`, `✦`) stay verbatim; translate only human-readable text.
- **No new Tailwind classes** in blog posts (copy existing post structure). No `./tailwind/build.sh` run unless a genuinely new utility class is introduced.
- **Commit message trailer** (every commit):
  ```
  Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_01CwCrVRJiaBD823kocKTUDs
  ```
- **Local server for verification:** `python3 -m http.server 8000` from repo root; open `http://localhost:8000/`.

---

## PHASE A — Plumbing + UI (no article prose)

After Phase A: the homepage and Agent Scan tool are fully Chinese; the blog feed cards render Chinese titles/excerpts and link to `/blog/posts/zh/<file>` (which 404 until Phase B — acceptable, Phase A is about the mechanism).

---

### Task A1: Add the `zh` translation dictionary + EN fallback in `translations.js`

**Files:**
- Modify: `js/translations.js` (add `zh: {…}` block after the `en` block ~line 278; update `getTranslation` ~line 384)

**Interfaces:**
- Produces: `translations.zh` (a key→string map covering every key present in `translations.en`); `getTranslation(key)` now falls back en → key.

- [ ] **Step 1: Add the `zh` block.** After the closing `}` of the `en` object (line 278, the `};` closing `translations` is line 279 — insert a comma after `en`'s closing brace and add `zh`). Every key from the `en` block must be present. Use these Chinese values (markup preserved verbatim):

```js
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
```

- [ ] **Step 2: Update `getTranslation` to fall back to English.** Change line ~384-386:

```js
function getTranslation(key) {
    return translations[currentLang][key]
        || (translations.en && translations.en[key])
        || key;
}
```

- [ ] **Step 3: Verify parity.** Run:

```bash
node -e "global.window={location:{pathname:'/'}};global.localStorage={getItem:()=>null,setItem:()=>{}};global.document={documentElement:{},getElementById:()=>null,querySelectorAll:()=>[]};const c=require('fs').readFileSync('js/translations.js','utf8');eval(c);const de=Object.keys(translations.de),en=Object.keys(translations.en),zh=Object.keys(translations.zh);const miss=en.filter(k=>!zh.includes(k));const extra=zh.filter(k=>!en.includes(k));console.log('EN keys:',en.length,'ZH keys:',zh.length);console.log('missing in zh:',miss);console.log('extra in zh:',extra);"
```

Expected: `EN keys: N ZH keys: N` (equal), `missing in zh: []`, `extra in zh: []`.

- [ ] **Step 4: Commit**

```bash
git add js/translations.js
git commit -m "i18n: add Chinese (zh) dictionary + English fallback in getTranslation

<trailer>"
```

---

### Task A2: Three-way switcher routing + active-state in `setLanguage()`

**Files:**
- Modify: `js/translations.js` — `currentLang` init (~282-286), `slugMap` (~295-308), blog redirect block (~309-331), indicator toggling (~366-371)

**Interfaces:**
- Consumes: `translations.zh` (A1).
- Produces: `setLanguage('zh')` routes `/blog/` → `/blog/zh/`, `/posts/de|en/` → `/posts/zh/`; three-way indicator active-state via `#lang-zh` / `.lang-zh-indicator`.

- [ ] **Step 1: `currentLang` init detects `/zh/`.** Replace the IIFE (lines ~282-286):

```js
let currentLang = (function() {
    const path = window.location.pathname;
    if (path.includes('/blog/zh/') || path.includes('/posts/zh/')) return 'zh';
    if (path.includes('/blog/en/') || path.includes('/posts/en/')) return 'en';
    return localStorage.getItem('lang') || 'de';
})();
```

- [ ] **Step 2: Extend `slugMap` with `zh` mappings.** The zh posts reuse EN filenames, so `deToZh`/`enToZh` use the EN filename; `zhToDe`/`zhToEn` are the inverse. Replace the `slugMap` object (lines ~295-308):

```js
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
        },
        // zh reuses EN filenames
        deToZh: {
            'mit-ai-halluzinationen.html': 'mit-ai-hallucinations.html',
            'ambient-ai-die-naechste-ki-generation.html': 'ambient-ai-the-next-ai-generation.html',
            'loops-statt-prompts-cherny.html': 'loops-not-prompts-cherny.html',
            'opus-4-8-dynamische-workflows-erst-recht-audit.html': 'opus-4-8-dynamic-workflows-erst-recht-audit.html'
        },
        enToZh: {}, // en and zh share filenames — identity
        zhToDe: {
            'mit-ai-hallucinations.html': 'mit-ai-halluzinationen.html',
            'ambient-ai-the-next-ai-generation.html': 'ambient-ai-die-naechste-ki-generation.html',
            'loops-not-prompts-cherny.html': 'loops-statt-prompts-cherny.html',
            'opus-4-8-dynamic-workflows-erst-recht-audit.html': 'opus-4-8-dynamische-workflows-erst-recht-audit.html'
        },
        zhToEn: {} // identity
    };
```

- [ ] **Step 2b: Add a filename-mapping helper** right after the `slugMap` object:

```js
    // Map the current post filename from one language tree to another.
    function mapSlug(file, from, to) {
        if (from === to) return file;
        const table = slugMap[from + 'To' + to.charAt(0).toUpperCase() + to.slice(1)];
        return (table && table[file]) || file;
    }
```

- [ ] **Step 3: Replace the blog redirect block** (lines ~309-331) with a language-agnostic version. Replace from `if (path.includes('/blog/')) {` through its closing `}`:

```js
    if (path.includes('/blog/')) {
        // Determine current tree
        let fromTree = 'de';
        if (path.includes('/posts/en/') || path.includes('/blog/en/')) fromTree = 'en';
        else if (path.includes('/posts/zh/') || path.includes('/blog/zh/')) fromTree = 'zh';

        // Post pages: /blog/posts/{de,en,zh}/
        if (path.includes('/posts/')) {
            if (lang !== fromTree) {
                const file = path.split('/').pop();
                const mapped = mapSlug(file, fromTree, lang);
                const targetDir = '/posts/' + lang + '/';
                window.location.href = path
                    .replace('/posts/' + fromTree + '/', targetDir)
                    .replace(/[^/]+$/, mapped);
                return;
            }
        } else {
            // Blog index: /blog/  (de)  <->  /blog/en/  <->  /blog/zh/
            if (lang !== fromTree) {
                const fromSeg = fromTree === 'de' ? '/blog/' : '/blog/' + fromTree + '/';
                const toSeg = lang === 'de' ? '/blog/' : '/blog/' + lang + '/';
                window.location.href = path.replace(fromSeg, toSeg);
                return;
            }
        }
    }
```

- [ ] **Step 4: Three-way indicator active-state.** Replace the two `querySelectorAll` indicator blocks (lines ~366-371):

```js
    document.querySelectorAll('#lang-de, .lang-de-indicator').forEach(el => {
        el.classList.toggle('active', lang === 'de');
    });
    document.querySelectorAll('#lang-en, .lang-en-indicator').forEach(el => {
        el.classList.toggle('active', lang === 'en');
    });
    document.querySelectorAll('#lang-zh, .lang-zh-indicator').forEach(el => {
        el.classList.toggle('active', lang === 'zh');
    });
```

- [ ] **Step 5: Commit**

```bash
git add js/translations.js
git commit -m "i18n: three-way DE/EN/zh routing + slugMap + active-state in setLanguage

<trailer>"
```

---

### Task A3: Three-way switcher UI — nav (`components.js`) + click wiring (`main.js`) + mobile drawer (`site.js`)

**Files:**
- Modify: `js/components.js` — nav `#lang-toggle` markup (lines ~28-32)
- Modify: `js/main.js` — click handler (line ~12-15)
- Modify: `js/site.js` — drawer toggle clone (lines ~549-554)

**Interfaces:**
- Consumes: `setLanguage(lang)` three-way active-state (A2).
- Produces: three clickable language targets, each resolving a specific `data-lang` value rather than toggling.

- [ ] **Step 1: Nav markup.** In `js/components.js` replace the `#lang-toggle` button (lines ~28-32). Add `data-lang` on each span so the handler reads the target directly:

```js
            <button id="lang-toggle" class="lang-toggle" aria-label="Select language" style="margin-left:6px">
                <span id="lang-de" class="active" data-lang="de">DE</span>
                <span style="color:var(--mut)">|</span>
                <span id="lang-en" data-lang="en">EN</span>
                <span style="color:var(--mut)">|</span>
                <span id="lang-zh" data-lang="zh">中文</span>
            </button>
```

- [ ] **Step 2: Click wiring.** In `js/main.js` replace the delegated click handler (lines ~12-15). Resolve the specific language from the clicked span's `data-lang`; if the click landed on the button chrome (the `|` or padding), do nothing:

```js
    document.addEventListener('click', (e) => {
        const toggle = e.target.closest('#lang-toggle, #lang-toggle-mobile');
        if (!toggle) return;
        const span = e.target.closest('[data-lang]');
        if (!span) return; // clicked a separator / chrome
        const target = span.getAttribute('data-lang');
        if (target && target !== currentLang) setLanguage(target);
    });
```

- [ ] **Step 3: Mobile drawer clone.** In `js/site.js` replace the drawer toggle markup (line ~553) with three indicators carrying `data-lang`:

```js
  mtog.innerHTML = '<span class="lang-de-indicator active" data-lang="de">DE</span> <span style="color:var(--mut)">|</span> <span class="lang-en-indicator" data-lang="en">EN</span> <span style="color:var(--mut)">|</span> <span class="lang-zh-indicator" data-lang="zh">中文</span>';
```

- [ ] **Step 4: Verify in browser.** Start the server, open the homepage, exercise the switcher:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/`. Verify manually (or via Chrome automation):
1. Nav shows `DE | EN | 中文`.
2. Click `中文` → all UI text becomes Chinese, `中文` is highlighted (`.active`), `<html lang="zh">`, `localStorage.lang === 'zh'`.
3. Click `EN` → English; click `DE` → German. Active indicator always matches.
4. Open the mobile drawer (narrow the window < 1024px, click burger) → drawer shows `DE | EN | 中文`, all three work.

- [ ] **Step 5: Commit**

```bash
git add js/components.js js/main.js js/site.js
git commit -m "i18n: three-way DE/EN/中文 switcher in nav + mobile drawer + click wiring

<trailer>"
```

---

### Task A4: `zh` branches in the blog feed renderer (`site.js`) + EN fallback

**Files:**
- Modify: `js/site.js` — `tcardHTML` fallback (line ~310), `enhanceArticle` read fallback (line ~344)

**Interfaces:**
- Consumes: `POSTS[i].zh` objects (added in Task A5).
- Produces: feed cards pick `p[lang] || p.en`; article read-time picks `post[lang] || post.en`.

- [ ] **Step 1: `tcardHTML` fallback to EN.** In `js/site.js` line ~310, change:

```js
  var L = p[lang] || p.en;
```

- [ ] **Step 2: `enhanceArticle` read fallback to EN.** In `js/site.js` line ~344, change:

```js
  if(readEl){ readEl.textContent = (post[lang] || post.en).read; }
```

(Note: the `POSTS.findIndex` filename match on line ~339-341 already matches zh posts because they reuse EN filenames — `p.en.href` covers them. No change there.)

- [ ] **Step 3: Commit** (verification happens in A5 once `zh` post data exists)

```bash
git add js/site.js
git commit -m "i18n: blog feed + article enhancer fall back to English for missing lang

<trailer>"
```

---

### Task A5: Add `zh` objects to all 16 entries in the `POSTS` array (`site.js`)

**Files:**
- Modify: `js/site.js` — `POSTS` array (lines ~5-290)

**Interfaces:**
- Consumes: nothing.
- Produces: each `POSTS[i]` has a `zh: { href, title, excerpt, date, read }`; `href` = `blog/posts/zh/<en-filename>`; `date`/`read` copied from the `en` object (dates are already language-neutral like `27 JUN 2026`; keep them identical to avoid drift).

- [ ] **Step 1: For each of the 16 posts, add a `zh` object** mirroring the structure, after its `en` object. The `href` reuses the EN filename under `/posts/zh/`; `date` and `read` are copied verbatim from `en`. Translate `title` and `excerpt`. Below are all 16 (matched by `id`):

```
agent-memory-poisoning-mem0:
  title: 我们用 2 条消息给一个"有安全意识"的 AI 智能体投毒
  excerpt: 无需 API 访问、无需越狱——仅 2 条聊天消息，就让一个已加固的 AI 智能体信任了一个凭据收集器。围绕 Mem0 记忆投毒的四项实验，每一道防御都被测试并攻破。
loops-statt-prompts-cherny (zh file = loops-not-prompts-cherny.html):
  title: 用循环取代提示：Claude Code 负责人为何不再写提示
  excerpt: Boris Cherny 不再给 Claude 写提示——他写循环。这意味着什么，/loop 与 /goal 有何不同，以及我自己搭建的自主分诊循环。
opus-4-8-dynamische-workflows-erst-recht-audit (zh file = opus-4-8-dynamic-workflows-erst-recht-audit.html):
  title: Opus 4.8 与动态工作流：5 分钟内 7 个智能体
  excerpt: 七个智能体、一个真实的法律科技平台、五分钟。Claude 如今能把计划铸成脚本并让智能体群并行运行意味着什么——以及为何验证改变了一切。
ambient-ai-die-naechste-ki-generation (zh file = ambient-ai-the-next-ai-generation.html):
  title: 环境 AI：为何下一代 AI 不是回答，而是察觉
  excerpt: 只要我们还按次为 AI 付费，就只能造出它的一种形态。更有意思的是那个会自己发现异常的门房——而 2026 年正是它在经济上变得可行的一年。
anthropic-skills-guide:
  title: Anthropic 关于 Claude Skills 的 33 页蓝图
  excerpt: 一份官方指南，展示如何在不写一行代码的情况下教会 Claude 如何工作。里面真正讲了什么，以及为何 Skills 正在悄然取代提示工程。
claude-code-skills:
  title: Claude Code Skills：Claude 学会新技能的方式
  excerpt: Skills 让 Claude Code 按需加载领域知识与工作流。它们如何运作、何时使用，以及如何编写自己的技能。
claude-mythos-preview-zero-days:
  title: Claude 在预览中发现的零日漏洞
  excerpt: Anthropic 让 Claude 直面真实代码库。它发现的漏洞——以及这对 AI 辅助安全研究意味着什么。
genetische-algorithmen-java:
  title: Java 中的遗传算法：从零进化出解
  excerpt: 选择、交叉、变异——用 Java 从头实现一个遗传算法，并看它如何逼近最优解。
karpathy-claude-md:
  title: Karpathy 的 CLAUDE.md：把上下文当作一等公民
  excerpt: Andrej Karpathy 如何用 CLAUDE.md 引导智能体编码——以及为何一份精心编写的上下文文件胜过更聪明的提示。
ki-agenten-workflows-superpowers:
  title: 用 Superpowers 打造 AI 智能体工作流
  excerpt: Skills、计划与子智能体如何组合成可靠的自主工作流——以及让它们不至失控的模式。
ki-modell-evaluation:
  title: 如何真正评估 AI 模型
  excerpt: 基准分数会骗人。什么才真正重要、如何为你的用例搭建评估，以及为何"感觉更好"不是一种度量。
legal-ai-knowledge-base-docling:
  title: 用 Docling 为法律 AI 构建知识库
  excerpt: 把杂乱的法律 PDF 转化为可供 RAG 检索的干净结构化知识——用 Docling 完成解析、分块与嵌入。
mit-ai-halluzinationen (zh file = mit-ai-hallucinations.html):
  title: 与 AI 幻觉共处：为何模型会编造，以及如何应对
  excerpt: 幻觉不是 bug，而是 LLM 工作方式的产物。它们从何而来、何时重要，以及在生产中遏制它们的实用模式。
multi-agent-ai-crewai:
  title: 用 CrewAI 构建多智能体 AI 系统
  excerpt: 智能体、任务与流程——如何用 CrewAI 编排一支协作的 AI 智能体团队来完成真实工作。
openclaw-vs-nemoclaw:
  title: OpenClaw 对比 NemoClaw：两种智能体框架
  excerpt: 两种智能体编排方式，正面对比。架构、取舍，以及各自何时更合适。
playwright-mcp-browser-automatisierung (zh file keeps same slug playwright-mcp-browser-automatisierung.html):
  title: 用 Playwright MCP 实现浏览器自动化
  excerpt: 通过 MCP 把 Playwright 交到智能体手中——让 AI 能像人一样导航、点击并读取真实网页。
```

For each entry, the `zh` object looks like (example for the first):

```js
    zh: {
      href: "blog/posts/zh/agent-memory-poisoning-mem0.html",
      title: "我们用 2 条消息给一个\"有安全意识\"的 AI 智能体投毒",
      excerpt: "无需 API 访问、无需越狱——仅 2 条聊天消息，就让一个已加固的 AI 智能体信任了一个凭据收集器。围绕 Mem0 记忆投毒的四项实验，每一道防御都被测试并攻破。",
      date: "27 JUN 2026",
      read: "8 MIN"
    }
```

**IMPORTANT (href per post):** the `zh.href` filename equals the **`en.href` filename** for that post (reuse EN slug). For the 4 posts whose DE/EN differ, use the EN filename (`mit-ai-hallucinations.html`, `ambient-ai-the-next-ai-generation.html`, `loops-not-prompts-cherny.html`, `opus-4-8-dynamic-workflows-erst-recht-audit.html`). For `playwright-mcp-browser-automatisierung`, DE=EN filename, so zh uses it too. Copy each post's `date` and `read` verbatim from its `en` object.

- [ ] **Step 2: Syntax check.**

```bash
node -e "global.window={location:{pathname:'/'},matchMedia:()=>({matches:false}),addEventListener:()=>{}};global.document={getElementById:()=>null,querySelector:()=>null,querySelectorAll:()=>[],addEventListener:()=>{},readyState:'complete',createElement:()=>({style:{},setAttribute:()=>{},appendChild:()=>{},querySelectorAll:()=>[],classList:{add:()=>{}}}),body:{appendChild:()=>{}}};try{new Function(require('fs').readFileSync('js/site.js','utf8'));console.log('site.js parses OK');}catch(e){console.error('PARSE ERROR',e.message);process.exit(1);}"
```

Expected: `site.js parses OK`, and confirm each of the 16 entries now has a `zh` key:

```bash
grep -c "zh:" js/site.js
```

Expected: `16` (one per post; excludes any other `zh:` — verify count).

- [ ] **Step 3: Verify feed in browser.** Reload `http://localhost:8000/`, switch to 中文. The "From the blog" feed (3 cards) shows Chinese titles + excerpts. Open `http://localhost:8000/blog/` and switch to 中文 → redirect to `/blog/zh/` (404 for now — expected, fixed in Phase B). Switch back to EN on `/blog/` → cards show English. **Confirm no card shows German when in zh mode** (EN fallback proves correct even before zh index exists by checking the homepage feed, which renders in place).

- [ ] **Step 4: Commit**

```bash
git add js/site.js
git commit -m "i18n: add Chinese (zh) title/excerpt/href to all 16 POSTS entries

<trailer>"
```

---

### Task A6: `zh` branches in the Agent Scan tool (`js/extras.js`)

**Files:**
- Modify: `js/extras.js` — `POOL_ZH` (after `POOL_DE`, ~line 62), `pool()` (~63), `label()` (~64-67), `verdictText()` (~68-75), `scanLines()` (~93-110), submit "scanning" strings (~149,159,162), `softMessage()` (~132-143)

**Interfaces:**
- Consumes: `lang()` may now return `'zh'`.
- Produces: every binary `lang()==='de' ? … : …` becomes a three-way lookup with EN as the non-de, non-zh fallback.

- [ ] **Step 1: Add `POOL_ZH`** immediately after the `POOL_DE` array closes (before `function pool()`, ~line 62):

```js
  var POOL_ZH=[
    {t:'客户支持智能体', d:'拦截重复性工单，7×24 小时基于你自己的文档作答，只把真正要紧的升级给你。', fit:'hi'},
    {t:'线索资格评估智能体', d:'读取每一条进线咨询，评估意向，并把热门线索即时转给你。', fit:'hi'},
    {t:'文档处理', d:'提取、总结并归档合同、发票与表单——无需手动录入。', fit:'md'},
    {t:'内部知识智能体', d:'团队用日常语言提问，智能体基于你们的内部文档与 Wiki 作答。', fit:'md'},
    {t:'入职引导智能体', d:'自动带领新客户或新员工完成设置，逐步适配每一步。', fit:'hi'},
    {t:'内容与 SEO 智能体', d:'以你的品牌口吻起草并优化页面——直接从你的网站学习而来。', fit:'md'},
    {t:'运维监控智能体', d:'监视你的系统，一旦有异常立即提醒你——在用户察觉之前。', fit:'md'}
  ];
```

- [ ] **Step 2: `pool()` three-way** (~line 63):

```js
  function pool(){ var l=lang(); return l==='de' ? POOL_DE : (l==='zh' ? POOL_ZH : POOL_EN); }
```

- [ ] **Step 3: `label()` three-way** (~64-67):

```js
  function label(fit){
    var l=lang();
    if(l==='de') return fit==='hi' ? 'HOHER IMPACT' : 'MITTLERER IMPACT';
    if(l==='zh') return fit==='hi' ? '高影响' : '中等影响';
    return fit==='hi' ? 'HIGH IMPACT' : 'MEDIUM IMPACT';
  }
```

- [ ] **Step 4: `verdictText()` three-way** (~68-75):

```js
  function verdictText(score){
    var l=lang();
    if(l==='de') return score>=88
      ? 'Starker Fit. Diese drei Agenten würden sich schnell bezahlt machen.'
      : 'Guter Fit. Hier würden Agenten den größten Hebel schaffen.';
    if(l==='zh') return score>=88
      ? '高度契合。这三个智能体会很快收回成本。'
      : '契合良好。智能体在这里能创造最大杠杆。';
    return score>=88
      ? 'Strong fit. These three agents would pay for themselves fast.'
      : 'Good fit. Here’s where agents would create the most leverage.';
  }
```

- [ ] **Step 5: `scanLines()` three-way** (~93-110). Add a `zh` branch before the final `return` (the EN default). Insert after the `if(lang()==='de'){…}` block:

```js
    if(lang()==='zh') return [
      {c:'p',x:'$ waiser scan '},{c:'w',x:domain},{nl:1},
      {c:'c',x:'  加载公开页面 ............. '},{c:'g',x:'ok'},{nl:1},
      {c:'c',x:'  解析内容与结构 ........... '},{c:'g',x:'ok'},{nl:1},
      {c:'c',x:'  识别技术栈与工作流 ....... '},{c:'g',x:'ok'},{nl:1},
      {c:'c',x:'  梳理智能体机会 ........... '},{c:'h',x:'找到 3 个'},{nl:1},
      {c:'g',x:'✓ 分析完成'}
    ];
```

- [ ] **Step 6: Submit-handler strings three-way** (~149, 159, 162). Replace the three binary expressions:

```js
    var scanning = lang()==='de' ? 'SCANNE…' : (lang()==='zh' ? '扫描中…' : 'SCANNING…');
```
```js
    var doneMsg = lang()==='de' ? '✓ Analyse abgeschlossen' : (lang()==='zh' ? '✓ 分析完成' : '✓ analysis complete');
```
```js
      con.innerHTML='<span class="c">'+(lang()==='de'?'Scanne…':(lang()==='zh'?'扫描中…':'Scanning…'))+'</span>';
```

- [ ] **Step 7: `softMessage()` three-way** (~132-143). Replace the function body:

```js
  function softMessage(status, body){
    var l=lang();
    if(body && body.error==='DAILY_LIMIT'){
      if(l==='de') return 'Das kostenlose Tageslimit an Scans ist erreicht. Versuch es morgen wieder — oder buch direkt ein Gespräch.';
      if(l==='zh') return '今日的免费扫描额度已用完。明天再试——或直接预约一次通话。';
      return "Today's free-scan limit is reached. Try again tomorrow — or just book a call.";
    }
    if(status===429){
      if(l==='de') return 'Zu viele Scans in kurzer Zeit. Bitte einen Moment warten und erneut versuchen.';
      if(l==='zh') return '短时间内扫描次数过多。请稍候片刻再试。';
      return "Too many scans in a short time. Please wait a moment and try again.";
    }
    // 451/422 — trust the backend's fixed message, fall back to a localized default.
    if(body && body.message) return body.message;
    if(l==='de') return 'Diese Seite kann nicht gescannt werden.';
    if(l==='zh') return '该网站无法被扫描。';
    return "This site can't be scanned.";
  }
```

- [ ] **Step 8: Also localize the fallback CTA** at ~line 192 (`var cta=lang()==='de'?…`). Change to:

```js
        var cta=lang()==='de'?'GESPRÄCH BUCHEN ▸':(lang()==='zh'?'预约通话 ▸':'BOOK A CALL ▸');
```

- [ ] **Step 9: Syntax check + browser verify.**

```bash
node -e "try{new Function(require('fs').readFileSync('js/extras.js','utf8'));console.log('extras.js parses OK');}catch(e){console.error('PARSE ERROR',e.message);process.exit(1);}"
```

Then reload the homepage in 中文, scroll to the Agent Scan, enter `example.com`, run it. Verify: terminal scan lines in Chinese, "扫描中…" button state, verdict + 3 opportunity cards in Chinese, impact labels "高影响/中等影响". (The `&lang=zh` param is sent to the backend automatically via line ~116 — no change needed.)

- [ ] **Step 10: Commit**

```bash
git add js/extras.js
git commit -m "i18n: Chinese (zh) branches in Agent Scan tool (pool, labels, verdict, scan lines, errors)

<trailer>"
```

---

### Task A7: Homepage `<link hreflang="zh">` + Phase A regression sweep

**Files:**
- Modify: `index.html` — add `hreflang="zh"` alternate (in `<head>`, alongside existing de/en hreflang links)
- Modify: `404.html` — verify the 404 strings localize (they use `bw.404.*` data-i18n keys, already covered by A1; no content change, just confirm)

**Interfaces:** none produced; this closes Phase A's SEO gap for the homepage.

- [ ] **Step 1: Inspect existing hreflang on the homepage.**

```bash
grep -n "hreflang\|rel=\"alternate\"\|rel=\"canonical\"" index.html
```

- [ ] **Step 2: Add a `zh` alternate** in `index.html`'s `<head>`. NOTE (confirmed): the homepage currently has only `canonical` + `x-default` (both `https://waiser.dev/`) and no explicit `de`/`en` hreflang, because it is single-file with client-side language swap. Since all three languages live at the same URL, adding a `zh` alternate is optional/low-value, but for completeness add it right after the existing `x-default` line:

```html
<link rel="alternate" hreflang="zh" href="https://waiser.dev/">
```

Domain confirmed as `https://waiser.dev/` — mirror it exactly.

- [ ] **Step 3: Full Phase-A browser regression.** With the server running, in Chrome:
  1. Homepage → 中文: hero, services, stats, breach, contact, footer, nav all Chinese.
  2. Reload the page while `localStorage.lang==='zh'` → page comes up in Chinese (persistence).
  3. `404.html` → 中文: the 404 copy is Chinese (`bw.404.*`).
  4. Switch 中文 → EN → DE → 中文 repeatedly: no console errors, indicators track.

```bash
# console error check via Chrome automation, or manually open devtools
```

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "i18n: add hreflang=zh alternate to homepage; Phase A complete

<trailer>"
```

---

## PHASE B — Blog index + post scaffolding + reciprocal hreflang

After Phase B: `/blog/zh/` exists and lists all posts; 16 `/blog/posts/zh/*.html` files exist with correct lang/title/meta/canonical and full reciprocal hreflang; sitemap + llms updated. Article **bodies** are the English content as a placeholder pending Phase C (so the pages are valid and navigable).

---

### Task B1: Chinese blog index `blog/zh/index.html`

**Files:**
- Create: `blog/zh/index.html` (copy of `blog/en/index.html`, localized)

**Interfaces:**
- Consumes: `translations.zh` `blog.*`/`bw.blog.*` keys (A1), `renderBlogList()` (renders `POSTS[i].zh`).
- Produces: the zh blog listing page at `/blog/zh/`.

- [ ] **Step 1: Read the EN index to copy its exact structure.**

```bash
cat blog/en/index.html | head -60
```

- [ ] **Step 2: Create `blog/zh/index.html`** as a copy of `blog/en/index.html` with these changes:
  - `<html lang="zh">`
  - `<title>` → Chinese (e.g. `博客 | Nils Weiser`)
  - `<meta name="description">` → Chinese
  - `<link rel="canonical">` → the `/blog/zh/` URL
  - hreflang block → de (`/blog/`), en (`/blog/en/`), zh (`/blog/zh/`), x-default (`/blog/`)
  - Asset paths: `/blog/zh/` is the same depth as `/blog/en/`, so **keep the `../../` relative prefixes identical to the EN index** (css/js/logos resolve the same). Verify by diffing path counts.
  - Any static heading text carrying `data-i18n` stays; the post grid is rendered by `site.js` (`#blog-list`), which now picks `zh`.

- [ ] **Step 3: Verify.** Open `http://localhost:8000/blog/zh/`. Cards render Chinese titles/excerpts; nav/footer Chinese; the chips filter works; clicking a card navigates to `/blog/posts/zh/<file>` (still 404 until B2/B3 — expected). Switch language on this page → EN goes to `/blog/en/`, DE to `/blog/`.

- [ ] **Step 4: Commit**

```bash
git add blog/zh/index.html
git commit -m "blog: add Chinese blog index at /blog/zh/

<trailer>"
```

---

### Task B2: Post-template helper — establish the zh post `<head>` pattern on ONE post

**Files:**
- Create: `blog/posts/zh/agent-memory-poisoning-mem0.html` (scaffold: EN body + zh `<head>`)
- Modify: `blog/posts/de/agent-memory-poisoning-mem0.html` and `blog/posts/en/agent-memory-poisoning-mem0.html` (add `hreflang="zh"`)

**Interfaces:**
- Produces: the canonical **pattern** every other zh post (B3) follows — exact `<head>` shape, canonical, reciprocal hreflang.

- [ ] **Step 1: Read the EN post `<head>` and its hreflang block.**

```bash
sed -n '1,40p' blog/posts/en/agent-memory-poisoning-mem0.html
grep -n "hreflang\|canonical\|<html\|<title>\|data-page-title\|og:\|description" blog/posts/en/agent-memory-poisoning-mem0.html
```

- [ ] **Step 2: Create the zh scaffold.** Copy `blog/posts/en/agent-memory-poisoning-mem0.html` → `blog/posts/zh/agent-memory-poisoning-mem0.html`, then edit the `<head>` only (body stays EN — Phase C replaces it):
  - `<html lang="zh">`
  - `<title>` → the zh title from A5 (`+ " | Nils Weiser"` matching the file's existing title pattern)
  - `<meta name="description">` and `og:description`/`og:title` → zh
  - `[data-page-title]` (if the file uses it) → zh title
  - `<link rel="canonical" href=".../blog/posts/zh/agent-memory-poisoning-mem0.html">`
  - hreflang set (all four), using each language's actual filename:
    ```html
    <link rel="alternate" hreflang="de" href="https://waiser.dev/blog/posts/de/agent-memory-poisoning-mem0.html">
    <link rel="alternate" hreflang="en" href="https://waiser.dev/blog/posts/en/agent-memory-poisoning-mem0.html">
    <link rel="alternate" hreflang="zh" href="https://waiser.dev/blog/posts/zh/agent-memory-poisoning-mem0.html">
    <link rel="alternate" hreflang="x-default" href="https://waiser.dev/blog/posts/de/agent-memory-poisoning-mem0.html">
    ```
    **IMPORTANT — `x-default` points at the DE (canonical) version**, matching the site's existing convention (confirmed: EN posts already set `x-default` → `/posts/de/`). The zh `<head>`'s canonical is its own zh URL, but x-default stays DE. Also add the `de` and `en` alternates if the EN source omitted the `zh` one — the EN post already has de/en/x-default; you are only inserting the new `zh` line.
  - Asset prefixes: zh posts are at `/blog/posts/zh/`, the **same depth** as en/de posts (`../../../`), so **keep all `../../../` prefixes unchanged**.

- [ ] **Step 3: Add reciprocal `hreflang="zh"` to the DE and EN versions** of this post. In both `blog/posts/de/agent-memory-poisoning-mem0.html` and `blog/posts/en/agent-memory-poisoning-mem0.html`, add next to their existing hreflang lines:

```html
<link rel="alternate" hreflang="zh" href="https://waiser.dev/blog/posts/zh/agent-memory-poisoning-mem0.html">
```

- [ ] **Step 4: Verify.** Open `http://localhost:8000/blog/posts/zh/agent-memory-poisoning-mem0.html`:
  - Renders (EN body for now), nav/footer localize to zh, `<html lang="zh">`.
  - `<title>` is the Chinese title.
  - "Related posts" grid at the bottom shows Chinese cards (via `enhanceArticle` + `POSTS[i].zh`).
  - Switch language on the post → DE goes to `/posts/de/…`, EN to `/posts/en/…`, zh stays.
  - `curl -s` the three versions and confirm each lists all 4 hreflang lines (reciprocity):
  ```bash
  for L in de en zh; do echo "== $L =="; grep -c 'hreflang' blog/posts/$L/agent-memory-poisoning-mem0.html; done
  ```
  Expected: each ≥ 4.

- [ ] **Step 5: Commit**

```bash
git add blog/posts/zh/agent-memory-poisoning-mem0.html blog/posts/de/agent-memory-poisoning-mem0.html blog/posts/en/agent-memory-poisoning-mem0.html
git commit -m "blog: scaffold zh post template + reciprocal hreflang (agent-memory-poisoning)

<trailer>"
```

---

### Task B3: Scaffold the remaining 15 zh posts + reciprocal hreflang

**Files:**
- Create: 15 files under `blog/posts/zh/` (EN filenames)
- Modify: the 15 corresponding DE + EN post files (add `hreflang="zh"`)

**Interfaces:**
- Consumes: the B2 pattern.
- Produces: all 16 zh post files exist and are navigable; hreflang reciprocal across all three trees.

- [ ] **Step 1: Enumerate the 15 remaining posts** (EN filenames):
```
ambient-ai-the-next-ai-generation.html
anthropic-skills-guide.html
claude-code-skills.html
claude-mythos-preview-zero-days.html
genetische-algorithmen-java.html
karpathy-claude-md.html
ki-agenten-workflows-superpowers.html
ki-modell-evaluation.html
legal-ai-knowledge-base-docling.html
loops-not-prompts-cherny.html
mit-ai-hallucinations.html
multi-agent-ai-crewai.html
openclaw-vs-nemoclaw.html
opus-4-8-dynamic-workflows-erst-recht-audit.html
playwright-mcp-browser-automatisierung.html
```

- [ ] **Step 2: For each, apply the B2 pattern:** copy `blog/posts/en/<file>` → `blog/posts/zh/<file>`, edit `<head>` (lang/title/meta/canonical/hreflang) using that post's zh title from A5; add `hreflang="zh"` to the DE + EN versions. (The DE filename may differ for the 4 mapped posts — use the DE tree's actual filename; the zh/en filenames are identical.) This is mechanical repetition of B2 — **dispatch one subagent per post** for parallelism (see Execution Handoff).

- [ ] **Step 3: Verify all 16 exist and are reciprocal.**

```bash
echo "zh posts:" && ls blog/posts/zh/ | wc -l   # expect 16
for f in blog/posts/zh/*.html; do
  b=$(basename "$f")
  echo "$b: zh=$(grep -c hreflang "$f")"
done
```

Expected: 16 files, each with ≥ 4 hreflang lines. Spot-check 3 posts in the browser at `http://localhost:8000/blog/posts/zh/<file>`.

- [ ] **Step 4: Commit**

```bash
git add blog/posts/zh/ blog/posts/de/ blog/posts/en/
git commit -m "blog: scaffold remaining 15 zh posts + reciprocal hreflang across all trees

<trailer>"
```

---

### Task B4: Update sitemap + llms catalogs for zh

**Files:**
- Modify: `sitemap.xml` (add zh URLs: `/blog/zh/` + 16 posts, and homepage zh alternate if the sitemap uses `xhtml:link` alternates)
- Modify: `llms.txt`, `llms-full.txt` (add zh blog entries)

**Interfaces:** none produced; SEO catalog parity.

- [ ] **Step 1: Inspect current sitemap structure.**

```bash
grep -n "blog/en\|blog/posts/en\|hreflang\|xhtml:link" sitemap.xml | head
wc -l sitemap.xml
```

- [ ] **Step 2: Add zh entries** mirroring the EN entries: `<url>` for `/blog/zh/` and each `/blog/posts/zh/<file>`. If the sitemap declares `xhtml:link rel="alternate"` per URL, add the `zh` alternate to every existing de/en `<url>` block too (reciprocity), and give each zh `<url>` the full de/en/zh alternate set.

- [ ] **Step 3: Add zh to llms catalogs.** In `llms.txt` and `llms-full.txt`, wherever the EN blog posts are listed, add the zh equivalents (title + `/blog/posts/zh/<file>` URL). Match the existing formatting exactly.

```bash
grep -n "blog/posts/en\|blog/en" llms.txt llms-full.txt | head
```

- [ ] **Step 4: Validate sitemap XML well-formedness.**

```bash
python3 -c "import xml.dom.minidom,sys; xml.dom.minidom.parse('sitemap.xml'); print('sitemap.xml is well-formed')"
```

Expected: `sitemap.xml is well-formed`.

- [ ] **Step 5: Commit**

```bash
git add sitemap.xml llms.txt llms-full.txt
git commit -m "seo: add Chinese (zh) blog URLs to sitemap + llms catalogs; Phase B complete

<trailer>"
```

---

## PHASE C — Translate the 16 article bodies

After Phase C: every zh post body is Chinese. Done as **1 sample first (user approves style)**, then the remaining 15 via parallel subagents, then a verification sweep.

---

### Task C1: Translate ONE sample post body (quality gate)

**Files:**
- Modify: `blog/posts/zh/agent-memory-poisoning-mem0.html` (replace EN body with zh translation; keep the zh `<head>` from B2)

**Interfaces:** establishes the translation register/style the other 15 follow.

- [ ] **Step 1: Translate the article body** of `blog/posts/zh/agent-memory-poisoning-mem0.html` from the EN source into Simplified Chinese. Rules:
  - Translate prose, headings, captions, alt text, blockquotes, list items, table cells.
  - **Do NOT translate:** code blocks (`<pre>`/`<code>` contents), CLI commands, API/product names, model IDs, URLs, `class`/`id`/`data-*` attribute values, D3/script contents.
  - Keep all HTML structure, tags, and attributes byte-for-byte except the human-readable text nodes.
  - Preserve the terminal/opinionated register of the original (this is a technical field-note blog, not marketing).
  - Keep any `data-i18n` attributes intact.

- [ ] **Step 2: Verify.** Open `http://localhost:8000/blog/posts/zh/agent-memory-poisoning-mem0.html`:
  - Body is Chinese; code blocks unchanged; layout intact (no broken tags).
  - D3/interactive visualizations (if any) still render.
  - `<html lang="zh">`, title Chinese, related-cards Chinese.

- [ ] **Step 3: STOP — user review gate.** Present the rendered Chinese post to the user for a quality/style check before translating the other 15. Do not proceed to C2 until approved.

- [ ] **Step 4: Commit**

```bash
git add blog/posts/zh/agent-memory-poisoning-mem0.html
git commit -m "blog(zh): translate sample post body (agent-memory-poisoning-mem0)

<trailer>"
```

---

### Task C2: Translate the remaining 15 article bodies

**Files:**
- Modify: the other 15 `blog/posts/zh/*.html` bodies

**Interfaces:** consumes the approved C1 style.

- [ ] **Step 1: Translate each remaining zh post body** using the C1 rules and the approved register. **Dispatch one subagent per post** (15 parallel) — each translates exactly one file's body from its EN source, preserving code/structure. Give each subagent the C1 rule list verbatim and the single target file.

- [ ] **Step 2: Verify each.** For each file confirm: body Chinese, code blocks intact, HTML well-formed, page renders. Spot-check all 15 in the browser (or automate a smoke check that each page loads without console errors and `<html lang="zh">` is present).

```bash
# Quick structural smoke test: every zh post has lang=zh and non-trivial body
for f in blog/posts/zh/*.html; do
  grep -q 'lang="zh"' "$f" && echo "OK lang  $(basename $f)" || echo "MISSING lang  $(basename $f)"
done
```

- [ ] **Step 3: Commit** (one commit, or per-post — per-post is cleaner for review)

```bash
git add blog/posts/zh/
git commit -m "blog(zh): translate remaining 15 article bodies to Chinese

<trailer>"
```

---

### Task C3: Final trilingual verification sweep + wiki/docs update

**Files:**
- Modify: `wiki/entities/i18n-system.md`, `wiki/entities/blog-system.md`, `wiki/index.md`, `wiki/log.md` (reflect the third language)
- Modify: `MARKETING.md` (note the zh expansion if it tracks languages/URLs)
- Modify: `/Users/wuesteon/PROJECTS/website/CLAUDE.md` and root `/Users/wuesteon/PROJECTS/CLAUDE.md` (i18n now DE/EN/ZH)

**Interfaces:** none; documentation + final QA.

- [ ] **Step 1: End-to-end browser sweep** in all three languages:
  - Homepage, blog index, 3 blog posts × {de, en, zh}: switch each way, confirm correct redirects, no console errors, no German leaking into zh, no English leaking into zh (except deliberate untranslated fallbacks, of which there should now be none).
  - hreflang reciprocity across all trees:
  ```bash
  for L in de en zh; do for f in blog/posts/$L/*.html; do n=$(grep -c hreflang "$f"); [ "$n" -lt 4 ] && echo "LOW hreflang ($n): $f"; done; done; echo "hreflang audit done"
  ```
  Expected: no `LOW hreflang` lines.

- [ ] **Step 2: Update the wiki.** Per the wiki `CLAUDE.md` Lint/Ingest workflow: update `[[i18n-system]]` and `[[blog-system]]` to describe three languages (zh dictionary, three-way switcher, `/blog/posts/zh/` tree reusing EN slugs, EN fallback rule), bump `updated:` dates, and append a `wiki/log.md` entry.

- [ ] **Step 3: Update CLAUDE.md files.** In `website/CLAUDE.md` change i18n mentions from DE/EN to DE/EN/ZH and document the `/blog/posts/zh/` tree + EN-fallback rule. In root `PROJECTS/CLAUDE.md`, update the website entry's i18n note.

- [ ] **Step 4: Commit**

```bash
git add wiki/ MARKETING.md CLAUDE.md ../CLAUDE.md
git commit -m "docs: record Chinese (中文) as third site language across wiki + CLAUDE.md

<trailer>"
```

- [ ] **Step 5: Push** (only when the user asks) — `git push origin main`.

---

## Self-Review

**Spec coverage:**
- Language model / EN fallback → A1 (getTranslation), A4 (site.js), A6 (extras.js). ✓
- Three-way switcher → A3 (nav/main/drawer) + A2 (active-state). ✓
- `translations.js` zh block + routing + slugMap → A1, A2. ✓
- JS-rendered POSTS + scan tool → A5, A6. ✓
- Blog HTML (index + 16 posts, lang/title/meta/canonical/hreflang) → B1, B2, B3. ✓
- Reciprocal hreflang on existing DE/EN → B2, B3. ✓
- SEO layer (sitemap, llms) → B4. ✓
- Article prose (sample-first then rest) → C1, C2. ✓
- Testing/verification → browser-driven steps in every task + C3 sweep. ✓
- Out-of-scope (legal-page bodies, backend zh, auto-detect) → respected (not touched). ✓

**Placeholder scan:** No TBD/TODO. The "EN body as placeholder" in Phase B is an explicit, defined phased state, replaced in Phase C. All code steps show actual code. ✓

**Type/name consistency:** `data-lang` attribute used consistently in A3 (nav, main handler, drawer). `mapSlug(file, from, to)` defined in A2 Step 2b and used in A2 Step 3. `POOL_ZH`/`pool()`/`label()`/`verdictText()`/`scanLines()`/`softMessage()` names match `js/extras.js` originals. `p[lang] || p.en` fallback consistent (A4). Indicator classes `.lang-zh-indicator` / `#lang-zh` consistent across A2, A3. ✓
