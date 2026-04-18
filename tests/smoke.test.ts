import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { spawn, type ChildProcess } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const PORT = 8792;
const BASE_URL = `http://localhost:${PORT}`;
const DIST_SERVER = resolve('dist/server');

let proc: ChildProcess;

async function waitForServer(url: string, timeoutMs: number): Promise<void> {
	const deadline = Date.now() + timeoutMs;
	while (Date.now() < deadline) {
		try {
			const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
			if (res.status < 500) return;
		} catch {
			// server not ready yet, keep polling
		}
		await new Promise((r) => setTimeout(r, 500));
	}
	throw new Error(`Server at ${url} did not start within ${timeoutMs}ms`);
}

beforeAll(async () => {
	if (!existsSync(DIST_SERVER)) {
		throw new Error(
			'dist/server not found — run npm run build before npm run test:smoke'
		);
	}

	proc = spawn(
		'npx',
		['wrangler', 'dev', 'entry.mjs', '--config', 'wrangler.json', '--port', String(PORT)],
		{
			cwd: DIST_SERVER,
			stdio: ['ignore', 'pipe', 'pipe'],
			env: { ...process.env, NO_COLOR: '1', WRANGLER_LOG: 'warn' }
		}
	);

	proc.stderr?.on('data', (chunk: Buffer) => process.stderr.write(chunk));

	await waitForServer(BASE_URL, 30_000);
}, 60_000);

afterAll(() => {
	proc?.kill('SIGTERM');
});

describe('smoke', () => {
	it('homepage returns 200', async () => {
		const res = await fetch(BASE_URL);
		expect(res.status).toBe(200);
	});

	it('homepage contains expected content', async () => {
		const res = await fetch(BASE_URL);
		const html = await res.text();
		expect(html).toContain('Adam Smith');
		expect(html).toContain('Technologies');
		expect(html).toContain('My Journey');
		expect(html).toContain('Contact Me');
	});

	it('static assets are served', async () => {
		const homepageRes = await fetch(BASE_URL);
		const html = await homepageRes.text();

		const cssMatch = html.match(/href="(\/_astro\/[^"]+\.css)"/);
		expect(cssMatch, 'homepage should reference a CSS asset').toBeTruthy();

		const cssRes = await fetch(`${BASE_URL}${cssMatch![1]}`);
		expect(cssRes.status).toBe(200);
		expect(cssRes.headers.get('content-type')).toContain('text/css');
	});

	it('unknown routes return 404 not 500', async () => {
		const res = await fetch(`${BASE_URL}/this-page-does-not-exist`);
		expect(res.status).toBe(404);
	});
});
