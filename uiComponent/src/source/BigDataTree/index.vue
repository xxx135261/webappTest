<template>
  <div ref="viewBox">
    <!-- 顶部占位 -->
    <div :style="{'height':t*nh+'px'}"></div>
    <!-- 树节点 -->
    <div
      class="bd-tree-node"
      v-for="(item,i) of viewData"
      :key="i"
      :style="{'padding-left':item.level*14+'px'}"
    >
      <div v-show="item.leaf" class="toggle-btn"></div>
      <i
        v-show="!item.leaf"
        class="toggle-btn iconfont icon-ios-arrow-forward"
        :class="{'expand':item.expand}"
        @click="item.expand=!item.expand;resize();"
      ></i>
      <span @click="nodeClick(item)">{{item.title}}</span>
    </div>
    <!-- 底部占位 -->
    <div :style="{'height':b*nh+'px'}"></div>
  </div>
</template>

<script>
export default {
  props: ["treeData"],
  data() {
    return {
      // 滚动容器
      box: null,
      // 单条数据高度 px
      nh: 21,
      // 所有数据
      rawData: [],
      // 显示数据
      viewData: [],
      // 显示条数
      num: 0,
      // 顶部隐藏条数
      t: 0,
      // 底部隐藏条数
      b: 0,
      // 滚动防抖
      timer: 0,
      // 滚动防抖间隔 ms
      feq: 5
    };
  },
  methods: {
    // 多层级显示控制
    isShow(item) {
      item.isShow = !item.parent || (item.parent.expand && item.parent.isShow);
      return item.isShow;
    },
    // 格式成列表方式
    format(raw, level, parent) {
      for (let item of raw) {
        item.level = level;
        item.parent = parent;
        this.rawData.push(item);
        if (item.children) {
          item.leaf = false;
          // 数据及时响应
          this.$set(item, "expand", item.expand ? true : false);
          this.format(item.children, level + 1, item);
        } else item.leaf = true;
        // 删除子节点
        delete item.children;
      }
    },
    //
    resize() {
      // 根据容器高度计算
      let oh = this.box.offsetHeight;
      let sh = this.box.scrollHeight;
      let st = this.box.scrollTop;

      // 预读条数
      let perNum = 100;
      // 可读区域容纳条数
      this.num = Math.ceil(oh / this.nh) + perNum * 2;

      this.t = Math.floor(st / this.nh);
      this.t = this.t > perNum ? this.t - perNum : 0;

      this.viewData = [];
      let i = 0;
      for (let item of this.rawData) {
        if (this.isShow(item)) {
          i++;
          if (i > this.t && i <= this.num + this.t) {
            this.viewData.push(item);
          }
        }
      }

      this.b = i - this.t - this.num > 0 ? i - this.t - this.num : 0;
      this.$nextict;

      this.$nextTick(() => {
        this.box.scrollTop = st;
      });
    },
    nodeClick(item) {
      this.$emit("nodeClick", item);
    }
  },
  created() {
    this.format(this.treeData, 0, null);
  },
  mounted() {
    // 监听这个dom的scroll事件
    this.box = this.$refs.viewBox.parentNode;
    this.box.addEventListener("scroll", () => {
      clearTimeout(this.timer);
      this.timer = setTimeout(this.resize, this.feq);
    });
    this.resize();
  }
};
</script>
<style lang="less">
.bd-tree-node {
  @nh: 21px;
  font-size: 13px;
  line-height: @nh;
  height: @nh;
  .toggle-btn {
    display: inline-block;
    width: @nh;
    text-align: center;
    cursor: pointer;
    border-radius: 3px;
    &:hover {
      background: #eee;
    }
    &.expand {
      transform: rotateZ(90deg);
    }
  }
}
</style>