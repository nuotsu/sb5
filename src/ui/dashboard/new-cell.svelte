<script lang="ts">
	const options: {
		type: string
	}[] = [{ type: 'Bogus' }]
</script>

<button
	class="order-last grid cursor-pointer place-content-center border border-dashed not-edit:hidden"
	onclick={() => {}}
>
	Add new:
	<select>
		{#each options as { type: label }}
			<option>{label}</option>
		{/each}
	</select>
</button>
