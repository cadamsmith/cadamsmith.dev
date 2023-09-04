import { Commands } from './Commands';
import { Session } from './Session';

export class Terminal {
	history: string[] = [];
	sessions: Session[] = [];
	isUserTyping = false;

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
		console.log(e);
		switch (e.key) {
			case 'Enter': {
				e.preventDefault();
				this.isUserTyping = false;

				this.executeCommand();
				break;
			}
			case 'ArrowUp': {
				if (this.history.length > 0) {
					this.recallHistory();
				}
				break;
			}
			default: {
				break;
			}
		}
	}

	recallHistory() {
		this.sessions[this.sessions.length - 1].command = this.history[this.history.length - 1];
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
		this.prompt();
	}

	clear() {
		this.sessions = [];
		this.prompt();
	}
}
