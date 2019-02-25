<template>
  <div class="ferm-tree-con">
    <div class="ferm-tree-con-tools">
      <h-input
        type="text"
        size="small"
        v-model="keyword"
        icon="android-close"
        @on-change="debouncedSearch"
        @on-click="keyword = '';fuzzySearch('')"
        :placeholder="placeholder"
      ></h-input>
      <h-button-group size="small">
        <h-button @click="toggleExpand(true)" title="展开全部">
          <h-icon name="t-b-unfoldingaround"></h-icon>
        </h-button>
        <h-button @click="toggleExpand(false)" title="收缩全部">
          <h-icon name="t-b-roundup"></h-icon>
        </h-button>
      </h-button-group>
    </div>
    <div class="ferm-tree-wrapper">
      <tree
        :data="data"
        :no-data-text="noDataText"
        ref="tree"
        :isAlwaysSelect="isAlwaysSelect"
        :keyMapping="keyMapping"
        :multiple="multiple"
        :checkStrictly="checkStrictly"
        :showCheckbox="showCheckbox"
        :flatten="flatten"
        :highlight="highlight"
        @on-select-change="handleSelChange"
        @on-toggle-expand="handleToggle"
        @on-check-change="handleCheckChange"
        :animate="animate"
        :keyword="keyword"
        :hasSlot="hasSlot"
      >
        <template slot="node" slot-scope="{slotNode}" v-if="hasSlot">
          <slot name="node" :slotNode="slotNode"></slot>
        </template>
      </tree>
      <ferm-loading v-if="loading"></ferm-loading>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Input, Button } from 'h_ui';
Vue.component('hButton', Button);
Vue.component('hButtonGroup', Button.Group);
Vue.component('hInput', Input);

import Tree from './tree'
import FermLoading from '../FermLoading'

const DEFAULT_KEY_MAPPING = {
  id: "id",
  pId: "pId",
  title: "title"
};

export default {
  components: { Tree, FermLoading },
  props: {
    data: {
      type: Array,
      default: []
    },
    noDataText: String,
    filter: Function,
    loading: {
      type: Boolean,
      default: false
    },
    keyMapping: {
      type: Object,
      default: () => DEFAULT_KEY_MAPPING
    },
    checkStrictly: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    isAlwaysSelect: {
      type: Boolean,
      default: false
    },
    showCheckbox: {
      type: Boolean,
      default: true
    },
    flatten: {
      type: Boolean,
      default: false
    },
    animate: {
      type: Boolean,
      default: true
    },
    highlight: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: '输入关键词进行检索...'
    }
  },
  data() {
    return {
      /* 搜索关键字 */
      keyword: '',
      /* 树形组件节点插槽是否有模板插入 */
      hasSlot: false,
      /* 防抖处理后的搜索函数 */
      debouncedSearch: this.debounce(this.fuzzySearch, 100)
    }
  },
  methods: {
    fuzzySearch() {
      const searchFunc = this.filter;
      const keyword = this.keyword;
      const keyMapping = this.keyMapping;
      const match = (node) => {
        if (searchFunc) {
          return searchFunc.call(null, keyword, node);
        } else {
          return node[keyMapping.title].indexOf(keyword) !== -1;
        }
      }
      const search = (node) => {
        let shouldHide;
        if (!node.leaf && node.children && node.children.length > 0) {
          if (match(node)) {
            shouldHide = false;
            this.travelChildren(node.children, n => {
              this.$set(n, 'hide', false);
            });
          } else {
            const results = node.children.map(n => search(n));
            shouldHide = results.findIndex(result => result) === -1;
          }
        } else {
          shouldHide = !match(node);
        }
        this.$set(node, 'hide', shouldHide);
        if (!shouldHide) node.expand = true;
        return !shouldHide;
      }
      this.data.filter(d => d.level === 0).forEach(node => search(node));
      this.$refs.tree.buildCheckState(this.$refs.tree.localData);
    },
    getCheckedNodes(indeterminate = false) {
      return this.$refs.tree.getCheckedNodes(indeterminate);
    },
    getSelectedNodes() {
      return this.$refs.tree.getSelectedNodes();
    },
    nodeSelect(key, value, status = false, silent) {
      this.$refs.tree.nodeSelect(key, value, status, silent);
    },
    nodeExpand(key, value, status = false, silent) {
      this.$refs.tree.nodeExpand(key, value, status, silent);
    },
    handleSelChange(nodeData) {
      this.$emit('on-select-change', nodeData);
    },
    handleToggle(nodeData) {
      this.$emit('on-toggle-expand', nodeData);
    },
    handleCheckChange(nodeData) {
      this.$emit('on-check-change', nodeData);
    },
    toggleExpand(expand) {
      this.travelChildren(this.data.filter(d => d.level === 0), n => {
        this.$set(n, 'expand', expand);
      });
    },
    travelChildren(nodeArr, cb, filter) {
      nodeArr.forEach(node => {
        if (typeof filter !== 'function' || filter(node)) {
          cb(node);
          if (!node.leaf && node.children && node.children.length > 0) {
            this.travelChildren(node.children, cb);
          }
        }
      })
    },
    debounce(cb, delay) {
      let timer = null;
      return () => {
        clearTimeout(timer);

        let context = this, args = arguments;
        timer = setTimeout(() => {
          cb.apply(context, args);
        }, delay);
      }
    }
  },
  mounted() {
    this.hasSlot = !!this.$scopedSlots.node;
  }
}
</script>

<style lang="less">
.ferm-tree-con {
  min-width: 50px;
  width: 100%;
  height: 100%;
  &-tools {
    display: flex;
    display: -webkit-flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    .h-input-wrapper {
      width: calc(100% - 60px);
      i {
        cursor: pointer;
        transition: color 0.2s;
        &:hover {
          color: rgb(100, 100, 100);
        }
      }
    }
  }
  .ferm-tree-wrapper {
    height: calc(100% - 40px);
    position: relative;
  }
}
</style>
