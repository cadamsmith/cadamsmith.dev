export class Session {
	prompt: string;
	command: string;
	output: string;

	constructor(prompt: string) {
		this.prompt = prompt;

		this.command = '';
		this.output = '';
	}
}
