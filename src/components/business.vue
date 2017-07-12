<template>
  <div class="business">
    <div class="business-box layout">
      <realName></realName>
    </div>
  </div>
</template>
<script>
  import realName from './lettle_components/realName.vue';
  export default {
      components:{
          realName
      }
  }
</script>
<style>
  .business-box{
    margin: 2rem auto;
    background: #fff;
  }
</style>
