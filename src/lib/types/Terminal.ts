import { Commands } from './Commands';
import { Session } from './Session';
import type { Option } from './shared/Option';
import { Some } from './shared/Some';
import { None } from './shared/None';
import { TwentyFortyEight } from './TwentyFortyEight';
import { Direction } from './Direction';

export class Terminal {
	history: string[] = [];
	historyIndex = -1;

	sessions: Session[] = [];
	isUserTyping = false;

	twentyFortyEightGame = new TwentyFortyEight();
	isPlaying2048 = false;

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
		if (this.isPlaying2048) {
			return this.handlePromptKeydownIn2048(e);
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
				// Reset historyIndex
				this.historyIndex = -1;
				break;
			}
		}
	}

	handlePromptKeydownIn2048(e: KeyboardEvent) {
		const session = this.sessions[this.sessions.length - 2];

		switch (e.key) {
			case 'Enter': {
				e.preventDefault();

				this.executeCommand();
				break;
			}
			case 'ArrowUp': {
				session.output.content = `Use your arrow keys (↑, ↓, ←, →) to move the tiles.\n
					Join the tiles, get to 2048!\n
					${this.twentyFortyEightGame.shift(Direction.Up)}\n
					Enter \"q\" to quit the game`;
				break;
			}
			case 'ArrowDown': {
				session.output.content = `Use your arrow keys (↑, ↓, ←, →) to move the tiles.\n
					Join the tiles, get to 2048!\n
					${this.twentyFortyEightGame.shift(Direction.Down)}\n
					Enter \"q\" to quit the game`;
				break;
			}
			case 'ArrowLeft': {
				session.output.content = `Use your arrow keys (↑, ↓, ←, →) to move the tiles.\n
					Join the tiles, get to 2048!\n
					${this.twentyFortyEightGame.shift(Direction.Left)}\n
					Enter \"q\" to quit the game`;
				break;
			}
			case 'ArrowRight': {
				session.output.content = `Use your arrow keys (↑, ↓, ←, →) to move the tiles.\n
					Join the tiles, get to 2048!\n
					${this.twentyFortyEightGame.shift(Direction.Right)}\n
					Enter \"q\" to quit the game`;
				break;
			}
			default: {
				break;
			}
		}

		if (this.twentyFortyEightGame.hasWon) {
			this.isPlaying2048 = false;
			session.output.content += '\n\nYou win! Thanks for playing!';
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
		if (this.isPlaying2048) {
			return this.executeCommandIn2048();
		}

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
			case '2048':
				this.isPlaying2048 = true;
				session.output.content = `Use your arrow keys (↑, ↓, ←, →) to move the tiles.\n
					Join the tiles, get to 2048!\n
					${this.twentyFortyEightGame.init()}\n
					Enter \"q\" to quit the game`;
				break;
			default:
				session.output.content = 'Command not found';
				break;
		}

		this.history = [...this.history, command];
		this.historyIndex = -1;
		this.prompt();
	}

	executeCommandIn2048() {
		const session = this.sessions[this.sessions.length - 1];
		const command = session.command.trim();

		switch (command) {
			case 'q':
				this.isPlaying2048 = false;
				session.output.content = 'You quit the game. Thanks for playing!';
				this.prompt();
				break;
			default:
				break;
		}
	}

	clear() {
		this.sessions = [];
		this.prompt();
	}
}
