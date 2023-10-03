import { redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';

export function load() {
	const inConstruction = !dev;

	if (inConstruction) {
		throw redirect(307, '/construction');
	}
}
