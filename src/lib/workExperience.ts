export interface DateRange {
	startDate: string;
	endDate: string;
}

const MS_PER_DAY = 86_400_000;

function rangeEnd(endDate: string, now: Date): Date {
	return endDate === 'PRESENT' ? now : new Date(endDate);
}

export function computeYearsOfExperience(
	ranges: DateRange[],
	now: Date = new Date()
): number {
	const totalMonths = ranges.reduce((sum, { startDate, endDate }) => {
		const start = new Date(startDate);
		const end = rangeEnd(endDate, now);
		const months =
			(end.getFullYear() - start.getFullYear()) * 12 +
			(end.getMonth() - start.getMonth());
		return sum + months;
	}, 0);
	return Math.floor(totalMonths / 6) / 2;
}

export function computeExperienceBreakdown(
	ranges: DateRange[],
	now: Date = new Date()
): string {
	const totalDays = ranges.reduce((sum, { startDate, endDate }) => {
		const start = new Date(startDate);
		const end = rangeEnd(endDate, now);
		return sum + Math.floor((end.getTime() - start.getTime()) / MS_PER_DAY);
	}, 0);
	const years = Math.floor(totalDays / 365.25);
	const remainingDays = totalDays - Math.floor(years * 365.25);
	const months = Math.floor(remainingDays / 30.4375);
	const days = remainingDays - Math.floor(months * 30.4375);
	return `${years} years, ${months} months, ${days} days`;
}
