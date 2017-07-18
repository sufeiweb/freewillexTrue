<template>
  <div class="introduction-header">
    <h1 class="introduction-link-title">公司介绍</h1>
    <div class="introduction-top top4">
      <div class="title">
        <p>发展历程</p>
        <p class="font-size-18">一步一个脚印</p>
      </div>
    </div>
    <div class="introduction-content">
      <div class="develop-history">
        <p>上海数炫网络科技股份有限公司（简称：上海数炫）成立于2016年，注册资金2000万元人民币（实到），位于上海陆家嘴金融城，公司主要研发加密数字货币、区块链相关产品，致力于为用户提供安全、诚信、专业、快捷的数字资产交易服务，打造未来金融领域的重要生态环节。2016年，上海数炫成功推出知名的数字资产在线交易平台——FreeWillex自由意志，平台网址：<a href="javascript:" class="a-turn-btn">www.freewillex.cn</a>提供面向全球的数字资产交易，一推出即获得市场广泛关注。FreeWillex自由意志将力争成为数字资产交易平台的行业翘楚。</p>
        <div class="develop-detail left1">
          <div class="content">
            <p class="date">2016年11月24日</p>
            <p>平台交易量首次超过10,000比特币</p>
          </div>
          <div class="left"></div>
        </div>
        <div class="develop-detail right1">
          <div class="right"></div>
          <div class="content">
            <p class="date">2016年9月27日</p>
            <p>FreeWillex自由意志比特币交易平台正式上线，并迎来首个注册用户</p>
          </div>
        </div>
        <div class="develop-detail left1">
          <div class="content">
            <p class="date">2016年9月1日</p>
            <p>上海数炫网络科技股份有限公司在上海市陆家嘴自由贸易区正式成立，注册资金2000万元</p>
          </div>
          <div class="left"></div>
        </div>
        <div class="develop-detail right1">
          <div class="right"></div>
          <div class="content">
            <p class="date">2016年6月</p>
            <p>上海数炫网络科技股份有限公司开始筹建</p>
          </div>
        </div>
        <div class="develop-detail left1">
          <div class="content">
            <p class="date">2016年3月</p>
            <p>项目成功获得天使投资</p>
          </div>
          <div class="left"></div>
        </div>
        <div class="develop-detail right1">
          <div class="right"></div>
          <div class="content">
            <p class="date">2015年9月</p>
            <p>项目立项</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{}
</script>
<style scoped>
  .top4{
    background: url('../../assets/img/introduction/about4.jpg') no-repeat center;
    background-size: 100%;
  }
.introduction-content .develop-history{
  margin: 5rem 0;
}
  .introduction-content .develop-history >p{
    font-size: 1.1667rem;
    width: 80%;
    margin: 3.33rem auto;
  }
  .a-turn-btn{
    display: inline;
    color: #01aaef;
  }
  .develop-history .develop-detail{
    width: 50%;
    display: flex;
    align-items: center;
  }
  .develop-history .develop-detail.left1{
    position: relative;
    right: -3.1rem;
  }
  .develop-history .develop-detail.right1{
    position: relative;
    left: -3.1rem;
    margin-left: 50%;
  }
  .develop-history .develop-detail .left{
    background: url('../../assets/img/introduction/left.png') center center no-repeat;
    width: 16.5rem;
    height: 14.25rem;
  }
  .develop-history .develop-detail .right{
    background: url('../../assets/img/introduction/right.png') center center no-repeat;
    width: 16.5rem;
    height: 14.25rem;
  }
  .develop-history .develop-detail .content{
    width: 19.667rem;
    text-align: center;
    margin: 0 6.25rem;
    font-size: 1.25rem;
    color: #9b9b9b;
  }
  .develop-history .develop-detail .content .date {
    color: #333;
    font-size:1.833rem;
  }
</style>
