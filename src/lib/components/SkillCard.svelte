<script lang="ts">
	import type { Skill } from '$lib/types/Skill';

	let { skill, selected } = $props<{
		skill: Skill;
		selected: boolean;
	}>();
</script>

<a class="skill-card" href={skill.url} class:selected target="_blank">
	<img src={skill.imageUrl} alt="{skill.name} logo" />
	<div class="skill-card-footer">
		<p>{skill.name}</p>
	</div>
</a>

<style>
	.skill-card {
		background-color: #d3d3d3;
		border-radius: 15px;

		border: 5px solid #d5bf86;

		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		overflow: hidden;
	}

	.skill-card:hover {
		border-color: #000;
	}

	.skill-card:not(.selected) {
		display: none;
	}

	img {
		padding: 0.5rem;
		height: 55px;
	}

	.skill-card-footer {
		background-color: white;
		width: 100%;
	}

	p {
		margin: 0;
		text-align: center;
		font-weight: bold;
		text-overflow: ellipsis;
	}
</style>
