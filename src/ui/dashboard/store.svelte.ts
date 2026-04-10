export const cells = $state<Dashboard.Cell[]>([])

let saveTimeout: ReturnType<typeof setTimeout>

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
