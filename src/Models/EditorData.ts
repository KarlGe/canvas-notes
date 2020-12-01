import ElementPosition from './ElementPosition';
import { ReactText } from 'react';

export default class EditorData {
  uuid: string;
  position: ElementPosition;
  wrapper: HTMLElement;

  constructor(uuid: string, position: ElementPosition, wrapper: HTMLElement = null) {
    this.uuid = uuid;
    this.position = position;
    this.wrapper = wrapper;
  }

  getInitialClickPosition(
    additionalOfsetX: number = 0,
    additionalOfsetY: number = 0
  ) {
    if (this.wrapper) {
      const { offsetTop, offsetLeft } = this.wrapper;
      const { x, y } = this.position;
      return new ElementPosition(
        x + offsetLeft + additionalOfsetX,
        y + offsetTop + additionalOfsetY
      );
    }
    return null;
  }
}
