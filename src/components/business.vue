<template>
  <div class="business">
    <div class="business-box layout">
      <div class="business-box-right">
        <transition enter-active-class="animated fadeIn">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>

  import $ from 'jquery';
  export default {}
</script>
<style scoped>
  .business-box {
    margin: 2rem auto;
    display: flex;
  }

  .business-box-right {
    width: 100%;
    padding: 1rem 1.667rem 1.25rem 1.667rem;
    box-sizing: border-box;
  }
</style>
