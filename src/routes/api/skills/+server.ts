import { fetchMarkdownSkills } from '$lib/utils';
import { json } from '@sveltejs/kit';

export const GET = async () => {
	const allSkills = await fetchMarkdownSkills();

	const sortedSkills = allSkills.sort((a, b) => {
		return a.order - b.order;
	});

	return json(sortedSkills);
};
