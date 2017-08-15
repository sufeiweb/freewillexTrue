<template>
  <div class="rechargeLog">
    <div class="recharge-group">
      <div class="recharge-group-title">
        <p>选择账户</p>
      </div>
      <div class="recharge-group-radio">
        <input name="select-account434" type="radio" id="account-cny434" value="CNY" checked/>
        <label for="account-cny434" class="recharge-group-radio-checked">
         <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
          <span class="iconFont a1"></span>
          <span>CNY账户</span>
        </label>
        <input name="select-account434" type="radio" id="account-btc434" value="BTC"/>
        <label for="account-btc434">
          <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
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
          <!--<input name="select-currency444" type="radio" id="recharge-currency-cny1444" value="0" checked/>-->
          <!--<label for="recharge-currency-cny1444" class="recharge-group-radio-checked">-->
          <!--<span class=""><span><i class="iconfont">&#xe664;</i></span></span>-->
          <!--<span class="iconFont a9"></span>-->
          <!--<span>全部</span>-->
          <!--</label>-->
          <input name="select-currency444" type="radio" id="recharge-currency-cny444" value="CNY" checked/>
          <label for="recharge-currency-cny444" class="recharge-group-radio-checked">
           <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a1"></span>
            <span>CNY</span>
          </label>
          <input name="select-currency444" type="radio" id="recharge-currency-cny-btc444" value="BTC"/>
          <label for="recharge-currency-cny-btc444">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a2"></span>
            <span>BTC</span>
          </label>
          <input name="select-currency444" type="radio" id="recharge-currency-cny-ltc444" value="LTC"/>
          <label for="recharge-currency-cny-ltc444">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a3"></span>
            <span>LTC</span>
          </label>
          <input name="select-currency444" type="radio" id="recharge-currency-cny-eth444" value="ETH"/>
          <label for="recharge-currency-cny-eth444">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a4"></span>
            <span>ETH</span>
          </label>
          <input name="select-currency444" type="radio" id="recharge-currency-cny-etc444" value="ETC"/>
          <label for="recharge-currency-cny-etc444">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a5"></span>
            <span>ETC</span>
          </label>
        </div>
      </transition>
      <transition enter-active-class="animated fadeIn">
        <div class="recharge-group-radio" v-show="account">
          <!--<input name="select-currency454" type="radio" id="recharge-currency-cny-btc1454" value="0"/>-->
          <!--<label for="recharge-currency-cny-btc1454" class="recharge-group-radio-checked">-->
          <!--<span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>-->
          <!--<i class="iconfont">&#xe650;</i>-->
          <!--<span>全部</span>-->
          <!--</label>-->
          <input name="select-currency454" type="radio" id="recharge-currency-cny-btc454" value="BTC" checked/>
          <label for="recharge-currency-cny-btc454" class="recharge-group-radio-checked">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a2"></span>
            <span>BTC</span>
          </label>
          <input name="select-currency454" type="radio" id="recharge-currency-cny-ltc454" value="LTC"/>
          <label for="recharge-currency-cny-ltc454">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a3"></span>
            <span>LTC</span>
          </label>
          <input name="select-currency454" type="radio" id="recharge-currency-cny-eth454" value="ETH"/>
          <label for="recharge-currency-cny-eth454">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a4"></span>
            <span>ETH</span>
          </label>
          <input name="select-currency454" type="radio" id="recharge-currency-cny-etc454" value="ETC"/>
          <label for="recharge-currency-cny-etc454">
            <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
            <span class="iconFont a5"></span>
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
                <td>提现金额 / {{Currency}}</td>
                <td>手续费 / {{Currency}}</td>
                <td>状态</td>
              </tr>
              </thead>
              <tbody class="user-table-tbody" v-show="noData">
              <tr v-for="item in items">
                <td>{{item.createDate|dateYMDHIS}}</td>
                <td>{{Account}}</td>
                <td>{{item.amount?item.amount:item.applyBalance}}</td>
                <td>{{item.fee}}</td>
                <td>{{item.step}}</td>
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
                  <el-pagination
                    layout="prev, pager, next"
                    :total="totalNum"
                    @current-change="handleCurrentChangeCashLog"
                    :current-page="currentPage"
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
        noData: false,
        account: false,
        Account: '',//当前账户
        Currency: '',//当前币种
        totalNum:10,//总条数
        items:[],//数组
        currentPage:1,//默认页
      }
    },
    mounted() {
      let that = this;
      {
        $("input[name='select-account434']").change(function () {
          $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
          if ($(this).val() === 'CNY') {
            that.account = false;
          }
          else {
            that.account = true;
          }
          that.getCashLog(1);
        })
      }//选择账户
      {
        $("input[name='select-currency444']").change(function () {
          $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
          that.getCashLog(1);
        })
        $("input[name='select-currency454']").change(function () {
          $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
          that.getCashLog(1);
        })
      }//选择充值币种
      this.getCashLog(1);
    },
    methods: {
      //获取提现记录
      getCashLog(currentPage){
        this.getAccount();
        let url;
        if (this.Currency === 'CNY') {
          url = 'http://192.168.1.48:8089/fwex/web/capital/withdraw/list'
        } else {
          url = 'http://192.168.1.48:8089/fwex/web/digital/withdraw/list'
        }
        this.$http({
          url: url,
          method:'POST',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Authorization': 'Bearer ' + this.$store.state.token,
            "Content-Type": "application/json;charset=UTF-8",
          },
          data:{
            pageNo:currentPage-1,
            pageSize:10,
            param:{

              currency:this.Currency
            }
          }
        }).then((res)=>{
            if(res.data.code===200){
                this.noData=res.data.data.totalElements>0;
                this.totalNum=res.data.data.totalElements?res.data.data.totalElements:10;
                this.items=res.data.data.content;
                console.log(res.data.data);
            }
        }).catch((req)=>{
            console.log(req,'请求失败')
        })
      },
      //获取当前账户
      // 获取当前币种
      getAccount(){
        this.Account = $("input[name='select-account434']:checked").val();
        if (this.Account === 'CNY') {
          this.Currency = $("input[name='select-currency444']:checked").val();
        } else if (this.Account === 'BTC') {
          this.Currency = $("input[name='select-currency454']:checked").val();
        }
        ;
        console.log(this.Account);
        console.log(this.Currency);
      },
      //换页
      handleCurrentChangeCashLog(currentPage){
        this.getCashLog(currentPage);
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

  .cash-group-title {
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

  .user-table1 table {
    border: 1px solid #d1dbe5;
    border-spacing: 0;
    border-collapse: collapse;
  }

  .user-table1 table td {
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
