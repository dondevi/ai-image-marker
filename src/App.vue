<template>
  <router-view></router-view>
</template>

<style>
  * {
    box-sizing: border-box;
  }
  html, body {
    height: 100%;
    margin: 0;
    font-size: 12px;
  }
  button {
    outline: none;
  }
  label {
    display: inline-block;
    padding: 4px 8px;
  }
  label:hover {
    background-color: #f7f7f7;
  }
  label > span,
  label > input {
    display: inline-block;
    vertical-align: middle;
  }
  .selectable {
    user-select: auto;
  }
  .unselectable {
    user-select: none;
  }
</style>
