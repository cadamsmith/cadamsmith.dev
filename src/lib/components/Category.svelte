<script lang="ts">
	export let name: string;
	export let count: number;
</script>

<li>
	<h2>
		<a href={`/blog/category/${name}`}>#{name}</a>
	</h2>

	<div class="body">
		<p>{count} posts</p>
	</div>
</li>

<style>
	li {
		background-color: var(--color-g);
		border: 0.1em solid black;
		display: flex;
		flex-direction: column;
	}

	h2 {
		padding-left: 0.5em;
	}

	.category-link {
		margin-right: 0.5rem;
	}

	.body {
		background-color: #fff;
		padding: 0.5em;
		flex-grow: 1;
	}
</style>
