import { authClient } from './client'

/**
 * Better Auth session as Svelte runes (`$state` + `$effect`).
 *
 * **Do not destructure** the return value (`const { user } = …` breaks reactivity).
 * Use `const auth = useAuthSession()` then `auth.user`, `auth.isPending`, etc.
 */
export function useAuthSession() {
	const session = authClient.useSession()
	let snapshot = $state(session.get())

	$effect(() => {
		return session.subscribe((value) => {
			snapshot = value
		})
	})

	const user = $derived(snapshot.data?.user ?? null)
	const isPending = $derived(snapshot.isPending)
	const isSignedIn = $derived(user !== null)

	// Getters so the returned object stays reactive (plain `{ snapshot }` captures initial values only).
	return {
		get snapshot() {
			return snapshot
		},
		get user() {
			return user
		},
		get isPending() {
			return isPending
		},
		get isSignedIn() {
			return isSignedIn
		},
	}
}
