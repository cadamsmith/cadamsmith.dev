<script lang="ts">
	interface Props {
		images: string[];
		alt: string;
	}

	const { images = [], alt = 'Image' }: Props = $props<{
		images: string[];
		alt: string;
	}>();

	let currentIndex = $state(0);

	let currentImage = $derived(images[currentIndex]);

	function next() {
		currentIndex = (currentIndex + 1) % images.length;
	}

	function prev() {
		currentIndex = (currentIndex - 1 + images.length) % images.length;
	}
</script>

<div class="carousel">
	<div class="carousel-container">
		<img src={currentImage} {alt} />
	</div>

	{#if images.length > 1}
		<button
			class="carousel-prev"
			onclick={prev}
			aria-label="Previous image"
			disabled={images.length < 2}
		>
			<span class="carousel-control-icon">
				<iconify-icon class="iconify-icon" icon="mdi:chevron-left-circle"
				></iconify-icon>
			</span>
		</button>

		<button
			class="carousel-next"
			onclick={next}
			aria-label="Next image"
			disabled={images.length < 2}
		>
			<span class="carousel-control-icon">
				<iconify-icon class="iconify-icon" icon="mdi:chevron-right-circle"
				></iconify-icon>
			</span>
		</button>

		<div class="slide-indicators">
			{#each images as _, index}
				<button
					class="slide-indicator {currentIndex === index ? 'active' : ''}"
					onclick={() => (currentIndex = index)}
					aria-label="Go to slide {index + 1}"
					aria-current={currentIndex === index ? 'true' : 'false'}
				>
					{index + 1}
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.carousel {
		position: relative;
		padding: 1rem;
		background-color: var(--color-j);
	}

	.carousel-next,
	.carousel-prev {
		position: absolute;
		top: 0;
		bottom: 0;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 15%;
		padding: 0;
		text-align: center;
		background: 0 0;
		border: 0;
		opacity: 0.5;
		transition: opacity 0.15s ease;
		cursor: pointer;
	}

	.carousel-next:hover,
	.carousel-prev:hover {
		opacity: 0.7;
	}

	.carousel-next {
		right: 0;
	}

	.carousel-prev {
		left: 0;
	}

	.carousel-control-icon {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		width: 2rem;
		height: 2rem;
		background-repeat: no-repeat;
		background-position: 50%;
		background-size: 100% 100%;

		background-color: #000;
		color: #fff;
		font-size: 1.5em;
	}

	img {
		width: 100%;
	}

	.slide-indicators {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		margin-top: 1rem;
		background-color: #000;
		padding: 0.5rem;
	}

	.slide-indicator {
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		border: 1px solid #fff;
		color: #fff;
		background: transparent;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.8rem;
		transition: all 0.15s ease;
	}

	.slide-indicator:hover {
		background: var(--color-i);
		color: #000;
	}

	.slide-indicator.active {
		background: #fff;
		color: #000;
	}
</style>
