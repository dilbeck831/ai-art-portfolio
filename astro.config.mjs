import { defineConfig } from 'astro/config';

// https://astro.build/config
// SITE_URL + ASTRO_BASE are set in CI (e.g. GitHub Pages). Local dev uses defaults.
export default defineConfig({
  site: process.env.SITE_URL || 'https://toxiqmynd.com',
  base: process.env.ASTRO_BASE || '/ai-art-portfolio/',
  redirects: {
    '/gallery': '/work/ai-art',
    '/gallery/': '/work/ai-art/',
  },
  // Hide Astro’s dev-only floating toolbar (often mistaken for a “debugger” UI)
  devToolbar: {
    enabled: false,
  },
});
