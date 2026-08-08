# AGENTS.md — OpenYC Skills Website

> **Authoritative operating manual and implementation specification for AI coding agents building the OpenYC Skills website.**
> Read this file **completely** before writing any code, copy, or layout.
> Version: 2.0 · Last updated: 2026-08-08

---

## Table of Contents

1. [How to Use This Specification](#1-how-to-use-this-specification)
2. [Purpose of This File](#2-purpose-of-this-file)
3. [Product Identity](#3-product-identity)
4. [The Website We Are Building](#4-the-website-we-are-building)
5. [Source-of-Truth Documents](#5-source-of-truth-documents)
6. [Canonical Facts & Content Bank](#6-canonical-facts--content-bank)
7. [Audiences, User Flows & Wayfinding](#7-audiences-user-flows--wayfinding)
8. [Information Architecture & Required Site Content](#8-information-architecture--required-site-content)
9. [Required Functionality](#9-required-functionality)
10. [Copywriting & Terminology Rules](#10-copywriting--terminology-rules)
11. [Visual & Interaction Design — Apple Design Applied](#11-visual--interaction-design--apple-design-applied)
12. [Component & System Requirements](#12-component--system-requirements)
13. [Technical Implementation Requirements](#13-technical-implementation-requirements)
14. [Content Accuracy Workflow](#14-content-accuracy-workflow)
15. [Development & QA Workflow](#15-development--qa-workflow)
16. [Constraints & Things to Avoid](#16-constraints--things-to-avoid)
17. [Decision Rules](#17-decision-rules)
18. [Definition of Done / Completion Checklist](#18-definition-of-done--completion-checklist)
19. [Optional Future Enhancements](#19-optional-future-enhancements)

---

## 1. How to Use This Specification

This file combines two things into one implementation-ready specification:

1. **The product specification** — what OpenYC Skills is, what the website must communicate, required functionality, content, architecture, and constraints (Sections 3–10, 13–14).
2. **The design philosophy** — Apple Design principles translated into concrete requirements for how the website looks, feels, and behaves (Sections 11–12).

### 1.1 Specification map

| # | Implementation concern | Where it lives |
|---|------------------------|----------------|
| 1 | Product purpose | Sections 3–4 |
| 2 | Required functionality | Sections 8–9 |
| 3 | User experience / user flows | Section 7 |
| 4 | Information architecture | Section 8 |
| 5 | Visual / design direction | Sections 11.1–11.5 |
| 6 | Interaction and motion principles | Section 11.6 |
| 7 | Responsive behavior | Section 11.8 |
| 8 | Accessibility | Sections 11.7, 12, 18 |
| 9 | Technical implementation requirements | Section 13 |
| 10 | Component / system requirements | Section 12 |
| 11 | Content requirements | Sections 6, 8, 10, 14 |
| 12 | Constraints and things to avoid | Section 16 |
| 13 | Definition of done / acceptance criteria | Section 18 |

### 1.2 Authority hierarchy (resolve conflicts in this order)

1. **Product / functionality requirements** (Sections 3–9). Never sacrifice what the site must do.
2. **Existing technical constraints** (Section 13). Static-only, no build step, no backend, no external dependencies.
3. **Existing website-specific requirements** (Sections 7–10, 14). They define content, scope, and accuracy rules.
4. **Apple Design principles** (Section 11) for visual design, interaction, motion, typography, and UX refinement.

If a design decision in an earlier section conflicts with Apple Design principles, **preserve the underlying product requirement and adapt the presentation**. Do not silently remove a feature because "the Apple aesthetic would be simpler."

### 1.3 Fact rules

- If a fact is not in this file and not verifiable in a source document (Section 5), **do not state it**. Omit it, or mark it `TODO (verify with maintainer)`.
- If a design requirement in this file is not specific enough, implement the **simplest interpretation that satisfies the stated principle** and note your choice.

### 1.4 Paths

The source project documents live on this machine at:

```
C:\Users\hanus\Gaprio\yc-skills\
```

The design skill lives at:

```
C:\Users\hanus\.agents\skills\apple-design\SKILL.md
```

If this website repo is copied to another machine, update these paths before starting.

---

## 2. Purpose of This File

This repository contains the **marketing/documentation website** for **OpenYC Skills**, a terminal-based open-source project. This file tells any AI coding agent:

- Exactly what OpenYC Skills is (and is not).
- Exactly what the website must say, with verified facts and exact values.
- What the website must **never** claim (anti-hallucination rules).
- Which source documents to read before writing content.
- Exactly how the website must **feel and behave** — the Apple Design principles applied to this product, translated into concrete implementation guidance.
- The locked technical architecture for the website.
- The build, verification, and completion workflow.

**Rule 2.1:** If any instruction in this file conflicts with a source document, follow this file and flag the conflict to the user in your final message.

**Rule 2.2:** The final website must be buildable by an agent that has read **only this file** plus the source documents listed in Section 5. The agent must NOT need to read the CLI project's `AGENTS.md` or architecture spec to understand what to build.

---

## 3. Product Identity

### 3.1 What OpenYC Skills is

OpenYC Skills is an open-source, **terminal-based Python project** that:

1. Ingests publicly available Y Combinator content — **YC Library essays** (`ycombinator.com/library`) and **YC YouTube videos** (English captions only).
2. Uses LLMs and local machine-learning to extract actionable startup advice from that content.
3. Distills the advice into **narrow, composable "skill files"** — Markdown documents with YAML metadata, containing a principle, verbatim quotes with attribution, application instructions, edge cases, and related-skill links.
4. Exports the skills into **three AI-agent formats**: MCP, OpenAI function schema, and Hermes plain text.
5. Publishes everything as **static files in a GitHub repository** that any AI agent can consume for free.

**The product itself is a command-line pipeline.** Users who want to *generate* skills run Python commands in a terminal. Users who want to *consume* skills never touch Python — they download static files.

### 3.2 The 30-second explanation (use as the basis for the hero copy)

> OpenYC Skills takes startup advice from Y Combinator's public content — essays and videos — and turns it into structured, machine-readable "skill files" that AI agents like ChatGPT, Claude, Cursor, and local models can load directly. Consumers get verified, well-attributed YC advice at zero cost. Contributors bring their own API keys to generate new skills.

### 3.3 Approved one-liners (do not invent new taglines)

- "Startup advice from Y Combinator content, packaged for AI agents."
- "Verified YC advice your AI agent can actually use."
- "YC knowledge, distilled into composable skills."
- "Turn YC's public startup advice into AI-ready skill files."

### 3.4 Approved analogy (use in "How it works" section)

> Think of each skill file as a **recipe card** for an AI agent. The card says what the advice is, who said it (with the exact quote), when to use it, what questions to ask the founder, and which other cards are related. The agent reads the card and follows it.

### 3.5 What OpenYC Skills is NOT (never present it this way)

- It is **not** affiliated with, endorsed by, or built by Y Combinator. It analyzes publicly available YC content.
- It is **not** an API service. There is no server, no runtime endpoint, no hosted MCP server, and no backend.
- It is **not** a chatbot. It is a library of static files that other AI agents can use.
- It is **not** a runtime RAG system. There is no runtime vector database; similarity data is pre-computed and committed as static JSON.
- It is **not** a hosted web app. The website only *describes* the project; it does not run the pipeline.

### 3.6 Key repository facts (exact)

| Fact | Exact value |
|------|-------------|
| Project name | OpenYC Skills |
| GitHub repository | `https://github.com/HanuShashwat/openyc-skills` |
| Source repo path on this machine | `C:\Users\hanus\Gaprio\yc-skills` |
| Language | Python 3.11+ (CLI tool) |
| Package manager | pip (24.x), virtual environment `.venv` |
| CLI entry point | `python -m src.cli` |
| Local state database | SQLite `data/registry.db` (gitignored, contributor-local) |
| License (code) | MIT |
| License (generated skill content) | CC BY-SA 4.0 |

---

## 4. The Website We Are Building

### 4.1 Mission

Build a **clear, simple, static marketing website** that:

1. Explains what OpenYC Skills is in plain language that a non-technical founder can understand in under 30 seconds.
2. Showcases its capabilities: verified skills, three AI-agent formats, 8-category taxonomy, automated validation, BYOK contribution model.
3. Gives a **new user** complete, correct instructions to start using the project — both as a consumer (AI agent developer) and as a contributor (BYOK generator).
4. Links to the full documentation in the source repo instead of duplicating everything.

### 4.2 Success criteria

- Every factual claim on the site traces back to a source document (annotation comments required, Section 14).
- A first-time visitor understands what the project does without reading the source repo.
- An AI agent developer can integrate skills by following the site's instructions.
- A contributor can set up the pipeline and run the CLI by following the site's instructions.
- The site is 100% static: no backend, no API keys, no build step, no database.
- The site **feels premium, calm, intentional, tactile, and extremely polished** — per Section 11 — not like a generic SaaS template, and not like a copy of Apple's website.
- The site passes the completion checklist in Section 18.

### 4.3 Scope boundaries

- **In scope:** marketing copy, product explanation, taxonomy reference, consumer guide, contributor guide, CLI reference, FAQ, license page.
- **Out of scope (do not build unless the user asks):** sign-up/login, user accounts, server-side search, a hosted demo of the pipeline, a browser-based code editor, analytics dashboards, payment, or any backend.

---

## 5. Source-of-Truth Documents

Read the relevant document **before** writing any content that depends on it. The documents are the only allowed sources for project facts.

| Document | Path | Provides |
|----------|------|----------|
| Project README | `C:\Users\hanus\Gaprio\yc-skills\README.md` | Big-picture explanation, pipeline overview, quickstart, FAQ, license |
| Architecture spec | `C:\Users\hanus\Gaprio\yc-skills\openyc-skills-architecture-v1.1.md` | Exact pipeline, taxonomy, skill file format, spec formats, validation details, security |
| CLI AGENTS.md | `C:\Users\hanus\Gaprio\yc-skills\AGENTS.md` | Repository rules, state machine, data model, naming conventions |
| Consumption guide | `C:\Users\hanus\Gaprio\yc-skills\docs\CONSUMPTION.md` | How AI agents consume skills, spec formats, fallback behavior, code examples |
| BYOK guide | `C:\Users\hanus\Gaprio\yc-skills\docs\BYOK.md` | Contributor setup, CLI workflow, quota management, cold-start warning |
| Taxonomy reference | `C:\Users\hanus\Gaprio\yc-skills\docs\TAXONOMY.md` | Category and subcategory descriptions |
| Implementation plan | `C:\Users\hanus\Gaprio\yc-skills\IMPLEMENTATION_PLAN.md` | Build history, milestone structure, task naming, definition of done |
| Taxonomy config (source of truth for categories) | `C:\Users\hanus\Gaprio\yc-skills\config\taxonomy.yml` | The **only** authoritative list of categories/subcategories |
| Apple Design skill (design source of truth) | `C:\Users\hanus\.agents\skills\apple-design\SKILL.md` | Design philosophy, motion, typography, materials, accessibility — translated into requirements in Section 11 |

**Rule 5.1:** When source documents disagree (e.g., the taxonomy doc says "38 subcategories" but `config/taxonomy.yml` contains 37), prefer the configuration file and the verified count, and add a code comment noting the discrepancy. Never copy a number from one document without checking it against the authoritative source.

**Rule 5.2:** Read the Apple Design skill before implementing any visual or motion work. Section 11 already translates it for this product; if you need more detail, consult the skill file.

---

## 6. Canonical Facts & Content Bank

Everything in this section is pre-verified. Use it directly. Anything NOT in this section must be verified against Section 5 documents before it appears on the site.

### 6.1 The three core promises

1. **Zero cost for consumers.** Download static files from GitHub. No API keys, no database, no embedding models, no Python.
2. **Exact quote fidelity.** Every quote attributed to a YC speaker is verbatim from the original transcript or essay. No paraphrasing in attribution blocks. Enforced by automated validation.
3. **Composable skills.** Each skill covers one narrow micro-topic and links to related skills using pre-computed cosine similarity (math, not guesswork).

### 6.2 Inputs and outputs

**Inputs (what gets ingested):**

- YC Library essays (`ycombinator.com/library`) — scraped as HTML, converted to Markdown.
- YC YouTube videos — only **English subtitles/captions** are downloaded (`yt-dlp` with `--skip-download`; video files are never downloaded).

**Outputs (what gets published to GitHub):**

| Output | Location in repo | Purpose |
|--------|------------------|---------|
| Skill files | `skills/{category}/{skill_id}.md` | The actual knowledge content |
| MCP specs | `specs/mcp/{skill_id}.json` | For Claude Code / MCP-compatible agents |
| OpenAI specs | `specs/openai/{skill_id}.json` | For GPT / OpenAI function calling |
| Hermes specs | `specs/hermes/{skill_id}.txt` | For local models (Ollama, llama.cpp) |
| Skill index | `skills-index.json` | Machine-readable lookup by ID, tag, category |
| Similarity matrix | `data/similarity_matrix.json` | Pre-computed skill-to-skill similarity |

**Not published (gitignored):** raw content, chunks, `registry.db`, error logs, `.env` (API keys), `.venv/`.

### 6.3 Taxonomy (exact, from `config/taxonomy.yml`)

There are exactly **8 categories**. The subcategory count must be derived from `config/taxonomy.yml`; as of 2026-08-08 it contains **37 subcategories** (the taxonomy doc's "38" is inaccurate — do not print 38).

| Category | What it covers | Subcategories |
|----------|----------------|---------------|
| `fundraising` | Raising capital from investors | seed-round, series-a, pitch-deck, investor-relations, valuation, term-sheets |
| `hiring` | Building the team | first-hires, technical-hiring, culture-fit, compensation, firing |
| `product` | Product development & management | mvp, product-market-fit, user-research, roadmap, design |
| `growth` | Acquiring and retaining users | marketing, sales, retention, pricing, distribution |
| `culture` | Company culture & operations | mission, values, remote-work, communication |
| `strategy` | High-level company decisions | pivoting, competition, market-sizing, monetization |
| `founder-mental-models` | Founder psychology & decision-making | motivation, burnout, decision-making, leadership |
| `technical` | Engineering & infrastructure | architecture, scaling, security, ai-ml |

**Rules:**

- Every skill belongs to exactly **one** category.
- Skill IDs follow `yc-{category}-{subcategory}-{descriptor}` (lowercase, hyphen-separated, max 6 words after `yc-{category}`).
- Category names and subcategory names must be written exactly as above (hyphens included).
- If `config/taxonomy.yml` changes, update the site table to match.

### 6.4 Skill file anatomy

Each skill is a Markdown file with YAML frontmatter followed by content sections.

**Frontmatter fields (all required unless noted):**

| Field | Type / rule |
|-------|-------------|
| `skill_id` | Pattern `^yc-[a-z]+(-[a-z]+){1,6}$`, matches filename |
| `name` | Human-readable, max 100 chars |
| `version` | Semantic version `X.Y.Z` |
| `category` | One of the 8 categories |
| `tags` | 1–10 lowercase tags |
| `source_count` | Integer ≥ 1 |
| `quote_count` | Integer ≥ 1 |
| `confidence` | Float 0.0–1.0, computed from cluster metrics (never LLM self-report) |
| `related_skills` | Top 3 most similar skills (computed, never LLM-generated) |
| `provenance` | batch_id, pipeline_run_date, sources (content_id, title, speaker, designation, url, contribution) |
| `validation` | quote_verified, schema_valid, hallucination_check, human_review (booleans) |

**Body sections (in this order):**

1. `# {Skill Name}`
2. `## Principle` — 2–4 sentence unified principle
3. `## Verbatim Quotes` — exact quotes with speaker, designation, source URL, timestamp
4. `## Personalized Application` — When to Use, Agent Protocol, Follow-Up Questions
5. `## Edge Cases` — when the advice needs modification
6. `## Related Skills` — links to related skill files
7. `## Fallback Behavior` — what to do when the query doesn't match

**Website rule:** You may show a simplified, clearly labeled "sample skill" illustration on the site, but label it **"Illustrative example"** if it is not copied from an actual published skill file in the repo. As of 2026-08-08, the `skills/` directory in the source repo contains **no published skill files**, so do not present any skill ID or quote as if it exists in the repo. Example skill IDs from the docs (`yc-fundraising-seed-round-timing`, etc.) are **illustrative only**.

### 6.5 Spec formats (exact)

| Format | File | Used by | Key characteristics |
|--------|------|---------|---------------------|
| MCP | `specs/mcp/{skill_id}.json` | Claude Code, MCP-compatible frameworks | Tool definition: `name`, `description`, `inputSchema`, `handler.path`, `tags`, `fallback` |
| OpenAI | `specs/openai/{skill_id}.json` | GPT, OpenAI API function calling | `{"type":"function","function":{...}}` plus custom `metadata` (skill_file, category, tags, fallback) |
| Hermes | `specs/hermes/{skill_id}.txt` | Ollama, llama.cpp, local models | Plain text with `[SKILL: ...]` / `[END SKILL]` delimiters, injected into system prompts |

**Fallback rules (identical in every spec — emphasize on the site):**

- If no skill matches the user's question, return the **3 closest skills**.
- The agent may use its own general knowledge, **clearly labeled as general advice**.
- The agent must **NEVER invent YC quotes** (`invent_quotes: false`).

### 6.6 Index and similarity files

**`skills-index.json`** (repo root) contains:

- `version`, `generated_at`, `skill_count`
- `by_id` — skill ID → path, category, tags, name, confidence
- `by_tag` — tag → list of skill IDs
- `by_category` — category → list of skill IDs

**`data/similarity_matrix.json`** contains:

- `version`, `generated_at`
- `skills` — ordered list of skill IDs
- `matrix` — 2D array of cosine similarity values (1.0 = identical, 0.0 = unrelated)
- `tag_index` — tag → skill IDs

**Website rule:** Do not hardcode a skill count anywhere. If `skills-index.json` exists in the source repo, the site may read and display its `skill_count`; if the file does not exist (as of 2026-08-08), omit any total and say skills are published incrementally.

### 6.7 The pipeline (how skills are made)

The pipeline is **manually triggered** by a maintainer/contributor running CLI commands. There is no scheduled automation.

```
Discover → Download → Chunk → Extract → Cluster → Synthesize → Link → Export → Validate → Commit → Tag
```

Plain-English stage descriptions for the site:

| Stage | Plain-English description | How it runs |
|-------|---------------------------|-------------|
| Ingest | Downloads a YC essay or a YouTube transcript | Python scripts |
| Chunk | Splits long content into 200–800 word pieces | Local, no LLM |
| Extract | Reads chunks and pulls out actionable advice + verbatim quotes | LLM call #1 |
| Cluster | Groups similar advice from multiple sources using embeddings | Local, no LLM |
| Synthesize | Writes each skill file from a cluster of corroborating quotes | LLM call #2 |
| Link | Fills in the 3 most related skills using pre-computed similarity | Local, no LLM |
| Export | Generates MCP, OpenAI, and Hermes spec files | Local |
| Validate | Runs the 3-layer validation suite | Local + dedicated Gemini check |
| Index | Regenerates `skills-index.json` and `similarity_matrix.json` | Local |
| Commit & tag | Contributor commits generated files and opens a PR | Git/GitHub |

**Confidence formula** (show as a code block if the site explains confidence):

```python
confidence = min(0.99, max(0.55,
    (avg_similarity * 0.5) +                     # how similar the sources are
    (min(item_count, 10) / 10 * 0.3) +           # how many sources agree
    (0.2 if not contradictions else 0.1)          # do sources disagree?
))
```

**Key rule to communicate:** `confidence` and `related_skills` are computed by the pipeline from math — never generated by the LLM.

### 6.8 Validation (three layers)

| Layer | What it checks | Tool |
|-------|----------------|------|
| 1. Quote verification | Each verbatim quote fuzzy-matches the source chunk | rapidfuzz — PASS if `ratio ≥ 70` AND `partial_ratio ≥ 85` |
| 2. Schema validation | Frontmatter matches the required Pydantic model, skill_id matches filename, related skills exist | Pydantic |
| 3. Hallucination guard | No invented speakers, claims, or quotes; LLM-as-judge checks principle vs. quotes | Gemini `gemini-1.5-flash` at temperature 0.0 (dedicated, fail-open) |

If validation fails, the skill moves to `skills/_failed/` and cannot be published. GitHub Actions re-runs validation on every pull request.

### 6.9 CLI reference (exact — the site must show these exact commands)

All commands run as `python -m src.cli <command>` from the project root.

| Command | What it does | Example |
|---------|--------------|---------|
| `init-db` | Creates the SQLite database (idempotent) | `python -m src.cli init-db` |
| `ingest-library` | Downloads a YC Library essay | `python -m src.cli ingest-library --url "https://www.ycombinator.com/library/some-essay"` |
| `ingest-youtube` | Downloads a YouTube transcript (not the video) | `python -m src.cli ingest-youtube --url "https://www.youtube.com/watch?v=VIDEO_ID"` |
| `chunk` | Splits downloaded content into chunks | `python -m src.cli chunk --all` |
| `forge` | Runs extract → cluster → synthesize | `python -m src.cli forge --topic "fundraising" --batch-size 15` |
| `link` | Populates `related_skills` from the similarity matrix | `python -m src.cli link --topic "fundraising"` |
| `validate` | Runs the 3-layer validation suite | `python -m src.cli validate --all` |
| `export` | Generates MCP, OpenAI, Hermes specs | `python -m src.cli export --all` |
| `index` | Regenerates `skills-index.json` + similarity matrix | `python -m src.cli index` |
| `reaper` | Recovers items stuck in `extracting` state (after 2h) | `python -m src.cli reaper` |
| `quota` | Shows today's token/request usage per LLM provider | `python -m src.cli quota` |
| `backfill` | Bulk-ingests historical content | `python -m src.cli backfill --start-date 2020-01-01` |

**Rules:** Copy these commands verbatim. Do not rename flags, add flags, or "modernize" the syntax. Do not claim a command exists unless it is in this table.

### 6.10 BYOK contributor model (exact)

"BYOK" = **Bring Your Own Keys**. Contributors supply their own LLM API keys to run generation. The project supports **4 providers**; you need **at least one**:

| Priority | Provider | Default model | Default daily token limit | Default daily request limit |
|----------|----------|---------------|---------------------------|-----------------------------|
| 1 | DeepSeek | `deepseek-chat` | 1,000,000 | 100 |
| 2 | Kimi (Moonshot) | `moonshot-v1-8k` | 500,000 | 50 |
| 3 | GLM (BigModel) | `glm-4-flash` | 500,000 | 50 |
| 4 | Gemini (Google) | `gemini-1.5-flash` | 1,500,000 | 150 |

**Website rule:** Label these limits as "defaults from the project's `config/providers.yml`" — do not present them as guaranteed provider free-tier terms. They are configurable.

**Cost note (from BYOK doc):** a typical batch of 15 content items costs roughly **$0.01–$0.10** in API usage depending on provider.

**Setup steps (condensed for the contributor page — exact commands):**

```bash
# 1. Fork & clone
git clone https://github.com/YOUR_USERNAME/openyc-skills.git
cd openyc-skills

# 2. Create & activate a virtual environment (Python 3.11)
python3.11 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\Activate.ps1

# 3. Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# 4. Download the local embedding model (~90 MB, CPU-only)
python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('all-MiniLM-L6-v2')"

# 5. Initialize the database
python -m src.cli init-db

# 6. Add your API keys
cp .env.example .env               # then edit .env and add at least one key
```

**Per-batch workflow (exact order):**

```bash
python -m src.cli ingest-youtube --url "https://www.youtube.com/watch?v=VIDEO_ID"
# or: python -m src.cli ingest-library --url "https://www.ycombinator.com/library/some-essay"
python -m src.cli chunk --all
python -m src.cli forge --topic "your-topic" --batch-size 15
python -m src.cli link --topic "your-topic"
python -m src.cli export --all
python -m src.cli validate --all
python -m src.cli index
```

**Cold-start warning (must appear on the contributor page):**

> `data/registry.db` is gitignored and does not come with a fresh clone. A fresh database has zero knowledge of what was already processed on `main`. Running `forge` without `--topic` or specific URLs can regenerate duplicate `_v2` skills. Always scope your first run to new content with `--topic` or explicit URLs.

**Other contributor facts to include:**

- Quotas reset at **UTC midnight**.
- If all providers are exhausted: wait for reset, add another key, or reduce `--batch-size`.
- You can check usage with `python -m src.cli quota`.
- Do **not** commit `data/registry.db`, `data/raw/`, `data/chunks/`, `data/errors/`, or `.env`.
- Commit generated files: `skills/`, `specs/`, `data/similarity_matrix.json`, `skills-index.json`.

### 6.11 Licensing and attribution (exact)

- **Code:** MIT License — use freely.
- **Generated skill content:** CC BY-SA 4.0 — attribution required, share alike.
- **Raw YC content:** never redistributed; raw files are gitignored; only short verbatim quotes with attribution are published.
- The project docs recommend legal review before commercial use of reproduced quotes (fair use is fact-specific).

**Website rule:** Include a license section that states the above. Do not claim "public domain" or "free to use for any purpose" — CC BY-SA has conditions.

### 6.12 Facts that must never be invented

Never put these on the site unless you can source them from the repo:

- Total number of published skills (none exist yet as of 2026-08-08; derive from `skills-index.json` when it appears).
- Number of contributors, stars, forks, downloads, or community stats (no data source).
- Specific quotes from YC speakers (only if present in published skill files; otherwise use clearly labeled illustrative examples from the docs).
- Specific API pricing, rate limits, or free-tier terms (only the project's default config values from Section 6.10, labeled as defaults).
- Feature names, CLI flags, file paths, or directory names not present in the source docs.
- Testimonials or user quotes (none exist in the source docs).
- Any claim that the project works with a specific AI product in a way not documented (only MCP / OpenAI function calling / Hermes as documented).

---

## 7. Audiences, User Flows & Wayfinding

### 7.1 Audiences

The site has **two primary audiences** and **one secondary audience**:

#### 7.1.1 AI agent developers / consumers (primary)

They want to give their agent startup-advice capability. Message: *"Grab the files, load them into your agent, done — no server, no keys, no Python."*

Give them:

- What they get (skills, specs, index files).
- The three ways to get files (clone repo, release bundle, raw URLs).
- Which format to use for which framework (MCP → Claude, OpenAI → GPT, Hermes → local).
- The fallback rules (3 closest skills, labeled general advice, never invent YC quotes).
- Small code examples (from `docs/CONSUMPTION.md`, not rewritten from memory).

#### 7.1.2 Contributors (primary)

They want to add new YC content and generate skills. Message: *"Fork it, bring your own keys, run a few commands, open a PR."*

Give them:

- Prerequisites (Python 3.11, Git, pip, ≥1 LLM API key).
- The exact setup steps and per-batch workflow (Section 6.10).
- The cold-start warning.
- Quota management basics.
- Contribution/PR flow.

#### 7.1.3 Curious founders / general visitors (secondary)

They just want to understand the idea. Message: *"YC's public startup advice, turned into cards your AI assistant can follow — with real quotes, verified."*

Give them:

- The 30-second explanation and analogy.
- The three core promises.
- A simple pipeline diagram.
- The taxonomy grid.

### 7.2 User flows (design the site around these)

**Flow A — Curious visitor (completable in ≤3 clicks):**

1. Lands on home → reads hero one-liner and subheading.
2. Reads the three core promises (scroll or click).
3. Reads "How it works" + the recipe-card analogy.
4. Optionally: scans taxonomy preview, reads FAQ teaser.
5. Leaves with a clear answer to "what is this?" — no dead ends.

**Flow B — AI agent developer:**

1. Home → clicks "For AI Agents" (primary CTA).
2. Reads "What you get" and picks their framework from the format table.
3. Reads the fallback rules (the most important rule).
4. Copies a working code example (copy button).
5. Follows the link to the full consumption guide / GitHub repo.

**Flow C — Contributor:**

1. Home → clicks "For Contributors" (primary CTA).
2. Reads BYOK explanation + prerequisites.
3. Follows setup steps in order (commands are copyable).
4. Sees the cold-start warning before running anything.
5. Runs the per-batch workflow, then the troubleshooting table if needed.
6. Follows the link to the full BYOK guide.

**Flow D — Reference seeker:**

1. Uses the nav to go directly to Taxonomy or CLI Reference.
2. Finds the answer in a table or grid without reading marketing copy.

### 7.3 Wayfinding requirements

Every page must answer four questions (Apple Design, "wayfinding"):

- **Where am I?** — visible page title, consistent header, active nav state.
- **Where can I go?** — persistent top nav on every page with the same labels and order.
- **What's here?** — page content follows the page title immediately; no surprise content.
- **How do I get out?** — every path has a way back: nav, footer links, breadcrumb not required, "back to top" on long pages, and any overlay/panel must be dismissible by Escape, close button, and tapping outside.

**Label rule (Apple Design, "direct, specific labels"):** name nav items for their contents — "For AI Agents", "For Contributors", "Taxonomy", "CLI Reference", "FAQ" — not vague umbrellas like "Resources" or "Learn More". A visitor should predict what a page contains before clicking.

---

## 8. Information Architecture & Required Site Content

### 8.1 Sitemap

Six pages, all reachable from the persistent nav:

| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | Explain the product, three promises, how it works, sample skill, taxonomy preview, audience split, FAQ teaser |
| For AI Agents | `agents.html` | Consumer guide: what you get, how to get files, formats, fallback rules, code examples |
| For Contributors | `contributors.html` | BYOK guide: setup, workflow, cold-start warning, quota, validation, PR flow, troubleshooting |
| Taxonomy | `taxonomy.html` | Full category/subcategory reference |
| CLI Reference | `cli.html` | The 12 commands, exact syntax, pipeline order |
| FAQ & License | `about.html` | FAQ, license, attribution, disclaimer |

### 8.2 Home (`index.html`)

- **Hero:** one-liner (Section 3.3), subheading, primary CTA ("Read the docs" → agents page; "Contribute" → contributors page; "View on GitHub" → repo URL).
- **The problem/solution:** 2–3 sentences on why vague AI startup advice is risky and how verbatim, attributed quotes fix it.
- **Three core promises** (Section 6.1) as three cards.
- **How it works:** 4-step plain-English summary (ingest YC content → distill into skill files → verify quotes → agents load the files), with the analogy from Section 3.4.
- **Sample skill preview:** a stylized, clearly labeled "Illustrative example" card showing frontmatter fields and body sections (Section 6.4). Mark it as illustrative if it is not from a real published skill.
- **Taxonomy preview:** the 8 categories as cards with one-line descriptions; link to the full taxonomy page.
- **Who it's for:** two cards — "For AI agents" and "For contributors" — each linking to the guide page.
- **FAQ teaser:** 3–4 of the most important FAQ items with links.
- **Footer:** repo link, license summary, "Not affiliated with Y Combinator" note.

### 8.3 For AI Agents (`agents.html`)

- What consumers get (skills, specs, index files) — table from Section 6.2.
- The three ways to get the files (clone, release bundle, raw URLs) — exact methods from `docs/CONSUMPTION.md`.
- The three spec formats — table from Section 6.5, with "which one should I use" guidance.
- How agents find skills: `skills-index.json` lookups (by_id, by_tag, by_category), and the signal prefixes `/category`, `%tag`, exact skill ID, fuzzy search.
- **Fallback behavior — the most important rule:** 3 closest skills, labeled general advice, NEVER invent YC quotes. Include the exact "Wrong vs. Right" example from `docs/CONSUMPTION.md` (it is illustrative but documented).
- Small integration code examples (Python snippets from `docs/CONSUMPTION.md` — copy from the doc, do not rewrite).
- Link to the full consumption guide: `docs/CONSUMPTION.md` in the repo.

### 8.4 For Contributors (`contributors.html`)

- What BYOK means and why it exists (contributors supply API keys; project doesn't pay for everyone's usage).
- Prerequisites table (Python 3.11/3.12, Git, pip 24.x+, ≥1 API key).
- Step-by-step setup (exact commands from Section 6.10).
- The pipeline stages in plain English (Section 6.7) — what each CLI command does.
- The per-batch workflow command block (Section 6.10).
- The **cold-start warning** (prominent callout).
- Quota management: `quota` command, provider rotation, UTC midnight reset, defaults table (labeled as defaults).
- Validation overview: what happens before a skill is published.
- Contribution flow: branch → commit generated files only → PR → CI validation → merge.
- Troubleshooting table (condensed from `docs/BYOK.md`: ModuleNotFoundError, providers exhausted, minimum batch size, missing table, stuck `extracting` → `reaper`).
- Link to the full BYOK guide: `docs/BYOK.md`.

### 8.5 Taxonomy (`taxonomy.html`)

- The full 8-category table from Section 6.3 (categories, descriptions, subcategories as chips).
- Explanation: every skill has exactly one category; subcategories are embedded in skill IDs; tags allow cross-category discovery.
- Note that categories are intentionally locked to prevent sprawl; new categories require a PR.
- Link to `docs/TAXONOMY.md` and `config/taxonomy.yml`.

### 8.6 CLI Reference (`cli.html`)

- The 12-command table from Section 6.9 with the exact invocation format `python -m src.cli <command>`.
- A note that the full pipeline order is: ingest → chunk → forge → link → export → validate → index.
- Link to `docs/BYOK.md` and the README.

### 8.7 FAQ & License (`about.html`)

Include (all verified against README / docs):

- Do I need Python/API keys to USE skills? No.
- Do I need API keys to GENERATE skills? Yes (BYOK).
- How do quotes get verified? Three-layer validation (Section 6.8).
- Can I use only some skills? Yes — filter by category/tag.
- What does low confidence mean? Fewer sources corroborated; still valid, treat as less authoritative.
- How often are skills added? Manually, no fixed schedule.
- What's the difference between `skills-index.json` and `similarity_matrix.json`? Lookup vs. relationships.
- License details (Section 6.11) and the "not affiliated with Y Combinator" disclaimer.
- Link to the full README.

### 8.8 Information hierarchy rules

- One `h1` per page, stating exactly what the page is ("OpenYC Skills for AI Agents", "OpenYC Skills Taxonomy").
- Content order within a page: answer "what is this" before "how do I use it" before "reference tables".
- The most important action on each page is visually dominant (one primary button per page; secondary actions visually quieter).
- Marketing sections never hide functional content: the CLI commands, cold-start warning, and fallback rules must be reachable within one click, never behind an accordion by default.

---

## 9. Required Functionality

These are the site-wide functional requirements. Every one must exist; none may be replaced by decoration.

### 9.1 Navigation

- Persistent top nav on all six pages with the same labels and order: Home, For AI Agents, For Contributors, Taxonomy, CLI Reference, FAQ.
- Active page indicated in the nav (mapped to the current page — controls reflect where you are).
- On mobile: nav collapses to a menu button; the menu must be keyboard-operable, close on Escape, close on selection, and lock body scroll while open (released on close).
- No-JS fallback: nav remains usable as a simple anchor list.

### 9.2 Content interactions

- **Copy-to-clipboard** on every code block (setup, workflow, CLI examples, code examples). The button gives immediate feedback on press and a persistent success state ("Copied") after copying.
- **FAQ disclosures** expand/collapse. Baseline: native `<details>`/`<summary>` (works without JS, keyboard accessible). Enhancement: spring-based open/close that is interruptible and respects reduced motion.
- **Taxonomy chips** and **category cards** are informational; no fake interactivity. If a card links to the taxonomy page, give it a clear link affordance.
- **External links** (GitHub repo, source docs) open in the same tab unless they are file downloads; mark external links with a subtle icon or label where helpful.

### 9.3 Layout behavior

- Responsive at 360 / 768 / 1024 / 1280+ px with no horizontal page scroll.
- Tables scroll horizontally inside their container on small screens (the table never stretches the page).
- Cards: 1 column mobile, 2 columns ≥720px, 3–4 columns ≥1024px where grids are used.
- Touch targets ≥44×44px; small inline controls get ~10px of hit padding.

### 9.4 Progressive enhancement

- All content readable with JavaScript disabled.
- Interactive behaviors (copy, menu, FAQ motion) are enhancements on top of native/static functionality, never the only way to access content.

### 9.5 SEO & metadata

- Unique `<title>` and meta description per page.
- Open Graph tags on `index.html` (title, description, type, image if one exists).
- Canonical link to the deployed URL; `lang="en"`.

### 9.6 Accessibility (functional baseline)

- Skip-to-content link as first focusable element.
- Visible focus ring on all interactive elements (`:focus-visible`).
- All icons have `aria-hidden="true"` unless they convey meaning; meaning-bearing icons have accessible labels.
- Landmarks: `header`, `nav`, `main`, `footer`; one `h1` per page.
- Keyboard operability for nav, menu, FAQ, and copy buttons.

---

## 10. Copywriting & Terminology Rules

### 10.1 Glossary (use these definitions on the site)

| Term | Definition to use on the site |
|------|-------------------------------|
| Skill file | A Markdown file with YAML metadata containing one narrow piece of startup advice, verbatim quotes, application instructions, edge cases, and related skills |
| Spec file | A wrapper around a skill file, formatted for a specific AI framework (MCP, OpenAI, or Hermes) |
| Frontmatter | The YAML metadata block at the top of a skill file |
| Taxonomy | The fixed tree of 8 categories and their subcategories |
| Pipeline | The sequence of steps that turns raw YC content into validated skill files |
| Forge | The core pipeline stage: extract → cluster → synthesize |
| Chunk | A 200–800 word segment of an essay or transcript |
| LLM | Large Language Model (e.g., DeepSeek, Gemini) used to read content and write skills |
| BYOK | Bring Your Own Keys — contributors supply their own LLM API keys |
| MCP | Model Context Protocol — a standard for defining tools AI agents can invoke |
| Hermes | A plain-text skill format for local models (Ollama, llama.cpp) |
| Confidence | A 0.0–1.0 score computed from source agreement — not the LLM's opinion |
| Hallucination guard | The validation layer that checks for invented speakers, quotes, or facts |
| `skills-index.json` | The machine-readable directory of all skills |
| `similarity_matrix.json` | Pre-computed relatedness scores between skills |
| `registry.db` | The local SQLite database contributors use to track pipeline state (never published) |

### 10.2 Naming consistency (mandatory)

- Write the project name exactly as **OpenYC Skills** (capital O, Y, C; capital S).
- Write the repo as `openyc-skills` (all lowercase) when referring to the repository.
- Write categories/subcategories in the exact lowercase hyphenated form (`founder-mental-models`, `product-market-fit`).
- Write CLI commands in `code` formatting exactly as in Section 6.9.
- Use "Y Combinator" and "YC" as in the source docs; never invent "Y-Combinator" or "YC's".
- Attribute quotes to named speakers (e.g., Paul Graham), not to "YC" as an organization.

### 10.3 Tone rules

- Clear, simple, friendly; explain jargon on first use.
- Confident but precise. Never hype beyond the facts.
- Use "you" for the reader. Use "OpenYC Skills" for the project.
- Short sentences. Headings that say what the section is about.
- Prefer examples over abstract description.
- **Simplicity is not minimalism** (Apple Design): strip the unnecessary, but never bury important information. If a concept needs context to be clear, add the context (e.g., the cold-start warning is not "removed for simplicity" — it stays).
- **Be concise:** plain language, fewer steps. Show the common path first; put advanced options one level deeper (e.g., full provider quota table lives on the contributors page, not the home page).

### 10.4 Do / don't table

| Do | Don't |
|----|-------|
| Say "consumers download static files — no API keys, no database, no Python" | Say "no code required" for contributors (they DO need Python) |
| Say "every quote is verified against source transcripts using fuzzy matching" | Say "every quote is 100% fact-checked by humans" |
| Say "skills are exported for MCP, OpenAI function calling, and Hermes" | Say "OpenYC Skills has an API" or "hosts an MCP server" |
| Say "AI agents can load these files" | Say "OpenYC Skills is an AI agent" |
| Say "generation is manually triggered by contributors" | Say "new skills are added automatically" |
| Say "startup advice sourced from Y Combinator's public content" | Say "official Y Combinator software" or imply endorsement |
| Say "confidence is computed from cluster metrics" | Say "the AI rated its own confidence" |
| Say "related skills come from a similarity matrix" | Say "the AI guessed related skills" |

---

## 11. Visual & Interaction Design — Apple Design Applied

This section translates Apple's design philosophy into concrete requirements for **this** product: a developer-tool website with a terminal-based identity, dark palette, and content-heavy reference pages. It is **not** a mandate to copy Apple's website. The result should be a calm, precise, purposeful site that happens to be designed with Apple's principles — not an Apple clone with an orange accent.

### 11.1 Design philosophy for this product

Use these eight principles as the names you reason with (Apple Design):

1. **Purpose.** Every element asks for the visitor's time and attention. Decide what *not* to build: no decorative hero animations, no confetti, no content that doesn't serve understanding or action. The three core promises and the two audience paths are the site's reason to exist.
2. **Agency.** Visitors stay in control: no auto-playing media, no modal on load, no forced scroll paths, no content that moves under the cursor. Every interaction has immediate feedback so the visitor always knows the system heard them.
3. **Responsibility.** Act in the visitor's interest: accurate claims only (Section 14), no dark patterns, no misleading "official" branding, and the Y Combinator disclaimer is never hidden.
4. **Familiarity.** Use conventional web patterns — top nav, cards, standard links, native `<details>` FAQ — so behavior is predictable. Things that look the same must behave the same and live in the same place across all six pages.
5. **Flexibility.** Design for phones, tablets, desktops, mouse, touch, keyboard, screen readers, and user text-size settings. Never make a hover state the only way to access information.
6. **Simplicity — not minimalism.** Strip the unnecessary, but never hide important functionality. The common path (understand → choose audience → follow instructions) is primary; reference tables live one level deeper on their own pages.
7. **Craft.** Every spacing, radius, color, timing, and alignment value is deliberate and consistent. Nothing is random; nothing is "close enough." Misaligned cards, jittery scroll, or inconsistent buttons read as carelessness.
8. **Delight.** The emotional target is **calm and confident** — the feeling of a precise tool. Delight comes from refinement: instant press feedback, a spring that settles exactly right, a copy button that confirms, a nav that always tells you where you are. Not from decoration.

### 11.2 Visual identity & art direction

**Direction:** dark, code-first, calm. The terminal is part of the product's identity and appears deliberately:

- One terminal-window motif in the hero (the "sample skill" preview) and real CLI command blocks throughout.
- Monospace only for code, commands, file paths, and terminal content. Prose uses the system sans-serif.
- The YC-orange accent is used sparingly — primary CTA, one or two highlights — never flooding the page.
- The overall impression is a thoughtful developer-tools site, not a "hacker aesthetic" and not an Apple product page.

**What it is NOT (do not do):**

- Do not reproduce Apple's layouts, hero compositions, product-shot carousels, or typographic posters.
- Do not use Apple's proprietary assets, names, or logos.
- Do not add glassmorphism everywhere; translucency is reserved for floating chrome (Section 11.4).
- Do not add gratuitous scroll animations, parallax, or reveal-on-scroll effects.
- Do not make the site look like an Apple product landing page if it conflicts with the product's identity.

### 11.3 Typography

#### 11.3.1 Fonts

- Body: system font stack — `ui-sans-serif, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`.
- Code/mono: `ui-monospace, "Cascadia Code", "JetBrains Mono", Consolas, "Courier New", monospace`.
- No external font CDN. If a custom font is desired, bundle it locally in `assets/fonts/`.
- Default to the platform's system font first (Apple Design: it already ships optical sizing, tracking tables, and legibility tuning).

#### 11.3.2 Optical sizing, tracking, and leading (concrete values)

Tracking (letter-spacing) and leading (line-height) must change with size — never one value for all sizes (Apple Design):

| Text level | Size | Line-height | Letter-spacing |
|------------|------|-------------|----------------|
| Hero display | `clamp(2.25rem, 5vw, 4rem)` | `1.05` (tight) | `-0.02em` to `-0.03em` (negative as it grows) |
| Section headings (h2) | `clamp(1.5rem, 3vw, 2rem)` | `1.15–1.2` | `-0.01em` |
| Sub-headings (h3) | `1.25rem` | `1.3` | `0` to `-0.005em` |
| Body | `1rem–1.125rem` (16–18px) | `1.6` (loose) | `0` |
| UI labels / small text | `0.75rem–0.8125rem` (12–13px) | `1.4` | `+0.01em` to `+0.02em` (slightly positive) |
| Code / commands | `0.875rem–0.9375rem` | `1.6` | `0` |

- **Build hierarchy from weight + size + leading as a set**, not size alone. Emphasize with weight (`font-weight: 600–700`) before increasing size.
- **Respect the user's text-size setting:** layout scales with text using `rem`/`em` spacing, not fixed px, so a larger font doesn't break the layout. The site must remain usable at 200% zoom without horizontal page scroll.
- `font-optical-sizing: auto` where supported.

### 11.4 Color, materials & depth

#### 11.4.1 Palette (dark, fixed for v1)

| Role | Value |
|------|-------|
| Background | `#0d1117` |
| Surface / cards | `#161b22` |
| Border | `#30363d` |
| Text (primary) | `#e6edf3` |
| Text (muted) | `#8b949e` |
| Accent | `#f78166` (YC orange) — primary CTA and highlights only |
| Accent secondary | `#58a6ff` (blue) for links |
| Success | `#3fb950` |
| Warning | `#d29922` |
| Code background | `#010409` |

Rules:

- Text contrast must meet WCAG AA (4.5:1 body, 3:1 large text). Muted text is never used for essential instructions.
- Accent color sits on solid surfaces, not on translucent foreground layers (Apple Design: "put color on a solid layer, not the translucent foreground").
- No background images that reduce readability.

#### 11.4.2 Translucency — use only where it earns its place

Apple Design uses translucent materials as a floating functional layer that brings structure without stealing focus. On this site:

- **The top nav is a translucent layer**: `background: rgba(13, 17, 23, 0.72)` + `backdrop-filter: blur(20px) saturate(180%)`, with content scrolling underneath. It is the site's one permanent floating surface.
- **Material weight encodes hierarchy**: the nav is lighter; cards are solid but distinct; code blocks are near-solid (`#010409` at high opacity). Never stack a light translucent surface on another — legibility collapses.
- **Scroll edge, not hard divider**: where the sticky nav overlaps scrolling content, use a soft gradient/blur mask at the nav's bottom edge instead of a 1px border (only where overlap actually occurs).
- **Materialize, don't just fade** (if the nav/menu animates on mobile): animate blur radius and scale together with opacity on enter/exit so the surface reads as a material arriving, not a plain fade.
- No translucent cards, no glass buttons, no backdrop-filter on non-floating elements.

#### 11.4.3 Depth

- Depth communicates interactivity and hierarchy, in moderation:
  - Cards elevate on hover with `transform: translateY(-2px)` + a soft shadow, settled with a critically damped spring (Section 11.6). Default state has no shadow or a barely-there one.
  - Pressed cards/buttons scale down slightly (`scale(0.97)`) — see Section 11.6.1.
  - Shadows are context-aware: heavier over busy/content-heavy areas, lighter over plain backgrounds.
- **Dim to focus, separate to keep flow**: no scrims are needed in v1 (no blocking modals). If a non-blocking panel is ever added, use translucency and offset without a scrim so flow is preserved.
- No permanent drop shadows on static content; depth is a state, not decoration.

### 11.5 Layout, spacing & craft

- **Spacing scale (4px base):** `4, 8, 12, 16, 24, 32, 48, 64, 96` — use only these values for margin/padding/gaps. Every spacing decision must come from this scale.
- **Grid:** max content width ~1100px, centered; 12-column grid at desktop, stacked at mobile; consistent 24–32px section padding.
- **Geometry:** card radius 10–12px; small elements (chips, buttons) 6–8px; code blocks 8–10px. One radius per component type, consistent everywhere.
- **Borders:** 1px `#30363d`; hairline only where a boundary is needed (cards, code blocks); avoid borders where spacing already separates.
- **Alignment:** code blocks, card text, table columns, and icons align on a common baseline. Nothing is "close enough."
- **Proximity implies relationship** (Apple Design): controls sit next to what they affect — the copy button lives in the code block it copies; the FAQ answer sits under its question; the cold-start warning sits directly above the workflow commands it warns about.
- **Consistency:** identical components behave identically on every page (Section 12). If a button style exists in one place, it exists in all places that style applies.

### 11.6 Interaction & motion system

This is the heart of the Apple Design application. Motion on this site is **behavior, not decoration**: it communicates state, hierarchy, and causality, and it always responds to the user rather than playing prescribed sequences.

#### 11.6.1 Response — kill latency

- **Feedback lives on pointer-down, not release.** Buttons and cards visibly respond the instant the pointer goes down: `transform: scale(0.97)` with `transition: transform 100ms ease-out` for simple press states.
- Audit the input path: no artificial debounces, no transition waits, no 300ms tap delay (`touch-action: manipulation` on interactive elements).
- Feedback is **continuous during interaction**, never only at the end. (This matters for the mobile menu and FAQ: while a panel is opening, its position tracks the gesture or the animation continuously; it never "snaps" at completion.)
- No interaction may be gated behind an animation completing — input stays live during transitions.

#### 11.6.2 Springs — the motion primitive

Use a small, dependency-free spring utility (Section 13.6) for anything a user can touch. CSS transitions and `@keyframes` are acceptable only for **non-gesture** micro-feedback (press scale, opacity fades); gesture-driven or state-changing motion (menu, FAQ panel, card hover settle) uses springs so it is interruptible and velocity-aware.

Concrete spring behavior:

| Interaction | Damping | Response | Rationale |
|-------------|---------|----------|-----------|
| Default UI (menu open, FAQ expand, card hover settle) | `1.0` (critically damped) | `0.3–0.4s` | Graceful, non-distracting, no bounce |
| Momentum-driven (future drag/sheet — not in v1) | `0.8` | `0.3–0.4s` | Overshoot only when the gesture carried momentum |

- **Default to critically damped (`damping 1.0`)** everywhere. Add bounce only for momentum-driven physical interactions — there are none in v1, so there is no bounce in v1.
- **Never animate from the target value.** On interrupt, read the element's live on-screen value and start the new animation from there.
- **Always animate from the current presentation value**, and when a gesture reverses, blend velocity rather than hard-cutting it (the menu being closed mid-open follows the finger/input and reverses smoothly).
- **Every animation is interruptible.** Never lock input during a transition. If the user re-triggers, re-targets, or reverses, the motion responds immediately.
- **Animate only compositor-friendly properties** — `transform` and `opacity` — and hint with `will-change` where motion is imminent. No animating `height`, `top`, `left`, or `margin` for motion (for FAQ height, use a measured-content technique with transform/opacity, or a grid-rows/keyword technique that does not force layout jank).

#### 11.6.3 Direct manipulation & gesture principles (apply where gestures exist; do not invent drag gestures)

This content-focused site has **no required drag gestures in v1**. Apply these principles when interactive panels or future components introduce gestures:

- Pointer Events + `setPointerCapture` so tracking continues when the pointer leaves bounds.
- Track a short velocity/position history (last few `pointermove` events), not just the current point.
- Respect the grab offset — never snap a dragged element to its center.
- ~10px movement threshold before committing to a drag direction (hysteresis); allow cancel-by-dragging-away.
- At a boundary, rubber-band (progressive resistance) instead of a hard stop.
- On release, hand off the finger's velocity to the spring so there is no seam between gesture and animation.
- Project momentum to the resting position before choosing a snap target (Apple's exponential-decay projection), then hand off velocity.
- Detect all plausible gestures in parallel from the first move; cancel losers once intent is clear. Avoid recognizers that only report a final state.

**v1 restraint:** because no drag interaction exists on this site, do not add one "for polish." The above rules are the contract for any future gesture component (e.g., a dismissible sheet or swipeable carousel), not a reason to build one now.

#### 11.6.4 Spatial consistency

- **Enter and exit along the same path.** The mobile menu that drops from the header closes back up into the header; a panel that opens from a button closes toward that button. Never open one way and dismiss another.
- **Anchor interactions to their source.** Popovers, menus, and panels use `transform-origin` at the triggering element, so the spatial relationship between trigger and content is obvious.
- **Mirror easing on reversible transitions** (inverse cubic-bézier control points for the return path) so outbound and return feel like the same physical system.
- **Hint in the direction of the gesture:** intermediate frames should telegraph where the motion is going, not interpolate blindly.

#### 11.6.5 The motion budget (restraint)

Motion is expensive in attention. This site's entire budget:

1. Press feedback on buttons/cards (pointer-down, 100ms).
2. Hover elevation on cards (spring, damping 1.0, response 0.4).
3. Mobile menu open/close (spring, anchored to the header, interruptible, symmetric path).
4. FAQ disclosure open/close (spring on content, interruptible, symmetric).
5. Copy-button success state (instant, no long animation).
6. One subtle entrance for the hero on first load (spring or 400ms ease, played once, disabled under reduced motion). Nothing else on the page animates on scroll or load.

**Explicitly out of budget:**

- No scroll-triggered reveals, parallax, or scroll-jacking.
- No looping animations, marquees, or pulsing elements.
- No animation on static content (chips, tables, callouts, footer).
- No full-viewport motion or moving backgrounds.
- No decorative confetti/celebrations — even on copy success.
- No animation that delays interaction or adds motion without communicating hierarchy or state.

#### 11.6.6 Frame-level smoothness

- `requestAnimationFrame` is the clock for spring work (display-synced).
- Keep per-frame positional changes below the perception threshold (no strobing); for any very fast motion, consider a subtle stretch/blur to encode speed.
- Avoid layout thrash: measure once, animate transform/opacity only.
- Review motion in slow motion / frame-by-frame during QA (Section 15.2) to catch what's invisible at full speed.

### 11.7 Motion & accessibility

Reduced motion does not mean no feedback — it means a gentler, non-vestibular equivalent. Respond to three independent signals:

1. **`prefers-reduced-motion: reduce`** — replace springs/slides/parallax with short opacity cross-fades (200ms) or static state changes. Drop overshoot/elastic entirely. Keep opacity/color changes that aid comprehension (press states, focus, active nav).
2. **`prefers-reduced-transparency: reduce`** — make translucent surfaces frostier/solid: raise background opacity and drop the blur. The nav must remain legible and the site fully usable.
3. **`prefers-contrast: more`** — near-solid backgrounds with a defined, contrasting border on surfaces.

Additional rules:

- No full-viewport moving backgrounds; no slow looping oscillations (near 0.2Hz / one cycle per 5s).
- No abrupt brightness jumps; if a theme switch is added later, ease the dark↔light change.
- If a large surface must move (e.g., a sheet), keep it semi-transparent while traveling and fade it back in once settled.

Example baseline (must exist in CSS):

```css
@media (prefers-reduced-motion: reduce) {
  .sheet, .menu, .faq-panel {
    transition: opacity 200ms ease;
    transform: none !important;
  }
}
@media (prefers-reduced-transparency: reduce) {
  .nav {
    background: #0d1117;
    backdrop-filter: none;
  }
}
```

### 11.8 Responsive behavior

- **Mobile-first.** Base styles target small screens; `@media (min-width: 720px)` and `(min-width: 1024px)` add columns and spacing.
- **Breakpoints:** 720px (two-column grids), 1024px (three/four-column grids, larger hero).
- **Navigation:** desktop = horizontal nav with active state; mobile = menu button opening a translucent panel anchored to the header (spring, interruptible, Escape to close, body scroll locked while open, closes on selection).
- **Touch vs. pointer:** on touch, hover states must never be required (information is always visible without hover); press feedback replaces hover feedback. On desktop, hover adds affordance and elevation but never hides content.
- **Text scaling:** layout survives 200% zoom and OS font-size changes — spacing in `rem`, text in `rem`, no fixed-height containers that clip text.
- **Orientation/rotation:** no layout breakage on rotation or resize; sticky nav never traps content.
- **Tables:** horizontal scroll inside a container with a subtle edge fade indicating more content; the first column (command names) can be `position: sticky` on mobile for readability.

---

## 12. Component & System Requirements

Every component below has a purpose, states, behavior, motion, and accessibility contract. Components that look the same must behave the same on every page.

### 12.1 Top navigation

- **Purpose:** persistent wayfinding; answer "where am I / where can I go."
- **Behavior:** translucent sticky bar (`backdrop-filter: blur(20px) saturate(180%)`, `rgba(13,17,23,0.72)`); active page highlighted; scroll-edge gradient mask instead of a hard border; brand/logo links home.
- **States:** default, hover (text brightens/underline offset), active (accent or stronger contrast + `aria-current="page"`), focus-visible ring, pressed (feedback on pointer-down).
- **Mobile:** menu button → panel anchored to the header; spring open/close (damping 1.0, response 0.3–0.4); Escape closes; body scroll locks; selecting a link closes the panel; reduced motion → 200ms cross-fade.
- **No-JS:** nav renders as a static list of anchor links.

### 12.2 Buttons

- **Primary button:** solid accent (`#f78166`), dark text, high contrast; used at most once per page (hero CTA).
- **Secondary button:** bordered surface button (`#161b22` + 1px border), text `#e6edf3`.
- **Link-style button:** text + arrow, used for "View on GitHub" and doc links.
- **All buttons:** instant press feedback (`scale(0.97)` on `:active` / pointerdown, 100ms ease-out), `:focus-visible` ring, min 44×44px target (with ~10px hit padding for inline variants), descriptive label (never "click here").
- **Labels:** copy from Section 8 page requirements; no invented CTA text.

### 12.3 Hero

- **Purpose:** explain the product in seconds.
- **Content:** one-liner (Section 3.3), one-sentence subheading, primary CTA, secondary CTA, terminal-window sample-skill motif.
- **Motion:** one subtle entrance (spring damping 1.0, response 0.5, or 400ms ease; played once; cross-fade under reduced motion). No looping, no parallax, no floating particles.
- **Layout:** stacked on mobile; split (copy left, terminal right) ≥1024px.

### 12.4 Terminal mockup / sample skill card

- **Purpose:** show what a skill file looks like; carries the product's terminal identity.
- **Content:** window chrome (three dots, filename bar), real YAML frontmatter fields from Section 6.4, and 2–3 body sections — clearly labeled **"Illustrative example"** unless copied from a published skill file.
- **Behavior:** content selectable; if it is a code block, it gets a copy button. No fake interactive terminal typing.
- **Motion:** hover elevation only (spring, damping 1.0). No blinking cursor, no typing animation.

### 12.5 Promise cards (three core promises)

- **Purpose:** communicate the three promises at a glance.
- **Content:** icon (inline SVG), title, 2–3 sentence description from Section 6.1.
- **Behavior:** hover elevation (translateY(-2px) + shadow, critically damped spring); press scale; no per-card entrance animations; no flip/3D.
- **Layout:** 1 column mobile, 3 columns ≥1024px.

### 12.6 Category cards & taxonomy chips

- **Purpose:** make the 8-category taxonomy scannable.
- **Content:** exact category names/descriptions from Section 6.3; subcategories as chips.
- **Behavior:** informational; if a card links to `taxonomy.html`, the whole card is a link with a clear affordance (chevron), hover elevation, press feedback. Chips are static text with no interaction (no fake filtering).

### 12.7 Code blocks

- **Purpose:** exact commands and examples; the most safety-critical content on the site.
- **Content:** real commands from Section 6.9/6.10 verbatim; source-annotated (Section 14).
- **Behavior:** near-solid background (`#010409`), header bar with language/filename label, **copy button** in the header. Copy feedback: press feedback on pointer-down, then persistent "Copied" success state (success color + icon) for ~2s; works with `navigator.clipboard` and a fallback; button hidden without JS.
- **Layout:** horizontal scroll inside the block (`overflow-x: auto`), no page-level scroll; no line numbers unless helpful for long outputs.
- **Motion:** none (static content); the copy state change is instant, no confetti.

### 12.8 Callouts

- **Purpose:** warnings and notes that must not be missed (cold-start warning, quota note, disclaimer).
- **Variants:** info (blue), warning (yellow), success (green). Icon + text, left accent border or tinted background.
- **Behavior:** static; no animation; warning variant uses the strongest visual weight (it protects contributors from a real failure mode).

### 12.9 Tables

- **Purpose:** reference data (CLI commands, providers, formats, taxonomy).
- **Behavior:** readable at all widths; horizontal scroll container on mobile with edge fade; sticky header optional; hover row highlight on desktop (subtle, no motion).
- **Craft:** consistent column alignment (numbers right-aligned), monospace for commands/paths, no zebra striping unless it aids scanning.

### 12.10 FAQ disclosure

- **Purpose:** keep the FAQ page compact without hiding answers.
- **Baseline:** native `<details>`/`<summary>` — works with no JS, keyboard accessible, `aria-expanded` automatic.
- **Enhancement:** interruptible spring open/close (damping 1.0, response 0.35), symmetric path, `transform-origin` at the summary (content grows from its question), reduced-motion → 200ms opacity cross-fade.
- **Behavior:** one may be open at a time (or many — pick one and be consistent); Escape does not close details, but focus returns predictably; clicking summary toggles immediately (no debounce).

### 12.11 Footer

- **Purpose:** exit and legal context.
- **Content:** nav links (repeat), GitHub repo link, license summary (MIT code / CC BY-SA 4.0 skills), "Not affiliated with Y Combinator" disclaimer, copyright line.
- **Behavior:** static; no newsletter signup (out of scope); links match nav behavior.

### 12.12 Page chrome & metadata

- Unique `<title>` and meta description per page (Section 9.5).
- Skip link, `lang="en"`, semantic landmarks, one `h1`.
- No page transitions in v1 (cross-fade only if added; never slide/stack pages).

---

## 13. Technical Implementation Requirements

### 13.1 Stack (locked)

- **Plain HTML5, CSS3, and vanilla JavaScript. No build step. No package.json. No framework.**
- No backend, no forms that require a server, no analytics SDK by default.
- No external CDN resources (fonts, icons, libraries). Everything ships from this repo.
- This is locked to keep the site trivially reviewable, dependency-free, and deployable on any static host.

### 13.2 File structure (create exactly this)

```
OpenYC Website/
├── AGENTS.md              # This file
├── README.md              # Website repo readme (see 13.7)
├── index.html             # Home
├── agents.html            # For AI Agents
├── contributors.html      # For Contributors
├── taxonomy.html          # Taxonomy
├── cli.html               # CLI Reference
├── about.html             # FAQ & License
├── styles/
│   └── main.css           # All styles (single file)
├── scripts/
│   ├── motion.js          # First-party spring/motion utility (see 13.6)
│   └── main.js            # Nav, copy buttons, FAQ enhancement, current-page highlight
└── assets/
    ├── icons/             # Inline SVG files if needed
    └── og-image.png       # Optional social preview image (1200×630)
```

### 13.3 Shared components

Every page shares:

- The same `header` nav with the same links and order.
- The same `footer` (repo link, license summary, disclaimer).
- The same `styles/main.css` and `scripts/main.js`.
- A `.page-title` heading that matches the page name in the nav.

### 13.4 CSS conventions

- Design tokens as CSS custom properties in `:root`: colors (Section 11.4.1), spacing scale (Section 11.5), radii, font stacks, and the spring/motion variables.
- Type scale implemented with `clamp()` and `rem` (Section 11.3.2).
- Motion accessibility media queries present from the start (Section 11.7).
- No inline styles in HTML; no `!important` unless absolutely necessary.

### 13.5 JS conventions

- `main.js` is the only app script; `motion.js` is a small first-party utility, not a library.
- Progressive enhancement: all core content and navigation work without JS.
- No global mutable state; use modules or IIFEs; no `document.write`; no inline event handlers in HTML.
- `touch-action: manipulation` on interactive elements; pointer events for press feedback.
- No console errors; no network requests at runtime (the site makes zero API calls).

### 13.6 The motion utility (first-party, dependency-free)

Implement a small spring utility in `scripts/motion.js` (~60–100 lines). Requirements:

```js
// Minimum API (design freely, but this must work):
// animate(el, { transform: { y: targetY } }, { damping: 1.0, response: 0.4, velocity: 0 })
//   -> runs a spring on the current on-screen value to the target, via requestAnimationFrame,
//      animating transform/opacity only, interruptible at any frame.
// cancelAnimation(el) -> stops the current loop and keeps the element at its live value.
// reduceMotion() -> returns true when prefers-reduced-motion is set (callers then cross-fade or snap).
```

Behavioral requirements:

- **Interruptible:** any new `animate()` call on an element cancels the previous loop and starts from the element's live computed value — never from the logical target.
- **Velocity-aware:** accept an initial velocity parameter so future gesture handoff works; on re-target mid-flight, blend velocity instead of hard-cutting.
- **Compositor-only:** writes `transform` (translate/scale) and `opacity` only; uses `will-change` hints where motion is imminent; reads layout at most once per interaction.
- **Spring model:** damping `1.0` default (critical), response `0.3–0.5`; no bounce unless explicitly requested (reserved for momentum interactions that do not exist in v1).
- **Reduced motion:** callers must check `reduceMotion()` and use 200ms opacity cross-fades or instant state changes instead of springs.

### 13.7 README.md for this website repo

The website repo README must state:

- This repo contains the marketing website for OpenYC Skills.
- It is a static site (no build step); preview with `python -m http.server 8080`.
- Where the source project lives (`https://github.com/HanuShashwat/openyc-skills`).
- How to preview and how to deploy (GitHub Pages = push `main` and enable Pages; or any static host).
- A link to `AGENTS.md`.

### 13.8 Deployment

- Default target: **GitHub Pages** (or any static host the user chooses).
- The site must work when served from the repo root and from a subpath (use relative URLs: `styles/main.css`, `agents.html` — no leading slashes).

---

## 14. Content Accuracy Workflow

### 14.1 The mandatory procedure

For **every** page section that contains facts, commands, numbers, or names:

1. Identify the claim (e.g., "Pipeline uses 4 LLM providers").
2. Locate it in the Section 5 documents (use search).
3. Copy the exact wording/value from the document — do not paraphrase numbers.
4. Add an HTML comment immediately before the element that states the source, e.g.:

```html
<!-- SOURCE: docs/BYOK.md — "How the BYOK Model Works" (4 LLM providers) -->
```

5. If the claim cannot be found, **remove it or mark it** `<!-- TODO: verify with maintainer -->`. Never leave unverified claims on the page.

**Design decisions are different:** visual/interaction/motion requirements come from Section 11 of this file and the Apple Design skill — they do not need source-document annotations. Product facts do.

### 14.2 Command verification

Every CLI command on the site must match Section 6.9 exactly. After writing a page, run a check: search the page for `python -m src.cli` and confirm every occurrence exists in the CLI table.

### 14.3 Quote verification

- If you display a YC speaker quote, it must come from a **published skill file** in the source repo (`skills/`), or be clearly labeled **"Illustrative example"**.
- Do not invent quotes or attribute general advice to named YC people.

### 14.4 Link verification

- All internal links must target existing files/anchors in this repo.
- The GitHub link must be `https://github.com/HanuShashwat/openyc-skills`.
- Links to the source docs must use the GitHub raw/HTML URLs (e.g., `https://github.com/HanuShashwat/openyc-skills/blob/main/docs/CONSUMPTION.md`), not local paths.

---

## 15. Development & QA Workflow

### 15.1 Local preview

```powershell
cd "C:\Users\hanus\OneDrive\Documents\ChatGPT\OpenYC Website"
python -m http.server 8080
# open http://localhost:8080
```

If Python is unavailable, any static server works (`npx serve .`).

### 15.2 QA checks before finishing

**Content & links:**

1. **Link check:** open every page; click every nav link, footer link, and anchor; no 404s.
2. **Command check:** every `python -m src.cli` on the site matches Section 6.9.
3. **Fact check:** every number/claim has a `SOURCE:` comment or a Section 6 reference.

**Interaction & motion (the Apple Design pass):**

4. **Latency audit:** press every button/menu/FAQ on pointer-down; feedback is instant, no artificial delays, no debounced feels.
5. **Interruptibility check:** trigger the mobile menu or FAQ open and immediately reverse/retrigger mid-motion; no jump to target values, no input lockout, no "brick wall" reversal.
6. **Spring check:** default interactions are critically damped (no bounce); no animation plays on static content; hero entrance plays once and is subtle.
7. **Reduced-motion check:** with `prefers-reduced-motion: reduce`, springs/slides become 200ms cross-fades or static; with `prefers-reduced-transparency: reduce`, the nav becomes solid and legible; with `prefers-contrast: more`, surfaces get defined borders.
8. **Slow-motion review:** record the menu/FAQ/copy interactions and review frame-by-frame (or use throttled dev tools) to catch strobing, layout thrash, or velocity seams.

**Responsive & accessibility:**

9. **Responsive check:** verify at 360px, 768px, 1024px, and 1280px; no horizontal page scroll; nav usable; tables scroll inside containers; touch targets ≥44px.
10. **Text scaling check:** verify at 200% zoom and with increased OS font size; no clipped text, no overlapping elements.
11. **Keyboard check:** tab through nav, menu, FAQ, copy buttons; visible focus; Escape closes the menu; skip link works.
12. **Screen-reader sanity:** landmarks, one `h1`, `aria-current` on active nav, `aria-expanded` on FAQ/menu (native elements where possible).
13. **Automated checks:** Lighthouse or axe — no errors, AA contrast, accessibility score ≥ 90.

**Technical:**

14. **No-JS check:** with JavaScript disabled, all content readable; nav usable as a list; FAQ answers visible (native `<details>`); copy buttons absent.
15. **Console check:** no console errors or failed resource loads; zero network requests at runtime.
16. **HTML check:** W3C validation where available; all pages have one `h1`, `lang`, title, meta description.
17. **Performance check:** page weight minimal (no external fonts/icons), Lighthouse performance ≥ 90; no layout shift (CLS < 0.1).

### 15.3 Git workflow

- The repo currently has commits on `main` (LICENSE + AGENTS.md). Work on a branch prefixed `codex/` (e.g., `codex/website-initial`), then merge to `main` after QA.
- Commit message format: `website: <short description>` (e.g., `website: add taxonomy page`).
- Do not commit `.DS_Store`, editor folders, or any local-only files.

---

## 16. Constraints & Things to Avoid

### 16.1 Product accuracy constraints (from the source project)

1. **OpenYC Skills ≠ Y Combinator.** Never imply affiliation/endorsement. Include the disclaimer in the footer.
2. **OpenYC Skills ≠ OpenAI.** The "OpenAI spec format" is a file format for OpenAI-compatible agents, not a relationship with OpenAI.
3. **The website is not the product.** Do not build a fake terminal, a demo pipeline, or claim the site can generate skills.
4. **MCP is a spec format, not a hosted server.** Say "specs for MCP-compatible agents," never "we host an MCP server."
5. **Consumers vs. contributors are different audiences.** Never mix their requirements. "No Python needed" applies only to consumers.
6. **No published skills yet.** Do not display a skill count, a skills gallery, or example skill IDs as real. Mark examples as illustrative.
7. **Don't invent quotes.** Only published skill files or clearly labeled illustrative examples.
8. **Don't invent numbers.** Not skill counts, provider limits, prices, or community stats. Use Section 6 values or omit.
9. **Command fidelity.** One wrong flag on a CLI command breaks a new user's setup. Copy from Section 6.9 exactly.
10. **Don't duplicate the docs.** The site distills and links to the docs; it doesn't need every detail.
11. **Don't forget the cold-start warning.** It is the most commonly missed contributor instruction.
12. **Don't say "the AI generates confidence."** Confidence is computed from math. Related skills too.
13. **Don't use "RAG" or "vector database" as a feature.** Similarity is pre-computed; there is no runtime retrieval system.
14. **Don't promise updates.** Skills are added manually with no fixed schedule.
15. **Don't claim human verification.** The validation is automated (with optional human review for flagged items).

### 16.2 Design anti-patterns (Apple Design applied with restraint)

1. **No Apple cloning.** Do not copy Apple's website layouts, hero compositions, or product-page patterns; no Apple assets or names.
2. **No gratuitous glassmorphism.** Translucency is reserved for the floating nav (and any future floating panel); never on cards, buttons, or static content.
3. **No scroll-jacking or scroll-triggered reveals.** The page is readable and stable; content does not appear as you scroll.
4. **No animation everywhere.** Follow the motion budget (Section 11.6.5). If a component is not in the budget, it does not animate.
5. **No pre-scripted sequences.** Motion responds to input; it never plays prescribed enter/exit loops with fixed durations on touchable elements.
6. **No bouncing by default.** Springs are critically damped; bounce is reserved for momentum interactions that do not exist in v1.
7. **No hover-only information.** Anything essential is visible without hover.
8. **No fake interactivity.** Chips, tables, and static cards do not pretend to be buttons; if it looks interactive, it behaves interactively, and vice versa.
9. **No modal on load, no autoplay, no forced paths.** The visitor is in control.
10. **No decorative motion on success.** Copy feedback is instant and quiet; no confetti.
11. **No hard dividers where spacing or edge-fade suffices.** Borders and shadows are deliberate, not default.
12. **No random values.** Spacing, radii, timing, and colors come from the scales in Section 11; if a value is not in the scale, either justify it or change it.

---

## 17. Decision Rules

When facing ambiguity, resolve in this order:

1. This `AGENTS.md` (explicit rules above).
2. The source-of-truth documents (Section 5), preferring `config/taxonomy.yml` for taxonomy and the Apple Design skill for design detail.
3. The user's explicit request.
4. Existing conventions in the website repo.
5. Simplest solution that satisfies requirements (static, no dependencies, no build step, calm and precise).

Specific decisions:

| Situation | Decision |
|-----------|----------|
| Number not in Section 6 and not findable in source docs | Omit it or mark `TODO (verify with maintainer)` |
| Source docs disagree | Prefer config files and code; note the discrepancy in a comment |
| Design principle conflicts with a product requirement | Preserve the product requirement; adapt the presentation |
| User asks for a feature not in this file | Flag it and ask; do not silently expand scope |
| Unsure whether to animate something | It does not animate (motion budget, Section 11.6.5) |
| Unsure whether to add a dependency | Avoid it; plain HTML/CSS/JS + first-party motion covers everything required |
| Unsure whether a claim is accurate | Treat as inaccurate until verified |
| A component exists in one style on one page | Make it consistent across all pages (Section 12) |

---

## 18. Definition of Done / Completion Checklist

Before considering the website complete, verify **every** applicable item:

### Product & content

- [ ] All required pages from Section 8 exist (index, agents, contributors, taxonomy, cli, about).
- [ ] Every factual claim has a `SOURCE:` comment or maps to a Section 6 value.
- [ ] No invented numbers, quotes, features, or testimonials anywhere.
- [ ] All CLI commands match Section 6.9 exactly.
- [ ] Taxonomy matches `config/taxonomy.yml` (8 categories; subcategories derived from YAML).
- [ ] Cold-start warning appears on the contributors page.
- [ ] Fallback rules (3 closest skills, no invented quotes) appear on the agents page.
- [ ] "Not affiliated with Y Combinator" disclaimer appears in the footer.
- [ ] License section states MIT (code) + CC BY-SA 4.0 (skill content).
- [ ] Example skills/quotes are labeled "Illustrative example" if not from published skill files.
- [ ] External links use the GitHub repo URL, not local paths.

### Information architecture & flows

- [ ] Persistent nav with the same labels/order on all pages; active page indicated.
- [ ] Every user flow in Section 7.2 is completable in ≤3 clicks from home.
- [ ] Each page answers where am I / where can I go / what's here / how do I get out.
- [ ] One `h1` per page; content order answers "what" before "how" before "reference".

### Visual design & craft

- [ ] Palette and spacing scale match Section 11.4/11.5; no off-scale values.
- [ ] Type follows the tracking/leading table (Section 11.3.2); `rem`-based scaling.
- [ ] Translucency exists only on floating chrome; nav uses `backdrop-filter` with scroll-edge treatment.
- [ ] Cards/code blocks/tables/buttons consistent across pages.
- [ ] Site feels calm and deliberate; no decoration without purpose.

### Interaction & motion

- [ ] Press feedback is instant (pointer-down) on all interactive elements.
- [ ] Motion follows the budget (Section 11.6.5); nothing else animates.
- [ ] Springs are critically damped by default; no bounce in v1.
- [ ] Menu and FAQ are interruptible; reversing mid-motion never jumps to the target.
- [ ] Enter/exit paths are symmetric; interactions anchor to their trigger.
- [ ] `prefers-reduced-motion`, `prefers-reduced-transparency`, and `prefers-contrast` are implemented and verified.

### Responsive & accessibility

- [ ] No horizontal page scroll at 360/768/1024/1280; tables scroll in containers.
- [ ] Touch targets ≥44px; no hover-only information.
- [ ] Keyboard operable (nav, menu, FAQ, copy); visible focus; skip link; Escape closes menu.
- [ ] 200% zoom and OS text scaling do not break layout.
- [ ] Automated a11y checks pass (Lighthouse/axe ≥ 90, AA contrast).

### Technical

- [ ] Static-only: no build step, no backend, no API keys, no external CDN resources.
- [ ] File structure matches Section 13.2; motion utility is first-party and dependency-free.
- [ ] All content readable with JavaScript disabled.
- [ ] No console errors; zero runtime network requests.
- [ ] Unique `<title>` and meta description per page; Open Graph on index.
- [ ] README for the website repo exists and documents preview/deploy.
- [ ] No stray local files committed; commits follow `website: <description>`.
- [ ] `AGENTS.md` was followed throughout.

---

## 19. Optional Future Enhancements

Do **not** implement these unless the user explicitly asks:

- Live skill browsing powered by fetching `skills-index.json` from the GitHub repo once skills are published.
- Client-side search across taxonomy/categories.
- Dark/light theme toggle (must ease the theme change and respect `prefers-reduced-transparency` and `prefers-contrast`).
- Blog/changelog page for pipeline updates.
- RSS feed of new skills.
- Deploy workflow (GitHub Actions) for the website itself.
- Dismissible sheets or carousels (would adopt the gesture/momentum/rubber-band contracts in Section 11.6.3).

---

*End of AGENTS.md — OpenYC Skills Website (Apple Design Edition)*
