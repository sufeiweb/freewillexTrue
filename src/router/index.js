import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import introduction from '@/components/introduction'
import login from '@/components/login'

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/', name: 'home', component: home},
    {path: '/login', name: 'login', component: login},
    {path: '/introduction', name: 'introduction', component: introduction}
  ]
})
