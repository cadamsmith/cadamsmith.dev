<script lang="ts">
	import { dev } from '$app/environment';

	const inConstruction = !dev;
</script>

<svelte:head>
	<title>My blog - Adam Smith</title>
</svelte:head>

{#if inConstruction}
	test
{:else}
	<section class="hero">
		<h1>Portfolio</h1>

		<h2>test test test</h2>
	</section>
{/if}
