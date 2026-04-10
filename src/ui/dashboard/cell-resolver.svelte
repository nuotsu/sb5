<script lang="ts">
	let { cell }: { cell: Dashboard.Cell } = $props()
</script>

{#if cell.type === 'Bogus'}
	<h2>Bogus</h2>
{/if}
