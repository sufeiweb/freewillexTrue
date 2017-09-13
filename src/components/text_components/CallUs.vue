<template>
  <div class="CallUs layout">
    <div class="group">
      <h1 class="CallUs-title">联系我们</h1>
      <img src="../../assets/img/map.jpg" alt=""/>
      <div class="CallUs-middle">
        <aside>
          <p class="title">联系方式</p>
          <span>地址：中国（上海）自由贸易试验区陆家嘴东路161号38楼3801室</span>
        </aside>
        <aside>
          <p class="title">客服服务</p>
          <span>24小时全国服务热线：400-960-0212</span>
          <span>客户服务邮箱：service@freewillex.cn</span>
          <span>产品与技术相关战略合作：cooperation@freewillex.cn</span>
          <span>建议、举报、投诉：IPR@freewillex.cn</span>
          <span>人才加盟、就业合作：career@freewillex.cn</span>
        </aside>
      </div>
    </div>
    <div class="group">
      <h1 class="CallUs-title">建议与投诉</h1>
      <div class="CallUs-middle">
        <aside>
          <section>
            <span>姓名：</span>
            <input type="text" placeholder="请输入姓名" v-model="name" class="name-ipt"/>
          </section>
          <section>
            <span>联系电话：</span>
            <input type="text" placeholder="请输入联系电话" v-model="Phone" class="Phone-ipt" maxlength="11"/>
          </section>
          <section>
            <span>邮箱：</span>
            <input type="text" placeholder="请输入邮箱" v-model="Email" class="Email-ipt" maxlength="32"/>
          </section>
        </aside>
        <aside>
          <span>内容：</span>
          <textarea placeholder="请输入内容" v-model="Text"></textarea>
        </aside>
      </div>
      <p>
        <button @click="subMit($event)">提交</button>
      </p>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default{
    data(){
      return {
        name: '',
        Phone: '',
        Email: '',
        Text: ''
      }
    },
    mounted(){
      let _this = this;
      $('.Phone-ipt').blur(function () {
        if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(_this.Phone))) {
          _this.showError('', '手机号码有误');
        }
      });
      $('.Email-ipt').blur(function () {
        if (!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(_this.Email)) {
          _this.showError('', '邮箱输入有误');
        }
      })
    },
    methods: {
      subMit(ev){
        let textContent;
        if (!this.Phone && !this.Email) {
          this.showError('', '手机号码/邮箱 不能为空');
        } else if (!this.Text) {
          this.showError('', '内容不能为空');
        } else {
          textContent = this.removeHTMLTag(this.Text);
          ev.target.innerHTML = '处理中...';
          this.$http({
            url: this.$URL_API + 'other/feedback',
            method: 'POST',
            data: {
              userName: this.name,
              contacts: this.Phone ? this.Phone : this.Email,
              content: textContent,
              status:0
            },
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              "Content-Type": "application/json;charset=UTF-8",
            }
          }).then((res) => {
            if (res.data.code === 200) {
              this.showError(res.data.code, res.data.message);
              ev.target.innerHTML = '提交'
            } else {
              this.showError(res.data.code, res.data.message);
              ev.target.innerHTML = '提交'
            }
          }).catch((req) => {
            ev.target.innerHTML = '提交'
          })
        }
      }
    }
  }
</script>
<style scoped>
  .CallUs {
    margin: 20px auto;
    background: #fff;
  }

  .CallUs img {
    width: 100%;
  }

  .CallUs-title {
    text-align: center;
    font-weight: 500;
    padding: 20px 0;
  }

  .CallUs-middle {
    display: flex;
    justify-content: space-between;
    padding: 20px 30px;
    font-size: 16px;
  }

  .CallUs-middle aside span {
    font-size: 14px;
    padding: 5px 0;
  }

  .CallUs-middle aside section {
    margin-bottom: 15px;
  }

  .CallUs-middle aside input {
    width: 80%;
    padding: 10px 10px;
    background: #f7f7f7;
    border: 1px solid #e5e5e5;
    border-radius: 2px;
  }

  .CallUs-middle aside textarea {
    width: 80%;
    background: #f7f7f7;
    border: 1px solid #e5e5e5;
    height: 82%;
    border-radius: 2px;
    padding: 10px;
    box-sizing: border-box;
    font-size: 14px;
  }

  aside {
    width: 40%;
  }

  .group > p {
    text-align: center;
  }

  button {
    margin: 20px auto;
    padding: 10px 50px;
    color: #FFFFFF;
    border: none;
    background-color: #01aaef;
    border-radius: 4px !important;
    outline: none;
    cursor: pointer;
  }
</style>
