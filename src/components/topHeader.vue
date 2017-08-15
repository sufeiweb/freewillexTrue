<template>
  <div class="topHeader">
    <header>
      <div class="header layout">
        <div class="header_left">
          <img src="../../src/assets/img/header/fw_logo.png" alt=""/>
          <div class="header-data-box">
            <p>BTC/CNY<span class="header-span-ratio">-0.14%</span></p>
            <p><span class="header-span-price">8560.2</span>CNY</p>
          </div>
        </div>
        <div class="header-right">
          <div class="header-btn-box" v-show="!userId">
            <router-link to="/login" tag="button">登录</router-link>
            <router-link to="/register" tag="button">注册</router-link>
          </div>
          <div class="header-user-show" v-if="userId">
            <img src="../../src/assets/img/header/freeQuan.png" class="user-free" v-show="free" alt=""/>
            <a href="javascript:" class="user-box">
              <img src="../../src/assets/img/header/fw_header_user.png" class="user-img" alt=""/>
              <span class="user-phone">{{userNumM | phoneStar}}</span>
              <i class="el-icon-arrow-down">{{dd}}</i>
              <div class="user-M-box">
                <i class="iconfont">&#xe695;</i>
                <img src="../../src/assets/img/header/fw_header_user.png" class="user-img" alt=""/>
                <span class="user-m-name">{{userNameM}}</span>
                <span class="user-m-phone">{{userNumM | phoneStar}}</span>
                <span class="user-m-name">签到就送比特币</span>
                <div class="user-m-sign">
                  <a href="javascript:;">签到</a>
                  <div>
                    <span>07月07日</span>
                    <span>0.0000200BTC</span>
                  </div>
                </div>
                <ul class="user-m-ul">
                  <li><a href="javascript:;"><i class="iconfont">&#xe6d4;</i>消息管理</a></li>
                  <router-link to="/broker" tag="li"><a href="javascript:;"><i class="iconfont">&#xe6c5;</i>邀请朋友<img
                    src="../assets/img/header/fw_header_broker.png"/></a>
                  </router-link>
                  <li><a href="javascript:;" @click="quitLogin()"><i class="iconfont">&#xe6d3;</i>退出</a></li>
                </ul>
              </div>
            </a>
          </div>
        </div>
      </div>
    </header>
    <div class="nav layout">
      <div class="nav-left">
        <a href="javascript:" class="nav-notice-close"><i class="iconfont nav-notice-bell"
                                                          @click="notice_show_close()">&#xe6cc;</i></a>
        <span class="nav-notice" v-show="notice">123456455</span>
        <a href="javascript:" class="nav-notice-close nav-notice-close2" v-show="notice"><i
          class="iconfont nav-notice-close-icon" @click="notice_close()">&#xe650;</i></a>
      </div>
      <div class="nav-right">
        <ul class="nav-link-box">
          <router-link to="/home" tag="li" class="nav-link-item"><a href="javascript:">首页</a></router-link>
          <router-link to="/quotation" tag="li" class="nav-link-item"><a href="javascript:" target="_blank">行情</a>
          </router-link>
          <router-link to="/business" tag="li" class="nav-link-item"><a href="javascript:">买/卖</a></router-link>
          <!--<li class="nav-link-item"><a href="javascript:;">活动</a></li>-->
          <!--<li class="nav-link-item"><a href="javascript:;">资讯</a></li>-->
          <router-link to="/user" class="nav-link-item" tag="li"><a href="javascript:">账户</a></router-link>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from  'jquery';
  export default {
    data(){
      return {
        free: false,
        notice: true,
        userNameM: '',
        userNumM: '',
      }
    },
    methods: {
      notice_close() {
        this.notice = false;
      },
      notice_show_close() {
        $('.nav-notice').toggle();
        $('.nav-notice-close2').toggle();
        this.notice = true;
      },
      quitLogin() {
        sessionStorage.removeItem('token');
        this.$store.state.token = '';
        this.$store.state.loginTrue = false;
        this.$store.dispatch('loginStateFalse');
        this.$router.push('/login');
        this.userNameM = '';
        this.userNumM = '';
      },
    },
    computed: {
      userId() {
        return this.$store.state.loginState;
      },
      dd() {
        let that = this;
        if (this.$store.state.loginState) {
          that.$http({
            url: 'http://192.168.1.48:8089/fwex/web/account/info',
            method: 'GET',
            data: {},
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              'X-Authorization': 'Bearer ' + that.$store.state.token
            }
          }).then((res) => {
            this.showError(res.data.code, res.data.message);
            that.userNameM = res.data.data.userName;
            that.userNumM = res.data.data.loginUser;
            console.log(res, '请求成功')
          }).catch((req) => {
            that.quitLogin();
            console.log(req, '请求失败')
          })//获取用户信息
        }
      }
    },
    mounted() {
      let that = this;
      {
        if (localStorage.getItem('token')) {
          that.$store.state.loginState = true
        }
      }
      {
        if (sessionStorage.getItem('token')) {
          that.$store.dispatch('loginStateTrue');
          that.$store.state.loginTrue = true;
          that.$store.state.token = sessionStorage.getItem('token');
        } else {
          that.$store.dispatch('loginStateFalse');
          that.$store.state.token = '';
          that.$store.state.loginTrue = false;
        }
      }
    },
  }
</script>
<style scoped>
  .topHeader {
    background: #fff;
  }

  header {
    background: #2b3643;
  }

  .header {
    height: 7rem;
    color: #BCC2CB;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }

  .header_left {
    display: flex;
    align-items: center;
  }

  .header-data-box {
    margin-left: 5rem;
  }

  .header-data-box p {
    display: flex;
  }

  .header-data-box p:nth-of-type(1) {
    font-weight: bold;
    color: #ffffff;
  }

  .header-span-ratio {
    font-weight: normal;
    color: #00cc00;
    margin-left: 10px;
  }

  .header-span-price {
    color: #00cc00;
    margin-right: 10px;
  }

  .header-data-box p:nth-of-type(2) {
    font-size: 2rem;
  }

  .header-right {
    display: flex;
    align-items: center;
  }

  .header-right {
    display: flex;
    align-items: center;
  }

  .header-user-show {
    display: flex;
    align-items: center;
    position: relative;
  }

  .header-user-show > a {
    position: relative;
    padding: 1.5rem 0;
  }

  .user-free {
    margin-right: 1.5rem;
  }

  .user-box {
    display: flex;
    align-items: center;
    color: #BCC2CB;
  }

  .user-img {
    margin-right: 1.5rem;
    width: 3rem;
    border-radius: 50%;
  }

  .user-phone {
    margin-right: .5rem;
    color: #fff;
  }

  .nav {
    height: 4.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
  }

  .nav-left {
    display: flex;
    align-items: center;
    font-size: 1.4rem;
  }

  .nav-notice {
    margin: 0 .5rem 0 1rem;
  }

  .nav-notice-bell {
    color: #01aaef;
    font-size: 2rem;
  }

  .nav-notice-close-icon {
    color: #ee3523;
    font-size: 1.2rem;
  }

  .nav-right, .nav-link-item {
    height: 100%;
  }

  .nav-link-box {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .nav-link-item a {
    height: 100%;
    line-height: 4.5rem;
    padding: 0 1.5rem;
    font-size: 1.6rem;
  }

  .nav-link-item:nth-of-type(1) a {
    border-bottom: 2px solid #01aaef;
    color: #01aaef;
  }

  .nav-link-item a:hover {
    border-bottom: 2px solid #01aaef;
    color: #01aaef;
  }

  .header-user-show > a:hover .user-M-box {
    display: flex;
  }

  .user-M-box {
    display: none;
    position: absolute;
    background: #fff;
    top: 5.5rem;
    z-index: 99999;
    border: 1px solid #efefef;;
    width: 18rem;
    right: 5px;
    flex-direction: column;
    align-items: center;
    padding-top: 2rem;
    box-shadow: 5px 5px rgba(102, 102, 102, 0.1);
  }

  .user-M-box > i {
    position: absolute;
    color: #fff;
    top: -11px;
    right: 40px;
  }

  .user-M-box .user-img {
    margin: 0;
    width: 57px;
    margin-bottom: 0.833rem;
  }

  .user-M-box > span {
    font-size: 1.167rem;
  }

  .user-m-name {
    color: #01aaef;
  }

  .user-m-phone {
    margin-bottom: 10px;
    color: #333;
  }

  .user-m-sign {
    width: 100%;
    display: flex;
    padding: 1rem 1rem;
    box-sizing: border-box;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .user-m-sign a {
    height: 38px;
    line-height: 38px;
    width: 90px;
    text-align: center;
    font-size: 1.33rem;
    background: #01aaef;
    color: #fff;
  }

  .user-m-sign > div {
    border: 1px solid #ddd;
    width: 90px;
    color: #666;
    padding: 3px;
    box-sizing: border-box;
  }

  .user-m-ul {
    width: 100%;
  }

  .user-m-ul li a {
    width: 100%;
    padding: 8px 1rem;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    border-top: 1px solid #eee;
    font-size: 12px;
    color: #01aaef;
    font-weight: normal;
  }

  .user-m-ul li a i {
    color: #b4dfff;
    width: 23px;
    font-size: 1.333rem;
    margin-right: 8px;
  }

  .user-m-ul li a img {
    margin-left: 5rem;
  }

  .user-m-ul li:hover {
    background: #f0f0f0;
  }

  .header-btn-box {
    padding-right: 2rem;
  }

  .header-btn-box button {
    background: none;
    color: #fff;
    border: none;
    margin-left: 1rem;
    cursor: pointer;
    outline: none;
    padding: 0.5rem 1rem;
  }

  .header-btn-box button:nth-of-type(2) {
    border: 1px solid #01aaef;

  }

  .header-btn-box button:nth-of-type(2):hover {
    background: #01aaef;
  }
</style>
