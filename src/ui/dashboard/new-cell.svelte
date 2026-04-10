<script lang="ts">
	import { cells, cellTypes, scheduleSave } from './store.svelte.ts'

	let type = $state('')
</script>

<div class="order-last grid place-content-center border border-dashed not-edit:hidden">
	New:
	<select bind:value={type}>
		<option disabled>Select a type</option>

		{#each cellTypes as { type: label } (label)}
			<option value={label}>{label}</option>
		{/each}
	</select>

	<button
		class="action disabled:cursor-not-allowed disabled:opacity-50"
		onclick={() => {
			if (!type) return
			cells.push({
				id: crypto.randomUUID(),
				colSpan: 1,
				rowSpan: 1,
				order: cells.length,
				type,
			})
			scheduleSave()
			type = ''
		}}
		disabled={!type}
	>
		Add</button
	>
</div>
