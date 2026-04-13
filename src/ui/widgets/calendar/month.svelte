<script lang="ts">
	import { cn } from '$lib/utils'
	import type { Snippet } from 'svelte'
	import { SvelteDate } from 'svelte/reactivity'

	let { cells }: { cells?: Snippet<[{ date: Date }]> } = $props()

	let selected = $state(new Date().toISOString().slice(0, 10))
	const current = $derived(new Date(selected.replace(/-/g, '/')))

	const today = new SvelteDate()
	const isToday = (date: Date) =>
		date.getFullYear() === today.getFullYear() &&
		date.getMonth() === today.getMonth() &&
		date.getDate() === today.getDate()

	const days = $derived.by(() => {
		const year = current.getFullYear()
		const month = current.getMonth()

		const firstDay = new Date(year, month, 1)
		const lastDay = new Date(year, month + 1, 0)

		const startOffset = (firstDay.getDay() + 6) % 7
		const endPad = lastDay.getDay() === 0 ? 0 : 7 - lastDay.getDay()

		const cells: { date: Date; overflow: boolean }[] = []

		for (let i = startOffset - 1; i >= 0; i--) {
			cells.push({ date: new Date(year, month, -i), overflow: true })
		}
		for (let d = 1; d <= lastDay.getDate(); d++) {
			cells.push({ date: new Date(year, month, d), overflow: false })
		}
		for (let d = 1; d <= endPad; d++) {
			cells.push({ date: new Date(year, month + 1, d), overflow: true })
		}

		return cells
	})

	function addMonth(value: number = 1) {
		const current = new Date(selected.replace(/-/g, '/'))
		const target = new Date(current.getFullYear(), current.getMonth() + value, 1)
		selected = target.toISOString().slice(0, 10)
	}
</script>

<fieldset class="sticky top-0 z-1 bg-background">
	<div class="flex">
		<button class="action px-ch" onclick={() => addMonth(-1)}>&lt;</button>

		<button class="action px-ch" onclick={() => (selected = today.toISOString().slice(0, 10))}>
			Today
		</button>

		<input class="grow" type="date" bind:value={selected} />

		<button class="action px-ch" onclick={() => addMonth(1)}>&gt;</button>
	</div>
</fieldset>

<div class="grid grid-cols-7 text-center">
	{#each ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as label}
		<div class="opacity-50">{label}</div>
	{/each}

	{#each days as { date, overflow } (date.getTime())}
		<div class={cn(overflow && 'opacity-25', isToday(date) && 'bg-accent')}>
			<div>{date.getDate()}</div>

			{@render cells?.({ date })}
		</div>
	{/each}
</div>
