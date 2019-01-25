<template>
  <div class="main-page" style="height:100%">
    <transferTree
      ref="transferTree"
      :tree="tree"
      :list="list"
      titleL="指标树"
      titleR="已选指标"
      @LToR="LToR"
      @RToL="RToL"
    />
  </div>
</template>

<script>
import transferTree from "../../source/TransferTree/";

export default {
  components: { transferTree },
  data() {
    return {
      // 左侧树数据
      tree: [],
      // 右侧列表数据
      list: []
    };
  },
  methods: {
    LToR(lData, rData) {
      console.log("LToR");
      console.log(lData, rData);
    },
    RToL(lData, rData) {
      console.log("RToL");
      console.log(lData, rData);
    }
  },
  created() {
    // setTimeout(() => {
    this.tree = [
      {
        title: "财务报表",
        id: "cwbb",
        oid: 10,
        expand: true,
        children: [
          {
            title: "一般企业财务报表",
            id: "ybqycwbb",
            oid: 10,
            children: [
              {
                title: "子节点ybqycwbbC1",
                id: "ybqycwbbC1",
                oid: 10
              },
              {
                title: "子节点ybqycwbbC2",
                id: "ybqycwbbC2",
                oid: 20
              },
              {
                title: "子节点ybqycwbbC3",
                id: "ybqycwbbC3",
                oid: 30
              },
              {
                title: "子节点ybqycwbbC4",
                id: "ybqycwbbC4",
                oid: 40,
                children: [
                  {
                    title: "子节点ybqycwbbC4C1",
                    id: "ybqycwbbC4C1",
                    oid: 10,
                    children: [
                      {
                        title: "子节点ybqycwbbC4C1C1",
                        id: "ybqycwbbC4C1C1",
                        oid: 10
                      }
                    ]
                  },
                  {
                    title: "子节点ybqycwbbC4C2",
                    id: "ybqycwbbC4C2",
                    oid: 20,
                    children: [
                      {
                        title: "子节点ybqycwbbC4C2C1",
                        id: "ybqycwbbC4C2C1",
                        oid: 10
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            title: "银行财务报表",
            id: "yhcwbb",
            oid: 20,
            children: [
              {
                title: "子节点yhcwbbC1",
                id: "yhcwbbC1",
                oid: 10
              }
            ]
          },
          {
            title: "证券公司财务报表",
            id: "zqgscwbb",
            oid: 30,
            children: [
              {
                title: "子节点zqgscwbbC1",
                id: "zqgscwbbC1",
                oid: 10
              }
            ]
          },
          {
            title: "保险公司财务报表",
            id: "bxgscwbb",
            oid: 40,
            children: [
              {
                title: "子节点bxgscwbbC1",
                id: "bxgscwbbC1",
                oid: 10
              }
            ]
          },
          {
            title: "信托公司财务报表",
            id: "xtgscwbb",
            oid: 50,
            children: [
              {
                title: "子节点xtgscwbbC1",
                id: "xtgscwbbC1",
                oid: 10
              }
            ]
          }
        ]
      },
      {
        title: "财务指标",
        id: "cwzb",
        oid: 20,
        expand: true,
        children: [
          {
            title: "每股指标",
            id: "mgzb",
            oid: 10,
            children: [
              {
                title: "子节点mgzbC1",
                id: "mgzbC1",
                oid: 10
              }
            ]
          },
          {
            title: "盈利能力指标",
            id: "ylnlzb",
            oid: 20,
            children: []
          }
        ]
      }
    ];
    this.list = [
      {
        id: "ybqycwbbC5",
        title: "子节点ybqycwbbC5",
        oid: 50
      }
    ];
    this.$nextTick(() => {
      this.$refs["transferTree"].init();
    });
    // }, 3000);
  }
};
</script>