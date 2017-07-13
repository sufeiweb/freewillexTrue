<template>
  <div class="entrustedRecord">
    <el-tabs v-model="activeName2" type="card" >
      <el-tab-pane label="当前委托" name="first">
        <table>
          <thead>
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
          <tbody v-show="noResize">
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
          <tbody v-show="!noResize">
           <tr>
             <td colspan="9">
               <i class="iconfont">&#xe661;</i>
               <span>暂无记录</span>
             </td>
           </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="历史委托" name="second">

      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName2: 'first',
        noRecord: false
      };
    }
  };
</script>
