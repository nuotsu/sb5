<script lang="ts">
	import { goto } from '$app/navigation'
	import { authClient } from '$lib/auth/client'
	import { cn } from '$lib/utils'
	import PasswordField from '$ui/auth/password-field.svelte'
	import type { HTMLAttributes } from 'svelte/elements'

	let { class: className, ...props }: HTMLAttributes<HTMLFormElement> = $props()

	let loading = $state(false)
	let message = $state<string | undefined>(undefined)

	async function onsubmit(e: SubmitEvent) {
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
			callbackURL: '/',
		})
		loading = false

		if (res.error) {
			message = res.error.message ?? 'Sign up failed'
			return
		}

		await authClient.useSession().get().refetch()
		await goto('/', { invalidateAll: true })
	}
</script>

<form class={cn('grid gap-ch', className)} method="post" {onsubmit} {...props}>
	<label class="grid">
		Name
		<input name="name" placeholder="Shohei Ohtani" autocomplete="name" required />
	</label>

	<label class="grid">
		Email
		<input
			type="email"
			name="email"
			placeholder="shohei@theohtani.com"
			autocomplete="email"
			required
		/>
	</label>

	<PasswordField autocomplete="new-password" minlength={8} />

	{#if message}
		<p role="alert">{message}</p>
	{/if}

	<button class="action" type="submit" disabled={loading}>
		{#if loading}
			<loading>Signing up</loading>
		{:else}
			Sign up
		{/if}
	</button>
</form>
