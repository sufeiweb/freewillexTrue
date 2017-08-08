<template>
  <div class="userIndex">
    <div class="userIndex-header">
      <div class="index-title">
        <span>账户概要</span>
        <a href="javascript:" @click="refresh()"><i class="iconfont">&#xe6c1;</i></a>
      </div>
      <div class="money-tabs-box">
        <div class="money-tabs-left">
          <select class="viewStyle1">
            <option value="1">详情模式</option>
            <option value="2" selected>简洁模式</option>
            <option value="3">饼图模式</option>
          </select>
          <select class="coinStyle1">
            <option value="BTC" selected>BTC 比特币</option>
            <option value="LTC">LTC 莱特币</option>
            <option value="ETH">ETH 以太坊</option>
            <option value="ETC">ETC 以太经典</option>
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
              class="assets-money">{{(Number(this.BTCBTC.balance) + Number(this.LTCtoBTC1(this.LTCBTC.balance)) + Number(this.ETCtoBTC1(this.ETCBTC.balance)) + Number(this.ETHtoBTC1(this.ETHBTC.balance)))| float8|toLocaleString8}} {{money_style}}</span>
            <div v-show="money_hide1">
              <div class="assets_BTC">
                <span></span><span><em>BTC</em> {{BTCBTC.balance | toLocaleString8}}</span>
              </div>
              <div class="assets_LTC">
                <span></span><span><em>LTC</em> {{LTCBTC.balance | toLocaleString8}} ≈ {{this.LTCtoBTC1(this.LTCBTC.balance) | toLocaleString8}} {{money_style}}</span>
              </div>
              <div class="assets_ETH">
                <span></span><span><em>ETH</em> {{ETHBTC.balance | toLocaleString8}} ≈ {{this.ETHtoBTC1(this.ETHBTC.balance) | toLocaleString8}} {{money_style}}</span>
              </div>
              <div class="assets_ETC">
                <span></span><span><em>ETC</em> {{ETCBTC.balance | toLocaleString8}} ≈ {{this.ETCtoBTC1(this.ETCBTC.balance) | toLocaleString8}} {{money_style}}</span>
              </div>
            </div>
          </div>
          <div id="ZEcharts1" class="echarts-show1"></div>
        </div>
        <div class="assets-proportion1">
          <span :style="'width:'+this.computedLangZ1(BTCBTC.balance)"></span>
          <span :style="'width:'+this.computedLangZ1(this.LTCtoBTC1(LTCBTC.balance))"></span>
          <span :style="'width:'+this.computedLangZ1(this.ETHtoBTC1(ETHBTC.balance))"></span>
          <span :style="'width:'+this.computedLangZ1(this.ETCtoBTC1(ETCBTC.balance))"></span>
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
              class="assets-money">{{(Number(this.BTCBTC.balance) + Number(this.LTCtoBTC1(this.LTCBTC.balance)) + Number(this.ETCtoBTC1(this.ETCBTC.balance)) + Number(this.ETHtoBTC1(this.ETHBTC.balance)))| float8|toLocaleString8}} {{money_style}}</span>
            <div v-show="money_hide1">
              <div class="assets_BTC">
                <span></span><span><em>BTC</em> {{BTCBTC.balance | toLocaleString8}}</span>
              </div>
              <div class="assets_LTC">
                <span></span><span><em>LTC</em> {{LTCBTC.balance | toLocaleString8}} ≈ {{this.LTCtoBTC1(this.LTCBTC.balance) | toLocaleString8}} {{money_style}}</span>
              </div>
              <div class="assets_ETH">
                <span></span><span><em>ETH</em> {{ETHBTC.balance | toLocaleString8}} ≈ {{this.ETHtoBTC1(this.ETHBTC.balance) | toLocaleString8}} {{money_style}}</span>
              </div>
              <div class="assets_ETC">
                <span></span><span><em>ETC</em> {{ETCBTC.balance | toLocaleString8}} ≈ {{this.ETCtoBTC1(this.ETCBTC.balance) | toLocaleString8}} {{money_style}}</span>
              </div>
            </div>
          </div>
          <div id="JEcharts1" class="echarts-show1"></div>
        </div>
        <div class="assets-proportion1">
          <span :style="'width:'+this.computedLangJ1(BTCBTC.balance)"></span>
          <span :style="'width:'+this.computedLangJ1(this.LTCtoBTC1(LTCBTC.balance))"></span>
          <span :style="'width:'+this.computedLangJ1(this.ETHtoBTC1(ETHBTC.balance))"></span>
          <span :style="'width:'+this.computedLangJ1(this.ETCtoBTC1(ETCBTC.balance))"></span>
        </div>
      </div>
      <div class="available-assets" v-show="!more_style">
        <div class="assets-box">
          <div class="assets-content">
            <h1 class="assets-title">可用</h1>
            <span
              class="assets-money">{{(Number(this.BTCBTC.amount) + Number(this.LTCtoBTC1(this.LTCBTC.amount)) + Number(this.ETCtoBTC1(this.ETCBTC.amount)) + Number(this.ETHtoBTC1(this.ETHBTC.amount)))| float8|toLocaleString8}} {{money_style}}</span>
            <div v-show="money_hide1">
              <div class="assets_BTC">
                <span></span><span><em>BTC</em> {{BTCBTC.amount | toLocaleString8}}</span>
              </div>
              <div class="assets_LTC">
                <span></span><span><em>LTC</em> {{LTCBTC.amount | toLocaleString8}} ≈ {{this.LTCtoBTC1(this.LTCBTC.amount) | toLocaleString8}} {{money_style}}</span>
              </div>
              <div class="assets_ETH">
                <span></span><span><em>ETH</em> {{ETHBTC.amount | toLocaleString8}} ≈ {{this.ETHtoBTC1(this.ETHBTC.amount) | toLocaleString8}} {{money_style}}</span>
              </div>
              <div class="assets_ETC">
                <span></span><span><em>ETC</em> {{ETCBTC.amount | toLocaleString8}} ≈ {{this.ETCtoBTC1(this.ETCBTC.amount) | toLocaleString8}} {{money_style}}</span>
              </div>
            </div>
          </div>
          <div id="KEcharts1" class="echarts-show1"></div>
        </div>
        <div class="assets-proportion1">
          <span :style="'width:'+this.computedLangK1(BTCBTC.amount)"></span>
          <span :style="'width:'+this.computedLangK1(this.LTCtoBTC1(LTCBTC.amount))"></span>
          <span :style="'width:'+this.computedLangK1(this.ETHtoBTC1(ETHBTC.amount))"></span>
          <span :style="'width:'+this.computedLangK1(this.ETCtoBTC1(ETCBTC.amount))"></span>
        </div>
      </div>
      <div class="blocked-assets" v-show="!more_style">
        <div class="assets-box">
          <div class="assets-content">
            <h1 class="assets-title">冻结</h1>
            <span
              class="assets-money">{{(Number(this.BTCBTC.locked) + Number(this.LTCtoBTC1(this.LTCBTC.locked)) + Number(this.ETCtoBTC1(this.ETCBTC.locked)) + Number(this.ETHtoBTC1(this.ETHBTC.locked)))| float8|toLocaleString8}} {{money_style}}</span>
            <div v-show="money_hide1">
              <div class="assets_BTC">
                <span></span><span><em>BTC</em> {{BTCBTC.locked | toLocaleString8}}</span>
              </div>
              <div class="assets_LTC">
                <span></span><span><em>LTC</em> {{LTCBTC.locked | toLocaleString8}} ≈ {{this.LTCtoBTC1(this.LTCBTC.locked) | toLocaleString8}} {{money_style}}</span>
              </div>
              <div class="assets_ETH">
                <span></span><span><em>ETH</em> {{ETHBTC.locked | toLocaleString8}} ≈ {{this.ETHtoBTC1(this.ETHBTC.locked) | toLocaleString8}} {{money_style}}</span>
              </div>
              <div class="assets_ETC">
                <span></span><span><em>ETC</em> {{ETCBTC.locked | toLocaleString8}} ≈ {{this.ETCtoBTC1(this.ETCBTC.locked) | toLocaleString8}} {{money_style}}</span>
              </div>
            </div>
          </div>
          <div id="DEcharts1" class="echarts-show1"></div>
        </div>
        <div class="assets-proportion1">
          <span :style="'width:'+this.computedLangD1(BTCBTC.locked)"></span>
          <span :style="'width:'+this.computedLangD1(this.LTCtoBTC1(LTCBTC.locked))"></span>
          <span :style="'width:'+this.computedLangD1(this.ETHtoBTC1(ETHBTC.locked))"></span>
          <span :style="'width:'+this.computedLangD1(this.ETCtoBTC1(ETCBTC.locked))"></span>
        </div>
      </div>
      <div class="more">
        <a href="javascript:" v-show="more_style" @click="open_more1()">更多</a>
        <a href="javascript:" v-show="!more_style" @click="close_more1()">收起</a>
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
  export default {
    data() {
      return {
        money_hide1: false,
        money_style: ' BTC',
        more_style: true,
        activeName: 'first',
        BTCBTC: '',
        LTCBTC: '',
        ETHBTC: '',
        ETCBTC: ''
      }
    },
    components: {
      dottedLine, userFooter
    },
    mounted() {
      let that = this;

      {
        that.showStyle1($('.viewStyle1').val());
        $('.viewStyle1').change(function () {
          that.showStyle1($(this).val());
          if ($(this).val() === '3') {
            that.drawing1();//画饼图
          }
        })
      }//控制显示的模式
      {
        that.$http({
          url: 'http://192.168.1.48:8089/fwex/web/capital/info',
          method: 'GET',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + that.$store.state.token
          }
        }).then((res) => {
          if (res.data.code === 200) {
            for (let i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].legalMoney === 'BTC') {
                if (res.data.data[i].currency === 'BTC') {
                  this.BTCBTC = res.data.data[i];
                }
                if (res.data.data[i].currency === 'LTC') {
                  this.LTCBTC = res.data.data[i];
                }
                if (res.data.data[i].currency === 'ETH') {
                  this.ETHBTC = res.data.data[i];
                }
                if (res.data.data[i].currency === 'ETC') {
                  this.ETCBTC = res.data.data[i];
                }
              }
            }
          }
          console.log(res, '资金信息')
        }).catch((req) => {
          console.log(req, '获取失败')
        })
      }//获取资金信息
      {
        $('.coinStyle1').change(function () {
          that.money_style = $(this).val()
        })
      }
    },
    methods: {
      open_more1() {
        this.more_style = false;
      },
      close_more1() {
        this.more_style = true;
      },
      drawing1() {
        let ZEcharts1 = this.$echarts.init(document.getElementById('ZEcharts1'));
        let JEcharts1 = this.$echarts.init(document.getElementById('JEcharts1'));
        let KEcharts1 = this.$echarts.init(document.getElementById('KEcharts1'));
        let DEcharts1 = this.$echarts.init(document.getElementById('DEcharts1'));
        ZEcharts1.setOption({
          color: ['#fead22', '#38c1e8', '#9c5ff9', '#2dd1a5'],
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
              data: [
                {value: this.BTCBTC.balance, name: 'BTC'},
                {value: this.LTCtoBTC1(this.LTCBTC.balance), name: 'LTC'},
                {value: this.ETHtoBTC1(this.ETHBTC.balance), name: 'ETH'},
                {value: this.ETCtoBTC1(this.ETCBTC.balance), name: 'ETC'},
              ],
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
        JEcharts1.setOption({
          color: ['#fead22', '#38c1e8', '#9c5ff9', '#2dd1a5'],
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
              data: [
                {value: this.BTCBTC.balance, name: 'BTC'},
                {value: this.LTCtoBTC1(this.LTCBTC.balance), name: 'LTC'},
                {value: this.ETHtoBTC1(this.ETHBTC.balance), name: 'ETH'},
                {value: this.ETCtoBTC1(this.ETCBTC.balance), name: 'ETC'},
              ],
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
        KEcharts1.setOption({
          color: ['#fead22', '#38c1e8', '#9c5ff9', '#2dd1a5'],
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: [
            {
              name: '可以资产信息',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: this.BTCBTC.amount, name: 'BTC'},
                {value: this.LTCtoBTC1(this.LTCBTC.amount), name: 'LTC'},
                {value: this.ETHtoBTC1(this.ETHBTC.amount), name: 'ETH'},
                {value: this.ETCtoBTC1(this.ETCBTC.amount), name: 'ETC'},
              ],
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
        DEcharts1.setOption({
          color: ['#fead22', '#38c1e8', '#9c5ff9', '#2dd1a5'],
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: [
            {
              name: '冻结资产信息',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: this.BTCBTC.locked, name: 'BTC'},
                {value: this.LTCtoBTC1(this.LTCBTC.locked), name: 'LTC'},
                {value: this.ETHtoBTC1(this.ETHBTC.locked), name: 'ETH'},
                {value: this.ETCtoBTC1(this.ETCBTC.locked), name: 'ETC'},
              ],
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
      showStyle1(num) {
        let that = this;
        switch (num) {
          case '1':
            $('.echarts-show1').css({display: 'none'});
            $('.assets-proportion1').css({display: "flex"});
            that.money_hide1 = true;
            break;
          case '2':
            $('.echarts-show1').css({display: 'none'});
            $('.assets-proportion1').css({display: "flex"});
            that.money_hide1 = false;
            break;
          case '3':
            $('.echarts-show1').css({display: 'block'});
            that.money_hide1 = true;
            $('.assets-proportion1').css({display: "none"});
            break;
        }
      },
      refresh1() {
        this.$router.go(0)
//          this.$router.push('/userIndex')
      },//刷新当前页面
      LTCtoBTC1(str) {
        return (str * 4.12).toFixed(2);
      },
      ETCtoBTC1(str) {
        return (str * 0.12).toFixed(2);
      },
      ETHtoBTC1(str) {
        return (str * 2.12).toFixed(2);
      },
      //血条长度计算
      computedLangZ1(num){
        if (num) {
          return num * 100 / (Number(this.BTCBTC.balance) + Number(this.LTCtoBTC1(this.LTCBTC.balance)) + Number(this.ETCtoBTC1(this.ETCBTC.balance)) + Number(this.ETHtoBTC1(this.ETHBTC.balance))) + "%"
        }
      },
      computedLangJ1(num){
        if (num) {
          return num * 100 / (Number(this.BTCBTC.balance) + Number(this.LTCtoBTC1(this.LTCBTC.balance)) + Number(this.ETCtoBTC1(this.ETCBTC.balance)) + Number(this.ETHtoBTC1(this.ETHBTC.balance))) + "%"
        }
      },
      computedLangK1(num){
        if (num) {
          return num * 100 / (Number(this.BTCBTC.amount) + Number(this.LTCtoBTC1(this.LTCBTC.amount)) + Number(this.ETCtoBTC1(this.ETCBTC.amount)) + Number(this.ETHtoBTC1(this.ETHBTC.amount))) + "%"
        }
      },
      computedLangD1(num){
        if (num) {
          return num * 100 / (Number(this.BTCBTC.locked) + Number(this.LTCtoBTC1(this.LTCBTC.locked)) + Number(this.ETCtoBTC1(this.ETCBTC.locked)) + Number(this.ETHtoBTC1(this.ETHBTC.locked))) + "%"
        }
      },
    }
  }
</script>
<style scoped>
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

  #DEcharts1, #ZEcharts1, #KEcharts1, #JEcharts1 {
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

  .money-tabs-right-dian {
    width: .5rem;
    height: .5rem;
    border-radius: 50%;
    background: red;
    top: 0;
    right: -.7rem;
    position: absolute;
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

  .assets-title, .assets-money, .assets_BTC, .assets_LTC, .assets_ETC, .assets_ETH, .assets-proportion1 {
    font-size: 1.5rem;
    margin-bottom: 1.833rem;
  }

  .assets_BTC, .assets_LTC, .assets_ETC, .assets_ETH {
    margin-bottom: 1.25rem !important;
  }

  .total-assets, .net-assets, .available-assets, .blocked-assets {
    padding-bottom: 1.25rem;
  }

  .assets-money {
    color: #888888;
  }

  .assets_BTC, .assets_LTC, .assets_ETC, .assets_ETH {
    display: flex;
    align-items: center;
    font-size: 1.333rem;
    color: #333;
  }

  .assets_BTC em, .assets_LTC em, .assets_ETC em, .assets_ETH em {
    width: 3rem;
    display: inline-block;
    font-style: normal;
  }

  .assets_BTC span:nth-of-type(1), .assets_LTC span:nth-of-type(1), .assets_ETC span:nth-of-type(1), .assets_ETH span:nth-of-type(1) {
    width: 0.667rem;
    height: 0.667rem;
    background: #f54648;
    margin-right: .5rem;
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

  .assets-proportion1 {
    width: 80%;
    display: flex;
    align-items: center;
  }

  .assets-proportion1 span {
    height: 1.667rem;
    width: 1px;
  }

  .assets-proportion1 span:nth-of-type(1) {
    width: 0.5%;
    margin-right: 2px;
    background: #fead22;
  }

  .assets-proportion1 span:nth-of-type(2) {
    width: 0.5%;
    margin-right: 2px;
    background: #38c4e9;
  }

  .assets-proportion1 span:nth-of-type(3) {
    width: 0.5%;
    margin-right: 2px;
    background: #9c5ff9;
  }

  .assets-proportion1 span:nth-of-type(4) {
    width: 0.5%;
    background: #2dd1a5;
  }

  .more a {
    color: #01aaef;
    font-size: 1.167rem;
    margin-bottom: 0.833rem;
    text-align: center;
  }

</style>
