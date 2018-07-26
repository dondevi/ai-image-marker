/**
 * @author dondevi
 * @create 2018-06-07
 *
 * @update 2018-06-08
 *   1.Rebuild
 */

import Shape from "./Shape.js";

const defaults = {
  minSize: 20,
};

function getPoints (x, y, w, h) {
  return [
    [x,     y    ], [x + w, y    ],
    [x + w, y + h], [x    , y + h],
  ];
}
function getAttrs (points) {
  const [[x, y], , [x2, y2]] = points;
  const w = x2 - x;
  const h = y2 - y;
  return { x, y, w, h };
}

export default class Rect extends Shape {

  constructor (x = 0, y = 0, w = 0, h = 0, options = {}) {
    let points, attrs;
    if (Array.isArray(x)) {
      attrs = getAttrs(x);
      points = x;
    } else {
      attrs = { x, y, w, h };
      points = getPoints(x, y, w, h);
    }
    super(points, Object.assign({}, defaults, options));
    this.type = "rect";
    Object.assign(this, attrs);
  }

  validate () {
    const { w, h, options: { minSize } } = this;
    return w >= minSize && h >= minSize;
  }

  contains (x, y) {
    return (this.x <= x) && (this.x + this.w >= x) &&
           (this.y <= y) && (this.y + this.h >= y);
  }

  getArea () {
    return this.w * this.h;
  }

  setOutline () {
    const { x, y, w, h } = this;
    this.ox = x;
    this.oy = y;
    this.ow = w;
    this.oh = h;
  }

  draw (ctx) {
    const { x, y, w, h } = this;
    super.draw(ctx, () => {
      ctx.rect(x, y, w, h);
    });
  }

  move (dx, dy) {
    super.move(dx, dy);
    this.x += dx;
    this.y += dy;
  }

  resize (dx, dy) {
    const { x, y, w, h, points, activedPoint, options: { minSize } } = this;
    let _x = x;
    let _y = y;
    let _w = w;
    let _h = h;
    switch (activedPoint.index) {
      case 0: _x += dx; _y += dy; _w -= dx; _h -= dy; break;  // up-left
      case 1:           _y += dy; _w += dx; _h -= dy; break;  // up-right
      case 2:                     _w += dx; _h += dy; break;  // down-right
      case 3: _x += dx;           _w -= dx; _h += dy; break;  // down-left
    }
    if ((_w < w && _w < minSize) || (_h < h && _h < minSize)) { return; }  // @todo optimize interactive
    this.x = _x;
    this.y = _y;
    this.w = _w;
    this.h = _h;
    switch (activedPoint.index) {
      case 0: points[3].move(dx, 0); points[1].move(0, dy); break;  // up-left
      case 1: points[2].move(dx, 0); points[0].move(0, dy); break;  // up-right
      case 2: points[1].move(dx, 0); points[3].move(0, dy); break;  // down-right
      case 3: points[0].move(dx, 0); points[2].move(0, dy); break;  // down-left
    }
    activedPoint.move(dx, dy);
  }

}
