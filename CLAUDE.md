# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm run dev        # Start development server
pnpm run build      # Build for production (static output to dist/)
pnpm run preview    # Preview production build
pnpm run lint       # Run Prettier + ESLint checks
pnpm run format     # Auto-format with Prettier
pnpm run check      # Astro type checking
```

There are no tests. `pnpm run lint` and `pnpm run check` are the main quality gates.

## Architecture

Personal portfolio site built with **Astro** + **Svelte 5** islands, deployed to **Cloudflare Pages** via `@astrojs/cloudflare`. Output mode is `static` — all pages are prerendered at build time.

### Content & Data Flow

Site content lives in `src/content/` as markdown files with YAML frontmatter, managed by **Astro content collections** (schema in `src/content.config.ts`):
- `skills/` — skill entries (name, group, order, imageFileName, url)
- `timeline/` — work history entries (title, company, group, dates, order, url)

Site-wide config (social links, email, resume URL) is in `src/config/siteResources.ts`.

Pages load content via `getCollection()` in Astro frontmatter — no API routes needed.

### Project structure

- `src/pages/` — Astro file-based routing (index.astro)
- `src/layouts/` — BaseLayout.astro (HTML shell, head, Header/Footer, View Transitions)
- `src/components/` — Astro components (Header.astro, Footer.astro)
- `src/lib/components/` — Svelte 5 components used as islands (`$props()`, `$state()` runes)
- `src/lib/types/` — TypeScript interfaces for Project, Skill, TimelineItem, plus Option/Maybe utilities
- `src/styles/global.scss` — global SCSS with CSS custom properties (`--color-a` through `--color-l`)
- `src/content/` — markdown content files (source of truth for all portfolio data)
- `public/images/` — images organized as `skills/`

### Svelte Islands

Interactive components are mounted as Svelte islands with `client:visible` (or `client:only="svelte"` for Leaflet/LocationMap which references `window` at module level). Static components (Header, Footer) are Astro components.

### Styling

SCSS with CSS custom properties for the color palette. Components use scoped `<style>` blocks. Formatting uses **tabs** (not spaces), single quotes, print width 90 — enforced by Prettier.

### Deployed environments

| Environment | URL |
|-------------|-----|
| Production | https://cadamsmith.dev (alias for https://cadamsmith.pages.dev) |

Cloudflare Pages deployment from `main` branch.

### Cloudflare specifics

Commit SHA and branch are available via `CF_PAGES_COMMIT_SHA` and `CF_PAGES_BRANCH` environment variables at build time. App version is read from `package.json`.
