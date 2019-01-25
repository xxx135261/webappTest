<template>
  <div class="tag-cloud" ref="wrapper">
    <p v-for="(item, index) in data" :key="index" ref="tag" @click="clickTag(item)">{{item.name?item.name:item.tag_name}}</p>
  </div>
</template>

<script>
export default {
  name: 'tagCloud',
  props: {
    data: {
      type: Array,
      default: []
    },
    config: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      option: {
        radius: 80, // 滚动半径，单位px
        maxFont: 24, // 最大字体大小
        tagsColor: ["#5681f3", "#7cc943", "#deb925", "#ea4335", "#4285f4"], //定义词墙颜色,
      },
      tagList: []
    }
  },
  created() {
    if (this.config != null) {
      this.option = Object.assign({}, this.option, this.config)
    }
  },
  mounted() {
    this._initTags()
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  },
  watch: {
    data() {
      this.$nextTick(() => {
        this._initTags()
      })
    }
  },
  methods: {
    _initTags() {
      for (var i = 0, length = this.data.length; i < length; i++) {
        // 获取球面上均匀的点的经纬度 θ = arccos( ((2*num)-1)/all - 1); Φ = θ*sqrt(all * π);
        let angleX = Math.acos((2 * (i + 1) - 1) / length - 1)
        let angleY = angleX * Math.sqrt(length * Math.PI)
        // 根据经纬度获取点的坐标，球中心的点坐标是 (0,0,0) x=r*sinθ*cosΦ   y=r*sinθ*sinΦ   z=r*cosθ;
        const x = this.option.radius * Math.sin(angleX) * Math.cos(angleY)
        const y = this.option.radius * Math.sin(angleX) * Math.sin(angleY)
        const z = this.option.radius * Math.cos(angleX)
        // 随机颜色
        this.$refs.tag[i].style.color = this.option.tagsColor[Math.floor(Math.random()*5)];
        // 每个标签对象都有四对值
        var tag = {
          x: x,
          y: y,
          z: z,
          ele: this.$refs.tag[i]
        }
        this.tagList.push(tag)
      }
      for (var i = 0; i < this.tagList.length; i++) {
        this.setPosition(
          this.tagList[i],
          this.option.radius,
          this.option.maxFont
        )
      }
    },
    setPosition(tag, r, maxFont) {
      // 设置每个标签的坐标位置和字体大小以及透明度
      if (this.$refs.wrapper) {
        tag.ele.style.transform =
          'translate(' +
          (tag.x +
            this.$refs.wrapper.offsetWidth / 2 -
            tag.ele.offsetWidth / 2) +
          'px,' +
          (tag.y +
            this.$refs.wrapper.offsetHeight / 2 -
            tag.ele.offsetHeight / 2) +
          'px)'
        tag.ele.style.fontSize = (tag.z / r / 2 + 0.5) * maxFont + 'px'
      }
    },
    clickTag(item) {
      this.$emit('clickTag', item)
    }
  }
}
</script>

<style lang="less" scoped>
.tag-cloud {
  width: 180px;
  height: 220px;
  position: relative;
  color: #333;
  margin: 0 auto;
  text-align: center;
}

.tag-cloud p {
  position: absolute;
  top: 0px;
  left: 0px;
  color: #333;
  font-family: Arial;
  text-decoration: none;
  margin: 0 10px 15px 0;
  line-height: 18px;
  text-align: center;
  font-size: 16px;
  padding: 4px 9px;
  display: inline-block;
  border-radius: 3px;
  opacity: 0.7;
  font-weight: 600;
  max-width: 100px;
  &:hover{
    opacity: 1;
    cursor: pointer;
  }
  &:nth-of-type(1){
    margin: -28px 0 0px 0;
  }
}
</style>