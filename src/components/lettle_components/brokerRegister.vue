<template>
  <div class="brokerRegister layout">
    <div class="brokerRegister-header">
      <i class="iconfont">&#xe62d;</i>
      <p class="title try">请试一下</p>
      <p class="title margin-botton-40">FreeWillex 自由意志 | 比特币交易平台</p>
      <p>当您看到此页面时，表明您的朋友已邀请您亲自体验FreeWillex自由意志比特币交易平台</p>
      <p>我们对于您的大驾光临感到万分激动，希望您能对我们感到满意！</p>
      <p>当您完成注册后，您和您的推荐人都将获得一份奖励以表达我们的感激之情！</p>
    </div>
    <div class="brokerRegister-middle">
      <dl class="bottom right">
        <dt>现货交易</dt>
        <dd>实打实的现货交易</dd>
        <dd>随时兑现</dd>
      </dl>
      <dl class="bottom right">
        <dt>安全可靠</dt>
        <dd>交易信息全加密</dd>
        <dd>冷钱包安全存储</dd>
      </dl>
      <dl class="bottom">
        <dt>24小时</dt>
        <dd>7 X 24小时全年无休</dd>
        <dd>时刻满足交易需求</dd>
      </dl>
      <dl class="right">
        <dt>0交易手续费</dt>
        <dd>自由买卖</dd>
        <dd>手续费全免</dd>
      </dl>
      <dl class="right">
        <dt>双语客服</dt>
        <dd>Hello！你好！</dd>
        <dd>中英文双语亲切关怀</dd>
      </dl>
      <dl>
        <dt>开放API</dt>
        <dd>为策略交易、程序化交易</dd>
        <dd>提供便利</dd>
      </dl>
      <span class="hide-m-l"></span>
      <span class="hide-m-r"></span>
      <span class="hide-r"></span>
      <span class="hide-l"></span>
    </div>
    <div class="brokerRegister-footer">
      <register></register>
    </div>
  </div>
</template>
<script>
  import register from '../register.vue';
  export default {
    data(){
      return {
        dd: '',
      }
    },
    mounted(){
      this.sendEvent('recommendCode', '');
    },
    components: {register}
  }
</script>
<style scoped>
  .brokerRegister {
    background: #fff;
    margin-top: 20px;
  }

  .brokerRegister-header {
    font-size: 1.167rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.667rem 0;
  }

  .brokerRegister-header > i {
    color: #01aaef;
    font-size: 5rem;
    padding: 1rem 1.3rem;
    border: 2px solid #01aaef;
    border-radius: 50%;
    margin-bottom: 20px;
  }

  .brokerRegister-header p {
    font-size: 16px;
    line-height: 1.5em;
  }

  .brokerRegister-header > p.title {
    color: #01aaef;
    font-size: 34px;
  }

  .brokerRegister-header > p.title.try {
    font-size: 38px;
  }

  .margin-botton-40 {
    margin-bottom: 40px;
  }

  .brokerRegister-middle {
    width: 65%;
    font-size: 14px;
    margin: 50px auto 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    position: relative;
  }

  .brokerRegister-middle dl {
    width: 33.2%;
    text-align: center;
    padding-bottom: 25px;
  }

  .brokerRegister-middle dl dt {
    color: #333;
    margin: 25px 0;
    font-size: 16px;
  }

  .brokerRegister-middle dl dd {
    color: #888;
  }

  .right {
    border-right: 1px solid #ddd;
  }

  .bottom {
    border-bottom: 1px solid #ddd;
  }

  .hide-m-l, .hide-m-r {
    width: 100px;
    height: 50px;
    position: absolute;
    background: #fff;
    top: 50%;
    margin-top: -25px;
  }

  .hide-m-l {
    left: 27%
  }

  .hide-m-r {
    right: 27%;
  }

  .hide-r, .hide-l {
    width: 50px;
    height: 100%;
    background: #fff;
    position: absolute;
  }

  .hide-r {
    right: 0;
  }

  .brokerRegister-footer {
    padding: 20px 0;
    margin-bottom: 20px;
  }
</style>
