import type { Project } from '$lib/types/Project';
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

				// Create dates with UTC to avoid timezone issues
				const startDateObj = new Date(startDate);
				
				// Set to UTC midnight to avoid date shifting
				startDateObj.setUTCHours(0, 0, 0, 0);
				
				let endDateObj: Date;
				
				if (endDate === 'Present') {
					endDateObj = new Date();
					endDateObj.setUTCHours(0, 0, 0, 0);
				} else {
					endDateObj = new Date(endDate);
					endDateObj.setUTCHours(0, 0, 0, 0);
				}

				return [startDateObj.toISOString(), endDateObj.toISOString()] as [string, string];
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

export const fetchMarkdownProjects = async (count: number): Promise<Project[]> => {
	const allFiles = import.meta.glob('/data/projects/*.md');
	const iterableFiles = Object.entries(allFiles);

	const allProjects = await Promise.all(
		iterableFiles.map(async ([_, resolver]) => {
			const { metadata } = (await resolver()) as {
				metadata: {
					name: string;
					group: string;
					order: number;
					images: string;
					url: string;
					description: string;
					tags: string;
					timeRange: string;
				};
			};

			const imageUrls = metadata.images.split(',').map((image) => {
				return `/images/projects/${image.trim()}`;
			});

			const tags = metadata.tags.split(',').map((tag) => {
				return tag.trim();
			});

			return {
				name: metadata.name,
				group: metadata.group,
				order: metadata.order,
				url: metadata.url,
				imageUrls: imageUrls,
				description: metadata.description,
				tags: tags,
				timeRange: metadata.timeRange
			};
		})
	);

	// sort projects by order
	const sorted = allProjects.sort((a, b) => a.order - b.order);

	// return the first count projects
	if (count === -1 || count > sorted.length) {
		return sorted;
	} else {
		return sorted.slice(0, count);
	}
};

export const fetchMarkdownMiscResources = async (): Promise<{[key: string]: string}> => {
	// convert data/misc_resources.md into dictionary type
	const file = import.meta.glob('/data/misc_resources.md');
	const resolver = Object.values(file)[0];

	const { metadata } = (await resolver()) as {
		metadata: {[key: string]: string}
	};

	return metadata;
};
