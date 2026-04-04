<script lang="ts">
	import './layout.css'
	import favicon from '$lib/assets/favicon.svg'
	import { dropdown } from '$lib/attachments'
	import { useAuthSession } from '$lib/auth/session.svelte'
	import SignOut from '$ui/sign-out.svelte'

	let { children } = $props()

	const auth = useAuthSession()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="flex justify-between gap-ch p-ch">
	<a href="/">sb5</a>

	<details class="dropdown" {@attach dropdown()}>
		<summary>Account</summary>

		<nav class="grid">
			{#if auth.isPending}
				<loading>Loading</loading>
			{:else if auth.user}
				<div>Signed in ({auth.user.email})</div>
				<SignOut class="link" />
			{:else}
				<a href="/login">Log in</a>
				<a href="/signup">Sign up</a>
			{/if}
		</nav>
	</details>
</header>

{@render children()}
