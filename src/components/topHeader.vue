<template>
  <div class="topHeader">
    <header>
      <div class="header layout">
        <div class="header_left">
          <img src="../../src/assets/img/header/fw_logo.png"/>
          <div class="header-data-box">
            <p>BTC/CNY<span class="header-span-ratio">-0.14%</span></p>
            <p><span class="header-span-price">8560.2</span>CNY</p>
          </div>
        </div>
        <div class="header-right">
          <div class="header-btn-box" v-show="userId">
            <el-button type="primary">登录</el-button>
            <el-button type="primary">注册</el-button>
          </div>
          <div class="header-user-show" v-show="!userId">
            <img src="../../src/assets/img/header/freeQuan.png" class="user-free" v-if="free"/>
            <a href="javascript:;" class="user-box">
              <img src="../../src/assets/img/header/fw_header_user.png" class="user-img"/>
              <span class="user-phone">17602103949</span>
              <i class="el-icon-arrow-down"></i>
            </a>
          </div>
        </div>
      </div>
    </header>
    <div class="nav layout">
      <div class="nav-left">
        <a href="javascript:;" class="nav-notice-close"><i class="iconfont nav-notice-bell">&#xe6cc;</i></a>
        <span class="nav-notice">123456455</span>
        <a href="javascript:;" class="nav-notice-close"><i class="iconfont nav-notice-close-icon">&#xe650;</i></a>
      </div>
      <div class="nav-right">
        <ul class="nav-link-box">
          <li class="nav-link-item"><a href="javascript:;">首页</a></li>
          <li class="nav-link-item"><a href="javascript:;">行情</a></li>
          <li class="nav-link-item"><a href="javascript:;">买/卖</a></li>
          <!--<li class="nav-link-item"><a href="javascript:;">活动</a></li>-->
          <!--<li class="nav-link-item"><a href="javascript:;">资讯</a></li>-->
          <li class="nav-link-item"><a href="javascript:;">账户</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        userId: false,
        free: true
      }
    }
  }
</script>
<style>
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
    width: 3.5rem;
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

  .nav-link-item a:hover {
    border-bottom: 2px solid #01aaef;
    color: #01aaef;
  }
</style>
