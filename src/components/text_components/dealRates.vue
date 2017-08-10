<template>
  <div class="dealRates layout">
    <h1>费率声明</h1>
    <table>
      <thead>
      <tr>
        <td>币种</td>
        <td>充值</td>
        <td>提现</td>
        <td>杠杆</td>
        <td>交易</td>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>人民币</td>
        <td><span>单次≤1000 CNY:5CNY</span><span>单次＞1000 CNY:免费</span></td>
        <td><span>手续费：0.5%/次</span><span>单次最低手续费：2CNY</span><span>单次最低额：100 CNY</span><span>单次最高额：500000 CNY</span></td>
        <td><span>手续费：0.1%/24小时</span><span>单次最低手续费：0.1 CNY</span><span>单次最低额：100 CNY</span><span>最高倍数：5倍</span><span>净资产最低要求：100 CNY</span></td>
        <td>免费</td>
      </tr>
      <tr>
        <td>比特币</td>
        <td>免费</td>
        <td><span>手续费：0.0005 BTC/次</span><span>单次最高额：5 BTC</span><span>全年累计最高总额：100 BTC</span><span>单次低：0.1 BTC</span></td>
        <td><span>手续费：0.1%/24小时</span><span>单次最低手续费：0.001 BTC</span><span>单次最低额：0.1 BTC</span><span>最高倍数：5倍</span><span>净资产最低要求：100 CNY</span></td>
        <td>免费</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
  .dealRates{
    background: #fff;
    margin: 1.833rem auto;
    padding:  2rem;
  }
  .dealRates h1{
    padding: 2.5rem 0;
    font-weight: normal;
    text-align: center;
    font-size: 2.75rem;
  }
  .dealRates table{
    border-spacing: 0;
    border-collapse: collapse;
    width: 100%;
  }
</style>
