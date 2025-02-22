import type { Skill } from '$lib/types/Skill.js';

export const load = async ({ fetch }) => {
	try {
		const response = await fetch(`/api/skills`);
		const skills = await response.json() as Skill[];

		return {
			skills
		};
	} catch (error) {
		console.error('Failed to fetch skills:', error);
		throw error;
	}
};
