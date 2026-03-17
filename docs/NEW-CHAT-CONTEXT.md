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
- **GSAP** — npm GSAP in Hero (text fade-in), Layout (header stagger), index (FeaturedCollection, about, gallery stagger). No CDN; Hero is static image + CSS motion gradients.
- **No** React, Node runtime, Tailwind, or canvas/WebGL

---

## Site structure

| Route | Purpose |
|-------|--------|
| `/` | Home: Hero (single image + gradients; mobile ≤700px: profile, name, heroDescription, social, Menu accordion), FeaturedCollection, Recent work, About, Commission CTA |
| `/work/` | Work hub → AI Art, Music, UI/UX |
| `/work/ai-art/` | Fragment gallery + process copy |
| `/work/ai-art/[slug]/` | Single artwork page (image/video, prev/next) |
| `/work/music/` | Suno embeds — single player, tabs below, one-at-a-time, autoplay on tab |
| `/work/ux/` | Case studies list + capabilities |
| `/work/ux/[slug]/` | Case study pages (4 slugs) |
| `/lab/` | Lab tools grid (7 tools) |
| `/lab/[slug]/` | Individual tool pages (placeholder embed) |
| `/about/` | About / identity |
| `/contact/` | Contact placeholder |
| `/gallery/` | Redirects to `/work/ai-art/` |

---

## Key files

- **Layout & nav:** `src/layouts/Layout.astro`, `src/components/Nav.astro`, `src/components/SocialIcons.astro`. On mobile (≤700px): desktop nav/social hidden; on home the whole header is hidden; on other pages a “Menu” accordion shows in the header.
- **Home:** `src/pages/index.astro` — Hero (single image + motion gradients), FeaturedCollection, Recent work, About artist, Commission CTA. Passes `profileImageUrl` (artist.jpeg), `heroDescription`, `base`, `currentPath` to Hero.
- **Hero:** `src/components/Hero.astro` — Single hero image (from `getHomepageHeroArtwork()`) to the right of text; subtle motion gradients (CSS). **Desktop:** text left, image right, grid layout. **Mobile (≤700px):** stacked block only — circular profile image, “TØX!Q”, `heroDescription`, SocialIcons, then “Menu” accordion (nav links). Uses npm GSAP for text fade-in only.
- **FeaturedCollection:** `src/components/FeaturedCollection.astro` — 1 hero cell + 2×2 grid + bottom row (7 featured); links to `work/ai-art/[slug]/`. `.featured-cell--sm` uses `aspect-ratio: auto`.
- **AI Art detail:** `src/pages/work/ai-art/[slug].astro` — static page per artwork (image/video, title, series, description, prev/next in series). Data from `artworks.ts`.
- **Music:** `src/pages/work/music/index.astro` — Suno embeds; single player at top, tab buttons below; one track at a time; `?autoplay=1` on tab switch. Data: `src/data/music.ts` — `sunoTracks[]` (id, title), `heroDescription` in meta.
- **Data:** `src/data/artworks.ts` (Artwork[], `homepageHero`, `getHomepageHeroArtwork()`, `getFeaturedArtworks`, `getArtworkBySlug`), `meta.ts` (includes `heroDescription`), `case-studies.ts`, `lab-tools.ts`, `capabilities.ts`, `ai-art-process.ts`, `music.ts`.
- **Config:** `astro.config.mjs` — `base: '/ai-art-portfolio/'`, `site: 'https://dilbeck831.github.io'`; redirects `/gallery` → `/work/ai-art`. For custom domain later: set `base: '/'`, `site: 'https://toxiqmynd.com'`.
- **Full spec:** `docs/SITE-REBUILD-SPEC.md` — site map, data architecture, components, nav IA, migration notes.

---

## Adding images

1. **Artworks:** Put files in **`public/art/`**. In **`src/data/artworks.ts`** add/edit entries: `image: "filename.jpeg"`, `slug`, `title`, `series`, `favorite`, `date`. Set **`homepageHero: true`** on exactly one entry for the desktop hero image; that entry can use `id: 'homepage-hero'`.
2. **About / mobile hero profile:** Use **`public/artist.jpeg`**. Referenced in index for About section and as Hero `profileImageUrl` on mobile.
3. Featured pieces (`favorite: true`) drive FeaturedCollection (up to 7). Hero image is the one with `homepageHero: true`.

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

- **Live:** https://dilbeck831.github.io/ai-art-portfolio/ — config reverted to this after testing toxiqmynd.com; site is stable here.
- **Hero:** Single image from `getHomepageHeroArtwork()` (one artwork has `homepageHero: true`, id `homepage-hero`). Desktop: text left, image right, motion gradients. Mobile (≤700px): header hidden on home; hero shows profile image (`artist.jpeg`), “TØX!Q”, `heroDescription` from meta, SocialIcons, then “Menu” accordion. Breakpoint 700px; desktop nav/social hidden ≤700px; header mobile Menu only on non-home.
- **Art:** `public/art/` has Fragment images; `artist.jpeg` for About and mobile hero. `artworks.ts`: 14 Fragment entries, 7 `favorite`, one `homepageHero: true`. AI Art detail pages at `/work/ai-art/[slug]/`.
- **FeaturedCollection:** 7 featured, layout 1 hero + 2×2 + 2 bottom; links to `/work/ai-art/[slug]/`; `.featured-cell--sm` aspect-ratio auto.
- **Music:** Suno embeds; 4 tracks in `music.ts`; single player, tabs below, one-at-a-time, autoplay on tab switch.
- **Nav / header:** SocialIcons in header; `isHome` via pathNorm === baseNorm. Body gets `page-home` on home for CSS (hide header on mobile).
- **DNS:** toxiqmynd.com — user can manage advanced DNS at Network Solutions; 4 A records for GitHub Pages added; old A records (208.91.197.27) could not be removed in UI; custom domain not yet switched (config kept on `/ai-art-portfolio/` for now).
- **Possible next steps:** (1) When ready for toxiqmynd.com: remove/override old A records at Network Solutions, set GitHub Pages custom domain, then set `base: '/'`, `site: 'https://toxiqmynd.com'` and deploy. (2) Unique `image` filenames per artwork if desired. (3) Implement Lab tools on `/lab/[slug]/`. (4) Contact form (Formspree) or mailto on Contact.

---

## Commands

```bash
npm install
npm run dev    # http://localhost:4321
npm run build  # output in dist/
```

Use `@docs/NEW-CHAT-CONTEXT.md` and optionally `@docs/SITE-REBUILD-SPEC.md` when starting a new chat so the AI has full project context.
