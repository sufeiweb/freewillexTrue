<template>
  <div class="userIndex-recharge">
    <div class="recharge-group">
      <div class="recharge-group-title">
        <p>选择账户</p>
        <a href="javascript:;">充值记录</a>
      </div>
      <div class="recharge-group-radio">
        <input name="select-account" type="radio" id="account-cny" value="1" checked/>
        <label for="account-cny" class="recharge-group-radio-checked">
          <span class=""><span><i class="iconfont">&#xe664;</i></span></span>
          <i class="iconfont">&#xe650;</i>
          <span>CNY账户</span>
        </label>
        <input name="select-account" type="radio" id="account-btc" value="2"/>
        <label for="account-btc">
          <span><span><i class="iconfont">&#xe664;</i></span></span>
          <i class="iconfont">&#xe650;</i>
          <span>BTC账户</span>
        </label>
      </div>
    </div>
    <div class="recharge-group">
      <div class="recharge-group-title">
        <p>充值币种</p>
      </div>
      <div class="recharge-group-radio">
        <input name="select-account" type="radio" id="recharge-currency-cny" value="1" checked/>
        <label for="recharge-currency-cny" class="recharge-group-radio-checked">
          <span class=""><span><i class="iconfont">&#xe664;</i></span></span>
          <i class="iconfont">&#xe650;</i>
          <span>CNY</span>
        </label>
        <input name="select-account" type="radio" id="recharge-currency-cny-btc" value="2"/>
        <label for="recharge-currency-cny-btc">
          <span><span><i class="iconfont">&#xe664;</i></span></span>
          <i class="iconfont">&#xe650;</i>
          <span>BTC</span>
        </label>
        <input name="select-account" type="radio" id="recharge-currency-cny-ltc" value="2"/>
        <label for="recharge-currency-cny-ltc">
          <span><span><i class="iconfont">&#xe664;</i></span></span>
          <i class="iconfont">&#xe650;</i>
          <span>LTC</span>
        </label>
        <input name="select-account" type="radio" id="recharge-currency-cny-eth" value="2"/>
        <label for="recharge-currency-cny-eth">
          <span><span><i class="iconfont">&#xe664;</i></span></span>
          <i class="iconfont">&#xe650;</i>
          <span>ETH</span>
        </label>
        <input name="select-account" type="radio" id="recharge-currency-cny-etc" value="2"/>
        <label for="recharge-currency-cny-etc">
          <span><span><i class="iconfont">&#xe664;</i></span></span>
          <i class="iconfont">&#xe650;</i>
          <span>ETC</span>
        </label>
      </div>
    </div>
    <div class="recharge-group">
      <div class="recharge-group-title">
        <p>充值方式</p>
      </div>
      <div class="recharge-group-radio">
        <input name="select-account" type="radio" id="recharge-mode-cny" value="1" checked/>
        <label for="recharge-mode-cny" class="recharge-group-radio-checked">
          <span class=""><span><i class="iconfont">&#xe664;</i></span></span>
          <i class="iconfont">&#xe650;</i>
          <span>网上银行</span>
        </label>
        <input name="select-account" type="radio" id="recharge-mode-btc" value="2"/>
        <label for="recharge-mode-btc">
          <span><span><i class="iconfont">&#xe664;</i></span></span>
          <i class="iconfont">&#xe650;</i>
          <span>自助汇款</span>
        </label>
        <input name="select-account" type="radio" id="recharge-mode-zfb" value="2"/>
        <label for="recharge-mode-zfb">
          <span><span><i class="iconfont">&#xe664;</i></span></span>
          <i class="iconfont">&#xe650;</i>
          <span>支付宝</span>
        </label>
      </div>
    </div>
    <div class="recharge-group">
      <div class="recharge-group-title">
        <p>选择银行</p>
        <a href="javascript:;">更多</a>
      </div>
      <div class="recharge-group-radio">
        <input name="select-account" type="radio" id="recharge-mode-cny" value="1" checked/>
        <label for="recharge-mode-cny" class="recharge-group-radio-checked">
          <span class=""><span><i class="iconfont">&#xe664;</i></span></span>
          <i class="iconfont">&#xe650;</i>
          <span>网上银行</span>
        </label>
        <input name="select-account" type="radio" id="recharge-mode-btc" value="2"/>
        <label for="recharge-mode-btc">
          <span><span><i class="iconfont">&#xe664;</i></span></span>
          <i class="iconfont">&#xe650;</i>
          <span>自助汇款</span>
        </label>
        <input name="select-account" type="radio" id="recharge-mode-zfb" value="2"/>
        <label for="recharge-mode-zfb">
          <span><span><i class="iconfont">&#xe664;</i></span></span>
          <i class="iconfont">&#xe650;</i>
          <span>支付宝</span>
        </label>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .userIndex-recharge {
    padding: 0 1.667rem 0 3.333rem;
    font-size: 1.167rem;
  }

  .recharge-group {
    margin-bottom: 1.25rem;
  }

  .recharge-group-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.333rem;
    border-bottom: 1px solid #ddd;
    padding: 1.5rem 0;
    margin-bottom: 1.25rem;
  }

  .recharge-group-radio {
    display: flex;
  }

  .recharge-group-radio > input {
    display: none;
  }

  .recharge-group-radio > label {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #ddd;
    padding: 2.2rem 3rem;
    margin-right: 1.667rem;
    position: relative;
  }

  .recharge-group-radio > label > span:nth-of-type(1) {
    display: none;
    position: absolute;
    right: -0.8rem;
    top: -0.8rem;
    background: #fff;
    padding: .3rem;
    border-radius: 50%;
  }

  .recharge-group-radio > label > span:nth-of-type(1) > span {
    border-radius: 50%;
    background: #01aaef;
    color: #fff;
    padding: 0.1rem;
  }

  .recharge-group-radio-checked {
    border-color: #01aaef !important;
  }

  .recharge-group-radio-checked > span {
    display: block !important;
  }
</style>


