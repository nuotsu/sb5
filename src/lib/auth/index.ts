import { dev } from '$app/environment'
import { getRequestEvent } from '$app/server'
import { DATABASE_URL } from '$env/static/private'
import { betterAuth } from 'better-auth'
import { sveltekitCookies } from 'better-auth/svelte-kit'
import { Pool } from 'pg'

/** Local dev origins: BETTER_AUTH_URL is production; trusted origins default from env before request URL. */
const devTrustedOrigins = dev ? (['http://localhost:5173'] as const) : []

export const auth = betterAuth({
	database: new Pool({
		connectionString: DATABASE_URL,
	}),
	emailAndPassword: {
		enabled: true,
	},
	plugins: [sveltekitCookies(getRequestEvent)],
	trustedOrigins: [...devTrustedOrigins],
})
