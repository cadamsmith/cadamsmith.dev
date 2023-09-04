import { Output } from './Output';

export class Session {
	prompt: string;
	command: string;
	output: Output;

	constructor(prompt: string) {
		this.prompt = prompt;

		this.command = '';
		this.output = new Output();
	}
}
