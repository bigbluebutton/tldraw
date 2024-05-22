import { defineMigrations } from '@bigbluebutton/store'
import { T } from '@bigbluebutton/validate'
import { ShapePropsType, TLBaseShape } from './TLBaseShape'

/** @public */
export const frameShapeProps = {
	w: T.nonZeroNumber,
	h: T.nonZeroNumber,
	name: T.string,
}

type TLFrameShapeProps = ShapePropsType<typeof frameShapeProps>

/** @public */
export type TLFrameShape = TLBaseShape<'frame', TLFrameShapeProps>

/** @internal */
export const frameShapeMigrations = defineMigrations({})
