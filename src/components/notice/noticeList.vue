<template>
  <div class="noticeList layout">
    <div class="noticeList-title">
      公共列表

    </div>
    <ul class="noticeList-ul">
      <li v-for="item in data">
        <!--<router-link to="/notice/noticeDetail">-->
        <router-link :to="{path:'/notice/noticeDetail',query:{id:item.id}}">
          <span class="getNewNotice-span">{{item.title}} <img v-show="item.id===newNotice.id"
                                                              src="../../assets/img/new.png"
                                                              class="noticeList-img-new"/></span>
          <span>{{item.releaseTime | dateYMDHIS}}</span>
        </router-link>
      </li>
    </ul>
    <div class="Pagefooter">
      <el-pagination
        @current-change="handleCurrentChange5"
        :current-page="currentPage"
        layout="prev, pager, next"
        :total="total"
        class="page-right"></el-pagination>
    </div>
  </div>
</template>
<script>
  export default{
    data() {
      return {
        data: [],
        currentPage: 1,
        total: 10,
        newNotice: ''
      }
    },
    mounted(){
      this.getNoticeList(1);
      this.getNewNotice();
    },
    methods: {
      getNoticeList(currentPage){
        this.$http({
          url: this.$URL_API + 'notices/noticesPage',
          method: 'POST',
          data: {
            pageNo: currentPage - 1,
            pageSize: 10
          }
        }).then((res) => {
//          console.log(res.data.data.content, 12);
          this.data = res.data.data.content;
          this.total = res.data.data.totalElements
        })
      },
      getNewNotice(){
        this.$http({
          url: this.$URL_API + 'notices/newest',
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          this.newNotice = res.data.data;
        })
      },
      handleCurrentChange5(currentPage){
        this.getNoticeList(currentPage);
      }
    }
  }
</script>
<style scoped>
  .noticeList {
    background: #fff;
    margin: 20px auto;
    padding: 60px 110px;
    box-sizing: border-box;
  }

  .noticeList-title {
    padding-bottom: 60px;
    text-align: center;
    font-size: 33px;
    font-weight: 300;
  }

  .noticeList-ul li a {
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    padding: 15px;
    border-bottom: 1px solid #F2F5F8;
    line-height: 1.5em;
  }

  .page-right {
    text-align: right;
    padding-top: 30px;
    padding-right: 30px;
    box-sizing: border-box;
  }

  .getNewNotice-span {
    position: relative;
    padding-right: 40px;
  }

  .noticeList-img-new {
    position: absolute;
    top: -10px;
    right: 0;
    -webkit-animation: newLists 0.5s infinite alternate;
    -o-animation: newLists 0.5s infinite alternate;
    animation: newLists 0.5s infinite alternate;
  }
  @keyframes newLists {
    0% {
      top: -10px;
    }
    50% {
      top: -5px;
    }
    100% {
      top: -10px;
    }
  }

  @-webkit-keyframes newLists {
    0% {
      top: -10px;
    }
    50% {
      top: -5px;
    }
    100% {
      top: -10px;
    }
  }

  @-o-keyframes newLists {
    0% {
      top: -10px;
    }
    50% {
      top: -5px;
    }
    100% {
      top: -10px;
    }
  }
</style>
