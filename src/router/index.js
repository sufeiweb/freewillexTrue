import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import introduction from '@/components/introduction'
import login from '@/components/login'
import register from '@/components/register'
import userAgreement from '@/components/text_components/userAgreement'
import business from '@/components/business'
import passwordRetrieval from '@/components/passwordRetrieval'
import businessHome from '@/components/business/businessHome'
import entrust from '@/components/business/entrust'
import transactionRecord from '@/components/business/transactionRecord'
import lever from '@/components/business/lever'
import user from '@/components/user'
import accountDetails from '@/components/userHome/accountDetails'
import accountManagement from '@/components/userHome/accountManagement'
import cash from '@/components/userHome/cash'
import loginLog from '@/components/userHome/loginLog'
import message from '@/components/userHome/message'
import recharge from '@/components/userHome/recharge'
import reward from '@/components/userHome/reward'
import settings from '@/components/userHome/settings'
import userIndex from '@/components/userHome/userIndex'
import userIndex1 from '@/components/userHome/userIndex1'
import quotation from '@/components/quotation'
import broker from '@/components/broker'

import realNameAuthentication from '@/components/real/realNameAuthentication'
import bindEmail from '@/components/lettle_components/bindEmail'


Vue.use(Router);

export default new Router({
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', name: 'home', component: home},
    {path: '/login', name: 'login', component: login},
    {path: '/register', name: 'register', component: register},
    {path: '/passwordRetrieval', name: 'passwordRetrieval', component: passwordRetrieval},
    {path: '/introduction', name: 'introduction', component: introduction},
    {path: '/quotation', name: 'quotation', component: quotation},
    {path: '/broker', name: 'quotation', component: broker},
    {path: '/userAgreement', name: 'userAgreement', component: userAgreement},
    {
      path: '/business', name: 'business', component: business, children: [
      {path: '/businessHome', name: 'businessHome', component: businessHome},
      {path: '/', redirect: '/businessHome'},
      {path: '/entrust', name: 'entrust', component: entrust},
      {path: '/transactionRecord', name: 'transactionRecord', component: transactionRecord},
      {path: '/lever', name: 'lever', component: lever}
    ]
    },
    {
      path: '/user', name: 'user', component: user, children: [
      {path: '/userIndex', name: 'userIndex', component: userIndex},
      {path: '/userIndex1', name: 'userIndex1', component: userIndex1},
      {path: '/', redirect: '/userIndex'},
      {path: '/accountDetails', name: 'accountDetails', component: accountDetails},
      {path: '/accountManagement', name: 'accountManagement', component: accountManagement},
      {path: '/cash', name: 'cash', component: cash},
      {path: '/loginLog', name: 'loginLog', component: loginLog},
      {path: '/message', name: 'message', component: message},
      {path: '/recharge', name: 'recharge', component: recharge},
      {path: '/reward', name: 'reward', component: reward},
      {path: '/settings', name: 'settings', component: settings},
      {path: '/settings/user', name: 'realNameAuthentication', component: realNameAuthentication},
      {path: '/settings/bindEmail', name: 'bindEmail', component: bindEmail}
    ]
    }
  ]
})
