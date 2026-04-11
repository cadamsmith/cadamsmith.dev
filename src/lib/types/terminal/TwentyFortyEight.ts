import { Direction } from '../Direction';
import type { Game } from './Game';
import type { TerminalOutput } from './TerminalSession';

export class TwentyFortyEight implements Game {
	private board = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];

	private hasWon = false;
	private lost = false;
	private readonly winValue = 2048;

	get isOver(): boolean {
		return this.hasWon || this.lost;
	}

	constructor() {
		this.reset();
		this.initialSeed();
	}

	render(output: TerminalOutput): void {
		output.content = `Get to 2048! Use your arrow keys (↑, ↓, ←, →)
${this.toString()}
Enter "q" to quit the game`;
	}

	handleKeydown(e: KeyboardEvent, output: TerminalOutput): void {
		const directionMap: Partial<Record<string, Direction>> = {
			ArrowUp: Direction.Up,
			ArrowDown: Direction.Down,
			ArrowLeft: Direction.Left,
			ArrowRight: Direction.Right
		};

		const direction = directionMap[e.key];
		if (direction === undefined) return;

		this.shift(direction);
		this.render(output);

		if (this.hasWon) {
			output.content += '\nYou win! Thanks for playing!';
		} else if (this.isLost()) {
			this.lost = true;
			output.content += '\nYou lost! Thanks for playing!';
		}
	}

	handleCommand(command: string, output: TerminalOutput): boolean {
		if (command === 'q') {
			output.content = 'You quit the game. Thanks for playing!';
			this.lost = true; // mark as over so the shell takes back control
			return true;
		}
		return false;
	}

	private shift(direction: Direction): void {
		const oldBoard = this.board.map((row) => [...row]);

		for (let i = 0; i < 4; i++) {
			this.shiftColumn(i, direction);
			this.shiftRow(i, direction);
		}

		const boardChanged = this.board.some((row, i) =>
			row.some((cell, j) => cell !== oldBoard[i][j])
		);

		if (boardChanged) {
			const [x, y] = this.getRandomAvailableSpace();
			if (x !== -1) {
				this.setSpace([x, y], Math.random() < 0.1 ? 4 : 2);
			}
		}
	}

	private mergeValues(values: number[]): number[] {
		values = values.filter((n) => n !== 0);
		for (let i = 0; i < values.length - 1; i++) {
			if (values[i] === values[i + 1]) {
				const sum = values[i] * 2;
				if (sum >= this.winValue) this.hasWon = true;
				values[i] = sum;
				values[i + 1] = 0;
			}
		}
		values = values.filter((n) => n !== 0);
		while (values.length < 4) values.push(0);
		return values;
	}

	private shiftRow(row: number, direction: Direction): void {
		if (direction === Direction.Up || direction === Direction.Down) return;

		let values = this.board[row];
		if (direction === Direction.Right) values = values.reverse();
		values = this.mergeValues(values);
		if (direction === Direction.Right) values = values.reverse();

		this.board[row] = values;
	}

	private shiftColumn(col: number, direction: Direction): void {
		if (direction === Direction.Left || direction === Direction.Right) return;

		let values = this.board.map((row) => row[col]);
		if (direction === Direction.Down) values = values.reverse();
		values = this.mergeValues(values);
		if (direction === Direction.Down) values = values.reverse();

		for (let row = 0; row < 4; row++) {
			this.board[row][col] = values[row];
		}
	}

	private isLost(): boolean {
		if (this.getAvailableSpaces().length !== 0) return false;

		for (let row = 0; row < 4; row++) {
			for (let col = 0; col < 4; col++) {
				if (col < 3 && this.board[row][col] === this.board[row][col + 1]) return false;
				if (row < 3 && this.board[row][col] === this.board[row + 1][col]) return false;
			}
		}

		return true;
	}

	private toString(): string {
		return this.board
			.map((row) => row.map((n) => this.prettyPrintValue(n)).join(' | '))
			.join('\n---------------------------------\n');
	}

	private prettyPrintValue(value: number): string {
		const stringValue = ` ${value.toString().padStart(4, ' ')} `;
		return `<span class="game-cell game-cell-${value}">${stringValue}</span>`;
	}

	private reset(): void {
		this.hasWon = false;
		this.lost = false;
		this.board = Array.from({ length: 4 }, () => [0, 0, 0, 0]);
	}

	private initialSeed(): void {
		const [x1, y1] = this.getRandomAvailableSpace();
		let x2, y2;
		do {
			[x2, y2] = this.getRandomAvailableSpace();
		} while (x1 === x2 && y1 === y2);

		this.setSpace([x1, y1], 2);
		this.setSpace([x2, y2], 2);
	}

	private setSpace([x, y]: [number, number], value: number): void {
		this.board[x][y] = value;
	}

	private getRandomAvailableSpace(): [number, number] {
		const spaces = this.getAvailableSpaces();
		if (spaces.length === 0) return [-1, -1];
		return spaces[Math.floor(Math.random() * spaces.length)];
	}

	private getAvailableSpaces(): [number, number][] {
		const available: [number, number][] = [];
		for (let row = 0; row < 4; row++) {
			for (let col = 0; col < 4; col++) {
				if (this.board[row][col] === 0) available.push([row, col]);
			}
		}
		return available;
	}
}
