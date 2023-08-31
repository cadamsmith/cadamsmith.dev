export async function load({ params }: { params: { slug: string } }) {
	const post = await import(`../${params.slug}.md`);
	const { title, date, categories } = post.metadata;
	const Content = post.default;

	return {
		Content,
		title,
		date,
		categories
	};
}
