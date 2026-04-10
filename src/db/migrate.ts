import 'dotenv/config'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

await sql`
	CREATE TABLE IF NOT EXISTS dashboard_cells (
		id       TEXT NOT NULL,
		user_id  TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
		col_span INT  NOT NULL DEFAULT 1,
		row_span INT  NOT NULL DEFAULT 1,
		"order"  INT  NOT NULL DEFAULT 0,
		type     TEXT NOT NULL,
		PRIMARY KEY (id, user_id)
	)
`

console.log('Migration complete: dashboard_cells table ready')
