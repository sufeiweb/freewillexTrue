<template>
  <div class="userIndex">
    <div class="userIndex-cash-header">
      <div class="header-nav">
        <a href="javascript:" class="header-nav-active" @click="management_style1()">银行卡管理</a>
        <a href="javascript:" @click="management_style2()">比特币地址管理</a>
      </div>
    </div>
    <div class="management-bank-box" v-show="management_style">
      <div class="management-bank bank">
        <div class="bank-logo">
          <img src="../../assets/img/banklogo/CMB.png" alt=""/>
          <i class="iconfont close-bank">&#xe676;</i>
        </div>
        <div class="bank-mess">
          <span>苏飞</span>
          <span>尾号 4412</span>
        </div>
      </div>
      <div class="management-bank add"><span>+</span><span>添加新卡</span></div>
    </div>
    <div class="management-BTC" v-show="!management_style">
      <div class="BTC-add-btn" @click="BTC_add()" v-show="btcAddBtn">
        <span>+</span>
        <span>添加地址</span>
      </div>
      <div class="BTC-add-content" v-show="!btcAddBtn">
        <div class="from-box">
          <div>
            <span>比特币地址</span>
            <p>
              <input type="text" placeholder="比特比地址"/>
              <span class="cash-tishi display-none-tishi">最小提现金额为100</span>
            </p>
          </div>
          <div>
            <span>备注</span>
            <p>
              <input type="text" placeholder="备注"/>
              <span class="cash-tishi display-none-tishi">最小提现金额为100</span>
            </p>
          </div>
          <div>
            <span>资金密码</span>
            <p>
              <input type="password"/>
              <span class="cash-tishi display-none-tishi">资金密码格式输入错误</span>
            </p>
          </div>
          <div>
            <span>验证方式</span>
            <p class="display-flex-p">
            <span>
              <input name="yanzheng" type="radio" id="yanzheng1" checked/>
              <label for="yanzheng1">邮箱验证</label>
            </span>
              <span>
              <input name="yanzheng" type="radio" id="yanzheng2"/>
              <label for="yanzheng2">短信验证</label>
            </span>
            </p>
          </div>
          <div>
            <span>验证码</span>
            <p>
            <span>
              <input type="text" placeholder="验证码"/>
              <button>获取验证码</button>
            </span>
              <span class="cash-tishi display-none-tishi">验证码格式输入错误</span>
            </p>
          </div>
          <div>
            <span>&nbsp;</span>
            <p>
              <button>提交</button>
              <button>取消</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default {
    data() {
      return {
        management_style: true,
        btcAddBtn: true
      }
    },
    created (){

    },
    mounted (){
      {
        $('.header-nav a').click(function () {
          $(this).addClass('header-nav-active').siblings().removeClass('header-nav-active');
        });
      }
      {
        $('.management-bank').hover(function () {
          $('.close-bank').animate({opacity: 1, zIndex: 1}).css({})
        }, function () {
          $('.close-bank').animate({opacity: 0, zIndex: -1}).css({})
        });

      }
    },
    methods: {
      management_style1() {
        this.management_style = true;
      },
      management_style2() {
        this.management_style = false;
      },
      BTC_add(){
        this.btcAddBtn = false;
      }
    }
  }
</script>
<style>
  .userIndex-cash-header {
    width: 99%;
    border-bottom: 1px solid #eee;
    margin-bottom: 0.833rem;
  }

  .header-nav {
    display: flex;
  }

  .header-nav a {
    font-size: 1.333rem;
    padding: 0.667rem 0 1.25rem 0;
    margin-right: 2.083rem;
    border-bottom: 2px solid #fff;
  }

  .header-nav a:hover {
    border-bottom: 2px solid #01aaef;
  }

  .header-nav .header-nav-active {
    border-bottom-color: #337ab7 !important;
  }

  .management-bank-box {
    padding: 2rem 1.5rem;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: center;
  }

  .management-bank {
    margin: 0 2.083rem;
    margin-bottom: 3rem;
    border: 1px dashed #878787;
    border-radius: 0.467rem !important;
    padding: 1rem 1.667rem 1.25rem 1.667rem;
    background: #fff;
    width: 19rem;
    height: 10.167rem;
    cursor: pointer;
  }

  .management-bank.add {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.167rem;
    color: #01aaef;
  }

  .management-bank.add span:nth-of-type(1) {
    font-size: 2rem;
  }

  .management-bank.add:hover {
    color: #3175af;
    border-color: #01aaef;
  }

  .management-bank.bank {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  .management-bank.bank:hover {
    border-color: #01aaef;
  }

  .management-bank.bank > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .management-bank.bank > div i {
    color: #01aaef;
    font-size: 2rem;
    opacity: 0;
    z-index: -1;
  }

  .BTC-add-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.167rem;
    color: #01aaef;
    border-radius: 0.467rem !important;
    padding: 1rem 1.667rem 1.25rem 1.667rem;
    background: #fff;
    width: 32rem;
    height: 10.167rem;
    cursor: pointer;
    border: 1px dashed #878787;
  }

  .BTC-add-btn:hover {
    border-color: #01aaef;
  }

  .management-BTC {
    padding: 3rem 2rem;
  }

  .from-box {
    padding: 4rem 0;
  }

  .from-box > div {
    display: flex;
    align-items: center;
    margin-bottom: 2.25rem;
  }

  .from-box > div > span {
    width: 28%;
    text-align: right;
    margin-right: 4rem;
    font-size: 1.167rem;
  }

  .from-box > div:nth-of-type(1) > p, .from-box > div:nth-of-type(2) > p:nth-of-type(1), .from-box > div:nth-of-type(3) > p, .from-box > div:nth-of-type(5) > p {
    width: 30rem;
    height: 5rem;
    margin-bottom: -1.5rem;
  }

  .from-box > div:nth-of-type(1) > p > input, .from-box > div:nth-of-type(2) > p > input, .from-box > div:nth-of-type(3) > p > input {
    width: 90%;
    padding: 0.667rem 1rem;
  }

  .from-box > div:nth-of-type(4) > p > span {
    margin-right: 2rem;
    font-size: 1.167rem;
    align-items: center;
  }

  .from-box > div:nth-of-type(4) > p > span label {
    margin-left: .5rem;
  }

  .from-box > div:nth-of-type(5) > p > span:nth-of-type(1) {
    height: 3.167rem;
    border: 1px solid #aaa;
    width: 97.2%;
  }

  .from-box > div:nth-of-type(5) > p > span > input {
    width: 71%;
    outline: none;
    border: none;
    padding-left: 1rem;
  }

  .from-box > div:nth-of-type(5) > p > span > button {
    width: 26%;
    border: none;
    height: 100%;
    outline: none;
    cursor: pointer;
    color: #fff;
    background: #01aaef;
  }

  .from-box > div:nth-of-type(6) > p > button {
    width: 10rem;
    padding: 0.75rem 1.167rem;
    font-size: 1.167rem;
    border: none;
    cursor: pointer;
  }

  .from-box > div:nth-of-type(6) > p > button:nth-of-type(1) {
    background: #01aaef;
    margin-right: 2rem;
    color: #fff
  }

  .from-box > div:nth-of-type(6) > p > button:nth-of-type(2) {
    color: #333333;
    background: #E5E5E5;
  }

  .from-box > div:nth-of-type(6) > p > button:nth-of-type(1):hover {
    background: #0186bc;
  }

  .from-box > div:nth-of-type(6) > p > button:nth-of-type(2):hover {
    background: #cccccc;
  }

  .from-box > div > p > span {
    display: flex;
    align-items: center;
  }

  .cash-tishi {
    color: red !important;
  }

  .display-flex-p {
    display: flex;
    align-items: center;
  }

  .bank-tishi {
    display: none;
  }

  .display-none-tishi {
    display: none !important;
  }
</style>
