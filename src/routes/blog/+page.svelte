<script>
	import PostGrid from '$lib/components/PostGrid.svelte';

	export let data;
</script>

<svelte:head>
	<title>Blog - Adam Smith</title>
</svelte:head>

<section class="hero full-width">
	<h1>Blog</h1>

	<p>Adam Smith's going to give this blogging thing a try and see how it goes.</p>

	<p>He provides <a href="/rss" target="_blank">an RSS feed</a> for those interested.</p>
</section>

<section>
	<PostGrid posts={data.posts} />
</section>
