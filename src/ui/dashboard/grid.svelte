<script lang="ts">
	import { setContext } from 'svelte'
	import Cell from './cell.svelte'

	let gridEl = $state<HTMLElement>()
	let isMobile = $state(false)

	const cells = $state<Dashboard.Cell[]>([
		{ id: 0, colSpan: 1, rowSpan: 1, order: 0 },
		{ id: 1, colSpan: 1, rowSpan: 1, order: 1 },
		{ id: 2, colSpan: 1, rowSpan: 1, order: 2 },
	])

	function updateCell(id: number, update: Partial<Dashboard.Cell>) {
		const idx = cells.findIndex((c) => c.id === id)
		if (idx >= 0) Object.assign(cells[idx], update)
	}

	function reorderCells(fromId: number, toId: number) {
		const from = cells.find((c) => c.id === fromId)
		const to = cells.find((c) => c.id === toId)
		if (!from || !to || from === to) return
		const tmp = from.order
		from.order = to.order
		to.order = tmp
	}

	setContext<Dashboard.GridContext>('grid', {
		get el() {
			return gridEl
		},
		get isMobile() {
			return isMobile
		},
		cols: 3,
		reorderCells,
	})

	$effect(() => {
		const mq = window.matchMedia('(max-width: 48rem)')
		isMobile = mq.matches
		const handler = (e: MediaQueryListEvent) => (isMobile = e.matches)
		mq.addEventListener('change', handler)
		return () => mq.removeEventListener('change', handler)
	})
</script>

<section
	bind:this={gridEl}
	class="grid gap-ch p-ch"
	style:grid-template-columns={isMobile ? '1fr' : 'repeat(3, 1fr)'}
	style:grid-auto-rows="10lh"
>
	{#each cells as cell (cell.id)}
		<Cell {cell} onupdate={(u) => updateCell(cell.id, u)}>
			{cell.id}
		</Cell>
	{/each}
</section>
