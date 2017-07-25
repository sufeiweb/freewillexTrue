<template>
  <div class="bindBank">
    <div class="bandBank-header">
      <p class="title">绑定银行卡</p>
      <a class="close"><i class="iconfont">&#xe650;</i></a>
    </div>
    <div class="from-box">
      <section>
        <span>姓名</span>
        <div class="section-input">
          <input type="text" v-model="BankUserName" disabled/>
        </div>
      </section>
      <section>
        <span>国家/地区</span>
        <div class="section-input">
          <input type="text" v-model="BankUserCity" disabled/>
        </div>
      </section>
      <section>
        <span>身份证号码</span>
        <div class="section-input">
          <input type="text" v-model="BankUserIDCard" disabled/>
        </div>
      </section>
    </div>
  </div>
</template>
