/**
 * @author dondevi
 * @create 2018-06-07
 *
 * @update 2018-06-08
 *   1.Rebuild
 */

import Stuff from "./Stuff.js";

export const defaults = {
  radius: 3,
  accuracy: 6,
  fillStyle: {
    normal: "rgba(255,255,255,0.7)",
    active: "#fff",
  },
  strokeStyle: {
    normal: "rgba(0,0,0,0.3)",
    active: "rgba(0,0,0,0.7)",
  },
  lineWidth: {
    normal: 1,
    active: 1,
  }
};

export default class Handle extends Stuff {

  /**
   * @param  {Object} point   - instance of Point
   * @param  {Number} r       - radius
   * @param  {Object} options
   */
  constructor (point, r, options) {
    r = r || defaults.radius;
    const { x: cx, y: cy } = point;
    const [ox, oy, ow] = [cx - r, cy - r, r * 2];
    super(ox, oy, ow, ow, Object.assign({}, defaults, options));
    this.point = point;
    this.r = r;
  }

  draw (ctx) {
    const { point: { x: cx, y: cy }, r, fillStyle, strokeStyle, lineWidth } = this;
    // const { ox, oy, ow, oh } = this;
    super.draw(ctx, () => {
      ctx.arc(cx, cy, r, 0, 2 * Math.PI);
      // ctx.rect(ox, oy, ow, oh);
    });
  }

  contains (x, y) {
    const { point: { x: cx, y: cy }, r, options: { accuracy } } = this;
    return Math.pow(x - cx, 2) / Math.pow(r + accuracy, 2) +
           Math.pow(y - cy, 2) / Math.pow(r + accuracy, 2) <= 1;
    // const { ox, oy, ow, oh, options: { accuracy } } = this;
    // const l = ox - accuracy;
    // const t = oy - accuracy;
    // const r = ox + ow + accuracy;
    // const b = oy + oh + accuracy;
    // return (x >= l) && (x <= r) && (y >= t) && (y <= b);
  }

  move (dx, dy, withoutPoint) {
    super.move(dx, dy);
    if (!withoutPoint) {
      this.point.move(dx, dy, true);
    }
  }

}
