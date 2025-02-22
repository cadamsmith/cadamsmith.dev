import { fetchMarkdownTimelineItems } from '$lib/utils';
import { json } from '@sveltejs/kit';

export const GET = async () => {
	const allTimelineItems = await fetchMarkdownTimelineItems();

	const sorted = allTimelineItems.sort((a, b) => {
		return b.order - a.order;
	});

	return json(sorted);
};
