<script lang="ts">
	import { siteConfig } from "$lib/config";

	interface Props {
		title?: string;
		description?: string;
		pageType?: "website" | "article";
		url: URL;
	}

	const { title, description = siteConfig.hero.text, pageType = "website", url }: Props = $props();

	// svelte-ignore state_referenced_locally
	const fullTitle = [title, siteConfig.title].filter(Boolean).join(" | ");
	// svelte-ignore state_referenced_locally
	const canonicalURL = formatCanonicalURL(url);

	function formatCanonicalURL(url: URL) {
		const path = url.toString();
		const hasQueryParams = path.includes("?");
		// If there are query params, make sure the URL has no trailing slash
		if (hasQueryParams) {
			path.replace(/\/?$/, "");
		}
		// otherwise, canonical URL always has a trailing slash
		return path.replace(/\/?$/, hasQueryParams ? "" : "/");
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

	<!-- twitter meta tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={canonicalURL} />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />

	<!-- If image is supplied in future -->
	<!-- <meta property="og:image" content={resolvedImage.src} /> -->
	<!-- <meta property="og:image:alt" content={resolvedImage.alt} /> -->
	<!-- <meta name="twitter:image" content={resolvedImage.src} /> -->
	<!-- <meta name="twitter:image:alt" content={resolvedImage.alt} /> -->

	<title>{fullTitle}</title>
	<link rel="canonical" href={canonicalURL} />
	<meta name="description" content={description} />

	<link rel="icon" href="/favicon.ico" sizes="any" />
	<link rel="icon" href="/icon.svg" type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<link rel="manifest" href="/manifest.webmanifest" />
	<link rel="alternate" type="application/rss+xml" href="/rss.xml" title="RSS" />
</svelte:head>
