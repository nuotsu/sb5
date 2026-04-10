export const cells = $state<Dashboard.Cell[]>([])

export const cellTypes: {
	type: string
}[] = [{ type: 'Bogus' }]

let saveTimeout: ReturnType<typeof setTimeout>

export function removeCell(id: string) {
	const idx = cells.findIndex((c) => c.id === id)
	if (idx < 0) return
	cells.splice(idx, 1)
	cells.forEach((c, i) => (c.order = i))
	scheduleSave()
}

export function scheduleSave() {
	clearTimeout(saveTimeout)
	saveTimeout = setTimeout(async () => {
		await fetch('/api/dashboard', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(cells),
		})
	}, 1000)
}
