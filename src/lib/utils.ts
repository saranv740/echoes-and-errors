import type { Post } from "./types";

type DateStyle = Intl.DateTimeFormatOptions["dateStyle"];

export function formatDate(date: string, dateStyle: DateStyle = "medium", locale = "en-IN") {
	const dateToFormat = new Date(date.replaceAll("-", "/"));
	const dateFormatter = Intl.DateTimeFormat(locale, { dateStyle });
	return dateFormatter.format(dateToFormat);
}

export async function getPosts() {
	let posts: Post[] = [];
	const paths = import.meta.glob("/src/posts/*.md", { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split("/").at(-1)?.replace(".md", "");

		if (file && typeof file === "object" && "metadata" in file && slug) {
			const metadata = file.metadata as Omit<Post, "slug">;
			const post = { ...metadata, slug } satisfies Post;

			if (post.published) {
				posts.push(post);
			}
		}
	}

	posts = posts.sort((a, b) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});

	return posts;
}
