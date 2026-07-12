import { describe, it, expect } from 'vitest';
import { isHeartPath, type Point } from './heartGesture';

/**
 * Parametric heart curve (the classic sin/cos heart), sampled as a path.
 * Returned in viewport space (y grows downward), scaled/offset like a real draw.
 */
function heartPath(scale = 6, cx = 200, cy = 200, steps = 80): Point[] {
	const pts: Point[] = [];
	for (let i = 0; i <= steps; i++) {
		const t = (i / steps) * Math.PI * 2;
		const x = 16 * Math.sin(t) ** 3;
		// Standard heart y is "up-positive"; negate to put the point at the bottom
		// in screen space (y grows downward).
		const y = -(
			13 * Math.cos(t) -
			5 * Math.cos(2 * t) -
			2 * Math.cos(3 * t) -
			Math.cos(4 * t)
		);
		pts.push({ x: cx + x * scale, y: cy + y * scale });
	}
	return pts;
}

function circlePath(r = 80, cx = 200, cy = 200, steps = 80): Point[] {
	const pts: Point[] = [];
	for (let i = 0; i <= steps; i++) {
		const t = (i / steps) * Math.PI * 2;
		pts.push({ x: cx + r * Math.cos(t), y: cy + r * Math.sin(t) });
	}
	return pts;
}

/**
 * A heart distorted the way a finger actually draws one: lopsided lobes
 * (`lobeSkew`), a shallower top notch (`dipMul` < 1), an unclosed loop
 * (`stopAt` < 1), and positional `noise`.
 */
function messyHeart({
	scale = 6,
	steps = 70,
	lobeSkew = 1,
	dipMul = 1,
	stopAt = 1,
	noise = 0
}: {
	scale?: number;
	steps?: number;
	lobeSkew?: number;
	dipMul?: number;
	stopAt?: number;
	noise?: number;
} = {}): Point[] {
	const pts: Point[] = [];
	const end = Math.PI * 2 * stopAt;
	for (let i = 0; i <= steps; i++) {
		const t = (i / steps) * end;
		let x = 16 * Math.sin(t) ** 3;
		if (x > 0) x *= lobeSkew;
		let y = -(
			13 * Math.cos(t) -
			5 * Math.cos(2 * t) -
			2 * Math.cos(3 * t) -
			Math.cos(4 * t)
		);
		if (y < 0) y *= dipMul;
		pts.push({
			x: 200 + x * scale + (Math.random() - 0.5) * noise,
			y: 200 + y * scale + (Math.random() - 0.5) * noise
		});
	}
	return pts;
}

function verticalScroll(steps = 40): Point[] {
	const pts: Point[] = [];
	for (let i = 0; i <= steps; i++) {
		pts.push({ x: 200 + (Math.random() - 0.5) * 4, y: 100 + i * 8 });
	}
	return pts;
}

function horizontalSwipe(steps = 40): Point[] {
	const pts: Point[] = [];
	for (let i = 0; i <= steps; i++) {
		pts.push({ x: 100 + i * 8, y: 200 + (Math.random() - 0.5) * 4 });
	}
	return pts;
}

describe('isHeartPath', () => {
	it('accepts a cleanly drawn heart', () => {
		expect(isHeartPath(heartPath())).toBe(true);
	});

	it('accepts a heart drawn in the reverse direction', () => {
		expect(isHeartPath(heartPath().reverse())).toBe(true);
	});

	it('accepts a smaller heart', () => {
		expect(isHeartPath(heartPath(3))).toBe(true);
	});

	it('accepts a slightly noisy heart', () => {
		const noisy = heartPath().map((p) => ({
			x: p.x + (Math.random() - 0.5) * 6,
			y: p.y + (Math.random() - 0.5) * 6
		}));
		expect(isHeartPath(noisy)).toBe(true);
	});

	// Realistic finger-drawn hearts are lopsided, rounded, unclosed and jittery —
	// these guard against the detector regressing into being too strict.
	it('accepts a lopsided heart', () => {
		expect(isHeartPath(messyHeart({ lobeSkew: 1.4 }))).toBe(true);
		expect(isHeartPath(messyHeart({ lobeSkew: 0.7 }))).toBe(true);
	});

	it('accepts a heart with a shallow top notch', () => {
		expect(isHeartPath(messyHeart({ dipMul: 0.4 }))).toBe(true);
	});

	it('accepts an unclosed heart (finger lifts before the loop closes)', () => {
		expect(isHeartPath(messyHeart({ stopAt: 0.85 }))).toBe(true);
	});

	it('accepts a lopsided, shallow, jittery heart', () => {
		expect(isHeartPath(messyHeart({ lobeSkew: 1.3, dipMul: 0.6, noise: 12 }))).toBe(true);
	});

	it('rejects a circle', () => {
		expect(isHeartPath(circlePath())).toBe(false);
	});

	it('rejects a tall ellipse', () => {
		const ellipse: Point[] = [];
		for (let i = 0; i <= 80; i++) {
			const t = (i / 80) * Math.PI * 2;
			ellipse.push({ x: 200 + 60 * Math.cos(t), y: 200 + 100 * Math.sin(t) });
		}
		expect(isHeartPath(ellipse)).toBe(false);
	});

	it('rejects a vertical scroll', () => {
		expect(isHeartPath(verticalScroll())).toBe(false);
	});

	it('rejects a horizontal swipe', () => {
		expect(isHeartPath(horizontalSwipe())).toBe(false);
	});

	it('rejects a tap (too few / too small)', () => {
		expect(isHeartPath([{ x: 200, y: 200 }])).toBe(false);
	});

	it('rejects a tiny scribble', () => {
		const tiny = heartPath(0.5);
		expect(isHeartPath(tiny)).toBe(false);
	});
});
