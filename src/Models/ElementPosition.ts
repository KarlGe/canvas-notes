import { IPosition } from './DatabaseDocument';

export default class ElementPosition implements IPosition {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(xOffset: number, yOffset: number, increment = 10) {
    this.x = this.min(this.x + xOffset);
    this.y = this.min(this.y + yOffset);
  }

  min(value: number, minValue: number = 0) {
    return value < minValue ? minValue : value;
  }

  applyIncrement(increment: number) {
    if (increment == 0) {
      return;
    }
    this.x -= this.x % increment;
    this.y -= this.y % increment;
  }
  getIncrementedStyle(increment: number, offset: IPosition) {
    if (offset == null) {
      return null;
    }
    if (increment == 0) {
      return {
        left: this.min(this.x + offset.x),
        top: this.min(this.y + offset.y),
      };
    }
    return {
      left: this.min(this.x - (this.x % increment) + offset.x),
      top: this.min(this.y - (this.y % increment) + offset.y),
    };
  }
}
