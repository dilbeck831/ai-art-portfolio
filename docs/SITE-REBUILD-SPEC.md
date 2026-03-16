# TOXIQMYND.com — Static Astro Rebuild Spec

**Purpose:** Replace WordPress with a static Astro v4 site.  
**Identity:** TØX!Q / TOXIQMYND — creative (AI art, music, Lab) + professional (UX/IA, case studies) as one coherent brand.  
**Audience:** Creative directors, art directors, clients evaluating both aesthetic and enterprise capability.

---

## 1. Complete site map

| Route | Purpose | Content type | Astro page type |
|-------|--------|--------------|------------------|
| `/` | Home | Hero, featured gallery (Fragment), artist bio, recent works, commission CTA | Static — `src/pages/index.astro` |
| `/work/` | Work index / hub | Intro copy, links to AI Art, Music, UI/UX | Static — `src/pages/work/index.astro` |
| `/work/ai-art/` | AI Art gallery | 17 Fragment pieces + process description, optional series intro | Static — `src/pages/work/ai-art/index.astro` |
| `/work/ai-art/[series]/` | Series/collection (future) | e.g. Dark Romantics, Liminal Spaces, Chromatic Studies, Portraits | Static — `src/pages/work/ai-art/[series].astro` (optional; can add when content exists) |
| `/work/music/` | Music | Placeholder: genres, “coming soon” or Suno/tracks when ready | Static — `src/pages/work/music/index.astro` |
| `/work/ux/` | UI/UX overview | Intro + list of 4 case studies + capabilities | Static — `src/pages/work/ux/index.astro` |
| `/work/ux/[slug]/` | Case study | Single case study (AMD Nav, Dark Data Table, Design System, SEO Audit) | Static — `src/pages/work/ux/[slug].astro` |
| `/about/` | About | Bio, identity (TØX!Q + enterprise), optional stats/credits | Static — `src/pages/about/index.astro` |
| `/contact/` | Contact | Form or mailto/social; commission CTA | Static — `src/pages/contact/index.astro` |
| `/lab/` | Lab index | Intro + grid of 7 tools with cards | Static — `src/pages/lab/index.astro` |
| `/lab/[slug]/` | Single Lab tool | Full-page embed/iframe or inline client-side app for that tool | Static — `src/pages/lab/[slug].astro` |

**Layouts:**

- **Base layout** — `src/layouts/Layout.astro`: HTML shell, global CSS, nav, footer, GSAP (CDN), meta.
- **Work sub-layout** (optional) — `src/layouts/WorkLayout.astro`: Same as base + work breadcrumb or sidebar if desired.
- **Lab tool layout** (optional) — `src/layouts/LabLayout.astro`: Minimal chrome (back to Lab, no full nav) for immersive tools.

**Route summary:**

- All pages are statically generated at build time.
- Dynamic routes: `[slug]` for case studies and lab tools only; slugs come from `src/data/*` at build.
- No server, no API routes, no React.

---

## 2. Data architecture

All data lives in `src/data/` as TypeScript modules exporting typed arrays/objects. No CMS, no fetch at runtime.

### 2.1 `src/data/artworks.ts`

- **Purpose:** AI Art pieces (Fragment series + future series).
- **Exports:** `Artwork[]`, `getArtworksBySeries(series?: string)`.
- **Interfaces:**

```ts
// Artwork: single piece
interface Artwork {
  id: string;
  slug: string;
  title: string;
  series: string;           // "fragment" | "dark-romantics" | etc.
  image: string;            // path from public or assets
  video?: string;
  description?: string;
  year?: string;
  favorite?: boolean;       // for home featured
}

// Series metadata (optional, for filtering/labels)
interface ArtSeries {
  id: string;
  name: string;
  description?: string;
  count: number;
}
```

- **Content:** 17 Fragment entries; later add rows for other series. Images migrated to `public/art/` or referenced from `src/assets/` (Astro will hash/bundle).

### 2.2 `src/data/ai-art-process.ts`

- **Purpose:** Process description for AI Art (Midjourney, Kling/Veo/Sora/Wan, baroque detail).
- **Exports:** `processSections: { title: string; body: string }[]` or a single rich-text structure.
- **Use:** Rendered on `/work/ai-art/` below or beside the gallery.

### 2.3 `src/data/case-studies.ts`

- **Purpose:** UI/UX case studies (4 AMD + any future).
- **Exports:** `CaseStudy[]`, `getCaseStudyBySlug(slug: string)`.
- **Interfaces:**

```ts
interface CaseStudy {
  slug: string;
  title: string;
  client?: string;          // e.g. "AMD"
  role?: string;            // e.g. "Lead IA"
  summary: string;
  body: string;             // markdown or HTML string
  capabilities: string[];   // IA, Navigation Design, etc.
  images?: { src: string; alt: string; caption?: string }[];
  year?: string;
  order: number;
}
```

- **Slugs:** e.g. `amd-global-nav`, `amd-dark-data-table`, `enterprise-design-system`, `amd-seo-audit`.

### 2.4 `src/data/capabilities.ts`

- **Purpose:** UX/IA capabilities list (IA, Navigation Design, Design Systems, Accessibility, Front-End, Prototyping, AI Tooling).
- **Exports:** `capabilities: { id: string; name: string; description?: string }[]`.
- **Use:** `/work/ux/` page and optionally in footer or About.

### 2.5 `src/data/lab-tools.ts`

- **Purpose:** Lab tools (7 items).
- **Exports:** `LabTool[]`, `getLabToolBySlug(slug: string)`.
- **Interfaces:**

```ts
interface LabTool {
  slug: string;
  title: string;
  number: string;           // "001", "002", ...
  shortDescription: string;
  longDescription?: string;
  tech: string[];            // "Web Audio API", "Three.js", etc.
  embedUrl?: string;        // if tool is hosted elsewhere
  hasInlineApp: boolean;    // true = page has its own script/canvas
  order: number;
}
```

- **Slugs:** e.g. `arpeggiator-drum-sequencer`, `sub-bass-reese-synth`, `sequential-pro-one`, `audio-reactive-solar`, `midjourney-prompt-studio`, `fluxprompt`, `merge-grotesque`.

### 2.6 `src/data/music.ts` (optional, minimal)

- **Purpose:** Placeholder for music (genres, “coming soon”, or future Suno/tracks).
- **Exports:** `musicPlaceholder: { genres: string[]; message: string }` or empty array for tracks later.

### 2.7 `src/data/site.ts` or `src/data/meta.ts`

- **Purpose:** Site-wide strings (site title, brand name, default meta, social handles).
- **Exports:** `siteTitle`, `brandName`, `defaultDescription`, etc.

---

## 3. Component inventory

### 3.1 Layouts

| Component | Path | Role |
|-----------|------|------|
| Layout | `src/layouts/Layout.astro` | Base: header, nav, footer, global CSS, GSAP CDN script |
| WorkLayout | `src/layouts/WorkLayout.astro` | Optional: breadcrumb “Work / AI Art” etc. |
| LabLayout | `src/layouts/LabLayout.astro` | Optional: minimal header (back to Lab), no full nav |

### 3.2 Global / shared

| Component | Path | Role |
|-----------|------|------|
| SiteHeader | `src/components/SiteHeader.astro` | Logo (TØX!Q / TOXIQMYND), nav links, mobile menu |
| SiteFooter | `src/components/SiteFooter.astro` | Credits, links (Work, Lab, Contact), optional capabilities |
| Nav | `src/components/Nav.astro` | Desktop + mobile nav; receives `currentPath` for active state |

### 3.3 Home

| Component | Path | Role |
|-----------|------|------|
| Hero | `src/components/home/Hero.astro` | Full-width hero (image/video or gradient), headline, optional CTA |
| FeaturedGallery | `src/components/home/FeaturedGallery.astro` | Fragment featured strip (e.g. 4–6 pieces), links to /work/ai-art/ |
| ArtistBio | `src/components/home/ArtistBio.astro` | Short bio + image (reuse existing About the artist block concept) |
| RecentWorks | `src/components/home/RecentWorks.astro` | Grid or list of recent items (AI Art + UX mix or AI Art only) |
| CommissionCTA | `src/components/home/CommissionCTA.astro` | CTA block linking to /contact/ or commission info |

### 3.4 Work

| Component | Path | Role |
|-----------|------|------|
| WorkNav | `src/components/work/WorkNav.astro` | Sub-nav or tabs: AI Art | Music | UI/UX (for /work/ and children) |
| ArtCard | `src/components/work/ArtCard.astro` | Single artwork card (image, title, series, link to detail if needed) |
| ArtGallery | `src/components/work/ArtGallery.astro` | Grid of ArtCards, optional filter by series |
| ProcessBlock | `src/components/work/ProcessBlock.astro` | Renders process sections for AI Art page |
| CaseStudyCard | `src/components/work/CaseStudyCard.astro` | Card for case study list (title, client, summary, link) |
| CaseStudyLayout | `src/components/work/CaseStudyLayout.astro` | Template for case study content (hero, body, images, capabilities) |
| MusicPlaceholder | `src/components/work/MusicPlaceholder.astro` | Genres + “coming soon” or future track list |

### 3.5 Lab

| Component | Path | Role |
|-----------|------|------|
| LabToolCard | `src/components/lab/LabToolCard.astro` | Card: number, title, short description, tech tags, link to /lab/[slug]/ |
| LabToolGrid | `src/components/lab/LabToolGrid.astro` | Grid of LabToolCards |
| LabToolFrame | `src/components/lab/LabToolFrame.astro` | Wrapper for embed or inline script (per-tool page) |

### 3.6 About / Contact

| Component | Path | Role |
|-----------|------|------|
| AboutBio | `src/components/AboutBio.astro` | Long-form bio, identity (TØX!Q + enterprise), optional stats |
| ContactForm | `src/components/ContactForm.astro` | Static form (action to Formspree/Netlify Forms or mailto) or link list |

---

## 4. Content hierarchy strategy

**Goal:** One identity (TØX!Q / TOXIQMYND). AI Art, UX/IA, and Lab should feel like facets of the same creative director — not three separate brands.

### 4.1 Principles

- **Home as synthesis:** Hero + featured gallery (Fragment) + bio + recent works + commission CTA. “Recent works” can mix 1–2 UX highlights with AI Art so both domains appear above the fold or one scroll down.
- **Work as umbrella:** Single “Work” section with three equal entries: AI Art, Music, UI/UX. No one category is visually or structurally dominant; same card style and section weight.
- **Lab as “studio”:** Position Lab as the experimental/process layer — “where ideas get built.” Not competing with Work; complementary. Nav can place Lab at same level as Work (e.g. Work | Lab | About | Contact).
- **Voice and visuals:** One design system: dark, editorial, baroque-influenced, cinematic. Same typography and color across AI Art and UX pages; case studies use the same grid/card language as art galleries where possible.
- **Cross-links:** From AI Art page, optional “See also: UX case studies” or “Explore the Lab.” From UX, “See AI Art” or “Lab tools.” About page states both creative and enterprise practice in one narrative.

### 4.2 For creative / art direction audience

- Lead with **visual impact** (hero, Fragment gallery) so the site feels like a creative portfolio first.
- Make **UX/IA** discoverable and credible without overwhelming: clear “Work → UI/UX” and case study cards that look as considered as the art (imagery, type, layout).
- **Lab** signals “maker” and “tool-building” — reinforces that the same person does both art and technical work. Useful for art directors who care about process and craft.

---

## 5. Navigation IA

### 5.1 Recommended structure (flat primary)

**Desktop:**

- **Home**
- **Work** (dropdown or single click to `/work/`)
  - AI Art
  - Music
  - UI/UX
- **Lab**
- **About**
- **Contact**

**Rationale:**

- Flat primary keeps the bar simple; “Work” groups the three disciplines without forcing three top-level items.
- “Lab” at top level gives it equal weight and makes it easy to find for people who came for tools.
- No “Work” vs “Lab” hierarchy conflict: Work = outputs (art, music, case studies); Lab = experiments/tools.

### 5.2 Alternative (if you prefer no dropdown)

- Home | AI Art | Music | UI/UX | Lab | About | Contact  
- More items, but every area one click away. Consider collapsing to icon or “More” on small screens.

### 5.3 Mobile

- Hamburger or bottom nav.
- Same order: Home, Work (expand to AI Art / Music / UI/UX), Lab, About, Contact.
- Ensure tap targets ≥ 44px and that “Work” expand doesn’t hide “Lab.”

### 5.4 Footer

- Repeat key links: Work, Lab, About, Contact.
- Optional: capabilities list (IA, Design Systems, etc.) or single “Capabilities” link to `/work/ux/#capabilities`.

---

## 6. GSAP integration plan

**Constraint:** GSAP + ScrollTrigger via CDN, client-side only. No React; all triggers and targets are DOM elements in .astro pages.

### 6.1 Where to add value

| Page / section | Animation type | Purpose |
|----------------|----------------|--------|
| **Home — Hero** | Timeline: headline + subline fade/slide up | Strong first impression |
| **Home — Featured gallery** | Stagger cards in on scroll (ScrollTrigger) | Focus attention on Fragment work |
| **Home — Artist bio** | Image + text slide in from sides when in view | Reinforce “one identity” block |
| **Home — Commission CTA** | Fade/slide up when in view | Clear end-of-fold CTA |
| **Work index** | Stagger three cards (AI Art, Music, UI/UX) on load or on scroll | Equal weight, polish |
| **Work / AI Art** | Gallery grid: stagger thumbnails on scroll | Editorial feel |
| **Work / AI Art — Process** | Paragraphs or sections fade/slide up on scroll | Readable, not distracting |
| **Work / UX** | Case study cards stagger on scroll | Parity with AI Art gallery |
| **Work / UX [slug]** | Hero + sections reveal on scroll | Case study narrative flow |
| **Lab index** | Stagger tool cards on scroll | Emphasize “collection” of tools |
| **Lab [slug]** | Optional: minimal entrance (e.g. tool title) so the tool itself stays focus | Avoid fighting with tool UI |
| **About** | Bio blocks or stats count-up + fade in on scroll | Credibility, engagement |
| **Contact** | Form or CTA fade in | Simple, clear |

### 6.2 Animation patterns (consistent across site)

- **Entrance:** `opacity: 0` → `1`, `y: 24–40` → `0`; ease `power2.out` or `power3.out`.
- **Stagger:** 0.06–0.1s between items; trigger once (`once: true`).
- **ScrollTrigger start:** Typically `top 80%`–`top 88%` so elements animate when they approach viewport.
- **Avoid:** Parallax on every section (can feel gimmicky); long pinned scroll unless one key story (e.g. one case study). Prefer short, clear entrances.

### 6.3 Implementation note

- Load GSAP + ScrollTrigger from CDN in `Layout.astro` (or only on pages that need it).
- One or more `.astro` scripts per page that run `gsap.registerPlugin(ScrollTrigger)` and create timelines/ScrollTrigger instances. No React components; selectors target classes/IDs set in the .astro templates.

---

## 7. Migration notes

### 7.1 From WordPress — manual migration

| Item | Action |
|------|--------|
| **Fragment images (17)** | Export from WP media; place in `public/art/fragment/` (or `src/assets/art/` and reference in `artworks.ts`). Preserve filenames or map in data. |
| **AI Art process copy** | Copy from current AI Art/Work page into `src/data/ai-art-process.ts` (or markdown files if you prefer). |
| **Case study content** | Copy title, client, role, summary, body, images from WP into `src/data/case-studies.ts`. Export case study images to `public/work/ux/` or assets. |
| **Lab tools** | List of 7 tools + descriptions: add to `src/data/lab-tools.ts`. If any tool is currently on WP (embed or link), capture URL or rebuild as static page with embed/script. |
| **About / Contact copy** | Paste into About and Contact .astro pages or into `src/data/about.ts` / `src/data/contact.ts`. |
| **Meta / SEO** | Note current titles and descriptions; replicate in each page’s `<title>` and `<meta name="description">` (or in frontmatter + Layout). |

### 7.2 Built fresh (no WP equivalent)

| Item | Action |
|------|--------|
| **Work index** | New copy for “Work” hub: one short intro, three cards (AI Art, Music, UI/UX). |
| **Music page** | Placeholder: genres (drum and bass, neurofunk, deep house, dubstep) + “Coming soon” or “Suno / production notes coming soon.” |
| **Lab tool pages** | Each of 7 tools: new static page; embed existing tool (e.g. CodePen, standalone HTML) or inline script (Web Audio, Three.js, etc.). |
| **Design system** | New: CSS variables, typography, spacing, components aligned to “dark, editorial, baroque, cinematic” (extend current global.css). |
| **Nav / footer** | New structure per Navigation IA above. |
| **GitHub Actions** | Reuse or adapt current Actions workflow; set `base` and `site` in `astro.config.mjs` for toxiqmynd.com if deploying to GitHub Pages, or keep for separate deploy to custom domain. |

### 7.3 Domain and deploy

- **Domain:** Point toxiqmynd.com to GitHub Pages (or to host that serves the static build). Configure in repo Settings → Pages (and DNS).
- **Build:** `npm run build`; deploy `dist/` via Actions. Ensure `base` is `/` for root domain.

---

## Summary checklist

- [ ] Create all routes and placeholder pages under `src/pages/`.
- [ ] Add data files under `src/data/` (artworks, ai-art-process, case-studies, capabilities, lab-tools, music, meta).
- [ ] Implement layouts (Layout, optional WorkLayout, LabLayout) and shared components (SiteHeader, Nav, SiteFooter).
- [ ] Build home components (Hero, FeaturedGallery, ArtistBio, RecentWorks, CommissionCTA).
- [ ] Build work components (WorkNav, ArtCard, ArtGallery, ProcessBlock, CaseStudyCard, CaseStudyLayout, MusicPlaceholder).
- [ ] Build lab components (LabToolCard, LabToolGrid, LabToolFrame).
- [ ] Migrate 17 Fragment images and process copy; populate case studies and lab tools.
- [ ] Apply GSAP + ScrollTrigger per section 6.
- [ ] Configure base/site and GitHub Actions for toxiqmynd.com.
- [ ] Test all links and static generation; validate accessibility and mobile nav.
