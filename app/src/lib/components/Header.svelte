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
			<li>
				<a href="/about">About</a>
			</li>
			<li>
				<a href="/about">Portfolio</a>
			</li>
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
		gap: 1rem;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	.nav-brand {
		display: inline-flex;
		align-items: center;
		text-transform: uppercase;
		gap: 1em;

		& img {
			width: 5em;
			height: 5em;
			border-radius: 50%;
		}
	}
</style>
