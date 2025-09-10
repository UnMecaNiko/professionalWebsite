---
title: "Repository Context"
version: "1.1.0"
last_updated: "2025-09-09"
audience: ["humans","agents"]
description: "Explains how the website consumes the unmecaniko-projects repository (via MCP + GitHub API), the expected project format, and key integration points."
---

# Repository Context Documentation

## Overview
This website fetches and displays projects from the GitHub repository `unmecaniko-projects` (owner: `UnMecaNiko`). The integration enables dynamic content without changing the website code. For local developer workflows, an MCP server ("mcp-unmecaniko-projects") is configured to surface repository context to the IDE.

## Project Structure
The canonical source of projects is the GitHub repo `UnMecaNiko/unmecaniko-projects`.

Directory layout (per project):
- `projects/<slug>/index.md` — Markdown content with YAML frontmatter.

Frontmatter fields are parsed and mapped to the site’s `ProjectMetadata` interface (see “Project Metadata Spec”).

## How It Works
1. Project data source
   - Repo: `UnMecaNiko/unmecaniko-projects`
   - Path: `projects/<slug>/index.md`
   - Purpose: Single source of truth for portfolio items

2. Data flow (runtime/build)
   - Server utilities in `lib/github.ts` call the GitHub REST API:
     - `getProjectSlugs()` lists directories under `projects/`.
     - `getProject(slug)` fetches `index.md`, decodes Base64, parses frontmatter with `gray-matter`.
     - `getAllProjects()` aggregates all projects.
   - Caching: `fetch(..., { next: { revalidate: 300 } })` revalidates every 5 minutes.
   - API route `app/api/projects/route.ts` exposes `GET /api/projects` returning all projects for client-side consumption.
   - Static pages: `app/projects/[slug]/page.tsx` uses `generateStaticParams()` to pre-generate slugs and `generateMetadata()` for SEO.

3. Display
   - Grid/listing: `components/projects.tsx` (client) fetches `/api/projects` and renders cards.
   - Detail page: `components/project-detail.tsx` renders markdown, tech/tags, galleries, videos, and metadata.

## Integration Points
1. API: `app/api/projects/route.ts`
2. Data: `lib/github.ts`
3. List UI: `components/projects.tsx`
4. Detail UI: `app/projects/[slug]/page.tsx` + `components/project-detail.tsx`

## Project Metadata Spec
Frontmatter fields supported by the site (see `lib/github.ts`):

- `title` (string): Project title
- `slug` (string): URL slug; if omitted, inferred from directory name
- `description` (string): Short summary
- `status` (string): e.g., `in-progress` | `completed`
- `startDate` (string): e.g., `2024-05`
- `endDate` (string, optional)
- `categories` (string[]): High-level categories
- `technologies` (string[]): Tech stack
- `tags` (string[]): Additional labels
- `coverImage` (string): URL/path to hero image
- `gallery` (string[], optional): Additional image URLs
- `videos` (string[], optional): Video URLs
- `team` (string[], optional): Team members
- `client` (string, optional)
- `location` (string, optional)
- `budget` (string, optional)
- `website` (string, optional): Live/demo URL
- `github` (string, optional): Repository URL

Example frontmatter:
```markdown
---
title: DomiChat – AI Agent for Rural Deliveries
description: AI-powered WhatsApp agent connecting drivers with remote communities.
status: completed
startDate: 2024-02
endDate: 2024-08
categories: ["AI", "Social Impact"]
technologies: ["Python", "LangChain", "WhatsApp API"]
tags: ["LLM", "Agent", "Bots"]
coverImage: https://example.com/images/domichat-cover.jpg
gallery: [
  "https://example.com/images/domichat-1.jpg",
  "https://example.com/images/domichat-2.jpg"
]
videos: [
  "https://example.com/videos/domichat-demo.mp4"
]
team: ["Nicolas Velasquez", "Jane Doe"]
client: Rural Logistics Inc.
location: Colombia
budget: Confidential
website: https://domichat.example.com
github: https://github.com/UnMecaNiko/domichat
---

Long-form markdown content here...
```

## Advantages
1. Centralized content in a dedicated repo
2. Automated updates via GitHub + static regeneration
3. Git-based history and review workflows
4. Separation of content from presentation

## Technical Implementation
- GitHub API (REST) for content fetching (no auth by default)
- Next.js App Router for API, SSG, and revalidation
- `gray-matter` for frontmatter parsing; `react-markdown` for rendering
- Tailwind + shadcn/ui for UI

## MCP Usage (IDE)
An MCP server is configured to provide context for `unmecaniko-projects` in supported IDEs.

- Config: `.vscode/mcp.json`
- Server: `mcp unmecaniko-projects` (stdio)
- Command: `python N:\\unmecaniko-projects\\context\\main.py`

Typical capabilities (subject to server implementation):
- List available project slugs and metadata
- Summarize project content
- Provide quick links to assets

Note: This documentation reflects the runtime contract the website expects. If MCP exposes richer context, it should remain a superset of the fields defined in “Project Metadata Spec”.

## Operational Notes & Future Considerations
1. GitHub rate limits: consider using a token. If `GITHUB_TOKEN` is available, add `Authorization: Bearer <token>` in `lib/github.ts` requests.
2. Error handling: `/api/projects` returns `[]` on failure to avoid client crashes.
3. Drafts: introduce a `status: draft` or separate `drafts/` folder if needed.
4. Search/filters: add client-side filters by `categories`, `technologies`, and `tags`.
5. i18n: project content language follows the markdown source; site chrome supports EN/ES via context.
