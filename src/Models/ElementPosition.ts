export default class ElementPosition {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = this.min(x);
    this.y = this.min(y);
  }

  add(xOfset: number, yOfset: number) {
    this.x = this.min(this.x + xOfset);
    this.y = this.min(this.y + yOfset);
  }

  min(value:number, minValue:number = 0) {
    return value < minValue ? minValue : value;
  }
}
