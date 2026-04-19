<script lang="ts">
	import { onMount } from 'svelte';

	const { youTubeUrls }: { youTubeUrls: string[] } = $props();

	let randomized: string[] = [];
	let index = $state(0);
	let isPlaying = $state(false);
	let isMounted = $state(false);

	onMount(() => {
		randomized = [...youTubeUrls].sort(() => Math.random() - 0.5);
		index = getRandomIndex();
		isMounted = true;
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

{#if isMounted}
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
		width="100%"
		height="210"
		src="{url}&controls=0&rel=0{isPlaying ? '&autoplay=1' : ''}"
		title="YouTube video player"
		frameborder="0"
		allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		referrerpolicy="strict-origin-when-cross-origin"
	></iframe>
{/if}

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
