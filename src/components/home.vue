<template>
  <div>
    <div class="home">
      <el-carousel trigger="click" height="44.67rem" class="home-banner">
        <el-carousel-item>
          <a href="javascript:;"><img src="../assets/img/banner/index_banner04.jpg" class="home-banner-img"/></a>
        </el-carousel-item>
        <el-carousel-item>
          <a href="javascript:;"><img src="../assets/img/banner/index_banner05.jpg"/></a>
        </el-carousel-item>
        <el-carousel-item>
          <a href="javascript:;"><img src="../assets/img/banner/index_banner02.jpg"/></a>
        </el-carousel-item>
        <el-carousel-item>
          <a href="javascript:;"><img src="../assets/img/banner/index_banner03.jpg"/></a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="home-center">
      <div class="home-center-content layout">
        <h1 class="home-center-content-title">为什么选择我们？</h1>
        <div class="home-center-content-items">
          <div class="home-center-content-item">
            <p class="title"><i class="iconfont icon-trade"></i><span class="ml15">现货交易</span></p>
            <p class="content">
              FreeWillex自由意志为交易双方提供<span class="fb">实时资产交割服务</span>，交易资金实时划付，充值提现更自由。
                    </p>
          </div>
          <div class="home-center-content-item">
            <p class="title"><i class="iconfont icon-safe"></i><span class="ml15">安全可靠</span></p>
            <p class="content">
              平台采用先进的<span class="fb">SSL安全连接、分布式服务架构、多层数据校验技术与HTTPS全站加密、冷钱包技术</span>，让用户交易更安心。
                    </p>
          </div>
          <div class="home-center-content-item">
            <p class="title"><i class="iconfont icon-hour"></i><span class="ml15">24小时</span></p>
            <p class="content">
              FreeWillex自由意志提供<span class="fb">7*24小时的全年在线</span>交易服务，时刻满足用户交易需求，使用更方便。
                    </p>
          </div>
          <div class="home-center-content-item">
            <p class="title"><i class="iconfont icon-zero-fee"></i><span class="ml15">零交易手续费</span></p>
            <p class="content">
              FreeWillex自由意志提供<span class="fb">免费</span>的比特币交易服务，<span class="fb">不收手续费</span>，投资投机、卖出买进，好机会更易把握。
                    </p>
          </div>
          <div class="home-center-content-item">
            <p class="title"><i class="iconfont icon-lang"></i><span class="ml15">双语客服</span></p>
            <p class="content">
              FreeWillex自由意志提供<span class="fb">中英文双语</span>官网操作页面与中英文双语客服，老外朋友不再尴尬，体验更舒适。
                    </p>
          </div>
          <div class="home-center-content-item">
            <p class="title"><i class="iconfont icon-api-open"></i><span class="ml15">开放API</span></p>
            <p class="content">
              <span class="fb">API接口免费开放</span>，从实时行情、市场深度、交易数据、K线数据到订单详情、资产信息、市价/限价买卖，操作更流畅，掌控更轻松。
                    </p>
          </div>
        </div>
        <h1 class="home-center-content-title">战略合作伙伴</h1>
        <div class="home-center-contetn-items">
          <a href="http://www.8btc.com" target="_blank" class="top-minus-1"><img src="../assets/img/home/foot_img2.png"
                                                                                 width="100%"></a>
          <a href="https://www.sosobtc.com" target="_blank" style="margin-left: 6.67rem"><img
            src="../assets/img/home/foot_img1.png" width="100%;"></a>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  .home-banner {
    margin-top: .15rem;
    width: 100%;
  }

  .home-center {
    background: #f5f5f5;
  }

  .home-center-content-title {
    width: 60%;
    font-size: 1.83rem;
    text-align: center;
    padding: 2.9rem 0;
    margin: 0 auto;
    font-weight: bold;
    position: relative;
  }

  .home-center-content-title:before {
    left: 0;
  }

  .home-center-content-title:before, .home-center-content-title:after {
    position: absolute;
    top: 64%;
    content: "";
    background: #2b3643;
    width: 16.67rem;
    height: 1px;
    right: 0;
  }

  .home-center-content-items {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 1rem 3rem;
    box-sizing: border-box;
  }

  .home-center-content-item {
    width: 28rem;
    height: 17rem;
    background: #fff;
    padding: 40px 30px;
    border: 1px solid #e9ecf3;
    box-sizing: border-box;
    margin-bottom: 3rem;
  }

  .home-center-content-item .content {
    color: #666666;
    line-height: 1.83rem;
  }

  .home-center-content-item .title {
    margin-bottom: 1.67rem;
    color: #01aaef;
    font-size: 1.5rem;
  }

  .ml15 {
    margin-left: 1.25rem;
  }

  .fb {
    font-weight: bold;
    display: inline;
  }

  .home-center-contetn-items {
    display: flex;
    justify-content: center;
    padding-bottom: 3rem;
  }

  .home-center-contetn-items a {
    width: 12rem;
    height: 3.5rem;
  }
</style>
