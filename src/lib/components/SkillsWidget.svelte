<script lang="ts">
	import type { Skill } from '$lib/types/Skill';
	import SkillBadge from './SkillBadge.svelte';

	let { skills } = $props<{ skills: Skill[] }>();

	let groups = $derived(
		skills
			.map((s: Skill) => s.group)
			.filter(
				(value: string, index: number, arr: string[]) => index === arr.indexOf(value)
			)
			.sort()
	);

	let currentGroup = $derived(groups[0]);
</script>

<div class="skills-list">
	{#each skills as skill (skill.name)}
		<SkillBadge {skill} selected={skill.group === currentGroup} />
	{/each}
</div>

<style>
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
