<script lang="ts">
	import { fade } from 'svelte/transition';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '$lib/styles/style.scss';
	import 'iconify-icon';

	export let data;

	let crazyMode = false;

	let cursor = 0;
	const KONAMI_CODE = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
	function onKeydown(e: KeyboardEvent) {
		cursor = (e.keyCode == KONAMI_CODE[cursor]) ? cursor + 1 : 0;
		if (cursor == KONAMI_CODE.length) {
			crazyMode = true;
			console.log('you found the easter egg!');
		}
	}
</script>

<Header {crazyMode} />

<div class="transition-outer">
	{#key data.currentRoute}
		<main
			in:fade={{ duration: 150, delay: 150 }}
			out:fade={{ duration: 150 }}
			class="transition-inner"
		>
			<slot />
		</main>
	{/key}
</div>
<Footer />

<style>
	.transition-outer {
		display: grid;
		grid-template: 1fr 1fr;
		flex-grow: 1;
	}

	.transition-inner {
		grid-row: 1;
		grid-column: 1;
	}
</style>

<svelte:window on:keydown|preventDefault={onKeydown} />