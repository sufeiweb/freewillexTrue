<template>
  <div class="transactionRecord">
    <div class="transactionRecord-title">
      <p>交易记录</p>
    </div>
    <table class="entrustedRecord-table">
      <caption>
        <div class="table-select-time">
          <span>日期</span>
          <div class="block">
            <el-date-picker
              v-model="value"
              type="daterange"
              placeholder="选择日期范围">
            </el-date-picker>
          </div>
        </div>
      </caption>
      <thead class="entrustedRecord-table-thead ">
      <tr>
        <td>时间</td>
        <td>类型</td>
        <td>单价</td>
        <td>数量</td>
        <td>金额</td>
        <td>手续费</td>
      </tr>
      </thead>
      <tbody v-show="noRecord" class="entrustedRecord-table-tbody">
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
      </tr>
      </tbody>
      <tbody v-show="!noRecord" class="entrustedRecord-table-tbody tbody-noRecord">
      <tr>
        <td colspan="6" >
          <i class="iconfont">&#xe661;</i>
          <span>暂无记录</span>
        </td>
      </tr>
      </tbody>
      <tfoot class="entrustedRecord-table-page">
      <tr>
        <td colspan="6">
          <el-pagination layout="prev, pager, next" :total="10" class="page-right"></el-pagination>
        </td>
      </tr>
      </tfoot>
    </table>
  </div>
</template>
<script>
  export default {
      data() {
          return {
            noRecord: false,
            value: ''
          }
      },
  }
</script>
<style scoped>
  .transactionRecord-title{
    font-size: 1.333rem;
    height: 4rem;
    line-height: 4rem;
    border-bottom: 1px solid #eee;
    margin-bottom: 0.833rem;
  }
  .table-select-time {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding:1rem 3rem 2rem 0;
  }
  .table-select-time >span{
    margin-right: 2rem ;
    font-size: 1.167rem ;
  }
  .el-tab-pane{
    padding: 0.833rem;
    border: 1px solid #d1dbe5;
    border-top: none;
  }
  .el-tabs__header{
    margin-bottom: 0 !important;
  }
  .entrustedRecord-table{
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
    margin: 0.833rem 0;
    font-size: 1.083rem;
  }
  .entrustedRecord-table td{
    width: 12.25rem;
    height: 1.583rem;
    padding: 0.667rem;
    text-align: right;
  }
  .entrustedRecord-table td:nth-of-type(1),  .entrustedRecord-table td:nth-of-type(2){
    text-align: left;
  }
  .entrustedRecord-table td:nth-of-type(6){
    width: 16rem;
  }

  .entrustedRecord-table-thead{
    border: 1px solid #d1dbe5;
    font-size: 1.1667rem;
  }
  .entrustedRecord-table-tbody{
    border: 1px solid #d1dbe5;
    background: #f7f7f7;
  }
  .tbody-noRecord td{
    padding: 6.667rem;
    text-align: center !important;
  }
  .tbody-noRecord td i{
    font-size: 3rem;
  }
  .tbody-noRecord td i,.tbody-noRecord td span{
    display: inline !important;

  }
  .entrustedRecord-table-page td{
    padding-top: 1.5rem;
    text-align: right !important;
  }
</style>
