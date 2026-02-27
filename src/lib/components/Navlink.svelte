<script lang="ts">
	import type { Snippet } from "svelte";
	import { page } from "$app/state";
	import { resolve } from "$app/paths";
	import type { Pathname } from "$app/types";

	interface Props {
		href: Pathname;
		className: string;
		children: Snippet;
	}

	const props: Props = $props();
	const isActive: boolean = $derived(page.url.pathname === props.href);
</script>

<a
	class={[{ "underline decoration-1 underline-offset-2": isActive }, props.className]}
	href={resolve(props.href)}
>
	{@render props.children()}
</a>
