import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home/index.vue'
import Article from '../views/ArticlePage/index.vue'
import Publish from '../views/Publish/index.vue'
import Me from '../views/Me/index.vue'
import Register from '../views/Register/index.vue'
import Login from '../views/Login/index.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [],
  },
  {
    path: '/article/:id',
    name: 'article',
    component: Article,
  },
  {
    path: '/publish',
    name: 'publish',
    component: Publish,
  },
  {
    path: '/me',
    name: 'name',
    component: Me,
  },
  {
    path: '/setting',
    component: () => import('../views/Me/Setting/index.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  // 判断有没有登录
  if (!localStorage.getItem('token')) {
    if (to.name == 'login' || to.name == 'home') {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
})
export default router
function Notify(arg0: { type: string; message: string }) {
  throw new Error('Function not implemented.')
}
