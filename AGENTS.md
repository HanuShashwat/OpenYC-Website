# AGENTS.md — OpenYC Skills Website

> **Authoritative operating manual for AI coding agents building the OpenYC Skills website.**
> Read this file **completely** before writing any code, copy, or layout.
> Version: 1.0 · Last updated: 2026-08-08

---

## Table of Contents

1. [Purpose of This File](#1-purpose-of-this-file)
2. [Project Identity](#2-project-identity)
3. [The Website We Are Building](#3-the-website-we-are-building)
4. [Source-of-Truth Documents](#4-source-of-truth-documents)
5. [Canonical Facts & Content Bank](#5-canonical-facts--content-bank)
6. [Audiences & Messaging](#6-audiences--messaging)
7. [Required Site Content](#7-required-site-content)
8. [Copywriting & Terminology Rules](#8-copywriting--terminology-rules)
9. [Design System](#9-design-system)
10. [Technical Architecture (Locked)](#10-technical-architecture-locked)
11. [Content Accuracy Workflow](#11-content-accuracy-workflow)
12. [Development & QA Workflow](#12-development--qa-workflow)
13. [Common Pitfalls (Anti-Confusion Rules)](#13-common-pitfalls-anti-confusion-rules)
14. [Decision Rules](#14-decision-rules)
15. [Completion Checklist](#15-completion-checklist)
16. [Optional Future Enhancements](#16-optional-future-enhancements)

---

## 1. Purpose of This File

This repository contains the **marketing/documentation website** for **OpenYC Skills**, a terminal-based open-source project. This file tells any AI coding agent:

- Exactly what OpenYC Skills is (and is not).
- Exactly what the website must say, with verified facts and exact values.
- What the website must **never** claim (anti-hallucination rules).
- Which source documents to read before writing content.
- The locked technical architecture for the website.
- The build, verification, and completion workflow.

**Rule 1.1:** If any instruction in this file conflicts with a source document, follow this file and flag the conflict to the user in your final message.

**Rule 1.2:** If a fact is not in this file and not verifiable in a source document, **do not state it**. Omit it, or mark it `TODO (verify with maintainer)`.

**Rule 1.3:** The source documents live on this machine at:

```
C:\Users\hanus\Gaprio\yc-skills\
```

If this website repo is copied to another machine, update the paths in Section 4 before starting.

---

## 2. Project Identity

### What OpenYC Skills is

OpenYC Skills is an open-source, **terminal-based Python project** that:

1. Ingests publicly available Y Combinator content — **YC Library essays** (`ycombinator.com/library`) and **YC YouTube videos** (English captions only).
2. Uses LLMs and local machine-learning to extract actionable startup advice from that content.
3. Distills the advice into **narrow, composable "skill files"** — Markdown documents with YAML metadata, containing a principle, verbatim quotes with attribution, application instructions, edge cases, and related-skill links.
4. Exports the skills into **three AI-agent formats**: MCP, OpenAI function schema, and Hermes plain text.
5. Publishes everything as **static files in a GitHub repository** that any AI agent can consume for free.

**The product itself is a command-line pipeline.** Users who want to *generate* skills run Python commands in a terminal. Users who want to *consume* skills never touch Python — they download static files.

### The 30-second explanation (use this as the basis for the hero copy)

> OpenYC Skills takes startup advice from Y Combinator's public content — essays and videos — and turns it into structured, machine-readable "skill files" that AI agents like ChatGPT, Claude, Cursor, and local models can load directly. Consumers get verified, well-attributed YC advice at zero cost. Contributors bring their own API keys to generate new skills.

### Approved one-liners (do not invent new taglines)

- "Startup advice from Y Combinator content, packaged for AI agents."
- "Verified YC advice your AI agent can actually use."
- "YC knowledge, distilled into composable skills."
- "Turn YC's public startup advice into AI-ready skill files."

### Approved analogy (use in "How it works" section)

> Think of each skill file as a **recipe card** for an AI agent. The card says what the advice is, who said it (with the exact quote), when to use it, what questions to ask the founder, and which other cards are related. The agent reads the card and follows it.

### What OpenYC Skills is NOT (never present it this way)

- It is **not** affiliated with, endorsed by, or built by Y Combinator. It analyzes publicly available YC content.
- It is **not** an API service. There is no server, no runtime endpoint, no hosted MCP server, and no backend.
- It is **not** a chatbot. It is a library of static files that other AI agents can use.
- It is **not** a runtime RAG system. There is no runtime vector database; similarity data is pre-computed and committed as static JSON.
- It is **not** a hosted web app. The website you are building only *describes* the project; it does not run the pipeline.

### Key repository facts (exact)

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

## 3. The Website We Are Building

### Mission

Build a **clear, simple, static marketing website** that:

1. Explains what OpenYC Skills is in plain language that a non-technical founder can understand in under 30 seconds.
2. Showcases its capabilities: verified skills, three AI-agent formats, 8-category taxonomy, automated validation, BYOK contribution model.
3. Gives a **new user** complete, correct instructions to start using the project — both as a consumer (AI agent developer) and as a contributor (BYOK generator).
4. Links to the full documentation in the source repo instead of duplicating everything.

### Success criteria

- Every factual claim on the site traces back to a source document (annotation comments required, Section 11).
- A first-time visitor understands what the project does without reading the source repo.
- An AI agent developer can integrate skills by following the site's instructions.
- A contributor can set up the pipeline and run the CLI by following the site's instructions.
- The site is 100% static: no backend, no API keys, no build step, no database.
- The site passes the completion checklist in Section 15.

### Scope boundaries

- **In scope:** marketing copy, product explanation, taxonomy reference, consumer guide, contributor guide, CLI reference, FAQ, license page.
- **Out of scope (do not build unless the user asks):** sign-up/login, user accounts, server-side search, a hosted demo of the pipeline, a browser-based code editor, analytics dashboards, payment, or any backend.

---

## 4. Source-of-Truth Documents

Read the relevant document **before** writing any content that depends on it. The documents are the only allowed sources for project facts.

| Document | Path | Provides |
|----------|------|----------|
| Project README | `C:\Users\hanus\Gaprio\yc-skills\README.md` | Big-picture explanation, pipeline overview, quickstart, FAQ, license |
| Architecture spec | `C:\Users\hanus\Gaprio\yc-skills\openyc-skills-architecture-v1.1.md` | Exact pipeline, taxonomy, skill file format, spec formats, validation details, security |
| Existing AGENTS.md | `C:\Users\hanus\Gaprio\yc-skills\AGENTS.md` | Repository rules, state machine, data model, naming conventions |
| Consumption guide | `C:\Users\hanus\Gaprio\yc-skills\docs\CONSUMPTION.md` | How AI agents consume skills, spec formats, fallback behavior, code examples |
| BYOK guide | `C:\Users\hanus\Gaprio\yc-skills\docs\BYOK.md` | Contributor setup, CLI workflow, quota management, cold-start warning |
| Taxonomy reference | `C:\Users\hanus\Gaprio\yc-skills\docs\TAXONOMY.md` | Category and subcategory descriptions |
| Implementation plan | `C:\Users\hanus\Gaprio\yc-skills\IMPLEMENTATION_PLAN.md` | Build history, milestone structure, task naming, definition of done |
| Taxonomy config (source of truth for categories) | `C:\Users\hanus\Gaprio\yc-skills\config\taxonomy.yml` | The **only** authoritative list of categories/subcategories |

**Rule 4.1:** When source documents disagree (e.g., the taxonomy doc says "38 subcategories" but `config/taxonomy.yml` contains 37), prefer the configuration file and the verified count, and add a code comment noting the discrepancy. Never copy a number from one document without checking it against the authoritative source.

---

## 5. Canonical Facts & Content Bank

Everything in this section is pre-verified. Use it directly. Anything NOT in this section must be verified against Section 4 documents before it appears on the site.

### 5.1 The three core promises

1. **Zero cost for consumers.** Download static files from GitHub. No API keys, no database, no embedding models, no Python.
2. **Exact quote fidelity.** Every quote attributed to a YC speaker is verbatim from the original transcript or essay. No paraphrasing in attribution blocks. Enforced by automated validation.
3. **Composable skills.** Each skill covers one narrow micro-topic and links to related skills using pre-computed cosine similarity (math, not guesswork).

### 5.2 Inputs and outputs

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

### 5.3 Taxonomy (exact, from `config/taxonomy.yml`)

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

### 5.4 Skill file anatomy

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

### 5.5 Spec formats (exact)

| Format | File | Used by | Key characteristics |
|--------|------|---------|---------------------|
| MCP | `specs/mcp/{skill_id}.json` | Claude Code, MCP-compatible frameworks | Tool definition: `name`, `description`, `inputSchema`, `handler.path`, `tags`, `fallback` |
| OpenAI | `specs/openai/{skill_id}.json` | GPT, OpenAI API function calling | `{"type":"function","function":{...}}` plus custom `metadata` (skill_file, category, tags, fallback) |
| Hermes | `specs/hermes/{skill_id}.txt` | Ollama, llama.cpp, local models | Plain text with `[SKILL: ...]` / `[END SKILL]` delimiters, injected into system prompts |

**Fallback rules (identical in every spec — emphasize on the site):**

- If no skill matches the user's question, return the **3 closest skills**.
- The agent may use its own general knowledge, **clearly labeled as general advice**.
- The agent must **NEVER invent YC quotes** (`invent_quotes: false`).

### 5.6 Index and similarity files

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

### 5.7 The pipeline (how skills are made)

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

### 5.8 Validation (three layers)

| Layer | What it checks | Tool |
|-------|----------------|------|
| 1. Quote verification | Each verbatim quote fuzzy-matches the source chunk | rapidfuzz — PASS if `ratio ≥ 70` AND `partial_ratio ≥ 85` |
| 2. Schema validation | Frontmatter matches the required Pydantic model, skill_id matches filename, related skills exist | Pydantic |
| 3. Hallucination guard | No invented speakers, claims, or quotes; LLM-as-judge checks principle vs. quotes | Gemini `gemini-1.5-flash` at temperature 0.0 (dedicated, fail-open) |

If validation fails, the skill moves to `skills/_failed/` and cannot be published. GitHub Actions re-runs validation on every pull request.

### 5.9 CLI reference (exact — the site must show these exact commands)

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

### 5.10 BYOK contributor model (exact)

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

### 5.11 Licensing and attribution (exact)

- **Code:** MIT License — use freely.
- **Generated skill content:** CC BY-SA 4.0 — attribution required, share alike.
- **Raw YC content:** never redistributed; raw files are gitignored; only short verbatim quotes with attribution are published.
- The project docs recommend legal review before commercial use of reproduced quotes (fair use is fact-specific).

**Website rule:** Include a license section that states the above. Do not claim "public domain" or "free to use for any purpose" — CC BY-SA has conditions.

### 5.12 Facts that must never be invented

Never put these on the site unless you can source them from the repo:

- Total number of published skills (none exist yet as of 2026-08-08; derive from `skills-index.json` when it appears).
- Number of contributors, stars, forks, downloads, or community stats (no data source).
- Specific quotes from YC speakers (only if present in published skill files; otherwise use clearly labeled illustrative examples from the docs).
- Specific API pricing, rate limits, or free-tier terms (only the project's default config values from Section 5.10, labeled as defaults).
- Feature names, CLI flags, file paths, or directory names not present in the source docs.
- Testimonials or user quotes (none exist in the source docs).
- Any claim that the project works with a specific AI product in a way not documented (only MCP / OpenAI function calling / Hermes as documented).

---

## 6. Audiences & Messaging

The site has **two primary audiences** and **one secondary audience**:

### 6.1 AI agent developers / consumers (primary)

They want to give their agent startup-advice capability. Message: *"Grab the files, load them into your agent, done — no server, no keys, no Python."*

Give them:

- What they get (skills, specs, index files).
- The three ways to get files (clone repo, release bundle, raw URLs).
- Which format to use for which framework (MCP → Claude, OpenAI → GPT, Hermes → local).
- The fallback rules (3 closest skills, labeled general advice, never invent YC quotes).
- Small code examples (from `docs/CONSUMPTION.md`, not rewritten from memory).

### 6.2 Contributors (primary)

They want to add new YC content and generate skills. Message: *"Fork it, bring your own keys, run a few commands, open a PR."*

Give them:

- Prerequisites (Python 3.11, Git, pip, ≥1 LLM API key).
- The exact setup steps and per-batch workflow (Section 5.10).
- The cold-start warning.
- Quota management basics.
- Contribution/PR flow.

### 6.3 Curious founders / general visitors (secondary)

They just want to understand the idea. Message: *"YC's public startup advice, turned into cards your AI assistant can follow — with real quotes, verified."*

Give them:

- The 30-second explanation and analogy.
- The three core promises.
- A simple pipeline diagram.
- The taxonomy grid.

### Tone rules

- Clear, simple, friendly; explain jargon on first use.
- Confident but precise. Never hype beyond the facts.
- Use "you" for the reader. Use "OpenYC Skills" for the project.
- Short sentences. Headings that say what the section is about.
- Prefer examples over abstract description.

---

## 7. Required Site Content

The site must include the following pages/sections. Content requirements per page are listed; link to the full source docs where noted instead of duplicating them entirely.

### 7.1 Home (`index.html`)

- **Hero:** one-liner (Section 2), subheading, primary CTA ("Read the docs" → agents page; "Contribute" → contributors page; "View on GitHub" → repo URL).
- **The problem/solution:** 2–3 sentences on why vague AI startup advice is risky and how verbatim, attributed quotes fix it.
- **Three core promises** (Section 5.1) as three cards.
- **How it works:** 4-step plain-English summary (ingest YC content → distill into skill files → verify quotes → agents load the files), with the analogy from Section 2.
- **Sample skill preview:** a stylized, clearly labeled "Illustrative example" card showing frontmatter fields and body sections (Section 5.4). Mark it as illustrative if it is not from a real published skill.
- **Taxonomy preview:** the 8 categories as cards with one-line descriptions; link to the full taxonomy page.
- **Who it's for:** two cards — "For AI agents" and "For contributors" — each linking to the guide page.
- **FAQ teaser:** 3–4 of the most important FAQ items with links.
- **Footer:** repo link, license summary, "Not affiliated with Y Combinator" note.

### 7.2 For AI Agents (`agents.html`)

- What consumers get (skills, specs, index files) — table from Section 5.2.
- The three ways to get the files (clone, release bundle, raw URLs) — exact methods from `docs/CONSUMPTION.md`.
- The three spec formats — table from Section 5.5, with "which one should I use" guidance.
- How agents find skills: `skills-index.json` lookups (by_id, by_tag, by_category), and the signal prefixes `/category`, `%tag`, exact skill ID, fuzzy search.
- **Fallback behavior — the most important rule:** 3 closest skills, labeled general advice, NEVER invent YC quotes. Include the exact "Wrong vs. Right" example from `docs/CONSUMPTION.md` (it is illustrative but documented).
- Small integration code examples (Python snippets from `docs/CONSUMPTION.md` — copy from the doc, do not rewrite).
- Link to the full consumption guide: `docs/CONSUMPTION.md` in the repo.

### 7.3 For Contributors (`contributors.html`)

- What BYOK means and why it exists (contributors supply API keys; project doesn't pay for everyone's usage).
- Prerequisites table (Python 3.11/3.12, Git, pip 24.x+, ≥1 API key).
- Step-by-step setup (exact commands from Section 5.10).
- The pipeline stages in plain English (Section 5.7) — what each CLI command does.
- The per-batch workflow command block (Section 5.10).
- The **cold-start warning** (prominent callout).
- Quota management: `quota` command, provider rotation, UTC midnight reset, defaults table (labeled as defaults).
- Validation overview: what happens before a skill is published.
- Contribution flow: branch → commit generated files only → PR → CI validation → merge.
- Troubleshooting table (condensed from `docs/BYOK.md`: ModuleNotFoundError, providers exhausted, minimum batch size, missing table, stuck `extracting` → `reaper`).
- Link to the full BYOK guide: `docs/BYOK.md`.

### 7.4 Taxonomy (`taxonomy.html`)

- The full 8-category table from Section 5.3 (categories, descriptions, subcategories as chips).
- Explanation: every skill has exactly one category; subcategories are embedded in skill IDs; tags allow cross-category discovery.
- Note that categories are intentionally locked to prevent sprawl; new categories require a PR.
- Link to `docs/TAXONOMY.md` and `config/taxonomy.yml`.

### 7.5 CLI Reference (`cli.html`)

- The 12-command table from Section 5.9 with the exact invocation format `python -m src.cli <command>`.
- A note that the full pipeline order is: ingest → chunk → forge → link → export → validate → index.
- Link to `docs/BYOK.md` and the README.

### 7.6 FAQ & License (`about.html`)

Include (all verified against README / docs):

- Do I need Python/API keys to USE skills? No.
- Do I need API keys to GENERATE skills? Yes (BYOK).
- How do quotes get verified? Three-layer validation (Section 5.8).
- Can I use only some skills? Yes — filter by category/tag.
- What does low confidence mean? Fewer sources corroborated; still valid, treat as less authoritative.
- How often are skills added? Manually, no fixed schedule.
- What's the difference between `skills-index.json` and `similarity_matrix.json`? Lookup vs. relationships.
- License details (Section 5.11) and the "not affiliated with Y Combinator" disclaimer.
- Link to the full README.

---

## 8. Copywriting & Terminology Rules

### 8.1 Glossary (use these definitions on the site)

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

### 8.2 Naming consistency (mandatory)

- Write the project name exactly as **OpenYC Skills** (capital O, Y, C; capital S).
- Write the repo as `openyc-skills` (all lowercase) when referring to the repository.
- Write categories/subcategories in the exact lowercase hyphenated form (`founder-mental-models`, `product-market-fit`).
- Write CLI commands in `code` formatting exactly as in Section 5.9.
- Use "Y Combinator" and "YC" as in the source docs; never invent "Y-Combinator" or "YC's".
- Attribute quotes to named speakers (e.g., Paul Graham), not to "YC" as an organization.

### 8.3 Do / don't table

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

## 9. Design System

### 9.1 Direction

The project is terminal-based and developer-focused. Use a **dark, code-first visual identity** that feels like a developer tool — but stays readable and friendly for non-technical visitors. Think "modern docs site with a terminal accent," not "hacker aesthetic."

### 9.2 Recommended palette (dark theme)

| Role | Value |
|------|-------|
| Background | `#0d1117` (GitHub dark) or `#0f1115` |
| Surface / cards | `#161b22` or `#171a21` |
| Border | `#30363d` |
| Text (primary) | `#e6edf3` |
| Text (muted) | `#8b949e` |
| Accent | `#f78166` (YC orange) — use sparingly for CTAs/highlights |
| Accent secondary | `#58a6ff` (blue) for links |
| Success | `#3fb950` for "verified" badges |
| Warning | `#d29922` for warnings |
| Code background | `#010409` |

Rules:

- Use the YC-orange accent deliberately; do not flood the page with it.
- Text contrast must meet WCAG AA (4.5:1 for body text, 3:1 for large text).
- No background images that reduce readability.

### 9.3 Typography

- Body: system font stack — `ui-sans-serif, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`.
- Code/mono: `ui-monospace, "Cascadia Code", "JetBrains Mono", Consolas, "Courier New", monospace`.
- No external font CDN. If a custom font is desired, bundle it locally in `assets/fonts/`.
- Base font size 16px; line-height 1.6 for body; headings scale 1.25–2.

### 9.4 Layout

- Mobile-first. One column below 720px; two columns for card grids at ≥ 720px; max content width ~1100px centered.
- Sticky top nav with page links (Home, For AI Agents, For Contributors, Taxonomy, CLI, FAQ) and a GitHub button.
- Footer with repo link, license, and the "not affiliated with Y Combinator" disclaimer.
- Cards with subtle borders, rounded corners (8–12px), no heavy shadows.
- Code blocks with horizontal scroll (no page-level horizontal scroll).

### 9.5 Components

- **Terminal mockup:** a bordered box with fake window dots and monospace text; use it for CLI command blocks and the hero visual. The commands inside must be real commands from Section 5.9.
- **Promise cards:** icon + title + 2–3 sentence description.
- **Category cards:** category name + description + subcategory chips.
- **Callout boxes:** three variants — info (blue), warning (yellow), success (green).
- **Step lists:** numbered steps with a connecting line.
- **Tables:** use for command reference and spec formats; wrap on small screens (allow horizontal scroll inside a container).
- **Badges:** small pill labels like "LLM", "Local", "Verified".

### 9.6 Accessibility (mandatory)

- Semantic HTML5 landmarks: `header`, `nav`, `main`, `section`, `footer`.
- Exactly one `h1` per page.
- All images have `alt` text; decorative SVGs have `aria-hidden="true"`.
- Skip-to-content link as the first focusable element.
- Visible focus states on all interactive elements.
- Keyboard navigation works for nav, accordions (if any), and code copy buttons.
- Respect `prefers-reduced-motion`: disable non-essential animation.
- No interactive element without a label.
- Links have descriptive text (not "click here").

### 9.7 Performance

- No JavaScript frameworks; keep `main.js` small (nav toggle, copy-to-clipboard, active link highlighting, optional theme accent).
- Content must be readable with JavaScript disabled.
- Inline critical CSS or keep `styles.css` under ~50 KB.
- No external requests for fonts, icons, or libraries.

---

## 10. Technical Architecture (Locked)

### 10.1 Stack

- **Plain HTML5, CSS3, and vanilla JavaScript. No build step. No package.json. No framework.**
- This is locked to keep the site trivially reviewable, dependency-free, and deployable on any static host (GitHub Pages, Netlify, Vercel, S3).
- No backend, no forms that require a server (mailto or an external form service only if the user asks).
- No analytics SDK by default. If analytics is added later, it must be privacy-friendly and optional.

### 10.2 File structure (create exactly this)

```
OpenYC Website/
├── AGENTS.md              # This file
├── README.md              # Website repo readme (see 10.4)
├── index.html             # Home
├── agents.html            # For AI Agents
├── contributors.html      # For Contributors
├── taxonomy.html          # Taxonomy
├── cli.html               # CLI Reference
├── about.html             # FAQ & License
├── styles/
│   └── main.css           # All styles (single file)
├── scripts/
│   └── main.js            # Nav toggle, copy buttons, current-page highlight
└── assets/
    ├── icons/             # Inline SVG files if needed
    └── og-image.png       # Optional social preview image (1200×630)
```

### 10.3 Shared components

Every page shares:

- The same `header` nav with the same links and order.
- The same `footer` (repo link, license summary, disclaimer).
- The same `styles/main.css` and `scripts/main.js`.
- A `.page-title` heading that matches the page name in the nav.

### 10.4 README.md for this website repo

The website repo README must state:

- This repo contains the marketing website for OpenYC Skills.
- It is a static site (no build step); preview with `python -m http.server 8080`.
- Where the source project lives (`https://github.com/HanuShashwat/openyc-skills`).
- How to preview and how to deploy (GitHub Pages = push `main` and enable Pages; or any static host).
- A link to `AGENTS.md`.

### 10.5 Deployment

- Default target: **GitHub Pages** (or any static host the user chooses).
- The site must work when served from the repo root and from a subpath (use relative URLs: `styles/main.css`, `agents.html` — no leading slashes).

---

## 11. Content Accuracy Workflow

### 11.1 The mandatory procedure

For **every** page section that contains facts, commands, numbers, or names:

1. Identify the claim (e.g., "Pipeline uses 4 LLM providers").
2. Locate it in the Section 4 documents (use search).
3. Copy the exact wording/value from the document — do not paraphrase numbers.
4. Add an HTML comment immediately before the element that states the source, e.g.:

```html
<!-- SOURCE: docs/BYOK.md — "How the BYOK Model Works" (4 LLM providers) -->
```

5. If the claim cannot be found, **remove it or mark it** `<!-- TODO: verify with maintainer -->`. Never leave unverified claims on the page.

### 11.2 Command verification

Every CLI command on the site must match Section 5.9 exactly. After writing a page, run a check: search the page for `python -m src.cli` and confirm every occurrence exists in the CLI table.

### 11.3 Quote verification

- If you display a YC speaker quote, it must come from a **published skill file** in the source repo (`skills/`), or be clearly labeled **"Illustrative example"**.
- Do not invent quotes or attribute general advice to named YC people.

### 11.4 Link verification

- All internal links must target existing files/anchors in this repo.
- The GitHub link must be `https://github.com/HanuShashwat/openyc-skills`.
- Links to the source docs must use the GitHub raw/HTML URLs (e.g., `https://github.com/HanuShashwat/openyc-skills/blob/main/docs/CONSUMPTION.md`), not local paths.

---

## 12. Development & QA Workflow

### 12.1 Local preview

```powershell
cd "C:\Users\hanus\OneDrive\Documents\ChatGPT\OpenYC Website"
python -m http.server 8080
# open http://localhost:8080
```

If Python is unavailable, any static server works (`npx serve .`).

### 12.2 QA checks before finishing

1. **Link check:** open every page; click every nav link, footer link, and anchor; no 404s.
2. **Command check:** every `python -m src.cli` on the site matches Section 5.9.
3. **Fact check:** every number/claim has a `SOURCE:` comment or a Section 5 reference.
4. **Responsive check:** verify at 360px, 768px, and 1280px widths; no horizontal scroll; nav usable.
5. **Accessibility check:** run an automated check (e.g., Lighthouse or axe); fix all errors; AA contrast for text.
6. **JS check:** open with JavaScript disabled — all content still readable; nav still usable (CSS-only fallback or `noscript` note).
7. **Console check:** no console errors or failed resource loads.
8. **HTML check:** validate pages (e.g., W3C Nu validator if available); fix errors; all pages have one `h1`, lang attribute, title, meta description.
9. **SEO check:** every page has a unique `<title>` and meta description; Open Graph tags on `index.html`.

### 12.3 Git workflow

- The repo currently has no commits. The first commit can be the scaffold on `main`.
- For subsequent work, create a branch prefixed `codex/` (e.g., `codex/home-page`), then merge to `main` after QA.
- Commit message format: `website: <short description>` (e.g., `website: add taxonomy page`).
- Do not commit `.DS_Store`, editor folders, or any local-only files.

---

## 13. Common Pitfalls (Anti-Confusion Rules)

1. **OpenYC Skills ≠ Y Combinator.** Never imply affiliation/endorsement. Include the disclaimer in the footer.
2. **OpenYC Skills ≠ OpenAI.** The "OpenAI spec format" is a file format for OpenAI-compatible agents, not a relationship with OpenAI.
3. **The website is not the product.** Do not build a fake terminal, a demo pipeline, or claim the site can generate skills.
4. **MCP is a spec format, not a hosted server.** Say "specs for MCP-compatible agents," never "we host an MCP server."
5. **Consumers vs. contributors are different audiences.** Never mix their requirements. "No Python needed" applies only to consumers.
6. **No published skills yet.** Do not display a skill count, a skills gallery, or example skill IDs as real. Mark examples as illustrative.
7. **Don't invent quotes.** Especially Paul Graham quotes. Only published skill files or clearly labeled illustrative examples.
8. **Don't invent numbers.** Not skill counts, provider limits, prices, or community stats. Use Section 5 values or omit.
9. **Command fidelity.** One wrong flag on a CLI command breaks a new user's setup. Copy from Section 5.9 exactly.
10. **Don't duplicate the docs.** The site distills and links to the docs; it doesn't need every detail. Long pages reduce clarity.
11. **Don't forget the cold-start warning.** It is the most commonly missed contributor instruction.
12. **Don't say "the AI generates confidence."** Confidence is computed from math. Related skills too.
13. **Don't use "RAG" or "vector database" as a feature.** Similarity is pre-computed; there is no runtime retrieval system.
14. **Don't promise updates.** Skills are added manually with no fixed schedule.
15. **Don't claim human verification.** The validation is automated (with optional human review for flagged items).

---

## 14. Decision Rules

When facing ambiguity, resolve in this order:

1. This `AGENTS.md` (explicit rules above).
2. The source-of-truth documents (Section 4), preferring `config/taxonomy.yml` for taxonomy.
3. The user's explicit request.
4. Existing conventions in the website repo.
5. Simplest solution that satisfies requirements (static, no dependencies, no build step).

Specific decisions:

| Situation | Decision |
|-----------|----------|
| Number not in Section 5 and not findable in source docs | Omit it or mark `TODO (verify with maintainer)` |
| Source docs disagree | Prefer config files and code; note the discrepancy in a comment |
| User asks for a feature not in this file | Flag it and ask; do not silently expand scope |
| Layout question | Follow Section 9; if still unclear, choose the simplest readable option |
| Need a new dependency | Avoid it; plain HTML/CSS/JS covers everything required |
| Unsure whether a claim is accurate | Treat as inaccurate until verified |

---

## 15. Completion Checklist

Before considering the website complete, verify **every** applicable item:

### Content
- [ ] All required pages from Section 7 exist (index, agents, contributors, taxonomy, cli, about).
- [ ] Every factual claim has a `SOURCE:` comment or maps to a Section 5 value.
- [ ] No invented numbers, quotes, features, or testimonials anywhere.
- [ ] All CLI commands match Section 5.9 exactly.
- [ ] Taxonomy matches `config/taxonomy.yml` (8 categories; subcategories derived from YAML).
- [ ] Cold-start warning appears on the contributors page.
- [ ] Fallback rules (3 closest skills, no invented quotes) appear on the agents page.
- [ ] "Not affiliated with Y Combinator" disclaimer appears in the footer.
- [ ] License section states MIT (code) + CC BY-SA 4.0 (skill content).
- [ ] Example skills/quotes are labeled "Illustrative example" if not from published skill files.
- [ ] External links use the GitHub repo URL, not local paths.

### Design & code
- [ ] Static-only: no build step, no backend, no API keys, no external CDN resources.
- [ ] File structure matches Section 10.2.
- [ ] Shared header/footer consistent across pages; relative URLs used.
- [ ] Mobile-first responsive at 360 / 768 / 1280 px; no horizontal scroll.
- [ ] WCAG AA contrast; semantic landmarks; one `h1` per page; skip link; visible focus.
- [ ] `prefers-reduced-motion` respected.
- [ ] Content readable with JavaScript disabled.
- [ ] No console errors; no broken links/anchors.
- [ ] Unique `<title>` and meta description per page; Open Graph on index.

### Repo hygiene
- [ ] `README.md` for the website repo exists and documents preview/deploy.
- [ ] No stray local files committed.
- [ ] Commit messages follow `website: <description>`.
- [ ] `AGENTS.md` was followed throughout.

---

## 16. Optional Future Enhancements

Do **not** implement these unless the user explicitly asks:

- Live skill browsing powered by fetching `skills-index.json` from the GitHub repo once skills are published.
- Search across taxonomy/categories (client-side only).
- Dark/light theme toggle.
- Blog/changelog page for pipeline updates.
- RSS feed of new skills.
- Deploy workflow (GitHub Actions) for the website itself.

---

*End of AGENTS.md — OpenYC Skills Website*
