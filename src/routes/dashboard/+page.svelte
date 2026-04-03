<script lang="ts">
	import { goto } from '$app/navigation'
	import { useAuthSession } from '$auth/session.svelte'
	import { authClient } from '$lib/auth/client'

	const auth = useAuthSession()

	let signingOut = $state(false)

	async function signOut() {
		signingOut = true
		try {
			await authClient.signOut()
			await goto('/login', { invalidateAll: true })
		} finally {
			signingOut = false
		}
	}
</script>

<h1>Dashboard</h1>

{#if auth.isPending}
	<p>Loading session…</p>
{:else if auth.user}
	<p>Signed in as {auth.user.email}</p>
	<button type="button" disabled={signingOut} onclick={signOut}>
		{signingOut ? 'Signing out…' : 'Sign out'}
	</button>
{:else}
	<p>
		You are not signed in. <a href="/signup">Create an account</a> or <a href="/login">sign in</a>
	</p>
{/if}
