<template>
  <div class="user-table">
    <table>
      <caption>
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
        <td>日期</td>
        <td>说明</td>
        <td>产生金额</td>
      </tr>
      </thead>
      <tbody class="user-table-tbody" v-show="noData">
      <tr v-for="(item,index) in items">
        <td>{{item.times | dateYMDHIS}}</td>
        <td>{{item.business | AoJ}} / {{item.serial | AoJ}}</td>
        <td>{{item.balance}} {{item.currency}}</td>
      </tr>
      </tbody>
      <tbody class="user-table-tbody de-body" v-show="!noData">
      <tr>
        <td colspan="3">
          <i class="iconfont">&#xe661;</i>
          <span>暂无记录</span>
        </td>
      </tr>
      </tbody>
      <tfoot class="user-table-footer-page">
      <tr>
        <td colspan="3">
          <el-pagination
            layout="prev, pager, next"
            @current-change="handleCurrentChangeAccountLog"
            :current-page="currentPage"
            :total="totalName"
            class="page-right"></el-pagination>
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
        value: '',//筛选时间
        noData: false,
        totalName: 10,//总条数
        currentPage: 1,//默认页
        items: [],//返回参数,
        Account: '',//默认账户
        startDate: '',//开始时间
        endDate: '',//结束时间
      }
    },
    mounted(){
      this.handleCurrentChangeAccountLog(1);
    },
    methods: {
      handleCurrentChangeAccountLog(currentPage){
        this.$http({
          url: 'http://192.168.1.48:8089/fwex/web/capital/serial',
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
              commodity: '',
              legalMoney: '',
              currency: this.Account,
              startTimes: this.startDate,
              endTimes: this.endDate
            }
          }
        }).then((res) => {
          this.showError(res.data.code, res.data.message);
          if (res.data.code === 200) {
            if (res.data.data.totalElements) {
              this.noData = true;
            } else {
              this.noData = false;
            }
            this.totalName = res.data.data.totalElements ? res.data.data.totalElements : 10;
            this.items = res.data.data.content;
          }
        }).catch((req) => {
          this.showError(req.state, req.message)
        })
      }
    },
    watch: {
      value(newValue, oldValue){
        let date1 = new Date(newValue[0]);
        let date2 = new Date(newValue[1]);
        this.startDate = date1.getTime();
        this.endDate = date2.getTime();
        this.handleCurrentChangeAccountLog(1);
      },
    }
  }
</script>
<style scoped>
  .el-tabs__header {
    margin-bottom: 0;
  }

  .user-table {
    border: 1px solid #d1dbe5;
    border-top: none;
    padding: 0.833rem;
    font-size: 1.167rem;
  }

  .user-table table {
    width: 100%;
    border: 1px solid #d1dbe5;
    border-spacing: 0;
    border-collapse: collapse;
  }

  .table-header {
    display: flex;
    align-items: center;
    margin: 1.5rem 0;
    font-size: 1.167rem;
    justify-content: flex-end;
    padding-right: 4rem;
  }

  .table-header span {
    margin-right: 2rem;
  }

  .user-table table td:nth-of-type(2) {
    width: 200px;
  }

  .user-table table td {
    height: 3.083rem;
    line-height: 3.083rem;
    padding-left: 1rem;
    box-sizing: border-box;
  }

  .user-table table thead td:nth-of-type(1) {
    padding-left: 50px;
    box-sizing: border-box;
  }

  .user-table-thead {
    border: 1px solid #d1dbe5;
  }

  .user-table table td:nth-of-type(3) {
    text-align: right;
    padding-right: 20px;
  }

  .user-table table tbody tr:nth-child(odd) {
    background: #f9f9f9;
  }

  .user-table table tbody tr {
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
  }

  .de-body td {
    padding: 6.667rem;
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
</style>
