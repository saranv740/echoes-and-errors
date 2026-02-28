<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import { formatDate } from "$lib/utils";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();

	async function copyLink(e: MouseEvent) {
		const button = e.target as HTMLButtonElement;
		let label = button.innerText;

		await navigator.clipboard.writeText(window?.location.toString());

		button.innerText = "Copied";

		setTimeout(() => {
			button.innerText = label;
		}, 2500);
	}
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article class="mb-16 sm:mb-24">
	<header class="mb-8">
		<h1 class="font-serif text-3xl leading-tight font-medium sm:text-5xl sm:leading-tight">
			{data.meta.title}
		</h1>
	</header>
	<div class="mt-4 text-sm">
		<time>{formatDate(data.meta.date)}</time>
	</div>
	<div class="prose max-w-none sm:prose-lg">
		<data.content />
	</div>
	<div class="mt-8 flex flex-wrap items-center justify-between gap-6 text-sm sm:mt-12 sm:text-base">
		<div class="flex flex-wrap gap-x-5 gap-y-1 text-sm">
			{#each data.meta.tags as tag (tag)}
				<span class="text-main">
					#{tag}
				</span>
			{/each}
		</div>
		<Button class="copy-url-button" aria-label="Copy link" onclick={copyLink}>Share</Button>
	</div>
</article>
