# Blog Post: "MIT löst KI-Halluzinationen?" — Design Spec

**Date:** 2026-04-30
**Author:** Nils Weiser (with Claude)
**Status:** Approved (pending written review)

## Goal

Publish a bilingual (DE primary, EN translation) blog post on waiser.dev that rides the momentum of the recent viral CLAUDE.md LinkedIn post. The post explains what the MIT paper "Beyond Binary Rewards: Training LMs to Reason about Their Uncertainty" (Damani et al., arXiv:2507.16806v1, July 2025) actually shows — using a skeptical clickbait headline ("MIT löst KI-Halluzinationen?") that opens to a substantive practitioner-oriented analysis.

## Audience & angle

- **Audience:** German-speaking developers, AI builders, technical decision-makers — same audience that engaged with the Karpathy CLAUDE.md post.
- **Angle:** Hybrid skeptical/practical (option C from brainstorming). Provocative headline → honest "no, but here's what they actually showed and why it's still a big deal" → practitioner takeaways for what builders can do today.
- **Voice:** Same as the Karpathy CLAUDE.md post — confident, direct, technically grounded, skeptical of hype but generous with the underlying research.

## Length & format

- **Target length:** ~1500–2000 words (DE), matched in EN.
- **Structure:** 8 sections (see below).
- **Visual:** One inline SVG diagram, recreating Figure 2 from the paper (RLVR vs. RLCR reward landscapes). Static SVG, no D3.js needed. Cyan (`#22d3ee`) for the standard method, pink/magenta accent for "ours" (matches paper colors and existing site palette).

## Article structure

### 1. Hook (skeptical headline → honest answer)
- Lead with the headline question.
- One paragraph: No, hallucinations are not solved. But they showed something more interesting — that the way we currently train reasoning models *actively makes hallucinations worse*. And they have a fix for one specific class of the problem.
- Cite paper: Damani, Puri, Slocum, Shenfeld, Choshen, Kim, Andreas (MIT), "Beyond Binary Rewards: Training LMs to Reason about Their Uncertainty," arXiv:2507.16806v1, July 2025.

### 2. The mechanism every dev already feels
- Bridge to reader: you've all seen confidently wrong LLM output. Karpathy keeps pointing at the same patterns. The MIT paper finally explains *why* at the training level.
- Set up the core finding: binary correctness rewards (RLVR) — the standard for training reasoning models like o1, DeepSeek-R1, Qwen reasoning — reward guessing as much as knowing. Abstaining and being wrong get the same penalty. So models learn to bluff.
- Quote one sentence from the abstract about RL "degrading calibration and increasing the rate at which LMs hallucinate."

### 3. Visual: Why binary rewards train models to guess
- Inline SVG, two side-by-side plots:
  - Left (RLVR): flat lines at reward = 1 (correct, regardless of confidence) and reward = 0 (wrong, regardless of confidence).
  - Right (RLCR): curves where correct + high confidence is rewarded, correct + low confidence is partially rewarded, wrong + high confidence is heavily punished, wrong + low confidence is mildly punished.
- Caption: under RLVR, a confident wrong answer and a humble correct answer get identical reward. Under RLCR, the model is punished for confident-wrong and rewarded for calibrated.
- Style: matches existing `.d3-container` aesthetic but is plain SVG.

### 4. The fix: RLCR in one paragraph
- Reward function: R = correctness + Brier score → model outputs answer AND verbalized confidence q ∈ [0,1].
- Theorem 1 in plain language (one sentence, no math): provably maximizes both accuracy AND calibration, no tradeoff.
- Concrete output format example from the paper: `<think>...</think><answer>...</answer><analysis>...</analysis><confidence>0.3</confidence>`.

### 5. The numbers that matter
- HotpotQA: ECE 0.37 → 0.03 (12× better calibration), accuracy held at ~63% (62.1% RLCR vs 63.0% RLVR).
- Math (Big-Math, GSM8K, MATH500 average): ECE 0.26 → 0.10.
- The killer result: out-of-distribution, ordinary RLVR *worsens* calibration vs. the base model. RLCR is the only method that keeps calibration gains when transferred to new tasks.
- Bonus: confidence-weighted majority vote beats vanilla majority vote at test-time scaling.

### 6. So... did they solve hallucinations? (The honest part)
Three caveats, framed as "what this is and isn't":
- **What it solves:** calibration on tasks with verifiable answers (QA, math). Models trained this way know when they're guessing.
- **What it doesn't solve:** open-ended factual hallucinations in domains without ground truth. RL needs a correctness signal; "summarize my codebase" isn't a verifiable task.
- **Scale caveat:** Qwen2.5-7B base model. Whether the result holds at frontier scale is genuinely open.
- **The deeper point:** binary rewards are *actively harmful* for calibration. That's a finding the entire post-training field — including the labs shipping models you use today — needs to sit with.

### 7. What this means for builders today
Bridge back to the Karpathy/CLAUDE.md viral angle: research won't ship in your tools tomorrow. But the failure pattern it describes is one you can mitigate now:
- Force the model to verbalize confidence in your prompts (it won't be perfectly calibrated, but it surfaces uncertainty you can react to).
- For agent systems: route low-confidence outputs to verification steps or human review.
- Don't let single-shot answers settle critical decisions — use ensembling/self-consistency, which the paper shows benefits from confidence weighting.
- The CLAUDE.md "ask when ambiguous" rule from Karpathy is, in retrospect, a behavioral patch for exactly the failure mode this paper diagnoses at the training level.

### 8. Close
One-line punch: MIT hat Halluzinationen nicht gelöst. Sie haben gezeigt, dass die Art, wie wir Modelle trainieren, sie garantiert. Das ist größer.

## File structure

- `blog/posts/de/mit-ai-halluzinationen.html` — DE primary
- `blog/posts/en/mit-ai-hallucinations.html` — EN translation
- Update `blog/index.html` with a new card at the top of the grid (DE listing)
- Update `blog/en/index.html` with the matching English card at the top of its grid
- Inline SVG embedded directly in both HTML files (no separate asset)

**Slug rationale:** Different slugs per language match the existing pattern (`karpathy-claude-md.html` is identical across folders, but content with German-specific terms like "halluzinationen" works better with localized slugs). Will check existing pattern in implementation and match it — if other posts use identical slugs across `de/` and `en/`, we use `mit-ai-uncertainty.html` for both.

## SEO / meta

- **DE title:** "MIT löst KI-Halluzinationen? Was die neue Calibration-Reward-Forschung wirklich zeigt | Nils Weiser"
- **EN title:** "Did MIT solve AI hallucinations? What the new calibration-reward research actually shows | Nils Weiser"
- **DE meta description:** "Eine neue MIT-Studie verspricht weniger KI-Halluzinationen durch kalibrierte Belohnungssignale. Was steckt dahinter — und was bedeutet das für Entwickler heute?"
- **EN meta description:** "A new MIT paper promises fewer AI hallucinations through calibrated reward signals. What does it actually show — and what does it mean for developers today?"
- **Tags (DE):** KI-Forschung, Reinforcement Learning, LLM Calibration, Halluzinationen
- **Tags (EN):** AI Research, Reinforcement Learning, LLM Calibration, Hallucinations
- **Date:** 30. Apr 2026 / Apr 30, 2026

## Visual specification (SVG diagram)

Two panels side by side, each ~280×200 px in a 600px-wide container:

**Panel A — RLVR (left):**
- X-axis: "Verbalized confidence q" (0 → 1)
- Y-axis: "Reward" (-1 → 1)
- Two horizontal lines:
  - Solid at y=1.0 labeled "answer correct"
  - Dotted at y=0.0 labeled "answer wrong"
- Title: "RLVR: Standard"
- Color: cyan (#22d3ee)

**Panel B — RLCR (right):**
- Same axes
- Two curves:
  - "answer correct": rises from ~0 at q=0 to 1.0 at q=1.0 (1 - (q-1)²)
  - "answer wrong": falls from ~0 at q=0 to -1.0 at q=1.0 (-(q)²)
- Title: "RLCR: kalibriert"
- Color: pink/magenta (#ec4899)

Both panels share legend below: "answer correct" (solid), "answer wrong" (dotted).

Caption below the diagram explains the asymmetry.

## Cross-linking

- Internal link to the Karpathy CLAUDE.md post in section 7 ("the 'ask when ambiguous' rule from Karpathy is, in retrospect, a behavioral patch for...")
- External link to arXiv paper: https://arxiv.org/abs/2507.16806
- External link to MIT News article: https://news.mit.edu/2026/teaching-ai-models-to-say-im-not-sure-0422

## Out of scope

- Interactive D3.js visualization (could be added later if the post performs well)
- Code samples for implementing RLCR (this is a pop-tech analysis, not an implementation guide)
- Translation of the LinkedIn post text (separate task)
- Additional language versions beyond DE/EN

## Success criteria

- DE post publishes at `blog/posts/de/mit-ai-halluzinationen.html` (or matching slug pattern)
- EN translation publishes at the corresponding path
- Both posts are linked from the blog index
- Inline SVG renders correctly across desktop/mobile
- Headline + opening paragraph create the same "skeptical hook → substantive content" pattern as the Karpathy post
- Internal cross-link to the Karpathy post works
- All citations (paper authors, arXiv ID, MIT News) are accurate
