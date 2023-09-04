<script lang="ts">
	import { Session } from '../types/Session';

	let isUserTyping = false;

	let history: string[] = [];
	let sessions: Session[] = [];

	function init() {
		prompt();
		sessions[0].command = 'welcome';
		executeCommand();
	}

	function clear() {
		sessions = [];
		prompt();
	}

	function prompt() {
		sessions = [...sessions, new Session('$')];
		isUserTyping = true;
	}

	function handlePromptKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault();
			isUserTyping = false;

			executeCommand();
		} else if (e.key === 'ArrowUp') {
			if (history.length > 0) {
				sessions[sessions.length - 1].command = history[history.length - 1];
			}
		}
	}

	function executeCommand() {
		const session = sessions[sessions.length - 1];
		const command = session.command.trim();

		if (command === 'clear') {
			clear();
			return;
		}

		switch (command) {
			case 'welcome':
				session.output = `┻━┻ ︵ヽ(\`Д´)ﾉ ︵ ┻━┻\n
					Welcome to my website!\n
					Enter \`help\` to see all terminal commands
				`;
				break;
			case 'help':
				session.output = 'Available commands: welcome, clear, help';
				break;
			default:
				session.output = 'Command not found';
				break;
		}

		history = [...history, command];
		prompt();
	}

	function callFocus(input: HTMLElement) {
		input.focus();
	}

	init();
</script>

<div class="terminal">
	<div class="terminal-header" />
	<div class="terminal-body">
		{#each sessions as { prompt, command, output }, i}
			<div class="session">
				<div class="prompt">{prompt}</div>

				{#if i === sessions.length - 1 && isUserTyping}
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
