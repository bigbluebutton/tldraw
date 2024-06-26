import { TLTextShape, useEditor, useValue } from '@bigbluebutton/editor'

export function useShowAutoSizeToggle() {
	const editor = useEditor()
	return useValue(
		'showAutoSizeToggle',
		() => {
			const selectedShapes = editor.getSelectedShapes()
			return (
				selectedShapes.length === 1 &&
				editor.isShapeOfType<TLTextShape>(selectedShapes[0], 'text') &&
				selectedShapes[0].props.autoSize === false
			)
		},
		[editor]
	)
}
