import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: resolve => require(['@/components/login/index'],resolve)
    },
    {
      path: '/main',
      name: 'main',
      component: resolve => require(['@/components/main/index'],resolve),
      redirect: '/main/day',
      meta: { // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
      },
      children: [
        {
          path: 'day',
          name: 'day',
          component: resolve => require(['@/components/day/index'],resolve),
          meta: { // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
          }
        },
        {
          path: 'statistics',
          name: 'statistics',
          component: resolve => require(['@/components/statistics/index'],resolve),
          meta: { // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
          }
        },
        {
          path: 'colleague',
          name: 'colleague',
          component: resolve => require(['@/components/statistics/colleague'],resolve),
          meta: { // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
          }
        },
        {
          path: 'department',
          name: 'department',
          component: resolve => require(['@/components/statistics/department'],resolve),
          meta: { // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
          }
        },
        {
          path: 'item',
          name: 'item',
          component: resolve => require(['@/components/statistics/item'],resolve),
          meta: { // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
          }
        },
        {
          path: 'people',
          name: 'people',
          component: resolve => require(['@/components/statistics/people'],resolve),
          meta: { // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
          }
        },
        {
          path: 'people-charts',
          name: 'people-charts',
          component: resolve => require(['@/components/statistics/people-charts'],resolve),
          meta: { // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
          }
        },
        {
          path: 'system',
          name: 'system',
          component: resolve => require(['@/components/system/index'],resolve),
          meta: { // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
          }
        }
      ]
    },
    {
      path: '/day-form',
      name: 'day-form',
      component: resolve => require(['@/components/day/form'],resolve),
      meta: { // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
      }
    },
    {
      path: '/user',
      name: 'user',
      component: resolve => require(['@/components/system/user/index'],resolve),
      meta: { // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
      }
    },
    {
      path: '/user-form',
      name: 'user-form',
      component: resolve => require(['@/components/system/user/form'],resolve),
      meta: { // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
      }
    }
  ]
})
