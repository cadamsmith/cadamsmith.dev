<script lang="ts">
	const defaultProfileImgPath = '/images/profile.png';
	const altProfileImgPath = '/images/profile-alt.png';

	let profileImgPath = defaultProfileImgPath;

	$: profileImgURL = new URL(profileImgPath, import.meta.url).href;

	function setAltProfilePhoto() {
		profileImgPath = altProfileImgPath;
	}

	function setDefaultProfilePhoto() {
		profileImgPath = defaultProfileImgPath;
	}
</script>

<header>
	<a
		class="nav-brand"
		href="/"
		on:mouseenter={setAltProfilePhoto}
		on:mouseleave={setDefaultProfilePhoto}
	>
		<img src={profileImgURL} alt="Adam Smith" />
		Adam Smith
	</a>

	<nav>
		<ul>
			<li>
				<a href="/blog">Blog</a>
			</li>
			❖
			<li>
				<a href="/about">Portfolio</a>
			</li>
			❖
			<li>
				<a href="/contact">Contact</a>
			</li>
		</ul>
	</nav>
</header>

<style>
	header {
		padding: 1rem;
		background-image: linear-gradient(to right, #352e48, #584c77);
		color: white;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
	}

	ul {
		margin: 0;
		list-style-type: none;
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	a {
		text-decoration: none;
		color: inherit;
		padding: 0.5em;
		color: #fff;
		font-weight: bold;
		box-sizing: border-box;
	}

	a:hover {
		border-color: #000;
		text-decoration: underline;
	}

	.nav-brand {
		display: inline-flex;
		align-items: center;
		text-transform: uppercase;
		background-color: #000;
		gap: 0.5em;
		color: white;
		padding: unset;
		padding-right: 0.5em;
		margin-top: 0.7em;
		margin-bottom: 0.7em;
		font-size: 1.4em;
		margin-left: 0.6em;
		border-color: #000;

		&:hover {
			border-color: #fff;
		}

		& img {
			width: 3.5em;
			height: 3.5em;
			border-radius: 50%;
			margin-top: -0.7em;
			margin-bottom: -0.7em;
			margin-left: -0.6em;
		}
	}

	@media (max-width: 600px) {
		header {
			flex-direction: column;
			gap: 0.5em;
		}

		ul {
			padding-left: 0;
		}
	}
</style>
