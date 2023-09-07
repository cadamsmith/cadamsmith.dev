<script>
	import PostGrid from '$lib/components/PostGrid.svelte';

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
	<PostGrid posts={data.posts} />
</section>
