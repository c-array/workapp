webpackJsonp([24],{otdJ:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o("4YfN"),m=o.n(r),a=o("9rMa"),n=o("nxAZ"),s=o("d5Kw"),l=(n.a,s.a,m()({},Object(a.c)({formModel:function(e){return e.common.user.formModel},vm:function(e){return e.common.user.vm}})),m()({},Object(a.b)({getUserItem:"common/user/getUserItem",getDepartmentList:"common/user/getDepartmentList"}),{handleSave:function(){this.userId?this.$store.commit({type:"common/user/edit"}):this.$store.commit({type:"common/user/add"})}}),{name:"userForm",data:function(){return{userId:this.$route.query.userId}},components:{XHeader:n.a,XButton:s.a},computed:m()({},Object(a.c)({formModel:function(e){return e.common.user.formModel},vm:function(e){return e.common.user.vm}})),created:function(){this.userId&&this.getUserItem(this.userId),this.getDepartmentList()},methods:m()({},Object(a.b)({getUserItem:"common/user/getUserItem",getDepartmentList:"common/user/getDepartmentList"}),{handleSave:function(){this.userId?this.$store.commit({type:"common/user/edit"}):this.$store.commit({type:"common/user/add"})}})}),i={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"inner bg-white"},[o("x-header",{attrs:{title:e.userId?"修改用户信息":"添加用户信息"}}),e._v(" "),o("div",{staticClass:"form-list"},[o("ul",[o("li",[o("label",[e._v("用户名称")]),e._v(" "),o("div",{staticClass:"form-item"},[o("input",{directives:[{name:"model",rawName:"v-model",value:e.formModel.username,expression:"formModel.username"}],attrs:{placeholder:"请输入用户名称",type:"text"},domProps:{value:e.formModel.username},on:{input:function(t){t.target.composing||e.$set(e.formModel,"username",t.target.value)}}})])]),e._v(" "),o("li",[o("label",[e._v("真实姓名")]),e._v(" "),o("div",{staticClass:"form-item"},[o("input",{directives:[{name:"model",rawName:"v-model",value:e.formModel.realname,expression:"formModel.realname"}],attrs:{placeholder:"请输入真实姓名",type:"text"},domProps:{value:e.formModel.realname},on:{input:function(t){t.target.composing||e.$set(e.formModel,"realname",t.target.value)}}})])]),e._v(" "),o("li",[o("label",[e._v("部门")]),e._v(" "),o("div",{staticClass:"form-item"},[o("select",{directives:[{name:"model",rawName:"v-model",value:e.formModel.departmentId,expression:"formModel.departmentId"}],on:{change:function(t){var o=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.$set(e.formModel,"departmentId",t.target.multiple?o:o[0])}}},[o("option",{attrs:{value:""}},[e._v("请选择部门")]),e._v(" "),e._l(e.vm.departmentList,function(t){return o("option",{domProps:{value:t.id}},[e._v(e._s(t.depName))])})],2)])]),e._v(" "),o("li",[o("label",[e._v("职位")]),e._v(" "),o("div",{staticClass:"form-item"},[o("input",{directives:[{name:"model",rawName:"v-model",value:e.formModel.post,expression:"formModel.post"}],attrs:{placeholder:"请输入职位",type:"text"},domProps:{value:e.formModel.post},on:{input:function(t){t.target.composing||e.$set(e.formModel,"post",t.target.value)}}})])]),e._v(" "),o("li",[o("label",[e._v("手机号")]),e._v(" "),o("div",{staticClass:"form-item"},[o("input",{directives:[{name:"model",rawName:"v-model",value:e.formModel.phone,expression:"formModel.phone"}],attrs:{placeholder:"请输入手机号",type:"text"},domProps:{value:e.formModel.phone},on:{input:function(t){t.target.composing||e.$set(e.formModel,"phone",t.target.value)}}})])]),e._v(" "),o("li",[o("label",[e._v("邮箱")]),e._v(" "),o("div",{staticClass:"form-item"},[o("input",{directives:[{name:"model",rawName:"v-model",value:e.formModel.email,expression:"formModel.email"}],attrs:{placeholder:"请输入邮箱",type:"text"},domProps:{value:e.formModel.email},on:{input:function(t){t.target.composing||e.$set(e.formModel,"email",t.target.value)}}})])]),e._v(" "),o("li",[o("label",[e._v("qq")]),e._v(" "),o("div",{staticClass:"form-item"},[o("input",{directives:[{name:"model",rawName:"v-model",value:e.formModel.qq,expression:"formModel.qq"}],attrs:{placeholder:"请输入qq",type:"text"},domProps:{value:e.formModel.qq},on:{input:function(t){t.target.composing||e.$set(e.formModel,"qq",t.target.value)}}})])])]),e._v(" "),o("div",{staticClass:"form-btn"},[o("x-button",{attrs:{type:"primary"},nativeOn:{click:function(t){return e.handleSave(t)}}},[e._v("保 存")])],1)])],1)},staticRenderFns:[]},d=o("Z0/y")(l,i,!1,null,null,null);t.default=d.exports}});
//# sourceMappingURL=24.0408bb88aa3c3aac79b0.js.map