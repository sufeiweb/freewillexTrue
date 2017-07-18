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
          <div class="header-warning">
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
        <div class="quotation-chart-line"></div>
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
      <div class="assets">
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
    mounted() {
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
      }
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
  }

  .quotation-center > div:nth-of-type(1), .quotation-center > div:nth-of-type(2) {
    width: 15%;
    min-width: 15.4rem;
  }

  .quotation-center > div:nth-of-type(4) {
    width: 10%;
    min-width: 12.5rem;
  }

  .quotation-center > div:nth-of-type(3) {
    width: 60%;
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
</style>
