<template>
<div class="du-pont-item">
  <div class="name">{{name}}</div>
  <div class="n1">{{n1}}</div>
  <div class="n2">{{n2}}</div>
</div>
</template>

<script>
export default {
  props: ["name", "n1", "n2"]
};
</script>

<style lang="less">
.du-pont-item {
  display: inline-block;
  width: 100px;
  background: #fff;
  border: 1px solid #ccc;
  text-align: center;
  .name {
    background: #e6f0fc;
    font-size: 12px;
    font-weight: bold;
    padding: 2px 4px;
  }
  .n1,
  .n2 {
    border-top: 1px solid #eee;
    font-size: 12px;
  }
  .n1 {
    color: #d9534f;
  }
  .n2 {
    color: #5bc0de;
  }
}
</style>