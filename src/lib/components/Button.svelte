<script lang="ts">
	import { resolve } from "$app/paths";
	import type { Pathname } from "$app/types";
	import type { Snippet } from "svelte";
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";

	interface ButtonProps extends HTMLButtonAttributes {
		href?: never;
		children: Snippet;
	}

	interface AnchorProps extends HTMLAnchorAttributes {
		href: Pathname;
		type?: never;
		children: Snippet;
	}

	const props: ButtonProps | AnchorProps = $props();
	const buttonClasses =
		"inline-flex items-center justify-center px-6 py-2 font-serif leading-tight italic text-main bg-transparent border border-main rounded-full transition-colors hover:bg-muted";
</script>

{#if props.href}
	<a {...props} class={[buttonClasses, props.class]} href={resolve(props.href)}>
		{@render props.children()}
	</a>
{:else}
	<button onclick={(e)=>{}} {...props} class={[buttonClasses, "cursor-pointer", props.class]}>
		{@render props.children()}
	</button>
{/if}
