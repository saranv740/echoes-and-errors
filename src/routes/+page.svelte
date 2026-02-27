<script lang="ts">
	import type { PageProps } from "./$types";
	import { siteConfig } from "$lib/config";
	import PostPreview from "$lib/components/PostPreview.svelte";

	let { data }: PageProps = $props();
	const hero = siteConfig.hero;
</script>

<svelte:head>
	<title>
		{siteConfig.title}
	</title>
</svelte:head>

<section class="mb-16 flex w-full flex-col gap-8 sm:mb-24">
	{#if hero.title}
		<h1 class="font-serif text-3xl leading-tight font-medium sm:text-5xl sm:leading-tight">
			{hero.title}
		</h1>
	{/if}

	{#if hero.text}
		<div class="prose max-w-none sm:prose-lg">{hero.text}</div>
	{/if}

	<div class="mb-16 sm:mb-24">
		<h2 class="mb-12 font-serif text-xl italic sm:mb-16 sm:text-2xl">Writings</h2>
		{#each data.posts as post (post.title)}
			<PostPreview {post} className="mb-10 sm:mb-12" headingLevel="h2" />
		{/each}
		<div class="mt-12 sm:mt-16"></div>
	</div>
</section>
