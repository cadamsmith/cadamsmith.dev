import type { Skill } from '$lib/types/Skill';

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