<template>
  <div class="addBankCard">
    <div class="addBankCard-title">
      <p>绑定银行卡</p>
    </div>
    <div class="addBankCard-content">
      <section>
        <div>
          <span>借记卡号</span>
          <input type="text" placeholder="借记卡号" class="jiejikahao" v-model="bankNo"/>
          <div class="jiejikahao-tips"></div>
        </div>
      </section>
      <section>
        <div>
          <span>开户银行</span>
          <select class="select-bank-zc">
            <option>请选择银行卡</option>
            <option v-for="item in CBank" :value="item.id">{{item.bankName}}</option>
          </select>
        </div>
      </section>
      <section>
        <div>
          <span>开户支行</span>
          <input type="text" placeholder="开户支行名称" v-model="bankName" class="bank-name-bind"/>
          <span class="color-red">支行信息错误会导致提现失败，请仔细确认</span>
        </div>
      </section>
      <section>
        <div>
          <span>支行地址</span>
          <input type="text" placeholder="开户支行地址" v-model="bankAdr" class="bank-adr-bind"/>
          <span class="color-red">支行名称错误会导致提现失败，请仔细确认</span>
        </div>
      </section>
      <section>
        <div>
          <span>手机号码</span>
          <p>
            <span>+86</span>
            <input type="text" placeholder="手机号码" class="phoneNum-addBank" v-model="phoneNum"/>
          </p>
          <div class="phoneNum-addBank-tips"></div>
        </div>
      </section>
      <section class="section-yz">
        <div>
          <span>验证码</span>
          <p>
            <input type="text" placeholder="验证码" class="YZ-addBank" v-model="YZ"/>
            <span @click="RgetCord()">{{rGetCord}}</span>
          </p>
          <div class="YZ-addBank-tips"></div>
        </div>
      </section>
      <section class="section-yz">
        <div>
          <span>手机验证码</span>
          <p>
            <input type="text" placeholder="手机验证码" class="phoneYZ-addBank" v-model="serverYZ"/>
            <button class="addBankGetCord" @click="REgetCord()">获取验证码</button>
          </p>
          <div class="phoneYZ-addBank-tips"></div>
        </div>
      </section>
      <div class="addBankCard-Btn">
        <button @click="pushReal($event)">确认绑定</button>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default {
    data() {
      return {
        CBank: [],
        bankNo: '',
        bankName: '',
        bankAdr: '',
        RBankVal: '',
        phoneNum: '',
        YZ: '',
        serverYZ: '',
        rGetCord: ''
      }
    },
    mounted() {
      let that = this;
      that.RgetCord();//获取验证码
      $('.select-bank-zc').change(function () {
        console.log($(this).val())
        that.RBankVal = $(this).val();
        console.log(that.RBankVal);
      });
      //获取bankid
      {
        $('.bank-name-bind').keyup(function () {
          if (that.bankName) {
            that.$store.state.addBankCard.bankNum = true;
          } else {
            that.$store.state.addBankCard.bankNum = false;
          }
        })
      }
      {
        $('.bank-adr-bind').keyup(function () {
          if (that.bankAdr) {
            that.$store.state.addBankCard.bankAdr = true;
          } else {
            that.$store.state.addBankCard.bankAdr = false;
          }
        })
      }
      {
        $('.jiejikahao').keyup(function () {
          let reg = /^(\d{16}|\d{19})$/;
          if (reg.test(that.bankNo)) {
            $('.jiejikahao-tips').html('');
            that.$store.state.addBankCard.bankNo = true;
          } else {
            that.$store.state.addBankCard.bankNo = false;
            $('.jiejikahao-tips').html('请校验您的银行卡号').css({
              alignSelf: 'flex-start',
              color: 'red'
            });
          }
        })
      }//借记卡号
      {
        $('.phoneNum-addBank').keyup(function () {
          let pattern = /0?^(13|14|15|18|17)[0-9]{9}/;
          if (!pattern.test(that.phoneNum)) {
            $('.phoneNum-addBank-tips').html('请校验您的手机号码').css({
              alignSelf: 'flex-start',
              color: 'red'
            });
            that.$store.state.addBankCard.phone = false;
          } else {
            $('.phoneNum-addBank-tips').html('');
            that.$store.state.addBankCard.phone = true;
          }
        });
      }//手机号码验证
      {
        $('.YZ-addBank').keyup(function () {
          if (that.YZ == that.rGetCord) {
            $('.YZ-addBank-tips').html('');
            that.$store.state.addBankCard.YZ = true;
          } else {
            $('.YZ-addBank-tips').html('请核对验证码').css({
              alignSelf: 'flex-start',
              color: 'red'
            });
            that.$store.state.addBankCard.YZ = false;
          }
        })
      }//验证码校验
      {
        this.$http({
          url: 'http://192.168.1.48:8089/fwex/web/bank/all',
          method: 'GET',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + that.$store.state.token
          }
        }).then((res) => {
          that.CBank = res.data.data;
          console.log(res.data.data)
        }).catch((req) => {
          console.log("出错了")
        })
      }//获取支持银行
    },
    methods: {
      RgetCord() {
        let num = parseInt(Math.random() * 10000);//0~9999
        if (num < 10) {
          num = '000' + num;
        } else if (num < 100) {
          num = '00' + num;
        } else if (num < 1000) {
          num = '0' + num;
        }
        this.rGetCord = num;
      },
      pushReal(ev) {
        ev.target.innerHTML = '处理中...';
        let that = this;
        if (that.$store.state.addBankCard.bankNo &&
          that.$store.state.addBankCard.bankNum &&
          that.$store.state.addBankCard.bankAdr &&
          that.$store.state.addBankCard.phone &&
          that.$store.state.addBankCard.YZ &&
          that.$store.state.addBankCard.serverYZ) {
          that.$http({
            url: 'http://192.168.1.48:8089/fwex/web/accountBank/bind',
            method: 'POST',
            data: {
              bankId: that.RBankVal,
              bankAddr: that.bankAdr,
              bankBranch: that.bankName,
              accountNo: that.bankNo,
              mobile: that.phoneNum,
            },
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/json;charset=UTF-8",
              'X-Authorization': 'Bearer ' + that.$store.state.token,
            }
          }).then((res) => {
            console.log(res, '绑定')
            if (res.data.code === 200) {
              ev.target.innerHTML = '确认绑定';
              this.$router.push('/accountManagement');
              console.log(res.data.message)
            }
          }).catch((req) => {
            ev.target.innerHTML = '确认绑定';
            console.log(req, '绑定失败')
          })
        }
      },
      REgetCord() {
        let that = this;
        let second = 60;
        let pattern = /0?^(13|14|15|18|17)[0-9]{9}/;
        let url = 'http://192.168.1.48:8089/fwex/web/captcha/mobile/' + that.phoneNum;
        if (that.phoneNum.length !== 0 && pattern.test(that.phoneNum)) {
          that.$http.get(url).then((data) => {
            console.log(data);
            $('.addBankGetCord').attr("disabled", true).css("cursor", "default");
            that.timer = setInterval(function () {
              $('.addBankGetCord').html((--second) + 's');
              if (second === 0) {
                $('.addBankGetCord').removeAttr("disabled").css("cursor", "pointer");
                clearInterval(that.timer);
                $('.addBankGetCord').html('获取验证码');
              }
            }, 1000);
            $('.phoneYZ-addBank-tips').html('请输入验证码').css({
              alignSelf: 'flex-start',
              color: 'red',
              marginLeft: '1.5rem'
            })
          }).catch((error) => {
            console.log(131313);
            console.log(error);
          })
        } else {
          $('.phoneYZ-addBank-tips').html('请核对手机号').css({
            alignSelf: 'flex-start',
            color: 'red',
            marginLeft: '1.5rem'
          })
        }
      }
    }
  }
</script>
<style scoped>
  .addBankCard {
    /*padding: 0 2rem 0 3rem;*/
  }

  .addBankCard-title {
    padding: 2rem 0;
    font-size: 1.833rem;
    border-bottom: 1px solid #ddd;
  }

  .addBankCard-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
  }

  .addBankCard-content section {
    width: 100%;
    margin-bottom: 1.25rem;
    height: 40px;
    font-size: 1.167rem;

  }

  .addBankCard-content section > div {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .addBankCard-content section > div > span:nth-of-type(1) {
    width: 100px;
    text-align: right;
    margin: 0 1.5rem 0 15rem;
  }

  .addBankCard-content section > div > input {
    padding: .6rem .833rem;
    width: 25rem;
    outline: none;
    border: none;
    border: 1px solid #ddd;
  }

  .addBankCard-content section > div > select {
    width: 27rem;
    padding: .6rem .833rem;
    outline: none;
    border: none;
    border: 1px solid #ddd;
  }

  .color-red {
    color: red;
    margin-left: 2rem;
  }

  .addBankCard-content section > div:nth-of-type(2) {
    height: 1.333rem;
  }

  .addBankCard-content section > div > p {
    display: flex;
    border: 1px solid #ddd;
    width: 26.667rem;
  }

  .addBankCard-content section > div > p > span {
    border-right: 1px solid #ddd;
    padding: 0 1rem;
    line-height: 30px;
  }

  .addBankCard-content section > div > p > input {
    border: none;
    padding: 0.6rem .833rem;
    outline: none;
  }

  .addBankCard-content section > div > div {
    margin-left: 2rem
  }

  .addBankCard-content .section-yz > div > p > span {
    width: 22%;
    border-right: none;
    text-align: center;
    background: #01aaef;
    color: #fff;
  }

  .addBankCard-content .section-yz > div > p > button {
    width: 30%;
    border: none;
    text-align: center;
    background: #01aaef;
    color: #fff;
    cursor: pointer;
  }

  .addBankCard-content .section-yz > div > p > input {
    width: 70%;
  }

  .addBankCard-Btn > button {
    background: #01aaef;
    color: #fff;
    padding: 0.833rem 1.5rem;
    border: none;
    border-radius: 3px;
  }
</style>




