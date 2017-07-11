<template>
  <div class="login">
      <div class="login-box layout">
        <img src="../assets/img/login/login_bg.jpg"/>
        <div class="login-box-content">
            <p class="title">登录</p>
            <form name="user_login">
              <div class="form-group">
                <div class="input-icon">
                  <i class="iconfont">&#xe639;</i>
                  <input class="form-control" type="text" autocomplete="off" placeholder="手机号码/邮箱" name="userName" id="userName" maxlength="32"/>
                </div>
                <div class="help-tips"></div>
              </div>
              <div class="form-group">
                <div class="input-icon">
                  <i class="iconfont">&#xe631;</i>
                  <input class="form-control" type="password" autocomplete="off" placeholder="密码" name="userPassword" id="userPassword" maxlength="32"/>
                </div>
                <div class="help-tips"></div>
              </div>
            </form>
        </div>
      </div>
  </div>
</template>
<style>
  .login{
    width: 100%;
    height: 51.667rem;
    overflow: hidden;
    background: #0397DD;
  }
  .login-box{
    position: relative;
  }
  .login-box-content{
    position: absolute;
    right: 2rem;
    width: 28.33rem;
    top: 5.417rem;
    background-color: rgba(0,0,0,.6);
    padding: 1.667rem 0;
  }
  .form-group{
    box-sizing: border-box;
    margin-bottom: 1.25rem;
  }
  .input-icon{
    background: #fff;
    width: 100%;
    display: flex;
    align-items: center;
    left: 0;
  }
  .input-icon>i {
    color: #ccc;
    z-index: 3;
    font-size: 1.33rem;
  }

  .input-icon>.form-control {
    width: 100%;
    padding-left: 2.75rem;
  }

  .form-control {
    padding: 0.667rem 1rem;
  }
</style>
