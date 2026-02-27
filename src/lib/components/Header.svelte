<script lang="ts">
	import { siteConfig } from "$lib/config";
	import Toggle from "$lib/components/Toggle.svelte";
	import { resolve } from "$app/paths";
	import Navlink from "./Navlink.svelte";

	let isMenuExpanded = $state(false);
</script>

<nav
	class="relative mx-auto flex min-h-10 w-full items-center justify-between pt-4 pb-12 sm:min-h-14 sm:pb-24 md:justify-start md:gap-20 md:pt-8"
	aria-label="Primary navigation"
>
	<button
		onclick={() => {
			isMenuExpanded = !isMenuExpanded;
		}}
		class="menu-toggle relative z-30 -ml-1 flex h-8 w-8 cursor-pointer items-center justify-center md:hidden"
		class:is-active={isMenuExpanded}
		aria-label={isMenuExpanded ? "Open Menu" : "Close Menu"}
		aria-expanded={isMenuExpanded}
		aria-controls="menu-items"
	>
		<span class="menu-toggle-icon relative h-px w-6 bg-current"></span>
	</button>
	<a
		href={resolve("/")}
		class="text-theme-foreground font-serif text-2xl leading-tight font-semibold sm:text-3xl"
	>
		{siteConfig.title}
	</a>
	<ul
		id="menu-items"
		class="menu flex gap-6 max-md:absolute max-md:top-1.5 max-md:-left-2.5 max-md:z-20 max-md:max-w-64 max-md:flex-col max-md:gap-1 max-md:border max-md:border-dashed max-md:border-main max-md:bg-main max-md:px-3 max-md:pt-16 max-md:pb-10"
		class:is-visible={isMenuExpanded}
	>
		{#each siteConfig.navLinks as link (link.href)}
			<li class="py-1">
				<Navlink
					className="font-serif text-xl text-main hover:underline hover:decoration-1 hover:underline-offset-2 md:text-base"
					href={link.href}
				>
					{link.text}
				</Navlink>
			</li>
		{/each}
	</ul>
	<Toggle />
</nav>

<style lang="postcss">
	@reference "tailwindcss";

	@media (max-width: 767px) {
		.menu {
			@apply invisible opacity-0;
			width: calc(100% + 1.25rem);
		}

		.menu.is-visible {
			@apply visible opacity-100;
			transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
		}

		.menu-toggle-icon {
			transition: width 0.1s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
		}

		.menu-toggle.is-active .menu-toggle-icon {
			@apply w-0;
			transition: width 0.1s cubic-bezier(0.4, 0, 0.2, 1);
		}

		.menu-toggle-icon:before,
		.menu-toggle-icon:after {
			@apply absolute top-0 left-1/2 h-px w-6 origin-center -translate-x-1/2 bg-current;
			content: "";
			transition:
				rotate 0.2s cubic-bezier(0.4, 0, 0.2, 1),
				margin 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
		}

		.menu-toggle-icon:before {
			@apply -mt-1.5;
		}

		.menu-toggle-icon:after {
			@apply mt-1.5;
		}

		.menu-toggle.is-active .menu-toggle-icon:before,
		.menu-toggle.is-active .menu-toggle-icon:after {
			@apply mt-0;
			transition:
				margin 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0.1s,
				rotate 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
		}

		.menu-toggle.is-active .menu-toggle-icon:before {
			@apply rotate-45;
		}

		.menu-toggle.is-active .menu-toggle-icon:after {
			@apply -rotate-45;
		}
	}
</style>
