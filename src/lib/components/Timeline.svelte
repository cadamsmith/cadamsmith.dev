<script lang="ts">
	import type { TimelineItem } from '$lib/types/TimelineItem';

	let { timeline } = $props<{ timeline: TimelineItem[] }>();

	let currentGroup = $state('Work');

	// format date range to be in the format of "Jan 2024 - Mar 2025"
	function formatDateRange(start: string, end: string) {
		const currentDate = new Date();
		const startDate = new Date(start);
		const endDate = new Date(end);

		// Set all times to midnight for accurate day comparison
		currentDate.setHours(0, 0, 0, 0);
		startDate.setHours(0, 0, 0, 0);
		endDate.setHours(0, 0, 0, 0);

		// need to only check based on days, fix it
		if (endDate >= currentDate) {
			return (
				startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) + ' - Present'
			);
		}
		return (
			startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) +
			' - ' +
			endDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
		);
	}

	function formatTimelineRange(dateRanges: [string, string][]) {
		return dateRanges.map((dateRange) => formatDateRange(dateRange[0], dateRange[1])).join(', ');
	}

	function handleGroupChange(group: string) {
		currentGroup = group;
	}
</script>

<div class="timeline-selector">
	<button class:selected={currentGroup === 'Work'} onclick={() => handleGroupChange('Work')}
		>Work</button
	>
	<button
		class:selected={currentGroup === 'Education'}
		onclick={() => handleGroupChange('Education')}>Education</button
	>
</div>

<div class="timeline">
	{#each timeline as timelineItem}
		<div class="timeline-item" class:selected={timelineItem.group === currentGroup}>
			<div class="timeline-item-left">
				<div class="timeline-item-bar"></div>
				<div class="img-wrapper">
					<img src="/images/generic_skill.svg" alt="Generic Skill" />
				</div>
			</div>
			<div class="timeline-item-right">
				<p>{formatTimelineRange(timelineItem.dates)}</p>
				<h3>{timelineItem.company}</h3>
				<p>{timelineItem.title}</p>
			</div>
		</div>
	{/each}
</div>

<style>
	.timeline-selector {
		width: 100%;
		display: flex;
		gap: 0.5em;
		border: 2px solid #000;
		padding: 0.2rem;
		margin-bottom: 0.5rem;
		background-color: var(--color-i);
	}

	.timeline-selector button {
		flex-grow: 1;
		background-color: transparent;
		border: none;
		padding: 0.2rem;
		cursor: pointer;
		font-weight: bold;
	}

	.timeline-selector button:hover {
		background-color: var(--color-j);
		color: #fff;
	}

	.timeline-selector button.selected {
		background-color: #000;
		color: #fff;
	}

	h3 {
		font-size: 1.05em;
		margin: 0;
		text-transform: uppercase;
	}

	p {
		margin: 0;
	}

	.timeline {
		border: 2px solid #000;
		padding: 0 1rem;
		width: 100%;
		background-color: var(--color-k);
		color: #fff;
	}

	.timeline-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
	}

	.timeline-item:not(.selected) {
		display: none;
	}

	.timeline-item-left {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		align-self: stretch;
	}

	.timeline-item-bar {
		position: absolute;
		top: 0;
		left: 50%;
		width: 2px;
		height: 100%;
		background-color: #fff;
	}

	.timeline-item .img-wrapper {
		width: 2rem;
		height: 2rem;
		background-color: #000;
		border: 2px solid #fff;
		border-radius: 50%;
		padding: 0.3rem;
		z-index: 1;
	}

	.timeline-item .img-wrapper img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.timeline-item-right {
		padding: 0.5rem 0;
	}
</style>
