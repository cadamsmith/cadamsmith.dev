import type { Project } from '$lib/types/Project';
import { dev } from '$app/environment';
import { error } from '@sveltejs/kit';

export const load = async ({ fetch }) => {
	// Return 404 in production environment
	if (!dev) {
		error(404, 'Not implemented');
	}

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
	} catch (e) {
		error(404, 'Failed to fetch data for the home page');
	}
};
