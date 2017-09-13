<template>
  <div class="register">
    <div class="register-box">
      <div class="register-header">
        <span>注册</span>
        <a href="javascript:" v-if="register_text" @click="register_style()">使用邮箱注册</a>
        <a href="javascript:" v-if="!register_text" @click="register_style()">使用手机注册</a>
      </div>
      <div class="register-from" v-show="register_text">
        <form name="register1">
          <div class="form-group1">
            <span>
              国家/地区
            </span>
            <div class="form-group-content">
              <el-select v-model="value8" filterable placeholder="请选择/输入搜索" class="form-group-content-select" disabled>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  class="form-group-content-option">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="form-group1">
            <span>邀请码</span>
            <div class="form-group-content de">
              <input type="text" placeholder="邀请码" v-model="recommendCodeNew" minlength="6" maxlength="6"
                     class="recommendCodeNewNUm"/>
              <div style="align-self: flex-start">没有邀请码可不填</div>
            </div>
          </div>
          <div class="form-group1" style="align-items: center">
            <span>手机号码</span>
            <div class="form-group-content">
              <span class="area-code">+86</span>
              <input type="text" placeholder="手机" v-model="userNameM" class="userNameIpt"
                     onkeyup="this.value=this.value.replace(/\D/g,'')"
                     onafterpaste="this.value=this.value.replace(/\D/g,'')" maxlength="11"/>
            </div>
            <em class="phone-tishi"></em>
          </div>
          <div class="form-group1">
            <span>密码</span>
            <div class="form-group-content de">
              <input type="password" placeholder="密码" v-model="userPasswordM" minlength="6" maxlength="32"
                     class="userPsd"/>
              <div class="help-tips-psd"></div>
            </div>
            <p class="password-strength"><span></span><span></span><span></span><em
              class="password-strength-view"></em></p>
          </div>
          <div class="form-group1">
            <span>确认密码</span>
            <div class="form-group-content de">
              <input type="password" placeholder="确认密码" v-model="userPasswordsM" class="userPsds" minlength="6"
                     maxlength="32"/>
              <div class="help-tips-psds"></div>
            </div>
          </div>
          <div class="form-group1">
            <span>手机验证码</span>

            <!--<div class="move-yanzheng form-group1-box form-group-content" v-show="moveYZ">-->

            <!--<div class="yanzheng-tishi"></div>-->
            <!--<span class="move-btn-yanzheng"><i class="el-icon-d-arrow-right"></i></span>-->
            <!--<em class="em-color">滑动验证</em>-->
            <!--</div>-->

            <div class="form-group1-box" v-show="moveYZ">
              <div class="form-group-content">
                <input type="text" placeholder="手机验证码" v-model="captchM" maxlength="6"/>
                <button class="getCodeM" @click="getCodeM($event)">获取验证码</button>
              </div>
              <div class="help-tips-getCodeM"></div>
            </div>
          </div>
          <div class="form-group1 margin-bottom-0">
            <span> </span>
            <div class="form-group-content1">
              <input type="checkbox" id="agree"/>
              <label for="agree">
                我已阅读并同意


                <router-link to="/userAgreement">《FreeWillex用户协议》</router-link>
              </label>
            </div>
          </div>
          <div class="form-group1 dd margin-bottom-0">
            <span> </span>
            <div class="form-group-content1">
              <input type="button" value="注册" class="register-submit" @click="userRegisterM()"/>
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
      <div class="register-from" v-show="!register_text">
        <div class="form-group1">
          <span>邀请码</span>
          <div class="form-group-content de">
            <input type="text" placeholder="邀请码" v-model="recommendCodeNew" minlength="6" maxlength="6"
                   class="recommendCodeNewNUm"/>
            <div style="align-self: flex-start">没有邀请码可不填</div>
          </div>
        </div>
        <div class="form-group1">
          <span>邮箱</span>
          <div class="form-group-content de">
            <input type="email" placeholder="邮箱" v-model="userNameE" class="userNameEIpt" maxlength="32"/>
            <div class="help-tips-userEmail"></div>
          </div>
        </div>
        <div class="form-group1">
          <span>密码</span>
          <div class="form-group-content de">
            <input type="password" placeholder="密码" v-model="userPasswordE" class="userPsdE" minlength="6"
                   maxlength="32"/>
            <div class="help-tips-psdE"></div>
          </div>
          <p class="password-strengths"><span></span><span></span><span></span><em class="password-strength-views"></em>
          </p>
        </div>
        <div class="form-group1">
          <span>确认密码</span>
          <div class="form-group-content de">
            <input type="password" placeholder="确认密码" v-model="userPasswordsE" class="userPsdsE" minlength="6"
                   maxlength="32"/>
            <div class="help-tip-psdsE"></div>
          </div>
        </div>
        <div class="form-group1">
          <span>邮箱验证码</span>
          <!--<div class="move-yanzhengs form-group1-box form-group-content" v-show="moveYZ1">-->
          <!--<div class="yanzheng-tishis"></div>-->
          <!--<span class="move-btn-yanzhengs"><i class="el-icon-d-arrow-right"></i></span>-->
          <!--<em class="em-colors">滑动验证</em>-->
          <!--</div>-->
          <div class="form-group1-box" v-show="moveYZ1">
            <div class="form-group-content">
              <input type="text" placeholder="邮箱验证码" v-model="captchE" maxlength="6"/>
              <button class="getCodeE" @click="getCodeE()">获取验证码</button>
            </div>
            <div class="help-tips-getCodeE"></div>
          </div>
        </div>
        <div class="form-group1 margin-bottom-0">
          <span> </span>
          <div class="form-group-content1">
            <input type="checkbox" id="agree1"/>
            <label for="agree1">
              我已阅读并同意


              <router-link to="/userAgreement">《FreeWillex用户协议》</router-link>
            </label>
          </div>
        </div>
        <div class="form-group1 dd margin-bottom-0">
          <span> </span>
          <div class="form-group-content1">
            <input type="button" value="注册" class="register-submit" @click="userRegisterE()"/>
          </div>
        </div>
        <div class="form-group1 margin-bottom-0">
          <span> </span>
          <div class="form-group-content1">
            <span>已有帐号? </span>
            <router-link to="/login" class="go-login"> 直接登录</router-link>
          </div>
        </div>
      </div>
      <div class="border-user-num" v-show="recommendCodeState">推荐人编号：{{recommendCodeNew}}</div>
    </div>
  </div>
</template>
<script>
  import $ from "jquery";
  export default{
    data() {
      return {
        register_text: true,
        options: [{
          value: '1',
          label: '中国'
        }, {
          value: '2',
          label: '美国'
        }, {
          value: '3',
          label: '日本'
        }, {
          value: '4',
          label: '台湾'
        }, {
          value: '5',
          label: '香港'
        }],
        value8: '中国',
        userPasswordE: '',
        userPasswordsE: '',
        userNameE: '',
        userPasswordM: '',
        userPasswordsM: '',
        userNameM: '',
        moveYZ: true,
        moveYZ1: true,
        timer: '',
        captchE: '',
        captchM: '',
        recommendCodeNew: '',
        recommendCodeState: false

      }
    },
    methods: {
//      邮箱注册逻辑
      register_style() {
        this.register_text = !this.register_text;
        this.moveYZ = true;
        this.moveYZ1 = true;
        clearInterval(this.timer);
      },
      userRegisterE() {
        let that = this;
        if (that.userNameE && that.userPasswordE && that.userPasswordsE && that.$store.state.registerE.checkStyleE && that.captchE) {
//        if (that.$store.state.registerE.checkStyleE && that.$store.state.registerE.username && that.$store.state.registerE.userpsd && that.$store.state.registerE.userpsds && that.$store.state.registerE.YZCode) {
          that.$http({
            url: this.$URL_API + 'register',
            method: 'POST',
            data: {
              loginUser: that.userNameE,
              loginPwd: md5(that.userPasswordE),
              cifLoginPwd: md5(that.userPasswordsE),
              flag: that.$store.state.registerE.checkStyleE,
              registerDevice: 'WEB',
              registerIp: '192.168.1.110',
              captch: that.captchE,
              recommendCode: that.recommendCodeState ? that.recommendCodeNew : ''
            },
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/json;charset=UTF-8",
            }
          }).then((res) => {
            that.showError(res.data.code, res.data.message);
            if (res.data.code === 200) {
              localStorage.setItem('username', that.userNameE);
              setTimeout(function () {
                that.$store.state.registerE.checkStyleE = false;
                that.$router.push('/login')
              }, 1500)
            }
          }).catch((req) => {
            that.showError(req.code, req.message)
          })
        }

      },
//      手机注册逻辑
      userRegisterM() {
        let that = this;
        if (that.userNameM && that.userPasswordM && that.userPasswordsM && that.$store.state.registerM.checkStyleM && that.captchM) {
//        if (that.$store.state.registerM.checkStyleM && that.$store.state.registerM.username && that.$store.state.registerM.userpsd && that.$store.state.registerM.userpsds && that.$store.state.registerM.YZCode) {
          that.$http({
            url: this.$URL_API + 'register',
            method: 'POST',
            data: {
              loginUser: that.userNameM,
              loginPwd: md5(that.userPasswordM),
              cifLoginPwd: md5(that.userPasswordsM),
              flag: that.$store.state.registerM.checkStyleM,
              registerDevice: 'WEB',
              registerIp: '120.0.0.1',
              captch: that.captchM,
              recommendCode: that.recommendCodeState ? that.recommendCodeNew : ''
            },
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/json;charset=UTF-8",
            }
          }).then((data) => {
            that.showError(data.data.code, data.data.message);
            if (data.data.code === 200) {
              localStorage.setItem('username', that.userNameM);
              setTimeout(function () {
                that.$store.state.registerM.checkStyleM = false;
                that.$router.push('/login')
              }, 1500)
            }
          }).catch((req) => {
            that.showError(req.code, req.message)
          })
        }
      },
      mover (){
        //          滑动验证
        clearInterval(this.timer);
        let that = this;
        $('.move-btn-yanzheng').mousedown(function (event1) {
          var $evt1 = event1 || window.event;
          var $iOffsetL = $evt1.clientX - this.offsetLeft;
          $(document).bind('mousemove', function (event2) {
            var $evt2 = event2 || window.event;
            var $iPosX = $evt2.clientX - $iOffsetL;
            var $widths = $('.move-yanzheng').width() - 36;
            if ($iPosX >= $widths / 2) {
              $('.em-color').css({color: "#fff"})
            } else {
              $('.em-color').css({color: "#999"})
            }
            if ($iPosX >= 0 && $iPosX < $widths) {
              $('.yanzheng-tishi').css({
                width: $iPosX,
                background: '#01aaef',
                position: "absolute",
                opacity: .8,
                height: 30
              });
              $('.move-btn-yanzheng').css({left: $iPosX + 'px'});
            } else {
              that.moveYZ = false;
            }
          });
          $(document).bind('mouseup', function (event3) {
            var $evt3 = event3 || window.event;
            var $iPosX3 = $evt3.clientX - $iOffsetL;
            var $widths = $('.move-yanzheng').width() - 36;
            if ($iPosX3 < $widths) {
              $('.yanzheng-tishi').animate({width: 0});
              $('.move-btn-yanzheng').animate({left: 0});
              $('.em-color').css({color: "#999"})
            }
            else {
              that.moveYZ = false;
            }
            $(document).unbind('mousemove');
            $(document).unbind('mouseup');
          });
          return false;
        });
      },
      movers (){
        //          滑动验证
        clearInterval(this.timer);
        let that = this;
        $('.move-btn-yanzhengs').mousedown(function (event1) {
          var $evt1 = event1 || window.event;
          var $iOffsetL = $evt1.clientX - this.offsetLeft;
          $(document).bind('mousemove', function (event2) {
            var $evt2 = event2 || window.event;
            var $iPosX = $evt2.clientX - $iOffsetL;
            var $widths = $('.move-yanzhengs').width() - 36;
            if ($iPosX >= $widths / 2) {
              $('.em-colors').css({color: "#fff"})
            } else {
              $('.em-colors').css({color: "#999"})
            }
            if ($iPosX >= 0 && $iPosX < $widths) {
              $('.yanzheng-tishis').css({
                width: $iPosX,
                background: '#01aaef',
                position: "absolute",
                opacity: .8,
                height: 30
              });
              $('.move-btn-yanzhengs').css({left: $iPosX + 'px'});
            } else {
              that.moveYZ1 = false;
            }
          });
          $(document).bind('mouseup', function (event3) {
            var $evt3 = event3 || window.event;
            var $iPosX3 = $evt3.clientX - $iOffsetL;
            var $widths = $('.move-yanzhengs').width() - 36;
            if ($iPosX3 < $widths) {
              $('.yanzheng-tishis').animate({width: 0});
              $('.move-btn-yanzhengs').animate({left: 0});
              $('.em-colors').css({color: "#999"})
            }
            else {
              that.moveYZ1 = false;
            }
            $(document).unbind('mousemove');
            $(document).unbind('mouseup');
          });
          return false;
        });
      },
      getCodeM(ev){
        let _this = this;
        ev.target.setAttribute('disabled', true);
        $('.getCodeM').attr("disabled", true).css("cursor", "default");
        let second = 60;
        let pattern = /0?^(13|14|15|18|17)[0-9]{9}/;
        let url = this.$URL_API + 'captcha/mobile/' + this.userNameM;
        if (this.userNameM.length !== 0 && pattern.test(this.userNameM)) {
          this.$http.get(url).then((data) => {
            this.showError(data.data.code, data.data.message);
            if (data.data.code === 200) {
              this.timer = setInterval(function () {
                $('.getCodeM').html((--second) + 's');
                if (second < 0) {
                  $('.getCodeM').removeAttr("disabled").css("cursor", "pointer");
                  clearInterval(_this.timer);
                  ev.target.innerHTML = '获取验证码'
//                  $('.getCodeM').html('获取验证码');
                }
              }, 1000);
              $('.help-tips-getCodeM').html('请输入验证码').css({
                alignSelf: 'flex-start',
                color: 'red',
                marginLeft: '1.5rem'
              })
            } else {
              $('.getCodeM').removeAttr("disabled").css("cursor", "pointer");
            }
          }).catch((req) => {
            $('.getCodeM').removeAttr("disabled").css("cursor", "pointer");
            this.showError(req.code, req.message)
          })
        } else {
          $('.getCodeM').removeAttr("disabled").css("cursor", "pointer");
          $('.help-tips-getCodeM').html('请核对手机号').css({
            alignSelf: 'flex-start',
            color: 'red',
            marginLeft: '1.5rem'
          })
        }
      },
      getCodeE(){
        let _this = this;
        let second = 60;
        $('.getCodeE').attr("disabled", true).css("cursor", "default");
        let pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+(com|cn)$/;
        let url = this.$URL_API + 'captcha/email/' + this.userNameE;
        if (this.userNameE.length !== 0 && pattern.test(this.userNameE)) {
          this.$http.get(url).then((data) => {
            this.showError(data.data.code, data.data.message);
            if (data.data.code === 200) {
              this.timer = setInterval(function () {
                $('.getCodeE').html((--second) + 's');
                if (second <= 0) {
                  $('.getCodeE').removeAttr("disabled").css("cursor", "pointer");
                  clearInterval(_this.timer);
                  $('.getCodeE').html('获取验证码');
                }
              }, 1000);
              $('.help-tips-getCodeE').html('请输入验证码').css({
                alignSelf: 'flex-start',
                color: 'red',
                marginLeft: '1.5rem'
              })
            } else {
              $('.getCodeE').removeAttr("disabled").css("cursor", "pointer");
            }
          }).catch((req) => {
            $('.getCodeE').removeAttr("disabled").css("cursor", "pointer");
            this.showError(req.code, req.message)
          })
        } else {
          $('.getCodeE').removeAttr("disabled").css("cursor", "pointer");
          $('.help-tips-getCodeE').html('请核对邮箱').css({
            alignSelf: 'flex-start',
            color: 'red',
            marginLeft: '1.5rem'
          })
        }
      }
    },
    mounted() {
      let that = this;
      let url = window.location.href;
      if (url.indexOf('?id') !== -1) {
        this.recommendCodeNew = url.substr(-6);
        this.recommendCodeState = true;
//        alert(this.recommendCodeNew);
      } else {
        this.recommendCodeState = false;
      }
      //选中协议
      {
        let that = this;
        $('#agree1').click(function () {
          that.$store.state.registerE.checkStyleE = $(this).is(':checked');
//          //console.log($(this).is(':checked'))
        });
        $('#agree').click(function () {
          that.$store.state.registerM.checkStyleM = $(this).is(':checked');
//          //console.log($(this).is(':checked'))
        })

      }
      {
        this.mover();
        this.movers()
      }
//      手机号码正则验证
      {
        let that = this;
        $('.userNameIpt').keyup(function () {
          let pattern = /0?^(13|14|15|18|17)[0-9]{9}/;
          if (!pattern.test(that.userNameM)) {
            that.$store.state.registerM.username = false;
            $('.phone-tishi').html('您输入的号码格式不正确');
          } else {
            that.$store.state.registerM.username = true;
            $('.phone-tishi').html('');
          }
        });
//        用户名检测
        $('.userNameIpt').blur(function () {
          that.$http({
            url: that.$URL_API + 'register/check/' + that.userNameM,
            method: 'GET',
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/json;charset=UTF-8",
            }
          }).then((res) => {
            that.showError(res.data.code, res.data.message);
            //console.log(res,'用户名不存在')
          })
        });

      }
      //邮箱正则验证
      {
        let that = this;
        $('.userNameEIpt').keyup(function () {
          let pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+(com|cn)$/;
          if (pattern.test(that.userNameE)) {
            $('.help-tips-userEmail').html('');
            that.$store.state.registerE.username = true;
          } else {
            that.$store.state.registerE.username = false;
            $('.help-tips-userEmail').html('您输入的邮箱格式不正确').css({
              alignSelf: 'flex-start',
              color: 'red'
            });
          }
        });
      }
      //获取验证码
      {
        let that = this;
//        $('.getCodeM').click(function () {
//          let second = 60;
//          let pattern = /0?^(13|14|15|18|17)[0-9]{9}/;
//          let url = that.$URL_API + 'captcha/mobile/' + that.userNameM;
//          if (that.userNameM.length !== 0 && pattern.test(that.userNameM)) {
//            that.$http.get(url).then((data) => {
//              that.showError(data.data.code, data.data.message);
//              if (data.data.code === 200) {
//                $('.getCodeM').attr("disabled", true).css("cursor", "default");
//                that.timer = setInterval(function () {
//                  $('.getCodeM').html((--second) + 's');
//                  if (second <= 0) {
//                    $('.getCodeM').removeAttr("disabled").css("cursor", "pointer");
//                    clearInterval(that.timer);
//                    $('.getCodeM').html('获取验证码');
//                  }
//                }, 1000);
//                $('.help-tips-getCodeM').html('请输入验证码').css({
//                  alignSelf: 'flex-start',
//                  color: 'red',
//                  marginLeft: '1.5rem'
//                })
//              }
//            }).catch((req) => {
//              that.showError(req.code, req.message)
//            })
//          } else {
//            $('.help-tips-getCodeM').html('请核对手机号').css({
//              alignSelf: 'flex-start',
//              color: 'red',
//              marginLeft: '1.5rem'
//            })
//          }
//        });
//        $('.getCodeE').click(function () {
//          let second = 60;
//          let pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+(com|cn)$/;
//          let url = that.$URL_API + 'captcha/email/' + that.userNameE;
//          if (that.userNameE.length !== 0 && pattern.test(that.userNameE)) {
//            that.$http.get(url).then((data) => {
//              that.showError(data.data.code, data.data.message);
//              if (data.data.code === 200) {
//                $('.getCodeE').attr("disabled", true).css("cursor", "default");
//                that.timer = setInterval(function () {
//                  $('.getCodeE').html((--second) + 's');
//                  if (second <= 0) {
//                    $('.getCodeE').removeAttr("disabled").css("cursor", "pointer");
//                    clearInterval(that.timer);
//                    $('.getCodeE').html('获取验证码');
//                  }
//                }, 1000);
//                $('.help-tips-getCodeE').html('请输入验证码').css({
//                  alignSelf: 'flex-start',
//                  color: 'red',
//                  marginLeft: '1.5rem'
//                })
//              }
//            }).catch((req) => {
//              that.showError(req.code, req.message)
//            })
//          } else {
//            $('.help-tips-getCodeE').html('请核对邮箱').css({
//              alignSelf: 'flex-start',
//              color: 'red',
//              marginLeft: '1.5rem'
//            })
//          }
//        });
      }
      {
        $('.userPsdE').mousedown(function () {
          $(document).keyup(function () {
            that.passWord(that.userPasswordE, 'password-strengths', 'password-strength-views');
          })
        });
        $('.userPsdE').mouseleave(function () {
          $('.userPsdE').mousedown = null;
        })
        $('.userPsd').mousedown(function () {
          $(document).keyup(function () {
            that.passWord(that.userPasswordM, 'password-strength', 'password-strength-view');
          })
        });
        $('.userPsd').mouseleave(function () {
          $('.userPsd').mousedown = null;
        })
      }
    },
    watch: {
      userPasswordE(){
        let that = this;
        if (that.userPasswordsE) {
          if (that.userPasswordE === that.userPasswordsE) {
            $('.help-tip-psdsE').html('');
            that.$store.state.registerE.userpsds = true;
          } else {
            that.$store.state.registerE.userpsds = false;
            $('.help-tip-psdsE').html('两次输入的密码不一致').css({
              alignSelf: 'flex-start',
              color: 'red'
            })
          }
        }
      },
      userPasswordM(){
        let that = this;
        if (that.userPasswordsM) {
          if (that.userPasswordM === that.userPasswordsM) {
            that.$store.state.registerM.userpsds = true;
            $('.help-tips-psds').html('');
          } else {
            that.$store.state.registerM.userpsds = false;
            $('.help-tips-psds').html('两次输入的密码不一致').css({
              alignSelf: 'flex-start',
              color: 'red'
            })
          }
        }
      },
      userPasswordsE(){
        let that = this;
        if (that.userPasswordE) {
          if (that.userPasswordE === that.userPasswordsE) {
            $('.help-tip-psdsE').html('');
            that.$store.state.registerE.userpsds = true;
          } else {
            that.$store.state.registerE.userpsds = false;
            $('.help-tip-psdsE').html('两次输入的密码不一致').css({
              alignSelf: 'flex-start',
              color: 'red'
            })
          }
        }
      },
      userPasswordsM(){
        let that = this;
        if (that.userPasswordM) {
          if (that.userPasswordM === that.userPasswordsM) {
            that.$store.state.registerM.userpsds = true;
            $('.help-tips-psds').html('');
          } else {
            that.$store.state.registerM.userpsds = false;
            $('.help-tips-psds').html('两次输入的密码不一致').css({
              alignSelf: 'flex-start',
              color: 'red'
            })
          }
        }
      }
    }
  }
</script>
<style>
  .phone-tishi {
    color: red !important;
  }

  .el-input__inner {
    border: none !important;
  }

  .country-name > p {
    display: flex;
    align-items: center;
  }

  .form-group-content-select {
    width: 100%;
  }

  .form-group-content-option {
    width: 100%;
  }

  .register-box {
    width: 64rem;
    margin: 2rem auto;
    padding: 1rem 1.667rem 1.25rem 1.667rem;
    background: #fff;
    border: 1px solid #e9ecf3;
    box-shadow: 0 0 10px rgba(233, 236, 243, .8);
  }

  .register-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.333rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #eee;
    min-height: 4rem;
  }

  .register-header > a {
    color: #01aaef;
    font-size: 1.167rem;
  }

  .register-from {
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

  .form-group1-box .form-group-content a {
    background: #01aaef;
    color: #fff;
    height: 3.167rem;
    width: 14rem;
    text-align: center;
    line-height: 3.167rem;
    font-size: 1.167rem;
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

  .register-submit {
    width: 120%;
    padding: 0.667rem 1rem;
    border: none;
    color: #FFFFFF;
    background: #01aaef;
    font-size: 1.167rem;
    outline: none;
    cursor: pointer;
    margin-top: 1.8rem;
    margin-bottom: .8rem;
    margin-left: -25px;
  }

  .register-submit:hover {
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

  .move-yanzheng, .move-yanzhengs {
    position: relative;
  }

  .yanzheng-tishi, .yanzheng-tishis {
    position: absolute;
  }

  .move-yanzheng > span, .move-yanzhengs > span {
    position: absolute;
    height: 100%;
    width: 36px;
    box-sizing: border-box;
    padding: 0 1rem;
    line-height: 2.5rem;
    background: #01aaef;
    color: #fff;
    cursor: pointer;
    z-index: 2;
  }

  .move-yanzheng > em, .move-yanzhengs > em {
    position: absolute;
    left: 45%;
    color: #999;
    height: 100%;
    line-height: 2.5rem;
  }

  .border-user-num {
    width: 100%;
    text-align: right;
    color: #999;
    font-size: 14px;
  }
</style>
