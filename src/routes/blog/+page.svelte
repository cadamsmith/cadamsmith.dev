<script>
	export let data;
</script>

<svelte:head>
	<title>Blog - Adam Smith</title>
</svelte:head>

<h1>Blog</h1>

<ol>
	{#each data.posts as post}
		<li>
			<h2>
				<a href={post.path}>
					{post.meta.title}
				</a>
			</h2>
			<p>Published: {post.meta.date}</p>

			{#each post.meta.categories as category}
				<a href={`blog/category/${category}`} class="category-link">
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
