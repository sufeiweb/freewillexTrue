 <template>
  <div>
    <div class="real-name">
      <div class="user-welcome"><span>您好,176****3949</span><span class="real-hide"><img src="../../assets/img/other/dropup_b.png"/><span>176****3949</span></span></div>
      <div class="user-real">
        <p><i class="iconfont">&#xe663;</i><span class="real-hide"><img src="../../assets/img/other/dropup_b.png"/><span>实名认证</span></span></p>
        <p><i class="iconfont">&#xe64b;</i><span class="real-hide"><img src="../../assets/img/other/dropup_b.png"/><span>绑定邮箱</span></span></p>
        <p><i class="iconfont black-color">&#xe65f;</i><span class="real-hide"><img src="../../assets/img/other/dropup_b.png"/><span>绑定手机</span></span></p>
        <p><i class="iconfont">&#xe670;</i><span class="real-hide"><img src="../../assets/img/other/dropup_b.png"/><span>谷歌验证</span></span></p>
        <p><i class="iconfont">&#xe631;</i><span class="real-hide"><img src="../../assets/img/other/dropup_b.png"/><span>资金密码</span></span></p>
      </div>
      <div class="safety-level">
        <span>安全等级</span>
        <div class="safe-box">
          <span class="safe-move-view">20%</span>
        </div>
      </div>
    </div>
    <div class="real-name-footer-split"></div>
  </div>

</template>
<script>
  import $ from  'jquery';
  export default {
      mounted() {
          $('.user-welcome').hover(function () {
           $(this).find('.real-hide').css({display:"block"});
          },function () {
            $(this).find('.real-hide').css({display:"none"});
          });
          $('.user-real p').hover(function () {
            $(this).find('.real-hide').css({display:"block"});
          },function () {
            $(this).find('.real-hide').css({display:"none"});
          })
      }
  }
</script>
<style scoped>
  .real-name-footer-split{
    width: 16.667rem;
    height: 1.25rem;
    background-color: #e9ecf3;
  }
  .real-name{
    width:16.667rem;
    box-sizing: border-box;
    padding: 1rem 1rem 1.25rem 1rem;
  }
  .real-name>div{
    display: flex;
    align-items: center;
  }
  .real-name .user-welcome{
    align-items: flex-end;
    position: relative;
    cursor: pointer;
  }
  .user-welcome>span:nth-of-type(1){
    font-size: 1.0833rem;
  }
  .user-welcome .real-hide{
    left: 2.4rem;
    top: 1.2rem;
  }
  .user-real{
    margin: 1.667rem 0;
    justify-content: space-between;
  }
  .user-real p{
    position: relative;
    cursor: pointer;
  }
  .user-real p .iconfont{
    font-size: 1.833rem;
    color: #01aaef;
  }
  .real-hide{
    display: none;
    position: absolute;
   min-width: 5rem;
    left: -1.6rem;
  }
  .safety-level{
    align-items: center;
  }
  .safety-level>span{
margin-right: .5rem;
  }
  .safe-box{
    width:10rem;
    height: 1.333rem;
    background: #f5f5f5;
    border-radius: .667rem;
  }
  .safe-move-view{
    text-align: center;
    line-height: 1.333rem;
    font-size: 1rem;
    background: #fb6132;
    width: 2rem;
    border-radius: 0.667rem;
    color: #fff;
  }
  .user-real p .iconfont.black-color{
    color: black;
  }
  .real-hide img{
    margin: 0 auto;
  }
  .real-hide>span{
    background: #333;
    color: #fff;
    padding: .3rem .5rem;
  }
</style>
