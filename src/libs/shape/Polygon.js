/**
 * @author dondevi
 * @create 2018-06-08
 */

import Shape from "./Shape.js";

export default class Polygon extends Shape {

  /**
   * @param  {Number} x       - x of first point
   * @param  {Number} y       - y of first point
   * @param  {Object} options
   */
  constructor (x, y, options = {}) {
    const points = Array.isArray(x) ? x : [[x, y]];
    super(points, options);
    this.type = "polygon";
  }

  validate () {
    return this.points.length > 2;
  }

  /**
   * @from lien
   */
  contains (x, y) {
    const { points } = this;
    let result = false;
    let length = points.length;
    for (let i = 0, j = length - 1; i < length; j = i, i++) {
      let { x: x1, y: y1 } = points[i];
      let { x: x2, y: y2 } = points[j];
      if ((x1 === x && y1 === y) || (x2 === x && y2 === y)) {
        return true;
      }
      if ((y1 < y && y2 >= y) || (y1 >= y && y2 < y)) {
        let tx = x1 + (y - y1) * (x2 - x1) / (y2 - y1);
        if (tx === x) { return true; }
        if (tx > x) { result = !result; }
      }
    }
    return result;
  }

  /**
   * Mercator projection
   */
  getArea () {
    const { points } = this;
    const { length } = points;
    let area = 0;
    for (let i = 0; i < length; i++) {
      let j = (i + 1) % length;
      area += points[i].x * points[j].y;
      area -= points[i].y * points[j].x;
    }
    return Math.abs(area / 2);
  }

  setOutline () {
    let [{ x: ox, y: oy}, [ox2, oy2]] = [this.points[0], [0, 0]];
    this.eachPoints(({ x, y }) => {
      if (x < ox) { ox = x; }
      if (y < oy) { oy = y; }
      if (x > ox2) { ox2 = x; }
      if (y > oy2) { oy2 = y; }
    });
    const [ow, oh] = [ox2 - ox, oy2 - oy];
    Object.assign(this, { ox, oy, ow, oh });
  }

  draw (ctx) {
    super.draw(ctx, () => {
      this.eachPoints(({ x, y }, index) => {
        index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
    });
  }

  drawStart () {
    this.actived = true;
    this.lineWidth = 3;
    this.options.noClose = true;
    this.options.noFill = true;
  }

  drawEnd () {
    this.actived = false;
    this.lineWidth = 1;
    this.options.noClose = false;
    this.options.noFill = false;
    this.setOutline();
  }

}
