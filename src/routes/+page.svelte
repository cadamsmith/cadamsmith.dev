<script lang="ts">
	import { onMount } from 'svelte';

	import SkillsWidget from '$lib/components/SkillsWidget.svelte';
	import TerminalWidget from '$lib/components/TerminalWidget.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import MusicPlayer from '$lib/components/MusicPlayer.svelte';

	const cwsWebsiteUrl = 'https://cws.auburn.edu/cws';

	// get years of work experience in 0.5 year increments
	const now = new Date();
	const startDate = new Date(2023, 0, 1); // January 1, 2023
	const monthsDiff =
		(now.getFullYear() - startDate.getFullYear()) * 12 +
		(now.getMonth() - startDate.getMonth());

	// Round to nearest 0.5
	const yearsOfWorkExperience = Math.floor(monthsDiff / 6) / 2 + 1;

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
			<svg
				class="iconify-icon"
				xmlns="http://www.w3.org/2000/svg"
				width="1em"
				height="1em"
				viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="m22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9c-2-2-5-2.4-7.4-1.3L9 6L6 9L1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4"
				/></svg
			>
			<span class="hero-info-tag-text">Software Engineer</span>
		</span>
		<span class="hero-info-tag">
			<svg
				class="iconify-icon"
				xmlns="http://www.w3.org/2000/svg"
				width="1em"
				height="1em"
				viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"
				/></svg
			>
			<span class="hero-info-tag-text">Auburn, AL</span>
		</span>
		<span class="hero-info-tag">
			<svg
				class="iconify-icon"
				xmlns="http://www.w3.org/2000/svg"
				width="1em"
				height="1em"
				viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="M8 3a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2H3v2h1a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h2v-2H8v-5a2 2 0 0 0-2-2a2 2 0 0 0 2-2V5h2V3m6 0a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1v2h-1a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-2v-2h2v-5a2 2 0 0 1 2-2a2 2 0 0 1-2-2V5h-2V3z"
				/></svg
			>
			<span class="hero-info-tag-text">Full-Stack Web Developer</span>
		</span>
		<span class="hero-info-tag">
			<svg
				class="iconify-icon"
				xmlns="http://www.w3.org/2000/svg"
				width="1em"
				height="1em"
				viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m4.2 14.2L11 13V7h1.5v5.2l4.5 2.7z"
				/></svg
			>
			<span class="hero-info-tag-text">{yearsOfWorkExperience} Years Work Experience</span
			>
		</span>
		<span class="hero-info-tag">
			<svg
				class="iconify-icon"
				xmlns="http://www.w3.org/2000/svg"
				width="1em"
				height="1em"
				viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="M16 17v2H2v-2s0-4 7-4s7 4 7 4m-3.5-9.5A3.5 3.5 0 1 0 9 11a3.5 3.5 0 0 0 3.5-3.5m3.44 5.5A5.32 5.32 0 0 1 18 17v2h4v-2s0-3.63-6.06-4M15 4a3.4 3.4 0 0 0-1.93.59a5 5 0 0 1 0 5.82A3.4 3.4 0 0 0 15 11a3.5 3.5 0 0 0 0-7"
				/></svg
			>
			<span class="hero-info-tag-text">Team Player</span>
		</span>
		<span class="hero-info-tag">
			<svg
				class="iconify-icon"
				xmlns="http://www.w3.org/2000/svg"
				width="1em"
				height="1em"
				viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="m9 20.42l-6.21-6.21l2.83-2.83L9 14.77l9.88-9.89l2.83 2.83z"
				/></svg
			>
			<span class="hero-info-tag-text">Code Quality Enthusiast</span>
		</span>
		<span class="hero-info-tag">
			<svg
				class="iconify-icon"
				xmlns="http://www.w3.org/2000/svg"
				width="1em"
				height="1em"
				viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="M12 3L1 9l11 6l9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17z"
				/></svg
			>
			<span class="hero-info-tag-text">Life-Long Learner</span>
		</span>
	</div>

	<div class="hero-split">
		<div class="hero-content">
			<p>
				During my undergrad at Auburn University, I worked as a co-op developer at <a
					href={cwsWebsiteUrl}
					target="_blank">Campus Web Solutions</a
				>. I was hired to the full-time staff after graduation and have been working there
				since.
			</p>

			<p>
				I am most confident with .NET full-stack web development, but I am a fast learner
				and can pick up new skills quickly.
			</p>

			<p>
				In addition to development, I enjoy working on internal tooling, automating
				development processes, and debugging production problems. I'm a big fan of code
				reviewing and improving code quality.
			</p>

			<p>
				I write documentation and train new developers. I am a reliable hard worker and
				team player.
			</p>
		</div>

		<div class="terminal-wrapper">
			<TerminalWidget />
		</div>
	</div>
</section>

<section>
	<h2>Technologies</h2>

	<SkillsWidget skills={data.skills} />
</section>
<section class="bg-color">
	<h2>My Journey</h2>

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
<section>
	<div class="contact-split">
		<div class="left">
			<h2>Contact Me</h2>

			<p>I'm open to new opportunities! Reach out to me if you'd like to connect.</p>

			<div class="contact-links">
				<a href="mailto:{data.resources['emailAddress']}">
					<svg
						class="iconify-icon"
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="m20 8l-8 5l-8-5V6l8 5l8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2"
						/></svg
					>
					Email
				</a>
				<a href={data.resources['resumeUrl']} target="_blank">
					<svg
						class="iconify-icon"
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-9.5 8.5c0 .8-.7 1.5-1.5 1.5H7v2H5.5V9H8c.8 0 1.5.7 1.5 1.5zm5 2c0 .8-.7 1.5-1.5 1.5h-2.5V9H13c.8 0 1.5.7 1.5 1.5zm4-3H17v1h1.5V13H17v2h-1.5V9h3zm-6.5 0h1v3h-1zm-5 0h1v1H7z"
						/></svg
					>
					Resume
				</a>
				<a href={data.resources['linkedInUrl']} target="_blank">
					<svg
						class="iconify-icon"
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
						/></svg
					>
					LinkedIn
				</a>
				<a href={data.resources['githubUrl']} target="_blank">
					<svg
						class="iconify-icon"
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
						/></svg
					>
					GitHub
				</a>
			</div>
		</div>
		<div class="right">
			<MusicPlayer />
		</div>
	</div>
</section>

<style>
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
