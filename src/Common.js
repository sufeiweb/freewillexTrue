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

    console.log(tipInfo)
  }
};
