<template>
  <div class="app">
    <topHeader v-show="TopHeaderStyle"></topHeader>
    <transition enter-active-class="animated fadeIn">
      <router-view></router-view>
    </transition>
    <footers v-show="FooterStyle"></footers>
    <Tips></Tips>
    <signLog v-if="signShowOrHide"></signLog>
    <goTop v-show="ShowOrHide"></goTop>
  </div>
</template>

<script>
  import topHeader from './components/topHeader.vue';
  import footers from './components/footer.vue';
  import Tips from './components/text_components/tips.vue';
  import goTop from './components/lettle_components/goTop.vue';
  import signLog from './components/lettle_components/signLog.vue';

  import {mapGetters} from 'vuex';
  export default {
    data(){
      return {
        dt: 0,
        url: ''
      }
    },
    components: {
      topHeader, footers, Tips, goTop, signLog
    },
    computed: mapGetters(
      ['TopHeaderStyle', 'FooterStyle', 'ShowOrHide', 'signShowOrHide']
    ),
    watch: {
      $route(to) {
        this.routeChange(to.path);
      },
    },
    methods: {
      swted(num){
        $('.nav-link-box li').find('a').css({
          borderBottom: 'none',
          color: '#333'
        });
        $('.nav-link-box li').eq(num).find('a').css({
          borderBottom: '2px solid #01aaef',
          color: '#01aaef'
        });
        sessionStorage.setItem('url', window.location.href)
      },
      routeChange(path) {
        path = path.substring(1);
        if (path === 'quotation') {
          this.$store.dispatch('hideHeader');
          this.$store.dispatch('hideFooter');
        } else {
          this.$store.dispatch('showHeader');
          this.$store.dispatch('showFooter');
        }
        if (path === 'quotation') {
          this.swted(1);
        }
        if (path === 'home') {
          this.swted(0)
        }
        if (path === 'businessCNYAccount') {
          this.$store.state.Account = 'CNY';
          this.swted(2)
        }
        if (path === 'businessBTCAccount') {
          this.$store.state.Account = 'BTC';
          this.swted(2)
        }
        if (path.indexOf('activity') !== -1) {
          this.swted(3)
        } else {
          this.swted(4)
        }
        if (path === 'userIndex') {
          this.swted(4)
        }
        if (path === 'userIndex1') {
          this.swted(4)
        }
      },
      getScrollTop() {
        var scrollPos;
        if (window.pageYOffset) {
          scrollPos = window.pageYOffset;
        }
        else if (document.compatMode && document.compatMode != 'BackCompat') {
          scrollPos = document.documentElement.scrollTop;
        }
        else if (document.body) {
          scrollPos = document.body.scrollTop;
        }
        this.dt = scrollPos;
      },
      getCommodityAll(){
        this.$http({
          url: this.$URL_API + 'quotation/offerPrice',
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.coinStyle = res.data.data;
            let commodityAll = [];
            this.$store.state.trades = [];
            for (let i = 0; i < res.data.data.length; i++) {
              commodityAll.push(res.data.data[i].commodity);
            }
            localStorage.setItem('commodityAll', commodityAll);
          }
        })
      },

    },
    mounted(){
      let newValue = this.url = sessionStorage.getItem('url');
      if (sessionStorage.getItem('url')) {
        if (newValue.indexOf('home') !== -1) {
          this.swted(0);
        }
        if (newValue.indexOf('businessCNYAccount') !== -1 || newValue.indexOf('businessBTCAccount') !== -1) {
          this.swted(2);
        }
        if (newValue.indexOf('userIndex') !== -1 || newValue.indexOf('userIndex') !== -1) {
          this.swted(4)
        }
        if (newValue.indexOf('activity') !== -1) {
          this.swted(3)
        }
      }
      let _this = this;
      if (!localStorage.getItem('commodityAll')) {
        this.getCommodityAll();
      }
      $(window).scroll(function () {
        _this.getScrollTop();
        if (_this.dt > 720) {
          _this.$store.state.ShowOrHide = true;
        } else {
          _this.$store.state.ShowOrHide = false;
        }
      });
      if (!localStorage.getItem('commodity')) {
        localStorage.setItem('commodity', 'BTCCNY');
      }
      localStorage.setItem('timers', 'min1');


      //关闭浏览器，相当于退出登录；
      let url = window.location.href;
      if (url.indexOf('quotation') !== -1) {
        if (sessionStorage.getItem('MOBILE') || sessionStorage.getItem('EMAIL')) {
        } else {
          localStorage.removeItem('token')
        }
      }
      //自动登录，刷新登录
      if (localStorage.getItem('token') && !this.$store.state.loginState) {
        this.$http({
          url: this.$URL_API + 'auth/login',
          method: 'POST',
          data: {
            "loginUser": localStorage.getItem('userName'),
            "loginPwd": localStorage.getItem('userPsd')
          },
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json;charset=UTF-8",
            "source": 'WEB'
          }
        }).then(function (data) {
          if (data.data.code === 200) {
            _this.$store.dispatch('loginStateTrue');
            _this.$store.state.loginTrue = true;
            _this.$store.state.realName.userPsd = true;
            _this.$store.state.token = data.data.data;
            _this.sendEvent('login', '');
            let loginPattern = /0?^(13|14|15|18|17)[0-9]{9}/;
            if (loginPattern.test(localStorage.getItem('userName'))) {
              _this.$store.state.realName.userPhone = true;
              _this.$store.state.realName.userPhoneNum = localStorage.getItem('userName');
            } else {
              _this.$store.state.realName.userEmail = true;
              _this.$store.state.realName.userEmailNum = localStorage.getItem('userName');
            }
          }
        })
      } else if (!localStorage.getItem('token')) {
        localStorage.removeItem('token');
        localStorage.removeItem('userPsd');
        localStorage.removeItem('userName');
        _this.$store.state.token = '';
        _this.$store.state.loginTrue = false;
        _this.$store.dispatch('loginStateFalse');
        _this.sendEvent('logout', '');
      }

    },
  }
</script>
<style>
  .app {
    height: 100%;
  }
</style>
