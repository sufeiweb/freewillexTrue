<template>
  <div class="business-home">
    <div class="business-box-right-header">
      <div class="header-nav">
        <a href="javascript:" class="header-nav-active" @click="maker_style()">限价</a>
        <a href="javascript:" @click="maker_style1()">市价</a>
      </div>
      <a href="javascript:" class="go-quotation">行情 >></a>
    </div>
    <div class="business-box-right-content">

      <div class="right-content-left">
        <form name="purchase">
          <div class="business-box-content">
            <div class="business-box-content-available"><em>可用</em><span class="business-purchase-available"><em>￥</em>{{userKCNY}}</span>
            </div>
            <div class="business-box-content-lever">
              <p>可用杠杆额度<span class="business-purchase-lever">￥4231132</span></p>
              <p><span> </span><span>关</span></p>
            </div>

            <div class="buying-rate" v-show="!marketPrice">
              <i>买入价</i>
              <input type="text" v-model="selfBuy1" class="purchase-price" maxlength="12"/>
              <p><i class="iconfont" @click='add1()'>&#xe685;</i><i class="iconfont" @click="jian1()">&#xe673;</i></p>
            </div>

            <div class="buying-rate buying-rate-hide-box" v-show="marketPrice">
              <el-input placeholder="以市场上最优价格买入" :disabled="true" class="buying-rate-disabled"></el-input>
              <div class="buying-rate-hide">
                <p>当使用市价买入时，系统会根据您预留的金额在市场上从低到高进行扫单，直至金额用完为止。</p>
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>

            <div class="business-box-content-move">
              <div class="move-box">
                <p class="move-view"></p>
                <p class="move-btn">
                  <span class="move-btn-num">0%</span>
                </p>
              </div>
              <p class="move-line">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </p>
              <p class="move-num">
                <span>&nbsp;0&nbsp;&nbsp;</span>
                <span>25</span>
                <span>&nbsp;50</span>
                <span>&nbsp;&nbsp;75</span>
                <span>100</span>
              </p>
            </div>
            <div class="buying-rate">
              <i>买入量(BTC)</i>
              <input type="text" class="purchase-volume width-70" v-model="selfBuy2" maxlength="12" />
            </div>
            <div class="business-box-content-text">
              <p class="text-p1">
                <span>交易额</span>
                <em class="show-buy">0.00</em>
              </p>
              <p>
                <span>已用杠杆额度</span>
                <em>0.00</em>
              </p>
            </div>
            <div class="business-box-content-explain">
              <p>最小交易量为0.001BTC</p>
            </div>
            <div class="business-box-btn">
              <input type="button" value="买入" class="purchase-btn"/>
            </div>
          </div>
        </form>
      </div>

      <div class="right-content-center">
        <form name="sellOut">
          <div class="business-box-content">
            <div class="business-box-content-available"><em>可用</em><span class="business-sellOut-available"><em>฿</em>{{userKBTC}}</span>
            </div>
            <div class="business-box-content-lever">
              <p>可用杠杆额度<span class="business-purchase-lever">฿112112.0000</span></p>
              <p><span></span><span>关</span></p>
            </div>

            <div class="buying-rate" v-show="!marketPrice">
              <i>买出价</i>
              <input type="text" v-model="selfSell1"  class="sellOut-price" maxlength="12"/>
              <p><i class="iconfont" @click="add2()">&#xe685;</i><i class="iconfont" @click="jian2()">&#xe673;</i></p>
            </div>

            <div class="buying-rate buying-rate-hide-box" v-show="marketPrice">
              <el-input placeholder="以市场上最优价格卖出" :disabled="true" class="buying-rate-disabled"></el-input>
              <div class="buying-rate-hide">
                <p>当使用市价卖出时，系统会根据您预留的金额在市场上从低到高进行扫单，直至金额用完为止。</p>
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>

            <div class="business-box-content-move">
              <div class="move-box">
                <p class="move-view"></p>
                <p class="move-btn">
                  <span class="move-btn-num">0%</span>
                </p>
              </div>
              <p class="move-line">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </p>
              <p class="move-num">
                <span>&nbsp;0&nbsp;&nbsp;</span>
                <span>25</span>
                <span>&nbsp;50</span>
                <span>&nbsp;&nbsp;75</span>
                <span>100</span>
              </p>
            </div>
            <div class="buying-rate">
              <i>买出量(BTC)</i>
              <input type="text" v-model="selfSell2" class="sellOut-volume width-70" maxlength="12"/>
            </div>
            <div class="business-box-content-text">
              <p class="text-p1">
                <span>交易额</span>
                <em class="show-sell">0.00</em>
              </p>
              <p>
                <span>已用杠杆额度</span>
                <em>0.00</em>
              </p>
            </div>
            <div class="business-box-content-explain">
              <p>最小交易量为0.001BTC</p>
            </div>
            <div class="business-box-btn">
              <input type="button" value="卖出" class="sellOut-btn"/>
            </div>
          </div>
        </form>
      </div>

      <div class="right-content-right">
        <div class="right-content-right-header">
          <p>最新价<span>￥1212.00</span></p>
          <span>0.02%</span>
        </div>
        <ul class="business-sell">
          <li><span>卖5</span><span>--</span><span>--</span></li>
          <li><span>卖4</span><span>--</span><span>--</span></li>
          <li><span>卖3</span><span>--</span><span>--</span></li>
          <li><span>卖2</span><span>--</span><span>--</span></li>
          <li><span>卖1</span><span>--</span><span>--</span></li>
        </ul>
        <ul class="business-purchase">
          <li><span>买1</span><span>--</span><span>--</span></li>
          <li><span>买2</span><span>--</span><span>--</span></li>
          <li><span>买3</span><span>--</span><span>--</span></li>
          <li><span>买4</span><span>--</span><span>--</span></li>
          <li><span>买5</span><span>--</span><span>--</span></li>
        </ul>
      </div>
    </div>
    <dottedLine></dottedLine>
    <entrustedRecord></entrustedRecord>
  </div>
</template>
<script>
  import dottedLine from '../lettle_components/dottedLine.vue';
  import entrustedRecord from '../lettle_components/entrustedRecord.vue';
  export default {
    data() {
      return {
        marketPrice: false,
        userKCNY: 95655.55,
        userKBTC: 1212155.5533,
        selfBuy1: 4825.12,
        selfBuy2: '0.0000',
        selfSell1: 4825.12,
        selfSell2: '0.0000'
      }
    },
    components: {
      dottedLine, entrustedRecord
    },
    mounted() {
      {
          let that =this;
          $('.sellOut-volume').keyup(function () {
            let num=$(this).val();
            that.selfSell2 = parseFloat(num).toFixed(4);
            if(isNaN(num)){
              that.selfSell2 = '0.0000'
            }
          });
          $('.purchase-volume').keyup(function () {
            let num1=$(this).val();
            that.selfBuy2 = parseFloat(num1).toFixed(4);
            console.log(isNaN(num1));
            if(isNaN(num1)){
              that.selfBuy2 = '0.0000'
            }
          })
      }


      {
        $('.header-nav a').click(function () {
          $(this).addClass('header-nav-active').siblings().removeClass('header-nav-active');
        });
      }
      {
        $('.buying-rate-hide-box').hover(function () {
          $(this).find('.buying-rate-hide').css({
            display: "block"
          })
        }, function () {
          $(this).find('.buying-rate-hide').css({
            display: "none"
          })
        })
      }
      {
          $('.sellOut-volume').keyup(function () {
              console.log($(this).val());
            $(this).val();
          });
      }
//      滑动
      {
        let that = this;
        $('.move-btn').mousedown(function (event1) {
          let _this=this;
          var $evt1 = event1 || window.event;
          var $iOffsetL = $evt1.clientX - this.offsetLeft;
          $(document).bind('mousemove', function (event2) {
            var $evt2 = event2 || window.event;
            var $iPosX = $evt2.clientX - $iOffsetL;
            var $widths = $('.move-box').width() - 7;
            if ($iPosX >= 0 && $iPosX < $widths) {
              $(_this).prev().css({
                width: $iPosX,
                background: '#01aaef',
                position: "absolute",
                opacity: .8,
              });
              let sum = ($iPosX * 100 / $widths).toFixed(2);
              let buyNum = (sum * that.userKCNY / 100).toFixed(2);
              let sellNum = (sum * that.userKBTC / 100).toFixed(2);
              let selfNumBuy = (buyNum / that.selfBuy1).toFixed(4);
              let selfNumSell = (buyNum / that.selfSell1).toFixed(4);
              $(_this).parent().parent().parent().find('.purchase-volume').val(selfNumBuy);
              $(_this).parent().parent().parent().find('.sellOut-volume').val(selfNumSell);
//              that.selfBuy2 = selfNum;
//              $('.move-btn-num').html(sum + '%');
              $(_this).parent().parent().parent().find('.move-btn-num').html(sum + '%');
              $(_this).parent().parent().parent().find('.show-buy').html(buyNum);
              $(_this).parent().parent().parent().find('.show-sell').html(sellNum);
              $(_this).css({left: $iPosX + 'px'});
            }
          });
          $(document).bind('mouseup', function (event3) {
            var $evt3 = event3 || window.event;
            var $iPosX3 = $evt3.clientX - $iOffsetL;
            var $widths = $('move-box').width() - 7;
            if ($iPosX3 <= 0) {
              $(_this).parent().parent().parent().find('.business-box-content-explain p').css({display: "block"})
            } else {
              $(_this).parent().parent().parent().find('.business-box-content-explain p').css({display: "none"})
            }
            $(document).unbind('mousemove');
            $(document).unbind('mouseup');
          });
          return false;
        });
      }
    },
    methods: {
      maker_style() {
        this.marketPrice = false;
      },
      maker_style1() {
        this.marketPrice = true;
      },
      add1(){
        let num = parseFloat(this.selfBuy1) + 0.01;
        this.selfBuy1 =num.toFixed(2);
        return false;
      },
      add2(){
        let num = parseFloat(this.selfSell1) + 0.01;
        this.selfSell1 =num.toFixed(2);
        return false;
      },
      jian1(){
        let num = this.selfBuy1 - 0.01;
        this.selfBuy1 = num.toFixed(2);
        return false;
      },
      jian2(){
        let num = this.selfSell1 - 0.01;
        this.selfSell1 = num.toFixed(2);
        return false;
      }
    }
  }
</script>
<style scoped>

  .business-box-right-header {
    width: 99%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    margin-bottom: 0.833rem;
  }

  .header-nav {
    display: flex;
  }

  .header-nav a {
    font-size: 1.333rem;
    padding: 0.667rem 0 1.25rem 0;
    margin-right: 2.083rem;
    border-bottom: 2px solid #fff;
  }

  .header-nav a:hover {
    border-bottom: 2px solid #01aaef;
  }

  .go-quotation {
    color: #01aaef;
    font-size: 1.083rem;
  }

  .header-nav .header-nav-active {
    border-bottom-color: #337ab7 !important;
  }

  .business-box-right-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-top: 0.75rem;
    color: #777;
  }

  .business-box-right-content > div {
    padding: 0 1rem;
    width: 26rem;
  }

  .business-box-right-content > div:nth-of-type(1) {
    border-right: 1px solid #f5f5f5;
  }

  .business-box-content > div {
    display: flex;
    align-items: center;
  }

  .business-box-content-available {
    align-items: flex-end !important;
    margin-bottom: 1.25rem;
    border-bottom: 1px solid #ddd;
  }

  .business-box-content-available > em {
    margin-bottom: .2rem;
  }

  .business-box-content-available em {
    font-style: normal;
    font-size: 1.1667rem !important;
  }

  .business-box-content-available span {
    font-size: 1.833rem;
    margin-left: 1rem;
  }

  .business-purchase-available {
    color: red;
    font-weight: bold;
  }

  .business-sellOut-available {
    color: #090;
    font-weight: bold;
  }

  .business-box-content-lever {
    justify-content: space-between;
    margin-bottom: 1.25rem;
  }

  .business-box-content-lever p:nth-of-type(1) {
    display: flex;
    align-items: center;
  }

  .business-box-content-lever p:nth-of-type(1) span {
    margin-left: .5rem;
    color: red;
  }

  .business-box-content-lever p:nth-of-type(2) {
    display: flex;
    align-items: center;
  }

  .business-box-content-lever p:nth-of-type(2) span {
    width: 2.583rem;
    height: 1.667rem;
    line-height: 1.667rem;
    background: #ECECEC;
    text-align: center;
    color: #fff;
  }

  .business-box-content-lever p:nth-of-type(2) span:nth-of-type(2) {
    background: #A0A0A0;

  }

  .buying-rate {
    color: #333;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    margin-bottom: 1.25rem;
  }

  .buying-rate i {
    color: #ccc !important;
    font-style: normal;
    padding-left: .9rem;
  }

  .buying-rate input {
    width: 75%;
    font-size: 1.5rem;
    border: none;
    outline: none;
    text-align: right;
    margin-left: .3rem;
    padding: 0 .9rem;
    box-sizing: border-box;
  }

  .buying-rate p {
    flex: 1;
    text-align: center;
  }

  .buying-rate p i {
    padding: 0;
    cursor: pointer;
  }

  .buying-rate p i:hover {
    background: #01aaef;
    color: #fff !important;
  }

  .business-box-content-move {
    width: 92%;
    flex-direction: column;
    margin: 3rem 1rem;
  }

  .move-box {
    position: relative;
    width: 100%;
    height: 1rem;
    border: 1rem solid #01aaef;
    border-right-color: #ececec;
    border-bottom: none;
    border-top: none;
    background: #ececec;
    cursor: pointer;
  }

  .move-box .move-btn {
    position: absolute;
    width: .5rem;
    height: 2rem;
    border: 1px solid #01aaef;
    top: -0.5rem;
  }

  .move-btn-num {
    min-width: 2rem;
    text-align: center;
    position: absolute;
    border: 1px solid #01aaef;
    top: -1.5rem;
    left: -0.1rem;
    padding: .1rem .2rem;
  }

  .move-view {
    background: #01aaef;
    height: 100%;
    width: 0;
  }

  .business-box-content-move > p {
    width: 100%;
    display: flex;
  }

  .move-line {
    border: 2rem solid #fff;
    border-top: none;
    border-bottom: none;
    margin-top: .5rem;
    justify-content: space-around;
  }

  .move-line span {
    width: 1px;
    height: 0.3rem;
    background: #e1e4e9;
  }

  .move-line span:nth-of-type(1), .move-line span:nth-of-type(6), .move-line span:nth-of-type(11), .move-line span:nth-of-type(16), .move-line span:nth-of-type(21) {
    height: 0.8rem;
  }

  .move-num {
    justify-content: space-between;
  }

  .width-70 {
    width: 73% !important;
    height: 3rem;
    line-height: 3rem;
  }

  .business-box-content-text {
    background: #FFFCFB;
    padding: 0.833rem;
    font-size: 1.083rem;
    display: block !important;
    margin-bottom: 1.25rem;
  }

  .business-box-content-text p {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.833rem;
  }

  .business-box-content-text p:nth-of-type(2) {
    opacity: 0;
  }

  .business-box-content-explain {
    margin-bottom: 1.25rem;
  }

  .business-box-content-explain p {
    width: 100%;
    text-align: center;
    color: red;
    display: none;
  }

  .business-box-btn {
    width: 100%;
    margin-bottom: 1.25rem;
  }

  .business-box-btn input {
    width: 100%;
    border: none;
    text-align: center;
    color: #fff;
    padding: 0.75rem 1.167rem;
    font-size: 1.167rem;
    border-radius: 0.333rem;
    cursor: pointer;
  }

  .sellOut-btn {
    background: #090;
  }

  .sellOut-btn:hover {
    background: #007500
  }

  .purchase-btn {
    background: red;
  }

  .purchase-btn:hover {
    background: #c9302c;
  }

  .right-content-right {
    padding: 0.7rem 2rem 0 2rem !important;
    box-sizing: border-box;
  }

  .right-content-right-header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    font-size: 1.1667rem;
    margin-bottom: .5rem;
  }

  .right-content-right-header p {
    display: flex;
    align-items: center;
  }

  .right-content-right-header p > span {
    color: red;
  }

  .right-content-right-header > span {
    color: red;
  }

  .right-content-right ul li {
    display: flex;
    align-items: center;
    padding: 0.95rem 0.667rem;
    border-bottom: 1px solid #F2F5F8;
  }

  .right-content-right ul li:hover {
    background: #ECECEC;
  }

  .right-content-right ul li span {
    flex: 1;
    text-align: center;
    font-size: 1.083rem;
  }

  .right-content-right ul li span:nth-of-type(3) {
    text-align: right;
  }

  .right-content-right ul li span:nth-of-type(1) {
    text-align: left;
    padding-left: 1rem;
    box-sizing: border-box;
  }

  .right-content-right ul:nth-of-type(1) li span:nth-of-type(1), .right-content-right ul:nth-of-type(1) li span:nth-of-type(3) {
    color: #090;
  }

  .right-content-right ul:nth-of-type(2) li span:nth-of-type(1), .right-content-right ul:nth-of-type(2) li span:nth-of-type(3) {
    color: red;
  }

  .buying-rate-disabled input {
    width: 100%;
    margin: 0;
    border-radius: 0;
    text-align: left;
    font-size: 1.167rem;
  }

  .buying-rate-hide-box {
    position: relative;
  }

  .buying-rate-hide {
    position: absolute;
    width: 63%;
    left: 50%;
    transform: translateX(-50%);
    top: -5.3rem;
    text-align: center;
    display: none;
  }

  .buying-rate-hide i {
    color: #000 !important;
  }

  .buying-rate-hide p {
    background: #000;
    color: #fff;
    margin-bottom: -.3rem;
    padding: .3rem .3rem;
  }
</style>
