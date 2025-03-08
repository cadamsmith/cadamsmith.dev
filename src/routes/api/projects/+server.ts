import { fetchMarkdownProjects } from '$lib/utils';
import { json } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	const count = url.searchParams.get('count');
	const projects = await fetchMarkdownProjects(count ? parseInt(count) : -1);

	return json(projects);
};
