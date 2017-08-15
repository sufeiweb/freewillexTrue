<template>
  <div class="dealRates layout">
    <h1>费率声明</h1>
    <table border="1">
      <thead>
      <tr>
        <td colspan="4">人民币专区账户</td>
      </tr>
      <tr>
        <td>币种</td>
        <td>充值</td>
        <td>提现</td>
        <td>交易</td>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td><span>人民币</span><span>CNY</span></td>
        <td><span>单次≤1000 CNY:5CNY</span><span>单次＞1000 CNY:免费</span></td>
        <td><span>手续费：0.5%/次</span><span>单次最低手续费：2CNY</span><span>单次最低额：100 CNY</span><span>单次最高额：500000 CNY</span></td>
        <!--<td><span>手续费：0.1%/24小时</span><span>单次最低手续费：0.1 CNY</span><span>单次最低额：100 CNY</span><span>最高倍数：5倍</span><span>净资产最低要求：100 CNY</span></td>-->
        <td><span>挂单：免费</span>
          <span>吃单：免费</span></td>
      </tr>
      <tr>
        <td><span>比特币</span><span>BTC</span></td>
        <td>免费</td>
        <td><span>手续费：0.0005 BTC/次</span></td>
        <!--<td><span>手续费：0.1%/24小时</span><span>单次最低手续费：0.001 BTC</span><span>单次最低额：0.1 BTC</span><span>最高倍数：5倍</span><span>净资产最低要求：100 CNY</span></td>-->
        <td><span>挂单：0.1%</span>
          <span>吃单：0.1%</span></td>
      </tr>
      <tr>
        <td><span>莱特币</span><span>LTC</span></td>
        <td>免费</td>
        <td><span>手续费：0.001 LTC/次</span></td>
        <!--<td><span>手续费：0.1%/24小时</span><span>单次最低手续费：0.001 BTC</span><span>单次最低额：0.1 BTC</span><span>最高倍数：5倍</span><span>净资产最低要求：100 CNY</span></td>-->
        <td><span>挂单：0.1%</span>
          <span>吃单：0.1%</span></td>
      </tr>
      <tr>
        <td><span>比特币现金</span><span>BCC</span></td>
        <td>免费</td>
        <td><span>手续费：0.001 BCC/次</span></td>
        <!--<td><span>手续费：0.1%/24小时</span><span>单次最低手续费：0.001 BTC</span><span>单次最低额：0.1 BTC</span><span>最高倍数：5倍</span><span>净资产最低要求：100 CNY</span></td>-->
        <td><span>挂单：0.1%</span>
          <span>吃单：0.1%</span></td>
      </tr>
      <tr>
        <td><span>以太坊</span><span>ETH</span></td>
        <td>免费</td>
        <td><span>手续费：0.01 ETH/次</span></td>
        <!--<td><span>手续费：0.1%/24小时</span><span>单次最低手续费：0.001 BTC</span><span>单次最低额：0.1 BTC</span><span>最高倍数：5倍</span><span>净资产最低要求：100 CNY</span></td>-->
        <td><span>挂单：0.1%</span>
          <span>吃单：0.1%</span></td>
      </tr>
      <tr>
        <td><span>以太经典</span><span>ETC</span></td>
        <td>免费</td>
        <td><span>手续费：0.01 ETC/次</span></td>
        <!--<td><span>手续费：0.1%/24小时</span><span>单次最低手续费：0.001 BTC</span><span>单次最低额：0.1 BTC</span><span>最高倍数：5倍</span><span>净资产最低要求：100 CNY</span></td>-->
        <td><span>挂单：0.1%</span>
          <span>吃单：0.1%</span></td>
      </tr>
      </tbody>
    </table>
    <table border="1">
      <thead>
      <tr>
        <td colspan="4">比特币专区账户</td>
      </tr>
      <tr>
        <td>币种</td>
        <td>充值</td>
        <td>提现</td>
        <td>交易</td>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td><span>比特币</span><span>BTC</span></td>
        <td>免费</td>
        <td>手续费：0.0005 BTC/次</td>
        <td><span>挂单：0.1%</span>
          <span>吃单：0.1%</span></td>
      </tr>
      <tr>
        <td><span>莱特币</span><span>LTC</span></td>
        <td>免费</td>
        <td>手续费：0.001 LTC/次</td>
        <td><span>挂单：0.1%</span>
          <span>吃单：0.1%</span></td>
      </tr>
      <tr>
        <td><span>比特币现金</span><span>BCC</span></td>
        <td>免费</td>
        <td>手续费：0.01 BCC/次</td>
        <td><span>挂单：0.1%</span>
          <span>吃单：0.1%</span></td>
      </tr>
      <tr>
        <td><span>以太坊</span><span>ETH</span></td>
        <td>免费</td>
        <td>手续费：0.01 ETH/次</td>
        <td><span>挂单：0.1%</span>
          <span>吃单：0.1%</span></td>
      </tr>
      <tr>
        <td><span>以太经典</span><span>ETC</span></td>
        <td>免费</td>
        <td>手续费：0.01 ETC /次</td>
        <td><span>挂单：0.1%</span>
          <span>吃单：0.1%</span></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
  .dealRates {
    background: #fff;
    margin: 1.833rem auto;
    padding: 2rem;
  }

  .dealRates h1 {
    padding: 2.5rem 0;
    font-weight: normal;
    text-align: center;
    font-size: 2.75rem;
  }

  .dealRates table {
    border-spacing: 0;
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 5rem;
    font-size: 1.33rem;
  }

  .dealRates table td {
    text-align: center;
    height: 8rem;
  }

  .dealRates table thead td {
    text-align: center;
    height: 3rem;
  }

  .dealRates table td:nth-of-type(1) {
    width: 25%;
  }

  .dealRates table td:nth-of-type(2) {
    width: 25%;
  }

  .dealRates table td:nth-of-type(3) {
    width: 25%;
  }

  .dealRates table:nth-of-type(1) thead {
    background: red;
    color: #fff;
  }

  .dealRates table:nth-of-type(2) thead {
    background: green;
    color: #fff;
  }
</style>
