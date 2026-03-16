import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://dilbeck831.github.io',
  base: '/ai-art-portfolio/',
  redirects: {
    '/gallery': '/work/ai-art',
    '/gallery/': '/work/ai-art/',
  },
});
