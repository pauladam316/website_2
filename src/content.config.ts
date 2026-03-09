import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blogCategory = z.enum(['observatory-build', 'astrophotography-projects']);

const blog = defineCollection({
	loader: glob({
		pattern: '**/index.md',
		base: './src/content/blog',
		generateId: ({ entry }) => entry.replace(/\/index\.md$/i, '').replace(/\.md$/i, ''),
	}),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		category: blogCategory,
	}),
});

export const collections = { blog };

export type BlogCategory = z.infer<typeof blogCategory>;
