<template>
  <div class="TKLogin">
    <div class="zhezhao"></div>
    <div class="TKLogin-box">
      <i class="iconfont" @click="TKShowFalse()">&#xe650;</i>
      <p class="title">帐号登录</p>
      <div><span>用户名</span><input type="text" placeholder="请输入手机号码/邮箱" v-model="userNameTK"/></div>
      <div><span>密码</span><input type="password" placeholder="请输入登录密码" v-model="userPsdTK"/></div>
      <section>
        <button @click="loginStart()">登录</button>
      </section>
      <section>
        <router-link to="/register">快速注册</router-link>
        <router-link to="/passwordRetrieval">找回密码</router-link>
      </section>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default {
    data() {
      return {
        userNameTK: '',
        userPsdTK: ''
      }
    },
    mounted(){
      this.userNameTK = localStorage.getItem('username') ? localStorage.getItem('username') : '';
    },
    methods: {
      loginStart() {
        let that = this;
        if (this.userNameTK && this.userPsdTK) {
          that.$http({
            url: 'https://kaifamobile.firstcoinex.com/fwex/web/auth/login',
            method: 'POST',
            data: {
              "loginUser": that.userNameTK,
              "loginPwd": md5(that.userPsdTK)
            },
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/json;charset=UTF-8",
            }
          }).then(function (data) {
            that.showError(data.data.code, data.data.message);
            if (data.data.code === 200) {
              that.$store.dispatch('loginStateTrue');
              sessionStorage.setItem('token', data.data.data);
              that.$store.state.loginTrue = true;
              that.$store.state.TKShow = false;
              that.$store.state.token = data.data.data;
            }
          }).catch((req) => {
            that.showError(req.code, req.message);
            that.$store.dispatch('loginStateFalse');
          })
        }
      },
      TKShowFalse(){
        this.$store.state.TKShow = false;
      }
    }
  }
</script>
<style scoped>
  .TKLogin {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 99;
    top: 0
  }

  .TKLogin .zhezhao {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #000;
    top: 0;
    opacity: .5;
  }

  .TKLogin-box {
    position: absolute;
    background: #fff;
    width: 300px;
    height: 300px;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    padding: 2rem;
    border-radius: 2px;
  }

  .TKLogin-box p.title {
    font-size: 1.833rem;
    text-align: center;
    margin-bottom: 2.5rem;
  }

  .TKLogin-box i {
    position: absolute;
    right: 1rem;
    tOp: 1rem;
    cursor: pointer;
  }

  .TKLogin-box div {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding: 1.25rem 0;
    margin-bottom: 1.25rem;
  }

  .TKLogin-box div:nth-of-type(2) {
    margin-bottom: 1.5rem;
  }

  .TKLogin-box div > span {
    width: 50px;
    text-align: right;
    margin-right: 2rem;
    font-size: 1.333rem;
  }

  .TKLogin-box div > input {
    border: none;
    outline: none;
  }

  .TKLogin-box section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 0;
  }

  .TKLogin-box section > button {
    background: #01aaef;
    color: #fff;
    border: none;
    outline: none;
    width: 100%;
    padding: 1rem 0;
    border-radius: 2px;
    font-size: 1.333rem;
    letter-spacing: 5px;
    cursor: pointer;
  }

  .TKLogin-box section > button:hover {
    background: #0191cb;
  }

  .TKLogin-box section a {
    font-size: 1.167rem;
  }

  .TKLogin-box section a:nth-of-type(1) {
    color: #01aaef;
  }

  .TKLogin-box section a:hover {
    color: #01aaef;
    text-decoration: underline;
  }
</style>
