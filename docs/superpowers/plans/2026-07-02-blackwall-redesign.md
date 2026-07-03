# Blackwall Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the finished "Blackwall" cyberpunk-red design onto the live waiser.dev static site, preserving DE/EN i18n, all 32 real blog posts + URLs + SEO, self-hosted assets, legal pages, Umami analytics, SEO files, and hidden sections.

**Architecture:** Static HTML/CSS/JS, no build runtime. New design system in `css/tokens.css` + `css/blackwall.css` replaces `styles.css`/`tailwind.css` on shipped pages. Behavior in `js/site.js` + `js/extras.js`; i18n via the existing `js/translations.js` engine (extended); nav/footer via reworked `js/components.js` (Blackwall markup, keeps basePath/active-page/toggle/black-hole logic). GSAP + fonts self-hosted.

**Tech Stack:** HTML5, CSS custom properties, vanilla JS, GSAP 3.12.5 + ScrollTrigger (vendored), self-hosted woff2 fonts (Chakra Petch / Space Grotesk / Space Mono), Umami analytics.

## Global Constraints

- **Source of truth:** `~/Downloads/waiser-site/` mockup. Copy its CSS/JS/markup faithfully.
- **Brand:** red `#ff2a3c` core, `#ff5a68` hot, cyan `#2ae0ff` glitch channel, bg `#050507`.
- **Fonts:** Chakra Petch (display/wordmark), Space Grotesk (body), Space Mono (labels/code). Self-hosted woff2 only. NO `fonts.googleapis.com` / `fonts.gstatic.com`.
- **GSAP:** vendored in `js/vendor/`. NO `cdn.jsdelivr.net`.
- **i18n:** every translatable text node carries `data-i18n`; both DE + EN strings exist in `translations.js`; toggle re-renders JS content and updates `<html lang>`.
- **Blog URLs:** unchanged — `blog/posts/{de,en}/{slug}.html`. NO `?id=` engine.
- **Per-post SEO:** preserve `<title>`, meta description, canonical, hreflang de/en/x-default, BlogPosting + BreadcrumbList JSON-LD, OG/Twitter on every restyled post.
- **Content:** blog/legal prose preserved verbatim — only markup/styling changes.
- **Third-party requests:** zero after migration except Umami (`cloud.umami.is`, website-id `d04784b7-9e58-43ad-b71b-73328369d474`).
- **Verification:** static site — "tests" are browser checks (Chrome MCP or `python3 -m http.server`), grep assertions, and content diffs. No unit-test harness.
- **Commit trailers:** end each commit with the Co-Authored-By + Claude-Session lines used in this repo.
- **Reduced motion & a11y:** preserve mockup's `prefers-reduced-motion` handling and aria attributes.

---

## Task 1: Foundation — tokens, styles, fonts, GSAP, assets

**Files:**
- Create: `css/tokens.css` (from mockup `assets/tokens.css` + `@font-face`)
- Create: `css/blackwall.css` (from mockup `assets/blackwall.css`)
- Create: `js/vendor/gsap.min.js`, `js/vendor/ScrollTrigger.min.js`
- Create: `fonts/ChakraPetch-*.woff2` (400/500/600/700), `fonts/SpaceGrotesk-*.woff2` (400/500/700), `fonts/SpaceMono-*.woff2` (400/700)
- Create: `favicon.svg` (from mockup), `logos/bit.svg`, `logos/primeo.svg`
- Modify: `og-default.png` (overwrite with mockup `assets/og-image.png`)

**Interfaces:**
- Produces: token vars (`--red`, `--hot`, `--ice`, `--bg`, `--line`, `--mut`, full ramp) and all `.mh__* .btn .scard .tcard .breach__* .az-* .art-* .nav .foot` component classes; `window.gsap`, `window.ScrollTrigger`; `@font-face` families "Chakra Petch"/"Space Grotesk"/"Space Mono".

- [ ] **Step 1: Copy CSS from mockup**

```bash
cp ~/Downloads/waiser-site/assets/tokens.css css/tokens.css
cp ~/Downloads/waiser-site/assets/blackwall.css css/blackwall.css
```

- [ ] **Step 2: Vendor GSAP locally (download release files)**

```bash
mkdir -p js/vendor
curl -fsSL https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js -o js/vendor/gsap.min.js
curl -fsSL https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js -o js/vendor/ScrollTrigger.min.js
head -c 80 js/vendor/gsap.min.js   # sanity: should be minified JS, not HTML/error
```
Expected: minified JS header (e.g. `/*! ... GSAP 3.12.5 ...`). If curl is blocked, download via a subagent/browser and place the files.

- [ ] **Step 3: Download + convert the 3 Google fonts to woff2**

Download the TTF families (Chakra Petch, Space Grotesk, Space Mono) from Google Fonts (github.com/google/fonts or fonts.google.com), then convert each weight to woff2 with fonttools+brotli (matches existing repo convention):

```bash
pip install fonttools brotli 2>/dev/null || true
# For each downloaded TTF at $SRC producing $DST:
python3 - <<'PY'
from fontTools.ttLib import TTFont
import glob, os
jobs = {
  # src glob : (dst basename)  -- fill with actual downloaded paths
}
for src, dst in jobs.items():
    f = TTFont(src); f.flavor = "woff2"; f.save(dst); print("wrote", dst)
PY
ls -la fonts/ChakraPetch-*.woff2 fonts/SpaceGrotesk-*.woff2 fonts/SpaceMono-*.woff2
```
Expected: 9 woff2 files (4 Chakra + 3 Grotesk + 2 Mono). Weights: ChakraPetch 400/500/600/700, SpaceGrotesk 400/500/700, SpaceMono 400/700.

- [ ] **Step 4: Add @font-face rules to tokens.css**

Prepend to `css/tokens.css` (before `:root`), woff2-only, `font-display:swap`:

```css
/* Self-hosted fonts (no Google CDN) */
@font-face{font-family:"Chakra Petch";font-weight:400;font-style:normal;font-display:swap;src:url("../fonts/ChakraPetch-Regular.woff2") format("woff2");}
@font-face{font-family:"Chakra Petch";font-weight:500;font-style:normal;font-display:swap;src:url("../fonts/ChakraPetch-Medium.woff2") format("woff2");}
@font-face{font-family:"Chakra Petch";font-weight:600;font-style:normal;font-display:swap;src:url("../fonts/ChakraPetch-SemiBold.woff2") format("woff2");}
@font-face{font-family:"Chakra Petch";font-weight:700;font-style:normal;font-display:swap;src:url("../fonts/ChakraPetch-Bold.woff2") format("woff2");}
@font-face{font-family:"Space Grotesk";font-weight:400;font-style:normal;font-display:swap;src:url("../fonts/SpaceGrotesk-Regular.woff2") format("woff2");}
@font-face{font-family:"Space Grotesk";font-weight:500;font-style:normal;font-display:swap;src:url("../fonts/SpaceGrotesk-Medium.woff2") format("woff2");}
@font-face{font-family:"Space Grotesk";font-weight:700;font-style:normal;font-display:swap;src:url("../fonts/SpaceGrotesk-Bold.woff2") format("woff2");}
@font-face{font-family:"Space Mono";font-weight:400;font-style:normal;font-display:swap;src:url("../fonts/SpaceMono-Regular.woff2") format("woff2");}
@font-face{font-family:"Space Mono";font-weight:700;font-style:normal;font-display:swap;src:url("../fonts/SpaceMono-Bold.woff2") format("woff2");}
```
Note: post files live 3 levels deep, so they'll need a relative path shim OR use root-absolute `/fonts/...`. Decision: use **root-absolute** `url("/fonts/...")` so one rule works from every depth. Update the paths above to `/fonts/...`.

- [ ] **Step 5: Copy remaining assets**

```bash
cp ~/Downloads/waiser-site/favicon.svg favicon.svg
cp ~/Downloads/waiser-site/logos/bit.svg logos/bit.svg
cp ~/Downloads/waiser-site/logos/primeo.svg logos/primeo.svg
cp ~/Downloads/waiser-site/assets/og-image.png og-default.png
```

- [ ] **Step 6: Verify foundation**

```bash
grep -c "@font-face" css/tokens.css        # expect 9
grep -c "fonts.googleapis\|jsdelivr" css/*.css   # expect 0
ls js/vendor/*.js fonts/*.woff2 favicon.svg logos/bit.svg logos/primeo.svg
```
Expected: 9 font-faces, 0 CDN refs, all files present.

- [ ] **Step 7: Commit**

```bash
git add css/tokens.css css/blackwall.css js/vendor fonts favicon.svg logos/bit.svg logos/primeo.svg og-default.png
git commit -m "feat: add Blackwall design system foundation (tokens, css, self-hosted fonts + GSAP)"
```

---

## Task 2: i18n strings + Blackwall nav/footer components

**Files:**
- Modify: `js/translations.js` (add all Blackwall keys, DE+EN)
- Modify: `js/components.js` (Blackwall nav + footer markup; keep basePath/active/toggle/black-hole logic)

**Interfaces:**
- Consumes: token/component classes from Task 1 (`.nav .brand .wm .btn--pri .foot`, mobile `.nav__burger`/`.mnav` from blackwall.css).
- Produces: `getHeader()`/`getFooter()` emitting Blackwall markup with `#lang-toggle`/`#lang-toggle-mobile` preserved; new i18n keys consumed by Tasks 3–6.

- [ ] **Step 1: Extend translations.js with Blackwall keys**

Add DE+EN pairs for: `nav.freeScan nav.services nav.blog nav.contact nav.cta` · hero `hero.eyebrow hero.kinetic.acts hero.kinetic.defends hero.kinetic.scales hero.kinetic.ships hero.sub hero.cta1 hero.cta2 hero.proof` · scan `scan.kicker scan.title scan.sub scan.placeholder scan.run scan.hint scan.verdict.*` · services `svc.kicker svc.title svc.1.title svc.1.desc svc.2.title svc.2.desc svc.3.title svc.3.desc svc.1.cta svc.2.cta svc.3.cta` · stats `stats.1 stats.2 stats.3 stats.4` · clients `clients.label` · breach `breach.kicker breach.title breach.intro breach.result.title breach.result.body` · feed `feed.kicker feed.title feed.all` · contact `contact.kicker contact.title contact.send` · cta `cta.title cta.sub cta.btn` · footer `footer.status footer.rights` · blog `blog.hero.kicker blog.hero.title blog.hero.sub blog.cta.*` · 404 `nf.*`. Use the exact English copy from the mockup; author natural German for each (e.g. `hero.eyebrow` EN "Make your agents" / DE "Mach deine Agenten"; cta.title EN "Make your agents wiser." / DE "Mach deine Agenten klüger.").

- [ ] **Step 2: Rework getHeader() to Blackwall markup**

Replace the `<header>` template with the mockup's `.nav` structure — brand (`w<span class="ai">AI</span>ser<span class="tld">.dev</span>`), `.links` with `data-i18n` anchors + `.btn--pri.nav-cta` + the existing `#lang-toggle` block (keep its exact IDs/classes so main.js toggle wiring still binds). Keep `basePath`/`useAnchorLinks`/`isEnglishBlog`/`blogLink` logic. Mobile drawer is built by site.js from `.links` (mockup pattern) — so the inline `#mobile-menu` block can be removed in favor of site.js's `.mnav`. Keep `#lang-toggle-mobile` reachable: site.js clones links; ensure the toggle is added to the drawer (extend the clone loop to also clone the toggle, or append a toggle in the drawer).

- [ ] **Step 3: Rework getFooter() to Blackwall markup**

Replace with `.foot` structure: `.wm` wordmark + `Nils Weiser`, `.foot__links` (Blog / Services / Impressum / Datenschutz / Email), `© <year> · Bodenseeraum · Schweiz`. Keep `#currentYear`, the GitHub + LinkedIn socials, the `#black-hole-trigger` "Don't click me" button (preserve the easter-egg), and `impressum.html`/`datenschutz.html` links with `basePath`.

- [ ] **Step 4: Keep the DOMContentLoaded init + black-hole loader intact**

Leave `detectBasePath`/`detectActivePage`/`isHomePage`/`loadBlackHoleEffect` and the init block unchanged except that `header-placeholder`/`footer-placeholder` now inject Blackwall markup. Confirm the black-hole effect still loads on non-easter-egg pages.

- [ ] **Step 5: Verify**

```bash
node -e "require('./js/translations.js')" 2>&1 | head   # no syntax error (or open in browser console)
grep -c "lang-toggle" js/components.js         # >=1 (toggle preserved)
grep -c "black-hole-trigger" js/components.js  # 1 (easter-egg preserved)
grep -c "btn--pri" js/components.js            # nav CTA present
```
Expected: no JS syntax errors; toggle + easter-egg + CTA present.

- [ ] **Step 6: Commit**

```bash
git add js/translations.js js/components.js
git commit -m "feat: Blackwall nav/footer components + full DE/EN i18n strings"
```

---

## Task 3: Homepage (index.html) — full Blackwall port

**Files:**
- Modify: `index.html` (replace body with Blackwall Momentum layout; keep head SEO/analytics)
- Create: `js/site.js` (from mockup `assets/site.js`, POSTS wired to real posts + i18n)
- Create: `js/extras.js` (from mockup `assets/extras.js`, bilingual scan)
- Modify: `js/main.js` (fold/trim to what's still needed: toggle wiring, back-to-top, smooth scroll)

**Interfaces:**
- Consumes: Task 1 CSS/fonts/GSAP, Task 2 components + i18n keys.
- Produces: `POSTS` array (global, each `{id,cat,href,de:{title,excerpt,date,read},en:{...}}`), `tcardHTML(p)`, `attachTilt()` for Tasks 4/5; `getCurrentLang()` integration.

- [ ] **Step 1: Port site.js with real-post POSTS**

Copy mockup `assets/site.js`. Replace `POSTS` with the 16 real posts. Each entry: `id` (slug), `cat`, `href` computed per language (`blog/posts/de/<de-slug>.html` / `blog/posts/en/<en-slug>.html`), and localized `title`/`excerpt`/`date`/`read`. Rewrite `tcardHTML(p)` to read the active language via `getCurrentLang()` and link to `p.href[lang]`. On language change, re-render `#home-feed` and `#blog-list`.

- [ ] **Step 2: Port extras.js (bilingual scan + hero terminal)**

Copy mockup `assets/extras.js`. Localize the scan console lines, POOL agent titles/descriptions, verdicts, hint via `getTranslation()` keys. Keep the deterministic simulation + `// BACKEND HOOK` comment.

- [ ] **Step 3: Replace index.html body with Blackwall Momentum layout**

Use the mockup `index.html` `<main>` (hero → scan → value rows → stats → clients → breach → feed → contact → cta → footer) and its inline `<style>` block. Add `data-i18n` to every text node. Replace hardcoded nav/footer with `<div id="header-placeholder">`/`<div id="footer-placeholder">` (components.js injects). Reference `css/tokens.css`+`css/blackwall.css`, `js/vendor/gsap.min.js`+`ScrollTrigger.min.js`, `js/translations.js`,`js/components.js`,`js/main.js`,`js/site.js`,`js/extras.js`.

- [ ] **Step 4: Restore head SEO + analytics + preloads**

Keep in `<head>`: Umami script, `<title>`/description (AI Agent Specialist positioning), canonical, `hreflang x-default`, OG/Twitter, Person+WebSite JSON-LD, `theme-color #050507`, favicon.svg. Add font preloads: ChakraPetch-Bold, SpaceGrotesk-Regular, SpaceMono-Regular (woff2, crossorigin).

- [ ] **Step 5: Verify homepage in browser**

Serve (`python3 -m http.server 8000` from worktree root) and load `http://localhost:8000/` in Chrome MCP. Check: hero renders with red wordmark + rotating headline; scan tool runs and shows 3 agents; services/stats/clients/breach/feed/contact render; DE/EN toggle flips all copy including JS feed; mobile drawer works; no console errors; no network requests to googleapis/jsdelivr.

```bash
grep -c "googleapis\|jsdelivr" index.html    # expect 0
grep -c "umami" index.html                   # expect 1
grep -c "data-i18n" index.html               # many
```

- [ ] **Step 6: Commit**

```bash
git add index.html js/site.js js/extras.js js/main.js
git commit -m "feat: Blackwall homepage with bilingual scan tool + real-post feed"
```

---

## Task 4: Blog listings (blog/index.html DE + blog/en/index.html EN)

**Files:**
- Modify: `blog/index.html` (Blackwall blog-hero + filter chips + `#blog-list` grid, DE)
- Modify: `blog/en/index.html` (same, EN)

**Interfaces:**
- Consumes: Task 3 `POSTS`, `tcardHTML`, filter chips; Task 2 components + i18n.
- Produces: working DE/EN listings linking to real posts.

- [ ] **Step 1: Rebuild blog/index.html (DE)**

Use mockup `blog.html` structure: blog-hero (`data-i18n` kicker/title/sub), filter chips (ALL + categories present in POSTS), `<div class="feed__grid" id="blog-list">`, end CTA, footer placeholder. Reference `../css/...`, `../js/...`. site.js renders `#blog-list` from POSTS (DE) and wires chips.

- [ ] **Step 2: Rebuild blog/en/index.html (EN)**

Same, `../../css/...`,`../../js/...`; renders EN. `isEnglishBlog` in components.js routes nav Blog link correctly. The toggle swaps between `/blog/` and `/blog/en/`.

- [ ] **Step 3: Preserve head SEO**

Keep each index's canonical, hreflang de/en/x-default, OG/Twitter, description, Umami.

- [ ] **Step 4: Verify**

Load `/blog/` and `/blog/en/` in browser: cards render from real POSTS, link to real post files (200, not 404), chips filter, toggle swaps language + list, no CDN requests.

- [ ] **Step 5: Commit**

```bash
git add blog/index.html blog/en/index.html
git commit -m "feat: Blackwall blog listings (DE/EN) wired to real posts"
```

---

## Task 5: Restyle all 32 blog posts into Blackwall article layout

**Files:**
- Modify: `blog/posts/de/*.html` (16), `blog/posts/en/*.html` (16)
- Possibly modify: `css/blackwall.css` (add `.art-*` variants for custom post components)

**Interfaces:**
- Consumes: Task 1 CSS, Task 2 components. Uses the mockup `.art-hero/.art-body/.art-callout/.art-share/.art-more` styles + code-block chrome.
- Produces: 32 restyled posts, URLs + SEO + content preserved.

**Execution note:** homogeneous + independent → run via a Workflow (one agent per post, worktree-isolated not needed since distinct files; parallel with concurrency cap). Each agent gets the mockup article CSS reference + the per-post hard requirements. A verify stage content-diffs each post.

- [ ] **Step 1: Add any missing `.art-*` component variants to blackwall.css**

Inspect the custom classes used across posts (`attack-box .result-card .experiment-card .pill-trust .pill-refuse .pill-rounds .warning-box .defense-box .results-table .source-list .code-block .blog-tag`). For each not covered by mockup CSS, add a Blackwall-styled rule (dark surface `rgba(13,14,19,.6)`, red accent border/label, mono labels) to `blackwall.css`. Keep class names so post markup needs minimal change.

- [ ] **Step 2: Restyle one reference post by hand (agent-memory-poisoning-mem0, DE + EN)**

Convert head to reference `../../../css/tokens.css`+`blackwall.css` (drop tailwind/styles), keep ALL SEO (title/desc/canonical/hreflang/JSON-LD/OG). Convert body wrapper to `.art-hero`+`.art-body` etc., map custom blocks to the Blackwall variants, keep header/footer placeholders + script includes (translations/components/main/site as needed). **Preserve every word of prose.** This becomes the template pattern for the workflow.

- [ ] **Step 3: Diff-verify the reference post**

Extract visible text before/after (strip tags) and diff — must be identical modulo whitespace. Load in browser: renders in Blackwall, links back to blog work, JSON-LD intact (`grep BlogPosting`).

- [ ] **Step 4: Run the restyle workflow over the remaining 30 posts**

Dispatch a Workflow: for each remaining post file, an agent applies the same transform (using the reference post as the pattern), preserving content + SEO + URL. Then a verify stage per post: text-diff (content unchanged), grep asserts (`BlogPosting`, `hreflang`, `tokens.css`, no `tailwind.css`/`googleapis`).

- [ ] **Step 5: Full-suite verification**

```bash
for f in blog/posts/de/*.html blog/posts/en/*.html; do
  grep -q "tokens.css" "$f" || echo "MISSING tokens: $f"
  grep -q "BlogPosting" "$f" || echo "MISSING jsonld: $f"
  grep -q "tailwind.css\|fonts.googleapis" "$f" && echo "STALE ref: $f"
done
echo "checked 32 posts"
```
Expected: no MISSING/STALE lines.

- [ ] **Step 6: Commit**

```bash
git add blog/posts css/blackwall.css
git commit -m "feat: restyle all 32 blog posts into Blackwall article layout (content + SEO preserved)"
```

---

## Task 6: Legal pages + 404

**Files:**
- Modify: `datenschutz.html`, `impressum.html` (Blackwall restyle, German body verbatim)
- Modify: `404.html` (Blackwall, from mockup)

**Interfaces:**
- Consumes: Task 1 CSS, Task 2 components.

- [ ] **Step 1: Restyle datenschutz.html + impressum.html**

Head → tokens.css+blackwall.css; body → `.art-body`-style prose container on dark bg; keep header/footer placeholders (inherit Blackwall nav/footer + toggle). Preserve all legal text verbatim. Keep Umami + canonical.

- [ ] **Step 2: Rebuild 404.html from mockup**

Copy mockup `404.html`, self-host assets, header/footer via placeholders, add DE/EN `data-i18n`, keep `noindex`.

- [ ] **Step 3: Verify**

Load `/impressum.html`, `/datenschutz.html`, `/404.html` in browser: Blackwall styling, nav/footer present, legal text intact, no CDN requests.

- [ ] **Step 4: Commit**

```bash
git add datenschutz.html impressum.html 404.html
git commit -m "feat: restyle legal pages + 404 into Blackwall"
```

---

## Task 7: SEO / meta sweep

**Files:**
- Modify: `sitemap.xml` (real post URLs DE+EN, indexes, legal)
- Modify: `llms.txt`, `llms-full.txt` (positioning/URLs)
- Verify: `robots.txt`, `CNAME` (unchanged)

**Interfaces:** Consumes final URL set from Tasks 3–6.

- [ ] **Step 1: Regenerate sitemap.xml**

List `/`, `/blog/`, `/blog/en/`, all 32 post URLs (both languages), `/impressum.html`, `/datenschutz.html`. NOT `?id=` URLs. Correct `<lastmod>`/`<changefreq>`/`<priority>`.

- [ ] **Step 2: Update llms.txt / llms-full.txt**

Refresh site description + section list to the new positioning + real URLs.

- [ ] **Step 3: Verify**

```bash
grep -c "article.html?id" sitemap.xml   # expect 0
grep -c "posts/de\|posts/en" sitemap.xml  # 32
xmllint --noout sitemap.xml && echo "valid xml"   # if xmllint present
cat robots.txt CNAME
```

- [ ] **Step 4: Commit**

```bash
git add sitemap.xml llms.txt llms-full.txt
git commit -m "feat: update sitemap + llms.txt for Blackwall site"
```

---

## Task 8: Final verification + finish branch

**Files:** none (verification), then integration.

- [ ] **Step 1: Zero third-party asset requests**

```bash
grep -rl "fonts.googleapis\|fonts.gstatic\|cdn.jsdelivr\|d3js.org" *.html blog css js 2>/dev/null
```
Expected: no matches (Umami is JS-loaded intentionally; d3 only if a post used it — convert to local or keep only where essential and note it).

- [ ] **Step 2: Link + asset integrity**

Serve locally; crawl main pages + a sample of posts (DE+EN) in Chrome MCP: 0 console errors, 0 404s for assets, favicon loads, fonts load (Network shows woff2 200s), toggle works everywhere, mobile drawer works, reduced-motion respected (emulate).

- [ ] **Step 3: Content parity spot-check**

For 3 random posts (DE+EN), confirm restyled visible text == original visible text (diff).

- [ ] **Step 4: Hidden sections reachable**

Load `/easter-egg/`, trigger black-hole via footer "Don't click me", check `/skills/`, `/research/` still resolve.

- [ ] **Step 5: Finish the branch**

Invoke superpowers:finishing-a-development-branch to choose merge/PR. Present summary + diff stat.

---

## Self-review notes

- **Spec coverage:** design-system (T1), fonts/GSAP self-host (T1), i18n (T2), components/nav/footer+black-hole (T2), homepage+scan+analytics+JSON-LD (T3), blog listings DE/EN (T4), 32 posts restyle+SEO preserve (T5), legal+404 (T6), sitemap/llms (T7), verify+finish (T8), hidden sections (T8 step 4). All spec sections mapped.
- **No `?id=` engine, no new posts, no backend** — honored (YAGNI).
- **Fonts path:** root-absolute `/fonts/...` in @font-face so one rule serves all directory depths (posts are 3 deep).
- **OG image:** overwrite `og-default.png` — no repath needed.
