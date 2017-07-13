<template>
  <div class="introduction-header">
    <h1 class="introduction-link-title">公司介绍</h1>
    <div class="introduction-top top3">
      <div class="title">
        <p>资金安全</p>
        <p class="font-size-18">银行级别标准</p>
      </div>
    </div>
    <div class="introduction-content">
      <div class="fund-safe-list">
        <div class="introduction-content-col-img"><img src="../../assets/img/introduction/fund1.jpg"  alt=""></div>
        <div class="introduction-content-col">
          <p class="title"><span>1</span> HTTPS全站加密技术</p>
          <p>为了用户信息安全，FreeWillex采用HTTPS全站加密技术，为用户实现信息加密传输，可保障用户隐私信息安全，并能快速识别钓鱼网站，有效的杜绝了网络嗅探、拦截、篡改等潜在威胁。</p>
        </div>
      </div>
      <div class="fund-safe-list">
        <div class="introduction-content-col" style="padding-left: 150px;">
          <p class="title"><span>2</span> “冷钱包”技术</p>
          <p>为用户提供分散式存储机制，并保证私钥永远不会接触U盘、网络，以离线方式存储，让比特币更安全。</p>
        </div>
        <div class="introduction-content-col-img"><img src="../../assets/img/introduction/fund2.jpg"  alt=""></div>
      </div>
      <div class="fund-safe-list">
        <div class="introduction-content-col-img"><img src="../../assets/img/introduction/fund3.jpg"  alt=""></div>
        <div class="introduction-content-col">
          <p class="title"><span>3</span> 交易资金及时划付</p>
          <p>用户的充值与提现操作，全年24小时均可及时入账，为用户提供便捷、高效、优质的服务。</p>
        </div>
      </div>
      <div class="fund-safe-goodness">
        <p class="top">我们的安全优势</p>
        <div class="content">
          <p class="p1"><span>企业级安全服务器</span><span>物理隔离</span></p>
          <p class="p2"><span>加强版防火墙</span><span>自定义加密算法</span></p>
          <p class="p3"><span>离线“冷钱包”</span><span>HTTPS全站加密</span></p>
        </div>
        <p class="bottom"><span>TIPS:</span> 360度无死角监控，多层HTTP自定义防攻击拦截策略等</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default{}
</script>
<style>
  .top3 {
    background: url('../../assets/img/introduction/about3.jpg') no-repeat center;
    background-size: 100%;
  }

  .fund-safe-list {
    border-bottom: 1px solid #dddddd;
    margin: 3.33rem 3.75rem;
    padding-bottom: 3.33rem;
    display: flex;
    align-items: center;
  }

  .introduction-content-col {
    width: 50%;
    position: relative;
  }

  .introduction-content-col-img {
    width: 50%;
    display: flex;
    justify-content: center;
  }

  .introduction-content-col img {
    padding: 0 1.15rem;
  }

  .introduction-content-col .title {
    position: relative;
  }

  .introduction-content-col .title span {
    display: inline;
    position: absolute;
    font-size: 6.333rem;
    left: -3.75rem;
    top: -3.75rem;
  }

  .fund-safe-goodness {
    padding: 0 3.75rem 6.667rem;
    margin-bottom: 4.167rem;
    background: url(../../assets/img/introduction/fund4.png) center center no-repeat;
  }

  .fund-safe-goodness .top {
    text-align: center;
    font-size: 2.5rem;
  }

  .fund-safe-goodness .content {
    margin-bottom: 4.167rem;
    margin-top: 110px;
  }

  .fund-safe-goodness .content p {
    margin-top: 6rem;
    display: flex;

  }

  .fund-safe-goodness .content .p1 span {
    margin-left: 32%;
  }

  .fund-safe-goodness .content .p1 span:first-child {
    margin-left: 26%;
  }

  .fund-safe-goodness .content .p2 span {
    margin-left: 40%;
  }

  .fund-safe-goodness .content .p2 span:first-child {
    margin-left: 24%;
  }

  .fund-safe-goodness .content .p3 span {
    margin-left: 31%;
  }

  .fund-safe-goodness .content .p3 span:first-child {
    margin-left: 28%;
  }
  .fund-safe-goodness .bottom{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1667rem;
    position: relative;
    top:4.1667rem;
  }
  .fund-safe-goodness .bottom span{
    color: #fff;
    display: inline-block;
    background: #01aaef;
    border-radius: 0.667rem !important;
    padding: .25rem;
  }
</style>
