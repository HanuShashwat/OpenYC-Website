# OpenYC Skills — Website

This repository contains the marketing and documentation website for
[OpenYC Skills](https://github.com/HanuShashwat/openyc-skills), an open-source
project that turns startup advice from Y Combinator's public content — Library
essays and YouTube videos — into structured, machine-readable skill files for
AI agents.

## What's here

| Page | File |
|------|------|
| Home | `index.html` |
| For AI Agents | `agents.html` |
| For Contributors | `contributors.html` |
| Taxonomy | `taxonomy.html` |
| CLI Reference | `cli.html` |
| FAQ & License | `about.html` |

The site is **plain HTML5, CSS3, and vanilla JavaScript**. There is no build
step, no package manager, no backend, and no external CDN resources.

## Preview locally

Any static file server works. With Python:

```powershell
python -m http.server 8080
```

Then open <http://localhost:8080>.

## Deploy

Default target is GitHub Pages: push `main` to this repository and enable Pages
in the repository settings (or deploy to any static host — no configuration
needed, the site works from the repo root or a subpath).

## Source project

The product this site describes lives at
<https://github.com/HanuShashwat/openyc-skills>. This website only describes the
project; it does not run the pipeline.

## Specification

The full implementation specification for this website is
[AGENTS.md](AGENTS.md). Read it before making changes — it is the authoritative
manual for content, design, and behavior.
