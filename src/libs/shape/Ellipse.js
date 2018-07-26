/**
 * @author dondevi
 * @create 2018-06-07
 */

import Shape from "./Shape.js";

const defaults = {
  minSize: 10,
};

function getPoints (cx, cy, xr, yr) {
  return [
    [cx, cy - yr], [cx + xr, cy],
    [cx, cy + yr], [cx - xr, cy],
  ];
}
function getAttrs (points) {
  const [[x1, y1], [x2, y2]] = points;
  const cx = x1;
  const cy = y2;
  const xr = x2 - x1;
  const yr = y2 - y1;
  return { cx, cy, xr, yr };
}
function getOutlinePoints (cx, cy, xr, yr) {
  return [
    [cx - xr, cy - yr],
    [cx + xr, cy - yr],
    [cx + xr, cy + yr],
    [cx - xr, cy + yr],
  ];
}
function getAttrsFromOutline (points) {
  const { 0: [x1, y1], 2: [x2, y2] } = points;
  const xr = (x2 - x1) / 2;
  const yr = (y2 - y1) / 2;
  const cx = x1 + xr;
  const cy = y1 + yr;
  return { cx, cy, xr, yr };
}

export default class Ellipse extends Shape {

  /**
   * @param  {Number} cx      - central x
   * @param  {Number} cy      - central y
   * @param  {Number} xr      - radius on x axis
   * @param  {Number} yr      - radius on y axis
   * @param  {Object} options
   */
  constructor (cx = 0, cy = 0, xr = 0, yr = 0, options = {}) {
    let points, attrs;
    if (Array.isArray(cx)) {
      attrs = cy ? getAttrsFromOutline(cx) : getAttrs(cx);
      points = cy ? getPoints(...Object.values(attrs)): cx;
    } else {
      attrs = { cx, cy, xr, yr };
      points = getPoints(cx, cy, xr, yr);
    }
    super(points, Object.assign({}, defaults, options));
    this.type = "ellipse";
    Object.assign(this, attrs);
  }

  validate () {
    const { xr, yr, options: { minSize } } = this;
    return xr >= minSize && yr >= minSize;
  }

  contains (x, y) {
    return Math.pow(x - this.cx, 2) / Math.pow(this.xr, 2) +
           Math.pow(y - this.cy, 2) / Math.pow(this.yr, 2) <= 1;
  }

  getArea () {
    return Math.PI * this.xr * this.yr;
  }

  getOutlinePoints () {
    let { cx, cy, xr, yr } = this;
    return getOutlinePoints(cx, cy, xr, yr);
  }

  setOutline () {
    const [[x, y], , [x2, y2]] = this.getOutlinePoints();
    this.ox = x;
    this.oy = y;
    this.ow = x2 - x;
    this.oh = y2 - y;
  }

  draw (ctx) {
    const { cx, cy, xr, yr } = this;
    super.draw(ctx, () => {
      ctx.ellipse(cx, cy, xr, yr, 0, 0, 2 * Math.PI);
    });
  }

  move (dx, dy) {
    super.move(dx, dy);
    this.cx += dx;
    this.cy += dy;
  }

  // @todo implement
  resize (dx, dy) {
    const { cx, cy, xr, yr, points, activedPoint, options: { minSize } } = this;
    let _cx = cx;
    let _cy = cy;
    let _xr = xr;
    let _yr = yr;
    switch (activedPoint.index) {
      case 0: _yr -= dy; break;  // up
      case 1: _xr += dx; break;  // right
      case 2: _yr += dy; break;  // down
      case 3: _xr -= dx; break;  // left
    }
    if ((_xr < xr && _xr < minSize) || (_yr < yr && _yr < minSize)) { return false; }
    this.xr = _xr;
    this.yr = _yr;
    this.setOutline();
    switch (activedPoint.index) {
      case 0: activedPoint.move(0, dy); points[2].move(0, -dy); break;  // up
      case 1: activedPoint.move(dx, 0); points[3].move(-dx, 0); break;  // right
      case 2: activedPoint.move(0, dy); points[0].move(0, -dy); break;  // down
      case 3: activedPoint.move(dx, 0); points[1].move(-dx, 0); break;  // left
    }
    return true;
  }

}
