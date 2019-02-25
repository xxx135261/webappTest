<template>
  <div class="line-path3">
    <div
      class="item"
      v-for="(item, i) in points"
      :key="i + 100"
      @click="handleClick(i)"
      :style="{bottom:item.y+'px',left:item.x+'px'}"
      v-if="d[i]"
    >
      <slot name="dot" :data="d[i]">
        <span>{{d[i].n}}</span>
      </slot>
    </div>
    <div
      class="date-item"
      v-for="(item,j) in pointsDate"
      :key="j"
      :style="{bottom:item.y+'px',left:item.x+'px'}"
      v-if="d[j]"
    >{{d[j].d}}</div>
    <div @click="handleClick()" class="item" :style="{bottom:55+'px',left:1059+'px'}">
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
        { x: 78, y: 55 },
        { x: 228, y: 55 },
        { x: 360, y: 55 },
        { x: 547, y: 55 },
        { x: 741, y: 55 },
        { x: 916, y: 55 }
      ],
      pointsDate: [
        { x: 77, y: 15 },
        { x: 227, y: 15 },
        { x: 377, y: 15 },
        { x: 543, y: 15 },
        { x: 740, y: 15 },
        { x: 917, y: 15 }
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
.line-path3 {
  width: 1170px;
  height: 207px;
  position: relative;
  background-image: url("./bg.png");
  background-size: cover;
  background-position: center;
  .item {
    color: rgba(255, 255, 255, 0.7);
    position: absolute;
    padding: 5px 10px;
    border: 1px dashed rgba(255, 255, 255, 0.198);
    border-radius: 1px;
    font-size: 12px;
    cursor: pointer;
  }
  .date-item {
    color: #fff;
    position: absolute;
  }
}
</style>