import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const skills = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/skills' }),
	schema: z.object({
		name: z.string(),
		group: z.string(),
		order: z.number(),
		imageFileName: z.string().optional().default(''),
		url: z.string()
	})
});

const timeline = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/timeline' }),
	schema: z.object({
		title: z.string(),
		company: z.string(),
		group: z.string(),
		dateRanges: z
			.array(
				z.object({
					startDate: z.union([z.string().date(), z.literal('PRESENT')]),
					endDate: z.union([z.string().date(), z.literal('PRESENT')])
				})
			)
			.min(1),
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
	loader: glob({ pattern: '**/*.md', base: './src/content/heroTags' }),
	schema: z.object({
		label: z.string(),
		icon: z.string(),
		order: z.number()
	})
});

const blurbs = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blurbs' }),
	schema: z.object({})
});

const songs = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/songs' }),
	schema: z.object({
		title: z.string(),
		artist: z.string(),
		youtubeEmbedUrl: z.string(),
		enabled: z.boolean().default(true)
	})
});

export const collections = { skills, timeline, songs, blurbs, heroTags };
