<template>
  <transition enterActiveClass="fadeInDown" leaveActiveClass="fadeOutUp">
    <div class="tips" v-show="showTips">
      <i class="iconfont" v-show="dt">&#xe664;</i>
      <i class="iconfont" v-show="!dt">&#xe690;</i>
    </div>
  </transition>
</template>
<script>
  import {mapGetters} from 'vuex';
  export default {
    data() {
      return {
        dt: true,
        showTips: false,
      }
    }
  }
</script>
<style scoped>
  .tips {
    position: absolute;
    top: 15rem;
    width: 25rem;
    height: 5rem;
    text-align: center;
    line-height: 5rem;
    left: 50%;
    margin-left: -12.5rem;
    background: green;
    color: #fff;
    font-size: 1.5rem;
    z-index: 9999999;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tips i {
    font-size: 3rem;
    margin-right: 3rem;
  }
</style>
