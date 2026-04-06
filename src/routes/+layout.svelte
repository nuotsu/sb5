<script lang="ts">
	import './layout.css'
	import favicon from '$lib/assets/favicon.svg'
	import AccountDropdown from '$ui/auth/account-dropdown.svelte'

	let { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="flex justify-between gap-ch p-ch">
	<a href="/">sb5</a>

	<AccountDropdown />
</header>

<main>{@render children()}</main>
