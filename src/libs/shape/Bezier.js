/**
 * @author dondevi
 * @create 2018-06-07
 *
 * @update 2018-07-26
 *   1.Rebuild
 */

import Shape from "./Shape.js";

const defaults = {
};

export default class Bezier extends Shape {

  /**
   * @param  {Number} x1      - x of start point
   * @param  {Number} y1      - y of start point
   * @param  {Number} p1x     - x of 1st control point
   * @param  {Number} p1y     - y of 1st control point
   * @param  {Number} p2x     - x of 2nd control point
   * @param  {Number} p2y     - y of 2nd control point
   * @param  {Number} x2      - x of end point
   * @param  {Number} y2      - y of end point
   * @param  {Object} options
   */
  constructor (x1, y1, p1x, p1y, p2x, p2y, x2, y2, options = {}) {
    const points = [[x1, y1], [p1x, p1y], [p2x, p2y], [x2, y2]];
    super(points, Object.assign({}, defaults, options));
    this.x1 = x1;
    this.y1 = y1;
    this.p1x = p1x;
    this.p1y = p1y;
    this.p2x = p2x;
    this.p2y = p2y;
    this.x2 = x2;
    this.y2 = y2;
    this.type = "bezier";
  }

  contains (x, y) {
    const { x1, y1, p1x, p1y, p2x, p2y, x2, y2 } = this;
    var maxX = Math.max(x1, p1x, p2x, x2);
    var minX = Math.min(x1, p1x, p2x, x2);
    var maxY = Math.max(y1, p1y, p2y, y2);
    var minY = Math.min(y1, p1y, p2y, y2);
    return x <= maxX && x >= minX && y <= maxY && y >= minY;
  }

  draw (ctx) {
    const { x1, y1, p1x, p1y, p2x, p2y, x2, y2 } = this;
    super.draw(ctx, () => {
      ctx.moveTo(x1, y1);
      ctx.bezierCurveTo(p1x, p1y, p2x, p2y, x2, y2);
    });
  }

}
