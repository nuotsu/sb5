import { createAuthClient } from 'better-auth/svelte'

export const authClient = createAuthClient({
	/** The base URL of the server (optional if you're using the same domain) */
	// baseURL: dev ? 'http://localhost:3000' : BETTER_AUTH_URL,
})
