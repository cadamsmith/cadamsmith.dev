<script>
	import CategoryGrid from '$lib/components/CategoryGrid.svelte';

	export let data;
</script>

<svelte:head>
	<title>Blog - Adam Smith</title>
</svelte:head>

<section class="hero full-width">
	<h1>Blog</h1>

	<p>Adam Smith writes about programming, mathematics, and other topics he is actively learning.</p>

	<p>He provides <a href="/rss" target="_blank">an RSS feed</a> for those interested.</p>
</section>

<section>
	<CategoryGrid categories={data.categories} />
</section>
