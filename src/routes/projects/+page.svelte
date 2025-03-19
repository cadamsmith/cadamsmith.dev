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
		<h2>{project.name}</h2>
		<p class="timerange">{project.timeRange}</p>
		<p class="description">{project.description}</p>

		{#if project.imageUrls.length > 0}
			<div class="carousel-wrapper">
				<Carousel
					images={project.imageUrls}
					alt={`${project.name} project image`}
				/>
			</div>
		{/if}

		<div class="tags">
			{#each project.tags as tag}
				<span class="tag">{tag}</span>
			{/each}
		</div>

		{#if project.url}
			<a href={project.url} target="_blank" rel="noopener noreferrer"
				>View Project</a
			>
		{/if}
	</section>
{/each}
