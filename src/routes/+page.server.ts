import { sql } from '../db.server'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const response = await sql`SELECT version()`
	const { version } = response[0]

	return {
		version,
	}
}
