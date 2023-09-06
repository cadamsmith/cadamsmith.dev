import type { Post } from '$lib/types/Post';

export const load = async ({ fetch, params }) => {
	const { year } = params;
	const response = await fetch('/api/posts');
	const allPosts = <Post[]>await response.json();

	const posts = allPosts.filter(
		(post) => new Date(post.meta.date).getFullYear() === parseInt(year)
	);

	return {
		year,
		posts
	};
};
