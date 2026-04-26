<script lang="ts">
	import { Terminal } from '../types/Terminal';

	let activeInput: HTMLDivElement;

	const terminal = new Terminal();

	function callFocus(input: HTMLElement) {
		input.focus();
	}

	function focusActiveInput() {
		if (activeInput) {
			activeInput.focus();
		}
	}

	function handlePromptKeydown(e: KeyboardEvent) {
		terminal.handlePromptKeydown(e);
		terminal.sessions = terminal.sessions;
	}

	function handleTerminalKeydown(e: KeyboardEvent) {
		// Handle keyboard interaction here, e.g., trigger the same functionality as the click event.
		if (e.key === 'Enter') {
			focusActiveInput();
		}
	}
</script>

<div
	class="terminal"
	onclick={focusActiveInput}
	onkeydown={handleTerminalKeydown}
	tabindex="-1"
	role="presentation"
>
	<div class="terminal-header"></div>
	<div class="terminal-body">
		{#each terminal.sessions as { prompt, command, output }, i (i)}
			<div class="session">
				<div class="prompt">{prompt}</div>

				{#if i === terminal.sessions.length - 1 && terminal.isUserTyping}
					<div
						class="command"
						contenteditable
						bind:innerText={command}
						onkeydown={handlePromptKeydown}
						role="textbox"
						tabindex="0"
						use:callFocus
						bind:this={activeInput}
					></div>
				{:else}
					<div class="command">{command}</div>
				{/if}

				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<pre class="output">{@html output.content}</pre>
			</div>
		{/each}
	</div>
</div>

<style>
	.terminal {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		border-radius: 0.5em;
		overflow: hidden;
		height: 0;
		margin-top: 1rem;
		font-weight: bold;
		font-size: 13px;
		font-family: 'JetBrains Mono', monospace;
		border: 1px solid var(--color-border);
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
	}

	.terminal-header {
		background-color: var(--color-j);
		height: 2.2em;
		min-height: 2.2em;
		display: flex;
		align-items: center;
		padding: 0 0.9em;
		border-bottom: 1px solid var(--color-border);
	}

	.terminal-header::before {
		content: '';
		display: block;
		width: 0.65em;
		height: 0.65em;
		border-radius: 50%;
		background: #ff5f57;
		box-shadow:
			1.15em 0 0 #febc2e,
			2.3em 0 0 #28c840;
		flex-shrink: 0;
	}

	.terminal-body {
		background-color: #0d0b09;
		color: #e8e0d0;
		padding: 1em;
		overflow-x: hidden;
		flex-grow: 1;
	}

	.session {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1em;
		margin-bottom: 0.6em;
	}

	.session .prompt {
		flex-shrink: 1;
		color: var(--color-c);
	}

	.session .command {
		flex-grow: 1;
		word-break: break-all;
		border: 0px solid transparent;
		outline: 0px solid transparent;
		color: #e8e0d0;
	}

	.session .command:focus {
		border: 0px solid transparent !important;
	}

	.session .output {
		grid-column: 1 / span 2;
		white-space: pre-line;
		line-height: 1.4em;
		color: #b8b0a0;
	}
</style>
