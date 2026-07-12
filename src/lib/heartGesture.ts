export interface Point {
	x: number;
	y: number;
}

/**
 * Heuristic single-stroke heart detector for the mobile easter-egg gesture.
 *
 * Rather than template-matching, we check the topological features that make a
 * heart a heart, so any size / drawing style / stroke direction works:
 *   - a reasonably large, closed-ish loop (endpoints end up near each other)
 *   - a bottom "point" that sits near the horizontal centre
 *   - two top lobes (a left peak and a right peak)
 *   - a central dip between those lobes (the cleavage at the top)
 *
 * A vertical scroll (straight line, endpoints far apart) or a horizontal swipe
 * fails these criteria, so ordinary scrolling never triggers it.
 *
 * Coordinates are in viewport space (y grows downward), matching touch events.
 */
export function isHeartPath(points: Point[]): boolean {
	if (points.length < 12) return false;

	let minX = Infinity;
	let maxX = -Infinity;
	let minY = Infinity;
	let maxY = -Infinity;
	for (const p of points) {
		if (p.x < minX) minX = p.x;
		if (p.x > maxX) maxX = p.x;
		if (p.y < minY) minY = p.y;
		if (p.y > maxY) maxY = p.y;
	}

	const w = maxX - minX;
	const h = maxY - minY;

	// Ignore tiny scribbles / taps.
	if (w < 40 || h < 40) return false;

	// A heart is roughly as wide as it is tall — reject long thin drags.
	const aspect = w / h;
	if (aspect < 0.45 || aspect > 2.2) return false;

	// Normalise to the bounding box: nx in [0,1] left→right, ny in [0,1] top→bottom.
	const nx = (p: Point) => (p.x - minX) / w;
	const ny = (p: Point) => (p.y - minY) / h;

	// Closed-ish loop: the last point returns near the first.
	const start = points[0];
	const end = points[points.length - 1];
	const closeDist = Math.hypot((start.x - end.x) / w, (start.y - end.y) / h);
	if (closeDist > 0.45) return false;

	// The bottom "point" of the heart should sit near the horizontal centre.
	let bottom = points[0];
	for (const p of points) {
		if (p.y > bottom.y) bottom = p;
	}
	const bottomX = nx(bottom);
	if (bottomX < 0.3 || bottomX > 0.7) return false;

	// Topmost point of each lobe (smallest ny), and the central dip between them
	// (largest ny within the top-centre region).
	let leftTop = 1;
	let rightTop = 1;
	let centerDip = 0;
	let sawCenter = false;
	for (const p of points) {
		const x = nx(p);
		const y = ny(p);
		if (x < 0.45) leftTop = Math.min(leftTop, y);
		else if (x > 0.55) rightTop = Math.min(rightTop, y);
		if (x >= 0.4 && x <= 0.6 && y < 0.5) {
			centerDip = Math.max(centerDip, y);
			sawCenter = true;
		}
	}

	if (!sawCenter) return false;

	// Both lobes must reach the upper portion of the drawing.
	if (leftTop > 0.4 || rightTop > 0.4) return false;

	// The central dip must sit clearly below both lobe peaks (that's the notch
	// that distinguishes a heart from a circle or an arch).
	const margin = 0.1;
	return centerDip > leftTop + margin && centerDip > rightTop + margin;
}
