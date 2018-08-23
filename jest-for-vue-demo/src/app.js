import Vue from 'vue'
import App from './template/App'
import store from './js/store'
// 引入echarts
import * as echarts from "echarts";
Vue.prototype.$echarts = echarts;

new Vue({
    el: "#app",
    store,
    render: h => h(App)
})