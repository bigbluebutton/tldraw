import type { RecordId, UnknownRecord } from '@bigbluebutton/store'
import { T } from '@bigbluebutton/validate'

/** @internal */
export function idValidator<Id extends RecordId<UnknownRecord>>(
	prefix: Id['__type__']['typeName']
): T.Validator<Id> {
	return T.string.refine((id) => {
		if (!id.startsWith(`${prefix}:`)) {
			throw new Error(`${prefix} ID must start with "${prefix}:"`)
		}
		return id as Id
	})
}
