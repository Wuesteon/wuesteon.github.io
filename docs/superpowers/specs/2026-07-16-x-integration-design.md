# X (Twitter) Integration — Design

**Date:** 2026-07-16
**Status:** Approved (brainstorm 2026-07-16)

## Goal

Add X as a secondary marketing channel for wAIser.dev: distribution for the
English blog content into the global AI-agents/AI-security community, plus a
GEO entity signal (profile corroborating "Nils Weiser = AI agent security
specialist" for AI search engines). LinkedIn stays the primary channel (DACH
leads). Instagram is explicitly out of scope (wrong audience, wrong format,
decided against 2026-07-16).

## Decisions (locked)

| Question | Decision |
|---|---|
| Account identity | **Personal account** (Nils' name), wAIser.dev branding in bio + link. No brand account. |
| Language | **English only.** DACH/German audience is served by LinkedIn. |
| Content workflow | **Scheduled Claude Cowork routine, draft-only.** No X API, no auto-posting. |
| Rollout | **Phased:** wiring → seed content → routine. |
| Draft storage | **Local-only, gitignored.** The repo is the GitHub-Pages site; committed drafts would be publicly served under `waiser.dev/docs/...`. `docs/marketing/linkedin/` and `docs/marketing/x/` are gitignored (2026-07-16). `docs/marketing/seo-reports/` stays tracked — the 2026-07-06 report is already committed/public. |

## Phase 1 — Account + site wiring

### Account setup (manual, Nils, ~15 min)

- Create personal X account. Handle preference: `@nilsweiser` → `@nweiser` →
  fallback `@wuesteon` (matches GitHub).
- Profile photo: same as LinkedIn (cross-platform entity consistency).
- Location: "Bodensee · Schweiz". Website: `https://waiser.dev`.
- Bio (English), along the lines of:
  *"AI Agent Specialist & AI Security · I build autonomous agents — and break
  them before attackers do · Make your agents wAIser → waiser.dev"*
- Header image in Blackwall style (generate from existing OG assets; optional
  at launch).

### Site wiring (one commit, after the handle exists)

All changes take the final handle; no placeholders get committed.

1. **`index.html` Person schema** — add `sameAs` to the `Person` node
   (`#person`), which currently has none:
   `["https://github.com/Wuesteon", "https://www.linkedin.com/in/nils-w-42b6a5213/", "https://x.com/<handle>"]`.
   This is the main GEO win and also fixes the existing GitHub/LinkedIn gap.
2. **`index.html` Twitter-card meta** — add `twitter:site` and
   `twitter:creator` (`@<handle>`) next to the existing `twitter:card` block.
3. **Blog posts** — add `twitter:creator` wherever a post already carries
   Twitter-card meta (check during implementation; DE/EN/zh trees).
4. **`js/components.js` footer** — add the X link next to GitHub/LinkedIn
   (`aria-label="X"`, `rel="noopener noreferrer"`); injected on every page, so
   one edit covers the site.
5. **`MARKETING.md`** — fill the empty "Social / Channels" section:
   LinkedIn (primary, DACH leads), X (secondary, EN reach + GEO entity
   signal), GitHub. Document the `x-draft-queue` routine (Phase 3) and the
   local-only draft-folder convention.

## Phase 2 — Seed content (one-off)

Draft 3 English threads locally into `docs/marketing/x/` (untracked),
mirroring the `docs/marketing/linkedin/` working-folder pattern:

- **Agent memory poisoning via Mem0** (flagship; reuse
  `agent-poisoning-linkedin.png`).
- **GEO snake-oil** article.
- One more from the security pillar (e.g. Claude finding zero-days).

Format per thread: hook-first, 5–8 tweets, ≤280 chars each, blog link in the
final tweet or first reply, image suggestion noted. Nils posts them over the
first 1–2 weeks while following 30–50 AI-security/agents accounts and
replying occasionally, so the account is warm before automation starts.

## Phase 3 — Cowork routine `x-draft-queue`

- **Schedule:** weekly (e.g. Tuesday morning), same pattern as the existing
  `blog-compact-index` routine.
- **Input:** the public site (blog posts via `llms.txt` / `POSTS` array) and
  recent repo activity.
- **Output:** 2–4 English draft items per run — one thread + 2–3 standalone
  takes, each 280-char-checked, with an image suggestion where one exists.
- **Delivery:** in the routine's completion message/notification — **not**
  committed to the repo (drafts folder is gitignored, and a cloud clone can't
  see it anyway). Nils reviews from the notification and posts manually
  (~2 min); optionally archives posted drafts to the local
  `docs/marketing/x/posted/` folder.
- **No X API**, no cost, nothing unreviewed goes live. Auto-publishing can be
  revisited if the channel proves itself (requires paid API Basic tier).

## Measurement (deliberately light)

No KPI apparatus. Umami already captures `t.co` referrers; add a one-line
monthly note in `MARKETING.md` ("check X referrals + which threads drove
them"). Revisit only if the channel shows traction.

## Non-goals

- No Instagram account.
- No brand account (`@waiserdev` not registered).
- No auto-posting / X API integration.
- No German-language posting on X.
- No follower KPIs, engagement dashboards, or content calendar tooling.

## Order of execution

1. `.gitignore` draft folders (done 2026-07-16, this commit).
2. Nils creates the account → reports the handle.
3. Site wiring commit (schema `sameAs`, meta, footer, MARKETING.md).
4. Seed threads drafted locally → posted manually over 1–2 weeks.
5. Create the `x-draft-queue` Cowork routine.
