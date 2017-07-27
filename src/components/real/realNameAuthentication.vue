<template>
  <div class="realNameAuthentication">
    <div class="header-title">
      <p>实名认证</p>
    </div>
    <div class="real-from">
      <div class="real-from-group">
        <span>国家/地区</span>
        <div>
          <input type="text" value="中国" disabled v-model="country"/>
          <span class="city-tips"></span>
        </div>
      </div>
      <div class="real-from-group">
        <span>姓名</span>
        <div>
          <input type="text" placeholder="姓名" v-model="RUserName" class="RUserName-input"/>
          <span class="name-tips"></span>
        </div>
      </div>
      <div class="real-from-group">
        <span>身份证号码</span>
        <div>
          <input type="text" placeholder="身份证号码" class="IDCard-input" v-model="RIDCard"/>
          <span class="IDCard-tips"></span>
        </div>
      </div>
      <div class="real-from-group">
        <span>借记卡号</span>
        <div>
          <input type="text" placeholder="借记卡号" v-model="RBankNum" class="RBankNum-input"/>
          <span class="BankCard-tips"></span>
        </div>
      </div>
      <div class="real-from-group">
        <span>开户银行</span>
        <div>
          <select class="bankStyle">
            <option v-for="item in CBank" :value="item.abbreviation">{{item.bankName}}</option>
          </select>
          <span class="BankVal-tips"></span>
        </div>
      </div>
      <div class="real-from-group">
        <span>开户支行</span>
        <div>
          <input type="text" placeholder="开户支行名称" v-model="RBankName" class="RBankName-input"/>
          <span class="BankName-tips"></span>
        </div>
        <span class="tips-red">支行信息错误会导致提现失败，请仔细确认</span>
      </div>
      <div class="real-from-group">
        <span>开户地址</span>
        <div>
          <input type="text" placeholder="开户支行名称" v-model="RBankAdr" class="RBankAdr-input"/>
          <span class="BankName-tips"></span>
        </div>
        <span class="tips-red">开户支行地址信息错误会导致提现失败，请仔细确认</span>
      </div>
      <div class="real-from-group">
        <span>手机号码</span>
        <div>
          <input type="text" placeholder="手机" v-model="RUserPhone" class="RUserPhone-input"/>
          <span class="phone-tips"></span>
        </div>
      </div>
      <div class="real-from-group">
        <span>验证码</span>
        <div>
          <div class="input-box">
            <input type="text" placeholder="验证码" v-model="RYZ" class="RYZ-input"/>
            <span @click="RgetCord()">{{rGetCord}}</span>
          </div>
          <span class="yz-tips"></span>
        </div>
      </div>
      <div class="real-from-group">
        <span>手机验证码</span>
        <div>
          <div class="input-box">
            <input type="text" placeholder="手机验证码" v-model="RCaptcha"/>
            <span>获取验证码</span>
          </div>
          <span class="phoneyz-tips"></span>
        </div>
      </div>
      <div class="real-from-group">
        <span>&nbsp;</span>
        <div>
          <div>
            <input type="checkbox" id="checkbox-input"/>
            <label
              for="checkbox-input">我郑重承诺：以上个人信息合法、真实、准确；如有变动，我将及时更新用户资料。如果因提供的注册资料不合法、不真实、不准确、不详尽的，我承担因此引起的相应责任及后果。</label>
          </div>
          <span class="phone-tips"></span>
        </div>
      </div>
      <div class="real-from-group">
        <span>&nbsp;</span>
        <div>
          <a href="javascript:;" class="lijiyanzheng" @click="pushReal()">立即认证</a>
          <span class="phone-tips"></span>
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
        country: '中国',
        RUserName: '',
        RIDCard: '',
        RBankNum: '',
        RBankVal: '',
        RBankAdr: '',
        RBankName: '',
        RUserPhone: '',
        RCaptcha: '',
        certificateEnum: '',
        RYZ: '',
        rGetCord: '',
        CBank: []
      }
    },
    mounted() {
      let that = this;
      that.RgetCord();//获取验证码
      that.bankStyles($('.bankStyle').val());
      $('.bankStyle').change(function () {
        that.bankStyles($(this).val());
      });
      {
        console.log(that.$store.state.token, 'token');
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
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].abbreviation === 'alipay') {
              that.$store.state.bankId.alipay = res.data.data[i].id;
            }
            if (res.data.data[i].abbreviation === 'BOC') {
              that.$store.state.bankId.BOC = res.data.data[i].id;
            }
            if (res.data.data[i].abbreviation === 'ICBC') {
              that.$store.state.bankId.ICBC = res.data.data[i].id;
            }
            if (res.data.data[i].abbreviation === 'CCB') {
              that.$store.state.bankId.CCB = res.data.data[i].id;
            }
            if (res.data.data[i].abbreviation === 'ABC') {
              that.$store.state.bankId.ABC = res.data.data[i].id;
            }
          }
        }).catch((req) => {
          console.log("出错了")
        })
      }//获取支持银行
      {
          $('.RBankName-input').keyup(function () {
            if(that.RBankNum){
              that.$store.state.realNeed.bankNum = true;
            }else{
              that.$store.state.realNeed.bankNum = false;
            }
          })
      }
      {
        $('.RBankAdr-input').keyup(function () {
          if(that.RBankNum){
            that.$store.state.realNeed.bankAdr = true;
          }else{
            that.$store.state.realNeed.bankAdr = false;
          }
        })
      }
      {
        $('.RUserName-input').keyup(function () {
          if(that.RUserName) {
            that.$store.state.realNeed.name = true;
          } else {
            that.$store.state.realNeed.name = false;
          }
        })
      }//姓名
      {
        $('.IDCard-input').keyup(function () {
          let pattern = /\d{17}[\d|x]|\d{19}/;
          if (pattern.test(that.RIDCard)) {
            $('.IDCard-tips').html('');
            that.$store.state.realNeed.IdCard = true;
          } else {
            that.$store.state.realNeed.IdCard = false;
            $('.IDCard-tips').html('请校验您的身份证号码').css({
              alignSelf: 'flex-start',
              color: 'red'
            });
          }
        })
      }//身份证号验证
      {
        $('.RBankNum-input').keyup(function () {
          let reg = /^(\d{16}|\d{19})$/;
          if (reg.test(that.RBankNum)) {
            $('.BankCard-tips').html('');
            that.$store.state.realNeed.bankId = true;
          } else {
            that.$store.state.realNeed.bankId = false;
            $('.BankCard-tips').html('请校验您的银行卡号').css({
              alignSelf: 'flex-start',
              color: 'red'
            });
          }
        })
      }//借记卡号
      {
        $('.RUserPhone-input').keyup(function () {
          let pattern = /0?^(13|14|15|18|17)[0-9]{9}/;
          if (!pattern.test(that.RUserPhone)) {
            $('.phone-tips').html('请校验您的手机号码').css({
              alignSelf: 'flex-start',
              color: 'red'
            });
            that.$store.state.realNeed.phone = false;
          } else {
            $('.phone-tips').html('');
            that.$store.state.realNeed.phone = true;
          }
        });
      }//手机号码验证
      {
        $('.RYZ-input').keyup(function () {
            console.log(that.rGetCord);
            console.log(that.RYZ);
          if (that.RYZ == that.rGetCord) {
            $('.yz-tips').html('');
            that.$store.state.realNeed.Yz = true;
          } else {
            $('.yz-tips').html('请核对验证码').css({
              alignSelf: 'flex-start',
              color: 'red'
            });
            that.$store.state.realNeed.Yz = false;
          }
        })
      }//验证码校验
      //选中协议
      {
        $('#checkbox-input').click(function () {
          that.$store.state.realNeed.checkbox = $(this).is(':checked');
        });
      }
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
      pushReal() {
        let that = this;
        console.log(that.$store.state.realNeed.IdCard,"IdCard");
        console.log(that.$store.state.realNeed.city,'city');
        console.log(that.$store.state.realNeed.name,'name');
        console.log(that.$store.state.realNeed.bankId,'bankId');
        console.log(that.$store.state.realNeed.bankNum,'bankNum');
        console.log(that.$store.state.realNeed.phone,'phone');
        console.log(that.$store.state.realNeed.Yz,'Yz');
        console.log(that.$store.state.realNeed.phoneY,'phoneY');
        console.log(that.$store.state.realNeed.checkbox,'checkbox');
        if (that.$store.state.realNeed.IdCard &&
          that.$store.state.realNeed.city &&
          that.$store.state.realNeed.name &&
          that.$store.state.realNeed.bankId &&
          that.$store.state.realNeed.bankNum &&
          that.$store.state.realNeed.bankAdr &&
          that.$store.state.realNeed.phone &&
          that.$store.state.realNeed.Yz &&
          that.$store.state.realNeed.phoneY &&
          that.$store.state.realNeed.checkbox) {
          that.$http({
            url: 'http://192.168.1.48:8089/web/authentication/realNameAuth',
            method: 'POST',
            data: {
              country: that.country,
              userName: that.RUserName,
              idCard: that.RIDCard,
              bankId: that.RBankVal,
              bankBranch: that.RBankName,
              bankAddr: that.RBankAdr,
              accountNo: that.RBankNum,
              mobile: that.RUserPhone,
              certificateEnum: 'IDCARD',
              captcha: that.RCaptcha
            },
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              'X-Authorization': 'Bearer ' + that.$store.state.token
            }
          }).then((res)=>{
              console.log(res,'立即认证')
          }).catch((req)=>{
              console.log(req,'认证失败')
          })
        }
      },
      bankStyles(num){
        switch (num) {
          case 'alipay':
            that.RBankVal = that.$store.state.bankId.alipay;
            break;
          case 'BOC':
            that.RBankVal = that.$store.state.bankId.BOC;
            break;
          case 'ICBC':
            that.RBankVal = that.$store.state.bankId.ICBC;
            break;
          case 'CCB':
            that.RBankVal = that.$store.state.bankId.CCB;
            break;
          case 'ABC':
            that.RBankVal = that.$store.state.bankId.ABC;
            break;
        }
      }
    }
  }
</script>
<style scoped>
  .realNameAuthentication .header-title {
    border-bottom: 1px solid #ddd;
  }

  .realNameAuthentication .header-title p {
    color: #666;
    padding: 1.3rem 0;
    font-size: 1.333rem;
  }

  .real-from {
    padding: 3rem 0;
    font-size: 1.167rem;
  }

  .real-from-group {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 1.2rem;
    height: 5rem;
  }

  .real-from-group > span:nth-of-type(1) {
    padding-top: 0.583rem;
    width: 20rem;
    margin-bottom: 0;
    text-align: right;
    margin-right: 2rem;
  }

  .tips-red {
    margin-left: 2rem;
    color: red;
  }

  .real-from-group > div {
    width: 28.8rem;
    margin-bottom: -1.6rem;
  }

  .input-box {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
  }

  .input-box > input {
    border: none !important;
    width: 70% !important;
  }

  .input-box > span {
    background: #01aaef;
    color: #fff;
    text-align: center;
    width: 30%;
    height: 2.75rem !important;
    line-height: 2.75rem !important;
    cursor: pointer;
  }

  .real-from-group:nth-of-type(1) > div > input {
    cursor: not-allowed;
  }

  .real-from-group > div > input, .real-from-group > div > select, .input-box > input {
    width: 100%;
    padding: 0.667rem 1rem;
    box-sizing: border-box;
    border: none;
    border: 1px solid #ddd;
  }

  .real-from-group > div > span, .input-box > span {
    height: 1.5rem;
  }

  .lijiyanzheng {
    width: 10.833rem;
    text-align: center;
    padding: .8rem 0;
    background: #01aaef;
    color: #fff;
    border-radius: .133rem;
  }
</style>
