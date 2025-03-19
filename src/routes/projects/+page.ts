import type { Project } from '$lib/types/Project';

export const load = async ({ fetch }) => {
	try {
		const response = await fetch(`/api/projects`);
		const projects = (await response.json()) as Project[];

		return {
			projects
		};
	} catch (error) {
		console.error('Failed to fetch data for the home page', error);
		throw error;
	}
};
