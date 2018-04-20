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
          path: 'stats',
          name: 'stats',
          component: resolve => require(['@/components/stats/index'],resolve),
          meta: { // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
          }
        },
        {
          path: 'stats/colleague',
          name: 'stats-colleague',
          component: resolve => require(['@/components/stats/colleague'],resolve),
          meta: { // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
          }
        },
        {
          path: 'stats/dept',
          name: 'stats-dept',
          component: resolve => require(['@/components/stats/dept'],resolve),
          meta: { // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
          }
        },
        {
          path: 'stats/item',
          name: 'stats-item',
          component: resolve => require(['@/components/stats/item'],resolve),
          meta: { // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
          }
        },
        {
          path: 'stats/people',
          name: 'stats-people',
          component: resolve => require(['@/components/stats/people'],resolve),
          meta: { // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
          }
        },
        {
          path: 'stats/people-charts',
          name: 'stats-people-charts',
          component: resolve => require(['@/components/stats/people-charts'],resolve),
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
        },
        {
          path: 'my',
          name: 'my',
          component: resolve => require(['@/components/my/index'],resolve),
          meta: { // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
          }
        }
      ]
    },
    {
      path: '/day/form',
      name: 'day-form',
      component: resolve => require(['@/components/day/form'],resolve),
      meta: { // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
      }
    },
    {
      path: '/system/user',
      name: 'system-user',
      component: resolve => require(['@/components/system/user/index'],resolve),
      meta: { // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
      }
    },
    {
      path: '/system/user/form',
      name: 'system-user-form',
      component: resolve => require(['@/components/system/user/form'],resolve),
      meta: { // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
      }
    },
    {
      path: '/system/role',
      name: 'system-role',
      component: resolve => require(['@/components/system/role/index'],resolve),
      meta: { // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
      }
    },
    {
      path: '/system/role/form',
      name: 'system-role-form',
      component: resolve => require(['@/components/system/role/form'],resolve),
      meta: { // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
      }
    },
    {
      path: '/system/dept',
      name: 'system-dept',
      component: resolve => require(['@/components/system/dept/index'],resolve),
      meta: { // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
      }
    },
    {
      path: '/system/dept/form',
      name: 'system-dept-form',
      component: resolve => require(['@/components/system/dept/form'],resolve),
      meta: { // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
      }
    },
    {
      path: '/system/proitem',
      name: 'system-proitem',
      component: resolve => require(['@/components/system/proitem/index'],resolve),
      meta: { // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
      }
    },
    {
      path: '/system/proitem/form',
      name: 'system-proitem-form',
      component: resolve => require(['@/components/system/proitem/form'],resolve),
      meta: { // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
      }
    },
    {
      path: '/my/partner',
      name: 'system-partner',
      component: resolve => require(['@/components/my/partner'],resolve),
      meta: { // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
      }
    },
    {
      path: '/my/product',
      name: 'my-product',
      component: resolve => require(['@/components/my/product'],resolve),
      meta: { // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
      }
    },
    {
      path: '/my/project',
      name: 'my-project',
      component: resolve => require(['@/components/my/project'],resolve),
      meta: { // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
      }
    },
    {
      path: '/my/other',
      name: 'my-other',
      component: resolve => require(['@/components/my/other'],resolve),
      meta: { // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
      }
    }
  ]
})
