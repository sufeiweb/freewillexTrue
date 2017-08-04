<template>
  <div class="business-home">
    <div class="business-home-content">
      <div class="content-left">
        <div class="content-left-header">
          <router-link to="/businessCNYAccount"  class="hover-color-css">CNY专区帐号</router-link>|
          <router-link to="/businessBTCAccount">BTC专区帐号</router-link>
          <!--<a href="javascript:;" class="hover-color-css">CNY专区帐号</a>|-->
          <!--<a href="javascript:;">BTC专区帐号</a>-->
        </div>
        <div class="recharge-group">
          <div class="recharge-group-title">
            <p>选择账户</p>
          </div>
          <div class="recharge-group-radio fangxiang">
            <input name="select-accountss" type="radio" id="account-cnyss1" value="1" checked/>
            <label for="account-cnyss1" class="recharge-group-radio-checked">
              <span class=""><span><i class="iconfont">&#xe664;</i></span></span>
              <i class="iconfont">&#xe6a1;</i>
              <span>买入</span>
            </label>
            <input name="select-accountss" type="radio" id="account-btcss1" value="2"/>
            <label for="account-btcss1">
              <span><span><i class="iconfont">&#xe664;</i></span></span>
              <i class="iconfont">&#xe6a9;</i>
              <span>卖出</span>
            </label>
          </div>
        </div>
        <div class="recharge-group">
          <div class="recharge-group-title">
            <p>选择币种</p>
          </div>
          <transition enter-active-class="animated fadeIn">
            <div class="recharge-group-radio">
              <input name="select-currencyaa" type="radio" id="recharge-currency-cny-btczz1" value="BTC"/>
              <label for="recharge-currency-cny-btczz1" class="recharge-group-radio-checked">
                <span><span><i class="iconfont">&#xe664;</i></span></span>
                <i class="iconfont">&#xe650;</i>
                <span>BTC</span>
              </label>
              <input name="select-currencyaa" type="radio" id="recharge-currency-cny-ltczz1" value="LTC"/>
              <label for="recharge-currency-cny-ltczz1">
                <span><span><i class="iconfont">&#xe664;</i></span></span>
                <i class="iconfont">&#xe650;</i>
                <span>LTC</span>
              </label>
              <input name="select-currencyaa" type="radio" id="recharge-currency-cny-ethzz1" value="ETH"/>
              <label for="recharge-currency-cny-ethzz1">
                <span><span><i class="iconfont">&#xe664;</i></span></span>
                <i class="iconfont">&#xe650;</i>
                <span>ETH</span>
              </label>
              <input name="select-currencyaa" type="radio" id="recharge-currency-cny-etczz1" value="ETC"/>
              <label for="recharge-currency-cny-etczz1">
                <span><span><i class="iconfont">&#xe664;</i></span></span>
                <i class="iconfont">&#xe650;</i>
                <span>ETC</span>
              </label>
            </div>
          </transition>
        </div>
        <div class="content-left-header margin-top-20 buyOrSellStyle">
          <a href="javascript:;" class="hover-color-css">限价</a>|
          <a href="javascript:;">市价</a>
        </div>
        <div class="business-input">
          <transition enter-active-class="animated fadeIn">
          <div v-show="buyOrSell && priceStyle">
            <section>
              <input type="number" placeholder="买入价"/>
              <span>{{accountClass}}</span>
            </section>
            <i class="iconfont">&#xe690;</i>
            <section>
              <input type="number" placeholder="买入量"/>
              <span>{{buyClass}}</span>
            </section>
            <span>=</span>
            <section>
              <input type="number" placeholder="总额"/>
              <span>{{accountClass}}</span>
            </section>
          </div>
          </transition>
          <transition enter-active-class="animated fadeIn">
          <div v-show="!buyOrSell  && priceStyle">
            <section>
              <input type="number" placeholder="卖出价"/>
              <span>{{accountClass}}</span>
            </section>
            <i class="iconfont">&#xe690;</i>
            <section>
              <input type="number" placeholder="卖出量"/>
              <span>{{buyClass}}</span>
            </section>
            <span>=</span>
            <section>
              <input type="number" placeholder="总额"/>
              <span>{{accountClass}}</span>
            </section>
          </div>
          </transition>
          <transition enter-active-class="animated fadeIn">
          <div v-show="buyOrSell  && !priceStyle">
            <div class="shijia-ipt" >
              <input type="number" placeholder="买入额"/>
              <span>{{accountClass}}</span>
            </div>
            <em>以市场最优价买入</em>
          </div>
          </transition>
          <transition enter-active-class="animated fadeIn">
          <div v-show="!buyOrSell && !priceStyle">
            <div class="shijia-ipt" >
              <input type="number" placeholder="卖出量"/>
              <span>{{buyClass}}</span>
            </div>
            <em>以市场最优价卖出</em>
          </div>
          </transition>
          <transition enter-active-class="animated fadeIn">
          <button class="business-cny-buy" v-show="buyOrSell">买入</button>
          </transition>
          <transition enter-active-class="animated fadeIn">
          <button class="business-cny-sell" v-show="!buyOrSell">卖出</button>
          </transition>
        </div>
      </div>
      <div class="content-right">
        <div class="pankou">
          <header>
            <span>{{buyClass}}/{{accountClass}}</span>
            <span>|</span>
            <span>￥18247.25</span>
            <span>+26.58%</span>
          </header>
          <section>
            <span>买卖</span>
            <span>价格(￥)</span>
            <span>挂单量(L)</span>
          </section>
          <div class="sell-pankou">
            <p><span>卖（5）</span><span>18763.35</span><span>1.23569854</span></p>
            <p><span>卖（4）</span><span>18763.35</span><span>12.23569854</span></p>
            <p><span>卖（3）</span><span>18763.35</span><span>5.23569854</span></p>
            <p><span>卖（2）</span><span>18763.35</span><span>6.23569854</span></p>
            <p><span>卖（1）</span><span>18763.35</span><span>4.23569854</span></p>
          </div>
          <div><em></em></div>
          <div class="buy-pankou">
            <p><span>买（1）</span><span>18763.35</span><span>1.23569854</span></p>
            <p><span>买（2）</span><span>18763.35</span><span>12.23569854</span></p>
            <p><span>买（3）</span><span>18763.35</span><span>5.23569854</span></p>
            <p><span>买（4）</span><span>18763.35</span><span>6.23569854</span></p>
            <p><span>买（5）</span><span>18763.35</span><span>4.23569854</span></p>
          </div>
        </div>
        <div class="hangqing"></div>
      </div>
    </div>
    <entrustedRecord></entrustedRecord>
  </div>
</template>
<script>
  import entrustedRecord from '../lettle_components/entrustedRecord.vue';
  export default {
    data() {
      return {
        buyClass: 'BTC',
        accountClass: 'CNY',
        buyOrSell:true,
        priceStyle:true,
      }
    },
    components: {
      entrustedRecord
    },
    mounted() {
        let that=this;
      {
        $("input[name='select-accountss']").change(function () {
          $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
          console.log($(this).val(), 'accountss');
          if($(this).val() == '1'){
            that.buyOrSell=true;
          }else {
            that.buyOrSell=false;
          }
        })
      }//选择方向
      {
        $("input[name='select-currencyaa']").change(function () {
          $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
          that.buyClass=$(this).val();
        })
      }//选择币种
      {
          $('.buyOrSellStyle a').click(function () {
              $(this).addClass('hover-color-css').siblings().removeClass('hover-color-css');
            if($(this).index()){
              that.priceStyle=false;
            }else{
              that.priceStyle=true;
            }
          })
      }//限价与市价的选择
    },
    methods: {}
  }
</script>
<style scoped>
  .business-home-content {
    display: flex;
    background: #e9ecf3;
    justify-content: space-between;
    margin-bottom: 1.5%;
  }

  .content-left {
    width: 66%;
    padding: 3.333rem 5rem;
    box-sizing: border-box;
    background: #fff;
  }

  .content-right {
    width: 32.5%;
  }
.pankou{
  min-height: 300px;
  background: #fff;
  height: 442px;
 margin-bottom: 1.333rem;
  padding: 1.5rem .8rem;
}
.hangqing{
  background: #fff;
  min-height: 255px;
}
.pankou header{
display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 1.167rem;
  margin-bottom: 1.833rem;
  box-sizing: border-box;
}
  .pankou header>span:nth-of-type(2){
    font-size: 22px;
    color: #ddd;
  }
  .pankou header>span:nth-of-type(3){
    color: #000;
    font-weight: bold;
    font-size: 16px;
  }
  .pankou header>span:nth-of-type(4){
    color: red;
    font-size: 12px;
  }
  .pankou section{
    display: flex;
    background: #f2f2f2;
    padding: 8px 30px;
  }
  .pankou .sell-pankou p,.pankou .buy-pankou p{
    padding: 8px 30px;
    display: flex;
    align-items: center;
  }
  .pankou .sell-pankou p>span, .pankou section>span,.pankou .buy-pankou p>span{
    flex: 1;
    text-align: right;
  }
  .pankou .sell-pankou p>span:nth-of-type(1), .pankou section>span:nth-of-type(1),.pankou .buy-pankou p>span:nth-of-type(1){
    text-align: left;
  }
  .pankou .sell-pankou p>span:nth-of-type(2), .pankou section>span:nth-of-type(2),.pankou .buy-pankou p>span:nth-of-type(2){
    text-align: center;
  }
  .pankou>div>em{
    margin: 1rem 30px;
    background: #ddd;
    height: 2px;
    width: 85%;
    display: block;
    box-sizing: border-box;
  }
  .sell-pankou p>span:nth-of-type(1){
    color: #63b212;
  }
  .buy-pankou p>span:nth-of-type(1){
    color: #f54648
  ;
  }














  .content-left .content-left-header {
    display: flex;
    align-items: flex-start;
    border-bottom: 2px solid #ddd;
    font-size: 20px;
    color: #ddd;
  }

  .content-left .content-left-header a {
    font-size: 1.333rem;
    text-align: center;
    padding-bottom: 1.333rem;
    border-bottom: 2px solid #DDD;
    margin-bottom: -2px;
    width: 156px;
  }

  .content-left .content-left-header a:hover {
    color: #01aaef;
    border-color: #01aaef;
  }

  .hover-color-css {
    color: #01aaef;
    border-color: #01aaef !important;
  }

  .content-left .recharge-group {
    padding: 30px 0 0 20px;
  }

  .content-left .recharge-group-title {
    font-size: 1.333rem;
    margin-bottom: 1.833rem;
  }

  .content-left .recharge-group-title > a {
    color: #01aaef;
    font-size: 1.167rem;
    font-weight: bold;
  }

  .content-left .recharge-group-radio {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .content-left .recharge-group-radio > input {
    display: none;
  }

  .content-left .recharge-group-radio > label {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border: 1px solid #ddd;
    padding: 2.2rem 3rem;
    margin-right: 1.667rem;
    margin-bottom: 1.667rem;
    position: relative;
    cursor: pointer;
  }

  .content-left .recharge-group-radio-select-bank > div > label > em {
    font-style: normal;
    font-size: 1rem;
    margin-left: 1rem;
  }

  .content-left .fangxiang label {
    flex-direction: column;
    margin-bottom: 0;
    width: 128px;
    box-sizing: border-box;
    align-items: center;
    font-size: 1.167rem;
    height: 90px;
    padding: 1.5rem 3rem;

  }

  .content-left .fangxiang label > i {
    margin-right: 0 !important;
    color: #fff;
    background: #f54648;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    text-align: center;
    line-height: 22px;
    margin-bottom: .5rem;
  }

  .content-left .fangxiang label:nth-of-type(2)>i {
    background: #63b212;
  }

  .content-left .recharge-group-radio label > i {
    margin-right: 1rem;
  }

  .content-left .recharge-group-radio > label > span:nth-of-type(1) {
    display: none;
    position: absolute;
    right: -0.8rem;
    top: -0.8rem;
    background: #fff;
    padding: .3rem;
    border-radius: 50%;
  }

  .content-left .recharge-group-radio > label > span:nth-of-type(1) > span {
    border-radius: 50%;
    background: #01aaef;
    color: #fff;
    padding: 0.1rem;
  }

  .content-left .recharge-group-radio-checked {
    border-color: #01aaef !important;
  }

  .content-left .recharge-group-radio-checked > span {
    display: block !important;
    border-color: #01aaef !important;
  }
  .business-input>div{
    display: flex;
    align-items: center;
    margin-top: 1.833rem;
    color: #999;
  }
  .business-input>div section{
    display: flex;
    align-items: center;
    width: 148px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  .business-input>div section input{
    border:none;
    width: 70%;
    padding: 8px 0;
    border-radius: 4px;
    padding-left: 1.5rem;
    box-sizing: border-box;
    outline: none;
  }
  .business-input>div>i, .business-input>div>span{
    color: #555!important;
    margin: 0 1.25rem;
  }
  .business-input>div>span{
    font-size: 26px;
  }
  .business-input>button{
    width: 255px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #fff;
    background: #f54648;
    letter-spacing: 10px;
    border:none;
    border-radius: 4px;
    margin-top: 1.833rem;
    font-size: 16px;
  }
  .business-cny-sell{
    background:#63b212!important; ;
  }
  .shijia-ipt{
    display: flex;
    align-items: center;
    border:1px solid #ddd;
    border-radius: 4px;
    width: 255px;
  }
  .shijia-ipt >input{
    border: none;
    border-radius: 4px;
    outline: none;
    padding: 8px 1.5rem;
  }
  .business-input>div>em{
    flex: 1.168rem;
    margin-left: 2rem;
    color: #666;
  }
  .margin-top-20{
    margin-top: 20px !important;
  }
</style>
