var config = require('../config');

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
  /**
   * 错误提示
   * @num 错误码
   * @str 错误提示文本
   */
  Vue.prototype.showError = function (num, str) {
    let _this = this;
    this.$store.state.ErrorMessage = str;
    if (num === 200) {
      this.$store.dispatch('errorShow');
      setTimeout(function () {
        _this.$store.dispatch('errorHide');
      }, 2000)
    } else {
      this.$store.dispatch('errorShow1');
      setTimeout(function () {
        _this.$store.dispatch('errorHide1');
      }, 2000)
    }
    if (num === 404) {
      this.$router.push('/error404')
    }
    if (num === 502) {
      this.$router.push('/error502')
    }
  };
  /**
   * 生成二维码
   * @param obj 装二维码的位置dom
   * @param str 生产二维码的内容
   * @constructor
   */
  Vue.prototype.QRC = function (obj, str) {
    var qRode = new QRCode(obj, {width: 150, height: 150});
    qRode.clear();
    qRode.makeCode(str)
  };


  /**
   * 判断密码强度
   */
  Vue.prototype.passWord = function (pwd, className1, className2) {
    var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
    var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    var enoughRegex = new RegExp("(?=.{6,}).*", "g");
    var enoughFlag = enoughRegex.test(pwd);
    var mediumFlag = mediumRegex.test(pwd);
    var strongFlag = strongRegex.test(pwd);
    // console.log(enoughFlag);
    // console.log(mediumFlag);
    // console.log(strongFlag);
    if (enoughFlag) {
      $('.' + className1 + ' span:first-child').css({background: '#c00'});
      $('.' + className1 + ' span:nth-child(2)').css({background: '#cfd0d2'});
      $('.' + className1 + ' span:nth-child(3)').css({background: '#cfd0d2'});
      $('.' + className2).html('低').css({color: '#c00'});
    } else {
      $('.' + className1 + ' span:first-child').css({background: '#cfd0d2'});
      $('.' + className2).html(' ');
    }
    if (mediumFlag) {
      $('.' + className1 + ' span:nth-child(2)').css({background: '#01aaef'});
      $('.' + className1 + '  span:nth-child(3)').css({background: '#cfd0d2'});
      $('.' + className2).html('中').css({color: '#01aaef'})
    } else {
      $('.' + className1 + ' span:nth-child(2)').css({background: '#cfd0d2'});
    }
    if (strongFlag) {
      $('.' + className1 + ' span:nth-child(3)').css({background: '#0c0'});
      $('.' + className2).html('高').css({color: '#0c0'})
    } else {
      $('.' + className1 + ' span:nth-child(3)').css({background: '#cfd0d2'});
    }
  };

  /**
   * 8位小鼠
   */
  Vue.prototype.Float4 = function (str) {
    return parseFloat(str).toFixed(4);
  };
  Vue.prototype.Float2 = function (str) {
    return parseFloat(str).toFixed(2);
  };

  Vue.prototype.PanKouDataVol = function (str) {
    return str.substr(0, str.length - 4) + `<b>${str.substr(-4, 3)}</b>` + `<b>${str.substr(-1)}</b>`
  }
  Vue.prototype.PanKouDataPrice = function (str) {
    return `<b style="opacity: .5">${str.substr(0, str.length - 2)}</b>` + `<b style="opacity: 1">${str.substr(-2)}</b>`
  };
  Vue.prototype.Reverse = function (str) {
    if (str) {
      return str.reverse()
    }
  }

  /**
   *
   * @param ltcNum
   * @param ltcPrice
   * @param currencyPrice
   * @param currency
   * @returns {string}
   */
  //计算价格转换
  Vue.prototype.compulation = function (ltcNum, ltcPrice, currencyPrice, currency) {
    // console.log(ltcNum, ltcPrice, currencyPrice, currency)
    if (currency === 'CNY') {
      return (ltcNum * (ltcPrice ? ltcPrice : 1) / (currencyPrice ? currencyPrice : 1)).toFixed(2);
    } else {
      return (ltcNum * (ltcPrice ? ltcPrice : 1) / (currencyPrice ? currencyPrice : 1)).toFixed(8);
    }
  };
  /**
   *
   * @param index
   * @param numArr
   * @param currency
   * @param amount
   */
  //計算血條長度
  Vue.prototype.compulationLang = function (index, numArr, currency, amount, price, str, officePrice) {
    let Zprice = 0;
    let _this = this;
    if (numArr['LTC'] && currency && officePrice) {
      for (let i = 0; i < currency.length; i++) {
        Zprice += Number(_this.compulation(numArr[currency[i]].amount, officePrice[currency[i]] ? officePrice[currency[i]].price : 0, price, str));
      }
    }
    // console.log(index);
    //   console.log((Zprice),1212)
    //   console.log((index/Zprice),1221332)
    if ((index / Zprice).toFixed(4) * 100 > 0.2) {
      return (index / Zprice).toFixed(4) * 100 + '%';
    } else {
      return '0.2%';
    }
  }

  /**
   *
   * @param numArr
   * @param currency
   * @param amount
   * @param price
   * @param str
   * @param officePrice
   */
  Vue.prototype.compulationMoney = function (numArr, currency, amount, price, str, officePrice) {
    // console.log(amount);
    let MoneySum = 0;
    if (numArr['CNY'] && currency && officePrice) {
      for (let i = 0; i < currency.length; i++) {
        MoneySum += Number(this.compulation(numArr[currency[i]].amount, officePrice[currency[i]] ? officePrice[currency[i]].price : 0, price, str));
        // console.log(MoneySum)
      }
    }
    if (str === 'CNY') {
      return (MoneySum).toFixed(2);
    } else {
      return (MoneySum).toFixed(8);
    }
  }

  Vue.prototype.ReturnZero = function (str) {
    if (str) {
      return str;
    } else {
      return 0;
    }
  }
  /**
   * 过滤HTML标签
   * @param str
   * @returns {*}
   */
  Vue.prototype.removeHTMLTag = function (str) {
    str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
    //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str = str.replace(/ /ig, '');//去掉
    return str;
  }
  /**
   * 输入框只能输入数字
   * @param str
   * @returns {*}
   */
  Vue.prototype.onlyNumber = function (str) {
    if (isNaN(str)) {
      return false;
    } else {
      return str;
    }
  }
};
