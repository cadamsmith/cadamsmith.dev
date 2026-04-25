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
		gap: 0.35rem;
		align-items: center;
		min-width: 0;

		text-decoration: none;
		color: var(--color-l);
		border-radius: 6px;
		padding: 0.35rem 0.5rem;
		background-color: var(--color-i);
		border: 1px solid var(--color-border);
		font-size: 0.9em;
		transition:
			border-color 0.12s ease,
			color 0.12s ease;
	}

	.skill-badge-img-wrapper {
		background-color: var(--color-j);
		border-radius: 4px;
		flex-shrink: 0;
	}

	.skill-badge img {
		height: 1.2rem;
		width: 1.2rem;
		margin: 0.2rem;
		display: block;
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
		border-color: var(--color-h);
		color: var(--color-h);
		text-decoration: none;
	}
</style>
