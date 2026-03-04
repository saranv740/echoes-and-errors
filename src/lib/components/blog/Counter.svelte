<script lang="ts">
	import Button from "../Button.svelte";

	let count = $state(0);

	const increment = () => count++;
</script>

<button
	class="mt-2.5 mr-2 min-w-10 cursor-pointer rounded-sm border-2 border-solid border-white py-2"
	onclick={increment}
>
	{count}
</button>
<Button
	type="button"
	onclick={() => {
		count = 0;
	}}
>
	Reset
</Button>
