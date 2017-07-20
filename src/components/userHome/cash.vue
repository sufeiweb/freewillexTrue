<template>
  <div class="cash">
    <div class="userIndex-cash-header">
      <div class="header-nav">
        <a href="javascript:" class="header-nav-active" @click="cash_style1()">人名币提现</a>
        <a href="javascript:" @click="cash_style2()">比特币提现</a>
      </div>
    </div>
    <div class="cash-CNY" v-show="cash_style">
      <div class="from-box">
        <div>
          <span>提现银行</span>
          <p class="display-flex-p">
            <a href="javascript:"><img src="../../assets/img/banklogo/CMB.png"/><span class="bank-tishi">尾号：1221</span><i
              class="el-icon-caret-bottom bank-tishi"></i></a>
            <a href="javascript:">+ 添加银行卡</a>
          </p>
        </div>
        <div>
          <span>提现金额</span>
          <p>
            <input type="number" :placeholder="'本次最多可提现金额'+user_num+'CNY'" v-model="cash_num_CNY"/>
            <span class="cash-tishi display-none-tishi">最小提现金额为100</span>
          </p>
          <p class="display-flex-p"><span>手续费:</span><span class="cash-tishi">￥{{2.00}}</span></p>
        </div>
        <div>
          <span>资金密码</span>
          <p>
            <input type="password"/>
            <span class="cash-tishi display-none-tishi">资金密码格式输入错误</span>
          </p>
        </div>
        <div>
          <span>验证方式</span>
          <p class="display-flex-p">
            <span>
              <input name="yanzheng" type="radio" id="yanzheng1" checked/>
              <label for="yanzheng1">邮箱验证</label>
            </span>
            <span>
              <input name="yanzheng" type="radio" id="yanzheng2"/>
              <label for="yanzheng2">短信验证</label>
            </span>
          </p>
        </div>
        <div>
          <span>验证码</span>
          <p>
            <span>
              <input type="text" placeholder="验证码"/>
              <button>获取验证码</button>
            </span>
            <span class="cash-tishi display-none-tishi">验证码格式输入错误</span>
          </p>
        </div>
        <div>
          <span>&nbsp;</span>
          <p>
            <button>提交</button>
            <button>取消</button>
          </p>
        </div>
        <dottedLine></dottedLine>
        <div class="cash-record">
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
            <el-tab-pane label="发票申请记录" name="second">
              <div class="user-table2">
                <table>
                  <thead class="user-table-thead">
                  <tr>
                    <td>申请时间</td>
                    <td>发票类型</td>
                    <td>发票金额</td>
                    <td>联系电话</td>
                  </tr>
                  </thead>
                  <tbody class="user-table-tbody" v-show="noData">
                  <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                  </tr>
                  </tbody>
                  <tbody class="user-table-tbody de-body" v-show="!noData">
                  <tr>
                    <td colspan="4">
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
    </div>
    <div class="cash-BTC" v-show="!cash_style">

    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  import dottedLine from '../lettle_components/dottedLine.vue';
  export default {
    data() {
      return {
        cash_style: true,
        cash_num_CNY: '',
        user_num: 1231.2,
        noData: false,
        activeName: 'first'
      }
    },
    components: {
      dottedLine
    },
    mounted() {
      {
        $('.header-nav a').click(function () {
          $(this).addClass('header-nav-active').siblings().removeClass('header-nav-active');
        });
      }

    },
    methods: {
      cash_style1() {
        this.cash_style = true;
      },
      cash_style2() {
        this.cash_style = false;
      },
    },
  }
</script>
<style scoped>
  .userIndex-cash-header {
    width: 99%;
    border-bottom: 1px solid #eee;
    margin-bottom: 0.833rem;
  }

  .header-nav {
    display: flex;
  }

  .header-nav a {
    font-size: 1.333rem;
    padding: 0.667rem 0 1.25rem 0;
    margin-right: 2.083rem;
    border-bottom: 2px solid #fff;
  }

  .header-nav a:hover {
    border-bottom: 2px solid #01aaef;
  }

  .header-nav .header-nav-active {
    border-bottom-color: #337ab7 !important;
  }

  .from-box {
    padding: 4rem 0;
  }

  .from-box > div {
    display: flex;
    align-items: center;
    margin-bottom: 2.25rem;
  }

  .from-box > div > span {
    width: 28%;
    text-align: right;
    margin-right: 4rem;
    font-size: 1.167rem;
  }

  .from-box > div:nth-of-type(1) > p > a {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #01aaef;
    border: 1px solid #01aaef;
    width: 11.667rem;
    height: 4rem;
    margin-right: 2rem;
  }

  .from-box > div:nth-of-type(1) > p > a:nth-of-type(1) {
    position: relative;
  }

  .from-box > div:nth-of-type(1) > p > a:nth-of-type(1) > span {
    position: absolute;
    color: #333;
    top: -3rem;
    left: 0;
    border: 1px solid #01aaef;
    padding: .2rem .3rem;
  }

  .from-box > div:nth-of-type(1) > p > a:nth-of-type(1) > i {
    position: absolute;
    color: #01aaef;
    top: -1.23rem;
    left: 20%
  }

  .from-box > div:nth-of-type(1) > p > a:nth-of-type(2) {
    border-color: #ddd;
  }

  .from-box > div:nth-of-type(1) > p > a:hover {
    border-color: #01aaef;
  }

  .from-box > div:nth-of-type(2) > p:nth-of-type(1), .from-box > div:nth-of-type(3) > p, .from-box > div:nth-of-type(5) > p {
    width: 30rem;
    height: 5rem;
    margin-bottom: -1.5rem;
  }

  .from-box > div:nth-of-type(2) > p > input, .from-box > div:nth-of-type(3) > p > input {
    width: 90%;
    padding: 0.667rem 1rem;
  }

  .from-box > div:nth-of-type(4) > p > span {
    margin-right: 2rem;
    font-size: 1.167rem;
    align-items: center;
  }

  .from-box > div:nth-of-type(4) > p > span label {
    margin-left: .5rem;
  }

  .from-box > div:nth-of-type(5) > p > span:nth-of-type(1) {
    height: 3.167rem;
    border: 1px solid #aaa;
    width: 97.2%;
  }

  .from-box > div:nth-of-type(5) > p > span > input {
    width: 71%;
    outline: none;
    border: none;
    padding-left: 1rem;
  }

  .from-box > div:nth-of-type(5) > p > span > button {
    width: 26%;
    border: none;
    height: 100%;
    outline: none;
    cursor: pointer;
    color: #fff;
    background: #01aaef;
  }

  .from-box > div:nth-of-type(6) > p > button {
    width: 10rem;
    padding: 0.75rem 1.167rem;
    font-size: 1.167rem;
    border: none;
    cursor: pointer;
  }

  .from-box > div:nth-of-type(6) > p > button:nth-of-type(1) {
    background: #01aaef;
    margin-right: 2rem;
    color: #fff
  }

  .from-box > div:nth-of-type(6) > p > button:nth-of-type(2) {
    color: #333333;
    background: #E5E5E5;
  }

  .from-box > div:nth-of-type(6) > p > button:nth-of-type(1):hover {
    background: #0186bc;
  }

  .from-box > div:nth-of-type(6) > p > button:nth-of-type(2):hover {
    background: #cccccc;
  }

  .from-box > div > p > span {
    display: flex;
    align-items: center;
  }

  .cash-tishi {
    color: red !important;
  }

  .display-flex-p {
    display: flex;
    align-items: center;
  }

  .bank-tishi {
    display: none;
  }

  .display-none-tishi {
    display: none !important;
  }

  .el-tabs__header {
    margin-bottom: 0;
  }

  .user-table1,.user-table2 {
    border: 1px solid #d1dbe5;
    border-top: none;
    padding: 0.833rem;
    font-size: 1.167rem;
  }

  .user-table1 table,.user-table2 table{
    border: 1px solid #d1dbe5;
    border-spacing: 0;
    border-collapse: collapse;
  }

  .user-table1 table td,.user-table2 table td{
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
  .user-table2 table td{
    width: 18.33rem;
  }

</style>
