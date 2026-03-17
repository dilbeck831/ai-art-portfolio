import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://toxiqmynd.com',
  base: process.env.ASTRO_BASE || '/ai-art-portfolio/',
  redirects: {
    '/gallery': '/work/ai-art',
    '/gallery/': '/work/ai-art/',
  },
});
