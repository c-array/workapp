webpackJsonp([22],{WEz9:function(e,t){},pOh6:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=r("nxAZ"),n=r("Iu/6"),s=r("z5TY"),a=r("BGNQ"),o=(i.a,n.a,s.a,a.a,{name:"partner",data:function(){return{currentPage:-1,pageSize:15,list:[]}},components:{XHeader:i.a,Spinner:n.a,Group:s.a,Cell:a.a},created:function(){},methods:{query:function(e){var t=this;this.$http.post({url:"/my/item",data:{userId:sessionStorage.userId,currentPage:this.currentPage,pageSize:this.pageSize,type:2},type:"json",success:function(r){r.length>0?e&&e.done?setTimeout(function(i){1==e.type?t.list=t.list.concat(r):2==e.type&&(t.list=r),e.done()},1e3):t.list=r:t.$refs.myScroller.finishInfinite(2)},error:function(e){t.$vux.toast.text(e,"top")}})},loadMore:function(e){this.currentPage=this.currentPage+1,this.query({type:1,done:e})},refresh:function(e){this.currentPage=0,this.query({type:2,done:e})}}}),u={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"inner"},[t("x-header",{staticClass:"x-header",attrs:{title:"我参与的项目"}}),this._v(" "),t("div",{staticClass:"list-main list-inner"},[t("scroller",{ref:"myScroller",attrs:{"on-refresh":this.refresh,"on-infinite":this.loadMore}},[t("group",this._l(this.list,function(e){return t("cell",{key:e.id,staticClass:"list-item",attrs:{value:e.usedTime.toFixed(2),title:e.work_product_project.prName}})}))],1)],1)],1)},staticRenderFns:[]};var c=r("Z0/y")(o,u,!1,function(e){r("WEz9")},"data-v-15a49712",null);t.default=c.exports}});
//# sourceMappingURL=22.ff7038268c440c1bad18.js.map