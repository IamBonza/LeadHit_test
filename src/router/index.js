import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/LoginPage.vue'
import store from  '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LoginPage.',
    component: Home
  },
    // установка промежуточного слоя для проверки авторизации
    // эта страница доступна только для авторизованных пользователей
  {
    path: '/analytics',
    name: 'AnanliticsPage',
    meta: {
      requiresAuth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AnanliticsPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// если объект meta содержит поле requiresAuth, то мы добавляем проверку на авторизацию.
router.beforeEach(async (to, from, next) => {

  if(to.matched.some(record => record.meta.requiresAuth)) {
    const siteId = localStorage.getItem('siteId')
    //при наличии ключа переходим далее
    if (siteId && siteId.length === 24) {
      // проверяем siteID через API
      const isAuth = await store.dispatch('login', siteId)
      //если авторизация успешная, переходим на страницу
      if (isAuth) {
        next()
        return
      }

    }
    // при отсутствии ключа возвращаемся на страницу входа
    next('/')
  } else {
    next()
  }
})

export default router
