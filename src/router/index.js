import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import introduction from '@/components/introduction'
import login from '@/components/login'
import register from '@/components/register'
import userAgreement from '@/components/text_components/userAgreement'
import business from '@/components/business'
import passwordRetrieval from '@/components/passwordRetrieval'

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/', name: 'home', component: home},
    {path: '/login', name: 'login', component: login},
    {path: '/register', name: 'register', component: register},
    {path: '/passwordRetrieval', name: 'passwordRetrieval', component: passwordRetrieval},
    {path: '/introduction', name: 'introduction', component: introduction},
    {path: '/userAgreement', name: 'userAgreement', component: userAgreement},
    {path: '/business', name: 'business', component: business},
  ]
})
