import ElementPosition from './ElementPosition';
import { ReactText } from 'react';

export default class EditorData {
  uuid: string;
  position: ElementPosition;
  parentOffset: ElementPosition;
  wrapper: HTMLElement;

  constructor(uuid: string, position: ElementPosition, parentOffset: ElementPosition, wrapper: HTMLElement = null) {
    this.uuid = uuid;
    this.position = position;
    this.wrapper = wrapper;
    this.parentOffset = parentOffset;
  }

  getInitialClickPosition(
    additionalOffsetX: number = 0,
    additionalOffsetY: number = 0
  ) {
    if (this.wrapper) {
      const { x, y } = this.position;
      return new ElementPosition(
        x + additionalOffsetX,
        y + additionalOffsetY
      );
    }
    return null;
  }
}
