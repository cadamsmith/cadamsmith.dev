<script lang="ts">
	import type { Skill } from '$lib/types/Skill';

	let { skill, selected } = $props<{
		skill: Skill;
		selected: boolean;
	}>();
</script>

<a class="skill-badge" href={skill.url} class:selected target="_blank">
	<div class="skill-badge-img-wrapper">
		<img src={skill.imageUrl} alt="{skill.name} logo" />
	</div>
	<span>{skill.name}</span>
</a>

<style>
	.skill-badge {
		display: flex;
		flex-direction: row;
		gap: 0.3rem;
		align-items: center;

		text-decoration: none;
		color: #000;
		border-radius: 10px;
		padding: 0.3rem;
		background-color: #d3d3d3;
	}

	.skill-badge-img-wrapper {
		background-color: var(--color-e);
		border-radius: 6px;
		border: 2px solid var(--color-a);
	}

	.skill-badge img {
		height: 1.2rem;
		width: 1.2rem;
		margin: 0.2rem;
	}

	.skill-badge span {
		display: contents;
		height: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.skill-badge:hover,
	.skill-badge:focus {
		background-color: var(--color-a);
		color: #fff;
		text-decoration: underline;
	}
</style>
