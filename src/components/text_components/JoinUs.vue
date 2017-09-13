<template>
  <div class="join-us layout">

    <div class="carousel-inner margin-bottom-40">
      <div class="active item">
        <a href=""><img src="../../assets/img/join.jpg"/></a>
      </div>
    </div>
    <div class="company-profile join-section">

      <ul class="choose-job clearfix">
        <li class="active">
          <button class="btn blue btn-corner" @click="showView(1)">客服</button>
        </li>
        <li>
          <button class="btn blue btn-corner" @click="showView(2)">文案</button>
        </li>
        <li>
          <button class="btn blue btn-corner" @click="showView(3)">推广</button>
        </li>
      </ul>
        <transition-group class="tab-content" enterActiveClass="animated fadeIn"  tag="div">
          <div class="tab-pane" :key="1" v-show="kefu">
            <div class="margin-bottom-40">
              <p>亲！FreeWillex自由意志正在普天之下广招人才！</p>

              <p>无论你是否拥有客服经验，只要你能肯学习！有自信！都可以大胆放马过来！
                            </p>
            </div>
            <div class="margin-bottom-40">
              <p>当前，我们的客服岗位正在向您招手！</p>
            </div>
            <div class="margin-bottom-40">
              <p class="title">需要几位？</p>

              <p>只有10个名额喔！</p>

              <p>认为自己合适就来吧！错过了不知道要等多久啊！</p>
            </div>
            <div class="margin-bottom-40">
              <p class="title">在哪上班？</p>

              <p>就在上海，就在陆家嘴！来感受一下金融城的魅力！</p>
            </div>
            <div class="margin-bottom-40">
              <p class="title">客服人员需要做什么？</p>

              <p>接听FreeWillex自由意志海内外客户的来话，用最真诚的服务为客户排忧解难。</p>
            </div>
            <div class="margin-bottom-40">
              <p class="title">岗位有什么要求？</p>

              <p>1、只要您是18-35周岁，拥有本科以上学历^_^，如果您有客服工作经验更好。</p>

              <p>2、普通话标准，能说能听英语，表达清晰、发音标准。具备良好的表达与沟通能力。你懂的！</p>

              <p>3、电脑操作能力必不可少，要会用office系列办公软件喔。</p>

              <p>4、打字速度那是不在话下，中文30字/分，没难度！</p>

              <p>5、能适应24小时轮班，每天7-8小时工作时间，白天不懂夜的黑，你懂的！</p>

              <p>6、最后当然是稳定性！可不能半途而废啊！</p>
            </div>
            <div class="margin-bottom-40">
              <p class="title">您能得到什么？</p>

              <p>1.我们提供业内具有竞争力的工资和福利待遇，拥有丰富的团队主题活动。</p>

              <p>2.以客服岗位为起点，您将拥有更多其他岗位的晋升通道，如经理、主管等管理类岗位，以及培训师、数据分析师、线上线下推广等专业技能类岗位。</p>

              <p>3.您可以在工作中不断提升沟通技巧、销售技巧等，给自己充电并掌握必杀技能。</p>
            </div>
          </div>
          <div class="tab-pane" :key="2" v-show="wenan">
            <div class="margin-bottom-40">
              <p>
                都说文能提笔安天下，你敢不敢来试一下？
            </p>

              <p>
                FreeWillex自由意志的文案一职虚位以待！
            </p>
            </div>
            <div class="margin-bottom-40">
              <p class="title">
                什么是我们想要的文案？
            </p>

              <p>
                我们希望TA的文章辞丰意雄、侈丽闳衍、沈博绝丽、哀感顽艳，内涵经天纬地之才，外括博古通今之气，还有。。。
            </p>
            </div>
            <div class="margin-bottom-40">
              <p>
                观众A：。
            </p>

              <p>
                观众B：。。
            </p>

              <p>
                观众C：。。。
            </p>
            </div>
            <div class="margin-bottom-40">
              <p>
                好吧，以上要求一律作废，FreeWillex自由意志君真正要的人才是：
            </p>

              <p>
                具备洞察力、具备联想力、具备亲和力、具备学习力！（通俗不少吧？！此处应有掌声）
            </p>
            </div>
            <div class="margin-bottom-40">
              <p>
                观众A：（正在拍手~~）
            </p>

              <p>
                观众B：（正在鼓掌~~）
            </p>

              <p>
                观众C：（正在热烈鼓掌~~）
            </p>
            </div>
            <div class="margin-bottom-40">
              <p>
                只要你有上述特质，且具备一定工作经验，认为自己合适就来吧！别再犹豫了！千万别错过FreeWillex自由意志君的期盼哦！
            </p>
            </div>
            <div class="margin-bottom-40">
              <p class="title">
                我们在哪上班？
            </p>

              <p>
                就在上海，就在陆家嘴！一起来感受一下金融城的魅力！
            </p>
            </div>
            <div class="margin-bottom-40">
              <p class="title">
                文案需要做什么？
            </p>

              <p>
                你要能上九天揽月，下五洋捉鳖！
            </p>
            </div>
            <div class="margin-bottom-40">
              <p>
                观众A：又来了。。
            </p>

              <p>
                观众B：是啊。。。
            </p>

              <p>
                观众C：（仍在热烈鼓掌~~）
            </p>
            </div>
            <div class="margin-bottom-40">
              <p>
                好吧，通俗点讲，我们的文案成天和文字打交道，完成各种软文，各种推广标语、口号等等，
            </p>

              <p>
                Change your words! Change your world!
            </p>
            </div>
            <div class="margin-bottom-40">
              <p class="title">
                岗位有什么要求？
            </p>

              <p>
                1、必须是成人，拥有本科以上学历^_^
            </p>

              <p>
                2、英语能力你自己看着办，不要你说，不要你听，但必须能写！
            </p>

              <p>
                3、关心行业，关心社会热点，关心自己和团队中的每一个人。
            </p>

              <p>
                4、思维活跃，勇于突破，能独立完成策划案。
            </p>
            </div>
            <div class="margin-bottom-40">
              <p class="title">
                您能得到什么？
            </p>

              <p>
                1、一旦你加入，你将得到最棒的团队队友，因为他们每一个人都和你一样。
            </p>

              <p>
                2、只要你来，给你的是最前沿的挑战，你的价值会因此得到最大体现。
            </p>

              <p>
                3、此外还有具备竞争力的薪资、丰厚的福利、多彩的团建活动等等。
            </p>
            </div>
          </div>
          <div class="tab-pane" :key="3" v-show="tuiguang">
            <div class="margin-bottom-40">
              <p>
                “亲，你在哪里？”
            </p>

              <p>
                我们——FreeWillex自由意志君，正在宇宙中心呼唤你的到来！
            </p>

              <p>
                百度上没有你，360上没有你，搜狗上没有你，论坛上没有你，SNS上没有你。。。
            </p>
            </div>
            <div class="margin-bottom-40">
              <p>
                亲，你在哪里？
            </p>

              <p>
                亲，你去哪里了？
            </p>

              <p>
                亲，还有什么办法可以找到你？
            </p>
            </div>
            <div class="margin-bottom-40">
              <p>如果你听到这里的呼唤，请一定要联系FreeWillex自由意志君好吗？
                            </p>
            </div>
            <div class="margin-bottom-40">
              <p class="title">
                我们急切地希望你来完成如下挑战：
            </p>

              <p>
                1．根据产品特点，制定切实可行的推广方案，挖掘、优化产品关键字
            </p>

              <p>
                2．熟悉APP安装、发布各种渠道
            </p>

              <p>
                3．熟悉SEO，对现有网站
            </p>

              <p>
                4．思维敏捷，逻辑性强，能对推广各项数据进行分析、整理、监控及反馈追踪，并提出合理化建议，便于及时调整推广策略
            </p>
            </div>
            <div class="margin-bottom-40">
              <p class="title">
                你能得到什么？
            </p>

              <p>1.我们提供业内具有竞争力的工资和福利待遇，拥有丰富的团队主题活动。
                            </p>

              <p>2.以推广岗位为起点，你将拥有更多其他岗位的晋升通道，如经理、主管等管理类岗位，以及培训师、数据分析师、线上线下推广等专业技能类岗位。
                            </p>

              <p>3.你可以在工作中不断提升沟通技巧、销售技巧等，给自己充电并掌握必杀技能。
                            </p>
            </div>
          </div>
        </transition-group>
      <p class="">欢迎加入我们！快来成为我们FreeWillex自由意志大家庭的一员吧！！！</p>

      <p class="text-center sky">
        有意者请将简历发到 <span class="font-blue-common">career@freewillex.cn</span>，邮件主题为：“职位+姓名”
                </p>
    </div>

  </div>
</template>
<script>
  export default{
    data(){
      return {
        kefu: true,
        wenan: false,
        tuiguang: false
      }
    },
    methods: {
      showView(num){
        switch (num) {
          case 1:
            this.kefu = true;
            this.wenan = false;
            this.tuiguang = false;
            break;
          case 2:
            this.kefu = false;
            this.wenan = true;
            this.tuiguang = false;
            break;
          case 3:
            this.kefu = false;
            this.wenan = false;
            this.tuiguang = true;
            break;
        }
      }
    }
  }
</script>
<style scoped>
  .join-us {
    margin: 20px auto;
    background: #fff;
    padding-bottom: 50px;
  }

  .choose-job {
    display: flex;
    padding: 30px 0;
  }

  .choose-job button {
    margin-right: 20px;
    padding: 6px 10px;
    border: none;
    background: #01aaef;
    border-radius: 4px;
    color: #fff;
    font-size: 14px;
    outline: none;
    cursor: pointer;
  }

  .choose-job button:hover {
    background: #5b9bd1;
  }

  .company-profile {
    width: 75%;
    margin: 0 auto;
    font-size: 14px;
  }

  .margin-bottom-40 {
    margin-bottom: 40px;
  }

  .sky {
    display: flex;
    align-items: center;
  }
</style>
