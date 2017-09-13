<template>
  <div class="business-home">
    <div class="business-home-content">
      <div class="content-left">
        <div class="content-left-header">
          <router-link to="/businessCNYAccount" class="hover-color-css">CNY专区帐号</router-link>
          <router-link to="/businessBTCAccount">BTC专区帐号</router-link>
        </div>
        <div class="recharge-group">
          <div class="recharge-group-title">
            <p>选择方向</p>
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
              <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
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
              <section v-for="(item,index) in AccountCNY" v-show="item!=='CNY'">
                <input name="select-currencyaa" type="radio" :id='"recharge-currency-cny-btczz1"+index' :value="item"/>
                <label :for='"recharge-currency-cny-btczz1"+index'
                       :class="item==='BTC'?'recharge-group-radio-checked':''">
                  <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
                  <span class="iconFont" :class='"a"+item'></span>
                  <span>{{item}}</span>
                </label>
              </section>
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
                <input type="text" placeholder="买入价" v-model="buyPrice" class="buyPrice-ipt"/>
                <span>{{accountClass}}</span>
              </section>
              <i class="iconfont">&#xe690;</i>
              <section>
                <input type="text" placeholder="买入量" v-model="buyNum" class="buyNum-ipt"/>
                <span>{{buyClass}}</span>
              </section>
              <span>≈</span>
              <section>
                <input type="text" placeholder="总额" v-model="buyComP" class="buySum-ipt"/>
                <span>{{accountClass}}</span>
              </section>
            </div>
          </transition>
          <transition enter-active-class="animated fadeIn">
            <div v-show="!buyOrSell  && priceStyle">
              <section>
                <input type="text" placeholder="卖出价" v-model="sellPrice" class="sellPrice-ipt"/>
                <span>{{accountClass}}</span>
              </section>
              <i class="iconfont">&#xe690;</i>
              <section>
                <input type="text" placeholder="卖出量" v-model="sellNum" class="sellNum-ipt"/>
                <span>{{buyClass}}</span>
              </section>
              <span>≈</span>
              <section>
                <input type="text" placeholder="总额" v-model="sellComP" class="sellSum-ipt"/>
                <span>{{accountClass}}</span>
              </section>
            </div>
          </transition>
          <transition enter-active-class="animated fadeIn">
            <div v-show="buyOrSell  && !priceStyle">
              <div class="shijia-ipt">
                <input type="text" placeholder="买入额" v-model="buyTotal" class="buyTotal-ipt"/>
                <span>{{accountClass}}</span>
              </div>
              <em>以市场最优价买入</em>
            </div>
          </transition>
          <transition enter-active-class="animated fadeIn">
            <div v-show="!buyOrSell && !priceStyle">
              <div class="shijia-ipt">
                <input type="text" placeholder="卖出量" v-model="sellTotal" class="sellTotal-ipt"/>
                <span>{{buyClass}}</span>
              </div>
              <em>以市场最优价卖出</em>
            </div>
          </transition>
          <aside class="block" v-show="buyOrSell">
            <el-slider v-model="value1" @change="changeNumBuyB()" :format-tooltip="formatTooltip"></el-slider>
          </aside>
          <transition enter-active-class="animated fadeIn">
            <button class="business-cny-buy" v-show="buyOrSell" @click="transaction($event)">买入</button>
          </transition>
          <transition enter-active-class="animated fadeIn">
            <button class="business-cny-sell" v-show="!buyOrSell" @click="transaction($event)">卖出</button>
          </transition>
        </div>
      </div>
      <div class="content-right">
        <div class="pankou">
          <header>
            <span>{{buyClass}}/{{accountClass}}</span>
            <span>|</span>
            <span>￥{{(businessPrice.get(commodity) ? businessPrice.get(commodity).price : '0') | float2}}</span>

            <span
              v-show="false">￥{{this.$store.state.businessPrice.name}}{{newpriceData = (businessPrice.get(commodity) ? businessPrice.get(commodity).price : '0')}}</span>

            <span :class="businessPrice.get(commodity) ? (businessPrice.get(commodity).rising > 0 ?'red':'green') : ''">{{(businessPrice.get(commodity) ? businessPrice.get(commodity).rising * 100 : 0) | float2}}%</span>
          </header>
          <section>
            <span>买卖</span>
            <span>价格(￥)</span>
            <span>挂单量(L)</span>
          </section>
          <div class="sell-pankou"></div>
          <div><em></em></div>
          <div class="buy-pankou"></div>
        </div>
        <div class="hangqing"></div>
      </div>
    </div>
    <entrustedRecord></entrustedRecord>
  </div>
</template>
<script>
  import entrustedRecord from '../lettle_components/entrustedRecord.vue';
  import {mapGetters} from 'vuex';
  export default {
    data() {
      return {
        buyClass: 'BTC',
        accountClass: 'CNY',
        buyOrSell: true,
        priceStyle: true,
        buyPrice: '',
        buyNum: '',
        buySum: '',
        buyTotal: '',
        sellPrice: '',
        sellNum: '',
        sellSum: '',
        sellTotal: '',
        newAccount: 'CNY',
        commodity: '',//交易品种
        types: '',//类型
        price: '',//价格
        amount: '',//数量
        panKou: [],//盘口信息
        userMoney: '',//用户资金信息
        AccountCNY: [],
        value1: 0,
        newpriceData: ''
      }
    },
    components: {
      entrustedRecord
    },
    mounted() {
      let that = this;
      localStorage.setItem('Account', this.newAccount);
      localStorage.setItem('commodity', this.buyClass + that.accountClass);
      this.sendEvent('changeCommodity', '');
      this.$store.state.Account = this.newAccount;
      {
        $("input[name='select-accountss']").change(function () {
          $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
          if ($(this).val() == '1') {
            that.buyOrSell = true;
          } else {
            that.buyOrSell = false;
          }
        })
      }//选择方向
      {
        setTimeout(function () {
          $("input[name='select-currencyaa']").change(function () {
            $(this).next().addClass('recharge-group-radio-checked').parent().siblings().find('label').removeClass('recharge-group-radio-checked');
            localStorage.setItem('commodity', $(this).val() + that.accountClass);
            that.sendEvent('changeCommodity', '');
            that.buyClass = $(this).val();
            that.getPanKou();
            that.getLaterPrice();
          })
        }, 500);
      }//选择币种
      {
        setTimeout(function () {
          $('.buy-pankou p').click(function () {
            that.buyPrice = $(this).find('.dty').html();
            that.sellPrice = $(this).find('.dty').html();
          })
          $('.sell-pankou p').click(function () {
            that.buyPrice = $(this).find('.dty').html();
            that.sellPrice = $(this).find('.dty').html();
          })
        }, 500)
      }
      {
        $('.buyOrSellStyle a').click(function () {
          that.value1 = 0;
          $(this).addClass('hover-color-css').siblings().removeClass('hover-color-css');
          if ($(this).index()) {
            that.priceStyle = false;
          } else {
            that.priceStyle = true;
          }
        })
      }//限价与市价的选择
      {
        $("input[type='number']").keyup(function () {
          if (!isNaN($(this).val()) && $(this).val() < 0) {
            $(this).val('')
          }
        });
      }
      {
        $('.sellPrice-ipt').blur(function () {
          that.sellPrice = parseFloat(that.ReturnZero($(this).val())).toFixed(2);
        })
        $('.sellNum-ipt').blur(function () {
          that.sellNum = parseFloat(that.ReturnZero($(this).val())).toFixed(4);
        })
        $('.buyPrice-ipt').blur(function () {
          that.buyPrice = parseFloat(that.ReturnZero($(this).val())).toFixed(2)
        })
        $('.buyNum-ipt').blur(function () {
          that.buyNum = parseFloat(that.ReturnZero($(this).val())).toFixed(4);
        })
        $('.buyTotal-ipt').blur(function () {
          that.buyTotal = parseFloat(that.ReturnZero($(this).val())).toFixed(2);
        })
        $('.sellTotal-ipt').blur(function () {
          that.sellTotal = parseFloat(that.ReturnZero($(this).val())).toFixed(4);
        })
      }
      {

        window.addEventListener('depthData', function (ev) {
          let bb = ev.newValue.b.length > 5 ? ev.newValue.b.slice(0, 4) : ev.newValue.b;
          let ss = ev.newValue.s.length > 5 ? ev.newValue.s.slice(0, 4) : ev.newValue.s;
          that.pushViewB(bb);
          that.pushViewS(ss);
        })
      }
      that.getPanKou();
      that.getLaterPrice();
      this.getUserMoney()
    },
    created(){
      this.getCommoditCNY()
    },
    methods: {
      formatTooltip(val){
        return val / 100;
      },
      changeNumBuyB(){
        if (this.priceStyle) {
          if (this.buyPrice) {
            this.buyNum = ((this.userMoney * this.value1 / 100) / this.buyPrice).toFixed(4);
          } else {
            this.buyPrice = parseFloat(this.newpriceData).toFixed(2);
          }
        } else {
          this.buyTotal = (this.userMoney * this.value1 / 100).toFixed(2);
        }
      },
      //      获取最新价
      getLaterPrice(){
        this.getCommodity();
        this.$http({
          url: this.$URL_API + 'quotation/offerPrice/' + this.commodity,
          method: 'GET',
          herders: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.$store.state.businessPrice.name = res.data.data.price;
            this.$store.state.businessPrice.data.set(this.commodity, res.data.data);
//            console.log(this.$store.state.businessPrice.data);
          }
        })
      },
      transaction(ev) {
        this.getUserMoney();
        this.getTypes();
        this.getCommodity();
//        if (this.sellComP > this.userMoney) {
//          this.showError('', '资金不足');
//          ev.target.innerHTML = this.buyOrSell ? '买入' : '卖出';
//        } else {
        if (this.types.indexOf('LIMITED') >= 0 && this.price && this.amount || this.types.indexOf('MARKET') >= 0 && (this.price || this.amount)) {
          ev.target.innerHTML = '处理中...';
          this.$http({
            url: this.$URL_API + 'trade/entrust',
            method: 'POST',
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              'X-Authorization': 'Bearer ' + this.$store.state.token,
              "Content-Type": "application/json;charset=UTF-8"
            },
            data: {
              commodity: localStorage.getItem('commodity'),
              types: this.types,
              price: this.price,
              amount: this.amount,
              source: 'WEB'
            }
          }).then((res) => {
            this.showError(res.data.code, res.data.message);

            if (res.data.code === 200) {
              ev.target.innerHTML = this.buyOrSell ? '买入' : '卖出';
            } else {
              ev.target.innerHTML = this.buyOrSell ? '买入' : '卖出';
            }
          }).then(() => {
//            this.getPanKou();
          }).catch((req) => {
            ev.target.innerHTML = this.buyOrSell ? '买入' : '卖出';
            this.showError(req.code, req.message);
          })
        } else {
          ev.target.innerHTML = this.buyOrSell ? '买入' : '卖出';
          this.showError('', '请输入完整的价格或数量')
        }
      },
//      获得types，price,amount;
      getTypes() {
        if (this.buyOrSell) {
          //买
//            判断types
          if (this.priceStyle) {
            this.types = 'B_LIMITED';
            this.price = this.buyPrice;
            this.amount = this.buyNum;
          } else {
            this.types = 'B_MARKET';
            this.price = '';
            this.amount = this.buyTotal;
          }
        } else {
          //卖
          if (this.priceStyle) {
            this.types = 'S_LIMITED';
            this.price = this.sellPrice;
            this.amount = this.sellNum;
          } else {
            this.types = 'S_MARKET';
            this.price = '';
            this.amount = this.sellTotal;
          }
        }
      },
//      获取交易品种
      getCommodity() {
        this.commodity = this.buyClass + this.newAccount;
      },
      getPanKou(){
        this.getCommodity();
        this.$http({
          url: this.$URL_API + 'quotation/depth/' + this.commodity + '/' + 5,
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Authorization': 'Bearer ' + this.$store.state.token,
          }
        }).then((res) => {
//          this.showError(res.data.code, res.data.message);
          if (res.data.code === 200) {
            this.pushViewB(res.data.data.b);
            this.pushViewS(res.data.data.s);
          }
        }).catch((req) => {
          this.showError(req.code, req.message)
        })
      },
      pushViewB(num){
        $('.buy-pankou').html('');
        for (let i = 0; i < num.length; i++) {
          $('.buy-pankou').append(`<p><span>买${i + 1}</span><span class="dty">${(num[i].price).toFixed(2)}</span><span>${(num[i].vol).toFixed(4)}</span></p>`);
        }
        if (num.length < 5) {
          for (let i = 0; i < 5 - num.length; i++) {
            $('.buy-pankou').append(`<p><span>买${i + 1 + num.length}</span><span>--</span><span>--</span></p>`);
          }
        }
      },
      pushViewS(num){
        $('.sell-pankou').html('');
        for (let i = 0; i < num.length; i++) {
          $('.sell-pankou').prepend(`<p><span>卖${i + 1}</span><span  class="dty">${(num[num.length - i - 1].price).toFixed(2)}</span><span>${(num[num.length - i - 1].vol).toFixed(4)}</span></p>`);
        }
        if (num.length < 5) {
          for (let i = 0; i < 5 - num.length; i++) {
            $('.sell-pankou').prepend(`<p><span>卖${i + num.length + 1}</span><span>--</span><span>--</span></p>`);
          }
        }
      },
      //获取资金信息
      getUserMoney(){
        this.$http({
          url: this.$URL_API + 'capital/info',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Authorization': 'Bearer ' + this.$store.state.token,
          }
        }).then((res) => {
          if (res.data.code === 200) {
            for (let i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].legalMoney === 'CNY' && res.data.data[i].currency === 'CNY') {
                this.userMoney = res.data.data[i].amount;
              }
            }
          }
        }).catch((req) => {
          this.showError('', req.message);
        })
      },
      getCommoditCNY(){
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
    },
    computed: {
      buyComP() {
        return this.buySum = ((this.buyPrice ? this.buyPrice : 0) * (this.buyNum ? this.buyNum : 0)).toFixed(4);
      },
      sellComP() {
        return this.sellSum = ((this.sellPrice ? this.sellPrice : 0) * (this.sellNum ? this.sellNum : 0)).toFixed(4);
      },
      ...mapGetters(['businessPrice'])
    }
  }
</script>
<style scoped>
  .block {
    width: 255px;
  }

  .red {
    color: #cc0000 !important;
  }

  .green {
    color: #00cc00 !important;
  }

  .business-home-content {
    display: flex;
    background: #e9ecf3;
    justify-content: space-between;
    margin-bottom: 1.5%;
  }

  .iconFont {
    width: 22px;
    height: 22px;
    margin: .5rem
  }

  .recharge-group-radio-checked .aCNY, .recharge-group-radio-checked .aBCC, .recharge-group-radio-checked .aXRP, .recharge-group-radio-checked .aBTC, .recharge-group-radio-checked .aLTC, .recharge-group-radio-checked .aETH, .recharge-group-radio-checked .aETC {
    background-position: 0;
  }

  .aCNY {
    background: url("../../assets/img/iconPng/CNYzhanghu.png");
    background-position: -22px;

  }

  .aBCC {
    background: url("../../assets/img/iconPng/BCC.png");
    background-position: -22px;

  }

  .aXRP {
    background: url("../../assets/img/iconPng/ripple.png");
    background-position: -22px;

  }

  .aBTC {
    background: url("../../assets/img/iconPng/BTCzhanghu.png");
    background-position: -22px;
  }

  .aLTC {
    background: url("../../assets/img/iconPng/ltc.png");
    background-position: -22px;
  }

  .aETH {
    background: url("../../assets/img/iconPng/ETH.png");
    background-position: -22px;
  }

  .aETC {
    background: url("../../assets/img/iconPng/ETC.png");
    background-position: -22px;
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

  .pankou {
    min-height: 300px;
    background: #fff;
    height: 442px;
    margin-bottom: 1.333rem;
    padding: 1.5rem .8rem;
  }

  .hangqing {
    background: #fff;
    min-height: 255px;
  }

  .pankou header {
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 1.167rem;
    margin-bottom: 1.833rem;
    box-sizing: border-box;
  }

  .pankou header > span:nth-of-type(2) {
    font-size: 22px;
    color: #ddd;
  }

  .pankou header > span:nth-of-type(3) {
    color: #000;
    font-weight: bold;
    font-size: 16px;
  }

  .pankou header > span:nth-of-type(4) {
    color: red;
    font-size: 12px;
  }

  .pankou section {
    display: flex;
    background: #f2f2f2;
    padding: 8px 30px;
  }

  .pankou > div > em {
    margin: 1rem 30px;
    background: #ddd;
    height: 2px;
    width: 85%;
    display: block;
    box-sizing: border-box;
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

  .content-left .recharge-group-radio, .content-left .recharge-group-radio section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .content-left .recharge-group-radio > input, .content-left .recharge-group-radio section > input {
    display: none;
  }

  .content-left .recharge-group-radio > label, .content-left .recharge-group-radio section > label {
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

  .content-left .fangxiang label:nth-of-type(2) > i {
    background: #63b212;
  }

  .content-left .recharge-group-radio label > i, .content-left .recharge-group-radio section label > i {
    margin-right: 1rem;
  }

  .content-left .recharge-group-radio > label > span:nth-of-type(1), .content-left .recharge-group-radio section > label > span:nth-of-type(1) {
    display: none;
    position: absolute;
    right: -0.8rem;
    top: -0.8rem;
    background: #fff;
    padding: .3rem;
    border-radius: 50%;
  }

  .content-left .recharge-group-radio > label > span:nth-of-type(1) > span, .content-left .recharge-group-radio section > label > span:nth-of-type(1) > span {
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

  .business-input > div {
    display: flex;
    align-items: center;
    margin-top: 1.833rem;
    color: #999;
    margin-bottom: 1.833rem;
  }

  .business-input > div section {
    display: flex;
    align-items: center;
    width: 200px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .business-input > div section input {
    border: none;
    width: 80%;
    padding: 8px 0;
    border-radius: 4px;
    padding-left: 1.5rem;
    box-sizing: border-box;
    outline: none;
  }

  .business-input > div > i, .business-input > div > span {
    color: #555 !important;
    margin: 0 1.25rem;
  }

  .business-input > div > span {
    font-size: 26px;
  }

  .business-input > button {
    width: 255px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #fff;
    background: #f54648;
    letter-spacing: 10px;
    border: none;
    border-radius: 4px;
    margin-top: 1.833rem;
    font-size: 16px;
    outline: none;
  }

  .business-cny-sell {
    background: #63b212 !important;;
  }

  .shijia-ipt {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 255px;
  }

  .shijia-ipt > input {
    border: none;
    border-radius: 4px;
    outline: none;
    padding: 8px 1.5rem;
  }

  .business-input > div > em {
    flex: 1.168rem;
    margin-left: 2rem;
    color: #666;
  }

  .margin-top-20 {
    margin-top: 20px !important;
  }
</style>
