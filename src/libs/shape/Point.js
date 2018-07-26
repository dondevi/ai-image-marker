/**
 * @author dondevi
 * @create 2018-06-07
 *
 * @update 2018-06-08
 *   1.Rebuild
 */

import Handle from "./Handle.js"

export default class Point {

  /**
   * @param  {Number}  x
   * @param  {Number}  y
   * @param  {Number}  index    - index of points in a Shape
   * @param  {Boolean} noHandle
   */
  constructor (x, y, index, noHandle) {
    this.x = x;
    this.y = y;
    this.index = index;
    if (!noHandle) {
      this.handle = new Handle(this);
    }
  }

  move (dx, dy, withoutHandle) {
    this.x += dx;
    this.y += dy;
    if (this.handle && !withoutHandle) {
      this.handle.move(dx, dy, true);
    }
  }

  moveTo (x, y) {
    this.move(x - this.x, y - this.y);
  }

}
