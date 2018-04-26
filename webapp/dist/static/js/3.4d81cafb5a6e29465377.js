webpackJsonp([3],{1107:function(t,a,e){"use strict";function i(t){e(1137)}Object.defineProperty(a,"__esModule",{value:!0});var s=e(1140),l=e.n(s),n=e(1142),r=e(15),o=i,d=r(l.a,n.a,!1,o,"data-v-690b443b",null);a.default=d.exports},1137:function(t,a,e){var i=e(1138);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e(1103)("725896f6",i,!0)},1138:function(t,a,e){a=t.exports=e(1102)(!1),a.i(e(1139),""),a.push([t.i,".modal .table-common[data-v-690b443b]{width:100%}",""])},1139:function(t,a,e){a=t.exports=e(1102)(!1),a.push([t.i,".every-line-table .bgcolor{font-weight:700}.silo-times{padding:25px 12px;color:#666}.table-common.silo_w tr td{text-align:center;border:none;padding:6px;background:#fff}.table-common.silo_w tr td b{display:block;margin-bottom:4px;color:#666}.tf-deal{width:100%;float:left;margin-bottom:10px}.tf-deal .every-line-table{border-top:none}.tf-deal .details-but{float:right;margin:-5px 10px -4px 0}.tab-tfd{width:100%;text-align:center}.tab-tfd td{border:1px solid #ddd;text-align:right}.cl_fre_name{color:#000;cursor:pointer}.cl_fre_name:hover{color:#b60606;cursor:pointer}.twoselect{margin-bottom:5px}.silo .pas-table-dropdown .dropdown-area{height:auto}",""])},1140:function(module,exports,__webpack_require__){"use strict";(function($){function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(exports,"__esModule",{value:!0});var _extends2=__webpack_require__(1141),_extends3=_interopRequireDefault(_extends2),_vuex=__webpack_require__(229),moduleName="siloAnalysis",siloInfo,dailyExchangeRate,awkwardnessBuy,awkwardnessSell,heavyIndustryYield,heavyIndustryLoss,utils=$.pasUtils(),common=$.common(),numberUtils=$.numberUtils(),_self;exports.default={name:"siloAnalysis",data:function(){return{fivedealInfoGrid:null,adjustedInfoGrid:null,date:"",loading1:null,loading2:null,loading3:null,loading4:null,loading5:null,loading6:null}},computed:(0,_extends3.default)({},(0,_vuex.mapState)(moduleName,{awkwardness:function(t){return t.awkwardness},heavyIndustry:function(t){return t.heavyIndustry},fivedealInfo:function(t){return t.fivedealInfo},adjustedInfo:function(t){return t.adjustedInfo},siloInfo:function(t){return t.siloInfo},dailyExchangeRate:function(t){return t.dailyExchangeRate}})),created:function(){_self=this},mounted:function(){this.loadData(),this.bindListenerOnModal(".fivedrag",this.btnfiveClick,null,this),this.bindListenerOnModal(".silodrag",this.btnadjClick,null,this)},destroyed:function(){this.destroy(),$(".OG-cell-options").remove()},methods:{siloInfoFun:function(t,a){this.loading5=!0,siloInfo=og.views.analytics.griddata.loadGridData({name:og.api.rest.views.parame.siloAnalysis.siloInfo,requestParam:{portfolio:t,calcTimeParam:a},otherParam:{visibleArea:utils.getVisibleArea(".silo_w")},metaHandle:null,dataHandle:this.handleSiloInfoData})},handleSiloInfoData:function handleSiloInfoData(result){for(var result_s=eval(result),scroll=result_s[0].scroll,i=0;i<scroll.length;i++){var col=scroll[i];this.siloInfo[col.col_name]=col.value}this.loading5=!1},dailyExchangeRateFun:function(t,a){this.loading6=!0,dailyExchangeRate=og.views.analytics.griddata.loadGridData({name:og.api.rest.views.parame.siloAnalysis.dailyExchangeRate,requestParam:{portfolio:t,calcTimeParam:a},otherParam:{visibleArea:utils.getDefaultVisibleArea()},metaHandle:null,dataHandle:this.handledailyExchangeRateData})},handledailyExchangeRateData:function handledailyExchangeRateData(result){var result_s=eval(result),obj=result_s[0].scroll[0];"Daily Exchange Rate"==obj.col_name&&0==parseFloat(obj.value)?(this.dailyExchangeRate.value=obj.value,this.dailyExchangeRate.transValue="999+"):(this.dailyExchangeRate.value=obj.value,this.dailyExchangeRate.transValue=Math.ceil(1/(parseFloat(obj.value)/100))),this.loading6=!1},awkwardnessBuyFun:function(t,a){awkwardnessBuy=og.views.analytics.griddata.loadGridData({name:og.api.rest.views.parame.siloAnalysis.awkwardnessBuy,requestParam:{portfolio:t,calcTimeParam:a},otherParam:{visibleArea:utils.getVisibleArea(".silo_table"),isDepgraph:!0},metaHandle:null,dataHandle:this.handleAwkwardnessData})},awkwardnessSellFun:function(t,a){awkwardnessSell=og.views.analytics.griddata.loadGridData({name:og.api.rest.views.parame.siloAnalysis.awkwardnessSell,requestParam:{portfolio:t,calcTimeParam:a},otherParam:{visibleArea:utils.getVisibleArea(".silo_table"),isDepgraph:!0},metaHandle:null,dataHandle:this.handleAwkwardnessData})},handleAwkwardnessData:function(t){if($.isArray(t)){for(var a=t[0],e=t[1],i=t[2],s=1;s<i.length;s++){var l=i[s].cells,n=e[s].cells[0],r=this.awkwardness[s-1]||{};$.inArray("Buy Volume",a)>=0?(r.name=n.value,r.securityId=n.securityId):(r.name_sell=n.value,r.securityId_sell=n.securityId);for(var o=0;o<l.length;o++)r[l[o].col_name]=l[o];this.$set(this.awkwardness,s-1,r)}this.loading1=!1}$.inArray("Buy Volume",a)>=0?new com.hundsun.pas.common.gadgets.CellMenu('table[tabid="pre_buy"] tr td[cell].buy_td',awkwardnessBuy):new com.hundsun.pas.common.gadgets.CellMenu('table[tabid="pre_buy"] tr td[cell].sell_td',awkwardnessSell)},heavyIndustryYieldFun:function(t,a){heavyIndustryYield=og.views.analytics.griddata.loadGridData({name:og.api.rest.views.parame.siloAnalysis.heavyIndustryYield,requestParam:{portfolio:t,calcTimeParam:a},otherParam:{visibleArea:utils.getVisibleArea(".silo_table"),isDepgraph:!0},metaHandle:null,dataHandle:this.handleHeavyIndustryData})},heavyIndustryLossFun:function(t,a){heavyIndustryLoss=og.views.analytics.griddata.loadGridData({name:og.api.rest.views.parame.siloAnalysis.heavyIndustryLoss,requestParam:{portfolio:t,calcTimeParam:a},otherParam:{visibleArea:utils.getVisibleArea(".silo_table"),isDepgraph:!0},metaHandle:null,dataHandle:this.handleHeavyIndustryData})},handleHeavyIndustryData:function(t){if($.isArray(t)){for(var a,e=t[1],i=t[2],s=0;s<i.length;s++){for(var l=i[s].cells,n=l.length-1;n>=0;n--)if("Trade PnL"===l[n].col_name){var r=l[n].value;numberUtils.validateNumber(null,r)&&(a=numberUtils.convertNumber(r,",")>0);break}if(void 0!=a||null!=a)break}for(var o=1;o<i.length;o++){var d=i[o].cells,c=e[o].cells[0],u=this.heavyIndustry[o-1]||{};if(a){u.name=c.value,u.securityId=c.securityId;for(var v=0;v<d.length;v++)u[d[v].col_name]=d[v]}else{u.name_loss=c.value,u.securityId_loss=c.securityId;for(var v=0;v<d.length;v++)u[d[v].col_name+"_loss"]=d[v]}this.$set(this.heavyIndustry,o-1,u)}}this.loading2=!1,a?new com.hundsun.pas.common.gadgets.CellMenu('table[tabid="adjust_table"] tr td[cell].profit_td',heavyIndustryYield):new com.hundsun.pas.common.gadgets.CellMenu('table[tabid="adjust_table"] tr td[cell].loss_td',heavyIndustryLoss)},fivedealInfoFun:function(t,a){this.loading3=!0,this.fivedealInfoGrid=og.views.analytics.griddata.loadGridData({name:og.api.rest.views.parame.siloAnalysis.fivedealInfo,requestParam:{portfolio:t,calcTimeParam:a},otherParam:{visibleArea:utils.getVisibleArea(".fivedrag .detail_table"),isDepgraph:!0},metaHandle:function(t){_self.$store.commit({type:moduleName+"/setFivedealInfo",newVal:t})},dataHandle:this.handleFivedealInfoData})},handleFivedealInfoData:function(t){if($.isArray(t))for(var a=t[1],e=t[2],i=0;i<e.length;i++){var s=e[i].cells,l=a[i].cells[0],n={};n.name=l.dataRow+l.value,n.securityId=l.securityId;for(var r=0;r<s.length;r++)n[s[r].col_name]=s[r];this.$set(this.fivedealInfo,e[i].data_row,n)}this.loading3=!1,this.$nextTick(function(){new com.hundsun.pas.common.gadgets.CellMenu('table[tabid="detail_buy"] tr td[cell]',_self.fivedealInfoGrid)})},adjustedInfoFun:function(t,a){this.loading4=!0,this.adjustedInfoGrid=og.views.analytics.griddata.loadGridData({name:og.api.rest.views.parame.siloAnalysis.adjustedInfo,requestParam:{portfolio:t,calcTimeParam:a},otherParam:{visibleArea:utils.getVisibleArea(".silodrag .detail_table"),isDepgraph:!0},metaHandle:function(t){_self.$store.commit({type:moduleName+"/setAdjustedInfo",newVal:t})},dataHandle:this.handleAdjustedInfoData})},handleAdjustedInfoData:function(t){if($.isArray(t)){for(var a=t[1],e=t[2],i=0;i<e.length;i++){var s=e[i].cells,l=a[i].cells[0],n={};n.name=l.dataRow+l.value,n.securityId=l.securityId;for(var r=0;r<s.length;r++)n[s[r].col_name]=s[r];this.$set(this.adjustedInfo,e[i].data_row,n)}this.loading4=!1,this.$nextTick(function(){new com.hundsun.pas.common.gadgets.CellMenu('table[tabid="detail_silo"] tr td[cell]',_self.adjustedInfoGrid)})}},bindListenerOnModal:function(t,a,e,i){t&&($(t).on("shown.bs.modal",function(){a&&$.isFunction(a)&&a.call(i)}),$(t).on("hide.bs.modal",function(){$(".OG-cell-options").hide(),e&&$.isFunction(e)&&e.call(i)}))},btnfiveClick:function(){this.$store.commit(moduleName+"/initFivedealInfo");var t=$(".fivedrag ul>li.sel").val()+"",a=this.$store.state.selectGroup.id;this.fivedealInfoFun(a,t||"0"),$(".OG-cell-options").hide()},btnadjClick:function(){this.$store.commit(moduleName+"/initAdjustedInfo");var t=$(".silodrag ul>li.sel").val()+"",a=this.$store.state.selectGroup.id;this.adjustedInfoFun(a,t||"0"),$(".OG-cell-options").hide()},addFiveVisit:function addFiveVisit(event){var $target=$(event.target),_$start=$target.attr("data-row"),_$end=$target.attr("data-splice");if(_$start&&_$end){this.fivedealInfoGrid.busy(!0);for(var _$$start=parseInt(_$start),_$$end=parseInt(_$end),empty=[],$itemSplice="this.fivedealInfo.splice(_$$start+1,_$$end-_$$start",i=0;i<_$$end-_$$start;i++)$itemSplice=$itemSplice.concat(",empty");return $itemSplice+=")",eval("("+$itemSplice+")"),void(this.fivedealInfoGrid.resize(_$start)&&this.fivedealInfoGrid.busy(!1))}if(/data-row/g.test($target.html())){$target=$($target.html().replace(/&nbsp;/g,"")),_$start=$target.attr("data-row"),_$end=$target.attr("data-splice"),this.fivedealInfoGrid.busy(!0);for(var _$$start=parseInt(_$start),_$$end=parseInt(_$end),empty=[],$itemSplice="this.fivedealInfo.splice(_$$start+1,_$$end-_$$start",i=0;i<_$$end-_$$start;i++)$itemSplice=$itemSplice.concat(",empty");return $itemSplice+=")",eval("("+$itemSplice+")"),void(this.fivedealInfoGrid.resize(_$start)&&this.fivedealInfoGrid.busy(!1))}var sCode=$target.attr("securityid"),sName=$target.html().replace(/&nbsp;/g,"");sCode&&($(".fivedrag").modal("hide"),common.reqLastVisit(sCode,sName,2,"recent",this.$router))},addVisit:function addVisit(event){var $target=$(event.target),_$start=$target.attr("data-row"),_$end=$target.attr("data-splice");if(_$start&&_$end){this.adjustedInfoGrid.busy(!0);for(var _$$start=parseInt(_$start),_$$end=parseInt(_$end),empty=[],$itemSplice="this.adjustedInfo.splice(_$$start+1,_$$end-_$$start",i=0;i<_$$end-_$$start;i++)$itemSplice=$itemSplice.concat(",empty");return $itemSplice+=")",eval("("+$itemSplice+")"),void(this.adjustedInfoGrid.resize(_$start)&&this.adjustedInfoGrid.busy(!1))}if(/data-row/g.test($target.html())){$target=$($target.html().replace(/&nbsp;/g,"")),_$start=$target.attr("data-row"),_$end=$target.attr("data-splice"),this.adjustedInfoGrid.busy(!0);for(var _$$start=parseInt(_$start),_$$end=parseInt(_$end),empty=[],$itemSplice="this.adjustedInfo.splice(_$$start+1,_$$end-_$$start",i=0;i<_$$end-_$$start;i++)$itemSplice=$itemSplice.concat(",empty");return $itemSplice+=")",eval("("+$itemSplice+")"),void(this.adjustedInfoGrid.resize(_$start)&&this.adjustedInfoGrid.busy(!1))}var sCode=$target.attr("securityid"),sName=$target.html().replace(/&nbsp;/g,"");sCode&&($(".silodrag").modal("hide"),common.reqLastVisit(sCode,sName,2,"recent",this.$router))},changeTime:function(t){var a=t.target;$(a).addClass("sel").siblings().removeClass("sel");var e=$(a).attr("value"),i=$(a).text();this.loadData(null,e),this.siloInfo.silo_round=i,this.date=e},changeFiveBuyOrSell:function(t){var a=t.target;$(a).addClass("sel").siblings().removeClass("sel");var e=$(a).attr("value"),i=this.$store.state.selectGroup.id;this.fivedealInfoFun(i,e),this.$store.commit(moduleName+"/initFivedealInfo")},changeYieldDetail:function(t){var a=t.target;$(a).addClass("sel").siblings().removeClass("sel");var e=$(a).attr("value"),i=this.$store.state.selectGroup.id;this.adjustedInfoFun(i,e),this.$store.commit(moduleName+"/initAdjustedInfo")},loadData:function(t,a){var e=this,i=t||this.$store.state.selectGroup.id;if("changePrt"==a&&(a=$(".siloChangeTime .sel").attr("value")),void 0==a&&($(".siloChangeTime li").removeClass("sel"),$(".siloChangeTime li").eq(0).addClass("sel"),$(".fivedragRecentime li").removeClass("sel"),$(".fivedragRecentime li").eq(0).addClass("sel"),$(".siloRecentime li").removeClass("sel"),$(".siloRecentime li").eq(0).addClass("sel")),this.loading1=!0,this.loading2=!0,$(".fivedrag").is(":visible")){var s=$(".fivedrag").find("ul>li.sel").val()+"";this.fivedealInfoFun(i,s||"0")}else if($(".silodrag").is(":visible")){var s=$(".silodrag").find("ul>li.sel").val()+"";this.adjustedInfoFun(i,s||"0")}else this.siloInfoFun(i,a||"0"),setTimeout(function(){e.dailyExchangeRateFun(i,a||"0")},500),this.awkwardnessBuyFun(i,a||"0"),setTimeout(function(){e.awkwardnessSellFun(i,a||"0")},500),this.heavyIndustryYieldFun(i,a||"0"),setTimeout(function(){e.heavyIndustryLossFun(i,a||"0")},500);this.$store.commit(moduleName+"/initAwkwardness"),this.$store.commit(moduleName+"/initHeavyIndustry")},destroy:function(){(siloInfo||dailyExchangeRate||awkwardnessBuy||awkwardnessSell||heavyIndustryYield||heavyIndustryLoss||this.fivedealInfoGrid||this.adjustedInfoGrid)&&(siloInfo.kill(),dailyExchangeRate.kill(),awkwardnessBuy.kill(),awkwardnessSell.kill(),heavyIndustryYield.kill(),heavyIndustryLoss.kill(),this.fivedealInfoGrid&&this.fivedealInfoGrid.kill(),this.adjustedInfoGrid&&this.adjustedInfoGrid.kill())}}}}).call(exports,__webpack_require__(2))},1141:function(t,a,e){"use strict";a.__esModule=!0;var i=e(161),s=function(t){return t&&t.__esModule?t:{default:t}}(i);a.default=s.default||function(t){for(var a=1;a<arguments.length;a++){var e=arguments[a];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t}},1142:function(t,a,e){"use strict";var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"realTime silo"},[e("div",{staticClass:"onemonth"},[e("ul",{staticClass:"change-time siloChangeTime"},[e("li",{staticClass:"sel",attrs:{value:0},on:{click:function(a){t.changeTime(a)}}},[t._v("今日")]),t._v(" "),e("li",{attrs:{value:1},on:{click:function(a){t.changeTime(a)}}},[t._v("近一周")]),t._v(" "),e("li",{attrs:{value:2},on:{click:function(a){t.changeTime(a)}}},[t._v("近一个月")]),t._v(" "),e("li",{attrs:{value:3},on:{click:function(a){t.changeTime(a)}}},[t._v("近一个季度")]),t._v(" "),e("li",{attrs:{value:4},on:{click:function(a){t.changeTime(a)}}},[t._v("近半年")]),t._v(" "),e("li",{attrs:{value:5},on:{click:function(a){t.changeTime(a)}}},[t._v("今年")])])]),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-6 panel-left"},[e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading5,expression:"loading5"}],staticClass:"panel panel-default"},[t._m(0),t._v(" "),e("div",{staticClass:"panel-body silo_w",staticStyle:{padding:"0!important",height:"122px"}},[e("span",[t._v(t._s(t.siloInfo.silo_round)+"共调仓")]),e("span",{staticClass:"blue-font"},[t._v(t._s(t.siloInfo["Trade Count"]))]),t._v("次，共\r\n\t\t          "),e("span",{staticClass:"blue-font"},[t._v(t._s(t.siloInfo["Good Trade Count"]))]),t._v("次赚了钱，调仓收益共\r\n\t\t          "),e("span",{staticClass:"bold-font",class:"--"==t.siloInfo["Trade PnL"]?"blac-font":"0.00"==t.siloInfo["Trade PnL"]?"yellow-font":t.siloInfo["Trade PnL"].indexOf("-")>-1?"green-font":"red-font"},[t._v(t._s(t.siloInfo["Trade PnL"]))]),t._v("元，通过调仓中获得最大盈利的股票为\r\n\t\t          "),e("span",{staticClass:"blue-font",staticStyle:{cursor:"pointer"},attrs:{securityid:t.heavyIndustry[0].securityId},on:{click:function(a){t.addVisit(a)}}},[t._v(t._s(t.heavyIndustry[0].name))]),t._v("。"),e("br"),t._v("买入量最大的股票为\r\n\t\t          "),e("span",{staticClass:"blue-font",staticStyle:{cursor:"pointer"},attrs:{securityid:t.awkwardness[0].securityId},on:{click:function(a){t.addVisit(a)}}},[t._v(t._s(t.awkwardness[0].name))]),t._v("，卖出量最大的股票为\r\n\t\t          "),e("span",{staticClass:"blue-font",staticStyle:{cursor:"pointer"},attrs:{securityid:t.awkwardness[0].securityId_sell},on:{click:function(a){t.addVisit(a)}}},[t._v(t._s(t.awkwardness[0].name_sell))]),t._v("。\r\n\t\t        ")])])]),t._v(" "),e("div",{staticClass:"col-md-6 panel-right"},[e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading6,expression:"loading6"}],staticClass:"panel panel-default"},[t._m(1),t._v(" "),e("div",{staticClass:"panel-body",staticStyle:{padding:"12px"}},[e("div",{staticClass:"blue-font",staticStyle:{"text-align":"center","font-family":"monospace","font-size":"35px"}},[t._v("\r\n                        "+t._s(t.dailyExchangeRate.value)+"\r\n                    ")]),t._v(" "),t._m(2),t._v(" "),e("div",{staticStyle:{"text-align":"center",color:"#666"}},[t._v("相当于每"),e("span",{staticClass:"blue-font"},[t._v(t._s(t.dailyExchangeRate.transValue))]),t._v("天把手中的全部股票换一遍\r\n                    ")])])])])]),t._v(" "),e("div",{staticClass:"tf-deal silo_table"},[t._m(3),t._v(" "),e("table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading1,expression:"loading1"}],staticClass:"table-common",attrs:{tabid:"pre_buy"}},[t._m(4),t._v(" "),t._m(5),t._v(" "),t._m(6),t._v(" "),t._l(t.awkwardness,function(a,i){return e("tr",{key:i},[e("td",{staticClass:"center buy_td"},[e("span",{staticClass:"cl_fre_name",staticStyle:{position:"relative"},attrs:{securityid:a.securityId,title:a.name},on:{click:function(a){t.addVisit(a)}}},[t._v(t._s(a.name)+"\r\n\t\t        ")])]),t._v(" "),e("td",{staticClass:"right buy_td",attrs:{cell:t._f("objToJSONString")(a["Buy Volume"])}},[t._v(t._s(a["Buy Volume"].value))]),t._v(" "),e("td",{staticClass:"right buy_td",attrs:{cell:t._f("objToJSONString")(a["Buy Price Range"])}},[t._v(t._s(a["Buy Price Range"].value))]),t._v(" "),e("td",{staticClass:"right buy_td",attrs:{cell:t._f("objToJSONString")(a["Buy Amount"])}},[t._v(t._s(a["Buy Amount"].value))]),t._v(" "),e("td",{staticClass:"center sell_td"},[e("span",{staticClass:"cl_fre_name",staticStyle:{position:"relative"},attrs:{title:a.name_sell,securityid:a.securityId_sell},on:{click:function(a){t.addVisit(a)}}},[t._v(t._s(a.name_sell)+"\r\n\t\t\t        ")])]),t._v(" "),e("td",{staticClass:"right sell_td",attrs:{cell:t._f("objToJSONString")(a["Sell Volume"])}},[t._v(t._s(a["Sell Volume"].value))]),t._v(" "),e("td",{staticClass:"right sell_td",attrs:{cell:t._f("objToJSONString")(a["Sell Price Range"])}},[t._v(t._s(a["Sell Price Range"].value))]),t._v(" "),e("td",{staticClass:"right sell_td",attrs:{cell:t._f("objToJSONString")(a["Sell Amount"])}},[t._v(t._s(a["Sell Amount"].value))])])})],2)]),t._v(" "),e("div",{staticClass:"tf-deal"},[t._m(7),t._v(" "),e("table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading2,expression:"loading2"}],staticClass:"table-common",attrs:{tabid:"adjust_table"}},[t._m(8),t._v(" "),e("tbody",t._l(t.heavyIndustry,function(a,i){return e("tr",{key:i},[e("td",{staticClass:"center profit_td"},[e("span",{staticClass:"cl_fre_name",staticStyle:{position:"relative"},attrs:{securityid:a.securityId,title:a.name},on:{click:function(a){t.addVisit(a)}}},[t._v(t._s(a.name)+"\r\n\t\t                ")])]),t._v(" "),e("td",{staticClass:"right profit_td",attrs:{cell:t._f("objToJSONString")(a["Nontrade PnL"])}},[t._v(t._s(a["Nontrade PnL"].value))]),t._v(" "),e("td",{staticClass:"right profit_td",attrs:{cell:t._f("objToJSONString")(a["Range PnL"])}},[t._v(t._s(a["Range PnL"].value))]),t._v(" "),e("td",{staticClass:"right profit_td",attrs:{cell:t._f("objToJSONString")(a["Trade PnL"])}},[t._v(t._s(a["Trade PnL"].value))]),t._v(" "),e("td",{staticClass:"center loss_td"},[e("span",{staticClass:"cl_fre_name",staticStyle:{position:"relative"},attrs:{title:a.name_loss,securityid:a.securityId_loss},on:{click:function(a){t.addVisit(a)}}},[t._v(t._s(a.name_loss)+"\r\n\t\t                ")])]),t._v(" "),e("td",{staticClass:"right loss_td",attrs:{cell:t._f("objToJSONString")(a["Nontrade PnL_loss"])}},[t._v(t._s(a["Nontrade PnL_loss"].value))]),t._v(" "),e("td",{staticClass:"right loss_td",attrs:{cell:t._f("objToJSONString")(a["Range PnL_loss"])}},[t._v(t._s(a["Range PnL_loss"].value))]),t._v(" "),e("td",{staticClass:"right loss_td",attrs:{cell:t._f("objToJSONString")(a["Trade PnL_loss"])}},[t._v(t._s(a["Trade PnL_loss"].value))])])}))])]),t._v(" "),e("div",{staticClass:"modal fade pas-modal fivedrag",attrs:{tabindex:"-1",role:"dialog","aria-labelledby":"fivedrag_title"}},[e("div",{directives:[{name:"modal-drag",rawName:"v-modal-drag"}],staticClass:"modal-dialog modal-lg",attrs:{role:"document"}},[e("div",{staticClass:"modal-content"},[t._m(9),t._v(" "),e("div",{staticClass:"modal-body"},[e("div",{staticClass:"twoselect"},[e("ul",{staticClass:"fivedragRecentime change-time"},[e("li",{staticClass:"sel",attrs:{value:"0"},on:{click:function(a){t.changeFiveBuyOrSell(a)}}},[t._v("今日")]),t._v(" "),e("li",{attrs:{value:"1"},on:{click:function(a){t.changeFiveBuyOrSell(a)}}},[t._v("近一周")]),t._v(" "),e("li",{attrs:{value:"2"},on:{click:function(a){t.changeFiveBuyOrSell(a)}}},[t._v("近一个月")]),t._v(" "),e("li",{attrs:{value:"3"},on:{click:function(a){t.changeFiveBuyOrSell(a)}}},[t._v("近一个季度")]),t._v(" "),e("li",{attrs:{value:"4"},on:{click:function(a){t.changeFiveBuyOrSell(a)}}},[t._v("近半年")]),t._v(" "),e("li",{attrs:{value:"5"},on:{click:function(a){t.changeFiveBuyOrSell(a)}}},[t._v("今年")])])]),t._v(" "),e("div",{staticClass:"detail_table",staticStyle:{width:"900px",height:"90%"}},[e("pas-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading3,expression:"loading3"}],attrs:{data:t.fivedealInfo,grid:t.fivedealInfoGrid,"dep-id":"detail_buy",width:"900px",height:"calc(90% - 20px)"}},[e("pas-table-column",{attrs:{label:"证券名称",prop:"name",dep:!1,resizable:!1,align:"left"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("span",{staticClass:"cl_fre_name",staticStyle:{position:"relative"},attrs:{securityid:a.row.data.securityId,title:a.row.data.name},domProps:{innerHTML:t._s(a.row.data.name)},on:{click:function(a){t.addFiveVisit(a)}}})]}}])}),t._v(" "),e("pas-table-column",{attrs:{label:"买入数量",prop:"Buy Volume",resizable:!1,align:"right"}}),t._v(" "),e("pas-table-column",{attrs:{label:"买入价格",prop:"Buy Price Range",resizable:!1,align:"right"}}),t._v(" "),e("pas-table-column",{attrs:{label:"买入金额",prop:"Buy Amount",resizable:!1,align:"right"}}),t._v(" "),e("pas-table-column",{attrs:{label:"卖出数量",prop:"Sell Volume",resizable:!1,align:"right"}}),t._v(" "),e("pas-table-column",{attrs:{label:"卖出价格",prop:"Sell Price Range",resizable:!1,align:"right"}}),t._v(" "),e("pas-table-column",{attrs:{label:"卖出金额",prop:"Sell Amount",resizable:!1,align:"right"}})],1)],1)])])])]),t._v(" "),e("div",{staticClass:"modal fade pas-modal silodrag",attrs:{tabindex:"-1",role:"dialog","aria-labelledby":"silodrag_title"}},[e("div",{directives:[{name:"modal-drag",rawName:"v-modal-drag"}],staticClass:"modal-dialog modal-lg",attrs:{role:"document"}},[e("div",{staticClass:"modal-content"},[t._m(10),t._v(" "),e("div",{staticClass:"modal-body"},[e("div",{staticClass:"twoselect"},[e("ul",{staticClass:"siloRecentime change-time"},[e("li",{staticClass:"sel",attrs:{value:"0"},on:{click:function(a){t.changeYieldDetail(a)}}},[t._v("今日")]),t._v(" "),e("li",{attrs:{value:"1"},on:{click:function(a){t.changeYieldDetail(a)}}},[t._v("近一周")]),t._v(" "),e("li",{attrs:{value:"2"},on:{click:function(a){t.changeYieldDetail(a)}}},[t._v("近一个月")]),t._v(" "),e("li",{attrs:{value:"3"},on:{click:function(a){t.changeYieldDetail(a)}}},[t._v("近一个季度")]),t._v(" "),e("li",{attrs:{value:"4"},on:{click:function(a){t.changeYieldDetail(a)}}},[t._v("近半年")]),t._v(" "),e("li",{attrs:{value:"5"},on:{click:function(a){t.changeYieldDetail(a)}}},[t._v("今年")])])]),t._v(" "),e("div",{staticClass:"detail_table",staticStyle:{width:"900px",height:"90%"}},[e("pas-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading4,expression:"loading4"}],attrs:{data:t.adjustedInfo,grid:t.adjustedInfoGrid,"dep-id":"detail_silo",width:"900px",height:"calc(90% - 20px)"}},[e("pas-table-column",{attrs:{label:"证券名称",prop:"name",dep:!1,resizable:!1,align:"left"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("span",{staticClass:"cl_fre_name",staticStyle:{position:"relative"},attrs:{securityid:a.row.data.securityId,title:t._f("securityNameFilter")(a.row.data.name)},domProps:{innerHTML:t._s(a.row.data.name)},on:{click:function(a){t.addVisit(a)}}})]}}])}),t._v(" "),e("pas-table-column",{attrs:{label:"总体盈亏（持仓不变）",prop:"Nontrade PnL",resizable:!1,align:"right"}}),t._v(" "),e("pas-table-column",{attrs:{label:"总体盈亏（调仓后）",prop:"Range PnL",resizable:!1,align:"right"}}),t._v(" "),e("pas-table-column",{attrs:{label:"调仓收益",prop:"Trade PnL",resizable:!1,align:"right"}})],1)],1)])])])])])},s=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"panel-heading"},[e("div",{staticClass:"panel-title"},[t._v("交易分析")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"panel-heading"},[e("div",{staticClass:"panel-title"},[t._v("日均换手率")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"progress",staticStyle:{background:"#ddd","margin-bottom":"10px"}},[e("div",{staticClass:"progress-bar progress-bar-striped active",staticStyle:{width:"dailyExchangeRate.value"},attrs:{role:"progressbar","aria-valuenow":"45","aria-valuemin":"0","aria-valuemax":"100"}})])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"table-title breakdown"},[e("button",{staticClass:"btn btn-primary break-but",attrs:{type:"button","data-toggle":"modal","data-target":".fivedrag"}},[t._v("明细\r\n            ")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("tr",[e("th",{staticClass:"left",staticStyle:{"padding-left":"12px"},attrs:{colspan:"8"}},[t._v("前5大买卖")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("tr",[e("th",{attrs:{colspan:"4"}},[t._v("买入前五")]),t._v(" "),e("th",{attrs:{colspan:"4"}},[t._v("卖出前五")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("tr",[e("th",[t._v("证券名称")]),t._v(" "),e("th",[t._v("买入数量")]),t._v(" "),e("th",[t._v("买入均价")]),t._v(" "),e("th",[t._v("买入金额")]),t._v(" "),e("th",[t._v("证券名称")]),t._v(" "),e("th",[t._v("卖出数量")]),t._v(" "),e("th",[t._v("卖出均价")]),t._v(" "),e("th",[t._v("卖出金额")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"table-title breakdown"},[e("button",{staticClass:"btn btn-primary break-but",attrs:{type:"button","data-toggle":"modal","data-target":".silodrag"}},[t._v("明细\r\n            ")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",[e("tr",[e("th",{staticClass:"left",staticStyle:{"padding-left":"12px"},attrs:{colspan:"8"}},[t._v("调仓收益")])]),t._v(" "),e("tr",[e("th",{attrs:{colspan:"4"}},[t._v("调仓盈利前五")]),t._v(" "),e("th",{attrs:{colspan:"4"}},[t._v("调仓亏损前五")])]),t._v(" "),e("tr",[e("th",[t._v("证券名称")]),t._v(" "),e("th",[t._v("总体盈亏（持仓不变）")]),t._v(" "),e("th",[t._v("总体盈亏（调仓后）")]),t._v(" "),e("th",[t._v("调仓收益")]),t._v(" "),e("th",[t._v("证券名称")]),t._v(" "),e("th",[t._v("总体盈亏（持仓不变）")]),t._v(" "),e("th",[t._v("总体盈亏（调仓后）")]),t._v(" "),e("th",[t._v("调仓收益")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"modal-header"},[e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{staticStyle:{"font-size":"21px"},attrs:{"aria-hidden":"true"}},[t._v("×")])]),t._v(" "),e("h4",{staticClass:"modal-title",attrs:{id:"fivedrag_title"}},[t._v("买卖明细")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"modal-header"},[e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{staticStyle:{"font-size":"21px"},attrs:{"aria-hidden":"true"}},[t._v("×")])]),t._v(" "),e("h4",{staticClass:"modal-title",attrs:{id:"silodrag_title"}},[t._v("调仓收益")])])}],l={render:i,staticRenderFns:s};a.a=l}});