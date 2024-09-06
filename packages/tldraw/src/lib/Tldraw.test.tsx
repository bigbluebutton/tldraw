import { BaseBoxShapeUtil, Editor } from '@bigbluebutton/editor'
import { act, render, screen } from '@testing-library/react'
import { useState } from 'react'
import { Tldraw } from './Tldraw'

describe('<Tldraw />', () => {
	it('Renders without crashing', async () => {
		render(
			<Tldraw>
				<div data-testid="canvas-1" />
			</Tldraw>
		)

		await screen.findByTestId('canvas-1')
	})

	it('Doesnt cause re-render loops with unstable shape utils + tools', async () => {
		function TestComponent() {
			const [_, setEditor] = useState<Editor | null>(null)

			return (
				<Tldraw onMount={setEditor} shapeUtils={[]} tools={[]}>
					<div data-testid="canvas-1" />
				</Tldraw>
			)
		}

		render(<TestComponent />)
		await screen.findByTestId('canvas-1')
	})

	it('Doesnt cause re-render loops when shape utils change', async () => {
		class FakeShapeUtil1 extends BaseBoxShapeUtil<any> {
			static override type = 'fake' as const
			override getDefaultProps() {
				throw new Error('Method not implemented.')
			}
			override component(_: any) {
				throw new Error('Method not implemented.')
			}
			override indicator(_: any) {
				throw new Error('Method not implemented.')
			}
		}
		class FakeShapeUtil2 extends BaseBoxShapeUtil<any> {
			static override type = 'fake' as const
			override getDefaultProps() {
				throw new Error('Method not implemented.')
			}
			override component(_: any) {
				throw new Error('Method not implemented.')
			}
			override indicator(_: any) {
				throw new Error('Method not implemented.')
			}
		}

		const rendered = render(
			<Tldraw shapeUtils={[FakeShapeUtil1]}>
				<div data-testid="canvas-1" />
			</Tldraw>
		)
		await screen.findByTestId('canvas-1')

		await act(async () => {
			rendered.rerender(
				<Tldraw shapeUtils={[FakeShapeUtil2]}>
					<div data-testid="canvas-2" />
				</Tldraw>
			)
		})
		await screen.findByTestId('canvas-2')
	})
})
