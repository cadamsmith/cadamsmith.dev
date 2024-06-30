import type { Post } from '$lib/types/Post';
import type { PostMetadata } from '$lib/types/PostMetadata';
import type { Skill } from '$lib/types/Skill';

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

export const fetchMarkdownSkills = async (): Promise<Skill[]> => {
	const allFiles = import.meta.glob('/data/skills/*.md');
	const iterableFiles = Object.entries(allFiles);

	const allSkills = await Promise.all(
		iterableFiles.map(async ([_, resolver]) => {
			const { metadata } = (await resolver()) as {
				metadata: {
					name: string,
					group: string,
					order: number,
					imageFileName: string,
					url: string
				}
			};
			

			const imageUrl = metadata.imageFileName
				? `/images/skills/${metadata.imageFileName}`
				: '/images/generic_skill.svg';

			return {
				name: metadata.name,
				group: metadata.group,
				order: metadata.order,
				url: metadata.url,
				imageUrl
			};
		})
	);

	return allSkills;
};
