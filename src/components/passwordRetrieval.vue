<template>
  <div class="retrieval">
    <div class="retrieval-box">
      <div class="retrieval-header">
        <span>找回密码</span>
        <a href="javascript:" v-if="retrieval_text" @click="retrieval_style()">邮箱找回</a>
        <a href="javascript:" v-if="!retrieval_text" @click="retrieval_style()">手机找回</a>
      </div>
      <div class="retrieval-from" v-if="retrieval_text">
        <form name="retrieval1">
          <div class="form-group1">
            <span>手机号码</span>
            <div class="form-group-content de">
              <input type="text" placeholder="手机"/>
              <div class="help-tips"></div>
            </div>
          </div>
          <div class="form-group1">
            <span>验证码</span>
            <div class="form-group1-box">
              <div class="form-group-content">
                <input type="text" placeholder="验证码"/>
                <a href="javascript:">获取验证码</a>
              </div>
              <div class="help-tips"></div>
            </div>
          </div>
          <div class="form-group1">
          <span>手机验证码</span>
          <div class="form-group1-box">
            <div class="form-group-content">
              <input type="text" placeholder="手机验证码"/>
              <a href="javascript:">获取验证码</a>
            </div>
            <div class="help-tips"></div>
          </div>
        </div>
          <div class="form-group1">
            <span>密码</span>
            <div class="form-group-content de">
              <input type="password" placeholder="密码"/>
              <div class="help-tips"></div>
            </div>
            <p class="password-strength"><span></span><span></span><span></span><em class="password-strength-view">低</em></p>
          </div>
          <div class="form-group1">
            <span>确认密码</span>
            <div class="form-group-content de">
              <input type="password" placeholder="确认密码"/>
              <div class="help-tips"></div>
            </div>
          </div>
          <div class="form-group1 dd margin-bottom-0">
            <span> </span>
            <div class="form-group-content1">
              <input type="button" value="提交" class="retrieval-submit"/>
            </div>
          </div>
          <div class="form-group1 margin-bottom-0">
            <span> </span>
            <div class="form-group-content1">
              <span>已有帐号? </span>
              <router-link to="/login" class="go-login"> 直接登录</router-link>
            </div>
          </div>
        </form>
      </div>
      <div class="retrieval-from" v-if="!retrieval_text">
        <form name="retrieval1">
          <div class="form-group1">
            <span>邮箱</span>
            <div class="form-group-content de">
              <input type="text" placeholder="邮箱"/>
              <div class="help-tips"></div>
            </div>
          </div>
          <div class="form-group1">
            <span>验证码</span>
            <div class="form-group1-box">
              <div class="form-group-content">
                <input type="text" placeholder="验证码"/>
                <a href="javascript:">获取验证码</a>
              </div>
              <div class="help-tips"></div>
            </div>
          </div>
          <div class="form-group1">
            <span>邮箱验证码</span>
            <div class="form-group1-box">
              <div class="form-group-content">
                <input type="text" placeholder="邮箱验证码"/>
                <a href="javascript:">获取验证码</a>
              </div>
              <div class="help-tips"></div>
            </div>
          </div>
          <div class="form-group1">
            <span>密码</span>
            <div class="form-group-content de">
              <input type="password" placeholder="密码"/>
              <div class="help-tips"></div>
            </div>
            <p class="password-strength"><span></span><span></span><span></span><em class="password-strength-view">低</em></p>
          </div>
          <div class="form-group1">
            <span>确认密码</span>
            <div class="form-group-content de">
              <input type="password" placeholder="确认密码"/>
              <div class="help-tips"></div>
            </div>
          </div>
          <div class="form-group1 dd margin-bottom-0">
            <span> </span>
            <div class="form-group-content1">
              <input type="button" value="提交" class="retrieval-submit"/>
            </div>
          </div>
          <div class="form-group1 margin-bottom-0">
            <span> </span>
            <div class="form-group-content1">
              <span>已有帐号? </span>
              <router-link to="/login" class="go-login"> 直接登录</router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from "jquery";
  export default{
    data() {
      return {
        retrieval_text: true,
      }
    },
    methods: {
      retrieval_style() {
        this.retrieval_text = !this.retrieval_text;
      }
    }
  }
</script>
<style>
  .country-name>p{
    display: flex;
    align-items: center;
  }
  .retrieval-box{
    width: 64rem;
    margin: 2rem auto;
    padding: 1rem 1.667rem 1.25rem 1.667rem;
    background: #fff;
  }
  .retrieval-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.333rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #eee;
    min-height: 4rem;
  }
  .retrieval-header >a{
    color: #01aaef;
    font-size: 1.167rem;
  }
  .retrieval-from{
    margin-top: 3.33rem;
  }
  .form-group1{
    display: flex;
    margin-bottom: 2rem;
  }
  .form-group1>span{
    width: 13.33rem;
    padding:1rem 1.25rem 0 1.25rem;
    font-weight: 400;
    font-size: 1.167rem;
    text-align: right;
  }
  .form-group1-box{
    width: 50%;
  }
  .form-group1-box .form-group-content{
    width: 100%;
  }
  .form-group1-box .form-group-content a{
    background: #01aaef;
    color: #fff;
    height: 3.167rem;
    width: 14rem;
    text-align: center;
    line-height: 3.167rem;
    font-size: 1.167rem;
  }
  .form-group-content{
    width: 50%;
    display: flex;
    align-items: center;
    margin: 0 1.25rem;
    border: 1px solid #e5e5e5;
    background: #fff;
  }
  .form-group-content>input{
    padding: 0.667rem 1rem;
    border: 0;
    outline: none;
    width: 100%;
    height: 1.833rem;
  }
  .area-code{
    width: 3.333rem;
    margin-left:0.667rem;
    border-right: 1px solid #e5e5e5;
    line-height: 3.167rem;
  }
  .form-group-content .help-tips{
    width: 100%;
    height:1.5rem ;
  }
  .de{
    border:none;
    flex-direction: column;
  }
  .de input{
    border: 1px solid #e5e5e5;
    width: 93.8%;
  }
  .form-group-content1{
    display: flex;
    align-items: center;
    width: 50%;
    margin: 0 1.25rem;
    font-size: 1.167rem;
  }
  .form-group-content1 label{
    display: flex;
    align-items: center;
  }
  .form-group-content1 label a{
    font-size: 1.167rem;
    color: #5b9bd1;
  }
  .form-group-content1 label a:hover{
    color: #3175af;
    text-decoration: underline;
  }
  .retrieval-submit{
    width: 100%;
    padding: 0.667rem 1rem;
    border: none;
    color: #FFFFFF;
    background: #01aaef;
    font-size: 1.167rem;
    outline: none;
    cursor: pointer;
    margin-top: 1.8rem;
    margin-bottom: .8rem;
  }
  .retrieval-submit:hover{
    background: #0186bc;
  }
  .form-group-content1 .go-login{
    margin: 0 .7rem;
    color: #5b9bd1;
  }
  .form-group-content1 .go-login:hover{
    color: #3175af;
    text-decoration: underline;
  }
  .dd{
    border-top: 1px solid #eee;
    margin-top: 1.5rem;
  }
  .margin-bottom-0{
    margin-bottom: 0;
  }
  .password-strength {
    display: flex;
    margin-top: -1.5rem;
    align-items: center;

  }
  .password-strength span{
    width: 3rem;
    height: 1rem;
    margin-right: .8rem;
    background: #e9ecf3;
  }
  .password-strength-view{
    color: red;
  }
</style>
