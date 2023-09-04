<script lang="ts">
	import { dev } from '$app/environment';

	const inConstruction = !dev;
</script>

<svelte:head>
	<title>My blog - Adam Smith</title>
</svelte:head>

{#if inConstruction}
	<section class="construction">
		<h1>Under Construction</h1>

		<iconify-icon class="big-icon" icon="mdi:account-hard-hat" />
	</section>
{:else}
	<section class="hero">
		<h1>Portfolio</h1>

		<h2>test test test</h2>
	</section>
{/if}

<style>
	iconify-icon {
		width: 100%;
		display: flex;
		justify-content: center;
		color: #ff9e0d;
	}
</style>
