// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	namespace Dashboard {
		type Cell = {
			id: string
			colSpan: number
			rowSpan: number
			order: number
			type: string
		}

		type GridContext = {
			readonly el: HTMLElement | undefined
			readonly isMobile: boolean
			cols: number
			reorderCells: (fromId: string, toId: string) => void
		}

		type CellContext = {
			registerOptions: (snippet: import('svelte').Snippet) => void
		}
	}
}

export {}
