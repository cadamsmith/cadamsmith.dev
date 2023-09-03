<script lang="ts">
	const defaultProfileImgPath = '/images/profile.png';
	const altProfileImgPath = '/images/profile-alt.png';

	const defaultProfileImgURL = new URL(defaultProfileImgPath, import.meta.url).href;

	const altProfileImgURL = new URL(altProfileImgPath, import.meta.url).href;

	let useDefaultProfileImg = true;

	function setAltProfilePhoto() {
		useDefaultProfileImg = false;
	}

	function setDefaultProfilePhoto() {
		useDefaultProfileImg = true;
	}
</script>

<header>
	<a
		class="nav-brand"
		href="/"
		on:mouseenter={setAltProfilePhoto}
		on:mouseleave={setDefaultProfilePhoto}
	>
		<div>
			<img
				src={defaultProfileImgURL}
				alt="t-rex profile pic"
				class={useDefaultProfileImg ? '' : 'hide'}
			/>
			<img
				src={altProfileImgURL}
				class={useDefaultProfileImg ? 'hide' : ''}
				alt="t-rex profile pic, with mouth open"
			/>
		</div>
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
		color: #3da5d9;
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

		& div {
			width: 3.5em;
			height: 3.5em;

			margin-top: -0.7em;
			margin-bottom: -0.7em;
			margin-left: -0.6em;
			position: relative;
		}

		& div img {
			width: 100%;
			height: 100%;
			border-radius: 50%;
			color: black;
			position: absolute;
			background-color: white;
		}
	}

	@media (max-width: 600px) {
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
		}
	}

	.hide {
		visibility: hidden;
	}
</style>
