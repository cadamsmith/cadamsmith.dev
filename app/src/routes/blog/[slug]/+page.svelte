<script lang="ts">
	export let data;
	const { title, date, categories, Content } = data;
</script>

<svelte:head>
	<title>My blog - {title}</title>
	<meta property="og:title" content={title} />
</svelte:head>

<article>
	<h1>{title}</h1>
	<p>Published: {date}</p>
	<svelte:component this={Content} />
</article>

{#if categories.length}
	<aside>
		<h2>Posted in:</h2>
		<ul>
			{#each categories as category}
				<li>
					<a href="/blog/category/{category}">
						{category}
					</a>
				</li>
			{/each}
		</ul>
	</aside>
{/if}
