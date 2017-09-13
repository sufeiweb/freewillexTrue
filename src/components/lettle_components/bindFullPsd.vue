<template>
  <div class="bindFullPsd">
    <div class="bindFullPsd-title">
      <p>设置资金密码</p>
    </div>
    <div class="bindFullPsd-content">
      <div class="bindFullPsd-group1">
        <span>密码</span>
        <div class="form-group-content de">
          <input type="password" placeholder="密码" v-model="bindFullPsd" class="bindFullPsd"/>
          <div class="help-tips-bindFullPsd"></div>
        </div>
        <p class="password-strength"><span></span><span></span><span></span><em
          class="password-strength-view"></em></p>
      </div>
      <div class="bindFullPsd-group1">
        <span>确认密码</span>
        <div class="form-group-content de">
          <input type="password" placeholder="确认密码" v-model="bindFullPsds" class="bindFullPsds"/>
          <div class="help-tips-bindFullPsds"></div>
        </div>
      </div>
      <div class="bindFullPsd-group1">
        <span>验证方式</span>
        <div class="form-group-content1">
          <input type="radio" name="YZStyle" id="email_style" value="emails" v-show="EMAIL"/><label
          for="email_style" v-show="EMAIL">邮箱验证</label>
          <input type="radio" name="YZStyle" id="phone_style" value="mobiles" v-show="MOBILE"/><label
          for="phone_style" v-show="MOBILE">短信验证</label>
        </div>
      </div>
      <div class="bindFullPsd-group1">
        <span>验证码</span>
        <div class="dyt">
          <div class="form-group-content">
            <input type="text" placeholder="验证码" v-model="bindFullPsdCaptcha" maxlength="6"/>
            <button class="bindFullPsdGetCord" @click="getCodeyz($event)">获取验证码</button>
          </div>
          <span class="form-group-content-tips"></span>
        </div>
      </div>
      <div class="bindFullPsd-group1">
        <span>&nbsp;</span>
        <div class="form-group-content bindFullBtn1">
          <a href="javascript:;" class="bindFullBtn" @click="bindFullBtn()">确认</a>
          <span class="bindFullBtn-tips"></span>
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
        bindFullPsd: '',
        bindFullPsds: '',
        bindFullPsdCaptcha: '',
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
        $("input[name='YZStyle']").change(function () {
          $('.bindFullPsdGetCord').html('获取验证码').removeAttr('disabled');
          clearInterval(that.timer);
        });
      }
      {
        $('.bindFullPsd').mousedown(function () {
          $(document).keyup(function () {
            that.passWord(that.bindFullPsd, 'password-strength', 'password-strength-view');
          })
        });
        $('.bindFullPsd').mouseleave(function () {
          $('.bindFullPsd').mousedown = null;
        })
      }
    },
    methods: {
      bindFullBtn() {
        let that = this;
        that.types = $("input[name='YZStyle']:checked").val();
        if (that.bindFullPsd && that.bindFullPsds && that.bindFullPsdCaptcha) {
          that.$http({
            url: this.$URL_API + 'authentication/capitPwd',
            method: 'POST',
            data: {
              password: md5(that.bindFullPsd),
              confirmPwd: md5(that.bindFullPsds),
              types: that.types,
              captcha: that.bindFullPsdCaptcha
            },
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              'X-Authorization': 'Bearer ' + that.$store.state.token,
              "Content-Type": "application/json;charset=UTF-8",
            }
          }).then((res) => {
            this.showError(res.data.code, res.data.message);
            //console.log(res, '设置成功');
            if(res.data.code===200){
              that.$router.push('/settings');
            }
          }).catch((req) => {
            this.showError(req.code, req.message)
            //console.log(req, '设置失败')
          })
        }
      },
      getCodeyz(ev){

        let second = 60;
        let _this = this;
        let YZStyle = $("input[name='YZStyle']:checked").val();
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
          })
        } else {
          this.showError('', '请选择验证方式')
        }

      }
    },
    watch: {
      bindFullPsd() {
        let that = this;
        if (that.bindFullPsds) {
          if (that.bindFullPsd === that.bindFullPsds) {
            that.$store.state.bindFullPsd.fullPsds = true;
            $('.help-tips-bindFullPsds').html('');
          } else {
            that.$store.state.bindFullPsd.fullPsds = false;
            $('.help-tips-bindFullPsds').html('两次输入的密码不一致').css({
              alignSelf: 'flex-start',
              color: 'red'
            })
          }
        }
      },
      bindFullPsds(){
        let that = this;
        if (that.bindFullPsd) {
          if (that.bindFullPsd === that.bindFullPsds) {
            that.$store.state.bindFullPsd.fullPsds = true;
            $('.help-tips-bindFullPsds').html('');
          } else {
            that.$store.state.bindFullPsd.fullPsds = false;
            $('.help-tips-bindFullPsds').html('两次输入的密码不一致').css({
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
  .bindFullPsd {
    font-size: 1.167rem;
  }

  .bindFullPsd .bindFullPsd-title {
    border-bottom: 1px solid #ddd;
  }

  .bindFullPsd .bindFullPsd-title p {
    color: #666;
    padding: 1.3rem 0;
    font-size: 1.333rem;
  }

  .bindFullPsd-content {
    padding: 4rem 0;
    margin: 0 auto;
  }

  .bindFullPsd-group1 {
    display: flex;
    margin-bottom: 2rem;
  }

  .bindFullPsd-group1 > span {
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

  .bindFullBtn {
    width: 10.833rem;
    text-align: center;
    padding: .8rem 0;
    background: #01aaef;
    color: #fff;
    border-radius: .133rem;
  }

  .bindFullBtn1 {
    border: none !important;
  }
</style>
