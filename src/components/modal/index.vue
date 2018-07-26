<!--
/**
 * =============================================================================
 *  Modal Dialog 模态对话框
 * =============================================================================
 *  @example
 *    <modal v-model="show">
 *      <h1 slot="header"></h1>
 *    </modal>
 * =============================================================================
 *
 * @author dondevi
 * @create 2016-10-28
 *
 */
-->

<template>
  <div class="modal" :class="{ show: value }" @click.stop="hide">
    <div class="modal-dialog" @click.stop>
      <div class="modal-header">
        <slot name="header"></slot>
        <button class="close" @click.stop="hide">&times;</button>
      </div>
      <div class="modal-body">
        <slot name="body"></slot>
      </div>
      <div class="modal-footer" v-if="!noFooter">
        <slot name="footer">
          <button class="btn" @click.stop="hide">Close</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      value: { type: Boolean, default: false },
      noFooter: { type: Boolean, default: false },
    },
    methods: {
      show () { this.$emit("input", true);  },
      hide () { this.$emit("input", false); },
    }
  };
</script>

<style>
  @import "./index.css";
</style>
