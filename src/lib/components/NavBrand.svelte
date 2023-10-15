<script lang="ts">
    const defaultProfileImgPath = '/images/profile.jpg';
	const altProfileImgPath = '/images/profile-alt.jpg';

	const defaultProfileImgURL = new URL(defaultProfileImgPath, import.meta.url).href;

	const altProfileImgURL = new URL(altProfileImgPath, import.meta.url).href;

    let useDefaultProfileImg = true;

	function setAltProfilePhoto() {
		useDefaultProfileImg = false;
	}

	function setDefaultProfilePhoto() {
		useDefaultProfileImg = true;
	}

    export let crazyMode: boolean;
</script>

<svelte:head>
	<link rel="preload" as="image" href="{defaultProfileImgPath}" />
	<link rel="preload" as="image" href="{altProfileImgPath}" />
</svelte:head>

<a
    class="nav-brand"
    href="/"
    on:mouseenter={setAltProfilePhoto}
    on:mouseleave={setDefaultProfilePhoto}
>
    <div class="dino" class:crazy={crazyMode}>
        <img src={defaultProfileImgURL} alt="" class={useDefaultProfileImg ? '' : 'hide'} />
        <img src={altProfileImgURL} class={useDefaultProfileImg ? 'hide' : ''} alt="" />
    </div>
    Adam Smith
</a>

<style>
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

		& .dino {
			width: 3.5em;
			height: 3.5em;
			overflow: hidden;
			border-radius: 50%;
			flex-shrink: 0;

			margin-top: -0.7em;
			margin-bottom: -0.7em;
			margin-left: -0.6em;
			position: relative;
		}

		& .dino img {
			width: 100%;
			height: 100%;
			color: black;
			position: absolute;
			background-color: white;
		}
	}

	.hide {
		visibility: hidden;
	}
</style>