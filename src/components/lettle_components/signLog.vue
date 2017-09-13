<template>
  <transition enterActiveClass="animated fadeIn" leaveActiveClass="animated fadeOut">
    <div class="signlog">
      <div class="signtable">
        <h2 class="signLog-title">签到记录</h2>
        <a href="javascript:;" @click="closeSignLog()" class="closeSignLogBTn"><img
          src="../../assets/img/cross_little.png"/></a>
        <div class="sign-table-div">
          <table>
            <thead>
            <tr>
              <td>签到时间</td>
              <td>签到设备</td>
              <td>签到奖励</td>
            </tr>
            </thead>
            <tbody v-show="noCode">
            <tr v-for="item in signList">
              <td>{{item.createDate| dateYMDHIS}}</td>
              <td>{{item.remark |translate}}</td>
              <td>{{item.amount|float8}}</td>
            </tr>
            </tbody>
            <tbody v-show="!noCode" class="dt">
            <tr>
              <td colspan="3">
                <i class="iconfont">&#xe661;</i>
                <span>暂无记录</span>
              </td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
              <td colspan="3">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  layout="prev, pager, next"
                  :total="totalNum"
                  class="page-right"></el-pagination>
              </td>
            </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import {mapGetters} from 'vuex';
  export default{
    data(){
      return {
        noCode: false,
        totalNum: 10,
        signList: [],
        currentPage: 1
      }
    },
    mounted(){
      this.handleCurrentChange(1);
    },
    methods: {
      closeSignLog(){
        this.$store.dispatch('signLogHide');
      },
      handleCurrentChange(currentPage){
        this.$http({
          url: this.$URL_API + 'activity/rewardList',
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
              activityCode:'SIGN'
            }
          }
        }).then((res) => {
//            console.log(res.data)
          if (res.data.code === 200) {
            this.noCode = res.data.data.totalElements > 0;
            this.totalNum = res.data.data.totalElements ? res.data.data.totalElements : 10;
            this.signList = res.data.data.content;
          }
        })
      }
    },
  }
</script>
<style scoped>
  .signlog {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    z-index: 999999;
  }

  .signtable {
    width: 50%;
    height: 500px;
    background: #fff;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    padding: 40px;
    border-radius: 4px;
  }

  .signLog-title {
    width: 100%;
    font-weight: 500;
    text-align: center;
    margin-bottom: 40px;

  }

  .closeSignLogBTn {
    position: absolute;
    top: -20px;
    right: -20px;
  }

  table {
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
  }

  table tr {
    display: flex;
    align-items: center;
  }

  table tr td {
    flex: 1;
    text-align: center;
    padding: 8px 0;
  }

  table thead {
    border: 1px solid #ddd;
  }

  table tbody {
    border: 1px solid #ddd;

  }

  table tbody tr:nth-child(odd) {
    background: #f9f9f9;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
  }

  table tbody tr:hover {
    background: #f9f9f9;
  }

  .dt td {
    padding: 8rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dt td i {
    font-size: 3rem;
  }

  table tfoot td {
    display: flex;
    justify-content: flex-end;
  }
</style>
