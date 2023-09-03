<script lang="ts">
	const currentYear = new Date().getFullYear();
</script>

<footer>
	<p>
		@ {currentYear} Adam Smith. Generated with
		<a class="sveltekit-link" href="https://kit.svelte.dev/" target="_blank">
			<span class="sr-only">Sveltekit</span>
			<iconify-icon icon="logos:svelte-kit" />
		</a>.
	</p>
	<div>
		<a href="https://github.com/cadamsmith/cadamsmith.dev" target="_blank">
			View Source Code
			<iconify-icon icon="mdi:github" />
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
		text-decoration: none;
	}

	.sveltekit-link {
		background-color: white;
		color: black;
		padding: 0.1em;
		margin-right: 0.2em;
		border-radius: 2em;
		border: 0.2em solid white;

		& iconify-icon {
			vertical-align: middle;
			height: 100%;
		}
	}

	.sveltekit-link:hover {
		border-color: #3da5d9;
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
