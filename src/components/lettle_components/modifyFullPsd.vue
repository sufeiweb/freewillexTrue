<template>
  <div class="modifyFullPsd">
    <div class="modifyFullPsd-title">
      <p>修改资金密码</p>
    </div>
    <div class="modifyFullPsd-content">
      <div class="modifyFullPsd-group1">
        <span>新密码</span>
        <div class="form-group-content de">
          <input type="password" placeholder="密码" v-model="modifyFullPsd" class="modifyFullpsd"/>
          <div class="help-tips-modifyFullPsd"></div>
        </div>
        <p class="password-strength"><span></span><span></span><span></span><em
          class="password-strength-view"></em></p>
      </div>
      <div class="modifyFullPsd-group1">
        <span>确认密码</span>
        <div class="form-group-content de">
          <input type="password" placeholder="确认密码" v-model="modifyFullPsds" class="modifyFullPsds"/>
          <div class="help-tips-modifyFullPsds"></div>
        </div>
      </div>
      <div class="modifyFullPsd-group1">
        <span>验证方式</span>
        <div class="form-group-content1">
          <input type="radio" name="YZStyle11" id="email_style11" value="3" class="YZStyle111"/><label
          for="email_style11">邮箱验证</label>
          <input type="radio" name="YZStyle11" id="phone_style11" value="4" class="YZStyle111" checked/><label
          for="phone_style11">短信验证</label>
        </div>
      </div>
      <div class="modifyFullPsd-group1">
        <span>验证码</span>
        <div class="dyt">
          <div class="form-group-content">
            <input type="text" placeholder="验证码" v-model="modifyFullPsdCaptcha"/>
            <button class="modifyFullPsdGetCord">获取验证码</button>
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
        OldmodifyFullPsd: '',
        modifyFullPsd: '',
        modifyFullPsds: '',
        modifyFullPsdCaptcha: '',
        radioIpt: '',
        types: ''
      }
    },
    mounted() {
      let that = this;
//      密码强度检测
      {
        $('.modifyFullpsd').keyup(function () {
          let N = /^\d+$/;
          let C = /^[a-zA-Z]+$/;
          let TC = /^[@#$%*,.^&]+$/;
          let N_C = /^(?!\d+$)(?![a-zA-Z]+$)[a-zA-Z\d]+$/;
          let C_TC = /^(?![a-zA-Z]+$)(?![@#$%*,.^&]+$)[a-zA-Z@#$%*,.^&]+$/;
          let N_TC = /^(?!\d+)(?![@#$%*,.^&]+$)[\d@#$%*,.^&]+$/;
          let N_C_TC = /^(?!\d+$)(?![a-zA-Z]+$)(?![@#$%*,.^&]+$)[\da-zA-Z@#$%*,.^&]+$/;
          if (that.modifyFullPsd.length < 6) {
            that.$store.state.modifyFullPsd.newPsd = false;
            $('.password-strength span').css({
              background: '#cfd0d2'
            });
            $('.password-strength-view').html('');
            $('.help-tips-modifyFullPsd').html('密码应该长度在6~22位之间').css({
              alignSelf: 'flex-start',
              color: 'red'
            })
          } else {
            $('.help-tips-modifyFullPsd').html('');
            that.$store.state.modifyFullPsd.newPsd = true;
          }
//          纯数字
          if (N.test(that.modifyFullPsd) && that.modifyFullPsd.length >= 6) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: '#cfd0d2'});
            $('.password-strength span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('低').css({color: 'red'})
          }
//          纯字母
          else if (C.test(that.modifyFullPsd) && that.modifyFullPsd.length >= 6 && that.modifyFullPsd.length <= 13) {
            $('.password-strength span').eq(0).css({
              background: 'red'
            });
            $('.password-strength-view').html('低').css({color: 'red'})
          }
          else if (C.test(that.modifyFullPsd) && that.modifyFullPsd.length > 13) {
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('中').css({color: 'yellow'})
          }
//          纯特殊字符
          else if (TC.test(that.modifyFullPsd) && that.modifyFullPsd.length >= 6 && that.modifyFullPsd.length <= 13) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('中').css({color: 'yellow'});
          }
          else if (TC.test(that.modifyFullPsd) && that.modifyFullPsd.length > 13) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: 'green'});
            $('.password-strength-view').html('高').css({color: 'green'});
          }
//          字母加数字
          else if (N_C.test(that.modifyFullPsd) && that.modifyFullPsd.length >= 6 && that.modifyFullPsd.length <= 12) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: '#cfd0d2'});
            $('.password-strength span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('低').css({color: 'red'})
          }
          else if (N_C.test(that.modifyFullPsd) && that.modifyFullPsd.length > 12) {
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('中').css({color: 'yellow'})
          }
//          字母加特殊字符
          else if (C_TC.test(that.modifyFullPsd) && that.modifyFullPsd.length >= 6 && that.modifyFullPsd.length <= 10) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('中').css({color: 'yellow'});
          }
          else if (C_TC.test(that.modifyFullPsd) && that.modifyFullPsd.length > 10) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: 'green'});
            $('.password-strength-view').html('高').css({color: 'green'});
          }
//          数字加特殊字符
          else if (N_TC.test(that.modifyFullPsd) && that.modifyFullPsd.length >= 6 && that.modifyFullPsd.length <= 11) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('中').css({color: 'yellow'});
          }
          else if (N_TC.test(that.modifyFullPsd) && that.modifyFullPsd.length > 11) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: 'green'});
            $('.password-strength-view').html('高').css({color: 'green'});
          }
//          数字加字母加特殊字符
          else if (N_C_TC.test(that.modifyFullPsd) && that.modifyFullPsd.length >= 6 && that.modifyFullPsd.length <= 8) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('中').css({color: 'yellow'});
          }
          else if (N_C_TC.test(that.modifyFullPsd) && that.modifyFullPsd.length > 8) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: 'green'});
            $('.password-strength-view').html('高').css({color: 'green'});
          }
        });
      }
      //确认密码
      {
        $('.modifyFullPsds').keyup(function () {
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
        });
      }
      //获取验证码
      {
        $('.modifyFullPsdGetCord').click(function () {
          for (let i = 0; i < $('.YZStyle111').length; i++) {
            if ($('.YZStyle111').eq(i).is(":checked")) {
              that.radioIpt = $('.YZStyle111').eq(i).val();
              if (that.radioIpt == '3') {
                that.types = 'email';
              } else {
                that.types = 'mobile';
              }
            }
          }
          let second = 60;
          let url;
          if (that.radioIpt == 1) {
            url = 'http://192.168.1.48:8089/fwex/web/captcha/email'
          } else {
            url = 'http://192.168.1.48:8089/fwex/web/captcha/mobile'
          }
          that.$http({
            url: url,
            method: 'GET',
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              'X-Authorization': 'Bearer ' + that.$store.state.token
            }
          }).then((data) => {
            console.log(data);
            $('.modifyFullPsdGetCord').attr("disabled", true).css("cursor", "default");
            that.timer = setInterval(function () {
              $('.modifyFullPsdGetCord').html((--second) + 's');
              if (second === 0) {
                $('.modifyFullPsdGetCord').removeAttr("disabled").css("cursor", "pointer");
                clearInterval(that.timer);
                $('.modifyFullPsdGetCord').html('获取验证码');
              }
            }, 1000);
            $('.form-group-content-tips').html('请输入验证码').css({
              alignSelf: 'flex-start',
              color: 'red',
              marginLeft: '1.5rem'
            })
          }).catch((error) => {
            console.log(error);
          })
        });
      }
    },
    methods: {
      modifyFullPsdBtn() {
        let that = this;
        console.log(that.$store.state.modifyFullPsd.oldPsd);
        console.log(that.$store.state.modifyFullPsd.newPsd);
        console.log(that.$store.state.modifyFullPsd.newPsds);
        console.log(that.$store.state.modifyFullPsd.YZCord);
        if (that.$store.state.modifyFullPsd.newPsd && that.$store.state.modifyFullPsd.newPsds && that.$store.state.modifyFullPsd.YZCord) {
          that.$http({
            url: 'http://192.168.1.48:8089/fwex/web/account/updatePwd',
            method: 'POST',
            data: {
              password: that.modifyFullPsd,
              confirmPwd: that.modifyFullPsds,
              types: that.types,
              captcha: that.modifyFullPsdCaptcha
            },
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              'X-Authorization': 'Bearer ' + that.$store.state.token,
              "Content-Type": "application/json;charset=UTF-8",
            }
          }).then((res)=> {
            this.showError(res.data.code, res.data.message);
            console.log(res, '设置成功');
            that.$router.push('/settings');
          }).catch((req) => {
            console.log(req, '设置失败')
          })
        }
      }
    },
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
