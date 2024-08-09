// Reasonable defaults
const MAX_ZOOM_STEP = 10
const IS_DARWIN = /Mac|iPod|iPhone|iPad/.test(
	// eslint-disable-next-line deprecation/deprecation
	typeof window === 'undefined' ? 'node' : window.navigator.platform
)

// Adapted from https://stackoverflow.com/a/13650579
/** @internal */
export function normalizeWheel(event: WheelEvent | React.WheelEvent<HTMLElement>) {
	let { deltaY, deltaX } = event
	let deltaZ = 0

	if (!event.ctrlKey && !event.altKey && !event.metaKey) {
		// No modifier key pressed - Zoom in/out
		const signY = Math.sign(deltaY)
		const absDeltaY = Math.abs(deltaY)

		let dy = deltaY
		if (absDeltaY > MAX_ZOOM_STEP) {
			dy = MAX_ZOOM_STEP * signY
		}

		deltaZ = dy / 100;
		deltaX = 0
		deltaY = 0
	} else if (event.ctrlKey || event.altKey || event.metaKey) {
		// Ctrl/Alt/Meta key pressed - Pan vertically (up/down)
		deltaZ = 0
	} else if (event.shiftKey && !IS_DARWIN) {
		// Shift + Scroll = Pan horizontally (left/right)
		deltaX = deltaY
		deltaY = 0
	}

	return { x: -deltaX, y: -deltaY, z: -deltaZ }
}
