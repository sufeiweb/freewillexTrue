<template>
  <div class="entrustedRecord">
    <el-tabs v-model="activeName2" type="card" >
      <el-tab-pane label="当前委托" name="first">
        <table class="entrustedRecord-table">
          <thead class="entrustedRecord-table-thead">
            <tr>
              <td>时间</td>
              <td>类型</td>
              <td>方向</td>
              <td>来源</td>
              <td>委托价格</td>
              <td>委托额/量</td>
              <td>剩余</td>
              <td>状态</td>
              <td>操作</td>
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
              <td>7</td>
              <td>8</td>
              <td>9</td>
            </tr>
          </tbody>
          <tbody v-show="!noRecord" class="entrustedRecord-table-tbody tbody-noRecord">
           <tr>
             <td colspan="9" >
               <i class="iconfont">&#xe661;</i>
               <span>暂无记录</span>
             </td>
           </tr>
          </tbody>
          <tfoot class="entrustedRecord-table-page">
            <tr>
              <td colspan="9">
                <el-pagination layout="prev, pager, next" :total="10" class="page-right"></el-pagination>
              </td>
            </tr>
          </tfoot>
        </table>
      </el-tab-pane>
      <el-tab-pane label="历史委托" name="second">
        <table class="entrustedRecord-table second">
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
            <td>委托时间</td>
            <td>类型</td>
            <td>方向</td>
            <td>来源</td>
            <td>委托价格</td>
            <td>委托数</td>
            <td>平均成交价</td>
            <td>成交量</td>
            <td>成交额</td>
            <td>状态</td>
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
            <td>7</td>
            <td>8</td>
            <td>9</td>
            <td>10</td>
          </tr>
          </tbody>
          <tbody v-show="!noRecord" class="entrustedRecord-table-tbody tbody-noRecord">
          <tr>
            <td colspan="10" >
              <i class="iconfont">&#xe661;</i>
              <span>暂无记录</span>
            </td>
          </tr>
          </tbody>
          <tfoot class="entrustedRecord-table-page">
          <tr>
            <td colspan="10">
              <el-pagination layout="prev, pager, next" :total="10" class="page-right"></el-pagination>
            </td>
          </tr>
          </tfoot>
        </table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName2: 'first',
        noRecord: false,
        value: ''
      };
    }
  };
</script>
<style scoped>
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
    width: 5.917rem;
    height: 1.583rem;
    padding: 0.667rem;
    text-align: left;
  }
  .entrustedRecord-table td:last-child{
    text-align: center;
  }
  .entrustedRecord-table td:nth-of-type(5){
    width: 10.5rem;
    text-align: right;
  }
  .entrustedRecord-table td:nth-of-type(6){
    width: 11.5rem;
    text-align: right;
  }
  .entrustedRecord-table td:nth-of-type(7){
    text-align: right;
  }
  .entrustedRecord-table td:nth-of-type(8){
    text-align: right;
  }
  .entrustedRecord-table td:nth-of-type(9){
    text-align: right;
  }
  .entrustedRecord-table td:nth-of-type(10){
    text-align: right;
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
  .second td{
    width: 5.667rem;
  }
  .second td:nth-of-type(1){
    width: 9.333rem;
  }
  .second td:nth-of-type(5){
    width: 9.333rem;
  }
  .second td:nth-of-type(6){
    width: 7.583rem;
  }
  .second td:nth-of-type(7){
    width: 11.25rem;
  }
  .second td:nth-of-type(8){
    width: 7.583rem;
  }
  .second td:nth-of-type(9){
    width: 7.583rem;
  }
  .table-select-time{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 1.167rem;
    padding: 1rem 4rem 2rem 0;
  }
  .table-select-time span{
    margin-right: 2rem;
  }
</style>
