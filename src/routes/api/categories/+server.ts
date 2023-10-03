import { fetchMarkdownPosts } from '$lib/utils';
import { json } from '@sveltejs/kit';

export const GET = async () => {
	const allPosts = await fetchMarkdownPosts();

	// Create an object to hold the category name and count
	const categoryCount: { [key: string]: number } = {};

	// Loop through allPosts and count the articles in each category
	allPosts.forEach((post) => {
		post.meta.categories.forEach((category) => {
			if (categoryCount[category]) {
				categoryCount[category] += 1;
			} else {
				categoryCount[category] = 1;
			}
		});
	});

	// Sort the categories by count
	const sortedCategories = Object.keys(categoryCount).sort((a, b) => {
		return categoryCount[b] - categoryCount[a];
	});

	// Create an array of objects with category name and count
	const categoriesWithCount = sortedCategories.map((category) => ({
		name: category,
		count: categoryCount[category]
	}));

	return json(categoriesWithCount);
};
