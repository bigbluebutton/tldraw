import {
	HTMLContainer,
	Rectangle2d,
	ShapeUtil,
	TLOnResizeHandler,
	getDefaultColorTheme,
	resizeBox,
} from '@bigbluebutton/editor'

import ChatPollContent from './components/poll-content'
import { pollShapeMigrations } from './poll-shape-migrations'
import { pollShapeProps } from './poll-shape-props'
import { IPollShape } from './poll-shape-types'

export class PollShapeUtil extends ShapeUtil<IPollShape> {
	static override type = 'poll' as const

	static override props = pollShapeProps

	static override migrations = pollShapeMigrations

	override isAspectRatioLocked = (_shape: IPollShape) => false

	override canResize = (_shape: IPollShape) => true

	override canBind = (_shape: IPollShape) => true

	getDefaultProps(): IPollShape['props'] {
		return {
			w: 300,
			h: 300,
			color: 'black',
			fill: 'white',
			question: '',
			numRespondents: 0,
			numResponders: 0,
			questionText: '',
			questionType: '',
			answers: [],
		}
	}

	getGeometry(shape: IPollShape) {
		return new Rectangle2d({
			width: shape.props.w,
			height: shape.props.h,
			isFilled: true,
		})
	}

	component(shape: IPollShape) {
		// Use the shape's specified width and height, falling back to defaults if missing or invalid.
		const width = shape.props.w > 0 ? shape.props.w : 300
		const height = shape.props.h > 0 ? shape.props.h : 300

		const theme = getDefaultColorTheme({
			isDarkMode: this.editor.user.getIsDarkMode(),
		})

		// const contentRef = React.useRef<HTMLDivElement>(null)
		const pollMetadata = JSON.stringify({
			id: shape.id,
			question: shape.props.question,
			numRespondents: shape.props.numRespondents,
			numResponders: shape.props.numResponders,
			questionText: shape.props.questionText,
			questionType: shape.props.questionType,
			answers: shape.props.answers,
		})

		const adjustedHeight = shape.props.questionText.length > 0 ? height - 75 : height

		return (
			<HTMLContainer
				id={shape.id}
				style={{
					border: '1px solid #8B9AA8',
					borderRadius: '4px',
					boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.20)',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					pointerEvents: 'all',
					backgroundColor: theme[shape.props.color].semi,
					color: theme[shape.props.color].solid,
				}}
			>
				<div
					style={{
						width: `${width}px`,
						height: `${height}px`,
						overflow: 'hidden',
						position: 'relative',
					}}
				>
					<ChatPollContent metadata={pollMetadata} height={adjustedHeight} width={width} />
				</div>
			</HTMLContainer>
		)
	}

	indicator(shape: IPollShape) {
		return <rect width={shape.props.w} height={shape.props.h} />
	}

	override onResize: TLOnResizeHandler<IPollShape> = (shape, info) => {
		return resizeBox(shape, info)
	}
}

export default PollShapeUtil
