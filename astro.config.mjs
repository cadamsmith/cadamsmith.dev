import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
	integrations: [svelte()],
	adapter: cloudflare(),
	output: 'static'
});
