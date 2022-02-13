import ElementPosition from './ElementPosition';
import { ReactText } from 'react';
import { Descendant } from 'slate';

export default class EditorData {
  uuid: string;
  content: Descendant[];
  position: ElementPosition;

  constructor(
    uuid: string,
    position: ElementPosition,
    content: Descendant[] = []
  ) {
    this.uuid = uuid;
    this.position = position;
    this.content = content;
  }

  getInitialClickPosition(
    additionalOffsetX: number = 0,
    additionalOffsetY: number = 0
  ) {
    const { x, y } = this.position;
    return new ElementPosition(x + additionalOffsetX, y + additionalOffsetY);
  }

  setContent(newContent: Descendant[]) {
    this.content = newContent;
    return this;
  }

  clone() {
    return new EditorData(this.uuid, this.position, this.content);
  }
}
