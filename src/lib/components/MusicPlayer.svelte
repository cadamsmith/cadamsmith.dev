<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { YTPlayer, YTPlayerOptions } from '../types/youtube';

	interface TrackInput {
		title: string;
		artist: string;
		embedUrl: string;
	}

	interface Track {
		title: string;
		artist: string;
		videoId: string;
	}

	const { tracks: input }: { tracks: TrackInput[] } = $props();

	let tracks = $state<Track[]>([]);
	let index = $state(0);
	let isPlaying = $state(false);
	let isReady = $state(false);
	let showPlaylist = $state(false);

	let host: HTMLDivElement;
	let root: HTMLDivElement;
	let player: YTPlayer | null = null;

	const current = $derived(tracks[index]);

	// Light-dismiss the playlist popover on outside click or Escape.
	$effect(() => {
		if (!showPlaylist) return;

		function onPointerDown(event: PointerEvent) {
			if (root && !root.contains(event.target as Node)) showPlaylist = false;
		}
		function onKeydown(event: KeyboardEvent) {
			if (event.key === 'Escape') showPlaylist = false;
		}

		document.addEventListener('pointerdown', onPointerDown);
		document.addEventListener('keydown', onKeydown);
		return () => {
			document.removeEventListener('pointerdown', onPointerDown);
			document.removeEventListener('keydown', onKeydown);
		};
	});

	onMount(() => {
		tracks = input
			.map((track) => ({ ...track, videoId: extractVideoId(track.embedUrl) }))
			.filter((track) => track.videoId.length > 0)
			.sort(() => Math.random() - 0.5);

		if (tracks.length === 0) return;

		index = Math.floor(Math.random() * tracks.length);
		loadApi();
	});

	onDestroy(() => {
		player?.destroy();
		player = null;
	});

	function extractVideoId(embedUrl: string): string {
		try {
			// embed URLs look like https://www.youtube.com/embed/VIDEO_ID?si=...
			return new URL(embedUrl).pathname.split('/').filter(Boolean).pop() ?? '';
		} catch {
			return '';
		}
	}

	function loadApi() {
		if (window.YT?.Player) {
			createPlayer();
			return;
		}

		// Chain onto any existing ready hook so multiple consumers don't clobber it.
		const previous = window.onYouTubeIframeAPIReady;
		window.onYouTubeIframeAPIReady = () => {
			previous?.();
			createPlayer();
		};

		const apiSrc = 'https://www.youtube.com/iframe_api';
		if (!document.querySelector(`script[src="${apiSrc}"]`)) {
			const tag = document.createElement('script');
			tag.src = apiSrc;
			document.head.appendChild(tag);
		}
	}

	function createPlayer() {
		if (!window.YT?.Player || !host) return;

		const options: YTPlayerOptions = {
			videoId: tracks[index].videoId,
			width: '100%',
			height: '215',
			playerVars: {
				controls: 0,
				rel: 0,
				modestbranding: 1,
				playsinline: 1
			},
			events: {
				onReady: () => {
					isReady = true;
				},
				onStateChange: (event) => {
					const state = window.YT?.PlayerState;
					if (!state) return;

					if (event.data === state.PLAYING) {
						isPlaying = true;
					} else if (event.data === state.ENDED) {
						isPlaying = false;
						nextSong(); // auto-advance to the next track
					} else {
						isPlaying = false;
					}
				}
			}
		};

		player = new window.YT.Player(host, options);
	}

	function onVideoClick() {
		// A click on the video dismisses the playlist first, otherwise toggles playback.
		if (showPlaylist) {
			showPlaylist = false;
			return;
		}
		togglePlay();
	}

	function togglePlay() {
		if (!player) return;
		if (isPlaying) player.pauseVideo();
		else player.playVideo();
	}

	function playIndex(next: number) {
		index = next;
		player?.loadVideoById(tracks[index].videoId);
	}

	function nextSong() {
		playIndex((index + 1) % tracks.length);
	}

	function previousSong() {
		playIndex((index - 1 + tracks.length) % tracks.length);
	}

	function selectTrack(i: number) {
		playIndex(i);
		showPlaylist = false;
	}
</script>

<div class="player" class:playing={isPlaying} bind:this={root}>
	<div class="header">
		<div class="controls">
			<span
				class="now-playing"
				title={current ? `${current.title} — ${current.artist}` : ''}
			>
				{#if isPlaying}
					<span class="equalizer" aria-hidden="true">
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</span>
				{:else}
					<iconify-icon icon="mdi:music-note"></iconify-icon>
				{/if}
				<span class="now-playing-label">{current?.title ?? 'now playing'}</span>
			</span>

			<div class="transport">
				<button
					onclick={() => (showPlaylist = !showPlaylist)}
					disabled={!isReady}
					aria-label="Track list"
					aria-expanded={showPlaylist}
					class:active={showPlaylist}
				>
					<iconify-icon icon="mdi:playlist-music"></iconify-icon>
				</button>
				<button onclick={previousSong} disabled={!isReady} aria-label="Previous Song">
					<iconify-icon icon="mdi:skip-previous"></iconify-icon>
				</button>
				<button
					onclick={togglePlay}
					disabled={!isReady}
					aria-label={isPlaying ? 'Pause' : 'Play'}
				>
					<iconify-icon icon={isPlaying ? 'mdi:pause' : 'mdi:play'}></iconify-icon>
				</button>
				<button onclick={nextSong} disabled={!isReady} aria-label="Next Song">
					<iconify-icon icon="mdi:skip-next"></iconify-icon>
				</button>
			</div>
		</div>

		{#if showPlaylist}
			<ul class="playlist" role="listbox" aria-label="Tracks">
				{#each tracks as track, i (track.videoId)}
					<li>
						<button
							class="track"
							class:active={i === index}
							role="option"
							aria-selected={i === index}
							onclick={() => selectTrack(i)}
						>
							{#if i === index && isPlaying}
								<span class="equalizer small" aria-hidden="true">
									<span></span>
									<span></span>
									<span></span>
									<span></span>
								</span>
							{:else}
								<iconify-icon
									class="track-icon"
									icon={i === index ? 'mdi:play' : 'mdi:music-note'}
								></iconify-icon>
							{/if}
							<span class="track-text">
								<span class="track-title">{track.title}</span>
								<span class="track-artist">{track.artist}</span>
							</span>
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	<div class="video">
		<!-- Replaced in place by the YouTube iframe once the API is ready. -->
		<div bind:this={host}></div>
		<!-- Transparent layer intercepts clicks (blocking native controls) and
		     drives our own play/pause instead. -->
		<button
			class="click-block"
			aria-label={isPlaying ? 'Pause' : 'Play'}
			onclick={onVideoClick}
		></button>
	</div>
</div>

<style>
	.player {
		border: 1px solid var(--color-border);
		border-radius: 0.5em;
		overflow: hidden;
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
		transition:
			border-color 0.4s ease,
			box-shadow 0.4s ease;
	}

	.player.playing {
		border-color: var(--color-c);
		animation: pulse-glow 2.4s ease-in-out infinite;
	}

	@keyframes pulse-glow {
		0%,
		100% {
			box-shadow:
				0 12px 40px rgba(0, 0, 0, 0.5),
				0 0 0 rgba(64, 184, 240, 0.35);
		}
		50% {
			box-shadow:
				0 12px 40px rgba(0, 0, 0, 0.5),
				0 0 22px rgba(64, 184, 240, 0.35);
		}
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
		gap: 0.4em;
		flex: 1;
		min-width: 0;
		font-size: 0.7em;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-c);
		font-family: 'JetBrains Mono', monospace;
	}

	.now-playing-label {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.transport {
		display: flex;
		align-items: center;
		gap: 0.1em;
		flex-shrink: 0;
	}

	.transport button.active {
		color: var(--color-h);
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

	.controls button:hover:not(:disabled) {
		color: var(--color-h);
	}

	.controls button:disabled {
		opacity: 0.4;
		cursor: default;
	}

	.header {
		position: relative;
		z-index: 2;
	}

	.playlist {
		position: absolute;
		top: calc(100% + 0.35rem);
		right: 0.5rem;
		width: min(20rem, calc(100% - 1rem));
		z-index: 10;
		list-style: none;
		margin: 0;
		padding: 0.25rem;
		max-height: 200px;
		overflow-y: auto;
		background-color: var(--color-i);
		border: 1px solid var(--color-border);
		border-radius: 0.5em;
		box-shadow: 0 12px 30px rgba(0, 0, 0, 0.55);
	}

	.track {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 0.6em;
		padding: 0.4rem 0.5rem;
		background: none;
		border: none;
		border-radius: 0.25em;
		color: var(--color-l);
		cursor: pointer;
		text-align: left;
		transition: background-color 0.12s ease;
	}

	.track:hover {
		background-color: var(--color-j);
	}

	.track.active {
		background-color: var(--color-j);
	}

	.track.active .track-title {
		color: var(--color-c);
	}

	.track-icon {
		flex-shrink: 0;
		font-size: 1em;
		color: var(--color-muted);
	}

	.track.active .track-icon {
		color: var(--color-c);
	}

	.track-text {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}

	.track-title {
		font-size: 0.85em;
		font-weight: 600;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.track-artist {
		font-size: 0.72em;
		color: var(--color-muted);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.video {
		position: relative;
		line-height: 0;
	}

	.video :global(iframe) {
		display: block;
	}

	.click-block {
		position: absolute;
		inset: 0;
		z-index: 1;
		padding: 0;
		border: none;
		background: none;
		cursor: pointer;
	}

	.equalizer {
		display: inline-flex;
		align-items: flex-end;
		gap: 2px;
		height: 1em;
		width: 1.1em;
	}

	.equalizer.small {
		flex-shrink: 0;
		height: 0.9em;
		width: 1em;
		color: var(--color-c);
	}

	.equalizer.small span {
		background-color: var(--color-c);
	}

	.equalizer span {
		flex: 1;
		background-color: var(--color-h);
		border-radius: 1px;
		transform-origin: bottom;
		animation: bounce 0.9s ease-in-out infinite;
	}

	.equalizer span:nth-child(1) {
		animation-delay: -0.6s;
	}

	.equalizer span:nth-child(2) {
		animation-delay: -0.2s;
	}

	.equalizer span:nth-child(3) {
		animation-delay: -0.45s;
	}

	.equalizer span:nth-child(4) {
		animation-delay: -0.1s;
	}

	@keyframes bounce {
		0%,
		100% {
			height: 25%;
		}
		50% {
			height: 100%;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.player.playing {
			animation: none;
		}

		.equalizer span {
			animation: none;
			height: 60%;
		}
	}
</style>
