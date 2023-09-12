import { Commands } from './Commands';
import { Session } from './Session';
import type { Option } from './shared/Option';
import { Some } from './shared/Some';
import { None } from './shared/None';

export class Terminal {
	history: string[] = [];
	historyIndex = -1;

	sessions: Session[] = [];
	isUserTyping = false;

	get currentHistory(): Option<string> {
		if (this.historyIndex < 0) {
			return new None();
		}

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
		this.sessions = [...this.sessions, new Session('$')];
		this.isUserTyping = true;
	}

	handlePromptKeydown(e: KeyboardEvent) {
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
				// Reset historyIndex
				this.historyIndex = -1;
				break;
			}
		}
	}

	recallPrevHistory() {
		if (this.historyIndex >= this.history.length - 1) {
			return;
		}

		this.historyIndex++;

		if (!(this.currentHistory instanceof None)) {
			const currentHistory = <Some<string>>this.currentHistory;
			this.sessions[this.sessions.length - 1].command = currentHistory.value;
		}
	}

	recallNextHistory() {
		if (this.historyIndex < 1) {
			return;
		}

		this.historyIndex--;

		if (!(this.currentHistory instanceof None)) {
			const currentHistory = <Some<string>>this.currentHistory;
			this.sessions[this.sessions.length - 1].command = currentHistory.value;
		}
	}

	executeCommand() {
		const session = this.sessions[this.sessions.length - 1];
		const command = session.command.trim();

		if (command === 'clear') {
			this.clear();
			return;
		}

		switch (command) {
			case 'welcome':
				Commands.welcome(session.output);
				break;
			case 'help':
				Commands.help(session.output);
				break;
			default:
				session.output.content = 'Command not found';
				break;
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
