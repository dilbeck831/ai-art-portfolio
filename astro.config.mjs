import { defineConfig } from 'astro/config';

// https://astro.build/config
// Custom domain serves the site at domain root (see scripts/verify-production-hosting.mjs).
// Override with ASTRO_BASE if you host under a subpath.
export default defineConfig({
  site: process.env.SITE_URL || 'https://toxiqmynd.com',
  base: process.env.ASTRO_BASE || '/',
  redirects: {
    '/gallery': '/work/ai-art',
    '/gallery/': '/work/ai-art/',
  },
  // Hide Astro’s dev-only floating toolbar (often mistaken for a “debugger” UI)
  devToolbar: {
    enabled: false,
  },
});
