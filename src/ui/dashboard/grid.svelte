<script lang="ts">
	import Cell from './cell.svelte'

	const cells = Array.from({ length: 3 }, (_, i) => i)
</script>

<section class="grid gap-ch p-ch md:grid-cols-3">
	{#each cells as cell}
		<Cell>
			{cell}
		</Cell>
	{/each}
</section>
