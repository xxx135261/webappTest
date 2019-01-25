<template>
  <div class="main-page">
    <div class="test-load">
      <fermLoading/>
    </div>
  </div>
</template>

<script>
import fermLoading from "../../source/FermLoading/";

export default {
  components: { fermLoading }
};
</script>

<style lang="less">
.test-load {
  position: relative;
  background: #ddd;
  height: 400px;
  width: 600px;
}
</style>