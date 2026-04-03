/**
 * Minimal Better Auth config for the CLI (`bun run db:migrate` only).
 * Keep `emailAndPassword` / `database` in sync with `src/lib/auth/index.ts`.
 * Do not import SvelteKit-only modules here — the CLI cannot resolve them.
 */
import 'dotenv/config'
import { betterAuth } from 'better-auth'
import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
	throw new Error('DATABASE_URL is required to run Better Auth migrations')
}

export const auth = betterAuth({
	database: new Pool({ connectionString }),
	emailAndPassword: {
		enabled: true,
	},
})
