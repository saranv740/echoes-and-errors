<script lang="ts">
	import "open-props/style";
	import "open-props/normalize";
	import "open-props/buttons";
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import "../app.css";
	import type { Snippet } from "svelte";
	import type { LayoutData } from "./$types";
	import Transition from "$lib/components/Transition.svelte";

	let { children, data }: { children: Snippet; data: LayoutData } = $props();
</script>

<div class="layout">
	<Header />
	<main>
		<Transition url={data.url}>
			{@render children?.()}
		</Transition>
	</main>
	<Footer />
</div>

<style>
	.layout {
		height: 100%;
		max-inline-size: 1440px;
		display: grid;
		grid-template-rows: auto 1fr auto;
		margin-inline: auto;
		padding-inline: var(--size-7);

		@media screen and (min-width: 1440px) {
			padding-inline: 0;
		}

		main {
			padding-block: var(--size-9);
		}
	}
</style>
