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
	<div class="hero-top">
		<div class="hero-content">
			<h1>Adam Smith</h1>
	
			<div class="hero-info-tag-list">
				<span class="hero-info-tag">Software Engineer</span>
				<span class="hero-info-tag">Auburn, AL</span>
				<span class="hero-info-tag">Full-Stack Web Developer</span>
				<span class="hero-info-tag">3 Years Work Experience</span>
				<span class="hero-info-tag">Team Player</span>
				<span class="hero-info-tag">Code Quality Enthusiast</span>
				<span class="hero-info-tag">Life-Long Learner</span>
			</div>
	
			<p>
				During my undergrad at Auburn University, I worked as a co-op developer at <a href={cwsWebsiteUrl} target="_blank">Campus Web Solutions</a>.
				I was hired to the full-time staff after graduation and have been working there since.
			</p>
	
			<p>
				I am most confident with .NET full-stack web development, but I am a fast learner
				and can pick up new skills quickly.
			</p>
		</div>
	
		<div class="terminal-wrapper">
			<TerminalWidget />
		</div>
	</div>

	<p>
		In addition to development, I enjoy working on internal tooling, automating development processes,
		and debugging production problems.
		I'm a big fan of code reviewing and improving code quality.
	</p>

	<p>
		I write documentation and train new developers.
		I am a reliable hard worker and team player.
	</p>
</section>

<section>
	<h2>Technologies</h2>

	<SkillsWidget skills={data.skills} />
</section>

<style>
	h1 {
		font-size: 2.2em;
		margin-top: 1rem;
		margin-bottom: .6rem;
	}

	.hero {
		background-color: var(--color-e);
	}

	.hero-top {
		display: grid;
		grid-template-columns: 1.1fr .9fr;
		grid-template-rows: 1fr;
		column-gap: 2em;
	}

	.terminal-wrapper {
		display: flex;
		flex-direction: column;
		height: auto;
	}

	@media (max-width: 800px) {
		.hero-top {
			grid-template-columns: 1fr;
		}

		.terminal-wrapper {
			display: none;
		}
	}

	.hero-info-tag-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3em;
	}

	.hero-info-tag {
		background-color: var(--color-a);
		color: #fff;
		padding: 0.2em 0.5em;
		border-radius: 0.2em;
	}
</style>
