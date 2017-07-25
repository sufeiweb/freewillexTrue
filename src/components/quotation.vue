<template>
  <div class="quotation">
    <transition enter-active-class="animated zoomInLeft">
      <div class="screenShot">
        <div class="zhe-zhao"></div>
        <div class="screenShot-content">
          <img src="../assets/img/other/cross_little.png" @click="closeScreenShot()"/>
          <div class="screenShot-content-home"></div>
          <div class="screenShot-content-share">
            <span>是否把截屏分享给好友？</span>
            <span>
            <i class="iconfont">&#xe677;</i>
            <i class="iconfont">&#xe69f;</i>
            <i class="iconfont">&#xe64f;</i>
            <i class="iconfont">&#xe6a8;</i>
            <i class="iconfont">&#xe6a2;</i>
          </span>
            <span>
            <a href="javascript:">复制</a>
            <a href="javascript:">保存</a>
          </span>
          </div>
        </div>
      </div>
    </transition>
    <div class="quotation-header">
      <router-link to="/"><img src="../assets/img/quotation/quotation_logo.png"/></router-link>
      <div class="transaction-variety">
        <span>BTC/CNY</span>
        <div class="transaction-btn-box">
          <span>选择交易品种</span>
          <i class="iconfont" @click="closeOPenTradingClass()">&#xe673;</i>
        </div>
        <transition
          enter-active-class="animated zoomInLeft"
        >
          <div class="select-trading-class">
            <div class="select-trading-coin">
              <span>比特币</span>
              <div>
                <div v-for="item in coinStyle">
                  <span>{{item.coinStyle}}</span>
                  <span>{{item.price}}</span>
                  <p :class="item.trend?'red':'green'">
                    <span>{{item.range}}</span>
                    <i class="el-icon-caret-top" v-show="item.trend"></i>
                    <i class="el-icon-caret-bottom" v-show="!item.trend"></i>
                  </p>
                </div>
              </div>
            </div>
            <div class="select-trading-coin">
              <span>比特币</span>
              <div>
                <div v-for="item in coinStyle">
                  <span>{{item.coinStyle}}</span>
                  <span>{{item.price}}</span>
                  <p :class="item.trend?'red':'green'">
                    <span>{{item.range}}</span>
                    <i class="el-icon-caret-top" v-show="item.trend"></i>
                    <i class="el-icon-caret-bottom" v-show="!item.trend"></i>
                  </p>
                </div>
              </div>
            </div>
            <div class="select-trading-coin">
              <span>比特币</span>
              <div>
                <div v-for="item in coinStyle">
                  <span>{{item.coinStyle}}</span>
                  <span>{{item.price}}</span>
                  <p :class="item.trend?'red':'green'">
                    <span>{{item.range}}</span>
                    <i class="el-icon-caret-top" v-show="item.trend"></i>
                    <i class="el-icon-caret-bottom" v-show="!item.trend"></i>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="follow-us">
        <div class="follow-icon">
          <i class="iconfont">&#xe677;</i>
          <i class="iconfont">&#xe69f;</i>
        </div>
        <span>关注FreeWillex</span>
      </div>
      <div class="header-other">
        <a href="javascript:">
          <i class="iconfont">&#xe699;</i>
          <span>下载APP</span>
        </a>
        <a href="javascript:" @click="screenshot()">
          <i class="iconfont">&#xe66e;</i>
          <span>截屏</span>
        </a>
        <a href="javascript:" @click="oPenWaring()">
          <i class="iconfont">&#xe6cc;</i>
          <span>价格预警</span>
          <div class="header-warning" style="z-index: 9">
            <el-tabs>
              <el-tab-pane label="价格预警">
                <p><span> </span><select>
                  <option>BTC/CNY</option>
                </select></p>
                <p>
                  <span><input id="dd1" type="checkbox" name="dd1" checked/><label for="dd1">价格涨破</label></span>
                  <input type="number"/>
                </p>
                <p>
                  <span><input id="dd2" type="checkbox" name="dd1"/><label for="dd2">价格跌破</label></span>
                  <input type="number"/>
                </p>
                <p>
                  <span><input id="dd3" type="checkbox" name="dd1"/><label for="dd3">涨跌幅达</label></span>
                  <input type="number"/>
                </p>
              </el-tab-pane>
              <el-tab-pane label="预警列表">
                <span class="waring-list"><input type="checkbox" name="dd2" checked/><label>仅预警一次</label></span>
                <span class="waring-list" v-for="item in warningData"><input type="checkbox" name="dd2"/>
                  <label>{{item.coinStyle}} {{item.Text}} {{item.num}}</label>
                </span>
              </el-tab-pane>
            </el-tabs>
            <div class="header-warning-btn">
              <button>保存</button>
              <button class="closeWaring">退出</button>
            </div>
          </div>
        </a>
      </div>
    </div>
    <div class="quotation-center">
      <div class="past-transaction">
        <div class="quotation-center-title">过往交易</div>
        <div class="quotation-center-table">
          <table>
            <thead>
            <tr>
              <td>价格(CMY)</td>
              <td>数量</td>
              <td>时间</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in items">
              <td class="display-flex" :class="item.oStatus? 'red':'green'">{{item.price}}<i class="iconfont"
                                                                                             v-show="!item.oStatus">&#xe6a1;</i><i
                class="iconfont" v-show="item.oStatus">&#xe6a9;</i></td>
              <td>{{item.num}}</td>
              <td>{{item.timer}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="handicap">
        <div class="quotation-center-title">盘口</div>
        <div class="quotation-center-table">
          <table>
            <thead>
            <tr>
              <td>价格(CMY)</td>
              <td>数量</td>
              <td>我的数量</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in items2">
              <td class="display-flex" :class="item.oStatus? 'red':'green'">{{item.price}}<i class="iconfont"
                                                                                             v-show="!item.oStatus">&#xe6a1;</i><i
                class="iconfont" v-show="item.oStatus">&#xe6a9;</i></td>
              <td>{{item.num}}</td>
              <td>{{item.my_num}}</td>
            </tr>
            </tbody>
            <tbody class="tbody-center">
            <tr>
              <td colspan="3">差价 {{0.58}} CNY</td>
            </tr>
            </tbody>
            <tbody>
            <tr v-for="item in items3">
              <td class="display-flex" :class="item.oStatus? 'red':'green'">{{item.price}}<i class="iconfont"
                                                                                             v-show="!item.oStatus">&#xe6a1;</i><i
                class="iconfont" v-show="item.oStatus">&#xe6a9;</i></td>
              <td>{{item.num}}</td>
              <td>{{item.my_num}}</td>
            </tr>
            </tbody>
          </table>

        </div>
      </div>
      <div class="quotation-chart">
        <div class="quotation-center-title">行情图表</div>
        <!--行情K线图-->
        <div class="quotation-chart-line">
          <div id="myChart_k"></div>
        </div>
        <div class="delegate-panel">
          <div class="delegate-panel-title">委托面板</div>
          <div class="delegate-panel-btn-down">
            <span>当前委托</span>
            <i class="el-icon-caret-bottom"></i>
          </div>
          <div class="delegate-panel-data">
            <table class="delegate-panel-data-table">
              <thead class="delegate-panel-data-thead">
              <tr>
                <td>时间</td>
                <td>委托量</td>
                <td>成交量</td>
                <td>方向</td>
                <td>委托类型</td>
                <td>委托价格</td>
                <td>成交均价</td>
                <td>操作</td>
              </tr>
              </thead>
              <tbody class="delegate-panel-data-tbody" v-show="noRecord">
              <tr v-for="item in panel_data">
                <td>{{item.timer}}</td>
                <td>{{item.entrust_num}}</td>
                <td>{{item.deal_num}}</td>
                <td>{{item.direction}}</td>
                <td>{{item.delegate_type}}</td>
                <td>{{item.entrust_price}}</td>
                <td>{{item.deal_price}}</td>
                <td><a href="javascript:">撤单</a></td>
              </tr>
              </tbody>
              <tbody class="delegate-panel-data-tbody noRecord" v-show="!noRecord">
              <tr>
                <td colspan="8">
                  <i class="iconfont">&#xe661;</i><span>暂无数据</span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="assets" style="z-index: 9">
        <div class="quotation-center-title">资产</div>
        <div class="assets-login">
          <button class="login">登录</button>
          <button class="register">注册</button>
        </div>
        <div class="quotation-center-title">资产</div>
        <div class="business-box">
          <div class="business-tab-btn-classStyle">
            <a href="javascript:" class="border-bottom-color-w" @click="businessBuy_tab()">买入</a>
            <a href="javascript:" @click="businessSell_tab()">卖出</a>
          </div>
          <div class="business-btn-priceStyle">
            <a href="javascript:" :class="trading_style? 'background-green':'background-red'">现价</a>
            <a href="javascript:">市价</a>
          </div>
          <div class="business-input-box">
            <span>价格</span>
            <div class="business-input-price">
              <input v-model="business_price"/>
              <span>CNY</span>
            </div>
          </div>
          <div class="business-input-box">
            <span>数量</span>
            <div class="business-input-num">
              <input v-model="business_num"/>
              <span>BTC</span>
            </div>
          </div>
          <div class="business-input-line"></div>
          <div class="business-price-zong">
            <span>总额（CNY）≈</span>
            <span>1234567.78</span>
          </div>
          <div class="business-submit-box">
            <button class="background-green" @click="businessBuy()" v-show="trading_style && trading_login">买入</button>
            <button class="gray" v-show="trading_style && !trading_login">买入</button>
            <button class="background-red" @click="businessSell()" v-show="!trading_style && trading_login">卖出</button>
            <button class="gray" v-show="!trading_style && !trading_login">卖出</button>
          </div>
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
        items: [
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: false},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: false},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: false},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: false},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: false},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: false},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: false},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: false},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
          {price: 12345.12, num: 345.12345678, timer: '12.33.5', oStatus: true},
        ],
        items2: [
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: true},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: true},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: true},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: true},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: true},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: true},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: true},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: false},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: true},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: false},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: true},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: false},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: true},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: false},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: true},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: true},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: false},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: true},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: false},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: true},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: true}
        ],
        items3: [
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: true},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: true},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: true},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: true},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: true},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: true},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: true},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: false},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: true},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: false},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: true},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: false},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: true},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: false},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: true},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: true},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: false},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: true},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: false},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: true},
          {price: 12345.12, num: '345.12300000', my_num: '12', oStatus: true}
        ],
        panel_data: [
          {
            timer: '02-02 13:12:12',
            entrust_num: 123.12345678,
            deal_num: 123.12345678,
            direction: '买入',
            delegate_type: '市价买入',
            entrust_price: 1234.12,
            deal_price: 1234.12
          },
          {
            timer: '02-02 13:12:12',
            entrust_num: 123.12345678,
            deal_num: 123.12345678,
            direction: '买入',
            delegate_type: '市价买入',
            entrust_price: 1234.12,
            deal_price: 1234.12
          },
          {
            timer: '02-02 13:12:12',
            entrust_num: 123.12345678,
            deal_num: 123.12345678,
            direction: '买入',
            delegate_type: '市价买入',
            entrust_price: 1234.12,
            deal_price: 1234.12
          },
          {
            timer: '02-02 13:12:12',
            entrust_num: 123.12345678,
            deal_num: 123.12345678,
            direction: '买入',
            delegate_type: '市价买入',
            entrust_price: 1234.12,
            deal_price: 1234.12
          },
          {
            timer: '02-02 13:12:12',
            entrust_num: 123.12345678,
            deal_num: 123.12345678,
            direction: '买入',
            delegate_type: '市价买入',
            entrust_price: 1234.12,
            deal_price: 1234.12
          },
          {
            timer: '02-02 13:12:12',
            entrust_num: 123.12345678,
            deal_num: 123.12345678,
            direction: '买入',
            delegate_type: '市价买入',
            entrust_price: 1234.12,
            deal_price: 1234.12
          },
          {
            timer: '02-02 13:12:12',
            entrust_num: 123.12345678,
            deal_num: 123.12345678,
            direction: '买入',
            delegate_type: '市价买入',
            entrust_price: 1234.12,
            deal_price: 1234.12
          },
          {
            timer: '02-02 13:12:12',
            entrust_num: 123.12345678,
            deal_num: 123.12345678,
            direction: '买入',
            delegate_type: '市价买入',
            entrust_price: 1234.12,
            deal_price: 1234.12
          },
          {
            timer: '02-02 13:12:12',
            entrust_num: 123.12345678,
            deal_num: 123.12345678,
            direction: '买入',
            delegate_type: '市价买入',
            entrust_price: 1234.12,
            deal_price: 1234.12
          },
          {
            timer: '02-02 13:12:12',
            entrust_num: 123.12345678,
            deal_num: 123.12345678,
            direction: '买入',
            delegate_type: '市价买入',
            entrust_price: 1234.12,
            deal_price: 1234.12
          }
        ],
        coinStyle: [
          {coinStyle: 'BTC/USD', price: '$2336.71', range: '1.14%', trend: true},
          {coinStyle: 'BTC/USD', price: '$2336.71', range: '1.14%', trend: true},
          {coinStyle: 'BTC/USD', price: '$2336.71', range: '1.14%', trend: false}
        ],
        warningData: [],
        noRecord: false,
        business_price: 0.00,
        business_num: 0.00,
        trading_style: true,
        trading_login: false
      }
    },
    created() {
    },
    mounted() {
      //阻止行情面板页面刷新时，头部和尾部组件出来
      {
        this.$store.dispatch('hideHeader');
        this.$store.dispatch('hideFooter');
      }

      {
        let oHeight = $(window).height();
        $('.quotation').css({height: oHeight, maxHeight: oHeight})
      }
      {
        let that = this;
        $('.business-tab-btn-classStyle a').click(function () {
          $(this).addClass('border-bottom-color-w').siblings().removeClass('border-bottom-color-w');
          if (that.trading_style) {
            $('.business-btn-priceStyle a').eq(0).addClass('background-green').siblings().removeClass();
          } else {
            $('.business-btn-priceStyle a').eq(0).addClass('background-red').siblings().removeClass();
          }
        });
      }
      {
        let that = this;
        $('.business-btn-priceStyle a').click(function () {
          let _this = this;
          if (that.trading_style) {
            $(_this).addClass('background-green').siblings().removeClass();
          } else {
            $(_this).addClass('background-red').siblings().removeClass();
          }
        });
      }
      {
        $('.closeWaring').click(function () {
          $('.header-warning').hide();
          return false;
        })
      }
//      k线启动
      this.drawLineK();
    },
    methods: {
      businessBuy() {
        return true;
      },
      businessSell() {
        return true;
      },
      businessBuy_tab() {
        this.trading_style = true;
      },
      businessSell_tab() {
        this.trading_style = false;
      },
//      截屏
      screenshot() {
        html2canvas(document.body, {
          onrendered: function (canvas) {
            $('.screenShot').css({display: 'block'});
            $('.screenShot-content-home').html(canvas);
          },
          width: 355,
          height: 200
        });
      },
//      关闭截屏弹窗
      closeScreenShot() {
        $('.screenShot').css({display: 'none'});
      },
//      选择交易品种
      closeOPenTradingClass() {
        $('.select-trading-class').toggle();
        return false;
      },
//      价格预警
      oPenWaring() {
        $('.header-warning').show();
      },
//      画k线
      drawLineK(){
        // 基于准备好的dom，初始化echarts实例
        let myChart_k = this.$echarts.init(document.getElementById('myChart_k'));
        // 绘制图表
        let data0 = splitData([
//            开盘价，收盘价，最低价，最高价
          ['2013/1/24', 2320.26, 2320.26, 2287.3, 2362.94],
          ['2013/1/25', 2300, 2291.3, 2288.26, 2308.38],
          ['2013/1/28', 2295.35, 2346.5, 2295.35, 2346.92],
          ['2013/1/29', 2347.22, 2358.98, 2337.35, 2363.8],
          ['2013/1/30', 2360.75, 2382.48, 2347.89, 2383.76],
          ['2013/1/31', 2383.43, 2385.42, 2371.23, 2391.82],
          ['2013/2/1', 2377.41, 2419.02, 2369.57, 2421.15],
          ['2013/2/4', 2425.92, 2428.15, 2417.58, 2440.38],
          ['2013/2/5', 2411, 2433.13, 2403.3, 2437.42],
          ['2013/2/6', 2432.68, 2434.48, 2427.7, 2441.73],
          ['2013/2/7', 2430.69, 2418.53, 2394.22, 2433.89],
          ['2013/2/8', 2416.62, 2432.4, 2414.4, 2443.03],
          ['2013/2/18', 2441.91, 2421.56, 2415.43, 2444.8],
          ['2013/2/19', 2420.26, 2382.91, 2373.53, 2427.07],
          ['2013/2/20', 2383.49, 2397.18, 2370.61, 2397.94],
          ['2013/2/21', 2378.82, 2325.95, 2309.17, 2378.82],
          ['2013/2/22', 2322.94, 2314.16, 2308.76, 2330.88],
          ['2013/2/25', 2320.62, 2325.82, 2315.01, 2338.78],
          ['2013/2/26', 2313.74, 2293.34, 2289.89, 2340.71],
          ['2013/2/27', 2297.77, 2313.22, 2292.03, 2324.63],
          ['2013/2/28', 2322.32, 2365.59, 2308.92, 2366.16],
          ['2013/3/1', 2364.54, 2359.51, 2330.86, 2369.65],
          ['2013/3/4', 2332.08, 2273.4, 2259.25, 2333.54],
          ['2013/3/5', 2274.81, 2326.31, 2270.1, 2328.14],
          ['2013/3/6', 2333.61, 2347.18, 2321.6, 2351.44],
          ['2013/3/7', 2340.44, 2324.29, 2304.27, 2352.02],
          ['2013/3/8', 2326.42, 2318.61, 2314.59, 2333.67],
          ['2013/3/11', 2314.68, 2310.59, 2296.58, 2320.96],
          ['2013/3/12', 2309.16, 2286.6, 2264.83, 2333.29],
          ['2013/3/13', 2282.17, 2263.97, 2253.25, 2286.33],
          ['2013/3/14', 2255.77, 2270.28, 2253.31, 2276.22],
          ['2013/3/15', 2269.31, 2278.4, 2250, 2312.08],
          ['2013/3/18', 2267.29, 2240.02, 2239.21, 2276.05],
          ['2013/3/19', 2244.26, 2257.43, 2232.02, 2261.31],
          ['2013/3/20', 2257.74, 2317.37, 2257.42, 2317.86],
          ['2013/3/21', 2318.21, 2324.24, 2311.6, 2330.81],
          ['2013/3/22', 2321.4, 2328.28, 2314.97, 2332],
          ['2013/3/25', 2334.74, 2326.72, 2319.91, 2344.89],
          ['2013/3/26', 2318.58, 2297.67, 2281.12, 2319.99],
          ['2013/3/27', 2299.38, 2301.26, 2289, 2323.48],
          ['2013/3/28', 2273.55, 2236.3, 2232.91, 2273.55],
          ['2013/3/29', 2238.49, 2236.62, 2228.81, 2246.87],
          ['2013/4/1', 2229.46, 2234.4, 2227.31, 2243.95],
          ['2013/4/2', 2234.9, 2227.74, 2220.44, 2253.42],
          ['2013/4/3', 2232.69, 2225.29, 2217.25, 2241.34],
          ['2013/4/8', 2196.24, 2211.59, 2180.67, 2212.59],
          ['2013/4/9', 2215.47, 2225.77, 2215.47, 2234.73],
          ['2013/4/10', 2224.93, 2226.13, 2212.56, 2233.04],
          ['2013/4/11', 2236.98, 2219.55, 2217.26, 2242.48],
          ['2013/4/12', 2218.09, 2206.78, 2204.44, 2226.26],
          ['2013/4/15', 2199.91, 2181.94, 2177.39, 2204.99],
          ['2013/4/16', 2169.63, 2194.85, 2165.78, 2196.43],
          ['2013/4/17', 2195.03, 2193.8, 2178.47, 2197.51],
          ['2013/4/18', 2181.82, 2197.6, 2175.44, 2206.03],
          ['2013/4/19', 2201.12, 2244.64, 2200.58, 2250.11],
          ['2013/4/22', 2236.4, 2242.17, 2232.26, 2245.12],
          ['2013/4/23', 2242.62, 2184.54, 2182.81, 2242.62],
          ['2013/4/24', 2187.35, 2218.32, 2184.11, 2226.12],
          ['2013/4/25', 2213.19, 2199.31, 2191.85, 2224.63],
          ['2013/4/26', 2203.89, 2177.91, 2173.86, 2210.58],
          ['2013/5/2', 2170.78, 2174.12, 2161.14, 2179.65],
          ['2013/5/3', 2179.05, 2205.5, 2179.05, 2222.81],
          ['2013/5/6', 2212.5, 2231.17, 2212.5, 2236.07],
          ['2013/5/7', 2227.86, 2235.57, 2219.44, 2240.26],
          ['2013/5/8', 2242.39, 2246.3, 2235.42, 2255.21],
          ['2013/5/9', 2246.96, 2232.97, 2221.38, 2247.86],
          ['2013/5/10', 2228.82, 2246.83, 2225.81, 2247.67],
          ['2013/5/13', 2247.68, 2241.92, 2231.36, 2250.85],
          ['2013/5/14', 2238.9, 2217.01, 2205.87, 2239.93],
          ['2013/5/15', 2217.09, 2224.8, 2213.58, 2225.19],
          ['2013/5/16', 2221.34, 2251.81, 2210.77, 2252.87],
          ['2013/5/17', 2249.81, 2282.87, 2248.41, 2288.09],
          ['2013/5/20', 2286.33, 2299.99, 2281.9, 2309.39],
          ['2013/5/21', 2297.11, 2305.11, 2290.12, 2305.3],
          ['2013/5/22', 2303.75, 2302.4, 2292.43, 2314.18],
          ['2013/5/23', 2293.81, 2275.67, 2274.1, 2304.95],
          ['2013/5/24', 2281.45, 2288.53, 2270.25, 2292.59],
          ['2013/5/27', 2286.66, 2293.08, 2283.94, 2301.7],
          ['2013/5/28', 2293.4, 2321.32, 2281.47, 2322.1],
          ['2013/5/29', 2323.54, 2324.02, 2321.17, 2334.33],
          ['2013/5/30', 2316.25, 2317.75, 2310.49, 2325.72],
          ['2013/5/31', 2320.74, 2300.59, 2299.37, 2325.53],
          ['2013/6/3', 2300.21, 2299.25, 2294.11, 2313.43],
          ['2013/6/4', 2297.1, 2272.42, 2264.76, 2297.1],
          ['2013/6/5', 2270.71, 2270.93, 2260.87, 2276.86],
          ['2013/6/6', 2264.43, 2242.11, 2240.07, 2266.69],
          ['2013/6/7', 2242.26, 2210.9, 2205.07, 2250.63],
          ['2013/6/13', 2190.1, 2148.35, 2126.22, 2190.1]
        ]);

        function splitData(rawData) {
          var categoryData = [];
          var values = [];
          for (var i = 0; i < rawData.length; i++) {
            categoryData.push(rawData[i].splice(0, 1)[0]);
            values.push(rawData[i])
          }
          return {
            categoryData: categoryData,
            values: values
          };
        }

        function calculateMA(dayCount) {
          var result = [];
          for (var i = 0, len = data0.values.length; i < len; i++) {
            if (i < dayCount) {
              result.push('-');
              continue;
            }
            var sum = 0;
            for (var j = 0; j < dayCount; j++) {
              sum += data0.values[i - j][1];
            }
            result.push(sum / dayCount);
          }
          return result;
        }

        myChart_k.setOption({

          color: [
            "#ff733a",
            "#88ff69",
            "#d0ce44",
            "#dd2a2b",
            "#42d1d3",
            "#b124ab"
          ],
          backgroundColor: '#1e2b34',
          title: {
            text: '',
            left: 0
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          legend: {
            data: ['K-Data', 'MA5', 'MA10', 'MA20', 'MA30', 'MA60', 'MA120'],
            textStyle: {
              color: '#fff'
            },
            inactiveColor: '#bcbfc2'
          },
          grid: {
            left: '2%',
            right: '2%',
            bottom: '15%'
          },
          xAxis: {
            type: 'category',
            data: data0.categoryData,
            axisLine: {
              onZero: false,
              lineStyle: {
                color: "#bcbfc2"
              }
            },
            splitLine: {show: false},
            splitNumber: 10,
            min: 'dataMin',
            max: 'dataMax',
          },
          yAxis: {
            scale: true,
            axisLine: {
              onZero: false,
            },
            splitArea: {
              show: false
            },
            show: false
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataZoom: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          dataZoom: [
            {
              type: 'inside',
              start: 50,
              end: 100,
            },
            {
              show: true,
              type: 'slider',
              y: '90%',
              start: 50,
              end: 100,
            }
          ],
          series: [
            {
              itemStyle: {
                normal: {
                  color: '#f00', // 阳线 positive
                  color0: '#1e2b34', // 阴线 negative     '#c23531', '#314656'
                  borderWidth: 1,
                  // FIXME
                  // ec2中使用的是lineStyle.color 和 lineStyle.color0
                  borderColor: '#f00',
                  borderColor0: '#0f0'
                },
                emphasis: {
                  borderWidth: 2
                }
              },
              name: 'K-Data',
              type: 'candlestick',
              data: data0.values,
            },
            {
              name: 'MA5',
              type: 'line',
              data: calculateMA(5),
              smooth: true,
              lineStyle: {
                normal: {
                  opacity: 1,
                  color: '#ff6a3a'
                },

              }
            },
            {
              name: 'MA10',
              type: 'line',
              data: calculateMA(10),
              smooth: true,
              lineStyle: {
                normal: {
                  opacity: 1,
                  color: '#5fd044'
                }
              }
            },
            {
              name: 'MA20',
              type: 'line',
              data: calculateMA(20),
              smooth: true,
              lineStyle: {
                normal: {
                  opacity: 1,
                  color: '#c8c643'
                }
              }
            },
            {
              name: 'MA30',
              type: 'line',
              data: calculateMA(30),
              smooth: true,
              lineStyle: {
                normal: {
                  opacity: 1,
                  color: '#e62a2a'
                }
              }
            },
            {
              name: 'MA60',
              type: 'line',
              data: calculateMA(60),
              smooth: true,
              lineStyle: {
                normal: {
                  opacity: 1,
                  color: '#40c9cb'
                }
              }
            },
            {
              name: 'MA120',
              type: 'line',
              data: calculateMA(120),
              smooth: true,
              lineStyle: {
                normal: {
                  opacity: 1,
                  color: '#d521ca'
                }
              }
            },
          ]
        })
      },
    }
  }
</script>

<style scoped>


  .business-box {
    color: #fff;
    padding: 1rem;
    background: #3a444d;
  }

  .business-box a {
    color: #fff;
  }

  .business-tab-btn-classStyle, .business-btn-priceStyle {
    display: flex;
    align-items: center;
    margin-bottom: 1.25rem;
  }

  .business-tab-btn-classStyle a {
    flex: 1;
    text-align: center;
    font-size: 1.333rem;
    border-bottom: 2px solid #505962;
    padding-bottom: .5rem;
  }

  .border-bottom-color-w {
    border-bottom-color: #fff !important;
  }

  .business-btn-priceStyle a {
    flex: 1;
    text-align: center;
    background: #5d656c;
    border-radius: 0.222rem;
    padding: .5rem 0;
    font-size: 1.167rem;
  }

  .business-btn-priceStyle a:nth-of-type(1) {
    margin-right: 2px;
  }

  .background-green {
    background: #4da53c !important;
  }

  .background-red {
    background: red !important;
  }

  .business-input-box > span {
    color: #d3d6d8;
    margin-bottom: .5rem;
  }

  .business-input-box > div {
    display: flex;
    align-items: center;
    margin-bottom: .5rem;
    border: 1px solid #565f66;
    padding: .5rem 1rem;
    border-radius: 2px;
    background: #404a52;

  }

  .business-input-box > div input {
    border: none;
    background: #404a52;
    color: #d3d6d8;
    width: 85%;
    outline: none
  }

  .business-input-line {
    width: 100%;
    height: 2px;
    background: #565f66;
    margin: 1.25rem 0;
  }

  .business-price-zong {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #d3d6d8;
    margin-bottom: 1.25rem;
  }

  .business-submit-box {
    display: flex;
    flex-direction: column;
  }

  .business-submit-box button {
    border: none;
    background: none;
    color: #fff;
    font-size: 1.33rem;
    padding: 1rem 0;
    border-radius: 3px;
  }

  .gray {
    background: #5d6564 !important;
  }

  .quotation {
    width: 100%;
    background: #fff;
    overflow: hidden;
  }

  .red {
    color: red !important;
  }

  .green {
    color: green !important;
  }

  .quotation-header {
    display: flex;
    height: 2rem;
    align-items: center;
    padding: 1rem 0;
  }

  .quotation-header > a {
    padding: 0 1.5rem;
  }

  .quotation-header > div {
    padding: 0 1.5rem;
    border-left: 1px solid #ddd;
  }

  .transaction-btn-box, .follow-icon, .header-other {
    display: flex;
    align-items: center;
  }

  .transaction-variety > span {
    font-size: 1.167rem;
    font-weight: bold;
    color: #66a9e6;
  }

  .transaction-variety {
    position: relative;
    cursor: pointer;
  }

  .select-trading-class {
    position: absolute;
    background: #fff;
    width: 18.25rem;
    right: 0;
    z-index: 2;
    border: 1px solid #ddd;
    border-radius: 0.333rem;
    top: 3.5rem;
    padding: 1rem 0.83rem;
    display: none;

  }

  .select-trading-coin > div {
    border-left: 1px solid #ccc;
    padding-left: .6rem;
  }

  .select-trading-coin > span {
    color: #000;
    font-weight: bold;
    margin-bottom: 0.5rem;
    font-size: 1.083rem;
    margin-left: .2rem;
  }

  .select-trading-coin > div > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }

  .select-trading-coin > div > div > p {
    display: flex;
    align-items: center;

  }

  .select-trading-coin > div > div > p > span {
    margin-right: .9rem;
  }

  .transaction-btn-box > span {
    font-size: 1rem;
    color: #8a9195;
  }

  .transaction-btn-box > .iconfont {
    color: #000;
    font-weight: bold;
    margin-left: 1rem;
  }

  .follow-icon {
    justify-content: space-between;
    padding: 0 1.2rem;
  }

  .follow-icon i:nth-of-type(1) {
    color: #db2b22;
  }

  .follow-icon i:nth-of-type(2) {
    color: #1aad19;
  }

  .follow-us > span {
    color: #8a9195;
  }

  .header-other a {
    color: #8a9195;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 1.5rem;
  }

  .header-other a i {
    color: #3d84d6;
  }

  .quotation-center {
    background: #1e2b34;
    display: flex;
  }

  .quotation-center > div {
    border: 1px solid #15232c;
    border-bottom: none;
    background: #1e2b34;
  }

  .quotation-center > div:nth-of-type(1), .quotation-center > div:nth-of-type(2) {
    width: 15%;
    min-width: 15.4rem;
  }

  .quotation-center > div:nth-of-type(4) {
    width: 15%;
    min-width: 12.5rem;
  }

  .quotation-center > div:nth-of-type(3) {
    width: 55%;
    min-width: 60rem;
  }

  .quotation-center-title {
    background: #42515a;
    color: #b4b9bc;
    padding: 0.866rem 1rem;
  }

  .display-flex {
    display: flex;
    align-items: center;
  }

  .quotation-center-table table {
    border-spacing: 0;
    border-collapse: collapse;
  }

  .quotation-center-table table td {
    padding: .2rem .8rem;
    text-align: center;
  }

  .quotation-center-table table td .iconfont {
    font-size: 1rem;
    margin-left: .5rem;
    transform: rotate(45deg);
  }

  .quotation-center-table table thead td {
    color: #abb0b4 !important;
  }

  .quotation-center-table table thead {
    border-bottom: 2px solid #4b555d;
  }

  .quotation-center-table table td:nth-of-type(1) {
    width: 30%;
    color: #ced2d5;
    text-align: left;
  }

  .quotation-center-table table td:nth-of-type(2) {
    width: 40%;
    color: #ced2d5;
  }

  .quotation-center-table table td:nth-of-type(3) {
    width: 30%;
    color: #81898e;
    text-align: right;
  }

  .tbody-center {
    border: 2px solid #4b555d;
    border-left: none;
    border-right: none;
  }

  .tbody-center td {
    width: 100%;
    height: 3.5rem;
    text-align: right !important;
  }

  .quotation-chart-line {
    height: 45rem;
  }

  .delegate-panel-title {
    padding: 0 1.5rem;
    background: #42515a;
    color: #d3d6d8;
    height: 3.333rem;
    line-height: 3.333rem;
    font-size: 1.333rem;
  }

  .delegate-panel-btn-down {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 1rem 1.5rem;
    font-size: 1.083rem;
    color: #dfe1e2 !important;
  }

  .delegate-panel-btn-down span {
    margin-right: .8rem;
  }

  .delegate-panel-data {
    padding: 0 1.5rem;
  }

  .delegate-panel-data {
    color: #caced0;
  }

  .delegate-panel-data-table {
    border-spacing: 0;
    border-collapse: collapse;
    width: 100%;
    text-align: center;
  }

  .delegate-panel-data-thead {
    width: 100%;
    border: 2px solid #caced0;
    border-left: none;
    border-right: none;
  }

  .delegate-panel-data-thead td {
    height: 2rem;
  }

  .delegate-panel-data-tbody td {
    height: 1.8rem;
  }

  .delegate-panel-data-tbody td a {
    color: #4b7db8;
  }

  .noRecord td {
    padding: 6.667rem;
    text-align: center !important;
    color: #abb0b4 !important;
  }

  .noRecord td i {
    font-size: 3rem;
  }

  .noRecord td i, .noRecord td span {
    display: inline !important;

  }

  .assets-login {
    width: 100%;
    background: #3d84d6;
    display: flex;
    flex-direction: column;
    padding: 1rem 0;
    border-bottom: 2px solid #15232c;
  }

  .assets-login button {
    border: 1px solid #fff;
    border-radius: 0.333rem;
    background: #3d84d6;
    color: #fff;
    font-size: 1.167rem;
    width: 14rem;
    height: 4rem;
    margin: 1rem auto;
    cursor: pointer;
  }

  .assets-login button:hover {
    background: #1aefd0;
    color: #3d84d6;
  }

  .header-other > a:nth-of-type(3) {
    position: relative;
  }

  .header-warning {
    position: absolute;
    top: 3.5rem;
    left: 0;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 0.333rem;
    padding: 1rem 0.8rem;
    display: none;
  }

  .header-warning p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .header-warning p > select {
    width: 6.85rem;
  }

  .header-warning p > input {
    width: 6.5rem;
  }

  .header-warning p > span {
    display: flex;
    align-items: center;
  }

  .header-warning p > span > input {
    background: #4086d7;
  }

  .header-warning-btn {
    display: flex;
    justify-content: space-between;
    padding: 0 1.3rem;
  }

  .header-warning-btn button {
    padding: .3rem 1rem;
    background: #4086d7;
    border: none;
    color: #fff;
    border-radius: 0.25rem;
  }

  .waring-list {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    padding-left: 1.1rem;
  }

  .waring-list label {
    margin-left: .5rem;
  }

  .screenShot {
    display: none;
  }

  .zhe-zhao {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    z-index: 5;
  }

  .screenShot-content {
    width: 29.583rem;
    height: 30rem;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    z-index: 6;
    border: 1px solid #fff;
    padding: .2rem;
    background: #fff;
    border-radius: 0.4167rem;
  }

  .screenShot-content-home {
    width: 29.583rem;
    height: 16.667rem;
  }

  .screenShot-content-share {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
    font-size: 1.167rem;
  }

  .screenShot-content-share span:nth-of-type(2) {
    padding: 1rem 0 1.5rem 0;
    display: flex;
    color: #fff;
  }

  .screenShot-content-share span:nth-of-type(3) {
    display: flex;
  }

  .screenShot-content-share span:nth-of-type(3) a {
    padding: .4rem 1rem;
    background: #3d84d6;
    color: #fff;
    border-radius: .22rem;
  }

  .screenShot-content-share span:nth-of-type(3) a:nth-of-type(1) {
    margin-right: 2.5rem;
  }

  .screenShot-content-share span:nth-of-type(2) i {
    border-radius: 50%;
    padding: .3rem;
    margin: 0 .8rem;
  }

  .screenShot-content-share span:nth-of-type(2) i:nth-of-type(1) {
    background: #f3250a;
  }

  .screenShot-content-share span:nth-of-type(2) i:nth-of-type(2) {
    background: #07b906;
  }

  .screenShot-content-share span:nth-of-type(2) i:nth-of-type(3) {
    background: #3299dc;
  }

  .screenShot-content-share span:nth-of-type(2) i:nth-of-type(4) {
    background: #3b579d;
  }

  .screenShot-content-share span:nth-of-type(2) i:nth-of-type(5) {
    background: #33aefb;
  }

  .screenShot-content > img {
    position: absolute;
    right: -2rem;
    top: -2rem;
    cursor: pointer;
  }

  #myChart_k {
    width: 100%;
    height: 540px;
  }
</style>
