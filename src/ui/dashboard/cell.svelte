<script lang="ts">
	import type { Snippet } from 'svelte'

	let { children }: { children: Snippet } = $props()
</script>

<article class="min-h-[10lh] outline outline-current">
	{@render children()}
</article>
