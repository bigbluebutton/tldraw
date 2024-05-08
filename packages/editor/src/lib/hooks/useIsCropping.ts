import { useValue } from '@bigbluebutton/state'
import { TLShapeId } from '@bigbluebutton/tlschema'
import { useEditor } from './useEditor'

/** @public */
export function useIsCropping(shapeId: TLShapeId) {
	const editor = useEditor()
	return useValue('isCropping', () => editor.getCroppingShapeId() === shapeId, [editor, shapeId])
}
