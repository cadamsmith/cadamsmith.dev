import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const skills = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/skills' }),
	schema: z.object({
		name: z.string(),
		group: z.string(),
		order: z.number(),
		icon: z.string(),
		url: z.string(),
		// Resume-only overrides, consumed only by tools/resume; the site ignores them.
		// `resumeName` replaces the display name on the resume; `excludeFromResume`
		// drops the skill from the resume (e.g. to merge two skills into one label).
		resumeName: z.string().optional(),
		excludeFromResume: z.boolean().optional()
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
					startDate: z.union([z.iso.date(), z.literal('PRESENT')]),
					endDate: z.union([z.iso.date(), z.literal('PRESENT')])
				})
			)
			.min(1),
		summary: z.string().optional(),
		bullets: z.array(z.string()).optional(),
		// Resume-only title override, consumed only by tools/resume; the site uses `title`.
		resumeTitle: z.string().optional(),
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

const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
	schema: z.object({
		name: z.string(),
		emoji: z.string(),
		description: z.string(),
		technologies: z.array(z.string()).min(1),
		// Resume-only override for the tech tags; the site always uses `technologies`.
		// Consumed only by tools/resume. Falls back to `technologies` when absent.
		resumeTechnologies: z.array(z.string()).min(1).optional(),
		githubUrl: z.string(),
		liveUrl: z.string(),
		liveLabel: z.string(),
		status: z.enum(['WIP', 'Stable', 'Archived']).optional(),
		order: z.number(),
		includeInResume: z.boolean().optional()
	})
});

export const collections = { skills, timeline, songs, blurbs, heroTags, projects };
