<script lang="ts">
	import type { Project } from '$lib/types/Project';

	interface Props {
		project: Project;
	}

	let { project }: Props = $props();
</script>

<article class="project-card">
	<div class="project-header">
		<span class="project-emoji" aria-hidden="true">{project.emoji}</span>
		<h3 class="project-name">{project.name}</h3>
		{#if project.status}
			<span class="status-pill status-{project.status.toLowerCase()}">
				{project.status}
			</span>
		{/if}
	</div>

	<p class="project-description">{project.description}</p>

	<ul class="tech-list" aria-label="Technologies">
		{#each project.technologies as tech (tech)}
			<li class="tech-pill">{tech}</li>
		{/each}
	</ul>

	<div class="project-actions">
		<a
			class="action-btn code-btn"
			href={project.githubUrl}
			target="_blank"
			rel="noopener noreferrer"
		>
			<iconify-icon class="iconify-icon" icon="mdi:code-tags"></iconify-icon>
			<span>Code</span>
		</a>
		<a
			class="action-btn live-btn"
			href={project.liveUrl}
			target="_blank"
			rel="noopener noreferrer"
		>
			<iconify-icon class="iconify-icon" icon="mdi:open-in-new"></iconify-icon>
			<span>{project.liveLabel}</span>
		</a>
	</div>
</article>

<style>
	.project-card {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		background-color: var(--color-i);
		border: 1px solid var(--color-border);
		border-radius: 10px;
		padding: 1.25rem;
		height: 100%;
		position: relative;
		overflow: hidden;
		transition:
			border-color 0.12s ease,
			transform 0.12s ease,
			box-shadow 0.12s ease;
	}

	.project-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(90deg, var(--color-c), transparent);
		opacity: 0;
		transition: opacity 0.18s ease;
	}

	.project-card:hover,
	.project-card:focus-within {
		border-color: var(--color-h);
		transform: translateY(-2px);
		box-shadow: 0 8px 24px -12px rgba(64, 184, 240, 0.35);
	}

	.project-card:hover::before,
	.project-card:focus-within::before {
		opacity: 1;
	}

	.project-header {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}

	.project-emoji {
		font-size: 1.75rem;
		line-height: 1;
		flex-shrink: 0;
	}

	.project-name {
		flex: 1;
		font-size: 1.05rem;
		font-weight: 600;
		font-family: 'JetBrains Mono', monospace;
		color: var(--color-l);
		margin: 0;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.status-pill {
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		padding: 0.15rem 0.5rem;
		border-radius: 999px;
		flex-shrink: 0;
	}

	.status-wip {
		background-color: rgba(212, 134, 10, 0.15);
		color: #e6a040;
		border: 1px solid rgba(212, 134, 10, 0.35);
	}

	.status-stable {
		background-color: rgba(64, 184, 240, 0.12);
		color: var(--color-c);
		border: 1px solid rgba(64, 184, 240, 0.3);
	}

	.status-archived {
		background-color: var(--color-j);
		color: var(--color-muted);
		border: 1px solid var(--color-border);
	}

	.project-description {
		font-size: 0.92rem;
		line-height: 1.5;
		color: var(--color-l);
		opacity: 0.85;
		margin: 0;
	}

	.tech-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.tech-pill {
		font-size: 0.75rem;
		font-weight: 500;
		padding: 0.2rem 0.55rem;
		border-radius: 4px;
		background-color: var(--color-j);
		color: var(--color-muted);
		border: 1px solid var(--color-border);
	}

	.project-actions {
		display: flex;
		gap: 0.5rem;
		margin-top: auto;
		padding-top: 0.25rem;
	}

	.action-btn {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.35rem;
		padding: 0.45rem 0.7rem;
		border-radius: 6px;
		font-size: 0.85rem;
		font-weight: 600;
		text-decoration: none;
		transition:
			background-color 0.12s ease,
			border-color 0.12s ease,
			color 0.12s ease;
	}

	.code-btn {
		background-color: transparent;
		color: var(--color-l);
		border: 1px solid var(--color-border);
	}

	.code-btn:hover,
	.code-btn:focus {
		border-color: var(--color-h);
		color: var(--color-h);
		text-decoration: none;
	}

	.live-btn {
		background-color: var(--color-c);
		color: #0c0b09;
		border: 1px solid var(--color-c);
	}

	.live-btn:hover,
	.live-btn:focus {
		background-color: var(--color-h);
		border-color: var(--color-h);
		color: #0c0b09;
		text-decoration: none;
	}
</style>
