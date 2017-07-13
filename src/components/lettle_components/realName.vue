<template>
  <div class="real-name">
    <div class="user-welcome"><span>您好，</span><span>176****3949</span><span class="real-hide">176****3949</span></div>
    <div class="user-real">
      <p><i class="iconfont">&#xe663;</i><span class="real-hide">实名认证</span></p>
      <p><i class="iconfont">&#xe64b;</i><span class="real-hide">绑定邮箱</span></p>
      <p><i class="iconfont black-color">&#xe65f;</i><span class="real-hide">绑定手机</span></p>
      <p><i class="iconfont">&#xe670;</i><span class="real-hide">谷歌验证</span></p>
      <p><i class="iconfont">&#xe631;</i><span class="real-hide">资金密码</span></p>
    </div>
    <div class="safety-level">
      <span>安全等级</span>
      <div class="safe-box">
        <span class="safe-move-view">20%</span>
      </div>
    </div>
    <div></div>
  </div>
</template>
<style>
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
  }
  .user-welcome span:nth-of-type(1){
    font-size: 1.0833rem;
  }
  .user-real{
    margin: 1.667rem 0;
    justify-content: space-between;
  }
  .user-real p{
    position: relative;
  }
  .user-real p .iconfont{
    font-size: 1.833rem;
    color: #01aaef;
  }
  .real-hide{
    position: absolute;
   min-width: 5rem;
    padding: .5rem 1rem;
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
</style>
