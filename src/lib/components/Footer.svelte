<script lang="ts">
	import * as config from "$lib/config";
</script>

<footer>
	<p>{config.title} &copy {new Date().getFullYear()}</p>
</footer>

<style>
	footer {
		padding-block: var(--size-7);
		border-top: 1px solid var(--border);
		text-align: center;

		p {
			color: var(--text-2);
			max-width: 100%;
		}
	}
</style>
