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
			id: number
			colSpan: number
			rowSpan: number
			order: number
		}

		type GridContext = {
			readonly el: HTMLElement | undefined
			readonly isMobile: boolean
			cols: number
			reorderCells: (fromId: number, toId: number) => void
		}
	}
}

export {}
