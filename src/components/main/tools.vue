<template>
  <section class="tool-box">
    <button> Open
      <input type="file" accept="image/jpeg,image/png,image/bmp" @change="selectImage">
    </button>
    <button @click="showPhotoModal = true"> Load
    </button>
    <modal v-model="showPhotoModal" no-footer>
      <template slot="header">Photo</template>
      <photo-list slot="body" @close-modal="showPhotoModal = false" @select-photo="selectPhoto" />
    </modal>
    <button @click="showRefineModal = true"> Refine </button>
    <modal v-model="showRefineModal" no-footer>
      <template slot="header">Refine</template>
      <form-refine slot="body" @close-modal="showRefineModal = false" />
    </modal>
    <label @click="selectShapeType('rect')">
      <input type="radio" name="shape" value="rect" v-model="shape">
      <span>Rect</span>
    </label>
    <label @click="selectShapeType('circle')">
      <input type="radio" name="shape" value="circle" v-model="shape">
      <span>Circle</span>
    </label>
    <label @click="selectShapeType('polygon')" title="Double click">
      <input type="radio" name="shape" value="polygon" v-model="shape">
      <span>Polygon</span>
    </label>
    <label @click="selectShapeType('triangle')">
      <input type="radio" name="shape" value="triangle" v-model="shape">
      <span>Triangle</span>
    </label>
    <!-- <label @click="selectShapeType('bezier')">
      <input type="radio" name="shape" value="bezier" v-model="shape">
      <span>Bezier</span>
    </label> -->
    <label style="margin-left:10px" :title="scaleAccuracy">
       <span>Zoom ratio</span>
       <input type="range" min="0.1" max="1" step="0.1" v-model="scaleAccuracy">
    </label>
    <button @click="adaptWidth">Fit width</button>
    <button @click="adaptHeight">Fit Height</button>
    <button @click="adaptOrigin">Fit Photo</button>
    <button @click="cleanAll">Clear</button>
  </section>
</template>

<script>
  import modal from "@/components/modal";
  import photoList from "@/components/main/photos";
  import formRefine from "@/components/main/refine";
  import { fileToImage, urlToImage } from "@/libs/file/index.js";
  export default {
    components: { modal, photoList, formRefine },
    data: () => ({
      shape: "",
      showPhotoModal: false,
      showRefineModal: false,
      scaleAccuracy: 0.5,
    }),
    watch: {
      scaleAccuracy (value) {
        this.$emit("set-scale-accuracy", value);
      }
    },
    methods: {
      selectImage (event) {
        const file = event.target.files[0];
        if (!file) { return; }
        if (!/\.(jpg|jpeg|png|bmp)$/i.test(file.name)) {
          return window.alert("请选择格式为 jpg/jpeg、png、bmp 的图片");
        }
        this.$emit("select-file", file);
      },
      selectPhoto (photo) {
        this.$emit("select-photo", photo);
      },
      cleanAll () {
        this.$emit("clean-all")
      },
      selectShapeType (value) {
        this.$emit("select-shape-type", value);
      },
      adaptOrigin () {
        this.$emit("adapt-origin");
      },
      adaptHeight () {
        this.$emit("adapt-height");
      },
      adaptWidth () {
        this.$emit("adapt-width");
      }
    },

  };
</script>

<style scoped>
  .tool-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 6px 10px;
    border-bottom: 1px solid #888;
  }
  button {
    position: relative;
    overflow: hidden;
  }
  button > input {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
  }
  label {
    padding: 0;
  }
  label > span,
  label > input {
    vertical-align: middle;
  }
</style>

