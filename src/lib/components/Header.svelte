<script lang="ts">
	import NavBrand from './NavBrand.svelte';

	let { resources } = $props<{ resources: {[key: string]: string} }>();
</script>

<header>
	<NavBrand />

	<nav>
		<ul>
			<li>
				<a class="icon-link" href={resources["githubUrl"]} target="_blank" aria-label="GitHub">
					<iconify-icon class="iconify-icon" icon="skill-icons:github-dark"></iconify-icon>
				</a>
			</li>
			<li>
				<a class="icon-link" href={resources["linkedInUrl"]} target="_blank" aria-label="LinkedIn">
					<iconify-icon class="iconify-icon" icon="skill-icons:linkedin"></iconify-icon>
				</a>
			</li>
			<li>
				<a class="icon-link resume-link" href={resources["resumeUrl"]} target="_blank">
					<iconify-icon class="iconify-icon" inline icon="icon-park:doc-detail"></iconify-icon>
					<span>Resume</span>
				</a>
			</li>
			<li>
				<a class="icon-link email-link" href="mailto:{resources["emailAddress"]}">
					<iconify-icon class="iconify-icon" inline icon="icon-park:email-block"></iconify-icon>
					<span>Contact</span>
				</a>
			</li>
		</ul>
	</nav>
</header>

<style>
	header {
		padding: 1rem;
		background-color: var(--color-a);
		color: #fff;
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

	a:not(.icon-link) {
		text-decoration: none;
		color: inherit;
		padding: 0.5em;
		color: #fff;
		font-weight: bold;
		box-sizing: border-box;
	}

	a:not(.icon-link):hover {
		border-color: #000;
		text-decoration: underline;
		color: var(--color-h);
	}

	@media (max-width: 700px) {
		header {
			flex-direction: column;
			gap: 0.5em;
			background-color: var(--color-b);
			padding-bottom: 0;
			padding-left: 0;
			padding-right: 0;
		}

		ul {
			padding-left: 0;
		}

		nav {
			background-color: var(--color-a);
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
