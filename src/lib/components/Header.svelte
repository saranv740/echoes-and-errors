<script lang="ts">
	import * as config from "$lib/config";
	import Toggle from "$lib/components/Toggle.svelte";
	import { resolve } from "$app/paths";
</script>

<nav class="relative min-h-10 pt-4 pb-12 sm:min-h-14 sm:pb-24 md:pt-8">
	<a href={resolve("/")} class="title">
		<b>{config.title}</b>
	</a>

	<ul class="links">
		<li>
			<a href={resolve("/")}>About</a>
		</li>
		<li>
			<a href={resolve("/")}>Contact</a>
		</li>
		<li>
			<a href={resolve("/rss.xml")} target="_blank">RSS</a>
		</li>
	</ul>

	<Toggle />
</nav>
