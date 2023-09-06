<script lang="ts">
	import type { Post } from '$lib/types/Post';

	export let posts: Post[];

	function formatPostDate(date: any) {
		date = new Date(date);

		const month = date.toLocaleString('default', { month: 'short' });
		const yearLink = `<a href="/blog/year/${date.getFullYear()}">${date.getFullYear()}</a>`;
		return `${month} ${date.getDate()}, ${yearLink}`;
	}
</script>

<svelte:head>
	<title>Blog - Adam Smith</title>
</svelte:head>

<ol>
	{#each posts as post}
		<li>
			<h2>
				<a href={post.path}>
					{post.meta.title}
				</a>
			</h2>
			<p>Published: {@html formatPostDate(post.meta.date)}</p>

			{#each post.meta.categories as category}
				<a href={`/blog/category/${category}`} class="category-link">
					{category}
				</a>
			{/each}
		</li>
	{/each}
</ol>

<style>
	ol {
		list-style: none;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
		grid-gap: 1rem;
	}

	li {
		padding: 0.5em;
	}

	.category-link {
		margin-right: 0.5rem;
	}
</style>
