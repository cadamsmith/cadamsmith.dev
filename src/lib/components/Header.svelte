<script lang="ts">
	import NavBrand from "./NavBrand.svelte";

	export let crazyMode: boolean;
</script>

<header>
	<NavBrand {crazyMode} />

	<nav>
		<ul>
			<li>
				<a href="/blog">Blog</a>
			</li>
			❖
			<li>
				<a href="/portfolio">Portfolio</a>
			</li>
		</ul>
	</nav>
</header>

<style>
	header {
		padding: 1rem;
		background-image: linear-gradient(to right, var(--color-a), var(--color-b));
		color: white;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
		overflow-x: hidden;
	}

	ul {
		margin: 0;
		list-style-type: none;
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	a {
		text-decoration: none;
		color: inherit;
		padding: 0.5em;
		color: #fff;
		font-weight: bold;
		box-sizing: border-box;
	}

	a:hover {
		border-color: #000;
		text-decoration: underline;
		color: #3da5d9;
	}

	@media (max-width: 700px) {
		header {
			flex-direction: column;
			gap: 0.5em;
			background-image: linear-gradient(to right, #352e48, #352e48);
			padding-bottom: 0;
			padding-left: 0;
			padding-right: 0;
		}

		ul {
			padding-left: 0;
		}

		nav {
			background-color: #584c77;
			width: 100%;
			display: flex;
			justify-content: center;
			padding: 1rem;

			overflow: hidden;
			width: max-content;
			align-self: flex-start;
			justify-content: center;
			width: 100%;
		}
	}
</style>
