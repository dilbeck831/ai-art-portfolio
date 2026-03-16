# Project context for new chats

**Load this file** (e.g. `@docs/NEW-CHAT-CONTEXT.md`) at the start of a new chat so the AI has full context without prior conversation history.

---

## What this is

**TOXIQMYND / TØX!Q** — Static Astro site replacing the WordPress version of toxiqmynd.com. One identity: AI art, UX/IA case studies, and the Lab (browser tools). Audience: creative directors, art directors, Fortune 100 clients.

- **Live (current):** https://dilbeck831.github.io/ai-art-portfolio/
- **Target domain (future):** toxiqmynd.com (point DNS when ready)
- **Repo:** dilbeck831/ai-art-portfolio on GitHub; deploy via GitHub Actions → GitHub Pages

---

## Tech stack (strict)

- **Astro v4** — static, `.astro` components only
- **TypeScript** (strict)
- **Vanilla CSS** — `src/styles/global.css`, CSS variables, no Tailwind
- **Static data** — `src/data/*.ts` (no CMS, no database)
- **GSAP + ScrollTrigger** — Hero uses CDN scripts in `Hero.astro`; rest of site uses npm GSAP in Layout and page scripts
- **No** React, Node runtime, Tailwind, or canvas/WebGL

---

## Site structure

| Route | Purpose |
|-------|--------|
| `/` | Home: full-viewport Hero (fog + slideshow), FeaturedCollection mosaic, Recent work grid, About the artist block, Commission CTA |
| `/work/` | Work hub → AI Art, Music, UI/UX |
| `/work/ai-art/` | Fragment gallery + process copy |
| `/work/music/` | Placeholder (genres, “coming soon”) |
| `/work/ux/` | Case studies list + capabilities |
| `/work/ux/[slug]/` | Case study pages (4 slugs) |
| `/lab/` | Lab tools grid (7 tools) |
| `/lab/[slug]/` | Individual tool pages (placeholder embed) |
| `/about/` | About / identity |
| `/contact/` | Contact placeholder |
| `/gallery/` | Redirects to `/work/ai-art/` |

---

## Key files

- **Layout & nav:** `src/layouts/Layout.astro`, `src/components/Nav.astro` (Work dropdown, Lab, About, Contact)
- **Home:** `src/pages/index.astro` — imports Hero, FeaturedCollection, ArtCard; builds `heroImages` from featured artworks
- **Hero:** `src/components/Hero.astro` — full-viewport fog (CSS) + slideshow (GSAP CDN), text overlay “TØX!Q”, ScrollTrigger scrub
- **FeaturedCollection:** `src/components/FeaturedCollection.astro` — mosaic (1 large, 2 tall, rest square), links to `work/ai-art/#slug`
- **Data:** `src/data/artworks.ts` (Artwork[] with slug, series, image path), `meta.ts`, `case-studies.ts`, `lab-tools.ts`, `capabilities.ts`, `ai-art-process.ts`, `music.ts`
- **Config:** `astro.config.mjs` — `base: '/ai-art-portfolio/'`, `site: 'https://dilbeck831.github.io'`; redirects for `/gallery` → `/work/ai-art`
- **Full spec:** `docs/SITE-REBUILD-SPEC.md` — site map, data architecture, components, nav IA, GSAP plan, migration notes

---

## Adding images

1. Put image files in **`public/art/`** (e.g. `fragment-01.jpg` or keep existing names like `0_0 (1).jpeg`).
2. Edit **`src/data/artworks.ts`**: each entry has `image: "filename.jpeg"` (path relative to `public/art/`), plus `slug`, `title`, `series`, optional `favorite`, `date`.
3. Featured pieces (`favorite: true`) appear in Hero slideshow and FeaturedCollection mosaic (up to 8 in mosaic). Hero uses first 6 featured for slideshow.

---

## Deploy

```bash
git add .
git commit -m "Your message"
git push origin main
```

GitHub Actions builds and deploys. Do **not** commit `dist/` or `node_modules/` (in `.gitignore`).

---

## Current state (as of last pack)

- **Art:** Real images in `public/art/` (e.g. `0_0 (1).jpeg` … `0_0 (14).jpeg`), `artist.jpeg` for About. `artworks.ts` has multiple Fragment entries (some still share same image filename; can be updated to unique filenames per piece).
- **Home:** Hero (fog + slideshow), FeaturedCollection mosaic, Recent work, About artist (with stats count-up), Commission CTA. GSAP on index for gallery stagger and about section.
- **Work / Lab / About / Contact:** All routes and placeholder content in place. Case studies and lab tools have data; lab tool pages show placeholder “embed goes here.”
- **Possible next steps:** (1) Point toxiqmynd.com at GitHub Pages and set `base: '/'`, `site: 'https://toxiqmynd.com'`. (2) Give each artwork in `artworks.ts` a unique `image` filename if you have 17 distinct images. (3) Implement each Lab tool on `/lab/[slug]/` (embed or inline script). (4) Add contact form (e.g. Formspree) or mailto on Contact page.

---

## Commands

```bash
npm install
npm run dev    # http://localhost:4321
npm run build  # output in dist/
```

Use `@docs/NEW-CHAT-CONTEXT.md` and optionally `@docs/SITE-REBUILD-SPEC.md` when starting a new chat so the AI has full project context.
