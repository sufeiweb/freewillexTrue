<template>
  <div>
    <transition enterActiveClass="animated fadeInDown" leaveActiveClass="animated fadeOutUp">
      <div class="tips" v-show="ErrorState">
        <i class="iconfont">&#xe664;</i>
        {{ErrorMessage}}

      </div>
    </transition>
    <transition enterActiveClass="animated fadeInDown" leaveActiveClass="animated fadeOutUp">
      <div class="tips tips1" v-show="ErrorState1">
        <i class="iconfont">&#xe690;</i>
        {{ErrorMessage}}

      </div>
    </transition>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  export default {
    computed: mapGetters(['ErrorState', 'ErrorMessage', 'ErrorState1'])
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
    font-size: 2rem;
    margin-right: 3rem;
  }

  .tips1 {
    background: red;
  }
</style>
