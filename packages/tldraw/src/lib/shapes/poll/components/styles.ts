import styled from 'styled-components'

export const PollText = styled.div`
	margin-top: 0.5rem;
	margin-bottom: 0.5rem;
	font-size: 1.25rem;
	font-weight: 500;
	margin-left: 2.75rem;
	color: var(--color-text, var(--color-gray, #4e5a66));
	word-break: break-word;
`

export const PollWrapper = styled.div`
	width: 100%;
`

export default {
	PollText,
	PollWrapper,
}
