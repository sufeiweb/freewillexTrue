<template>
  <div class="login">
    <div class="login-box layout">
      <img src="../assets/img/login/login_bg.jpg"/>
      <div class="login-box-content">
        <div class="login-header">
          <p class="title" v-if="login_style1">登录</p>
          <p class="title" v-if="!login_style1">使用FreeWillex APP扫码</p>
          <img src='../../src/assets/img/login/login_scan.png' alt="" v-show="login_style1" @click="login_style()">
          <img src='../../src/assets/img/login/login_form.png' alt="" v-show="!login_style1" @click="login_style()">
        </div>
        <form name="user_login" v-if="login_style1">
          <div class="form-group">
            <div class="input-icon">
              <i class="iconfont">&#xe639;</i>
              <input class="form-control" type="text" autocomplete="off" placeholder="手机号码 / 邮箱" name="userName"
                     id="userName" maxlength="32"/>
            </div>
            <div class="help-tips"></div>
          </div>
          <div class="form-group">
            <div class="input-icon">
              <i class="iconfont">&#xe631;</i>
              <input class="form-control" type="password" autocomplete="off" placeholder="密码" name="userPassword"
                     id="userPassword" maxlength="32"/>
            </div>
            <div class="help-tips"></div>
          </div>
          <div class="form-group-checkbox">
            <input type="checkbox" id="remember"/><label for="remember">记住用户名</label>
          </div>
          <div class="form-group">
            <input type="button" value="登录" class="login-btn"/>
          </div>
          <div class="login-footer">
            <div class="password-retrieval">
              <a href="javascript:;">找回密码</a>
            </div>
            <div class="register">
              <a href="javascript:;">注册</a>
            </div>
          </div>
        </form>
        <form name="user_login" v-if="!login_style1">
          <div class="text-center">
            <div class="qr-code-box">
              <span id="qr-code" class="login-qr-code">
                <img src="../../src/assets/img/login/login_fcex.png" alt="">
              </span>
            </div>
            <p class="qr-code-footer"><a href="javascript:;" class="qr-code-footer-mobile">下载FreeWillex APP</a></p>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default {
    data() {
      return {
        login_style1: true
      }
    },
    methods: {
      login_style() {
        this.login_style1 = !this.login_style1;
        return false;
      }
    }
  }
</script>
<style>
  .login {
    width: 100%;
    height: 51.667rem;
    overflow: hidden;
    background: #0397DD;
  }

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

  .login-box-content {
    position: absolute;
    right: 2rem;
    width: 28.33rem;
    top: 5.417rem;
    background-color: rgba(0, 0, 0, .6);
    padding: 1.667rem 0;
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
  .text-center{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .qr-code-box{
    margin: 2rem 0;
  }
 .qr-code-footer-mobile {
    color: #b3b3b3;
   font-size: 1.33rem;
   text-decoration: underline;
  }
  .qr-code-footer-mobile:hover{
    color: #5b9bd1;
  }
</style>
