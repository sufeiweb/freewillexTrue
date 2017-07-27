<template>
  <div class="setting">
    <div class="setting-header-title">
      <p>安全设置</p>
    </div>
    <div class="setting-content">
      <div class="setting-safe-box">
        <p>您好，您的<span>{{iponeNum}}</span>账户安全级别<span>{{EXP}}</span></p>
        <div class="setting-safe-view-box">
          <span class="setting-safe-view"></span>
          <i class="iconfont">&#xe695;</i>
        </div>
        <p>还有<span>{{Xiang}}</span>个保护项可设置，让您的资金更安全</p>
      </div>
      <div class="setting-table">
        <table>
          <tbody>
          <tr>
            <td>
                  <span v-show="!realName">
                    <i class="iconfont">&#xe66f;</i>
                    <span>未认证</span>
                  </span>
              <span v-show="realName">
                    <i class="iconfont">&#xe675;</i>
                    <span>已认证</span>
                  </span>
            </td>
            <td>实名认证</td>
            <td>保障账户安全，确认用户身份</td>
            <td>
              <router-link to="/settings/user" v-show="!realName">立即认证</router-link>
              <!--<a href="javascript:;" v-show="!realName">立即认证</a>-->
              <a href="javascript:;" v-show="realName">详情</a>
            </td>
          </tr>
          <tr>
            <td>
                  <span v-show="!realEmail">
                    <i class="iconfont">&#xe66f;</i>
                    <span>未绑定</span>
                  </span>
              <span v-show="realEmail">
                    <i class="iconfont">&#xe675;</i>
                    <span>已绑定</span>
                  </span>
            </td>
            <td>电子邮箱</td>
            <td>保障资金安全，获取账户资金变动通知</td>
            <td>
              <router-link to="/settings/bindEmail"  v-show="!realEmail">立即绑定</router-link>
              <!--<a href="javascript:;" v-show="!realEmail">立即绑定</a>-->
              <span v-show="realEmail">{{emailNum}}</span>
            </td>
          </tr>
          <tr>
            <td>
                  <span v-show="!realPhone">
                    <i class="iconfont">&#xe66f;</i>
                    <span>未绑定</span>
                  </span>
              <span v-show="realPhone">
                    <i class="iconfont">&#xe675;</i>
                    <span>已绑定</span>
                  </span>
            </td>
            <td>手机绑定</td>
            <td>保障资金安全，是您在FreeWillex重要的身份凭证</td>
            <td>
              <a href="javascript:;" v-show="!realPhone">立即绑定</a>
              <span v-show="realPhone">{{iponeNum}}</span>
            </td>
          </tr>
          <tr>
            <td>
                  <span v-show="!realPsd">
                    <i class="iconfont">&#xe66f;</i>
                    <span>未设置</span>
                  </span>
              <span v-show="realPsd">
                    <i class="iconfont">&#xe675;</i>
                    <span>已设置</span>
                  </span>
            </td>
            <td>登录密码</td>
            <td>上次登陆时间：<span class="login-timer">2017-07-27 13:31:58</span></td>
            <td>
              <a href="javascript:;" v-show="!realPsd">立即设置</a>
              <a href="javascript:;" v-show="realPsd">修改</a>
            </td>
          </tr>
          <tr>
            <td>
                  <span v-show="!realMoneyPsd">
                    <i class="iconfont">&#xe66f;</i>
                    <span>未设置</span>
                  </span>
              <span v-show="realMoneyPsd">
                    <i class="iconfont">&#xe675;</i>
                    <span>已设置</span>
                  </span>
            </td>
            <td>资金密码</td>
            <td>资金安全，提现等资金相关操作时使用</td>
            <td>
              <a href="javascript:;" v-show="!realMoneyPsd">立即设置</a>
              <a href="javascript:;" v-show="realMoneyPsd">修改</a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        iponeNum: '',
        emailNum: '',
        Xiang: 5,
        EXP:'低'
      }
    },
    mounted() {
      let that = this;
      this.$http({
        url: 'http://192.168.1.48:8089/fwex/web/authentication/info',
        method: 'GET',
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          'X-Authorization': 'Bearer ' + this.$store.state.token
        }
      }).then((res) => {
        console.log(res.data.data);
        that.Xiang = 5 - res.data.data.length;
        if(res.data.data.length<=2){
            that.EXP='低';
        }else if(res.data.data.length<=4) {
          that.EXP='中';
        }else {
          that.EXP='高';
        }
        $('.setting-safe-view-box i').css({
          left: 20 * res.data.data.length + '%'
        });
        for (let i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].authsEnum === 'PASSWORD') {
            that.$store.state.realName.userPsd = true;
          }//密码
          if (res.data.data[i].authsEnum === 'ORDINARY_REAL_NAME') {
            that.$store.state.realName.userName = true;
          }//实名
          if (res.data.data[i].authsEnum === 'MOBILE') {
            that.$store.state.realName.userPhone = true;
            that.iponeNum = res.data.data[i].code;
          }//手机
          if (res.data.data[i].authsEnum === 'EMAIL') {
            that.$store.state.realName.userEmail = true;
            that.emailNum = res.data.data[i].code;
          }//邮箱
          if (res.data.data[i].authsEnum === 'CAPIT_PASSWORD') {
            that.$store.state.realName.userMoneyPsd = true;
          }//资金密码
        }
      }).catch((req) => {
        console.log(req, "请求错误")
      })
    },
    computed: {
      realName() {
        return this.$store.state.realName.userName;
      },//实名认证
      realEmail() {
        return this.$store.state.realName.userEmail;
      },//邮箱认证
      realPhone() {
        return this.$store.state.realName.userPhone;
      },//手机认证
      realPsd() {
        return this.$store.state.realName.userPsd;
      },//登录密码
      realMoneyPsd() {
        return this.$store.state.realName.userMoneyPsd;
      },//资金密码
      bindEmail(){},//绑定邮箱
    }
  }
</script>
<style scoped>
  .setting-header-title {
    padding: 1.5rem;
    border-bottom: 1px solid #ddd;
  }

  .setting-header-title > p {
    font-size: 1.333rem;
  }

  .setting-safe-view-box {
    padding: .2rem;
    border: 1px dashed #01aaef;
    position: relative;
    margin: 2.5rem;
  }

  .setting-safe-box {
    padding-top: 1.5rem;
  }

  .setting-safe-box > p {
    justify-content: center;
    font-size: 1.5rem;
    display: flex;
    align-items: flex-end;
    margin-bottom: 1rem;
  }

  .setting-safe-box > p:nth-of-type(2) {
    font-size: 1.333rem;
  }

  .setting-safe-box > p span {
    color: #01aaef;
    margin: 0 .5rem;
  }

  .setting-safe-box > p:nth-of-type(2) span {
    font-size: 1.333rem;
  }

  .setting-safe-view {
    background: linear-gradient(to right, #ff0000, #fff60d, #05c42e);
    height: 2.667rem;
    margin: 0.25rem;
  }

  .setting-safe-view-box > i {
    position: absolute;
    color: #01aaef;
    margin-left: -16px;
    left: 25%;
  }

  .setting-table table {
    width: 100%;
    padding: 2.5rem;
    box-sizing: border-box;
    border-spacing: 0;
    border-collapse: collapse;
  }

  .setting-table .login-timer {
    display: inline !important;
  }

  .setting-table table tr td {
    padding: 1.667rem;
    border-bottom: 1px solid #e9ecf3;
  }

  .setting-table table tr td span {
    display: flex;
    align-items: center;
  }

  .setting-table table tr td .iconfont {
    font-size: 1.833rem;
  }

  .setting-table table tr td:nth-of-type(1) > span:nth-of-type(1) {
    color: #ee3523 !important;
  }

  .setting-table table tr td:nth-of-type(1) > span:nth-of-type(2) {
    color: #01aaef !important;
  }

  .setting-table table tr td:nth-of-type(4) {
    text-align: right;
  }

  .setting-table table tr td:nth-of-type(4) > span {
    justify-content: flex-end;
  }

  .setting-table table tr td:nth-of-type(4) > a {
    color: #01aaef !important;
  }
</style>
