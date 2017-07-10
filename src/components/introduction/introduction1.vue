<template>
  <div class="introduction-header">
    <h1 class="introduction-link-title">公司介绍</h1>
    <div class="introduction-top top1">
      <div class="title">
        <p>技术先进</p>
        <p>安全为本</p>
      </div>
    </div>
    <div class="introduction-content">
      <div class="introduction-content-header">
        <div class="introduction-content-header-item">
          <div class="introduction-content-header-item-icon"><i class="iconfont">&#xe6b9;</i></div>
          <div class="introduction-content-header-item-text">
            <p class="title">分布式服务架构</p>
            <p>
              将现有业务进行拆分，服务之间通过简单的、精确定义的接口进行通信，保持服务之间相对独立且无依赖，使多个服务组成的业务更加的清晰、灵活；同时将负载由单个节点转移到多个，将高并发的压力进行有效分解，使每个节点发挥最高的性能，同时也避免了单个节点失效导致的大面积瘫痪。</p>
          </div>
        </div>
        <div class="introduction-content-header-item">
          <div class="introduction-content-header-item-icon"><i class="iconfont">&#xe6b3;</i></div>
          <div class="introduction-content-header-item-text">
            <p class="title">分布式撮合</p>
            <p>在多方交易中，存在中间一方将多方的信息集中起来，然后将信息进行匹配，以便达到多方对信息的需求，由市场规则对买卖交易进行的匹配。因此对其撮合性能要求极高，分布式撮合应运而生。</p>
          </div>
        </div>
        <div class="introduction-content-header-item">
          <div class="introduction-content-header-item-icon"><i class="iconfont">&#xe6b4;</i></div>
          <div class="introduction-content-header-item-text">
            <p class="title">分布式缓存</p>
            <p>在高效的分布式撮合中，需要处理大量动态数据，分布式缓存的存在使得这一需求得到轻松的实现。</p>
          </div>
        </div>
        <div class="introduction-content-header-item">
          <div class="introduction-content-header-item-icon"><i class="iconfont">&#xe6b5;</i></div>
          <div class="introduction-content-header-item-text">
            <p class="title">多层数据校验</p>
            <p>从用户端发起请求到服务端的整个过程中，多次对数据进行校验，保证了数据的正确性、完整性，极大的规避了各种攻击，保证系统的稳健运行。</p>
          </div>
        </div>
      </div>
      <ul class="introduction-content-middle">
        <li>
          <p class="icon"><i class="iconfont">&#xe6b6;</i></p>
          <p class="font-size-18">银行级SSL安全连接</p>
          <p class="line"></p>
          <p class="detail">确保数据通讯的安全不会被恶意截取</p>
        </li>
        <li>
          <p class="icon"><i class="iconfont">&#xe6b7;</i></p>
          <p class="font-size-18">加密用户访问</p>
          <p class="line"></p>
          <p class="detail">强化网站用户侧可信展示程度，防劫持、防篡改、防监听</p>
        </li>
        <li>
          <p class="icon"><i class="iconfont">&#xe6b8;</i></p>
          <p class="font-size-18">实时防护</p>
          <p class="line"></p>
          <p class="detail">对系统漏洞、黑客攻击、服务器状态实时监控，及时修复</p>
        </li>
      </ul>
      <div class="introduction-content-footer">
        <p class="title">除了<span>安全</span>，我们还做了这些</p>
        <div class="content">
          <p class="p1">运用Java 技术开发后端，让安全的多线程、动态分布式技术服务平台与用户</p>
          <p class="p2">使用可靠的协调分布式系统Zookeeper以及MQ、SOA，<br>使分布式应用程序协调服务、配置管理、集群管理</p>
          <p class="p3">交易大量采用了Redis来做持久化的存储和数据缓存</p>
          <p class="p4">数据库通过MySQL InnoDB来实现交易数据的存储</p>
          <p class="p5">交易终端覆盖Windows/Mac OS X电脑端以及Android/IOS移动端，为用户提供便捷的交易体验</p>
        </div>
      </div>
      <div class="introduction-content-flow">
        <img src="../../assets/img/introduction/about_flow.png">
      </div>
      <div class="introduction-content-bottom">
        <p>为了用户，FreeWillex自由意志一直在努力。</p>
      </div>
    </div>
  </div>
</template>
<style>
  .introduction-content-header-item {
    width: 100%;
    padding: 2.5rem 0;
    display: flex;
    align-items: center;
  }

  .introduction-content-header-item-icon {
    width: 16.67rem;
    color: #01aaef;
    text-align: center;
    margin-left: 8.33%;
  }

  .introduction-content-header-item-icon .iconfont {
    font-size: 4.17rem;
  }

  .introduction-content-header-item-text {
    width: 66.66%;
    font-size: 1.167rem;
  }

  .introduction-content-header-item-text .title {
    font-size: 1.67rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .introduction-content-middle {
    display: flex;
    justify-content: space-around;
    margin: 3.33rem 5%;
    width: 90%;
  }

  .introduction-content-middle li {
    font-size: 1.16rem;
    height: 19.83rem;
    text-align: center;
    float: left;
    width: 29.3%;
    margin: 0 2%;
    border: 1px solid #01aaef;
    border-bottom: 0.5rem solid #01aaef;
  }

  .introduction-content-middle li .icon {
    margin-top: 4rem
  }

  .introduction-content-middle li p {
    margin: 0 0 1rem;
  }

  .introduction-content-middle li .icon i {
    font-size: 4.17rem;
    color: #01aaef;
  }

  .introduction-content-middle li .detail {
    margin-top: 2.08rem;
    padding: 0 2.5rem;
  }

  .introduction-content-middle li .line {
    width: 7.33rem;
    height: 0.25rem;
    margin: 0 auto;
    background: #01aaef;
  }

  .introduction-content-footer {
    border-top: 1px solid #dddddd;
    margin: 3.33rem 7.083rem;
  }

  .introduction-content-footer .title {
    margin-top: 3.33rem;
    text-align: center;
    font-size: 3rem;
    display: flex;
    justify-content: center;
  }

  .introduction-content-footer .title span {
    font-weight: bold;
  }

  .introduction-content-footer .content {
    font-size: 1.167rem;
    padding: 2.5rem;
    background: url(../../assets/img/introduction/about_skill.png) 6.667rem center no-repeat;
  }

  .introduction-content-footer .content p {
    margin: 3rem 0;
  }

  .introduction-content-footer .content p.p1 {
    margin-left: 35%;
    margin-top: 5rem;
  }

  .introduction-content-footer .content p.p2 {
    margin-left: 40%;
  }

  .introduction-content-footer .content p.p3 {
    margin-left: 45%;
  }

  .introduction-content-footer .content p.p4 {
    margin-left: 40%;
  }

  .introduction-content-footer .content p.p5 {
    margin-left: 35%;
  }

  .introduction-content-flow {
    border-top: 1px solid #dddddd;
    margin: 3.33rem 7.083rem;
    display: flex;
    justify-content: center;
  }

  .introduction-content-flow img {
    margin-top: 3.33rem;
  }

  .introduction-content-bottom {
    width: 100%;
    height: 17.5rem;
    line-height: 17.5rem;
    color: #fff;
    font-size: 3rem;
    text-align: center;
    background: url(../../assets/img/introduction/about_bottom.jpg) center center no-repeat;
    background-size: 100%;
  }

  .top1 {
    background: url('../../assets/img/introduction/about1.jpg') no-repeat center;
    background-size: 100%;
  }
</style>
