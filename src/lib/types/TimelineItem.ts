export interface TimelineItem {
	title: string;
	company: string;
	group: string;
	order: number;
	dates: string;
	url: string;
	location: string;
	coordinates: { lat: number; lng: number };
}
