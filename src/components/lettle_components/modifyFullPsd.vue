<template>
  <div class="modifyFullPsd">
    <div class="modifyFullPsd-title">
      <p>修改资金密码</p>
    </div>
    <div class="modifyFullPsd-content">
      <div class="modifyFullPsd-group1">
        <span>新密码</span>
        <div class="form-group-content de">
          <input type="password" placeholder="密码" v-model="modifyFullPsd" class="modifyFullpsd" minlength="6"
                 maxlength="32">
          <div class="help-tips-modifyFullPsd"></div>
        </div>
        <p class="password-strength"><span></span><span></span><span></span><em
          class="password-strength-view"></em></p>
      </div>
      <div class="modifyFullPsd-group1">
        <span>确认密码</span>
        <div class="form-group-content de">
          <input type="password" placeholder="确认密码" v-model="modifyFullPsds" class="modifyFullPsds" minlength="6"
                 maxlength="32"/>
          <div class="help-tips-modifyFullPsds"></div>
        </div>
      </div>
      <div class="modifyFullPsd-group1">
        <span>验证方式</span>
        <div class="form-group-content1">
          <input type="radio" name="YZStyle11" id="email_style11" value="emails" v-show="EMAIL"/><label
          for="email_style11" v-show="EMAIL">邮箱验证</label>
          <input type="radio" name="YZStyle11" id="phone_style11" value="mobiles" v-show="MOBILE"/><label
          for="phone_style11" v-show="MOBILE">短信验证</label>
        </div>
      </div>
      <div class="modifyFullPsd-group1">
        <span>验证码</span>
        <div class="dyt">
          <div class="form-group-content">
            <input type="text" placeholder="验证码" v-model="modifyFullPsdCaptcha" maxlength="6"/>
            <button class="modifyFullPsdGetCord" @click="getCodeYZ($event)">获取验证码</button>
          </div>
          <span class="form-group-content-tips"></span>
        </div>
      </div>
      <div class="modifyFullPsd-group1">
        <span>&nbsp;</span>
        <div class="form-group-content modifyFullPsdBtn1">
          <a href="javascript:;" class="modifyFullPsdBtn" @click="modifyFullPsdBtn()">确认</a>
          <span class="modifyFullPsdBtn-tips"></span>
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
        modifyFullPsd: '',
        modifyFullPsds: '',
        modifyFullPsdCaptcha: '',
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
        $("input[name='YZStyle11']").change(function () {
          that.types = $(this).val();
          $('.modifyFullPsdGetCord').html('获取验证码').removeAttr('disabled');
          clearInterval(that.timer);
        });
      }
      {
        $('.modifyFullpsd').mousedown(function () {
          $(document).keyup(function () {
            that.passWord(that.modifyFullPsd, 'password-strength', 'password-strength-view');
          });
        });
        $('.modifyFullpsd').mouseleave(function () {
          $('.modifyFullpsd').mousedown = null;
        })
      }
    },
    methods: {
      modifyFullPsdBtn() {
        let that = this;
        that.types = $("input[name='YZStyle11']:checked").val();
        if (that.modifyFullPsd && that.$store.state.modifyFullPsd.newPsds && that.modifyFullPsdCaptcha) {
          that.$http({
            url: this.$URL_API + 'account/updateCapitalPwd',
            method: 'POST',
            data: {
              password: md5(that.modifyFullPsd),
              confirmPwd: md5(that.modifyFullPsds),
              types: that.types,
              captcha: that.modifyFullPsdCaptcha
            },
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              'X-Authorization': 'Bearer ' + that.$store.state.token,
              "Content-Type": "application/json;charset=UTF-8",
            }
          }).then((res) => {
            that.showError(res.data.code, res.data.message);
            if(res.data.code===200){
              that.$router.push('/settings');
            }
          }).catch((req) => {
            that.showError(req.code, req.message)
          })
        }
      },
      getCodeYZ(ev){
        let second = 60;
        let _this = this;
        let YZStyle = $("input[name='YZStyle11']:checked").val();
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
            //console.log(req, '设置失败')
          })
        } else {
          this.showError('', '请选择验证方式')
        }

      }
    },
    watch: {
      modifyFullPsd(){
        let that = this;
        if (that.modifyFullPsds) {
          if (that.modifyFullPsd === that.modifyFullPsds) {
            that.$store.state.modifyFullPsd.newPsds = true;
            $('.help-tips-modifyFullPsds').html('');
          } else {
            that.$store.state.modifyFullPsd.newPsds = false;
            $('.help-tips-modifyFullPsds').html('两次输入的密码不一致').css({
              alignSelf: 'flex-start',
              color: 'red'
            })
          }
        }
      },
      modifyFullPsds(){
        let that = this;
        if (that.modifyFullPsd) {
          if (that.modifyFullPsd === that.modifyFullPsds) {
            that.$store.state.modifyFullPsd.newPsds = true;
            $('.help-tips-modifyFullPsds').html('');
          } else {
            that.$store.state.modifyFullPsd.newPsds = false;
            $('.help-tips-modifyFullPsds').html('两次输入的密码不一致').css({
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
  .modifyFullPsd {
    font-size: 1.167rem;
  }

  .modifyFullPsd .modifyFullPsd-title {
    border-bottom: 1px solid #ddd;
  }

  .modifyFullPsd .modifyFullPsd-title p {
    color: #666;
    padding: 1.3rem 0;
    font-size: 1.333rem;
  }

  .modifyFullPsd-content {
    padding: 4rem 0;
    margin: 0 auto;
  }

  .modifyFullPsd-group1 {
    display: flex;
    margin-bottom: 2rem;
  }

  .modifyFullPsd-group1 > span {
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

  .modifyFullPsdBtn {
    width: 10.833rem;
    text-align: center;
    padding: .8rem 0;
    background: #01aaef;
    color: #fff;
    border-radius: .133rem;
  }

  .modifyFullPsdBtn1 {
    border: none !important;
  }
</style>
