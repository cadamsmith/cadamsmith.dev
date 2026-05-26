import { describe, it, expect } from 'vitest';
import { computeYearsOfExperience, computeExperienceBreakdown } from './workExperience';

describe('computeYearsOfExperience', () => {
	it('rounds a whole-year span to the nearest half year', () => {
		const years = computeYearsOfExperience([
			{ startDate: '2020-01-15', endDate: '2023-01-15' }
		]);
		expect(years).toBe(3);
	});

	it('rounds down to the nearest half year', () => {
		const years = computeYearsOfExperience([
			{ startDate: '2020-01-15', endDate: '2020-08-15' }
		]);
		expect(years).toBe(0.5);
	});

	it('sums multiple ranges', () => {
		const years = computeYearsOfExperience([
			{ startDate: '2020-01-15', endDate: '2021-01-15' },
			{ startDate: '2022-06-15', endDate: '2022-12-15' }
		]);
		expect(years).toBe(1.5);
	});

	it('measures a PRESENT range against the supplied now', () => {
		const now = new Date('2025-03-15');
		const years = computeYearsOfExperience(
			[{ startDate: '2024-03-15', endDate: 'PRESENT' }],
			now
		);
		expect(years).toBe(1);
	});
});

describe('computeExperienceBreakdown', () => {
	it('breaks a PRESENT range down to years, months, and days', () => {
		const now = new Date('2021-01-15');
		const breakdown = computeExperienceBreakdown(
			[{ startDate: '2020-01-15', endDate: 'PRESENT' }],
			now
		);
		expect(breakdown).toBe('1 years, 0 months, 1 days');
	});

	it('sums multiple ranges into a single breakdown', () => {
		const breakdown = computeExperienceBreakdown([
			{ startDate: '2020-01-15', endDate: '2021-01-15' },
			{ startDate: '2022-01-15', endDate: '2022-04-15' }
		]);
		expect(breakdown).toBe('1 years, 2 months, 31 days');
	});
});
