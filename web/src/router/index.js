import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/index';
import main from '@/components/main/index';
import day from '@/components/day/index';
import dayForm from '@/components/day/form';
import statistics from '@/components/statistics/index';
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/main',
      name: 'main',
      component: main,
      redirect: '/main/day',
      meta: { // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
      },
      children: [
        {
          path: 'day',
          name: 'day',
          component: day,
          meta: { // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
          }
        },
        {
          path: 'statistics',
          name: 'statistics',
          component: statistics,
          meta: { // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
          }
        }
      ]
    },
    {
      path: '/day-form',
      name: 'day-form',
      component: dayForm,
      meta: { // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
      }
    }
  ]
})
