// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store';

Vue.config.productionTip = false;

//ui框架
import  { ToastPlugin,ConfirmPlugin } from 'vux'
Vue.use(ToastPlugin);
Vue.use(ConfirmPlugin);

//图表
import 'v-charts/lib/style.css';
import VeHistogram from 'v-charts/lib/histogram';
import VeLine from 'v-charts/lib/line';
import VePie from 'v-charts/lib/pie';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/title';
Vue.component(VeHistogram.name, VeHistogram);
Vue.component(VePie.name, VePie);
Vue.component(VeLine.name, VeLine);

//htpp请求
import {formatDate,copyObj} from './public/js/common';
import http from './public/js/http';
Vue.prototype.$http = http;
Vue.prototype.$formatDate = formatDate;
Vue.prototype.$copyObj = copyObj;

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
  template: '<App/>',
  components: { App }
})
