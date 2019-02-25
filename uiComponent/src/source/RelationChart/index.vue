<template>
  <div ref="compGraph" :style="{width:'100%',height:h}"></div>
</template>

<script>
import echarts from "echarts";
import getBase from "./base.js";

export default {
  name: 'RelationChart',
  props: {
    // 布局方式可取值 circular/force
    layout: {
      type: String,
      default: "circular"
    },
    w: {
      type: String,
      default: "100%"
    },
    h: {
      type: String,
      default: "400px"
    },
    // 图例
    categories: {
      type: Array,
      default: () => []
    },
    // 数据
    graph: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      myChart: {}
    };
  },
  watch: {
    categories: {
      deep: true,
      handler: function () {
        this.reload();
      }
    },
    layout: {
      deep: true,
      handler: function () {
        this.reload();
      }
    },
    graph: {
      deep: true,
      handler: function () {
        this.reload();
      }
    }
  },
  methods: {
    reload() {
      this.myChart.setOption(getBase(this.categories, this.graph, this.layout));
    },
    resize() {
      this.myChart.resize();
    }
  },
  mounted() {
    // 初始化
    this.myChart = echarts.init(this.$refs.compGraph);
    this.myChart.setOption(getBase(this.categories, this.graph, this.layout));
    window.addEventListener('resize', this.resize);
  },
  destroyed() {
    window.removeEventListener('resize', this.resize);
  }
};
</script>