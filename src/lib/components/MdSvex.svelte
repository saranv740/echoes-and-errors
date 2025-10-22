<script lang="ts" module>
	import img from "./Image.svelte";
	export { img };
</script>

<script lang="ts">
	import type { Snippet } from "svelte";

	let { children }: { children: Snippet } = $props();
</script>

{@render children?.()}
