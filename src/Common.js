exports.install = function (Vue, options) {
  /**
   * 文本拷贝
   * @param objId
   * @param tipInfo
   */
  Vue.prototype.copy = function (objId, tipInfo) {
    let Url = $("#" + objId);
    Url.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
  };
/*
*错误提示
* @num 错误码
* @str 错误提示文本
 */
  Vue.prototype.showError=function (num,str) {
    let _this=this;
    this.$store.state.ErrorMessage=str;
    if(num===200){
      this.$store.dispatch('errorShow');
      setTimeout(function () {
        _this.$store.dispatch('errorHide');
      },2000)
    }else {
      this.$store.dispatch('errorShow1');
      setTimeout(function () {
        _this.$store.dispatch('errorHide1');
      },2000)
    }
  };
  /**
   * 生成二维码
   * @param obj 装二维码的位置dom
   * @param str 生产二维码的内容
   * @constructor
   */
  Vue.prototype.QRC=function (obj,str) {
    let qRode=new QRCode(obj,{width:150,height:150});
    qRode.makeCode(str)
  }
};
