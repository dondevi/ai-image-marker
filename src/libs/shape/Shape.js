/**
 * @author dondevi
 * @create 2018-06-07
 *
 *
 * @todo  2018-06-12 dondevi
 *   1.Rename: addPoint() to pushPoint()
 *   2.Add: addPoint(), delPoint()
 *   3.Update: draw()
 *
 * @update 2018-06-08
 *   1.Rebuild
 */

import Stuff from "./Stuff.js";
import Point from "./Point.js";

export const defaults = {
  fillStyle: {
    normal: "rgba(255,0,0,0.2)",
    active: "rgba(0,255,0,0.2)",
  },
  strokeStyle: {
    normal: "rgba(255,0,0,0.3)",
    active: "rgba(0,255,0,0.3)",
  },
  lineWidth: {
    normal: 1,
    active: 1,
  },
};

export default class Shape extends Stuff {

  /**
   * @param  {Array}  rawPoints
   * @param  {Object} options
   */
  constructor (rawPoints = [], options) {
    super(0, 0, 0, 0, Object.assign({}, defaults, options));
    this.id = Math.random().toString(36).substr(2, 15);
    this.points = rawPoints.map(([x, y], index) => {
      return new Point(x, y, index, this.options.noHandle);
    });
    this.setOutline();
  }

  validate () {
    return this.points.length > 0;
  }

  contains (x, y) {
    return false;
  }

  getArea () {}


  addPoint (x, y) {
    const point = new Point(x, y, this.points.length, this.options.noHandle);
    this.points.push(point);
  }

  delPoint (index) {
    this.points.splice(index, 1);
    this.points.forEach(point => {
      if (point.index > index) {
        point.index -= 1;
      }
    });
  }

  eachPoints (handler) {
    const { points } = this;
    for (let index = 0, point = null; point = points[index]; index++) {
      handler(point, index);
    }
  }

  getRawPoints () {
    return this.points.map(({ x, y }) => [x, y]);
  }

  setOutline () {}


  draw (ctx, method) {
    super.draw(ctx, method);
    if (!this.options.noHandle && this.actived) {
      this.drawHandles(ctx);
    }
  }

  drawHandles (ctx) {
    this.eachPoints(({ handle }, index) => {
      handle.draw(ctx);
    });
  }

  drawOutline (ctx) {
    ctx.rect(this.ox, this.oy, this.ow, this.oh);
  }

  move (dx, dy) {
    super.move(dx, dy);
    this.eachPoints(point => {
      point.move(dx, dy);
    });
    this.setOutline();
  }

  resize (dx, dy) {
    this.activedPoint.move(dx, dy);
    this.setOutline();
  }

  // @todo Rebuild
  checkActive (x, y) {
    this.activedPoint = null;
    this.eachPoints(point => {
      point.handle.inactive();
      if (point.handle.contains(x, y)) {
        this.activedPoint = point;
        point.handle.active();
      }
    })
    return this.activedPoint || this.contains(x, y);
  }
}
