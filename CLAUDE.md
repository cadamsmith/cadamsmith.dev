# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm run dev        # Start development server
pnpm run build      # Build for production
pnpm run preview    # Preview production build
pnpm run lint       # Run Prettier + ESLint checks
pnpm run format     # Auto-format with Prettier
pnpm run check      # SvelteKit type checking
```

There are no tests. `pnpm run lint` and `pnpm run check` are the main quality gates.

## Architecture

Personal portfolio site built with **SvelteKit 2 + Svelte 5**, deployed to **Cloudflare Pages** via `adapter-cloudflare`.

### Content & Data Flow

All site content lives in `/content/` as markdown files with YAML frontmatter:
- `skills/` — skill entries (name, group, order, imageFileName, url)
- `timeline/` — work history entries (title, company, group, dates, order, url)
- `projects/` — project writeups (name, group, order, images, tags, timeRange)
- `misc_resources.md` — key-value metadata (emails, social links, etc.)

Data is loaded at build time using `import.meta.glob()` via **mdsvex**, which parses the frontmatter automatically. API routes at `src/routes/api/` aggregate and sort this data, then page loaders (`+page.ts`) fetch from those endpoints. Utility functions in `src/lib/utils/index.ts` handle the glob loading and typing.

### Project structure

- `src/routes/` — SvelteKit file-based routing; `api/` subdirectory has JSON endpoints
- `src/lib/components/` — Svelte 5 components (use `$props()`, `$state()` runes)
- `src/lib/types/` — TypeScript interfaces for Project, Skill, TimelineItem, etc., plus Option/Maybe utilities (Some/None pattern)
- `src/lib/styles/global.scss` — global SCSS with CSS custom properties (`--color-a` through `--color-l`) and utility classes
- `content/` — markdown content files (source of truth for all portfolio data)
- `static/images/` — images organized as `projects/{slug}/` and `skills/`

### Styling

SCSS with CSS custom properties for the color palette. Components use scoped `<style>` blocks. Formatting uses **tabs** (not spaces), single quotes, print width 90 — enforced by Prettier.

### Deployed environments

| Environment | URL |
|-------------|-----|
| Production | https://cadamsmith.dev (alias for https://cadamsmith.pages.dev) |
| Dev | https://dev.cadamsmith.pages.dev |

The `dev` branch deploys to the dev site; `main` deploys to production. Both are Cloudflare Pages deployments.

### Cloudflare specifics

The Cloudflare adapter exposes `COUNTER` (Durable Object), commit SHA, and branch name via environment variables. These are typed in `src/app.d.ts`. The `vite.config.ts` sets `server.fs.allow` one level up to allow file access during dev.
