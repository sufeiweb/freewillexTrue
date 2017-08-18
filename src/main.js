// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'animate.css'
import router from './router'
import  store from './store'
import  echarts from 'echarts'
import axios from 'axios';
import Common from './Common';
import 'babel-polyfill';
Vue.use(Common);

// import VueResource from 'vue-resource'
// Vue.use(VueResource);
Vue.prototype.$echarts = echarts;
Vue.prototype.$http = axios;

Vue.use(ElementUI);

Vue.config.productionTip = false;
//全局过滤器的注册
import filters from './filters'
Object.keys(filters).forEach(key=>Vue.filter(key,filters[key]));
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, store,
  template: '<App/>',
  components: {App}
});
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});
router.beforeEach((to,from,next)=>{
  if(to.matched.some( m => m.meta.auth)){
    if(store.state.loginState){
      next()
    }else{
      next({path:'/login',query:{Rurl:to.fullPath}})
    }
  }else{
    next()
  }
});
var stompClient = null;
disconnect();
connect();
function connect() {
  var socket = new SockJS('http://192.168.1.48:8089/fwex/endpointSang');
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function(frame) {
    // 最新价
    stompClient.subscribe('/market/BTCCNY/latestPrice', function(response) {
      store.state.LatestPrice=JSON.parse(response.body).data
    });
    // 交易流水
    stompClient.subscribe('/market/BTCCNY/trades', function(response) {
      store.state.trades=JSON.parse(response.body).data;
    });
    // 盘口信息
    stompClient.subscribe('/market/BTCCNY/depth', function(response) {
      store.state.depth=JSON.parse(response.body).data;
    });
  });
}
function disconnect() {
  if (stompClient != null) {
    stompClient.disconnect();
  }
}
