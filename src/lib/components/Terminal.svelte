<script lang="ts">
	import { Session } from '../types/Session';

	let isUserTyping = false;

	let history: string[] = [];

	let sessions: Session[] = [];

	function reset() {
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

			const session = sessions[sessions.length - 1];
			isUserTyping = false;

			executeCommand(session.command);
		} else if (e.key === 'ArrowUp') {
			if (history.length > 0) {
				sessions[sessions.length - 1].command = history[history.length - 1];
			}
		}
	}

	function executeCommand(command: string) {
		const session = sessions[sessions.length - 1];

		if (command.trim() === 'clear') {
			reset();
			return;
		}

		session.output = 'Command not found';
		history = [...history, command];
		prompt();
	}

	function callFocus(input: HTMLElement) {
		input.focus();
	}

	prompt();
</script>

<div class="terminal">
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

			<div class="output">{output}</div>
		</div>
	{/each}
</div>

<style>
	.terminal {
		background-color: black;
		color: white;
		padding: 1em;
		overflow-x: hidden;
		font-family: monospace;

		height: 20rem;
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
	}
</style>
