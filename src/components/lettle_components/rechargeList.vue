<template>
  <div class="rechargeList">
    <div class="rechargeList-title">
      <p>待充值订单</p>
      <p> 请使用<a :href="this.$route.query.bankUrl" target="_blank">{{this.$route.query.bankName}}</a>向以下账户转账
      </p>
    </div>
    <div class="rechargeList-content">
      <p><span>开户银行</span><span>{{this.$route.query.bankName}}</span></p>
      <p><span>支行地址</span><span>{{this.$route.query.bankAddr}}</span></p>
      <p><span>银行卡</span><span>{{this.$route.query.accountNo}}</span></p>
      <p><span>开户姓名</span><span>{{this.$route.query.userName}}</span></p>
      <p><span>待支付金额</span><span class="color-blue">￥{{ this.$route.query.balance}}</span></p>
      <p><span>备注/附言</span><span>{{this.$route.query.postScript}}</span></p>
      <p><span>到账时间</span><span>转账完成后40分钟内</span></p>
      <p><a :href="this.$route.query.bankUrl" target="_blank">进入{{this.$route.query.bankName}}</a></p>
    </div>
    <div class="rechargeList-footer">
      <p>请在汇款备注/附言中严格按要求填写充值ID：<span>{{this.$route.query.postScript}}</span></p>
      <p>不要填写除了数字以外的其它字符（比特币等），否则不能正确到账！</p>
      <p>FreeWillex会在收到汇款后40分钟内为您入账，在此期间无需联系客服，如有问题我们会主动联系您</p>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    created() {

    }
  }
</script>
<style scoped>
  .rechargeList {
    padding: 0 2rem 0 3rem;
  }

  .rechargeList-title {
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    padding: 2rem 0;
  }

  .rechargeList-title p:nth-of-type(1) {
    font-size: 1.333rem;
    margin-right: 2rem;
  }

  .rechargeList-title p:nth-of-type(2) {
    display: flex;
    align-items: center;
    font-size: 1.167rem;
  }

  .rechargeList-title p:nth-of-type(2) > a {
    margin: 0 .5rem;
    color: #01aaef !important;
    font-size: 1.167rem;
  }

  .rechargeList-title p:nth-of-type(2) > a:hover {
    text-decoration: underline;
  }

  .rechargeList-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0;
    font-size: 1.167rem;
  }

  .rechargeList-content p {
    display: flex;
    align-items: center;
    padding: 1rem 0;
  }

  .rechargeList-content p > span:nth-of-type(1) {
    width: 10rem;
    margin-right: 2rem;
    text-align: right;
  }

  .rechargeList-content p > span:nth-of-type(2) {
    width: 15rem;
  }

  .color-blue {
    color: #01aaef;
    font-size: 18px !important;

  }

  .rechargeList-content p > a {
    padding: .8rem 1.5rem;
    background: #01aaef;
    color: #fff;
    border-radius: 3px;
  }

  .rechargeList-footer {
    font-size: 1.167rem;
    padding: 1rem;
    color: #9a9a9a;
  }

  .rechargeList-footer > p {
    margin-bottom: 1rem;
  }

  .rechargeList-footer > p > span {
    color: red;
    display: inline;
  }
</style>
