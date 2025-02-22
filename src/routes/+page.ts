import type { Skill } from '$lib/types/Skill.js';
import type { TimelineItem } from '$lib/types/TimelineItem';

export const load = async ({ fetch }) => {
	try {
		const response = await fetch(`/api/skills`);
		const skills = (await response.json()) as Skill[];

		const response2 = await fetch(`/api/timeline`);
		const timeline = (await response2.json()) as TimelineItem[];

		return {
			skills,
			timeline
		};
	} catch (error) {
		console.error('Failed to fetch skills or timeline:', error);
		throw error;
	}
};
