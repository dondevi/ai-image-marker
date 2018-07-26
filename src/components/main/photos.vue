<!--
/**
 * @author dondevi
 * @create 2018-06-06
 */
-->

<template>
  <ul>
    <li v-for="photo in photos" @click="selectPhoto(photo)">
      <img :src="photo.picUrl" :title="photo.name" width="80">
    </li>
  </ul>
</template>

<script>
  export default {
    data: () => ({
      photos: null,
    }),
    created () {
      this.$service.axios.getPhotoList().then(json => {
        this.photos = json.data;
      });
    },
    methods: {
      selectPhoto (photo) {
        this.$emit("select-photo", photo);
        this.$emit("close-modal");
      },
    },
  };
</script>

<style scoped>
  ul {
    display: flex;
    flex-wrap: wrap;
    width: 800px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    padding: 4px 8px;
  }
  li:hover {
    background-color: #f7f7f7;
    cursor: pointer;
  }
</style>
