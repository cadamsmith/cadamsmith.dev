<script lang="ts">
	import { onMount } from 'svelte';

	import SkillsWidget from '$lib/components/SkillsWidget.svelte';
	import TerminalWidget from '$lib/components/TerminalWidget.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import ProjectShowcase from '$lib/components/ProjectShowcase.svelte';

	const cwsWebsiteUrl = 'https://cws.auburn.edu/cws';

	// get years of work experience in 0.5 year increments
	const now = new Date();
	const startDate = new Date(2023, 0, 1); // January 1, 2023
	const monthsDiff =
		(now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
	const yearsOfWorkExperience = Math.floor(monthsDiff / 6) / 2 + 1; // Round to nearest 0.5

	let LocationMap: any = $state(null);

	onMount(async () => {
		// Dynamically import LocationMap only in the browser
		LocationMap = (await import('$lib/components/LocationMap.svelte')).default;
	});

	let { data } = $props();
</script>

<svelte:head>
	<title>Adam Smith</title>
</svelte:head>

<section class="hero bg-color full-width">
	<h1>Adam Smith</h1>

	<div class="hero-info-tag-list">
		<span class="hero-info-tag">
			<iconify-icon class="iconify-icon" icon="mdi:build"></iconify-icon>
			<span class="hero-info-tag-text">Software Engineer</span>
		</span>
		<span class="hero-info-tag">
			<iconify-icon class="iconify-icon" icon="mdi:location"></iconify-icon>
			<span class="hero-info-tag-text">Auburn, AL</span>
		</span>
		<span class="hero-info-tag">
			<iconify-icon class="iconify-icon" icon="mdi:code-braces"></iconify-icon>
			<span class="hero-info-tag-text">Full-Stack Web Developer</span>
		</span>
		<span class="hero-info-tag">
			<iconify-icon class="iconify-icon" icon="mdi:clock"></iconify-icon>
			<span class="hero-info-tag-text">{yearsOfWorkExperience} Years Work Experience</span>
		</span>
		<span class="hero-info-tag">
			<iconify-icon class="iconify-icon" icon="mdi:people"></iconify-icon>
			<span class="hero-info-tag-text">Team Player</span>
		</span>
		<span class="hero-info-tag">
			<iconify-icon class="iconify-icon" icon="mdi:check-bold"></iconify-icon>
			<span class="hero-info-tag-text">Code Quality Enthusiast</span>
		</span>
		<span class="hero-info-tag">
			<iconify-icon class="iconify-icon" icon="mdi:school"></iconify-icon>
			<span class="hero-info-tag-text">Life-Long Learner</span>
		</span>
	</div>

	<div class="hero-split">
		<div class="hero-content">
			<p>
				During my undergrad at Auburn University, I worked as a co-op developer at <a
					href={cwsWebsiteUrl}
					target="_blank">Campus Web Solutions</a
				>. I was hired to the full-time staff after graduation and have been working there since.
			</p>

			<p>
				I am most confident with .NET full-stack web development, but I am a fast learner and can
				pick up new skills quickly.
			</p>

			<p>
				In addition to development, I enjoy working on internal tooling, automating development
				processes, and debugging production problems. I'm a big fan of code reviewing and improving
				code quality.
			</p>

			<p>
				I write documentation and train new developers. I am a reliable hard worker and team player.
			</p>
		</div>

		<div class="terminal-wrapper">
			<TerminalWidget />
		</div>
	</div>
</section>

<section>
	<h2>Career</h2>

	<h3>Technologies</h3>

	<SkillsWidget skills={data.skills} />

	<h3>Experience</h3>

	<div class="journey-split">
		<div class="map-wrapper">
			{#if LocationMap}
				<LocationMap />
			{/if}
		</div>
		<div class="journey-content">
			<Timeline timeline={data.timeline} />
		</div>
	</div>
</section>

<section class="bg-color">
	<h2>Projects</h2>

	{#each data.projects as project}
		<ProjectShowcase project={project} />
	{/each}
</section>

<section>
	<div class="contact-split">
		<div class="left">
			<h2>Contact Me</h2>

			<p>I'm open to new opportunities! Reach out to me if you'd like to connect.</p>

			<div class="contact-links">
				<a href="mailto:cadamsmith.dev@gmail.com">
					<iconify-icon class="iconify-icon" icon="mdi:email"></iconify-icon>
					Email
				</a>
				<a
					href="https://drive.google.com/file/d/1J1hP-a2mQrQiw9494O5273dMo3JGmtMK/view?usp=sharing"
					target="_blank"
				>
					<iconify-icon class="iconify-icon" icon="mdi:file-pdf"></iconify-icon>
					Resume
				</a>
				<a href="https://www.linkedin.com/in/adam-smith-auburn/" target="_blank">
					<iconify-icon class="iconify-icon" icon="mdi:linkedin"></iconify-icon>
					LinkedIn
				</a>
				<a href="https://github.com/cadamsmith" target="_blank">
					<iconify-icon class="iconify-icon" icon="mdi:github"></iconify-icon>
					GitHub
				</a>
			</div>

			<p>Thanks for visiting my site!</p>
		</div>
		<div class="right">
			<iframe
				width="344"
				height="210"
				src="https://www.youtube.com/embed/videoseries?si=Bj5MQ5Jhzk0TRKtJ&amp;list=PLOnKIDPOvtO2Nz8G2Qsz6VYafKAzvD0xD"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
			>
			</iframe>
		</div>
	</div>
</section>

<style>
	h1 {
		font-size: 2.2em;
		margin-top: 1rem;
		margin-bottom: 0.6rem;
	}

	section.bg-color {
		background-color: var(--color-e);
	}

	.hero-split {
		display: grid;
		grid-template-columns: 1.1fr 0.9fr;
		grid-template-rows: 1fr;
		column-gap: 2em;
	}

	.terminal-wrapper {
		display: flex;
		flex-direction: column;
		height: auto;
	}

	@media (max-width: 800px) {
		.hero-split {
			grid-template-columns: 1fr;
		}

		.terminal-wrapper {
			display: none;
		}

		.map-wrapper {
			display: none;
		}

		.contact-split .right {
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

		display: flex;
		align-items: center;
		gap: 0.2em;
		vertical-align: middle;
	}

	.journey-split {
		display: flex;
		gap: 2em;
	}

	.map-wrapper {
		width: 18rem;
		height: 15rem;
	}

	.journey-content {
		flex-grow: 1;
	}

	.contact-links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3em;
		margin-bottom: 1rem;
	}

	.contact-links > a {
		background-color: var(--color-c);
		color: #fff;
		padding: 0.2em 0.5em;
		border-radius: 0.2em;

		display: flex;
		align-items: center;
		gap: 0.2em;
		vertical-align: middle;
	}

	.contact-links > a:hover {
		background-color: #000;
	}

	.contact-split {
		display: flex;
		gap: 2em;
		justify-content: space-between;
	}

	.contact-split .right {
		margin-top: 1rem;
	}
</style>
