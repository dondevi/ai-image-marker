/**
 * @author dondevi
 * @create 2018-06-07
 *
 * @update 2018-07-26
 *   1.Rebuild
 */

import Polygon from "./Polygon.js";

const defaults = {
};

export default class Triangle extends Polygon {

  constructor (x1 = 0, y1 = 0, x2 = 0, y2 = 0, x3 = 0, y3 = 0, options = {}) {
    const points = [[x1, y1], [x2, y2], [x3, y3]];
    super(points, Object.assign({}, defaults, options));
    this.type = "triangle";
  }

  validate () {
    return this.getArea() > 100;
  }

  resize (dx, dy) {
    const { points, activedPoint } = this;
    const sin60 = Math.sin(Math.PI / 3);
    const cos60 = Math.cos(Math.PI / 3);
    const tan60 = Math.tan(Math.PI / 3);
    switch (activedPoint.index) {
      case 0: points[1].move(-dy * sin60, -dy * cos60); points[2].move(dy * sin60, -dy * cos60); dx = 0; break;
      case 1: points[0].move(0, -dy * tan60); points[2].move(-dx, dy); break;
      case 2: points[0].move(0, -dy * tan60); points[1].move(-dx, dy); break;
    }
    activedPoint.move(dx, dy);
  }

}
