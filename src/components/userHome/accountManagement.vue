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
          <span class="iconFont aCNY"></span>
          <span>CNY账户</span>
        </label>
        <input name="select-account-cash123" type="radio" id="account-btc-cash124" value="2"/>
        <label for="account-btc-cash124">
          <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
          <span class="iconFont aBTC"></span>
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
          <section v-for="(item,index) in AccountCNY">
            <input name="select-currency-cash1231" type="radio" :id='"recharge-currency-cny-cash1231"+index'
                   :value="item"
            />
            <label :for='"recharge-currency-cny-cash1231"+index' :class="index===0?'recharge-group-radio-checked':''">
              <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
              <span class="iconFont" :class='"a"+item'></span>
              <span>{{item}}</span>
            </label>
          </section>
        </div>
      </transition>
      <transition enter-active-class="animated fadeIn">
        <div class="recharge-group-radio" v-show="account">
          <section v-for="(item,index) in AccountBTC">
            <input name="select-currency1-cash1232" type="radio" :id='"recharge-currency-cny-btc1-cash12324"+index'
                   :value="item"
            />
            <label :for='"recharge-currency-cny-btc1-cash12324"+index'
                   :class="index===0?'recharge-group-radio-checked':''">
              <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
              <span class="iconFont" :class='"a"+item'></span>
              <span>{{item}}</span>
            </label>
          </section>
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
        <div class="backItem addBankCard" @click="goAddBank()">
          <i class="iconfont">&#xe689;</i>
          <span>添加新银行卡</span>
        </div>
        <!--<router-link to="/accountManagement/addBankCard" tag="div">-->

        <!--</router-link>-->
      </div>
      <div class="btcAdr" v-show="moneyStyle">
        <div class="adrItem" v-for="(item,index) in currencyAdr">
          <p>{{item.address}}</p>
          <p><span>[{{item.currency | translate}}地址{{index + 1}}]</span><a href="javascript:;" @click="delAdr($event)"
                                                                           :digtalid="item.id">删除该地址</a></p>
        </div>
        <div class="adrItem addBankCard" @click="goAddAdr()">
          <i class="iconfont">&#xe689;</i>
          <span>添加新地址</span>
        </div>
        <!--<router-link :to="'/accountManagement/addCurrencyAdr/'+selectCurrency"  tag="div" class="adrItem addBankCard">-->
        <!---->
        <!--</router-link>-->
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
          "PINGAN": require('../../assets/img/banklogo/PINGAN.png'),
        },
        currencyAdr: [],
        selectCurrency: 'BTC',
        AccountCNY: [],
        AccountBTC: [],
      }
    },
    created(){
      this.getCommodity();
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
        setTimeout(function () {
          $("input[name='select-currency-cash1231']").change(function () {
            $(this).next().addClass('recharge-group-radio-checked').parent().siblings().find('label').removeClass('recharge-group-radio-checked');
            if ($(this).val() === 'CNY') {
              that.moneyStyle = false;
            } else {
              that.moneyStyle = true;
              that.getBindCurrencyAdr();
            }
          })
          $("input[name='select-currency1-cash1232']").change(function () {
            $(this).next().addClass('recharge-group-radio-checked').parent().siblings().find('label').removeClass('recharge-group-radio-checked');
            that.getBindCurrencyAdr();
          })
        }, 600);

      }//选择提现币种
      this.getBindBankCard();
    },
    methods: {
      goAddBank(){
        if (localStorage.getItem('real')) {
          this.$router.push('/accountManagement/addBankCard')
        } else {
          this.showError('', '未实名认证');
          this.$router.push('/settings/user')
        }
      },
      goAddAdr(){
        if (localStorage.getItem('real')) {
          this.$router.push('/accountManagement/addCurrencyAdr/' + this.selectCurrency)
        } else {
          this.showError('', '未实名认证');
          this.$router.push('/settings/user')
        }
      },
      delBankCard(ev){
        let url = this.$URL_API + 'accountBank/cancel/' + ev.target.getAttribute('bankid');
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
        let url = this.$URL_API + 'digital/cancel/' + ev.target.getAttribute('digtalid');
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
          url: this.$URL_API + 'accountBank/all',
          method: 'GET',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + this.$store.state.token
          }
        }).then((res) => {
          if (res.data.code !== 200) {
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
          currency = $("input[name='select-currency-cash1231']:checked").val() ? $("input[name='select-currency-cash1231']:checked").val() : 'CNY';
        } else {
          currency = $("input[name='select-currency1-cash1232']:checked").val() ? $("input[name='select-currency1-cash1232']:checked").val() : 'BTC';
        }

        this.selectCurrency = currency;

        this.$http({
          url: this.$URL_API + 'digital/withdrawInfo/' + currency,
          method: 'GET',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + this.$store.state.token
          }
        }).then((res) => {
          if (res.data.code !== 200) {
            this.showError(res.data.code, res.data.message);
          }
          if (res.data.code === 200) {
            this.currencyAdr = res.data.data;
          }
        }).catch((req) => {
          this.showError(req.code, req.message)
        })
      },//获取绑定数字货币地址
      getCommodity(){
        this.$http({
          url: this.$URL_API + 'commodity/account',
          header: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        }).then((res) => {
          this.AccountCNY = res.data.data.CNY;
          this.AccountBTC = res.data.data.BTC;
        })
      },
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

  .recharge-group-title > a {
    color: #01aaef;
    font-size: 1.167rem;
    font-weight: bold;
  }

  .recharge-group-radio, .recharge-group-radio > section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .recharge-group-radio > input, .recharge-group-radio > section > input {
    display: none;
  }

  .recharge-group-radio > label, .recharge-group-radio > section > label {
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

  .recharge-group-radio label > i, .recharge-group-radio > section > label > i {
    margin-right: 1rem;
  }

  .recharge-group-radio > label > span:nth-of-type(1), .recharge-group-radio > section > label > span:nth-of-type(1) {
    display: none;
    position: absolute;
    right: -0.8rem;
    top: -0.8rem;
    background: #fff;
    padding: .3rem;
    border-radius: 50%;
  }

  .recharge-group-radio > label > span:nth-of-type(1) > span, .recharge-group-radio > section > label > span:nth-of-type(1) > span {
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
    min-width: 24rem;
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
    padding: 0 1.5rem;
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
