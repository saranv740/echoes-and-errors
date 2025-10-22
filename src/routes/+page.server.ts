import type { Post } from "$lib/types";
import type { PageServerLoadEvent } from "./$types";

export async function load({ fetch }: PageServerLoadEvent) {
	const response = await fetch("/api/posts");
	const posts: Post[] = await response.json();
	return { posts };
}
