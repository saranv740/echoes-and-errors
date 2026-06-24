<script lang="ts">
	import { siteConfig as config } from "$lib/config";
</script>

<footer class="text-sm border-t border-main py-4 text-center mt-auto">
	<p>{config.title} &copy {new Date().getFullYear()}</p>
</footer>
