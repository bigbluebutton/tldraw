import { defineMigrations } from '@bigbluebutton/store'
import { T } from '@bigbluebutton/validate'
import { ShapePropsType, TLBaseShape } from './TLBaseShape'

/** @public */
export const pollShapeProps = {
	w: T.nonZeroNumber,
	h: T.nonZeroNumber,
}

type TLPollShapeProps = ShapePropsType<typeof pollShapeProps>

/** @public */
export type TLPollShape = TLBaseShape<'poll', TLPollShapeProps>

/** @internal */
export const pollShapeMigrations = defineMigrations({})
