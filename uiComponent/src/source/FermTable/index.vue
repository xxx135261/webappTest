<template>
  <div class="ferm-table">
    <h-table
      :columns="columns"
      :data="tableData"
      :height="heightAuto?heightCal:height"
      border
      :disabled-hover="disabledHover"
      stripe
      :canDrag="isDrag"
      :showTitle="showTitle"
      :highlight-row="highlightRow"
      :row-class-name="rowClassName"
      @on-sort-change="sortChange"
      @on-row-click="rowClick"
      @on-current-change="currentChange"
      @on-selection-change="selectionChange"
      ref="table"
    >
      <slot name="header" slot="header"></slot>
    </h-table>
    <h-page
      v-if="pageType!='none'"
      size="small"
      :current="page"
      :total="totalNum"
      :page-size="pageSize"
      :page-size-opts="pageSizeOpts"
      @on-change="pageChange"
      @on-page-size-change="sizeChange"
      show-elevator
      show-total
      show-sizer
      placement="top"
    ></h-page>
    <div v-if="pageType!='none'" class="query-time" v-show="queryTime">查询时间 : {{queryTime}}</div>
    <ferm-loading v-show="isLoad"/>
  </div>
</template>

<script>
import "./dateFormatter";
import FermLoading from "../FermLoading";
import Vue from "vue";
import { Table, Page } from "h_ui";
Vue.component("hTable", Table);
Vue.component("hPage", Page);

export default {
  components: {
    FermLoading
  },
  props: {
    // 列配置
    columns: Array,
    // 资源请求
    dataReq: Function,
    // 是否不自动查询
    notauto: {
      type: Boolean,
      default: true
    },
    // 是否禁止hover
    disabledHover: {
      type: Boolean,
      default: false
    },
    // 能否选中行
    highlightRow: {
      type: Boolean,
      default: true
    },
    // 给某一行指定一个样式名称
    rowClassName: {
      type: Function,
      default: function (row, index) {
        if (row.rowClassName) return row.rowClassName;
      }
    },
    // 表格是否可拖动
    isDrag: {
      type: Boolean,
      default: false
    },
    // 是否显示title（只在开启ellipsis后有效）
    showTitle: {
      type: Boolean,
      default: false
    },
    // 其他查询条件
    query: {
      type: Object,
      default: () => { }
    },
    // 分页方式，默认是oracle，可选 mongo/none
    pageType: {
      type: String,
      default: "oracle"
    },
    // 高度
    height: {
      type: String,
      default: "auto"
    },
    // 高度自适应
    heightAuto: {
      type: Boolean,
      default: false
    },
    // 每页条数
    pSize: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      tableData: [],
      isLoad: true,
      // 分页参数
      page: 1,
      pageSize: this.pSize,
      pageSizeOpts: [10, 20, 50, 100],
      totalNum: 0,
      // 排序参数
      orderBy: "",
      // 查询时间
      queryTime: "",
      // 计算出来的高度
      heightCal: 0
    };
  },
  methods: {
    // 获取数据
    getData(cb) {
      var query = this.query ? this.query : {};

      this.isLoad = true;
      this.queryTime = new Date().Format("yyyy-MM-dd HH:mm:ss");

      // 查询参数
      var params = {
        pageNo: this.page,
        pageSize: this.pageSize,
        orderBy: this.orderBy,
        ...query
      };

      // 获取数据
      this.dataReq(params)
        .then(data => {
          this.isLoad = false;
          if (data.code == 200) {
            if (this.pageType) {
              this.totalNum = data.data.total;
              this.tableData = data.data.records;
            } else if (this.pageType == "none") {
              this.tableData = data.data;
            }
            if (cb) cb();
          }
        })
        .catch(err => {
          this.isLoad = false;
        });
    },
    // 切页
    pageChange(i) {
      this.page = i;
      this.getData();
    },
    // 改变每页个数
    sizeChange(value) {
      this.page = 1;
      this.pageSize = value;
      this.getData();
    },
    // 排序
    sortChange(column) {
      if (column.order == "asc" || column.order == "desc")
        this.orderBy = column.key + " " + column.order;
      else this.orderBy = "";
      this.getData();
    },
    // 数据导出
    outPut(config) {
      this.$refs["table"].exportCsv(config);
    },
    // 选中行事件
    rowClick(rowData, oldRow) {
      this.$emit("rowClick", rowData);
    },
    // 选中行事件
    currentChange(currentRow, oldRow) {
      this.$emit("currentChange", currentRow);
    },
    // 选中行事件
    selectionChange(selection) {
      this.$emit("selectionChange", selection);
    },
    //
    resize() {
      let pNode = this.$el.parentNode;
      this.heightCal =
        pNode.offsetHeight - 40 < 200 ? 200 : pNode.offsetHeight - 40;
    }
  },
  created() {
    // 处理默认排序
    for (var i in this.columns) {
      if (this.columns[i].needSort) {
        this.orderBy = this.columns[i].key + " " + this.columns[i].needSort;
        break;
      }
    }
    // 是否自动查询
    if (this.notauto) this.isLoad = false;
    else this.getData();
  },
  mounted() {
    if (!this.$route || !this.$route.meta.keepAlive) {
      this.resize();
      if (this.heightAuto) {
        window.addEventListener("resize", this.resize);
      }
    }
  },
  activated() {
    this.resize();
    if (this.heightAuto) {
      window.addEventListener("resize", this.resize);
    }
  },
  deactivated() {
    if (this.heightAuto) {
      window.removeEventListener("resize", this.resize);
    }
  },
  destroyed() {
    if (this.heightAuto) {
      window.removeEventListener("resize", this.resize);
    }
  }
};
</script>
<style lang="less">
.ferm-table {
  position: relative;
  // 表格无数据提示
  .h-table-tip {
    height: 300px;
    .h-table-tiptext {
      line-height: 300px;
      height: 300px;
    }
    table {
      display: none;
    }
  }
  // 单元格
  .h-table th {
    font-size: 13px;
    line-height: 38px;
  }
  .h-table th,
  .h-table td {
    height: 32px;
    &.sub {
      color: #aaa;
    }
  }
  // 分页
  .h-page {
    padding: 6px 15px;
    border: 1px solid #d7dde4;
    border-top-width: 0;
  }
  // 查询时间
  .query-time {
    color: #aaa;
    position: absolute;
    bottom: 10px;
    right: 15px;
    font-size: 12px;
  }
}
</style>