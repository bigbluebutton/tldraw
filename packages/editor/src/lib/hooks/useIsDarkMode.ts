import { useValue } from '@bigbluebutton/state'
import { useEditor } from './useEditor'

/** @public */
export function useIsDarkMode() {
	const editor = useEditor()
	return useValue('isDarkMode', () => editor.user.getIsDarkMode(), [editor])
}
