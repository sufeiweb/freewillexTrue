<template>
  <div class="user-table">
    <table>
      <caption >
        <div class="table-header">
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
      <thead class="user-table-thead">
        <tr>
          <td>时间</td>
          <td>操作类型</td>
          <td>币种</td>
          <td>数量</td>
          <td>手续费</td>
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
</template>
<script>
  export default {
      data() {
          return {
              value: '',
            noData: false
          }
      }
  }
</script>
<style scoped>
  .el-tabs__header{
    margin-bottom: 0;
  }
  .user-table{
    border:1px solid #d1dbe5;
    border-top: none;
    padding: 0.833rem;
    font-size: 1.167rem;
  }
  .user-table table{
    width: 100%;
    border:1px solid #d1dbe5;
    border-spacing: 0;
    border-collapse: collapse;
  }
  .table-header{
    display: flex;
    align-items: center;
    margin: 1.5rem 0;
    font-size: 1.167rem;
    justify-content: flex-end;
    padding-right: 4rem;
  }
  .table-header span{
    margin-right: 2rem;
  }
  .user-table table td{
    width: 12.667rem;
    height: 3.083rem;
    line-height: 3.083rem;
    text-align: left;
  }
  .user-table table td:nth-of-type(2){
    width: 20.75rem;
  }
  .user-table table td:nth-of-type(5){
    width: 16.75rem;
  }
  .user-table-thead{
    border:1px solid #d1dbe5;
  }
  .user-table-tbody{
    border: 1px solid #d1dbe5;
    background: #f7f7f7;
  }
  .de-body td{
    padding: 6.667rem;
    text-align: center !important;
  }
  .de-body td i{
    font-size: 3rem;
  }
  .de-body td i,.de-body td span{
    display: inline !important;

  }
  .user-table-footer-page td{
    padding-top: 1.5rem;
    text-align: right !important;
  }
</style>
