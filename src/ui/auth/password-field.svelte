<script lang="ts">
	import { cn } from '$lib/utils'
	import type { HTMLInputAttributes } from 'svelte/elements'

	let {
		class: className,
		...inputProps
	}: {
		class?: string
	} & HTMLInputAttributes = $props()

	let showPassword = $state(false)
</script>

<div class={cn(className)}>
	<label class="grid">
		Password
		<input name="password" type={showPassword ? 'text' : 'password'} required {...inputProps} />
	</label>

	<label>
		<input type="checkbox" bind:checked={showPassword} />
		{#if showPassword}
			Hide password
		{:else}
			Show password
		{/if}
	</label>
</div>
