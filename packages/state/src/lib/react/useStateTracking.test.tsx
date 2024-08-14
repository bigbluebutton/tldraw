import { act, render } from '@testing-library/react'
import * as React from 'react'
import { atom } from '../core/Atom'
import { useStateTracking } from './useStateTracking'

describe('useStateTracking', () => {
	it('causes a rerender when a dependency changes', async () => {
		const a = atom('', 0)

		const Component = () => {
			const val = useStateTracking('', () => {
				return a.get()
			})
			return <>You are {val} years old</>
		}

		let view = render(<Component />)

		await act(async () => {
			view = render(<Component />)
		})

		expect(view.container!.textContent).toMatchInlineSnapshot(`"You are 0 years old"`)

		act(() => {
			a.set(1)
		})

		expect(view.container!.textContent).toMatchInlineSnapshot(`"You are 1 years old"`)
	})

	it('allows using hooks inside the callback', async () => {
		const _age = atom('', 0)
		let setHeight: (height: number) => void

		const Component = () => {
			let height
			const age = useStateTracking('', () => {
				// eslint-disable-next-line react-hooks/rules-of-hooks
				;[height, setHeight] = React.useState(20)
				return _age.get()
			})
			return (
				<>
					You are {age} years old and {height} meters tall
				</>
			)
		}

		let view = render(<Component />)

		await act(async () => {
			view = render(<Component />)
		})

		expect(view.container!.textContent).toMatchInlineSnapshot(
			`"You are 0 years old and 20 meters tall"`
		)

		act(() => {
			_age.set(1)
		})

		expect(view.container!.textContent).toMatchInlineSnapshot(
			`"You are 1 years old and 20 meters tall"`
		)

		act(() => {
			setHeight(21)
		})

		expect(view.container!.textContent).toMatchInlineSnapshot(
			`"You are 1 years old and 21 meters tall"`
		)
	})

	it('allows throwing promises to trigger suspense boundaries', async () => {
		const a = atom<null | number>('age', null)

		let resolve = (_val: string) => {
			// noop
		}

		const Component = () => {
			const val = useStateTracking('', () => {
				if (a.get() === null) {
					throw new Promise<string>((r) => {
						resolve = r
					})
				}
				return a.get()
			})
			return <>You are {val} years old</>
		}

		let view = render(
			<React.Suspense fallback={<>fallback</>}>
				<Component />
			</React.Suspense>
		)

		await act(async () => {
			view = render(
				<React.Suspense fallback={<>fallback</>}>
					<Component />
				</React.Suspense>
			)
		})

		expect(view.container!.textContent).toMatchInlineSnapshot(`"fallback"`)

		act(() => {
			a.set(1)
		})

		expect(view.container!.textContent).toMatchInlineSnapshot(`"fallback"`)

		act(() => {
			resolve('resolved')
		})

		expect(view.container!.textContent).toMatchInlineSnapshot(`"You are 1 years old"`)
	})

	it('stops reacting when the component unmounts', async () => {
		const a = atom('', 0)
		let numRenders = 0
		const Component = () => {
			const val = useStateTracking('', () => {
				numRenders++
				return a.get()
			})
			return <>You are {val} years old</>
		}

		let view = render(React.createElement(Component))

		await act(async () => {
			view = render(React.createElement(Component))
		})

		expect(view.container!.textContent).toMatchInlineSnapshot(`"You are 0 years old"`)
		expect(numRenders).toBe(1)

		act(() => {
			a.set(1)
		})

		expect(view.container!.textContent).toMatchInlineSnapshot(`"You are 1 years old"`)
		expect(numRenders).toBe(2)

		await act(async () => {
			view.unmount()
		})

		act(() => {
			a.set(2)
		})

		expect(numRenders).toBe(2)
	})
})
