<template>
  <div class="ferm-tree">
    <ul class="ferm-tree-root" v-if="rootData.length > 0">
      <tree-node
        v-for="(node, i) in rootData"
        :key="i"
        :data="node"
        ref="roots"
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
    <div class="no-data-text" v-else>{{noDataText}}</div>
  </div>
</template>

<script>
import TreeNode from "./TreeNode";

const DEFAULT_KEY_MAPPING = {
  id: "id",
  pId: "pId",
  title: "title"
};

export default {
  name: "Tree",
  components: { TreeNode },
  props: {
    data: {
      type: Array,
      default: []
    },
    noDataText: {
      type: String,
      default: "暂无数据"
    },
    isAlwaysSelect: {
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
    keyword: {
      type: String,
      default: ""
    },
    hasSlot: Boolean
  },
  data() {
    return {
      localData: [],
      flattenData: []
    };
  },
  computed: {
    rootData() {
      return this.localData.filter(d => !d.hide);
    }
  },
  watch: {
    data: {
      handler(newVal) {
        let data = newVal;
        if (this.flatten) {
          data = this.transFlattenData(newVal);
        }
        this.localData = this.buildData(data);
        this.buildCheckState(this.localData);
        this.flattenData = this.buildFlattenData(this.localData);
      }
    }
  },
  methods: {
    getCheckedNodes(indeterminate = false) {
      const checkedNodes = [];
      const travel = dataArr => {
        if (!dataArr) return;
        dataArr.forEach(d => {
          if (!d.hide && (d.checked || d.indeterminate)) {
            if (d.checked || (d.indeterminate && indeterminate)) {
              checkedNodes.push(d);
            }
            if (!d.leaf) {
              travel(d.children);
            }
          }
        });
      };
      travel(this.localData);
      return checkedNodes;
    },
    getSelectedNodes() {
      const selectedNodes = [];
      const travel = dataArr => {
        if (!dataArr) return;
        dataArr.forEach(d => {
          if (!d.hide) {
            if (d.selected) {
              selectedNodes.push(d);
            }
            if (!d.leaf) {
              travel(d.children);
            }
          }
        });
      };
      travel(this.localData);
      return selectedNodes;
    },
    nodeSelect(key, value, status, silent = false) {
      let node = this.flattenData.find(d => d[key] === value);
      if (node) {
        node.selected = status;
        this.handleSelectChange(node, silent);
      }
    },
    nodeExpand(key, value, status, silent = false) {
      let node = this.flattenData.find(d => d[key] === value);
      if (node) {
        node.expand = !node.expand;
        if (!silent) this.handleToggleExpand(node);
      }
    },
    buildData(data) {
      let count = 0;
      const travel = (siblings, level = 0) => {
        let siblingCount = 0;
        siblings.forEach(sibling => {
          this.$set(sibling, "level", level);
          this.$set(sibling, "nodeKey", level + "-" + siblingCount++ + "-" + count++);
          [
            { name: "expand", default: true },
            { name: "selected", default: false },
            { name: "disabled", default: false },
            { name: "indeterminate", default: false },
            {
              name: "checked",
              default: false
            } /* , { name: 'hide', default: false } */,
            { name: "leaf", default: false }
          ].forEach(prop => {
            if (typeof sibling[prop.name] !== "boolean") {
              this.$set(sibling, prop.name, prop.default);
            }
          });
          if (sibling.children) {
            travel(sibling.children, level + 1);
          }
        });
      };
      travel(data);
      return data;
    },
    buildCheckState(data) {
      if (this.checkStrictly) {
        this.flattenData.forEach(d => (d.indeterminate = false));
        return;
      }
      return data.map(d => {
        // -1: unchecked, 0: indeterminate, 1: checked
        let checkState;
        if (!d.leaf && d.children) {
          const children = d.children.filter(c => !c.hide);
          if (children.length > 0) {
            const checkStates = this.buildCheckState(children);
            if (
              checkStates.findIndex(s => s == 0) > -1 ||
              (checkStates.findIndex(s => s == 1) > -1 &&
                checkStates.findIndex(s => s == -1) > -1)
            ) {
              checkState = 0;
              d.checked = false;
              d.indeterminate = true;
            } else if (checkStates.findIndex(s => s == 1) > -1) {
              checkState = 1;
              d.checked = true;
              d.indeterminate = false;
            } else {
              checkState = -1;
              d.checked = false;
              d.indeterminate = false;
            }
          }
        } else {
          checkState = d.checked ? 1 : -1;
        }
        return checkState;
      });
    },
    transFlattenData(data) {
      const keyMapping = this.keyMapping;
      let map = {},
        tree = [];
      for (let i = 0; i < data.length; i++) {
        delete data[i].children;
        map[data[i][keyMapping.id]] = data[i];
      }
      for (let i = 0; i < data.length; i++) {
        let node = data[i];
        if (node[keyMapping.pId] !== data[0][keyMapping.pId]) {
          if (!map[node[keyMapping.pId]].children) {
            map[node[keyMapping.pId]].children = [];
          }
          map[node[keyMapping.pId]].children.push(node);
        } else {
          tree.push(node);
        }
      }
      return tree;
    },
    buildFlattenData(data) {
      const arr = [];
      if (!data) return;
      data.forEach(d => {
        arr.push(d);
        if (!d.leaf) {
          let children = this.buildFlattenData(d.children);
          if (children) {
            arr.push(...children);
          }
        }
      });
      return arr;
    },
    handleSelectChange(nodeData, silent = false) {
      if (!this.multiple) {
        const nodeKey = nodeData.nodeKey;
        const travel = node => {
          node.forEach(n => {
            if (n.nodeKey != nodeKey) n.selected = false;
            if (n.children) travel(n.children);
          });
        };
        travel(this.localData);
      }
      if (!silent) this.$emit("on-select-change", nodeData);
    },
    handleToggleExpand(nodeData) {
      this.$emit("on-toggle-expand", nodeData);
    },
    handleCheckChange(nodeData) {
      this.$emit("on-check-change", nodeData);
    }
  },
  created() {
    let data = this.data;
    if (this.flatten) {
      data = this.transFlattenData(this.data);
    }
    this.localData = this.buildData(data);
    this.buildCheckState(this.localData);
    this.flattenData = this.buildFlattenData(this.localData);
  }
};
</script>
<style lang="less">
.ferm-tree {
  .no-data-text {
    text-align: center;
  }
}
</style>
