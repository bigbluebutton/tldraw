import { useEditor, useValue } from '@bigbluebutton/editor'

/** @public */
export function useReadonly() {
	const editor = useEditor()
	return useValue('isReadonlyMode', () => editor.getInstanceState().isReadonly, [editor])
}
