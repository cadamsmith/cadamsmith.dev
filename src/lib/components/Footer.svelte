<script lang="ts">
	const deploySha = import.meta.env.VITE_DEPLOY_COMMIT_SHA;
	const deployBranch = import.meta.env.VITE_DEPLOY_COMMIT_BRANCH;

	const appVersion = import.meta.env.VITE_APP_VERSION;

	const githubUrl = 'https://github.com/cadamsmith/cadamsmith.dev';
</script>

<footer>
	<div class="info">
		<span class="powered-by">
			Powered by
			<a class="icon-link sveltekit-link" href="https://kit.svelte.dev/" target="_blank">
				<svg
					class="iconify-icon"
					xmlns="http://www.w3.org/2000/svg"
					width="1em"
					height="1em"
					viewBox="0 0 256 256"
					><g fill="none"
						><rect width="256" height="256" fill="#ff3e00" rx="60" /><g
							clip-path="url(#skillIconsSvelte0)"
							><path
								fill="#fff"
								d="M193.034 61.797c-16.627-23.95-49.729-30.966-73.525-15.865L77.559 72.78c-11.44 7.17-19.372 18.915-21.66 32.186c-1.984 11.136-.306 22.576 5.033 32.492c-3.66 5.491-6.102 11.593-7.17 18c-2.44 13.576.764 27.61 8.696 38.745c16.78 23.95 49.728 30.966 73.525 15.865l41.949-26.695c11.441-7.17 19.373-18.915 21.661-32.187c1.983-11.135.305-22.576-5.034-32.491c3.661-5.492 6.102-11.593 7.17-18c2.593-13.729-.61-27.763-8.695-38.898"
							/><path
								fill="#ff3e00"
								d="M115.39 196.491a33.25 33.25 0 0 1-35.695-13.271c-4.881-6.712-6.712-15.101-5.34-23.339c.306-1.373.611-2.593.916-3.966l.763-2.44L78.169 155a55.6 55.6 0 0 0 16.475 8.237l1.525.458l-.152 1.525c-.153 2.136.458 4.424 1.678 6.255c2.441 3.508 6.712 5.186 10.83 4.118c.916-.305 1.831-.61 2.594-1.068l41.796-26.695c2.136-1.372 3.509-3.355 3.966-5.796s-.152-5.034-1.525-7.017c-2.441-3.509-6.712-5.034-10.831-3.966c-.915.305-1.83.61-2.593 1.068l-16.017 10.22c-2.593 1.678-5.491 2.898-8.542 3.661a33.25 33.25 0 0 1-35.695-13.271c-4.729-6.712-6.712-15.102-5.186-23.339c1.372-7.932 6.254-15.102 13.118-19.373l41.949-26.695c2.593-1.678 5.492-2.898 8.543-3.814a33.25 33.25 0 0 1 35.695 13.272c4.881 6.712 6.711 15.101 5.339 23.339c-.306 1.373-.611 2.593-1.068 3.966l-.763 2.44l-2.136-1.525a55.6 55.6 0 0 0-16.474-8.237l-1.526-.458l.153-1.525c.153-2.136-.458-4.424-1.678-6.255c-2.441-3.508-6.712-5.034-10.83-3.966c-.916.305-1.831.61-2.594 1.068l-41.796 26.695c-2.136 1.373-3.509 3.356-3.966 5.797s.152 5.034 1.525 7.017c2.441 3.508 6.712 5.033 10.831 3.966c.915-.305 1.83-.611 2.593-1.068l16.017-10.22c2.593-1.678 5.491-2.899 8.542-3.814a33.25 33.25 0 0 1 35.695 13.271c4.881 6.712 6.712 15.102 5.339 23.339c-1.373 7.932-6.254 15.102-13.119 19.373l-41.949 26.695c-2.593 1.678-5.491 2.898-8.542 3.813"
							/></g
						><defs
							><clipPath id="skillIconsSvelte0"
								><path fill="#fff" d="M53 38h149.644v180H53z" /></clipPath
							></defs
						></g
					></svg
				>
				<span>SvelteKit</span>
			</a>
		</span>
		<span class="hosted-by">
			on
			<a
				class="icon-link cloudflare-link"
				href="https://pages.cloudflare.com/"
				target="_blank"
			>
				<svg
					class="iconify-icon"
					xmlns="http://www.w3.org/2000/svg"
					width="1em"
					height="1em"
					viewBox="0 0 256 256"
					><g fill="none"
						><rect width="256" height="256" fill="#242938" rx="60" /><g
							clip-path="url(#skillIconsCloudflareDark0)"
							><path
								fill="#fff"
								d="M79 171.75h132.356v-36.625l-25.144-14.419l-4.337-1.875L79 119.537z"
							/><path
								fill="#f38020"
								d="M165.575 166.887c1.231-4.218.763-8.087-1.287-10.962c-1.875-2.638-5.044-4.163-8.85-4.338l-72.157-.937c-.469 0-.875-.238-1.112-.588s-.294-.812-.175-1.287c.237-.706.937-1.231 1.7-1.288l72.8-.937c8.625-.413 18-7.388 21.275-15.938l4.162-10.843a2.37 2.37 0 0 0 .125-1.407c-4.687-21.218-23.625-37.043-46.25-37.043c-20.875 0-38.562 13.481-44.9 32.187a21.63 21.63 0 0 0-14.95-4.162c-10.025 1-18.125 9.025-19.05 19.05a22.4 22.4 0 0 0 .525 7.443A30.25 30.25 0 0 0 28 166.125c0 1.462.125 2.937.294 4.394c.125.706.706 1.231 1.406 1.231h133.175a1.81 1.81 0 0 0 1.7-1.288z"
							/><path
								fill="#faae40"
								d="m188.55 120.519l-2 .062c-.469 0-.875.35-1.063.813l-2.812 9.787c-1.231 4.219-.763 8.088 1.287 10.963c1.875 2.637 5.044 4.162 8.85 4.337l15.357.938c.468 0 .875.237 1.112.587s.294.875.175 1.288c-.237.706-.937 1.231-1.7 1.287l-16 .938c-8.675.412-18 7.387-21.275 15.937l-1.175 2.988c-.237.587.175 1.175.813 1.175H225.1a1.44 1.44 0 0 0 1.406-1.057a40 40 0 0 0 1.494-10.65a39.5 39.5 0 0 0-39.45-39.387"
							/></g
						><defs
							><clipPath id="skillIconsCloudflareDark0"
								><path fill="#fff" d="M28 28h200v200H28z" /></clipPath
							></defs
						></g
					></svg
				>
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
			<svg class="iconify-icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><g fill="none"><rect width="256" height="256" fill="#242938" rx="60"/><path fill="#fff" d="M128.001 30C72.779 30 28 74.77 28 130.001c0 44.183 28.653 81.667 68.387 94.89c4.997.926 6.832-2.169 6.832-4.81c0-2.385-.093-10.262-.136-18.618c-27.82 6.049-33.69-11.799-33.69-11.799c-4.55-11.559-11.104-14.632-11.104-14.632c-9.073-6.207.684-6.079.684-6.079c10.042.705 15.33 10.305 15.33 10.305c8.919 15.288 23.394 10.868 29.1 8.313c.898-6.464 3.489-10.875 6.349-13.372c-22.211-2.529-45.56-11.104-45.56-49.421c0-10.918 3.906-19.839 10.303-26.842c-1.039-2.519-4.462-12.69.968-26.464c0 0 8.398-2.687 27.508 10.25c7.977-2.215 16.531-3.326 25.03-3.364c8.498.038 17.06 1.149 25.051 3.365c19.087-12.939 27.473-10.25 27.473-10.25c5.443 13.773 2.019 23.945.98 26.463c6.412 7.003 10.292 15.924 10.292 26.842c0 38.409-23.394 46.866-45.662 49.341c3.587 3.104 6.783 9.189 6.783 18.519c0 13.38-.116 24.149-.116 27.443c0 2.661 1.8 5.779 6.869 4.797C199.383 211.64 228 174.169 228 130.001C228 74.771 183.227 30 128.001 30M65.454 172.453c-.22.497-1.002.646-1.714.305c-.726-.326-1.133-1.004-.898-1.502c.215-.512.999-.654 1.722-.311c.727.326 1.141 1.01.89 1.508m4.919 4.389c-.477.443-1.41.237-2.042-.462c-.654-.697-.777-1.629-.293-2.078c.491-.442 1.396-.235 2.051.462c.654.706.782 1.631.284 2.078m3.374 5.616c-.613.426-1.615.027-2.234-.863c-.613-.889-.613-1.955.013-2.383c.621-.427 1.608-.043 2.236.84c.611.904.611 1.971-.015 2.406m5.707 6.504c-.548.604-1.715.442-2.57-.383c-.874-.806-1.118-1.95-.568-2.555c.555-.606 1.729-.435 2.59.383c.868.804 1.133 1.957.548 2.555m7.376 2.195c-.242.784-1.366 1.14-2.499.807c-1.13-.343-1.871-1.26-1.642-2.052c.235-.788 1.364-1.159 2.505-.803c1.13.341 1.871 1.252 1.636 2.048m8.394.932c.028.824-.932 1.508-2.121 1.523c-1.196.027-2.163-.641-2.176-1.452c0-.833.939-1.51 2.134-1.53c1.19-.023 2.163.639 2.163 1.459m8.246-.316c.143.804-.683 1.631-1.864 1.851c-1.161.212-2.236-.285-2.383-1.083c-.144-.825.697-1.651 1.856-1.865c1.183-.205 2.241.279 2.391 1.097"/></g></svg>
			Source Code
		</a>
	</div>
</footer>

<style>
	footer {
		margin-top: 1rem;
		padding: 1rem;
		background-color: var(--color-a);
		color: #fff;
		display: flex;
		justify-content: space-between;
		gap: 0.5em;
		overflow-x: hidden;
	}

	.icon-link {
		--border-color: var(--color-h);
		display: inline-flex;
	}

	a:not(.icon-link) {
		color: #fff;
	}

	.powered-by,
	.hosted-by {
		display: flex;
		align-items: center;
		gap: 0.3em;
	}

	.powered-by {
		margin-right: 0.2em;
	}
	.info,
	.source-info {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		row-gap: 0.5em;
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
			background-color: var(--color-a);
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
