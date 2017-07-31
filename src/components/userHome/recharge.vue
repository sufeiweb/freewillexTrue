<template>
  <div class="userIndex-recharge">
    <div class="recharge-group">
      <div class="recharge-group-title">
        <p>选择账户</p>
        <router-link to="/recharge/rechargeLog">充值记录</router-link>
      </div>
      <div class="recharge-group-radio">
        <input name="select-account" type="radio" id="account-cny" value="1" checked/>
        <label for="account-cny" class="recharge-group-radio-checked">
          <span class=""><span><i class="iconfont">&#xe664;</i></span></span>
          <i class="iconfont">&#xe650;</i>
          <span>CNY账户</span>
        </label>
        <input name="select-account" type="radio" id="account-btc" value="2"/>
        <label for="account-btc">
          <span><span><i class="iconfont">&#xe664;</i></span></span>
          <i class="iconfont">&#xe650;</i>
          <span>BTC账户</span>
        </label>
      </div>
    </div>
    <div class="recharge-group">
      <div class="recharge-group-title">
        <p>充值币种</p>
      </div>
      <transition enter-active-class="animated fadeIn">
        <div class="recharge-group-radio" v-show="!account">

          <input name="select-currency" type="radio" id="recharge-currency-cny" value="1" checked/>
          <label for="recharge-currency-cny" class="recharge-group-radio-checked">
            <span class=""><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
            <span>CNY</span>
          </label>

          <input name="select-currency" type="radio" id="recharge-currency-cny-btc" value="2"/>
          <label for="recharge-currency-cny-btc">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
            <span>BTC</span>
          </label>

          <input name="select-currency" type="radio" id="recharge-currency-cny-ltc" value="3"/>
          <label for="recharge-currency-cny-ltc">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
            <span>LTC</span>
          </label>

          <input name="select-currency" type="radio" id="recharge-currency-cny-eth" value="4"/>
          <label for="recharge-currency-cny-eth">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
            <span>ETH</span>
          </label>
          <input name="select-currency" type="radio" id="recharge-currency-cny-etc" value="5"/>
          <label for="recharge-currency-cny-etc">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
            <span>ETC</span>
          </label>
        </div>
      </transition>
      <transition enter-active-class="animated fadeIn">
        <div class="recharge-group-radio" v-show="account">
          <input name="select-currency1" type="radio" id="recharge-currency-cny-btc1" value="1"/>
          <label for="recharge-currency-cny-btc1" class="recharge-group-radio-checked">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
            <span>BTC</span>
          </label>
          <input name="select-currency1" type="radio" id="recharge-currency-cny-ltc1" value="2"/>
          <label for="recharge-currency-cny-ltc1">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
            <span>LTC</span>
          </label>
          <input name="select-currency1" type="radio" id="recharge-currency-cny-eth1" value="3"/>
          <label for="recharge-currency-cny-eth1">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
            <span>ETH</span>
          </label>
          <input name="select-currency1" type="radio" id="recharge-currency-cny-etc1" value="4"/>
          <label for="recharge-currency-cny-etc1">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
            <span>ETC</span>
          </label>
        </div>
      </transition>
    </div>
    <transition enter-active-class="animated fadeIn">
      <div class="recharge-group" v-show="account">
        <div class="recharge-group-title">
          <p>充值地址</p>
        </div>
        <div class="recharge-group-radio">
          <div class="add-charge-btc">
            <span>QWERTYUIOP987654321ASDFVGbhgfdsaER</span>
            <i class="iconfont erCord_bigBtn">&#xe635;</i>
          </div>
          <a href="javascript:;">复制地址</a>
        </div>
        <div class="erCord_big">
          <img src="../../assets/img/download/APPcode.jpg" width="150"/>
        </div>
      </div>
    </transition>
    <transition enter-active-class="animated fadeIn">
      <div class="recharge-group" v-show="!account">
        <div class="recharge-group-title">
          <p>充值方式</p>
        </div>
        <div class="recharge-group-radio">
          <input name="select-style" type="radio" id="recharge-style-cny" value="1" checked/>
          <label for="recharge-style-cny" class="recharge-group-radio-checked">
            <span class=""><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
            <span>网上银行</span>
          </label>
          <input name="select-style" type="radio" id="recharge-style-btc" value="2"/>
          <label for="recharge-style-btc">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
            <span>自助汇款</span>
          </label>
          <input name="select-style" type="radio" id="recharge-style-zfb" value="3"/>
          <label for="recharge-style-zfb">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
            <span>支付宝</span>
          </label>
        </div>
      </div>
    </transition>
    <transition enter-active-class="animated fadeIn">
      <div class="recharge-group" v-show="!account">
        <div class="recharge-group-title">
          <p>选择银行</p>
          <transition enter-active-class="animated fadeIn">
            <a href="javascript:;" @click="bank11=true;more=false" v-show="more">更多</a>
          </transition>
          <transition enter-active-class="animated fadeIn">
            <a href="javascript:;" @click="bank11=false;more=true" v-show="!more">收起</a>
          </transition>
        </div>
        <div class="recharge-group-radio-select-bank" v-show="bank1">
          <div v-for="(item,index) in ZCBank" class="ddddddddd">
            <input name="select-bank" type="radio" :id="'recharge-mode-cny'+index" :value="item.abbreviation"
                   :checked="index===0?'checked':''"/>
            <label :for="'recharge-mode-cny'+index" :class="index===0?'recharge-group-radio-checked':''">
              <span><span></span></span>
              <img :src='bankImgUrl[item.abbreviation]'/>
            </label>
          </div>
        </div>
        <transition enter-active-class="animated fadeIn">
          <div class="recharge-group-radio-select-bank" v-show="bank2">
            <div>
              <input name="select-bank2" type="radio" id="recharge-mode-cny20" value="ABC" checked/>
              <label for="recharge-mode-cny20" class="recharge-group-radio-checked">
                <span class=""><span></span></span>
                <img src="../../assets/img/banklogo/ABC.png"/>
                <em>尾号 1234</em>
              </label>
            </div>

            <div>
              <input name="select-bank2" type="radio" id="recharge-mode-cny21" value="CMB" checked/>
              <label for="recharge-mode-cny21">
                <span class=""><span></span></span>
                <img src="../../assets/img/banklogo/CMB.png"/>
                <em>尾号 1234</em>
              </label>
            </div>

            <div>
              <input name="select-bank2" type="radio" id="recharge-mode-cny22" value="3" checked/>
              <router-link to="/accountManagement/addBankCard" tag="label" for="recharge-mode-cny22"
                           class="add-bank-select-bank">
                <i class="iconfont">&#xe689;</i>
                <em>添加新银行卡</em>
              </router-link>
            </div>

          </div>
        </transition>
        <transition enter-active-class="animated fadeIn">
          <div class="recharge-group-radio-select-bank" v-show="bank3">
            <input name="select-bank3" type="radio" id="recharge-mode-zfb12" value="FUND"/>
            <label for="recharge-mode-zfb12" class="recharge-group-radio-checked">
              <span><span></span></span>
              <img src="../../assets/img/banklogo/FUND_IO_TYPE_1.png"/>
            </label>
          </div>
        </transition>
      </div>
    </transition>
    <transition enter-active-class="animated fadeIn">
      <div class="recharge-group" v-show="!account">
        <div class="recharge-group-title">
          <p>金额</p>
        </div>
        <div class="recharge-group-input" v-show="bank1">
          <input type="number" placeholder="请输入金额"/>
          <span>元</span>
        </div>
        <div class="recharge-group-input recharge-group-input2" v-show="bank2">
          <input type="number" placeholder="请输入金额"/>
          <span>.{{arNum}}元</span>
        </div>
        <div class="recharge-group-input" v-show="bank3">
          <input type="number" placeholder="请输入金额"/>
          <span>元</span>
        </div>
        <div style="color: red" v-show="bank2">转账时请务必包含此两位小数</div>

        <div class="ER-cord">
          <transition enter-active-class="animated fadeIn">
            <img src="../../assets/img/download/APPcode.jpg" width="150" v-show="erCord"/>
          </transition>
        </div>
        <router-link to="/recharge/rechargeList" v-show="!bank3" tag="button" class="recharge-group-button">生成汇款单






        </router-link>
        <!--<button class="recharge-group-button" v-show="!bank3">生成汇款单</button>-->
        <button class="recharge-group-button" v-show="bank3" @click="erCord=true">生成充值码</button>
      </div>
    </transition>
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
        }

      }
    },
    created() {
      this.arNum = parseInt(Math.random() * 90 + 10)//10~99
    },
    created() {
      let that = this;
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
          console.log(typeof res.data.data[0].abbreviation)
        }).catch((req) => {
          console.log(req, '请求错误')
        })
      }//获取支持银行nag
    },
    mounted() {
      let that = this;
      {
        $("input[name='select-account']").change(function () {
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
        $("input[name='select-currency']").change(function () {
          $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
          console.log($(this).val(), 'account')
        })
        $("input[name='select-currency1']").change(function () {
          $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
          console.log($(this).val(), 'account')
        })
      }//选择充值币种
      {
        $("input[name='select-style']").change(function () {
          $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
          console.log($(this).val(), 'account')
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
        }, 500)
        $("input[name='select-bank2']").change(function () {
          $(this).next().addClass('recharge-group-radio-checked').parent().siblings().find('label').removeClass('recharge-group-radio-checked');
          console.log($(this).val(), 'account')
        })
      }//选择充值银行
      {
        $('.erCord_bigBtn').hover(function () {
          $('.erCord_big').animate({opacity: 1})
        }, function () {
          $('.erCord_big').animate({opacity: 0})
        })
      }//btc充值地址二维码放大
    }
  }
</script>
<style scoped>
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


