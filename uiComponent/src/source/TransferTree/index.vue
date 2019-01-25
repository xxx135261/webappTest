<template>
  <div class="transfer-tree">
    <div class="left">
      <div class="title">
        {{titleL}}
        <h-button-group size="small">
          <h-button @click="expandAll(treeData)" type="ghost">展开</h-button>
          <h-button @click="foldAll(treeData)" type="ghost">折叠</h-button>
          <h-button @click="selAll(treeData)" type="ghost">全选</h-button>
          <h-button @click="clearAll(treeData)" type="ghost">清空</h-button>
        </h-button-group>
      </div>
      <div class="search-ipt">
        <h-input v-model="leftKey" size="small" placeholder="请输入关键字进行模糊搜索" style="width: 100%"></h-input>
      </div>
      <h-tree ref="tree" :data="dyData()" show-checkbox @on-toggle-expand="expand"></h-tree>
    </div>
    <div class="btns">
      <h-button @click="LToR" type="ghost" shape="circle" icon="enter"></h-button>
      <br>
      <h-button @click="RToL" type="ghost" shape="circle" icon="return"></h-button>
    </div>
    <div class="right">
      <div class="title">
        {{titleR}}
        <h-button-group size="small">
          <h-button @click="selAllRight" type="ghost">全选</h-button>
          <h-button @click="clearAllRight" type="ghost">清空</h-button>
        </h-button-group>
      </div>
      <div class="sels">
        <h-checkbox v-for="(item,i) in sels" :key="i" v-model="item.sel">{{item.title}}</h-checkbox>
        <div v-show="sels.length==0" class="tip">无指标</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Button, Tree, Checkbox, Input } from 'h_ui';
Vue.component('hButton', Button);
Vue.component('hButtonGroup', Button.Group);
Vue.component('hTree', Tree);
Vue.component('hCheckbox', Checkbox);
Vue.component('hInput', Input);

export default {
  props: ["tree", "list", "titleL", "titleR"],
  data() {
    return {
      // left
      treeData: [],
      leftKey: "",
      // right
      sels: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      this.treeData = this.tree;
      this.sels = this.list;
      // 数据预处理
      this.handleTree("root", this.treeData);
      this.handleSels(this.sels);
      this.checkTree(this.treeData);
    },
    // 动态树数据
    dyData() {
      var raw = JSON.parse(JSON.stringify(this.treeData));
      if (this.leftKey != "") this.findNode(this.leftKey, raw);
      return raw;
    },
    // 树的操作
    // 树的展开
    expand(tree) {
      this.checkExpand(tree, this.treeData);
    },
    checkExpand(node, raw) {
      for (let i = 0; i < raw.length; i++) {
        if (raw[i].id == node.id) {
          raw[i].expand = node.expand;
          return;
        }
        if (raw[i].children) {
          this.checkExpand(node, raw[i].children);
        }
      }
    },
    // 全部展开
    expandAll(raw) {
      for (let i = 0; i < raw.length; i++) {
        this.$set(raw[i], "expand", true);
        if (raw[i].children) {
          this.expandAll(raw[i].children);
        }
      }
    },
    // 全部折叠
    foldAll(raw) {
      for (let i = 0; i < raw.length; i++) {
        this.$set(raw[i], "expand", false);
        if (raw[i].children) {
          this.foldAll(raw[i].children);
        }
      }
    },
    // 树全部选择
    selAll(raw) {
      for (let i = 0; i < raw.length; i++) {
        this.$set(raw[i], "checked", true);
      }
    },
    // 树清空
    clearAll(raw) {
      for (let i = 0; i < raw.length; i++) {
        this.$set(raw[i], "checked", false);
      }
    },
    // 列表全选
    selAllRight() {
      for (let i = 0; i < this.sels.length; i++) {
        this.$set(this.sels[i], "sel", true);
      }
    },
    clearAllRight() {
      for (let i = 0; i < this.sels.length; i++) {
        this.$set(this.sels[i], "sel", false);
      }
    },
    // 树的模糊搜索
    findNode(key, raw) {
      var all = false;
      for (let i = 0; i < raw.length; i++) {
        this.$set(raw[i], "expand", true);
        var has = false;
        if (raw[i].title.toLowerCase().indexOf(key.toLowerCase()) > -1) {
          has = true;
        } else if (raw[i].children) {
          has = this.findNode(key, raw[i].children);
        } else {
          has = false;
        }
        if (!has) {
          raw.splice(i, 1);
          i--;
        }
        all = all || has;
      }
      return all;
    },
    // 数据预处理，处理树的父子关系
    handleTree(fid, raw) {
      for (let i = 0; i < raw.length; i++) {
        // 添加父id
        raw[i].fid = fid;
        // 验证顺序用
        // raw[i].title += "<" + raw[i].oid + ">";
        if (raw[i].children) {
          this.handleTree(raw[i].id, raw[i].children);
        }
      }
    },
    handleSels(raw) {
      for (let i = 0; i < raw.length; i++) if (!raw[i].fid) raw[i].fid = "root";
    },
    // 检查树的空文件夹
    checkTree(raw) {
      var all = true;

      for (let i = 0; i < raw.length; i++) {
        if (raw[i].children) {
          // 检查空文件夹
          if (raw[i].children == 0) {
            raw[i].disabled = true;
          } else {
            raw[i].disabled = this.checkTree(raw[i].children);
          }
        } else {
          raw[i].disabled = false;
        }

        if (!raw[i].disabled) {
          all = false;
        }
      }

      return all;
    },
    // 添加节点
    addNode(node, raw) {
      // 根节点情况
      if (node.fid == "root") {
        var imMax = true;
        for (let i = 0; i < raw.length; i++)
          if (raw[i].oid > node.oid) {
            imMax = false;
            raw.splice(i, 0, node);
            break;
          }
        if (imMax) raw.push(node);
        return;
      }
      // 非根节点情况
      for (let i = 0; i < raw.length; i++) {
        if (raw[i].id == node.fid) {
          if (raw[i].children) {
            if (raw[i].children.length == 0) raw[i].children.push(node);
            else {
              var imMax = true;
              for (let j = 0; j < raw[i].children.length; j++)
                if (raw[i].children[j].oid > node.oid) {
                  imMax = false;
                  raw[i].children.splice(j, 0, node);
                  break;
                }
              if (imMax) raw[i].children.push(node);
            }
          } else {
            this.$set(raw[i], "children", [node]);
          }
          raw[i].expand = true;
          return;
        }
        if (raw[i].children) {
          this.addNode(node, raw[i].children);
        }
      }
    },
    // 删除指定树节点
    delNode(id, raw) {
      for (let i = 0; i < raw.length; i++) {
        if (raw[i].id == id) {
          raw.splice(i, 1);
          return;
        }
        if (raw[i].children) {
          this.delNode(id, raw[i].children);
        }
      }
    },
    // 穿梭
    LToR() {
      var sels = this.$refs["tree"].getCheckedNodes();
      var has = false;
      for (let i = 0; i < sels.length; i++) {
        if (!sels[i].children) {
          has = true;
          // 右侧添加
          this.sels.push(sels[i]);
          // 左侧删除
          this.delNode(sels[i].id, this.treeData);
        }
      }
      if (!has) {
        this.$hMessage.warning("请从左侧树中选择数据！");
        return;
      }
      // 检查
      this.checkTree(this.treeData);
      // 抛出事件
      this.$emit("LToR", this.treeData, this.sels);
    },
    RToL() {
      var has = false;
      for (let i = 0; i < this.sels.length; i++) {
        if (this.sels[i].sel) {
          has = true;
          this.sels[i].sel = false;
          this.sels[i].checked = false;
          // 左侧添加
          this.addNode(this.sels[i], this.treeData);
          // 右侧删除
          this.sels.splice(i, 1);
          i--;
        }
      }
      if (!has) {
        this.$hMessage.warning("请从右侧列表中选择数据！");
        return;
      }
      // 检查
      this.checkTree(this.treeData);
      // 抛出事件
      this.$emit("RToL", this.treeData, this.sels);
    }
  }
};
</script>

<style lang="less">
.transfer-tree {
  display: inline-block;
  height: 100%;
  display: flex;
  border: 1px solid #ddd;
  overflow: hidden;
  // h-tree样式复写
  .h-tree-title-parent {
    font-weight: bold;
    color: #000;
  }
  .h-checkbox-wrapper-disabled + .h-tree-title {
    cursor: not-allowed;
    font-weight: bold;
    color: #ccc;
    &::before {
      content: "[空] ";
    }
  }
  .h-tree-title {
    cursor: text;
    user-select: text;
  }
  .h-tree-title-selected {
    background: none;
  }
  //


  .tip {
    color: #ccc;
    text-align: center;
    line-height: 4;
  }
  .left,
  .right {
    flex: 1;
    max-width: calc(50% - 27px);
    display: flex;
    flex-direction: column;
    // 标题
    .title {
      // text-align: center;
      border-bottom: 1px solid #eee;
      padding: 0 10px;
      line-height: 36px;
      font-size: 13px;
      font-weight: bold;
      .h-btn-group {
        float: right;
        margin-top: 6px;
        .h-btn span {
          font-weight: normal;
        }
      }
    }
    // 搜索框
    .search-ipt {
      padding: 6px 8px;
      background: #f5f5f5;
      // border-bottom: 1px solid #eee;
    }
  }
  .btns {
    flex-shrink: 0;
    border: 1px solid #eee;
    border-width: 0 1px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .h-tree,
  .sels {
    flex: 1;
    overflow: auto;
  }
  .h-tree {
    padding: 2px 10px;
  }
  .sels {
    .h-checkbox-wrapper {
      border-bottom: 1px solid #eee;
      margin: 0;
      display: block;
      padding: 6px 10px;
    }
  }
}
</style>