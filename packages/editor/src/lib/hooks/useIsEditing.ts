import { useValue } from '@bigbluebutton/state'
import { TLShapeId } from '@bigbluebutton/tlschema'
import { useEditor } from './useEditor'

/** @public */
export function useIsEditing(shapeId: TLShapeId) {
	const editor = useEditor()
	return useValue('isEditing', () => editor.getEditingShapeId() === shapeId, [editor, shapeId])
}
