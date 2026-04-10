<script lang="ts">
	import { useAuthSession } from '$lib/auth/session.svelte'
	import type { Component } from 'svelte'
	import Login from './login.svelte'
	import SignOut from './sign-out.svelte'
	import SignUp from './sign-up.svelte'

	let { name }: { name?: string } = $props()

	const auth = useAuthSession()

	const actions: {
		label: string
		component: Component
	}[] = [
		{ label: 'Login', component: Login },
		{ label: 'Sign up', component: SignUp },
	]
</script>

<details class="dropdown" style:--anchor="--account-dropdown" {name}>
	<summary class="link">Account</summary>

	<nav class="grid gap-ch p-ch">
		{#if auth.isPending}
			<loading>Loading</loading>
		{:else if auth.user}
			<div>
				Signed in as:
				<div class="text-center">{auth.user.email}</div>
			</div>
			<SignOut class="link" />
		{:else}
			<div class="grid grid-cols-[1fr_auto_1fr] gap-ch">
				{#each actions as { label, component: Component }, i}
					<label
						class="text-center not-has-checked:link not-has-checked:opacity-50 has-checked:underline"
						for="account-dropdown-{label}"
					>
						{label}

						<input
							id="account-dropdown-{label}"
							name="account-dropdown"
							type="radio"
							checked={i === 0}
							hidden
						/>
					</label>

					<Component class="order-last col-span-full" />

					{#if i < actions.length - 1}
						<span class="opacity-50">or</span>
					{/if}
				{/each}
			</div>
		{/if}
	</nav>
</details>

<style>
	label:not(:has(:checked)) + :global(form) {
		display: none;
	}
</style>
