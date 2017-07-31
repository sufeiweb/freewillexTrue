<template>
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
    </el-tabs>
  </div>
</template>
<script>
  export default {
      data() {
          return {
            activeName:'first',
            noData:false
          }
      }
  }
</script>
<style scoped>
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
