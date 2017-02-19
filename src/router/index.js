import Vue from 'vue'
import Router from 'vue-router'
import googs from 'components/goods/goods'
import seller from 'components/seller/seller'
import ratings from 'components/ratings/ratings'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/googs',
      component: googs
    },
    {
      path: '/seller',
      component: seller
    },
    {
      path: '/ratings',
      component: ratings
    },
    {
      path: '/',
      redirect: '/googs'
    }
  ]
})
