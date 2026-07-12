export interface Project {
	name: string;
	emoji: string;
	description: string;
	technologies: string[];
	githubUrl: string;
	liveUrl?: string;
	liveLabel?: string;
	status?: 'WIP' | 'Stable' | 'Archived';
	order: number;
}
