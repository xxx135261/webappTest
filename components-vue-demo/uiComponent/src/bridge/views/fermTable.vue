<template>
  <div class="main-page" style="height:100%">
    <div style="height:100%">
      <fermTable
        :dataReq="dataReq2"
        :query="query"
        :columns="columns"
        :notauto="false"
        :heightAuto="true"
        :pSize="50"
        :isDrag="true"
        :showTitle="true"
      />
    </div>
  </div>
</template>

<script>
import fermTable from "../../source/FermTable/";

export default {
  components: { fermTable },
  data() {
    return {
      query: {
        tt: 123
      },
      columns: [
        {
          type: "index",
          width: 50,
          align: "center",
          className: "sub"
        },
        {
          title: "对象名",
          key: "objectName",
          ellipsis: true,
        },
        {
          title: "属主",
          key: "owner",
          width: 150,
          align: "center",
        },
        {
          title: "对象类型",
          key: "objectType",
          width: 150,
          align: "center",
        },
        {
          title: "创建时间",
          key: "created",
          width: 200,
          align: "center",
          sortable: "custom"
        },
        {
          title: "最后更新时间",
          key: "lastDdlTime",
          width: 200,
          align: "center"
        }
      ],
      // 表格数据请求方法
      // dataReq: params => fetch.get("/test", { params: params }),
      // 模拟数据
      dataReq2: async params => {
        // console.log(params);
        return {
          code: 200,
          data: {
            records: [
              {
                created: "2017-04-13 11:07:18",
                lastDdlTime: "2018-05-14 09:53:26",
                objectName: "F_CREATE_MSG_INFO_CLOB",
                objectType: "FUNCTION",
                owner: "HSCON",
                rowClassName: "row-class-name-demo"
              },
              {
                created: "2016-12-13 14:10:58",
                lastDdlTime: "2018-04-12 10:19:28",
                objectName: "F_GET_EMP_NAME",
                objectType: "FUNCTION",
                owner: "HSCON"
              },
              {
                created: "2017-01-06 17:48:18",
                lastDdlTime: "2018-04-12 14:51:30",
                objectName: "GETXXX",
                objectType: "PROCEDURE",
                owner: "HSCON"
              },
              {
                created: "2017-07-26 13:17:28",
                lastDdlTime: "2018-04-12 14:51:30",
                objectName: "INSERT_UPDATE_RECORD",
                objectType: "FUNCTION",
                owner: "HSCON"
              },
              {
                created: "2017-10-20 12:53:32",
                lastDdlTime: "2018-04-12 14:49:48",
                objectName: "JBPM4_TASKS_VIEW_",
                objectType: "VIEW",
                owner: "HSCON"
              },
              {
                created: "2017-04-13 11:07:19",
                lastDdlTime: "2018-04-12 14:19:50",
                objectName: "P_ETL_CREATEJOBSQL",
                objectType: "PROCEDURE",
                owner: "HSCON"
              },
              {
                created: "2017-04-13 11:07:19",
                lastDdlTime: "2018-04-12 14:19:51",
                objectName: "P_ETL_CREATESQL",
                objectType: "PROCEDURE",
                owner: "HSCON"
              },
              {
                created: "2017-04-13 11:07:19",
                lastDdlTime: "2018-04-12 10:19:26",
                objectName: "P_ETL_CREATETRIGGERSQL",
                objectType: "PROCEDURE",
                owner: "HSCON"
              },
              {
                created: "2017-04-14 10:27:41",
                lastDdlTime: "2018-04-12 14:51:30",
                objectName: "P_EXEC_LCR_INTEREST_REPAY",
                objectType: "PROCEDURE",
                owner: "HSCON"
              },
              {
                created: "2017-04-14 10:27:41",
                lastDdlTime: "2018-04-12 14:51:30",
                objectName: "P_GET_LCR_FINANCING_CREDITRPT",
                objectType: "PROCEDURE",
                owner: "HSCON"
              },
              {
                created: "2017-04-13 11:07:18",
                lastDdlTime: "2018-05-14 09:53:26",
                objectName: "F_CREATE_MSG_INFO_CLOB",
                objectType: "FUNCTION",
                owner: "HSCON"
              },
              {
                created: "2016-12-13 14:10:58",
                lastDdlTime: "2018-04-12 10:19:28",
                objectName: "F_GET_EMP_NAME",
                objectType: "FUNCTION",
                owner: "HSCON"
              },
              {
                created: "2017-01-06 17:48:18",
                lastDdlTime: "2018-04-12 14:51:30",
                objectName: "GETXXX",
                objectType: "PROCEDURE",
                owner: "HSCON"
              },
              {
                created: "2017-07-26 13:17:28",
                lastDdlTime: "2018-04-12 14:51:30",
                objectName: "INSERT_UPDATE_RECORD",
                objectType: "FUNCTION",
                owner: "HSCON"
              },
              {
                created: "2017-10-20 12:53:32",
                lastDdlTime: "2018-04-12 14:49:48",
                objectName: "JBPM4_TASKS_VIEW_",
                objectType: "VIEW",
                owner: "HSCON"
              },
              {
                created: "2017-04-13 11:07:19",
                lastDdlTime: "2018-04-12 14:19:50",
                objectName: "P_ETL_CREATEJOBSQL",
                objectType: "PROCEDURE",
                owner: "HSCON"
              },
              {
                created: "2017-04-13 11:07:19",
                lastDdlTime: "2018-04-12 14:19:51",
                objectName: "P_ETL_CREATESQL",
                objectType: "PROCEDURE",
                owner: "HSCON"
              },
              {
                created: "2017-04-13 11:07:19",
                lastDdlTime: "2018-04-12 10:19:26",
                objectName: "P_ETL_CREATETRIGGERSQL",
                objectType: "PROCEDURE",
                owner: "HSCON"
              },
              {
                created: "2017-04-14 10:27:41",
                lastDdlTime: "2018-04-12 14:51:30",
                objectName: "P_EXEC_LCR_INTEREST_REPAY",
                objectType: "PROCEDURE",
                owner: "HSCON"
              },
              {
                created: "2017-04-14 10:27:41",
                lastDdlTime: "2018-04-12 14:51:30",
                objectName: "P_GET_LCR_FINANCING_CREDITRPT",
                objectType: "PROCEDURE",
                owner: "HSCON"
              },
              {
                created: "2017-04-13 11:07:18",
                lastDdlTime: "2018-05-14 09:53:26",
                objectName: "F_CREATE_MSG_INFO_CLOB",
                objectType: "FUNCTION",
                owner: "HSCON"
              },
              {
                created: "2016-12-13 14:10:58",
                lastDdlTime: "2018-04-12 10:19:28",
                objectName: "F_GET_EMP_NAME",
                objectType: "FUNCTION",
                owner: "HSCON"
              },
              {
                created: "2017-01-06 17:48:18",
                lastDdlTime: "2018-04-12 14:51:30",
                objectName: "GETXXX",
                objectType: "PROCEDURE",
                owner: "HSCON"
              },
              {
                created: "2017-07-26 13:17:28",
                lastDdlTime: "2018-04-12 14:51:30",
                objectName: "INSERT_UPDATE_RECORD",
                objectType: "FUNCTION",
                owner: "HSCON"
              },
              {
                created: "2017-10-20 12:53:32",
                lastDdlTime: "2018-04-12 14:49:48",
                objectName: "JBPM4_TASKS_VIEW_",
                objectType: "VIEW",
                owner: "HSCON"
              },
              {
                created: "2017-04-13 11:07:19",
                lastDdlTime: "2018-04-12 14:19:50",
                objectName: "P_ETL_CREATEJOBSQL",
                objectType: "PROCEDURE",
                owner: "HSCON"
              },
              {
                created: "2017-04-13 11:07:19",
                lastDdlTime: "2018-04-12 14:19:51",
                objectName: "P_ETL_CREATESQL",
                objectType: "PROCEDURE",
                owner: "HSCON"
              },
              {
                created: "2017-04-13 11:07:19",
                lastDdlTime: "2018-04-12 10:19:26",
                objectName: "P_ETL_CREATETRIGGERSQL",
                objectType: "PROCEDURE",
                owner: "HSCON"
              },
              {
                created: "2017-04-14 10:27:41",
                lastDdlTime: "2018-04-12 14:51:30",
                objectName: "P_EXEC_LCR_INTEREST_REPAY",
                objectType: "PROCEDURE",
                owner: "HSCON"
              },
              {
                created: "2017-04-14 10:27:41",
                lastDdlTime: "2018-04-12 14:51:30",
                objectName: "P_GET_LCR_FINANCING_CREDITRPT",
                objectType: "PROCEDURE",
                owner: "HSCON"
              },
              {
                created: "2017-04-13 11:07:18",
                lastDdlTime: "2018-05-14 09:53:26",
                objectName: "F_CREATE_MSG_INFO_CLOB",
                objectType: "FUNCTION",
                owner: "HSCON"
              },
              {
                created: "2016-12-13 14:10:58",
                lastDdlTime: "2018-04-12 10:19:28",
                objectName: "F_GET_EMP_NAME",
                objectType: "FUNCTION",
                owner: "HSCON"
              },
              {
                created: "2017-01-06 17:48:18",
                lastDdlTime: "2018-04-12 14:51:30",
                objectName: "GETXXX",
                objectType: "PROCEDURE",
                owner: "HSCON"
              },
              {
                created: "2017-07-26 13:17:28",
                lastDdlTime: "2018-04-12 14:51:30",
                objectName: "INSERT_UPDATE_RECORD",
                objectType: "FUNCTION",
                owner: "HSCON"
              },
              {
                created: "2017-10-20 12:53:32",
                lastDdlTime: "2018-04-12 14:49:48",
                objectName: "JBPM4_TASKS_VIEW_",
                objectType: "VIEW",
                owner: "HSCON"
              },
              {
                created: "2017-04-13 11:07:19",
                lastDdlTime: "2018-04-12 14:19:50",
                objectName: "P_ETL_CREATEJOBSQL",
                objectType: "PROCEDURE",
                owner: "HSCON"
              },
              {
                created: "2017-04-13 11:07:19",
                lastDdlTime: "2018-04-12 14:19:51",
                objectName: "P_ETL_CREATESQL",
                objectType: "PROCEDURE",
                owner: "HSCON"
              },
              {
                created: "2017-04-13 11:07:19",
                lastDdlTime: "2018-04-12 10:19:26",
                objectName: "P_ETL_CREATETRIGGERSQL",
                objectType: "PROCEDURE",
                owner: "HSCON"
              },
              {
                created: "2017-04-14 10:27:41",
                lastDdlTime: "2018-04-12 14:51:30",
                objectName: "P_EXEC_LCR_INTEREST_REPAY",
                objectType: "PROCEDURE",
                owner: "HSCON"
              },
              {
                created: "2017-04-14 10:27:41",
                lastDdlTime: "2018-04-12 14:51:30",
                objectName: "P_GET_LCR_FINANCING_CREDITRPT",
                objectType: "PROCEDURE",
                owner: "HSCON"
              },
              {
                created: "2017-04-13 11:07:18",
                lastDdlTime: "2018-05-14 09:53:26",
                objectName: "F_CREATE_MSG_INFO_CLOB",
                objectType: "FUNCTION",
                owner: "HSCON"
              },
              {
                created: "2016-12-13 14:10:58",
                lastDdlTime: "2018-04-12 10:19:28",
                objectName: "F_GET_EMP_NAME",
                objectType: "FUNCTION",
                owner: "HSCON"
              },
              {
                created: "2017-01-06 17:48:18",
                lastDdlTime: "2018-04-12 14:51:30",
                objectName: "GETXXX",
                objectType: "PROCEDURE",
                owner: "HSCON"
              },
              {
                created: "2017-07-26 13:17:28",
                lastDdlTime: "2018-04-12 14:51:30",
                objectName: "INSERT_UPDATE_RECORD",
                objectType: "FUNCTION",
                owner: "HSCON"
              },
              {
                created: "2017-10-20 12:53:32",
                lastDdlTime: "2018-04-12 14:49:48",
                objectName: "JBPM4_TASKS_VIEW_",
                objectType: "VIEW",
                owner: "HSCON"
              },
              {
                created: "2017-04-13 11:07:19",
                lastDdlTime: "2018-04-12 14:19:50",
                objectName: "P_ETL_CREATEJOBSQL",
                objectType: "PROCEDURE",
                owner: "HSCON"
              },
              {
                created: "2017-04-13 11:07:19",
                lastDdlTime: "2018-04-12 14:19:51",
                objectName: "P_ETL_CREATESQL",
                objectType: "PROCEDURE",
                owner: "HSCON"
              },
              {
                created: "2017-04-13 11:07:19",
                lastDdlTime: "2018-04-12 10:19:26",
                objectName: "P_ETL_CREATETRIGGERSQL",
                objectType: "PROCEDURE",
                owner: "HSCON"
              },
              {
                created: "2017-04-14 10:27:41",
                lastDdlTime: "2018-04-12 14:51:30",
                objectName: "P_EXEC_LCR_INTEREST_REPAY",
                objectType: "PROCEDURE",
                owner: "HSCON"
              },
              {
                created: "2017-04-14 10:27:41",
                lastDdlTime: "2018-04-12 14:51:30",
                objectName: "P_GET_LCR_FINANCING_CREDITRPT",
                objectType: "PROCEDURE",
                owner: "HSCON"
              }
            ],
            total: 113
          }
        };
      }
    };
  }
};
</script>