<script lang="ts">
	const defaultImg = '/images/profile.png';
	const altImg = '/images/profile_alt.png';

	let useDefaultProfileImg = $state(true);

	function setAltProfilePhoto() {
		useDefaultProfileImg = false;
	}

	function setDefaultProfilePhoto() {
		useDefaultProfileImg = true;
	}
</script>

<a
	class="nav-brand"
	href="/"
	onmouseenter={setAltProfilePhoto}
	onmouseleave={setDefaultProfilePhoto}
	target="_self"
>
	<div class="dino">
		<img src={defaultImg} alt="" class={useDefaultProfileImg ? '' : 'hide'} />
		<img src={altImg} class={useDefaultProfileImg ? 'hide' : ''} alt="" />
	</div>
	<span class="brand-name">Adam Smith</span>
</a>

<style>
	a {
		text-decoration: none;
		color: var(--color-l);
		padding: 0.5em;
		font-weight: bold;
		box-sizing: border-box;
	}

	a:hover {
		text-decoration: underline;
		color: var(--color-h);
	}

	.nav-brand {
		display: inline-flex;
		align-items: center;
		text-transform: uppercase;
		background-color: var(--color-b);
		gap: 0.5em;
		color: var(--color-l);
		padding: unset;
		padding-right: 0.75em;
		margin-top: 0.5em;
		margin-bottom: 0.5em;
		font-size: 1.35em;
		letter-spacing: 0.04em;
		margin-left: 0.6em;
		border: 2px solid var(--color-border);
		border-radius: 0.3em;
		transition: border-color 0.15s ease;

		&:hover {
			border-color: var(--color-h);
			color: var(--color-h);
			text-decoration: none;
		}

		& .dino {
			width: 3.2em;
			height: 3.2em;
			overflow: hidden;
			border-radius: 50%;
			flex-shrink: 0;
			margin-top: -2px;
			margin-bottom: -2px;
			margin-left: -2px;
			position: relative;
		}

		& .dino img {
			width: 100%;
			height: 100%;
			position: absolute;
			background-color: var(--color-j);
		}
	}

	.hide {
		visibility: hidden;
	}

	/* On mobile the header stacks right above the hero, so the wordmark would echo
	   the big "Adam Smith" headline. Collapse the brand to just the circular
	   avatar and float it centered over the top edge of the button bar, letting
	   the hero own the name. (Anchored to the position:relative <header>.) */
	@media (max-width: 700px) {
		.brand-name {
			display: none;
		}

		.nav-brand {
			position: absolute;
			top: 0;
			left: 50%;
			/* nudge the avatar down so it straddles the bar edge more (25% of its
			   own height) */
			transform: translateX(-50%) translateY(25%);
			z-index: 3;
			padding: 0;
			margin: 0;
			background: transparent;
			border: none;
		}

		.nav-brand .dino {
			width: 3.75rem;
			height: 3.75rem;
			margin: 0;
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.55);
		}
	}
</style>
