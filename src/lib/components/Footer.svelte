<script lang="ts">
	const deploySha = import.meta.env.VITE_DEPLOY_COMMIT_SHA;
	const deployBranch = import.meta.env.VITE_DEPLOY_COMMIT_BRANCH;

	const appVersion = import.meta.env.VITE_APP_VERSION;

	const githubUrl = 'https://github.com/cadamsmith/cadamsmith.dev';
</script>

<footer>
	<div class="info">
		<span>
			Powered by
			<a class="icon-link sveltekit-link" href="https://kit.svelte.dev/" target="_blank">
				<iconify-icon class="iconify-icon" inline icon="skill-icons:svelte"></iconify-icon>
				<span>SvelteKit</span>
			</a>
		</span>
		<span>
			on
			<a class="icon-link cloudflare-link" href="https://pages.cloudflare.com/" target="_blank">
				<iconify-icon class="iconify-icon" inline icon="skill-icons:cloudflare-dark"></iconify-icon>
				<span>Cloudflare Pages</span>
			</a>
		</span>
	</div>

	<div class="source-info">
		<div class="versioning-info">
			{#if deploySha && deployBranch}
				<a class="deploy-info-link" href="{githubUrl}/commit/{deploySha}" target="_blank">
					{deployBranch} @ {deploySha.slice(0, 7)}
				</a>
			{:else}
				<span>LOCAL</span>
			{/if}

			<a href="{githubUrl}/releases/tag/v{appVersion}" target="_blank">
				<strong>v{appVersion}</strong>
			</a>
		</div>

		<a class="icon-link" href={githubUrl} target="_blank">
			<iconify-icon class="iconify-icon" inline icon="skill-icons:github-dark"></iconify-icon>
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
		overflow-x: hidden;
	}

	.icon-link {
		--border-color: var(--color-h);
		display: inline-block;
	}

	a:not(.icon-link) {
		color: white;
	}

	.info,
	.source-info {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		row-gap: .5em;
	}

	.source-info {
		gap: 1em;
	}

	.versioning-info {
		display: flex;
		flex-direction: column;
		gap: 0.25em;
		font-size: 0.8em;

		align-items: flex-end;
	}

	.info {
		margin: 0;
		justify-content: center;
	}

	@media (max-width: 700px) {
		footer {
			background-image: linear-gradient(to right, var(--color-a), var(--color-a));
			text-align: center;
			flex-direction: column;
			padding: 1rem 0 0 0;
			gap: 0;
		}

		.info {
			margin-bottom: 0.75em;
			padding-left: 1em;
			padding-right: 1em;
		}

		.source-info {
			background-color: var(--color-b);
			padding: 0.75em 1em 1em 1em;
		}

		.versioning-info {
			align-items: flex-start;
		}

		.source-info {
			justify-content: space-between;
		}
	}
</style>
