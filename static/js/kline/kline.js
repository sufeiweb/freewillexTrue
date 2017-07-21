function Kline() {
  if (this instanceof Kline) {
  } else {
    return new Kline();
  }
}
$(function () {
  _T.init();
  initLanguage();
});
var _T = {
  init: function () {
    _T.initSlimScroll('.scroller');
    _T.initLayout();
    var chartSetting = $.cookie('chartCookie');
    var periodA = _.isUndefined(chartSetting) ? '1m' : GLOBAL_VAR.periodMap[GLOBAL_VAR.tagMapPeriod[JSON.parse(chartSetting)['charts']['period']]];
    Common.vueInit(['price', 'auth', 'assets', 'depths', 'msg', 'entrust', 'transaction', {
      "ticker": [
        {"code": Config.code, "period": periodA},
        //{"code": Config.code, "period": "MIN1"},
        //{"code": Config.code, "period": "MIN5"},
        //{"code": Config.code, "period": "MIN15"},
        //{"code": Config.code, "period": "MIN30"},
        //{"code": Config.code, "period": "H1"},
        //{"code": Config.code, "period": "H4"},
        //{"code": Config.code, "period": "H6"},
        //{"code": Config.code, "period": "H12"},
        //{"code": Config.code, "period": "WEEK"}
      ]
    }], {
      "security": {},
      "currentList": [],
      "historyList": [],
      "tradeList": [],
      "lb": {
        "price": 0,
        "volume": 0,
        "finance": false,// 融资状态
        "amount": 0,// 交易额
        "financeAmount": 0,// 已用融额
        "error": ""
      },
      "ls": {
        "price": 0,
        "volume": 0,
        "finance": false,// 融资状态
        "amount": 0,// 交易额
        "financeVolume": 0,// 已用融量
        "error": ""
      },
      "mb": {
        "finance": false,// 融资状态
        "amount": 0,// 交易额
        "financeAmount": 0,// 已用融额
        "error": ""
      },
      "ms": {
        "finance": false,// 融资状态
        "amount": 0,// 交易额
        "financeVolume": 0,// 已用融量
        "error": ""
      }
    });
    _T.loginFormInit();
    var userCookie = $.cookie("remember");// 记住用户名
    if (!_.isEmpty(userCookie) || !_.isUndefined(userCookie)) {
      var userCookieTemp = JSON.parse(userCookie);
      $('#userName').val(userCookieTemp["userName"]);
      $("#remember").attr("checked", userCookieTemp["remember"]);
    }

    _T.msTab.init();// 初始化交易面板tab切换
    if (!_.isUndefined(Common.vueVm.user.loginUser)) {
      // 价格加
      $(".plus").click(function () {
        _T.plus($(this).closest("form"));
      });
      // 价格减
      $(".sub").click(function () {
        _T.sub($(this).closest("form"));
      });
      // 初始化配置参数
      _T.initSecurity();
      // 限价买
      _T.lb.init();
      // 限价卖
      _T.ls.init();
      // 市价买
      _T.mb.init();
      // 市价卖
      _T.ms.init();

      _T.ce.init();
      $(".order_hd ul>li:eq(0)").click(function () {
        //_T.ce.reload();
        _T.ce.init();
      });
      $(".order_hd ul>li:eq(1)").click(function () {
        //_.isUndefined(_T.timer) ? "" : clearInterval(_T.timer);// 禁止自动刷新
        _T.he.init();
      });
      $(".order_hd ul>li:eq(2)").click(function () {
        //_.isUndefined(_T.timer) ? "" : clearInterval(_T.timer);// 禁止自动刷新
        _T.ht.init();
      });
    }
  },
  initSlimScroll: function (el) {
    $(el).slimScroll({
      allowPageScroll: true, // allow page scroll when the element scroll is ended
      size: '7px',
      color: ($(el).attr("data-handle-color") ? $(el).attr("data-handle-color") : '#bbb'),
      railColor: ($(el).attr("data-rail-color") ? $(el).attr("data-rail-color") : '#eaeaea'),
      position: 'right',
      alwaysVisible: ($(el).attr("data-always-visible") == "1" ? true : false),
      railVisible: ($(el).attr("data-rail-visible") == "1" ? true : false),
      disableFadeOut: true,
      opacity: 1
    });

    $(this).attr("data-initialized", "1");
  },
  msTab: {
    init: function () {
      $("#view_info a[data-toggle='tab']").click(function () {
        $(".ms div[class='tab-pane']").siblings().removeClass("active");
        $("#view_info ul>li:eq(0)").siblings().removeClass("active");
        var val = $(this).attr("href").replace(new RegExp(/(#)/g), '');
        $("#" + val).addClass("active");
      });
    },
  },
  initLayout: function () {
    $(window).resize(resizeHeight);
    function resizeHeight() {
      $(".loading-box >img").height($(window).height());
      $(".market_deal").height($(window).height() - $("#view_info").height() - 30);
      var m_d_h = $(".market_deal").height();
      $("#deal_tbody").height(m_d_h - 35);
      if ($("#deal_tbody").parent().hasClass("slimScrollDiv")) {
        $("#deal_tbody").parent().height(m_d_h - 35);
      }
      $(".trade-body").height(m_d_h - 35);
      $(".order_col").height($("#order").height() - 22);
      $(".record-tbody").height($(".order_col").height() - 70);
      if ($(".record-tbody").parent().hasClass("slimScrollDiv")) {
        $(".record-tbody").parent().height($(".order_col").height() - 70);
      }
      var topHeight = $("#market_info .trade-body").height() / 2 - 13;
      $(".new_price").css("top", topHeight + "px");
      $("#depth_detail .market_infor .sell-body").css("bottom", topHeight + 33 + "px");
      $("#depth_detail .market_infor .buy-body").css("top", topHeight + 33 + "px");
      var sliceNumber = parseInt(($(".trade-body").height() - $(".new_price").height() - 10) / 2 / 21);
      var num = $("#depth_detail .market_infor .sell-body").children('div').length;
      $("#depth_detail .market_infor .sell-body > div").slice(0, num - sliceNumber).hide();
      $("#depth_detail .market_infor .sell-body > div").slice(num - sliceNumber, num).show();
      $("#depth_detail .market_infor .buy-body > div").slice(sliceNumber, num).hide();
      $("#depth_detail .market_infor .buy-body > div").slice(0, sliceNumber).show();
      try {
        if ($("#order").width() < 906) {
          $("#history_entrust .record-head,#history_entrust .record-body").addClass("history-entrust-table-width");
          var h_e = document.getElementById("history_entrust");
          h_e.style.overflowX = "scroll";
          h_e.style.overflowY = "hidden";
          $("#history_entrust .record-body .record-tbody").height($(".order_col").height() - 90);
        } else {
          $("#history_entrust .record-head,#history_entrust .record-body").removeClass("history-entrust-table-width");
          var h_e = document.getElementById("history_entrust");
          h_e.style.overflowX = "hidden";
          h_e.style.overflowY = "hidden";
          $("#history_entrust .record-body .record-tbody").height($(".order_col").height() - 70);
        }
      } catch (e) {
      }
      if ($(".chart_canvasGroup").height() < 240) {
        $(".fw_market_logo").addClass("hide");
      } else {
        $(".fw_market_logo").removeClass("hide");
      }
    }
    resizeHeight();
    $("#chart_zoom").click(function () {
      if ($(this).hasClass("zoom")) {
        $(this).removeClass("zoom");
        $("#market_detail").removeClass("hide");
        $("#order").removeClass("hide").css("height", "250px");
      } else {
        $(this).addClass("zoom");
        $("#market_detail").addClass("hide");
        $("#order").addClass("hide").css("height", "0px");
      }
      on_size();
    });
  },
  loginFormInit: function () {
    return $('form[name="loginForm"]').validate({
      errorElement: 'span',
      errorClass: 'error',
      onkeyup: false,
      focusCleanup: true,
      rules: {
        userName: {
          required: true
        },
        userPassword: {
          required: true,
          minlength: 6,
          maxlength: 32
        }
      },
      messages: {
        userName: {
          required: Common.i18n['IN_1']
        },
        userPassword: {
          required: Common.i18n['IN_5'],
          minlength: Common.i18n['IF_5'],
          maxlength: Common.i18n['IF_5']
        }
      },
      showErrors: function (errorMap, errorList) {
        _.isEmpty(errorList) ? "" : Common.showError(errorList[0]['message']);
        this.defaultShowErrors();
      },
      errorPlacement: function (error, element) {
      },
      submitHandler: function (form) {
        var params = $(form).serialize();
        params = Common.strToObj(params);
        params['userPassword'] = md5(params['userPassword']);
        $("form[name='loginForm'] button[type='submit']").button('loading');
        $.ajax({
          type: "POST",
          url: Config.api + $(form).attr("action"),
          data: params,
          success: function (result) {
            if (_.isUndefined(result.errorCode)) {
              window.location = '/quotation';
            } else {
              Common.showError(result.message);
            }
            $("form[name='loginForm'] button[type='submit']").button('reset')
          }
        });
        return false;
      }
    });
  },
  initSecurity: function () {
    $.get(Common.getUrl('/data/security/params/' + Config.code), function (data) {
      if (Tools.isResult(data)) {
        Common.vueVm.security = data;
        _T.lb.cp(Common.vueVm.price[2]);
        _T.ls.cp(Common.vueVm.price[2]);
      } else {
        Common.showError(data.message);
      }
    });
  },
  lb: {
    init: function () {
      _T.lb.fs.init();
      // 不可点击
      //_T.lb.fs.isActive();
      _T.lb.pBar.init();
      $("form[name='limitBuyForm'] button[type='submit']").click(function () {
        _T.lb.post(this);
      });
      $(_T.lb.price).keyup(function () {
        var len = $(this).caret();
        _T.lb.cp(Tools.positiveDecimal(this.value, '0.00'));
        $(this).caret(len);
      });
      $(_T.lb.volume).keyup(function () {
        var len = $(this).caret();
        _T.lb.cv(Tools.positiveDecimal(this.value, '0.0000'));
        $(this).caret(len);
      });
    },
    price: $("form[name='limitBuyForm'] input[name='price']"),
    volume: $("form[name='limitBuyForm'] input[name='volume']"),
    // 杠杆按钮
    fs: {
      o: $("form[name='limitBuyForm'] input[name='financing']"),
      // 可点击状态控制
      readonly: function () {
        _T.lb.fs.o.bootstrapSwitch('toggleReadonly');
      },
      // 初始化
      init: function () {
        _T.lb.fs.o.bootstrapSwitch('toggleReadonly').on('switchChange.bootstrapSwitch', function (event, state) {
          Common.vueVm.lb.finance = state;
          _T.lb.calc();
        });
      },
      // 获得状态开启/关闭
      state: function () {
        return _T.lb.fs.o.bootstrapSwitch('state');
      },
      // 按钮可点击状态
      rs: function () {
        return _T.lb.fs.o.bootstrapSwitch('readonly');
      },
      isActive: function () {
        if (_.isUndefined(Common.vueVm.assets['can_financing']) || (!_.isUndefined(Common.vueVm.assets['can_financing']) && Tools.le(Common.vueVm.assets['can_financing']['cny'], 0))) {
          _T.lb.fs.rs() ? "" : _T.lb.fs.readonly();// 变为不可点击
          Common.vueVm.lb.finance = _T.lb.fs.state();
          return;
        }
        if (_T.lb.fs.rs()) {
          _T.lb.fs.readonly();// 变为可点击
          Common.vueVm.lb.finance = _T.lb.fs.state();
        }
      }
    },
    // 交易额比例
    pBar: {
      rang: $("form[name='limitBuyForm'] input[name='percent']"),
      init: function () {
        _T.lb.pBar.rang.ionRangeSlider({ // 初始化比例框
          min: 0, max: 100, from: 0, step: 0.01, type: 'single', prefix: '', postfix: "%",
          keyboard: true, grid: true, grid_num: 4, hide_min_max: true,
          prettify_enabled: true,
          onFinish: function (data) {
            var percent = data['from'];// 比例条比例
            var price = $(_T.lb.price).val();
            var financing = Common.vueVm.lb.finance;// 融资融币状态
            var assetsCny = _.isUndefined(Common.vueVm.assets['available']) ? 0 : Common.vueVm.assets['available']['cny'];// 可用资产
            var assetsAmount = financing ? parseFloat(assetsCny + (_.isUndefined(Common.vueVm.assets['available']) ? 0 : Common.vueVm.assets['can_financing']['cny'])).toFixed(2) : assetsCny;// 开启融资融币金额变化
            var amountTemp = assetsAmount * percent / 100;
            var amount = amountTemp - parseInt(amountTemp * 100) / 100 > 0 ? Tools.toDecimal(amountTemp + 0.01, 2) : Tools.toDecimal(amountTemp, 2);// 交易额 = 可用资产*比例
            var minAmount = Common.vueVm.security['F_MIN_AMOUNT']['defValue'];
            var volume = Tools.toDecimal(price > 0 ? amount / price : 0, 4);
            //amount = volume * price - parseInt(volume * price * 100) / 100 > 0 ? Tools.toDecimal(volume * price + 0.01, 2) : Tools.toDecimal(volume * price, 2);
            amount = Tools.toDecimal(volume * price, 2);
            percent = Tools.toDecimal(assetsAmount > 0 ? amount / assetsAmount * 100 : 0, 2);
            _T.lb.pBar.slider.update({
              from: percent
            });
            $(_T.lb.volume).val(volume);
            Common.vueVm.lb.amount = amount;
            Common.vueVm.lb.financeAmount = financing ? (amount > assetsCny ? (Tools.lt(amount - assetsCny, minAmount) ? minAmount : amount - assetsCny) : 0) : 0;// 使用杠杆额度
            _T.lb.valid();
          }
        });
        _T.lb.pBar.slider = _T.lb.pBar.rang.data("ionRangeSlider");
      },
      // 定义变量做比例条的更新时用
      slider: undefined
    },
    // 更改价格
    cp: function (p) {
      $(_T.lb.price).val(p);
      _T.lb.calc();
    },
    cv: function (v) {
      $(_T.lb.volume).val(v);
      _T.lb.calc();
    },
    // 计算相关数值
    calc: function () {
      var price = $(_T.lb.price).val();
      var volume = $(_T.lb.volume).val();
      //var amount = volume * price - parseInt(volume * price * 100) / 100 > 0 ? Tools.toDecimal(volume * price + 0.01, 2) : Tools.toDecimal(volume * price, 2);
      var amount = Tools.toDecimal(volume * price, 2);
      var financing = Common.vueVm.lb.finance;// 融资融币状态
      var assetsCny = _.isUndefined(Common.vueVm.assets['available']) ? 0 : Common.vueVm.assets['available']['cny'];// 可用资产
      var assetsAmount = financing ? parseFloat(assetsCny + (_.isUndefined(Common.vueVm.assets['available']) ? 0 : Common.vueVm.assets['can_financing']['cny'])).toFixed(2) : assetsCny;// 开启融资融币金额变化
      var percent = Tools.toDecimal(assetsAmount > 0 ? amount / assetsAmount * 100 : 0, 2);
      _T.lb.pBar.slider.update({
        from: percent
      });
      Common.vueVm.lb.amount = amount;
      var minAmount = Common.vueVm.security['F_MIN_AMOUNT']['defValue'];
      Common.vueVm.lb.financeAmount = financing ? (amount > assetsCny ? (Tools.lt(amount - assetsCny, minAmount) ? minAmount : amount - assetsCny) : 0) : 0;// 开启融资融币金额变化
      _T.lb.valid();
    },
    valid: function () {
      _T.lb.fs.isActive();
      var financing = Common.vueVm.lb.finance;// 融资融币状态
      var assetsCny = _.isUndefined(Common.vueVm.assets['available']) ? 0 : Common.vueVm.assets['available']['cny'];// 可用资产
      var amount = Common.vueVm.lb.amount;
      var volume = $(_T.lb.volume).val();
      var price = $(_T.lb.price).val();
      var assetsAmount = financing ? parseFloat(assetsCny + (_.isUndefined(Common.vueVm.assets['available']) ? 0 : Common.vueVm.assets['can_financing']['cny'])).toFixed(2) : assetsCny;// 开启融资融币金额变化
      try {
        Common.vueVm.lb.error = "";
        var security = Common.vueVm.security;
        Tools.check(security, 'E_B_MIN_PRICE', Tools.toDecimal(Common.vueVm.price[2] > 0 ? price / Common.vueVm.price[2] : 0, 6), Common.strFormat(Common.i18n['min_p'], Tools.toCeil(security['E_B_MIN_PRICE']['defValue'] * Common.vueVm.price[2], 2)));
        Tools.check(security, 'E_B_MAX_PRICE', Tools.toDecimal(Common.vueVm.price[2] > 0 ? price / Common.vueVm.price[2] : 0, 6), Common.strFormat(Common.i18n['max_p'], Tools.toDecimal(security['E_B_MAX_PRICE']['defValue'] * Common.vueVm.price[2], 2)));
        Tools.check(security, 'E_B_MIN_VOL', volume, Common.strFormat(Common.i18n['min_v'], security['E_B_MIN_VOL']['defValue']));
        Tools.check(security, 'E_B_MAX_VOL', volume, Common.strFormat(Common.i18n['max_v'], security['E_B_MAX_VOL']['defValue']));
        Tools.LTE(amount, assetsAmount, Common.i18n['assets_legal_tip']);
      } catch (err) {
        Common.vueVm.lb.error = err.message;
      }
    },
    post: function (obj) {
      var volume = $(_T.lb.volume).val();
      var price = $(_T.lb.price).val();
      if (Tools.isEmpty(volume)) {
        Common.vueVm.lb.error = Common.i18n['IN_44'];
        return;
      }
      if (Tools.isEmpty(price)) {
        Common.vueVm.lb.error = Common.i18n['IN_45'];
        return;
      }
      if (Tools.isEmpty(Common.vueVm.lb.error)) {
        $(obj).button('loading');
        $.post(Common.getUrl('/entrust/limit/buy'), {
          "price": price,
          "volume": volume,
          "financing": Common.vueVm.lb.finance
        }, function (data) {
          if (Tools.isResult(data)) {
            //$(_T.lb.price).val(Common.vueVm.price[2]);
            $(_T.lb.volume).val();
            _T.lb.pBar.slider.update({from: 0});
            _T.ce.init();
            Common.showSuccess(Common.i18n["委托成功"]);
          } else {
            Common.showError(data.message);
          }
          $(obj).button('reset')
        });
      }
    }
  },
  ls: {
    init: function () {
      _T.ls.fs.init();
      _T.ls.pBar.init();
      $("form[name='limitSellForm'] button[type='submit']").click(function () {
        _T.ls.post(this);
      });
      $("form[name='limitSellForm'] input[name='price']").keyup(function () {
        var len = $(this).caret();
        _T.ls.cp(Tools.positiveDecimal(this.value, '0.00'));
        $(this).caret(len);
      });
      $("form[name='limitSellForm'] input[name='volume']").keyup(function () {
        var len = $(this).caret();
        _T.ls.cv(Tools.positiveDecimal(this.value, '0.0000'));
        $(this).caret(len);
      });
    },
    price: $("form[name='limitSellForm'] input[name='price']"),
    volume: $("form[name='limitSellForm'] input[name='volume']"),
    // 杠杆按钮
    fs: {
      o: $("form[name='limitSellForm'] input[name='financing']"),
      // 可点击状态控制
      readonly: function () {
        _T.ls.fs.o.bootstrapSwitch('toggleReadonly');
      },
      // 初始化
      init: function () {
        _T.ls.fs.o.bootstrapSwitch('toggleReadonly').on('switchChange.bootstrapSwitch', function (event, state) {
          Common.vueVm.ls.finance = state;
          _T.ls.calc();
        });
      },
      // 获得按钮状态
      state: function () {
        return _T.ls.fs.o.bootstrapSwitch('state');
      },
      // 按钮可点击状态
      rs: function () {
        return _T.ls.fs.o.bootstrapSwitch('readonly');
      },
      isActive: function () {
        if (_.isUndefined(Common.vueVm.assets['can_financing']) || (!_.isUndefined(Common.vueVm.assets['can_financing']) && Tools.le(Common.vueVm.assets['can_financing']['btc'], 0))) {
          _T.ls.fs.rs() ? "" : _T.ls.fs.readonly();// 变为不可点击
          Common.vueVm.ls.finance = _T.ls.fs.state();
          return;
        }
        if (_T.ls.fs.rs()) {
          _T.ls.fs.readonly();// 变为可点击
          Common.vueVm.ls.finance = _T.ls.fs.state();
        }
      }
    },
    // 交易额比例
    pBar: {
      rang: $("form[name='limitSellForm'] input[name='percent']"),
      init: function () {
        _T.ls.pBar.rang.ionRangeSlider({ // 比例条比例
          min: 0, max: 100, from: 0, step: 0.01, type: 'single', prefix: '', postfix: "%",
          keyboard: true, grid: true, grid_num: 4, hide_min_max: true,
          prettify_enabled: true,
          onFinish: function (data) {
            var percent = data['from'];// 比例条比例
            var financing = Common.vueVm.ls.finance;// 融资融币状态
            var price = $(_T.ls.price).val();
            var assetsBtc = _.isUndefined(Common.vueVm.assets['available']) ? 0 : Common.vueVm.assets['available']['btc'];// 可用btc
            var assetsVolume = financing ? parseFloat(assetsBtc + (_.isUndefined(Common.vueVm.assets['available']) ? 0 : Common.vueVm.assets['can_financing']['btc'])).toFixed(4) : assetsBtc;// 开启融资融币btc变化
            var volume = Tools.eq(percent, 100) ? assetsVolume : Tools.toDecimal(assetsVolume * percent / 100, 4);
            //var amount = volume * price - parseInt(volume * price * 100) / 100 > 0 ? Tools.toDecimal(volume * price + 0.01, 2) : Tools.toDecimal(volume * price, 2);// 交易额 = 可用资产*比例
            var amount = Tools.toDecimal(volume * price, 2);// 交易额 = 可用资产*比例
            var minVolume = Common.vueVm.security['F_MIN_NUMBER']['defValue'];
            $(_T.ls.volume).val(volume);
            Common.vueVm.ls.amount = amount;
            Common.vueVm.ls.financeVolume = financing ? (volume > assetsBtc ? (Tools.lt(volume - assetsBtc, minVolume) ? minVolume : volume - assetsBtc) : 0) : 0;// 使用杠杆额度
            _T.ls.valid();
          }
        });
        _T.ls.pBar.slider = _T.ls.pBar.rang.data("ionRangeSlider");
      },
      // 定义变量做比例条的更新时用
      slider: undefined
    },
    // 更改价格
    cp: function (p) {
      $(_T.ls.price).val(p);
      _T.ls.calc();
    },
    cv: function (p) {
      $(_T.ls.volume).val(p);
      _T.ls.calc();
    },
    // 计算相关数值
    calc: function () {
      var price = $(_T.ls.price).val();
      var volume = $(_T.ls.volume).val();
      var financing = Common.vueVm.ls.finance;// 融资融币状态
      var assetsBtc = _.isUndefined(Common.vueVm.assets['available']) ? 0 : Common.vueVm.assets['available']['btc'];// 可用btc
      var assetsVolume = financing ? parseFloat(assetsBtc + (_.isUndefined(Common.vueVm.assets['available']) ? 0 : Common.vueVm.assets['can_financing']['btc'])).toFixed(4) : assetsBtc;// 开启融资融币btc变化
      //var amount = volume * price - parseInt(volume * price * 100) / 100 > 0 ? Tools.toDecimal(volume * price + 0.01, 2) : Tools.toDecimal(volume * price, 2);
      var amount = Tools.toDecimal(volume * price, 2);
      var percent = Tools.toDecimal(assetsVolume > 0 ? volume / assetsVolume * 100 : 0, 2);
      _T.ls.pBar.slider.update({
        from: percent
      });
      Common.vueVm.ls.amount = amount;
      var minVolume = Common.vueVm.security['F_MIN_NUMBER']['defValue'];
      Common.vueVm.ls.financeVolume = financing ? (volume > assetsBtc ? (Tools.lt(volume - assetsBtc, minVolume) ? minVolume : volume - assetsBtc) : 0) : 0;// 使用杠杆额度
      _T.ls.valid();
    },
    valid: function () {
      _T.ls.fs.isActive();
      var financing = Common.vueVm.ls.finance;// 融资融币状态
      var assetsBtc = _.isUndefined(Common.vueVm.assets['available']) ? 0 : Common.vueVm.assets['available']['btc'];// 可用btc
      var volume = $(_T.ls.volume).val();
      var price = $(_T.ls.price).val();
      var assetsVolume = financing ? parseFloat(assetsBtc + Common.vueVm.assets['can_financing']['btc']).toFixed(4) : assetsBtc;// 开启融资融币金额变化
      try {
        Common.vueVm.ls.error = "";
        var security = Common.vueVm.security;
        Tools.check(security, 'E_S_MIN_PRICE', Tools.toDecimal(Common.vueVm.price[2] > 0 ? price / Common.vueVm.price[2] : 0, 6), Common.strFormat(Common.i18n['min_p'], Tools.toCeil(security['E_S_MIN_PRICE']['defValue'] * Common.vueVm.price[2], 2)));
        Tools.check(security, 'E_S_MAX_PRICE', Tools.toDecimal(Common.vueVm.price[2] > 0 ? price / Common.vueVm.price[2] : 0, 6), Common.strFormat(Common.i18n['max_p'], Tools.toDecimal(security['E_S_MAX_PRICE']['defValue'] * Common.vueVm.price[2], 2)));
        Tools.check(security, 'E_S_MIN_VOL', volume, Common.strFormat(Common.i18n['min_v'], security['E_S_MIN_VOL']['defValue']));
        Tools.check(security, 'E_S_MAX_VOL', volume, Common.strFormat(Common.i18n['max_v'], security['E_S_MAX_VOL']['defValue']));
        Tools.LTE(volume, assetsVolume, Common.i18n['assets_btc_tip']);
      } catch (err) {
        Common.vueVm.ls.error = err.message;
      }
    },
    post: function (obj) {
      var volume = $(_T.ls.volume).val();
      var price = $(_T.ls.price).val();
      if (Tools.isEmpty(volume)) {
        Common.vueVm.ls.error = Common.i18n['IN_44'];
        return;
      }
      if (Tools.isEmpty(price)) {
        Common.vueVm.ls.error = Common.i18n['IN_45'];
        return;
      }
      if (Tools.isEmpty(Common.vueVm.ls.error)) {
        $(obj).button('loading');
        $.post(Common.getUrl('/entrust/limit/sell'), {
          "price": price,
          "volume": volume,
          "financing": Common.vueVm.ls.finance
        }, function (data) {
          if (Tools.isResult(data)) {
            //$(_T.ls.price).val(Common.vueVm.price[2]);
            $(_T.ls.volume).val();
            _T.ls.pBar.slider.update({from: 0});
            _T.ce.init();
            Common.showSuccess(Common.i18n["委托成功"]);
          } else {
            Common.showError(data.message);
          }
          $(obj).button('reset')
        });
      }
    }
  },
  mb: {
    init: function () {
      _T.mb.fs.init();
      _T.mb.fs.isActive();
      _T.mb.pBar.init();
      $("form[name='marketBuyForm'] button[type='submit']").click(function () {
        _T.mb.post(this);
      });
      $(_T.mb.amount).keyup(function () {
        var len = $(this).caret();
        _T.mb.ca(Tools.positiveDecimal(this.value, '0.00'));
        $(this).caret(len);
      });
    },
    amount: $("form[name='marketBuyForm'] input[name='amount']"),
    // 杠杆按钮
    fs: {
      o: $("form[name='marketBuyForm'] input[name='financing']"),
      // 可点击状态控制
      readonly: function () {
        _T.mb.fs.o.bootstrapSwitch('toggleReadonly');
      },
      // 初始化
      init: function () {
        _T.mb.fs.o.bootstrapSwitch('toggleReadonly').on('switchChange.bootstrapSwitch', function (event, state) {
          Common.vueVm.mb.finance = state;
          _T.mb.calc();
        });
      },
      // 获得按钮状态
      state: function () {
        return _T.mb.fs.o.bootstrapSwitch('state');
      },
      // 按钮可点击状态
      rs: function () {
        return _T.mb.fs.o.bootstrapSwitch('readonly');
      },
      isActive: function () {
        if (_.isUndefined(Common.vueVm.assets['can_financing']) || (!_.isUndefined(Common.vueVm.assets['can_financing']) && Tools.le(Common.vueVm.assets['can_financing']['cny'], 0))) {
          _T.mb.fs.rs() ? "" : _T.mb.fs.readonly();// 变为不可点击
          Common.vueVm.mb.finance = _T.mb.fs.state();
          return;
        }
        if (_T.mb.fs.rs()) {
          _T.mb.fs.readonly();// 变为可点击
          Common.vueVm.mb.finance = _T.mb.fs.state();
        }
      }
    },
    // 交易额比例
    pBar: {
      rang: $("form[name='marketBuyForm'] input[name='percent']"),
      init: function () {
        _T.mb.pBar.rang.ionRangeSlider({ // 比例条比例
          min: 0, max: 100, from: 0, step: 0.01, type: 'single', prefix: '', postfix: "%",
          keyboard: true, grid: true, grid_num: 4, hide_min_max: true,
          prettify_enabled: true,
          onFinish: function (data) {
            var percent = data['from'];// 比例条比例
            var financing = Common.vueVm.mb.finance;// 融资融币状态
            var assetsCny = _.isUndefined(Common.vueVm.assets['available']) ? 0 : Common.vueVm.assets['available']['cny'];// 可用btc
            var assetsAmount = financing ? parseFloat(assetsCny + (_.isUndefined(Common.vueVm.assets['available']) ? 0 : Common.vueVm.assets['can_financing']['cny'])).toFixed(2) : assetsCny;// 开启融资融币金额变化
            var amount = percent == 100 ? Tools.toDecimal(assetsAmount, 2) : Tools.toCeil(assetsAmount * percent / 100, 2);// 交易额 = btc*价格
            var minAmount = Common.vueVm.security['F_MIN_AMOUNT']['defValue'];
            Common.vueVm.mb.financeAmount = financing ? (amount > assetsCny ? (Tools.lt(amount - assetsCny, minAmount) ? minAmount : amount - assetsCny) : 0) : 0;// 使用杠杆额度
            _T.mb.ca(amount);
          }
        });
        _T.mb.pBar.slider = _T.mb.pBar.rang.data("ionRangeSlider");
      },
      // 定义变量做比例条的更新时用
      slider: undefined
    },
    ca: function (a) {
      $(_T.mb.amount).val(a);
      _T.mb.calc();
    },
    // 计算相关数值
    calc: function () {
      var financing = Common.vueVm.mb.finance;// 融资融币状态
      var assetsCny = _.isUndefined(Common.vueVm.assets['available']) ? 0 : Common.vueVm.assets['available']['cny'];// 可用btc
      var assetsAmount = financing ? parseFloat(assetsCny + (_.isUndefined(Common.vueVm.assets['available']) ? 0 : Common.vueVm.assets['can_financing']['cny'])).toFixed(2) : assetsCny;// 开启融资融币金额变化
      var amount = $(_T.mb.amount).val();
      var percent = Tools.toDecimal(assetsAmount > 0 ? amount / assetsAmount * 100 : 0, 2);
      _T.mb.pBar.slider.update({
        from: percent
      });
      var minAmount = Common.vueVm.security['F_MIN_AMOUNT']['defValue'];
      Common.vueVm.mb.financeAmount = financing ? (amount > assetsCny ? (Tools.lt(amount - assetsCny, minAmount) ? minAmount : amount - assetsCny) : 0) : 0;// 使用杠杆额度
      _T.mb.valid();
    },
    valid: function () {
      _T.mb.fs.isActive();
      var financing = Common.vueVm.mb.finance;// 融资融币状态
      var assetsCny = _.isUndefined(Common.vueVm.assets['available']) ? 0 : Common.vueVm.assets['available']['cny'];// 可用金额
      var amount = $(_T.mb.amount).val();
      var assetsAmount = financing ? parseFloat(assetsCny + (_.isUndefined(Common.vueVm.assets['available']) ? 0 : Common.vueVm.assets['can_financing']['cny'])).toFixed(2) : assetsCny;// 开启融资融币金额变化
      try {
        Common.vueVm.mb.error = "";
        var security = Common.vueVm.security;
        var minAmount = security["E_S_MIN_VOL"]["defValue"] * Common.vueVm.price[2];
        Tools.LTE(minAmount, amount, Common.strFormat(Common.i18n['min_a'], minAmount.toFixed(2)));
        Tools.check(security, 'E_B_MIN_AMOUNT', amount, Common.strFormat(Common.i18n['min_a'], security['E_B_MIN_AMOUNT']['defValue']));
        Tools.check(security, 'E_B_MAX_AMOUNT', amount, Common.strFormat(Common.i18n['max_a'], security['E_B_MAX_AMOUNT']['defValue']));
        Tools.LTE(amount, assetsAmount, Common.i18n['assets_legal_tip']);
      } catch (err) {
        Common.vueVm.mb.error = err.message;
      }
    },
    post: function (obj) {
      var amount = $(_T.mb.amount).val();
      if (Tools.isEmpty(amount)) {
        Common.vueVm.mb.error = Common.i18n['IN_46'];
        return;
      }
      if (Tools.isEmpty(Common.vueVm.mb.error)) {
        $(obj).button('loading');
        $.post(Common.getUrl('/entrust/market/buy'), {
          "amount": amount,
          "financing": Common.vueVm.mb.finance
        }, function (data) {
          if (Tools.isResult(data)) {
            $(_T.mb.amount).val();
            _T.mb.pBar.slider.update({from: 0});
            _T.ce.init();
            Common.showSuccess(Common.i18n["委托成功"]);
          } else {
            Common.showError(data.message);
          }
          $(obj).button('reset')
        });
      }
    }
  },
  ms: {
    init: function () {
      _T.ms.fs.init();
      _T.ms.fs.isActive();
      _T.ms.pBar.init();
      $("form[name='marketSellForm'] button[type='submit']").click(function () {
        _T.ms.post(this);
      });
      $(_T.ms.volume).keyup(function () {
        var len = $(this).caret();
        _T.ms.cv(Tools.positiveDecimal(this.value, '0.0000'));
        $(this).caret(len);
      });
    },
    volume: $("form[name='marketSellForm'] input[name='volume']"),
    // 杠杆按钮
    fs: {
      o: $("form[name='marketSellForm'] input[name='financing']"),
      // 可点击状态控制
      readonly: function () {
        _T.ms.fs.o.bootstrapSwitch('toggleReadonly');
      },
      // 初始化
      init: function () {
        _T.ms.fs.o.bootstrapSwitch('toggleReadonly').on('switchChange.bootstrapSwitch', function (event, state) {
          Common.vueVm.ms.finance = state;
          _T.ms.calc();
        });
      },
      // 获得按钮状态
      state: function () {
        return _T.ms.fs.o.bootstrapSwitch('state');
      },
      // 按钮可点击状态
      rs: function () {
        return _T.ms.fs.o.bootstrapSwitch('readonly');
      },
      isActive: function () {
        if (_.isUndefined(Common.vueVm.assets['can_financing']) || (!_.isUndefined(Common.vueVm.assets['can_financing']) && Tools.le(Common.vueVm.assets['can_financing']['btc'], 0))) {
          _T.ms.fs.rs() ? "" : _T.ms.fs.readonly();// 变为不可点击
          Common.vueVm.ms.finance = _T.ms.fs.state();
          return;
        }
        if (_T.ms.fs.rs()) {
          _T.ms.fs.readonly();// 变为可点击
          Common.vueVm.ms.finance = _T.ms.fs.state();
        }
      }
    },
    // 交易额比例
    pBar: {
      rang: $("form[name='marketSellForm'] input[name='percent']"),
      init: function () {
        _T.ms.pBar.rang.ionRangeSlider({ // 比例条比例
          min: 0, max: 100, from: 0, step: 0.01, type: 'single', prefix: '', postfix: "%",
          keyboard: true, grid: true, grid_num: 4, hide_min_max: true,
          prettify_enabled: true,
          onFinish: function (data) {
            var percent = data['from'];// 比例条比例
            var financing = Common.vueVm.ms.finance;// 融资融币状态
            var assetsBtc = _.isUndefined(Common.vueVm.assets['available']) ? 0 : Common.vueVm.assets['available']['btc'];// 可用btc
            var assetsVolume = financing ? parseFloat(assetsBtc + (_.isUndefined(Common.vueVm.assets['available']) ? 0 : Common.vueVm.assets['can_financing']['btc'])).toFixed(4) : assetsBtc;// 开启融资融币btc变化
            var volume = Tools.eq(percent, 100) ? assetsVolume : Tools.toDecimal(assetsVolume * percent / 100, 4);// 交易额 = btc*价格
            var minVolume = Common.vueVm.security['F_MIN_NUMBER']['defValue'];
            Common.vueVm.ms.financeVolume = financing ? (volume > assetsBtc ? (Tools.lt(volume - assetsBtc, minVolume) ? minVolume : volume - assetsBtc) : 0) : 0;// 使用杠杆额度
            _T.ms.cv(volume);
          }
        });
        _T.ms.pBar.slider = _T.ms.pBar.rang.data("ionRangeSlider");
      },
      // 定义变量做比例条的更新时用
      slider: undefined
    },
    // 计算相关数值
    calc: function () {
      var financing = Common.vueVm.ms.finance;// 融资融币状态
      var assetsBtc = _.isUndefined(Common.vueVm.assets['available']) ? 0 : Common.vueVm.assets['available']['btc'];// 可用btc
      var assetsVolume = financing ? parseFloat(assetsBtc + (_.isUndefined(Common.vueVm.assets['available']) ? 0 : Common.vueVm.assets['can_financing']['btc'])).toFixed(4) : assetsBtc;// 开启融资融币btc变化
      var volume = $(_T.ms.volume).val();
      var percent = Tools.toDecimal(assetsVolume > 0 ? volume / assetsVolume * 100 : 0, 4);
      _T.ms.pBar.slider.update({
        from: percent
      });
      var minVolume = Common.vueVm.security['F_MIN_NUMBER']['defValue'];
      Common.vueVm.ms.financeVolume = financing ? (volume > assetsBtc ? (Tools.lt(volume - assetsBtc, minVolume) ? minVolume : volume - assetsBtc) : 0) : 0;// 使用杠杆额度
      _T.ms.valid();
    },
    cv: function (v) {
      $(_T.ms.volume).val(v);
      _T.ms.calc();
    },
    valid: function () {
      _T.ms.fs.isActive();
      var financing = Common.vueVm.ms.finance;// 融资融币状态
      var assetsBtc = _.isUndefined(Common.vueVm.assets['available']) ? 0 : Common.vueVm.assets['available']['btc'];// 可用btc
      var volume = $(_T.ms.volume).val();
      var assetsVolume = financing ? parseFloat(assetsBtc + (_.isUndefined(Common.vueVm.assets['available']) ? 0 : Common.vueVm.assets['can_financing']['btc'])).toFixed(4) : assetsBtc;// 开启融资融币btc变化
      try {
        Common.vueVm.ms.error = "";
        var security = Common.vueVm.security;
        Tools.check(security, 'E_B_MIN_VOL', volume, Common.strFormat(Common.i18n['min_v'], security['E_B_MIN_VOL']['defValue']));
        Tools.check(security, 'E_B_MAX_VOL', volume, Common.strFormat(Common.i18n['max_v'], security['E_B_MAX_VOL']['defValue']));
        Tools.LTE(volume, assetsVolume, Common.i18n['assets_btc_tip']);
      } catch (err) {
        Common.vueVm.ms.error = err.message;
      }
    },
    post: function (obj) {
      var volume = $(_T.ms.volume).val();
      if (Tools.isEmpty(volume)) {
        Common.vueVm.ms.error = Common.i18n['IN_47'];
        return;
      }
      if (Tools.isEmpty(Common.vueVm.ms.error)) {
        $(obj).button('loading');
        $.post(Common.getUrl('/entrust/market/sell'), {
          "volume": volume,
          "financing": Common.vueVm.ms.finance
        }, function (data) {
          if (Tools.isResult(data)) {
            $(_T.ms.volume).val();
            _T.ms.pBar.slider.update({from: 0});
            _T.ce.init();
            Common.showSuccess(Common.i18n["委托成功"]);
          } else {
            Common.showError(data.message);
          }
          $(obj).button('reset')
        });
      }
    }
  },
  // 价格步加
  plus: function (form) {
    var formName = $(form).attr("name");
    var price = $(form).find("#price").val();
    price = (parseFloat(price) + 0.01).toFixed(2);
    formName == "limitBuyForm" ? _T.lb.cp(price) : formName == "limitSellForm" ? _T.ls.cp(price) : "";
  },
  // 价格步减
  sub: function (form) {
    var formName = $(form).attr("name");
    var price = $(form).find("#price").val();
    price = parseFloat(price) <= 0 ? 0 : (parseFloat(price) - 0.01).toFixed(2);
    formName == "limitBuyForm" ? _T.lb.cp(price) : formName == "limitSellForm" ? _T.ls.cp(price) : "";
  },
  buy: function (p) {
    _.isNaN(parseFloat(p)) ? 0.00 : _T.lb.cp(p);
  },
  sell: function (p) {
    _.isNaN(parseFloat(p)) ? 0.00 : _T.ls.cp(p);
  },
  revokeAll: function () {
    $.get(Common.getUrl("/entrust/undo/all"), function (data) {
      if (Tools.isResult(data)) {
        Common.showSuccess(Common.i18n['撤销已提交']);
        _T.ce.init();
      } else {
        Common.showError(data.message);
      }
    });
  },
  revoke: function (id) {
    $.get(Common.getUrl("/entrust/undo/one?id=" + id), function (data) {
      if (Tools.isResult(data)) {
        Common.showSuccess(Common.i18n['撤销已提交']);
        Common.vueVm.currentList.splice(_.findIndex(Common.vueVm.currentList, {id: id}), 1);//页面不会刷新，直接删除记录
      } else {
        Common.showError(data.message);
      }
    });
  },
  timer: undefined,
  // 当前委托
  ce: {
    flag: true,// 是否加载
    page: 0,// 当前页数
    pages: 1,// 总页数
    list: function () {
      $(".cNo").addClass('hide');
      $(".cRecord").addClass('hide');
      $.post(Common.getUrl("/entrust/list/current"), {
        page: _T.ce.page,
        size: 15
      }, function (data) {
        _T.ce.flag = true;
        if (Tools.isResult(data) && data.content.length > 0) {
          _.each(data.content, function (val) {
            Common.vueVm.currentList.push(val);
          });
          _T.ce.pages = data.totalPages;
          _T.ce.page < _T.ce.pages - 1 ? "" : $('.cLoad').addClass("hide");
          $(".cRecord").removeClass('hide');
          $(".revoke-all").removeClass('hide');// 显示撤销
        } else {
          _.isUndefined(data.message) ? "" : Common.showError(data.message);
          $(".cNo").removeClass('hide');// 无记录
          $('.cLoad').addClass("hide");
          $(".revoke-all").addClass('hide');// 隐藏撤销
        }
      });
    },
    refresh: function () {
      if (_T.ce.page < _T.ce.pages) {
        _T.ce.page += 1;
        _T.ce.list();
      }
    },
    init: function () {
      if (_T.ce.flag) {
        _T.ce.flag = false;
        Common.vueVm.currentList = [];
        _T.ce.page = 0;
        _T.ce.pages = 1;
        _T.ce.list();
      }
    },
    reload: function () {
      $(".revoke-all").removeClass('hide');// 隐藏撤销
      //_.isUndefined(_T.timer) ? "" : clearInterval(_T.timer);
      Common.vueVm.currentList = [];
      _T.ce.list();
      //_T.timer = setInterval(function () {
      //    _T.ce.reload();
      //}, 5 * 1000);
    }
  },
  // 历史委托
  he: {
    page: 0,// 当前页数
    pages: 1,// 总页数
    list: function () {
      $(".hNo").addClass('hide');
      $(".hRecord").addClass('hide');
      $.post(Common.getUrl("/entrust/list/history"), {
        page: _T.he.page,
        size: 15
      }, function (data) {
        if (Tools.isResult(data) && data.content.length > 0) {
          _.each(data.content, function (val) {
            Common.vueVm.historyList.push(val);
          });
          _T.he.pages = data.totalPages;
          $(".hRecord").removeClass('hide');
          _T.he.page < _T.he.pages - 1 ? "" : $('.hLoad').addClass("hide");
        } else {
          _.isUndefined(data.message) ? "" : Common.showError(data.message);
          $(".hNo").removeClass('hide');// 无记录
          $('.hLoad').addClass("hide");
        }
      });
    },
    refresh: function () {
      if (_T.he.page < _T.he.pages) {
        _T.he.page += 1;
        _T.he.list();
      }
    },
    init: function () {
      $(".revoke-all").addClass('hide');// 隐藏撤销
      Common.vueVm.historyList = [];
      _T.he.page = 0;
      _T.he.pages = 1;
      _T.he.list();
    }
  },
  // 历史交易
  ht: {
    page: 0,// 当前页数
    pages: 1,// 总页数
    list: function () {
      $(".tNo").addClass('hide');
      $(".tRecord").addClass('hide');
      $.post(Common.getUrl("/entrust/transaction"), {
        page: _T.ht.page,
        size: 15
      }, function (data) {
        if (Tools.isResult(data) && data.content.length > 0) {
          _.each(data.content, function (val) {
            Common.vueVm.tradeList.push(val);
          });
          _T.ht.pages = data.totalPages;
          $(".tRecord").removeClass('hide');
          _T.ht.page < _T.ht.pages - 1 ? "" : $('.tLoad').addClass("hide");
        } else {
          _.isUndefined(data.message) ? "" : Common.showError(data.message);
          $(".tNo").removeClass('hide');// 无记录
          $('.tLoad').addClass("hide");
        }
      });
    },
    refresh: function () {
      if (_T.ht.page < _T.ht.pages) {
        _T.ht.page += 1;
        _T.ht.list();
      }
    },
    init: function () {
      $(".revoke-all").addClass('hide');// 隐藏撤销
      Common.vueVm.tradeList = [];
      _T.ht.page = 0;
      _T.ht.pages = 1;
      _T.ht.list();
    }
  }
};
