import { auth } from '$lib/auth'
import { sql } from '../../../db.server'
import type { RequestHandler } from './$types'

export const PUT: RequestHandler = async ({ request }) => {
	const session = await auth.api.getSession({ headers: request.headers })
	if (!session) return new Response('Unauthorized', { status: 401 })

	const cells: Dashboard.Cell[] = await request.json()
	const userId = session.user.id

	await sql`DELETE FROM dashboard_cells WHERE user_id = ${userId}`

	if (cells.length > 0) {
		await Promise.all(
			cells.map(
				(cell) => sql`
				INSERT INTO dashboard_cells (id, user_id, col_span, row_span, "order", type)
				VALUES (${cell.id}, ${userId}, ${cell.colSpan}, ${cell.rowSpan}, ${cell.order}, ${cell.type})
			`,
			),
		)
	}

	return new Response(JSON.stringify({ ok: true }), {
		headers: { 'Content-Type': 'application/json' },
	})
}
