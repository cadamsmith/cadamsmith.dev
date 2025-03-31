<script lang="ts">
	import NavBrand from './NavBrand.svelte';
	import Icon from '@iconify/svelte';

	let { resources } = $props<{ resources: { [key: string]: string } }>();
</script>

<header>
	<NavBrand />

	<nav>
		<ul>
			<li>
				<a
					class="icon-link"
					href={resources['githubUrl']}
					target="_blank"
					aria-label="GitHub"
				>
					<svg
						class="iconify-icon"
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						viewBox="0 0 256 256"
						><g fill="none"
							><rect width="256" height="256" fill="#242938" rx="60" /><path
								fill="#fff"
								d="M128.001 30C72.779 30 28 74.77 28 130.001c0 44.183 28.653 81.667 68.387 94.89c4.997.926 6.832-2.169 6.832-4.81c0-2.385-.093-10.262-.136-18.618c-27.82 6.049-33.69-11.799-33.69-11.799c-4.55-11.559-11.104-14.632-11.104-14.632c-9.073-6.207.684-6.079.684-6.079c10.042.705 15.33 10.305 15.33 10.305c8.919 15.288 23.394 10.868 29.1 8.313c.898-6.464 3.489-10.875 6.349-13.372c-22.211-2.529-45.56-11.104-45.56-49.421c0-10.918 3.906-19.839 10.303-26.842c-1.039-2.519-4.462-12.69.968-26.464c0 0 8.398-2.687 27.508 10.25c7.977-2.215 16.531-3.326 25.03-3.364c8.498.038 17.06 1.149 25.051 3.365c19.087-12.939 27.473-10.25 27.473-10.25c5.443 13.773 2.019 23.945.98 26.463c6.412 7.003 10.292 15.924 10.292 26.842c0 38.409-23.394 46.866-45.662 49.341c3.587 3.104 6.783 9.189 6.783 18.519c0 13.38-.116 24.149-.116 27.443c0 2.661 1.8 5.779 6.869 4.797C199.383 211.64 228 174.169 228 130.001C228 74.771 183.227 30 128.001 30M65.454 172.453c-.22.497-1.002.646-1.714.305c-.726-.326-1.133-1.004-.898-1.502c.215-.512.999-.654 1.722-.311c.727.326 1.141 1.01.89 1.508m4.919 4.389c-.477.443-1.41.237-2.042-.462c-.654-.697-.777-1.629-.293-2.078c.491-.442 1.396-.235 2.051.462c.654.706.782 1.631.284 2.078m3.374 5.616c-.613.426-1.615.027-2.234-.863c-.613-.889-.613-1.955.013-2.383c.621-.427 1.608-.043 2.236.84c.611.904.611 1.971-.015 2.406m5.707 6.504c-.548.604-1.715.442-2.57-.383c-.874-.806-1.118-1.95-.568-2.555c.555-.606 1.729-.435 2.59.383c.868.804 1.133 1.957.548 2.555m7.376 2.195c-.242.784-1.366 1.14-2.499.807c-1.13-.343-1.871-1.26-1.642-2.052c.235-.788 1.364-1.159 2.505-.803c1.13.341 1.871 1.252 1.636 2.048m8.394.932c.028.824-.932 1.508-2.121 1.523c-1.196.027-2.163-.641-2.176-1.452c0-.833.939-1.51 2.134-1.53c1.19-.023 2.163.639 2.163 1.459m8.246-.316c.143.804-.683 1.631-1.864 1.851c-1.161.212-2.236-.285-2.383-1.083c-.144-.825.697-1.651 1.856-1.865c1.183-.205 2.241.279 2.391 1.097"
							/></g
						></svg
					>
				</a>
			</li>
			<li>
				<a
					class="icon-link"
					href={resources['linkedInUrl']}
					target="_blank"
					aria-label="LinkedIn"
				>
					<svg
						class="iconify-icon"
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						viewBox="0 0 256 256"
						><g fill="none"
							><rect width="256" height="256" fill="#fff" rx="60" /><rect
								width="256"
								height="256"
								fill="#000"
								rx="60"
							/><path
								fill="#fff"
								d="M184.715 217.685h29.27a4 4 0 0 0 4-3.999l.015-61.842c0-32.323-6.965-57.168-44.738-57.168c-14.359-.534-27.9 6.868-35.207 19.228a.32.32 0 0 1-.595-.161V101.66a4 4 0 0 0-4-4h-27.777a4 4 0 0 0-4 4v112.02a4 4 0 0 0 4 4h29.268a4 4 0 0 0 4-4v-55.373c0-15.657 2.97-30.82 22.381-30.82c19.135 0 19.383 17.916 19.383 31.834v54.364a4 4 0 0 0 4 4M38 59.628c0 11.864 9.767 21.626 21.632 21.626c11.862-.001 21.623-9.769 21.623-21.631C81.253 47.761 71.491 38 59.628 38C47.762 38 38 47.763 38 59.627m6.959 158.058h29.307a4 4 0 0 0 4-4V101.66a4 4 0 0 0-4-4H44.959a4 4 0 0 0-4 4v112.025a4 4 0 0 0 4 4"
							/></g
						></svg
					>
				</a>
			</li>
			<li>
				<a class="icon-link resume-link" href={resources['resumeUrl']} target="_blank">
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
					<span>Resume</span>
				</a>
			</li>
			<li>
				<a class="icon-link email-link" href="mailto:{resources['emailAddress']}">
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
