import { useEditor, useValue } from '@bigbluebutton/editor'

/** @public */
export function useCanUndo() {
	const editor = useEditor()
	return useValue('useCanUndo', () => editor.getCanUndo(), [editor])
}
