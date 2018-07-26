<!--
/**
 * @author dondevi
 * @create 2018-06-08
 */
-->

<template>
  <canvas ref="canvas"
    @click="onClick"
    @dblclick="onDblclick"
    @mousedown="onMouseDown"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"></canvas>
</template>

<script>
  import Rect from "@/libs/shape/Rect.js";
  import Circle from "@/libs/shape/Circle.js";
  import Polygon from "@/libs/shape/Polygon.js";
  import Triangle from "@/libs/shape/Triangle.js";
  import Bezier from "@/libs/shape/Bezier.js";

  export default {
    data: () => ({
      canvas: null,
      context: null,
      type: "",
      shape: null,
      shapes: [],
      activedShape: null,
      scaleRatio: 1,
    }),
    mounted () {
      const canvas = this.canvas = this.$refs.canvas;
      const { offsetWidth, offsetHeight } = this.$el.parentNode;
      canvas.width = offsetWidth;
      canvas.height = offsetHeight;
      this.context = canvas.getContext("2d");
    },
    methods: {
      setType (type) {
        this.type = type;
      },
      setData (data) {
        this.shapes = [];
        for (let label in data) {
          data[label].forEach(shape => {
            let { id, form, shapePoints } = shape;
            shapePoints = shapePoints.map(({ x, y }) => [x, y]);
            switch (form) {
              case "rect": shape = new Rect(shapePoints); break;
              case "circle": shape = new Circle(shapePoints, true); break;
              case "polygon": shape = new Polygon(shapePoints); break;
              case "triangle": shape = new Triangle(shapePoints); break;
              case "bezier": shape = new Bezier(shapePoints); break;
            }
            shape.id = id;
            shape.label = label;
            this.shapes.push(shape);
          });
        }
        this.draw();
      },
      getData () {
        return this.shapes.map(this.getShapeData);
      },
      getShapeData (shape) {
        let { id, label, type: form, points: shapePoints } = shape;
        if (form === "circle") {
          shapePoints = shape.getOutlinePoints().map(([x, y]) => ({ x, y }));
        } else {
          shapePoints = shapePoints.map(({ x, y }) => ({ x, y }));
        }
        return { id, label, form, shapePoints };
      },
      resize (width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.draw();
      },
      scale (ratio) {
        this.scaleRatio = ratio;
        this.context.scale(ratio, ratio);
        this.draw();
      },
      activeShape (id) {
        this.shapes.forEach(shape => {
          if (shape.id === id) {
            shape.active();
            this.activedShape = shape;
          } else {
            shape.inactive();
          }
        });
        this.draw();
      },
      setShapeLabel (id, label) {
        this.shapes.forEach(shape => {
          if (shape.id === id) {
            shape.active();
            shape.label = label;
            this.activedShape = shape;
          } else {
            shape.inactive();
          }
        });
        this.draw();
      },
      getPosition (event) {
        const { layerX, layerY } = event;
        const x = layerX / this.scaleRatio;
        const y = layerY / this.scaleRatio;
        return { x, y };
      },

      onDblclick (event) {
        if (this.type === "polygon") {
          const { x, y } = this.getPosition(event);
          !this.activedShape &&
          this.makeShapeStart(x, y) ||
          this.makeShapeEnd();
        }
        if (this.activedShape && this.activedShape.label === undefined) {
          this.$emit("select-shape", this.activedShape);
        }
      },
      onClick (event) {
        if (this.type === "polygon") {
          const { x, y } = this.getPosition(event);
          const { x: startX, y: startY } = this.mouseClicked || {};
          this.mouseClicked = { x, y };
          if (startX === x && startY === y) { return; }
          this.makeShapePoint(x, y);
        }
      },

      onMouseDown (event) {
        const { x, y } = this.getPosition(event);
        this.dragStart = { x, y };
        this.dragMove = null;
        this.hasChange = false;
        this.drawActive(x, y, event.ctrlKey) &&
        this.$emit("active-shape", this.activedShape && this.activedShape.id);
      },
      onMouseUp (event) {
        this.dragStart = null;
        if (this.dragMove) {
          this.dragMove = null;
          this.type !== "polygon" &&
          this.makeShapeEnd() ||
          this.hasChange &&
          this.$emit("change-shape", this.activedShape);
          this.hasChange = false;
        }
      },
      onMouseMove (event) {
        if (this.dragStart) {
          const { x, y } = this.getPosition(event);
          const { x: px, y: py } = this.dragMove || this.dragStart;
          this.dragMove = { x, y };
          const dx = x - px;
          const dy = y - py;
          dx && dy &&
          !this.shape &&
          !this.activedShape &&
          this.type !== "polygon" &&
          this.makeShapeStart(px, py) ||
          this.drawMove(dx, dy) &&
          (this.hasChange = true);
        }
      },

      makeShapeStart (x, y) {
        if (this.shape || !this.type) { return false; }
        switch (this.type) {
          case "rect":
            this.shape = new Rect(x, y);
            this.shape.activedPoint = this.shape.points[2];
            break;
          case "circle":
            this.shape = new Circle(x, y);
            this.shape.activedPoint = this.shape.points[2];
            break;
          case "polygon":
            this.shape = new Polygon(x, y);
            this.shape.drawStart();
            break;
          case "triangle":
            this.shape = new Triangle(x, y, x, y, x, y);
            this.shape.activedPoint = this.shape.points[1];
            break;
        }
        this.draw();
        return true;
      },
      makeShapePoint (x, y) {
        if (!this.shape) { return false; }
        this.shape.addPoint(x, y);
        this.draw();
        return true;
      },
      makeShapeEnd () {
        if (!this.shape || !this.type) { return false; }
        if (this.shape.validate()) {
          this.activedShape = this.shape;
          this.type === "polygon" && this.shape.drawEnd();
          this.shapes.push(this.shape);
          this.$emit("select-shape", this.shape);
        }
        this.shape = null;
        this.draw();
        return true;
      },

      draw () {
        const { context, shapes, shape } = this;
        this.clear();
        shapes.forEach(shape => shape.draw(context));
        shape && shape.draw(context);
      },
      // @todo Rebuild
      drawActive (x, y, multiple) {
        let { hasActived, needClear, shape } =
          this.shapes.reduce((result, shape) => {
            if (shape.actived) {
              result.needClear = true;
            }
            if (shape.checkActive(x, y)) {
              shape.active();
              result.hasActived = true;
            } else if (!multiple) {
              shape.inactive();
            }
            if (!multiple && shape.actived) {
              // Only active the smallest
              let area = shape.getArea();
              if (!result.shape) {
                result.shape = shape;
                result.area = area;
              } else if (area < result.area) {
                result.shape.inactive();
                result.shape = shape;
                result.area = area;
              } else {
                shape.inactive();
              }
            }
            return result;
          }, {});
        this.activedShape = shape;
        (hasActived || needClear) && this.draw();
        return hasActived || needClear;
      },
      drawMove (dx, dy) {
        let hasMoved =
          this.moveHandle(this.shape, dx, dy) ||
          this.shapes.reduce((result, shape) => {
            return this.moveHandle(shape, dx, dy) ||
                   this.moveShape(shape, dx, dy) || result;
          }, false);
        hasMoved && this.draw();
        return hasMoved;
      },

      moveHandle (shape, dx, dy) {
        if (shape && shape.activedPoint) {
          shape.resize(dx, dy);
          return true;
        }
      },
      moveShape (shape, dx, dy) {
        if (shape && shape.actived) {
          shape.move(dx, dy);
          return true;
        }
      },

      clear () {
        const { context, canvas: { width, height } } = this;
        context.clearRect(0, 0, width / this.scaleRatio, height / this.scaleRatio);
      },
    },
  };
</script>
