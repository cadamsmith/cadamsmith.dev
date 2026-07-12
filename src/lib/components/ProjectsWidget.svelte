<script lang="ts">
	import { tick } from 'svelte';
	import type { Project } from '$lib/types/Project';
	import ProjectCard from './ProjectCard.svelte';

	interface Props {
		projects: Project[];
	}

	let { projects }: Props = $props();

	const count = projects.length;

	let rail = $state<HTMLDivElement>();
	// `loop` = enough cards overflow the viewport that seamless wrapping makes sense.
	// When true we render three copies of the set and keep the viewport parked in the
	// middle copy, re-centering by exactly one set-width whenever scrolling settles.
	let loop = $state(false);
	let activeIndex = $state(0);

	let settleTimer: ReturnType<typeof setTimeout> | undefined;
	let recentering = false;

	// Three copies while looping so there's a full set of runway on either side.
	const copies = $derived(loop ? [0, 1, 2] : [0]);

	function reducedMotion(): boolean {
		return (
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		);
	}

	// Distance from one card to the next (card width + gap) — uniform across the rail.
	function stride(): number {
		if (!rail) return 0;
		const items = rail.querySelectorAll<HTMLElement>('.rail-item');
		if (items.length < 2) return items[0]?.offsetWidth ?? 0;
		return items[1].offsetLeft - items[0].offsetLeft;
	}

	// Width of one full copy of the project set.
	function setWidth(): number {
		return stride() * count;
	}

	function measure(): boolean {
		if (!rail) return false;
		// Width of a single set: with clones present, that's scrollWidth / copies.length;
		// without clones it's the rail's own scrollWidth.
		const singleSet = rail.scrollWidth / copies.length;
		return singleSet - rail.clientWidth > 1;
	}

	async function syncLoop(): Promise<void> {
		if (!rail) return;
		const shouldLoop = measure();
		if (shouldLoop === loop) {
			updateActive();
			return;
		}
		loop = shouldLoop;
		await tick();
		if (loop && rail) {
			recentering = true;
			rail.scrollLeft = setWidth();
			recentering = false;
		}
		updateActive();
	}

	function updateActive(): void {
		if (!rail) return;
		const step = stride();
		if (!step) return;
		const raw = Math.round(rail.scrollLeft / step);
		activeIndex = loop ? ((raw % count) + count) % count : raw;
	}

	// Jump back into the middle copy by a whole set-width. Seamless because every copy
	// is identical and the jump is an integer number of card strides.
	function recenter(): void {
		if (!rail || !loop) return;
		const sw = setWidth();
		if (!sw) return;
		const left = rail.scrollLeft;
		let next = left;
		if (left < sw) next = left + sw;
		else if (left >= 2 * sw) next = left - sw;
		if (next !== left) {
			recentering = true;
			rail.scrollLeft = next;
			recentering = false;
		}
	}

	function onScroll(): void {
		if (recentering) return;
		updateActive();
		if (!loop) return;
		clearTimeout(settleTimer);
		settleTimer = setTimeout(recenter, 120);
	}

	function page(direction: 1 | -1): void {
		if (!rail) return;
		// Re-normalize into the middle copy first so rapid clicks can never outrun the
		// settle-based recenter and hit a hard edge — keeps the loop truly seamless.
		recenter();
		const distance = Math.max(rail.clientWidth * 0.85, stride());
		rail.scrollBy({
			left: direction * distance,
			behavior: reducedMotion() ? 'auto' : 'smooth'
		});
	}

	// Scroll to the nearest occurrence of a project index, staying inside the middle copy.
	function goTo(index: number): void {
		if (!rail) return;
		const step = stride();
		if (!step) return;
		if (!loop) {
			rail.scrollTo({
				left: index * step,
				behavior: reducedMotion() ? 'auto' : 'smooth'
			});
			return;
		}
		recenter();
		const base = Math.round(rail.scrollLeft / step);
		const currentBucket = Math.floor(base / count) * count;
		// Pick whichever copy of `index` is closest to where we are now.
		const candidates = [
			currentBucket + index,
			currentBucket + index - count,
			currentBucket + index + count
		];
		const target = candidates.reduce((best, c) =>
			Math.abs(c - base) < Math.abs(best - base) ? c : best
		);
		rail.scrollTo({ left: target * step, behavior: reducedMotion() ? 'auto' : 'smooth' });
	}

	$effect(() => {
		syncLoop();
		const onResize = () => syncLoop();
		window.addEventListener('resize', onResize);
		return () => {
			window.removeEventListener('resize', onResize);
			clearTimeout(settleTimer);
		};
	});
</script>

<div class="carousel" class:looping={loop}>
	{#if loop}
		<button
			class="nav-arrow prev"
			type="button"
			onclick={() => page(-1)}
			aria-label="Previous projects"
		>
			<iconify-icon class="iconify-icon" icon="mdi:chevron-left"></iconify-icon>
		</button>
	{/if}

	<div class="rail" bind:this={rail} onscroll={onScroll}>
		{#each copies as copy (copy)}
			{#each projects as project (`${copy}-${project.name}`)}
				<!-- Clone copies are inert: hidden from AT and removed from tab order -->
				<div class="rail-item" inert={loop && copy !== 1}>
					<ProjectCard {project} />
				</div>
			{/each}
		{/each}
	</div>

	{#if loop}
		<button
			class="nav-arrow next"
			type="button"
			onclick={() => page(1)}
			aria-label="Next projects"
		>
			<iconify-icon class="iconify-icon" icon="mdi:chevron-right"></iconify-icon>
		</button>
	{/if}
</div>

{#if loop}
	<div class="rail-footer">
		<div class="dots" role="tablist" aria-label="Project positions">
			{#each projects as project, i (project.name)}
				<button
					class="dot"
					class:active={i === activeIndex}
					type="button"
					onclick={() => goTo(i)}
					role="tab"
					aria-selected={i === activeIndex}
					aria-label={`Go to ${project.name}`}
				></button>
			{/each}
		</div>
		<span class="counter" aria-hidden="true">
			{String(activeIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
		</span>
	</div>
{/if}

<style>
	.carousel {
		position: relative;
		/* room for the arrows to sit just outside the cards */
		margin: 0 -0.5rem;
	}

	.rail {
		display: flex;
		gap: 1.25rem;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scroll-padding-left: 0.5rem;
		padding: 0.5rem;
		/* hide scrollbar; the arrows + dots carry the affordance */
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.rail::-webkit-scrollbar {
		display: none;
	}

	/*
	 * While looping there's always more content in both directions, so fade both edges.
	 * These are static overlays on the (non-scrolling) carousel rather than a mask on the
	 * rail: a mask on a scroll container forces a per-frame re-raster of the moving content
	 * and visibly flickers sub-elements (the solid Live button, the icons) as you page.
	 */
	.carousel.looping::before,
	.carousel.looping::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		width: 3.5rem;
		z-index: 1;
		pointer-events: none;
	}

	.carousel.looping::before {
		left: 0;
		background: linear-gradient(to right, var(--color-surface), transparent);
	}

	.carousel.looping::after {
		right: 0;
		background: linear-gradient(to left, var(--color-surface), transparent);
	}

	.rail-item {
		flex: 0 0 clamp(15rem, 80%, 19rem);
		scroll-snap-align: start;
	}

	.nav-arrow {
		position: absolute;
		top: calc(50% - 1rem);
		transform: translateY(-50%);
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 999px;
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		color: var(--color-l);
		font-size: 1.4rem;
		cursor: pointer;
		box-shadow: 0 6px 20px -8px rgba(0, 0, 0, 0.8);
		transition:
			background-color 0.14s ease,
			border-color 0.14s ease,
			color 0.14s ease;
	}

	.nav-arrow.prev {
		left: -0.75rem;
	}

	.nav-arrow.next {
		right: -0.75rem;
	}

	.nav-arrow:hover,
	.nav-arrow:focus-visible {
		background-color: var(--color-c);
		border-color: var(--color-c);
		color: #0c0b09;
	}

	.rail-footer {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.85rem;
		margin-top: 1rem;
	}

	.dots {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.dot {
		width: 0.5rem;
		height: 0.5rem;
		padding: 0;
		border: none;
		border-radius: 999px;
		background-color: var(--color-border);
		cursor: pointer;
		transition:
			width 0.18s ease,
			background-color 0.18s ease;
	}

	.dot:hover {
		background-color: var(--color-muted);
	}

	.dot.active {
		width: 1.4rem;
		background-color: var(--color-c);
	}

	.dot:focus-visible {
		outline: 2px solid var(--color-h);
		outline-offset: 2px;
	}

	.counter {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.72rem;
		letter-spacing: 0.06em;
		color: var(--color-muted);
	}

	@media (max-width: 600px) {
		.rail-item {
			flex-basis: 85%;
		}

		.nav-arrow {
			display: none;
		}
	}
</style>
