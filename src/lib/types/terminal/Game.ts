import type { TerminalOutput } from './TerminalSession';

export interface Game {
	/** Render the current game state into the given output. */
	render(output: TerminalOutput): void;
	/** Handle a keydown event. Returns true if the game consumed the event. */
	handleKeydown(e: KeyboardEvent, output: TerminalOutput): void;
	/** Handle a submitted command string (e.g. "q" to quit). Returns true if the game consumed it. */
	handleCommand(command: string, output: TerminalOutput): boolean;
	/** Whether the game has ended and control should return to the shell. */
	readonly isOver: boolean;
}
