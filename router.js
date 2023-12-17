import Vue from 'vue'
import VueRouter from 'vue-router'
import TestPage from './pages/test/test' // 请根据实际的路径修改

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'TestPage',
    component: TestPage
  },
  // 添加其他页面路由...
]

const router = new VueRouter({
  routes
})

export default router
