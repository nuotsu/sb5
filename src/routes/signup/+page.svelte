<script lang="ts">
	import { goto } from '$app/navigation'
	import { authClient } from '$lib/auth/client'

	let loading = $state(false)
	let showPassword = $state(false)
	let message = $state<string | undefined>(undefined)

	async function signUp(e: SubmitEvent) {
		e.preventDefault()
		const form = e.currentTarget as HTMLFormElement
		const fd = new FormData(form)
		const name = fd.get('name')
		const email = fd.get('email')
		const password = fd.get('password')

		if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
			message = 'Invalid form submission'
			return
		}

		loading = true
		message = undefined
		const res = await authClient.signUp.email({
			name,
			email,
			password,
			callbackURL: '/dashboard',
		})
		loading = false

		if (res.error) {
			message = res.error.message ?? 'Sign up failed'
			return
		}

		await authClient.useSession().get().refetch()
		await goto('/dashboard', { invalidateAll: true })
	}
</script>

<h1>Create account</h1>

<form class="grid" method="post" onsubmit={signUp}>
	<label>
		Name<br />
		<input name="name" placeholder="Shohei Ohtani" autocomplete="name" required />
	</label>
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
				autocomplete="new-password"
				minlength="8"
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

	<button type="submit" disabled={loading}>{loading ? 'Signing up…' : 'Sign up'}</button>
</form>

<p><a href="/login">Sign in</a> · <a href="/">Home</a></p>
