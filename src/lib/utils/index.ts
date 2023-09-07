import type { Post } from '$lib/types/Post';
import type { PostMetadata } from '$lib/types/PostMetadata';

export const fetchMarkdownPosts = async (): Promise<Post[]> => {
	const allPostFiles = import.meta.glob('/posts/*.md');
	const iterablePostFiles = Object.entries(allPostFiles);

	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const { metadata } = (await resolver()) as { metadata: PostMetadata };
			const slug = (path.split('/').pop() ?? '').split('.')[0];

			return {
				meta: metadata,
				path: `/blog/${slug}`
			};
		})
	);

	return allPosts;
};
