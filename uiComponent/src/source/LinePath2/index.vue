<template>
  <div class="line-path2">
    <div
      class="item"
      v-for="(item,i) in points"
      :key="i"
      @click="handleClick(i)"
      :style="{bottom:item.y+'px',left:item.x+'px',color:item.c}"
    >
      {{d[i].d}}
      <span>{{d[i].n}}</span>
    </div>
    <div class="item" :style="{bottom:140+'px',left:704+'px'}">
      <span>至今</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    d: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      points: [
        {
          x: 24,
          y: 148,
          c: "#f3a31f",
          bot: true
        },
        {
          x: 100,
          y: 86,
          c: "#e94942"
        },
        {
          x: 229,
          y: 148,
          c: "#e61e8d",
          bot: true
        },
        {
          x: 314,
          y: 85,
          c: "#713291"
        },
        {
          x: 458,
          y: 138,
          c: "#3196d1"
        },
        {
          x: 544,
          y: 90,
          c: "#a7611e",
          bot: true
        }
      ]
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
.line-path2 {
  width: 793px;
  height: 207px;
  position: relative;
  background-image: url("./bg.jpg");
  background-size: cover;
  background-position: center;
  .item {
    position: absolute;
    padding: 5px 10px;
    background: #fff;
    border-radius: 1px;
    // opacity: 0.5;
    font-size: 12px;
    font-weight: bold;
    box-shadow: 0 4px 0 rgba(0, 0, 0, 0.1);
    cursor: pointer;
    span {
      font-weight: normal;
      color: #444;
    }
  }
}
</style>