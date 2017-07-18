<template>
  <div class="introduction-header">
    <h1 class="introduction-link-title">公司介绍</h1>
    <div class="introduction-top top5">
      <div class="title">
        <p>团队文化</p>
        <p class="font-size-18">严谨而有趣</p>
      </div>
    </div>
    <div class="introduction-content">
      <div class="about-team who">
        <p class="title">我们是谁</p>
        <p class="detail">
          上海数炫的团队核心成员多来自于金融领域，公司80%员工拥有证券或期货从业资格证或基金从业资格证书，团队整体具备较高的金融素质，结合多年的金融产品开发经验，团队还具备丰富的互联网运营与金融产品研发经验。</p>
      </div>
      <div class="about-team flag">
        <p class="title">我们的使命</p>
        <p>让比特币更易于使用</p>
        <p>打造行业内值得信赖的品牌</p>
        <p>成为比特币生态整合平台</p>
      </div>
      <div class="about-team">
        <p class="title">团队生活</p>
        <div class="about-team-img">
          <div class="about-team-img-box">
            <img src="../../assets/img/introduction/team1.jpg"  alt="">
            <img src="../../assets/img/introduction/team2.jpg"  alt="">
            <img src="../../assets/img/introduction/team3.jpg"  alt="">
            <img src="../../assets/img/introduction/team4.jpg"  alt="">
            <img src="../../assets/img/introduction/team5.jpg"  alt="">
            <img src="../../assets/img/introduction/team6.jpg"  alt="">
          </div>
          <div class="button-prev btn" @click="move_left()"></div>
          <div class="button-next btn" @click="move_right()"></div>
        </div>
        <p>公司拥有一支富有朝气的团队，我们的团队成员来自五湖四海，为了一个共同的梦想走到了一起。我们虽然拥有不同的性格、教育背景和工作经历，</p>
        <p>但都有一个共同的特点：热爱互联网！</p>
        <p>我们激情四射，但底蕴丰厚；我们活力无限，也同样耐得住寂寞；我们满怀理想，脚踏实地去实现；我们创想无限，我们拒绝平庸！</p>
        <p>在这里，我们优势互补，不用担心自己想法的实施局限于自己的能力范围；</p>
        <p>在这里，我们的每个想法都会得到团队中肯的意见，最终趋于完美；</p>
        <p>在这里，我们在一起，没有曲高和寡，只有知己相伴；</p>
        <p>在这里，我们的工作受到应得的肯定，付出一定有回报！</p>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default {
    data() {
      return {
        num: 0
      }
    },
    methods: {
      move_left() {
        this.num++;
        if (this.num <= 3) {
          $('.about-team-img-box img').css({transform: "translateX(" + (-30.5 * this.num) + "rem)"});
        }else {
            this.num = 0;
        }
      },
      move_right() {
        this.num--;
        if (this.num >= 0) {
          $('.about-team-img-box img').css({transform: "translateX(" + (-30.5 * this.num) + "rem)"});
        }else {
          this.num = 3;
        }
      }
    }
  }
</script>
<style scoped>
  .top5 {
    background: url('../../assets/img/introduction/about5.jpg') no-repeat center;
    background-size: 100%;
  }

  .introduction-content .about-team.who {
    background: url(../../assets/img/introduction/who.png) 72% bottom no-repeat;
  }

  .introduction-content .about-team {
    margin: 6.667rem auto;
    font-size: 1.1667rem;
    text-align: center;
  }

  .about-team .title {
    font-size: 1.667rem;
    margin-bottom: 3.333rem;
  }

  .about-team.who .detail {
    width: 61rem;
    margin: 0 auto;
  }

  .about-team-img {
    position: relative;
    width: 85%;
    margin: 0 auto;
  }

  .about-team-img-box {
    display: flex;
    overflow: hidden;
    margin-bottom: 2.667rem;
  }

  .about-team-img img {
    margin: 0 1rem;
  }

  .about-team-img .btn {
    position: absolute;
    width: 2.25rem;
    height: 3.667rem;
    top: 50%;
    margin-top: -1.833rem;
    cursor: pointer;
  }

  .button-prev {
    background: url(../../assets/img/introduction/prev_btn.png) no-repeat center;
    left: -4.583rem;
  }

  .button-next {
    background: url(../../assets/img/introduction/next_btn.png) no-repeat center;
    right: -4.583rem;
  }

  .about-team p {
    margin-bottom: .833rem;
  }
</style>
