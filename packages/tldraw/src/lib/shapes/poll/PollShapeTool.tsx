import { BaseBoxShapeTool } from "@bigbluebutton/editor";

export class PollShapeTool extends BaseBoxShapeTool {
    static override id = 'poll'
    static override initial = 'idle'
    override shapeType = 'poll'
}
