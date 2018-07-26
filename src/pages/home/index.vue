<template>
  <main>
    <article ref="article" :style="{ 'flex-basis': width }">
      <comMain ref="main"
        @select-photo="onSelectPhoto"
        @active-shape="onActiveShape"
        @add-shape="onAddShape" />
    </article>
    <div class="dragbar" draggable @dragend="ondragend"></div>
    <aside>
      <panel ref="panel" @select-shape-id="onSelectShapeId"/>
    </aside>
  </main>
</template>

<script>
  import comMain from "@/components/main/index";
  import panel from "./panel";

  export default {
    components: { comMain, panel },
    data: () => ({
      width: "946px",
    }),
    methods: {
      ondragend (event) {
        this.width = event.clientX + "px";
      },
      onSelectPhoto (photo) {
        this.$refs.panel.setData(photo.md5Value);
      },
      onActiveShape (id) {
        this.$refs.panel.activeShapeId(id);
      },
      onAddShape (photoId, shapeId) {
        this.$refs.panel.setData(photoId, shapeId);
      },
      onSelectShapeId (id) {
        this.$refs.main.activeShape(id);
      },
    },
  };
</script>

<style scoped>
  main {
    display: flex;
    align-items: stretch;
    width: 100%;
    height: 100%;
  }
  article {
    min-width: 500px;
  }
  aside {
    flex: 1;
    min-width: 300px;
    height: 100%;
    overflow: auto;
    background-color: #f7f7f7;
    border-left: 1px solid #000;
  }
  .dragbar {
    position: relative;
    z-index: 10;
    width: 10px;
    margin: 0 -5px;
    cursor: e-resize;
  }
  .dragbar:before {
    content: "";
    position: absolute;
    left: 5px;
    display: block;
    height: 100%;
    border-left: 1px dashed #000;
  }
</style>
