import { defineCollection, z } from 'astro:content';

// Vault notes synced from the private obsidian-vault repo at build time.
// Frontmatter fields are optional and loose — the vault schema evolves over time.
const vault = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.union([z.string(), z.date()]).optional(),
    // Accept both array and string forms — vault notes aren't always consistent
    tags: z.preprocess(
      (val) => (typeof val === 'string' ? val.replace(/^\[|\]$/g, '').split(',').map((s) => s.trim()).filter(Boolean) : val),
      z.array(z.string())
    ).optional(),
    status: z.string().optional(),
    aliases: z.array(z.string()).optional(),
    title: z.string().optional(),
  }).passthrough(),
});

export const collections = { vault };
