webpackJsonp([20],{cZQZ:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o("4YfN"),n=o.n(r),l=o("9rMa"),a=o("nxAZ"),m=o("SAzG"),i=o("d5Kw"),c=o("PzEQ"),d=o("z5TY"),s=(d.a,a.a,m.a,i.a,c.a,n()({},Object(l.c)({formModel:function(e){return e.common.role.formModel},vm:function(e){return e.common.role.vm}})),n()({},Object(l.b)({getRoleItem:"common/role/getRoleItem"}),{handleSave:function(){this.roleId?this.$store.commit({type:"common/role/edit"}):this.$store.commit({type:"common/role/add"})}}),{name:"roleForm",data:function(){return{roleId:this.$route.query.roleId}},components:{Group:d.a,XHeader:a.a,XInput:m.a,XButton:i.a,XTextarea:c.a},computed:n()({},Object(l.c)({formModel:function(e){return e.common.role.formModel},vm:function(e){return e.common.role.vm}})),created:function(){this.roleId&&this.getRoleItem(this.roleId)},methods:n()({},Object(l.b)({getRoleItem:"common/role/getRoleItem"}),{handleSave:function(){this.roleId?this.$store.commit({type:"common/role/edit"}):this.$store.commit({type:"common/role/add"})}})}),u={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"inner"},[o("x-header",{attrs:{title:e.roleId?"修改角色":"添加角色"}}),e._v(" "),o("group",{attrs:{"label-width":"70px","label-margin-right":"10px","label-align":"right"}},[o("x-input",{attrs:{title:"角色名称",placeholder:"请输入角色名称"},model:{value:e.formModel.roleName,callback:function(t){e.$set(e.formModel,"roleName",t)},expression:"formModel.roleName"}}),e._v(" "),o("x-textarea",{attrs:{max:255,height:100,title:"角色描述",placeholder:"请输入角色描述"},model:{value:e.formModel.roleDescription,callback:function(t){e.$set(e.formModel,"roleDescription",t)},expression:"formModel.roleDescription"}})],1),e._v(" "),o("div",{staticClass:"form-btn"},[o("x-button",{attrs:{type:"primary"},nativeOn:{click:function(t){return e.handleSave(t)}}},[e._v("保 存")])],1)],1)},staticRenderFns:[]};var f=o("Z0/y")(s,u,!1,function(e){o("rMMI")},"data-v-29a32fd8",null);t.default=f.exports},rMMI:function(e,t){}});
//# sourceMappingURL=20.74d76424cf042e2cb52e.js.map