import type { Output } from './Output';

export class Commands {
	static welcome(output: Output) {
		output.content = `┻━┻ ︵ヽ(\`Д´)ﾉ ︵ ┻━┻\n
            Welcome to my website!\n
            Enter \`help\` to see all terminal commands`;
	}

	static help(output: Output) {
		output.content = 'Available commands: welcome, clear, 2048, help';
	}
}
