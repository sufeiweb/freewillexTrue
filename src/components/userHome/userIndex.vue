<template>
  <div class="userIndex">
    <div class="index-title">
      <span>账户概要</span>
      <a href="javascript:"><i class="iconfont">&#xe6c1;</i></a>
    </div>
    <div class="money-tabs-box">
      <div class="money-tabs-left">
        <p class="money-tab-btn">
          <span class="bg-color">CNY</span>
          <span>BTC</span>
        </p>
        <i class="iconfont" v-show="!money_hide">&#xe6c6;</i>
        <i class="iconfont" v-show="money_hide">&#xe6c7;</i>
      </div>
      <div class="money-tabs-right">
        <i class="iconfont">&#xe6c5;</i>
        <a href="javascript:">我的推荐人信息</a>
      </div>
    </div>
    <div class="total-assets">
      <h1 class="assets-title">总资产</h1>
      <span class="assets-money">{{1212121}} {{money_style}}</span>
      <div class="assets_CNY">
        <span></span><span>CNY {{122111.00}}</span>
      </div>
      <div class="assets_BTC">
        <span></span><span>BTC {{122111.0000}}</span>
      </div>
      <div class="assets-proportion">
        <span></span><span></span>
      </div>
    </div>
    <div class="net-assets">
      <h1 class="assets-title">净资产</h1>
      <span class="assets-money">{{1212121}} {{money_style}}</span>
      <div class="assets_CNY">
        <span></span><span>CNY {{122111.00}}</span>
      </div>
      <div class="assets_BTC">
        <span ></span><span>BTC {{122111.0000}}</span>
      </div>
      <div class="assets-proportion">
        <span></span><span></span>
      </div>
    </div>
    <div class="available-assets">
      <h1 class="assets-title">可用</h1>
      <span class="assets-money">{{1212121}} {{money_style}}</span>
      <div class="assets_CNY">
        <span></span><span>CNY {{122111.00}}</span>
      </div>
      <div class="assets_BTC">
        <span></span><span>BTC {{122111.0000}}</span>
      </div>
      <div class="assets-proportion">
        <span></span><span></span>
      </div>
    </div>
    <div class="blocked-assets">
      <h1 class="assets-title">冻结</h1>
      <span class="assets-money">{{1212121}} {{money_style}}</span>
      <div class="assets_CNY">
        <span></span><span>CNY {{122111.00}}</span>
      </div>
      <div class="assets_BTC">
        <span></span><span>BTC {{122111.0000}}</span>
      </div>
      <div class="assets-proportion">
        <span></span><span></span>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default {
    data() {
      return {
        money_hide: false,
        money_style: 'CNY'
      }
    }
  }
</script>
<style>
  .index-title {
    display: flex;
    height: 4rem;
    line-height: 4rem;
    font-size: 1.333rem;
    border-bottom: 1px solid #eee;
    margin-bottom: 0.833rem;
  }

  .index-title span {
    margin-right: 1.25rem;
  }

  .index-title a i {
    font-size: 1.833rem;
    color: #01aaef !important;
  }

  .money-tabs-box {
    display: flex;
    justify-content: space-between;
    margin: 2rem 0 1.8rem 0;
  }

  .money-tabs-left {
    display: flex;
    align-items: center;
  }

  .money-tab-btn {
    display: flex;
    font-size:1.167rem;
  }

  .money-tab-btn span {
    padding: 0.1667rem 0.4167rem;
    border: 1px solid #01aaef;
    color: #01aaef;
    cursor: pointer;
  }

  .money-tab-btn span:hover {
    background: #eee;
  }

  .money-tab-btn .bg-color {
    background: #01aaef !important;
    color: #fff;
  }
  .money-tabs-left .iconfont{
    cursor: pointer;
    color: #01aaef;
    font-size: 2rem;
    margin-left: 2rem;
  }
  .money-tabs-right{
    display: flex;
    align-items: center;
  }
  .money-tabs-right i {
    color: #01aaef;
    margin-right: 0.4167rem;
    font-size: 1.5rem;
  }
 .money-tabs-right a{
    color: #01aaef;
    text-decoration: underline;
    font-size: 1.333rem;
  }
  .assets-title,.assets-money,.assets_CNY,.assets_BTC,.assets-proportion{
    font-size: 1.5rem;
    margin-bottom: 1.1667rem;
  }
  .assets-money{
    color: #888888;
  }
  .assets_CNY,.assets_BTC{
    display: flex;
    align-items: center;
font-size: 1.333rem;
    color: #333;
  }
  .assets_CNY span:nth-of-type(1),.assets_BTC span:nth-of-type(1){
    width: 0.667rem;
    height: 0.667rem;
    background: #89bf68;
    margin-right: .5rem;
  }
  .assets_BTC span:nth-of-type(1){
    background:#38c4e9;
  }
  .assets-proportion{
    width: 100%;
    display: flex;
    align-items: center;
  }
  .assets-proportion span{
    height: 1.667rem;
    width: 1px;
  }
  .assets-proportion span:nth-of-type(1){
    width: 30%;
    margin-right: 2px;
    background: #89bf68;
  }
  .assets-proportion span:nth-of-type(2){
    width: 70%;
    background:#38c4e9 ;
  }
</style>
