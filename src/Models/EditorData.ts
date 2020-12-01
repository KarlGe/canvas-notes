import ElementPosition from './ElementPosition';

export default class EditorData {
  position: ElementPosition;
  wrapper: HTMLElement;
  constructor(position: ElementPosition, wrapper: HTMLElement = null) {
    this.position = position;
    this.wrapper = wrapper;
  }

  getInitialClickPosition() {
    if (this.wrapper) {
      const { offsetTop, offsetLeft } = this.wrapper;
      const { x, y } = this.position;
      return new ElementPosition(x + offsetLeft, y + offsetTop);
    }
    return null;
  }
}
