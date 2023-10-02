<script lang="ts">
	const currentYear = new Date().getFullYear();

	const deploySha = import.meta.env.VITE_DEPLOY_COMMIT_SHA;
	const deployBranch = import.meta.env.VITE_DEPLOY_COMMIT_BRANCH;
</script>

<footer>
	<p>
		@ {currentYear} Adam Smith. Powered by
		<a class="icon-link sveltekit-link" href="https://kit.svelte.dev/" target="_blank">
			<iconify-icon inline icon="skill-icons:svelte" />
			<span>Sveltekit</span>
		</a>.
	</p>
	<div>
		{#if deploySha && deployBranch}
			<a
				class="deploy-info-link"
				href="https://github.com/cadamsmith/cadamsmith.dev/commit/{deploySha}"
				target="_blank"
			>
				{deployBranch} @ {deploySha.slice(0, 7)}
			</a>
		{/if}

		<a class="icon-link" href="https://github.com/cadamsmith/cadamsmith.dev" target="_blank">
			<iconify-icon inline icon="skill-icons:github-dark" />
			Source Code
		</a>
	</div>
</footer>

<style>
	footer {
		margin-top: 1rem;
		padding: 1rem;
		background-image: linear-gradient(to right, var(--color-a), var(--color-b));
		color: white;
		display: flex;
		justify-content: space-between;
		gap: 0.5em;
	}

	.icon-link {
		--border-color: var(--color-h);
	}

	p {
		margin: 0;
	}

	.deploy-info-link {
		color: white;
	}

	@media (max-width: 700px) {
		footer {
			background-image: linear-gradient(to right, var(--color-a), var(--color-a));
			text-align: center;
			flex-direction: column;
			padding: 1rem 0 0 0;
			gap: 0;
		}

		p {
			margin-bottom: 0.75em;
		}

		div {
			background-color: var(--color-b);
			padding: 0.75em 1em 1em 1em;
		}
	}
</style>
