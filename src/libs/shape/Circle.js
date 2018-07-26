/**
 * @author dondevi
 * @create 2018-06-07
 */

import Ellipse from "./Ellipse.js";

export default class Circle extends Ellipse {

  /**
   * @param  {Number} cx      - central x
   * @param  {Number} cy      - central y
   * @param  {Number} r       - radius
   * @param  {Object} options
   */
  constructor (cx = 0, cy = 0, r = 0, options = {}) {
    super(cx, cy, r, r);
    this.type = "circle";
  }

  resize (dx, dy) {
    if (!super.resize(dx, dy)) { return false; }
    const { xr, yr, points, activedPoint } = this;
    switch (activedPoint.index) {
      case 0: this.xr = yr; points[1].move(-dy, 0); points[3].move(dy, 0);  break;  // up
      case 1: this.yr = xr; points[0].move(0, -dx); points[2].move(0, dx);  break;  // right
      case 2: this.xr = yr; points[1].move(dy, 0);  points[3].move(-dy, 0); break;  // down
      case 3: this.yr = xr; points[0].move(0, dx);  points[2].move(0, -dx); break;  // left
    }
    this.r = this.xr = this.yr;
    return true;
  }

}
