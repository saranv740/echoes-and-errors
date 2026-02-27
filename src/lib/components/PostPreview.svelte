<script lang="ts">
	import { resolve } from "$app/paths";
	import type { HeadingLevel, Post } from "$lib/types";
	import { formatDate } from "$lib/utils";
	import { ArrowRight } from "lucide-svelte";

	interface Props {
		className?: string;
		post: Post;
		headingLevel: HeadingLevel;
	}
	const { className, post, headingLevel }: Props = $props();
	// svelte-ignore state_referenced_locally
	const { title, date, description, slug } = post;
</script>

<a
	class={["group flex items-start justify-between gap-8", className]}
	href={resolve("/post/[slug]", {
		slug,
	})}
>
	<div class="grow">
		<svelte:element
			this={headingLevel}
			class="font-serif text-xl leading-tight font-medium group-hover:underline group-hover:decoration-dashed group-hover:decoration-1 group-hover:underline-offset-4 sm:text-2xl"
		>
			{title}
		</svelte:element>
		<div class="mt-1 text-sm leading-normal">{formatDate(date)}</div>
		<div class="mt-3 text-sm leading-normal">{description}</div>
	</div>
	<div
		class="hidden font-serif italic opacity-0 transition group-hover:opacity-100 sm:inline-flex sm:shrink-0 sm:items-center sm:gap-1"
	>
		Read Post <ArrowRight class="h-4 w-4 fill-current" />
	</div>
</a>
