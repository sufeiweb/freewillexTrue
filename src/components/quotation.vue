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
                <p>
                  <span> </span>
                  <select>
                    <option>BTC/CNY</option>
                  </select>
                </p>
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
      <transition enter-active-class="animated fadeIn" leaveActiveClass="animated fadeOut">
        <div class="login-show-box-k" v-show="trading_login">
          <img src="../assets/img/header/fw_header_user.png" alt=""/>
          <span class="user-phone">{{userNumM | phoneStar}}</span>
          <a href="javascript:;" @click="KTClose()">退出</a>
        </div>
      </transition>
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
          <KLine></KLine>
        </div>
        <div class="delegate-panel">
          <div class="quotation-center-title">委托面板</div>
          <div class="delegate-panel-btn-down">
            <el-pagination
              small
              @current-change="handleCurrentChange2"
              :current-page="currentPage"
              layout="prev, pager, next"
              :total="totalNum1"
              v-show="newData"
            >
            </el-pagination>
            <el-pagination
              small
              @current-change="handleCurrentChange3"
              :current-page="currentPage"
              layout="prev, pager, next"
              :total="totalNum2"
              v-show="!newData"
            >
            </el-pagination>
            <span v-show="newData">当前委托</span>
            <span v-show="!newData">历史委托</span>
            <a href="javascript:;" style="color: #fff;"><i class="el-icon-caret-bottom" @click="getData()"></i></a>
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
                <td v-show="newData">操作</td>
                <td v-show="!newData">状态</td>
              </tr>
              </thead>
              <tbody class="delegate-panel-data-tbody" v-show="noRecord">
              <tr v-for="(item,index) in panel_data1" :index="index">
                <td>{{item.createDate | dateYMDHIS}}</td>
                <td>{{item.amount}}</td>
                <td>{{item.dealVolume}}</td>
                <td>{{item.cammand | translate}}</td>
                <td>{{item.orderType | translate}}</td>
                <td>{{item.price | return_}}</td>
                <td>{{item.dealPrice}}</td>
                <td v-show="newData"><a href="javascript:;" :code="item.code" :commodity="item.commodity"
                                        style="color:#01aaef"
                                        @click="revoke1($event)">撤销</a></td>
                <td v-show="!newData">{{item.orderStatus | translate}}</td>
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
        <transition enter-active-class="animated fadeIn">
          <div class="assets-login" v-show="!trading_login">
            <button class="login" @click="TKShowTrue()">登录</button>
            <router-link to="/register" tag="button">注册</router-link>
          </div>
        </transition>
        <transition enter-active-class="animated fadeIn">
          <div class="keYongMoney" v-show="trading_login">
            <div class="tab-header">
              <a href="javascript:;" class='active-tab-btn'>CNY账户</a>
              <a href="javascript:;">BTC账户</a>
            </div>
            <div class="tab-content">
              <div class="cny-content" v-show="cnyAccount">
                <p><a href="javascript:;" @click="RouterGo()"><i class="iconfont">&#xe6c1;</i></a>
                  <router-link to="/userIndex">详情{{getCNYMoney}}</router-link>
                </p>
                <div class="numBGColor">
                  <p><span>CNY</span><span class="em1">{{CNYCNYNum}}<em></em></span></p>
                  <p><span>BTC</span><span class="em1">{{BTCCNYNum}}<em></em></span></p>
                  <p><span>ETH</span><span class="em1">{{ETHCNYNum}}<em></em></span></p>
                  <p><span>ETC</span><span class="em1">{{ETCCNYNum}}<em></em></span></p>
                  <!--<p><span>Qtum</span><span class="em1">56.12<em></em></span></p>-->
                  <p><span>LTC</span><span class="em1">{{LTCCNYNum}}<em></em></span></p>
                </div>
              </div>
              <div class="cny-content" v-show="!cnyAccount">
                <p><a href="javascript:;" @click="RouterGo()"><i class="iconfont">&#xe6c1;</i></a>
                  <router-link to="/userIndex1">详情</router-link>
                </p>
                <div class="numBGColor1">
                  <p><span>BTC</span><span class="em2">{{BTCBTCNum}}<em></em></span></p>
                  <p><span>ETH</span><span class="em2">{{ETHBTCNum}}<em></em></span></p>
                  <p><span>ETH</span><span class="em2">{{ETHBTCNum}}<em></em></span></p>
                  <p><span>ETC</span><span class="em2">{{ETCBTCNum}}<em></em></span></p>
                  <!--<p><span>Qtum</span><span class="em2">1256.12<em></em></span></p>-->
                  <p><span>LTC</span><span class="em2">{{LTCBTCNum}}<em></em></span></p>
                </div>
              </div>
            </div>
          </div>
        </transition>

        <div class="quotation-center-title">买 / 卖</div>
        <div class="business-box">
          <div class="business-tab-btn-classStyle">
            <a href="javascript:" class="border-bottom-color-w" @click="businessBuy_tab()">买入</a>
            <a href="javascript:" @click="businessSell_tab()">卖出</a>
          </div>
          <div class="business-btn-priceStyle">
            <a href="javascript:" :class="trading_style? 'background-green':'background-red'"
               @click="businessStyle1_tab()">现价</a>
            <a href="javascript:" @click="businessStyle2_tab()">市价</a>
          </div>
          <div class="business-input-box" v-show="businessStyle1">
            <span>价格</span>
            <div class="business-input-price">
              <input v-model="business_price"/>
              <span>{{account}}</span>
            </div>
          </div>
          <div class="business-input-box" v-show="businessStyle2">
            <span>数量</span>
            <div class="business-input-num">
              <input v-model="business_num"/>
              <span>{{cunency}}</span>
            </div>
          </div>
          <div class="business-input-line"></div>
          <div class="business-price-zong">
            <span>总额（CNY）≈</span>
            <span>1234567.78</span>
          </div>
          <div class="business-submit-box">
            <button class="background-green" @click="businessTran()" v-show="trading_style && trading_login">买入</button>
            <button class="gray" v-show="trading_style && !trading_login">买入</button>
            <button class="background-red" @click="businessTran()" v-show="!trading_style && trading_login">卖出</button>
            <button class="gray" v-show="!trading_style && !trading_login">卖出</button>
          </div>
        </div>
      </div>
    </div>
    <transition enter-active-class="animated fadeIn" leaveActiveClass="animated fadeOut">
      <TKLogin v-show="TKLoginShow"></TKLogin>
    </transition>
  </div>
</template>
<script>
  import $ from 'jquery';
  import TKLogin from '../components/lettle_components/TKLogin.vue';
  import KLine from '../components/K.vue';
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
        coinStyle: [
          {coinStyle: 'BTC/USD', price: '$2336.71', range: '1.14%', trend: true},
          {coinStyle: 'BTC/USD', price: '$2336.71', range: '1.14%', trend: true},
          {coinStyle: 'BTC/USD', price: '$2336.71', range: '1.14%', trend: false}
        ],
        warningData: [],
        panel_data1: [],
        noRecord: false,
        business_price: '',
        business_num: '',
        trading_style: true,
        cnyAccount: true,
        userNumM: '',
        CNYCNYNum: 0,
        BTCCNYNum: 0,
        LTCCNYNum: 0,
        ETHCNYNum: 0,
        ETCCNYNum: 0,
        BTCBTCNum: 0,
        LTCBTCNum: 0,
        ETCBTCNum: 0,
        ETHBTCNum: 0,
        businessStyle1: true,
        businessStyle2: true,
        commodity: '',
        types: '',
        price: '',
        amount: '',
        account: 'CNY',
        cunency: 'BTC',
        newData: true,
        currentPage: 1,
        totalNum1: 0,
        totalNum2: 0,
      }
    },
    components: {
      TKLogin,KLine
    },
    mounted() {
      //阻止行情面板页面刷新时，头部和尾部组件出来
      {
        this.$store.dispatch('hideHeader');
        this.$store.dispatch('hideFooter');
      }
      {
        let that = this;
        $('.tab-header a').click(function () {
          $(this).addClass('active-tab-btn').siblings().removeClass('active-tab-btn');
          if ($(this).index() === 0) {
            that.cnyAccount = true;
          } else {
            that.cnyAccount = false;
          }
        })
      }//切换账户active样式
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
      {
        let that = this;
        that.$http({
          url: 'https://kaifamobile.firstcoinex.com/fwex/web/account/info',
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Authorization': 'Bearer ' + that.$store.state.token
          }
        }).then((res) => {
          if(res.data.code!==200){
            this.showError(res.data.code, res.data.message);
          }
          that.userNumM = res.data.data.loginUser;
        }).catch((req) => {
          this.showError(req.code, req.message);
          that.quitLogin();
        })//获取用户信息
      }
      this.panel_data(1);
    },
    methods: {
      businessTran() {
        this.getTypes();
        this.getCommodity();
        this.$http({
          url: 'https://kaifamobile.firstcoinex.com/fwex/web/trade/entrust',
          method: 'POST',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Authorization': 'Bearer ' + this.$store.state.token,
            "Content-Type": "application/json;charset=UTF-8",
          },
          data: {
            commodity: this.commodity,
            types: this.types,
            price: this.business_price,
            amount: this.amount,
            source: 'WEB'
          }
        }).then((res) => {
          this.showError(res.data.code, res.data.message);
          if (res.data.code === 200) {
            this.newData = true;
            this.panel_data(1);
          }
        }).catch((req) => {
          this.showError(req.code, req.message)
        })
      },//交易
      getData() {
        this.newData = !this.newData;
        if (this.newData) {
          this.panel_data(1);
        } else {
          this.pane1_oldData(1)
        }
      },//获取委托
      TKShowTrue(){
        this.$store.state.TKShow = true
      },
      businessBuy_tab() {
        this.business_price = '';
        this.business_num = '';
        this.trading_style = true;
        this.businessStyle1 = true;
        this.businessStyle2 = true;
      },
      businessSell_tab() {
        this.business_price = '';
        this.business_num = '';
        this.trading_style = false;
        this.businessStyle1 = true;
        this.businessStyle2 = true;
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
      RouterGo() {
        this.$router.go(0)
      },
      KTClose() {
        sessionStorage.removeItem('token');
        this.$store.state.token = '';
        this.$store.state.loginTrue = false;
        this.$store.dispatch('loginStateFalse');
      },
      //计算血条em1
      computedLang1() {
        let max = [];
        for (let i = 0; i < $('.em1').length; i++) {
          max.push(Number($('.em1').eq(i).text()));
        }//算血条长度
        for (let i = 0; i < $('.em1').length; i++) {
          $('.em1').eq(i).find('em').css({
            width: Number($('.em1').eq(i).text()) * 100 / Math.max.apply(null, max) + '%'
          })
        }
      },
      computedLang2(){
        let max = [];
        for (let i = 0; i < $('.em2').length; i++) {
          max.push(Number($('.em2').eq(i).text()));
        }//算血条长度
        for (let i = 0; i < $('.em2').length; i++) {
          $('.em2').eq(i).find('em').css({
            width: Number($('.em2').eq(i).text()) * 100 / Math.max.apply(null, max) + '%'
          })
        }
      },
      businessStyle1_tab(){
        this.business_price = '';
        this.business_num = '';
        if (this.trading_style) {
          this.businessStyle1 = true;
          this.businessStyle2 = true;
        } else {
          this.businessStyle1 = true;
          this.businessStyle2 = true;
        }
      },
      businessStyle2_tab(){
        this.business_price = '';
        this.business_num = '';
        if (this.trading_style) {
          this.businessStyle1 = true;
          this.businessStyle2 = false;
        } else {
          this.businessStyle1 = false;
          this.businessStyle2 = true;
        }
      },
      getTypes() {
        if (this.trading_style) {
          //买
          //console.log("买");
          if (this.businessStyle2) {
            //console.log('限价买');
            this.amount = this.business_num;
            this.types = 'B_LIMITED';
          } else {
            //console.log('市价买');
            this.amount = this.business_price;
            this.types = 'B_MARKET';
          }
        } else {
          //卖
          //console.log("卖");
          if (this.businessStyle1) {
            //console.log('限价卖');
            this.amount = this.business_num;
            this.types = 'S_LIMITED';
          } else {
            //console.log('市价卖');
            this.types = 'S_MARKET';
            this.amount = this.business_num;
          }
        }
      },//获取买卖方式
      getCommodity(){
        this.commodity = this.cunency + this.account;
        //console.log(this.commodity);
      },//获取交易品种
      revoke1(ev) {
        this.$http({
          url: 'https://kaifamobile.firstcoinex.com/fwex/web/trade/cancels/' + ev.target.getAttribute('commodity') + '/' + ev.target.getAttribute('code'),
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Authorization': 'Bearer ' + this.$store.state.token
          }
        }).then((res) => {
          this.showError(res.data.code, res.data.message);
          if (res.data.code === 200) {
            ev.target.parentNode.parentNode.remove()
          }
        })

      },
      panel_data(currentPage) {
        this.$http({
          url: 'https://kaifamobile.firstcoinex.com/fwex/web/trade/unsettled',
          method: 'POST',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Authorization': 'Bearer ' + this.$store.state.token,
            "Content-Type": "application/json;charset=UTF-8",
          },
          data: {
            pageNo: currentPage - 1,
            pageSize: 10,
            param: {
              commodity: 'BTCCNY'
            }
          }
        }).then((res) => {
          if(res.data.code!==200){
            this.showError(res.data.code, res.data.message);
          }
          if (res.data.code === 200) {
            this.totalNum1 = res.data.data.totalElements;
            if (res.data.data.totalElements) {
              this.noRecord = true;
            }
            this.panel_data1 = res.data.data.content;
          } else {
            //console.log(res.data.message)
          }
        }).catch((req) => {
          this.showError(req.code, req.message)
          //console.log(req)
        })
      },//当前委托
      pane1_oldData(currentPage) {
        this.$http({
          url: 'https://kaifamobile.firstcoinex.com/fwex/web/trade/history',
          method: 'POST',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Authorization': 'Bearer ' + this.$store.state.token,
            "Content-Type": "application/json;charset=UTF-8",
          },
          data: {
            pageNo: currentPage - 1,
            pageSize: 10,
            param: {
              commodity: 'BTCCNY',
            }
          }
        }).then((res) => {
          if(res.data.code!==200){
            this.showError(res.data.code, res.data.message);
          }
          if (res.data.code === 200) {
            this.totalNum2 = res.data.data.totalElements;
            if (res.data.data.totalElements) {
              this.noRecord = true;
            }
            this.panel_data1 = res.data.data.content;
            //console.log(res.data.data)
          }
        }).catch((req) => {
          this.showError(req.code, req.message)
          //console.log(req)
        })
      },
      handleCurrentChange2(currentPage){
        this.panel_data(currentPage)
      },
      handleCurrentChange3(currentPage){
        this.pane1_oldData(currentPage)
      }
    },
    computed: {
      TKLoginShow() {
        return this.$store.state.TKShow;
      },
      trading_login() {
        return this.$store.state.loginState;
      },
      getCNYMoney() {
        this.$http({
          url: 'https://kaifamobile.firstcoinex.com/fwex/web/capital/info',
          method: 'GET',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + this.$store.state.token
          }
        }).then((res) => {
          if(res.data.code!==200){
            this.showError(res.data.code, res.data.message);
          }
          if (res.data.code === 200) {
            for (let i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].legalMoney === 'CNY') {
                if (res.data.data[i].currency === 'CNY') {
                  this.CNYCNYNum = res.data.data[i].balance;
                }
                if (res.data.data[i].currency === 'BTC') {
                  this.BTCCNYNum = res.data.data[i].balance;
                }
                if (res.data.data[i].currency === 'LTC') {
                  this.LTCCNYNum = res.data.data[i].balance;
                }
                if (res.data.data[i].currency === 'ETH') {
                  this.ETHCNYNum = res.data.data[i].balance;
                }
                if (res.data.data[i].currency === 'ETC') {
                  this.ETCCNYNum = res.data.data[i].balance;
                }
              }
              if (res.data.data[i].legalMoney === 'BTC') {
                if (res.data.data[i].currency === 'BTC') {
                  this.BTCBTCNum = res.data.data[i].balance;
                }
                if (res.data.data[i].currency === 'LTC') {
                  this.LTCBTCNum = res.data.data[i].balance;
                }
                if (res.data.data[i].currency === 'ETH') {
                  this.ETHBTCNum = res.data.data[i].balance;
                }
                if (res.data.data[i].currency === 'ETC') {
                  this.ETCBTCNum = res.data.data[i].balance;
                }
              }
            }

          }
          //console.log(res, '资金信息')
        }).then(() => {
          this.computedLang1();
          this.computedLang2();
        }).catch((req) => {
          this.showError(req.code, req.message)
          //console.log(req, '获取失败')
        })
      },

    }
  }
</script>
<style scoped>
  .quotation {
    width: 100%;
    height: 100%;
  }

  .login-show-box-k {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-end;
    margin-right: 5rem;
    color: #000;
  }

  .login-show-box-k img {
    width: 35px;
  }

  .login-show-box-k > span {
    margin: 0 1rem;
    font-size: 1.167rem;
  }

  .keYongMoney .tab-header {
    display: flex;
    font-size: 1.367rem;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid grey;
    width: 80%;
    margin: 0 auto;
  }

  .login-show-box-k > a {
    color: #01aaef;
  }

  .login-show-box-k > a:hover {
    text-decoration: underline;
  }

  .keYongMoney .tab-header > a {
    color: grey;
    font-weight: bold;
    padding: 1rem;
    margin-bottom: -2px;
    border-bottom: 3px solid grey;
  }

  .active-tab-btn {
    border-color: #fff !important;
    color: #fff !important;
  }

  .keYongMoney .tab-content .cny-content {
    padding: 1.25rem;
    color: #fff;
    font-size: 1.167rem;
  }

  .keYongMoney .tab-content .cny-content a {
    color: #fff;
  }

  .keYongMoney .tab-content .cny-content > div {
    height: 200px;
    overflow: auto;
  }

  .keYongMoney .tab-content .cny-content > p {
    padding: 0 !important;
  }

  .keYongMoney .tab-content .cny-content > p, .keYongMoney .tab-content .cny-content > div p {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 30px;
    padding-right: 1rem;
  }

  .keYongMoney .tab-content .cny-content > div p span:nth-of-type(2) {
    width: 150px;
    text-align: right;
    position: relative;
  }

  .keYongMoney .tab-content .cny-content > div p span:nth-of-type(2) em {
    position: absolute;
    top: 0;
    left: 0;
    background: #00ff00;
    width: 20%;
    height: 100%;
    opacity: .5;
    z-index: -1;
  }

  .keYongMoney .tab-content .cny-content:nth-of-type(2) > div p span:nth-of-type(2) em {
    position: absolute;
    top: 0;
    left: 0;
    background: #f00;
    width: 20%;
    height: 100%;
  }

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
    margin-top: 1rem;
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
