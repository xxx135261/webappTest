<template>
<div class="line-path" :class="type">
  <svg width="793" height="207">
    <path class="path" d="M-10 150 Q40 150 80 110 T200 110 T340 90 T500 90 T660 90 T760 70 T840 110"></path>
    <!-- 点 -->
    <g v-for="(item,i) in points" :key="'g'+i" @click="handleClick(i)">
      <circle class="point" :style="type=='t2'?{fill:item.c,stroke:item.c}:''" :cx="item.x" :cy="item.y" :r="r" />
      <text class="text" :x="item.x-r+4" :y="item.y+4">{{d[i].d}}</text>
      <text class="text2" :x="item.x-r" :y="item.y+(item.bot?40:-30)" :style="type=='t2'?{fill:item.c}:''">{{d[i].n}}</text>
    </g>
    <!-- 至今 -->
    <g>
      <circle class="point" cx="760" cy="70" :r="r" style="cursor:default" :style="type=='t2'?{fill:'#98c73b',stroke:'#98c73b'}:''" />
      <text class="text" :x="760-r+8" :y="70+4" style="cursor:default" :style="type=='t2'?{fill:'#fff'}:''">至今</text>
    </g>
  </svg>
</div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "t1"
    },
    d: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      points: [
        {
          x: 40,
          y: 136,
          c: "#f3a31f",
          bot: true
        },
        {
          x: 160,
          y: 95,
          c: "#e94942"
        },
        {
          x: 290,
          y: 120,
          c: "#e61e8d",
          bot: true
        },
        {
          x: 400,
          y: 60,
          c: "#713291"
        },
        {
          x: 520,
          y: 100,
          c: "#3196d1"
        },
        {
          x: 660,
          y: 90,
          c: "#a7611e",
          bot: true
        }
      ],
      r: 20
    };
  },
  methods: {
    handleClick(index) {
      this.$emit("on-click", index);
    }
  }
};
</script>

<style lang="less">
.line-path {
  width: 793px;
  height: 207px;
  background-image: url("./bg.png");
  background-size: cover;
  background-position: center;

  .path {
    stroke: #fff;
    stroke-width: 8px;
    fill: none;
    stroke-dasharray: 10, 5;
    opacity: 0.4;
  }

  g {
    cursor: pointer;
    transition: opacity 0.2s;
    &:hover {
      opacity: 0.8;
    }
    // 呼吸动画
    @keyframes test {
      0% {
        stroke-width: 0;
        stroke-opacity: 0.5;
      }
      100% {
        stroke-width: 16px;
        stroke-opacity: 0;
      }
    }
    .point {
      fill: #fff;
      stroke: #fff;
      stroke-width: 0;
      stroke-opacity: 0.5;
      animation: test 2s infinite;
    }
    .text,
    .text2 {
      font-size: 12px;
      font-weight: bold;
      fill: #7957d5;
    }
    .text2 {
      font-size: 13px;
      fill: #fff;
    }
  }
}

.line-path.t2 {
  background: none;
  .path {
    stroke: #000;
    opacity: 0.3;
  }
  .text {
    fill: #fff;
  }
}
</style>