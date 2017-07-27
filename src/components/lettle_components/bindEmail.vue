<template>
  <div class="bindEmail">
    <div class="bindEmail-title">
  <p>邮箱绑定</p>
</div>
    <div class="bindEmail-from">
      <div class="bindEmail-from-group">
        <span>邮箱</span>
        <div>
          <input type="text" placeholder="邮箱" v-model="bindEmailNum" class="bindEmailNum-input"/>
          <span class="bindEmailNum-tips"></span>
        </div>
      </div>
      <div class="bindEmail-from-group">
        <span>验证码</span>
        <div>
          <div class="bindEmail-input-box">
            <input type="text" placeholder="验证码" v-model="bindEmailRYZ" class="bindEmailRYZ-input"/>
            <span @click="bindEmailRgetCord()">{{bindEmailRGetCord}}</span>
          </div>
          <span class="bindEmailRYZ-tips"></span>
        </div>
      </div>
      <div class="bindEmail-from-group">
        <span>邮箱验证码</span>
        <div>
          <div class="bindEmail-input-box">
            <input type="text" placeholder="邮箱验证码" v-model="bindEmailRCaptcha"/>
            <span>获取验证码</span>
          </div>
          <span class="bindEmailRCaptcha-tips"></span>
        </div>
      </div>
      <div class="bindEmail-from-group">
        <span>&nbsp;</span>
        <div>
          <a href="javascript:;" class="QbindEmail" @click="QbindEmail()">确认绑定</a>
          <span class="phone-tips"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
      data(){
          return {
            bindEmailRCaptcha:'',
            bindEmailRYZ:'',
            bindEmailRGetCord:''
          }
      },
      mounted() {
          let that=this;
        {
          $('.bindEmailRYZ-input').keyup(function () {
            console.log(that.bindEmailRYZ);
            if (that.bindEmailRYZ == that.bindEmailRGetCord) {
              $('.bindEmailRYZ-tips').html('');
              that.$store.state.realNeed.Yz = true;
            } else {
              $('.yz-tips').html('请核对验证码').css({
                alignSelf: 'flex-start',
                color: 'red'
              });
              that.$store.state.realNeed.Yz = false;
            }
          })
        }//验证码校验
      }
  }
</script>
<style scoped>
  .bindEmail{
    font-size: 1.167rem;
  }
  .bindEmail .bindEmail-title {
    border-bottom: 1px solid #ddd;
  }

  .bindEmail .bindEmail-title p {
    color: #666;
    padding: 1.3rem 0;
    font-size: 1.333rem;
  }
.bindEmail-from{
  padding: 4rem 0;
}
  .bindEmail-from-group {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 1.2rem;
    height: 5rem;
  }
  .bindEmail-from-group > span:nth-of-type(1) {
    padding-top: 0.583rem;
    width: 20rem;
    margin-bottom: 0;
    text-align: right;
    margin-right: 2rem;
  }
  .bindEmail-from-group > div {
    width: 28.8rem;
    margin-bottom: -1.6rem;
  }

  .bindEmail-input-box {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
  }

  .bindEmail-input-box > input {
    border: none !important;
    width: 70% !important;
  }

  .bindEmail-input-box > span {
    background: #01aaef;
    color: #fff;
    text-align: center;
    width: 30%;
    height: 2.75rem !important;
    line-height: 2.75rem !important;
    cursor: pointer;
  }

  .bindEmail-from-group > div > input, .bindEmail-from-group > div > select, .bindEmail-input-box > input {
    width: 100%;
    padding: 0.667rem 1rem;
    box-sizing: border-box;
    border: none;
    border: 1px solid #ddd;
  }

  .bindEmail-from-group > div > span, .bindEmail-input-box > span {
    height: 1.5rem;
  }
  .QbindEmail {
    width: 10.833rem;
    text-align: center;
    padding: .8rem 0;
    background: #01aaef;
    color: #fff;
    border-radius: .133rem;
  }
</style>
