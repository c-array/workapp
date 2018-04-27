import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: resolve => require(['@/components/login'],resolve)
    },
    {
      path: '/main',
      name: 'mains',
      component: resolve => require(['@/components/main'],resolve),
      children:[
        {
          path: 'day/:menuId',
          name: 'day',
          component: resolve => require(['@/components/my/day'],resolve),
        }
      ]
    },
    {
      path: '*',
      component: resolve => require(['@/components/common/404'],resolve)
    }
  ]
})
