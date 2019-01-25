<template>
  <div class="ferm-backTop" @click="handleClick" :class="{'show':isShow}" :style="style">
    <h-icon name="arrow-up-c"></h-icon>
  </div>
</template>

<script>
import Vue from 'vue';
import { Icon } from 'h_ui';
Vue.component('hIcon', Icon);

const ani = 0.2;
const fps = 80;

export default {
  name: "BackTop",
  data() {
    return {
      interval: null,
      scrollEL: null,
      isShow: false,
      right: 15,
      bottom: 15,
      radius: 40
    };
  },
  computed: {
    style() {
      return {
        bottom: this.bottom + "px",
        right: this.right + "px",
        width: this.radius + "px",
        height: this.radius + "px",
        transform: "translateY(" + (this.bottom + this.radius) + "px)",
        "line-height": this.radius + "px",
        "font-size": this.radius * 0.4 + "px"
      };
    }
  },
  methods: {
    // 加速曲线用sin函数实现
    fx(x) {
      return (Math.sin((Math.PI / (ani * fps)) * x - Math.PI / 2) + 1) / 2;
    },
    handleClick() {
      if (this.interval) return;
      let stepNum = ani * fps;
      let top = this.scrollEL.scrollTop;
      let i = 0;
      this.interval = setInterval(() => {
        if (i == stepNum) {
          this.scrollEL.scrollTop = 0;
          clearInterval(this.interval);
          this.interval = null;
        } else {
          this.scrollEL.scrollTop = (1 - this.fx(i++)) * top;
        }
      }, 1000 / fps);
    },
    handleScroll(e) {
      this.isShow = e.currentTarget.scrollTop > 200;
    }
  },
  beforeDestroy() {
    this.scrollEL.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style lang="less">
.ferm-backtop-outter-relative {
  position: relative;
  overflow: hidden !important;
}
.ferm-backTop {
  position: absolute;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.5);
  background: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  text-align: center;
  border-radius: 50%;
  transition: all 0.3s;
  opacity: 0;
  transform: translateY(15px);
  &.show {
    opacity: 1;
    transform: translateY(0) !important;
  }
  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }
  i {
    color: #ffffff;
    font-size: inherit;
  }
}
</style>