import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载

const home = () => import('../views/home/Home')
const cart = () => import('../views/cart/Cart')
const Me = () => import('../views/me/Me')
const category = () => import('../views/category/Category')
const Detail = () => import('../views/detail/Detail')
Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect:'/home'
  },{
    path: '/home',
    component: home
  },{
    path:'/cart',
    component: cart
  },{
    path:'/category',
    component: category
  },{
    path:'/me',
    component: Me
  },{
    path:'/detail/:iid',
    component:Detail
  }
]
const router = new VueRouter({
  routes,
  // url模式
  mode:'history'
})

export default router
