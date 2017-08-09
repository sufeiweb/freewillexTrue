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
        <span>验证方式</span>
        <p class="display-flex-p">
            <span>
              <input name="yanzheng" type="radio" id="yanzheng1" checked/>
              <label for="yanzheng1">邮箱验证</label>
            </span>
          <span>
              <input name="yanzheng" type="radio" id="yanzheng2"/>
              <label for="yanzheng2">短信验证</label>
            </span>
        </p>
      </div>
      <div>
        <span>验证码</span>
        <p>
            <span>
              <input type="text" placeholder="验证码" v-model="serverYz"/>
              <button>获取验证码</button>
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
          return{
            currencyAdr:'',
            tags:'',
            currencyStyle:'',
            serverYz:''
          }
      },
    mounted() {},
    methods: {
      bindGet() {
          let that=this;
          that.$http({
            url:'http://192.168.1.48:8089/fwex/web/digital/bind',
            method:'POST',
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              'X-Authorization': 'Bearer ' + that.$store.state.token,
              "Content-Type": "application/json;charset=UTF-8",
            },
            data: {
              currency: that.currencyStyle,
              address: that.currencyAdr,
              tags: that.tags,
            }
          }).then((res)=>{
              console.log(res,'请求成功')
          }).catch((req)=>{
              console.log(req,'请求失败')
          })
      },
      bindClose() {
        this.currencyAdr='';
        this.tags='';
        this.currencyStyle='';
        this.serverYz='';
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

  .from-box > div:nth-of-type(1) > p, .from-box > div:nth-of-type(2) > p:nth-of-type(1), .from-box > div:nth-of-type(3) > p, .from-box > div:nth-of-type(5) > p {
    width: 30rem;
    height: 5rem;
    margin-bottom: -1.5rem;
  }

  .from-box > div:nth-of-type(1) > p > input, .from-box > div:nth-of-type(2) > p > input, .from-box > div:nth-of-type(3) > p > input {
    width: 90%;
    padding: 0.667rem 1rem;
  }

  .from-box > div:nth-of-type(4) > p > span {
    margin-right: 2rem;
    font-size: 1.167rem;
    align-items: center;
  }

  .from-box > div:nth-of-type(4) > p > span label {
    margin-left: .5rem;
  }

  .from-box > div:nth-of-type(5) > p > span:nth-of-type(1) {
    height: 3.167rem;
    border: 1px solid #aaa;
    width: 97.2%;
  }

  .from-box > div:nth-of-type(5) > p > span > input {
    width: 71%;
    outline: none;
    border: none;
    padding-left: 1rem;
  }

  .from-box > div:nth-of-type(5) > p > span > button {
    width: 26%;
    border: none;
    height: 100%;
    outline: none;
    cursor: pointer;
    color: #fff;
    background: #01aaef;
  }

  .from-box > div:nth-of-type(6) > p > button {
    width: 10rem;
    padding: 0.75rem 1.167rem;
    font-size: 1.167rem;
    border: none;
    cursor: pointer;
  }

  .from-box > div:nth-of-type(6) > p > button:nth-of-type(1) {
    background: #01aaef;
    margin-right: 2rem;
    color: #fff
  }

  .from-box > div:nth-of-type(6) > p > button:nth-of-type(2) {
    color: #333333;
    background: #E5E5E5;
  }

  .from-box > div:nth-of-type(6) > p > button:nth-of-type(1):hover {
    background: #0186bc;
  }

  .from-box > div:nth-of-type(6) > p > button:nth-of-type(2):hover {
    background: #cccccc;
  }

  .from-box > div > p > span {
    display: flex;
    align-items: center;
  }
  .display-flex-p{
    display: flex;
    align-items: center;
  }
 .from-box .cash-tishi{
    display: none;
  }
</style>
