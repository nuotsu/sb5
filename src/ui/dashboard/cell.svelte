<script lang="ts">
	import { cn } from '$lib/utils'
	import type { Snippet } from 'svelte'
	import { getContext } from 'svelte'

	let {
		cell,
		onupdate,
		children,
	}: {
		cell: Dashboard.Cell
		onupdate: (u: Partial<Dashboard.Cell>) => void
		children: Snippet
	} = $props()

	const grid = getContext<Dashboard.GridContext>('grid')

	type Side = 'top' | 'right' | 'bottom' | 'left'
	type DragState = {
		side: Side
		startX: number
		startY: number
		startColSpan: number
		startRowSpan: number
	}

	let hoveredSide = $state<Side | null>(null)
	let dragState = $state<DragState | null>(null)
	let articleEl = $state<HTMLElement>()

	const colWidth = () => (grid.el?.offsetWidth ?? 0) / grid.cols
	const rowHeight = () => {
		const lh = parseFloat(getComputedStyle(grid.el ?? document.documentElement).lineHeight) || 24
		return lh * 10
	}

	function startDrag(e: PointerEvent, side: Side) {
		if (grid.isMobile) return
		e.preventDefault()
		;(e.target as HTMLElement).setPointerCapture(e.pointerId)
		dragState = {
			side,
			startX: e.clientX,
			startY: e.clientY,
			startColSpan: cell.colSpan,
			startRowSpan: cell.rowSpan,
		}
	}

	function onpointermove(e: PointerEvent) {
		if (!dragState) return
		const { side, startX, startY, startColSpan, startRowSpan } = dragState

		if (side === 'right') {
			const delta = e.clientX - startX
			const newSpan = Math.max(
				1,
				Math.min(grid.cols, startColSpan + Math.round(delta / colWidth())),
			)
			onupdate({ colSpan: newSpan })
		} else if (side === 'left') {
			const delta = -(e.clientX - startX)
			const newSpan = Math.max(
				1,
				Math.min(grid.cols, startColSpan + Math.round(delta / colWidth())),
			)
			onupdate({ colSpan: newSpan })
		} else if (side === 'bottom') {
			const delta = e.clientY - startY
			const newSpan = Math.max(1, startRowSpan + Math.round(delta / rowHeight()))
			onupdate({ rowSpan: newSpan })
		} else if (side === 'top') {
			const els = document.elementsFromPoint(e.clientX, e.clientY)
			const target = els.find((el) => el.hasAttribute('data-cell-id') && el !== articleEl)
			if (target) {
				const targetId = target.getAttribute('data-cell-id')!
				grid.reorderCells(cell.id, targetId)
			}
		}
	}

	function onpointerup() {
		dragState = null
		hoveredSide = null
	}

	const cursor = $derived(
		dragState?.side === 'top' ? 'cursor-grabbing' : dragState ? 'cursor-col-resize' : '',
	)
</script>

<article
	bind:this={articleEl}
	data-cell-id={cell.id}
	class="relative border border-current {cursor} max-md:col-span-1!"
	style:grid-column="span {cell.colSpan}"
	style:grid-row="span {cell.rowSpan}"
	style:order={cell.order}
	style:border-top-style={hoveredSide === 'top' ? 'dashed' : 'solid'}
	style:border-right-style={hoveredSide === 'right' ? 'dashed' : 'solid'}
	style:border-bottom-style={hoveredSide === 'bottom' ? 'dashed' : 'solid'}
	style:border-left-style={hoveredSide === 'left' ? 'dashed' : 'solid'}
	{onpointermove}
	{onpointerup}
>
	{@render children()}

	<!-- Top: reorder -->
	<div
		class={cn(
			'absolute inset-x-0 top-0 z-10 h-2 max-md:hidden not-edit:hidden',
			dragState?.side === 'top' ? 'cursor-grabbing' : 'cursor-grab',
		)}
		onpointerenter={() => (hoveredSide = 'top')}
		onpointerleave={() => {
			if (!dragState) hoveredSide = null
		}}
		onpointerdown={(e) => startDrag(e, 'top')}
		role="presentation"
	></div>
	<!-- Right: col resize -->
	<div
		class="absolute inset-y-0 right-0 z-10 w-2 cursor-ew-resize max-md:hidden not-edit:hidden"
		onpointerenter={() => (hoveredSide = 'right')}
		onpointerleave={() => {
			if (!dragState) hoveredSide = null
		}}
		onpointerdown={(e) => startDrag(e, 'right')}
		role="presentation"
	></div>
	<!-- Bottom: row resize -->
	<div
		class="absolute inset-x-0 bottom-0 z-10 h-2 cursor-ns-resize max-md:hidden not-edit:hidden"
		onpointerenter={() => (hoveredSide = 'bottom')}
		onpointerleave={() => {
			if (!dragState) hoveredSide = null
		}}
		onpointerdown={(e) => startDrag(e, 'bottom')}
		role="presentation"
	></div>
	<!-- Left: col resize -->
	<div
		class="absolute inset-y-0 left-0 z-10 w-2 cursor-ew-resize max-md:hidden not-edit:hidden"
		onpointerenter={() => (hoveredSide = 'left')}
		onpointerleave={() => {
			if (!dragState) hoveredSide = null
		}}
		onpointerdown={(e) => startDrag(e, 'left')}
		role="presentation"
	></div>
</article>
