import type { Post } from '$lib/types/Post.js';

export const load = async ({ fetch }) => {
	const response = await fetch(`/api/posts`);
	const posts = <Post[]>await response.json();

	return {
		posts
	};
};
