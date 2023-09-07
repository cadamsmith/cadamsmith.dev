<script lang="ts">
	import type { Post as PostType } from '$lib/types/Post';
	import Post from './Post.svelte';

	export let posts: PostType[];
</script>

<svelte:head>
	<title>Blog - Adam Smith</title>
</svelte:head>

<ol>
	{#each posts as post}
		<Post {post} />
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
