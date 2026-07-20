<script lang="ts">
	import EmblaCarousel, {
		type EmblaCarouselType,
		type EmblaOptionsType
	} from 'embla-carousel';
	import type { Project } from '$lib/types/Project';
	import ProjectCard from './ProjectCard.svelte';

	interface Props {
		projects: Project[];
	}

	let { projects }: Props = $props();

	const count = $derived(projects.length);

	let viewport = $state<HTMLDivElement>();
	let emblaApi = $state<EmblaCarouselType>();

	// Index of the snap currently aligned to the start edge.
	let activeIndex = $state(0);
	// True only when the cards overflow the viewport — i.e. there's something to
	// page/loop through. When everything fits, Embla reports a single snap and we
	// hide the arrows, dots and edge fades entirely.
	let scrollable = $state(false);

	function reducedMotion(): boolean {
		return (
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		);
	}

	const options: EmblaOptionsType = { loop: true, align: 'start' };

	$effect(() => {
		if (!viewport) return;

		const api = EmblaCarousel(viewport, options);
		emblaApi = api;

		// Embla repositions the real slides via transform for a seamless wrap —
		// there are no clones and no scroll re-centering, so there's nothing to
		// "correct" and no jump. `select` fires once per settle, `reInit` on resize.
		const sync = () => {
			activeIndex = api.selectedScrollSnap();
			scrollable = api.scrollSnapList().length > 1;
		};
		api.on('select', sync);
		api.on('reInit', sync);
		sync();

		return () => {
			api.destroy();
			emblaApi = undefined;
		};
	});

	// The `jump` arg makes the move instant when the user prefers reduced motion.
	function prev(): void {
		emblaApi?.scrollPrev(reducedMotion());
	}
	function next(): void {
		emblaApi?.scrollNext(reducedMotion());
	}
	function goTo(index: number): void {
		emblaApi?.scrollTo(index, reducedMotion());
	}
</script>

<div class="carousel" class:scrollable>
	{#if scrollable}
		<button
			class="nav-arrow prev"
			type="button"
			onclick={prev}
			aria-label="Previous projects"
		>
			<iconify-icon class="iconify-icon" icon="mdi:chevron-left"></iconify-icon>
		</button>
	{/if}

	<div class="viewport" bind:this={viewport}>
		<div class="track">
			{#each projects as project, i (project.name)}
				<div class="slide">
					<ProjectCard {project} active={scrollable && i === activeIndex} />
				</div>
			{/each}
		</div>
	</div>

	{#if scrollable}
		<button
			class="nav-arrow next"
			type="button"
			onclick={next}
			aria-label="Next projects"
		>
			<iconify-icon class="iconify-icon" icon="mdi:chevron-right"></iconify-icon>
		</button>
	{/if}
</div>

{#if scrollable}
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

	.viewport {
		overflow: hidden;
		/* breathing room so card shadows aren't clipped top/bottom */
		padding: 0.5rem;
	}

	.track {
		display: flex;
		/* Embla drives horizontal position via transform on this element. */
		/* Spacing lives on each slide (padding), not as flex `gap`: a `gap` is not
		   preserved across the loop seam because Embla repositions slides by
		   transform, so the wrapped card would butt against its neighbor. The
		   negative margin cancels the first slide's leading padding. */
		margin-left: -1.25rem;
	}

	.slide {
		flex: 0 0 clamp(15rem, 80%, 19rem);
		min-width: 0;
		padding-left: 1.25rem;
	}

	/*
	 * While scrollable there's content in both directions, so fade both edges.
	 * These are static overlays on the (non-transforming) carousel rather than a
	 * mask on the moving track: a mask on the track forces a per-frame re-raster
	 * of the moving content and visibly flickers sub-elements (the solid Live
	 * button, the icons) as you page.
	 */
	.carousel.scrollable::before,
	.carousel.scrollable::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		width: 3.5rem;
		z-index: 1;
		pointer-events: none;
	}

	.carousel.scrollable::before {
		left: 0;
		background: linear-gradient(to right, var(--color-surface), transparent);
	}

	.carousel.scrollable::after {
		right: 0;
		background: linear-gradient(to left, var(--color-surface), transparent);
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
		.slide {
			flex-basis: 85%;
		}

		.nav-arrow {
			display: none;
		}

		/*
		 * Drop the left fade on mobile: with no arrows and one card centred at a
		 * time, the active card is highlighted instead, and the fade only muddied
		 * its leading edge. The right fade stays as a "more to come" affordance.
		 */
		.carousel.scrollable::before {
			display: none;
		}
	}
</style>
