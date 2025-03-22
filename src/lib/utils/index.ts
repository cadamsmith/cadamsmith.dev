import type { Project } from '$lib/types/Project';
import type { Skill } from '$lib/types/Skill';
import type { TimelineItem } from '$lib/types/TimelineItem';

/**
 * Fetches and parses all skill markdown files from the /content/skills/ directory.
 * Each markdown file contains metadata about a skill including name, group, order, image, and URL.
 *
 * @returns {Promise<Skill[]>} A promise that resolves to an array of Skill objects.
 */
export const fetchMarkdownSkills = async (): Promise<Skill[]> => {
	// Use import.meta.glob to get all markdown files in the skills directory
	const allFiles = import.meta.glob('/content/skills/*.md');
	// Convert object to array of entries for easier processing
	const iterableFiles = Object.entries(allFiles);

	const allSkills = await Promise.all(
		iterableFiles.map(async ([, resolver]) => {
			// Resolver function returns the file content with metadata
			const { metadata } = (await resolver()) as {
				metadata: {
					name: string;
					group: string;
					order: number;
					imageFileName: string;
					url: string;
				};
			};

			// Determine the image URL - use a generic fallback if no specific image is provided
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

/**
 * Fetches and parses all timeline markdown files from the /content/timeline/ directory.
 * Each markdown file represents a timeline item (like a job or education period) with
 * metadata for title, company, dates, etc.
 * 
 * @returns {Promise<TimelineItem[]>} A promise that resolves to an array of TimelineItem objects.
 */
export const fetchMarkdownTimelineItems = async (): Promise<TimelineItem[]> => {
	// Use import.meta.glob to get all markdown files in the timeline directory
	const allFiles = import.meta.glob('/content/timeline/*.md');
	// Convert object to array of entries for easier processing
	const iterableFiles = Object.entries(allFiles);

	const allTimelineItems = await Promise.all(
		iterableFiles.map(async ([, resolver]) => {
			// Resolver function returns the file content with metadata
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

			// Process date ranges from string format to array of ISO date strings
			// Example input: "January 2020 - March 2022, April 2022 - Present"
			const dates = metadata.dates.split(',').map((date) => {
				const [startDate, endDate] = date.trim().split(' - ');

				// Create dates with UTC to avoid timezone issues
				const startDateObj = new Date(startDate);
				
				// Set to UTC midnight to avoid date shifting when converting to different timezones
				startDateObj.setUTCHours(0, 0, 0, 0);
				
				let endDateObj: Date;
				
				// Handle 'Present' as the current date
				if (endDate === 'Present') {
					endDateObj = new Date();
					endDateObj.setUTCHours(0, 0, 0, 0);
				} else {
					endDateObj = new Date(endDate);
					endDateObj.setUTCHours(0, 0, 0, 0);
				}

				// Return as tuple of ISO strings for consistent date formatting
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

/**
 * Fetches and parses project markdown files from the /content/projects/ directory.
 * Each markdown file contains metadata about a project including name, description, images, etc.
 *
 * @param {number} count - The number of projects to return. If -1, returns all projects.
 * @returns {Promise<Project[]>} A promise that resolves to an array of Project objects.
 */
export const fetchMarkdownProjects = async (count: number): Promise<Project[]> => {
	// Use import.meta.glob to get all markdown files in the projects directory
	const allFiles = import.meta.glob('/content/projects/*.md');
	// Convert object to array of entries for easier processing
	const iterableFiles = Object.entries(allFiles);

	const allProjects = await Promise.all(
		iterableFiles.map(async ([path, resolver]) => {
			// Resolver function returns the file content with metadata
			const { metadata } = (await resolver()) as {
				metadata: {
					name: string;
					group: string;
					order: number;
					url: string;
					description: string;
					tags: string;
					timeRange: string;
					images: string;
				};
			};

			// Extract slug from the file path (e.g., '/content/projects/my-project.md' -> 'my-project')
			const slug = path.split('/').pop()?.replace('.md', '') ?? '';

			// Process comma-separated image list into array of image URLs
			const imageUrls = metadata.images ? metadata.images.split('|').map((image) => {
				return `/images/projects/${slug}/${image.trim()}`;
			}) : [];

			// Process comma-separated tags into array of tag strings
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
				timeRange: metadata.timeRange,
				slug: slug
			};
		})
	);

	// Sort projects by their specified order property (ascending)
	const sorted = allProjects.sort((a, b) => a.order - b.order);

	// Return either all projects or just the requested number
	if (count === -1 || count > sorted.length) {
		return sorted;
	} else {
		return sorted.slice(0, count);
	}
};

/**
 * Fetches miscellaneous resources from a single markdown file at /content/misc_resources.md.
 * The file should contain key-value pairs in its frontmatter metadata.
 *
 * @returns {Promise<{[key: string]: string}>} A promise that resolves to an object containing resource key-value pairs.
 */
export const fetchMarkdownMiscResources = async (): Promise<{[key: string]: string}> => {
	// Load the single file containing miscellaneous resources
	const file = import.meta.glob('/content/misc_resources.md');
	// Get the resolver function for the file (there's only one)
	const resolver = Object.values(file)[0];

	// Extract metadata from the file, which contains key-value pairs
	const { metadata } = (await resolver()) as {
		metadata: {[key: string]: string}
	};

	return metadata;
};
