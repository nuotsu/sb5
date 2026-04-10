<script lang="ts">
	import Grid from '$ui/dashboard/grid.svelte'
	import { cells } from '$ui/dashboard/store.svelte.ts'

	let { data } = $props()

	// Initialize once from server data — data doesn't change during the page lifecycle
	cells.length = 0
	cells.push(
		...data.cells.map((row: Record<string, unknown>) => ({
			id: row.id as string,
			colSpan: row.col_span as number,
			rowSpan: row.row_span as number,
			order: row.order as number,
			type: row.type as string,
		})),
	)
</script>

<Grid />
