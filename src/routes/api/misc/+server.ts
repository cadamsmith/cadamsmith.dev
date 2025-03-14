import { fetchMarkdownMiscResources, fetchMarkdownProjects } from '$lib/utils';
import { json } from '@sveltejs/kit';

export const GET = async ({ }) => {
	// use util/fetchMarkdownMiscResources
	const resources = await fetchMarkdownMiscResources();
	return json(resources);
};
