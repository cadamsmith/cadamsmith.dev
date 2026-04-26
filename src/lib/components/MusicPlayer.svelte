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
	<div class="player">
		<div class="controls">
			<button onclick={previousSong} aria-label="Previous Song">
				<iconify-icon icon="mdi:skip-previous"></iconify-icon>
			</button>

			<span class="now-playing">
				<iconify-icon icon="mdi:music-note"></iconify-icon>
				now playing
			</span>

			<button onclick={nextSong} aria-label="Next Song">
				<iconify-icon icon="mdi:skip-next"></iconify-icon>
			</button>
		</div>

		<iframe
			width="100%"
			height="215"
			src="{url}&controls=0&rel=0{isPlaying ? '&autoplay=1' : ''}"
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
		></iframe>
	</div>
{/if}

<style>
	.player {
		border: 1px solid var(--color-border);
		border-radius: 0.5em;
		overflow: hidden;
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
	}

	.controls {
		background-color: var(--color-j);
		border-bottom: 1px solid var(--color-border);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 0.75rem;
	}

	.now-playing {
		display: flex;
		align-items: center;
		gap: 0.3em;
		font-size: 0.7em;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-c);
		font-family: 'JetBrains Mono', monospace;
	}

	.controls button {
		background: none;
		border: none;
		color: var(--color-l);
		cursor: pointer;
		padding: 0.2em 0.3em;
		border-radius: 0.25em;
		font-size: 1.4em;
		display: flex;
		align-items: center;
		transition: color 0.12s ease;
		line-height: 1;
	}

	.controls button:hover {
		color: var(--color-h);
	}

	iframe {
		display: block;
	}
</style>
