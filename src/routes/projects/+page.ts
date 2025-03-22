import type { Project } from '$lib/types/Project';

export const load = async ({ fetch }) => {
	try {
		const response = await fetch(`/api/projects`);
		const projectMetadatas = (await response.json()) as Project[];

		let projects = [];

		for (const metadata of projectMetadatas) {
			const module = await import(`../../../content/projects/${metadata.slug}.md`);
			projects.push({metadata, component: module.default});
		}

		return {
			projects: projects
		};
	} catch (error) {
		console.error('Failed to fetch data for the home page', error);
		throw error;
	}
};
