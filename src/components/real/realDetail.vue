<template>
  <div class="realDetail">
    <div class="realDetail-title">
      <p>实名认证</p>
    </div>
    <div class="realDetail-content">
      <div>
        <span>姓名</span><span>{{userName}}</span>
      </div>
      <div>
        <span>国家/地区</span><span>{{userCountry}}</span>
      </div>
      <div>
        <span>证件类型</span><span>{{'身份证'}}</span>
      </div>
      <div>
        <span>证件号码</span><span>{{userIdCard}}</span>
      </div>
      <div>
        <span>状态</span><span style="color: #01aaef">{{'已认证'}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        userName: '',
        userCountry: '',
        userIdCard: ''
      }
    },
    mounted() {

      let res = localStorage.getItem('getU');
      this.userName = JSON.parse(res).userName;
      this.userCountry=JSON.parse(res).country;

      this.$http({
        url: this.$URL_API+'authentication/info',
        method: 'GET',
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          'X-Authorization': 'Bearer ' + this.$store.state.token
        }
      }).then((res) => {
        if(res.data.code===200){
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].certificateEnum === 'IDCARD') {
              this.userIdCard = res.data.data[i].code;
            }
          }
        }
      })
    }

  }
</script>
<style scoped>
  .realDetail-title {
    padding: 2rem 0;
    border-bottom: 1px solid #ddd;
    font-size: 1.333rem;
  }

  .realDetail-content {
    padding-top: 3rem;
  }

  .realDetail-content div {
    display: flex;
    margin-bottom: 2rem;
    font-size: 1.167rem;
  }

  .realDetail-content div > span {
    width: 200px;
  }

  .realDetail-content div > span:nth-of-type(1) {
    margin-right: 3rem;
    text-align: right;
  }
</style>
