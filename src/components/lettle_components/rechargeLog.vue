<template>
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
</template>
<script>
  export default {
      data() {
          return {
            activeName:'first'
          }
      }
  }
</script>
<style scoped>
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

</style>
