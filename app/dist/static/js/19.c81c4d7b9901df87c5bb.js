webpackJsonp([19],{DvxE:function(t,e){},LAlh:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=o("4YfN"),i=o.n(a),n=o("9rMa"),r=o("nxAZ"),m=(i()({},Object(n.c)({formModel:function(t){return t.common.item.formModel},vm:function(t){return t.common.item.vm},histogramConfig:function(t){return t.common.histogramConfig},chartsData:function(t){return t.common.item.chartsData}})),r.a,i()({},Object(n.b)({handleGetItemList:"common/item/getItemList",handleGetList:"common/item/getList",handleExport:"common/item/export"})),{name:"item",computed:i()({},Object(n.c)({formModel:function(t){return t.common.item.formModel},vm:function(t){return t.common.item.vm},histogramConfig:function(t){return t.common.histogramConfig},chartsData:function(t){return t.common.item.chartsData}})),components:{XHeader:r.a},created:function(){this.handleGetList()},methods:i()({},Object(n.b)({handleGetItemList:"common/item/getItemList",handleGetList:"common/item/getList",handleExport:"common/item/export"}))}),s={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"inner stats"},[o("x-header",{attrs:{title:"统计分析-项目/产品统计"}},[o("div",{staticClass:"stats-head-right",attrs:{slot:"right"},slot:"right"},[o("i",{staticClass:"icon-export",on:{click:t.handleExport}})])]),t._v(" "),o("div",{staticClass:"stats-box"},[o("ul",[o("li",[o("select",{directives:[{name:"model",rawName:"v-model",value:t.formModel.type,expression:"formModel.type"}],on:{change:[function(e){var o=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.formModel,"type",e.target.multiple?o:o[0])},t.handleGetItemList]}},[o("option",{attrs:{value:""}},[t._v("全部")]),t._v(" "),t._l([{id:1,name:"产品"},{id:2,name:"项目"}],function(e){return o("option",{domProps:{value:e.id}},[t._v(t._s(e.name))])})],2)]),t._v(" "),o("li",[o("select",{directives:[{name:"model",rawName:"v-model",value:t.formModel.itemId,expression:"formModel.itemId"}],on:{change:[function(e){var o=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.formModel,"itemId",e.target.multiple?o:o[0])},t.handleGetList]}},[o("option",{attrs:{value:""}},[t._v("全部")]),t._v(" "),t._l(t.vm.itemList,function(e){return o("option",{domProps:{value:e.id}},[t._v(t._s(e.prName))])})],2)])]),t._v(" "),o("div",{staticClass:"stats-warp"},[1==t.formModel.type||""==t.formModel.type?o("div",{staticClass:"stats-chart"},[o("ve-histogram",{attrs:{height:"250px",title:{text:"产品投入时间"},"legend-visible":!1,"data-zoom":t.histogramConfig.dataZoom,"after-config":t.histogramConfig.callback,data:t.chartsData.product,"data-empty":t.vm.empty,loading:t.vm.loading,settings:t.histogramConfig.chartSettings}})],1):t._e(),t._v(" "),2==t.formModel.type||""==t.formModel.type?o("div",{staticClass:"stats-chart"},[o("ve-histogram",{attrs:{height:"250px",title:{text:"项目投入时间"},"legend-visible":!1,"data-zoom":t.histogramConfig.dataZoom,"after-config":t.histogramConfig.callback,data:t.chartsData.project,"data-empty":t.vm.empty,loading:t.vm.loading,settings:t.histogramConfig.chartSettings}})],1):t._e()])])],1)},staticRenderFns:[]};var l=o("Z0/y")(m,s,!1,function(t){o("DvxE")},"data-v-3243fc4f",null);e.default=l.exports}});
//# sourceMappingURL=19.c81c4d7b9901df87c5bb.js.map