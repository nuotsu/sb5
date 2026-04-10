<script lang="ts">
	import { setContext } from 'svelte'
	import Cell from './cell.svelte'
	import NewCell from './new-cell.svelte'
	import { cells, scheduleSave } from './store.svelte.ts'

	let gridEl = $state<HTMLElement>()
	let isMobile = $state(false)

	function updateCell(id: string, update: Partial<Dashboard.Cell>) {
		const idx = cells.findIndex((c) => c.id === id)
		if (idx >= 0) {
			Object.assign(cells[idx], update)
			scheduleSave()
		}
	}

	function reorderCells(fromId: string, toId: string) {
		const from = cells.find((c) => c.id === fromId)
		const to = cells.find((c) => c.id === toId)
		if (!from || !to || from === to) return
		const tmp = from.order
		from.order = to.order
		to.order = tmp
		scheduleSave()
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
	class="isolate grid gap-ch"
	style:grid-template-columns={isMobile ? '1fr' : 'repeat(3, 1fr)'}
	style:grid-auto-rows="10lh"
>
	{#each cells as cell (cell.id)}
		<Cell {cell} onupdate={(u) => updateCell(cell.id, u)}>
			<span class="text-current/50">{cell.id}</span>

			<h2>{cell.type}</h2>
		</Cell>
	{/each}

	<NewCell />
</section>
