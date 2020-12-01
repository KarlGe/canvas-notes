export default class ElementPosition {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = this.min(x);
    this.y = this.min(y);
  }

  add(xOfset: number, yOfset: number, increment = 10) {
    this.x = this.min(this.x + xOfset);
    this.y = this.min(this.y + yOfset);
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
  getIncrementedStyle(increment: number) {
    if (increment == 0) {
      return {
        left: this.x,
        top: this.y,
      };
    }
    return {
      left: this.x - (this.x % increment),
      top: this.y - (this.y % increment),
    };
  }
}
