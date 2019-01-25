<template>
  <div class="main-page">
    <fermColset :columns="columns" placement="bottom-start"/>
    <br>
    <br>
    <h-table :columns="columns" :data="data"></h-table>
  </div>
</template>

<script>
import fermColset from "../../source/FermColset/";

import Vue from "vue";
import { Table } from "h_ui";
Vue.component("hTable", Table);

export default {
  components: { fermColset },
  data() {
    return {
      columns: [
        {
          title: "姓名",
          key: "name",
          hiddenCol: false
        },
        {
          title: "年龄",
          key: "age",
          hiddenCol: false
        },
        {
          title: "地址",
          key: "address",
          hiddenCol: false
        }
      ],
      data: [
        {
          name: "王小明",
          age: 18,
          address: "北京市朝阳区芍药居"
        },
        {
          name: "张小刚",
          age: 25,
          address: "北京市海淀区西二旗"
        },
        {
          name: "李小红",
          age: 30,
          address: "上海市浦东新区世纪大道"
        },
        {
          name: "周小伟",
          age: 26,
          address: "深圳市南山区深南大道"
        }
      ]
    };
  }
};
</script>