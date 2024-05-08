import { useEditor, useValue } from '@bigbluebutton/editor'

/** @public */
export function useCanRedo() {
	const editor = useEditor()
	return useValue('useCanRedo', () => editor.getCanRedo(), [editor])
}
