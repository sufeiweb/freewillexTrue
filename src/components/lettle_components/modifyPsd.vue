<template>
  <div class="modifyPsd">
    <div class="modifyPsd-title">
      <p>修改登录密码</p>
    </div>
    <div class="modifyPsd-content">
      <div class="modifyPsd-group1">
        <span>原密码</span>
        <div class="form-group-content de">
          <input type="password" placeholder="原始密码" v-model="OldModifyPsd" class="OldModifyPsd"/>
          <div class="help-tips-OldModifyPsd"></div>
        </div>
      </div>
      <div class="modifyPsd-group1">
        <span>新密码</span>
        <div class="form-group-content de">
          <input type="password" placeholder="密码" v-model="modifyPsd" class="modifypsd"/>
          <div class="help-tips-modifyPsd"></div>
        </div>
        <p class="password-strength"><span></span><span></span><span></span><em
          class="password-strength-view"></em></p>
      </div>
      <div class="modifyPsd-group1">
        <span>确认密码</span>
        <div class="form-group-content de">
          <input type="password" placeholder="确认密码" v-model="modifyPsds" class="modifyPsds"/>
          <div class="help-tips-modifyPsds"></div>
        </div>
      </div>
      <div class="modifyPsd-group1">
        <span>验证方式</span>
        <div class="form-group-content1">
          <input type="radio" name="YZStyle1" id="email_style1" value="3" class="YZStyle11"/><label
          for="email_style1">邮箱验证</label>
          <input type="radio" name="YZStyle1" id="phone_style1" value="4" class="YZStyle11" checked/><label
          for="phone_style1">短信验证</label>
        </div>
      </div>
      <div class="modifyPsd-group1">
        <span>验证码</span>
        <div class="dyt">
          <div class="form-group-content">
            <input type="text" placeholder="验证码" v-model="modifyPsdCaptcha"/>
            <button class="modifyPsdGetCord">获取验证码</button>
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
        OldModifyPsd: '',
        modifyPsd: '',
        modifyPsds: '',
        modifyPsdCaptcha: '',
        radioIpt: '',
        types: ''
      }
    },
    mounted() {
      let that = this;
      {
        if (that.OldModifyPsd) {
          that.$store.state.modifyPsd.oldPsd = true;
        } else {
          that.$store.state.modifyPsd.oldPsd = false;
        }
        $('.OldModifyPsd').keyup(function () {
          if (that.OldModifyPsd) {
            that.$store.state.modifyPsd.oldPsd = true;
          } else {
            that.$store.state.modifyPsd.oldPsd = false;
          }
        })
      }
//      密码强度检测
      {
        $('.modifypsd').keyup(function () {
          let N = /^\d+$/;
          let C = /^[a-zA-Z]+$/;
          let TC = /^[@#$%*,.^&]+$/;
          let N_C = /^(?!\d+$)(?![a-zA-Z]+$)[a-zA-Z\d]+$/;
          let C_TC = /^(?![a-zA-Z]+$)(?![@#$%*,.^&]+$)[a-zA-Z@#$%*,.^&]+$/;
          let N_TC = /^(?!\d+)(?![@#$%*,.^&]+$)[\d@#$%*,.^&]+$/;
          let N_C_TC = /^(?!\d+$)(?![a-zA-Z]+$)(?![@#$%*,.^&]+$)[\da-zA-Z@#$%*,.^&]+$/;
          if (that.modifyPsd.length < 6) {
            that.$store.state.modifyPsd.newPsd = false;
            $('.password-strength span').css({
              background: '#cfd0d2'
            });
            $('.password-strength-view').html('');
            $('.help-tips-modifyPsd').html('密码应该长度在6~22位之间').css({
              alignSelf: 'flex-start',
              color: 'red'
            })
          } else {
            if (that.modifyPsd == that.OldModifyPsd) {
              that.$store.state.modifyPsd.newPsd = false;
              $('.help-tips-modifyPsd').html('与原密码相同').css({
                alignSelf: 'flex-start',
                color: 'red'
              })
            } else {
              $('.help-tips-modifyPsd').html('');
              that.$store.state.modifyPsd.newPsd = true;
            }
          }
//          纯数字
          if (N.test(that.modifyPsd) && that.modifyPsd.length >= 6) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: '#cfd0d2'});
            $('.password-strength span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('低').css({color: 'red'})
          }
//          纯字母
          else if (C.test(that.modifyPsd) && that.modifyPsd.length >= 6 && that.modifyPsd.length <= 13) {
            $('.password-strength span').eq(0).css({
              background: 'red'
            });
            $('.password-strength-view').html('低').css({color: 'red'})
          }
          else if (C.test(that.modifyPsd) && that.modifyPsd.length > 13) {
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('中').css({color: 'yellow'})
          }
//          纯特殊字符
          else if (TC.test(that.modifyPsd) && that.modifyPsd.length >= 6 && that.modifyPsd.length <= 13) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('中').css({color: 'yellow'});
          }
          else if (TC.test(that.modifyPsd) && that.modifyPsd.length > 13) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: 'green'});
            $('.password-strength-view').html('高').css({color: 'green'});
          }
//          字母加数字
          else if (N_C.test(that.modifyPsd) && that.modifyPsd.length >= 6 && that.modifyPsd.length <= 12) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: '#cfd0d2'});
            $('.password-strength span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('低').css({color: 'red'})
          }
          else if (N_C.test(that.modifyPsd) && that.modifyPsd.length > 12) {
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('中').css({color: 'yellow'})
          }
//          字母加特殊字符
          else if (C_TC.test(that.modifyPsd) && that.modifyPsd.length >= 6 && that.modifyPsd.length <= 10) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('中').css({color: 'yellow'});
          }
          else if (C_TC.test(that.modifyPsd) && that.modifyPsd.length > 10) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: 'green'});
            $('.password-strength-view').html('高').css({color: 'green'});
          }
//          数字加特殊字符
          else if (N_TC.test(that.modifyPsd) && that.modifyPsd.length >= 6 && that.modifyPsd.length <= 11) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('中').css({color: 'yellow'});
          }
          else if (N_TC.test(that.modifyPsd) && that.modifyPsd.length > 11) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: 'green'});
            $('.password-strength-view').html('高').css({color: 'green'});
          }
//          数字加字母加特殊字符
          else if (N_C_TC.test(that.modifyPsd) && that.modifyPsd.length >= 6 && that.modifyPsd.length <= 8) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('中').css({color: 'yellow'});
          }
          else if (N_C_TC.test(that.modifyPsd) && that.modifyPsd.length > 8) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: 'green'});
            $('.password-strength-view').html('高').css({color: 'green'});
          }
        });
      }
      //确认密码
      {
        $('.modifyPsds').keyup(function () {
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
        });
      }
      //获取验证码
      {
        $('.modifyPsdGetCord').click(function () {
          for (let i = 0; i < $('.YZStyle11').length; i++) {
            if ($('.YZStyle11').eq(i).is(":checked")) {
              that.radioIpt = $('.YZStyle11').eq(i).val();
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
              'X-Authorization': 'Bearer ' + that.$store.state.token,
            }
          }).then((data) => {
            this.showError(data.data.code, data.data.message);
            if(data.data.code===200){
              $('.modifyPsdGetCord').attr("disabled", true).css("cursor", "default");
              that.timer = setInterval(function () {
                $('.modifyPsdGetCord').html((--second) + 's');
                if (second === 0) {
                  $('.modifyPsdGetCord').removeAttr("disabled").css("cursor", "pointer");
                  clearInterval(that.timer);
                  $('.modifyPsdGetCord').html('获取验证码');
                }
              }, 1000);
              $('.form-group-content-tips').html('请输入验证码').css({
                alignSelf: 'flex-start',
                color: 'red',
                marginLeft: '1.5rem'
              })
            }
          }).catch((req) => {
            this.showError(req.state, req.message)
          })
        });
      }
    },
    methods: {
      modifyPsdBtn() {
        let that = this;
        //console.log(that.$store.state.modifyPsd.oldPsd);
        //console.log(that.$store.state.modifyPsd.newPsd);
        //console.log(that.$store.state.modifyPsd.newPsds);
        //console.log(that.$store.state.modifyPsd.YZCord);
        if (that.$store.state.modifyPsd.oldPsd && that.$store.state.modifyPsd.newPsd && that.$store.state.modifyPsd.newPsds && that.$store.state.modifyPsd.YZCord) {
          that.$http({
            url: 'http://192.168.1.48:8089/fwex/web/account/updatePwd',
            method: 'POST',
            data: {
              password: that.modifyPsd,
              confirmPwd: that.modifyPsds,
              types: that.types,
              captcha: that.modifyPsdCaptcha
            },
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              'X-Authorization': 'Bearer ' + that.$store.state.token,
              "Content-Type": "application/json;charset=UTF-8",
            }
          }).then((res)=> {
            this.showError(res.data.code, res.data.message);
            //console.log(res, '设置成功');
            that.$router.push('/login');
            that.$store.state.token = '';
          }).catch((req)=> { this.showError(req.state,req.message)
            //console.log(req, '设置失败')
          })
        }
      }
    },
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
