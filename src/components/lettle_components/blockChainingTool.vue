<template>
  <div class="blockChainingTool layout">
    <section>
      <div class="section-title">汇率计算器</div>
      <div class="section-content">
        <p><span class="section-content-num">1</span><span>{{currency1}}</span>=<span
          class="section-content-num">{{LatestPrice | float2}}</span><span>{{currency2}}</span>
        </p>
        <p><span class="section-content-num">1</span><span>{{currency2}}</span>=<span
          class="section-content-num">{{(1 / LatestPrice) | float8}}</span><span>{{currency1}}</span>
        </p>
        <div class="section-content-div">
          <p>
            <input type="text" v-model="currencyMoney1"/>
            <select @click="Change1($event)">
              <option v-for="item in currencyArr1" :value="item">{{item}}</option>
            </select>
          </p>=<p>
            <input type="text" v-model="currencyMoney2"/>
            <select @click="Change2($event)">
              <option v-for="item in currencyArr2" :value="item">{{item}}</option>
            </select>
          </p>
        </div>
      </div>
    </section>
    <section>
      <div class="section-title">二维码生成器</div>
      <div class="section-content de">
        <aside class="section-content-left">
          <p><span>地址</span><input type="text" id="GenerateCodeText" v-model="GenerateCodeText"/></p>
          <p><span>&nbsp;</span>
            <button @click="GenerateCode()">生成二维码</button>
          </p>
        </aside>
        <aside class="section-content-right">
          <aside id="ER-Code-view"></aside>
        </aside>
      </div>
    </section>
    <section>
      <div class="section-title">区块查询</div>
      <div class="section-content soso">
        <select name="searchTD" class="searchTD">
          <option value="BTC" selected>BTC</option>
          <option value="LTC">LTC</option>
          <option value="ETH">ETH</option>
          <option value="ETC">ETC</option>
          <option value="BCC">BCC</option>
          <option value="XRP">XRP</option>
        </select>
        <input type="text" placeholder="交易ID、地址、区块高度" v-model="iptText"/>
        <a href="javascript:;" @click="search($event)" target="_blank">搜索</a>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        currency1: 'BTC',//币种1
        currency2: 'CNY',//币种2
        LatestPrice: '',//最新价
        currencyArr1: [],//币种1数组
        currencyArr2: [],//币种2数组
        currencyMoney1: '',//币种数量
        currencyMoney2: '',//币种数量
        GenerateCodeText: '',//生成二维码地址
        iptText: '',
      }
    },
    mounted(){
      this.getCurrency();
      this.getLatestPrice();
    },
    methods: {
      getCurrency(){
        this.$http({
          url: this.$URL_API + 'commodity/account',
          method: 'GET',
          header: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        }).then((res) => {
//          console.log(res)
          if (res.data.code === 200) {
            this.currencyArr1 = res.data.data.BTC;
            this.currencyArr2 = res.data.data.CNY;
          }
        })
      },
      Change1(ev){
        this.currency1 = ev.target.value;
        this.getLatestPrice();
      },
      Change2(ev){
        this.currency2 = ev.target.value;
        this.getLatestPrice();
      },
      getLatestPrice(){
        this.$http({
          url: this.$URL_API + 'quotation/offerPrice/' + this.currency1 + this.currency2,
          method: 'GET',
          header: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        }).then((res) => {
//          console.log(res);
          if (res.data.code === 200) {
            this.LatestPrice = res.data.data.price;
          }

        })
      },
      GenerateCode(){
        $('#ER-Code-view').html('');
        this.QRC('ER-Code-view', this.GenerateCodeText)
      },
      search(ev){
        let currency = $('.searchTD').val();
        let iptText = this.iptText;
        switch (currency) {
          case 'BTC':
          case 'LTC':
          case 'ETH':
          case 'ETC':
            if (isNaN(iptText)) {
              if (iptText.length < 35) {
                window.open('https://block.bitbank.com/address/' + currency.toLowerCase() + '/' + iptText, '_blank');
              } else {
                window.open('https://block.bitbank.com/tx/' + currency.toLowerCase() + '/' + iptText, '_blank');
              }
            } else {
              window.open('https://block.bitbank.com/height/' + currency.toLowerCase() + '/' + iptText, '_blank');
            }
            break;
          case 'BCC':
            if (isNaN(iptText)) {
              if (iptText.length < 35) {
                window.open('https://blockchair.com/bitcoin-cash/address/' + iptText, '_blank');
              } else {
                window.open('https://blockchair.com/bitcoin-cash/transaction/' + iptText, '_blank');
              }
            } else {
              window.open('https://blockchair.com/bitcoin-cash/block/' + iptText, '_blank');
            }
            break;
          case 'XRP':
            window.open('https://xrpcharts.ripple.com/#/graph', '_blank');
            break;

        }

      }
    },
    watch: {
      currencyMoney2(){
        this.currencyMoney1 = (this.currencyMoney2 / this.LatestPrice).toFixed(8)
      },
      currencyMoney1(){
        if (this.currency2 === 'CNY') {
          this.currencyMoney2 = (this.currencyMoney1 * this.LatestPrice).toFixed(2)
        } else {
          this.currencyMoney2 = (this.currencyMoney1 * this.LatestPrice).toFixed(8)
        }

      },
      iptText(){

      }
    }
  }
</script>
<style scoped>
  .blockChainingTool section {
    background: #fff;
    margin: 20px 0;
    padding: 20px;
  }

  .blockChainingTool section .section-title {
    font-size: 16px;
    border-bottom: 1px solid #666;
    padding: 10px 0;
  }

  .blockChainingTool section .section-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
  }

  .blockChainingTool section .section-content p, .blockChainingTool section .section-content > div {
    display: flex;
    align-items: center;
  }

  .blockChainingTool section .section-content.de {
    flex-direction: inherit;
    justify-content: space-around;
    align-items: flex-start;
  }

  .section-content.soso {
    flex-direction: inherit !important;
    align-items: center;
    width: 80%;
    border: 1px solid #ddd;
    margin: 20px auto;
    font-size: 14px;
    padding: 0 !important;
  }

  .section-content.soso input {
    padding: 10px 10px;
    width: 82%;
    outline: none;
    border: none;
  }

  .section-content.soso select {
    padding: 10px 10px;
    width: 8%;
    outline: none;
    border: none;
    background: #01aaef;
    color: #fff;
  }

  .section-content.soso a {
    width: 10%;
    text-align: center;
    background: #01aaef;
    padding: 10px 0;
    color: #fff;
  }

  #ER-Code-view {
    width: 150px;
    height: 150px;
    border: 1px solid #ddd;
    padding: 3px;
    background: #f5f5f5;
  }

  .section-content-left {
    padding-top: 50px;
  }

  .section-content-left p {
    margin-bottom: 20px;
    font-size: 14px;
  }

  .section-content-left p span {
    margin-right: 15px;
    width: 50px;
  }

  .section-content-left p:nth-of-type(1) input {
    padding: 5px;
    width: 300px;
    outline: none;
  }

  .section-content-left p:nth-of-type(2) button {
    border: none;
    padding: 10px 20px;
    background: #01aaef;
    color: #fff;
    border-radius: 4px;
  }

  .section-content-right {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .section-content-right aside {
    margin-bottom: 10px;
  }

  .section-content-right a {
    font-size: 14px;
    color: #01aaef;
    text-decoration: underline;
  }

  .section-content-num {
    color: #01aaef;
    font-size: 24px;
  }

  section-content p {
    align-items: flex-end !important;
    width: 200px !important;
  }

  section-content p span:nth-of-type(1), section-content p span:nth-of-type(2) {
    width: 30px;
  }

  .section-content-div {
    padding: 20px 0;
  }

  .section-content-div p {
    font-size: 14px;
    width: 210px;
    border: 1px solid #999;
  }

  .section-content-div p input {
    padding: 3px;
    border: none;
    width: 75%;
    outline: none;
  }

  .section-content-div p select {
    width: 25%;
    border: none;
    background: #01aaef;
    color: #fff;
    border: 1px solid #01aaef;
    padding: 3px 0;
    outline: none;
  }
</style>
