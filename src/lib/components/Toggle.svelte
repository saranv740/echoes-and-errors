<script lang="ts">
	import { fly } from "svelte/transition";
	import { Moon, Sun } from "lucide-svelte";
	import { theme } from "$lib/components/Theme.svelte";
</script>

<button
	on:click={theme.toggle}
	class="cursor-pointer"
	aria-label={`Toggle ${theme.current === "dark" ? "light" : "dark"} theme`}
>
	{#if theme.current === "dark"}
		<div in:fly={{ y: 10 }}>
			<Sun />
		</div>
	{:else}
		<div in:fly={{ y: -10 }}>
			<Moon />
		</div>
	{/if}
</button>

<style>
	button {
		padding: 0;
		font-weight: inherit;
		background: none;
		border: none;
		box-shadow: none;
		overflow: hidden;
		vertical-align: middle;
	}
</style>
