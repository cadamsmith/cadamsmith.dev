<script lang="ts">
	const currentYear = new Date().getFullYear();
</script>

<footer>
	<p>
		@ {currentYear} Adam Smith. Generated with
		<a href="https://kit.svelte.dev/" target="_blank">Sveltekit</a>.
	</p>
	<div>
		<a href="https://github.com/cadamsmith/cadamsmith.dev" target="_blank">
			View Source Code
			<img src="/images/github-mark-white.svg" alt="test" />
		</a>
	</div>
</footer>

<style>
	footer {
		padding: 1rem;
		background-image: linear-gradient(to right, #352e48, #584c77);
		color: white;
		display: flex;
		justify-content: space-between;
		gap: 0.5em;
	}

	p {
		margin: 0;
	}

	a {
		color: white;

		& img {
			height: 1em;
			margin-left: 0.2em;
		}
	}

	@media (max-width: 600px) {
		footer {
			background-image: linear-gradient(to right, #584c77, #584c77);
			text-align: center;
			flex-direction: column;
			padding: 1rem 0 0 0;
		}

		div {
			background-color: #352e48;
			padding: 1rem;
		}
	}
</style>
