import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue'),
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/Layout/index.vue'),
    children: [
      {
        path: '/',
        redirect: '/homes'
      },
      {
        path: '/homes',
        name: 'homes',
        component: () => import('@/views/Home/index.vue')
      },
      {
        path: '/smokes',
        name: 'smokes',
        component: () => import('@/views/Smoke/index.vue'),
        children: [
          {
            path: '/smokes',
            redirect: 'building'
          },
          {
            path: 'building',
            name: "building",
            component: () => import('@/views/Smoke/Building')
          },
          {
            path: 'floor',
            name: "floor",
            component: () => import('@/views/Smoke/Floor')
          },
          {
            path: 'list',
            name: "list",
            component: () => import('@/views/Smoke/List')
          },
        ]
      }
    ]
  },

]

//避免到当前位置的冗余导航

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
