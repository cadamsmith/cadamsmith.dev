<script lang="ts">
	import { fade } from 'svelte/transition';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '$lib/styles/global.scss';
	import 'iconify-icon';

	let { data, children } = $props();
</script>

<Header resources={data.resources} />

<div class="transition-outer">
	{#key data.currentRoute}
		<main
			in:fade={{ duration: 150, delay: 150 }}
			out:fade={{ duration: 150 }}
			class="transition-inner"
		>
			{@render children()}

			<div class="content-spacer"></div>
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
