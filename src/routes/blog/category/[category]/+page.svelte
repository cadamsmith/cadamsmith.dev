<script lang="ts">
	import PostGrid from '$lib/components/PostGrid.svelte';

	export let data;
</script>

<svelte:head>
	<title>Blog - Adam Smith</title>
</svelte:head>

<section class="hero full-width">
	<h1>Posts with Category: {data.category}</h1>

	<a href="/blog/category">See all categories</a>
</section>

<section>
	<PostGrid posts={data.posts} />
</section>
