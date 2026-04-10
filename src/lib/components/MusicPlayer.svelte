<script module>
	// Module-level: persists across remounts (client-side navigations) but resets on full page load.
	// On first hydration we keep the SSR-rendered song; on subsequent mounts we randomize.
	let hasLoaded = false;
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	const { youTubeUrls }: { youTubeUrls: string[] } = $props();

	let randomized: string[] = [];
	let index = $state(0);
	let isPlaying = $state(false);

	onMount(() => {
		if (hasLoaded) {
			randomized = [...youTubeUrls].sort(() => Math.random() - 0.5);
			index = getRandomIndex();
		} else {
			// Keep the SSR-rendered song (youTubeUrls[0]) at index 0 so the iframe src
			// doesn't change on hydration. Shuffle the rest for next/prev navigation.
			const [first, ...rest] = youTubeUrls;
			randomized = [first, ...rest.sort(() => Math.random() - 0.5)];
			index = 0;
			hasLoaded = true;
		}
	});

	function getRandomIndex() {
		return Math.floor(Math.random() * youTubeUrls.length);
	}

	function nextSong() {
		index = (index + 1) % randomized.length;
		isPlaying = true;
	}

	function previousSong() {
		index = (index - 1 + randomized.length) % randomized.length;
		isPlaying = true;
	}

	let url = $derived(randomized[index] ?? youTubeUrls[0]);
</script>

<div class="controls">
	<button onclick={previousSong} aria-label="Previous Song">
		<iconify-icon class="iconify-icon" icon="mdi:skip-previous"></iconify-icon>
	</button>

	<iconify-icon class="iconify-icon music-icon" icon="mdi:music"></iconify-icon>

	<button onclick={nextSong} aria-label="Next Song">
		<iconify-icon class="iconify-icon" icon="mdi:skip-next"></iconify-icon>
	</button>
</div>

<iframe
	width="344"
	height="210"
	src="{url}&controls=0&rel=0{isPlaying ? '&autoplay=1' : ''}"
	title="YouTube video player"
	frameborder="0"
	allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
	referrerpolicy="strict-origin-when-cross-origin"
></iframe>

<style>
	.controls {
		background-color: #000;
		border: 2px solid #000;
		display: flex;
		justify-content: space-between;
		gap: 0.5rem;
		padding: 0.5rem;
		margin-bottom: 0.2rem;
	}

	.music-icon {
		color: #fff;
	}

	.controls button {
		border: 2px solid #000;
	}
</style>
