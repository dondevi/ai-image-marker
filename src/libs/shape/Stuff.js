/**
 * @author dondevi
 * @create 2018-06-08
 */

export const defaults = {
  fillStyle: { normal: "#fff" },
  strokeStyle: { normal: "#333"},
  lineWidth: { normal: 1 },
};

export default class Stuff {

  /**
   * @param  {Number}  ox      - outline x
   * @param  {Number}  oy      - outline y
   * @param  {Number}  ow      - outline width
   * @param  {Number}  oh      - outline height
   * @param  {Object}  options
   * @param  {String}  options.fillStyle
   * @param  {String}  options.strokeStyle
   * @param  {String}  options.lineWidth
   * @param  {Boolean} options.noClose
   * @param  {Boolean} options.noFill
   * @param  {Boolean} options.noStroke
   */
  constructor (ox = 0, oy = 0, ow = 0, oh = 0, options) {
    this.options = Object.assign({}, defaults, options);
    this.ox = ox;
    this.oy = oy;
    this.ow = ow;
    this.oh = oh;
    this.actived = false;
    this.style("normal");
  }

  style (status = "normal") {
    const { fillStyle, strokeStyle, lineWidth } = this.options;
    this.fillStyle = fillStyle[status] || fillStyle["normal"];
    this.strokeStyle = strokeStyle[status] || strokeStyle["normal"];
    this.lineWidth = lineWidth[status] || lineWidth["normal"];
  }

  draw (ctx, method) {
    const { fillStyle, strokeStyle, lineWidth, options } = this;
    ctx.save();
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    method && method();
    !options.noClose && ctx.closePath();
    !options.noFill && ctx.fill();
    !options.noStroke && ctx.stroke();
    ctx.restore();
  }

  active () {
    this.actived = true;
    this.style("active");
  }

  inactive () {
    this.actived = false;
    this.style("normal");
  }

  move (dx, dy) {
    this.ox += dx;
    this.oy += dy;
  }

  moveTo (x, y) {
    this.move(x - this.ox, y - this.oy);
  }

  scale () {}

}
