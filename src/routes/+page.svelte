<script lang="ts">
	import type { PageProps } from "./$types";
	import { siteConfig } from "$lib/config";
	import PostPreview from "$lib/components/PostPreview.svelte";
	import Head from "$lib/components/Head.svelte";
	import { page } from "$app/state";
	import Button from "$lib/components/Button.svelte";

	let { data }: PageProps = $props();
	const hero = siteConfig.hero;
</script>

<Head url={page.url} />

<section class="mb-12 flex w-full flex-col gap-12">
	{#if hero.title}
		<h1 class="font-serif text-3xl leading-tight font-medium sm:text-5xl sm:leading-tight">
			{hero.title}
		</h1>
	{/if}

	{#if hero.text}
		<div class="prose max-w-none sm:prose-lg">
			<p>
				{hero.text}
			</p>
			<Button href="/about">About me</Button>
		</div>
	{/if}

	{#if data.posts.length > 0}
		<h2 class="font-serif text-xl italic sm:text-2xl">Writings</h2>
		{#each data.posts as post (post.title)}
			<PostPreview {post} headingLevel="h2" />
		{/each}
	{/if}
</section>
