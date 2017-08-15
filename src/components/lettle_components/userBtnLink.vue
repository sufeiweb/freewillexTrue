<template>
  <div class="btcTransaction">
    <div class="btcTransaction-content">
      <dl class="btcTransaction-content-btn">
        <dt class="btcTransaction-content-title">我的账户</dt>
        <router-link to="/userIndex" tag="dd">
          <a href="javascript:">
            <span class="s1"></span>
            CNY专区
          </a>
        </router-link>
        <router-link to="/userIndex1" tag="dd"><a href="javascript:">
          <span class="s2"></span>
          BTC专区
</a>
        </router-link>
      </dl>
      <dl class="btcTransaction-content-btn">
        <dt class="btcTransaction-content-title">资金管理</dt>
        <router-link to="/recharge" tag="dd"><a href="javascript:">
          <span class="s3"></span>
          充值
</a>
        </router-link>
        <router-link to="/cash" tag="dd"><a href="javascript:">
          <span class="s4"></span>
          提现
</a>
        </router-link>
        <router-link to="/accountDetails" tag="dd">
          <a href="javascript:">
            <span class="s5"></span>
            账户明细</a>
        </router-link>
        <router-link to="/accountManagement" tag="dd"><a href="javascript:">
          <span class="s6"></span>账户管理</a>
        </router-link>
      </dl>
      <!--<dl class="btcTransaction-content-btn">-->
        <!--<dt class="btcTransaction-content-title">活动</dt>-->
        <!--<router-link to="/reward" tag="dd"><a href="javascript:"><i class="iconfont">&#xe687;</i>活动奖励</a></router-link>-->
      <!--</dl>-->
      <dl class="btcTransaction-content-btn">
        <dt class="btcTransaction-content-title">安全中心</dt>
        <router-link to="/settings" tag="dd"><a href="javascript:"> <span class="s7"></span>安全设置</a>
        </router-link>
        <router-link to="/loginLog" tag="dd"><a href="javascript:"> <span class="s8"></span>登录日志</a>
        </router-link>
      </dl>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default {
    mounted() {
      $('.btcTransaction-content-btn a').click(function () {
        $('.btcTransaction-content dd').removeClass('dd-active');
        $(this).parent().addClass('dd-active');
      });
      $('.btcTransaction-content-btn dd').hover(function () {
        $(this).children().css({
          color: "#01aaef"
        });
        $(this).children().find('i').css({
          color: "#01aaef"
        })
      }, function () {
        $(this).children().css({
          color: "#333"
        });
        $(this).children().find('i').css({
          color: "#333"
        })
      })
    }
  }
</script>
<style scoped>
  .btcTransaction {
    width: 17rem;
    background: #fafafc;
    padding-bottom: 3rem;
    border-right: 1px solid #dbe1e9;
  }

  .btcTransaction-content {
    height: 100%;
  }

  .btcTransaction-content-title {
    color: #8e8e8e;
    font-size: 1rem;
    font-weight: 400;
    padding: 1.583rem 1.25rem 1.583rem 1.5rem;
  }

  .btcTransaction-content-btn dd a {
    display: flex;
    align-items: center;
    margin-top: 1px;
    padding: 1.25rem 2rem 1.25rem 3rem;
    text-decoration: none;
    font-size: 1.333rem;
    color: #555964;
  }

  .btcTransaction-content-btn dd a i, .btcTransaction-content-btn dd a img {
    margin-right: 1rem;
    font-size: 1.8rem;
    color: #555964
  }

  .router-link-active > a, .router-link-active a > i {
    color: #fff !important;
    margin-right: -1px;
  }

  .router-link-active {
    background: #01aaef;
    color: #fff !important;
  }
  .router-link-active .s1,.router-link-active .s2,.router-link-active .s3,.router-link-active .s4,
  .router-link-active .s5,.router-link-active .s6,.router-link-active .s7,.router-link-active .s8{
    background-position: -20px;
  }

 .s1,.s2,.s3,.s4,.s5,.s6,.s7,.s8{
    width: 20px;
    height: 20px;
   margin-right: 1rem;
  }
  .s1{
    background: url("../../assets/img/iconPng/CNY.png");
  }
  .s2{
    background: url("../../assets/img/iconPng/BTC.png");
  }
  .s3{
    background: url("../../assets/img/iconPng/chongzhi.png");
  }
  .s4{
    background: url("../../assets/img/iconPng/tixian.png");
  }
  .s5{
    background: url("../../assets/img/iconPng/zhuanghumingxi.png");
  }
  .s6{
    background: url("../../assets/img/iconPng/zhanghaoguanli.png");
  }
  .s7{
    background: url("../../assets/img/iconPng/anquanshezhi.png");
  }
  .s8{
    background: url("../../assets/img/iconPng/denglurizhi.png");
  }
</style>
