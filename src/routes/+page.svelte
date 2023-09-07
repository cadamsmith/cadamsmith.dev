<script>
	import Terminal from '$lib/components/Terminal.svelte';
</script>

<svelte:head>
	<title>Adam Smith</title>
</svelte:head>

<section class="hero full-width">
	<div>
		<h1>Hello there, I'm Adam.</h1>
		<p>
			I'm a software engineer. I'm currently working as a technical lead for
			<a href="https://cws.auburn.edu/cws" target="_blank">Campus Web Solutions</a> at Auburn University.
		</p>

		<p>
			My technology area at work is ASP.NET full-stack web development, but most of my job is
			mentoring developers and helping them learn.
		</p>

		<p>
			I also do a lot of internal tooling and automation. I'm a big fan of GitHub Actions and Azure
			DevOps.
		</p>

		<div class="hero-links">
			<a href="/resume.pdf" target="_blank">Resume</a>

			<div>
				<a href="https://github.com/cadamsmith" target="_blank">GitHub</a>
				<a href="https://linkedin.com/in/cadamsmithdev" target="_blank">LinkedIn</a>
			</div>
		</div>
	</div>

	<div class="terminal-wrapper">
		<Terminal />
	</div>
</section>

<section>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
</section>

<style>
	h1 {
		font-size: 2.2em;
	}

	.hero {
		background-color: var(--color-e);
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: 1fr;
		column-gap: 1em;
	}

	.hero-links {
		display: flex;
		justify-content: space-between;
		gap: 1em;
	}

	.terminal-wrapper {
		display: flex;
		flex-direction: column;
		height: auto;
	}

	@media (max-width: 800px) {
		.hero {
			grid-template-columns: 1fr;
		}

		.terminal-wrapper {
			display: none;
		}
	}
</style>
