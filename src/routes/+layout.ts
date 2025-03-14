export const prerender = true;

export const load = async ({ fetch, url }) => {
	const currentRoute = url.pathname;

	const response = await fetch('/api/misc');
	const resources = (await response.json()) as {[key: string]: string};

	return {
		currentRoute,
		resources
	};
};
