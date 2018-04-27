// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false
import store from "./vuex/store";

import "element-ui/lib/theme-chalk/index.css";
import {
    Form,
    FormItem,
    Input,
    Select,
    Option,
    Checkbox,
    Button,
    Message,
    Loading,
    Container,
    Header,
    Aside,
    Main,
    MessageBox,
    DatePicker,
    Pagination
} from "element-ui";
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(Button);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Select);
Vue.use(Option);
Vue.use(DatePicker);
Vue.use(Pagination);
Vue.prototype.$Message = Message;
Vue.prototype.$MessageBox = MessageBox;
Vue.prototype.$loading = Loading.service;

//加载插件
import plugin from './assets/tools/plugin';
Vue.use(plugin);

router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) {
      if(sessionStorage.userId) {
          next();
      }else {
          next({
              path: '/',
              query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
      }
  }else {
      next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
