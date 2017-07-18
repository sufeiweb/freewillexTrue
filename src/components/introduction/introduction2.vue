<template>
  <div class="introduction-header">
    <h1 class="introduction-link-title">公司介绍</h1>
    <div class="introduction-top top2">
      <div class="title">
        <p>技术先进</p>
        <p>安全为本</p>
      </div>
    </div>
    <div class="introduction-content">
      <div class="introduction-content-move-box">
        <div class="introduction-content-move-view1">
          <img src="../../assets/img/introduction/prove1.jpg" alt="" v-show="phoneer"/>
          <img src="../../assets/img/introduction/prove2.jpg" alt="" v-show="!phoneer"/>
        </div>
        <div class="introduction-content-move-view2">
          <a href="javascript:" @click="phoneerStatus1()"><img src="../../assets/img/introduction/prove1.jpg" alt=""/></a>
          <a href="javascript:" @click="phoneerStatus2()"><img src="../../assets/img/introduction/prove2.jpg" alt=""/></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        phoneer: true
      }
    },
    methods:{
      phoneerStatus1(){
          this.phoneer = true;
      },
      phoneerStatus2(){
        this.phoneer = false;
      }
    }
  }
</script>
<style scoped>
  .top2 {
    background: url('../../assets/img/introduction/about2.jpg') no-repeat center;
    background-size: 100%;
  }

  .introduction-content-move-box {
    width: 48.33rem;
    margin: 2rem auto;
  }

  .introduction-content-move-view1 {
    height: 42.5rem;
    width: 48.33rem;
  }

  .introduction-content-move-view1 img {
    margin: 0 auto;
    width: 350px;
    border: 1px solid #ddd;
  }

  .introduction-content-move-view2 {
    display: flex;
    justify-content: center;
    height: 9rem;
    margin-bottom: 8rem;

  }

  .introduction-content-move-view2 img {
    width: 8.16rem;
    height: 9rem;
    margin: 3rem 4rem;
    border: 1px solid #ddd;
  }
</style>
