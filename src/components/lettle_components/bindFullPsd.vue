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
          <input type="radio" name="YZStyle" id="email_style" value="1" class="YZStyle1"/><label
          for="email_style">邮箱验证</label>
          <input type="radio" name="YZStyle" id="phone_style" value="2" class="YZStyle1" checked/><label
          for="phone_style">短信验证</label>
        </div>
      </div>
      <div class="bindFullPsd-group1">
        <span>验证码</span>
        <div class="dyt">
          <div class="form-group-content">
            <input type="text" placeholder="验证码" v-model="bindFullPsdCaptcha"/>
            <button class="bindFullPsdGetCord">获取验证码</button>
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
        types: ''
      }
    },
    mounted() {
      let that = this;

//      密码强度检测
      {
        $('.bindFullPsd').keyup(function () {
          let N = /^\d+$/;
          let C = /^[a-zA-Z]+$/;
          let TC = /^[@#$%*,.^&]+$/;
          let N_C = /^(?!\d+$)(?![a-zA-Z]+$)[a-zA-Z\d]+$/;
          let C_TC = /^(?![a-zA-Z]+$)(?![@#$%*,.^&]+$)[a-zA-Z@#$%*,.^&]+$/;
          let N_TC = /^(?!\d+)(?![@#$%*,.^&]+$)[\d@#$%*,.^&]+$/;
          let N_C_TC = /^(?!\d+$)(?![a-zA-Z]+$)(?![@#$%*,.^&]+$)[\da-zA-Z@#$%*,.^&]+$/;
          if (that.bindFullPsd.length < 6) {
            that.$store.state.bindFullPsd.fullPsd = false;
            $('.password-strength span').css({
              background: '#cfd0d2'
            });
            $('.password-strength-view').html('');
            $('.help-tips-bindFullPsd').html('密码应该长度在6~22位之间').css({
              alignSelf: 'flex-start',
              color: 'red'
            })
          } else {
            $('.help-tips-bindFullPsd').html('');
            that.$store.state.bindFullPsd.fullPsd = true;
          }
//          纯数字
          if (N.test(that.bindFullPsd) && that.bindFullPsd.length >= 6) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: '#cfd0d2'});
            $('.password-strength span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('低').css({color: 'red'})
          }
//          纯字母
          else if (C.test(that.bindFullPsd) && that.bindFullPsd.length >= 6 && that.bindFullPsd.length <= 13) {
            $('.password-strength span').eq(0).css({
              background: 'red'
            });
            $('.password-strength-view').html('低').css({color: 'red'})
          }
          else if (C.test(that.bindFullPsd) && that.bindFullPsd.length > 13) {
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('中').css({color: 'yellow'})
          }
//          纯特殊字符
          else if (TC.test(that.bindFullPsd) && that.bindFullPsd.length >= 6 && that.bindFullPsd.length <= 13) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('中').css({color: 'yellow'});
          }
          else if (TC.test(that.bindFullPsd) && that.bindFullPsd.length > 13) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: 'green'});
            $('.password-strength-view').html('高').css({color: 'green'});
          }
//          字母加数字
          else if (N_C.test(that.bindFullPsd) && that.bindFullPsd.length >= 6 && that.bindFullPsd.length <= 12) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: '#cfd0d2'});
            $('.password-strength span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('低').css({color: 'red'})
          }
          else if (N_C.test(that.bindFullPsd) && that.bindFullPsd.length > 12) {
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('中').css({color: 'yellow'})
          }
//          字母加特殊字符
          else if (C_TC.test(that.bindFullPsd) && that.bindFullPsd.length >= 6 && that.bindFullPsd.length <= 10) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('中').css({color: 'yellow'});
          }
          else if (C_TC.test(that.bindFullPsd) && that.bindFullPsd.length > 10) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: 'green'});
            $('.password-strength-view').html('高').css({color: 'green'});
          }
//          数字加特殊字符
          else if (N_TC.test(that.bindFullPsd) && that.bindFullPsd.length >= 6 && that.bindFullPsd.length <= 11) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('中').css({color: 'yellow'});
          }
          else if (N_TC.test(that.bindFullPsd) && that.bindFullPsd.length > 11) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: 'green'});
            $('.password-strength-view').html('高').css({color: 'green'});
          }
//          数字加字母加特殊字符
          else if (N_C_TC.test(that.bindFullPsd) && that.bindFullPsd.length >= 6 && that.bindFullPsd.length <= 8) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('中').css({color: 'yellow'});
          }
          else if (N_C_TC.test(that.bindFullPsd) && that.bindFullPsd.length > 8) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: 'green'});
            $('.password-strength-view').html('高').css({color: 'green'});
          }
        });
      }
      //确认密码
      {
        $('.bindFullPsds').keyup(function () {
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
        });
      }
      //获取验证码
      {
        $('.bindFullPsdGetCord').click(function () {
          for (let i = 0; i < $('.YZStyle1').length; i++) {
            if ($('.YZStyle1').eq(i).is(":checked")) {
              that.radioIpt = $('.YZStyle1').eq(i).val();
              if (that.radioIpt == '1') {
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
            $('.bindFullPsdGetCord').attr("disabled", true).css("cursor", "default");
            that.timer = setInterval(function () {
              $('.bindFullPsdGetCord').html((--second) + 's');
              if (second === 0) {
                $('.bindFullPsdGetCord').removeAttr("disabled").css("cursor", "pointer");
                clearInterval(that.timer);
                $('.bindFullPsdGetCord').html('获取验证码');
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
      bindFullBtn() {
        let that = this;
        if (that.$store.state.bindFullPsd.fullPsd && that.$store.state.bindFullPsd.fullPsds && that.$store.state.bindFullPsd.YZCord) {
          that.$http({
            url: 'http://192.168.1.48:8089/fwex/web/authentication/capitPwd',
            method: 'POST',
            data: {
              password: that.bindFullPsd,
              confirmPwd: that.bindFullPsds,
              types: that.types,
              captcha:that.bindFullPsdCaptcha
            },
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              'X-Authorization': 'Bearer ' + that.$store.state.token,
              "Content-Type": "application/json;charset=UTF-8",
            }
          }).then((res)=>{
              console.log(res,'设置成功');
              that.$router.push('/settings');
          }).catch((req)=>{
              console.log(req,'设置失败')
          })
        }
      }
    },
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
