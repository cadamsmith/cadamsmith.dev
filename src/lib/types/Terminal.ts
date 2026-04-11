import type { Option } from './shared/Option';
import { Some } from './shared/Some';
import { None } from './shared/None';
import type { Game } from './terminal/Game';
import { TerminalOutput, TerminalSession } from './terminal/TerminalSession';
import { TwentyFortyEight } from './terminal/TwentyFortyEight';

export { TerminalOutput, TerminalSession };

type CommandHandler = (output: TerminalOutput) => void;

const COMMANDS: Record<string, CommandHandler> = {
	welcome: (output) => {
		output.content = `┻━┻ ︵ヽ(\`Д´)ﾉ ︵ ┻━┻
            Welcome to my website!
            Enter \`help\` to see all terminal commands`;
	},
	help: (output) => {
		output.content = `Available commands: ${Object.keys(COMMANDS).join(', ')}, clear`;
	},
	'2048': (output) => {
		// Handled specially in Terminal — this entry exists only so `help` lists it.
		output.content = '';
	}
};

export class Terminal {
	history: string[] = [];
	historyIndex = -1;

	sessions: TerminalSession[] = [];
	isUserTyping = false;

	private activeGame: Game | null = null;

	get currentHistory(): Option<string> {
		if (this.historyIndex < 0) return new None();
		const command = this.history[this.history.length - this.historyIndex - 1];
		return new Some(command);
	}

	constructor() {
		this.init();
	}

	public init() {
		this.prompt();
		this.sessions[0].command = 'welcome';
		this.executeCommand();
	}

	public prompt() {
		this.sessions = [...this.sessions, new TerminalSession('$')];
		this.isUserTyping = true;
	}

	handlePromptKeydown(e: KeyboardEvent) {
		const activeSession = this.sessions[this.sessions.length - 2];

		if (this.activeGame) {
			if (e.key === 'Enter') {
				e.preventDefault();
				this.isUserTyping = false;
				this.executeCommand();
			} else {
				this.activeGame.handleKeydown(e, activeSession.output);

				if (this.activeGame.isOver) {
					this.activeGame = null;
					this.prompt();
				}
			}
			return;
		}

		switch (e.key) {
			case 'Enter': {
				e.preventDefault();
				this.isUserTyping = false;
				this.executeCommand();
				break;
			}
			case 'ArrowUp': {
				this.recallPrevHistory();
				break;
			}
			case 'ArrowDown': {
				this.recallNextHistory();
				break;
			}
			default: {
				this.historyIndex = -1;
				break;
			}
		}
	}

	recallPrevHistory() {
		if (this.historyIndex >= this.history.length - 1) return;
		this.historyIndex++;
		const h = this.currentHistory;
		if (h instanceof Some) {
			this.sessions[this.sessions.length - 1].command = h.value;
		}
	}

	recallNextHistory() {
		if (this.historyIndex < 1) return;
		this.historyIndex--;
		const h = this.currentHistory;
		if (h instanceof Some) {
			this.sessions[this.sessions.length - 1].command = h.value;
		}
	}

	executeCommand() {
		const session = this.sessions[this.sessions.length - 1];
		const command = session.command.trim();

		// Let an active game handle the command first (e.g. "q" to quit)
		if (this.activeGame) {
			const consumed = this.activeGame.handleCommand(command, session.output);
			if (this.activeGame.isOver) {
				this.activeGame = null;
				this.prompt();
			} else if (consumed) {
				this.prompt();
			}
			return;
		}

		if (command === 'clear') {
			this.clear();
			return;
		}

		if (command === '2048') {
			this.activeGame = new TwentyFortyEight();
			this.activeGame.render(session.output);
			this.history = [...this.history, command];
			this.historyIndex = -1;
			this.prompt();
			return;
		}

		const handler = COMMANDS[command];
		if (handler) {
			handler(session.output);
		} else {
			session.output.content = 'Command not found';
		}

		this.history = [...this.history, command];
		this.historyIndex = -1;
		this.prompt();
	}

	clear() {
		this.sessions = [];
		this.prompt();
	}
}
