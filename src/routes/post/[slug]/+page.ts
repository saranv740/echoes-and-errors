import { error } from "@sveltejs/kit";
import type { EntryGenerator, PageLoadEvent } from "./$types";
import type { Post } from "$lib/types";
import type { Component } from "svelte";

export async function load({ params }: PageLoadEvent) {
	try {
		const post = await import(`$lib/contents/${params.slug}.md`);
		return {
			content: post.default as Component,
			meta: post.metadata as Post,
		};
	} catch (e) {
		console.error(e);
		error(404, `Could not find ${params.slug}`);
	}
}

export const entries: EntryGenerator = () => {
	const slugs: Array<{ slug: string }> = [];

	const paths = import.meta.glob("/src/lib/contents/*.md", { eager: true });
	for (const path in paths) {
		const slug = path.split("/").at(-1)?.replace(".md", "");
		if (slug && slug !== "") {
			slugs.push({ slug });
		}
	}

	return slugs;
};
