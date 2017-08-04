<template>
  <div class="user">
    <div class="user-box layout">
        <userBtnLink></userBtnLink>
      <div class="user-box-right">
        <transition enter-active-class="animated fadeIn">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
  import userBtnLink from './lettle_components/userBtnLink.vue';

  import $ from 'jquery';
  export default {
    components: {
      userBtnLink
    }
  }
</script>
<style scoped>
  .user .user-box{
    color: #333;
    height: 100%;
  }
  .user-box{
    margin: 2rem auto;
    background: #fff;
    display: flex;
    align-items: flex-start;
  }
  .user-box-right{
    width: 100%;
    padding: 1rem 1.667rem 1.25rem 1.667rem;
    box-sizing: border-box;
  }
</style>

