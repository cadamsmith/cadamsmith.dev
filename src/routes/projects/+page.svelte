<script lang="ts">
	import Carousel from '$lib/components/Carousel.svelte';

	let { data } = $props();

	console.log(data.projects);
</script>

<section class="bg-color">
	<h1>Projects</h1>

	here are some projects I've worked on
</section>

<!-- make section for each project -->
{#each data.projects as project, i}
	<section class="project" class:bg-color={i % 2 == 1}>
		<h2>{project.metadata.name}</h2>
		<p class="timerange">{project.metadata.timeRange}</p>
		<p class="description">{project.metadata.description}</p>

		{#if project.metadata.imageUrls.length > 0}
			<div class="carousel-wrapper">
				<Carousel
					images={project.metadata.imageUrls}
					alt={`${project.metadata.name} project image`}
				/>
			</div>
		{/if}

		<div class="tags">
			{#each project.metadata.tags as tag}
				<span class="tag">{tag}</span>
			{/each}
		</div>

		{#if project.metadata.url}
			<a href={project.metadata.url} target="_blank" rel="noopener noreferrer"
				>View Project</a
			>
		{/if}

		<project.component />
	</section>
{/each}
