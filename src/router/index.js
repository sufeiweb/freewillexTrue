import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import introduction from '@/components/introduction'
import login from '@/components/login'
import register from '@/components/register'
import userAgreement from '@/components/text_components/userAgreement'
import business from '@/components/business'
import passwordRetrieval from '@/components/passwordRetrieval'
import businessCNYAccount from '@/components/business/businessCNYAccount'
import businessBTCAccount from '@/components/business/businessBTCAccount'
// import entrust from '@/components/business/entrust'
// import transactionRecord from '@/components/business/transactionRecord'
// import lever from '@/components/business/lever'
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
import userDetail from '@/components/real/realDetail'
import bindPhone from '@/components/lettle_components/bindPhone'
import bindEmail from '@/components/lettle_components/bindEmail'
import bindFullPsd from '@/components/lettle_components/bindFullPsd'
import modifyPsd from '@/components/lettle_components/modifyPsd'
import modifyFullPsd from '@/components/lettle_components/modifyFullPsd'
import rechargeLog from '@/components/lettle_components/rechargeLog'
import rechargeList from '@/components/lettle_components/rechargeList'
import addBankCard from '@/components/lettle_components/addBankCard'
import addBTCAdr from '@/components/lettle_components/addBTCAdr'
import cashLog from '@/components/lettle_components/cashLog'


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
    {path: '/broker', name: 'quotation', component: broker, meta: {auth: true}},
    {path: '/userAgreement', name: 'userAgreement', component: userAgreement, meta: {auth: true}},
    {
      path: '/business', name: 'business', component: business, meta: {auth: true}, children: [
      {path: '/businessCNYAccount', name: 'businessCNYAccount', component: businessCNYAccount, meta: {auth: true}},
      {path: '/businessBTCAccount', name: 'businessBTCAccount', component: businessBTCAccount, meta: {auth: true}},
      {path: '/', redirect: '/businessCNYAccount'},
      // {path: '/entrust', name: 'entrust', component: entrust, meta: {auth: true}},
      // {path: '/transactionRecord', name: 'transactionRecord', component: transactionRecord, meta: {auth: true}},
      // {path: '/lever', name: 'lever', component: lever, meta: {auth: true}}
    ]
    },
    {
      path: '/user', name: 'user', component: user, children: [
      {path: '/userIndex', name: 'userIndex', component: userIndex, meta: {auth: true}},
      {path: '/userIndex1', name: 'userIndex1', component: userIndex1, meta: {auth: true}},
      {path: '/', redirect: '/userIndex'},
      {path: '/accountDetails', name: 'accountDetails', component: accountDetails, meta: {auth: true}},
      {path: '/accountManagement', name: 'accountManagement', component: accountManagement, meta: {auth: true}},
      {path: '/accountManagement/addBTCAdr', name: 'addBTCAdr', component: addBTCAdr, meta: {auth: true}},
      {path: '/accountManagement/addBankCard', name: 'addBankCard', component: addBankCard, meta: {auth: true}},
      {path: '/cash', name: 'cash', component: cash, meta: {auth: true}},
      {path: '/cash/cashLog', name: 'cashLog', component: cashLog, meta: {auth: true}},
      {path: '/loginLog', name: 'loginLog', component: loginLog, meta: {auth: true}},
      {path: '/message', name: 'message', component: message, meta: {auth: true}},
      {path: '/recharge', name: 'recharge', component: recharge, meta: {auth: true}},
      {path: '/recharge/rechargeLog', name: 'rechargeLog', component: rechargeLog, meta: {auth: true}},
      {path: '/recharge/rechargeList', name: 'rechargeList', component: rechargeList, meta: {auth: true}},
      {path: '/reward', name: 'reward', component: reward, meta: {auth: true}},
      {path: '/settings', name: 'settings', component: settings, meta: {auth: true}},
      {path: '/settings/user', name: 'realNameAuthentication', component: realNameAuthentication, meta: {auth: true}},
      {path: '/settings/user/userDetail', name: 'userDetail', component: userDetail, meta: {auth: true}},
      {path: '/settings/bindPhone', name: 'bindPhone', component: bindPhone, meta: {auth: true}},
      {path: '/settings/bindEmail', name: 'bindEmail', component: bindEmail, meta: {auth: true}},
      {path: '/settings/bindFullPsd', name: 'bindFullPsd', component: bindFullPsd, meta: {auth: true}},
      {path: '/settings/modifyPsd', name: 'modifyPsd', component: modifyPsd, meta: {auth: true}},
      {path: '/settings/modifyFullPsd', name: 'modifyFullPsd', component: modifyFullPsd, meta: {auth: true}},
    ]
    }
  ]
})
