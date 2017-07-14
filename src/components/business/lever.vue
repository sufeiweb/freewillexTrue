<template>
  <div class="leaver">
    <div class="leaver-header">
      <div class="leaver-header-tabs">
        <a href="javascript:" class="bottom-color" @click="money_style()">人名币</a>
        <a href="javascript:" @click="money_style()">比特币</a>
      </div>
      <span>杠杆服务由英国BECORE FINTECH COMPANY LIMITED公司提供</span>
    </div>
    <div class="leaver-from">
      <div class="user-assets">
        <span>净资产</span><span v-show="money_show">￥33123.00</span><span v-show="!money_show">฿12.3333</span>
      </div>
      <div class="user-application-limit">
        <span>申请额度</span>
        <div class="application-limit-text">
          <div class="application-limit-text-prompt">
            <span>最高可融5倍</span>
            <i class="el-icon-caret-bottom"></i>
          </div>
          <input placeholder="本次最多可融金额500000"/>
        </div>
        <span>当前最低费率：0.10%/天</span>
      </div>
      <div class=""></div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default {
      data() {
          return {
              money_show: true
          }
      },
    methods: {
          money_style() {
              this.money_show = !this.money_show;
          }
    },
    mounted() {
        $('.leaver-header-tabs a').click(function () {
          $(this).addClass('bottom-color').siblings().removeClass('bottom-color');
        })
    }
  }
</script>
<style>
  .leaver-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
    font-size: 1.333rem;
    border-bottom: 1px solid #eee
  }
  .leaver-header span{
    color: #b3b3b3;
    font-size: 1.0833rem;
  }
  .leaver-header-tabs{
    display: flex;
    align-items: center;
    height: 100%;
  }
  .leaver-header-tabs a{
    margin-right: 2rem;
    border-bottom: 2px solid #fff;
    line-height: 4rem;
    height: 93%;
  }
  .leaver-header-tabs a:hover{
    border-bottom-color:#01ffff;
  }
  .leaver-header-tabs .bottom-color{
    border-bottom-color: #01aaef !important;
  }
</style>

