# AI Art Portfolio

A dark, minimal multi-page portfolio for AI-generated art. Built with [Astro](https://astro.build), static HTML output, and easy content updates via a single data file.

## Quick start

```bash
npm install
npm run dev

```
Open [http://localhost:4321](http://localhost:4321). Use `npm run build` to build for production and `npm run preview` to preview the build.

---

## Adding your art (WordPress-style, but simpler)

### 1. Add image and video files

- Put **images** in `public/art/` (e.g. `public/art/sunset-01.jpg`).
- Put **videos** in `public/art/` (e.g. `public/art/loop-01.mp4`).

### 2. Register each piece in the data file

Edit **`src/data/artworks.ts`**. Each entry looks like:

```ts
{
  id: "unique-id",           // e.g. "sunset-01"
  title: "Piece title",
  image: "sunset-01.jpg",    // filename in public/art/
  video: "loop-01.mp4",     // optional
  description: "Optional short text",
  favorite: true,           // true = show in "Featured" on home
  date: "2024-03",          // optional, for sorting (newest first)
}
```

- **Featured section**: set `favorite: true` for 10–20 pieces to show on the home page.
- **Videos**: use `video: "filename.mp4"`; the card will show the video with the image as poster.
- **Order**: gallery sorts by `date` (newest first) when present.

No database, no admin panel—just add files and edit one TypeScript file. You can later add a headless CMS (e.g. Decap CMS) that edits this file via Git if you want a UI.

---

## Deploying to GitHub Pages

### Option A: GitHub Actions (recommended)

1. Push this repo to GitHub.
2. Create **`.github/workflows/deploy.yml`**:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: "pages"
  cancel-in-progress: false
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - id: deploy
        uses: actions/deploy-pages@v4
```

3. In the repo: **Settings → Pages** → Source: **GitHub Actions**.
4. After the next push to `main`, the site will be at `https://<username>.github.io/<repo-name>/`.

If the repo name is **`username.github.io`**, the site is `https://<username>.github.io/`. In that case set in **`astro.config.mjs`**:

```js
base: '/',
site: 'https://username.github.io',
```

If the repo name is anything else (e.g. `ai-art`), set:

```js
base: '/ai-art/',
site: 'https://username.github.io',
```

### Option B: InMotion shared hosting

1. Run `npm run build` locally.
2. Upload the contents of the **`dist`** folder to your domain’s `public_html` (or the folder your host uses for the site).
3. Ensure the host serves `index.html` for clean URLs, or use the default Astro output with `.html` or hash routing if needed.

Using **GitHub Pages + custom domain**: in repo **Settings → Pages** set your custom domain and follow GitHub’s DNS instructions (CNAME or A records). No need to use InMotion for hosting if you use GitHub Pages for the site.

---

## Project structure

```
├── public/
│   ├── art/          ← Drop images and videos here
│   └── favicon.svg
├── src/
│   ├── data/
│   │   └── artworks.ts   ← Edit this to add/change pieces
│   ├── layouts/
│   │   └── Layout.astro
│   ├── components/
│   │   └── ArtCard.astro
│   ├── pages/
│   │   ├── index.astro   (Home)
│   │   ├── gallery/
│   │   ├── about.astro
│   │   └── contact.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
└── package.json
```

---

## Tech stack

- **Astro** — static site generator, HTML/CSS/JS and optional islands.
- **TypeScript** — for the artworks data and type safety.
- **No backend** — add art by editing `artworks.ts` and adding files to `public/art/`.

To learn more: [Astro docs](https://docs.astro.build).
