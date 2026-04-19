<script lang="ts">
	import type { Skill } from '$lib/types/Skill';

	interface Props {
		skill: Skill;
		selected: boolean;
	}

	let { skill, selected }: Props = $props();
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
		min-width: 0;

		text-decoration: none;
		color: #000;
		border-radius: 10px;
		padding: 0.3rem;
		background-color: var(--color-i);
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
		flex: 1;
		min-width: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	@media (max-width: 600px) {
		.skill-badge {
			justify-content: center;
		}

		.skill-badge span {
			display: none;
		}
	}

	.skill-badge:hover,
	.skill-badge:focus {
		background-color: var(--color-a);
		color: #fff;
		text-decoration: underline;
	}
</style>
