<template>
  <div class="addCurrencyAdr">
    <div class="addCurrencyAdr-title">
      <p>绑定数字货币地址</p>
    </div>
    <div class="from-box">
      <div>
        <span>数字货币地址</span>
        <p>
          <input type="text" placeholder="数字货币地址" v-model="currencyAdr"/>
        </p>
      </div>
      <div>
        <span>备注</span>
        <p>
          <input type="text" placeholder="备注" v-model="tags"/>
        </p>
      </div>
      <div style="display: none">
        <span>数字货币币种</span>
        <p>
          <input type="text" placeholder="数字货币币种" v-model="currencyStyle"/>
        </p>
      </div>
      <div>
        <span> </span>
        <p class="addCurrencyAdr-yz">
          <input name="we1" type="radio" id="we11" value="email" checked/>
          <label for="we11" class="border-color">邮箱验证</label>
          <input name="we1" type="radio" value="mobile" id="we12"/>
          <label for="we12">手机验证</label>
        </p>
      </div>
      <div>
        <span>资金密码</span>
        <p>
          <input type="password" placeholder="资金密码" v-model="capitalPwd"/>
        </p>
      </div>
      <div>
        <span>验证码</span>
        <p>
            <span>
              <input type="text" placeholder="验证码" v-model="serverYz"/>
              <button @click="getCode($event)">获取验证码</button>
            </span>
          <span class="cash-tishi display-none-tishi">验证码格式输入错误</span>
        </p>
      </div>
      <div>
        <span>&nbsp;</span>
        <p>
          <button @click="bindGet($event)">提交</button>
          <button @click="bindClose()">取消</button>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default {
    data() {
      return {
        currencyAdr: '',//地址
        tags: '',//用户备注
        currencyStyle: '',//数字货币币种
        serverYz: '',//验证吗
        capitalPwd: '',//资金密码
        moe: ''//手机号或邮箱
      }
    },
    mounted() {
      $("input[name='we1']").change(function () {
        $(this).next().addClass('border-color').siblings().removeClass('border-color');
      });

    },
    methods: {
      bindGet(ev) {
        ev.target.innerHTML = '处理中...';
        let yzStyle = $("input[name='we1']:checked").val();
        this.$http({
          url: 'https://kaifamobile.firstcoinex.com/fwex/web/digital/bind',
          method: 'POST',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + this.$store.state.token,
            "Content-Type": "application/json;charset=UTF-8",
          },
          data: {
            currency: this.$route.params.currency,
            address: this.currencyAdr,
            remark: this.tags,
            capitalPwd: md5(this.capitalPwd),
            types: yzStyle,
            captcha: this.serverYz
          }
        }).then((res) => {
          this.showError(res.data.code, res.data.message);
          if (res.data.code === 200) {
            ev.target.innerHTML = '确认绑定';
            this.$router.push('/accountManagement')
          }
        }).catch((req) => {
          this.showError(req.code, req.message);
          ev.target.innerHTML = '确认绑定';
        })
      },
      bindClose() {
        this.currencyAdr = '';
        this.tags = '';
        this.currencyStyle = this.$route.params.currency;
        this.serverYz = '';
      },
      getCode(ev){
        let yzStyle = $("input[name='we1']:checked").val();
        this.$http({
          url: 'https://kaifamobile.firstcoinex.com/fwex/web/captcha/' + yzStyle,
          method: 'GET',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + this.$store.state.token,
          }
        }).then((res) => {
          this.showError(res.data.code, res.data.message);
          if (res.data.code === 200) {
            let t = 60;
            let tt = setInterval(function () {
              ev.target.innerHTML = --t + 's';
              ev.target.setAttribute('disabled', true);
            }, 1000);
            if (tt <= 0) {
              ev.target.innerHTML = '获取验证码';
              ev.target.setAttribute('disabled', false);
              clearInterval(tt)
            }
          }
        }).catch((req) => {
          this.showError(req.code, req.message)

        })
      }
    },

  }
</script>
<style scoped>
  .addCurrencyAdr-title {
    padding: 2rem 0;
    font-size: 1.833rem;
    border-bottom: 1px solid #ddd;
  }

  .from-box {
    padding: 4rem 0;
  }

  .from-box > div {
    display: flex;
    align-items: center;
    margin-bottom: 2.25rem;
  }

  .from-box > div > span {
    width: 28%;
    text-align: right;
    margin-right: 4rem;
    font-size: 1.167rem;
  }

  .from-box > div:nth-of-type(1) > p, .from-box > div:nth-of-type(2) > p:nth-of-type(1), .from-box > div:nth-of-type(3) > p, .from-box > div:nth-of-type(6) > p, .from-box > div:nth-of-type(4) > p, .from-box > div:nth-of-type(5) > p {
    width: 30rem;
    height: 5rem;
    margin-bottom: -1.5rem;
  }

  .from-box > div:nth-of-type(1) > p > input, .from-box > div:nth-of-type(2) > p > input, .from-box > div:nth-of-type(3) > p > input, .from-box > div:nth-of-type(4) > p > input, .from-box > div:nth-of-type(5) > p > input {
    width: 90%;
    padding: 0.667rem 1rem;
  }

  .from-box > div:nth-of-type(6) > p > span:nth-of-type(1) {
    height: 3.167rem;
    border: 1px solid #aaa;
    width: 97.2%;
  }

  .from-box > div:nth-of-type(6) > p > span > input {
    width: 71%;
    outline: none;
    border: none;
    padding-left: 1rem;
  }

  .from-box > div:nth-of-type(6) > p > span > button {
    width: 26%;
    border: none;
    height: 100%;
    outline: none;
    cursor: pointer;
    color: #fff;
    background: #01aaef;
  }

  .from-box > div:nth-of-type(7) > p > button {
    width: 10rem;
    padding: 0.75rem 1.167rem;
    font-size: 1.167rem;
    border: none;
    cursor: pointer;
  }

  .from-box > div:nth-of-type(7) > p > button:nth-of-type(1) {
    background: #01aaef;
    margin-right: 2rem;
    color: #fff
  }

  .from-box > div:nth-of-type(7) > p > button:nth-of-type(2) {
    color: #333333;
    background: #E5E5E5;
  }

  .from-box > div:nth-of-type(7) > p > button:nth-of-type(1):hover {
    background: #0186bc;
  }

  .from-box > div:nth-of-type(7) > p > button:nth-of-type(2):hover {
    background: #cccccc;
  }

  .from-box > div > p > span {
    display: flex;
    align-items: center;
  }

  .display-flex-p {
    display: flex;
    align-items: center;
  }

  .from-box .cash-tishi {
    display: none;
  }

  .addCurrencyAdr-yz input {
    display: none;
  }

  .addCurrencyAdr-yz label {
    padding: 0.8rem 1rem;
    border: 1px solid #999;
    border-radius: 3px;
    margin-right: 2rem;
    font-size: 1.167rem;
  }

  .addCurrencyAdr-yz .border-color {
    border-color: #01aaef;
    background: #01aaef;
    color: #fff;
  }
</style>
