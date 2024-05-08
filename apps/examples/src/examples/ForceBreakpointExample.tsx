import { Tldraw } from '@bigbluebutton/tldraw'
import '@bigbluebutton/tldraw/tldraw.css'

export default function ForceMobileExample() {
	return (
		<div className="tldraw__editor">
			<Tldraw persistenceKey="tldraw_example" forceMobile />
		</div>
	)
}
