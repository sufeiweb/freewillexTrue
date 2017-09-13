<template>
  <div class="login">
    <div class="login-box layout">
      <img src="../assets/img/login/login_bg.jpg"/>
      <loginCenter></loginCenter>
    </div>
  </div>
</template>
<script>
  import loginCenter from './lettle_components/loginCenter.vue';
  export default {
    components: {loginCenter},
  }
</script>
<style scoped>
  .login {
    width: 100%;
    height: 51.667rem;
    overflow: hidden;
    background: #0397DD;
  }

  .login-box {
    position: relative;
  }
</style>
