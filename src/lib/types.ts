import type { Pathname } from "$app/types";

export type Post = {
	title: string;
	slug: string;
	description: string;
	date: string;
	tags: string[];
	published: boolean;
};

export interface Link {
	text: string;
	href: Pathname;
	title: string;
}

export interface SiteConfig {
	title: string;
	description: string;
	url: string;
	navLinks: Link[];
	hero: {
		title?: string;
		text?: string;
	};
}

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
