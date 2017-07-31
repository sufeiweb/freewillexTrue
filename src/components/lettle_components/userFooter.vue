<template>
  <div class="userIndex-footer">
    <p class="userIndex-footer-title">账户明细</p>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="全部" name="first">
        <userTable></userTable>
      </el-tab-pane>
      <el-tab-pane label="人民币" name="second">
        <userTable></userTable>
      </el-tab-pane>
      <el-tab-pane label="比特币" name="third">
        <userTable></userTable>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import userTable from '../lettle_components/userTable.vue';
  export default {
    data() {
      return {
        activeName: 'first'
      }
    },
    components: {
      userTable
    },
  }
</script>
<style scoped>
  .userIndex-footer-title{
    font-weight: 400;
    font-size: 1.667rem;
    padding: 0.833rem 0;
    margin: 1.667rem 0 0.833rem 0;
    border-bottom: 1px solid #ddd;
  }

</style>
