<template>
  <div class="userIndex-recharge">
    <div class="recharge-group">
      <div class="recharge-group-title">
        <p>选择账户</p>
        <router-link to="/recharge/rechargeLog">充值记录</router-link>
      </div>
      <div class="recharge-group-radio">
        <input name="select-account" type="radio" id="account-cny" value="CNY" checked/>
        <label for="account-cny" class="recharge-group-radio-checked">
          <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
          <span class="iconFont a1"></span>
          <span>CNY账户</span>
        </label>
        <input name="select-account" type="radio" id="account-btc" value="BTC"/>
        <label for="account-btc">
          <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
          <span class="iconFont a2"></span>
          <span>BTC账户</span>
        </label>
      </div>
    </div>
    <div class="recharge-group">
      <div class="recharge-group-title">
        <p>充值币种</p>
      </div>
      <div class="recharge-group-radio" v-show="!account">

        <input name="select-currency" type="radio" id="recharge-currency-cny" value="CNY" checked/>
        <label for="recharge-currency-cny" class="recharge-group-radio-checked">
          <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
          <span class="iconFont a1"></span>
          <span>CNY</span>
        </label>

        <input name="select-currency" type="radio" id="recharge-currency-cny-btc" value="BTC"/>
        <label for="recharge-currency-cny-btc">
          <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
          <span class="iconFont a2"></span>
          <span>BTC</span>
        </label>

        <input name="select-currency" type="radio" id="recharge-currency-cny-ltc" value="LTC"/>
        <label for="recharge-currency-cny-ltc">
          <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
          <span class="iconFont a3"></span>
          <span>LTC</span>
        </label>

        <input name="select-currency" type="radio" id="recharge-currency-cny-eth" value="ETH"/>
        <label for="recharge-currency-cny-eth">
          <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
          <span class="iconFont a4"></span>
          <span>ETH</span>
        </label>
        <input name="select-currency" type="radio" id="recharge-currency-cny-etc" value="ETC"/>
        <label for="recharge-currency-cny-etc">
          <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
          <span class="iconFont a5"></span>
          <span>ETC</span>
        </label>
      </div>
      <div class="recharge-group-radio" v-show="account">
        <input name="select-currency1" type="radio" id="recharge-currency-cny-btc1" value="BTC" checked/>
        <label for="recharge-currency-cny-btc1" class="recharge-group-radio-checked">
          <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
          <span class="iconFont a2"></span>
          <span>BTC</span>
        </label>
        <input name="select-currency1" type="radio" id="recharge-currency-cny-ltc1" value="LTC"/>
        <label for="recharge-currency-cny-ltc1">
          <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
          <span class="iconFont a3"></span>
          <span>LTC</span>
        </label>
        <input name="select-currency1" type="radio" id="recharge-currency-cny-eth1" value="ETH"/>
        <label for="recharge-currency-cny-eth1">
          <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
          <span class="iconFont a4"></span>
          <span>ETH</span>
        </label>
        <input name="select-currency1" type="radio" id="recharge-currency-cny-etc1" value="ETC"/>
        <label for="recharge-currency-cny-etc1">
          <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
          <span class="iconFont a5"></span>
          <span>ETC</span>
        </label>
      </div>
    </div>
    <div class="recharge-group" v-show="moneyStyle">
      <div class="recharge-group-title">
        <p>充值地址</p>
      </div>
      <div class="recharge-group-radio">
        <div class="add-charge-btc">
          <input type="text" id="adr" :value="itemAddrs" readonly/>
          <i class="iconfont erCord_bigBtn">&#xe635;</i>
        </div>
        <a href="javascript:;" @click="CopyAdr($event)" text="复制成功">复制地址</a>
      </div>
      <div class="erCord_big">
        <img src="../../assets/img/download/APPcode.jpg" width="150"/>
      </div>
    </div>
    <div class="recharge-group" v-show="!moneyStyle">
      <div class="recharge-group-title">
        <p>充值方式</p>
      </div>
      <div class="recharge-group-radio">
        <input name="select-style" type="radio" id="recharge-style-cny" value="1" checked/>
        <label for="recharge-style-cny" class="recharge-group-radio-checked">
         <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
          <span class="iconFont a6"></span>
          <span>网上银行</span>
        </label>
        <input name="select-style" type="radio" id="recharge-style-btc" value="2"/>
        <label for="recharge-style-btc">
          <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
          <span class="iconFont a7"></span>
          <span>自助汇款</span>
        </label>
        <input name="select-style" type="radio" id="recharge-style-zfb" value="3"/>
        <label for="recharge-style-zfb">
          <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
          <span class="iconFont a8"></span>
          <span>支付宝</span>
        </label>
      </div>
    </div>
    <div class="recharge-group" v-show="!moneyStyle">
      <div class="recharge-group-title">
        <p>选择银行</p>
        <a href="javascript:;" @click="bank11=true;more=false" v-show="more">更多</a>
        <a href="javascript:;" @click="bank11=false;more=true" v-show="!more">收起</a>
      </div>
      <div class="recharge-group-radio-select-bank" v-show="bank1">
        <div v-for="(item,index) in ZCBank" v-show="index<=7">
          <input name="select-bank" type="radio" :id="'recharge-mode-cny'+index" :value="item.abbreviation"
                 :checked="index===0?'checked':''"/>
          <label :for="'recharge-mode-cny'+index" :class="index===0?'recharge-group-radio-checked':''">
            <span><span></span></span>
            <img :src='bankImgUrl[item.abbreviation]'/>
          </label>
        </div>
      </div>
      <div class="recharge-group-radio-select-bank" v-show="bank11">
        <div v-for="(item,index) in ZCBank" v-show="index>7">
          <input name="select-bank" type="radio" :id="'recharge-mode-cny'+index" :value="item.abbreviation"
                 :checked="index===0?'checked':''"/>
          <label :for="'recharge-mode-cny'+index" :class="index===0?'recharge-group-radio-checked':''">
            <span><span></span></span>
            <img :src='bankImgUrl[item.abbreviation]'/>
          </label>
        </div>
      </div>
      <div class="recharge-group-radio-select-bank" v-show="bank2">
        <div v-for="(item,index) in userBank">
          <input name="select-bank2" type="radio" :id='"recharge-mode-cny20"+index' :value="item.abbreviation"
                 :bankid="item.id" :bankUrl="item.bankUrl" :checked="index===0?'checked':''"/>
          <label :for='"recharge-mode-cny20"+index' :class="index===0?'recharge-group-radio-checked':''">
            <span class=""><span></span></span>
            <img :src='bankImgUrl[item.abbreviation]'/>
            <em>尾号 {{item.accountNo.substring(item.accountNo.length - 4)}}</em>
          </label>
        </div>
        <div>
          <input name="select-bank2" type="radio" id="recharge-mode-cny22" value="3"/>
          <router-link to="/accountManagement/addBankCard" tag="label" for="recharge-mode-cny22"
                       class="add-bank-select-bank">
            <i class="iconfont">&#xe689;</i>
            <em>添加新银行卡</em>
          </router-link>
        </div>
      </div>
      <div class="recharge-group-radio-select-bank" v-show="bank3">
        <div>
          <input name="select-bank3" type="radio" id="recharge-mode-zfb12" value="FUND"/>
          <label for="recharge-mode-zfb12" class="recharge-group-radio-checked">
            <span><span></span></span>
            <img src="../../assets/img/banklogo/FUND_IO_TYPE_1.png"/>
          </label>
        </div>
      </div>
    </div>
    <div class="recharge-group" v-show="!moneyStyle">
      <div class="recharge-group-title">
        <p>金额</p>
      </div>
      <div class="recharge-group-input" v-show="bank1">
        <input type="number" placeholder="请输入金额" v-model="EBank"/>
        <span>元</span>
      </div>
      <div class="recharge-group-input recharge-group-input2" v-show="bank2">
        <input type="number" placeholder="请输入金额" v-model="remittance" class="remittance-ipt"/>
        <span>.{{arNum}}元</span>
      </div>
      <div class="recharge-group-input" v-show="bank3">
        <input type="number" placeholder="请输入金额" v-model="ZFB"/>
        <span>元</span>
      </div>
      <div style="color: red" v-show="bank2"><span>转账时请务必包含此两位小数</span><span class="show-tips-show"></span></div>
      <div class="ER-cord">
        <img src="../../assets/img/download/APPcode.jpg" width="150" v-show="erCord"/>
      </div>
      <button class="recharge-group-button" v-show="!bank3" @click="rechargeBtn($event)">生成汇款单</button>
      <button class="recharge-group-button" v-show="bank3" @click="erCord=true">生成充值码</button>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default {
    data() {
      return {
        account: false,
        bank1: true,
        bank11: false,
        more: true,
        bank2: false,
        bank3: false,
        arNum: 0,
        erCord: false,
        ZCBank: [],
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
        userBank: [],
        EBank: '',//网上银行充值数
        remittance: '',//自助汇款
        ZFB: '', //支付宝付款
        bankName: '',//银行名称,
        moneyStyle: false,
        accountBankId: '',//用户银行卡ID
        commodity: '',//品种
        currency: '',//充值币种
        Account: '',//当前账户,
        itemAddrs: '',//数字货币地址
        moneyControl: {},//充值限制信息
      }
    },
    created() {
      this.arNum = parseInt(Math.random() * 90 + 10);//10~99;

    },
    mounted() {
      let that = this;
      {
        $("input[name='select-account']").change(function () {
          $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
          if ($(this).val() === 'CNY') {
            that.account = false;
            if ($("input[name='select-currency']:checked").val() === 'CNY') {
              that.moneyStyle = false;
            } else {
              that.moneyStyle = true;
            }
          }
          else {
            that.account = true;
            that.moneyStyle = true;
          }
          that.getBindMoneyAdr();
        })
      }//选择账户
      {
        $("input[name='select-currency']").change(function () {
          $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
          if ($(this).val() === 'CNY') {
            that.moneyStyle = false;
          } else {
            that.moneyStyle = true;
          }
          ;
          that.getBindMoneyAdr();
        })
        $("input[name='select-currency1']").change(function () {
          $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
          that.getBindMoneyAdr();
        })
      }//选择充值币种
      {
        $("input[name='select-style']").change(function () {
          $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
          console.log($(this).val(), 'account');
          switch ($(this).val()) {
            case '1':
              that.bank1 = true;
              that.bank2 = false;
              that.bank3 = false;
              break;
            case '2':
              that.bank1 = false;
              that.bank2 = true;
              that.bank3 = false;
              that.getCNYCode1();
              break;
            case '3':
              that.bank1 = false;
              that.bank2 = false;
              that.bank3 = true;
              break;
          }
        })
      }//选择充值方式
      {
        setTimeout(function () {
          $("input[name='select-bank']").change(function () {
            $(this).next().addClass('recharge-group-radio-checked').parent().siblings().find('label').removeClass('recharge-group-radio-checked');
            console.log($(this).val(), 'account')
          })
          $("input[name='select-bank2']").change(function () {
            $(this).next().addClass('recharge-group-radio-checked').parent().siblings().find('label').removeClass('recharge-group-radio-checked');
            console.log($(this).val(), 'account')
          })
        }, 600);
      }//选择充值银行
      {
        $('.erCord_bigBtn').hover(function () {
          $('.erCord_big').animate({opacity: 1})
        }, function () {
          $('.erCord_big').animate({opacity: 0})
        })
      }//btc充值地址二维码放大
      {
        this.$http({
          url: 'http://192.168.1.48:8089/fwex/web/bank/all',
          method: 'GET',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + this.$store.state.token
          }
        }).then((res) => {
          that.ZCBank = res.data.data;
          console.log(res.data.data, 111)
        }).catch((req) => {
          console.log(req, '请求错误')
        })
      }//获取支持银行nag
      {
        this.$http({
          url: 'http://192.168.1.48:8089/fwex/web/accountBank/all',
          method: 'GET',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + this.$store.state.token
          }
        }).then((res) => {
          that.userBank = res.data.data;
          console.log(res.data.data, 1222211);
          console.log(typeof res.data.data[0].abbreviation)
        }).catch((req) => {
          console.log(req, '请求错误')
        })
      }//获取用户绑定银行
      {
        $('.remittance-ipt').keyup(function () {
          var pattern = /^[1-9]\d*$/;
          console.log(pattern.test($(this).val()));
          if (!pattern.test($(this).val())) {
            $(this).val('');
          }
          if (isNaN($(this).val())) {
            $(this).val('');
          }
          if (parseFloat(that.remittance) < parseFloat(that.moneyControl.R_MIN)) {
            $('.show-tips-show').html('最小金额为' + that.moneyControl.R_MIN);
          } else if (parseFloat(that.remittance) > parseFloat(that.moneyControl.R_MAX)) {
            $('.show-tips-show').html('最大金额为' + that.moneyControl.R_MAX);
          } else {
            $('.show-tips-show').html('');
          }
        })
      }
    },
    methods: {
      rechargeBtn(ev) {
        ev.target.innerHTML = '处理中...';
        this.getAccount();
        this.$http({
          url: 'http://192.168.1.48:8089/fwex/web/capital/payments',
          method: 'POST',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Authorization': 'Bearer ' + this.$store.state.token,
            "Content-Type": "application/json;charset=UTF-8",
          },
          data: {
            accountBankId: this.accountBankId,
            commodity: this.commodity,
            currency: this.currency,
            business: 'R',
            applyBalance: this.remittance + '.' + this.arNum
          }
        }).then((res) => {
          console.log(res)
          if (res.data.code === 200) {
            ev.target.innerHTML = '生成汇款单';
            console.log(res.data.data);
            this.$router.push({
              name: 'rechargeList',
              query: res.data.data
            })
          }
        }).catch((req) => {
          ev.target.innerHTML = '生成汇款单';
          console.log(req, '请求错误')
        })
      },
//    获取当前账户
      getAccount() {
        if (this.account) {
          this.Account = 'BTC';
          this.currency = $("input[name='select-currency1']:checked").val();
        } else {
          this.Account = 'CNY';
          this.currency = $("input[name='select-currency']:checked").val();
        }
        this.commodity = $("input[name='select-currency']:checked").val() + this.Account;
        this.accountBankId = $("input[name='select-bank2']:checked").attr('bankid');
//console.log(this.Account,'ceshi');
//console.log(this.currency,'ceshi');
      },
      getBindMoneyAdr(){
        this.getAccount();
        this.$http({
          url: 'http://192.168.1.48:8089/fwex/web/digital/rechargeInfo/' + this.currency + '/' + this.Account,
          method: 'GET',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + this.$store.state.token,
          }
        }).then((res) => {
          console.log(res, '请求成功');
          if (res.data.code === 200) {
            this.itemAddrs = res.data.data.address;
          }
        }).catch((req) => {
          console.log(req, '')
        });
      },//获取绑定数字货币充值地址
      CopyAdr(ev){
        this.copy('adr', ev.target.getAttribute('text'));
      },//复制
      //获取人名币充提参数
      getCNYCode1(){
        let bankId = $("input[name='select-bank2']:checked").attr('bankid');
        console.log(bankId);
        this.$http({
          url: 'http://192.168.1.48:8089/fwex/web/accountBank/param/' + bankId,
          method: 'GET',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + this.$store.state.token,
          }
        }).then((res) => {
          if (res.data.code === 200) {
            for (let i = 0; i < res.data.data.length; i++) {
              this.$set(this.moneyControl, res.data.data[i].paramKey, res.data.data[i].paramValue);
            }
            console.log(this.moneyControl);
          }
        }).catch((req) => {
          console.log(req, '请求失败');
        })
      },
    },
  }
</script>
<style scoped>
  .iconFont {
    width: 22px;
    height: 22px;
    margin: .5rem;

  }

  .recharge-group-radio-checked .a1, .recharge-group-radio-checked .a2, .recharge-group-radio-checked .a3, .recharge-group-radio-checked .a4, .recharge-group-radio-checked .a5,
  .recharge-group-radio-checked .a6, .recharge-group-radio-checked .a7, .recharge-group-radio-checked .a8 {
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
    background: url("../../assets/img/iconPng/LTC.png");
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
  .a6 {
    background: url("../../assets/img/iconPng/wangshangyinhang.png");
    background-position: -22px;
  }
  .a7 {
     background: url("../../assets/img/iconPng/zizhuhuikuan.png");
     background-position: -22px;
   }
  .a8 {
    background: url("../../assets/img/iconPng/zhufubao.png");
    background-position: -22px;
  }
  .userIndex-recharge {
    padding: 0 1.667rem 0 3.333rem;
    font-size: 1.167rem;
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

  .recharge-group-title > a {
    color: #01aaef;
    font-size: 1.167rem;
    font-weight: bold;
  }

  .recharge-group-radio, .recharge-group-radio-select-bank {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .recharge-group-radio > input, .recharge-group-radio-select-bank > div > input {
    display: none;
  }

  .recharge-group-radio > label, .recharge-group-radio-select-bank > div > label {
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

  .recharge-group-radio-select-bank > div > label > em {
    font-style: normal;
    font-size: 1rem;
    margin-left: 1rem;
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

  .recharge-group-radio-select-bank > div > label {
    padding: 1.5rem 3rem;
    margin-bottom: 1.667rem;
  }

  .recharge-group-radio-select-bank > div > label > span:nth-of-type(1) {
    border: 1px solid #999;
    padding: 5px;
    border-radius: 50%;
    margin-right: 1.5rem;
  }

  .recharge-group-radio-select-bank > div > label > span:nth-of-type(1) > span {
    border-radius: 50%;
    background: #fff;
    width: 4px;
    height: 4px;
  }

  .recharge-group-radio-checked {
    border-color: #01aaef !important;
  }

  .recharge-group-radio-checked > span {
    display: block !important;
    border-color: #01aaef !important;
  }

  .recharge-group-radio-select-bank > div .recharge-group-radio-checked > span {
    background: #01aaef;
    border: none !important;
  }

  .recharge-group-input {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    width: 250px;
    height: 30px;
    font-size: 1.333rem;
    color: #888;
  }

  .recharge-group-input > input {
    border: none;
    width: 90%;
    outline: none;
    padding: 0 1rem;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .recharge-group-input2 > input {
    border: none;
    width: 70%;
    outline: none;
    padding: 0 1rem;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .recharge-group-input2 > span {
    background: #e0e0e0;
    width: 30%;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }

  .recharge-group-button {
    border: none;
    padding: 1rem 2rem;
    color: #fff;
    background: #01aaef;
    margin-left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    outline: none;
  }

  .add-bank-select-bank {
    border: none !important;
    font-size: 1.167rem;
    color: #01aaef;
  }

  .add-bank-select-bank em {
    margin-left: 0.5rem !important;
  }

  .add-charge-btc {
    display: flex;
    align-items: center;
    background: #f0f0f0;
    padding: .7rem 1rem;
    cursor: no-drop;
    margin-right: 3rem;
  }

  .add-charge-btc input {
    background: #f0f0f0;
    width: 28rem;
    border: none;
    outline: none;
  }

  .add-charge-btc i {
    font-size: 22px;
    margin-left: 2rem;
  }

  .recharge-group-radio > a {
    color: #01aaef;
    font-weight: bold;
  }

  .erCord_big {
    margin: 2rem;
    opacity: 0;
  }
</style>


