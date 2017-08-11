<template>
  <div class="rechargeLog">
    <div class="recharge-group">
      <div class="recharge-group-title">
        <p>选择账户</p>
      </div>
      <div class="recharge-group-radio">
        <input name="select-account434" type="radio" id="account-cny434" value="1" checked/>
        <label for="account-cny434" class="recharge-group-radio-checked">
          <span class=""><span><i class="iconfont">&#xe664;</i></span></span>
          <span class="iconFont a1"></span>
          <span>CNY账户</span>
        </label>
        <input name="select-account434" type="radio" id="account-btc434" value="2"/>
        <label for="account-btc434">
          <span><span><i class="iconfont">&#xe664;</i></span></span>
          <span class="iconFont a2"></span>
          <span>BTC账户</span>
        </label>
      </div>
    </div>
    <div class="recharge-group">
      <div class="recharge-group-title">
        <p>选择币种</p>
      </div>
      <transition enter-active-class="animated fadeIn">
        <div class="recharge-group-radio" v-show="!account">
          <input name="select-currency444" type="radio" id="recharge-currency-cny1444" value="0" checked/>
          <label for="recharge-currency-cny1444" class="recharge-group-radio-checked">
            <span class=""><span><i class="iconfont">&#xe664;</i></span></span>
            <span class="iconFont a9"></span>
            <span>全部</span>
          </label>
          <input name="select-currency444" type="radio" id="recharge-currency-cny444" value="1"/>
          <label for="recharge-currency-cny444">
            <span class=""><span><i class="iconfont">&#xe664;</i></span></span>
            <span class="iconFont a1"></span>
            <span>CNY</span>
          </label>
          <input name="select-currency444" type="radio" id="recharge-currency-cny-btc444" value="2"/>
          <label for="recharge-currency-cny-btc444">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <span class="iconFont a2"></span>
            <span>BTC</span>
          </label>
          <input name="select-currency444" type="radio" id="recharge-currency-cny-ltc444" value="3"/>
          <label for="recharge-currency-cny-ltc444">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <span class="iconFont a3"></span>
            <span>LTC</span>
          </label>
          <input name="select-currency444" type="radio" id="recharge-currency-cny-eth444" value="4"/>
          <label for="recharge-currency-cny-eth444">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <span class="iconFont a4"></span>
            <span>ETH</span>
          </label>
          <input name="select-currency444" type="radio" id="recharge-currency-cny-etc444" value="5"/>
          <label for="recharge-currency-cny-etc444">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <span class="iconFont a5"></span>
            <span>ETC</span>
          </label>
        </div>
      </transition>
      <transition enter-active-class="animated fadeIn">
        <div class="recharge-group-radio" v-show="account">
          <input name="select-currency454" type="radio" id="recharge-currency-cny-btc1454" value="0"/>
          <label for="recharge-currency-cny-btc1454" class="recharge-group-radio-checked">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
            <span>全部</span>
          </label>
          <input name="select-currency454" type="radio" id="recharge-currency-cny-btc454" value="1"/>
          <label for="recharge-currency-cny-btc454">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
            <span>BTC</span>
          </label>
          <input name="select-currency454" type="radio" id="recharge-currency-cny-ltc454" value="2"/>
          <label for="recharge-currency-cny-ltc454">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
            <span>LTC</span>
          </label>
          <input name="select-currency454" type="radio" id="recharge-currency-cny-eth454" value="3"/>
          <label for="recharge-currency-cny-eth454">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
            <span>ETH</span>
          </label>
          <input name="select-currency454" type="radio" id="recharge-currency-cny-etc454" value="4"/>
          <label for="recharge-currency-cny-etc454">
            <span><span><i class="iconfont">&#xe664;</i></span></span>
            <i class="iconfont">&#xe650;</i>
            <span>ETC</span>
          </label>
        </div>
      </transition>
    </div>
    <div class="cash-record">
      <div class="cash-group-title">
        <p>提现记录</p>
      </div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="提现记录" name="first">
          <div class="user-table1">
            <table>
              <thead class="user-table-thead">
              <tr>
                <td>提现时间</td>
                <td>提现账户</td>
                <td>提现金额</td>
                <td>手续费</td>
                <td>状态</td>
              </tr>
              </thead>
              <tbody class="user-table-tbody" v-show="noData">
              <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
              </tr>
              </tbody>
              <tbody class="user-table-tbody de-body" v-show="!noData">
              <tr>
                <td colspan="5">
                  <i class="iconfont">&#xe661;</i>
                  <span>暂无记录</span>
                </td>
              </tr>
              </tbody>
              <tfoot class="user-table-footer-page">
              <tr>
                <td colspan="5">
                  <el-pagination layout="prev, pager, next" :total="10" class="page-right"></el-pagination>
                </td>
              </tr>
              </tfoot>
            </table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
</div>

</template>
<script>
  export default {
      data() {
          return {
            activeName:'first',
            noData:false,
            account:false
          }
      },
    mounted() {
          let that=this;
      {
        $("input[name='select-account434']").change(function () {
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
        $("input[name='select-currency444']").change(function () {
          $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
          console.log($(this).val(), 'account')
        })
        $("input[name='select-currency454']").change(function () {
          $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
          console.log($(this).val(), 'account')
        })
      }//选择充值币种
    }
  }
</script>
<style scoped>
  .rechargeLog {
    font-size: 1.167rem;
  }
  .iconFont{
    width: 22px;
    height: 22px;
    margin: .5rem;

  }
  .recharge-group-radio-checked .a1,.recharge-group-radio-checked .a2, .recharge-group-radio-checked .a3, .recharge-group-radio-checked .a4, .recharge-group-radio-checked .a5,.recharge-group-radio-checked .a9{
    background-position: 0;
  }
  .a1{
    background: url("../../assets/img/iconPng/CNYzhanghu.png");
    background-position: -22px;

  }
  .a2{
    background: url("../../assets/img/iconPng/BTCzhanghu.png");
    background-position: -22px;
  }
  .a3{
    background: url("../../assets/img/iconPng/LTC.png");
    background-position: -22px;
  }
  .a4{
    background: url("../../assets/img/iconPng/ETH.png");
    background-position: -22px;
  }
  .a5{
    background: url("../../assets/img/iconPng/ETC.png");
    background-position: -22px;
  }
  .a9{
    background: url("../../assets/img/iconPng/all.png");
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

  .recharge-group-radio{
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

  .recharge-group-radio-select-bank .recharge-group-radio-checked > span {
    background: #01aaef;
    border: none !important;
  }
  .cash-group-title{
    padding: 1.5rem 0;
    border-bottom: 1px solid #ddd;
    font-size: 1.333rem;
    margin-bottom: 2rem;
  }
  .el-tabs__header {
    margin-bottom: 0;
  }

  .user-table1 {
    border: 1px solid #d1dbe5;
    border-top: none;
    padding: 0.833rem;
    font-size: 1.167rem;
  }

  .user-table1 table{
    border: 1px solid #d1dbe5;
    border-spacing: 0;
    border-collapse: collapse;
  }

  .user-table1 table td{
    padding: 0.667rem;
  }

  .user-table-thead {
    border: 1px solid #d1dbe5;
  }

  .user-table-tbody {
    border: 1px solid #d1dbe5;
    background: #f7f7f7;
  }

  .de-body td {
    padding: 6.667rem !important;
    text-align: center !important;
  }

  .de-body td i {
    font-size: 3rem;
  }

  .de-body td i, .de-body td span {
    display: inline !important;

  }

  .user-table-footer-page td {
    padding-top: 1.5rem;
    text-align: right !important;
  }

  .user-table1 table td:nth-of-type(1) {
    width: 25rem;
  }

  .user-table1 table td:nth-of-type(2) {
    width: 13.333rem;
  }

  .user-table1 table td:nth-of-type(3) {
    width: 13.333rem;
  }

  .user-table1 table td:nth-of-type(4) {
    width: 10.833rem;
  }

  .user-table1 table td:nth-of-type(5) {
    width: 10.333rem;
  }

</style>
