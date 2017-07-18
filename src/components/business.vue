<template>
  <div class="business">
    <div class="business-box layout">
      <div class="business-box-left">
        <realName></realName>
        <btcTransaction></btcTransaction>
      </div>
      <div class="business-box-right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  import realName from './lettle_components/realName.vue';
  import btcTransaction from './lettle_components/btcTransaction.vue';

  import $ from 'jquery';
  export default {
      components: {
          realName, btcTransaction
      }
  }
</script>
<style scoped>
  .business-box{
    margin: 2rem auto;
    background: #fff;
    display: flex;
  }
  .business-box-right{
    width: 100%;
    padding: 1rem 1.667rem 1.25rem 1.667rem;
    box-sizing: border-box;
  }
</style>
