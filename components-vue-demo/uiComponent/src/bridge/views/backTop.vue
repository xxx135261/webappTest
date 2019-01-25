<template>
  <div class="backtop-wrapper" v-backTop="{right: 25, bottom: 20, radius: 40}">
    <div class="backtop-con"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.backtop-wrapper {
  margin: 15px;
  min-height: 400px;
  height: 70%;
  overflow: auto;
  border: 1px solid #ddd;
  .backtop-con {
    width: 100%;
    min-height: 4000px;
    height: 700%;
    background: linear-gradient(to bottom, #80d643, #32a3f5);
  }
}
</style>
