<template>
  <div class="login-box">
    <div class="home">
      <el-carousel trigger="click" class="home-banner" height="44.67rem">
        <el-carousel-item>
          <a href="javascript:"><img src="../assets/img/home/home_02.jpg" alt="" width="100%"/></a>
        </el-carousel-item>
        <el-carousel-item>
          <router-link to="/production">
            <img src="../assets/img/offerPng/home_03.jpg" alt="" width="100%"/>
          </router-link>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="home-content layout">
      <div class="home-item">
        <div class="home-item-title"><span></span><em>报价牌</em><span></span></div>
        <div class="home-item-contentr">
          <em v-show="false">{{this.$store.state.businessPrice.name}}</em>
          <section v-for="(item,index) in officePrice">
            <em class="baojia-color" :class="(businessPrice.get(item.commodity)?businessPrice.get(item.commodity).rising:'')>0?'bg-red':(businessPrice.get(item.commodity)?businessPrice.get(item.commodity).rising:'')<0?'bg-green':'bg-gray'"></em>
            <span class="baojia-commodity">{{item.commodity |cutting}}</span>
            <div class="baojia-price-box">
              <span class="baojia-price" v-if="item.commodity.indexOf('CNY')!==-1">{{businessPrice.get(item.commodity) ? businessPrice.get(item.commodity).price : 0 | float2}}</span>
              <span class="baojia-price" v-else>{{businessPrice.get(item.commodity) ? businessPrice.get(item.commodity).price : 0 | float6}}</span>
              <span class="baojia-risking" :class="(businessPrice.get(item.commodity)?businessPrice.get(item.commodity).rising:'')>0?'red':(businessPrice.get(item.commodity)?businessPrice.get(item.commodity).rising:'')<0?'green':'gray'">
                <i class="el-icon-caret-top" v-show="(businessPrice.get(item.commodity)?businessPrice.get(item.commodity).rising:'')>0"></i>
                <i class="el-icon-caret-bottom" v-show="(businessPrice.get(item.commodity)?businessPrice.get(item.commodity).rising:'')<0"></i>
                <i class="el-icon-minus" v-show="(businessPrice.get(item.commodity)?businessPrice.get(item.commodity).rising:'')===0"></i>
                <em>{{(businessPrice.get(item.commodity)?businessPrice.get(item.commodity).rising:'')|BaoJ}}</em>
                <!--<em>&nbsp;({{1200}})</em>-->
              </span>
            </div>
            <div class="baojia-higt-low">
              <p v-if="item.commodity.indexOf('CNY')!==-1"><span>高：</span><span>{{item.high |float2}}</span></p>
              <p v-else><span>高：</span><span>{{item.high |float6}}</span></p>
              <p v-if="item.commodity.indexOf('CNY')!==-1"><span>低：</span><span>{{item.low |float2}}</span></p>
              <p v-else><span>低：</span><span>{{item.low |float6}}</span></p>
            </div>
          </section>
        </div>
      </div>
      <div class="home-item">
        <div class="home-item-title"><span></span><em>区块链工具</em><span></span></div>
        <div class="home-item-content">
          <aside><router-link to="/blockChainingTool">点击进入 ></router-link></aside>
          <aside><router-link to="/blockChainingTool">点击进入 ></router-link></aside>
          <aside><router-link to="/blockChainingTool">点击进入 ></router-link></aside>
        </div>
      </div>
      <div class="home-item">
        <div class="home-item-title"><span></span><em>系统特性</em><span></span></div>
        <div class="home-item-content">
          <article>
            <img src="../assets/img/home/home_19.jpg" alt=""/>
            <span>冷钱包技术</span>
            <p>私钥永不触网，离线存储，让数字资产存储更安全</p>
          </article>
          <article>
            <img src="../assets/img/home/home_22.jpg" alt=""/>
            <span>SSL安全通讯</span>
            <p>采用全球知名的GlobalSign数字签名技术，数据通讯安全可靠</p>
          </article>
          <article>
            <img src="../assets/img/home/home_25.jpg" alt=""/>
            <span>信息真实</span>
            <p>涵盖BTC、LTC、ETC、BCC等全球主流数字资产</p>
          </article>
          <article>
            <img src="../assets/img/home/home_30.jpg" alt=""/>
            <span>100%兑付</span>
            <p>银行四要素实名策略，交易对手真是有效</p>
          </article>
          <article>
            <img src="../assets/img/home/home_31.jpg" alt=""/>
            <span>实时防护</span>
            <p>平台资金独立存管，随需随取，100%兑付</p>
          </article>
          <article>
            <img src="../assets/img/home/home_32.jpg" alt=""/>
            <span>云数据库</span>
            <p>阿里云数据库，银行级数据灾备</p>
          </article>
          <article>
            <img src="../assets/img/home/home_36.jpg" alt=""/>
            <span>币种丰富</span>
            <p>涵盖BTC、LTC、ETH、BCC等全球主流数字资产</p>
          </article>
          <article>
            <img src="../assets/img/home/home_37.jpg" alt=""/>
            <span>币币交易</span>
            <p>支持BTC交易计价，提供BTC、CNY两种交易专区，专区资产秒级划转</p>
          </article>
          <article>
            <img src="../assets/img/home/home_38.jpg" alt=""/>
            <span>多功能行情图</span>
            <p>涵盖BTC、LTC、ETH、BCC等全球主流数字资产</p>
          </article>
        </div>
      </div>
      <div class="home-item">
        <div class="home-item-title"><span></span><em>合作伙伴</em><span></span></div>
        <div class="home-item-content foot">
          <dl>
            <dt><a href="http://8btc.com" target="_blank"><img src="../assets/img/home/home_43.jpg" alt=""/></a></dt>
            <dd>巴比特资讯专注于区块链、比特币以及数字货币领域的新闻报道</dd>
          </dl>
          <dl>
            <dt><a href="https://www.sosobtc.com" target="_blank"><img src="../assets/img/home/home_45.jpg" alt=""/></a>
            </dt>
            <dd>sosobtc,专注于为数字货币用户提供相关应用与服务的交流平台</dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import loginCenter from './lettle_components/loginCenter.vue';
  import {mapGetters} from 'vuex';
  export default {
    data(){
      return {
        officePrice: [],//最新价
      }
    },
    components: {loginCenter},
    created(){
      this.getOfferPrice();
    },

    methods: {
      getOfferPrice(){
        this.$http({
          url: this.$URL_API + 'quotation/offerPrice',
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.officePrice = res.data.data;
            this.$store.state.businessPrice.name = res.data.data.price;
            for(let i=0;i<res.data.data.length;i++){
              this.$store.state.businessPrice.data.set(res.data.data[i].commodity, res.data.data[i]);
            }
          }
        })
      }
    },
    computed:{
      ...mapGetters(['businessPrice'])
    }
  }
</script>
<style scoped>
  .home-banner {
    margin-top: .15rem;
    width: 100%;
  }

  .home-item-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
    color: #cecece;
  }

  .home-item-title em {
    display: block;
    padding: 0 20px;
  }

  .home-item-title span {
    height: 1px;
    flex: 1;
    background: #dcdcd7;
  }

  .red {
    color: #c00 !important;
  }

  .bg-red {
    background: #c00;
  }

  .green {
    color: #0c0;
  }

  .bg-green {
    background: #00cc00;
  }

  .gray {
    color: #666;
  }

  .bg-gray {
    background: #666
  }

  .home-item-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .home-item-contentr{
    overflow: hidden;
  }
  .home-item-contentr section {
    float: left;
    width: 277px;
    height: 136px;
    background: url("../assets/img/home/home_05.jpg");
    background-size: 100% !important;
    margin-bottom: 20px;
    margin-right: 16.5px;
    margin-left: 16.5px;
    position: relative;
  }

  .home-item-contentr section .baojia-color {
    display: block;
    height: 20px;
    width: 4px;
    position: absolute;
    left: -2px;
    top: 5px;
  }

  .home-item-contentr section .baojia-commodity {
    font-size: 14px;
    position: absolute;
    top: 5px;
    left: 15px;
  }

  .home-item-contentr section .baojia-price-box {
    right: 15px;
    top: 20px;
    position: absolute;
  }

  .home-item-contentr section .baojia-higt-low p {
    display: flex;
    align-items: center;
    margin-bottom: 3px;
  }

  .home-item-contentr section .baojia-price-box .baojia-price {
    font-size: 26px;
    margin-bottom: 5px;
  }

  .home-item-contentr section .baojia-price-box .baojia-risking {
    display: flex;
    align-items: center;
    padding-left: 3px;
  }

  .home-item-contentr section .baojia-price-box .baojia-risking i {
    margin-right: 5px;
  }

  .home-item-contentr section .baojia-price-box .baojia-risking em {
    font-style: normal;
  }

  .home-item-contentr section .baojia-higt-low {
    position: absolute;
    bottom: 5px;
    left: 15px;
  }

  .home-item-content aside {
    width: 386px;
    background-size: 100% !important;
    height: 230px;
    position: relative;
    margin-bottom: 20px;
  }

  .home-item-content aside:nth-of-type(1) {
    background: url("../assets/img/home/home_09.png") #fff no-repeat;
  }

  .home-item-content aside:nth-of-type(2) {
    background: url("../assets/img/home/home_11.png") #fff no-repeat;
  }

  .home-item-content aside:nth-of-type(3) {
    background: url("../assets/img/home/home_13.png") #fff no-repeat;
  }

  .home-item-content aside a {
    color: #01aaef;
    position: absolute;
    font-size: 14px;
    top: 160px;
    left: 10%;
  }

  .home-item-content article {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 32%;
    height: 150px;
    padding: 0 36px;
    box-sizing: border-box;
  }

  .home-item-content article img {
    margin-bottom: 20px;
  }

  .home-item-content article span {
    margin-bottom: 10px;
    color: #01aaef;
    font-size: 12px;
    font-weight: bold;
  }

  .home-item-content article p {
    text-align: center;
    line-height: 21px;
    color: #555964;
  }

  .home-item-content.foot {
    justify-content: center;
  }

  .home-item-content dl {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 260px;
    text-align: center;
    margin-bottom: 30px;
  }

  .home-item-content dl dt {
    margin-bottom: 20px;
  }

  .home-item-content dl dd {
    line-height: 1.5em;
    color: #555964;
  }

  .home-item-content dl:nth-of-type(1) {
    margin-right: 50px;
  }

  .home-item-content dl:nth-of-type(2) {
    margin-left: 50px;
  }
</style>
