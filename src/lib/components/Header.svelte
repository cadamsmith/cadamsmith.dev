<script lang="ts">
	import NavBrand from "./NavBrand.svelte";

	const linkedInUrl = 'https://linkedin.com/in/cadamsmithdev';
	const githubUrl = 'https://github.com/cadamsmith';
	const emailAddress = 'cadamsmith.dev@gmail.com';

	const resumeUrl = 'https://drive.google.com/file/d/1J1hP-a2mQrQiw9494O5273dMo3JGmtMK/view?usp=sharing';
</script>

<header>
	<NavBrand />

	<nav>
		<ul>
			<li>
				<a class="icon-link" href={githubUrl} target="_blank" aria-label="GitHub">
					<iconify-icon class="iconify-icon" icon="skill-icons:github-dark" />
				</a>
			</li>
			<li>
				<a class="icon-link" href={linkedInUrl} target="_blank" aria-label="LinkedIn">
					<iconify-icon class="iconify-icon" icon="skill-icons:linkedin" />
				</a>
			</li>
			<li>
				<a class="icon-link resume-link" href={resumeUrl} target="_blank">
					<iconify-icon class="iconify-icon" inline icon="icon-park:doc-detail" />
					<span>Resume</span>
				</a>
			</li>
			<li>
				<a class="icon-link email-link" href="mailto:{emailAddress}">
					<iconify-icon class="iconify-icon" inline icon="icon-park:email-block" />
					<span>Contact</span>
				</a>
			</li>
		</ul>
	</nav>
</header>

<style>
	header {
		padding: 1rem;
		background-image: linear-gradient(to right, var(--color-a), var(--color-b));
		color: white;
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
		color: #3da5d9;
	}

	@media (max-width: 700px) {
		header {
			flex-direction: column;
			gap: 0.5em;
			background-image: linear-gradient(to right, #352e48, #352e48);
			padding-bottom: 0;
			padding-left: 0;
			padding-right: 0;
		}

		ul {
			padding-left: 0;
		}

		nav {
			background-color: #584c77;
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
