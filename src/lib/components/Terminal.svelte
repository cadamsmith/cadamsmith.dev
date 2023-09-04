<script lang="ts">
	import { Terminal as TerminalType } from '../types/Terminal';

	function callFocus(input: HTMLElement) {
		input.focus();
	}

	function handlePromptKeydown(e: KeyboardEvent) {
		terminal.handlePromptKeydown(e);
		terminal.sessions = terminal.sessions;
	}

	const terminal = new TerminalType();
</script>

<div class="terminal">
	<div class="terminal-header" />
	<div class="terminal-body">
		{#each terminal.sessions as { prompt, command, output }, i}
			<div class="session">
				<div class="prompt">{prompt}</div>

				{#if i === terminal.sessions.length - 1 && terminal.isUserTyping}
					<div
						class="command"
						contenteditable
						bind:innerText={command}
						on:keydown={handlePromptKeydown}
						role="textbox"
						tabindex="0"
						use:callFocus
					/>
				{:else}
					<div class="command">{command}</div>
				{/if}

				<pre class="output">{output}</pre>
			</div>
		{/each}
	</div>
</div>

<style>
	.terminal {
		margin: 1rem;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		border-radius: 1em;
		overflow: hidden;
		height: 0;
	}

	.terminal-header {
		background-color: #fff;
		height: 2em;
		min-height: 2em;
	}

	.terminal-body {
		background-color: black;
		color: white;
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
