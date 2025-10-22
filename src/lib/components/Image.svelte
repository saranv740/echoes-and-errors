<script lang="ts">
	type Props = {
		src: string;
		title: string;
		alt: string;
		loading: "lazy" | "eager";
	};

	let { src, title, alt, loading }: Props = $props();
</script>

<img {src} {alt} {title} {loading} />
