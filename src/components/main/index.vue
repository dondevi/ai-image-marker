<template>
  <section>
    <header>
      <tool-box
        @set-scale-accuracy="setScaleAccuracy"
        @select-file="onSelectFile"
        @select-photo="onSelectPhoto"
        @select-shape-type="onSelectShapeType"
        @adapt-width="adaptWidth"
        @adapt-height="adaptHeight"
        @adapt-origin="adaptOrigin"
        @clean-all="onCleanAll" />
    </header>
    <article ref="container" @mousewheel="onScale">
      <image-board class="layer" ref="image"
        @scale="onImageScale"
        @resize="onImageResize" />
      <image-marker class="layer" ref="marker"
        @active-shape="onActiveShape"
        @select-shape="onSelectShape"
        @change-shape="onChangeShape" />
    </article>
    <modal v-model="showLabelModal" no-footer>
      <template slot="header">Labels</template>
      <label v-for="label in labels" slot="body">
        <input type="radio" name="label" :value="label.value" v-model="labelValue">
        <span>{{ label.name }}</span>
      </label>
    </modal>
  </section>
</template>

<script>
  import { fileToImage, urlToImage } from "@/libs/file/index.js";
  import toolBox from "./tools";
  import imageBoard from "./image";
  import imageMarker from "./marker";
  import modal from "@/components/modal";

  export default {
    components: { toolBox, imageBoard, imageMarker, modal },
    data: () => ({
      scaleAccuracy: 0.5,
      scaleRatio: 1,
      labels: null,
      labelValue: "",
      photoId: null,
      shapeData: null,
      showLabelModal: false,
    }),
    watch: {
      labelValue (value) {
        if (value === "") { return; }
        this.shapeData.label = value;
        this.$service.axios.addShape({
          photoId: this.photoId,
          shapeData: this.shapeData,
        }).then(json => {
          const { id, label } = this.shapeData;
          this.setShapeLabel(id, label);
          this.$emit("add-shape", this.photoId, id);
          console.log("[Success]", "Add Shape to Photo", id);
        }).catch(e => e).then(() => {
          this.labelValue = "";
          this.shapeData = null;
          this.showLabelModal = false;
        });
      },
    },
    created () {
      this.$service.axios.getLabelList().then(json => {
        this.labels = json.data;
      });
    },
    methods: {
      setScaleAccuracy (accuracy) {
        this.scaleAccuracy = accuracy;
      },
      activeShape (id) {
        this.$refs.marker.activeShape(id);
      },
      setShapeLabel (id, label) {
        this.$refs.marker.setShapeLabel(id, label);
      },
      onSelectFile (file) {
        fileToImage(file).then(image => {
          this.$refs.image.load(image);
        });
      },
      onSelectPhoto (photo) {
        this.photoId = photo.md5Value;
        urlToImage(photo.picUrl).then(image => {
          this.$refs.image.load(image);
        });
        this.$service.axios.getShapeList(this.photoId).then(json => {
          this.$refs.marker.setData(json.data);
        });
        this.$emit("select-photo", photo);
      },
      onActiveShape (id) {
        this.$emit("active-shape", id);
      },
      onSelectShape (shape) {
        this.showLabelModal = true;
        this.shapeData = this.$refs.marker.getShapeData(shape);
      },
      onSelectShapeType (shape) {
        this.$refs.marker.setType(shape);
      },
      onChangeShape (shape) {
        if (!shape || !shape.label) { return; }
        let shapeData = this.$refs.marker.getShapeData(shape);
        this.$service.axios.setShape({
          photoId: this.photoId,
          shapeData: shapeData,
        }).then(json => {
          console.log("[Success]", "Set Shape", shapeData.id);
        });
      },
      onCleanAll () {
        this.$refs.image.clear();
        this.$refs.marker.clear();
      },
      onScale (event) {
        if (event.altKey) {
          event.preventDefault();
          this.scaleRatio -= event.deltaY / 1000 * this.scaleAccuracy;
          this.$refs.image.scale(this.scaleRatio);
        }
      },
      onImageScale (ratio) {
        this.$refs.marker.scale(ratio);
      },
      onImageResize (width, height) {
        this.$refs.marker.resize(width, height);
      },
      adaptWidth () {
        const { offsetWidth } = this.$refs.container;
        this.$refs.image.scaleToWidth(offsetWidth);
      },
      adaptHeight () {
        const { offsetHeight } = this.$refs.container;
        this.$refs.image.scaleToHeight(offsetHeight);
      },
      adaptOrigin () {
        this.$refs.image.scale(1);
      },
    },
  }
</script>

<style scoped>
  section {
    display: flex;
    flex-direction: column;
     height: 100%;
  }
  article {
    position: relative;
    display: flex;
    flex: 1;
    overflow: auto;
    background-color: #333;
  }
  article > .layer {
    position: absolute;
    top: 0;
    left: 0;
  }
  .modal >>> .modal-body {
    width: 420px;
    display: flex;
    flex-wrap: wrap;
  }
  .modal >>> label {
    width: 33.3333%;
    padding: 10px 8px;
    font-size: 16px;
  }
</style>
