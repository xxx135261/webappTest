<template>
  <h-poptip class="r" :placement="placement">
    <h-button type="ghost" icon="manage">显示列设置</h-button>
    <div class="api" slot="content">
      <div v-for="item in columns" :key="item.key" style="line-height:2">
        <h-checkbox
          :value="!item.hiddenCol"
          :label="item.title"
          @on-change="item.hiddenCol=!item.hiddenCol"
        >&nbsp;{{item.title}}</h-checkbox>
      </div>
    </div>
  </h-poptip>
</template>

<script>
import Vue from "vue";
import { Poptip, Button, Checkbox } from "h_ui";
Vue.component("hPoptip", Poptip);
Vue.component("hButton", Button);
Vue.component("hCheckbox", Checkbox);

export default {
  props: {
    columns: Array,
    placement: {
      type: String,
      default: "bottom-end"
    }
  }
};
</script>