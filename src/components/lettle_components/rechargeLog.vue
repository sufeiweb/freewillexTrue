<template>
  <div class="rechargeLog">
    <div class="recharge-group">
      <div class="recharge-group-title">
        <p>选择账户</p>
      </div>
      <div class="recharge-group-radio">
        <input name="select-account43" type="radio" id="account-cny43" value="CNY" checked/>
        <label for="account-cny43" class="recharge-group-radio-checked">
          <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
          <span class="iconFont a1"></span>
          <span>CNY账户</span>
        </label>
        <input name="select-account43" type="radio" id="account-btc43" value="BTC"/>
        <label for="account-btc43">
          <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
          <span class="iconFont a2"></span>
          <span>BTC账户</span>
        </label>
      </div>
    </div>
    <div class="recharge-group"
    >
      <div class="recharge-group-title">
        <p>选择币种</p>
      </div>
      <transition enter-active-class="animated fadeIn">
        <div class="recharge-group-radio" v-show="!account">
          <!--<input name="select-currency44" type="radio" id="recharge-currency-cny144" value="*" checked/>-->
          <!--<label for="recharge-currency-cny144" class="recharge-group-radio-checked">-->
          <!--<span class=""><span><i class="iconfont">&#xe664;</i></span></span>-->
          <!--<span class="iconFont a9"></span>-->
          <!--<span>全部</span>-->
          <!--</label>-->
          <input name="select-currency44" type="radio" id="recharge-currency-cny44" value="CNY" checked/>
          <label for="recharge-currency-cny44" class="recharge-group-radio-checked">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a1"></span>
            <span>CNY</span>
          </label>
          <input name="select-currency44" type="radio" id="recharge-currency-cny-btc44" value="BTC"/>
          <label for="recharge-currency-cny-btc44">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a2"></span>
            <span>BTC</span>
          </label>
          <input name="select-currency44" type="radio" id="recharge-currency-cny-ltc44" value="LTC"/>
          <label for="recharge-currency-cny-ltc44">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a3"></span>
            <span>LTC</span>
          </label>
          <input name="select-currency44" type="radio" id="recharge-currency-cny-eth44" value="ETH"/>
          <label for="recharge-currency-cny-eth44">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a4"></span>
            <span>ETH</span>
          </label>
          <input name="select-currency44" type="radio" id="recharge-currency-cny-etc44" value="ETC"/>
          <label for="recharge-currency-cny-etc44">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a5"></span>
            <span>ETC</span>
          </label>
        </div>
      </transition>
      <transition enter-active-class="animated fadeIn">
        <div class="recharge-group-radio" v-show="account">
          <!--<input name="select-currency45" type="radio" id="recharge-currency-cny-btc145" value="*" checked/>-->
          <!--<label for="recharge-currency-cny-btc145" class="recharge-group-radio-checked">-->
          <!--<span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>-->
          <!--<span class="iconFont a9"></span>-->
          <!--<span>全部</span>-->
          <!--</label>-->
          <input name="select-currency45" type="radio" id="recharge-currency-cny-btc45" value="BTC" checked/>
          <label for="recharge-currency-cny-btc45" class="recharge-group-radio-checked">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a2"></span>
            <span>BTC</span>
          </label>
          <input name="select-currency45" type="radio" id="recharge-currency-cny-ltc45" value="LTC"/>
          <label for="recharge-currency-cny-ltc45">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a3"></span>
            <span>LTC</span>
          </label>
          <input name="select-currency45" type="radio" id="recharge-currency-cny-eth45" value="ETH"/>
          <label for="recharge-currency-cny-eth45">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a4"></span>
            <span>ETH</span>
          </label>
          <input name="select-currency45" type="radio" id="recharge-currency-cny-etc45" value="ETC"/>
          <label for="recharge-currency-cny-etc45">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a5"></span>
            <span>ETC</span>
          </label>
        </div>
      </transition>
    </div>
    <div class="userIndex-recharge-footer">
      <div class="recharge-group-title">
        <p>充值记录</p>
      </div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="充值记录" name="first">
          <div class="recharge-record">
            <table>
              <thead>
              <tr>
                <td>充值时间</td>
                <td>充值机构</td>
                <td>充值金额 / {{legalCurrency}}</td>
                <td>实充金额 / {{legalCurrency}}</td>
                <td>状态</td>
              </tr>
              </thead>
              <tbody class="recharge-record-data getTrSelect" v-show="!noRecord">
              <tr v-for="item in items" :currency="item.currency">
                <td>{{item.createDate | dateYMDHIS}}</td>
                <td>{{'银行卡'}}</td>
                <td>{{item.applyBalance | return_}}</td>
                <td>{{item.balance | return_}}</td>
                <td>{{item.flag | translate}}</td>
              </tr>
              </tbody>
              <tbody class="recharge-record-data noRecode" v-show="noRecord">
              <tr>
                <td colspan="5">
                  <i class="iconfont">&#xe661;</i>
                  <span>暂无记录</span>
                </td>
              </tr>
              </tbody>
              <tfoot class="recharge-record-data-page">
              <tr>
                <td colspan="5">
                  <el-pagination layout="prev, pager, next"
                                 @current-change="handleCurrentChangeRechargeLog"
                                 :current-page="currentPage"
                                 :total="totals"
                                 class="page-right"
                  ></el-pagination>
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
        activeName: 'first',
        noRecord: true,
        account: false,
        currentPage: 1,
        totals: 0,
        items: [],
        currency: 'CNY',//默认账户币种CNY
        legalCurrency: 'CNY',//默认什么都没有，就是全部

      }
    },
    mounted() {
      let that = this;
      {
        $("input[name='select-account43']").change(function () {
          $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
          that.currency = $(this).val();
          if ($(this).val() === 'CNY') {
            that.account = false;
          }
          else {
            that.legalCurrency = 'BTC';
            that.account = true;
          }
        })
      }//选择账户
      {
        $("input[name='select-currency44']").change(function () {
          $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
          that.legalCurrency = $(this).val();
        })
        $("input[name='select-currency45']").change(function () {
          $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
          that.legalCurrency = $(this).val();
        })
      }//选择充值币
      this.getRechargeLog(1)
    },
    methods: {
      handleCurrentChangeRechargeLog(currentPage){
        if (this.legalCurrency === "CNY") {
          this.getRechargeLog(currentPage);
        } else {
          this.getRechargeLog1(currentPage);
        }

      },
      getRechargeLog(currentPage) {
        this.$http({
          url: 'http://192.168.1.48:8089/fwex/web/capital/payments/list',
          method: 'POST',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Authorization': 'Bearer ' + this.$store.state.token,
            "Content-Type": "application/json;charset=UTF-8",
          },
          data: {
            pageNo: currentPage - 1,
            pageSize: 10,
            param: {
              currency: this.currency,
              legalCurrency: this.legalCurrency
            }
          }
        }).then((res) => {
          this.showError(res.data.code, res.data.message);
          if (res.data.code === 200) {
            if (res.data.data.totalElements) {
              this.noRecord = false;
            } else {
              this.noRecord = true;
            }
            this.totals = res.data.data.totalElements;
            this.items = res.data.data.content
          }

        }).catch((req) => {
          this.showError(req.state, req.message)
        })
      },
      getRechargeLog1(currentPage) {
        this.$http({
          url: 'http://192.168.1.48:8089/fwex/web/digital/payments/list',
          method: 'POST',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Authorization': 'Bearer ' + this.$store.state.token,
            "Content-Type": "application/json;charset=UTF-8",
          },
          data: {
            pageNo: currentPage - 1,
            pageSize: 10,
            param: {
              currency: this.currency,
              legalCurrency: this.legalCurrency
            }
          }
        }).then((res) => {
          this.showError(res.data.code, res.data.message);
          if (res.data.code === 200) {
            this.noRecord = !res.data.data.totalElements > 0;
            this.totals = res.data.data.totalElements ? res.data.data.totalElements : 10;
            this.items = res.data.data.content
          }
        }).catch((req) => {
          this.showError(req.state, req.message)
        })
      }
    },
    watch: {
      currency(newValue, oldValue){
        if (newValue === 'CNY') {
          this.getRechargeLog(1)
        } else {
          this.getRechargeLog1(1)
        }

      },
      legalCurrency(newValue, oldValue){
        if (newValue === 'CNY') {
          this.getRechargeLog(1)
        } else {
          this.getRechargeLog1(1)
        }
      }
    }
  }
</script>
<style scoped>
  .rechargeLog {
    font-size: 1.167rem;
  }

  .iconFont {
    width: 22px;
    height: 22px;
    margin: .5rem;

  }

  .recharge-group-radio-checked .a1, .recharge-group-radio-checked .a2, .recharge-group-radio-checked .a3, .recharge-group-radio-checked .a4, .recharge-group-radio-checked .a5, .recharge-group-radio-checked .a9 {
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

  .a9 {
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

  .recharge-group-radio-select-bank .recharge-group-radio-checked > span {
    background: #01aaef;
    border: none !important;
  }

  .userIndex-recharge-footer-title {

  }

  .el-tabs__header {
    margin-bottom: 0 !important;
  }

  .recharge-record {
    padding: 0.833rem;
    border: 1px solid #d1dbe5;
    border-top: none;
    padding-top: 3rem;
  }

  .recharge-record table {
    width: 100%;
    border: 1px solid #d1dbe5;
    border-spacing: 0;
    border-collapse: collapse;
  }

  .recharge-record table td {
    width: 12.667rem;
    padding: 0.883rem;
    text-align: left;
  }

  .recharge-record table td:nth-of-type(1) {
    width: 24.25rem
  }

  .recharge-record table td:nth-of-type(2) {
    width: 13rem
  }

  .recharge-record table td:nth-of-type(3) {
    width: 14.083rem
  }

  .recharge-record table td:nth-of-type(4) {
    width: 14.167rem;
  }

  .recharge-record table td:nth-of-type(5) {
    width: 10rem;
  }

  .recharge-record thead {
    border: 1px solid #d1dbe5;
  }

  .recharge-record-data {
    border: 1px solid #d1dbe5;
    background: #f7f7f7;
  }

  .noRecode td {
    padding: 6.667rem !important;
    text-align: center !important;
  }

  .noRecode td i {
    font-size: 3rem;
  }

  .noRecode td i, .noRecode td span {
    display: inline !important;

  }

  .recharge-record-data-page td {
    padding-top: 1.5rem;
    text-align: right !important;
  }

</style>
