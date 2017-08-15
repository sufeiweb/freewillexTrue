<template>
  <div class="userIndex">
    <div class="recharge-group">
      <div class="recharge-group-title">
        <p>选择账户</p>
      </div>
      <div class="recharge-group-radio">
        <input name="select-account413" type="radio" id="account-cny453" value="" checked/>
        <label for="account-cny453" class="recharge-group-radio-checked">
         <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
          <span class="iconFont a9"></span>
          <span> 全部 </span>
        </label>
        <input name="select-account413" type="radio" id="account-cny4553" value="CNY" />
        <label for="account-cny4553" >
         <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
          <span class="iconFont a1"></span>
          <span>CNY账户</span>
        </label>
        <input name="select-account413" type="radio" id="account-btc433" value="BTC"/>
        <label for="account-btc433">
          <span class=""><img src="../../assets/img/iconPng/jiantou.png"/></span>
          <span class="iconFont a2"></span>
          <span>BTC账户</span>
        </label>
      </div>
    </div>
    <userFooter></userFooter>
  </div>
</template>
<script>
  import userFooter from '../lettle_components/userFooter.vue';
  export default {
      components: {
          userFooter
      },
    mounted() {
          let that =this;
          this.$store.state.Account='';
      {
        {
          $("input[name='select-account413']").change(function () {
            $(this).next().addClass('recharge-group-radio-checked').siblings().removeClass('recharge-group-radio-checked');
            that.$store.state.Account=$(this).val();
          })
        }//选择账户
      }//选择账户
    }
  }
</script>
<style scoped>
  .userIndex{
    padding: 0 1.667rem 2rem 3.333rem;
  }
  .recharge-group-title {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    font-size: 1.333rem;
    border-bottom: 1px solid #ddd;
    padding: 1.5rem 0;
    margin-bottom: 1.25rem;
  }
  .iconFont{
    width: 22px;
    height: 22px;
    margin: .5rem;

  }
  .recharge-group-radio-checked .a1,.recharge-group-radio-checked .a2, .recharge-group-radio-checked .a9{
    background-position: 0;
  }
  .a1{
    background: url("../../assets/img/iconPng/CNYzhanghu.png");
    background-position: -22px;

  }
  .a2{
    background: url("../../assets/img/iconPng/BTCzhanghu.png");
    background-position: -22px;
  }
  .a9{
    background: url("../../assets/img/iconPng/all.png");
    background-position: -22px;
  }
  .recharge-group-title > a {
    color: #01aaef;
    font-size: 1.167rem;
    font-weight: bold;
  }

  .recharge-group-radio{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .recharge-group-radio > input {
    display: none;
  }
  .recharge-group:nth-of-type(1) label {
    flex-direction: column;
    width: 125px;
    box-sizing: border-box;
  }

  .recharge-group:nth-of-type(1) label > i {
    flex-direction: column;
    margin-right: 0;
  }
  .recharge-group-radio > label {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border: 1px solid #ddd;
    padding: 2.2rem 3rem;
    margin-right: 1.667rem;
    margin-bottom: 1.667rem;
    position: relative;
    cursor: pointer;
  }
  .recharge-group-radio label > i {
    margin-right: 1rem;
  }

  .recharge-group-radio > label > span:nth-of-type(1) {
    display: none;
    position: absolute;
    right: -0.8rem;
    top: -0.8rem;
    background: #fff;
    padding: .3rem;
    border-radius: 50%;
  }

  .recharge-group-radio > label > span:nth-of-type(1) > span {
    border-radius: 50%;
    background: #01aaef;
    color: #fff;
    padding: 0.1rem;
  }
  .recharge-group-radio-checked {
    border-color: #01aaef !important;
  }

  .recharge-group-radio-checked > span {
    display: block !important;
    border-color: #01aaef !important;
  }

</style>
