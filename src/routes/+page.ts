import type { Project } from '$lib/types/Project';
import type { Skill } from '$lib/types/Skill.js';
import type { TimelineItem } from '$lib/types/TimelineItem';

export const load = async ({ fetch }) => {
	try {
		const response = await fetch(`/api/skills`);
		const skills = (await response.json()) as Skill[];

		const response2 = await fetch(`/api/timeline`);
		const timeline = (await response2.json()) as TimelineItem[];

		const projectsCount = 3;

		const response3 = await fetch(`/api/projects?count=${projectsCount}`);
		const projects = (await response3.json()) as Project[];

		return {
			skills,
			timeline,
			projects
		};
	} catch (error) {
		console.error('Failed to fetch data for the home page', error);
		throw error;
	}
};
