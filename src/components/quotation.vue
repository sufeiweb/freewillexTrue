<template>
  <div class="quotation">
    <!--<transition enter-active-class="animated zoomInLeft">-->
    <!--&lt;!&ndash;<div class="screenShot">&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="zhe-zhao"></div>&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="screenShot-content">&ndash;&gt;-->
    <!--&lt;!&ndash;<img src="../assets/img/other/cross_little.png" @click="closeScreenShot()"/>&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="screenShot-content-home"></div>&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="screenShot-content-share">&ndash;&gt;-->
    <!--&lt;!&ndash;<span>是否把截屏分享给好友？</span>&ndash;&gt;-->
    <!--&lt;!&ndash;<span>&ndash;&gt;-->
    <!--&lt;!&ndash;<i class="iconfont">&#xe677;</i>&ndash;&gt;-->
    <!--&lt;!&ndash;<i class="iconfont">&#xe69f;</i>&ndash;&gt;-->
    <!--&lt;!&ndash;<i class="iconfont">&#xe64f;</i>&ndash;&gt;-->
    <!--&lt;!&ndash;<i class="iconfont">&#xe6a8;</i>&ndash;&gt;-->
    <!--&lt;!&ndash;<i class="iconfont">&#xe6a2;</i>&ndash;&gt;-->
    <!--&lt;!&ndash;</span>&ndash;&gt;-->
    <!--&lt;!&ndash;<span>&ndash;&gt;-->
    <!--&lt;!&ndash;<a href="javascript:">复制</a>&ndash;&gt;-->
    <!--&lt;!&ndash;<a href="javascript:">保存</a>&ndash;&gt;-->
    <!--&lt;!&ndash;</span>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--</transition>-->
    <div class="quotation-header">
      <router-link to="/"><img src="../assets/img/quotation/quotation_logo.png"/></router-link>
      <div class="transaction-variety">
        <span>{{BaojiaPing | BJCurrency}}</span>
        <div class="transaction-btn-box">
          <span>选择交易品种</span>
          <i class="iconfont" @click="closeOPenTradingClass()" style="cursor: pointer">&#xe673;</i>
        </div>
        <transition
          enter-active-class="animated fadeIn"
          leaveActiveClass="animated fadeOut"
        >
          <div class="select-trading-class" v-show="sserl">
            <div class="select-trading-coin">
              <div class="BaoJia">
                <div v-for="item in coinStyle">
                  <span style="flex: 1" class="baojia-title">{{item.commodity}}</span>
                  <span style="flex: 1" v-if="item.commodity.indexOf('CNY')!==-1">{{businessPrice.get(item.commodity) ? businessPrice.get(item.commodity).price : 0 | float2}}</span>
                  <span style="flex: 1" v-else>{{businessPrice.get(item.commodity) ? businessPrice.get(item.commodity).price : 0 | float6}}</span>
                  <p style="flex: 1;"
                     :class="((businessPrice.get(item.commodity) ? businessPrice.get(item.commodity).rising:'')>0)? 'red':((businessPrice.get(item.commodity) ? businessPrice.get(item.commodity).rising:'')<0)?'green':''">
                    <span>{{businessPrice.get(item.commodity) ? businessPrice.get(item.commodity).rising : 0 | BaoJ}}</span>
                    <span v-if="businessPrice.get(item.commodity)">
                  <i class="el-icon-caret-top" v-show="businessPrice.get(item.commodity).rising>0"></i>
                  <i class="el-icon-caret-bottom" v-show="(businessPrice.get(item.commodity).rising<0)"></i>
                  <i class="el-icon-minus" v-show="(businessPrice.get(item.commodity).rising===0)"></i>
                </span>

                  </p>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="zuixinjia">
        <p>
          <span><em v-show="(account === 'CNY')">{{BaoJia.price | float2}}</em><em
            v-show="!(account === 'CNY')">{{BaoJia.price | float6}}</em> {{account}}</span><span>最新成交价</span>
        </p>
        <p><span
          :class="(BaoJia.rising>0)? 'red':(BaoJia.rising<0)?'green':''">{{BaoJia.rising | BaoJ}}</span><span>涨跌幅</span>
        </p>
        <p><span>{{BaoJia.vol | float4}} {{cunency}}</span><span>24小时成交量</span></p>
      </div>
      <div class="follow-us">
        <div class="follow-icon">
          <a href="http://weibo.com/FreeWillex" target="_blank"><i
            class="iconfont dr">&#xe677;</i></a>
          <a href="javascript:;" class="WEChart"> <i class="iconfont dr">&#xe69f;</i>
            <transition enterActiveClass="animated fadeIn" leaveActiveClass="animated fadeOut">
              <img src="../assets/img/footer/WXcode.jpg" alt="关注微信" v-show="WEChart"/>
            </transition>
          </a>
        </div>
      </div>
      <!--<div class="header-other">-->
      <!--&lt;!&ndash;<a href="javascript:">&ndash;&gt;-->
      <!--&lt;!&ndash;<i class="iconfont dr">&#xe699;</i>&ndash;&gt;-->
      <!--&lt;!&ndash;</a>&ndash;&gt;-->
      <!--&lt;!&ndash;<a href="javascript:" @click="screenshot()">&ndash;&gt;-->
      <!--&lt;!&ndash;<i class="iconfont dr">&#xe66e;</i>&ndash;&gt;-->
      <!--&lt;!&ndash;</a>&ndash;&gt;-->

      <!--&lt;!&ndash;<a href="javascript:" @click="oPenWaring()">&ndash;&gt;-->
      <!--&lt;!&ndash;<i class="iconfont">&#xe6cc;</i>&ndash;&gt;-->
      <!--&lt;!&ndash;<span>价格预警</span>&ndash;&gt;-->
      <!--&lt;!&ndash;<div class="header-warning" style="z-index: 9">&ndash;&gt;-->
      <!--&lt;!&ndash;<el-tabs>&ndash;&gt;-->
      <!--&lt;!&ndash;<el-tab-pane label="价格预警">&ndash;&gt;-->
      <!--&lt;!&ndash;<p>&ndash;&gt;-->
      <!--&lt;!&ndash;<span> </span>&ndash;&gt;-->
      <!--&lt;!&ndash;<select>&ndash;&gt;-->
      <!--&lt;!&ndash;<option>BTC/CNY</option>&ndash;&gt;-->
      <!--&lt;!&ndash;</select>&ndash;&gt;-->
      <!--&lt;!&ndash;</p>&ndash;&gt;-->
      <!--&lt;!&ndash;<p>&ndash;&gt;-->
      <!--&lt;!&ndash;<span><input id="dd1" type="checkbox" name="dd1" checked/><label for="dd1">价格涨破</label></span>&ndash;&gt;-->
      <!--&lt;!&ndash;<input type="text"/>&ndash;&gt;-->
      <!--&lt;!&ndash;</p>&ndash;&gt;-->
      <!--&lt;!&ndash;<p>&ndash;&gt;-->
      <!--&lt;!&ndash;<span><input id="dd2" type="checkbox" name="dd1"/><label for="dd2">价格跌破</label></span>&ndash;&gt;-->
      <!--&lt;!&ndash;<input type="text"/>&ndash;&gt;-->
      <!--&lt;!&ndash;</p>&ndash;&gt;-->
      <!--&lt;!&ndash;<p>&ndash;&gt;-->
      <!--&lt;!&ndash;<span><input id="dd3" type="checkbox" name="dd1"/><label for="dd3">涨跌幅达</label></span>&ndash;&gt;-->
      <!--&lt;!&ndash;<input type="text"/>&ndash;&gt;-->
      <!--&lt;!&ndash;</p>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-tab-pane>&ndash;&gt;-->
      <!--&lt;!&ndash;<el-tab-pane label="预警列表">&ndash;&gt;-->
      <!--&lt;!&ndash;<span class="waring-list"><input type="checkbox" name="dd2" checked/><label>仅预警一次</label></span>&ndash;&gt;-->
      <!--&lt;!&ndash;<span class="waring-list" v-for="item in warningData"><input type="checkbox" name="dd2"/>&ndash;&gt;-->
      <!--&lt;!&ndash;<label>{{item.coinStyle}} {{item.Text}} {{item.num}}</label>&ndash;&gt;-->
      <!--&lt;!&ndash;</span>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-tab-pane>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-tabs>&ndash;&gt;-->
      <!--&lt;!&ndash;<div class="header-warning-btn">&ndash;&gt;-->
      <!--&lt;!&ndash;<button>保存</button>&ndash;&gt;-->
      <!--&lt;!&ndash;<button class="closeWaring">退出</button>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--&lt;!&ndash;</a>&ndash;&gt;-->
      <!--</div>-->
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
              <td>价格</td>
              <td>数量</td>
              <td>时间</td>
            </tr>
            </thead>
          </table>
        </div>
        <div class="quotation-center-table quotation-center-table1 dtscoll">
          <table>
            <tbody>
            <tr v-for="(item,index) in trades">
              <td class="display-flex"><span v-html="PanKouDataPrice(Float2(item.price))"
                                             :class="item.rising>0?'red':item.rising<0?'green':''"></span><i
                class="iconfont qingjiao green" v-show="(item.rising === -1)">&#xe6a1;</i><i class="iconfont red"
                                                                                             v-show="(item.rising === 1)">&#xe6a9;</i><i
                class="el-icon-minus rising" v-show="(item.rising === 0)"></i></td>
              <td>{{item.volume | float4}}</td>
              <td>{{item.time | dateHIS}}</td>
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
              <td>价格</td>
              <td>数量</td>
              <td>我的数量</td>
            </tr>
            </thead>
          </table>
        </div>
        <div class="quotation-center-table quotation-center-table1 dtscoll">
          <table>
            <transition-group enterActiveClass="animated fadeIn" leaveActiveClass="animated fadeOut" tag="tbody">
              <tr v-for="(item,index) in depth.s" :key="index">
                <td class="display-flex green" v-html="PanKouDataPrice(Float2(item.price))"></td>
                <td v-html="PanKouDataVol(Float4(item.vol))" style="color: #a7acaf"></td>
                <td>{{(!isNaN(mySell[index]) ? (mySell[index].toFixed(4)) : '-')}}</td>
              </tr>
            </transition-group>
          </table>
          <table>
            <tbody class="tbody-center">
            <tr>
              <td colspan="3" id="dianwei"> 差价: {{this.$store.state.chaPrice | float2}}   CNY</td>
            </tr>
            </tbody>
          </table>
          <table>
            <transition-group enterActiveClass="animated fadeIn" leaveActiveClass="animated fadeOut" tag="tbody">
              <tr v-for="(item,index) in  depth.b" :key="index">
                <td class="display-flex red" v-html="PanKouDataPrice(Float2(item.price))"></td>
                <td v-html="PanKouDataVol(Float4(item.vol))" style="color: #a7acaf"></td>
                <td>{{(!isNaN(myBuy[index]) ? (myBuy[index].toFixed(4)) : '-')}}</td>
              </tr>
            </transition-group>
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
          <div class="quotation-center-title as">
            委托面板
            <a href="javascript:;" class="revoke1All" @click="revoke1All()"
               v-show="revoke1AllState=entrust.totalElements>0">全部撤销</a>
          </div>
          <div class="delegate-panel-btn-down">

            <el-pagination
              small
              @current-change="handleCurrentChange2"
              :current-page="currentPage"
              layout="prev, pager, next"
              :total="(entrust.totalElements ? entrust.totalElements : 10)"
              :page-size="pageSizeNum"
              v-show="newData"
            >
            </el-pagination>
            <el-pagination
              small
              @current-change="handleCurrentChange3"
              :current-page="currentPage"
              layout="prev, pager, next"
              :total="totalNum2"
              :page-size="pageSizeNum"
              v-show="!newData"
            >
            </el-pagination>
            <span v-show="newData">当前委托</span>
            <span v-show="!newData">历史委托</span>
            <a href="javascript:;" style="color: #fff;"><i class="iconfont" @click="getData()">&#xe658;</i></a>
          </div>
          <div class="delegate-panel-data  dtscoll">
            <table class="delegate-panel-data-table">
              <thead class="delegate-panel-data-thead">
              <tr>
                <td>时间</td>
                <td>委托价格</td>
                <td>委托量</td>
                <td>成交量</td>
                <td>方向</td>
                <td>委托类型</td>
                <td>成交均价</td>
                <td v-show="!newData">成交额</td>
                <td v-show="newData">操作</td>
                <td v-show="!newData">状态</td>
              </tr>
              </thead>
              <transition-group enterActiveClass="animated fadeIn" leaveActiveClass="animated fadeOut" tag="tbody"
                                class="delegate-panel-data-tbody"
                                v-show="(noRecord=entrust.totalElements>0) && newData">
                <tr v-for="(item,index) in entrust.content" :index="index" :key="index">
                  <td>{{item.createDate | dateYMDHIS}}</td>
                  <td>{{item.price | return_}}</td>
                  <td v-if="item.orderType==='MARKET' && item.cammand==='B'">{{item.amount | float2 }}</td>
                  <td v-else>{{item.amount | float4 }}</td>
                  <td>{{item.dealVolume | float4}}</td>
                  <td>{{item.cammand | translate}}</td>
                  <td>{{item.orderType | translate}}</td>
                  <td>{{item.dealPrice}}</td>
                  <td><a href="javascript:;" :code="item.code" :commodity="item.commodity"
                         style="color:#01aaef"
                         @click="revoke1($event)">撤销</a></td>

                </tr>
              </transition-group>
              <transition-group enterActiveClass="animated fadeIn" leaveActiveClass="animated fadeOut" tag="tbody"
                                class="delegate-panel-data-tbody" v-show="noRecord1 && !newData">
                <tr v-for="(item,index) in entrust_history" :index="index" :key="index">
                  <td>{{item.createDate | dateYMDHIS}}</td>
                  <td v-if="item.orderType==='MARKET' && item.cammand==='B'">{{item.amount | float2 }}</td>
                  <td v-else>{{item.amount | float4 }}</td>
                  <td>{{item.dealVolume | float4}}</td>
                  <td>{{item.cammand | translate}}</td>
                  <td>{{item.orderType | translate}}</td>
                  <td>{{item.price | return_}}</td>
                  <td v-show="!newData">{{item}}</td>
                  <td>{{item.dealPrice}}</td>
                  <td>{{item.orderStatus | translate}}</td>
                </tr>
              </transition-group>
              <tbody class="delegate-panel-data-tbody noRecord" v-show="!noRecord&& newData">
              <tr>
                <td colspan="8">
                  <i class="iconfont">&#xe661;</i><span>暂无数据</span>
                </td>
              </tr>
              </tbody>
              <tbody class="delegate-panel-data-tbody noRecord" v-show="!noRecord1&& !newData">
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
                  <router-link to="/userIndex">详情</router-link>
                </p>
                <div class="numBGColor dtscoll">
                  <p v-for="(item,index) in AccountCNY"><span>{{item}}</span><span
                    class="em1">{{(CNYMoneny[item] ? CNYMoneny[item].amount : 0) | float4}}<em></em></span>
                  </p>

                </div>
              </div>
              <div class="cny-content" v-show="!cnyAccount">
                <p><a href="javascript:;" @click="RouterGo()"><i class="iconfont">&#xe6c1;</i></a>
                  <router-link to="/userIndex1">详情</router-link>
                </p>
                <div class="numBGColor1 dtscoll">
                  <p v-for="(item,index) in AccountBTC"><span>{{item}}</span><span
                    class="em2">{{(BTCMoneny[item] ? CNYMoneny[item].amount : 0) | float4}}<em></em></span>
                  </p>

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
            <a href="javascript:" :class="trading_style? 'background-red':'background-green'"
               @click="businessStyle1_tab()">现价</a>
            <a href="javascript:" @click="businessStyle2_tab()">市价</a>
          </div>
          <div class="business-input-box" v-show="businessStyle1">
            <span>价格</span>
            <div class="business-input-price">
              <input v-model="business_price" class="business_price_ipt"/>
              <span>{{commodity.substr(-3)}}</span>
            </div>
          </div>
          <div class="business-input-box" v-show="businessStyle2">
            <span>数量</span>
            <div class="business-input-num">
              <input v-model="business_num" class="business_num_ipt"/>
              <span>{{commodity.substr(0,3)}}</span>
            </div>
          </div>
          <div class="business-input-line"></div>
          <div class="business-price-zong" v-show="businessStyle1 && businessStyle2">
            <span>总额 {{commodity.substr(-3)}}≈</span>
            <span>{{ZMoney}}</span>
          </div>
          <div class="business-submit-box">
            <button class="background-red" @click="businessTran()" v-show="trading_style && trading_login">买入</button>
            <button class="gray" v-show="trading_style && !trading_login">买入</button>
            <button class="background-green" @click="businessTran()" v-show="!trading_style && trading_login">卖出





            </button>
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
  import {mapGetters} from 'vuex';

  export default {
    data() {
      return {
        coinStyle: [],
        warningData: [],
        entrust_current: [],
        entrust_history: [],
        noRecord: false,
        noRecord1: false,
        business_price: '',
        business_num: '',
        trading_style: true,
        cnyAccount: true,
        userNumM: '',
        businessStyle1: true,
        businessStyle2: true,
        commodity: 'BTCCNY',
        types: '',
        price: '',
        amount: '',
        account: 'CNY',
        cunency: 'BTC',
        newData: true,
        currentPage: 1,
        totalNum1: 10,
        totalNum2: 10,
        BaojiaPing: 'BTCCNY',//报价货币名称
        sserl: false,
        WEChart: false,
        BaoJiaObj: {'BTCCNY': {}},//报价obj
        BaoJia: {},
        socket: '',
        userId: '',//用戶id
        officePrice: {},
        AccountCNY: [],
        AccountBTC: [],
        CNYMoneny: [],
        BTCMoneny: [],
        ZMoney: '0.00',
        revoke1AllState: false,
        pageSizeNum: 0,
      }
    },
    components: {
      TKLogin, KLine
    },
    created() {
      this.getDepth();

      this.getBaoPrice();

      this.getCommodityX();
    },
    mounted() {
//      localStorage.setItem('commodity', 'BTCCNY');


      this.BaojiaPing = localStorage.getItem('commodity');
      localStorage.setItem('timers', 'min1');
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
        let oWidth = $(document).width();
        let oHeight = $(window).height();
        let odHeight = window.screen.height - 122;
        let odWight = window.screen.width;
        if (odHeight < 700) {
          this.pageSizeNum = 5;
          $('.numBGColor').css({
            height: '100px'
          })
          $('.numBGColor1').css({
            height: '100px'
          })
        } else {
          this.pageSizeNum = 10;
        }
        $('.quotation').css({height: odHeight + 'px', width: odWight + 'px'});
        $('.quotation-center').css({height: odHeight * 0.98 + 'px'});
        $('.quotation-center-table1').css({maxHeight: (odHeight - 120) + 'px', overflow: 'hidden'})
      }
      {
        let that = this;
        $('.business-tab-btn-classStyle a').click(function () {
          $(this).addClass('border-bottom-color-w').siblings().removeClass('border-bottom-color-w');
          if (!that.trading_style) {
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
          if (!that.trading_style) {
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
        this.entrust_current = this.$store.state.weiTuo;
      }
//      {
//        $(window).scroll(function () {
//          console.log($("#dianwei").scrollTop())
//        })
//      }
      {
        let that = this;
        $(".WEChart").hover(function () {
          that.WEChart = true;
        }, function () {
          that.WEChart = false;
        })
      }
      {
        let that = this;
        $('.business_price_ipt').blur(function () {
          if (that.account === 'CNY') {
            that.business_price = parseFloat(that.ReturnZero($(this).val())).toFixed(2);
          } else {
            that.business_price = parseFloat(that.ReturnZero($(this).val())).toFixed(4);
          }
        });
        $('.business_price_ipt').keyup(function () {
          if (isNaN($(this).val())) {
            that.business_price = '';
          }
        });
        $('.business_num_ipt').blur(function () {
          that.business_num = parseFloat(that.ReturnZero($(this).val())).toFixed(4);
        });
        $('.business_num_ipt').keyup(function () {
          if (isNaN($(this).val())) {
            that.business_num = '';
          }
        })
      }

      var that = this;

      //监听最新价,动态更新 kyc
      window.addEventListener("latestPrice", function (e) {
        that.BaoJia = e.newValue;
      });
      {
        setTimeout(function () {
          that.computedLang1();
          that.computedLang2();
        }, 1000)
      }
      window.addEventListener('userCapital', function () {
//          console.log('监听到资产发生变化')
        that.getCapitalInfo();
      });
      window.addEventListener('rellAllState', function () {
        if (that.$store.state.loginState) {
          if (that.newData) {
            that.request_entrust_current(1);
          } else {
            that.request_entrust_history(1)
          }
        }
      });

    },
    methods: {

      getUserMessage() {
        let res = localStorage.getItem('getU');
        this.userNumM = JSON.parse(res).loginUser;
        this.userId = JSON.parse(res).id;
      },
      //获取盘口信息
      getDepth() {
        this.getCommodity();
        this.$http({
          url: this.$URL_API + 'quotation/depth/' + this.commodity + '/' + 20,
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.$store.state.depth = res.data.data;
            if (res.data.data.s.length > 0 && res.data.data.b.length > 0) {
              this.$store.state.chaPrice = (res.data.data.s[res.data.data.s.length - 1].price - res.data.data.b[0].price)
            } else {
              this.$store.state.chaPrice = 0;
            }
          }
        })
      },
      businessTran() {
        this.getTypes();
        this.getCommodity();
        this.$http({
          url: this.$URL_API + 'trade/entrust',
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
          if (res.data.code === 200) {
            this.showError(res.data.code, res.data.message);
            this.getCapitalInfo();
            this.request_entrust_current(1);
            this.newData = true;
          } else {
            this.showError(res.data.code, res.data.message)
          }
        }).catch((req) => {
          this.showError(req.code, req.message)
        })
      },//交易
      getData() {
        this.newData = !this.newData;
        if (this.newData) {
          this.request_entrust_current(1);
        } else {
          this.request_entrust_history(1)
        }
      },//获取委托
      TKShowTrue() {
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
        this.sserl = !this.sserl
      },
//      价格预警
      oPenWaring() {
        $('.header-warning').show();
      },
      RouterGo() {
        this.getCapitalInfo();
      },
      KTClose() {
        localStorage.removeItem('token');
        localStorage.removeItem('userPsd');
        localStorage.removeItem('userName');
        localStorage.removeItem('signTime');
        sessionStorage.removeItem('EMAIL');
        sessionStorage.removeItem('MOBILE');
        localStorage.removeItem('getU');
        this.$store.state.token = '';
        this.$store.state.loginTrue = false;
        this.$store.dispatch('loginStateFalse');
        this.sendEvent('logout', '');
      },
      //计算血条em1
      computedLang1() {
        let max = [];
        for (let i = 0; i < $('.numBGColor p').length; i++) {
          max.push(Number($('.em1').eq(i).text()));
        }//算血条长度
        for (let i = 0; i < $('.em1').length; i++) {
          $('.em1').eq(i).find('em').css({
            width: Number($('.em1').eq(i).text()) * 100 / Math.max.apply(null, max) + '%'
          })
        }
      },
      computedLang2() {
        let max = [];
        for (let i = 0; i < $('.numBGColor1 p').length; i++) {
          max.push(Number($('.em2').eq(i).text()));
        }//算血条长度
        for (let i = 0; i < $('.em2').length; i++) {
          $('.em2').eq(i).find('em').css({
            width: Number($('.em2').eq(i).text()) * 100 / Math.max.apply(null, max) + '%'
          })
        }
      },
      businessStyle1_tab() {
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
      businessStyle2_tab() {
        this.business_price = '';
        this.business_num = '';
        if (!this.trading_style) {
          this.businessStyle1 = false;
          this.businessStyle2 = true;
        } else {
          this.businessStyle1 = true;
          this.businessStyle2 = false;
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
      getCommodity() {
        this.commodity = localStorage.getItem('commodity');
      },//获取交易品种
      revoke1(ev) {
        this.$http({
          url: this.$URL_API + 'trade/cancels/' + ev.target.getAttribute('commodity') + '/' + ev.target.getAttribute('code'),
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Authorization': 'Bearer ' + this.$store.state.token
          }
        }).then((res) => {
          this.showError(res.data.code, res.data.message);
          if (res.data.code === 200) {
            this.getCapitalInfo();
            this.currentPage = 1;
//            ev.target.parentNode.parentNode.remove();
//            this.request_entrust_current(this.currentPage);
          }
        }).catch((req) => {
          this.showError(req.code, req.message);
        })

      },
      revoke1All(){
        this.$http({
          url: this.$URL_API + 'trade/cancelsAll/' + localStorage.getItem('commodity'),
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Authorization': 'Bearer ' + this.$store.state.token
          }
        }).then((res) => {
          this.showError(res.data.code, res.data.message);
          this.totalNum = 10;
        }).catch((req) => {
          this.showError(req.code, req.message)
        })
      },
      request_entrust_current(currentPage) {
        this.$http({
          url: this.$URL_API + 'trade/unsettled',
          method: 'POST',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Authorization': 'Bearer ' + this.$store.state.token,
            "Content-Type": "application/json;charset=UTF-8",
          },
          data: {
            pageNo: currentPage - 1,
            pageSize: this.pageSizeNum,
            param: {
              commodity: localStorage.getItem('commodity'),
            }
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.totalNum1 = res.data.data.totalElements ? res.data.data.totalElements : this.pageSizeNum;
            this.noRecord = res.data.data.totalElements > 0;
            this.revoke1AllState = res.data.data.totalElements > 0;
            for (let i = 0; i < this.entrust_current.length; i++) {
              this.entrust_current[i].orderSerialList = null;
            }
            this.$store.state.weiTuo = res.data.data;
          } else {
            this.totalNum1 = this.pageSizeNum;
            this.noRecord = false;
          }
        })
      },
      request_entrust_history(currentPage) {
        this.$http({
          url: this.$URL_API + 'trade/history',
          method: 'POST',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Authorization': 'Bearer ' + this.$store.state.token,
            "Content-Type": "application/json;charset=UTF-8",
          },
          data: {
            pageNo: currentPage - 1,
            pageSize: this.pageSizeNum,
            param: {
              commodity: localStorage.getItem('commodity'),
            }
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.totalNum2 = res.data.data.totalElements ? res.data.data.totalElements : this.pageSizeNum;
            this.noRecord1 = res.data.data.totalElements > 0;
            this.entrust_history = res.data.data.content;
          } else {
            this.totalNum2 = this.pageSizeNum;
            this.noRecord = false;
          }
        })
      },
      handleCurrentChange2(currentPage) {
        this.currentPage = currentPage;
        this.request_entrust_current(currentPage)
      },
      handleCurrentChange3(currentPage) {
        this.request_entrust_history(currentPage)
      },
      dt(de) {
        this.BaojiaPing = de.find('.baojia-title').text();
        this.$store.state.LatestPriceCurrency = this.BaojiaPing;
        this.cunency = (this.BaojiaPing).substring(0, 3);
        this.account = (this.BaojiaPing).substr(-3);
      },
      getBaoPrice() {
        this.$http({
          url: this.$URL_API + 'quotation/offerPrice',
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          }
        }).then((res) => {
          if (res.data.code === 200) {
            let dd = res.data.data;
            for (let i = 0; i < dd.length; i++) {
              if (dd[i].commodity.substr(-3) === 'CNY') {
                this.officePrice[dd[i].commodity.substr(0, 3)] = dd[i];
              }
            }
            this.coinStyle = res.data.data;
            this.$store.state.trades = [];
            for (let i = 0; i < res.data.data.length; i++) {
              this.BaoJiaObj[res.data.data[i].commodity] = {
                price: res.data.data[i].price,
                rising: res.data.data[i].rising,
                vol: res.data.data[i].vol
              }
            }
          }
        }).then(() => {
          let that = this;
          $('.BaoJia div').click(function () {
              that.BaojiaPing = $(this).find('.baojia-title').text();
              that.$store.state.LatestPriceCurrency = that.BaojiaPing;
              localStorage.setItem('commodity', that.BaojiaPing);
              that.sendEvent('rellAllState', '');
              that.sserl = false;
              that.cunency = (that.BaojiaPing).substring(0, 3);
              that.account = (that.BaojiaPing).substr(-3);
              that.getDepth();
              that.dt($(this));
            }
          )
        })

        // console.log(socket);

      },
      //      获取价格
//      获取币种
      getCommodityX() {
        this.$http({
          url: this.$URL_API + 'commodity/account',
          method: 'GET',
          header: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        }).then((res) => {
          this.AccountCNY = res.data.data.CNY;
          this.AccountBTC = res.data.data.BTC;
        })
      },
//      获取用户资金信息
      getCapitalInfo() {
        this.$http({
          url: this.$URL_API + 'capital/info',
          method: 'GET',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + this.$store.state.token
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.CNYMoneny = [];
            let dd = res.data.data;
            for (let i = 0; i < dd.length; i++) {
              if (dd[i].legalMoney === 'CNY') {
                this.CNYMoneny[dd[i].currency] = dd[i];
              } else {
                this.BTCMoneny[dd[i].currency] = dd[i];
              }
            }
          }
        })
      },
    },
    computed: {
      TKLoginShow() {
        return this.$store.state.TKShow;
      },
      trading_login() {
        if (this.$store.state.loginState) {
          this.request_entrust_current(1);
          this.getUserMessage();
          this.getCapitalInfo();
        }
        return this.$store.state.loginState;
      },
      myBuy() {
        if (this.depth.b.length > 0 && this.entrust.length > 0) {
          var size = this.depth.b.length;
          var buyList = new Array(size);
          for (var i = 0; i < size; i++) {
            for (let item of this.entrust) {
              if (this.depth.b[i].price === item.price) {
                buyList[i] = item.amount - item.dealVolume + (isNaN(buyList[i]) ? 0 : buyList[i]);
              }
            }
          }
          return buyList;
        }
        return [];
      },
      mySell() {
        if (this.depth.s.length > 0 && this.entrust.length > 0) {
          var size = this.depth.s.length;
          var sellList = new Array(size);
          for (var i = 0; i < size; i++) {
            for (let item of this.entrust) {
              if (this.depth.s[i].price === item.price) {
                sellList[i] = item.amount - item.dealVolume + (isNaN(sellList[i]) ? 0 : sellList[i]);
              }
            }
          }
          return sellList;
        }
        return [];
      },
      ...mapGetters(['trades', 'depth', 'entrust', 'businessPrice'])
    },
    watch: {
      business_price() {
        if (this.account === 'CNY') {
          this.ZMoney = ((this.business_price ? this.business_price : 0) * (this.business_num ? this.business_num : 0)).toFixed(4)
        } else {
          this.ZMoney = ((this.business_price ? this.business_price : 0) * (this.business_num ? this.business_num : 0)).toFixed(4)
        }
      },
      business_num() {
        if (this.account === 'CNY') {
          this.ZMoney = ((this.business_price ? this.business_price : 0) * (this.business_num ? this.business_num : 0)).toFixed(4)
        } else {
          this.ZMoney = ((this.business_price ? this.business_price : 0) * (this.business_num ? this.business_num : 0)).toFixed(4)
        }
      }
    }


  }
</script>
<style scoped>
  .rising {
    margin-left: .5rem;
  }

  .revoke1All {
    color: #01aaef !important;
  }

  .quotation {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #fff;
    margin: 0 !important;
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
    font-size: 14px;
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
    padding: 1rem 0;
    width: 50%;
    text-align: center;
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
    width: 100px;
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
    outline: none;
    background: none;
    color: #fff;
    font-size: 16px;
    padding: 10px 0;
    border-radius: 3px;
  }

  .gray {
    background: #5d6564 !important;
  }

  .red {
    color: #ff6939 !important;
    /*opacity: 0.5;*/
  }

  .green {
    color: #84f766 !important;
    /*opacity: 0.5;*/
  }

  .quotation-header {
    display: flex;
    height: 2rem;
    align-items: center;
    padding: 1rem 0;
    width: 100%;
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
    cursor: pointer;
  }

  /*.select-trading-coin > div > div>span:nth-of-type(2){*/
  /*width: 100px;*/
  /*text-align: left;*/
  /*margin-left: 1rem;*/
  /*}*/

  .select-trading-coin > div > div > p {
    display: flex;
    align-items: center;
    justify-content: flex-end;

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

  .follow-icon a:nth-of-type(1) i {
    color: #db2b22;
  }

  .follow-icon a:nth-of-type(2) i {
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
    width: 17%;

  }

  .quotation-center > div:nth-of-type(4) {
    width: 14%;

  }

  .quotation-center > div:nth-of-type(3) {
    width: 52%;

  }

  .quotation-center-table1 {
    width: 100%;

    overflow: scroll;
    overflow-x: hidden;
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
    width: 100%;
    border-collapse: collapse;
  }

  .quotation-center-table table td {
    padding: .2rem .8rem;
    text-align: center;
  }

  table tbody tr:hover {
    background: #0a0a0a;
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
    height: 3.1rem;
    text-align: right !important;
  }

  .quotation-chart-line {
    height: 55%;
  }

  /*.quotation-center-table1::-webkit-scrollbar {height:8px; width:8px;}*/
  /*.quotation-center-table1::-webkit-scrollbar-button {height:0; width:0}*/
  /*.quotation-center-table1::-webkit-scrollbar-button:start:decrement,::-webkit-scrollbar-button:end:increment { display:block}*/
  /*.quotation-center-table1::-webkit-scrollbar-button:vertical:start:increment,::-webkit-scrollbar-button:vertical:end:decrement { display:none}*/
  /*.quotation-center-table1::-webkit-scrollbar-track:vertical,::-webkit-scrollbar-track:horizontal,::-webkit-scrollbar-thumb:vertical,::-webkit-scrollbar-thumb:horizontal,::-webkit-scrollbar-track:vertical,::-webkit-scrollbar-track:horizontal,::-webkit-scrollbar-thumb:vertical,::-webkit-scrollbar-thumb:horizontal { border-style:solid; border-color:transparent}*/
  /*.quotation-center-table1::-webkit-scrollbar-track:vertical::-webkit-scrollbar-track:horizontal{background-clip:padding-box;background-color:#fff;}*/

  /*.quotation-center-table1::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.05);*/
  /*border-radius: 10px;*/
  /*-webkit-box-shadow: inset 1px 1px 0 rgba(0,0,0,.1);}*/
  /*.quotation-center-table1::-webkit-scrollbar-thumb:hover {background-color:rgba(0,0,0,0.2);border-radius:10px;-webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,.1)}*/
  /*.quotation-center-table1::-webkit-scrollbar-thumb:active {background:rgba(0,0,0,0.6);-webkit-border-radius:15px;}*/
  /*.quotation-center-table1::-webkit-scrollbar-track:vertical,::-webkit-scrollbar-track:horizontal,::-webkit-scrollbar-thumb:vertical,::-webkit-scrollbar-thumb:horizontal {  border-width:0;}*/
  /*.quotation-center-table1::-webkit-scrollbar-track:hover {-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.4);background-color:rgba(0,0,0,0.01);-webkit-border-radius:15px;}*/
  /*.quotation-center-table1::-webkit-scrollbar-track:active {-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.4);background-color:rgba(0,0,0,0.05);-webkit-border-radius:15px;}*/

  /*.quotation-center-table2 div::-webkit-scrollbar {height:8px; width:8px;}*/
  /*.quotation-center-table2 div::-webkit-scrollbar-button {height:0; width:0}*/
  /*.quotation-center-table2 div::-webkit-scrollbar-button:start:decrement,::-webkit-scrollbar-button:end:increment { display:block}*/
  /*.quotation-center-table2 div::-webkit-scrollbar-button:vertical:start:increment,::-webkit-scrollbar-button:vertical:end:decrement { display:none}*/
  /*.quotation-center-table2 div::-webkit-scrollbar-track:vertical,::-webkit-scrollbar-track:horizontal,::-webkit-scrollbar-thumb:vertical,::-webkit-scrollbar-thumb:horizontal,::-webkit-scrollbar-track:vertical,::-webkit-scrollbar-track:horizontal,::-webkit-scrollbar-thumb:vertical,::-webkit-scrollbar-thumb:horizontal { border-style:solid; border-color:transparent}*/
  /*.quotation-center-table2 div::-webkit-scrollbar-track:vertical::-webkit-scrollbar-track:horizontal{background-clip:padding-box;background-color:#fff;}*/

  /*.quotation-center-table2 div::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.05);*/
  /*border-radius: 10px;*/
  /*-webkit-box-shadow: inset 1px 1px 0 rgba(0,0,0,.1);}*/
  /*.quotation-center-table2 div::-webkit-scrollbar-thumb:hover {background-color:rgba(0,0,0,0.2);border-radius:10px;-webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,.1)}*/
  /*.quotation-center-table2 div::-webkit-scrollbar-thumb:active {background:rgba(0,0,0,0.6);-webkit-border-radius:15px;}*/
  /*.quotation-center-table2 div::-webkit-scrollbar-track:vertical,::-webkit-scrollbar-track:horizontal,::-webkit-scrollbar-thumb:vertical,::-webkit-scrollbar-thumb:horizontal {  border-width:0;}*/
  /*.quotation-center-table2 div::-webkit-scrollbar-track:hover {-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.4);background-color:rgba(0,0,0,0.01);-webkit-border-radius:15px;}*/
  /*.quotation-center-table2 div::-webkit-scrollbar-track:active {-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.4);background-color:rgba(0,0,0,0.05);-webkit-border-radius:15px;}*/
  .delegate-panel {
    height: 40%;
  }

  .delegate-panel-title {
    padding: 0 1.5rem;
    background: #42515a;
    color: #d3d6d8;
    height: 2.333rem;
    line-height: 2.333rem;
    font-size: 1.333rem;
  }

  .delegate-panel-btn-down {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: .3rem 1.5rem;
    font-size: 1.083rem;
    color: #dfe1e2 !important;
  }

  .delegate-panel-btn-down span {
    margin-right: .8rem;
  }

  .delegate-panel-data {
    overflow: scroll;
    overflow-x: hidden;
    padding: 0 1.5rem;
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
    font-size: 14px;
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

  .BaoJia > div {
    padding: .8rem 0;
    margin-bottom: 0 !important;
  }

  .BaoJia > div:hover {
    background: #f5f5f5;
  }

  .dr {
    font-size: 26px !important;
    cursor: pointer;
  }

  .follow-icon .dr:nth-of-type(1) {
    margin-right: 1rem;

  }

  .follow-icon a {
    position: relative;
  }

  .follow-icon a > img {
    position: absolute;
    z-index: 999;
    width: 150px;
    bottom: -165px;
    left: -25px;
  }

  .zuixinjia {
    display: flex;
    align-items: center;
  }

  .zuixinjia p {
    margin-right: 1.5rem;
  }

  .qingjiao {
    transform: rotate(-45deg) !important;
  }

  .numBGColor, .numBGColor1 {
    overflow-x: hidden;
  }

  .as {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .revoke1All {
    margin-right: 30px;
  }
</style>
