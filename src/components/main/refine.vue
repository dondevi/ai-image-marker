<!--
/**
 * @see https://docs.opencv.org/3.4.1/d1/d2d/classcv_1_1ml_1_1SVM.html
 *
 * @author dondevi
 * @create 2018-06-06
 */
-->

<template>
  <form @submit.prevent="onSubmit">
    <fieldset>
      <legend>Labels</legend>
      <label v-for="label in labels">
        <input type="checkbox" :value="label.name" v-model="selectLabels" />
        {{ label.name }}
      </label>
    </fieldset>
    <fieldset>
      <legend title="Support Vector Machines">SVM</legend>
      <label v-for="svm in SVM_TYPES">
        <input type="radio" name="type" :value.once="svm.name" />
        {{ svm.name }}
      </label>
    </fieldset>
    <fieldset>
      <legend>SVM Kernal</legend>
      <label v-for="kernal in KERNAL_TYPES">
        <input type="radio" name="kernal" :value.once="kernal.name" />
        {{ kernal.name }}
      </label>
    </fieldset>
    <fieldset>
      <legend>Params</legend>
      <label v-for="param in PARAM_TYPES">
        <span>{{ param.name }}</span>
        <input type="text" />
      </label>
      <label title="Iterate Count">
        <span><input type="checkbox">iteCount</span>
        <input type="text" />
      </label>
      <label title="Epsilon">
        <span><input type="checkbox">eps</span>
        <input type="text" />
      </label>
    </fieldset>
    <fieldset>
      <legend>Weights</legend>
      <label v-for="label in selectLabels">
        <span>{{ label }}</span>
        <input type="text" />
      </label>
    </fieldset>
    <button type="submit" @click="$emit('close-modal')">OK</button>
  </form>
</template>

<script>
  import { SVM_TYPES, KERNAL_TYPES, PARAM_TYPES } from "@/service/constant.js";

  export default {
    data: () => ({
      SVM_TYPES,
      KERNAL_TYPES,
      PARAM_TYPES,
      selectLabels: [],
      labels: null,
    }),
    created () {
      this.$service.axios.getLabelList().then(json => {
        this.labels = json.data;
      });
    },
    methods: {
      onSubmit () {
        const validate = {
          selects: Array,
          svmType: Number,
          svmKernel: Number,
          c: Number,
          p: Number,
          nu: Number,
          gamma: Number,
          coef: Number,
          degree: Number,
          weights: Array,
          enableIteCount: Boolean,
          enableIteEps: Boolean,
          iteCount: Number,
          eps: Number,
        };
        this.$service.axios.setRefine().then(json => {
          window.alert("Done");
        });
      },
    },
  };
</script>

<style scoped>
  form {
    width: 500px;
  }
  fieldset {
    margin: 15px 5px;
    padding: 5px;
    border: 1px solid #ccc;
  }
  label {
    max-width: 49%;
  }
  label:hover {
    background-color: #f7f7f7;
  }
  label > span {
    width: 70px;
  }
  input[type="text"] {
    width: 50%;
  }
</style>
