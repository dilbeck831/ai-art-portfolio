import { defineCollection, z } from 'astro:content';

// Vault notes synced from the private obsidian-vault repo at build time.
// Frontmatter fields are optional and loose — the vault schema evolves over time.
const vault = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.union([z.string(), z.date()]).optional(),
    tags: z.array(z.string()).optional(),
    status: z.string().optional(),
    aliases: z.array(z.string()).optional(),
    title: z.string().optional(),
  }).passthrough(),
});

export const collections = { vault };
