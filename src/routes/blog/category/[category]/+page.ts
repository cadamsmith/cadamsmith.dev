import type { Post } from '$lib/types/Post';

export const load = async ({ fetch, params }) => {
	const { category } = params;
	const response = await fetch('/api/posts');
	const allPosts = <Post[]>await response.json();

	const posts = allPosts.filter((post) => post.meta.categories.includes(category));

	return {
		category,
		posts
	};
};
