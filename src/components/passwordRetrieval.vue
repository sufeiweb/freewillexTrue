<template>
  <div class="retrieval">
    <div class="retrieval-box">
      <div class="retrieval-header">
        <span>找回密码</span>
        <a href="javascript:" v-if="retrieval_text" @click="retrieval_style()">邮箱找回</a>
        <a href="javascript:" v-if="!retrieval_text" @click="retrieval_style()">手机找回</a>
      </div>
      <div class="retrieval-from" v-show="retrieval_text">
        <form name="retrieval1">
          <div class="form-group1">
            <span>手机号码</span>
            <div class="form-group-content de">
              <input type="text" placeholder="手机" v-model="userNameM" class="userNameIptR" maxlength="11"/>
              <div class="phone-tishiR"></div>
            </div>
          </div>
          <div class="form-group1" style="display: none">
            <span>验证码</span>
            <div class="form-group1-box">
              <div class="form-group-content">
                <input type="text" placeholder="验证码"/>
                <a href="javascript:">获取验证码</a>
              </div>
              <div class="help-tips"></div>
            </div>
          </div>
          <div class="form-group1">
            <span>手机验证码</span>
            <div class="form-group1-box">
              <div class="form-group-content">
                <input type="text" placeholder="手机验证码" v-model="userCordM"/>
                <button href="javascript:" class="getCodeMR">获取验证码</button>
              </div>
              <div class="help-tips-getCodeMR"></div>
            </div>
          </div>
          <div class="form-group1">
            <span>密码</span>
            <div class="form-group-content de">
              <input type="password" placeholder="密码" v-model="userPsdM" class="userPsdMR"/>
              <div class="help-tips-psd"></div>
            </div>
            <p class="password-strength"><span></span><span></span><span></span><em
              class="password-strength-view"></em></p>
          </div>
          <div class="form-group1">
            <span>确认密码</span>
            <div class="form-group-content de">
              <input type="password" placeholder="确认密码" v-model="userPsdsM" class="userPsdsMR"/>
              <div class="help-tips-psdsMR"></div>
            </div>
          </div>
          <div class="form-group1 dd margin-bottom-0">
            <span> </span>
            <div class="form-group-content1">
              <input type="button" value="提交" class="retrieval-submit" @click="phoneRE()"/>
            </div>
          </div>
          <div class="form-group1 margin-bottom-0">
            <span> </span>
            <div class="form-group-content1">
              <span>已有帐号? </span>
              <router-link to="/login" class="go-login"> 直接登录</router-link>
            </div>
          </div>
        </form>
      </div>
      <div class="retrieval-from" v-show="!retrieval_text">
        <form name="retrieval1">
          <div class="form-group1">
            <span>邮箱</span>
            <div class="form-group-content de">
              <input type="text" placeholder="邮箱" v-model="userNameE" class="userNameEIptR"/>
              <div class="help-tips-userEmailR"></div>
            </div>
          </div>
          <div class="form-group1" style="display: none">
            <span>验证码</span>
            <div class="form-group1-box">
              <div class="form-group-content">
                <input type="text" placeholder="验证码"/>
                <a href="javascript:">获取验证码</a>
              </div>
              <div class="help-tips"></div>
            </div>
          </div>
          <div class="form-group1">
            <span>邮箱验证码</span>
            <div class="form-group1-box">
              <div class="form-group-content">
                <input type="text" placeholder="邮箱验证码" v-model="userCordE"/>
                <button href="javascript:" class="getCodeER">获取验证码</button>
              </div>
              <div class="help-tips-getCodeER"></div>
            </div>
          </div>
          <div class="form-group1">
            <span>密码</span>
            <div class="form-group-content de">
              <input type="password" placeholder="密码" v-model="userPsdE" class="userPsdER"/>
              <div class="help-tips-psdE"></div>
            </div>
            <p class="password-strengths"><span></span><span></span><span></span><em
              class="password-strength-views"></em></p>
          </div>
          <div class="form-group1">
            <span>确认密码</span>
            <div class="form-group-content de">
              <input type="password" placeholder="确认密码" v-model="userPsdsE" class="userPsdsER"/>
              <div class="help-tip-psdsER"></div>
            </div>
          </div>
          <div class="form-group1 dd margin-bottom-0">
            <span> </span>
            <div class="form-group-content1">
              <input type="button" value="提交" class="retrieval-submit" @click="emailRE()"/>
            </div>
          </div>
          <div class="form-group1 margin-bottom-0">
            <span> </span>
            <div class="form-group-content1">
              <span>已有帐号? </span>
              <router-link to="/login" class="go-login"> 直接登录</router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from "jquery";
  export default{
    data() {
      return {
        retrieval_text: true,
        userNameM: '',
        userNameE: '',
        userCordM: '',
        userCordE: '',
        userPsdM: '',
        userPsdE: '',
        userPsdsM: '',
        userPsdsE: '',
        timer: ''
      }
    },
    mounted() {
      //      手机号码正则验证
      {
        let that = this;
        $('.userNameIptR').keyup(function () {
          let pattern = /0?^(13|14|15|18|17)[0-9]{9}/;
          console.log(pattern.test(that.userNameM));
          if (!pattern.test(that.userNameM)) {
            that.$store.state.phoneR.username = false;
            $('.phone-tishiR').html('您输入的号码格式不正确').css({
              alignSelf: 'flex-start',
              color: 'red'
            });
          } else {
            that.$store.state.phoneR.username = true;
            $('.phone-tishiR').html('');
          }
        });

      }
      //邮箱正则验证
      {
        let that = this;
        $('.userNameEIptR').keyup(function () {
          let pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+(com|cn)$/;
          if (pattern.test(that.userNameE)) {
            $('.help-tips-userEmailR').html('');
            that.$store.state.emailR.username = true;
          } else {
            that.$store.state.emailR.username = false;
            $('.help-tips-userEmailR').html('您输入的邮箱格式不正确').css({
              alignSelf: 'flex-start',
              color: 'red'
            });
          }
        });
      }
//      密码强度检测
      {
        let that = this;
        $('.userPsdMR').keyup(function () {
          let N = /^\d+$/;
          let C = /^[a-zA-Z]+$/;
          let TC = /^[@#$%*,.^&]+$/;
          let N_C = /^(?!\d+$)(?![a-zA-Z]+$)[a-zA-Z\d]+$/;
          let C_TC = /^(?![a-zA-Z]+$)(?![@#$%*,.^&]+$)[a-zA-Z@#$%*,.^&]+$/;
          let N_TC = /^(?!\d+)(?![@#$%*,.^&]+$)[\d@#$%*,.^&]+$/;
          let N_C_TC = /^(?!\d+$)(?![a-zA-Z]+$)(?![@#$%*,.^&]+$)[\da-zA-Z@#$%*,.^&]+$/;
          if (that.userPsdM.length < 6) {
            that.$store.state.phoneR.userpsd = false;
            $('.password-strength span').css({
              background: '#cfd0d2'
            });
            $('.password-strength-view').html('');
            $('.help-tips-psd').html('密码应该长度在6~22位之间').css({
              alignSelf: 'flex-start',
              color: 'red'
            })
          } else {
            $('.help-tips-psd').html('');
            that.$store.state.phoneR.userpsd = true;
          }
//          纯数字
          if (N.test(that.userPsdM) && that.userPsdM.length >= 6) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: '#cfd0d2'});
            $('.password-strength span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('低').css({color: 'red'})
          }
//          纯字母
          else if (C.test(that.userPsdM) && that.userPsdM.length >= 6 && that.userPsdM.length <= 13) {
            $('.password-strength span').eq(0).css({
              background: 'red'
            });
            $('.password-strength-view').html('低').css({color: 'red'})
          }
          else if (C.test(that.userPsdM) && that.userPsdM.length > 13) {
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('中').css({color: 'yellow'})
          }
//          纯特殊字符
          else if (TC.test(that.userPsdM) && that.userPsdM.length >= 6 && that.userPsdM.length <= 13) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('中').css({color: 'yellow'});
          }
          else if (TC.test(that.userPsdM) && that.userPsdM.length > 13) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: 'green'});
            $('.password-strength-view').html('高').css({color: 'green'});
          }
//          字母加数字
          else if (N_C.test(that.userPsdM) && that.userPsdM.length >= 6 && that.userPsdM.length <= 12) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: '#cfd0d2'});
            $('.password-strength span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('低').css({color: 'red'})
          }
          else if (N_C.test(that.userPsdM) && that.userPsdM.length > 12) {
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('中').css({color: 'yellow'})
          }
//          字母加特殊字符
          else if (C_TC.test(that.userPsdM) && that.userPsdM.length >= 6 && that.userPsdM.length <= 10) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('中').css({color: 'yellow'});
          }
          else if (C_TC.test(that.userPsdM) && that.userPsdM.length > 10) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: 'green'});
            $('.password-strength-view').html('高').css({color: 'green'});
          }
//          数字加特殊字符
          else if (N_TC.test(that.userPsdM) && that.userPsdM.length >= 6 && that.userPsdM.length <= 11) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('中').css({color: 'yellow'});
          }
          else if (N_TC.test(that.userPsdM) && that.userPsdM.length > 11) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: 'green'});
            $('.password-strength-view').html('高').css({color: 'green'});
          }
//          数字加字母加特殊字符
          else if (N_C_TC.test(that.userPsdM) && that.userPsdM.length >= 6 && that.userPsdM.length <= 8) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('中').css({color: 'yellow'});
          }
          else if (N_C_TC.test(that.userPsdM) && that.userPsdM.length > 8) {
            $('.password-strength span').eq(0).css({background: 'red'});
            $('.password-strength span').eq(1).css({background: 'yellow'});
            $('.password-strength span').eq(2).css({background: 'green'});
            $('.password-strength-view').html('高').css({color: 'green'});
          }
        });
        $('.userPsdER').keyup(function () {
          let N = /^\d+$/;
          let C = /^[a-zA-Z]+$/;
          let TC = /^[@#$%*,.^&]+$/;
          let N_C = /^(?!\d+$)(?![a-zA-Z]+$)[a-zA-Z\d]+$/;
          let C_TC = /^(?![a-zA-Z]+$)(?![@#$%*,.^&]+$)[a-zA-Z@#$%*,.^&]+$/;
          let N_TC = /^(?!\d+)(?![@#$%*,.^&]+$)[\d@#$%*,.^&]+$/;
          let N_C_TC = /^(?!\d+$)(?![a-zA-Z]+$)(?![@#$%*,.^&]+$)[\da-zA-Z@#$%*,.^&]+$/;
          if (that.userPsdE.length < 6) {
            that.$store.state.emailR.userpsd = false;
            $('.password-strengths span').css({
              background: '#cfd0d2'
            });
            $('.password-strength-views').html('');
            $('.help-tips-psdE').html('密码应该长度在6~22位之间').css({
              alignSelf: 'flex-start',
              color: 'red'
            })
          } else {
            that.$store.state.emailR.userpsd = true;
            $('.help-tips-psdE').html('');
          }
//          纯数字
          if (N.test(that.userPsdE) && that.userPsdE.length >= 6) {
            $('.password-strengths span').eq(0).css({background: 'red'});
            $('.password-strengths span').eq(1).css({background: '#cfd0d2'});
            $('.password-strengths span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-views').html('低').css({color: 'red'})
          }
//          纯字母
          else if (C.test(that.userPsdE) && that.userPsdE.length >= 6 && that.userPsdE.length <= 13) {
            $('.password-strengths span').eq(0).css({
              background: 'red'
            });
            $('.password-strength-views').html('低').css({color: 'red'})
          }
          else if (C.test(that.userPsdE) && that.userPsdE.length > 13) {
            $('.password-strengths span').eq(1).css({background: 'yellow'});
            $('.password-strengths span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-views').html('中').css({color: 'yellow'})
          }
//          纯特殊字符
          else if (TC.test(that.userPsdE) && that.userPsdE.length >= 6 && that.userPsdE.length <= 13) {
            $('.password-strengths span').eq(0).css({background: 'red'});
            $('.password-strengths span').eq(1).css({background: 'yellow'});
            $('.password-strengths span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-views').html('中').css({color: 'yellow'});
          }
          else if (TC.test(that.userPsdE) && that.userPsdE.length > 13) {
            $('.password-strengths span').eq(0).css({background: 'red'});
            $('.password-strengths span').eq(1).css({background: 'yellow'});
            $('.password-strengths span').eq(2).css({background: 'green'});
            $('.password-strength-views').html('高').css({color: 'green'});
          }
//          字母加数字
          else if (N_C.test(that.userPsdE) && that.userPsdE.length >= 6 && that.userPsdE.length <= 12) {
            $('.password-strengths span').eq(0).css({background: 'red'});
            $('.password-strengths span').eq(1).css({background: '#cfd0d2'});
            $('.password-strengths span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-views').html('低').css({color: 'red'})
          }
          else if (N_C.test(that.userPsdE) && that.userPsdE.length > 12) {
            $('.password-strengths span').eq(1).css({background: 'yellow'});
            $('.password-strengths span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-views').html('中').css({color: 'yellow'})
          }
//          字母加特殊字符
          else if (C_TC.test(that.userPsdE) && that.userPsdE.length >= 6 && that.userPsdE.length <= 10) {
            $('.password-strengths span').eq(0).css({background: 'red'});
            $('.password-strengths span').eq(1).css({background: 'yellow'});
            $('.password-strengths span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-views').html('中').css({color: 'yellow'});
          }
          else if (C_TC.test(that.userPsdE) && that.userPsdE.length > 10) {
            $('.password-strengths span').eq(0).css({background: 'red'});
            $('.password-strengths span').eq(1).css({background: 'yellow'});
            $('.password-strengths span').eq(2).css({background: 'green'});
            $('.password-strength-view').html('高').css({color: 'green'});
          }
//          数字加特殊字符
          else if (N_TC.test(that.userPsdE) && that.userPsdE.length >= 6 && that.userPsdE.length <= 11) {
            $('.password-strengths span').eq(0).css({background: 'red'});
            $('.password-strengths span').eq(1).css({background: 'yellow'});
            $('.password-strengths span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('中').css({color: 'yellow'});
          }
          else if (N_TC.test(that.userPsdE) && that.userPsdE.length > 11) {
            $('.password-strengths span').eq(0).css({background: 'red'});
            $('.password-strengths span').eq(1).css({background: 'yellow'});
            $('.password-strengths span').eq(2).css({background: 'green'});
            $('.password-strength-views').html('高').css({color: 'green'});
          }
//          数字加字母加特殊字符
          else if (N_C_TC.test(that.userPsdE) && that.userPsdE.length >= 6 && that.userPsdE.length <= 8) {
            $('.password-strengths span').eq(0).css({background: 'red'});
            $('.password-strengths span').eq(1).css({background: 'yellow'});
            $('.password-strengths span').eq(2).css({background: '#cfd0d2'});
            $('.password-strength-view').html('中').css({color: 'yellow'});
          }
          else if (N_C_TC.test(that.userPsdE) && that.userPsdE.length > 8) {
            $('.password-strengths span').eq(0).css({background: 'red'});
            $('.password-strengths span').eq(1).css({background: 'yellow'});
            $('.password-strengths span').eq(2).css({background: 'green'});
            $('.password-strength-views').html('高').css({color: 'green'});
          }
        });

      }
      //确认密码
      {
        let that = this;
        $('.userPsdsMR').keyup(function () {
          if (that.userPsdM === that.userPsdsM) {
            that.$store.state.phoneR.userpsds = true;
            $('.help-tips-psdsMR').html('');
          } else {
            that.$store.state.phoneR.userpsds = false;
            $('.help-tips-psdsMR').html('两次输入的密码不一致').css({
              alignSelf: 'flex-start',
              color: 'red'
            })
          }
        });
        $('.userPsdsER').keyup(function () {
          if (that.userPsdE === that.userPsdsE) {
            $('.help-tip-psdsER').html('');
            that.$store.state.emailR.userpsds = true;
          } else {
            that.$store.state.emailR.userpsds = false;
            $('.help-tip-psdsER').html('两次输入的密码不一致').css({
              alignSelf: 'flex-start',
              color: 'red'
            })
          }
        });

      }
      //获取验证码
      {
        let that = this;
        $('.getCodeMR').click(function () {
          let second = 60;
          let pattern = /0?^(13|14|15|18|17)[0-9]{9}/;
          let url = 'http://192.168.1.48:8089/fwex/web/captcha/mobile/' + that.userNameM;
          if (that.userNameM.length !== 0 && pattern.test(that.userNameM)) {
            that.$http.get(url).then((data) => {
              console.log(data);
              $('.getCodeMR').attr("disabled", true).css("cursor", "default");
              that.timer = setInterval(function () {
                $('.getCodeMR').html((--second) + 's');
                if (second === 0) {
                  $('.getCodeMR').removeAttr("disabled").css("cursor", "pointer");
                  clearInterval(that.timer);
                  $('.getCodeMR').html('获取验证码');
                }
              }, 1000);
              $('.help-tips-getCodeMR').html('请输入验证码').css({
                alignSelf: 'flex-start',
                color: 'red',
                marginLeft: '1.5rem'
              })
            }).catch((error) => {
            })
          } else {
            $('.help-tips-getCodeMR').html('请核对手机号').css({
              alignSelf: 'flex-start',
              color: 'red',
              marginLeft: '1.5rem'
            })
          }
        });
        $('.getCodeER').click(function () {
          let second = 60;
          let pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+(com|cn)$/;
          let url = 'http://192.168.1.48:8089/fwex/web/captcha/email/' + that.userNameE;
          if (that.userNameE.length !== 0 && pattern.test(that.userNameE)) {
            that.$http.get(url).then((data) => {
              console.log(data);
              $('.getCodeER').attr("disabled", true).css("cursor", "default");
              that.timer = setInterval(function () {
                $('.getCodeER').html((--second) + 's');
                if (second === 0) {
                  $('.getCodeER').removeAttr("disabled").css("cursor", "pointer");
                  clearInterval(that.timer);
                  $('.getCodeER').html('获取验证码');
                }
              }, 1000);
              $('.help-tips-getCodeER').html('请输入验证码').css({
                alignSelf: 'flex-start',
                color: 'red',
                marginLeft: '1.5rem'
              });
            }).catch((error) => {
            })
          } else {
            $('.help-tips-getCodeER').html('请核对邮箱').css({
              alignSelf: 'flex-start',
              color: 'red',
              marginLeft: '1.5rem'
            })
          }
        });
      }
    },
    methods: {
      retrieval_style() {
        this.retrieval_text = !this.retrieval_text;
      },
      phoneRE() {
        let that = this;
        console.log(that.$store.state.phoneR.username, "username");
        console.log(that.$store.state.phoneR.usercord, "usercord");
        console.log(that.$store.state.phoneR.userpsd, "userpsd");
        console.log(that.$store.state.phoneR.userpsds, "userPsds");
        if (that.$store.state.phoneR.username && that.$store.state.phoneR.usercord && that.$store.state.phoneR.userpsd && that.$store.state.phoneR.userpsds) {
          that.$http({
            url: 'http://192.168.1.48:8089/fwex/web/forget/password',
            method: 'POST',
            data: {
              moe: that.userNameM,
              captcha: that.userCordM,
              password: that.userPsdM,
              cfpassword: that.userPsdsM
            },
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              "Content-Type": "application/json;charset=UTF-8",
            }
          }).then((res) => {
            this.showError(res.data.code, res.data.message);
            if (res.data.code === 200) {
              this.$router.push('/login');
            }
          }).catch((req) => {
            console.log(req, 22222)
          })
        }
      },//手机找回密码js
      emailRE() {
        let that = this;
        if (that.$store.state.emailR.username && that.$store.state.emailR.usercord && that.$store.state.emailR.userpsd && that.$store.state.emailR.userpsds) {
          that.$http({
            url: 'http://192.168.1.48:8089/fwex/web/forget/password',
            method: 'POST',
            data: {
              moe: that.userNameE,
              captcha: that.userCordE,
              password: that.userPsdE,
              cfpassword: that.userPsdsE
            },
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              "Content-Type": "application/json;charset=UTF-8",
            }
          }).then((res) => {
            this.showError(res.data.code, res.data.message);
            if (res.data.code) {
              this.$router.push('/login');
            }
            console.log(res, 11111)
          }).catch((req) => {
            console.log(req, 22222)
          })
        }
      },//邮箱找回密码js
    }
  }
</script>
<style scoped>
  .country-name > p {
    display: flex;
    align-items: center;
  }

  .retrieval-box {
    width: 64rem;
    margin: 2rem auto;
    padding: 1rem 1.667rem 1.25rem 1.667rem;
    background: #fff;
  }

  .retrieval-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.333rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #eee;
    min-height: 4rem;
  }

  .retrieval-header > a {
    color: #01aaef;
    font-size: 1.167rem;
  }

  .retrieval-from {
    margin-top: 3.33rem;
  }

  .form-group1 {
    display: flex;
    margin-bottom: 2rem;
  }

  .form-group1 > span {
    width: 13.33rem;
    padding: 1rem 1.25rem 0 1.25rem;
    font-weight: 400;
    font-size: 1.167rem;
    text-align: right;
  }

  .form-group1-box {
    width: 50%;
  }

  .form-group1-box .form-group-content {
    width: 100%;
  }

  .form-group1-box .form-group-content button {
    background: #01aaef;
    color: #fff;
    height: 3.167rem;
    width: 14rem;
    text-align: center;
    line-height: 3.167rem;
    font-size: 1.167rem;
    border: none;
    outline: none;
    cursor: pointer;
  }

  .form-group-content {
    width: 50%;
    display: flex;
    align-items: center;
    margin: 0 1.25rem;
    border: 1px solid #e5e5e5;
    background: #fff;
  }

  .form-group-content > input {
    padding: 0.667rem 1rem;
    border: 0;
    outline: none;
    width: 100%;
    height: 1.833rem;
  }

  .area-code {
    width: 3.333rem;
    margin-left: 0.667rem;
    border-right: 1px solid #e5e5e5;
    line-height: 3.167rem;
  }

  .form-group-content .help-tips {
    width: 100%;
    height: 1.5rem;
  }

  .de {
    border: none;
    flex-direction: column;
  }

  .de input {
    border: 1px solid #e5e5e5;
    width: 93.8%;
  }

  .form-group-content1 {
    display: flex;
    align-items: center;
    width: 50%;
    margin: 0 1.25rem;
    font-size: 1.167rem;
  }

  .form-group-content1 label {
    display: flex;
    align-items: center;
  }

  .form-group-content1 label a {
    font-size: 1.167rem;
    color: #5b9bd1;
  }

  .form-group-content1 label a:hover {
    color: #3175af;
    text-decoration: underline;
  }

  .retrieval-submit {
    width: 100%;
    padding: 0.667rem 1rem;
    border: none;
    color: #FFFFFF;
    background: #01aaef;
    font-size: 1.167rem;
    outline: none;
    cursor: pointer;
    margin-top: 1.8rem;
    margin-bottom: .8rem;
  }

  .retrieval-submit:hover {
    background: #0186bc;
  }

  .form-group-content1 .go-login {
    margin: 0 .7rem;
    color: #5b9bd1;
  }

  .form-group-content1 .go-login:hover {
    color: #3175af;
    text-decoration: underline;
  }

  .dd {
    border-top: 1px solid #eee;
    margin-top: 1.5rem;
  }

  .margin-bottom-0 {
    margin-bottom: 0;
  }

  .password-strength, .password-strengths {
    display: flex;
    margin-top: -1.5rem;
    align-items: center;

  }

  .password-strength span, .password-strengths span {
    width: 3rem;
    height: 1rem;
    margin-right: .8rem;
    background: #e9ecf3;
  }

  .password-strength-view, .password-strength-views {
    color: red;
  }
</style>
