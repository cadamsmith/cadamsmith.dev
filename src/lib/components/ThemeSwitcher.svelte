<script lang="ts">
	const themes = [
		{ id: 'ember', label: 'Ember', color: '#d4860a' },
		{ id: 'ocean', label: 'Ocean', color: '#00c8b0' },
		{ id: 'forest', label: 'Forest', color: '#c8b060' },
		{ id: 'dusk', label: 'Dusk', color: '#e06858' }
	];

	let current = $state('ember');

	$effect(() => {
		const saved = localStorage.getItem('theme') || 'ember';
		current = saved;
		document.documentElement.setAttribute('data-theme', saved);
	});

	function setTheme(id: string) {
		current = id;
		document.documentElement.setAttribute('data-theme', id);
		localStorage.setItem('theme', id);
	}
</script>

<div class="switcher" aria-label="Color theme">
	{#each themes as theme (theme.id)}
		<button
			class="swatch"
			class:active={current === theme.id}
			onclick={() => setTheme(theme.id)}
			aria-label="{theme.label} theme"
			aria-pressed={current === theme.id}
			style="--c: {theme.color}"
		></button>
	{/each}
</div>

<style>
	.switcher {
		display: flex;
		align-items: center;
		gap: 0.35em;
		padding: 0 0.2em;
	}

	.swatch {
		width: 1em;
		height: 1em;
		border-radius: 50%;
		background-color: var(--c);
		border: 2px solid transparent;
		cursor: pointer;
		padding: 0;
		flex-shrink: 0;
		transition:
			transform 0.12s ease,
			border-color 0.12s ease,
			box-shadow 0.12s ease;
	}

	.swatch:hover {
		transform: scale(1.25);
	}

	.swatch.active {
		border-color: var(--color-l);
		box-shadow: 0 0 0 1px var(--c);
	}
</style>
