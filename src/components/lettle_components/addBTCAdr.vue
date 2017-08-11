<template>
  <div class="addBTCAdr">
    <div class="addBTCAdr-title">
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
      <div>
        <span>数字货币币种</span>
        <p>
          <input type="text" placeholder="数字货币币种" v-model="currencyStyle"/>
        </p>
      </div>
      <div>
        <span>手机/邮箱</span>
        <p>
          <input type="text" placeholder="手机/邮箱" v-model="moe"/>
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
          <button @click="bindGet()">提交</button>
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
    },
    methods: {
      bindGet() {
        this.$http({
          url: 'http://192.168.1.48:8089/fwex/web/digital/bind',
          method: 'POST',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + this.$store.state.token,
            "Content-Type": "application/json;charset=UTF-8",
          },
          data: {
            currency: this.currencyStyle,
            address: this.currencyAdr,
            remark: this.tags,
            capitalPwd: this.capitalPwd,
            moe: this.moe,
            captcha: this.serverYz
          }
        }).then((res) => {
          console.log(res, '请求成功')
        }).catch((req) => {
          console.log(req, '请求失败')
        })
      },
      bindClose() {
        this.currencyAdr = '';
        this.tags = '';
        this.currencyStyle = '';
        this.serverYz = '';
      },
      getCode(ev){
        let pattern1 = /0?^(13|14|15|18|17)[0-9]{9}/;
        let pattern2 = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+(com|cn)$/;
        let url;
        if (pattern1.test(this.moe)) {
          url = 'http://192.168.1.48:8089/fwex/web/captcha/mobile/'
        } else if (pattern2.test(this.moe)) {
          url = 'http://192.168.1.48:8089/fwex/web/captcha/email/'
        }
        this.$http({
          url: url + this.moe,
          method: 'GET',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + this.$store.state.token,
          }
        }).then((res) => {
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
            console.log(res.data.message);
          }
        }).catch((req) => {
          console.log(req, '请求失败')
        })
      }
    },

  }
</script>
<style scoped>
  .addBTCAdr-title {
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
</style>
