import type { Option } from './shared/Option';
import { Some } from './shared/Some';
import { None } from './shared/None';
import { Direction } from './Direction';

export class Terminal {
	history: string[] = [];
	historyIndex = -1;

	sessions: TerminalSession[] = [];
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
		this.sessions = [...this.sessions, new TerminalSession('$')];
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
				TerminalCommands.welcome(session.output);
				break;
			case 'help':
				TerminalCommands.help(session.output);
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

class TerminalOutput {
	content: string;

	constructor() {
		this.content = '';
	}
}

class TerminalSession {
	prompt: string;
	command: string;
	output: TerminalOutput;

	constructor(prompt: string) {
		this.prompt = prompt;

		this.command = '';
		this.output = new TerminalOutput();
	}
}

class TerminalCommands {
	static welcome(output: TerminalOutput) {
		output.content = `┻━┻ ︵ヽ(\`Д´)ﾉ ︵ ┻━┻\n
            Welcome to my website!\n
            Enter \`help\` to see all terminal commands`;
	}

	static help(output: TerminalOutput) {
		output.content = 'Available commands: welcome, clear, 2048, help';
	}
}


class TwentyFortyEight {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    hasWon = false;

    winValue = 2048;

    public init() : string {
        this.reset();
        this.initialSeed();

        return this.toString();
	}

    public shift(direction: Direction): string {
        for (let i = 0; i < 4; i++) {
            this.shiftColumn(i, direction);
            this.shiftRow(i, direction);
        }

        // every move, a random available cell is filled (if any cells are available)
        const [x, y] = this.getRandomAvailableSpace();
        if (x !== -1) {
            // 10% chance of spawning a 4
            // 90% chance of spawning a 2
            const isFour = Math.random() < 0.1;
            const cellValue = isFour ? 4 : 2;

            this.setSpace([x, y], cellValue);
        }

        return this.toString();
    }

    shiftRow(row: number, direction: Direction) {
        if (direction === Direction.Up || direction === Direction.Down) {
            return;
        }

        // filter out zeroes
        let values = this.board[row].filter(n => n !== 0);

        if (direction === Direction.Right) {
            values = values.reverse();
        }

        // combine adjacent equal values
        for (let i = 0; i < values.length - 1; i++) {
            if (values[i] === values[i + 1]) {
                const sum = values[i] * 2;
                if (sum >= this.winValue) {
                    this.hasWon = true;
                }

                values[i] = sum;
                values[i + 1] = 0;
            }
        }

        // Filter out zeros again after combining
        values = values.filter(n => n !== 0);

        // Add zeros to the end to maintain the row length of 4
        while (values.length < 4) {
            values.push(0);
        }

        // Reverse the values if the direction is right
        if (direction === Direction.Right) {
            values = values.reverse();
        }

        this.board[row] = values;
    }

    shiftColumn(col: number, direction: Direction) {
        if (direction === Direction.Left || direction === Direction.Right) {
            return;
        }

        let values: number[] = [];

        for (let row = 0; row < 4; row++) {
            const value = this.board[row][col];

            if (value !== 0) {
                values.push(this.board[row][col]);
            }
        }

        if (direction === Direction.Down) {
            values = values.reverse();
        }

        // combine adjacent equal values
        for (let i = 0; i < values.length - 1; i++) {
            if (values[i] === values[i + 1]) {
                const sum = values[i] * 2;
                if (sum >= this.winValue) {
                    this.hasWon = true;
                }

                values[i] = sum;
                values[i + 1] = 0;
            }
        }

        // Filter out zeros after combining
        values = values.filter(n => n !== 0);

        // Add zeros to the end to maintain the row length of 4
        while (values.length < 4) {
            values.push(0);
        }

        if (direction === Direction.Down) {
            values = values.reverse();
        }

        for (let row = 0; row < 4; row++) {
            this.board[row][col] = values[row];
        }
    }

    public toString(): string {
        return this.board.map(
                row => row.map(n => this.prettyPrintValue(n)).join(' | ')
            )
            .join('\n\n---------------------------------\n\n');
    }

    prettyPrintValue(value: number): string {
        const stringValue = ` ${value.toString().padStart(4, ' ')} `;

        return `<span class=\"game-cell game-cell-${value}\">${stringValue}</span>`;
    }

    reset() {
        this.hasWon = false;

        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                this.board[row][col] = 0;
            }
        }
    }

    initialSeed() {
        // initial seed: put a 2 in 2 random spots on the board
        const [x1, y1] = this.getRandomAvailableSpace();

        let x2, y2;
        do {
            [x2, y2] = this.getRandomAvailableSpace();
        }
        while (x1 === x2 && y1 === y2);

        this.setSpace([x1, y1], 2);
        this.setSpace([x2, y2], 2);
    }

    setSpace([x, y]: [number, number], value: number) {
        this.board[x][y] = value;
    }

    getRandomAvailableSpace(): [number, number] {
        const availableSpaces = this.getAvailableSpaces();
        if (availableSpaces.length === 0) {
            return [-1, -1];
        }

        const randomIndex = Math.floor(Math.random() * availableSpaces.length);
        return availableSpaces[randomIndex];
    }

    getAvailableSpaces(): [number, number][] {
        const available: [number, number][] = [];
    
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === 0) {
                    available.push([row, col]);
                }
            }
        }
        
        return available;
    }
}
