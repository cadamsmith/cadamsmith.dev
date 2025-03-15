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
		{#each terminal.sessions as { prompt, command, output }, i}
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
		border-radius: 1em;
		overflow: hidden;
		height: 0;
		margin-top: 1rem;
		font-weight: bold;
	}

	.terminal-header {
		background-color: #fff;
		height: 2em;
		min-height: 2em;
	}

	.terminal-body {
		background-color: #000;
		color: #fff;
		padding: 1em;
		overflow-x: hidden;
		font-family: monospace;

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
	}

	.session .command {
		flex-grow: 1;
		word-break: break-all;
		border: 0px solid transparent;
		outline: 0px solid transparent;
	}

	.session .command:focus {
		border: 0px solid transparent !important;
	}

	.session .output {
		grid-column: 1 / span 2;
		white-space: pre-line;
		line-height: 0.7em;
	}
</style>
