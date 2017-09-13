<template>
  <div class="production">
    <div>
      <img src="../../assets/img/offerPng/banner.jpg" alt=""/>
    </div>
    <div class="production_title">
      <img src="../../assets/img/offerPng/middle.jpg" alt=""/>
      <div class="production_title-text">
<span>支持多币种交易，资产配置灵活多样</span> <span>活动丰富，签到、交易、推荐等环节 </span>
      </div>
    </div>
    <div class="production_quotation">
      <img src="../../assets/img/offerPng/hangqing.jpg" alt=""/>
      <section><img src="../../assets/img/offerPng/point.png" alt=""/></section>
      <section><img src="../../assets/img/offerPng/point.png" alt=""/></section>
      <section><img src="../../assets/img/offerPng/point.png" alt=""/></section>
      <section><img src="../../assets/img/offerPng/point.png" alt=""/></section>
      <section><img src="../../assets/img/offerPng/point.png" alt=""/></section>
      <section><img src="../../assets/img/offerPng/point.png" alt=""/></section>
      <section><img src="../../assets/img/offerPng/point.png" alt=""/></section>
    </div>
    <div class="production_jiemian">
      <img src="../../assets/img/offerPng/jiemian.jpg" alt=""/>
      <div class="production_jiemian_text">
        <span>全新界面</span>
        <span>极简蓝白风，高雅美观，浏览舒适</span>
      </div>
    </div>
    <div class="production_safe">
      <img src="../../assets/img/offerPng/anquan_background.jpg" alt=""/>
      <div class="production_safe_div">
        <p>六大安全要素</p>
        <section>
          <aside>
            <article></article>
            <div>
              <p>冷钱包技术</p>
              <span>私钥永不触网，离线存储，</span> <span>让数字资产存储更安全。</span>
            </div>
          </aside>
          <aside>
            <article></article>
            <div>
              <p>SSL安全通讯</p>
              <span>采用全球知名的GlobalSign </span><span>数字签名技术，数据通讯安全可靠。</span>
            </div>
          </aside>
          <aside>
            <article></article>
            <div>
              <p>信息真实</p>
              <span>银行级四要素实名策略，</span> <span>交易对手真实有效。</span>
            </div>
          </aside>
          <aside>
            <article></article>
            <div>
              <p>100%兑付</p>
              <span>平台资金独立存管，随需随取，</span> <span> 100%兑付。</span>
            </div>
          </aside>
          <aside>
            <article></article>
            <div>
              <p>实时防护</p>
              <span>全系统状态热监控，及时修复系统</span> <span> 漏洞与黑客攻击，实时防护DDos、</span> <span> VPC、SQL注入等攻击行为。</span>
            </div>
          </aside>
          <aside>
            <article></article>
            <div>
              <p>云数据库</p>
              <span>分布式管理，银行级数据灾备。</span>
            </div>
          </aside>
        </section>
      </div>
    </div>
    <div class="production_cuohe">
      <img src="../../assets/img/offerPng/xingneng_background.jpg" alt=""/>
      <img src="../../assets/img/offerPng/xingnenglist.png" class="production_xingnenglist"/>
      <img src="../../assets/img/offerPng/iphone.png" class="production_phone"/>
      <section>
        <span>下载APP体验</span>
        <span>极速交易</span>
      </section>
      <div class="production_cuohe_div">
        <p>协调分布式架构</p>
        <em></em>
        <span>采用Zookeeper 以及MQ、SOA， 分布式应用程序 协调服务配置管理、 集群管理。</span>
      </div>
      <div class="production_cuohe_div">
        <p>负载均衡</p>
        <em></em>
        <span>基于云服务器的 负载均衡，通过 消除单点故障提升 系统健壮度。</span>
      </div>
      <aside>
        <p><span>M.A.X</span> 撮合技术</p>
        <p><span>峰值撮合速度超<em>竞争力非凡</em></span><span><em>50000</em>笔/秒</span></p>
      </aside>
    </div>
    <div class="production_footer">
      <img src="../../assets/img/offerPng/bottom.jpg" alt=""/>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default {
    mounted(){
      $('aside').hover(function () {
        $(this).find('article').stop().animate({opacity: 0.8});
        $(this).find('div span').stop().animate({opacity: 1});
        $(this).find('div p').addClass('color-write');
      }, function () {
        $(this).find('article').stop().animate({opacity: 0});
        $(this).find('div span').stop().animate({opacity: 0});
        $(this).find('div p').removeClass('color-write');
      })
    }
  }
</script>
<style scoped>
  .production_quotation>img{
    width: 100%;
    height: 100%;
  }
  .production_title-text{
    width: 385px;
    height: 80px;
    position: absolute;
    left: 50.4%;
    bottom:18.33%;
    font-size: 24px;
    line-height: 1.5em;
    transform: translateX(-50%);
  }
  .production_quotation section:nth-of-type(1) {
    top: 17.13%;
    left: 30.36%;
  }

  .production_quotation section:nth-of-type(2) {
    top: 17.13%;
    left: 34.5%;
  }

  .production_quotation section:nth-of-type(3) {
    left: 27.44%;
    bottom: 21.6%
  }

  .production_quotation section:nth-of-type(4) {
    left: 38%;
    top: 40.66%
  }

  .production_quotation section:nth-of-type(5) {
right: 37.5%;
  top:50.49%;
  }

  .production_quotation section:nth-of-type(6) {
right: 27.23%;
    top:32.67%;
  }

  .production_quotation section:nth-of-type(7) {
right: 27.60%;
    bottom:37.71%;
  }

  .production_quotation section {
    width: 48px;
    height: 48px;
    position: absolute;
    cursor: pointer;
  }

  .production_quotation section img {
    -webkit-animation: myfirst 2s infinite alternate;
    -o-animation: myfirst 2s infinite alternate;
    animation: myfirst 2s infinite alternate;
  }

  @keyframes myfirst {
    0% {
      opacity: 1;
    }
    25% {
      opacity: 0.7;
    }
    50% {
      opacity: 0.5;
    }
    75% {
      opacity: 0.7;
    }
    100% {
      opacity: 1;
    }
  }

  @-webkit-keyframes myfirst {
    0% {
      opacity: 1;
    }
    25% {
      opacity: 0.7;
    }
    50% {
      opacity: 0.5;
    }
    75% {
      opacity: 0.7;
    }
    100% {
      opacity: 1;
    }
  }

  @-o-keyframes myfirst {
    0% {
      opacity: 1;
    }
    25% {
      opacity: 0.7;
    }
    50% {
      opacity: 0.5;
    }
    75% {
      opacity: 0.7;
    }
    100% {
      opacity: 1;
    }
  }

  .production_jiemian_text {
    position: absolute;
    width: 365px;
    height: 155px;
    top: 50%;
    transform: translateY(-50%);
    left: 27.4%;

  }

  .production_jiemian_text span:nth-of-type(1) {
    font-size: 90px;
  }

  .production_jiemian_text span:nth-of-type(2) {
    font-size: 24px;
  }

  .production_safe_div aside article {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #65bdff;
    opacity: 0;
  }

  .color-write {
    color: #fff !important;
  }

  .production_safe_div aside div {
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .production_safe_div aside {
    position: relative;
    width: 32%;
    height: 49%;
  }

  .production_safe_div aside p {
    color: #333;
    text-align: left;
    padding-left: 40px;
    padding-top: 40px;
    font-size: 32px;
    margin-bottom: 40px;
  }

  .production_safe_div aside span {
    font-size: 20px;
    padding-left: 40px;
    color: #fff;
    opacity: 0;
  }

  .production_safe_div {
    width: 63.54%;
    height: 78.57%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }

  .production_safe_div p {
    font-size: 38px;
    color: #fff;
    text-align: center;
    margin-bottom: 50px;
  }

  .production_safe_div section {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .production_safe_div section aside {
    width: 388px;
    height: 272px;
    background: #fff;
    margin-bottom: 28px;
    cursor: pointer;
    box-sizing: border-box;
  }

  .production_safe_div section aside:nth-of-type(1) {
    background: url("../../assets/img/offerPng/aside1.jpg");
  }

  .production_safe_div section aside:nth-of-type(2) {
    background: url("../../assets/img/offerPng/aside2.jpg");
  }

  .production_safe_div section aside:nth-of-type(3) {
    background: url("../../assets/img/offerPng/aside3.jpg");
  }

  .production_safe_div section aside:nth-of-type(4) {
    background: url("../../assets/img/offerPng/aside4.jpg");
  }

  .production_safe_div section aside:nth-of-type(5) {
    background: url("../../assets/img/offerPng/aside5.jpg");
  }

  .production_safe_div section aside:nth-of-type(6) {
    background: url("../../assets/img/offerPng/aside6.jpg");
  }

  .production_cuohe, .production_safe, .production_jiemian, .production_quotation,.production_title {
    position: relative;
  }

  .production_cuohe section {
    width: 125px;
    text-align: center;
    color: #fff;
    position: absolute;
    right: 19.58%;
    top: 43.5%
  }

  .production_cuohe aside {
    width: 445px;
    height: 155px;
    position: absolute;
    left: 17.71%;
    top: 50%;
    margin-top: -76px;
  }

  .production_cuohe aside p {
    display: flex;
    font-size: 22px;
    align-items: center;
  }

  .production_cuohe aside p:nth-of-type(1) span {
    font-size: 60px;
    font-weight: bold;
    margin-right: 10px;
  }

  .production_cuohe aside p:nth-of-type(1) {
    font-size: 50px;
  }

  .production_cuohe aside p:nth-of-type(2) span:nth-of-type(1) em {
    display: block;
  }

  .production_cuohe aside p:nth-of-type(2) span:nth-of-type(2) em {
    color: red;
    font-size: 60px;
  }

  .production_cuohe_div {
    width: 190px;
    height: 380px;
    padding-top: 58px;
    padding-left: 30px;
    padding-right: 30px;
    box-sizing: border-box;
    position: absolute;
    top: 26.43%
  }

  .production_cuohe_div p {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .production_cuohe_div em {
    width: 30px;
    height: 3px;
    background: red;
    display: block;
    margin-bottom: 10px;
  }

  .production_cuohe_div span {
    font-size: 16px;
  }

  .production_cuohe section span {
    margin-bottom: 8px;
  }

  .production_cuohe > div:nth-of-type(1) {
    right: 43.125%;
  }

  .production_cuohe > div:nth-of-type(2) {
    right: 32.71%;
  }

  .production_xingnenglist {
    position: absolute;
    right: 17.71%;
    top: 16.28%
  }

  .production_phone {
    position: absolute;
    right: 15.625%;
    top: 54.28%
  }
  .production >div{
    min-width: 1200px;
  }
</style>
