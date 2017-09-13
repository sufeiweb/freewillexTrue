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
Vue.prototype.$URL_API = 'https://zhmobile.firstcoinex.com/fwex/web/';
// Vue.prototype.$URL_API = 'https://kaifamobile.firstcoinex.com/fwex/web/';
// Vue.prototype.$URL_API = 'http://192.168.1.48:8089/fwex/web/';
var $API = 'https://zhmobile.firstcoinex.com:9092/';
// var $API = 'https://kaifamobile.firstcoinex.com:9092/';

/**
 * 发送事件
 * @param key
 * @param value
 */
Vue.prototype.sendEvent = function (key, value) {
  var event = new Event(key);
  event.newValue = value;
  window.dispatchEvent(event);
};

Vue.use(ElementUI);

Vue.config.productionTip = false;
//全局过滤器的注册
import filters from './filters'
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));
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
router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.auth)) {
    if (store.state.loginState) {
      next()
    } else {
      next({path: '/login', query: {Rurl: to.fullPath}})
    }
  } else {
    next()
  }
});

var oriSetItem = localStorage.setItem;
localStorage.setItem = function (key, value) {
  //这里抛出自定义事件
  if (key && key === 'commodity') {
    var event = new Event("setItemEvent");
    event.newValue = value;
    window.dispatchEvent(event);
    console.log('切换品种' + value);
  }

  //实现原方法
  oriSetItem.apply(this, arguments);
}


let socket;
socket = io($API);

socket.on('connect', function () {
  console.log('连接上socket, 发送消息request:' + localStorage.getItem('commodity'));
  socket.emit('request', localStorage.getItem('commodity'));
  if (store.state.loginState) {
    socket.emit('entrust', sessionStorage.getItem('accountId'));
  }
  subscribe(localStorage.getItem('commodity'));
});
socket.on('disconnect', function () {
  console.log('断开socket');
});

//切换品种事件监听
window.addEventListener("setItemEvent", function (e) {
  console.log('socket, 发送消息request:' + e.newValue);
  socket.emit('request', e.newValue);
  subscribe(e.newValue);
});

//登录事件监听
window.addEventListener("login", function (e) {
  console.log('socket, 发送消息:entrust');

  socket.emit('entrust', sessionStorage.getItem('accountId'));

});

//退出登录事件监听
window.addEventListener("logout", function (e) {
  socket.removeListener('entrust');
});

//切换周期事件监听
window.addEventListener("switchPeriod", function (e) {
  socket.removeListener('entrust');
  socket.emit('entrust', sessionStorage.getItem('accountId'));
});

function subscribe(commodity) {

  socket.removeAllListeners();

  //最新价
  {
    let commodityAll = localStorage.getItem('commodityAll').split(',');
    for (let c in commodityAll) {
      let cc = commodityAll[c];
      socket.on('/market/latestPrice/' + cc, function (json) {
        // console.log(json.data)
        store.state.businessPrice.name = cc;
        store.state.businessPrice.data.set(cc, json.data);
        if (cc === commodity) {
          var event = new Event("latestPrice");
          event.newValue = json.data;
          window.dispatchEvent(event);
        }
        // console.log(store.state.businessPrice.data.get(store.state.businessPrice.name))
      });
    }

  }
  //盘口
  {
    socket.on('/market/depth/' + commodity, function (json) {
      store.state.depth = json.data;
      // console.log(json.data);
      var event = new Event("depthData");
      event.newValue = json.data;
      window.dispatchEvent(event);
      if (json.data) {
        if (json.data.s.length > 0 && json.data.b.length > 0) {
          store.state.chaPrice = (json.data.s[json.data.s.length - 1].price - json.data.b[0].price);
        } else {
          store.state.chaPrice = 0;
        }
      }
    });
  }
  //交易流水
  {
    socket.on('/market/trades/' + commodity, function (json) {
      // console.log(json.data.length);
      if (json.data.length > 100) {
        store.state.trades = json.data.slice(0, 100);
      } else {
        store.state.trades = json.data;
      }
    });
  }
  //当前委托
  {
    socket.on('/market/entrust/' + commodity, function (json) {
      store.state.weiTuo = json.data;


      // console.log(json.data);
    })
  }
  // k线
  {
    socket.on('/market/kline/' + localStorage.getItem('timers') + '/' + commodity, function (json) {
      //推送切换周期后没有注销原来的 导致时间不一致
      sessionStorage.setItem('quotation', json.data)
    })
  }

  //资金详情
  {
    let _this = this;
    socket.on('/capital/info', function (json) {
      // console.log('监听到资产信息');
      var event = new Event("userCapital");
      window.dispatchEvent(event);
    })
  }
}


