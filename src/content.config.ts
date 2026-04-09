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
		url: z.string(),
		location: z.string(),
		coordinates: z.object({
			lat: z.number(),
			lng: z.number()
		})
	})
});

const heroTags = defineCollection({
	type: 'content',
	schema: z.object({
		label: z.string(),
		icon: z.string(),
		order: z.number()
	})
});

const blurbs = defineCollection({
	type: 'content',
	schema: z.object({})
});

const songs = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		artist: z.string(),
		youtubeEmbedUrl: z.string(),
		enabled: z.boolean().default(true)
	})
});

export const collections = { skills, timeline, songs, blurbs, heroTags };
