<script lang="ts">
	import { goto } from '$app/navigation'
	import { useAuthSession } from '$auth/session.svelte'
	import { authClient } from '$lib/auth/client'

	const auth = useAuthSession()

	let loading = $state(false)
	let showPassword = $state(false)
	let message = $state<string | undefined>(undefined)

	async function signIn(e: SubmitEvent) {
		e.preventDefault()
		const form = e.currentTarget as HTMLFormElement
		const fd = new FormData(form)
		const email = fd.get('email')
		const password = fd.get('password')
		if (typeof email !== 'string' || typeof password !== 'string') {
			message = 'Invalid form submission'
			return
		}

		loading = true
		message = undefined
		const res = await authClient.signIn.email({
			email,
			password,
			callbackURL: '/dashboard',
		})
		loading = false

		if (res.error) {
			message = res.error.message ?? 'Sign in failed'
			return
		}

		await authClient.useSession().get().refetch()
		await goto('/dashboard', { invalidateAll: true })
	}
</script>

<h1>Sign in</h1>

{#if auth.isPending}
	<p>Loading…</p>
{:else if auth.user}
	<p>You are signed in as {auth.user.email}. <a href="/dashboard">Dashboard</a></p>
{:else}
	<form class="grid" method="post" onsubmit={signIn}>
		<label>
			Email<br />
			<input
				type="email"
				name="email"
				placeholder="shohei@theohtani.com"
				autocomplete="email"
				required
			/>
		</label>

		<div>
			<label>
				Password<br />
				<input
					name="password"
					type={showPassword ? 'text' : 'password'}
					autocomplete="current-password"
					required
				/>
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

		{#if message}
			<p role="alert">{message}</p>
		{/if}

		<button type="submit" disabled={loading}>
			{#if loading}
				<loading>Signing in</loading>
			{:else}
				Sign in
			{/if}
		</button>
	</form>

	<p><a href="/signup">Create an account</a> · <a href="/">Home</a></p>
{/if}
