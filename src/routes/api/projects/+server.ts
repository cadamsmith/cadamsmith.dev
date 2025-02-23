import { fetchMarkdownProjects } from '$lib/utils';
import { json } from '@sveltejs/kit';

export const GET = async () => {
	const projects = await fetchMarkdownProjects();

	const sorted = projects.sort((a, b) => {
		return a.order - b.order;
	});

	return json(sorted);
};
