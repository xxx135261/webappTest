<template>
  <li class="ferm-tree-item">
    <div class="ferm-tree-parent">
      <span :class="{'ferm-children-open': data.expand, 'toggle-btn': true}">
        <h-icon name="ios-arrow-right" v-if="hasChildren" @on-click="toggleExpand"></h-icon>
      </span>
      <span
        class="ferm-tree-node-checkbox"
        :class="{'unchecked-flag': !data.checked && !data.indeterminate, 'checkbox-disabled': data.disabled, 'indeterminate-flag': data.indeterminate}"
        v-if="showCheckbox"
        @click.prevent="handleCheck"
      >
        <i class="iconfont icon-right check-flag" v-if="data.checked"></i>
      </span>
      <div class="ferm-tree-node-con">
        <slot name="node" :slotNode="data">
          <div
            :class="{'ferm-tree-text': true, 'ferm-tree-text-selected': data.selected, 'ferm-tree-text-disabled': data.disabled}"
            @click="handleClick"
            :title="data[keyMapping.title]"
            v-html="highlight ? withHighlight(data[keyMapping.title]) : data[keyMapping.title]"
          ></div>
        </slot>
      </div>
    </div>
    <ul
      class="ferm-tree-children"
      v-if="hasChildren && firstExpand"
      :class="data.expand?'':(animate?'hide-ani':'hide')"
    >
      <tree-node
        v-for="(node, i) in children"
        :key="i"
        ref="children"
        :data="node"
        :isAlwaysSelect="isAlwaysSelect"
        :checkStrictly="checkStrictly"
        :keyMapping="keyMapping"
        :showCheckbox="showCheckbox"
        :highlight="highlight"
        :keyword="keyword"
        :hasSlot="hasSlot"
        :animate="animate"
      >
        <template slot="node" slot-scope="{slotNode}" v-if="hasSlot">
          <slot name="node" :slotNode="slotNode"></slot>
        </template>
      </tree-node>
    </ul>
  </li>
</template>

<script>
export default {
  name: "TreeNode",
  props: [
    "data",
    "isAlwaysSelect",
    "checkStrictly",
    "keyMapping",
    "showCheckbox",
    "highlight",
    "keyword",
    "hasSlot",
    "animate"
  ],
  data() {
    return {
      tree: null,
      pNode: null,
      firstExpand: this.data.expand
    };
  },
  computed: {
    children() {
      return !this.data.leaf && this.data.children
        ? this.data.children.filter(child => !child.hide)
        : [];
    },
    hasChildren() {
      return this.children.length > 0;
    }
  },
  watch: {
    "data.expand"(val) {
      if (val && !this.firstExpand) {
        this.firstExpand = true;
      }
    }
  },
  methods: {
    toggleExpand() {
      this.data.expand = !this.data.expand;
      this.tree.handleToggleExpand(this.data);
    },
    handleClick() {
      if (!this.data.disabled) {
        let lastSel = this.data.selected;
        this.data.selected = lastSel ? this.isAlwaysSelect : !lastSel;
        if (!this.isAlwaysSelect || !(lastSel && this.data.selected)) {
          this.tree.handleSelectChange(this.data);
        }
      } else {
        this.toggleExpand();
      }
    },
    handleCheck() {
      const data = this.data;
      if (!data.disabled) {
        if (this.checkStrictly) {
          data.checked = !data.checked;
        } else {
          let checked;
          checked = !data.checked && !data.indeterminate;
          data.checked = checked;
          data.indeterminate = false;
          this.updateCheckDown(checked);
          if (this.pNode) this.pNode.updateCheck();
        }
        this.tree.handleCheckChange(data);
      }
    },
    updateCheck() {
      let checked;
      let indeterminate;
      const children = this.children;
      for (let i = 0; i < children.length; i++) {
        checked = children[i].checked;
        if (
          i < children.length - 1 &&
          children[i].checked != children[i + 1].checked
        ) {
          indeterminate = true;
          break;
        }
        if (children[i].indeterminate) {
          indeterminate = true;
          break;
        }
      }
      if (indeterminate) {
        this.data.checked = false;
        this.data.indeterminate = true;
      } else {
        this.data.checked = checked;
        this.data.indeterminate = false;
      }
      if (this.pNode) this.pNode.updateCheck();
    },
    updateCheckDown(checked) {
      const children = this.children;
      if (children && children.length > 0) {
        const travel = siblings => {
          siblings.forEach(sibling => {
            const _children =
              !sibling.leaf && sibling.children
                ? sibling.children.filter(s => !s.hide)
                : null;
            sibling.checked = checked;
            sibling.indeterminate = false;
            if (_children) {
              travel(_children);
            }
          });
        };
        travel(children);
      }
    },
    withHighlight(text) {
      const keyword = this.keyword;
      if (!keyword) {
        return text;
      } else {
        return text.replace(
          keyword,
          `<span class="ferm-tree-text-highlight">${keyword}</span>`
        );
      }
    }
  },
  created() {
    const parent = this.$parent;
    if (parent.$options.name === "Tree") {
      this.tree = parent;
    } else {
      this.tree = parent.tree;
      this.pNode = parent;
    }
  }
};
</script>

<style lang="less">
.ferm-tree-item {
  font-size: 13px;
  // margin: 6px 0;
  .ferm-tree-parent {
    margin: 0;
    padding: 0;
    height: 25px;
    line-height: 25px;
    overflow: hidden;
    opacity: 1;
    transition: height 0.2s, opacity 0.2s;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .ferm-tree-node-checkbox {
      flex: 0 0 auto;
      margin-left: 2px;
      height: 15px;
      width: 15px;
      line-height: 1;
      cursor: pointer;
      border: 1px solid #298dff;
      border-radius: 3px;
      background: #298dff;
      &.unchecked-flag:not(.checkbox-disabled) {
        background: #ffffff;
        border-color: #d7dde4;
        &:hover {
          border-color: #298dff;
        }
      }
      &.indeterminate-flag {
        background: #ffffff;
        border-width: 6px 3px;
      }
      &.checkbox-disabled {
        cursor: not-allowed;
        background: #f7f7f7;
        border-color: #d7dde4;
        .check-flag {
          color: #cccccc;
        }
      }
      .check-flag {
        color: #ffffff;
        font-weight: 900;
        font-size: 13px;
        vertical-align: middle;
      }
    }
    .toggle-btn {
      flex: 0 0 auto;
      min-width: 16px;
      cursor: pointer;
      &.ferm-children-open {
        transform: rotate(90deg);
      }
      transition: all 0.2s ease;
      i {
        font-size: 14px;
      }
    }
    .ferm-tree-node-con {
      flex: 1;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      .ferm-tree-text {
        display: inline-block;
        padding: 0 4px;
        margin-left: 2px;
        max-width: 200px;
        user-select: none;
        cursor: pointer;
        border-radius: 4px;
        &-selected {
          color: #ffffff;
          background: #298dff;
        }
        &-highlight {
          color: #ffc100;
          font-weight: bold;
        }
        &-disabled {
          color: #ccc;
        }
      }
    }
  }
  .ferm-tree-children {
    list-style: none;
    margin-left: 15px;
    &.hide-ani {
      .ferm-tree-parent {
        height: 0;
        opacity: 0;
      }
    }
    &.hide {
      display: none;
    }
  }
}
</style>