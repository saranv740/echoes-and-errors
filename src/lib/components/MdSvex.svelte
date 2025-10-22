<script lang="ts" module>
	export { default as img } from "./Image.svelte";
</script>

<script lang="ts">
	import type { Snippet } from "svelte";

	let { children }: { children: Snippet } = $props();
</script>

{@render children?.()}
