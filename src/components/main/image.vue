<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
  export default {
    data: () => ({
      canvas: null,
      context: null,
      image: null,
      // aspectRatio: 1,
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
      load (image) {
        const { width, height } = this.image = image;
        // this.aspectRatio = width / height;
        this.resize(width, height);
        this.draw();
      },
      draw () {
        const { context, canvas: { width, height } } = this;
        context.drawImage(this.image, 0, 0, width, height);
      },
      scale (ratio) {
        this.scaleRatio = ratio;
        const width = this.image.width * ratio;
        const height = this.image.height * ratio;
        this.resize(width, height);
        this.$emit("scale", ratio);
        this.draw();
      },
      scaleToWidth (width) {
        const ratio = width / this.image.width;
        this.scale(ratio);
      },
      scaleToHeight (height) {
        const ratio = height / this.image.height;
        this.scale(ratio);
      },
      resize (width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.$emit("resize", width, height);
      },
      clear () {
        const { context, canvas: { width, height } } = this;
        this.image = null;
        context.clearRect(0, 0, width, height);
      },
    },
  };
</script>
