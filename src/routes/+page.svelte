<script>
	import Terminal from '$lib/components/Terminal.svelte';

	const linkedInUrl = 'https://linkedin.com/in/cadamsmithdev';
	const githubUrl = 'https://github.com/cadamsmith';
	const cwsWebsiteUrl = 'https://cws.auburn.edu/cws';
	const emailAddress = 'cadamsmith.dev@gmail.com';
</script>

<svelte:head>
	<title>Adam Smith</title>
</svelte:head>

<section class="hero full-width">
	<div class="hero-content">
		<h1>Hello there, I'm Adam.</h1>
		<p>
			I'm a software engineer. I'm currently working as a technical lead for
			<a href={cwsWebsiteUrl} target="_blank">Campus Web Solutions</a> at Auburn University.
		</p>

		<p>
			My technology area at work is ASP.NET full-stack web development, but most of my job is
			mentoring developers and helping them learn.
		</p>

		<p>
			I enjoy working on internal tooling, automating stuff, and making things easier. I find joy in
			debugging and solving problems. I'm a big fan of code reviewing and improving code quality.
		</p>

		<div class="hero-links">
			<div class="hero-links-left">
				<a href="mailto:{emailAddress}">Email me!</a>
				<a href="/resume.pdf" target="_blank">Resume</a>
			</div>

			<div class="hero-links-right">
				<a class="icon-link" href={githubUrl} target="_blank" aria-label="GitHub">
					<iconify-icon icon="skill-icons:github-dark" />
				</a>
				<a class="icon-link" href={linkedInUrl} target="_blank" aria-label="LinkedIn">
					<iconify-icon icon="skill-icons:linkedin" />
				</a>
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

	.hero-content {
		padding-left: 1em;
	}

	.hero-links {
		display: flex;
		justify-content: space-between;
		gap: 1em;

		& .hero-links-left {
			height: min-content;
			align-self: flex-end;

			display: flex;
			gap: 1em;
		}
	}

	.terminal-wrapper {
		display: flex;
		flex-direction: column;
		height: auto;
	}

	.icon-link {
		--border-color: var(--color-c);
		font-size: 1.5em;
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
