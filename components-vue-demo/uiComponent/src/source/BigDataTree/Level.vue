<template>
  <div class="bd-level">
    <div class="bd-level-item" v-for="i in level" :key="i"></div>
  </div>
</template>

<script>
export default {
  props: ["level"],
  methods: {}
};
</script>

<style lang="less">
.bd-level {
  display: inline-block;
  vertical-align: middle;
  &-item {
    display: inline-block;
    border-right: 1px solid rgba(0, 0, 0, 0.05);
    width: 14px;
    height: 21px;
    margin: 0 3px 0 -3px;
    vertical-align: middle;
  }
}
</style>