import type { Attachment } from 'svelte/attachments'

export default function (): Attachment {
	return (element) => {
		// set unique anchor name

		;(element as HTMLElement).style.setProperty(
			'--anchor',
			`--dropdown-${Math.random().toString(36).substring(2, 15)}`,
		)

		// if desktop, add mouse events

		const mediaQuery = window.matchMedia('(pointer: fine)')

		function mouseenter(this: HTMLElement) {
			;(this as HTMLDetailsElement).open = true
		}

		function mouseleave(this: HTMLElement) {
			;(this as HTMLDetailsElement).removeAttribute('open')
		}

		function handleMouseEvents(matches: boolean) {
			element.removeEventListener('mouseenter', mouseenter)
			element.removeEventListener('mouseleave', mouseleave)

			if (matches) {
				element.addEventListener('mouseenter', mouseenter)
				element.addEventListener('mouseleave', mouseleave)
			}
		}

		handleMouseEvents(mediaQuery.matches)

		function onMediaChange(e: MediaQueryListEvent) {
			handleMouseEvents(e.matches)
		}

		mediaQuery.addEventListener('change', onMediaChange)

		return () => {
			mediaQuery.removeEventListener('change', onMediaChange)
			element.removeEventListener('mouseenter', mouseenter)
			element.removeEventListener('mouseleave', mouseleave)
		}
	}
}
