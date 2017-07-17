<template>
  <div class="quotation">
    <div class="quotation-header">
      <img src="../assets/img/quotation/quotation_logo.png"/>
      <div class="transaction-variety">
        <span>BTC/CNY</span>
        <div class="transaction-btn-box">
          <span>选择交易品种</span>
          <i class="iconfont">&#xe673;</i>
        </div>
      </div>
      <div class="follow-us">
        <div class="follow-icon">
          <i class="iconfont">&#xe677;</i>
          <i class="iconfont">&#xe69f;</i>
        </div>
        <span>关注FreeWillex</span>
      </div>
      <div class="header-other">
        <a href="javascript:">
          <i class="iconfont">&#xe699;</i>
          <span>下载APP</span>
        </a>
        <a href="javascript:">
          <i class="iconfont">&#xe66e;</i>
          <span>截屏</span>
        </a>
        <a href="javascript:">
          <i class="iconfont">&#xe6cc;</i>
          <span>价格预警</span>
        </a>
      </div>
    </div>
    <div class="quotation-center">
      <div class="past-transaction">
        <div class="quotation-center-title">过往交易</div>
        <div class="quotation-center-table">
          <table>
            <thead>
              <tr>
                <td>价格(CMY)</td>
                <td>数量</td>
                <td>时间</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items">
                <td class="display-flex" :class="item.oStatus? 'red':'green'">{{item.price}}<i class="iconfont" v-show="!item.oStatus">&#xe6a1;</i><i class="iconfont" v-show="item.oStatus">&#xe6a9;</i></td>
                <td>{{item.num}}</td>
                <td>{{item.timer}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="handicap">
        <div class="quotation-center-title">盘口</div>
        <div class="quotation-center-table">
          <table>
            <thead>
            <tr>
              <td>价格(CMY)</td>
              <td>数量</td>
              <td>我的数量</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in items2">
              <td class="display-flex" :class="item.oStatus? 'red':'green'">{{item.price}}<i class="iconfont" v-show="!item.oStatus">&#xe6a1;</i><i class="iconfont" v-show="item.oStatus">&#xe6a9;</i></td>
              <td>{{item.num}}</td>
              <td>{{item.my_num}}</td>
            </tr>
            </tbody>
            <tbody class="tbody-center">
            <tr><td colspan="3">差价 {{0.58}} CNY</td></tr>
            </tbody>
            <tbody>
            <tr v-for="item in items3">
              <td class="display-flex" :class="item.oStatus? 'red':'green'">{{item.price}}<i class="iconfont" v-show="!item.oStatus">&#xe6a1;</i><i class="iconfont" v-show="item.oStatus">&#xe6a9;</i></td>
              <td>{{item.num}}</td>
              <td>{{item.my_num}}</td>
            </tr>
            </tbody>
          </table>

        </div>
      </div>
      <div class="quotation-chart">
        <div class="quotation-center-title">行情图表</div>
        <div class="quotation-chart-line"></div>
        <div class="delegate-panel">
          <div class="delegate-panel-title">委托面板</div>
          <div class="delegate-panel-btn-down">
              <span>当前委托</span>
              <i class="el-icon-caret-bottom"></i>
          </div>
          <div class="delegate-panel-data">
            <table class="delegate-panel-data-table">
              <thead class="delegate-panel-data-thead">
                <tr>
                  <td>时间</td>
                  <td>委托量</td>
                  <td>成交量</td>
                  <td>方向</td>
                  <td>委托类型</td>
                  <td>委托价格</td>
                  <td>成交均价</td>
                  <td>操作</td>
                </tr>
              </thead>
              <tbody class="delegate-panel-data-tbody">
                <tr v-for="item in panel_data">
                  <td>{{item.timer}}</td>
                  <td>{{item.entrust_num}}</td>
                  <td>{{item.deal_num}}</td>
                  <td>{{item.direction}}</td>
                  <td>{{item.delegate_type}}</td>
                  <td>{{item.entrust_price}}</td>
                  <td>{{item.deal_price}}</td>
                  <td><a href="javascript:">撤单</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="assets">
        <div class="quotation-center-title">资产</div>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default {
      data() {
          return {
              items: [
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:false},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:false},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:false},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:false},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:false},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:false},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:false},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:false},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  {price:12345.12,num:345.12345678,timer:'12.33.5',oStatus:true},
                  ],
              items2: [
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:true},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:true},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:true},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:true},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:true},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:true},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:true},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:false},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:true},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:false},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:true},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:false},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:true},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:false},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:true},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:true},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:false},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:true},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:false},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:true},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:true}
        ],
              items3: [
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:true},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:true},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:true},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:true},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:true},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:true},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:true},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:false},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:true},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:false},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:true},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:false},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:true},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:false},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:true},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:true},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:false},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:true},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:false},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:true},
          {price:12345.12,num:345.12300000,my_num:'12',oStatus:true}
        ],
              panel_data: [
                  {timer:'02-02 13:12:12',entrust_num:123.12345678,deal_num:123.12345678,direction:'买入',delegate_type:'市价买入',entrust_price:1234.12,deal_price:1234.12},
                  {timer:'02-02 13:12:12',entrust_num:123.12345678,deal_num:123.12345678,direction:'买入',delegate_type:'市价买入',entrust_price:1234.12,deal_price:1234.12},
                  {timer:'02-02 13:12:12',entrust_num:123.12345678,deal_num:123.12345678,direction:'买入',delegate_type:'市价买入',entrust_price:1234.12,deal_price:1234.12},
                  {timer:'02-02 13:12:12',entrust_num:123.12345678,deal_num:123.12345678,direction:'买入',delegate_type:'市价买入',entrust_price:1234.12,deal_price:1234.12},
                  {timer:'02-02 13:12:12',entrust_num:123.12345678,deal_num:123.12345678,direction:'买入',delegate_type:'市价买入',entrust_price:1234.12,deal_price:1234.12},
                  {timer:'02-02 13:12:12',entrust_num:123.12345678,deal_num:123.12345678,direction:'买入',delegate_type:'市价买入',entrust_price:1234.12,deal_price:1234.12},
                  {timer:'02-02 13:12:12',entrust_num:123.12345678,deal_num:123.12345678,direction:'买入',delegate_type:'市价买入',entrust_price:1234.12,deal_price:1234.12},
                  {timer:'02-02 13:12:12',entrust_num:123.12345678,deal_num:123.12345678,direction:'买入',delegate_type:'市价买入',entrust_price:1234.12,deal_price:1234.12},
                  {timer:'02-02 13:12:12',entrust_num:123.12345678,deal_num:123.12345678,direction:'买入',delegate_type:'市价买入',entrust_price:1234.12,deal_price:1234.12},
                  {timer:'02-02 13:12:12',entrust_num:123.12345678,deal_num:123.12345678,direction:'买入',delegate_type:'市价买入',entrust_price:1234.12,deal_price:1234.12}
                  ]
          }
      },
    mounted() {
      {
          let oHeight=$(window).height();
          $('.quotation').css({height:oHeight,maxHeight:oHeight})
      }
    }
  }
</script>
<style>
  .quotation{
    width: 100%;
    background:#fff;
    overflow: hidden;
  }
  .red{
    color: red !important;
  }
  .green{
    color:  green !important;
  }
  .quotation-header{
    display: flex;
    height: 2rem;
    align-items: center;
    padding: 1rem 0;
  }
  .quotation-header>img{
    padding: 0 1.5rem;
  }
  .quotation-header>div{
    padding: 0 1.5rem;
    border-left: 1px solid #ddd;
  }
  .transaction-btn-box, .follow-icon, .header-other{
    display: flex;
    align-items: center;
  }
  .transaction-variety>span{
    font-size: 1.167rem;
    font-weight: bold;
    color: #66a9e6;
  }
  .transaction-btn-box>span{
    font-size: 1rem;
    color: #8a9195;
  }
  .transaction-btn-box > .iconfont{
  color:#000;
    font-weight: bold;
    margin-left: 1rem;
  }
  .follow-icon{
    justify-content: space-between;
    padding: 0 1.2rem;
  }
  .follow-icon i:nth-of-type(1){
    color: #db2b22;
  }
  .follow-icon i:nth-of-type(2){
    color:#1aad19;
  }
  .follow-us>span{
    color: #8a9195;
  }
  .header-other a{
    color: #8a9195;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 1.5rem;
  }
  .header-other a i{
    color: #3d84d6;
  }
  .quotation-center{
    background: #1e2b34;
    display: flex;
  }
  .quotation-center>div{
    border: 1px solid #15232c;
    border-top: none;
    border-bottom: none;
  }
  .quotation-center>div:nth-of-type(1),  .quotation-center>div:nth-of-type(2){
    width: 15%;
    min-width: 15.4rem;
  }
  .quotation-center>div:nth-of-type(4){
    width: 10%;
    min-width: 12.5rem;
  }
  .quotation-center>div:nth-of-type(3){
    width: 60%;
    min-width: 60rem;
  }
  .quotation-center-title{
    background: #42515a;
    color: #b4b9bc;
    padding: 0.866rem 1rem;
  }
  .display-flex{
    display: flex;
    align-items: center;
  }
  .quotation-center-table table{
    border-spacing: 0;
    border-collapse: collapse;
  }
  .quotation-center-table table td{
    padding: .2rem .8rem;
    text-align: center;
  }
  .quotation-center-table table td .iconfont{
    font-size: 1rem;
    margin-left: .5rem;
    transform: rotate(45deg);
  }
  .quotation-center-table table thead td{
    color: #abb0b4 !important;
  }
  .quotation-center-table table thead{
    border-bottom: 2px solid #4b555d;
  }
  .quotation-center-table table td:nth-of-type(1){
    width: 30%;
    color:#ced2d5 ;
    text-align: left;
  }
  .quotation-center-table table td:nth-of-type(2){
    width: 40%;
    color:#ced2d5 ;
  }
  .quotation-center-table table td:nth-of-type(3){
    width: 30%;
    color:#81898e ;
    text-align: right;
  }
  .tbody-center {
    border: 2px solid #4b555d;
    border-left: none;
    border-right: none;
  }
  .tbody-center td{
    width: 100%;
    height: 3.5rem;
    text-align: right !important;
  }

  .quotation-chart-line{
    height: 45rem;
  }

  .delegate-panel {


  }
  .delegate-panel-title{
    padding:0 1.5rem ;
    background: #42515a;
    color: #d3d6d8;
    height: 3.333rem;
    line-height: 3.333rem;
    font-size: 1.333rem;
  }
  .delegate-panel-btn-down {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 1rem 1.5rem;
    font-size: 1.083rem;
    color: #dfe1e2 !important;
  }
  .delegate-panel-btn-down span{
    margin-right: .8rem;
  }
  .delegate-panel-data{
    padding:0 1.5rem;
  }
  .delegate-panel-data{
  color:#caced0;
  }
  .delegate-panel-data-table{
    border-spacing: 0;
    border-collapse: collapse;
  }
  .delegate-panel-data-thead {
    width: 100%;
    border:2px solid #caced0;
    border-left: none;
    border-right: none;
  }
</style>
