webpackJsonp([13],{1112:function(t,e,a){"use strict";function i(t){a(1164)}Object.defineProperty(e,"__esModule",{value:!0});var n=a(1166),l=a.n(n),s=a(1167),r=a(15),o=i,c=r(l.a,s.a,!1,o,"data-v-a49b6e8c",null);e.default=c.exports},1164:function(t,e,a){var i=a(1165);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a(1103)("1d1db32b",i,!0)},1165:function(t,e,a){e=t.exports=a(1102)(!1),e.push([t.i,".table-common[data-v-a49b6e8c]{width:100%}",""])},1166:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var i,n=a(231),l=t.common(),s=t.pasUtils();e.default={name:"recentVisit",data:function(){return{basicInfoGrid:null,loading:null,cellmenu:null}},computed:{basicInfo:function(){return i.$store.state.recentVisit.basicInfo}},created:function(){i=this},mounted:function(){this.loadData()},destroyed:function(){this.destroy(),t(".OG-cell-options").remove()},methods:{loadData:function(){this.destroy(),this.basicInfoFun("AgPrt~UserRecentVisited")},destroy:function(){this.basicInfoGrid&&this.basicInfoGrid.kill()},basicInfoFun:function(t){this.loading=!0,this.basicInfoGrid=og.views.analytics.griddata.loadGridData({name:og.api.rest.views.parame.recentVisit.basicInfo,requestParam:{portfolio:t},otherParam:{isDepgraph:!0,visibleArea:s.getVisibleArea(".empiriat")},metaHandle:function(t){i.$store.commit({type:"recentVisit/initBasicInfo",newVal:t}),i.basicInfo.splice(t.length-1,1)},dataHandle:this.handleBasicInfoData}),this.cellmenu=new com.hundsun.pas.common.gadgets.CellMenu('table[tabid="recentVisitTable"] tr td[cell]',this.basicInfoGrid)},handleBasicInfoData:function(e){if(t.isArray(e)){for(var a=e[1],n=e[2],l=1;l<n.length;l++){var s=n[l].cells,r={},o=n[l].data_row;r.name=a[l].cells[0].value,r.securityId=a[l].cells[0].securityId;for(var c=0;c<s.length;c++){var u=s[c].col_name,d=s[c];r[u]=d;var f=void 0,p=void 0,h=d&&d.h&&d.h.length?(f=d.h[d.h.length-1])<(p=d.h[d.h.length-2])?"down":f>p?"up":"smooth":null;r[u].state=h}var m=r["Price Fluctuation"].value,b=r["Price Fluctuation Range"].value;r["Price Fluctuation"].value=m&&b?m+"（"+b+"）":m+b,this.$set(this.basicInfo,o-1,r)}this.$nextTick(function(){i.cellmenu&&i.cellmenu.updateGrid()})}this.loading=!1},addVisit:function(e){var a=t(e.target),i=a.attr("itemScode"),n=a[0].innerHTML;i&&l.reqLastVisit(i,n,2,"recentVisit",this.$router)},deleteData:function(e){function a(t,e){for(var a=0;a<t.length;a++)e==t[a].securityId&&t.splice(a,1);return t}var i=t(e.target),n=i.attr("itemScode");if(!(n.indexOf("~")<0)){var l=n.split("~"),r=this;s.deleteSecurity(l,null,function(e){0==e.msg_no?setTimeout(function(){a(r.basicInfo,n),t.showNotice("移除成功！")},300):t.showNotice("移除失败！","danger")})}},cellClassName:function(t,e,a,i){if(i>0&&i<5){var l=t["Price Fluctuation"],s=void 0;return l&&(s=t["Price Fluctuation"].value),(0,n.priceColorFilter)(s)}}}}}).call(e,a(2))},1167:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"realTime recent"},[a("div",{staticClass:"empiriat",staticStyle:{position:"absolute",top:"5px",left:"5px",width:"calc(100% - 10px)",height:"calc(100% - 20px)"}},[a("pas-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.basicInfo,grid:t.basicInfoGrid,"dep-id":"recentVisitTable",sparkline:!0,width:"100%",height:"100%",colDrag:!1,resizable:!1,"cell-class-name":t.cellClassName}},[a("pas-table-column",{attrs:{dep:!1,prop:"name",align:"center",sparkline:!1,label:"证券名称"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticStyle:{cursor:"pointer"},attrs:{itemScode:e.row.data.securityId},on:{click:function(e){t.addVisit(e)}}},[t._v("\r\n                        "+t._s(e.row.data.name)+"\r\n                    ")])]}}])}),t._v(" "),a("pas-table-column",{attrs:{prop:"Latest Price",align:"right",label:"当前价"}}),t._v(" "),a("pas-table-column",{attrs:{prop:"Price Fluctuation",align:"right",label:"涨跌(幅)"}}),t._v(" "),a("pas-table-column",{attrs:{prop:"Trade Volume",align:"right",label:"交易量(万手)"}}),t._v(" "),a("pas-table-column",{attrs:{prop:"Trade Amount",align:"right",label:"成交额"}}),t._v(" "),a("pas-table-column",{attrs:{dep:!1,align:"center",sparkline:!1,label:"移除"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("i",{staticClass:"fa fa-times",staticStyle:{"font-size":"16px",cursor:"pointer",color:"#666"},attrs:{itemScode:e.row.data.securityId},on:{click:function(e){t.deleteData(e)}}})]}}])})],1)],1)])},n=[],l={render:i,staticRenderFns:n};e.a=l}});