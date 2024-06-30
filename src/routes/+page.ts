import type { Skill } from '$lib/types/Skill.js';

export const load = async ({ fetch }) => {
	const response = await fetch(`/api/skills`);
	const skills = <Skill[]>await response.json();

	return {
		skills
	};
};
