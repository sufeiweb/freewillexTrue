<template>
  <div class="userIndex-cash">
    <div class="recharge-group">
      <div class="recharge-group-title">
        <p>选择账户</p>
        <router-link to="/cash/cashLog">提现记录</router-link>
      </div>
      <div class="recharge-group-radio">
        <input name="select-account-cash" type="radio" id="account-cny-cash" value="CNY" checked/>
        <label for="account-cny-cash" class="recharge-group-radio-checked">
          <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
          <span class="iconFont a1"></span>
          <span>CNY账户</span>
        </label>
        <input name="select-account-cash" type="radio" id="account-btc-cash" value="BTC"/>
        <label for="account-btc-cash">
          <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
          <span class="iconFont a2"></span>
          <span>BTC账户</span>
        </label>
      </div>
    </div>
    <div class="recharge-group">
      <div class="recharge-group-title">
        <p>提现币种</p>
      </div>
      <transition enter-active-class="animated fadeIn">
        <div class="recharge-group-radio" v-show="!account">
          <input name="select-currency-cash" type="radio" id="recharge-currency-cny-cash" value="CNY" checked/>
          <label for="recharge-currency-cny-cash" class="recharge-group-radio-checked">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a1"></span>
            <span>CNY</span>
          </label>
          <input name="select-currency-cash" type="radio" id="recharge-currency-cny-btc-cash" value="BTC"/>
          <label for="recharge-currency-cny-btc-cash">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a2"></span>
            <span>BTC</span>
          </label>
          <input name="select-currency-cash" type="radio" id="recharge-currency-cny-ltc-cash" value="LTC"/>
          <label for="recharge-currency-cny-ltc-cash">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a3"></span>
            <span>LTC</span>
          </label>
          <input name="select-currency-cash" type="radio" id="recharge-currency-cny-eth-cash" value="ETH"/>
          <label for="recharge-currency-cny-eth-cash">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a4"></span>
            <span>ETH</span>
          </label>
          <input name="select-currency-cash" type="radio" id="recharge-currency-cny-etc-cash" value="ETC"/>
          <label for="recharge-currency-cny-etc-cash">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a5"></span>
            <span>ETC</span>
          </label>
        </div>
      </transition>
      <transition enter-active-class="animated fadeIn">
        <div class="recharge-group-radio" v-show="account">
          <input name="select-currency1-cash" type="radio" id="recharge-currency-cny-btc1-cash" value="BTC" checked/>
          <label for="recharge-currency-cny-btc1-cash" class="recharge-group-radio-checked">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a2"></span>
            <span>BTC</span>
          </label>
          <input name="select-currency1-cash" type="radio" id="recharge-currency-cny-ltc1-cash" value="LTC"/>
          <label for="recharge-currency-cny-ltc1-cash">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a3"></span>
            <span>LTC</span>
          </label>
          <input name="select-currency1-cash" type="radio" id="recharge-currency-cny-eth1-cash" value="ETH"/>
          <label for="recharge-currency-cny-eth1-cash">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a4"></span>
            <span>ETH</span>
          </label>
          <input name="select-currency1-cash" type="radio" id="recharge-currency-cny-etc1-cash" value="ETC"/>
          <label for="recharge-currency-cny-etc1-cash">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a5"></span>
            <span>ETC</span>
          </label>
        </div>
      </transition>
    </div>
    <transition enter-active-class="animated fadeIn">
      <div class="recharge-group">
        <div class="recharge-group-title">
          <p>提现到</p>
        </div>
        <transition enter-active-class="animated fadeIn">
          <div class="recharge-group-radio-select-bank" v-show="!moneyStyle">
            <div v-for="(item, index) in userBank">
              <input name="select-bank-cash" type="radio" :id="'recharge-mode-cny20-cash'+index"
                     :value="item.abbreviation" :bankid="item.id" :checked="index===0?'checked':''"/>
              <label :for="'recharge-mode-cny20-cash'+index" :class="index===0?'recharge-group-radio-checked':''">
                <span class=""><span></span></span>
                <img :src='bankImgUrl[item.abbreviation]'/>
                <em>尾号 {{item.accountNo.substring(item.accountNo.length - 4)}}</em>
              </label>
            </div>
            <div>
              <input name="select-bank-cash" type="radio" id="recharge-mode-cny22-cash" value="3"/>
              <router-link to="/accountManagement/addBankCard" tag="label" for="recharge-mode-cny22"
                           class="add-bank-select-bank">
                <i class="iconfont">&#xe689;</i>
                <em>添加新银行卡</em>
              </router-link>
            </div>
          </div>
        </transition>
        <transition enter-active-class="animated fadeIn">
          <div class="recharge-group-radio-select-bank btcAdr" v-show="moneyStyle">
            <div v-for="(item, index) in currencyAdr">
              <input name="select-bank-cash1" type="radio" :id="'recharge-mode-cny20-cash1'+index" :value="index+1"
                     :checked="index===0?'checked':''" :address="item.address"/>
              <label :for="'recharge-mode-cny20-cash1'+index" :class="index===0?'recharge-group-radio-checked':''">
                <p>{{item.currency | translate}}地址 {{index + 1}}</p>
                <p>{{item.address}}</p>
              </label>
            </div>
            <div>
              <input name="select-bank-cash1" type="radio" id="recharge-mode-cny22-cash1" value="0"/>
              <router-link to="/accountManagement/addBTCAdr" tag="label" for="recharge-mode-cny22-cash1"
                           class="add-bank-select-bank-btcAdr">
                <i class="iconfont">&#xe689;</i>
                <em>添加新地址</em>
              </router-link>
            </div>

          </div>
        </transition>
      </div>
    </transition>
    <div class="recharge-group">
      <div class="recharge-group-title">
        <p>金额</p>
      </div>
      <transition enter-active-class="animated fadeIn">
        <div class="cash-cny" v-show="!moneyStyle">
          <section>
            <div>
              <span>输入金额</span>
              <input type="text" :placeholder="'本次最多可提'+this.moneyControl.W_MAX+'CNY'" v-model="W_Money"
                     class="w-money"/>
            </div>
            <span>手续费<span class="color-blue">{{FEE ? FEE : moneyControl.W_MIN_FEE | float2}} CNY</span></span>
            <span><i class="iconfont tishi-span">&#xe69d;</i><span
              class="tishi-span-hide"> 单笔提现最低手续费{{moneyControl.W_MIN_FEE | float2}} CNY</span></span>
          </section>
          <section>
            <div>
              <span>资金密码</span>
              <input type="password" v-model="moneyPsd" placeholder="资金密码"/>
            </div>
            <router-link to="/settings/modifyFullPsd">忘记资金密码？</router-link>
          </section>
          <section>
            <div class="section-div-label">
              <input type="radio" name="cash-btc-style-yz1" id="cash-btc-style-yz-emai11" value="email" checked/>
              <label for="cash-btc-style-yz-emai11" class="cash-btc-select-color">邮箱验证</label>
              <input type="radio" name="cash-btc-style-yz1" id="cash-btc-style-yz-phone11" value="mobile"/>
              <label for="cash-btc-style-yz-phone11">手机验证</label>
            </div>
          </section>
          <section>
            <div>
              <input type="text" placeholder="验证码" v-model="serverYZ"/>
              <button @click="getYZCode($event)">发送验证码</button>
            </div>
          </section>
          <section>
            <button @click="QCash($event)">确认提现</button>
          </section>
        </div>
      </transition>
      <transition enter-active-class="animated fadeIn">
        <div class="cash-btc" v-show="moneyStyle">
          <section>
            <div class="btc-num-input">
              <input placeholder="输入提币数量" v-model="W_Money"/>
            </div>
            <span class="btc-num-input-tips" style="color: red;"></span>
          </section>
          <section class="select-shouxufei" v-show="FreeShow">
            <p>选择手续费</p>
            <div class="section-div-label">
              <div v-for="(item,index) in Fee">
                <input type="radio" name="select-Service-Charge" :id="'Service-Charge-1'+index" :value="item.fee"/>
                <label :for="'Service-Charge-1'+index">{{item.fee}} {{item.currency}}</label>
              </div>
            </div>
            <p>提高手续费可以在一定程度上提高网络的确认速度</p>
          </section>
          <section>
            <div>
              <span>资金密码</span>
              <input type="password" v-model="moneyPsd" placeholder="资金密码"/>
            </div>
            <router-link to="/settings/modifyFullPsd">忘记资金密码？</router-link>
          </section>
          <section>
            <div class="section-div-label">
              <input type="radio" name="cash-btc-style-yz" id="cash-btc-style-yz-email" value="email" checked/>
              <label for="cash-btc-style-yz-email" class="cash-btc-select-color">邮箱验证</label>
              <input type="radio" name="cash-btc-style-yz" id="cash-btc-style-yz-phone" value="mobile"/>
              <label for="cash-btc-style-yz-phone">手机验证</label>
            </div>
          </section>
          <section>
            <div>
              <input type="text" placeholder="验证码" v-model="serverYZ"/>
              <button @click="getYZCode($event)">发送验证码</button>
            </div>
          </section>
          <section>
            <button @click="QCash1($event)">确认提现</button>
          </section>
        </div>
      </transition>
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
        userBank: [],//银行
        currencyAdr: [],//地址
        Account: '',//当前账户
        currency: '',//当前币种
        moneyControl: {},//资金控制
        W_Money: '',//提现数量
        FEE: '',//手续费
        moneyPsd: '',//资金密码
        serverYZ: '',//验证码
        Fee: [],//数字货币手续费
        FreeShow: true,
        CurrencyFee: '',//数字货币费率控制
      }
    },
    mounted() {
      let that = this;
      {
        $("input[name='select-account-cash']").change(function () {
          that.closeNum();
          $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
          if ($(this).val() === 'CNY') {
            that.account = false;
            if ($("input[name='select-currency-cash']:checked").val() === 'CNY') {
              that.moneyStyle = false;
            } else {
              that.moneyStyle = true;
            }
          }
          else {
            that.account = true;
            that.moneyStyle = true;
            that.getCashAdr();
            that.getFee();
          }
        })
      }//选择账户
      {
        $("input[name='select-currency-cash']").change(function () {
          that.closeNum();
          $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
          if ($(this).val() === 'CNY') {
            that.moneyStyle = false;
          } else {
            that.moneyStyle = true;
          }
          that.getCashAdr();
          that.getFee();
        })
        $("input[name='select-currency1-cash']").change(function () {
          that.closeNum();
          $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
          that.getCashAdr();
          that.getFee();
        })
      }//选择提现币种
      {
        $("input[name='cash-btc-style-yz']").change(function () {
          $(this).next().addClass('cash-btc-select-color').siblings().removeClass('cash-btc-select-color');
        })
        $("input[name='cash-btc-style-yz1']").change(function () {
          $(this).next().addClass('cash-btc-select-color').siblings().removeClass('cash-btc-select-color');
        })
      }//验证方式选择
      {
        this.$http({
          url: 'https://kaifamobile.firstcoinex.com/fwex/web/accountBank/all',
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
            that.userBank = res.data.data;
          }
        }).then(() => {
          $("input[name='select-bank-cash']").change(function () {
            $(this).next().addClass('recharge-group-radio-checked').parent().siblings().find('label').removeClass('recharge-group-radio-checked');
            that.getCNYCode();
          });//选择充值银行
        }).catch((req) => {
          this.showError(req.code, req.message)
        })
      }//获取用户绑定银行
      {
        setTimeout(function () {
          that.getCNYCode();
        }, 500)
      }//初始化当前资金控制信息
      {
        $('.w-money').keyup(function () {
          if (isNaN($(this).val())) {
            $(this).val('');
          }
          if (parseFloat(that.W_Money) < parseFloat(that.moneyControl.W_MIN)) {
            $('.tishi-span-hide').html('最小出金额为' + that.moneyControl.W_MIN);
          }
          if (parseFloat(that.W_Money) > parseFloat(that.moneyControl.W_MAX)) {
            $('.tishi-span-hide').html('最大出金额为' + that.moneyControl.W_MAX);
          }
          if ((parseFloat(that.W_Money) * parseFloat(that.moneyControl.W_RATE)) < parseFloat(that.moneyControl.W_MIN_FEE)) {
            that.FEE = that.moneyControl.W_MIN_FEE;
          } else if ((parseFloat(that.W_Money) * parseFloat(that.moneyControl.W_RATE)) > parseFloat(that.moneyControl.W_MAX_FEE)) {
            that.FEE = that.moneyControl.W_MAX_FEE;
          } else {
            that.FEE = (parseFloat(that.W_Money) * parseFloat(that.moneyControl.W_RATE));
          }
        });
      }//输入显示控制资金信息
      {
        $('.btc-num-input input').keyup(function () {
          if (isNaN(that.W_Money)) {
            that.W_Money = '';
            $('.btc-num-input-tips').html('请输入数字');
          }
          if (parseFloat($(this).val()) < that.CurrencyFee.minWithdraw) {
            $('.btc-num-input-tips').html('最小提现数量为 ' + that.CurrencyFee.minWithdraw + ' ' + that.CurrencyFee.currency);
          } else if (parseFloat($(this).val()) > that.CurrencyFee.maxWithdraw) {
            $('.btc-num-input-tips').html('最小提现数量为 ' + that.CurrencyFee.maxWithdraw + ' ' + that.CurrencyFee.currency);
          } else {
            $('.btc-num-input-tips').html();
          }
        });
      }//数字货币资金控制
    },
    methods: {
      //获取当前账户//当前币种
      getAccount(){
        if (this.account) {
          this.Account = 'BTC';
          this.currency = $("input[name='select-currency1-cash']:checked").val();
        }
        else {
          this.Account = 'CNY';
          this.currency = $("input[name='select-currency-cash']:checked").val()
        }

      },
      //获取提现地址
      getCashAdr(){
        this.getAccount();
        this.$http({
          url: 'https://kaifamobile.firstcoinex.com/fwex/web/digital/withdrawInfo/' + this.currency,
          method: 'GET',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + this.$store.state.token,
          }
        }).then((res) => {
          if (res.data.code !== 200) {
            this.showError(res.data.code, res.data.message);
          }
          if (res.data.code === 200) {
            this.currencyAdr = res.data.data;
          }
        }).then(() => {
          //btc提现地址
          $("input[name='select-bank-cash1']").change(function () {
            //console.log(1)
            $(this).next().addClass('recharge-group-radio-checked').parent().siblings().find('label').removeClass('recharge-group-radio-checked');
          })
        }).catch((req) => {
          this.showError(req.code, req.message)
        });
        this.closeNum();
      },
      //获取人名币充提参数
      getCNYCode(){
        let bankId = $("input[name='select-bank-cash']:checked").attr('bankid');
        this.$http({
          url: 'https://kaifamobile.firstcoinex.com/fwex/web/accountBank/param/' + bankId,
          method: 'GET',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + this.$store.state.token,
          }
        }).then((res) => {
          if (res.data.code !== 200) {
            this.showError(res.data.code, res.data.message);
          }
          if (res.data.code === 200) {
            for (let i = 0; i < res.data.data.length; i++) {
              this.$set(this.moneyControl, res.data.data[i].paramKey, res.data.data[i].paramValue);
            }
          }
        }).catch((req) => {
          this.showError(req.code, req.message)
        })
      },
      //获取验证码
      getYZCode(ev){
        let code = $("input[name='cash-btc-style-yz1']:checked").val();
        this.$http({
          url: 'https://kaifamobile.firstcoinex.com/fwex/web/captcha/' + code,
          method: 'GET',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + this.$store.state.token,
          }
        }).then((res) => {
          this.showError(res.data.code, res.data.message);
          if (res.data.code === 200) {
            let s = 60;
            let ts = setInterval(function () {
              ev.target.innerHTML = (--s) + 's';
              ev.target.setAttribute('disabled', 'true');
              if (s === 0) {
                clearInterval(ts);
                ev.target.innerHTML = '获取验证码';
                ev.target.setAttribute('disabled', 'false');
              }
            }, 1000);
          }
        }).catch((req) => {
          this.showError(req.code, req.message)
        })
      },
      //法币确认提现
      QCash(ev){
        let id = $("input[name='select-bank-cash']:checked").attr('bankid');
        let val = $("input[name='cash-btc-style-yz1']:checked").val();
        if (this.moneyPsd && this.W_Money && this.serverYZ) {
          if (this.W_Money >= this.moneyControl.W_MIN && this.W_Money <= this.moneyControl.W_MAX) {
            ev.target.innerHTML = '处理中...';
            this.$http({
              url: 'https://kaifamobile.firstcoinex.com/fwex/web/capital/withdraw',
              method: 'POST',
              headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-Authorization': 'Bearer ' + this.$store.state.token,
                "Content-Type": "application/json;charset=UTF-8",
              },
              data: {
                accountBankId: id,
                commodity: 'CNYCNY',
                currency: 'CNY',
                business: 'W',
                applyBalance: this.W_Money,
                types: val,
                captcha: this.serverYz,
                capitalPwd: this.moneyPsd
              }
            }).then((res) => {
              this.showError(res.data.code, res.data.message);
              if (res.data.code === 200) {
                ev.target.innerHTML = '确认提现';
                this.closeNum();
                this.$router.push('/cash/cashLog')
              }
            }).catch((req) => {
              this.showError(req.code, req.message);
              ev.target.innerHTML = '确认提现';
            })
          } else {
            this.showError('', '请输入正确的金额');
          }
        } else {
          this.showError('', '必备参数不能为空');
        }
      },
      //数字货币提现
      QCash1(ev){
        this.getAccount();
        //手续费
        let fee = $("input[name='select-Service-Charge']:checked").val();
        let nextd;
        if (this.FreeShow) {
          nextd = fee ? true : false;
        } else {
          nextd = true;
        }
        //地址
        let adr = $("input[name='select-bank-cash1']:checked").attr('address');
        let val = $("input[name='cash-btc-style-yz']:checked").val();
        if (!nextd) {
          this.showError('', '请选择手续费')
        }
        if (this.moneyPsd && this.W_Money && this.serverYZ && nextd) {
          if (this.W_Money >= this.CurrencyFee.minWithdraw && this.W_Money <= this.CurrencyFee.maxWithdraw) {
            ev.target.innerHTML = '处理中...';
            this.$http({
              url: 'https://kaifamobile.firstcoinex.com/fwex/web/digital/withdraw',
              method: 'POST',
              headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-Authorization': 'Bearer ' + this.$store.state.token,
                "Content-Type": "application/json;charset=UTF-8",
              },
              data: {
                digtalAddr: adr,
                commodity: this.currency + this.Account,
                currency: this.currency,
                amount: this.W_Money,
                fee: this.FreeShow ? fee : 0,
                types: val,
                captcha: this.serverYZ,
                capitalPwd: this.moneyPsd
              }
            }).then((res) => {
              this.showError(res.data.code, res.data.message);
              if (res.data.code === 200) {
                ev.target.innerHTML = '确认提现';
                this.closeNum();
                this.$router.push('/cash/cashLog')
              }
            }).catch((req) => {
              this.showError(req.code, req.message);
              ev.target.innerHTML = '确认提现';
            })
          }
        } else {
          this.showError('', '必备参数不能为空');
        }
      },
      //获取数字货币提现手续费
      getFee(){
        this.getAccount();
        this.getCurrencyFee();
        this.$http({
          url: 'https://kaifamobile.firstcoinex.com/fwex/web/digital/fee/' + this.currency,
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Authorization': 'Bearer ' + this.$store.state.token,
          },
        }).then((res) => {
          if (res.data.code !== 200) {
            this.showError(res.data.code, res.data.message);
          }
          if (res.data.code === 200) {
            this.Fee = res.data.data;
            this.FreeShow = res.data.data.length > 0;
          }
        }).then(() => {
          //提现速率
          $("input[name='select-Service-Charge']").change(function () {
            $(this).parent().addClass('cash-btc-select-color').siblings().removeClass('cash-btc-select-color');
          })
        }).catch((req) => {
          this.showError(req.code, req.message)
        })
      },
      //获取费率
      getCurrencyFee(){
        this.$http({
          url: 'http://192.168.1.48:8089/fwex/web/digital/rates/' + this.currency,
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Authorization': 'Bearer ' + this.$store.state.token,
          },
        }).then((res) => {
          if (res.data.code === 200) {
            this.CurrencyFee = res.data.data;
            console.log(this.CurrencyFee);
          }

        }).catch((req) => {
          this.showError(req.code, req.message)
        })
      },
      closeNum(){
        this.W_Money = '';
        this.serverYZ = '';
        this.moneyPsd = '';
      }
    }
  }
</script>
<style scoped>
  .userIndex-cash {
    padding: 0 1.667rem 0 3.333rem;
    font-size: 1.167rem;
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

  .recharge-group-radio-select-bank > div {
    width: 316px;
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

  .recharge-group-radio-select-bank .recharge-group-radio-checked > span {
    background: #01aaef;
    border: none !important;
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

  .add-bank-select-bank {
    border: none !important;
    font-size: 1.167rem;
    color: #01aaef;
  }

  .add-bank-select-bank em {
    margin-left: 0.5rem !important;
  }

  .add-charge-btc i {
    font-size: 22px;
    margin-left: 2rem;
  }

  .recharge-group-radio > a {
    color: #01aaef;
    font-weight: bold;
  }

  .btcAdr label {
    padding: .83rem 1rem !important;
    display: block !important;
  }

  .btcAdr .add-bank-select-bank-btcAdr {
    display: flex !important;
    border: none;
    color: #01aaef;
    align-items: center;
  }

  .btcAdr .add-bank-select-bank-btcAdr > em {
    margin-left: 0.5rem !important;
  }

  .recharge-group section {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 1.25rem;
  }

  .recharge-group section > div {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .recharge-group section > span {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .recharge-group section > div > input {
    outline: none;
    padding: 0.6rem .9rem;
    border: none;
  }

  .recharge-group section > div {
    border: 1px solid #ddd;
    color: #999;
    padding: 0 1.5rem;
    margin-right: 1rem;
    box-sizing: border-box;
  }

  .recharge-group section span {
    margin: 0 .3rem;
  }

  .recharge-group section > a {
    color: #01aaef;
    text-decoration: underline;
  }

  .color-blue {
    color: #01aaef;
  }

  .tishi-span-hide {
    font-size: 12px;
    color: red;
  }

  .tishi-span {
    cursor: pointer;
  }

  .section-div-label {
    border: none !important;
    padding: 0 !important;
  }

  .section-div-label > input, .section-div-label > div > input {
    display: none;
  }

  .section-div-label > label, .section-div-label > div {
    padding: .8rem 1rem;
    border: 1px solid #ddd;
    border-radius: 2px;
    margin: 0 1rem 1rem 0;
    cursor: pointer;
  }

  .section-div-label > div > label {
    cursor: pointer;
  }

  .cash-btc-select-color {
    border-color: #01aaef !important;
    color: #333 !important;
  }

  .recharge-group section > div > button {
    border: none;
    background: #01aaef;
    color: #fff;
    width: 66.656px;
    box-sizing: content-box;
    padding: 0.6rem 1rem;
    outline: none;
    cursor: pointer;
  }

  .recharge-group section:nth-last-child(2) > div {
    padding-right: 0;
    padding-left: 0.7rem;
  }

  .recharge-group section:nth-last-child(1) button {
    border: none;
    padding: 1rem 2rem;
    background: #01aaef;
    color: #fff;
    font-size: 1.167rem;
    border-radius: 3px;
  }

  .btc-num-input input {
    width: 19.42rem;
  }

  .select-shouxufei {
    flex-direction: column;
    align-items: flex-start !important;
  }

  .select-shouxufei p {
    color: #01aaef;
    margin-bottom: .7rem;
  }
</style>


