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

	.rail {
		position: relative;
		display: flex;
		gap: 1.6rem;
		width: max-content;
		min-width: 100%;
		border-bottom: 1px solid var(--color-border);
	}

	.tab {
		appearance: none;
		background: none;
		border: none;
		cursor: pointer;
		font-family: inherit;
		font-size: 0.95rem;
		padding: 0.2rem 0 0.7rem;
		color: var(--color-muted);
		white-space: nowrap;
		transition: color 0.16s ease;
	}

	.tab:hover {
		color: var(--color-l);
	}

	.tab.active {
		color: var(--color-h);
	}

	.tab:focus-visible {
		outline: 2px solid var(--color-h);
		outline-offset: 3px;
		border-radius: 3px;
	}

	.indicator {
		position: absolute;
		left: 0;
		bottom: -1px;
		height: 2px;
		background: var(--color-h);
		border-radius: 2px;
		box-shadow: 0 0 8px rgba(96, 208, 255, 0.7);
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
</style>
