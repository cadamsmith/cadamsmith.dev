export interface TimelineItem {
	title: string;
	company: string;
	group: string;
	order: number;
	dates: [Date, Date][];
	url: string;
}
