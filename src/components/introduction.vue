<template>
  <div class="introduction layout">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="技术先进" name="first">
        <introduction1></introduction1>
      </el-tab-pane>
      <el-tab-pane label="公司资质" name="second">
        <introduction2></introduction2>
      </el-tab-pane>
      <el-tab-pane label="资金安全" name="third">
        <introduction3></introduction3>
      </el-tab-pane>
      <el-tab-pane label="发展历程" name="fourth">
        <introduction4></introduction4>
      </el-tab-pane>
      <el-tab-pane label="团队文化" name="fifth">
        <introduction5></introduction5>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import introduction1 from './introduction/introduction1.vue';
  import introduction2 from './introduction/introduction2.vue';
  import introduction3 from './introduction/introduction3.vue';
  import introduction4 from './introduction/introduction4.vue';
  import introduction5 from './introduction/introduction5.vue';
  export default {
    data() {
      return {
        activeName2: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        //console.log(tab, event);
      }
    },
    components: {
      introduction1, introduction2, introduction3, introduction4, introduction5
    }
  };
</script>
<style>
  .introduction {
    background: #fff;
    margin-top: 1.8rem;
  }

  .introduction-header {
    width: 100%;
  }

  .introduction-link-title {
    margin: 2.5rem 0;
    text-align: center;
  }

  .introduction-top {
    height: 21.5rem;
  }

  .introduction-top .title {
    padding-top: 6.5rem;
    color: #fff;
    font-size: 2rem;
    text-align: center;
  }

  .introduction-top .title p:nth-of-type(1) {
    margin: 0 0 0.84rem;
  }

  .introduction-top .title p:nth-of-type(2) {
    font-size: 1.5rem;
  }


</style>
