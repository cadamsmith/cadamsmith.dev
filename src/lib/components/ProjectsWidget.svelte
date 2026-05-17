<script lang="ts">
	import type { Project } from '$lib/types/Project';
	import ProjectCard from './ProjectCard.svelte';

	interface Props {
		projects: Project[];
	}

	let { projects }: Props = $props();
</script>

<div class="projects-grid">
	{#each projects as project (project.name)}
		<ProjectCard {project} />
	{/each}
</div>

<style>
	.projects-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.25rem;
	}

	@media (max-width: 900px) {
		.projects-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 600px) {
		.projects-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
