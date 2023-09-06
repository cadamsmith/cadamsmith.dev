<script>
	import PostGrid from '$lib/components/PostGrid.svelte';

	export let data;
</script>

<svelte:head>
	<title>Blog - Adam Smith</title>
</svelte:head>

<section>
	<h1>Blog</h1>

	<PostGrid posts={data.posts} />
</section>
