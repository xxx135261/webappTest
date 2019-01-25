<template>
  <div style="margin:15px;height:400px;overflow:auto;outline:1px solid #ddd;">
    <bigDataTree :treeData="treeData" @nodeClick="test"/>
  </div>
</template>

<script>
import bigDataTree from "../../source/BigDataTree/";
export default {
  components: { bigDataTree },
  data() {
    return {
      treeData: []
    };
  },
  methods: {
    m() {
      let test = [];
      for (var i = 0; i < 10000; i++) {
        test.push({
          title: "子节点" + i,
          oid: i
        });
      }
      return test;
    },
    test(item) {
      alert(JSON.stringify(item, null, 2));
    }
  },
  created() {
    let raw = [
      {
        title: "财务报表",
        expand: true,
        children: [
          {
            title: "财务报表-子节点1",
            children: this.m()
          },
          {
            title: "财务报表-子节点2",
            children: this.m()
          },
          {
            title: "财务报表-子节点3",
            children: [
              {
                title: "子节点1",
                children: [
                  {
                    title: "子节点1"
                  },
                  {
                    title: "子节点2",
                    children: [
                      {
                        title: "子节点1",
                        children: this.m()
                      },
                      {
                        title: "子节点2"
                      }
                    ]
                  }
                ]
              },
              {
                title: "子节点2"
              }
            ]
          },
          {
            title: "财务报表-子节点4"
          }
        ]
      },
      {
        title: "财务指标",
        expand: true,
        children: [
          {
            title: "财务指标-子节点",
            id: "ybqycwbb",
            children: this.m()
          }
        ]
      }
    ];
    this.treeData = raw;
  }
};
</script>