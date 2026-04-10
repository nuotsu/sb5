<script lang="ts">
	import { cells } from './store.svelte.ts'

	const options: {
		type: string
	}[] = [{ type: 'Bogus' }]

	let type = $state('')
</script>

<div class="order-last grid place-content-center border border-dashed not-edit:hidden">
	New:
	<select bind:value={type}>
		{#each options as { type: label }}
			<option value={label}>{label}</option>
		{/each}
	</select>

	<button
		class="action cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
		onclick={() => {
			if (!type) return
			cells.push({ id: crypto.randomUUID(), colSpan: 1, rowSpan: 1, order: cells.length })
		}}
		disabled={!type}
	>
		Add</button
	>
</div>
