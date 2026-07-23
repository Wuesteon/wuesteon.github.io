# claude.compact.md — Blog Index

<!-- Maintained by the Cowork scheduled task "blog-compact-index" (Mon+Thu, English summaries). -->
<!-- Fallback only: python3 scripts/build-compact.py (overwrites hand-written summaries with German meta descriptions). -->

Compact index of all blog posts (20 total, newest first).
DE is the canonical language; EN/ZH translations live under
`blog/posts/en/` and `blog/posts/zh/` (ZH reuses the EN slug).

## The Lethal Trifecta: Why 98% of AI Agents Are Sitting Ducks

- **Date:** 2026-07-23
- **File:** `blog/posts/de/lethal-trifecta-ki-agenten.html`
- **Link:** [/blog/posts/de/lethal-trifecta-ki-agenten.html](https://waiser.dev/blog/posts/de/lethal-trifecta-ki-agenten.html)
- **Languages:** de, en, zh
- **Summary:** 98% of production AI agents combine all three legs of Simon Willison's lethal trifecta — private data access, exposure to untrusted content, and external communication — yet only 11% pass a blast-radius assessment. Argues you cannot prompt your way out of this combination; you have to architect your way out, by breaking one of the three legs rather than trying to filter or guard the model's behavior.

## The Year AI Agents Became the Attack Surface

- **Date:** 2026-07-22
- **File:** `blog/posts/de/ki-agenten-angriffsflaeche-2026.html`
- **Link:** [/blog/posts/de/ki-agenten-angriffsflaeche-2026.html](https://waiser.dev/blog/posts/de/ki-agenten-angriffsflaeche-2026.html)
- **Languages:** de, en, zh
- **Summary:** Argues that in 2026 the AI agent itself became the attack surface: once an LLM is wired into a loop that plans, calls tools, keeps memory, and acts, it becomes "software with hands" that can be tricked into using them. Walks through named exploits with success rates from the July research roundups — GuardFall (legacy shell-quoting tricks defeat coding-agent command guards), AutoJack (weaponizes an agent's browsing to reach localhost services and get host RCE in AutoGen Studio), a GitHub supply-chain attack (reverse-shell payloads fetched at runtime, invisible to code review), and fake-bug-report hijacking via Sentry (~85% success). The unifying point: the vulnerable component can't tell instructions from data, so these are privilege problems whose solutions predate LLMs.

## Timeless Knowledge, Trained AI-Native: Why I Built FutureClass

- **Date:** 2026-07-16
- **File:** `blog/posts/de/futureclass-zeitloses-wissen.html`
- **Link:** [/blog/posts/de/futureclass-zeitloses-wissen.html](https://waiser.dev/blog/posts/de/futureclass-zeitloses-wissen.html)
- **Languages:** de, en, zh
- **Summary:** Launch post for FutureClass (futureclass.io), the author's learning platform built on the observation that human nature hasn't changed since Carnegie, Machiavelli, and Le Bon — only the vocabulary has. Reading this timeless knowledge isn't the same as mastering it: skill requires repetition, feedback, and pressure, which books can't provide. FutureClass closes that gap by ending every lesson in an AI Practice Lab — a realistic scenario (the rejecting customer, the tipping negotiation) you can fail and retry ten times at no cost, launching with five courses in four languages.

## Snake Oil for AI Search: What the Science Says About GEO

- **Date:** 2026-07-08
- **File:** `blog/posts/de/geo-wundermittel-wissenschaft.html`
- **Link:** [/blog/posts/de/geo-wundermittel-wissenschaft.html](https://waiser.dev/blog/posts/de/geo-wundermittel-wissenschaft.html)
- **Languages:** de, en, zh
- **Summary:** Examines "Generative Engine Optimization" — the paid discipline promising visibility in ChatGPT, Perplexity, and Google AI Overviews — against the actual research (arXiv, the Princeton study, Fishkin's 2,961 prompts). The traffic shift away from blue-link search is real and measurable, but nearly everything sold as a GEO strategy is unproven. Key takeaway: nothing beats substantive, well-sourced content plus solid technical SEO — both of which predate the term GEO.

## We Poisoned a Security-Conscious AI Agent in 2 Messages – Memory Poisoning with Mem0

- **Date:** 2026-06-27 (updated 2026-07-03)
- **File:** `blog/posts/de/agent-memory-poisoning-mem0.html`
- **Link:** [/blog/posts/de/agent-memory-poisoning-mem0.html](https://waiser.dev/blog/posts/de/agent-memory-poisoning-mem0.html)
- **Languages:** de, en, zh
- **Summary:** Four hands-on experiments in agent memory poisoning: with no API access, no jailbreak, and no special syntax, two ordinary chat messages were enough to make a hardened, memory-based AI agent (Mem0) trust and run a credential-harvesting script. Because systems like Mem0 extract facts from conversations and inject them into future prompts, persistent memory is both what makes agents useful and what makes them attackable — and the tested defenses were broken too.

## Loops, Not Prompts: Why the Head of Claude Code Stopped Prompting

- **Date:** 2026-06-11
- **File:** `blog/posts/de/loops-statt-prompts-cherny.html`
- **Link:** [/blog/posts/de/loops-statt-prompts-cherny.html](https://waiser.dev/blog/posts/de/loops-statt-prompts-cherny.html)
- **Languages:** de, en, zh
- **Summary:** Boris Cherny, creator of Claude Code, said at Acquired Unplugged (June 2026) that he no longer prompts Claude — he writes loops that prompt Claude and decide what to do, and he even uninstalled his IDE. The post unpacks what that means, how /loop and /goal differ, and puts the claim to the test with an autonomous triage loop the author ran himself.

## Opus 4.8 & Dynamic Workflows: 7 Agents Audit a Platform in 5 Minutes

- **Date:** 2026-05-31
- **File:** `blog/posts/de/opus-4-8-dynamische-workflows-erst-recht-audit.html`
- **Link:** [/blog/posts/de/opus-4-8-dynamische-workflows-erst-recht-audit.html](https://waiser.dev/blog/posts/de/opus-4-8-dynamische-workflows-erst-recht-audit.html)
- **Languages:** de, en, zh
- **Summary:** Asked to audit the Erst Recht legal-tech platform, Claude didn't work through it step by step — it wrote a short script spawning seven specialized agents in parallel, one per domain. Five minutes and eleven seconds later it delivered a severity-sorted findings list (including a security-critical vulnerability a single pass would have missed) that would have cost a developer half a day. The real story is what it means that Claude now turns plans into orchestration scripts on its own.

## Ambient AI: Why the Next AI Generation Doesn't Answer – It Notices

- **Date:** 2026-05-21
- **File:** `blog/posts/de/ambient-ai-die-naechste-ki-generation.html`
- **Link:** [/blog/posts/de/ambient-ai-die-naechste-ki-generation.html](https://waiser.dev/blog/posts/de/ambient-ai-die-naechste-ki-generation.html)
- **Languages:** de, en, zh
- **Summary:** As long as we pay for AI per request, we only build one form of it: vending machines that react to a coin. The more interesting form is the janitor who notices on his own when something is off — illustrated by a language model on a single L4 GPU that scrapes competitors, drafts blog posts, and reports via Telegram without being asked. Argues 2026 is the year this ambient form becomes economically viable as the unit of compute flips from per-request to always-on.

## Anthropic's 33-Page Blueprint for Claude Skills

- **Date:** 2026-05-15
- **File:** `blog/posts/de/anthropic-skills-guide.html`
- **Link:** [/blog/posts/de/anthropic-skills-guide.html](https://waiser.dev/blog/posts/de/anthropic-skills-guide.html)
- **Languages:** de, en, zh
- **Summary:** A walkthrough of Anthropic's official "Complete Guide to Building Skills for Claude": at its core, a skill is just a folder with a SKILL.md and a YAML header telling Claude when to activate it — and that simplicity is the point. Covers how progressive disclosure works and why professional Claude usage is shifting from finding the next clever prompt to versioning recurring workflows as code artifacts.

## Did MIT Solve AI Hallucinations? Calibration Reward Explained

- **Date:** 2026-04-30
- **File:** `blog/posts/de/mit-ai-halluzinationen.html`
- **Link:** [/blog/posts/de/mit-ai-halluzinationen.html](https://waiser.dev/blog/posts/de/mit-ai-halluzinationen.html)
- **Languages:** de, en, zh
- **Summary:** The MIT paper "Beyond Binary Rewards: Training LMs to Reason about Their Uncertainty" doesn't solve hallucinations, but it shows something more interesting: the way reasoning models are currently trained doesn't just permit hallucinations, it actively produces them. Explains the proposed calibrated reward signal and what it means for developers working with confidently wrong models today.

## Claude Mythos Preview: AI Finds Its Own Zero-Days

- **Date:** 2026-04-15
- **File:** `blog/posts/de/claude-mythos-preview-zero-days.html`
- **Link:** [/blog/posts/de/claude-mythos-preview-zero-days.html](https://waiser.dev/blog/posts/de/claude-mythos-preview-zero-days.html)
- **Languages:** de, en, zh
- **Summary:** Anthropic's April 2026 assessment of Claude Mythos Preview reports the model finds and exploits zero-day vulnerabilities in production software largely without human guidance: 181 Firefox exploits, a 27-year-old OpenBSD bug, a full FreeBSD RCE with ROP chain. The most important data point is the capability jump from Opus 4.6 — an order of magnitude, not an increment — and what that shift in the offense-defense balance means for defenders and companies.

## CLAUDE.md With 25,000 Stars: Karpathy's AI Rules

- **Date:** 2026-04-10
- **File:** `blog/posts/de/karpathy-claude-md.html`
- **Link:** [/blog/posts/de/karpathy-claude-md.html](https://waiser.dev/blog/posts/de/karpathy-claude-md.html)
- **Languages:** de, en, zh
- **Summary:** A GitHub repo containing nothing but a single CLAUDE.md file — distilling Andrej Karpathy's observations on typical LLM failure modes into four behavioral rules for Claude Code — has passed 25,000 stars. That a plain Markdown file gets this attention signals where the real work with AI coding assistants now happens: not whether the model can write code, but how to steer its behavior so the code is usable. Includes a practical assessment of which rules actually hold up.

## AI Agent Workflows with the Superpowers Framework

- **Date:** 2026-03-25
- **File:** `blog/posts/de/ki-agenten-workflows-superpowers.html`
- **Link:** [/blog/posts/de/ki-agenten-workflows-superpowers.html](https://waiser.dev/blog/posts/de/ki-agenten-workflows-superpowers.html)
- **Languages:** de, en, zh
- **Summary:** Introduces the Superpowers framework, which teaches Claude Code reusable skills and orchestrates multi-stage development workflows. The goal: an AI coding agent that works like an experienced developer — with documented best practices, consistent workflows, and the ability to learn from past projects.

## Claude Code Skills: The Revolution of AI Automation

- **Date:** 2026-03-15
- **File:** `blog/posts/de/claude-code-skills.html`
- **Link:** [/blog/posts/de/claude-code-skills.html](https://waiser.dev/blog/posts/de/claude-code-skills.html)
- **Languages:** de, en, zh
- **Summary:** Claude Code Skills are Markdown files with metadata and optional executable scripts that Claude loads automatically when they match the task — reusable capabilities the agent applies consistently, like a developer who has internalized best practices. Also argues why MCP is already losing relevance for the author now that Skills exist.

## Browser Automation with Playwright MCP

- **Date:** 2026-03-05
- **File:** `blog/posts/de/playwright-mcp-browser-automatisierung.html`
- **Link:** [/blog/posts/de/playwright-mcp-browser-automatisierung.html](https://waiser.dev/blog/posts/de/playwright-mcp-browser-automatisierung.html)
- **Languages:** de, en, zh
- **Summary:** A practical guide to Playwright MCP, one of the most powerful Model Context Protocol extensions, which lets Claude Code drive a real browser for web scraping, testing, and automation. Setup takes a single command before starting Claude; the post walks through installation and real usage examples.

## OpenClaw vs. NemoClaw: Security for AI Agents

- **Date:** 2026-02-20
- **File:** `blog/posts/de/openclaw-vs-nemoclaw.html`
- **Link:** [/blog/posts/de/openclaw-vs-nemoclaw.html](https://waiser.dev/blog/posts/de/openclaw-vs-nemoclaw.html)
- **Languages:** de, en, zh
- **Summary:** NemoClaw isn't a competitor to OpenClaw — the most popular open-source architecture for autonomous AI agents — but a security wrapper that makes such agents enterprise-ready. Breaks down OpenClaw's five core components, the security risks that come with agent autonomy, and when to deploy which.

## Finding the Best AI Model for Legal Analysis

- **Date:** 2026-02-10
- **File:** `blog/posts/de/ki-modell-evaluation.html`
- **Link:** [/blog/posts/de/ki-modell-evaluation.html](https://waiser.dev/blog/posts/de/ki-modell-evaluation.html)
- **Languages:** de, en, zh
- **Summary:** How Erst Recht systematically selected the best AI model for legal analysis instead of relying on gut feeling or marketing claims. Describes a three-stage evaluation approach — LLM-as-a-Judge, Crew-as-a-Judge, and human validation — run in parallel rather than sequentially.

## Legal AI Knowledge Base with Docling

- **Date:** 2026-01-25
- **File:** `blog/posts/de/legal-ai-knowledge-base-docling.html`
- **Link:** [/blog/posts/de/legal-ai-knowledge-base-docling.html](https://waiser.dev/blog/posts/de/legal-ai-knowledge-base-docling.html)
- **Languages:** de, en, zh
- **Summary:** How Erst Recht turned 1,000+ legal PDF documents into a searchable knowledge base that AI agents can actually use, powering an AI-assisted legal advice platform for German law. The key tool: Docling, IBM Research's open-source document-processing toolkit.

## Multi-Agent AI Systems with CrewAI

- **Date:** 2026-01-15
- **File:** `blog/posts/de/multi-agent-ai-crewai.html`
- **Link:** [/blog/posts/de/multi-agent-ai-crewai.html](https://waiser.dev/blog/posts/de/multi-agent-ai-crewai.html)
- **Languages:** de, en, zh
- **Summary:** A single AI agent hits its limits on complex, multi-step tasks; the answer is multiple specialized agents collaborating like a real team. A practical guide to CrewAI, the Python framework for orchestrating agents into a crew where each takes a specific role, with code and real-world use cases.

## Understanding Genetic Algorithms

- **Date:** 2025-12-20
- **File:** `blog/posts/de/genetische-algorithmen-java.html`
- **Link:** [/blog/posts/de/genetische-algorithmen-java.html](https://waiser.dev/blog/posts/de/genetische-algorithmen-java.html)
- **Languages:** de, en, zh
- **Summary:** Evolution as an algorithm: genetic algorithms simulate natural selection to solve optimization problems where the solution space is too vast for exhaustive search and classical algorithms fail. A practical introduction with a full Java implementation.
