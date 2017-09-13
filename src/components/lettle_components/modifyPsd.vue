<template>
  <div class="modifyPsd">
    <div class="modifyPsd-title">
      <p>修改登录密码</p>
    </div>
    <div class="modifyPsd-content">
      <div class="modifyPsd-group1" style="display: none">
        <span>原密码</span>
        <div class="form-group-content de">
          <input type="password" placeholder="原始密码" class="OldModifyPsd"/>
          <div class="help-tips-OldModifyPsd"></div>
        </div>
      </div>
      <div class="modifyPsd-group1">
        <span>新密码</span>
        <div class="form-group-content de">
          <input type="password" placeholder="密码" v-model="modifyPsd" class="modifypsd" minlength="6" maxlength="32"/>
          <div class="help-tips-modifyPsd"></div>
        </div>
        <p class="password-strength"><span></span><span></span><span></span><em
          class="password-strength-view"></em></p>
      </div>
      <div class="modifyPsd-group1">
        <span>确认密码</span>
        <div class="form-group-content de">
          <input type="password" placeholder="确认密码" v-model="modifyPsds" class="modifyPsds" minlength="6"
                 maxlength="32"/>
          <div class="help-tips-modifyPsds"></div>
        </div>
      </div>
      <div class="modifyPsd-group1">
        <span>验证方式</span>
        <div class="form-group-content1">
          <input type="radio" name="YZStyle1" id="email_style1" value="emails" v-show="EMAIL"/><label
          for="email_style1" v-show="EMAIL">邮箱验证</label>
          <input type="radio" name="YZStyle1" id="phone_style1" value="mobiles" v-show="MOBILE"/><label
          for="phone_style1" v-show="MOBILE">短信验证</label>
        </div>
      </div>
      <div class="modifyPsd-group1">
        <span>验证码</span>
        <div class="dyt">
          <div class="form-group-content">
            <input type="text" placeholder="验证码" v-model="modifyPsdCaptcha" maxlength="6"/>
            <button class="modifyPsdGetCord" @click="getCodeYz($event)">获取验证码</button>
          </div>
          <span class="form-group-content-tips"></span>
        </div>
      </div>
      <div class="modifyPsd-group1">
        <span>&nbsp;</span>
        <div class="form-group-content modifyPsdBtn1">
          <a href="javascript:;" class="modifyPsdBtn" @click="modifyPsdBtn()">确认</a>
          <span class="modifyPsdBtn-tips"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default {
    data() {
      return {
        modifyPsd: '',
        modifyPsds: '',
        modifyPsdCaptcha: '',
        radioIpt: '',
        types: '',
        timer: '',
        EMAIL: false,
        MOBILE: false
      }
    },
    mounted() {
      let that = this;
      {
        if (sessionStorage.getItem('EMAIL')) {
          this.EMAIL = true;
        }
        if (sessionStorage.getItem('MOBILE')) {
          this.MOBILE = true;
        }
      }
      {
        $('.modifypsd').mousedown(function () {
          $(document).keyup(function () {
            that.passWord(that.modifyPsd, 'password-strength', 'password-strength-view');
          })
        })
        $('.modifypsd').mouseleave(function () {
          $('.modifypsd').mousedown = null;
        })
      }
//      密码强度检测
      {
        $("input[name='YZStyle1']").change(function () {
          $('.modifyPsdGetCord').html('获取验证码').removeAttr('disabled');
          clearInterval(that.timer);
        });
      }
      //确认密码

    },
    methods: {
      modifyPsdBtn() {
        let that = this;
        that.types = $("input[name='YZStyle1']:checked").val();
        if (that.modifyPsd && that.$store.state.modifyPsd.newPsds && that.modifyPsdCaptcha) {
          that.$http({
            url: this.$URL_API + 'account/updatePwd',
            method: 'POST',
            data: {
              password: md5(that.modifyPsd),
              confirmPwd: md5(that.modifyPsds),
              types: that.types,
              captcha: that.modifyPsdCaptcha
            },
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              'X-Authorization': 'Bearer ' + that.$store.state.token,
              "Content-Type": "application/json;charset=UTF-8",
            }
          }).then((res) => {
            this.showError(res.data.code, res.data.message);
            //console.log(res, '设置成功');
            if (res.data.code === 200) {
              that.$router.push('/login');
              that.$store.state.token = '';
              localStorage.removeItem('token');
              localStorage.removeItem('userPsd');
              localStorage.removeItem('userName');
              localStorage.removeItem('getU');
              localStorage.removeItem('real');
              sessionStorage.removeItem('EMAIL');
              sessionStorage.removeItem('MOBILE');
              localStorage.removeItem('signTime');
              this.$store.state.token = '';
              this.$store.state.loginTrue = false;
              this.$store.dispatch('loginStateFalse');
              this.sendEvent('logout', '');
            }
          }).catch((req) => {
            this.showError(req.code, req.message)
            //console.log(req, '设置失败')
          })
        }
      },
      getCodeYz(ev){
        let second = 60;
        let _this = this;
        let YZStyle = $("input[name='YZStyle1']:checked").val();
        if (YZStyle) {
          ev.target.setAttribute("disabled", true);
          this.$http({
            url: this.$URL_API + 'captcha/' + YZStyle,
            method: 'GET',
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              'X-Authorization': 'Bearer ' + this.$store.state.token
            }
          }).then((res) => {
            this.showError(res.data.code, res.data.message);
            if (res.data.code === 200) {

              this.timer = setInterval(function () {
                ev.target.innerHTML = (--second) + 's';
                if (second <= 0) {
                  ev.target.setAttribute("disabled", false);
                  clearInterval(_this.timer);
                  ev.target.innerHTML = '获取验证码';
                }
              }, 1000);
            } else {
              ev.target.setAttribute("disabled", false);
            }
          }).catch((req) => {
            ev.target.setAttribute("disabled", false);
            this.showError(req.code, req.message)

          })
        } else {
          this.showError('', '请选择验证方式')
        }

      }
    },
    watch: {
      modifyPsd() {
        let that = this;
        if (that.modifyPsds) {
          if (that.modifyPsd === that.modifyPsds) {
            that.$store.state.modifyPsd.newPsds = true;
            $('.help-tips-modifyPsds').html('');
          } else {
            that.$store.state.modifyPsd.newPsds = false;
            $('.help-tips-modifyPsds').html('两次输入的密码不一致').css({
              alignSelf: 'flex-start',
              color: 'red'
            })
          }
        }
      },
      modifyPsds(){
        let that = this;
        if (that.modifyPsd) {
          if (that.modifyPsd === that.modifyPsds) {
            that.$store.state.modifyPsd.newPsds = true;
            $('.help-tips-modifyPsds').html('');
          } else {
            that.$store.state.modifyPsd.newPsds = false;
            $('.help-tips-modifyPsds').html('两次输入的密码不一致').css({
              alignSelf: 'flex-start',
              color: 'red'
            })
          }
        }
      }
    }
  }
</script>
<style scoped>
  .modifyPsd {
    font-size: 1.167rem;
  }

  .modifyPsd .modifyPsd-title {
    border-bottom: 1px solid #ddd;
  }

  .modifyPsd .modifyPsd-title p {
    color: #666;
    padding: 1.3rem 0;
    font-size: 1.333rem;
  }

  .modifyPsd-content {
    padding: 4rem 0;
    margin: 0 auto;
  }

  .modifyPsd-group1 {
    display: flex;
    margin-bottom: 2rem;
  }

  .modifyPsd-group1 > span {
    width: 16.33rem;
    padding: 1rem 1.25rem 0 1.25rem;
    font-weight: 400;
    font-size: 1.167rem;
    text-align: right;
  }

  .form-group-content {
    width: 35%;
    display: flex;
    align-items: center;
    margin: 0 1.25rem;
    border: 1px solid #e5e5e5;
    background: #fff;
  }

  .form-group-content1 {
    margin: 0 1.25rem;
    display: flex;
    align-items: center;
  }

  .form-group-content1 > input {
    margin: 0 0.5rem;
  }

  .form-group-content > div {
    width: 98%;
    height: 1.5rem;
  }

  .form-group-content > input {
    padding: 0.667rem 1rem;
    border: 0;
    outline: none;
    width: 100%;
    height: 1.833rem;
  }

  .de {
    border: none;
    flex-direction: column;
  }

  .de input {
    border: 1px solid #e5e5e5;
    width: 93.8%;
  }

  .password-strength {
    display: flex;
    margin-top: -1.5rem;
    align-items: center;

  }

  .password-strength span {
    width: 3rem;
    height: 1rem;
    margin-right: .8rem;
    background: #e9ecf3;
  }

  .password-strength-view {
    color: red;
  }

  .dyt {
    width: 35%;
  }

  .dyt .form-group-content {
    width: 100%;
  }

  .dyt .form-group-content > input {
    width: 70%;
  }

  .dyt .form-group-content > button {
    width: 30%;
    height: 3.167rem;
    border: none;
    background: #01aaef;
    color: #fff;
  }

  .modifyPsdBtn {
    width: 10.833rem;
    text-align: center;
    padding: .8rem 0;
    background: #01aaef;
    color: #fff;
    border-radius: .133rem;
  }

  .modifyPsdBtn1 {
    border: none !important;
  }
</style>
