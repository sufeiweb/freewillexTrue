<template>
  <div>
    <div class="login-box-content" v-show="!loginTrue">
      <div class="login-header">
        <p class="title" v-show="login_style1">登录</p>
        <p class="title" v-show="!login_style1">使用FreeWillex APP扫码</p>
        <img src='../../../src/assets/img/login/login_scan.png' alt="" v-show="login_style1" @click="login_style()">
        <img src='../../../src/assets/img/login/login_form.png' alt="" v-show="!login_style1" @click="login_style()">
      </div>
      <form name="user_login" v-show="login_style1">
        <div class="form-group">
          <div class="input-icon">
            <i class="iconfont">&#xe639;</i>
            <input class="form-control" type="text" autocomplete="off" placeholder="手机号码 / 邮箱" name="userName"
                   id="userName" maxlength="32" v-model="userName"/>
          </div>
          <div class="help-tips"></div>
        </div>
        <div class="form-group">
          <div class="input-icon">
            <i class="iconfont">&#xe631;</i>
            <input class="form-control" type="password" autocomplete="off" placeholder="密码" name="userPassword"
                   id="userPassword" maxlength="32" v-model="userPassword"/>
          </div>
          <div class="help-tips"></div>
        </div>
        <div class="form-group-checkbox">
          <input type="checkbox" id="remember"/><label for="remember">记住用户名</label>
        </div>
        <div class="form-group">
          <input type="button" value="登录" class="login-btn" @click="userLogin()"/>
        </div>
        <div class="login-footer">
          <div class="password-retrieval">
            <router-link to="/passwordRetrieval">找回密码</router-link>
            <!--<a href="javascript:;">找回密码</a>-->
          </div>
          <div class="register">
            <router-link to="/register">注册</router-link>
          </div>
        </div>
      </form>
      <form name="user_login" v-show="!login_style1">
        <div class="text-center">
          <div class="qr-code-box">
              <span id="qr-code" class="login-qr-code">
                <img src="../../../src/assets/img/login/login_fcex.png" alt="">
              </span>
          </div>
          <p class="qr-code-footer"><a href="javascript:" class="qr-code-footer-mobile">下载FreeWillex APP</a></p>
        </div>
      </form>

    </div>
    <div class="login-box-content login-show-box-user" v-show="loginTrue">
      <p class="title">登录{{getUserM}}</p>
      <section><span>您好，{{userLoginName | phoneStar}}</span><i class="iconfont" v-show="showMoney"
                                                               @click="showMoney=!showMoney">&#xe6a6;</i><i
        class="iconfont" v-show="!showMoney" @click="showMoney=!showMoney">&#xe692;</i></section>
      <section><span>总资产</span><span>￥</span><span v-show="showMoney">{{totalAssets}}</span><span
        v-show="!showMoney">--</span></section>
      <section><span>净资产</span><span>￥</span><span v-show="showMoney">{{netAssets}}</span><span
        v-show="!showMoney">--</span></section>
      <section>
        <router-link to="/business">买/卖</router-link>
      </section>
      <section>
        <router-link to="/recharge">充值</router-link>
        |


        <router-link to="/cash">提现</router-link>
      </section>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default {
    data() {
      return {
        login_style1: true,
        userName: '',
        userPassword: '',
        showMoney: true,
        userLoginName: '',
        totalAssets: '',
        netAssets: ''
      }
    },
    mounted() {
      let that = this;
      {
        if (localStorage.getItem('username')) {
          that.userName = localStorage.getItem('username');
          $('#remember').attr('checked', true);
          that.$store.state.login.remember = true;
        }
      }//获取localStorage
      {
        $('#remember').click(function () {
          that.$store.state.login.remember = $(this).is(':checked');
          if (that.$store.state.login.remember) {
            localStorage.setItem('username', that.userName);
          } else {
            localStorage.removeItem('username');
          }
        });
      }//记住密码
    },
    methods: {
      login_style() {
        this.login_style1 = !this.login_style1;
        return false;
      },//登录方式
      userLogin() {
        let that = this;
        if (that.userName && that.userPassword) {
          that.$http({
            url: 'https://kaifamobile.firstcoinex.com/fwex/web/auth/login',
            method: 'POST',
            data: {
              "loginUser": that.userName,
              "loginPwd": md5(that.userPassword)
            },
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/json;charset=UTF-8",
            }
          }).then(function (data) {
            that.showError(data.data.code, data.data.message);
            if(data.data.code===200){
              that.$store.dispatch('loginStateTrue');
              sessionStorage.setItem('token', data.data.data);
              that.$store.state.loginTrue = true;
              that.$store.state.realName.userPsd = true;
              that.$store.state.token = data.data.data;
              let loginPattern = /0?^(13|14|15|18|17)[0-9]{9}/;
              if (loginPattern.test(that.userName)) {
                that.$store.state.realName.userPhone = true;
                that.$store.state.realName.userPhoneNum = that.userName;
              } else {
                that.$store.state.realName.userEmail = true;
                that.$store.state.realName.userEmailNum = that.userName;
              }
              that.$router.push('/user');
            }
          }).catch((req) => {
            this.showError(req.code, req.message)
          })
        }
      },//帐号登录
    },
    computed: {
      loginTrue() {
        return this.$store.state.loginTrue;
      },
      getUserM() {
        let that = this;
        if (this.$store.state.loginTrue) {
          that.$http({
            url: 'https://kaifamobile.firstcoinex.com/fwex/web/account/info',
//            url: 'http://192.168.1.120:8089/fwex/web/account/info',
            method: 'GET',
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              'X-Authorization': 'Bearer ' + that.$store.state.token,
              'source': 'WEB',
              'Content-Type': 'application/json'
            }
          }).then((res) => {
            if(res.data.code!==200){
              this.showError(res.data.code, res.data.message);
            }
            if (res.data.code === 200) {
              that.userLoginName = res.data.data.loginUser;
            }
          }).catch((req) => {
            this.showError(req.code, req.message)
          })//获取用户信息
        }
      },
    }
  }
</script>
<style>

  .login-header {
    position: relative;
  }

  .login-header img {
    position: absolute;
    top: -1.667rem;
    right: 0;
    cursor: pointer;
  }

  .login-box {
    position: relative;
  }

  .login-show-box-user {
    color: #fff;
  }

  .login-box-content {
    position: absolute;
    right: 18%;
    width: 28.33rem;
    top: 5.417rem;
    background-color: rgba(0, 0, 0, .6);
    padding: 1.667rem 0;
    z-index: 999;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: 1.25rem;
  }

  .help-tips {
    width: 100%;
    height: 1.5rem;
  }

  .input-icon {
    width: 80%;
    background: #fff;
    display: flex;
    align-items: center;
    left: 0;
  }

  .input-icon > i {
    color: #ccc;
    z-index: 3;
    font-size: 1.33rem;
    padding-left: 1rem;
  }

  .input-icon > .form-control {
    padding: 1rem 1rem;
    border: 0;
    outline: none;
    width: 100%;
  }

  .login-box-content .title {
    font-size: 1.833rem;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #53514f;
    color: #e0dfde;
    text-align: center;
  }

  .form-group-checkbox {
    display: flex;
    color: #b3b3b3;
    font-size: 1rem;
    align-items: center;
    padding-top: 2rem;
  }

  .form-group-checkbox input {
    margin: 0 .3rem 0 2.767rem;
  }

  .login-btn {
    margin-top: .5rem;
    width: 80%;
    border-width: 0;
    padding: 0.75rem 1.167rem;
    font-size: 1.167rem;
    color: #FFFFFF;
    background: #01aaef;
    cursor: pointer;
  }

  .login-btn:hover {
    background: #0186bc;
  }

  .login-footer {
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 2.767rem;
    font-size: 1.167rem;
  }

  .login-footer a {
    color: #b3b3b3;
  }

  .login-footer a:hover {
    color: #5b9bd1;
    text-decoration: underline;
  }

  .text-center {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .qr-code-box {
    margin: 2rem 0;
  }

  .qr-code-footer-mobile {
    color: #b3b3b3;
    font-size: 1.33rem;
    text-decoration: underline;
  }

  .qr-code-footer-mobile:hover {
    color: #5b9bd1;
  }

  .login-show-box-user .title {
    margin-bottom: 1.25rem;
  }

  .login-show-box-user section {
    width: 80%;
    margin: 0 auto;
    margin-bottom: 3rem;
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #b3b3b3;
    min-height: 26px;
  }

  .login-show-box-user section:last-child {
    margin-bottom: 0;
    justify-content: center;
  }

  .login-show-box-user section a {
    color: #b3b3b3;
  }

  .login-show-box-user section i {
    cursor: pointer;
    font-size: 22px;
  }

  .login-show-box-user section:nth-of-type(1) {
    justify-content: space-between;
  }

  .login-show-box-user section:nth-of-type(1) > span {
    margin-left: 50px;
  }

  .login-show-box-user section:nth-of-type(2), .login-show-box-user section:nth-of-type(3) {
    align-items: flex-end;
  }

  .login-show-box-user section:nth-of-type(2) > span, .login-show-box-user section:nth-of-type(3) > span {
    color: #fff;
  }

  .login-show-box-user section:nth-of-type(2) > span:nth-of-type(1), .login-show-box-user section:nth-of-type(3) > span:nth-of-type(1) {
    color: #b3b3b3;
    margin-left: 1.5rem;
    margin-right: 2rem;
  }

  .login-show-box-user section:nth-of-type(2) > span:nth-of-type(3), .login-show-box-user section:nth-of-type(3) > span:nth-of-type(3) {
    font-size: 22px;
  }

  .login-show-box-user section:nth-of-type(4) {
    margin-bottom: 1.5rem;

  }

  .login-show-box-user section:nth-of-type(4) > a {
    width: 100%;
    background: #01aaef;
    color: #fff;
    padding: 9px;
    text-align: center;
    font-size: 1.167rem;
  }

  .login-show-box-user section:nth-of-type(4) > a:hover {
    background: #0186bc;
  }

  .login-show-box-user section:nth-of-type(5) > a {
    font-size: 1.167rem;
    margin: 0 0.5rem;
  }

  .login-show-box-user section:nth-of-type(5) > a:hover {
    color: #01aaef;
    text-decoration: underline;
  }
</style>
