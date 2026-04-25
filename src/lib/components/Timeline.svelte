<script lang="ts">
	import type { TimelineItem } from '$lib/types/TimelineItem';

	let { timeline } = $props<{ timeline: TimelineItem[] }>();

	let currentGroup = $state('Work');

	function handleGroupChange(group: string) {
		currentGroup = group;
	}

	function formatDate(dateStr: string): string {
		if (dateStr === 'PRESENT') return 'Present';
		const [year, month] = dateStr.split('-').map(Number);
		return new Date(year, month - 1).toLocaleDateString('en-US', {
			month: 'short',
			year: 'numeric'
		});
	}

	function selectLocation(coordinates: { lat: number; lng: number }) {
		window.dispatchEvent(new CustomEvent('location-change', { detail: coordinates }));
	}
</script>

<div class="timeline-selector">
	<button
		class:selected={currentGroup === 'Work'}
		onclick={() => handleGroupChange('Work')}>Work</button
	>
	<button
		class:selected={currentGroup === 'Education'}
		onclick={() => handleGroupChange('Education')}>Education</button
	>
</div>

<div class="timeline">
	<div class="timeline-panels">
		{#each ['Work', 'Education'] as group (group)}
			<div class="timeline-panel" class:selected={group === currentGroup}>
				{#each timeline.filter((item) => item.group === group) as timelineItem (timelineItem.order)}
					<div class="timeline-item">
						<div class="timeline-item-left">
							<div class="img-wrapper">
								<img src="/images/generic_skill.svg" alt="Generic Skill" />
							</div>
						</div>
						<div class="timeline-item-right">
							<p>
								{timelineItem.dateRanges
									.map((r) => `${formatDate(r.startDate)} – ${formatDate(r.endDate)}`)
									.join(', ')}
							</p>
							<h3>
								<a href={timelineItem.url} target="_blank">{timelineItem.company}</a>
							</h3>
							<p>{timelineItem.title}</p>
							<button
								class="location"
								onclick={() => selectLocation(timelineItem.coordinates)}
							>
								<iconify-icon icon="mdi:map-marker"></iconify-icon>
								{timelineItem.location}
							</button>
						</div>
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.timeline-selector {
		width: 100%;
		display: flex;
		gap: 0.3em;
		border: 1px solid var(--color-border);
		padding: 0.25rem;
		margin-bottom: 0.5rem;
		background-color: var(--color-i);
		border-radius: 0.3em;
	}

	.timeline-selector button {
		flex-grow: 1;
		background-color: transparent;
		border: none;
		padding: 0.3rem 0.5rem;
		cursor: pointer;
		font-weight: 600;
		font-size: 0.8em;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-muted);
		border-radius: 0.2em;
		font-family: inherit;
		transition: color 0.12s ease;
	}

	.timeline-selector button:hover {
		color: var(--color-l);
	}

	.timeline-selector button.selected {
		background-color: var(--color-c);
		color: #0c0b09;
		font-weight: 700;
	}

	h3 {
		font-size: 1em;
		margin: 0;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	h3 a {
		color: inherit;
		text-decoration: none;
	}

	h3 a:hover {
		color: var(--color-h);
		text-decoration: underline;
	}

	p {
		margin: 0;
		font-size: 0.9em;
		color: var(--color-muted);
	}

	.timeline {
		border: 1px solid var(--color-border);
		padding: 0 1rem;
		width: 100%;
		background-color: var(--color-k);
		color: var(--color-l);
		border-radius: 0.3em;
	}

	.timeline-panels {
		display: grid;
	}

	.timeline-panel {
		grid-area: 1 / 1;
		visibility: hidden;
		position: relative;
	}

	.timeline-panel::before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 1rem;
		width: 2px;
		transform: translateX(-50%);
		background-color: var(--color-c);
		opacity: 0.5;
	}

	.timeline-panel.selected {
		visibility: visible;
	}

	.timeline-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
	}

	.timeline-item-left {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.timeline-item .img-wrapper {
		width: 2rem;
		height: 2rem;
		background-color: var(--color-j);
		border: 2px solid var(--color-c);
		border-radius: 50%;
		padding: 0.3rem;
		z-index: 1;
	}

	.timeline-item .img-wrapper img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		opacity: 0.7;
	}

	.timeline-item-right {
		padding: 0.6rem 0;
	}

	.location {
		display: flex;
		align-items: center;
		gap: 0.2em;
		opacity: 0.6;
		font-size: 0.82em;
		background: none;
		border: none;
		color: inherit;
		padding: 0;
		cursor: pointer;
		font-family: inherit;
		transition: opacity 0.12s ease;
	}

	.location:hover {
		opacity: 1;
		text-decoration: underline;
	}
</style>
