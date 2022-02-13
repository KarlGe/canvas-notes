import ElementPosition from './ElementPosition';
import { ReactText } from 'react';
import { Descendant } from 'slate';

export default class EditorData {
  uuid: string;
  content: Descendant[];
  position: ElementPosition;

  constructor(uuid: string, position: ElementPosition) {
    this.uuid = uuid;
    this.position = position;
  }

  getInitialClickPosition(
    additionalOffsetX: number = 0,
    additionalOffsetY: number = 0
  ) {
    const { x, y } = this.position;
    return new ElementPosition(x + additionalOffsetX, y + additionalOffsetY);
  }
}
