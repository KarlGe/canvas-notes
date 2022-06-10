import ElementPosition from './ElementPosition';
import { ReactText } from 'react';
import { Descendant } from 'slate';
import { DatabaseEditor } from './DatabaseDocument';

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
  static FromDatabaseEditor = (editor: DatabaseEditor) => {
    const { uuid, position, content } = editor;
    const documentContent = JSON.parse(content);
    return new EditorData(
      uuid,
      new ElementPosition(position.x, position.y),
      documentContent
    );
  };
}
