export const load = async ({ fetch }) => {
	const response = await fetch(`/api/categories`);
	const categories: { name: string; count: number }[] = await response.json();

	return {
		categories
	};
};
