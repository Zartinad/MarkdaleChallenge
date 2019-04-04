import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Address from '@/components/Address'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/address/:address',
      name: 'Address Profile',
      component: Address
    }
  ]
})
