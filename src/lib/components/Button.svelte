<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";

	interface ButtonProps extends HTMLButtonAttributes {
		text: string;
	}
	const { text, ...rest }: ButtonProps = $props();
</script>

<button {...rest}>{text}</button>

<style>
	button {
		display: inline-flex;
		justify-content: center;
		align-items: center;
	}

	button:hover {
		background-color: var(--bg-muted);
	}
</style>
