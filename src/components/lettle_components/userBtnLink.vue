<template>
  <div class="btcTransaction">
    <div class="btcTransaction-content">
      <dl class="btcTransaction-content-btn">
        <dt class="btcTransaction-content-title">我的账户</dt>
        <router-link to="/userIndex" tag="dd">
          <a href="javascript:" style="font-size: 1.167rem">
            <!--<img src="../../assets/img/shiliang/cny.png" alt=""/>-->
            <i class="iconfont">&#xe697;</i>
            CNY专区账户
          </a>
        </router-link>
        <router-link to="/userIndex1" tag="dd"><a href="javascript:" style="font-size: 1.167rem">
          <!--<img src="../../assets/img/shiliang/btc.png"  alt=""/>-->
          <i class="iconfont">&#xe697;</i>
          BTC专区账户
</a>
        </router-link>
      </dl>
      <dl class="btcTransaction-content-btn">
        <dt class="btcTransaction-content-title">资金管理</dt>
        <router-link to="/recharge" tag="dd"><a href="javascript:">
          <!--<img src="../../assets/img/shiliang/recharge.png" alt=""/>-->
          <i class="iconfont">&#xe697;</i>
          充值
</a>
        </router-link>
        <router-link to="/cash" tag="dd"><a href="javascript:">
          <!--<img src="../../assets/img/shiliang/cash.png" alt=""/>-->
          <i class="iconfont">&#xe697;</i>
          提现
</a>
        </router-link>
        <router-link to="/accountDetails" tag="dd"><a href="javascript:"><i class="iconfont">&#xe697;</i>账户明细</a>
        </router-link>
        <router-link to="/accountManagement" tag="dd"><a href="javascript:" style="font-size: 1rem"><i class="iconfont">&#xe69b;</i>地址/银行卡管理</a>
        </router-link>
      </dl>
      <dl class="btcTransaction-content-btn">
        <dt class="btcTransaction-content-title">活动</dt>
        <router-link to="/reward" tag="dd"><a href="javascript:"><i class="iconfont">&#xe687;</i>活动奖励</a></router-link>
      </dl>
      <dl class="btcTransaction-content-btn">
        <dt class="btcTransaction-content-title">安全中心</dt>
        <router-link to="/settings" tag="dd"><a href="javascript:"><i class="iconfont">&#xe631;</i>安全设置</a>
        </router-link>
        <router-link to="/loginLog" tag="dd"><a href="javascript:"><i class="iconfont">&#xe6a0;</i>登录日志</a>
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
    width: 18rem;
    background: #fafafc;
    height: 88rem;
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
</style>
