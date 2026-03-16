import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://toxiqmynd.com',
  base: '/',
  redirects: {
    '/gallery': '/work/ai-art',
    '/gallery/': '/work/ai-art/',
  },
});
