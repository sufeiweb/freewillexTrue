<template>
  <div class="RecommendedPerson">
    <div class="row broker-box text-center">
      <p class="title margin-top-border">邀请您的亲友可获得免费的比特币</p>
      <p>亲爱的朋友</p>
      <p>只要您将分享链接发送给朋友，或通过邮件邀请他
        每成功邀请一名朋友注册并完成实名认证，即可获得5元奖励；若他还参与交易，将再奖您10元！</p>
    </div>
    <div class="row broker-box text-center">
      <p class="title" style="margin-bottom: 0">帮助我们成长的同时</p>
      <p class="title">您也将获得免费的比特币</p>
    </div>
    <div class="broker-share">
      <p class="broker-share-num">推荐人编号：{{recommeentCode}}</p>
      <div class="broker-share-btn" @click="share">分享</div>
      <div class="input-group">
        <input type="text" class="broker-input" v-model="url" id="broker-ipt-url" readonly>
        <button class="fw-btn-input fw-btn-blue" @click="copyText($event)" text="复制成功">复制</button>
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
          <tbody v-show="noCord">
          <tr v-for="item in brokerList">
            <td>{{item.createDate | dateYMDHIS}}</td>
            <td>{{item.remark}}</td>
            <td>{{item.activityName}}</td>
            <td>{{item.amount | float8}}/{{item.currency}}</td>
          </tr>
          </tbody>
          <tbody class="noRcoed" v-show="!noCord">
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
              <a href="javascript:;" @click="getMoreList()">加载更多...</a>
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
</template>
<script>
  export default{
    data(){
      return {
        url: 'http://192.168.1.110:9999/#/home',
        recommeentCode: '666666',
        tableView: false,
        noCord: false,
        totalNumH: 10,
        currentPage: 0,
        brokerList: [],
      }

    },
    mounted(){
      {
        this.$store.dispatch('hideHeader');
        this.$store.dispatch('hideFooter');
      }
      let url = window.location.href;
//        alert(url)
    },
    //http://192.168.1.110:8080/#/RecommendedPerson?language=zh-cn&userId=ff8080815dbffaef015dc07011a90015&lang=zh-cn&token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODUwMzAzMzAzMiIsInNjb3BlcyI6WyJST0xFX09SRElOQVJZX1VTRVIiXSwiYWNjb3VudElkIjoiZmY4MDgwODE1ZGJmZmFlZjAxNWRjMDcwMTFhOTAwMTUiLCJpc3MiOiJGcmVlV2lsbGV4IiwiaWF0IjoxNTA0ODM4Njc1LCJleHAiOjE1MDU0Mzg2NzV9.ofS4NnKIxf3lSPIYPMH5XwCSQg-GpmOss2Vh1BxQY-DWm5NWaFkMapNR0XtARdQ4_8B5wQjmKzPg8GtdK_BLnw
    methods: {
      copyText(ev){
        this.copy('broker-ipt-url', ev.target.getAttribute('text'))
      },
      share(){
      },
      getMoreList(){
        this.$http({
          url: this.$URL_API + 'activity/rewardList',
          method: 'POST',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Authorization': 'Bearer ' + this.$store.state.token,
            "Content-Type": "application/json;charset=UTF-8",
          },
          data: {
            pageNo: ++this.currentPage - 1,
            pageSize: 10,
            param: {
              activityCode: 'RECOMMENDER'
            }
          }
        })
      }
    }
  }
</script>
<style scoped>
  .RecommendedPerson {
    background: #fff;
    height: 100%;
    padding: 70px;
  }

  .text-center {
    text-align: center;
  }

  .broker-box {
    padding: 2rem;
    border-bottom: 1px solid #aaa;
  }

  .broker-box p {
    font-size: 36px;
    padding: 10px 0;
  }

  .RecommendedPerson .title {
    font-size: 48px;
    margin-bottom: 2.5rem;
    font-weight: bold;
  }

  .broker-share .broker-share-num {
    margin: 30px 0;
    font-size: 34px;
    color: #666;
  }

  .broker-share-btn {
    width: 100%;
    font-size: 34px;
    text-align: center;
    background: #01aaef;
    color: #fff;
    height: 90px;
    line-height: 90px;
    border-radius: 4px;
    margin-bottom: 40px;
  }

  .input-group {
    width: 100%;
    font-size: 34px;
    height: 90px;
    line-height: 90px;
    border: 1px solid #aaa;
  }

  .input-group {
    display: flex;
  }

  .input-group input {
    width: 85%;
    border: none;
    font-size: 30px;
    padding-left: 20px;
    background: #f9f9f9;
  }

  .input-group button {
    width: 15%;
    font-size: 34px;
    background: #01aaef;
    color: #fff;
    border: none;
  }

  .broker-table {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .broker-table > a {
    display: flex;
    align-items: center;
    font-size: 30px;
    color: #01aaef;
    margin: 2rem 0;
  }

  .broker-table > a i {
    font-size: 30px;
  }

  .broker-table > a span {
    margin-right: .5rem;
    text-decoration: underline;
  }

  .broker-table table {
    font-size: 30px;
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

  }

  .broker-table table tbody tr:nth-child(odd) {
    background: #f9f9f9;
  }

  .broker-table table tbody tr:hover {
    background: #f9f9f9;
  }

  .noRcoed tr td {
    padding: 6.667rem;
  }

  .noRcoed tr td span, .noRcoed tr td i {
    display: inline;
    font-size: 30px;
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
    font-size: 2.5rem;
  }

  .broker-footer-text p:nth-of-type(2) {
    font-size: 3rem;
  }

  .table-footer-page td a {
    font-size: 30px;
    text-decoration: underline;
    color: #01aaef;
  }
</style>
