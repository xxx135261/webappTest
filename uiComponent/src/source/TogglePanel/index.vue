<template>
<div class="toggle-panel" :class="isOpen?'toggle-panel-open':''" :style="isOpen?{height: h+'px'}:{height: (num+0.5)*18+'px'}">
  <div ref="con" class="toggle-panel-con" v-html="con"></div>
  <div class="show-more" @click="toggle"><h-icon name="unfold"></h-icon></div>
</div>
</template>

<script>
export default {
  props: ["num", "con"],
  data() {
    return {
      h: 0,
      isOpen: false,
      timer: 0
    };
  },
  methods: {
    toggle() {
      this.h = this.$refs["con"].clientHeight + 10;
      this.isOpen = !this.isOpen;
    },
    // 窗口变化时需要进行调整
    resize() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.h = this.$refs["con"].clientHeight + 10;
      }, 100);
    }
  },
  mounted() {
    window.addEventListener("resize", this.resize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  }
};
</script>

<style lang="less">
.toggle-panel {
  @lh: 18px;
  box-sizing: content-box;
  position: relative;
  // border: 1px solid #eee;
  padding: 6px;
  font-size: 13px;
  line-height: @lh;
  overflow: hidden;
  transition: height 0.2s;
  &-con {
    white-space: pre-line;
  }
  .show-more {
    text-align: center;
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 20px;
    cursor: pointer;
    background: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 90%);
    transition: color 0.2s;
    z-index: 9;
    &:hover {
      color: #0275d8;
    }
    .h-icon {
      display: block;
      font-weight: bold;
      transition: transform 0.2s;
    }
  }
  &-open {
    .show-more {
      .h-icon {
        transform: rotate(180deg);
      }
    }
  }
}
</style>