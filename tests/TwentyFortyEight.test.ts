import { describe, it, expect, beforeEach } from 'vitest';
import { TwentyFortyEight } from '../src/lib/types/terminal/TwentyFortyEight';
import type { TerminalOutput } from '../src/lib/types/terminal/TerminalSession';

function makeOutput(): TerminalOutput {
	return { content: '' };
}

function makeKey(key: string): KeyboardEvent {
	return { key } as KeyboardEvent;
}

interface TwentyFortyEightInternal {
	board: number[][];
}

function getBoard(game: TwentyFortyEight): number[][] {
	return (game as unknown as TwentyFortyEightInternal).board;
}

function setBoard(game: TwentyFortyEight, board: number[][]): void {
	(game as unknown as TwentyFortyEightInternal).board = board;
}

describe('TwentyFortyEight', () => {
	let game: TwentyFortyEight;

	beforeEach(() => {
		game = new TwentyFortyEight();
	});

	describe('initial state', () => {
		it('starts with isOver = false', () => {
			expect(game.isOver).toBe(false);
		});

		it('seeds the board with exactly 2 tiles', () => {
			const nonZero = getBoard(game)
				.flat()
				.filter((n) => n !== 0);
			expect(nonZero).toHaveLength(2);
		});

		it('seeds tiles with value 2 or 4', () => {
			const nonZero = getBoard(game)
				.flat()
				.filter((n) => n !== 0);
			nonZero.forEach((n) => expect([2, 4]).toContain(n));
		});
	});

	describe('handleCommand', () => {
		it('"q" sets isOver and returns true', () => {
			const consumed = game.handleCommand('q', makeOutput());
			expect(consumed).toBe(true);
			expect(game.isOver).toBe(true);
		});

		it('"q" output contains quit message', () => {
			const output = makeOutput();
			game.handleCommand('q', output);
			expect(output.content).toContain('quit');
		});

		it('unknown command returns false and leaves isOver unchanged', () => {
			const consumed = game.handleCommand('foo', makeOutput());
			expect(consumed).toBe(false);
			expect(game.isOver).toBe(false);
		});
	});

	describe('shifting — left', () => {
		it('compresses tiles to the left', () => {
			setBoard(game, [
				[0, 0, 0, 2],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0]
			]);
			game.handleKeydown(makeKey('ArrowLeft'), makeOutput());
			expect(getBoard(game)[0][0]).toBe(2);
		});

		it('merges equal adjacent tiles', () => {
			setBoard(game, [
				[2, 2, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0]
			]);
			game.handleKeydown(makeKey('ArrowLeft'), makeOutput());
			expect(getBoard(game)[0][0]).toBe(4);
			expect(
				getBoard(game)
					.flat()
					.filter((n) => n !== 0)
			).toHaveLength(2);
		});

		it('does not cascade merges in a single shift', () => {
			// [2, 2, 4, 0] → merge 2+2=4, then 4 and 4 should NOT merge
			setBoard(game, [
				[2, 2, 4, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0]
			]);
			game.handleKeydown(makeKey('ArrowLeft'), makeOutput());
			expect(getBoard(game)[0][0]).toBe(4);
			expect(getBoard(game)[0][1]).toBe(4);
		});

		it('merges left-to-right order (first pair wins)', () => {
			// [2, 2, 2, 0] → first 2+2 merge, leftover 2 stays
			setBoard(game, [
				[2, 2, 2, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0]
			]);
			game.handleKeydown(makeKey('ArrowLeft'), makeOutput());
			expect(getBoard(game)[0][0]).toBe(4);
			expect(getBoard(game)[0][1]).toBe(2);
		});
	});

	describe('shifting — right', () => {
		it('compresses tiles to the right', () => {
			setBoard(game, [
				[2, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0]
			]);
			game.handleKeydown(makeKey('ArrowRight'), makeOutput());
			expect(getBoard(game)[0][3]).toBe(2);
		});

		it('merges equal tiles toward the right', () => {
			setBoard(game, [
				[0, 0, 2, 2],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0]
			]);
			game.handleKeydown(makeKey('ArrowRight'), makeOutput());
			expect(getBoard(game)[0][3]).toBe(4);
			expect(
				getBoard(game)
					.flat()
					.filter((n) => n !== 0)
			).toHaveLength(2);
		});
	});

	describe('shifting — up', () => {
		it('compresses tiles upward', () => {
			setBoard(game, [
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[2, 0, 0, 0]
			]);
			game.handleKeydown(makeKey('ArrowUp'), makeOutput());
			expect(getBoard(game)[0][0]).toBe(2);
		});

		it('merges equal tiles upward', () => {
			setBoard(game, [
				[2, 0, 0, 0],
				[2, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0]
			]);
			game.handleKeydown(makeKey('ArrowUp'), makeOutput());
			expect(getBoard(game)[0][0]).toBe(4);
			expect(
				getBoard(game)
					.flat()
					.filter((n) => n !== 0)
			).toHaveLength(2);
		});
	});

	describe('shifting — down', () => {
		it('compresses tiles downward', () => {
			setBoard(game, [
				[2, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0]
			]);
			game.handleKeydown(makeKey('ArrowDown'), makeOutput());
			expect(getBoard(game)[3][0]).toBe(2);
		});

		it('merges equal tiles downward', () => {
			setBoard(game, [
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[2, 0, 0, 0],
				[2, 0, 0, 0]
			]);
			game.handleKeydown(makeKey('ArrowDown'), makeOutput());
			expect(getBoard(game)[3][0]).toBe(4);
			expect(
				getBoard(game)
					.flat()
					.filter((n) => n !== 0)
			).toHaveLength(2);
		});
	});

	describe('tile spawning', () => {
		it('spawns a new tile after a move that changes the board', () => {
			setBoard(game, [
				[2, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0]
			]);
			game.handleKeydown(makeKey('ArrowRight'), makeOutput());
			const nonZero = getBoard(game)
				.flat()
				.filter((n) => n !== 0);
			expect(nonZero).toHaveLength(2); // shifted tile + new spawn
		});

		it('does not spawn a tile when the board does not change', () => {
			// Already fully compressed left — ArrowLeft is a no-op
			setBoard(game, [
				[2, 4, 8, 16],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0]
			]);
			game.handleKeydown(makeKey('ArrowLeft'), makeOutput());
			const nonZero = getBoard(game)
				.flat()
				.filter((n) => n !== 0);
			expect(nonZero).toHaveLength(4);
		});
	});

	describe('win condition', () => {
		it('sets isOver when a merge produces 2048', () => {
			setBoard(game, [
				[1024, 1024, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0]
			]);
			const output = makeOutput();
			game.handleKeydown(makeKey('ArrowLeft'), output);
			expect(game.isOver).toBe(true);
			expect(output.content).toContain('win');
		});
	});

	describe('loss condition', () => {
		it('sets isOver when no moves remain', () => {
			// Full board, no adjacent equal tiles
			setBoard(game, [
				[2, 4, 2, 4],
				[4, 2, 4, 2],
				[2, 4, 2, 4],
				[4, 2, 4, 2]
			]);
			const output = makeOutput();
			game.handleKeydown(makeKey('ArrowLeft'), output);
			expect(game.isOver).toBe(true);
			expect(output.content).toContain('lost');
		});

		it('does not lose when adjacent equal tiles exist', () => {
			setBoard(game, [
				[2, 2, 4, 8],
				[4, 8, 16, 32],
				[8, 16, 32, 64],
				[16, 32, 64, 128]
			]);
			game.handleKeydown(makeKey('ArrowLeft'), makeOutput());
			expect(game.isOver).toBe(false);
		});
	});

	describe('render', () => {
		it('includes arrow key instructions', () => {
			const output = makeOutput();
			game.render(output);
			expect(output.content).toContain('arrow keys');
		});

		it('includes quit instructions', () => {
			const output = makeOutput();
			game.render(output);
			expect(output.content).toContain('"q"');
		});
	});
});
