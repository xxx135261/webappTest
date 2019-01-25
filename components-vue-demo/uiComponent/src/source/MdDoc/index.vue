<template>
  <div class="md">
    <div class="md-toc" :class="posClz">
      <div
        class="md-toc-item mono"
        v-for="(item, i) in tocItems"
        :key="i"
        :style="{'padding-left': (item.level * 15 + 15) + 'px'}"
        @click="handleClick(item.anchor)"
      >
        <span :class="{'text': true, 'active': item.active}">{{item.name}}</span>
      </div>
    </div>
    <div class="md-con" :class="posClz" ref="con" v-html="htmlStr" @scroll="checkTopVisible"></div>
  </div>
</template>

<script>
import marked from 'marked/marked.min.js';

const tags = ["h1", "h2", "h3", "h4", "h5", "h6"];

export default {
  name: 'MdDoc',
  data() {
    return {
      htmlStr: '',
      tocItems: [],
      timer: null,
      /* 用于点击目录项时取消scroll回调 */
      lock: false
    }
  },
  props: {
    text: {
      type: String,
      default: ''
    },
    tocPos: {
      type: String,
      default: 'right',
      validator: function (val) {
        return ['left', 'right'].indexOf(val) !== -1;
      }
    }
  },
  watch: {
    text: {
      immediate: true,
      handler(newVal) {
        this.htmlStr = newVal ? marked(newVal) : '';
        this.$nextTick(() => {
          this.genToc();
        });
      }
    }
  },
  computed: {
    posClz() {
      return { 'by-left': this.tocPos === 'left', 'by-right': this.tocPos === 'right' };
    }
  },
  methods: {
    genToc() {
      const con = this.$refs.con;
      tags.forEach(tag => {
        let els = con.getElementsByTagName(tag);
        Array.prototype.forEach.call(els, el => {
          el.setAttribute('anchor-id', el.innerText);
          el.setAttribute('toc-item', true);
        });
      })
      const hTagEls = con.querySelectorAll('[toc-item=true]');
      const tocItems = [];
      hTagEls.forEach(hTag => {
        tocItems.push({
          anchor: hTag.innerText,
          name: hTag.innerText,
          level: tags.indexOf(hTag.tagName.toLowerCase())
        });
      });
      this.tocItems = tocItems;
    },
    handleClick(anchor) {
      const con = this.$refs.con;
      const el = con.querySelector(`[anchor-id='${anchor}']`);
      if (el) {
        let scrollDist = con.scrollHeight - con.clientHeight;
        if (scrollDist > 0) {
          con.scrollTop = el.offsetTop <= scrollDist ? el.offsetTop : scrollDist;
          this.tocItems.forEach(item => this.$set(item, 'active', false));
          let activeItem = this.tocItems.find(item => item.name == el.innerText);
          this.$set(activeItem, 'active', true);
          this.$nextTick(() => {
            this.lock = true;
          })
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
          const hTagEls = con.querySelectorAll('[toc-item=true]');
          let topEl = Array.prototype.find.call(hTagEls, hTag => hTag.offsetTop >= scrollTop);
          if (topEl) {
            this.tocItems.forEach(item => this.$set(item, 'active', false));
            let activeItem = this.tocItems.find(item => item.name == topEl.innerText);
            if (activeItem) {
              this.$set(activeItem, 'active', true);
            }
          }
          this.timer = null;
        }, 300);
      }
    }
  }
}
</script>
<style lang="less">
@import "./theme/github.less";
.md {
  overflow: hidden;
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  &-toc {
    width: 280px;
    height: inherit;
    padding: 10px 0;
    vertical-align: text-bottom;
    background: #f9f9f9;
    overflow: auto;
    &-item {
      padding: 0 10px;
      transition: background 0.2s;
      width: 100%;
      overflow: hidden;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
      .text {
        color: #444;
        white-space: pre-wrap;
        font-size: 13px;
        &.active {
          color: #000;
          font-weight: bold;
        }
      }
    }
    &.by-left {
      border-right-width: 1px;
      border-right-style: solid;
      border-right-color: #ddd;
    }
    &.by-right {
      order: 1;
      border-left-width: 1px;
      border-left-style: solid;
      border-left-color: #ddd;
    }
  }
  &-con {
    height: inherit;
    vertical-align: text-bottom;
    width: calc(100% - 280px - 5px);
    min-width: 100px;
    overflow: auto;
    position: relative;
    scroll-behavior: smooth;
    &.by-left {
      margin-left: 5px;
      padding-left: 10px;
    }
    &.by-right {
      margin-right: 5px;
      padding-right: 10px;
    }
  }
}
</style>