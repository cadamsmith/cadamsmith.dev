<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { isHeartPath, type Point } from '../heartGesture';

	let visible = $state(false);
	let prevOverflow = '';

	function open() {
		if (visible) return;
		visible = true;
		prevOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
	}

	function close() {
		if (!visible) return;
		visible = false;
		document.body.style.overflow = prevOverflow;
	}

	function onKey(e: KeyboardEvent) {
		if (e.key === 'Escape') close();
	}

	// Mobile trigger: the terminal (and its `yasmine` command) is hidden on small
	// screens, so drawing a heart anywhere with one finger reveals the egg. We use
	// touch events (not pointer events) because touchmove keeps firing during a
	// scroll while pointer events get cancelled — and we listen passively so we
	// never block normal scrolling; the finger's viewport path is analysed on lift.
	let path: Point[] = [];
	let drawing = false;

	function pushPoint(x: number, y: number) {
		const last = path[path.length - 1];
		// Collapse near-duplicate samples; cap length to bound work.
		if (last && Math.abs(last.x - x) < 2 && Math.abs(last.y - y) < 2) return;
		path.push({ x, y });
		if (path.length > 1500) path.shift();
	}

	function endStroke() {
		if (!drawing) return;
		drawing = false;
		const drawn = path;
		path = [];
		if (isHeartPath(drawn)) open();
	}

	function onTouchStart(e: TouchEvent) {
		if (visible || e.touches.length !== 1) {
			drawing = false;
			path = [];
			return;
		}
		drawing = true;
		path = [{ x: e.touches[0].clientX, y: e.touches[0].clientY }];
	}

	function onTouchMove(e: TouchEvent) {
		if (!drawing) return;
		if (e.touches.length !== 1) {
			drawing = false;
			path = [];
			return;
		}
		pushPoint(e.touches[0].clientX, e.touches[0].clientY);
	}

	// Mouse handlers let the gesture be exercised on desktop too.
	function onMouseDown(e: MouseEvent) {
		if (visible || e.button !== 0) return;
		drawing = true;
		path = [{ x: e.clientX, y: e.clientY }];
	}

	function onMouseMove(e: MouseEvent) {
		if (!drawing) return;
		pushPoint(e.clientX, e.clientY);
	}

	onMount(() => {
		window.addEventListener('morocco:reveal', open);
		window.addEventListener('keydown', onKey);
		document.addEventListener('touchstart', onTouchStart, { passive: true });
		document.addEventListener('touchmove', onTouchMove, { passive: true });
		document.addEventListener('touchend', endStroke, { passive: true });
		document.addEventListener('touchcancel', endStroke, { passive: true });
		document.addEventListener('mousedown', onMouseDown);
		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', endStroke);
		return () => {
			window.removeEventListener('morocco:reveal', open);
			window.removeEventListener('keydown', onKey);
			document.removeEventListener('touchstart', onTouchStart);
			document.removeEventListener('touchmove', onTouchMove);
			document.removeEventListener('touchend', endStroke);
			document.removeEventListener('touchcancel', endStroke);
			document.removeEventListener('mousedown', onMouseDown);
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', endStroke);
			document.body.style.overflow = prevOverflow;
		};
	});

	// ── Geometry (pure — safe during SSR) ──────────────────────────────
	function starPath(
		cx: number,
		cy: number,
		ro: number,
		ri: number,
		pts: number,
		rotDeg: number
	): string {
		const step = Math.PI / pts;
		const rot = (rotDeg * Math.PI) / 180;
		let d = '';
		for (let i = 0; i < pts * 2; i++) {
			const r = i % 2 === 0 ? ro : ri;
			const a = rot + i * step;
			d += (i ? 'L' : 'M') + (cx + r * Math.cos(a)).toFixed(2) + ',';
			d += (cy + r * Math.sin(a)).toFixed(2) + ' ';
		}
		return d + 'Z';
	}

	// The Moroccan flag star: a {5/2} pentacle drawn as an unfilled,
	// interlacing outline (not a filled star).
	function pentacle(cx: number, cy: number, r: number, rotDeg = -90): string {
		const p: [number, number][] = [];
		for (let k = 0; k < 5; k++) {
			const a = ((rotDeg + k * 72) * Math.PI) / 180;
			p.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
		}
		const order = [0, 2, 4, 1, 3];
		return (
			order
				.map(
					(idx, i) => (i ? 'L' : 'M') + p[idx][0].toFixed(2) + ',' + p[idx][1].toFixed(2)
				)
				.join(' ') + ' Z'
		);
	}

	const zTile = starPath(60, 60, 50, 23, 8, 22.5); // 8-point zellige star, 120px tile
	const pentaclePath = pentacle(100, 100, 82);
</script>

{#if visible}
	<div
		class="egg"
		onclick={close}
		onkeydown={onKey}
		role="presentation"
		transition:fade={{ duration: 450 }}
	>
		<!-- Zellige mosaic backdrop -->
		<svg class="zellige" aria-hidden="true">
			<defs>
				<pattern id="zellige-tile" width="120" height="120" patternUnits="userSpaceOnUse">
					<path d={zTile} class="ztile" />
					<circle cx="60" cy="60" r="5.5" class="zdot" />
					<circle cx="0" cy="0" r="3" class="zdot" />
					<circle cx="120" cy="0" r="3" class="zdot" />
					<circle cx="0" cy="120" r="3" class="zdot" />
					<circle cx="120" cy="120" r="3" class="zdot" />
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#zellige-tile)" />
		</svg>

		<div class="glow"></div>

		<div class="stage">
			<svg class="medallion" viewBox="0 0 200 200" aria-hidden="true">
				<circle cx="100" cy="100" r="92" class="ring outer" />
				<circle cx="100" cy="100" r="78" class="ring inner" />
				<path d={pentaclePath} class="star" pathLength="1" />
			</svg>

			<div class="message">
				<p class="arabic" dir="rtl" lang="ar">حبيبتي</p>
			</div>

			<p class="band">❤️ 💍 ❤️</p>
		</div>

		<button class="dismiss" onclick={close} aria-label="Close">✕</button>
		<p class="hint">press <kbd>esc</kbd> or click anywhere</p>
	</div>
{/if}

<style>
	.egg {
		position: fixed;
		inset: 0;
		z-index: 9999;
		overflow: hidden;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background:
			radial-gradient(circle at 50% 42%, #c1272d 0%, #9a1c26 45%, #6d141c 100%), #6d141c;
		font-family: 'Rubik Variable', sans-serif;
	}

	.zellige {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		opacity: 0.16;
	}

	.ztile {
		fill: none;
		stroke: #f0d089;
		stroke-width: 1.4;
	}

	.zdot {
		fill: #e3b23c;
	}

	.glow {
		position: absolute;
		width: 46rem;
		height: 46rem;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(243, 210, 137, 0.28) 0%, transparent 62%);
		filter: blur(8px);
		animation: breathe 6s ease-in-out infinite;
	}

	.stage {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.6rem;
		text-align: center;
		padding: 1rem;
	}

	.medallion {
		width: min(46vw, 260px);
		height: min(46vw, 260px);
		filter: drop-shadow(0 0 26px rgba(0, 98, 51, 0.55));
		animation: rise 900ms cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	.ring {
		fill: none;
		stroke: #e3b23c;
	}

	.ring.outer {
		stroke-width: 2;
		opacity: 0.85;
		stroke-dasharray: 2 6;
		transform-origin: 100px 100px;
		animation: spin 40s linear infinite;
	}

	.ring.inner {
		stroke-width: 1;
		opacity: 0.5;
	}

	.star {
		fill: none;
		stroke: #0a6b3b;
		stroke-width: 4.5;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-dasharray: 1;
		stroke-dashoffset: 0;
		filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.35));
		animation: draw 1600ms 300ms ease-in-out both;
	}

	.message p {
		margin: 0;
		color: #f7ecd2;
		line-height: 1.25;
		animation: fadeUp 800ms 600ms ease both;
	}

	.arabic {
		font-size: clamp(3rem, 11vw, 5.4rem);
		font-weight: 700;
		line-height: 1.6;
		color: #fff;
		text-shadow: 0 2px 18px rgba(0, 0, 0, 0.35);
		animation-delay: 500ms;
	}

	.band {
		font-size: clamp(2rem, 6vw, 3rem);
		margin: 2.5rem 0 0;
		line-height: 1;
		animation: fadeUp 800ms 800ms ease both;
	}

	.dismiss {
		position: absolute;
		top: 1.1rem;
		right: 1.2rem;
		width: 2.4rem;
		height: 2.4rem;
		border-radius: 50%;
		border: 1px solid rgba(243, 210, 137, 0.5);
		background: rgba(0, 0, 0, 0.25);
		color: #f3d289;
		font-size: 1rem;
		cursor: pointer;
		transition: background 0.15s ease;
	}

	.dismiss:hover {
		background: rgba(0, 0, 0, 0.5);
	}

	.hint {
		position: absolute;
		bottom: 1.4rem;
		color: rgba(247, 236, 210, 0.65);
		font-size: 0.8rem;
		letter-spacing: 0.06em;
		margin: 0;
	}

	.hint kbd {
		background: rgba(0, 0, 0, 0.35);
		border: 1px solid rgba(243, 210, 137, 0.4);
		border-radius: 0.3em;
		padding: 0.05em 0.4em;
		font-family: 'JetBrains Mono', monospace;
	}

	@keyframes draw {
		from {
			stroke-dashoffset: 1;
		}
		to {
			stroke-dashoffset: 0;
		}
	}

	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(24px) scale(0.9);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(14px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes breathe {
		0%,
		100% {
			transform: scale(0.92);
			opacity: 0.8;
		}
		50% {
			transform: scale(1.05);
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.glow,
		.medallion,
		.ring.outer,
		.star,
		.message p,
		.band {
			animation: none;
		}
		.star {
			stroke-dashoffset: 0;
		}
	}
</style>
