<script lang="ts">
	import Category from './Category.svelte';

	export let categories: { name: string; count: number }[];
	$: console.log(categories);
</script>

<svelte:head>
	<title>Blog - Adam Smith</title>
</svelte:head>

<ol>
	{#each categories as { name, count }}
		<Category {name} {count} />
	{/each}
</ol>

<style>
	ol {
		list-style: none;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
		grid-gap: 1rem;
		padding-left: 0;
	}
</style>
