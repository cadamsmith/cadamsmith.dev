# resume generator

A small [Gleam](https://gleam.run) CLI that generates `resume.pdf` from the
site's own content — the Astro content collections in `src/content/` plus
`profile.yaml` — so the resume stays in sync with the rest of the site.

It parses the markdown frontmatter, shapes the data (sorts, groups skills,
formats date ranges, computes years of experience), writes `build/data.json`,
and renders it through a [Typst](https://typst.app) template.

This is a **local, on-demand tool** — it is not part of `npm run build` or CI.

## Prerequisites

- **Gleam** + **Erlang/OTP** — `brew install gleam`
- **Typst** — `brew install typst`

## Usage

Run from this directory:

```sh
gleam run -- generate
```

or, from the repo root:

```sh
npm run resume
```

Output is written directly to `public/resume.pdf` — the served asset — so the
site picks up the new resume as soon as you regenerate. Review the diff before
committing. (The intermediate `build/data.json` remains git-ignored.)

## Where the data comes from

| Resume section        | Source                                            |
| --------------------- | ------------------------------------------------- |
| Name / headline / contact / summary | `profile.yaml`                      |
| Experience, Education | `../../src/content/timeline/*.md` (`bullets:` field) |
| Skills                | `../../src/content/skills/*.md`                   |
| Projects              | `../../src/content/projects/*.md`                 |

Contact links in `profile.yaml` intentionally duplicate
`src/config/siteResources.ts`; the display name lives in the site's
`.astro`/`.svelte` files and is mirrored here.

## Layout

Edit `templates/resume.typ` to change the visual design. It reads only
`build/data.json`, so layout and data stay decoupled.

## Structure

- `src/resume.gleam` — CLI entry point / orchestration
- `src/resume/content.gleam` — read + parse the content collections
- `src/resume/model.gleam` — types, data shaping, JSON encoding
- `templates/resume.typ` — Typst layout
- `profile.yaml` — resume header/profile data
