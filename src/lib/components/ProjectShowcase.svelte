<script lang="ts">
	import type { Project } from '$lib/types/Project';

	interface Props {
		project: Project;
	}

	let { project }: Props = $props();
</script>

<div class="project-showcase">
	<h3>{project.name}</h3>

	<div class="project-tags">
		<span class="project-tag">{project.timeRange}</span>
		{#each project.tags as tag}
			<span class="project-tag">{tag}</span>
		{/each}
	</div>
	<div class="project-details">
		<div>
			<p>{project.description}</p>
		</div>
		<div>
			{#each project.imageUrls as imageUrl}
				<img src={imageUrl} alt={project.name} />
			{/each}
		</div>
	</div>
</div>

<style>
	.project-showcase {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.project-details {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}

	.project-details img {
		width: 100%;
	}

	h3 {
		margin: 0;
	}
</style>
