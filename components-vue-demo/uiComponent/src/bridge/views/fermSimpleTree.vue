<template>
  <div class="tree-con">
    <div class="tree-left">
      <FermSimpleTree
        ref="tree"
        :data="data"
        @on-select-change="handleSel"
        @on-check-change="handleCheck"
        :keyMapping="keyMapping"
        :isAlwaysSelect="false"
        :multiple="treeOption.multiple"
        :checkStrictly="treeOption.checkStrictly"
        :showCheckbox="treeOption.showCheckbox"
        :flatten="true"
        :animate="treeOption.animate"
      >
        <!-- <span slot="node" slot-scope="{slotNode}">{{slotNode.name}}</span> -->
      </FermSimpleTree>
    </div>
    <div class="tree-right">
      <div>
        <span class="title">Amount of TreeNode: {{this.data.length}}</span>
      </div>
      <div>
        <span class="title">Tree Options:</span>
        <br>
        <h-checkbox v-model="treeOption.checkStrictly">
          <span>checkStrictly(取消父子联动)</span>
        </h-checkbox>
        <br>
        <h-checkbox v-model="treeOption.multiple">
          <span>multiple(树节点多选)</span>
        </h-checkbox>
        <br>
        <h-checkbox v-model="treeOption.showCheckbox">
          <span>showCheckbox(是否展示多选框)</span>
        </h-checkbox>
        <br>
        <h-checkbox v-model="treeOption.animate">
          <span>animate(是否启用CSS动画)</span>
        </h-checkbox>
      </div>
      <div>
        <span class="title">TreeNode Selected</span>
        <span class="text-con">{{JSON.stringify(selectedNodes)}}</span>
      </div>
      <div>
        <span class="title">TreeNode Checked</span>
        <span class="text-con">{{JSON.stringify(checkedNodes)}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import FermSimpleTree from '../../source/FermSimpleTree';
// import { randomFlattenData } from '../randomTreeData'
import Vue from 'vue';
import { Checkbox } from 'h_ui';
Vue.component('hCheckbox', Checkbox);

export default {
  components: { FermSimpleTree },
  // created() {
  //   this.data = randomFlattenData();
  // },
  data() {
    return {
      keyMapping: {
        id: "id",
        pId: "pid",
        title: "name"
      },
      data: [
        {
          name: '节点1',
          id: 0,
          pid: -1
        },
        {
          name: '节点1-1',
          id: 6,
          pid: 0,
          disabled: true
        },
        {
          name: '节点1-2',
          id: 7,
          pid: 0
        },
        // {
        //   name: '节点2',
        //   id: 1,
        //   pid: -1
        // },
        // {
        //   name: '节点3',
        //   id: 2,
        //   pid: -1,
        //   disabled: true
        // },
        // {
        //   name: '节点3-1',
        //   id: 20,
        //   pid: 2
        // },
        // {
        //   name: '节点3-2',
        //   id: 21,
        //   pid: 2
        // },
        // {
        //   name: '节点3-3',
        //   id: 22,
        //   pid: 2
        // },
        // {
        //   name: '节点3-3-1',
        //   id: 221,
        //   pid: 22
        // },
        // {
        //   name: '节点3-3-2',
        //   id: 222,
        //   pid: 22
        // },
        // {
        //   name: '节点3-3-3',
        //   id: 223,
        //   pid: 22
        // },
        // {
        //   name: '节点4',
        //   id: 3,
        //   pid: -1
        // },
        // {
        //   name: '节点5',
        //   id: 4,
        //   pid: -1
        // },
        // {
        //   name: '节点6',
        //   id: 5,
        //   pid: -1
        // }
      ],
      treeOption: {
        checkStrictly: false,
        multiple: true,
        showCheckbox: true,
        animate: true
      },
      selectedNodes: [],
      checkedNodes: []
    }
  },
  methods: {
    handleSel(nodeData) {
      this.selectedNodes = this.$refs.tree.getSelectedNodes();
      alert(`选中：${JSON.stringify(nodeData)}`)
    },
    handleCheck() {
      this.checkedNodes = this.$refs.tree.getCheckedNodes();
    }
  }
}
</script>

<style lang="less">
.tree-con {
  height: 100%;
  display: flex;
  display: -webkit-flex;
  flex-flow: row nowrap;
  .tree-left {
    overflow: auto;
    min-width: 100px;
    width: 25%;
    padding: 8px 10px;
    height: 100%;
    border: 1px solid #ccc;
  }
  .tree-right {
    width: 75%;
    min-width: 200px;
    padding: 10px 20px;
    overflow: auto;
    .title {
      font-size: 16px;
      display: inline-block;
      margin: 10px 0px;
    }
    .text-con {
      display: inline-block;
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>