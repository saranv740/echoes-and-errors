<script lang="ts">
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import "../app.css";
	import type { Snippet } from "svelte";
	import type { LayoutData } from "./$types";
	import Transition from "$lib/components/Transition.svelte";

	let { children, data }: { children: Snippet; data: LayoutData } = $props();
</script>

<div class="min-h-screen flex-col px-4 max-w-3xl mx-auto">
	<Header />
	<main>
		<Transition url={data.url}>
			{@render children?.()}
		</Transition>
	</main>
	<Footer />
</div>
