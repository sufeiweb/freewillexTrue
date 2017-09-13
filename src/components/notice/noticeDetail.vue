<template>
  <div class="noticeDetail layout">
    <h1 class="noticeDetail-title">
      {{noticeDetail.title}}
    </h1>
    <router-link to="/notice/noticeList" class="noticeDetail-router-to-list">
      <i class="iconfont">&#xe667;</i>
      公告列表

    </router-link>
    <div v-html="noticeDetail.contexts"></div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        noticeDetail: ''
      }
    },
    mounted(){
      this.getNoticeDetail();
    },
    methods: {
      getNoticeDetail(){
        let id = this.$route.query.id;
        this.$http({
          url: this.$URL_API + 'notices/info/' + id,
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.noticeDetail = res.data.data;
          }
        })
      }
    }
  }
</script>
<style scoped>
  .noticeDetail {
    margin: 20px auto;
    background: #fff;
    padding: 60px 110px;
    box-sizing: border-box;
    position: relative;
  }

  .noticeDetail-title {
    padding-bottom: 60px;
    text-align: center;
    font-size: 33px;
    font-weight: 300;
  }

  .noticeDetail-router-to-list {
    position: absolute;
    top: 80px;
    right: 20px;
    color: #01aaef;
    font-size: 14px;
  }

  .noticeDetail-router-to-list i {
    font-size: 22px;
  }
</style>
