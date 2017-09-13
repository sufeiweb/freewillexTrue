<template>
  <div class="app-download">
    <div class="banner">
      <div class="detail">
        <h3 class="a-bounceinL">随时随地掌握行情</h3>
        <h4 class="a-bounceinL">随心所欲开启交易</h4>
        <div class="down">
          <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.kyc.alabi#opened" target="_blank" class="down-btn a-bounceinB">安卓下载</a>
        </div>
        <div class="down down-ios">
            <a href="https://itunes.apple.com/hk/app/freewillex/id1164397108?l=zh&mt=8" target="_blank" class="down-btn a-bounceinB">苹果下载</a>
        </div>
        <div class="qrcode a-rotateinRT"><span class="appDown"><img src="../../assets/img/APPcode.jpg" alt="APP下载"></span></div>
        <div class="phone a-fadeinR"><img src="../../assets/img/phone.png" alt=""/></div>
      </div>
    </div>
    <div class="function">
      <div class="text-center dl-word-style">
        <p>小窗口 大世界</p>

        <p>注册、认证、交易</p>

        <p>全站功能尽在掌握</p>
      </div>
      <div class="dl-function-map">
        <div class="function-detail">
          <p class="function-one animated pulse infinite"></p>

          <p class="function-two animated pulse infinite"></p>

          <p class="function-three animated pulse infinite"></p>
        </div>
      </div>
    </div>
    <div class="market">
      <div class="text-center dl-word-style font-white-common">
        <p>行情实时追踪</p>

        <p>各大交易所行情新鲜推送</p>

        <p>买卖更及时</p>
      </div>
      <div class="dl-market-map">
        <div class="market-detail">
          <p class="function-one animated pulse infinite"></p>

          <p class="function-two animated pulse infinite"></p>

          <p class="function-three animated pulse infinite"></p>
        </div>
      </div>
    </div>
    <div class="security">
      <div class="text-center dl-word-style">
        <p>安全保障</p>

        <p>多重认证设计，为您的资金</p>

        <p>交易保驾护航</p>
      </div>
      <div class="dl-safe-map"></div>
    </div>
    <div class="download-App">
      <div class="download">
        <p>一点点投资，发现就有收获</p>

        <p class="appDown"><img src="../../assets/img/APPcode.jpg" alt="APP下载"></p>

        <p>下载FreeWillex APP</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .banner{
    width: 100%;
    height: 588px;
    overflow: hidden;
    position: relative;
    background: url(../../assets/img/banner_bg.png) repeat left center;
  }
  .banner .detail {
    margin: 0 auto;
    max-width: 65%;
    min-width: 80rem;
    height: 709px;
    position: relative;
  }
  .banner h3 {
    left: 720px;
    top: 124px;
    color: #fff;
    font-size: 48px;
    font-weight: bold;
  }
  .banner h4 {
    left: 585px;
    top: 222px;
    color: #fff;
    font-size: 48px;
    font-weight: bold;
  }
  .banner .down {
    width: 184px;
    height: 56px;
    left: 830px;
    top: 380px;
  }
  .banner .down.down-ios {
    top: 450px;
  }
  .banner .down-ios-help {
    position: absolute;
    top: 510px;
    left: 870px;
  }
  .banner .qrcode {
    overflow: hidden;
    left: 585px;
    top: 355px;
  }
  .banner .phone {
    width: 729px;
    height: 558px;
    overflow: hidden;
    left: -35px;
    top: 0;
  }
  .banner h3, .banner h4, .banner .phone, .banner .qrcode, .banner .rocket, .banner .down {
    position: absolute;
  }
  .banner .down .down-btn {
    display: block;
    width: 155px;
    height: 43px;
    line-height: 43px;
    overflow: hidden;
    position: absolute;
    left: 0;
    text-align: center;
    color: #fff;
    font-size: 18px;
    border: 1px solid #fff;
  }
  .banner .down .down-btn:hover{
    background: #fff;
    color: #333;
  }
  .banner .qrcode img {
    width: 160px;
    height: 160px;
  }
  .function, .security {
    height: 620px;
    overflow: hidden;
    position: relative;
    background: #fff;
  }
  .dl-word-style {
    margin-bottom: 40px;
  }
  .text-center {
    text-align: center;
  }
  .dl-function-map {
    width: 589px;
    margin: 0 auto;
    position: relative;
    height: 312px;
    background: url(../../assets/img/dl_first_map.png) center center no-repeat;
  }
  .dl-word-style > p {
    font-size: 18px;
    margin: 0;
  }
  .dl-word-style > p:first-child {
    font-size: 30px;
    margin-top: 40px;
    margin-bottom: 20px;
  }
  .function .function-detail p {
    position: absolute;
    width: 112px;
    height: 112px;
  }
  .function .function-detail p.function-one {
    top: -40px;
    left: -75px;
    background: url(../../assets/img/dl_first_one.png) center center no-repeat;
  }
  .function .function-detail p.function-two {
    top: -15px;
    right: 0;
    background: url(../../assets/img/dl_first_two.png) center center no-repeat;
  }
  .function .function-detail p.function-three {
    bottom: -120px;
    left: -25px;
    background: url(../../assets/img/dl_first_three.png) center center no-repeat;
  }
  .market {
    width: 100%;
    position: relative;
    height: 622px;
    overflow: hidden;
    background: url(../../assets/img/dl_market_bg.png) center center no-repeat;
  }
  .dl-market-map {
    width: 500px;
    margin: 0 auto;
    position: relative;
    height: 280px;
  }
  .font-white-common {
    color: #fff !important;
  }
  .market .market-detail p.function-one {
    width: 228px;
    height: 134px;
    top: 35px;
    left: -25px;
    background: url(../../assets/img/dl_market_one.png) center center no-repeat;
  }
  .market .market-detail p.function-two {
    width: 146px;
    height: 91px;
    right: 0;
    background: url(../../assets/img/dl_market_two.png) center center no-repeat;
  }
  .market .market-detail p.function-three {
    width: 100px;
    height: 65px;
    bottom: -35px;
    left: 200px;
    background: url(../../assets/img/dl_market_three.png) center center no-repeat;
  }
  .market .market-detail p {
    position: absolute;
  }
  .dl-safe-map {
    width: 454px;
    margin: 0 auto;
    position: relative;
    height: 318px;
    background: url(../../assets/img/dl_safe.png) center center no-repeat;
  }
  .download-App {
    width: 100%;
    position: relative;
    background: url(../../assets/img/banner_bg.png) repeat left center;
    height: 540px;
  }
  .download-App .download p:first-child {
    padding-top: 108px;
  }

  .download-App .appDown img {
    width: 195px;
    height: 195px;
    margin: 0 auto;
  }
  .download-App .download img {
    margin-top: 25px;

  }
  .download-App .download p:last-child {
    font-size: 18px;
    margin-top: 10px;
  }
  .download-App .download p {
    color: #fff;
    font-size: 30px;
  }
  .download-App .download {
    text-align: center;
  }
</style>
