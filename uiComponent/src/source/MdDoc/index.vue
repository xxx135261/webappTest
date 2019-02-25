<template>
  <div class="md" :class="'by-'+tocPos">
    <div class="md-con" ref="con" v-html="htmlStr" @scroll="checkTopVisible"></div>
    <div class="md-toc">
      <div
        class="md-toc-item mono"
        :class="{'active': item.active, 'hide': isHide(item)}"
        v-for="(item, i) in tocItems"
        :key="i"
        :style="tocItemStyle(item, i)"
        @click="handleClick(item.anchor)"
      >
        <h-icon
          :class="{'toggle-btn': true, 'toggle-collapse': !item.expand}"
          name="ios-arrow-forward"
          v-if="foldable && isParent(i)"
          @click.native.stop="toggle(item, i)"
        ></h-icon>
        <span :class="{'text': true}">{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import marked from "marked/marked.min.js";

const tags = ["h1", "h2", "h3", "h4", "h5", "h6"];

export default {
  name: "MdDoc",
  data() {
    return {
      htmlStr: "",
      tocItems: [],
      timer: null,
      /* 用于点击目录项时取消scroll回调 */
      lock: false,
      /* 文档中最高级别的标题标签对应的层级 */
      minLevel: 0
    };
  },
  props: {
    text: {
      type: String,
      default: ""
    },
    tocPos: {
      type: String,
      default: "right",
      validator: function (val) {
        return ["left", "right"].indexOf(val) !== -1;
      }
    },
    foldable: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    text: {
      immediate: true,
      handler(newVal) {
        this.htmlStr = newVal ? marked(newVal) : "";
        this.$nextTick(() => {
          this.genToc();
          this.checkTopVisible();
        });
      }
    }
  },
  methods: {
    genToc() {
      const con = this.$refs.con;
      let minLevel;
      let index = 0;
      // 标记标题
      tags.forEach((tag, i) => {
        let els = con.getElementsByTagName(tag);
        Array.prototype.forEach.call(els, el => {
          el.setAttribute("anchor-id", el.innerText + '-' + index++);
          el.setAttribute("toc-item", true);
        });
        if (els.length > 0 && minLevel === undefined) {
          minLevel = i;
        }
      });
      this.minLevel = minLevel;

      const hTagEls = con.querySelectorAll("[toc-item=true]");
      const tocItems = [];
      // 生成目录列表对象
      hTagEls.forEach((hTag, i) => {
        tocItems.push({
          // 锚点id
          anchor: hTag.attributes["anchor-id"].value,
          name: hTag.innerText,
          level: tags.indexOf(hTag.tagName.toLowerCase()),
          // 父级目录项序号
          parent: -1,
          // 是否展开子目录项
          expand: true,
          // 是否显示当前目录项
          show: true
        });
      });

      // 生成目录列表项父级关系
      tocItems.forEach((item, i) => {
        if (i < tocItems.length - 1) {
          const items = tocItems.slice(i + 1);
          for (let j in items) {
            let nextItem = items[j];
            if (item.level < nextItem.level) {
              nextItem.parent = i;
            } else {
              break;
            }
          }
        }
      })
      this.tocItems = tocItems;
    },
    handleClick(anchor) {
      const con = this.$refs.con;
      const el = con.querySelector(`[anchor-id='${anchor}']`);
      if (el) {
        let scrollDist = con.scrollHeight - con.clientHeight;
        if (scrollDist > 0) {
          con.scrollTop =
            el.offsetTop <= scrollDist ? el.offsetTop : scrollDist;
          this.tocItems.forEach(item => this.$set(item, "active", false));
          let activeItem = this.tocItems.find(
            item => item.anchor == el.attributes["anchor-id"].value
          );
          this.$set(activeItem, "active", true);
          this.$nextTick(() => {
            this.lock = true;
          });
        }
      }
    },
    checkTopVisible() {
      if (!this.timer) {
        this.timer = setTimeout(() => {
          if (this.lock) {
            this.timer = null;
            this.lock = false;
            return;
          }
          const con = this.$refs.con;
          const scrollTop = con.scrollTop;
          const hTagEls = con.querySelectorAll("[toc-item=true]");
          let topEl = Array.prototype.find.call(
            hTagEls,
            hTag => hTag.offsetTop >= scrollTop
          );
          if (topEl) {
            this.tocItems.forEach(item => this.$set(item, "active", false));
            let activeItem = this.tocItems.find(
              item => item.name == topEl.innerText
            );
            if (activeItem) {
              this.$set(activeItem, "active", true);
            }
          }
          this.timer = null;
        }, 300);
      }
    },
    isParent(index) {
      return this.tocItems.findIndex(item => item.parent === index) > -1;
    },
    isHide(item) {
      return !item.show || (item.parent !== -1 && this.isHide(this.tocItems[item.parent]))
    },
    toggle(item, index) {
      this.tocItems.slice(index).forEach(i => {
        if (i.parent === index) {
          i.show = !item.expand;
        }
      })
      item.expand = !item.expand;
    },
    tocItemStyle(item, i) {
      return { 'padding-left': ((item.level - this.minLevel) * 15 + (this.foldable && this.isParent(i) ? 0 : 15)) + 'px' };
    }
  }
};
</script>

<style lang="less">
@import "./theme/github.less";
.md {
  height: 100%;
  display: flex;
  &.by-left &-toc {
    order: -1;
    border-width: 0 1px 0 0;
  }
  &-toc,
  &-con {
    overflow: auto;
    overflow: overlay;
    /* 用于计算子元素offsetTop时将.md-con作为offsetParent */
    position: relative;
  }
  &-toc {
    width: 280px;
    border: 1px solid #e1e4e8;
    border-width: 0 0 0 1px;
    padding: 1rem;
    &-item {
      padding: 4px 10px;
      border: 1px solid transparent;
      cursor: pointer;
      &.active {
        color: #467fcf;
        font-weight: bold;
        background: rgba(70, 127, 207, 0.06);
        border-color: rgba(70, 127, 207, 0.1);
      }
      &.hide {
        display: none;
      }
      &:hover {
        background: rgba(70, 127, 207, 0.06);
      }
      .toggle-btn {
        margin-right: 3px;
        color: #444;
        font-weight: normal;
        display: inline-block;
        transition: all 0.2s;
        transform: rotate(90deg);
        &.toggle-collapse {
          transform: rotate(0);
        }
        &:hover {
          color: rgba(#444, 0.6);
        }
      }
    }
  }
  &-con {
    flex: 1;
    // scroll-behavior: smooth;
    padding: 0 2rem 2rem;
    line-height: 1.8;
  }
}
</style>