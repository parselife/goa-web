import Vue from 'vue'
import VueRouter from 'vue-router'
import {axiosInstance} from '../plugins/axios'

import routes from './routes'

import {SessionStorage} from 'quasar'

Vue.use(VueRouter)

const IS_ADMIN = "isAdmin"

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({y: 0}),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  // 路由跳转前验证
  Router.beforeEach((to, from, next) => {
    if (to.path.startsWith('/admin')) {
      if (SessionStorage.has(IS_ADMIN)) {
        next()
      } else {
        axiosInstance.get('/user/me').then(({data}) => {
          if (data.hasOwnProperty('success')) {
            console.warn('get user error: %s', data.msg)
            next({path: '/403', replace: true})
          } else {
            if (data.isAdmin) {
              SessionStorage.set(IS_ADMIN, true)
              next()
            } else {
              next({path: '/403', replace: true})
            }
          }

        }).catch(err => {
          console.error('get user error: %o', err)
          next({path: '/403', replace: true})
        })
      }
    } else {
      next()
    }
  })

  return Router
}
