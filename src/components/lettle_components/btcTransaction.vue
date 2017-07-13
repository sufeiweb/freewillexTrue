<template>
  <div class="btcTransaction">
    <div class="btcTransaction-content">
      <p class="btcTransaction-content-title">
        <i class="iconfont">&#xe66b;</i>
        <span>比特币交易</span>
      </p>
      <ul class="btcTransaction-content-btn">
        <li class="li-active"><a href="javascript:"><i class="iconfont">&#xe668;</i>买/卖</a></li>
        <li><a href="javascript:"><i class="iconfont">&#xe668;</i>委托管理</a></li>
        <li><a href="javascript:"><i class="iconfont">&#xe668;</i>交易记录</a></li>
        <li><a href="javascript:"><i class="iconfont">&#xe668;</i>杠杆</a></li>
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
<style>
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
    font-size: 1.167rem;
    border-bottom: 1px solid #e9ecf3;
  }
  .btcTransaction-content-btn li a i{
    margin-right: 0.2rem;
    font-size: 1.833rem;
    opacity: 0;
    color: gray
  }
  .btcTransaction-content-btn li:last-child i{
    opacity: 1;
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
