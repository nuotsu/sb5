import { auth } from '$lib/auth'
import { sql } from '../db.server'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ request }) => {
	const session = await auth.api.getSession({ headers: request.headers })
	if (!session) return { cells: [] }

	const rows = await sql`
		SELECT id, col_span, row_span, "order", type
		FROM dashboard_cells
		WHERE user_id = ${session.user.id}
		ORDER BY "order"
	`

	return { cells: rows }
}
