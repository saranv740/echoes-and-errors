import { dev } from "$app/environment";
import type { Link, SiteConfig } from "./types";

const navLinks: Link[] = [
	{
		text: "Home",
		href: "/",
		title: "Home",
	},
	{
		text: "RSS",
		href: "/rss.xml",
		title: "RSS Feed",
	},
];

export const siteConfig = {
	title: "Echoes & Errors",
	description: "A blog that I used to post my stuff",
	url: dev ? "http://localhost:5173/" : "www.codebysaran.in",
	navLinks,
	hero: {
		title: "Hi there & welcome to my corner of the web!",
		text: "An Homo sapien who codes...",
	},
} satisfies SiteConfig;
