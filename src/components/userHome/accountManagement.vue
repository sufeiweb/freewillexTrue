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
      <div class="BTC-add-btn">
        <span>+</span>
        <span>添加地址</span>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default {
      data() {
          return {
            management_style: true
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
            $('.close-bank').animate({opacity:1,zIndex:1}).css({})
          },function () {
            $('.close-bank').animate({opacity:0,zIndex:-1}).css({})
          });

      }
    },
    methods: {
      management_style1() {
          this.management_style = true;
      },
      management_style2() {
        this.management_style = false;
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
  .management-bank-box{
    padding: 2rem 1.5rem;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: center;
  }
  .management-bank{
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
  .management-bank.add{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.167rem;
    color: #01aaef;
  }
  .management-bank.add span:nth-of-type(1){
    font-size: 2rem;
  }
  .management-bank.add:hover{
    color: #3175af;
    border-color: #01aaef;
  }
  .management-bank.bank{
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
  .management-bank.bank:hover{
    border-color: #01aaef;
  }
  .management-bank.bank>div{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .management-bank.bank>div i{
    color:#01aaef ;
    font-size: 2rem;
    opacity: 0;
    z-index: -1;
  }
  .BTC-add-btn{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.167rem;
    color: #01aaef;
    border-radius: 0.467rem !important;
    padding: 1rem 1.667rem 1.25rem 1.667rem;
    background: #fff;
    width: 19rem;
    height: 10.167rem;
    cursor: pointer;
  }
  .BTC-add-btn:hover{
    border-color: #01aaef;
  }
</style>
