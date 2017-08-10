<template>
  <footer>
    <div class="footer layout">
      <div class="footer-header">
        <div class="footer-header-left">
          <i class="iconfont footer-header-left-setting">&#xe6c4;</i>
          <select class="setting-language">
            <option class="setting-language-china">中文</option>
            <option class="setting-language-english">English</option>
          </select>
        </div>
        <div class="footer-header-right">
          <ul class="footer-header-share-box">
            <li class="weChat">
              <a href="javascript:" class="footer-header-share-weChat">
                <i class="iconfont font-size-16">&#xe69f;</i>
              </a>
              <transition enterActiveClass="animated zoomInRight" leaveActiveClass="animated zoomOutDown">
                    <span class="weChatCode" v-show="weChatShow">
                                <img src="../assets/img/footer/WXcode.jpg" alt="关注微信"/>
                            </span>
              </transition>
            </li>
            <li><a href="http://weibo.com/FreeWillex" class="footer-header-share-sina" target="_blank"><i
              class="iconfont font-size-16">&#xe677;</i></a></li>
            <li><a href="http://t.qq.com/FreeWillex" class="footer-header-share-tencent" target="_blank"><i
              class="iconfont font-size-16">&#xe64f;</i></a></li>
            <li><a href="https://www.facebook.com/freewillex" class="footer-header-share-facebook" target="_blank"><i
              class="iconfont font-size-16">&#xe6a8;</i></a></li>
            <li><a href="https://twitter.com/FreeWillex" class="footer-header-share-twitter" target="_blank"><i
              class="iconfont font-size-16">&#xe6a2;</i></a></li>
          </ul>
          <div class="footer-header-right-sub">
            <input type="email" placeholder="输入邮箱，免费订阅！" class="footer-header-right-sub-text"/>
            <a href="javascript:" class="footer-height-right-sub-btn">订阅</a>
          </div>
        </div>
      </div>
      <div class="footer-center">
        <div class="footer-center-left">
          <div class="footer-center-left-text">
            <p class="text-phone">400-960-0212</p>
            <p class="text-time">全年24小时</p>
            <p class="text-dit">(重大节日除外，仅收市话费)</p>
            <a href="javascript:" class="online-chat customerService">在线客服</a>
          </div>
        </div>
        <div class="footer-center-right">
          <dl class="footer-center-right-item">
            <dt class="footer-center-right-item-title">关于我们</dt>
            <router-link to="/introduction" tag="dd"><a href="javascript:">公司介绍</a></router-link>
            <!--<dd><a href="javascript:;">公司介绍</a></dd>-->
            <dd><a href="javascript:">联系我们</a></dd>
            <dd><a href="javascript:">加入我们</a></dd>
            <dd><a href="javascript:">公告</a></dd>
          </dl>
          <dl class="footer-center-right-item">
            <dt class="footer-center-right-item-title">法律声明</dt>
            <router-link to="/dealRegister" tag="dd"><a href="javascript:;">用户协议</a></router-link>
            <!--<dd><a href="javascript:">用户协议</a></dd>-->
            <router-link to="/dealAml" tag="dd"><a href="javascript:;">反洗钱声明</a></router-link>
            <router-link to="/dealRates" tag="dd"><a href="javascript:;">费率声明</a></router-link>
            <!--<dd><a href="javascript:">反洗钱声明</a></dd>-->
            <!--<dd><a href="javascript:">费率声明</a></dd>-->
          </dl>
          <dl class="footer-center-right-item">
            <dt class="footer-center-right-item-title">下载</dt>
            <dd><a href="javascript:">APP</a></dd>
          </dl>
          <dl class="footer-center-right-item">
            <dt class="footer-center-right-item-title">新手</dt>
            <dd><a href="javascript:">常见问题</a></dd>
          </dl>
        </div>
      </div>
      <div class="footer-warning">
        <p class="footer-warning-p"><span class="red">风险警告：</span>交易有风险，入市需谨慎！网站各类新闻资讯不代表任何投资建议，请勿盲从！</p>
        <p class="footer-warning-p">
          Copyright&nbsp;©2015-2017&nbsp;上海数炫网络科技股份有限公司&nbsp;版权所有&nbsp;&nbsp;沪ICP备16036274号</p>
      </div>
      <div class="footer-friendship-link">
        <ul>
          <li>友情链接：</li>
          <li><a href="https://www.freewillex.cn">比特币</a></li>
          <li><a href="https://www.freewillex.cn">比特币交易平台</a></li>
          <li><a href="https://www.freewillex.cn">比特币交易网</a></li>
          <li><a href="https://www.freewillex.cn">比特币中国</a></li>
          <li><a href="https://www.freewillex.cn">中国比特币</a></li>
          <li><a href="https://www.freewillex.cn">莱特币</a></li>
          <li><a href="https://www.freewillex.cn">莱特币交易平台</a></li>
          <li><a href="https://www.freewillex.cn">比特币今日价格</a></li>
          <li><a href="https://www.freewillex.cn">比特币价格走势</a></li>
          <li><a href="https://www.freewillex.cn">比特币走势</a></li>
          <li><a href="https://www.freewillex.cn">比特币行情走势图</a></li>
          <li><a href="https://www.freewillex.cn">比特币投资</a></li>
          <li><a href="https://www.freewillex.cn">比特币行情</a></li>
          <li><a href="https://www.freewillex.cn">虚拟币</a></li>
          <li><a href="https://www.freewillex.cn">虚拟货币</a></li>
          <li><a href="https://www.freewillex.cn">数字货币</a></li>
          <li><a href="https://www.freewillex.cn">数字货币交易平台</a></li>
          <li><a href="https://www.freewillex.cn">虚拟货币交易平台</a></li>
          <li><a href="https://www.freewillex.cn">比特币价格</a></li>
          <li><a href="https://www.freewillex.cn">以太坊</a></li>
          <li><a href="https://www.freewillex.cn">以太经典</a></li>
          <li><a href="https://www.freewillex.cn">量子链</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>
<script>
  import $ from 'jquery';
  export default{
      data(){
          return {
            weChatShow:false
          }
      },
    mounted() {
          let that=this;
      {
          $('.footer-header-share-weChat').hover(function () {
            that.weChatShow=true;
          },function () {
            that.weChatShow=false;
          })
      }//微信二维码显示隐藏
    },
    methods: {

    }
  }
</script>
<style scoped>
  footer {
    background: #2b3643;
    color: #cfd0d2;
  }

  .footer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #797979;
  }

  .footer-header-left {
    display: flex;
    align-items: center;
    height: 7rem;
  }

  .footer-header-left-setting {
    font-size: 2rem;
    color: #fff;
  }

  .setting-language {
    margin: 0 1rem;
    width: 13rem;
    height: 2.5rem;
    line-height: 2.5rem;
    font-size: 1.1rem;
  }

  .footer-header-right {
    display: flex;
    align-items: center;
  }

  .footer-header-share-box {
    display: flex;
    align-items: center;
    margin-right: 3rem;
  }

  .footer-header-share-box li a i {
    color: #cfd0d2;
    font-size: 1.1rem;
    margin: 0 .8rem;
  }

  .footer-header-share-box .font-size-16 {
    font-size: 2rem;
  }

  .footer-header-share-box li a:hover i {
    color: #fff;
  }

  .footer-header-right-sub {
    display: flex;
    align-items: center;
  }

  .footer-header-right-sub-text, .footer-height-right-sub-btn {
    height: 1.7rem;
    padding: 0.7rem 1rem;
    line-height: 1.7rem;
  }

  .footer-height-right-sub-btn {
    background: #01aaef;
    color: #fff;
    padding: 0.9rem 1rem;
    font-size: 1.2rem;
    margin-left: .8rem;
  }

  .footer-height-right-sub-btn:hover {
    background: #0191cb;
  }

  .footer-center {
    padding: 1.6rem 0 3.4rem 0;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .footer-center-left-text {
    width: 22.5rem;
  }

  .footer-center-left-text p {
    text-align: center;
  }

  .text-phone {
    font-size: 2.2rem;
    color: #fff;
  }

  .text-time, .text-dit {
    font-size: 1.1rem;
    color: #cfd0d2;
  }

  .online-chat {
    padding: .5rem .7rem;
    width: 10rem;
    height: 1.5rem;
    text-align: center;
    line-height: 1.5rem;
    color: #01aaef;
    border: 1px solid #01aaef;
    margin: 3rem auto;
  }

  .online-chat:hover {
    color: #fff;
    background: #01aaef;
  }

  .footer-center-right {
    margin-left: 3rem;
    flex: 1;
    display: flex;
    justify-content: space-around;
  }

  .footer-center-right-item-title {
    font-size: 1.5rem;
    color: #fff;
    margin-bottom: 1.5rem;
    font-weight: bold;
  }

  .footer-center-right-item dd a {
    font-size: 1.1rem;
    color: #cfd0d2;
    margin-bottom: .8rem;
  }

  .footer-center-right-item dd a:hover {
    color: #fff;
  }

  .red {
    color: red;
  }

  .footer-warning {
    margin-bottom: 3.5rem;
  }

  .footer-warning-p {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
  }

  .footer-friendship-link {
    margin-bottom: 1rem;
  }

  .footer-friendship-link ul {
    display: flex;
    flex-wrap: wrap;

    padding-bottom: 1rem;
  }

  .footer-friendship-link ul li, .footer-friendship-link ul li a {
    color: #5E5E5E;
    margin: 0 0.2rem;
    font-size: 1.1rem;
    line-height: 1.5rem;
  }

  .footer-friendship-link ul li a:hover {
    color: #fff;
  }

  .weChat {
    position: relative;
  }

  .weChatCode {
    position: absolute;
    width: 7.9rem;
    height: 7.9rem;
    top: -8.3rem;
  }

  .weChatCode img {
    width: 100%;
    height: 100%;
  }
</style>
