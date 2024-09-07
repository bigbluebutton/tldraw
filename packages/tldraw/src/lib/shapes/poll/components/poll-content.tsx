import { TLUiTranslationKey } from '../../../ui/hooks/useTranslation/TLUiTranslationKey'
import React from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import Styled from './styles'

const caseInsensitiveReducer = (acc: any[], item: { key: string; numVotes: number }) => {
	const index = acc.findIndex((ans) => ans.key.toLowerCase() === item.key.toLowerCase())
	if (index !== -1) {
		if (acc[index].numVotes >= item.numVotes) acc[index].numVotes += item.numVotes
		else {
			const tempVotes = acc[index].numVotes
			acc[index] = item
			acc[index].numVotes += tempVotes
		}
	} else {
		acc.push(item)
	}
	return acc
}

interface ChatPollContentProps {
	metadata: string
	height?: number
}

interface Metadata {
	id: string
	question: string
	numRespondents: number
	numResponders: number
	questionText: string
	questionType: string
	answers: Array<Answers>
}

interface Answers {
	key: string
	numVotes: number
	id: number
}

function assertAsMetadata(metadata: unknown): asserts metadata is Metadata {
	if (typeof metadata !== 'object' || metadata === null) {
		throw new Error('metadata is not an object')
	}
	if (typeof (metadata as Metadata).id !== 'string') {
		throw new Error('metadata.id is not a string')
	}
	if (typeof (metadata as Metadata).numRespondents !== 'number') {
		throw new Error('metadata.numRespondents is not a number')
	}
	if (typeof (metadata as Metadata).numResponders !== 'number') {
		throw new Error('metadata.numResponders is not a number')
	}
	if (typeof (metadata as Metadata).questionText !== 'string') {
		throw new Error('metadata.questionText is not a string')
	}
	if (typeof (metadata as Metadata).questionType !== 'string') {
		throw new Error('metadata.questionType is not a string')
	}
	if (!Array.isArray((metadata as Metadata).answers)) {
		throw new Error('metadata.answers is not an array')
	}
}

const ChatPollContent: React.FC<ChatPollContentProps> = ({
	metadata: string,
	height = undefined,
}) => {
	const pollData = JSON.parse(string) as unknown
	assertAsMetadata(pollData)

	const answers = pollData.answers.reduce(caseInsensitiveReducer, [])

	const translatedAnswers = answers.map((answer: Answers) => {
		const translationKey = answer.key as TLUiTranslationKey
		const pollAnswer = translationKey ? translationKey : answer.key
		return {
			...answer,
			pollAnswer,
		}
	})

	const useHeight = height || translatedAnswers.length * 50
	return (
		<Styled.PollWrapper data-test="chatPollMessageText">
			<Styled.PollText>{pollData.questionText}</Styled.PollText>
			<ResponsiveContainer width="90%" height={useHeight}>
				<BarChart data={translatedAnswers} layout="vertical">
					<XAxis type="number" />
					<YAxis width={80} type="category" dataKey="pollAnswer" />
					<Bar dataKey="numVotes" fill="#0C57A7" />
				</BarChart>
			</ResponsiveContainer>
		</Styled.PollWrapper>
	)
}

export default ChatPollContent
