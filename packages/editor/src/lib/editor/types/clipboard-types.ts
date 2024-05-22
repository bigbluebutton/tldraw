import { SerializedSchema } from '@bigbluebutton/store'
import { TLAsset, TLShape, TLShapeId } from '@bigbluebutton/tlschema'

/** @public */
export interface TLContent {
	shapes: TLShape[]
	rootShapeIds: TLShapeId[]
	assets: TLAsset[]
	schema: SerializedSchema
}
