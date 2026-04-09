# cadamsmith.dev

Personal portfolio site built with **Astro** + **Svelte 5**, deployed on **Cloudflare Pages**.

![image](https://github.com/user-attachments/assets/115c4125-c043-4c60-bb5d-43628a25d6e6)

## Stack

- [Astro](https://astro.build/) — static site generation, file-based routing, content collections
- [Svelte 5](https://svelte.dev/) — interactive islands (skills widget, timeline, music player, map)
- [Leaflet](https://leafletjs.com/) — interactive location map
- [Cloudflare Pages](https://pages.cloudflare.com/) — hosting and deployment
- [TypeScript](https://www.typescriptlang.org/) — throughout

## Architecture

All pages are **prerendered at build time** (static output). Interactive components are mounted as Svelte islands with `client:visible`.

Site content is driven by **Astro content collections** in `src/content/`:

| Collection | Description |
|---|---|
| `skills/` | Tech skills shown in the skills widget |
| `timeline/` | Work and education history with location + coordinates |
| `songs/` | Music player playlist (YouTube embeds) |
| `blurbs/` | Hero and contact section copy |
| `heroTags/` | Info tags shown in the hero section |

## Local Setup

```bash
git clone https://github.com/cadamsmith/cadamsmith.dev.git
cd cadamsmith.dev
npm install
npm run dev
```

## Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production (static output to dist/)
npm run preview    # Preview production build
npm run lint       # Run Prettier + ESLint checks
npm run format     # Auto-format with Prettier
npm run check      # Astro type checking
```
