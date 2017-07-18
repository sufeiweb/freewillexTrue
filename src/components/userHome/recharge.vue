<template>
  <div class="userIndex-recharge">
    <div class="userIndex-recharge-header">
      <div class="header-nav">
        <a href="javascript:" class="header-nav-active" @click="recharge_style1()">人名币充值</a>
        <a href="javascript:" @click="recharge_style2()">比特币充值</a>
      </div>
    </div>
    <div class="userIndex-recharge-center" v-show="recharge_style">
      <div class="recharge-center-header">
        <section>
          <span>充值方式</span>
          <select>
            <option>银行卡</option>
          </select>
          <span class="add-bank"><a href="javascript:">添加银行卡</a></span>
        </section>
        <section>
          <span>充值帐号</span>
          <select>
            <option>请选择充值账号</option>
            <option selected>招商银行 ****123</option>
          </select>
        </section>
        <section>
          <span>充值金额</span>
          <div class="margin-bottom-12">
            <div class="recharge-input-box">
              <input placeholder="充值金额"/>
              <span>.{{recharge_input}}</span>
            </div>
            <span class="show-text">充值金额不能为空</span>
          </div>
          <span class="recharge-input-text">转账时请务必包含此两位小数</span>
        </section>
        <div class="recharge-submit">
          <a href="javascript:">生成汇款单</a>
        </div>
      </div>
    </div>
    <div class="userIndex-recharge-center" v-show="!recharge_style">
      <div class="recharge-center-header">
        <section>
          <span>充值地址</span>
          <div class="background-eee">
            <div class="recharge-input-box">
              <input v-model="recharge_address" disabled="true"/>
              <span><a href="javascript:"><i class="iconfont" @click="ER_show_hide()">&#xe635;</i></a>
                <i class="el-icon-arrow-up recharge-address-ER"></i>
                <img src="../../assets/img/download/APPcode.jpg" class="recharge-address-ER"/>
              </span>
            </div>
          </div>
        </section>
        <section class="recharge-center-footer-text">
        提示： 您充值比特币上述地址后，需要整个比特币网络节点的确认，为了快速到账，您可以向比特币网络支付少量的手续费。到账时间一般是10分钟-60分钟之间。最小充值金额是：0.0001BTC， 您的比特币地址不会经常改变，可以重复充值；如有更改，我们会尽量通过网站公告或邮件通知您。
      </section>
      </div>
    </div>
    <dottedLine></dottedLine>
    <div class="userIndex-recharge-footer">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="充值记录" name="first">
           <div class="recharge-record">
             <table>
               <thead>
                <tr>
                  <td>充值时间</td>
                  <td>充值机构</td>
                  <td>充值金额</td>
                  <td>实充金额</td>
                  <td>状态</td>
                </tr>
               </thead>
               <tbody class="recharge-record-data" v-show="!noRecord">
                  <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
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
  import $ from 'jquery';
  import dottedLine from '../lettle_components/dottedLine.vue';
  export default {
    data() {
      return {
        recharge_input: '',
        activeName: 'first',
        noRecord: true,
        recharge_address: 'weqweqweqweqweqw',
        recharge_style: true
      }
    },
    components: {
      dottedLine
    },
    created() {
      {
        this.recharge_input = parseInt(Math.random() * 90) + 10;
    }
    },
    mounted() {
      $('.header-nav a').click(function () {
        $(this).addClass('header-nav-active').siblings().removeClass('header-nav-active');
      });
    },
    methods: {
      recharge_style1() {
          this.recharge_style = true;
      },
      recharge_style2() {
        this.recharge_style = false;
      },
      ER_show_hide() {
          $('.recharge-address-ER').toggle();
      }
    }
  }
</script>
<style scoped>
  .userIndex-recharge-header {
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

  .userIndex-recharge-center {
    padding: 1rem;
  }

  .userIndex-recharge-center section {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 3rem;
    font-size: 1.167rem;
  }

  .userIndex-recharge-center section > span {
    margin: 0 1rem;
  }

  .userIndex-recharge-center section > span:nth-of-type(1) {
    width: 20rem;
    text-align: right;
  }

  .userIndex-recharge-center section select, .userIndex-recharge-center section input {
    height: 3.1667rem;
    padding: 0.667rem 1rem;
    font-size: 1.167rem;
    width: 30.8rem;
    font-weight: normal;
    color: #333;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    box-shadow: none;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  }

  .recharge-input-box {
    display: flex;
    align-items: center;
  }

  section .recharge-input-box input {
    width: 25rem;
    padding: 0 1.4rem !important;
  }

  section .recharge-input-box > span {
    width: 3rem;
    background: #ddd;
    height: 100%;
    text-align: center;
    line-height: 3.167rem;
    border: 1px solid #ddd;
    border-left: none;
  }

  .recharge-input-text {
    color: red;
  }

  .add-bank a {
    margin-left: 1.5rem;
    color: #01aaef;
  }

  .recharge-submit a {
    width: 6rem;
    margin-left: 27%;
    padding: 0.75rem 1.167rem;
    font-size: 1.167rem;
    background: #01aaef;
    color: #fff;
  }

  .recharge-submit a:hover {
    background: #0186bc;
  }

  .show-text {
    font-size: 1rem !important;
    color: red !important;
    opacity: 0;
  }

  .margin-bottom-12 {
    margin-bottom: -1rem !important;
  }
  .el-tabs__header{
    margin-bottom: 0 !important;
  }
  .recharge-record{
    padding: 0.833rem;
    border:1px solid #d1dbe5;
    border-top:none;
    padding-top: 3rem;
  }
  .recharge-record table {
    width: 100%;
    border:1px solid #d1dbe5;
    border-spacing: 0;
    border-collapse: collapse;
  }
  .recharge-record table td{
    width: 12.667rem;
    padding: 0.883rem;
    text-align: left;
  }
  .recharge-record table td:nth-of-type(1){width: 24.25rem}
  .recharge-record table td:nth-of-type(2){width: 13rem}
  .recharge-record table td:nth-of-type(3){width: 14.083rem}
  .recharge-record table td:nth-of-type(4){
    width: 14.167rem;
  }
  .recharge-record table td:nth-of-type(5){
    width: 10rem;
  }
  .recharge-record thead{
    border:1px solid #d1dbe5;
  }
  .recharge-record-data{
    border: 1px solid #d1dbe5;
    background: #f7f7f7;
  }
  .noRecode td{
    padding: 6.667rem !important;
    text-align: center !important;
  }
  .noRecode td i{
    font-size: 3rem;
  }
  .noRecode td i,.noRecode td span{
    display: inline !important;

  }
  .recharge-record-data-page td{
    padding-top: 1.5rem;
    text-align: right !important;
  }
  .background-eee input{
    background: #ddd !important;
  }
  .recharge-center-footer-text{
    padding:0 15rem;
    font-size: 1.0833rem !important;
  }
  .recharge-input-box>span{
    position: relative;
  }
  .recharge-input-box>span>i{
    position: absolute;
    top: 3.3rem;
    color: #ddd;
    right: 1rem;
    background: #fff;
    z-index: 1;
    display: none;
  }
  .recharge-input-box>span>img{
    position: absolute;
    width: 14.25rem;
    border: 1px solid #ddd;
    padding: 0.83rem;
    background: #fff;
    right: -0.25rem;
    top: 4.1rem;
    box-shadow: 0.416rem 0.416rem 0.416rem #ddd;
    display: none;
  }
</style>
