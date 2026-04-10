export interface TimelineItem {
	title: string;
	company: string;
	group: string;
	order: number;
	dateRanges: { startDate: string; endDate: string }[];
	url: string;
	location: string;
	coordinates: { lat: number; lng: number };
}
