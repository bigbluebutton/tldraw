import { RenderResult, act, render } from '@testing-library/react'
import { createRef, forwardRef, useEffect, useImperativeHandle } from 'react'
import { atom } from '../core/Atom'
import { track } from './track'

// test("tracked components are memo'd", async () => {
// 	let numRenders = 0
// 	const Component = track(function Component({ a, b, c }: { a: string; b: string; c: string }) {
// 		numRenders++
// 		return (
// 			<>
// 				{a}
// 				{b}
// 				{c}
// 			</>
// 		)
// 	})

// 	let view: RenderResult | undefined
// 	await act(() => {
// 		view = render(<Component a="a" b="b" c="c" />)
// 	})

// 	if (view) {
// 		expect(view.container.textContent).toMatchInlineSnapshot(`
// 			"a
// 			b
// 			c"
// 		`)

// 		expect(numRenders).toBe(1)

// 		await act(() => {
// 			view!.rerender(<Component a="a" b="b" c="c" />)
// 		})

// 		expect(numRenders).toBe(1)

// 		await act(() => {
// 			view!.rerender(<Component a="a" b="b" c="d" />)
// 		})

// 		expect(numRenders).toBe(2)

// 		expect(view.container.textContent).toMatchInlineSnapshot(`
// 			"a
// 			b
// 			d"
// 		`)
// 	}
// })

// test("it's fine to call track on components that are already memo'd", async () => {
// 	let numRenders = 0
// 	const Component = track(
// 		memo(function Component({ a, b, c }: { a: string; b: string; c: string }) {
// 			numRenders++
// 			return (
// 				<>
// 					{a}
// 					{b}
// 					{c}
// 				</>
// 			)
// 		})
// 	)

// 	let view: RenderResult | undefined
// 	await act(() => {
// 		view = render(<Component a="a" b="b" c="c" />)
// 	})

// 	if (view) {
// 		expect(view.container.textContent).toMatchInlineSnapshot(`
// 			"a
// 			b
// 			c"
// 		`)

// 		expect(numRenders).toBe(1)

// 		await act(() => {
// 			view!.rerender(<Component a="a" b="b" c="c" />)
// 		})

// 		expect(numRenders).toBe(1)

// 		await act(() => {
// 			view!.rerender(<Component a="a" b="b" c="d" />)
// 		})

// 		expect(numRenders).toBe(2)

// 		expect(view.container.textContent).toMatchInlineSnapshot(`
// 			"a
// 			b
// 			d"
// 		`)
// 	}
// })

test('tracked components can use refs', async () => {
	const Component = track(
		forwardRef<{ handle: string }, { prop: string }>(function Component({ prop }, ref) {
			useImperativeHandle(ref, () => ({ handle: prop }), [prop])
			return <>output</>
		})
	)

	const ref = createRef<{ handle: string }>()

	let view: RenderResult | undefined
	await act(() => {
		view = render(<Component prop="hello" ref={ref} />)
	})

	if (view) {
		expect(view.container.textContent).toMatchInlineSnapshot('"output"')

		expect(ref.current?.handle).toBe('hello')

		await act(() => {
			view!.rerender(<Component prop="world" ref={ref} />)
		})

		expect(view.container.textContent).toMatchInlineSnapshot('"output"')

		expect(ref.current?.handle).toBe('world')
	}
})

test('tracked components update when the state they reference updates', async () => {
	const a = atom('a', 1)

	const C = track(function Component() {
		return <>{a.get()}</>
	})

	let view: RenderResult | undefined

	await act(() => {
		view = render(<C />)
	})

	if (view) {
		expect(view.container.textContent).toMatchInlineSnapshot(`"1"`)

		await act(() => {
			a.set(2)
		})

		expect(view.container.textContent).toMatchInlineSnapshot(`"2"`)
	}
})

test('things referenced in effects do not trigger updates', async () => {
	const a = atom('a', 1)
	let numRenders = 0

	const Component = track(function Component() {
		numRenders++
		useEffect(() => {
			a.get()
		}, [])
		return <>hi</>
	})

	let view: RenderResult | undefined

	await act(() => {
		view = render(<Component />)
	})

	if (view) {
		expect(view.container.textContent).toMatchInlineSnapshot(`"hi"`)
		expect(numRenders).toBe(1)

		await act(() => {
			a.set(2)
		})

		expect(numRenders).toBe(1)
		expect(view.container.textContent).toMatchInlineSnapshot(`"hi"`)
	}
})

// test("tracked zombie-children don't throw", async () => {
// 	const theAtom = atom<Record<string, number>>('map', { a: 1, b: 2, c: 3 })
// 	const Parent = track(function Parent() {
// 		const ids = Object.keys(theAtom.get())
// 		return (
// 			<>
// 				{ids.map((id) => (
// 					<Child key={id} id={id} />
// 				))}
// 			</>
// 		)
// 	})
// 	const Child = track(function Child({ id }: { id: string }) {
// 		if (!(id in theAtom.get())) throw new Error('id not found!')
// 		const value = theAtom.get()[id]
// 		return <>{value}</>
// 	})

// 	let view: RenderResult | undefined
// 	await act(() => {
// 		view = render(<Parent />)
// 	})

// 	if (view) {
// 		expect(view.container.textContent).toMatchInlineSnapshot(`
// 			"1
// 			2
// 			3"
// 		`)

// 		// remove id 'b' creating a zombie-child
// 		await act(() => {
// 			theAtom?.update(({ b: _, ...rest }) => rest)
// 		})

// 		expect(view.container.textContent).toMatchInlineSnapshot(`
// 			"1
// 			3"
// 		`)
// 	}
// })
