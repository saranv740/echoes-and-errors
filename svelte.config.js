import path from "node:path";
import { fileURLToPath } from "node:url";
import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { escapeSvelte } from "mdsvex";
import { mdsvex } from "mdsvex";
import { createHighlighter } from "shiki";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import { transformerNotationDiff, transformerMetaHighlight } from "@shikijs/transformers";
import { wrapCodeBlock, parseMetaString } from "./src/lib/transformer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToLayout = path.join(__dirname, "src/lib/components", "MdSvex.svelte");

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

/** @type {import('mdsvex').MdsvexOptions} */
const mdSvexOptions = {
	extensions: [".md"],
	layout: {
		_: pathToLayout,
	},
	remarkPlugins: [[remarkToc, { tight: true }]],
	rehypePlugins: [rehypeSlug],
	highlight: {
		highlighter: async (code, lang = "text", meta) => {
			const metaData = parseMetaString(meta);
			const html = escapeSvelte(
				hlr.codeToHtml(code, {
					lang,
					meta: { ...metaData, __raw: meta },
					theme: "tokyo-night",
					transformers: [
						transformerNotationDiff({
							matchAlgorithm: "v3",
						}),
						transformerMetaHighlight(),
						wrapCodeBlock(code),
					],
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
