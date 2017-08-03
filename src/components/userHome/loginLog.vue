<template>
  <div class="loginLog">
    <div class="loginLog-title">
      <p>登录日志</p>
    </div>
    <div class="loginLog-content">
      <table>
        <thead>
        <tr>
          <td>登录时间</td>
          <td>登录IP</td>
          <td>登录设备</td>
        </tr>
        </thead>
        <tbody v-show="noCord">
        <tr>
          <td>2017-07-07 08:55:06</td>
          <td>192.168.1.110</td>
          <td>Website</td>
        </tr>
        <tr>
          <td>2017-07-07 08:55:06</td>
          <td>192.168.1.110</td>
          <td>Website</td>
        </tr>
        <tr>
          <td>2017-07-07 08:55:06</td>
          <td>192.168.1.110</td>
          <td>Website</td>
        </tr>
        <tr>
          <td>2017-07-07 08:55:06</td>
          <td>192.168.1.110</td>
          <td>Website</td>
        </tr>
        </tbody>
        <tbody class="noCord" v-show="!noCord">
        <tr>
          <td colspan="3" rowspan="5">
            <i class="iconfont">&#xe661;</i>
            <span>暂无记录</span>
          </td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <td colspan="3">
            <el-pagination
              layout="prev, pager, next"
              :total="10">
            </el-pagination>
          </td>
        </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
      data() {
          return {
            noCord:false
          }
      }
  }
</script>
<style scoped>
  .loginLog-title {
    font-size: 1.33rem;
    padding: 2rem 0;
    border-bottom: 1px solid #ddd;
    margin-bottom: 1.5rem;
  }

  .loginLog-content table {
    border-spacing: 0;
    width: 100%;
    border-collapse: collapse;
  }

  .loginLog-content table td {
    padding: 8px;
  }

  .loginLog-content table thead {
    border: 1px solid #ddd;
  }

  .loginLog-content table tbody {
    border: 1px solid #ddd;
  }

  .loginLog-content table tbody tr:nth-child(odd) {
    background: #f9f9f9;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
  }

  .loginLog-content table tbody tr:hover {
    background: #f9f9f9;
  }
  .loginLog-content table .noCord td{
    padding: 6.667rem;
    text-align: center;
  }
  .loginLog-content table .noCord td span, .loginLog-content table .noCord td i{
    display: inline;
    font-size: 2rem;
  }
  .loginLog-content table .noCord td span{
    font-size: 1.167rem;
  }
  .loginLog-content table tfoot td{
    text-align: right;
  }
</style>
