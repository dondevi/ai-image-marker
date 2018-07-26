<!--
/**
 * @author dondevi
 * @create 2018-06-05
 */
-->

<template>
  <section>
    <dl v-for="(label, index) in labelList">
      <dt>{{ label.name }}</dt>
      <dd v-for="shape in shapeList[label.value]"
          :class="{ actived: shape.actived }"
          @click="onSelectShapeId(shape.id)">{{ shape.id }}</dd>
    </dl>
  </section>
</template>

<script>
  export default {
    data: () => ({
      labelList: null,
      shapeList: {},
    }),
    created () {
      this.$service.axios.getLabelList().then(json => {
        this.labelList = json.data;
      });
    },
    methods: {
      setData (photoId, shapeId) {
        this.$service.axios.getShapeList(photoId).then(json => {
          this.shapeList = json.data || {};
          if (shapeId) {
            this.activeShapeId(shapeId);
          }
        });
      },
      activeShapeId (id) {
        const { shapeList, $set } = this;
        for (let label in shapeList) {
          shapeList[label].forEach((shape, index) => {
            $set(shape, "actived", shape.id === id);
          });
        }
      },
      onSelectShapeId (id) {
        this.activeShapeId(id);
        this.$emit("select-shape-id", id);
      },
    },
  };
</script>

<style scoped>
  section {
    display: flex;
    flex-wrap: wrap;
  }
  dl {
    min-width: 140px;
    width: 31%;
    margin: 5px;
    background-color: #fff;
    border: 1px solid #ccc;
  }
  dt {
    padding: 6px 12px;
    border-bottom: 1px solid #ccc;
    font-weight: bold;
    text-align: center;
    opacity: 0.9;
  }
  dd {
    margin: 0;
    padding: 4px 12px;
    font-size: 14px;
    opacity: 0.8;
  }
  dd:hover {
    background-color: #f7f7f7;
  }
  dd.actived {
    background-color: rgba(0, 255, 0, 0.15);
  }
</style>
