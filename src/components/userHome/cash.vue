<template>
  <div class="userIndex-cash">
    <div class="recharge-group">
      <div class="recharge-group-title">
        <p>选择账户</p>
        <router-link to="/cash/cashLog">提现记录</router-link>
      </div>
      <div class="recharge-group-radio">
        <input name="select-account-cash" type="radio" id="account-cny-cash" value="1" checked/>
        <label for="account-cny-cash" class="recharge-group-radio-checked">
          <span class=""><span><i class="iconfont">&#xe664;</i></span></span>
          <i class="iconfont">&#xe650;</i>
          <span>CNY账户</span>
        </label>
        <input name="select-account-cash" type="radio" id="account-btc-cash" value="2"/>
        <label for="account-btc-cash">
          <span><span><i class="iconfont">&#xe664;</i></span></span>
          <i class="iconfont">&#xe650;</i>
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
          <input name="select-currency-cash" type="radio" id="recharge-currency-cny-cash" value="1" checked/>
          <label for="recharge-currency-cny-cash" class="recharge-group-radio-checked">
            <span class=""><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
            <span>CNY</span>
          </label>
          <input name="select-currency-cash" type="radio" id="recharge-currency-cny-btc-cash" value="2"/>
          <label for="recharge-currency-cny-btc-cash">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
            <span>BTC</span>
          </label>
          <input name="select-currency-cash" type="radio" id="recharge-currency-cny-ltc-cash" value="3"/>
          <label for="recharge-currency-cny-ltc-cash">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
            <span>LTC</span>
          </label>
          <input name="select-currency-cash" type="radio" id="recharge-currency-cny-eth-cash" value="4"/>
          <label for="recharge-currency-cny-eth-cash">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
            <span>ETH</span>
          </label>
          <input name="select-currency-cash" type="radio" id="recharge-currency-cny-etc-cash" value="5"/>
          <label for="recharge-currency-cny-etc-cash">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
            <span>ETC</span>
          </label>
        </div>
      </transition>
      <transition enter-active-class="animated fadeIn">
        <div class="recharge-group-radio" v-show="account">
          <input name="select-currency1-cash" type="radio" id="recharge-currency-cny-btc1-cash" value="1"/>
          <label for="recharge-currency-cny-btc1-cash" class="recharge-group-radio-checked">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
            <span>BTC</span>
          </label>
          <input name="select-currency1-cash" type="radio" id="recharge-currency-cny-ltc1-cash" value="2"/>
          <label for="recharge-currency-cny-ltc1-cash">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
            <span>LTC</span>
          </label>
          <input name="select-currency1-cash" type="radio" id="recharge-currency-cny-eth1-cash" value="3"/>
          <label for="recharge-currency-cny-eth1-cash">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
            <span>ETH</span>
          </label>
          <input name="select-currency1-cash" type="radio" id="recharge-currency-cny-etc1-cash" value="4"/>
          <label for="recharge-currency-cny-etc1-cash">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
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
          <div class="recharge-group-radio-select-bank" v-show="!account">
            <input name="select-bank-cash" type="radio" id="recharge-mode-cny20-cash" value="ABC" checked/>
            <label for="recharge-mode-cny20-cash" class="recharge-group-radio-checked">
              <span class=""><span></span></span>
              <img src="../../assets/img/banklogo/ABC.png"/>
              <em>尾号 1234</em>
            </label>
            <input name="select-bank-cash" type="radio" id="recharge-mode-cny21-cash" value="CMB" checked/>
            <label for="recharge-mode-cny21-cash">
              <span class=""><span></span></span>
              <img src="../../assets/img/banklogo/CMB.png"/>
              <em>尾号 1234</em>
            </label>
            <input name="select-bank-cash" type="radio" id="recharge-mode-cny22-cash" value="3" checked/>
            <router-link to="/accountManagement/addBankCard" tag="label" for="recharge-mode-cny22" class="add-bank-select-bank">
              <i class="iconfont">&#xe689;</i>
              <em>添加新银行卡</em>
            </router-link>
          </div>
        </transition>
        <transition enter-active-class="animated fadeIn">
          <div class="recharge-group-radio-select-bank btcAdr" v-show="account">
            <input name="select-bank-cash1" type="radio" id="recharge-mode-cny20-cash1" value="1" checked/>
            <label for="recharge-mode-cny20-cash" class="recharge-group-radio-checked">
              <p>比特币地址一</p>
              <p>1Mc9pzwzjFbzJkc14SbpzSDSs3g8d5n5A1</p>
            </label>
            <input name="select-bank-cash1" type="radio" id="recharge-mode-cny21-cash1" value="2" checked/>
            <label for="recharge-mode-cny21-cash">
              <p>比特币地址一</p>
              <p>1Mc9pzwzjFbzJkc14SbpzSDSs3g8d5n5A1</p>
            </label>
            <input name="select-bank-cash1" type="radio" id="recharge-mode-cny22-cash1" value="0" checked/>
            <router-link to="/accountManagement/addBTCAdr" tag="label" for="recharge-mode-cny22"
                         class="add-bank-select-bank-btcAdr">
              <i class="iconfont">&#xe689;</i>
              <em>添加新地址</em>
            </router-link>
          </div>
        </transition>
      </div>
    </transition>
    <div class="recharge-group">
      <div class="recharge-group-title">
        <p>金额</p>
      </div>
      <div class="cash-cny" v-show="!account">
        <section>
          <div>
            <span>输入金额</span>
            <input :placeholder="'本次最多可提'+11111+'CNY'"/>
          </div>
          <span>手续费<span class="color-blue">{{5.00}}CNY</span></span>
          <span><i class="iconfont tishi-span">&#xe69d;</i><span class="tishi-span-hide">单笔提现最低手续费2.00</span></span>
        </section>
        <section>
          <div>
            <span>资金密码</span>
            <input type="password"/>
          </div>
          <router-link to="/settings/modifyFullPsd">忘记资金密码？</router-link>
        </section>
        <section>
          <div class="section-div-label">
            <input type="radio" name="cash-btc-style-yz1" id="cash-btc-style-yz-emai11" value="1" checked/>
            <label for="cash-btc-style-yz-emai11" class="cash-btc-select-color">邮箱验证</label>
            <input type="radio" name="cash-btc-style-yz1" id="cash-btc-style-yz-phone11" value="2"/>
            <label for="cash-btc-style-yz-phone11">手机验证</label>
          </div>
        </section>
        <section>
          <div>
            <input type="text" placeholder="验证码"/>
            <button>发送验证码</button>
          </div>
        </section>
        <section>
          <button>确认提现</button>
        </section>
      </div>
      <div class="cash-btc" v-show="account">
        <section>
          <div class="btc-num-input">
            <input placeholder="输入提币数量"/>
          </div>
        </section>
        <section class="select-shouxufei">
          <p>选择手续费</p>
          <div class="section-div-label">
            <input type="radio" name="select-Service-Charge" id="Service-Charge-1" value="0.0005" checked/>
            <label for="Service-Charge-1" class="cash-btc-select-color">0.0005 BTC</label>
            <input type="radio" name="select-Service-Charge" id="Service-Charge-2" value="0.0010"/>
            <label for="Service-Charge-2">0.0010 BTC</label>
            <input type="radio" name="select-Service-Charge" id="Service-Charge-3" value="0.0015"/>
            <label for="Service-Charge-3">0.0015 BTC</label>
            <input type="radio" name="select-Service-Charge" id="Service-Charge-4" value="0.0020"/>
            <label for="Service-Charge-4">0.0020 BTC</label>
            <input type="radio" name="select-Service-Charge" id="Service-Charge-5" value="0.0050"/>
            <label for="Service-Charge-5">0.0050 BTC</label>
            <input type="radio" name="select-Service-Charge" id="Service-Charge-6" value="0.0100"/>
            <label for="Service-Charge-6">0.0100 BTC</label>
          </div>
          <p>比特币网络转账费用最低0.0005BTC,提高手续费可以在一定程度上提高比特币网络的确认速度</p>
        </section>
        <section>
          <div>
            <span>资金密码</span>
            <input type="password"/>
          </div>
          <router-link to="/settings/modifyFullPsd">忘记资金密码？</router-link>
        </section>
        <section>
          <div class="section-div-label">
            <input type="radio" name="cash-btc-style-yz" id="cash-btc-style-yz-email" value="1" checked/>
            <label for="cash-btc-style-yz-email" class="cash-btc-select-color">邮箱验证</label>
            <input type="radio" name="cash-btc-style-yz" id="cash-btc-style-yz-phone" value="2"/>
            <label for="cash-btc-style-yz-phone">手机验证</label>
          </div>
        </section>
        <section>
          <div>
            <input type="text" placeholder="验证码"/>
            <button>发送验证码</button>
          </div>
        </section>
        <section>
          <button>确认提现</button>
        </section>
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

      }
    },
    created() {
        console.log(sessionStorage.getItem('token'),'token')
    },
    mounted() {
      let that = this;
      {
        $("input[name='select-account-cash']").change(function () {
          $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
          console.log($(this).val(), 'account');
          if ($(this).val() == '1') {
            that.account = false;
          }
          else {
            that.account = true;
          }
        })
      }//选择账户
      {
        $("input[name='select-currency-cash']").change(function () {
          $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
          console.log($(this).val(), 'account')
        })
        $("input[name='select-currency1-cash']").change(function () {
          $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
          console.log($(this).val(), 'account')
        })
      }//选择充值币种
      {
        $("input[name='select-bank-cash']").change(function () {
          $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
          console.log($(this).val(), 'account')
        })
      }//选择充值银行

    }
  }
</script>
<style scoped>
  .userIndex-cash {
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

  .recharge-group-radio > input, .recharge-group-radio-select-bank > input {
    display: none;
  }

  .recharge-group-radio > label, .recharge-group-radio-select-bank > label {
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

  .recharge-group-radio-select-bank > label > em {
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

  .recharge-group-radio-select-bank > label {
    padding: 1.5rem 3rem;
    margin-bottom: 1.667rem;
  }

  .recharge-group-radio-select-bank > label > span:nth-of-type(1) {
    border: 1px solid #999;
    padding: 5px;
    border-radius: 50%;
    margin-right: 1.5rem;
  }

  .recharge-group-radio-select-bank > label > span:nth-of-type(1) > span {
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
    display: none;
  }

  .tishi-span {
    cursor: pointer;
  }

  .section-div-label {
    border: none !important;
    padding: 0 !important;
  }

  .section-div-label > input {
    display: none;
  }

  .section-div-label > label {
    padding: .8rem 1rem;
    border: 1px solid #ddd;
    border-radius: 2px;
    margin: 0 1rem 1rem 0;
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
    padding: .6rem 1rem;
    outline: none;
    cursor: pointer;
  }
  .recharge-group section:nth-last-child(2) > div {
    padding-right: 0;
    padding-left: 0.7rem;
  }
  .recharge-group section:nth-last-child(1) button{
    border:none;
    padding: 1rem 2rem;
    background: #01aaef;
    color:#fff;
    font-size: 1.167rem;
    border-radius: 3px;
  }
  .btc-num-input input{
    width: 19.42rem;
  }
  .select-shouxufei {
    flex-direction: column;
    align-items: flex-start !important;
  }
  .select-shouxufei p{
    color: #01aaef;
    margin-bottom: .7rem;
  }
</style>


