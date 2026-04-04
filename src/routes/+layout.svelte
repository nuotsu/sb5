<script lang="ts">
	import './layout.css'
	import favicon from '$lib/assets/favicon.svg'
	import { dropdown } from '$lib/attachments'

	let { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="flex justify-between gap-ch p-ch">
	<a href="/">sb5</a>

	<details class="dropdown" {@attach dropdown()}>
		<summary>Account</summary>

		<nav class="grid">
			<a href="/login">Log in</a>
			<a href="/signup">Sign up</a>
		</nav>
	</details>
</header>

{@render children()}
