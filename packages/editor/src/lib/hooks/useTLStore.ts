import { StoreSnapshot } from '@bigbluebutton/store'
import { TLRecord } from '@bigbluebutton/tlschema'
import { areObjectsShallowEqual } from '@bigbluebutton/utils'
import { useState } from 'react'
import { TLStoreOptions, createTLStore } from '../config/createTLStore'

/** @public */
type UseTLStoreOptions = TLStoreOptions & {
	snapshot?: StoreSnapshot<TLRecord>
}

function createStore(opts: UseTLStoreOptions) {
	const store = createTLStore(opts)
	if (opts.snapshot) {
		store.loadSnapshot(opts.snapshot)
	}
	return { store, opts }
}

/** @public */
export function useTLStore(opts: TLStoreOptions & { snapshot?: StoreSnapshot<TLRecord> }) {
	const [current, setCurrent] = useState(() => createStore(opts))

	if (!areObjectsShallowEqual(current.opts, opts)) {
		const next = createStore(opts)
		setCurrent(next)
		return next.store
	}

	return current.store
}
