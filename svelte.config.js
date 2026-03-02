import path from "node:path";
import { fileURLToPath } from "node:url";
import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { escapeSvelte } from "mdsvex";
import { mdsvex } from "mdsvex";
import { createHighlighter } from "shiki";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import { addCopyButton } from "shiki-transformer-copy-button";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToLayout = path.join(__dirname, "src/lib/components", "MdSvex.svelte");

/** @type {import('mdsvex').MdsvexOptions} */
const mdSvexOptions = {
	extensions: [".md"],
	layout: {
		_: pathToLayout,
	},
	remarkPlugins: [[remarkToc, { tight: true }]],
	rehypePlugins: [rehypeSlug],
	highlight: {
		highlighter: async (code, lang = "text") => {
			/** @type {Array<import('shiki').BundledLanguage>} */
			const langList = [
				"html",
				"css",
				"scss",
				"javascript",
				"typescript",
				"go",
				"json",
				"jsx",
				"shellscript",
				"svelte",
			];

			const hlr = await createHighlighter({
				themes: ["tokyo-night"],
				langs: langList,
			});

			const html = escapeSvelte(
				hlr.codeToHtml(code, {
					lang,
					theme: "tokyo-night",
					transformers: [addCopyButton(code)],
				}),
			);

			return `{@html \`${html}\`}`;
		},
	},
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [".svelte", ".md"],
	preprocess: [vitePreprocess(), mdsvex(mdSvexOptions)],
	kit: {
		adapter: adapter(),
	},
};

export default config;
