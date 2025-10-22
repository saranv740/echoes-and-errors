<script lang="ts">
	import * as config from "$lib/config";
	import Toggle from "$lib/components/Toggle.svelte";
	import { resolve } from "$app/paths";
</script>

<nav>
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

<style>
	nav {
		padding-block: var(--size-7);

		@media (min-width: 768px) {
			display: flex;
			justify-content: space-between;
		}

		.links {
			margin-block: var(--size-7);

			@media (min-width: 768px) {
				display: flex;
				gap: var(--size-7);
				margin-block: 0;
			}
		}

		a {
			color: inherit;
			text-decoration: none;
		}
	}
</style>
