<template>
  <div class="addBankCard">
    <div class="addBankCard-title">
      <p>绑定银行卡</p>
    </div>
    <div class="addBankCard-content">
      <section>
        <div>
          <span>性名</span>
          <input type="text" value="苏**"/>
        </div>
      </section>
      <section>
        <div>
          <span>国家/地区</span>
          <input type="text" value="中国"/>
        </div>
      </section>
      <section>
        <div>
          <span>身份证号码</span>
          <input type="text" value="3************5"/>
        </div>
      </section>
      <section>
        <div>
          <span>借记卡号</span>
          <input type="text" placeholder="借记卡号" class="jiejikahao"/>
        </div>
        <div class="jiejikahao-tips"></div>
      </section>
      <section>
        <div>
          <span>开户银行</span>
          <select class="select-bank-zc">
            <option value="0">请选择银行</option>
          </select>
        </div>
      </section>
      <section>
        <div>
          <span>开户支行</span>
          <input type="text" placeholder="开户支行名称"/>
          <span class="color-red">支行信息错误会导致提现失败，请仔细确认</span>
        </div>
      </section>
      <section>
        <div>
          <span>手机号码</span>
          <p>
            <span>+86</span>
            <input type="text" placeholder="手机号码" class="phoneNum-addBank"/>
          </p>
          <div class="phoneNum-addBank-tips"></div>
        </div>
      </section>
      <section class="section-yz">
        <div>
          <span>验证码</span>
          <p>
            <input type="text" placeholder="验证码" class="YZ-addBank"/>
            <span>4702</span>
          </p>
          <div class="YZ-addBank-tips"></div>
        </div>
      </section>
      <section class="section-yz">
        <div>
          <span>手机验证码</span>
          <p>
            <input type="text" placeholder="手机验证码" class="phoneYZ-addBank"/>
            <span class="addBankGetCord">获取验证码</span>
          </p>
          <div class="phoneYZ-addBank-tips"></div>
        </div>
      </section>
      <div class="addBankCard-Btn">
        <button>确认绑定</button>
      </div>
    </div>
  </div>
</template>
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

  .addBankCard-content .section-yz > div > p > span {
    width: 30%;
    border-right: none;
    text-align: center;
    background: #01aaef;
    color: #fff;
  }

  .addBankCard-content .section-yz > div > p > input {
    width: 60%;
  }
  .addBankCard-Btn >button{
    background: #01aaef;
    color: #fff;
    padding: 0.833rem 1.5rem;
    border:none;
    border-radius: 3px;
  }
  .addBankCard-content section:nth-of-type(1) input, .addBankCard-content section:nth-of-type(2) input, .addBankCard-content section:nth-of-type(3) input{
   background: #f0f0f0;
    cursor: no-drop;
  }
</style>
