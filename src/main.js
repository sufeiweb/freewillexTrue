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
