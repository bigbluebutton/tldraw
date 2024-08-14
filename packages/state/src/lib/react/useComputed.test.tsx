import { act, render } from '@testing-library/react'
import { useState } from 'react'
import { Atom } from '../core/Atom'
import { Computed } from '../core/Computed'
import { useAtom } from './useAtom'
import { useComputed } from './useComputed'
import { useValue } from './useValue'

test('useComputed returns a computed value', async () => {
	let theComputed: Computed<number> | null = null
	let theAtom: Atom<number> | null = null
	function Component() {
		const a = useAtom('a', 1)
		theAtom = a
		const b = useComputed('a+1', () => a.get() + 1, [])
		theComputed = b
		return <>{useValue(b)}</>
	}

	let view = render(<Component />)

	await act(async () => {
		view = render(<Component />)
	})

	expect(theComputed).not.toBeNull()
	expect(theComputed!.get()).toBe(2)
	expect(theComputed!.name).toBe('useComputed(a+1)')
	expect(view.container.textContent).toMatchInlineSnapshot(`"2"`)

	await act(async () => {
		theAtom?.set(5)
	})
	expect(view.container.textContent).toMatchInlineSnapshot(`"6"`)
})

test('useComputed has a dependencies array that allows creating a new computed', async () => {
	let theComputed: Computed<number> | null = null
	let theAtom: Atom<number> | null = null
	let setCount: ((count: number) => void) | null = null
	function Component() {
		const [count, _setCount] = useState(0)
		setCount = _setCount
		const a = useAtom('a', 1)
		theAtom = a
		const b = useComputed('a+1', () => a.get() + 1, [count])
		theComputed = b
		return <>{useValue(b)}</>
	}

	let view = render(<Component />)

	const initialComputed = theComputed

	await act(async () => {
		view = render(<Component />)
	})

	expect(theComputed).not.toBeNull()
	expect(theComputed!.get()).toBe(2)
	expect(theComputed!.name).toBe('useComputed(a+1)')
	expect(view.container.textContent).toMatchInlineSnapshot(`"2"`)

	await act(async () => {
		theAtom?.set(5)
	})
	expect(view.container.textContent).toMatchInlineSnapshot(`"6"`)

	expect(initialComputed).toBe(theComputed)

	await act(async () => {
		setCount?.(2)
	})

	expect(initialComputed).not.toBe(theComputed)
})

test('useComputed allows optionally passing options', async () => {
	let theComputed: Computed<number> | null = null
	let theAtom: Atom<number> | null = null
	let setCount: ((count: number) => void) | null = null
	const isEqual = jest.fn((a, b) => a === b)
	function Component() {
		const [count, _setCount] = useState(0)
		setCount = _setCount
		const a = useAtom('a', 1)
		theAtom = a
		const b = useComputed('a+1', () => a.get() + 1, { isEqual }, [count])
		theComputed = b
		return <>{useValue(b)}</>
	}

	let view = render(<Component />)

	const initialComputed = theComputed

	await act(async () => {
		view = render(<Component />)
	})

	expect(theComputed).not.toBeNull()
	expect(theComputed!.get()).toBe(2)
	expect(theComputed!.name).toBe('useComputed(a+1)')
	expect(view.container.textContent).toMatchInlineSnapshot(`"2"`)

	await act(async () => {
		theAtom?.set(5)
	})
	expect(view.container.textContent).toMatchInlineSnapshot(`"6"`)

	expect(initialComputed).toBe(theComputed)

	await act(async () => {
		setCount?.(2)
	})

	expect(initialComputed).not.toBe(theComputed)

	expect(isEqual).toHaveBeenCalled()
})
