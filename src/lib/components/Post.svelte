<script lang="ts">
	import type { Post } from '$lib/types/Post';

	export let post: Post;

	function formatPostDate(date: any) {
		date = new Date(date);

		const month = date.toLocaleString('default', { month: 'short' });
		const yearLink = `<a href="/blog/year/${date.getFullYear()}">${date.getFullYear()}</a>`;
		return `${month} ${date.getDate()}, ${yearLink}`;
	}
</script>

<li>
	<h2>
		<a href={post.path}>
			{post.meta.title}
		</a>
	</h2>

	<div class="post-body">
		<p>Published: {@html formatPostDate(post.meta.date)}</p>

		{#each post.meta.categories as category}
			<a href={`/blog/category/${category}`} class="category-link">
				{category}
			</a>
		{/each}
	</div>
</li>

<style>
	li {
		background-color: var(--color-g);
		border: 0.1em solid black;
	}

	h2 {
		padding-left: 0.5em;
	}

	.category-link {
		margin-right: 0.5rem;
	}

	.post-body {
		background-color: #fff;
		padding: 0.5em;
	}
</style>
