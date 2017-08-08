<template>
  <div class="accountManagement">
    <div class="recharge-group">
      <div class="recharge-group-title">
        <p>选择账户</p>
      </div>
      <div class="recharge-group-radio">
        <input name="select-account-cash123" type="radio" id="account-cny-cash123" value="1" checked/>
        <label for="account-cny-cash123" class="recharge-group-radio-checked">
          <span class=""><span><i class="iconfont">&#xe664;</i></span></span>
          <i class="iconfont">&#xe650;</i>
          <span>CNY账户</span>
        </label>
        <input name="select-account-cash123" type="radio" id="account-btc-cash124" value="2"/>
        <label for="account-btc-cash124">
          <span><span><i class="iconfont">&#xe664;</i></span></span>
          <i class="iconfont">&#xe650;</i>
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
          <input name="select-currency-cash1231" type="radio" id="recharge-currency-cny-cash1231" value="1" checked/>
          <label for="recharge-currency-cny-cash1231" class="recharge-group-radio-checked">
            <span class=""><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
            <span>CNY</span>
          </label>
          <input name="select-currency-cash1231" type="radio" id="recharge-currency-cny-btc-cash1232" value="2"/>
          <label for="recharge-currency-cny-btc-cash1232">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
            <span>BTC</span>
          </label>
          <input name="select-currency-cash1231" type="radio" id="recharge-currency-cny-ltc-cash1233" value="3"/>
          <label for="recharge-currency-cny-ltc-cash1233">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
            <span>LTC</span>
          </label>
          <input name="select-currency-cash1231" type="radio" id="recharge-currency-cny-eth-cash1234" value="4"/>
          <label for="recharge-currency-cny-eth-cash1234">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
            <span>ETH</span>
          </label>
          <input name="select-currency-cash1231" type="radio" id="recharge-currency-cny-etc-cash1235" value="5"/>
          <label for="recharge-currency-cny-etc-cash1235">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
            <span>ETC</span>
          </label>
        </div>
      </transition>
      <transition enter-active-class="animated fadeIn">
        <div class="recharge-group-radio" v-show="account">
          <input name="select-currency1-cash1232" type="radio" id="recharge-currency-cny-btc1-cash12324" value="1"/>
          <label for="recharge-currency-cny-btc1-cash12324" class="recharge-group-radio-checked">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
            <span>BTC</span>
          </label>
          <input name="select-currency1-cash1232" type="radio" id="recharge-currency-cny-ltc1-cash12323" value="2"/>
          <label for="recharge-currency-cny-ltc1-cash12323">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
            <span>LTC</span>
          </label>
          <input name="select-currency1-cash1232" type="radio" id="recharge-currency-cny-eth1-cash12322" value="3"/>
          <label for="recharge-currency-cny-eth1-cash12322">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
            <span>ETH</span>
          </label>
          <input name="select-currency1-cash1232" type="radio" id="recharge-currency-cny-etc1-cash12321" value="4"/>
          <label for="recharge-currency-cny-etc1-cash12321">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
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
        {{getBindBankCard}}

        <div class="backItem" v-for="item in items">
          <div class="imgLogo"><img :src="bankImgUrl[item.abbreviation]" alt=""/><span>储蓄卡</span></div>
          <p>{{item.accountNo | bankNo}}</p>
          <a href="javascript:;" @click="delBankCard($event)" :bankid="item.bankId">删除该卡</a>
        </div>
        <router-link to="/accountManagement/addBankCard" tag="div" class="backItem addBankCard">
          <i class="iconfont">&#xe689;</i>
          <span>添加新银行卡</span>
        </router-link>
      </div>
      <div class="btcAdr" v-show="moneyStyle">
        <div class="adrItem">
          <p>QWERTYUIOP987654321ASDFVGbhgfdsaER</p>
          <p><span>[比特币地址1]</span><a href="javascript:;" @click="delAdr()">删除该地址</a></p>
        </div>
        <router-link to="/accountManagement/addBTCAdr" tag="div" class="adrItem addBankCard">
          <i class="iconfont">&#xe689;</i>
          <span>添加新银行卡</span>
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
        items: [],
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
      }
    },
    mounted (){
      let that = this;
      {
        $("input[name='select-account-cash123']").change(function () {
          $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
          console.log($(this).val(), 'account');
          if ($(this).val() == '1') {
            that.account = false;
            that.moneyStyle = false;
            if ($("input[name='select-currency-cash']:checked").val() == '1') {
              that.moneyStyle = false;
            } else {
              that.moneyStyle = true;
            }
          }
          else {
            that.account = true;
            that.moneyStyle = true;
          }
        })
      }//选择账户
      {
        $("input[name='select-currency-cash1231']").change(function () {
          $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
          console.log($(this).val(), 'account');
          if ($(this).val() == '1') {
            that.moneyStyle = false;
          } else {
            that.moneyStyle = true;
          }
        })
        $("input[name='select-currency1-cash1232']").change(function () {
          $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
          console.log($(this).val(), 'account')
        })
      }//选择提现币种
    },
    methods: {
      delBankCard(ev){
        console.log(ev.target.getAttribute('bankid'));
        let url = 'http://192.168.1.48:8089/fwex/web/accountBank/cancel/' + ev.target.getAttribute('bankid');
        this.$http({
          url: url,
          method:'GET',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + this.$store.state.token
          }
        }).then((res)=>{
            console.log(res,'请求成功')
          if(res.data.code ===200){
                console.log(res.data.message)
          }
        })
      },//删除银行卡
      delAdr(){

      }//删除数字货币地址
    },
    computed: {
      getBindBankCard(){
        let that = this;
        this.$http({
          url: 'http://192.168.1.48:8089/fwex/web/accountBank/all',
          method: 'GET',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + this.$store.state.token
          }
        }).then((res) => {
          console.log(res, '请求成功');
          if (res.data.code === 200) {
            that.items = res.data.data;
          }
        }).catch((req) => {
          console.log(req, '请求失败')
        });
      },//获取绑定银行卡
      getBindMoneyAdr(){

      }//获取绑定数字货币地址
    }
  }
</script>
<style scoped>
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
    width: 24.5rem;
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
