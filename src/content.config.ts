import { defineCollection, z } from 'astro:content';

const skills = defineCollection({
	type: 'content',
	schema: z.object({
		name: z.string(),
		group: z.string(),
		order: z.number(),
		imageFileName: z.string().optional().default(''),
		url: z.string()
	})
});

const timeline = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		company: z.string(),
		group: z.string(),
		dates: z.string(),
		order: z.number(),
		url: z.string()
	})
});

export const collections = { skills, timeline };
