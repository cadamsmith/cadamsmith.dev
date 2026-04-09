export class TerminalOutput {
	content: string;

	constructor() {
		this.content = '';
	}
}

export class TerminalSession {
	prompt: string;
	command: string;
	output: TerminalOutput;

	constructor(prompt: string) {
		this.prompt = prompt;
		this.command = '';
		this.output = new TerminalOutput();
	}
}
