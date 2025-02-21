<script>
	import SkillsWidget from '$lib/components/SkillsWidget.svelte';
	import TerminalWidget from '$lib/components/TerminalWidget.svelte';

	const cwsWebsiteUrl = 'https://cws.auburn.edu/cws';

	let { data } = $props();
</script>

<svelte:head>
	<title>Adam Smith</title>
</svelte:head>

<section class="hero full-width">
	<div class="hero-content">
		<h1>Adam Smith</h1>
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
	</div>

	<div class="terminal-wrapper">
		<TerminalWidget />
	</div>
</section>

<section>
	<h2>Skills</h2>

	<SkillsWidget skills={data.skills} />
</section>

<style>
	h1 {
		font-size: 2.2em;
		margin-top: 1rem;
	}

	.hero {
		background-color: var(--color-e);
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: 1fr;
		column-gap: 2em;
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