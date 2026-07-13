<script lang="ts">
	import { PUBLIC_BASE_URL } from "$env/static/public";
	import { siteConfig } from "$lib/config";

	interface Props {
		title?: string;
		description?: string;
		pageType?: "website" | "article";
		url: string;
		image?: string;
		alt?: string;
	}

	const {
		title,
		description = siteConfig.hero.text,
		pageType = "website",
		url,
		image,
		alt = `${title} alt image`,
	}: Props = $props();

	// svelte-ignore state_referenced_locally
	const fullTitle = [title, siteConfig.title].filter(Boolean).join(" | ");
	// svelte-ignore state_referenced_locally
	const canonicalURL = getFullSrc(url);

	function getFullSrc(src: string) {
		const fullSrc = `${PUBLIC_BASE_URL}${src}`;
		return fullSrc;
	}
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<!-- OpenGraph meta tags -->
	<meta property="og:type" content={pageType} />
	<meta property="og:url" content={canonicalURL} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:site_name" content="Echoes and Errors" />
	<meta property="og:locale" content="en_IN" />

	<!-- twitter meta tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={canonicalURL} />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />

	{#if image}
		{@const src = getFullSrc(image)}
		<meta property="og:image" content={src} />
		<meta property="og:image:alt" content={alt} />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
		<meta name="twitter:image" content={src} />
		<meta name="twitter:image:alt" content={alt} />
	{/if}

	<title>{fullTitle}</title>
	<link rel="canonical" href={canonicalURL} />
	<meta name="description" content={description} />

	<link rel="icon" href="/favicon.ico" sizes="any" />
	<link rel="icon" href="/icon.svg" type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<link rel="manifest" href="/manifest.webmanifest" />
	<link rel="alternate" type="application/rss+xml" href="/rss.xml" title="RSS" />
</svelte:head>
