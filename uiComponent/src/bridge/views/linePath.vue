<template>
  <div class="main-page">
    <linePath2 :d="data" @on-click="handleClick"/>
    <br>
    <linePath type="t1" :d="data" @on-click="handleClick"/>
    <br>
    <div style="display:inline-block;border:1px solid #eee;">
      <linePath type="t2" :d="data" @on-click="handleClick"/>
    </div>
  </div>
</template>

<script>
import linePath from "../../source/LinePath/";
import linePath2 from "../../source/LinePath2/";

export default {
  components: { linePath, linePath2 },
  data() {
    return {
      data: [
        {
          d: "10-10",
          n: "广西有色不能偿付"
        },
        {
          d: "10-11",
          n: "宏达矿业兑付不确定"
        },
        {
          d: "10-21",
          n: "雨润债兑付违约"
        },
        {
          d: "10-23",
          n: "东特钢违约"
        },
        {
          d: "10-27",
          n: "中铁物资存在兑付风险"
        },
        {
          d: "10-30",
          n: "天津银行票据风险"
        },
        {
          d: "10-12",
          n: "上海交易所"
        },
        {
          d: "10-14",
          n: "中国上海趋势"
        },
         {
          d: "10-14",
          n: "上海交易所"
        },
        {
          d: "10-16",
          n: "中国上海趋势"
        },
      ]
    };
  },
  methods: {
    handleClick(index) {
      alert(index);
    }
  }
};
</script>