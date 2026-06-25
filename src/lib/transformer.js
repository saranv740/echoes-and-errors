import { h } from "hastscript";

/**
 * @param {string} code text that will be pasted to user's clipboard
 * @returns {import("shiki").ShikiTransformer} a tranformer that embeds the pre tag into a wrapper
 */
export const wrapCodeBlock = (code) => {
	return {
		name: "code-block-wrapper",
		pre(element) {
			const meta = this.options.meta;
			let fileName = "text";
			if (meta?.filename && typeof meta?.filename === "string") {
				fileName = meta.filename;
			}

			const button = h(
				"button",
				{
					class: "code-copy-button",
					onclick: `
					navigator.clipboard.writeText(this.dataset.code);
					this.innerText = 'copied!';
					setTimeout(() => this.innerText = 'copy', ${2000})
					`,
					"data-code": code,
				},
				["copy"],
			);
			const p = h("p", { class: "code-filename" }, [fileName]);
			const headerDiv = h("div", { class: "code-block-header" }, [p, button]);
			const container = h("div", { class: "code-block-container" }, [headerDiv, element]);

			return container;
		},
	};
};

const regex = /(\w+)=(?:(['"])(.*?)\2|(\S+))/g;

/**
 * @description parseMetaString take a string in form of 'foo=bar hello=world' and returns an object consisting of parsed values
 * @param {string} str meta string to be parsed
 * @returns {Record<string, string>} the parsed meta object
 */
export function parseMetaString(str) {
	/** @type {Record<string, string>} */
	const result = {};

	if (!str) {
		return result;
	}

	const matches = str.matchAll(regex);
	matches.forEach((match) => {
		const key = match[1];
		const value = match[3] || match[4] || "";
		if (key) {
			result[key] = value;
		}
	});

	return result;
}
