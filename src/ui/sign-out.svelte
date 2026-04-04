<script lang="ts">
	import { goto } from '$app/navigation'
	import { authClient } from '$lib/auth/client'
	import type { HTMLAttributes } from 'svelte/elements'

	let { ...props }: HTMLAttributes<HTMLButtonElement> = $props()

	let loading = $state(false)

	async function onclick() {
		loading = true
		try {
			await authClient.signOut()
			await goto('/login', { invalidateAll: true })
		} finally {
			loading = false
		}
	}
</script>

<button {...props} type="button" disabled={loading} {onclick}>
	{#if loading}
		<loading>Signing out</loading>
	{:else}
		Sign out
	{/if}
</button>
