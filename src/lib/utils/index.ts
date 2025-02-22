import type { Skill } from '$lib/types/Skill';
import type { TimelineItem } from '$lib/types/TimelineItem';

export const fetchMarkdownSkills = async (): Promise<Skill[]> => {
	const allFiles = import.meta.glob('/data/skills/*.md');
	const iterableFiles = Object.entries(allFiles);

	const allSkills = await Promise.all(
		iterableFiles.map(async ([_, resolver]) => {
			const { metadata } = (await resolver()) as {
				metadata: {
					name: string;
					group: string;
					order: number;
					imageFileName: string;
					url: string;
				};
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

export const fetchMarkdownTimelineItems = async (): Promise<TimelineItem[]> => {
	const allFiles = import.meta.glob('/data/timeline/*.md');
	const iterableFiles = Object.entries(allFiles);

	const allTimelineItems = await Promise.all(
		iterableFiles.map(async ([_, resolver]) => {
			const { metadata } = (await resolver()) as {
				metadata: {
					title: string;
					company: string;
					group: string;
					dates: string;
					order: number;
					url: string;
				};
			};

			// split date ranges into an array of [startDate, endDate]
			const dates = metadata.dates.split(',').map((date) => {
				const [startDate, endDate] = date.trim().split(' - ');

				const realEndDate = endDate === 'Present' ? new Date() : new Date(endDate);

				return [new Date(startDate), realEndDate] as [Date, Date];
			});

			return {
				title: metadata.title,
				company: metadata.company,
				group: metadata.group,
				dates: dates,
				order: metadata.order,
				url: metadata.url
			};
		})
	);

	return allTimelineItems;
};
