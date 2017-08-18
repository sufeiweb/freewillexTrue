<template>
  <div class="bindEmail">
    <div class="bindEmail-title">
      <p>邮箱绑定</p>
    </div>
    <div class="bindEmail-from">
      <div class="bindEmail-from-group">
        <span>邮箱</span>
        <div>
          <input type="text" placeholder="邮箱" v-model="bindEmailNum" class="bindEmailNum-input"/>
          <span class="bindEmailNum-tips"></span>
        </div>
      </div>
      <div class="bindEmail-from-group">
        <span>验证码</span>
        <div>
          <div class="bindEmail-input-box">
            <input type="text" placeholder="验证码" v-model="bindEmailRYZ" class="bindEmailRYZ-input"/>
            <a @click="bindEmailRgetCord()">{{bindEmailRGetCord}}</a>
          </div>
          <span class="bindEmailRYZ-tips"></span>
        </div>
      </div>
      <div class="bindEmail-from-group">
        <span>邮箱验证码</span>
        <div>
          <div class="bindEmail-input-box">
            <input type="text" placeholder="邮箱验证码" v-model="bindEmailRCaptcha"/>
            <button class="bindGetEmailCord">获取验证码</button>
          </div>
          <span class="bindEmailRCaptcha-tips"></span>
        </div>
      </div>
      <div class="bindEmail-from-group">
        <span>&nbsp;</span>
        <div>
          <a href="javascript:;" class="QbindEmail" @click="QbindEmail()">确认绑定</a>
          <span class="phone-tips"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        bindEmailNum: '',
        bindEmailRCaptcha: '',
        bindEmailRYZ: '',
        bindEmailRGetCord: ''
      }
    },
    mounted() {
      let that = this;
      that.bindEmailRgetCord();
      {
        $('.bindEmailRYZ-input').keyup(function () {
          if (that.bindEmailRYZ == that.bindEmailRGetCord) {
            $('.bindEmailRYZ-tips').html('');
            that.$store.state.bindEmailNum.YZ = true;
          } else {
            $('.bindEmailRYZ-tips').html('请核对验证码').css({
              alignSelf: 'flex-start',
              color: 'red'
            });
            that.$store.state.bindEmailNum.YZ = false;
          }
        })
      }//验证码校验
      {
        $('.bindEmailNum-input').keyup(function () {
          let pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+(com|cn)$/;
          if (pattern.test(that.bindEmailNum)) {
            $('.bindEmailNum-tips').html('');
            that.$store.state.bindEmailNum.email = true;
          } else {
            that.$store.state.bindEmailNum.email = false;
            $('.bindEmailNum-tips').html('您输入的邮箱格式不正确').css({
              alignSelf: 'flex-start',
              color: 'red'
            });
          }
        });
      } //邮箱正则验证
      {
        $('.bindGetEmailCord').click(function () {
          let second = 60;
          let pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+(com|cn)$/;
          let url = 'https://kaifamobile.firstcoinex.com/fwex/web/captcha/email/' + that.bindEmailNum;
          if (that.bindEmailNum.length !== 0 && pattern.test(that.bindEmailNum)) {
            that.$http.get(url).then((res) => {
              this.showError(res.data.code, res.data.message);
              if (res.data.code === 200) {
                $('.bindGetEmailCord').attr("disabled", true).css("cursor", "default");
                that.timer = setInterval(function () {
                  $('.bindGetEmailCord').html((--second) + 's');
                  if (second <= 0) {
                    $('.bindGetEmailCord').removeAttr("disabled").css("cursor", "pointer");
                    clearInterval(that.timer);
                    $('.bindGetEmailCord').html('获取验证码');
                  }
                }, 1000);
                $('.bindEmailRCaptcha-tips').html('请输入验证码').css({
                  alignSelf: 'flex-start',
                  color: 'red',
                  marginLeft: '1.5rem'
                })
              }
            }).catch((req) => {
              this.showError(req.code, req.message);
            })
          } else {
            $('.bindEmailRCaptcha-tips').html('请核对邮箱').css({
              alignSelf: 'flex-start',
              color: 'red',
              marginLeft: '1.5rem'
            })
          }
        });
      }
    },
    methods: {
      bindEmailRgetCord() {
        let num = parseInt(Math.random() * 10000);//0~9999
        if (num < 10) {
          num = '000' + num;
        } else if (num < 100) {
          num = '00' + num;
        } else if (num < 1000) {
          num = '0' + num;
        }
        this.bindEmailRGetCord = num;
      },
      QbindEmail() {
        let that = this;
        if (that.$store.state.bindEmailNum.email && that.$store.state.bindEmailNum.YZ) {
          that.$http({
            url: 'https://kaifamobile.firstcoinex.com/fwex/web/authentication/emailAuth',
            method: 'POST',
            data: {
              email: that.bindEmailNum,
              captcha: that.bindEmailRGetCord
            },
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              'X-Authorization': 'Bearer ' + this.$store.state.token,
              "Content-Type": "application/json;charset=UTF-8",
            }
          }).then((res) => {
            this.showError(res.data.code, res.data.message);
            that.$router.push('/settings');
          }).catch((req) => {
            this.showError(req.code, req.message)
          })
        }
      }
    }
  }
</script>
<style scoped>
  .bindEmail {
    font-size: 1.167rem;
  }

  .bindEmail .bindEmail-title {
    border-bottom: 1px solid #ddd;
  }

  .bindEmail .bindEmail-title p {
    color: #666;
    padding: 1.3rem 0;
    font-size: 1.333rem;
  }

  .bindEmail-from {
    padding: 4rem 0;
  }

  .bindEmail-from-group {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 1.2rem;
    height: 5rem;
  }

  .bindEmail-from-group > span:nth-of-type(1) {
    padding-top: 0.583rem;
    width: 20rem;
    margin-bottom: 0;
    text-align: right;
    margin-right: 2rem;
  }

  .bindEmail-from-group > div {
    width: 28.8rem;
    margin-bottom: -1.6rem;
  }

  .bindEmail-input-box {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
  }

  .bindEmail-input-box > input {
    border: none !important;
    width: 70% !important;
  }

  .bindEmail-input-box > a, .bindEmail-input-box > button {
    background: #01aaef;
    color: #fff;
    text-align: center;
    width: 30%;
    height: 2.75rem !important;
    line-height: 2.75rem !important;
    cursor: pointer;
    border: none;
  }

  .bindEmail-from-group > div > input, .bindEmail-from-group > div > select, .bindEmail-input-box > input {
    width: 100%;
    padding: 0.667rem 1rem;
    box-sizing: border-box;
    border: none;
    border: 1px solid #ddd;
  }

  .bindEmail-from-group > div > span, .bindEmail-input-box > a, .bindEmail-input-box > button {
    height: 1.5rem;
  }

  .QbindEmail {
    width: 10.833rem;
    text-align: center;
    padding: .8rem 0;
    background: #01aaef;
    color: #fff;
    border-radius: .133rem;
  }
</style>
