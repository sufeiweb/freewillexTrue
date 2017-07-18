<template>
  <div class="btcTransaction">
    <div class="btcTransaction-content">
      <ul class="btcTransaction-content-btn">
        <router-link to="/user" tag="li" class="li-active"><a href="javascript:"><i class="iconfont">&#xe639;</i>账户</a></router-link>
        <!--<li class="li-active"><a href="javascript:"><i class="iconfont">&#xe639;</i>账户</a></li>-->
        <li><a><i class="iconfont">&#xe69e;</i>资金管理</a></li>
        <router-link to="/recharge" tag="li"><a href="javascript:"><i class="iconfont">&#xe668;</i>充值</a></router-link>
        <!--<li><a href="javascript:"><i class="iconfont">&#xe668;</i>充值</a></li>-->
        <router-link to="/cash" tag="li"><a href="javascript:"><i class="iconfont">&#xe668;</i>提现</a></router-link>
        <router-link to="/accountDetails" tag="li"><a href="javascript:"><i class="iconfont">&#xe668;</i>账户明细</a></router-link>
        <router-link to="/accountManagement" tag="li"><a href="javascript:"><i class="iconfont">&#xe668;</i>账户管理</a></router-link>
        <router-link to="/reward" tag="li"><a href="javascript:"><i class="iconfont">&#xe687;</i>活动奖励</a></router-link>
        <router-link to="/loginLog" tag="li"><a href="javascript:"><i class="iconfont">&#xe6a0;</i>登录日志</a></router-link>
        <router-link to="/settings" tag="li"><a href="javascript:"><i class="iconfont">&#xe69b;</i>个人设置</a></router-link>
        <router-link to="/message" tag="li"><a href="javascript:"><i class="iconfont">&#xe69c;</i>消息管理</a></router-link>
      </ul>
      <div class="app-download">
        <img src="../../assets/img/download/APPcode.jpg"/>
        <a href="javascript:">APP下载</a>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default {
    mounted() {
      $('.btcTransaction-content-btn a').click(function () {
        $(this).parent().siblings().removeClass('li-active');
        $(this).parent().addClass('li-active');
      });
      $('.btcTransaction-content-btn li').hover(function () {
        $(this).children().css({
          color:"#01aaef"
        });
        $(this).children().find('i').css({
          color:"#01aaef"
        })
      },function () {
        $(this).children().css({
          color:"#333"
        });
        $(this).children().find('i').css({
          color:"#333"
        })
      })
    }
  }
</script>
<style scoped>
  .btcTransaction{
    width: 16.667rem;
    background: #fff;
  }
  .btcTransaction-content-title{
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e9ecf3;
    color: gray;
    font-size: 1.333rem;
    font-weight: 400;
    padding: 1.583rem 1.25rem 1.583rem 1.5rem;
  }
  .btcTransaction-content-title .iconfont{
    font-size: 1.833rem;
    margin-right: 0.2rem;
    color: gray
  }
  .btcTransaction-content-btn li a{
    display: flex;
    align-items: center;
    margin-top: 1px;
    padding: 1.25rem 3.5rem 1.25rem 1.5rem;
    text-decoration: none;
    font-size: 1.333rem;
    border-bottom: 1px solid #e9ecf3;
  }
  .btcTransaction-content-btn li a i{
    margin-right: 0.2rem;
    font-size: 1.833rem;
    opacity: 1;
    color: gray
  }
  .btcTransaction-content-btn li:nth-of-type(3) i,.btcTransaction-content-btn li:nth-of-type(4) i,.btcTransaction-content-btn li:nth-of-type(5) i,.btcTransaction-content-btn li:nth-of-type(6) i{
    opacity: 0;
  }
  .btcTransaction-content-btn li:nth-of-type(3) a,.btcTransaction-content-btn li:nth-of-type(4) a,.btcTransaction-content-btn li:nth-of-type(5) a,.btcTransaction-content-btn li:nth-of-type(6) a{
    font-size: 1.167rem;
  }
  .app-download{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 11.75rem;
    margin: 2.5rem 2.5rem 0.4167rem 2.5rem;
  }
  .app-download img{
    width: 11.75rem;
    height: 11.75rem;
  }
  .li-active{
    background: #01aaef;
    color: #fff !important;
  }
  .li-active>a,.li-active a>i{
    color: #fff !important;
    margin-right: -1px;
  }
</style>
