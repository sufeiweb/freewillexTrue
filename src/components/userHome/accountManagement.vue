<template>
  <div class="accountManagement">
    <div class="recharge-group">
      <div class="recharge-group-title">
        <p>选择账户</p>
      </div>
      <div class="recharge-group-radio">
        <input name="select-account-cash123" type="radio" id="account-cny-cash123" value="1" checked/>
        <label for="account-cny-cash123" class="recharge-group-radio-checked">
          <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
          <span class="iconFont a1"></span>
          <span>CNY账户</span>
        </label>
        <input name="select-account-cash123" type="radio" id="account-btc-cash124" value="2"/>
        <label for="account-btc-cash124">
          <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
          <span class="iconFont a2"></span>
          <span>BTC账户</span>
        </label>
      </div>
    </div>
    <div class="recharge-group">
      <div class="recharge-group-title">
        <p>币种</p>
      </div>
      <transition enter-active-class="animated fadeIn">
        <div class="recharge-group-radio" v-show="!account">
          <input name="select-currency-cash1231" type="radio" id="recharge-currency-cny-cash1231" value="CNY" checked/>
          <label for="recharge-currency-cny-cash1231" class="recharge-group-radio-checked">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a1"></span>
            <span>CNY</span>
          </label>
          <input name="select-currency-cash1231" type="radio" id="recharge-currency-cny-btc-cash1232" value="BTC"/>
          <label for="recharge-currency-cny-btc-cash1232">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a2"></span>
            <span>BTC</span>
          </label>
          <input name="select-currency-cash1231" type="radio" id="recharge-currency-cny-ltc-cash1233" value="LTC"/>
          <label for="recharge-currency-cny-ltc-cash1233">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a3"></span>
            <span>LTC</span>
          </label>
          <input name="select-currency-cash1231" type="radio" id="recharge-currency-cny-eth-cash1234" value="ETH"/>
          <label for="recharge-currency-cny-eth-cash1234">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a4"></span>
            <span>ETH</span>
          </label>
          <input name="select-currency-cash1231" type="radio" id="recharge-currency-cny-etc-cash1235" value="ETC"/>
          <label for="recharge-currency-cny-etc-cash1235">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a5"></span>
            <span>ETC</span>
          </label>
        </div>
      </transition>
      <transition enter-active-class="animated fadeIn">
        <div class="recharge-group-radio" v-show="account">
          <input name="select-currency1-cash1232" type="radio" id="recharge-currency-cny-btc1-cash12324" value="BTC"
                 checked/>
          <label for="recharge-currency-cny-btc1-cash12324" class="recharge-group-radio-checked">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a2"></span>
            <span>BTC</span>
          </label>
          <input name="select-currency1-cash1232" type="radio" id="recharge-currency-cny-ltc1-cash12323" value="LTC"/>
          <label for="recharge-currency-cny-ltc1-cash12323">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a3"></span>
            <span>LTC</span>
          </label>
          <input name="select-currency1-cash1232" type="radio" id="recharge-currency-cny-eth1-cash12322" value="ETH"/>
          <label for="recharge-currency-cny-eth1-cash12322">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a4"></span>
            <span>ETH</span>
          </label>
          <input name="select-currency1-cash1232" type="radio" id="recharge-currency-cny-etc1-cash12321" value="ETC"/>
          <label for="recharge-currency-cny-etc1-cash12321">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a5"></span>
            <span>ETC</span>
          </label>
        </div>
      </transition>
    </div>
    <div class="recharge-group">
      <div class="recharge-group-title">
        <p v-show="!moneyStyle">银行卡管理</p>
        <p v-show="moneyStyle">数字货币地址管理</p>
      </div>
      <div class="bankCard" v-show="!moneyStyle">
        <div class="backItem" v-for="item in itemBanks">
          <div class="imgLogo"><img :src="bankImgUrl[item.abbreviation]" alt=""/><span>储蓄卡</span></div>
          <p>{{item.accountNo | bankNo}}</p>
          <a href="javascript:;" @click="delBankCard($event)" :bankid="item.id">删除该卡</a>
        </div>
        <router-link to="/accountManagement/addBankCard" tag="div" class="backItem addBankCard">
          <i class="iconfont">&#xe689;</i>
          <span>添加新银行卡</span>
        </router-link>
      </div>
      <div class="btcAdr" v-show="moneyStyle">
        <div class="adrItem" v-for="(item,index) in currencyAdr">
          <p>{{item.address}}</p>
          <p><span>[{{item.currency | translate}}地址{{index + 1}}]</span><a href="javascript:;" @click="delAdr($event)"
                                                                           :digtalid="item.id">删除该地址</a></p>
        </div>
        <router-link :to="'/accountManagement/addCurrencyAdr/'+selectCurrency"  tag="div" class="adrItem addBankCard">
          <i class="iconfont">&#xe689;</i>
          <span>添加新地址</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default {
    data() {
      return {
        account: false,
        moneyStyle: false,
        itemBanks: [],
        bankImgUrl: {
          "ABC": require('../../assets/img/banklogo/ABC.png'),
          "BCM": require('../../assets/img/banklogo/BCM.png'),
          "BOB": require('../../assets/img/banklogo/BOB.png'),
          "BOC": require('../../assets/img/banklogo/BOC.png'),
          "CCB": require('../../assets/img/banklogo/CCB.png'),
          "CEB": require('../../assets/img/banklogo/CEB.png'),
          "CIB": require('../../assets/img/banklogo/CIB.png'),
          "CMB": require('../../assets/img/banklogo/CMB.png'),
          "CMBC": require('../../assets/img/banklogo/CMBC.png'),
          "CNCB": require('../../assets/img/banklogo/CNCB.png'),
          "HSBC": require('../../assets/img/banklogo/HSBC.png'),
          "ICBC": require('../../assets/img/banklogo/ICBC.png'),
          "PBC": require('../../assets/img/banklogo/PBC.png'),
          "PSBC": require('../../assets/img/banklogo/PSBC.png'),
        },
        currencyAdr: [],
        selectCurrency: 'BTC'
      }
    },
    mounted (){
      let that = this;
      {
        $("input[name='select-account-cash123']").change(function () {
          $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
          if ($(this).val() === '1') {
            that.account = false;
            that.moneyStyle = false;
            if ($("input[name='select-currency-cash1231']:checked").val() === 'CNY') {
              that.moneyStyle = false;
            } else {
              that.moneyStyle = true;
            }
          }
          else {
            that.account = true;
            that.moneyStyle = true;
            that.getBindCurrencyAdr();
          }
        })
      }//选择账户
      {
        $("input[name='select-currency-cash1231']").change(function () {
          $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
          if ($(this).val() === 'CNY') {
            that.moneyStyle = false;
          } else {
            that.moneyStyle = true;
            that.getBindCurrencyAdr();
          }
        })
        $("input[name='select-currency1-cash1232']").change(function () {
          $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
          that.getBindCurrencyAdr();
        })
      }//选择提现币种
      this.getBindBankCard();
    },
    methods: {
      delBankCard(ev){
        let url = 'https://kaifamobile.firstcoinex.com/fwex/web/accountBank/cancel/' + ev.target.getAttribute('bankid');
        this.$http({
          url: url,
          method: 'GET',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + this.$store.state.token
          }
        }).then((res) => {
          this.showError(res.data.code, res.data.message);
          if (res.data.code === 200) {
            ev.target.parentNode.remove();
          }
        }).catch((req) => {
          this.showError(req.code, req.message)
        })
      },//删除银行卡
      delAdr(ev){
        let url = 'https://kaifamobile.firstcoinex.com/fwex/web/digital/cancel/' + ev.target.getAttribute('digtalid');
        this.$http({
          url: url,
          method: 'GET',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + this.$store.state.token
          }
        }).then((res) => {
          this.showError(res.data.code, res.data.message);
          if (res.data.code === 200) {
            ev.target.parentNode.parentNode.remove();
          }
        }).catch((req) => {
          this.showError(req.code, req.message)
        })
      },//删除数字货币地址
      getBindBankCard(){
        let that = this;
        this.$http({
          url: 'https://kaifamobile.firstcoinex.com/fwex/web/accountBank/all',
          method: 'GET',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + this.$store.state.token
          }
        }).then((res) => {
          if(res.data.code!==200){
            this.showError(res.data.code, res.data.message);
          }
          if (res.data.code === 200) {
            that.itemBanks = res.data.data;
          }
        }).catch((req) => {
          this.showError(req.code, req.message)
        });
      },//获取提现地址
      getBindCurrencyAdr(){
        let currency;
        if ($("input[name='select-account-cash123']:checked").val() === '1') {
          currency = $("input[name='select-currency-cash1231']:checked").val();
        } else {
          currency = $("input[name='select-currency1-cash1232']:checked").val();
        }

        this.selectCurrency = currency;

        this.$http({
          url: 'https://kaifamobile.firstcoinex.com/fwex/web/digital/withdrawInfo/' + currency,
          method: 'GET',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + this.$store.state.token
          }
        }).then((res) => {
          if(res.data.code!==200){
            this.showError(res.data.code, res.data.message);
          }
          if (res.data.code === 200) {
            this.currencyAdr = res.data.data;
          }
        }).catch((req) => {
          this.showError(req.code, req.message)
        })
      }//获取绑定数字货币地址
    },
  }
</script>
<style scoped>
  .accountManagement {
    padding: 0 1.667rem 0 3.333rem;
  }

  .recharge-group-title {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    font-size: 1.333rem;
    border-bottom: 1px solid #ddd;
    padding: 1.5rem 0;
    margin-bottom: 1.25rem;
  }

  .iconFont {
    width: 22px;
    height: 22px;
    margin: .5rem;

  }

  .recharge-group-radio-checked .a1, .recharge-group-radio-checked .a2, .recharge-group-radio-checked .a3, .recharge-group-radio-checked .a4, .recharge-group-radio-checked .a5 {
    background-position: 0;
  }

  .a1 {
    background: url("../../assets/img/iconPng/CNYzhanghu.png");
    background-position: -22px;

  }

  .a2 {
    background: url("../../assets/img/iconPng/BTCzhanghu.png");
    background-position: -22px;
  }

  .a3 {
    background: url("../../assets/img/iconPng/ltc.png");
    background-position: -22px;
  }

  .a4 {
    background: url("../../assets/img/iconPng/ETH.png");
    background-position: -22px;
  }

  .a5 {
    background: url("../../assets/img/iconPng/ETC.png");
    background-position: -22px;
  }

  .recharge-group-title > a {
    color: #01aaef;
    font-size: 1.167rem;
    font-weight: bold;
  }

  .recharge-group-radio {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .recharge-group-radio > input {
    display: none;
  }

  .recharge-group-radio > label {
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

  .recharge-group:nth-of-type(1) label {
    flex-direction: column;
  }

  .recharge-group:nth-of-type(1) label > i {
    flex-direction: column;
    margin-right: 0;
  }

  .recharge-group-radio label > i {
    margin-right: 1rem;
  }

  .recharge-group-radio > label > span:nth-of-type(1) {
    display: none;
    position: absolute;
    right: -0.8rem;
    top: -0.8rem;
    background: #fff;
    padding: .3rem;
    border-radius: 50%;
  }

  .recharge-group-radio > label > span:nth-of-type(1) > span {
    border-radius: 50%;
    background: #01aaef;
    color: #fff;
    padding: 0.1rem;
  }

  .recharge-group-radio-checked {
    border-color: #01aaef !important;
  }

  .recharge-group-radio-checked > span {
    display: block !important;
    border-color: #01aaef !important;
  }

  .bankCard {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .backItem {
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    width: 23.333rem;
    height: 11.667rem;
    border-radius: 4px;
    margin-right: 1.833rem;
    margin-bottom: 1.833rem;
  }

  .backItem:hover {
    border-color: #01aaef;
  }

  .backItem:hover a {
    display: block;
  }

  .imgLogo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: #f8f8f8;
    height: 5rem;
    padding: 0 1.83rem;
    box-sizing: border-box;
    margin-bottom: 1.833rem;
    border-radius: 4px 4px 0 0;
  }

  .imgLogo > span {
    background: #e0e0e0;
    padding: .2rem .5rem;
    border-radius: 4px;
    font-size: 1.167rem;
  }

  .backItem > p, .backItem > a {
    padding: 0 1.83rem;
    font-size: 1.167rem;
  }

  .backItem > a {
    display: none;
    color: #01aaef;
    align-self: flex-end;
  }

  .addBankCard {
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .addBankCard i {
    border: 2px solid #ddd;
    border-radius: 50%;
    color: #ddd;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin-bottom: 1.333rem;
  }

  .addBankCard > span {
    font-size: 1.167rem;
    color: #3eadff;
  }

  .addBankCard:hover i {
    color: #01aaef;
    border-color: #01aaef;
  }

  .addBankCard:hover span {
    color: #01aaef;
  }

  .btcAdr {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .adrItem {
    display: flex;
    flex-direction: column;
    width: 24rem;
    height: 9.167rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-right: 1.833rem;
    margin-bottom: 1.833rem;
  }

  .adrItem:hover {
    border-color: #01aaef;
  }

  .adrItem:hover a {
    display: block !important;
  }

  .adrItem > p {
    padding: 0 1.833rem;
    box-sizing: border-box;
  }

  .adrItem > p:nth-of-type(1) {
    background: #f8f8f8;
    height: 4.167rem;
    line-height: 4.167rem;
    border-radius: 4px 4px 0 0;
  }

  .adrItem > p:nth-of-type(2) {
    display: flex;
    align-items: center;
    padding-top: 2rem;
    justify-content: space-between;
  }

  .adrItem > p:nth-of-type(2) span {
    color: #ff8236;
  }

  .adrItem > p:nth-of-type(2) a {
    color: #01aaef;
    display: none;
  }
</style>
