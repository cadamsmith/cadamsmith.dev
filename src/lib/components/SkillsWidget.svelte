<script lang="ts">
	import type { Skill } from '$lib/types/Skill';
	import SkillBadge from './SkillBadge.svelte';

	let { skills } = $props<{ skills: Skill[] }>();

	// Display order for the group tabs (mirrors the resume's group order).
	const GROUP_ORDER = ['Languages', 'Frameworks & Libraries', 'Data & Cloud', 'Tools'];
	const groupRank = (group: string) => {
		const index = GROUP_ORDER.indexOf(group);
		return index === -1 ? GROUP_ORDER.length : index;
	};

	const groups = $derived(
		[...new Set(skills.map((s: Skill) => s.group))].sort(
			(a, b) => groupRank(a) - groupRank(b)
		)
	);

	let currentGroup = $state(
		GROUP_ORDER.find((g) => skills.some((s: Skill) => s.group === g)) ??
			skills[0]?.group ??
			''
	);
	const visibleSkills = $derived(skills.filter((s: Skill) => s.group === currentGroup));

	// Sliding indicator under the active tab.
	let tabEls = $state<HTMLButtonElement[]>([]);
	let indicator = $state({ left: 0, width: 0 });

	$effect(() => {
		const index = groups.indexOf(currentGroup);
		const move = () => {
			const el = tabEls[index];
			if (el) indicator = { left: el.offsetLeft, width: el.offsetWidth };
		};
		move();
		// Web-font swap and viewport changes shift tab widths — re-measure.
		document.fonts?.ready.then(move);
		window.addEventListener('resize', move);
		return () => window.removeEventListener('resize', move);
	});
</script>

<div class="skills">
	<div class="switcher" role="group" aria-label="Filter skills by group">
		<div class="rail">
			{#each groups as group, i (group)}
				<button
					bind:this={tabEls[i]}
					type="button"
					class="tab"
					class:active={group === currentGroup}
					aria-pressed={group === currentGroup}
					onclick={() => (currentGroup = group)}
				>
					{group}
				</button>
			{/each}
			<span
				class="indicator"
				style="transform: translateX({indicator.left}px); width: {indicator.width}px"
				aria-hidden="true"
			></span>
		</div>
	</div>

	<div class="skills-list">
		{#each visibleSkills as skill (skill.name)}
			<SkillBadge {skill} selected={true} />
		{/each}
	</div>
</div>

<style>
	.switcher {
		overflow-x: auto;
		scrollbar-width: none;
		margin-bottom: 1.25rem;
	}

	.switcher::-webkit-scrollbar {
		display: none;
	}

	/* Segmented control: an inset track (darker than the surface it sits on) with
	   a sliding glass thumb behind the active tab. */
	.rail {
		position: relative;
		display: inline-flex;
		gap: 0.25rem;
		padding: 0.3rem;
		background: var(--color-b);
		border: 1px solid var(--color-border);
		border-radius: 999px;
	}

	.tab {
		appearance: none;
		background: none;
		border: none;
		cursor: pointer;
		font-family: inherit;
		font-size: 0.9rem;
		font-weight: 500;
		padding: 0.4rem 0.95rem;
		border-radius: 999px;
		color: var(--color-muted);
		white-space: nowrap;
		position: relative;
		z-index: 1;
		transition: color 0.16s ease;
	}

	.tab:hover {
		color: var(--color-l);
	}

	.tab.active {
		color: var(--color-h);
		font-weight: 600;
	}

	.tab:focus-visible {
		outline: 2px solid var(--color-h);
		outline-offset: 3px;
		border-radius: 999px;
	}

	.indicator {
		position: absolute;
		top: 0.3rem;
		bottom: 0.3rem;
		left: 0;
		z-index: 0;
		background: var(--color-j);
		border-radius: 999px;
		box-shadow:
			inset 0 0 0 1px rgba(96, 208, 255, 0.22),
			0 4px 14px -6px rgba(96, 208, 255, 0.4);
		transition:
			transform 0.28s cubic-bezier(0.4, 0, 0.2, 1),
			width 0.28s cubic-bezier(0.4, 0, 0.2, 1);
		will-change: transform, width;
	}

	@media (prefers-reduced-motion: reduce) {
		.indicator {
			transition: none;
		}
	}

	.skills-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		grid-gap: 0.4rem;
		grid-auto-flow: dense;
	}

	@media (max-width: 600px) {
		.skills-list {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	/* On mobile the long labels wrap, so drop the single-row track + sliding
	   thumb and give each group a standalone pill. The active pill keeps the
	   same glass vocabulary as the desktop thumb (tinted fill, cyan border and
	   glow) rather than a loud solid fill. */
	@media (max-width: 800px) {
		.switcher {
			overflow-x: visible;
		}

		.rail {
			flex-wrap: wrap;
			width: 100%;
			gap: 0.5rem;
			padding: 0;
			background: transparent;
			border: none;
		}

		.indicator {
			display: none;
		}

		.tab {
			background: var(--color-i);
			border: 1px solid var(--color-border);
			transition:
				color 0.16s ease,
				background-color 0.16s ease,
				border-color 0.16s ease,
				box-shadow 0.16s ease;
		}

		.tab.active {
			color: var(--color-h);
			background: var(--color-j);
			border-color: var(--color-h);
			box-shadow:
				inset 0 0 0 1px rgba(96, 208, 255, 0.2),
				0 2px 12px -4px rgba(96, 208, 255, 0.4);
		}
	}
</style>
