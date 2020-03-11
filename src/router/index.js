import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: () => import('@/views/login') },
  { path: '/home', name: 'home', component: () => import('@/views/home') }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 获取用户登录状态信息
  const userinfo = window.sessionStorage.getItem('userinfo')
  // 登录状态是大字符串, 非登录状态userinfo是null
  if (!userinfo && to.path !== '/login') {
    // 强制跳到登录页面
    return next('/login')
  }
  // 放行
  next()
})

export default router
