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
            <option value="1">详情模式</option>
            <option value="2" selected>简洁模式</option>
            <option value="3">饼图模式</option>
          </select>
          <select class="coinStyle">
            <option value="CNY" selected>CNY 人民币</option>
            <option value="BTC" >BTC 比特币</option>
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
            <span class="assets-money">{{(Number(CNYCNY.balance)+Number(BTCtoCNY(BTCCNY.balance))+Number(this.LTCtoCNY(LTCCNY.balance))+Number(this.ETCtoCNY(ETCCNY.balance))+Number(this.ETHtoCNY(ETHCNY.balance)))|float2|returnZero |toLocaleString}} {{money_style}}</span>
            <div v-show="money_hide">
              <div class="assets_CNY">
                <span></span><span><em>CNY</em> {{CNYCNY.balance|returnZero|toLocaleString}}</span>
              </div>
              <div class="assets_BTC">
                <span></span><span><em>BTC</em> {{BTCCNY.balance|returnZero | float8}} ≈ {{this.BTCtoCNY(BTCCNY.balance)|returnZero |toLocaleString}}{{money_style}}</span>
              </div>
              <div class="assets_LTC">
                <span></span><span><em>LTC</em> {{LTCCNY.balance|returnZero|float8}} ≈ {{this.LTCtoCNY(LTCCNY.balance)|returnZero |toLocaleString}}{{money_style}}</span>
              </div>
              <div class="assets_ETH">
                <span></span><span><em>ETH</em> {{ETHCNY.balance|returnZero|float8}} ≈ {{this.ETHtoCNY(ETHCNY.balance)|returnZero |toLocaleString}}{{money_style}}</span>
              </div>
              <div class="assets_ETC">
                <span></span><span><em>ETC</em> {{ETCCNY.balance|returnZero|float8}} ≈ {{this.ETCtoCNY(ETCCNY.balance)|returnZero |toLocaleString}}{{money_style}}</span>
              </div>
            </div>
          </div>
          <div id="ZEcharts" class="echarts-show"></div>
        </div>
        <div class="assets-proportion">
          <span :style="'width:'+this.computedLangZ(CNYCNY.balance)"></span>
          <span :style="'width:'+this.computedLangZ(this.BTCtoCNY(BTCCNY.balance))"></span>
          <span :style="'width:'+this.computedLangZ(this.LTCtoCNY(LTCCNY.balance))"></span>
          <span :style="'width:'+this.computedLangZ(this.ETHtoCNY(ETHCNY.balance))"></span>
          <span :style="'width:'+this.computedLangZ(this.ETCtoCNY(ETCCNY.balance))"></span>
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
            <span class="assets-money">{{(Number(CNYCNY.balance)+Number(this.BTCtoCNY(BTCCNY.balance))+Number(this.LTCtoCNY(LTCCNY.balance))+Number(this.ETCtoCNY(ETCCNY.balance))+Number(this.ETHtoCNY(ETHCNY.balance)))|float2|returnZero |toLocaleString}} {{money_style}}</span>
            <div v-show="money_hide">
              <div class="assets_CNY">
                <span></span><span><em>CNY</em> {{CNYCNY.balance|returnZero |toLocaleString}}</span>
              </div>
              <div class="assets_BTC">
                <span></span><span><em>BTC</em>{{BTCCNY.balance|returnZero | float8}} ≈ {{this.BTCtoCNY(BTCCNY.balance)|returnZero|toLocaleString}}{{money_style}}</span>
              </div>
              <div class="assets_LTC">
                <span></span><span><em>LTC</em> {{LTCCNY.balance|returnZero|float8}} ≈ {{this.LTCtoCNY(LTCCNY.balance)|returnZero |toLocaleString}}{{money_style}}</span>
              </div>
              <div class="assets_ETH">
                <span></span><span><em>ETH</em> {{ETHCNY.balance|returnZero|float8}} ≈ {{this.ETHtoCNY(ETHCNY.balance)|returnZero |toLocaleString}}{{money_style}}</span>
              </div>
              <div class="assets_ETC">
                <span></span><span><em>ETC</em> {{ETCCNY.balance|returnZero|float8}} ≈ {{this.ETCtoCNY(ETCCNY.balance)|returnZero |toLocaleString}}{{money_style}}</span>
              </div>
            </div>
          </div>
          <div id="JEcharts" class="echarts-show"></div>
        </div>
        <div class="assets-proportion">
          <span :style="'width:'+this.computedLangJ(CNYCNY.balance)"></span>
          <span :style="'width:'+this.computedLangJ(this.BTCtoCNY(BTCCNY.balance))"></span>
          <span :style="'width:'+this.computedLangJ(this.LTCtoCNY(LTCCNY.balance))"></span>
          <span :style="'width:'+this.computedLangJ(this.ETHtoCNY(ETHCNY.balance))"></span>
          <span :style="'width:'+this.computedLangJ(this.ETCtoCNY(ETCCNY.balance))"></span>
        </div>
      </div>
      <div class="available-assets" v-show="!more_style">
        <div class="assets-box">
          <div class="assets-content">
            <h1 class="assets-title">可用</h1>
            <span class="assets-money">{{(Number(CNYCNY.amount)+Number(this.BTCtoCNY(BTCCNY.amount))+Number(this.LTCtoCNY(LTCCNY.amount))+Number(this.ETCtoCNY(ETCCNY.amount))+Number(this.ETHtoCNY(ETHCNY.amount)))|float2|returnZero |toLocaleString}} {{money_style}}</span>
            <div v-show="money_hide">
              <div class="assets_CNY">
                <span></span><span><em>CNY</em> {{CNYCNY.amount|returnZero|float2|toLocaleString}}</span>
              </div>
              <div class="assets_BTC">
                <span></span><span><em>BTC</em> {{BTCCNY.amount|returnZero|float8}} ≈ {{this.BTCtoCNY(BTCCNY.amount)|returnZero|toLocaleString}}{{money_style}}</span>
              </div>
              <div class="assets_LTC">
                <span></span><span><em>LTC</em> {{LTCCNY.amount|returnZero|float8}} ≈ {{this.LTCtoCNY(LTCCNY.amount)|returnZero |toLocaleString}}{{money_style}}</span>
              </div>
              <div class="assets_ETH">
                <span></span><span><em>ETH</em> {{ETHCNY.amount|returnZero|float8}} ≈ {{this.ETHtoCNY(ETHCNY.amount)|returnZero |toLocaleString}}{{money_style}}</span>
              </div>
              <div class="assets_ETC">
                <span></span><span><em>ETC</em> {{ETCCNY.amount|returnZero|float8}} ≈ {{this.ETCtoCNY(ETCCNY.amount)|returnZero |toLocaleString}}{{money_style}}</span>
              </div>
            </div>
          </div>
          <div id="KEcharts" class="echarts-show"></div>
        </div>
        <div class="assets-proportion">
          <span :style="'width:'+this.computedLangK(CNYCNY.amount)"></span>
          <span :style="'width:'+this.computedLangK(this.BTCtoCNY(BTCCNY.amount))"></span>
          <span :style="'width:'+this.computedLangK(this.LTCtoCNY(LTCCNY.amount))"></span>
          <span :style="'width:'+this.computedLangK(this.ETHtoCNY(ETHCNY.amount))"></span>
          <span :style="'width:'+this.computedLangK(this.ETCtoCNY(ETCCNY.amount))"></span>
        </div>
      </div>
      <div class="blocked-assets" v-show="!more_style">
        <div class="assets-box">
          <div class="assets-content">
            <h1 class="assets-title">冻结</h1>
            <span class="assets-money">{{(Number(CNYCNY.locked)+Number(this.BTCtoCNY(BTCCNY.locked))+Number(this.LTCtoCNY(LTCCNY.locked))+Number(this.ETCtoCNY(ETCCNY.locked))+Number(this.ETHtoCNY(ETHCNY.locked)))|float2|returnZero |toLocaleString}} {{money_style}}</span>
            <div v-show="money_hide">
              <div class="assets_CNY">
                <span></span><span><em>CNY</em> {{CNYCNY.locked|returnZero|float2|toLocaleString}}</span>
              </div>
              <div class="assets_BTC">
                <span></span><span><em>BTC</em> {{BTCCNY.locked|returnZero|float8}} ≈ {{this.BTCtoCNY(BTCCNY.locked)|returnZero|toLocaleString}}{{money_style}}</span>
              </div>
              <div class="assets_LTC">
                <span></span><span><em>LTC</em> {{LTCCNY.locked|returnZero|float8}} ≈ {{this.LTCtoCNY(LTCCNY.locked)|returnZero |toLocaleString}}{{money_style}}</span>
              </div>
              <div class="assets_ETH">
                <span></span><span><em>ETH</em> {{ETHCNY.locked|returnZero|float8}} ≈ {{this.ETHtoCNY(ETHCNY.locked)|returnZero |toLocaleString}}{{money_style}}</span>
              </div>
              <div class="assets_ETC">
                <span></span><span><em>ETC</em> {{ETCCNY.locked|returnZero|float8}} ≈ {{this.ETCtoCNY(ETCCNY.locked)|returnZero |toLocaleString}}{{money_style}}</span>
              </div>
            </div>
          </div>
          <div id="DEcharts" class="echarts-show"></div>
        </div>
        <div class="assets-proportion">
          <span :style="'width:'+this.computedLangD(CNYCNY.locked)"></span>
          <span :style="'width:'+this.computedLangD(this.BTCtoCNY(BTCCNY.locked))"></span>
          <span :style="'width:'+this.computedLangD(this.LTCtoCNY(LTCCNY.locked))"></span>
          <span :style="'width:'+this.computedLangD(this.ETHtoCNY(ETHCNY.locked))"></span>
          <span :style="'width:'+this.computedLangD(this.ETCtoCNY(ETCCNY.locked))"></span>
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
  export default {
    data() {
      return {
        money_hide: false,
        money_style: ' CNY',
        more_style: true,
        activeName: 'first',
        CNYCNY: {},
        BTCCNY: {},
        LTCCNY: {},
        ETHCNY: {},
        ETCCNY: {}
      }
    },
    components: {
      dottedLine, userFooter
    },
    mounted() {
      let that = this;

      {
        that.showStyle($('.viewStyle').val());
        $('.viewStyle').change(function () {
          that.showStyle($(this).val());
          if($(this).val() ==='3'){
            that.drawing();//画饼图
          }
        })
      }//控制显示的模式
      {
        that.$http({
          url: 'http://192.168.1.48:8089/fwex/web/capital/info',
          method: 'GET',
          data:{},
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + that.$store.state.token
          }
        }).then((res) => {
          if (res.data.code === 200) {
            for (let i = 0; i < res.data.data.length; i++) {
                if (res.data.data[i].legalMoney === 'CNY') {
                  if (res.data.data[i].currency === 'CNY') {
                    this.CNYCNY = res.data.data[i];
                  }
                  if (res.data.data[i].currency === 'BTC') {
                    this.BTCCNY = res.data.data[i];
                  }
                  if (res.data.data[i].currency === 'LTC') {
                    this.LTCCNY = res.data.data[i];
                  }
                  if (res.data.data[i].currency === 'ETH') {
                    this.ETHCNY = res.data.data[i];
                  }
                  if (res.data.data[i].currency === 'ETC') {
                    this.ETCCNY = res.data.data[i];
                  }
                }
            }
          }
          console.log(res,'资金信息')
        }).catch((req) => {
          console.log(req, '获取失败')
        })
      }//获取资金信息
      {
          $('.coinStyle').change(function () {
            that.money_style=' '+$(this).val();
          })
      }
    },
    methods: {
      open_more() {
        this.more_style = false;
      },
      close_more() {
        this.more_style = true;
      },
      drawing() {
        let ZEcharts = this.$echarts.init(document.getElementById('ZEcharts'));
        let JEcharts = this.$echarts.init(document.getElementById('JEcharts'));
        let KEcharts = this.$echarts.init(document.getElementById('KEcharts'));
        let DEcharts = this.$echarts.init(document.getElementById('DEcharts'));
        ZEcharts.setOption({
          color: ['#f54648', '#fead22', '#38c1e8', '#9c5ff9', '#2dd1a5'],
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
                {value: this.CNYCNY.balance, name: 'CNY'},
                {value: this.BTCtoCNY(this.BTCCNY.balance), name: 'BTC'},
                {value: this.LTCtoCNY(this.LTCCNY.balance), name: 'LTC'},
                {value: this.ETHtoCNY(this.ETHCNY.balance), name: 'ETH'},
                {value: this.ETCtoCNY(this.ETCCNY.balance), name: 'ETC'},
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
        JEcharts.setOption({
          color: ['#f54648', '#fead22', '#38c1e8', '#9c5ff9', '#2dd1a5'],
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
                {value: this.CNYCNY.balance, name: 'CNY'},
                {value: this.BTCtoCNY(this.BTCCNY.balance), name: 'BTC'},
                {value: this.LTCtoCNY(this.LTCCNY.balance), name: 'LTC'},
                {value: this.ETHtoCNY(this.ETHCNY.balance), name: 'ETH'},
                {value: this.ETCtoCNY(this.ETCCNY.balance), name: 'ETC'},
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
        KEcharts.setOption({
          color: ['#f54648', '#fead22', '#38c1e8', '#9c5ff9', '#2dd1a5'],
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
              data: [
                {value: this.CNYCNY.amount, name: 'CNY'},
                {value: this.BTCtoCNY(this.BTCCNY.amount), name: 'BTC'},
                {value: this.LTCtoCNY(this.LTCCNY.amount), name: 'LTC'},
                {value: this.ETHtoCNY(this.ETHCNY.amount), name: 'ETH'},
                {value: this.ETCtoCNY(this.ETCCNY.amount), name: 'ETC'},
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
        DEcharts.setOption({
          color: ['#f54648', '#fead22', '#38c1e8', '#9c5ff9', '#2dd1a5'],
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
              data: [
                {value: this.CNYCNY.locked, name: 'CNY'},
                {value: this.BTCtoCNY(this.BTCCNY.locked), name: 'BTC'},
                {value: this.LTCtoCNY(this.LTCCNY.locked), name: 'LTC'},
                {value: this.ETHtoCNY(this.ETHCNY.locked), name: 'ETH'},
                {value: this.ETCtoCNY(this.ETCCNY.locked), name: 'ETC'},
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
//          this.$router.push('/userIndex')
      },//刷新当前页面
      BTCtoCNY(str) {
          return (str*1864.12).toFixed(2);
      },
      LTCtoCNY(str) {
          return (str*564.12).toFixed(2);
      },
      ETCtoCNY(str) {
          return (str*464.12).toFixed(2);
      },
      ETHtoCNY(str) {
          return (str*664.12).toFixed(2);
      },
      //血条长度计算
      computedLangZ(num){
          if(num){
            return num*100/(Number(this.CNYCNY.balance)+Number(this.BTCtoCNY(this.BTCCNY.balance))+Number(this.LTCtoCNY(this.LTCCNY.balance))+Number(this.ETCtoCNY(this.ETCCNY.balance))+Number(this.ETHtoCNY(this.ETHCNY.balance)))+"%"
          }
      },
      computedLangJ(num){
          if(num){
            return num*100/(Number(this.CNYCNY.balance)+Number(this.BTCtoCNY(this.BTCCNY.balance))+Number(this.LTCtoCNY(this.LTCCNY.balance))+Number(this.ETCtoCNY(this.ETCCNY.balance))+Number(this.ETHtoCNY(this.ETHCNY.balance)))+"%"
          }
      },
      computedLangK(num){
          if(num){
            return num*100/(Number(this.CNYCNY.amount)+Number(this.BTCtoCNY(this.BTCCNY.amount))+Number(this.LTCtoCNY(this.LTCCNY.amount))+Number(this.ETCtoCNY(this.ETCCNY.amount))+Number(this.ETHtoCNY(this.ETHCNY.amount)))+"%"
          }
      },
      computedLangD(num){
          if(num){
            return num*100/(Number(this.CNYCNY.locked)+Number(this.BTCtoCNY(this.BTCCNY.locked))+Number(this.LTCtoCNY(this.LTCCNY.locked))+Number(this.ETCtoCNY(this.ETCCNY.locked))+Number(this.ETHtoCNY(this.ETHCNY.locked)))+"%"
          }
      },
    },
    computed: {
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

  .assets-title, .assets-money, .assets_CNY, .assets_BTC, .assets_LTC, .assets_ETC, .assets_ETH, .assets-proportion {
    font-size: 1.5rem;
    margin-bottom: 1.833rem;
  }

  .assets_CNY, .assets_BTC, .assets_LTC, .assets_ETC, .assets_ETH {
    margin-bottom: 1.25rem !important;
  }

  .assets-money {
    color: #888888;
  }

  .assets_CNY, .assets_BTC, .assets_LTC, .assets_ETC, .assets_ETH {
    display: flex;
    align-items: center;
    font-size: 1.333rem;
    color: #333;
  }
  .assets_CNY em, .assets_BTC em, .assets_LTC em, .assets_ETC em, .assets_ETH em{
    width: 3rem;
    display: inline-block;
    font-style: normal;
  }
  .assets_CNY span:nth-of-type(1), .assets_BTC span:nth-of-type(1), .assets_LTC span:nth-of-type(1), .assets_ETC span:nth-of-type(1), .assets_ETH span:nth-of-type(1) {
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

  .assets-proportion span:nth-of-type(2) {
    width: 0.5%;
    margin-right: 2px;
    background: #fead22;
  }

  .assets-proportion span:nth-of-type(3) {
    width: 0.5%;
    margin-right: 2px;
    background: #38c4e9;
  }

  .assets-proportion span:nth-of-type(4) {
    width: 0.5%;
    margin-right: 2px;
    background: #9c5ff9;
  }

  .assets-proportion span:nth-of-type(5) {
    width: .5%;
    background: #2dd1a5;
  }

  .more a {
    color: #01aaef;
    font-size: 1.167rem;
    margin-bottom: 0.833rem;
    text-align: center;
  }

</style>
