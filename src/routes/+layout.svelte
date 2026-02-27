<script lang="ts">
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import "../app.css";
	import type { Snippet } from "svelte";
	import type { LayoutData } from "./$types";
	import Transition from "$lib/components/Transition.svelte";

	let { children, data }: { children: Snippet; data: LayoutData } = $props();
</script>

<div class="flex min-h-screen flex-col px-4 md:px-8">
	<Header />
	<main>
		<Transition url={data.url}>
			{@render children?.()}
		</Transition>
	</main>
	<Footer />
</div>
