<template>
  <div class="broker">
    <div class="broker-box layout">
      <div class="broker-header">
        <i class="iconfont">&#xe62d;</i>
        <h1>邀请您的亲友可获得免费的比特币</h1>
        <p>亲爱的朋友，只要您将分享链接发送给朋友，或通过邮件邀请他</p>
        <p>每成功邀请一名朋友注册并完成实名认证，即可获得
<span class="fb">5</span> 元奖励；若他还参与交易(交易额≥1000元)，将再奖您 <span class="fb">10</span> 元！</p>
      </div>
      <div class="broker-center">
        <div class="broker-center-left">
          <p>帮助我们成长的同时，您也将获得免费的比特币！</p>
          <p>
            <span>要工作，要勤劳：劳作是最可靠的财富。</span>
            <span>—— 拉•封丹</span>
          </p>
        </div>
        <div class="broker-center-right">
          <p>推荐人编号：<span class="shareBrokerId">252525</span></p>
          <p>
            <a href="javascript:;" class="bds_sqq">腾讯QQ</a>
            <a href="javascript:;" class="bds_tsina">新浪微博</a>
            <a href="javascript:;" class="bds_weixin">微信</a>
            <a href="javascript:;" class="bds_fbook">Facebook</a>
            <a href="javascript:;" class="bds_twi">Twitter</a>
          </p>
          <p><input type="text" value="https://192.168.1.110:3000/broker/register?id=402547" disabled/><i
            class="iconfont">&#xe635;</i><a href="javascript:;">复制</a></p>
          <p><input type="text" placeholder="输入您好友的邮箱"/><a href="javascript:;">邀请</a></p>
          <p>*多个邮箱请用半角逗号分隔</p>
        </div>
      </div>
      <div class="broker-footer">
        <p>已成功推荐了<span>0</span>人</p>
        <p>共获得奖励</p>
        <div class="broker-footer-Q">
          <p><span>0.00</span>CNY</p>
          <p><span>0.00000000</span>BTC</p>
        </div>
        <div class="broker-table">
          <a href="javascript:;" @click="tableView=!tableView"><span>推荐奖励明细</span><i
            class="iconfont">&#xe673;</i></a>
          <table v-show="tableView">
            <thead>
            <tr>
              <td>时间</td>
              <td>帐号</td>
              <td>事件</td>
              <td>获得奖励</td>
            </tr>
            </thead>
            <tbody v-show="!noCord">
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            </tbody>
            <tbody class="noRcoed" v-show="noCord">
            <tr>
              <td colspan="4">
                <i class="iconfont">&#xe661;</i>
                <span>暂无记录</span>
              </td>
            </tr>
            </tbody>
            <tfoot class="table-footer-page">
            <tr>
              <td colspan="4">
                <el-pagination layout="prev, pager, next" :total="10" class="page-right"></el-pagination>
              </td>
            </tr>
            </tfoot>
          </table>
        </div>
        <div class="broker-footer-text">
          <p>FreeWillex自由意志</p>
          <p>由衷地感谢您的支持</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default {
    data() {
      return {
        tableView: false,
        noCord: true
      }
    },
  }
</script>
<style scoped>
  .broker-box {
    background: #fff;
    margin: 2rem auto;
    padding: 2rem;
  }

  .broker-header {
    font-size: 1.167rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.667rem 0;
  }

  .broker-header > i {
    color: #01aaef;
    font-size: 5rem;
    padding: 1rem 1.3rem;
    border: 2px solid #01aaef;
    border-radius: 50%;
  }

  .broker-header > h1 {
    margin: 2.9rem auto;
    font-size: 3.5rem;
    font-weight: 300;
  }

  .broker-header > p {
    margin-bottom: 0.833rem;
    display: flex;
    align-items: center;
  }

  .broker-header > p > span {
    font-weight: bold;
    margin: 0 .5rem;
  }

  .broker-center {
    padding: 2.5rem 0;
    border: 1px solid #dedede;
    border-left: none;
    border-right: none;
    display: flex;
    justify-content: center;
  }

  .broker-center > div {
    width: 43.5rem;
    padding: 0 1.5rem;
  }

  .broker-center-left > p:nth-of-type(1) {
    margin-top: 1.667rem;
    font-size: 1.833rem;
    margin-bottom: 0.833rem;
    color: #01aaef !important;
  }

  .broker-center-left > p:nth-of-type(2) {
    font-size: 1.25rem;
    width: 75%;
    margin: 5.417rem auto 0 auto;
    line-height: 2.5rem;
  }

  .broker-center-left > p:nth-of-type(2) span {
    text-indent: 2em;
  }

  .broker-center-left > p:nth-of-type(2) span:nth-of-type(1) {
    text-align: left;
  }

  .broker-center-left > p:nth-of-type(2) span:nth-of-type(2) {
    text-align: right;
  }

  .broker-center-right {
    border-left: 1px solid #ddd;
  }

  .broker-center-right > p {
    margin-bottom: 0.833rem;
  }

  .broker-center-right > p:nth-of-type(1) {
    margin-top: 1.667rem;
    font-size: 1.833rem;
    display: flex;
    align-items: flex-end;
  }

  .broker-center-right > p:nth-of-type(2) {
    display: flex;
    flex-wrap: wrap;
  }

  .broker-center-right > p:nth-of-type(2) a {
    margin: .5rem .5rem .5rem 0;
    padding-left: 3.5rem;
    width: 9rem !important;
    margin-right: 1.667rem !important;
    text-indent: 0 !important;
    color: #444 !important;
    border: 1px solid #d6e6f2;
    border-radius: 3px !important;
    height: 3.333rem !important;
    line-height: 3.333rem !important;
    box-sizing: border-box;
  }

  .bds_sqq {
    background: url('../assets/img/share/broker_qq.png') 1.25rem center no-repeat #f2f8fc !important;
    background-size: 100% 100%;
  }

  .bds_tsina {
    background: url('../assets/img/share/broker_sina.png') 1.25rem center no-repeat #f2f8fc !important;
    background-size: 100% 100%;
  }

  .bds_weixin {
    background: url('../assets/img/share/broker_wechat.png') 1.25rem center no-repeat #f2f8fc !important;
    background-size: 100% 100%;
  }

  .bds_fbook {
    background: url('../assets/img/share/broker_fb.png') 1.25rem center no-repeat #f2f8fc !important;
    background-size: 100% 100%;
  }

  .bds_twi {
    background: url('../assets/img/share/broker_tw.png') 1.25rem center no-repeat #f2f8fc !important;
    background-size: 100% 100%;
  }

  .broker-center-right > p:nth-of-type(3), .broker-center-right > p:nth-of-type(4) {
    display: flex;
    align-items: center;
    border: 1px solid #e5e5e5;
    font-size: 1.167rem;
    width: 94%;
  }

  .broker-center-right > p:nth-of-type(3) {
    background: #eeeeee;

  }

  .broker-center-right > p:nth-of-type(3) > input {
    cursor: not-allowed;
    outline: none;
    border: none;
    width: 79%;
    padding: 0.667rem 1rem;
  }

  .broker-center-right > p:nth-of-type(3) > a, .broker-center-right > p:nth-of-type(4) > a {
    color: #FFFFFF;
    background-color: #01aaef;
    flex: 1;
    text-align: center;
    height: 2.6rem;
    line-height: 2.6rem;
    margin-left: 1rem;
  }

  .broker-center-right > p:nth-of-type(4) > input {
    outline: none;
    border: none;
    width: 82.5%;
    padding: 0.667rem 1rem;
  }

  .broker-footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .broker-footer > p {
    margin-bottom: 0.833rem;
  }

  .broker-footer > p:nth-of-type(1) {
    font-size: 1.833rem;
    display: flex;
    align-items: flex-end;
    margin-top: 1.667rem;
  }

  .broker-footer > p:nth-of-type(1) span {
    font-size: 3rem;
    margin: 0 .5rem;
  }

  .broker-footer > p:nth-of-type(2) {
    font-size: 1.333rem;
    margin-top: 1.25rem;
  }

  .broker-footer > div {
    margin-bottom: 0.83rem;
  }

  .broker-footer-Q {
    display: flex;
    align-items: center;
  }

  .broker-footer-Q > p:nth-of-type(2) {
    margin-left: 6.667rem;
  }

  .broker-footer-Q > p {
    display: flex;
    align-items: flex-end;
    font-size: 1.333rem;
  }

  .broker-footer-Q > p > span {
    font-size: 3rem;
    margin-bottom: -.3rem;
    margin-right: .5rem;
  }

  .broker-table {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .broker-table > a {
    display: flex;
    align-items: center;
    font-size: 1.333rem;
    color: #01aaef;
    margin: 2rem 0;
  }

  .broker-table > a span {
    margin-right: .5rem;
    text-decoration: underline;
  }

  .broker-table table {
    border-spacing: 0;
    border-collapse: collapse;
  }

  .broker-table table td {
    padding: 0.667rem;
    width: 17.25rem;
    text-align: center;
  }

  .broker-table table thead {
    border: 1px solid #dddddd;
  }

  .broker-table table tbody {
    border: 1px solid #dddddd;
    background: #f9f9f9;
  }

  .noRcoed tr td {
    padding: 6.667rem;
  }

  .noRcoed tr td span, .noRcoed tr td i {
    display: inline;
  }

  .table-footer-page td {
    padding-top: 1.5rem;
    text-align: right !important;
  }

  .broker-footer-text {
    margin-top: 6.667rem;
    text-align: center;
  }

  .broker-footer-text p {
    margin-bottom: 0.83rem;
    font-size: 1.833rem;
  }

  .broker-footer-text p:nth-of-type(2) {
    font-size: 3rem;
  }
</style>
