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
            <option value="4">CNY 人民币</option>
            <option value="5" selected>BTC 比特币</option>
            <option value="6">LTC 莱特币</option>
            <option value="7">ETH 以太坊</option>
            <option value="8">ETC 以太经典</option>
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
            <span class="assets-money">{{1212121}} {{money_style}}</span>
            <div v-show="money_hide1">
              <div class="assets_CNY">
                <span></span><span>CNY {{122111.00}}</span>
              </div>
              <div class="assets_BTC">
                <span></span><span>BTC {{122111.0000}}</span>
              </div>
              <div class="assets_LTC">
                <span></span><span>LTC {{122111.0000}}</span>
              </div>
              <div class="assets_ETH">
                <span></span><span>ETH {{122111.0000}}</span>
              </div>
              <div class="assets_ETC">
                <span></span><span>ETC {{122111.0000}}</span>
              </div>
            </div>
          </div>
          <div id="ZEcharts1" class="echarts-show1"></div>
        </div>
        <div class="assets-proportion1">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="net-assets">
        <div class="assets-box">
          <div class="assets-content">
            <div class="Q-C-T">
              <h1 class="assets-title">净资产</h1>
              <!--<a href="javascript:;">充值</a>-->
              <router-link to="/recharge">充值</router-link>
              <router-link to="/cash">提现</router-link>
              <!--<a href="javascript:;">提现</a>-->
            </div>
            <span class="assets-money">{{1212121}} {{money_style}}</span>
            <div v-show="money_hide1">
              <div class="assets_CNY">
                <span></span><span>CNY {{122111.00}}</span>
              </div>
              <div class="assets_BTC">
                <span></span><span>BTC {{122111.0000}}</span>
              </div>
              <div class="assets_LTC">
                <span></span><span>LTC {{122111.0000}}</span>
              </div>
              <div class="assets_ETH">
                <span></span><span>ETH {{122111.0000}}</span>
              </div>
              <div class="assets_ETC">
                <span></span><span>ETC {{122111.0000}}</span>
              </div>
            </div>
          </div>
          <div id="JEcharts1" class="echarts-show1"></div>
        </div>
        <div class="assets-proportion1">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="available-assets" v-show="!more_style">
        <div class="assets-box">
          <div class="assets-content">
            <h1 class="assets-title">可用</h1>
            <span class="assets-money">{{1212121}} {{money_style}}</span>
            <div v-show="money_hide1">
              <div class="assets_CNY">
                <span></span><span>CNY {{122111.00}}</span>
              </div>
              <div class="assets_BTC">
                <span></span><span>BTC {{122111.0000}}</span>
              </div>
              <div class="assets_LTC">
                <span></span><span>LTC {{122111.0000}}</span>
              </div>
              <div class="assets_ETH">
                <span></span><span>ETH {{122111.0000}}</span>
              </div>
              <div class="assets_ETC">
                <span></span><span>ETC {{122111.0000}}</span>
              </div>
            </div>
          </div>
          <div id="KEcharts1" class="echarts-show1"></div>
        </div>
        <div class="assets-proportion1">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="blocked-assets" v-show="!more_style">
        <div class="assets-box">
          <div class="assets-content">
            <h1 class="assets-title">冻结</h1>
            <span class="assets-money">{{1212121}} {{money_style}}</span>
            <div v-show="money_hide1">
              <div class="assets_CNY">
                <span></span><span>CNY {{122111.00}}</span>
              </div>
              <div class="assets_BTC">
                <span></span><span>BTC {{122111.0000}}</span>
              </div>
              <div class="assets_LTC">
                <span></span><span>LTC {{122111.0000}}</span>
              </div>
              <div class="assets_ETH">
                <span></span><span>ETH {{122111.0000}}</span>
              </div>
              <div class="assets_ETC">
                <span></span><span>ETC {{122111.0000}}</span>
              </div>
            </div>
          </div>
          <div id="DEcharts1" class="echarts-show1"></div>
        </div>
        <div class="assets-proportion1">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
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
        money_style: 'CNY',
        more_style: true,
        activeName: 'first'
      }
    },
    components: {
      dottedLine, userFooter
    },
    mounted() {
      let that =this;
      that.drawing1();//画饼图
      {
          that.showStyle1($('.viewStyle1').val());
          $('.viewStyle1').change(function () {
            that.showStyle1($(this).val());
          })
      }//控制显示的模式
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
            color:['#f54648','#fead22','#38c1e8','#9c5ff9','#2dd1a5'],
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [
              {
                name: '资金信息',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                  {value: 0, name: 'CNY'},
                  {value: 0, name: 'BTC'},
                  {value: 0, name: 'LTC'},
                  {value: 0, name: 'ETH'},
                  {value: 0, name: 'ETC'},
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
            color:['#f54648','#fead22','#38c1e8','#9c5ff9','#2dd1a5'],
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [
              {
                name: '资金信息',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                  {value: 335, name: 'CNY'},
                  {value: 310, name: 'BTC'},
                  {value: 234, name: 'LTC'},
                  {value: 234, name: 'ETH'},
                  {value: 234, name: 'ETC'},
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
            color:['#f54648','#fead22','#38c1e8','#9c5ff9','#2dd1a5'],
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [
              {
                name: '资金信息',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                  {value: 335, name: 'CNY'},
                  {value: 310, name: 'BTC'},
                  {value: 234, name: 'LTC'},
                  {value: 234, name: 'ETH'},
                  {value: 234, name: 'ETC'},
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
            color:['#f54648','#fead22','#38c1e8','#9c5ff9','#2dd1a5'],
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [
              {
                name: '资金信息',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                  {value: 335, name: 'CNY'},
                  {value: 310, name: 'BTC'},
                  {value: 234, name: 'LTC'},
                  {value: 234, name: 'ETH'},
                  {value: 234, name: 'ETC'},
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
          let that=this;
        switch (num) {
          case '1':
            $('.echarts-show1').css({display:'none'});
            $('.assets-proportion1').css({display:"flex"});
            that.money_hide1 = true;
            break;
          case '2':
            $('.echarts-show1').css({display:'none'});
            $('.assets-proportion1').css({display:"flex"});
            that.money_hide1 = false;
            break;
          case '3':
            $('.echarts-show1').css({display:'block'});
            that.money_hide1 = true;
            $('.assets-proportion1').css({display:"none"});
            break;
        }
      },
      refresh1() {
        this.$router.push('/userIndex')
//          this.$router.push('/userIndex')
      },//刷新当前页面
    }
  }
</script>
<style scoped>
  .Q-C-T{
    display: flex;
    align-items: center;
  }
  .Q-C-T a{
    padding: .3rem .8rem;
    font-size: 1.167rem;
    color:#fff;
    background: #01aaef;
    border-radius: .4rem;
    margin-left: 2rem;
    margin-top: -.5rem;
  }
  .Q-C-T a:nth-of-type(1){
    margin-left:6rem;
  }
  #DEcharts1,#ZEcharts1,#KEcharts1,#JEcharts1{
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
  .money-tabs-right-dian{
    width: .5rem;
    height: .5rem;
    border-radius: 50%;
    background: red;
    top:0;
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

  .assets-title, .assets-money, .assets_CNY, .assets_BTC,.assets_LTC,.assets_ETC,.assets_ETH, .assets-proportion1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .assets-money {
    color: #888888;
  }

  .assets_CNY, .assets_BTC,.assets_LTC,.assets_ETC,.assets_ETH {
    display: flex;
    align-items: center;
    font-size: 1.333rem;
    color: #333;
  }

  .assets_CNY span:nth-of-type(1), .assets_BTC span:nth-of-type(1),.assets_LTC span:nth-of-type(1),.assets_ETC span:nth-of-type(1),.assets_ETH span:nth-of-type(1){
    width: 0.667rem;
    height: 0.667rem;
    background: #f54648;
    margin-right: .5rem;
  }
  .assets_BTC span:nth-of-type(1) {
    background: #fead22;
  }
  .assets_LTC span:nth-of-type(1){
    background: #38c4e9;
  }
  .assets_ETC span:nth-of-type(1){
    background: #2dd1a5;
  }
  .assets_ETH span:nth-of-type(1){
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
    width: 20%;
    margin-right: 2px;
    background: #f54648;
  }
  .assets-proportion1 span:nth-of-type(2) {
    width: 20%;
    margin-right: 2px;
    background: #fead22;
  }
  .assets-proportion1 span:nth-of-type(3) {
    width: 20%;
    margin-right: 2px;
    background: #38c4e9;
  }
  .assets-proportion1 span:nth-of-type(4) {
    width: 20%;
    margin-right: 2px;
    background: #9c5ff9;
  }
  .assets-proportion1 span:nth-of-type(5) {
    width: 20%;
    background: #2dd1a5;
  }

  .more a {
    color: #01aaef;
    font-size: 1.167rem;
    margin-bottom: 0.833rem;
    text-align: center;
  }

</style>
