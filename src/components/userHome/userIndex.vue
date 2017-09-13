<template>
  <div class="userIndex">
    <div class="userIndex-header">
      <div class="index-title">
        <span>账户概要</span>
        <a href="javascript:" @click="refresh()"><i class="iconfont">&#xe6c1;</i></a>
      </div>
      <div class="money-tabs-box">
        <div class="money-tabs-left">
          <select class="viewStyle">
            <option value="1" selected>详情模式</option>
            <option value="2">简洁模式</option>
            <option value="3">饼图模式</option>
          </select>
          <select class="coinStyle" @click="coinStyle1($event)">
            <option v-for="(item,index) in AccountCNY" :value="item" :name='index'>{{item}} {{item | translate}}
            </option>
          </select>
        </div>
        <div class="money-tabs-right">
          <i class="iconfont">&#xe6c5;</i>
          <router-link to="/broker">我的推荐人信息</router-link>
          <!--<a href="javascript:">我的推荐人信息</a>-->
          <span class="money-tabs-right-dian"></span>
        </div>
      </div>
      <div class="total-assets">
        <div class="assets-box">
          <div class="assets-content">
            <h1 class="assets-title">总资产</h1>
            <span
              class="assets-money">{{this.compulationMoneyT('.balance1')}}{{zongjia}} {{money_style}}</span>
            <div v-show="money_hide">
              <div v-for="(item,index) in AccountCNY" :class="'assets_'+item">
                <span></span><span><em>{{item}}</em>
                <b v-if="item==='CNY'">{{(CNYMoneny[item] ? CNYMoneny[item].balance : 0) | float2}}</b>
                <b v-else>{{(CNYMoneny[item] ? CNYMoneny[item].balance : 0) | float8}}</b>
                <transition enterActiveClass="animated fadeIn" leaveActiveClass="animated fadeOut">
                <aside style="display: inline-block"
                       v-show="money_style!==item"
                       class="balance1">≈ {{compulation(CNYMoneny[item] ? CNYMoneny[item].balance : 1, officePrice[item] ? officePrice[item].price : 1, officePrice[money_style] ? officePrice[money_style].price : 1, money_style)}} {{money_style}}</aside>
              </transition>
              </span>
              </div>
            </div>
          </div>
          <div id="ZEcharts" class="echarts-show"></div>
        </div>
        <div class="assets-proportion">
          <span v-for="item in AccountCNY" :name="item+'Z'"
                :style="'width:'+compulationLang(compulation(CNYMoneny[item] ? CNYMoneny[item].balance : 1, officePrice[item] ? officePrice[item].price : 1, officePrice[money_style] ? officePrice[money_style].price : 1, money_style),CNYMoneny,AccountCNY,'balance',officePrice[money_style] ? officePrice[money_style].price : 1, money_style,officePrice)"></span>
          <!--<span v-for="item in AccountCNY" :style="'width:'+this.computedLangD1(BTCBTC.locked)"></span>-->
        </div>
      </div>
      <div class="net-assets">
        <div class="assets-box">
          <div class="assets-content">
            <div class="Q-C-T">
              <h1 class="assets-title">净资产</h1>
              <router-link to="/recharge">充值</router-link>
              <router-link to="/cash">提现</router-link>
            </div>
            <span
              class="assets-money">{{this.compulationMoneyT('.balance2')}}{{jingjia}} {{money_style}}</span>
            <div v-show="money_hide">
              <div v-for="item in AccountCNY" :class="'assets_'+item">
                <span></span><span><em>{{item}}</em> <b v-if="item==='CNY'">{{(CNYMoneny[item] ? CNYMoneny[item].balance : 0) | float2}}</b>
                <b v-else>{{(CNYMoneny[item] ? CNYMoneny[item].balance : 0) | float8}}</b>
                 <transition enterActiveClass="animated fadeIn" leaveActiveClass="animated fadeOut">

                <aside style="display: inline-block"
                       v-show="money_style!==item"
                       class="balance2">≈ {{compulation(CNYMoneny[item] ? CNYMoneny[item].balance : 0, officePrice[item] ? officePrice[item].price : 0, officePrice[money_style] ? officePrice[money_style].price : 0, money_style)}} {{money_style}}</aside>
              </transition></span>
              </div>
            </div>
          </div>
          <div id="JEcharts" class="echarts-show"></div>
        </div>
        <div class="assets-proportion">
          <span v-for="item in AccountCNY" :name="item+'J'"
                :style="'width:'+compulationLang(compulation(CNYMoneny[item] ? CNYMoneny[item].balance : 1, officePrice[item] ? officePrice[item].price : 1, officePrice[money_style] ? officePrice[money_style].price : 1, money_style),CNYMoneny,AccountCNY,'balance',officePrice[money_style] ? officePrice[money_style].price : 1, money_style,officePrice)"></span>
        </div>
      </div>
      <div class="available-assets" v-show="!more_style">
        <div class="assets-box">
          <div class="assets-content">
            <h1 class="assets-title">可用</h1>
            <span
              class="assets-money">{{this.compulationMoneyT('.amount')}}{{keyong}} {{money_style}}</span>
            <div v-show="money_hide">
              <div v-for="item in AccountCNY" :class="'assets_'+item">
                <span></span><span><em>{{item}}</em>
                <b v-if="item==='CNY'">{{(CNYMoneny[item] ? CNYMoneny[item].amount : 0) | float2}}</b>
                <b v-else>{{(CNYMoneny[item] ? CNYMoneny[item].amount : 0) | float8}}</b>
                <!--{{(CNYMoneny[item] ? CNYMoneny[item].amount : 0) | float8}}-->
                 <transition enterActiveClass="animated fadeIn" leaveActiveClass="animated fadeOut">
                <aside style="display: inline-block"
                       v-show="money_style!==item"
                       class="amount">≈ {{compulation(CNYMoneny[item] ? CNYMoneny[item].amount : 0, officePrice[item] ? officePrice[item].price : 0, officePrice[money_style] ? officePrice[money_style].price : 0, money_style)}} {{money_style}}</aside>
              </transition></span>
              </div>
            </div>
          </div>
          <div id="KEcharts" class="echarts-show"></div>
        </div>
        <div class="assets-proportion">
          <span v-for="item in AccountCNY" :name="item+'K'"
                :style="'width:'+compulationLang(compulation(CNYMoneny[item] ? CNYMoneny[item].amount : 1, officePrice[item] ? officePrice[item].price : 1, officePrice[money_style] ? officePrice[money_style].price : 1, money_style),CNYMoneny,AccountCNY,'amount',officePrice[money_style] ? officePrice[money_style].price : 1, money_style,officePrice)"></span>
        </div>
      </div>
      <div class="blocked-assets" v-show="!more_style">
        <div class="assets-box">
          <div class="assets-content">
            <h1 class="assets-title">冻结</h1>
            <span
              class="assets-money">{{this.compulationMoneyT('.locked')}}{{dongjie}} {{money_style}}</span>
            <div v-show="money_hide">
              <div v-for="item in AccountCNY" :class="'assets_'+item">
                <span></span><span><em>{{item}}</em>
                <b v-if="item==='CNY'">{{(CNYMoneny[item] ? CNYMoneny[item].locked : 0) | float2}}</b>
                <b v-else>{{(CNYMoneny[item] ? CNYMoneny[item].locked : 0) | float8}}</b>
                <!--{{(CNYMoneny[item] ? CNYMoneny[item].locked : 0) || float8}}-->
                <transition enterActiveClass="animated fadeIn" leaveActiveClass="animated fadeOut">
                <aside style="display: inline-block"
                       v-show="money_style!==item"
                       class="locked">≈ {{compulation(CNYMoneny[item] ? CNYMoneny[item].locked : 0, officePrice[item] ? officePrice[item].price : 0, officePrice[money_style] ? officePrice[money_style].price : 0, money_style)}} {{money_style}}</aside>
                </transition></span>
              </div>
            </div>
          </div>
          <div id="DEcharts" class="echarts-show"></div>
        </div>
        <div class="assets-proportion">
          <span v-for="item in AccountCNY" :name="item+'D'"
                :style="'width:'+compulationLang(compulation(CNYMoneny[item] ? CNYMoneny[item].locked : 1, officePrice[item] ? officePrice[item].price : 1, officePrice[money_style] ? officePrice[money_style].price : 1, money_style),CNYMoneny,AccountCNY,'locked',officePrice[money_style] ? officePrice[money_style].price : 1, money_style,officePrice)"></span>
        </div>
      </div>
      <div class="more">
        <a href="javascript:" v-show="more_style" @click="open_more()">更多</a>
        <a href="javascript:" v-show="!more_style" @click="close_more()">收起</a>
      </div>
    </div>
    <dottedLine></dottedLine>
    <userFooter></userFooter>
  </div>
</template>
<script>
  import $ from 'jquery';

  import dottedLine from '../lettle_components/dottedLine.vue';
  import userFooter from '../lettle_components/userFooter.vue';
  import {mapGetters} from 'vuex';
  export default {
    data() {
      return {
        money_hide: false,
        money_style: 'CNY',
        more_style: true,
        activeName: 'first',
        officePrice: {},
        AccountCNY: [],
        CNYMoneny: [],
        zongjia: '',
        jingjia: '',
        keyong: '',
        dongjie: '',
        colorM: ['#f54648', '#fead22', '#ff0', '#0f0', '#38c1e8', '#2dd1a5', '#9c5ff9'],
        dataMZ: [],
        dataMJ: [],
        dataMK: [],
        dataMD: [],
      }
    },
    components: {
      dottedLine, userFooter
    },
    created(){
      localStorage.setItem('Account', 'CNY');
      this.getOfferPrice();
      this.getCommodity();

    },
    mounted() {
      let that = this;
      this.getCapitalInfo();
      {
        that.showStyle($('.viewStyle').val());
        $('.viewStyle').change(function () {
          that.showStyle($(this).val());
          if ($(this).val() === '3') {
            that.drawing();//画饼图
          }
        })
      }//控制显示的模式
      {
        setTimeout(function () {
          that.GetData();
        }, 500);
      }
    },
    methods: {
      open_more() {
        this.more_style = false;
      },
      close_more() {
        this.more_style = true;
      },
      DataZ(){
        let that = this;
        that.dataMZ = [];
        let AccountCNY = that.AccountCNY;
        let CNYMoneny = that.CNYMoneny;
        let officePrice = that.officePrice;
        let money_style = that.money_style;
        for (let i = 0; i < AccountCNY.length; i++) {
          that.dataMZ.push({
            value: that.compulation(CNYMoneny[AccountCNY[i]] ? CNYMoneny[AccountCNY[i]].balance : 0, officePrice[AccountCNY[i]] ? officePrice[AccountCNY[i]].price : 0, officePrice[money_style] ? officePrice[money_style].price : 0, money_style),
            name: AccountCNY[i]
          })
        }

      },
      DataJ(){

        let that = this;
        that.dataMJ = [];
        let AccountCNY = that.AccountCNY;
        let CNYMoneny = that.CNYMoneny;
        let officePrice = that.officePrice;
        let money_style = that.money_style;
        for (let i = 0; i < AccountCNY.length; i++) {
          that.dataMJ.push({
            value: that.compulation(CNYMoneny[AccountCNY[i]] ? CNYMoneny[AccountCNY[i]].balance : 0, officePrice[AccountCNY[i]] ? officePrice[AccountCNY[i]].price : 0, officePrice[money_style] ? officePrice[money_style].price : 0, money_style),
            name: AccountCNY[i]
          })
        }

      },
      DataK(){

        let that = this;
        that.dataMK = [];
        let AccountCNY = that.AccountCNY;
        let CNYMoneny = that.CNYMoneny;
        let officePrice = that.officePrice;
        let money_style = that.money_style;
        for (let i = 0; i < AccountCNY.length; i++) {
          that.dataMK.push({
            value: that.compulation(CNYMoneny[AccountCNY[i]] ? CNYMoneny[AccountCNY[i]].amount : 0, officePrice[AccountCNY[i]] ? officePrice[AccountCNY[i]].price : 0, officePrice[money_style] ? officePrice[money_style].price : 0, money_style),
            name: AccountCNY[i]
          })
        }

      },
      DataD(){

        let that = this;
        that.dataMD = [];
        let AccountCNY = that.AccountCNY;
        let CNYMoneny = that.CNYMoneny;
        let officePrice = that.officePrice;
        let money_style = that.money_style;
        for (let i = 0; i < AccountCNY.length; i++) {
          that.dataMD.push({
            value: that.compulation(CNYMoneny[AccountCNY[i]] ? CNYMoneny[AccountCNY[i]].locked : 0, officePrice[AccountCNY[i]] ? officePrice[AccountCNY[i]].price : 0, officePrice[money_style] ? officePrice[money_style].price : 0, money_style),
            name: AccountCNY[i]
          })
        }
      },
      GetData(){
        this.DataZ();
        this.DataJ();
        this.DataK();
        this.DataD();
      },
      drawing() {
        let ZEcharts = this.$echarts.init(document.getElementById('ZEcharts'));
        let JEcharts = this.$echarts.init(document.getElementById('JEcharts'));
        let KEcharts = this.$echarts.init(document.getElementById('KEcharts'));
        let DEcharts = this.$echarts.init(document.getElementById('DEcharts'));
        ZEcharts.clear();
        JEcharts.clear();
        KEcharts.clear();
        DEcharts.clear();
        ZEcharts.setOption({
          color: this.colorM,
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: [
            {
              name: '总资产信息',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: this.dataMZ,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }, true);
        JEcharts.setOption({
          color: this.colorM,
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: [
            {
              name: '净资产信息',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: this.dataMJ,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }, true);
        KEcharts.setOption({
          color: this.colorM,
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: [
            {
              name: '可用资产信息',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: this.dataMK,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }, true);
        DEcharts.setOption({
          color: this.colorM,
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: [
            {
              name: '冻结资金信息',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: this.dataMD,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }, true)
      },
      //控制显示模式函数
      showStyle(num) {
        let that = this;
        switch (num) {
          case '1':
            $('.echarts-show').css({display: 'none'});
            $('.assets-proportion').css({display: "flex"});
            that.money_hide = true;
            break;
          case '2':
            $('.echarts-show').css({display: 'none'});
            $('.assets-proportion').css({display: "flex"});
            that.money_hide = false;
            break;
          case '3':
            $('.echarts-show').css({display: 'block'});
            $('.assets-proportion').css({display: "none"});
            that.money_hide = true;
            break;
        }
      },
      refresh() {
        this.$router.go(0)
      },//刷新当前页面
//      获取价格
      getOfferPrice(){
        this.$http({
          url: this.$URL_API + 'quotation/offerPrice',
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        }).then((res) => {
          if (res.data.code === 200) {
            let dd = res.data.data;
            for (let i = 0; i < dd.length; i++) {
              if (dd[i].commodity.substr(-3) === 'CNY') {
                this.officePrice[dd[i].commodity.substr(0, 3)] = dd[i];
              }
            }
          }
        })
      },
//      获取币种
      getCommodity(){
        this.$http({
          url: this.$URL_API + 'commodity/account',
          method: 'GET',
          header: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        }).then((res) => {
          this.AccountCNY = res.data.data.CNY;
        })
      },
//      获取用户资金信息
      getCapitalInfo(){
        this.$http({
          url: this.$URL_API + 'capital/info',
          method: 'GET',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + this.$store.state.token
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.CNYMoneny = [];
            let dd = res.data.data;
            for (let i = 0; i < dd.length; i++) {
              if (dd[i].legalMoney === 'CNY') {
                this.CNYMoneny[dd[i].currency] = dd[i];
              }
            }
          }
        })
      },
      coinStyle1(ev){
        this.money_style = ev.target.value;
        this.drawing();
      },
      compulationMoneyT(str){
        let _this = this;
        let oSpan = document.querySelectorAll(str)
        let oLength = oSpan.length;
        let Sum = 0;
        setTimeout(function () {
          for (let i = 0; i < oLength; i++) {
            Sum += Number((oSpan[i].innerText).split(' ')[1]);
          }
          if (_this.money_style === 'CNY') {
            switch (str) {
              case '.balance1':
                _this.zongjia = (Sum).toFixed(2);
                break;
              case '.balance2':
                _this.jingjia = (Sum).toFixed(2);
                break;
              case '.amount':
                _this.keyong = (Sum).toFixed(2);
                break;
              case '.locked':
                _this.dongjie = (Sum).toFixed(2);
                break;
            }
          } else {
            switch (str) {
              case '.balance1':
                _this.zongjia = (Sum).toFixed(8);
                break;
              case '.balance2':
                _this.jingjia = (Sum).toFixed(8);
                break;
              case '.amount':
                _this.keyong = (Sum).toFixed(8);
                break;
              case '.locked':
                _this.dongjie = (Sum).toFixed(8);
                break;
            }
          }
        }, 500)

      }
    },
    computed: {
      ...mapGetters(['LatestPrice'])
    }
  }
</script>
<style scoped>
  .userIndex {
    padding: 0 1.667rem 2rem 3.333rem;
  }

  .Q-C-T {
    display: flex;
    align-items: center;
  }

  .Q-C-T a {
    padding: .3rem .8rem;
    font-size: 1.167rem;
    color: #fff;
    background: #01aaef;
    border-radius: .4rem;
    margin-left: 2rem;
    margin-top: -1.5rem;
  }

  .Q-C-T a:nth-of-type(1) {
    margin-left: 6rem;
  }

  #DEcharts, #ZEcharts, #KEcharts, #JEcharts {
    width: 25rem;
    height: 18rem;
    margin-right: 13rem;
  }

  .index-title {
    display: flex;
    height: 4rem;
    line-height: 4rem;
    font-size: 1.333rem;
    border-bottom: 1px solid #eee;
    margin-bottom: 0.833rem;
  }

  .total-assets, .net-assets, .available-assets, .blocked-assets {
    padding-bottom: 1.25rem;
  }

  .index-title span {
    margin-right: 1.25rem;
  }

  .index-title a i {
    font-size: 1.833rem;
    color: #01aaef !important;
  }

  .assets-box {
    display: flex;
    justify-content: space-between;
  }

  .money-tabs-box {
    display: flex;
    justify-content: space-between;
    margin: 2rem 0 1.8rem 0;
  }

  .money-tabs-left {
    display: flex;
    align-items: center;
  }

  .money-tabs-left select {
    outline: none;
    padding: .2rem .5rem;
    margin-right: 2rem;
  }

  .money-tabs-left select option {
    padding: .2rem .5rem;
  }

  .money-tabs-right {
    display: flex;
    align-items: center;
    position: relative;
  }

  .money-tabs-right-dian {
    width: .5rem;
    height: .5rem;
    border-radius: 50%;
    background: red;
    top: 0;
    right: -.7rem;
    position: absolute;
  }

  .money-tabs-right i {
    color: #01aaef;
    margin-right: 0.4167rem;
    font-size: 1.5rem;
  }

  .money-tabs-right a {
    color: #01aaef;
    text-decoration: underline;
    font-size: 1.333rem;
  }

  .assets-title, .assets-money, .assets_CNY, .assets_BTC, .assets_LTC, .assets_ETC, .assets_ETH, .assets-proportion, .assets_XRP, .assets_BCC {
    font-size: 1.5rem;
    margin-bottom: 1.833rem;
  }

  .assets_CNY, .assets_BTC, .assets_LTC, .assets_ETC, .assets_ETH, .assets_XRP, .assets_BCC {
    margin-bottom: 1.25rem !important;
  }

  .assets-money {
    color: #888888;
  }

  .assets_CNY, .assets_BTC, .assets_LTC, .assets_ETC, .assets_ETH, .assets_XRP, .assets_BCC {
    display: flex;
    align-items: center;
    font-size: 1.333rem;
    color: #333;
  }

  .assets_CNY em, .assets_BTC em, .assets_LTC em, .assets_ETC em, .assets_ETH em, .assets_XRP em, .assets_BCC em {
    width: 3rem;
    display: inline-block;
    font-style: normal;
  }

  .assets_CNY span:nth-of-type(1), .assets_BTC span:nth-of-type(1), .assets_LTC span:nth-of-type(1), .assets_ETC span:nth-of-type(1), .assets_ETH span:nth-of-type(1), .assets_XRP span:nth-of-type(1), .assets_BCC span:nth-of-type(1) {
    width: 0.667rem;
    height: 0.667rem;
    background: #f54648;
    margin-right: .5rem;
  }

  .assets_XRP span:nth-of-type(1) {
    background: #00FF00;
  }

  .assets_BCC span:nth-of-type(1) {
    background: #ff0;
  }

  .assets_BTC span:nth-of-type(1) {
    background: #fead22;
  }

  .assets_LTC span:nth-of-type(1) {
    background: #38c4e9;
  }

  .assets_ETC span:nth-of-type(1) {
    background: #2dd1a5;
  }

  .assets_ETH span:nth-of-type(1) {
    background: #9c5ff9;
  }

  .assets-proportion {
    width: 80%;
    display: flex;
    align-items: center;
  }

  .assets-proportion span {
    height: 1.667rem;
    width: 1px;
  }

  .assets-proportion span:nth-of-type(1) {
    width: 0.5%;
    margin-right: 2px;
    background: #f54648;
  }

  .assets-proportion span:nth-of-type(4) {
    width: 0.5%;
    margin-right: 2px;
    background: #00FF00;
  }

  .assets-proportion span:nth-of-type(3) {
    width: 0.5%;
    margin-right: 2px;
    background: #ff0;
  }

  .assets-proportion span:nth-of-type(2) {
    width: 0.5%;
    margin-right: 2px;
    background: #fead22;
  }

  .assets-proportion span:nth-of-type(5) {
    width: 0.5%;
    margin-right: 2px;
    background: #38c4e9;
  }

  .assets-proportion span:nth-of-type(6) {
    width: 0.5%;
    margin-right: 2px;
    background: #2dd1a5;
  }

  .assets-proportion span:nth-of-type(7) {
    width: .5%;
    background: #9c5ff9;
  }

  .more a {
    color: #01aaef;
    font-size: 1.167rem;
    margin-bottom: 0.833rem;
    text-align: center;
  }

</style>
