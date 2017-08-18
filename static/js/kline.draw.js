var stompClient = null;
var testData={
  code:200,
  data:[]
};
// connect();
function connect() {
  var socket = new SockJS('http://192.168.1.48:8089/fwex/endpointSang');
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function(frame) {
    // 行情/
    // stompClient.subscribe('/market/BTCCNY/kline/min15', function(response) {
    //   // testData=JSON.parse(response.body);
    //  var data=JSON.parse(response.body).data;
    //   for(let i=0;i<data.length;i++){
    //     testData.data.push([data[i].time,data[i].open,data[i].high,data[i].low,data[i].close,data[i].vol,data[i].amount])
    //   }
    // });
  });
}
console.log(testData);

$.ajax({
  url:'http://192.168.1.48:8089/fwex/web/quotation/kline/BTCCNY/MIN1',
  method:'GET',
  headers:{
    'X-Requested-With':'XMLHttpRequest'
  },
  success:function (res) {
    var data=res.data;
    for(let i=0;i<data.length;i++){
      testData.data.push([data[i].time,data[i].open,data[i].high,data[i].low,data[i].close,data[i].vol,data[i].amount])
    }
  }
})
















var GLOBAL_VAR = {
  KLineAllData: new Object,
  KLineData: new Object,
  time_type: "line",
  market_from: 'cnybtc',
  market_from_name: "freeWillex",
  limit: "1000", // 显示的记录数目
  requestParam: "",
  chartMgr: null,
  G_HTTP_REQUEST: null,
  TimeOutId: null,
  button_down: false,
  init: true,
  url: "https://www.freewillex.cn/api/market/kLine" // 获取所有数据的地址(ajax)
};
var Config = {
  currency: 'CNY',
  'kline': {
    dark: {
      'Positive': '#b33120',
      'Negative': '#19b34c'
    },
    light: {
      'Positive': '#db5542',
      'Negative': '#53b37b'
    }
  },
};
/**
 * 周期图
 */
GLOBAL_VAR.periodMap = {
  "01w": "WEEK",
  "03d": "DAY3",
  "01d": "DAY",
  "12h": "H12",
  "06h": "H6",
  "04h": "H4",
  "02h": "H2",
  "01h": "H1",
  "30m": "MIN30",
  "15m": "MIN15",
  "05m": "MIN5",
  "03m": "MIN3",
  "01m": "MIN1"
};
/**
 * 标签对应的周期
 */
GLOBAL_VAR.tagMapPeriod = {
  "1w": "01w",
  "3d": "03d",
  "1d": "01d",
  "12h": "12h",
  "6h": "06h",
  "4h": "04h",
  "2h": "02h",
  "1h": "01h",
  "30m": "30m",
  "15m": "15m",
  "5m": "05m",
  "3m": "03m",
  "1m": "01m"
};
var classId = 0;

function create_class() {
  var argc = arguments.length;
  var func = function () {
  };
  var superClass;
  if (argc) {
    superClass = arguments[0];
    for (var k in superClass.prototype)
      func.prototype[k] = superClass.prototype[k];
  }
  for (var i = 1; i < argc; i++) {
    var feature = arguments[i];
    var f = feature.prototype.__construct;
    if (f) {
      if (!func.prototype.__featureConstructors)
        func.prototype.__featureConstructors = [];
      func.prototype.__featureConstructors.push(f);
      delete feature.prototype.__construct;
    }
    for (var k in feature.prototype)
      func.prototype[k] = feature.prototype[k];
    if (f)
      feature.prototype.__construct = f;
  }
  var newClass = function () {
    if (this.__construct)
      this.__construct.apply(this, arguments);
    if (this.__featureConstructors) {
      var a = this.__featureConstructors;
      var i, c = a.length;
      for (i = 0; i < c; i++)
        a[i].apply(this, arguments);
    }
  };
  func.prototype.__classId = classId++;
  if (superClass != undefined) {
    newClass.__super = superClass.prototype;
    func.prototype.__super = superClass;
  }
  newClass.prototype = new func();
  return newClass;
}
/**
 * 判断对象是否是一个类的实例
 * @param obj
 * @param clazz
 * @returns {boolean}
 */
function is_instance(obj, clazz) {
  var classId = clazz.prototype.__classId;
  if (obj.__classId == classId) {
    return true;
  }
  var __super = obj.__super;
  while (__super != undefined) {
    if (__super.prototype.__classId == classId) {
      return true;
    }
    __super = __super.prototype.__super;
  }
  return false;
}
/**
 * Class: MEvent. 事件
 */
var MEvent = create_class();
MEvent.prototype.__construct = function () {
  this._handlers = [];
};
/**
 * 添加处理函数
 * @param o
 * @param f
 */
MEvent.prototype.addHandler = function (arg1, arg2) {
  if (this._indexOf(arg1, arg2) < 0) {
    this._handlers.push({
      obj: arg1,
      func: arg2
    });
  }
};
/**
 * 删除处理函数
 * @param o
 * @param f
 */
MEvent.prototype.removeHandler = function (arg1, arg2) {
  var i = this._indexOf(arg1, arg2);
  if (i >= 0) {
    this._handlers.splice(i, 1);
  }
};
MEvent.prototype.raise = function (s, g) {
  var a = this._handlers;
  var e, i, c = a.length;
  for (i = 0; i < c; i++) {
    e = a[i];
    e.func.call(e.obj, s, g);
  }
};
MEvent.prototype._indexOf = function (o, f) {
  var a = this._handlers;
  var e, i, c = a.length;
  for (i = 0; i < c; i++) {
    e = a[i];
    if (o == e.obj && f == e.func)
      return i;
  }
  return -1;
};
/**
 * 行情图数值格式化
 * @param val
 * @param fractionDigits
 * @returns {*|string}
 */
String.fromFloat = function (val, fractionDigits) {
  var text = val.toFixed(fractionDigits);
  return text;
  //for (var i = text.length - 1; i >= 0; i--) {
  //    if (text[i] == '.') {
  //        return text.substring(0, i);
  //    }
  //    if (text[i] != '0') {
  //        return text.substring(0, i + 1);
  //    }
  //}
};
var ExprEnv = create_class();
ExprEnv.get = function () {
  return ExprEnv.inst;
};
ExprEnv.set = function (env) {
  ExprEnv.inst = env;
};
ExprEnv.prototype.getDataSource = function () {
  return this._ds;
};
ExprEnv.prototype.setDataSource = function (ds) {
  return this._ds = ds;
};
ExprEnv.prototype.getFirstIndex = function () {
  return this._firstIndex;
};
ExprEnv.prototype.setFirstIndex = function (n) {
  return this._firstIndex = n;
};
var Expr = create_class();
Expr.prototype.__construct = function () {
  this._rid = 0;
};
Expr.prototype.execute = function (index) {
};
Expr.prototype.reserve = function (rid, count) {
};
Expr.prototype.clear = function () {
};
var OpenExpr = create_class(Expr);
var HighExpr = create_class(Expr);
var LowExpr = create_class(Expr);
var CloseExpr = create_class(Expr);
var VolumeExpr = create_class(Expr);
/**
 * 开盘表达式
 * @param index
 * @returns {*}
 */
OpenExpr.prototype.execute = function (index) {
  return ExprEnv.get()._ds.getDataAt(index).open;
};
/**
 * 最高价表达式
 * @param index
 * @returns {*}
 */
HighExpr.prototype.execute = function (index) {
  return ExprEnv.get()._ds.getDataAt(index).high;
};
/**
 * 最低价表达式
 * @param index
 * @returns {*}
 */
LowExpr.prototype.execute = function (index) {
  return ExprEnv.get()._ds.getDataAt(index).low;
};
/**
 * 收盘表达式
 * @param index
 * @returns {*}
 */
CloseExpr.prototype.execute = function (index) {
  return ExprEnv.get()._ds.getDataAt(index).close;
};
/**
 * 交易量表达式
 * @param index
 * @returns {*}
 */
VolumeExpr.prototype.execute = function (index) {
  return ExprEnv.get()._ds.getDataAt(index).volume;
};
var ConstExpr = create_class(Expr);
ConstExpr.prototype.__construct = function (v) {
  ConstExpr.__super.__construct.call(this);
  this._value = v;
};
ConstExpr.prototype.execute = function (index) {
  return this._value;
};
var ParameterExpr = create_class(Expr);
ParameterExpr.prototype.__construct = function (name, minValue, maxValue, defaultValue) {
  ParameterExpr.__super.__construct.call(this);
  this._name = name;
  this._minValue = minValue;
  this._maxValue = maxValue;
  this._value = this._defaultValue = defaultValue;
};
ParameterExpr.prototype.execute = function (index) {
  return this._value;
};
ParameterExpr.prototype.getMinValue = function () {
  return this._minValue;
};
ParameterExpr.prototype.getMaxValue = function () {
  return this._maxValue;
};
ParameterExpr.prototype.getDefaultValue = function () {
  return this._defaultValue;
};
ParameterExpr.prototype.getValue = function () {
  return this._value;
};
ParameterExpr.prototype.setValue = function (val) {
  if (val == 0) {
    this._value = 0;
  } else if (val < this._minValue) {
    this._value = this._minValue;
  } else if (val > this._maxValue) {
    this._value = this._maxValue;
  } else {
    this._value = val;
  }
};
var OpAExpr = create_class(Expr);
var OpABExpr = create_class(Expr);
var OpABCExpr = create_class(Expr);
var OpABCDExpr = create_class(Expr);
OpAExpr.prototype.__construct = function (a) {
  OpAExpr.__super.__construct.call(this);
  this._exprA = a;
};
OpAExpr.prototype.reserve = function (rid, count) {
  if (this._rid < rid) {
    this._rid = rid;
    this._exprA.reserve(rid, count);
  }
};
OpAExpr.prototype.clear = function () {
  this._exprA.clear();
};
OpABExpr.prototype.__construct = function (a, b) {
  OpABExpr.__super.__construct.call(this);
  this._exprA = a;
  this._exprB = b;
};
OpABExpr.prototype.reserve = function (rid, count) {
  if (this._rid < rid) {
    this._rid = rid;
    this._exprA.reserve(rid, count);
    this._exprB.reserve(rid, count);
  }
};
OpABExpr.prototype.clear = function () {
  this._exprA.clear();
  this._exprB.clear();
};
OpABCExpr.prototype.__construct = function (a, b, c) {
  OpABCExpr.__super.__construct.call(this);
  this._exprA = a;
  this._exprB = b;
  this._exprC = c;
};
OpABCExpr.prototype.reserve = function (rid, count) {
  if (this._rid < rid) {
    this._rid = rid;
    this._exprA.reserve(rid, count);
    this._exprB.reserve(rid, count);
    this._exprC.reserve(rid, count);
  }
};
OpABCExpr.prototype.clear = function () {
  this._exprA.clear();
  this._exprB.clear();
  this._exprC.clear();
};
OpABCDExpr.prototype.__construct = function (a, b, c, d) {
  OpABCDExpr.__super.__construct.call(this);
  this._exprA = a;
  this._exprB = b;
  this._exprC = c;
  this._exprD = d;
};
OpABCDExpr.prototype.reserve = function (rid, count) {
  if (this._rid < rid) {
    this._rid = rid;
    this._exprA.reserve(rid, count);
    this._exprB.reserve(rid, count);
    this._exprC.reserve(rid, count);
    this._exprD.reserve(rid, count);
  }
};
OpABCDExpr.prototype.clear = function () {
  this._exprA.clear();
  this._exprB.clear();
  this._exprC.clear();
  this._exprD.clear();
};
var NegExpr = create_class(OpAExpr);
NegExpr.prototype.__construct = function (a) {
  NegExpr.__super.__construct.call(this, a);
};
NegExpr.prototype.execute = function (index) {
  return -(this._exprA.execute(index));
};
var AddExpr = create_class(OpABExpr);
var SubExpr = create_class(OpABExpr);
var MulExpr = create_class(OpABExpr);
var DivExpr = create_class(OpABExpr);
AddExpr.prototype.__construct = function (a, b) {
  AddExpr.__super.__construct.call(this, a, b);
};
SubExpr.prototype.__construct = function (a, b) {
  SubExpr.__super.__construct.call(this, a, b);
};
MulExpr.prototype.__construct = function (a, b) {
  MulExpr.__super.__construct.call(this, a, b);
};
DivExpr.prototype.__construct = function (a, b) {
  DivExpr.__super.__construct.call(this, a, b);
};
AddExpr.prototype.execute = function (index) {
  return this._exprA.execute(index) + this._exprB.execute(index);
};
SubExpr.prototype.execute = function (index) {
  return this._exprA.execute(index) - this._exprB.execute(index);
};
MulExpr.prototype.execute = function (index) {
  return this._exprA.execute(index) * this._exprB.execute(index);
};
DivExpr.prototype.execute = function (index) {
  var a = this._exprA.execute(index);
  var b = this._exprB.execute(index);
  if (a == 0) {
    return a;
  }
  if (b == 0) {
    return (a > 0) ? 1000000 : -1000000;
  }
  return a / b;
};
var GtExpr = create_class(OpABExpr);
var GeExpr = create_class(OpABExpr);
var LtExpr = create_class(OpABExpr);
var LeExpr = create_class(OpABExpr);
var EqExpr = create_class(OpABExpr);
GtExpr.prototype.__construct = function (a, b) {
  GtExpr.__super.__construct.call(this, a, b);
};
GeExpr.prototype.__construct = function (a, b) {
  GeExpr.__super.__construct.call(this, a, b);
};
LtExpr.prototype.__construct = function (a, b) {
  LtExpr.__super.__construct.call(this, a, b);
};
LeExpr.prototype.__construct = function (a, b) {
  LeExpr.__super.__construct.call(this, a, b);
};
EqExpr.prototype.__construct = function (a, b) {
  EqExpr.__super.__construct.call(this, a, b);
};
GtExpr.prototype.execute = function (index) {
  return this._exprA.execute(index) > this._exprB.execute(index) ? 1 : 0;
};
GeExpr.prototype.execute = function (index) {
  return this._exprA.execute(index) >= this._exprB.execute(index) ? 1 : 0;
};
LtExpr.prototype.execute = function (index) {
  return this._exprA.execute(index) < this._exprB.execute(index) ? 1 : 0;
};
LeExpr.prototype.execute = function (index) {
  return this._exprA.execute(index) <= this._exprB.execute(index) ? 1 : 0;
};
EqExpr.prototype.execute = function (index) {
  return this._exprA.execute(index) == this._exprB.execute(index) ? 1 : 0;
};
var MaxExpr = create_class(OpABExpr);
MaxExpr.prototype.__construct = function (a, b) {
  MaxExpr.__super.__construct.call(this, a, b);
};
MaxExpr.prototype.execute = function (index) {
  return Math.max(this._exprA.execute(index), this._exprB.execute(index));
};
var AbsExpr = create_class(OpAExpr);
AbsExpr.prototype.__construct = function (a) {
  AbsExpr.__super.__construct.call(this, a);
};
AbsExpr.prototype.execute = function (index) {
  return Math.abs(this._exprA.execute(index));
};
var RefExpr = create_class(OpABExpr);
RefExpr.prototype.__construct = function (a, b) {
  RefExpr.__super.__construct.call(this, a, b);
  this._offset = -1;
};
RefExpr.prototype.execute = function (index) {
  if (this._offset < 0) {
    this._offset = this._exprB.execute(index);
    if (this._offset < 0) {
      throw "offset < 0";
    }
  }
  index -= this._offset;
  if (index < 0) {
    throw "index < 0";
  }
  var result = this._exprA.execute(index);
  if (isNaN(result)) {
    throw "NaN";
  }
  return result;
};
var AndExpr = create_class(OpABExpr);
var OrExpr = create_class(OpABExpr);
AndExpr.prototype.__construct = function (a, b) {
  AndExpr.__super.__construct.call(this, a, b);
};
OrExpr.prototype.__construct = function (a, b) {
  OrExpr.__super.__construct.call(this, a, b);
};
AndExpr.prototype.execute = function (index) {
  return (this._exprA.execute(index) != 0) && (this._exprB.execute(index) != 0) ? 1 : 0;
};
OrExpr.prototype.execute = function (index) {
  return (this._exprA.execute(index) != 0) || (this._exprB.execute(index) != 0) ? 1 : 0;
};
var IfExpr = create_class(OpABCExpr);
IfExpr.prototype.__construct = function (a, b, c) {
  IfExpr.__super.__construct.call(this, a, b, c);
};
IfExpr.prototype.execute = function (index) {
  return this._exprA.execute(index) != 0 ? this._exprB.execute(index) : this._exprC.execute(index);
};
var AssignExpr = create_class(OpAExpr);
AssignExpr.prototype.__construct = function (name, a) {
  AssignExpr.__super.__construct.call(this, a);
  this._name = name;
  this._buf = [];
};
AssignExpr.prototype.getName = function () {
  return this._name;
};
AssignExpr.prototype.execute = function (index) {
  return this._buf[index];
};
AssignExpr.prototype.assign = function (index) {
  this._buf[index] = this._exprA.execute(index);
  if (ExprEnv.get()._firstIndex >= 0)
    if (isNaN(this._buf[index]) && !isNaN(this._buf[index - 1]))
      throw this._name + ".assign(" + index + "): NaN";
};
AssignExpr.prototype.reserve = function (rid, count) {
  if (this._rid < rid) {
    for (var c = count; c > 0; c--)
      this._buf.push(NaN);
  }
  AssignExpr.__super.reserve.call(this, rid, count);
};
AssignExpr.prototype.clear = function () {
  AssignExpr.__super.clear.call(this);
  this._buf = [];
};
var OutputStyle = {
  None: 0, Line: 1, VolumeStick: 2, MACDStick: 3, SARPoint: 4
};
var OutputExpr = create_class(AssignExpr);
OutputExpr.prototype.__construct = function (name, a, style, color) {
  OutputExpr.__super.__construct.call(this, name, a);
  this._style = (style === undefined) ? OutputStyle.Line : style;
  this._color = color;
};
OutputExpr.prototype.getStyle = function () {
  return this._style;
};
OutputExpr.prototype.getColor = function () {
  return this._color;
};
var RangeOutputExpr = create_class(OutputExpr);
RangeOutputExpr.prototype.__construct = function (name, a, style, color) {
  RangeOutputExpr.__super.__construct.call(this, name, a, style, color);
};
RangeOutputExpr.prototype.getName = function () {
  return this._name + this._exprA.getRange();
};
var RangeExpr = create_class(OpABExpr);
RangeExpr.prototype.__construct = function (a, b) {
  RangeExpr.__super.__construct.call(this, a, b);
  this._range = -1;
  this._buf = [];
};
RangeExpr.prototype.getRange = function () {
  return this._range;
};
RangeExpr.prototype.initRange = function () {
  this._range = this._exprB.execute(0);
};
RangeExpr.prototype.execute = function (index) {
  if (this._range < 0) {
    this.initRange();
  }
  var rA = this._buf[index].resultA = this._exprA.execute(index);
  var r = this._buf[index].result = this.calcResult(index, rA);
  return r;
};
RangeExpr.prototype.reserve = function (rid, count) {
  if (this._rid < rid) {
    for (var c = count; c > 0; c--) {
      this._buf.push({resultA: NaN, result: NaN});
    }
  }
  RangeExpr.__super.reserve.call(this, rid, count);
};
RangeExpr.prototype.clear = function () {
  RangeExpr.__super.clear.call(this);
  this._range = -1;
  this._buf = [];
};
var HhvExpr = create_class(RangeExpr);
var LlvExpr = create_class(RangeExpr);
HhvExpr.prototype.__construct = function (a, b) {
  HhvExpr.__super.__construct.call(this, a, b);
};
LlvExpr.prototype.__construct = function (a, b) {
  LlvExpr.__super.__construct.call(this, a, b);
};
HhvExpr.prototype.calcResult = function (index, resultA) {
  if (this._range == 0) {
    return NaN;
  }
  var first = ExprEnv.get()._firstIndex;
  if (first < 0) {
    return resultA;
  }
  if (index > first) {
    var n = this._range;
    var result = resultA;
    var start = index - n + 1;
    var i = Math.max(first, start);
    for (; i < index; i++) {
      var p = this._buf[i];
      if (result < p.resultA) {
        result = p.resultA;
      }
    }
    return result;
  } else {
    return resultA;
  }
};
LlvExpr.prototype.calcResult = function (index, resultA) {
  if (this._range == 0) {
    return NaN;
  }
  var first = ExprEnv.get()._firstIndex;
  if (first < 0) {
    return resultA;
  }
  if (index > first) {
    var n = this._range;
    var result = resultA;
    var start = index - n + 1;
    var i = Math.max(first, start);
    for (; i < index; i++) {
      var p = this._buf[i];
      if (result > p.resultA) {
        result = p.resultA;
      }
    }
    return result;
  } else {
    return resultA;
  }
};
var CountExpr = create_class(RangeExpr);
CountExpr.prototype.__construct = function (a, b) {
  CountExpr.__super.__construct.call(this, a, b);
};
CountExpr.prototype.calcResult = function (index, resultA) {
  if (this._range == 0) {
    return NaN;
  }
  var first = ExprEnv.get()._firstIndex;
  if (first < 0) {
    return 0;
  }
  if (index >= first) {
    var n = this._range - 1;
    if (n > index - first) {
      n = index - first;
    }
    var count = 0;
    for (; n >= 0; n--) {
      if (this._buf[index - n].resultA != 0.0) {
        count++;
      }
    }
    return count;
  } else {
    return 0;
  }
};
var SumExpr = create_class(RangeExpr);
SumExpr.prototype.__construct = function (a, b) {
  SumExpr.__super.__construct.call(this, a, b);
};
SumExpr.prototype.calcResult = function (index, resultA) {
  var first = ExprEnv.get()._firstIndex;
  if (first < 0) {
    return resultA;
  }
  if (index > first) {
    var n = this._range;
    if (n == 0 || n >= index + 1 - first) {
      return this._buf[index - 1].result + resultA;
    }
    return this._buf[index - 1].result + resultA - this._buf[index - n].resultA;
  } else {
    return resultA;
  }
};
var StdExpr = create_class(RangeExpr);
StdExpr.prototype.__construct = function (a, b) {
  StdExpr.__super.__construct.call(this, a, b);
};
StdExpr.prototype.calcResult = function (index, resultA) {
  if (this._range == 0) {
    return NaN;
  }
  var stdData = this._stdBuf[index];
  var first = ExprEnv.get()._firstIndex;
  if (first < 0) {
    stdData.resultMA = resultA;
    return 0.0;
  }
  if (index > first) {
    var n = this._range;
    if (n >= index + 1 - first) {
      n = index + 1 - first;
      stdData.resultMA = this._stdBuf[index - 1].resultMA * (1.0 - 1.0 / n) + (resultA / n);
    } else {
      stdData.resultMA = this._stdBuf[index - 1].resultMA + (resultA - this._buf[index - n].resultA) / n;
    }
    var sum = 0;
    for (var i = index - n + 1; i <= index; i++) {
      sum += Math.pow(this._buf[i].resultA - stdData.resultMA, 2);
    }
    return Math.sqrt(sum / n);
  }
  stdData.resultMA = resultA;
  return 0.0;
};
StdExpr.prototype.reserve = function (rid, count) {
  if (this._rid < rid) {
    for (var c = count; c > 0; c--) {
      this._stdBuf.push({resultMA: NaN});
    }
  }
  StdExpr.__super.reserve.call(this, rid, count);
};
StdExpr.prototype.clear = function () {
  StdExpr.__super.clear.call(this);
  this._stdBuf = [];
};
var MaExpr = create_class(RangeExpr);
MaExpr.prototype.__construct = function (a, b) {
  MaExpr.__super.__construct.call(this, a, b);
};
MaExpr.prototype.calcResult = function (index, resultA) {
  if (this._range == 0) {
    return NaN;
  }
  var first = ExprEnv.get()._firstIndex;
  if (first < 0) {
    return resultA;
  }
  if (index > first) {
    var n = this._range;
    if (n >= index + 1 - first) {
      n = index + 1 - first;
      return this._buf[index - 1].result * (1.0 - 1.0 / n) + (resultA / n);
    }
    return this._buf[index - 1].result + (resultA - this._buf[index - n].resultA) / n;
  } else {
    return resultA;
  }
};
var EmaExpr = create_class(RangeExpr);
EmaExpr.prototype.__construct = function (a, b) {
  EmaExpr.__super.__construct.call(this, a, b);
};
EmaExpr.prototype.initRange = function () {
  EmaExpr.__super.initRange.call(this);
  this._alpha = 2.0 / (this._range + 1);
};
EmaExpr.prototype.calcResult = function (index, resultA) {
  if (this._range == 0) {
    return NaN;
  }
  var first = ExprEnv.get()._firstIndex;
  if (first < 0) {
    return resultA;
  }
  if (index > first) {
    var prev = this._buf[index - 1];
    return this._alpha * (resultA - prev.result) + prev.result;
  }
  return resultA;
};
var ExpmemaExpr = create_class(EmaExpr);
ExpmemaExpr.prototype.__construct = function (a, b) {
  ExpmemaExpr.__super.__construct.call(this, a, b);
};
ExpmemaExpr.prototype.calcResult = function (index, resultA) {
  var first = ExprEnv.get()._firstIndex;
  if (first < 0) {
    return resultA;
  }
  if (index > first) {
    var n = this._range;
    var prev = this._buf[index - 1];
    if (n >= index + 1 - first) {
      n = index + 1 - first;
      return prev.result * (1.0 - 1.0 / n) + (resultA / n);
    }
    return this._alpha * (resultA - prev.result) + prev.result;
  }
  return resultA;
};
var SmaExpr = create_class(RangeExpr);
SmaExpr.prototype.__construct = function (a, b, c) {
  SmaExpr.__super.__construct.call(this, a, b);
  this._exprC = c;
  this._mul;
};
SmaExpr.prototype.initRange = function () {
  SmaExpr.__super.initRange.call(this);
  this._mul = this._exprC.execute(0);
};
SmaExpr.prototype.calcResult = function (index, resultA) {
  if (this._range == 0) {
    return NaN;
  }
  var first = ExprEnv.get()._firstIndex;
  if (first < 0) {
    return resultA;
  }
  if (index > first) {
    var n = this._range;
    if (n > index + 1 - first) {
      n = index + 1 - first;
    }
    return ((n - 1) * this._buf[index - 1].result + resultA * this._mul) / n;
  }
  return resultA;
};
var SarExpr = create_class(OpABCDExpr);
SarExpr.prototype.__construct = function (a, b, c, d) {
  SarExpr.__super.__construct.call(this, a, b, c, d);
  this._buf = [];
  this._range = -1;
  this._min;
  this._step;
  this._max;
};
SarExpr.prototype.execute = function (index) {
  if (this._range < 0) {
    this._range = this._exprA.execute(0);
    this._min = this._exprB.execute(0) / 100.0;
    this._step = this._exprC.execute(0) / 100.0;
    this._max = this._exprD.execute(0) / 100.0;
  }
  var data = this._buf[index];
  var exprEnv = ExprEnv.get();
  var first = exprEnv._firstIndex;
  if (first < 0) {
    data.longPos = true;
    data.sar = exprEnv._ds.getDataAt(index).low;
    data.ep = exprEnv._ds.getDataAt(index).high;
    data.af = 0.02;
  } else {
    var high = exprEnv._ds.getDataAt(index).high;
    var low = exprEnv._ds.getDataAt(index).low;
    var prev = this._buf[index - 1];
    data.sar = prev.sar + prev.af * (prev.ep - prev.sar);
    if (prev.longPos) {
      data.longPos = true;
      if (high > prev.ep) {
        data.ep = high;
        data.af = Math.min(prev.af + this._step, this._max);
      } else {
        data.ep = prev.ep;
        data.af = prev.af;
      }
      if (data.sar > low) {
        data.longPos = false;
        var i = index - this._range + 1;
        for (i = Math.max(i, first); i < index; i++) {
          var h = exprEnv._ds.getDataAt(i).high;
          if (high < h) {
            high = h;
          }
        }
        data.sar = high;
        data.ep = low;
        data.af = 0.02;
      }
    } else {
      data.longPos = false;
      if (low < prev.ep) {
        data.ep = low;
        data.af = Math.min(prev.af + this._step, this._max);
      } else {
        data.ep = prev.ep;
        data.af = prev.af;
      }
      if (data.sar < high) {
        data.longPos = true;
        var i = index - this._range + 1;
        for (i = Math.max(i, first); i < index; i++) {
          var l = exprEnv._ds.getDataAt(i).low;
          if (low > l) low = l;
        }
        data.sar = low;
        data.ep = high;
        data.af = 0.02;
      }
    }
  }
  return data.sar;
};
SarExpr.prototype.reserve = function (rid, count) {
  if (this._rid < rid) {
    for (var c = count; c > 0; c--) {
      this._buf.push({longPos: true, sar: NaN, ep: NaN, af: NaN});
    }
  }
  SarExpr.__super.reserve.call(this, rid, count);
};
SarExpr.prototype.clear = function () {
  SarExpr.__super.clear.call(this);
  this._range = -1;
};
/**
 * 指标基本类
 */
var Indicator = create_class();
Indicator.prototype.__construct = function () {
  this._exprEnv = new ExprEnv();
  this._rid = 0;
  this._params = [];
  this._assigns = [];
  this._outputs = [];
};
Indicator.prototype.addParameter = function (expr) {
  this._params.push(expr);
};
Indicator.prototype.addAssign = function (expr) {
  this._assigns.push(expr);
};
Indicator.prototype.addOutput = function (expr) {
  this._outputs.push(expr);
};
Indicator.prototype.getParameterCount = function () {
  return this._params.length;
};
Indicator.prototype.getParameterAt = function (index) {
  return this._params[index];
};
Indicator.prototype.getOutputCount = function () {
  return this._outputs.length;
};
Indicator.prototype.getOutputAt = function (index) {
  return this._outputs[index];
};
Indicator.prototype.clear = function () {
  this._exprEnv.setFirstIndex(-1);
  var i, cnt;
  cnt = this._assigns.length;
  for (i = 0; i < cnt; i++) {
    this._assigns[i].clear();
  }
  cnt = this._outputs.length;
  for (i = 0; i < cnt; i++) {
    this._outputs[i].clear();
  }
};
Indicator.prototype.reserve = function (count) {
  this._rid++;
  var i, cnt;
  cnt = this._assigns.length;
  for (i = 0; i < cnt; i++) {
    this._assigns[i].reserve(this._rid, count);
  }
  cnt = this._outputs.length;
  for (i = 0; i < cnt; i++) {
    this._outputs[i].reserve(this._rid, count);
  }
};
Indicator.prototype.execute = function (ds, index) {
  if (index < 0) {
    return;
  }
  this._exprEnv.setDataSource(ds);
  ExprEnv.set(this._exprEnv);
  try {
    var i, cnt;
    cnt = this._assigns.length;
    for (i = 0; i < cnt; i++) {
      this._assigns[i].assign(index);
    }
    cnt = this._outputs.length;
    for (i = 0; i < cnt; i++) {
      this._outputs[i].assign(index);
    }
    if (this._exprEnv.getFirstIndex() < 0) {
      this._exprEnv.setFirstIndex(index);
    }
  } catch (e) {
    if (this._exprEnv.getFirstIndex() >= 0) {
      alert(e);
      throw e;
    }
  }
};
Indicator.prototype.getParameters = function () {
  var params = [];
  var i, cnt = this._params.length;
  for (i = 0; i < cnt; i++) {
    params.push(this._params[i].getValue());
  }
  return params;
};
Indicator.prototype.setParameters = function (params) {
  if ((params instanceof Array) && params.length == this._params.length) {
    for (var i in this._params) {
      this._params[i].setValue(params[i]);
    }
  }
};
/**
 * 线图样式
 */
var HLCIndicator = create_class(Indicator);
HLCIndicator.prototype.__construct = function () {
  HLCIndicator.__super.__construct.call(this);
  var M1 = new ParameterExpr("M1", 2, 1000, 60);
  this.addParameter(M1);
  this.addOutput(new OutputExpr("HIGH",
    new HighExpr(),
    OutputStyle.None
  ));
  this.addOutput(new OutputExpr("LOW",
    new LowExpr(),
    OutputStyle.None
  ));
  this.addOutput(new OutputExpr("CLOSE",
    new CloseExpr(),
    OutputStyle.Line,
    Theme.Color.Indicator0
  ));
  this.addOutput(new RangeOutputExpr("MA",
    new MaExpr(new CloseExpr(), M1),
    OutputStyle.Line,
    Theme.Color.Indicator1
  ));
};
HLCIndicator.prototype.getName = function () {
  return "CLOSE";
};
/**
 * MA 指标
 */
var MAIndicator = create_class(Indicator);
MAIndicator.prototype.__construct = function () {
  MAIndicator.__super.__construct.call(this);
  var M1 = new ParameterExpr("M1", 2, 1000, 5);
  var M2 = new ParameterExpr("M2", 2, 1000, 10);
  var M3 = new ParameterExpr("M3", 2, 1000, 20);
  var M4 = new ParameterExpr("M4", 2, 1000, 30);
  var M5 = new ParameterExpr("M5", 2, 1000, 60);
  var M6 = new ParameterExpr("M6", 2, 1000, 0);
  this.addParameter(M1);
  this.addParameter(M2);
  this.addParameter(M3);
  this.addParameter(M4);
  this.addParameter(M5);
  this.addParameter(M6);
  this.addOutput(new RangeOutputExpr("MA",
    new MaExpr(new CloseExpr(), M1)
  ));
  this.addOutput(new RangeOutputExpr("MA",
    new MaExpr(new CloseExpr(), M2)
  ));
  this.addOutput(new RangeOutputExpr("MA",
    new MaExpr(new CloseExpr(), M3)
  ));
  this.addOutput(new RangeOutputExpr("MA",
    new MaExpr(new CloseExpr(), M4)
  ));
  this.addOutput(new RangeOutputExpr("MA",
    new MaExpr(new CloseExpr(), M5)
  ));
  this.addOutput(new RangeOutputExpr("MA",
    new MaExpr(new CloseExpr(), M6)
  ));
};
MAIndicator.prototype.getName = function () {
  return "MA";
};
/**
 * EMA 指标
 */
var EMAIndicator = create_class(Indicator);
EMAIndicator.prototype.__construct = function () {
  EMAIndicator.__super.__construct.call(this);
  var M1 = new ParameterExpr("M1", 2, 1000, 5);
  var M2 = new ParameterExpr("M2", 2, 1000, 10);
  var M3 = new ParameterExpr("M3", 2, 1000, 20);
  var M4 = new ParameterExpr("M4", 2, 1000, 30);
  var M5 = new ParameterExpr("M5", 2, 1000, 60);
  var M6 = new ParameterExpr("M6", 2, 1000, 0);
  this.addParameter(M1);
  this.addParameter(M2);
  this.addParameter(M3);
  this.addParameter(M4);
  this.addParameter(M5);
  this.addParameter(M6);
  this.addOutput(new RangeOutputExpr("EMA",
    new EmaExpr(new CloseExpr(), M1)
  ));
  this.addOutput(new RangeOutputExpr("EMA",
    new EmaExpr(new CloseExpr(), M2)
  ));
  this.addOutput(new RangeOutputExpr("EMA",
    new EmaExpr(new CloseExpr(), M3)
  ));
  this.addOutput(new RangeOutputExpr("EMA",
    new EmaExpr(new CloseExpr(), M4)
  ));
  this.addOutput(new RangeOutputExpr("EMA",
    new EmaExpr(new CloseExpr(), M5)
  ));
  this.addOutput(new RangeOutputExpr("EMA",
    new EmaExpr(new CloseExpr(), M6)
  ));
};
EMAIndicator.prototype.getName = function () {
  return "EMA";
};
/**
 * VOLUME 指标
 */
var VOLUMEIndicator = create_class(Indicator);
VOLUMEIndicator.prototype.__construct = function () {
  VOLUMEIndicator.__super.__construct.call(this);
  var M1 = new ParameterExpr("M1", 2, 500, 5);
  var M2 = new ParameterExpr("M2", 2, 500, 10);
  this.addParameter(M1);
  this.addParameter(M2);
  var VOLUME = new OutputExpr("VOLUME",
    new VolumeExpr(),
    OutputStyle.VolumeStick,
    Theme.Color.Text4
  );
  this.addOutput(VOLUME);
  this.addOutput(new RangeOutputExpr("MA",
    new MaExpr(VOLUME, M1),
    OutputStyle.Line,
    Theme.Color.Indicator0
  ));
  this.addOutput(new RangeOutputExpr("MA",
    new MaExpr(VOLUME, M2),
    OutputStyle.Line,
    Theme.Color.Indicator1
  ));
};
VOLUMEIndicator.prototype.getName = function () {
  return "VOLUME";
};
/**
 * MCAD 指标
 */
var MACDIndicator = create_class(Indicator);
MACDIndicator.prototype.__construct = function () {
  MACDIndicator.__super.__construct.call(this);
  var SHORT = new ParameterExpr("SHORT", 2, 200, 12);
  var LONG = new ParameterExpr("LONG", 2, 200, 26);
  var MID = new ParameterExpr("MID", 2, 200, 9);
  this.addParameter(SHORT);
  this.addParameter(LONG);
  this.addParameter(MID);
  var DIF = new OutputExpr("DIF",
    new SubExpr(
      new EmaExpr(new CloseExpr(), SHORT),
      new EmaExpr(new CloseExpr(), LONG)
    )
  );
  this.addOutput(DIF);
  var DEA = new OutputExpr("DEA",
    new EmaExpr(DIF, MID)
  );
  this.addOutput(DEA);
  var MACD = new OutputExpr("MACD",
    new MulExpr(
      new SubExpr(DIF, DEA),
      new ConstExpr(2)
    ),
    OutputStyle.MACDStick
  );
  this.addOutput(MACD);
};
MACDIndicator.prototype.getName = function () {
  return "MACD";
};
/**
 * DMI 指标
 */
var DMIIndicator = create_class(Indicator);
DMIIndicator.prototype.__construct = function () {
  DMIIndicator.__super.__construct.call(this);
  var N = new ParameterExpr("N", 2, 90, 14);
  var MM = new ParameterExpr("MM", 2, 60, 6);
  this.addParameter(N);
  this.addParameter(MM);
  var MTR = new AssignExpr("MTR",
    new ExpmemaExpr(
      new MaxExpr(
        new MaxExpr(
          new SubExpr(new HighExpr(), new LowExpr()),
          new AbsExpr(
            new SubExpr(
              new HighExpr(),
              new RefExpr(new CloseExpr(), new ConstExpr(1))
            )
          )
        ),
        new AbsExpr(
          new SubExpr(
            new RefExpr(new CloseExpr(), new ConstExpr(1)),
            new LowExpr()
          )
        )
      ),
      N
    )
  );
  this.addAssign(MTR);
  var HD = new AssignExpr("HD",
    new SubExpr(
      new HighExpr(),
      new RefExpr(new HighExpr(), new ConstExpr(1))
    )
  );
  this.addAssign(HD);
  var LD = new AssignExpr("LD",
    new SubExpr(
      new RefExpr(new LowExpr(), new ConstExpr(1)),
      new LowExpr()
    )
  );
  this.addAssign(LD);
  var DMP = new AssignExpr("DMP",
    new ExpmemaExpr(
      new IfExpr(
        new AndExpr(
          new GtExpr(HD, new ConstExpr(0)),
          new GtExpr(HD, LD)
        ),
        HD,
        new ConstExpr(0)
      ),
      N
    )
  );
  this.addAssign(DMP);
  var DMM = new AssignExpr("DMM",
    new ExpmemaExpr(
      new IfExpr(
        new AndExpr(
          new GtExpr(LD, new ConstExpr(0)),
          new GtExpr(LD, HD)
        ),
        LD,
        new ConstExpr(0)
      ),
      N
    )
  );
  this.addAssign(DMM);
  var PDI = new OutputExpr("PDI",
    new MulExpr(
      new DivExpr(DMP, MTR),
      new ConstExpr(100)
    )
  );
  this.addOutput(PDI);
  var MDI = new OutputExpr("MDI",
    new MulExpr(
      new DivExpr(DMM, MTR),
      new ConstExpr(100)
    )
  );
  this.addOutput(MDI);
  var ADX = new OutputExpr("ADX",
    new ExpmemaExpr(
      new MulExpr(
        new DivExpr(
          new AbsExpr(
            new SubExpr(MDI, PDI)
          ),
          new AddExpr(MDI, PDI)
        ),
        new ConstExpr(100)
      ),
      MM
    )
  );
  this.addOutput(ADX);
  var ADXR = new OutputExpr("ADXR",
    new ExpmemaExpr(ADX, MM)
  );
  this.addOutput(ADXR);
};
DMIIndicator.prototype.getName = function () {
  return "DMI";
};
/**
 * DMA 指标
 */
var DMAIndicator = create_class(Indicator);
DMAIndicator.prototype.__construct = function () {
  DMAIndicator.__super.__construct.call(this);
  var N1 = new ParameterExpr("N1", 2, 60, 10);
  var N2 = new ParameterExpr("N2", 2, 250, 50);
  var M = new ParameterExpr("M", 2, 100, 10);
  this.addParameter(N1);
  this.addParameter(N2);
  this.addParameter(M);
  var DIF = new OutputExpr("DIF",
    new SubExpr(
      new MaExpr(new CloseExpr(), N1),
      new MaExpr(new CloseExpr(), N2)
    )
  );
  this.addOutput(DIF);
  var DIFMA = new OutputExpr("DIFMA",
    new MaExpr(DIF, M)
  );
  this.addOutput(DIFMA);
};
DMAIndicator.prototype.getName = function () {
  return "DMA";
};
/**
 * TRIX 指标
 */
var TRIXIndicator = create_class(Indicator);
TRIXIndicator.prototype.__construct = function () {
  TRIXIndicator.__super.__construct.call(this);
  var N = new ParameterExpr("N", 2, 100, 12);
  var M = new ParameterExpr("M", 2, 100, 9);
  this.addParameter(N);
  this.addParameter(M);
  var MTR = new AssignExpr("MTR",
    new EmaExpr(
      new EmaExpr(
        new EmaExpr(new CloseExpr(), N), N), N)
  );
  this.addAssign(MTR);
  var TRIX = new OutputExpr("TRIX",
    new MulExpr(
      new DivExpr(
        new SubExpr(
          MTR,
          new RefExpr(
            MTR,
            new ConstExpr(1)
          )
        ),
        new RefExpr(
          MTR,
          new ConstExpr(1)
        )
      ),
      new ConstExpr(100)
    )
  );
  this.addOutput(TRIX);
  var MATRIX = new OutputExpr("MATRIX",
    new MaExpr(TRIX, M)
  );
  this.addOutput(MATRIX);
};
TRIXIndicator.prototype.getName = function () {
  return "TRIX";
};
/**
 * BRAR 指标
 */
var BRARIndicator = create_class(Indicator);
BRARIndicator.prototype.__construct = function () {
  BRARIndicator.__super.__construct.call(this);
  var N = new ParameterExpr("N", 2, 120, 26);
  this.addParameter(N);
  var REF_CLOSE_1 = new AssignExpr("REF_CLOSE_1",
    new RefExpr(new CloseExpr(), new ConstExpr(1))
  );
  this.addAssign(REF_CLOSE_1);
  var BR = new OutputExpr("BR",
    new MulExpr(
      new DivExpr(
        new SumExpr(
          new MaxExpr(
            new ConstExpr(0),
            new SubExpr(
              new HighExpr(),
              REF_CLOSE_1
            )
          ),
          N
        ),
        new SumExpr(
          new MaxExpr(
            new ConstExpr(0),
            new SubExpr(
              REF_CLOSE_1,
              new LowExpr()
            )
          ),
          N
        )
      ),
      new ConstExpr(100)
    )
  );
  this.addOutput(BR);
  var AR = new OutputExpr("AR",
    new MulExpr(
      new DivExpr(
        new SumExpr(
          new SubExpr(
            new HighExpr(),
            new OpenExpr()
          ),
          N
        ),
        new SumExpr(
          new SubExpr(
            new OpenExpr(),
            new LowExpr()
          ),
          N
        )
      ),
      new ConstExpr(100)
    )
  );
  this.addOutput(AR);
};
BRARIndicator.prototype.getName = function () {
  return "BRAR";
};
/**
 * VRI 指标
 */
var VRIndicator = create_class(Indicator);
VRIndicator.prototype.__construct = function () {
  VRIndicator.__super.__construct.call(this);
  var N = new ParameterExpr("N", 2, 100, 26);
  var M = new ParameterExpr("M", 2, 100, 6);
  this.addParameter(N);
  this.addParameter(M);
  var REF_CLOSE_1 = new AssignExpr("REF_CLOSE_1",
    new RefExpr(new CloseExpr(), new ConstExpr(1))
  );
  this.addAssign(REF_CLOSE_1);
  var TH = new AssignExpr("TH",
    new SumExpr(
      new IfExpr(
        new GtExpr(
          new CloseExpr(),
          REF_CLOSE_1
        ),
        new VolumeExpr(),
        new ConstExpr(0)
      ),
      N
    )
  );
  this.addAssign(TH);
  var TL = new AssignExpr("TL",
    new SumExpr(
      new IfExpr(
        new LtExpr(
          new CloseExpr(),
          REF_CLOSE_1
        ),
        new VolumeExpr(),
        new ConstExpr(0)
      ),
      N
    )
  );
  this.addAssign(TL);
  var TQ = new AssignExpr("TQ",
    new SumExpr(
      new IfExpr(
        new EqExpr(
          new CloseExpr(),
          REF_CLOSE_1
        ),
        new VolumeExpr(),
        new ConstExpr(0)
      ),
      N
    )
  );
  this.addAssign(TQ);
  var VR = new OutputExpr("VR",
    new MulExpr(
      new DivExpr(
        new AddExpr(
          new MulExpr(TH, new ConstExpr(2)),
          TQ
        ),
        new AddExpr(
          new MulExpr(TL, new ConstExpr(2)),
          TQ
        )
      ),
      new ConstExpr(100)
    )
  );
  this.addOutput(VR);
  var MAVR = new OutputExpr("MAVR",
    new MaExpr(VR, M)
  );
  this.addOutput(MAVR);
};
VRIndicator.prototype.getName = function () {
  return "VR";
};
/**
 * OBV 指标
 */
var OBVIndicator = create_class(Indicator);
OBVIndicator.prototype.__construct = function () {
  OBVIndicator.__super.__construct.call(this);
  var M = new ParameterExpr("M", 2, 100, 30);
  this.addParameter(M);
  var REF_CLOSE_1 = new AssignExpr("REF_CLOSE_1",
    new RefExpr(new CloseExpr(), new ConstExpr(1))
  );
  this.addAssign(REF_CLOSE_1);
  var VA = new AssignExpr("VA",
    new IfExpr(
      new GtExpr(new CloseExpr(), REF_CLOSE_1),
      new VolumeExpr(),
      new NegExpr(new VolumeExpr())
    )
  );
  this.addAssign(VA);
  var OBV = new OutputExpr("OBV",
    new SumExpr(
      new IfExpr(
        new EqExpr(new CloseExpr(), REF_CLOSE_1),
        new ConstExpr(0),
        VA
      ),
      new ConstExpr(0)
    )
  );
  this.addOutput(OBV);
  var MAOBV = new OutputExpr("MAOBV",
    new MaExpr(OBV, M)
  );
  this.addOutput(MAOBV);
};
OBVIndicator.prototype.getName = function () {
  return "OBV";
};
/**
 * EMV 指标
 */
var EMVIndicator = create_class(Indicator);
EMVIndicator.prototype.__construct = function () {
  EMVIndicator.__super.__construct.call(this);
  var N = new ParameterExpr("N", 2, 90, 14);
  var M = new ParameterExpr("M", 2, 60, 9);
  this.addParameter(N);
  this.addParameter(M);
  var VOLUME = new AssignExpr("VOLUME",
    new DivExpr(
      new MaExpr(new VolumeExpr(), N),
      new VolumeExpr()
    )
  );
  this.addAssign(VOLUME);
  var MID = new AssignExpr("MID",
    new MulExpr(
      new DivExpr(
        new SubExpr(
          new AddExpr(new HighExpr(), new LowExpr()),
          new RefExpr(
            new AddExpr(new HighExpr(), new LowExpr()),
            new ConstExpr(1)
          )
        ),
        new AddExpr(new HighExpr(), new LowExpr())
      ),
      new ConstExpr(100)
    )
  );
  this.addAssign(MID);
  var EMV = new OutputExpr("EMV",
    new MaExpr(
      new DivExpr(
        new MulExpr(
          MID,
          new MulExpr(
            VOLUME,
            new SubExpr(new HighExpr(), new LowExpr())
          )
        ),
        new MaExpr(
          new SubExpr(new HighExpr(), new LowExpr()),
          N
        )
      ),
      N
    )
  );
  this.addOutput(EMV);
  var MAEMV = new OutputExpr("MAEMV",
    new MaExpr(EMV, M)
  );
  this.addOutput(MAEMV);
};
EMVIndicator.prototype.getName = function () {
  return "EMV";
};
/**
 * RSI 指标
 */
var RSIIndicator = create_class(Indicator);
RSIIndicator.prototype.__construct = function () {
  RSIIndicator.__super.__construct.call(this);
  var N1 = new ParameterExpr("N1", 2, 120, 6);
  var N2 = new ParameterExpr("N2", 2, 250, 12);
  var N3 = new ParameterExpr("N3", 2, 500, 24);
  this.addParameter(N1);
  this.addParameter(N2);
  this.addParameter(N3);
  var LC = new AssignExpr("LC",
    new RefExpr(new CloseExpr(), new ConstExpr(1))
  );
  this.addAssign(LC);
  var CLOSE_LC = new AssignExpr("CLOSE_LC",
    new SubExpr(new CloseExpr(), LC)
  );
  this.addAssign(CLOSE_LC);
  this.addOutput(new OutputExpr("RSI1",
    new MulExpr(
      new DivExpr(
        new SmaExpr(new MaxExpr(CLOSE_LC, new ConstExpr(0)), N1, new ConstExpr(1)),
        new SmaExpr(new AbsExpr(CLOSE_LC), N1, new ConstExpr(1))
      ),
      new ConstExpr(100)
    )
  ));
  this.addOutput(new OutputExpr("RSI2",
    new MulExpr(
      new DivExpr(
        new SmaExpr(new MaxExpr(CLOSE_LC, new ConstExpr(0)), N2, new ConstExpr(1)),
        new SmaExpr(new AbsExpr(CLOSE_LC), N2, new ConstExpr(1))
      ),
      new ConstExpr(100)
    )
  ));
  this.addOutput(new OutputExpr("RSI3",
    new MulExpr(
      new DivExpr(
        new SmaExpr(new MaxExpr(CLOSE_LC, new ConstExpr(0)), N3, new ConstExpr(1)),
        new SmaExpr(new AbsExpr(CLOSE_LC), N3, new ConstExpr(1))
      ),
      new ConstExpr(100)
    )
  ));
};
RSIIndicator.prototype.getName = function () {
  return "RSI";
};
/**
 * WR 指标
 */
var WRIndicator = create_class(Indicator);
WRIndicator.prototype.__construct = function () {
  WRIndicator.__super.__construct.call(this);
  var N = new ParameterExpr("N", 2, 100, 10);
  var N1 = new ParameterExpr("N1", 2, 100, 6);
  this.addParameter(N);
  this.addParameter(N1);
  var HHV = new AssignExpr("HHV",
    new HhvExpr(new HighExpr(), N)
  );
  this.addAssign(HHV);
  var HHV1 = new AssignExpr("HHV1",
    new HhvExpr(new HighExpr(), N1)
  );
  this.addAssign(HHV1);
  var LLV = new AssignExpr("LLV",
    new LlvExpr(new LowExpr(), N)
  );
  this.addAssign(LLV);
  var LLV1 = new AssignExpr("LLV1",
    new LlvExpr(new LowExpr(), N1)
  );
  this.addAssign(LLV1);
  var WR1 = new OutputExpr("WR1",
    new MulExpr(
      new DivExpr(
        new SubExpr(
          HHV,
          new CloseExpr()
        ),
        new SubExpr(
          HHV,
          LLV
        )
      ),
      new ConstExpr(100)
    )
  );
  this.addOutput(WR1);
  var WR2 = new OutputExpr("WR2",
    new MulExpr(
      new DivExpr(
        new SubExpr(
          HHV1,
          new CloseExpr()
        ),
        new SubExpr(
          HHV1,
          LLV1
        )
      ),
      new ConstExpr(100)
    )
  );
  this.addOutput(WR2);
};
WRIndicator.prototype.getName = function () {
  return "WR";
};
/**
 * SAR 指标
 */
var SARIndicator = create_class(Indicator);
SARIndicator.prototype.__construct = function () {
  SARIndicator.__super.__construct.call(this);
  var N = new ConstExpr(4);
  var MIN = new ConstExpr(2);
  var STEP = new ConstExpr(2);
  var MAX = new ConstExpr(20);
  this.addOutput(new OutputExpr("SAR",
    new SarExpr(N, MIN, STEP, MAX),
    OutputStyle.SARPoint
  ));
};
SARIndicator.prototype.getName = function () {
  return "SAR";
};
/**
 * KDJ 指标
 */
var KDJIndicator = create_class(Indicator);
KDJIndicator.prototype.__construct = function () {
  KDJIndicator.__super.__construct.call(this);
  var N = new ParameterExpr("N", 2, 90, 9);
  var M1 = new ParameterExpr("M1", 2, 30, 3);
  var M2 = new ParameterExpr("M2", 2, 30, 3);
  this.addParameter(N);
  this.addParameter(M1);
  this.addParameter(M2);
  var HHV = new AssignExpr("HHV",
    new HhvExpr(new HighExpr(), N)
  );
  this.addAssign(HHV);
  var LLV = new AssignExpr("LLV",
    new LlvExpr(new LowExpr(), N)
  );
  this.addAssign(LLV);
  var RSV = new AssignExpr("RSV",
    new MulExpr(
      new DivExpr(
        new SubExpr(
          new CloseExpr(),
          LLV
        ),
        new SubExpr(
          HHV,
          LLV
        )
      ),
      new ConstExpr(100)
    )
  );
  this.addAssign(RSV);
  var K = new OutputExpr("K",
    new SmaExpr(RSV, M1, new ConstExpr(1))
  );
  this.addOutput(K);
  var D = new OutputExpr("D",
    new SmaExpr(K, M2, new ConstExpr(1))
  );
  this.addOutput(D);
  var J = new OutputExpr("J",
    new SubExpr(
      new MulExpr(
        K,
        new ConstExpr(3)
      ),
      new MulExpr(
        D,
        new ConstExpr(2)
      )
    )
  );
  this.addOutput(J);
};
KDJIndicator.prototype.getName = function () {
  return "KDJ";
};
/**
 * ROC 指标
 */
var ROCIndicator = create_class(Indicator);
ROCIndicator.prototype.__construct = function () {
  ROCIndicator.__super.__construct.call(this);
  var N = new ParameterExpr("N", 2, 120, 12);
  var M = new ParameterExpr("M", 2, 60, 6);
  this.addParameter(N);
  this.addParameter(M);
  var REF_CLOSE_N = new AssignExpr("REF_CLOSE_N",
    new RefExpr(new CloseExpr(), N)
  );
  this.addAssign(REF_CLOSE_N);
  var ROC = new OutputExpr("ROC",
    new MulExpr(
      new DivExpr(
        new SubExpr(
          new CloseExpr(),
          REF_CLOSE_N
        ),
        REF_CLOSE_N
      ),
      new ConstExpr(100)
    )
  );
  this.addOutput(ROC);
  var MAROC = new OutputExpr("MAROC",
    new MaExpr(ROC, M)
  );
  this.addOutput(MAROC);
};
ROCIndicator.prototype.getName = function () {
  return "ROC";
};
/**
 * MTM 指标
 */
var MTMIndicator = create_class(Indicator);
MTMIndicator.prototype.__construct = function () {
  MTMIndicator.__super.__construct.call(this);
  var N = new ParameterExpr("N", 2, 120, 12);
  var M = new ParameterExpr("M", 2, 60, 6);
  this.addParameter(N);
  this.addParameter(M);
  var MTM = new OutputExpr("MTM",
    new SubExpr(
      new CloseExpr(),
      new RefExpr(new CloseExpr(), N)
    )
  );
  this.addOutput(MTM);
  var MTMMA = new OutputExpr("MTMMA",
    new MaExpr(MTM, M)
  );
  this.addOutput(MTMMA);
};
MTMIndicator.prototype.getName = function () {
  return "MTM";
};
/**
 * BOLL 指标
 */
var BOLLIndicator = create_class(Indicator);
BOLLIndicator.prototype.__construct = function () {
  BOLLIndicator.__super.__construct.call(this);
  var N = new ParameterExpr("N", 2, 120, 20);
  this.addParameter(N);
  var STD_CLOSE_N = new AssignExpr("STD_CLOSE_N",
    new StdExpr(new CloseExpr(), N)
  );
  this.addAssign(STD_CLOSE_N);
  var BOLL = new OutputExpr("BOLL",
    new MaExpr(new CloseExpr(), N)
  );
  this.addOutput(BOLL);
  var UB = new OutputExpr("UB",
    new AddExpr(
      BOLL,
      new MulExpr(
        new ConstExpr(2),
        STD_CLOSE_N
      )
    )
  );
  this.addOutput(UB);
  var LB = new OutputExpr("LB",
    new SubExpr(
      BOLL,
      new MulExpr(
        new ConstExpr(2),
        STD_CLOSE_N
      )
    )
  );
  this.addOutput(LB);
};
BOLLIndicator.prototype.getName = function () {
  return "BOLL";
};
/**
 * PSY 指标
 */
var PSYIndicator = create_class(Indicator);
PSYIndicator.prototype.__construct = function () {
  PSYIndicator.__super.__construct.call(this);
  var N = new ParameterExpr("N", 2, 100, 12);
  var M = new ParameterExpr("M", 2, 100, 6);
  this.addParameter(N);
  this.addParameter(M);
  var PSY = new OutputExpr("PSY",
    new MulExpr(
      new DivExpr(
        new CountExpr(
          new GtExpr(
            new CloseExpr(),
            new RefExpr(new CloseExpr(), new ConstExpr(1))
          ),
          N
        ),
        N
      ),
      new ConstExpr(100)
    )
  );
  this.addOutput(PSY);
  var PSYMA = new OutputExpr("PSYMA",
    new MaExpr(PSY, M)
  );
  this.addOutput(PSYMA);
};
PSYIndicator.prototype.getName = function () {
  return "PSY";
};
/**
 * StochRSI 指标
 */
var STOCHRSIIndicator = create_class(Indicator);
STOCHRSIIndicator.prototype.__construct = function () {
  STOCHRSIIndicator.__super.__construct.call(this);
  var N = new ParameterExpr("N", 3, 100, 14);
  var M = new ParameterExpr("M", 3, 100, 14);
  var P1 = new ParameterExpr("P1", 2, 50, 3);
  var P2 = new ParameterExpr("P2", 2, 50, 3);
  this.addParameter(N);
  this.addParameter(M);
  this.addParameter(P1);
  this.addParameter(P2);
  var LC = new AssignExpr("LC",
    new RefExpr(new CloseExpr(), new ConstExpr(1))
  );
  this.addAssign(LC);
  var CLOSE_LC = new AssignExpr("CLOSE_LC",
    new SubExpr(new CloseExpr(), LC)
  );
  this.addAssign(CLOSE_LC);
  var RSI = new AssignExpr("RSI",
    new MulExpr(
      new DivExpr(
        new SmaExpr(new MaxExpr(CLOSE_LC, new ConstExpr(0)), N, new ConstExpr(1)),
        new SmaExpr(new AbsExpr(CLOSE_LC), N, new ConstExpr(1))
      ),
      new ConstExpr(100)
    )
  );
  this.addAssign(RSI);
  var STOCHRSI = new OutputExpr("STOCHRSI",
    new MulExpr(
      new DivExpr(
        new MaExpr(
          new SubExpr(
            RSI,
            new LlvExpr(RSI, M)
          ),
          P1
        ),
        new MaExpr(
          new SubExpr(
            new HhvExpr(RSI, M),
            new LlvExpr(RSI, M)
          ),
          P1
        )
      ),
      new ConstExpr(100)
    )
  );
  this.addOutput(STOCHRSI);
  this.addOutput(new RangeOutputExpr("MA",
    new MaExpr(STOCHRSI, P2)
  ));
};
STOCHRSIIndicator.prototype.getName = function () {
  return "StochRSI";
};
var Chart = create_class();
Chart.strPeriod = {
  "zh-cn": {
    "line": "(分时)",
    "1min": "(1分钟)",
    "3min": "(3分钟)",
    "5min": "(5分钟)",
    "15min": "(15分钟)",
    "30min": "(30分钟)",
    "1hour": "(1小时)",
    "2hour": "(2小时)",
    "4hour": "(4小时)",
    "6hour": "(6小时)",
    "12hour": "(12小时)",
    "1day": "(日线)",
    "3day": "(3天)",
    "1week": "(周线)"
  },
  "en-us": {
    "line": "(Line)",
    "1min": "(1m)",
    "3min": "(3m)",
    "5min": "(5m)",
    "15min": "(15m)",
    "30min": "(30m)",
    "1hour": "(1h)",
    "2hour": "(2h)",
    "4hour": "(4h)",
    "6hour": "(6h)",
    "12hour": "(12h)",
    "1day": "(1d)",
    "3day": "(3d)",
    "1week": "(1w)"
  },
  "zh-tw": {
    "line": "(分時)",
    "1min": "(1分钟)",
    "3min": "(3分钟)",
    "5min": "(5分钟)",
    "15min": "(15分钟)",
    "30min": "(30分钟)",
    "1hour": "(1小時)",
    "2hour": "(2小時)",
    "4hour": "(4小時)",
    "6hour": "(6小時)",
    "12hour": "(12小時)",
    "1day": "(日线)",
    "3day": "(3天)",
    "1week": "(周线)"
  }
};
/**
 * 初始化数据
 * @private
 */
Chart.prototype.__construct = function () {
  this._data = null;
  this._charStyle = "CandleStick";
  this._depthData = {
    array: null,
    asks_count: 0,
    bids_count: 0,
    asks_si: 0,
    asks_ei: 0,
    bids_si: 0,
    bids_ei: 0
  };
  this._time = GLOBAL_VAR.time_type;
  this._market_from = GLOBAL_VAR.market_from;
  this._usd_cny_rate = 6.1934; //人民币美元汇率
  this._money_type = Config.currency;// 法币类型
  this._contract_unit = "BTC";
  this.strIsLine = false;
  this.strCurrentMarket = 20150403001;
  this.strCurrentMarketType = 1
};
Chart.prototype.setTitle = function () {
  var lang = ChartManager.getInstance().getLanguage();
  var str = GLOBAL_VAR.market_from_name;
  str += ' ';
  str += this.strIsLine ? Chart.strPeriod[lang]['line'] : Chart.strPeriod[lang][this._time];
  str += (this._contract_unit + "/" + this._money_type).toUpperCase();
  ChartManager.getInstance().setTitle('frame0.k0', str);
  //kline.title = a;
  //kline.setTitle()
};
Chart.prototype.setCurrentList = function () {
};
Chart.prototype.setMarketFrom = function (a) {
  this._market_from = a;
  this.updateDataAndDisplay()
};
Chart.prototype.updateDataAndDisplay = function () {
  GLOBAL_VAR.market_from = this._market_from;
  GLOBAL_VAR.time_type = this._time;
  this.setTitle();
  ChartManager.getInstance().setCurrentDataSource("frame0.k0", "freeWillex." + this._market_from + "." + this._time);
  ChartManager.getInstance().setNormalMode();
  var a = GLOBAL_VAR.chartMgr.getDataSource("frame0.k0").getLastDate();
  if (a == -1) {
    GLOBAL_VAR.requestParam = setHttpRequestParam(GLOBAL_VAR.market_from, GLOBAL_VAR.time_type, GLOBAL_VAR.limit, null);
    RequestData(true)
  } else {
    GLOBAL_VAR.requestParam = setHttpRequestParam(GLOBAL_VAR.market_from, GLOBAL_VAR.time_type, null, a.toString());
    RequestData()
  }
  ChartManager.getInstance().redraw("All", false)
};
Chart.prototype.setCurrentContractUnit = function (a) {
  this._contract_unit = a;
  this.updateDataAndDisplay()
};
Chart.prototype.setCurrentMoneyType = function (a) {
  this._money_type = a;
  this.updateDataAndDisplay()
};
Chart.prototype.setCurrentPeriod = function (a) {
  this._time = GLOBAL_VAR.periodMap[a];
  this.updateDataAndDisplay()
};
Chart.prototype.updateDataSource = function (a) {
  this._data = a;
  ChartManager.getInstance().updateData("frame0.k0", this._data)
};
Chart.prototype.updateDepth = function (d) {
  if (d == null) {
    this._depthData.array = [];
    ChartManager.getInstance().redraw("All", false);
    return
  }
  if (!d.asks || !d.bids || d.asks == "" || d.bids == "") {
    return
  }
  var b = this._depthData;
  b.array = [];
  for (var a = 0; a < d.asks.length; a++) {
    var c = {};
    c.rate = d.asks[a][0];
    c.amount = d.asks[a][1];
    b.array.push(c)
  }
  for (var a = 0; a < d.bids.length; a++) {
    var c = {};
    c.rate = d.bids[a][0];
    c.amount = d.bids[a][1];
    b.array.push(c)
  }
  b.asks_count = d.asks.length;
  b.bids_count = d.bids.length;
  b.asks_si = b.asks_count - 1;
  b.asks_ei = 0;
  b.bids_si = b.asks_count;
  b.bids_ei = b.asks_count + b.bids_count - 1;
  for (var a = b.asks_si; a >= b.asks_ei; a--) {
    if (a == b.asks_si) {
      b.array[a].amounts = b.array[a].amount
    } else {
      b.array[a].amounts = b.array[a + 1].amounts + b.array[a].amount
    }
  }
  for (var a = b.bids_si; a <= b.bids_ei; a++) {
    if (a == b.bids_si) {
      b.array[a].amounts = b.array[a].amount
    } else {
      b.array[a].amounts = b.array[a - 1].amounts + b.array[a].amount
    }
  }
  ChartManager.getInstance().redraw("All", false)
};
Chart.prototype.setMainIndicator = function (indicName) {
  this._mainIndicator = indicName;
  if (indicName == "NONE") {
    ChartManager.getInstance().removeMainIndicator("frame0.k0")
  } else {
    ChartManager.getInstance().setMainIndicator("frame0.k0", indicName)
  }
  ChartManager.getInstance().redraw("All", true)
};
Chart.prototype.setIndicator = function (index, indicName) {
  if (indicName == 'NONE') {
    var index = 2;
    if (Template.displayVolume == false) {
      index = 1;
    }
    var areaName = ChartManager.getInstance().getIndicatorAreaName('frame0.k0', index);
    if (areaName != '') {
      ChartManager.getInstance().removeIndicator(areaName);
    }
  } else {
    var index = 2;
    if (Template.displayVolume == false) {
      index = 1;
    }
    var areaName = ChartManager.getInstance().getIndicatorAreaName('frame0.k0', index);
    if (areaName == '') {
      Template.createIndicatorChartComps('frame0.k0', indicName);
    } else {
      ChartManager.getInstance().setIndicator(areaName, indicName);
    }
  }
  ChartManager.getInstance().redraw('All', true);
};
Chart.prototype.addIndicator = function (indicName) {
  ChartManager.getInstance().addIndicator(indicName);
  ChartManager.getInstance().redraw('All', true);
};
Chart.prototype.removeIndicator = function (indicName) {
  var areaName = ChartManager.getInstance().getIndicatorAreaName(2);
  ChartManager.getInstance().removeIndicator(areaName);
  ChartManager.getInstance().redraw('All', true);
};
var CName = create_class();
CName.prototype.__construct = function (name) {
  this._names = [];
  this._comps = [];
  if (name instanceof CName) {
    this._names = name._names;
    this._comps = name._comps;
  }
  else {
    var comps = name.split(".");
    var dotNum = comps.length - 1;
    if (dotNum > 0) {
      this._comps = comps;
      this._names.push(comps[0]);
      for (var i = 1; i <= dotNum; i++) {
        this._names.push(this._names[i - 1] + "." + comps[i]);
      }
    } else {
      this._comps.push(name);
      this._names.push(name);
    }
  }
};
CName.prototype.getCompAt = function (index) {
  if (index >= 0 && index < this._comps.length) {
    return this._comps[index];
  }
  return "";
};
CName.prototype.getName = function (index) {
  if (index < 0) {
    if (this._names.length > 0)
      return this._names[this._names.length - 1];
  } else if (index < this._names.length) {
    return this._names[index];
  }
  return "";
};
var NamedObject = create_class();
NamedObject.prototype.__construct = function (name) {
  this._name = name;
  this._nameObj = new CName(name);
};
NamedObject.prototype.getFrameName = function () {
  return this._nameObj.getName(0);
};
NamedObject.prototype.getDataSourceName = function () {
  return this._nameObj.getName(1);
};
NamedObject.prototype.getAreaName = function () {
  return this._nameObj.getName(2);
};
NamedObject.prototype.getName = function () {
  return this._nameObj.getName(-1);
};
NamedObject.prototype.getNameObject = function () {
  return this._nameObj;
};
var ChartArea = create_class(NamedObject);
ChartArea.prototype.__construct = function (name) {
  ChartArea.__super.__construct.call(this, name);
  this._left = 0;
  this._top = 0;
  this._right = 0;
  this._bottom = 0;
  this._changed = false;
  this._highlighted = false;
  this._pressed = false;
  this._selected = false;
  this.Measuring = new MEvent();
};
ChartArea.DockStyle = {Left: 0, Top: 1, Right: 2, Bottom: 3, Fill: 4};
ChartArea.prototype.getDockStyle = function () {
  return this._dockStyle;
};
ChartArea.prototype.setDockStyle = function (dockStyle) {
  this._dockStyle = dockStyle;
};
ChartArea.prototype.getLeft = function () {
  return this._left;
};
ChartArea.prototype.getTop = function () {
  return this._top;
};
ChartArea.prototype.setTop = function (v) {
  if (this._top != v) {
    this._top = v;
    this._changed = true;
  }
};
ChartArea.prototype.getRight = function () {
  return this._right;
};
ChartArea.prototype.getBottom = function () {
  return this._bottom;
};
ChartArea.prototype.setBottom = function (v) {
  if (this._bottom != v) {
    this._bottom = v;
    this._changed = true;
  }
};
ChartArea.prototype.getCenter = function () {
  return (this._left + this._right) >> 1;
};
ChartArea.prototype.getMiddle = function () {
  return (this._top + this._bottom) >> 1;
};
ChartArea.prototype.getWidth = function () {
  return this._right - this._left;
};
ChartArea.prototype.getHeight = function () {
  return this._bottom - this._top;
};
ChartArea.prototype.getRect = function () {
  return {
    X: this._left,
    Y: this._top,
    Width: this._right - this._left,
    Height: this._bottom - this._top
  };
};
ChartArea.prototype.contains = function (x, y) {
  if (x >= this._left && x < this._right) {
    if (y >= this._top && y < this._bottom) {
      return [this];
    }
  }
  return null;
};
ChartArea.prototype.getMeasuredWidth = function () {
  return this._measuredWidth;
};
ChartArea.prototype.getMeasuredHeight = function () {
  return this._measuredHeight;
};
ChartArea.prototype.setMeasuredDimension = function (width, height) {
  this._measuredWidth = width;
  this._measuredHeight = height;
};
ChartArea.prototype.measure = function (context, width, height) {
  this._measuredWidth = 0;
  this._measuredHeight = 0;
  this.Measuring.raise(this, {Width: width, Height: height});
  if (this._measuredWidth == 0 && this._measuredHeight == 0) {
    this.setMeasuredDimension(width, height);
  }
};
ChartArea.prototype.layout = function (left, top, right, bottom, forceChange) {
  left <<= 0;
  if (this._left != left) {
    this._left = left;
    this._changed = true;
  }
  top <<= 0;
  if (this._top != top) {
    this._top = top;
    this._changed = true;
  }
  right <<= 0;
  if (this._right != right) {
    this._right = right;
    this._changed = true;
  }
  bottom <<= 0;
  if (this._bottom != bottom) {
    this._bottom = bottom;
    this._changed = true;
  }
  if (forceChange) {
    this._changed = true;
  }
};
ChartArea.prototype.isChanged = function () {
  return this._changed;
};
ChartArea.prototype.setChanged = function (v) {
  this._changed = v;
};
ChartArea.prototype.isHighlighted = function () {
  return this._highlighted;
};
ChartArea.prototype.getHighlightedArea = function () {
  return this._highlighted ? this : null;
};
ChartArea.prototype.highlight = function (area) {
  this._highlighted = (this == area);
  return this._highlighted ? this : null;
};
ChartArea.prototype.isPressed = function () {
  return this._pressed;
};
ChartArea.prototype.setPressed = function (v) {
  this._pressed = v;
};
ChartArea.prototype.isSelected = function () {
  return this._selected;
};
ChartArea.prototype.getSelectedArea = function () {
  return this._selected ? this : null;
};
ChartArea.prototype.select = function (area) {
  this._selected = (this == area);
  return this._selected ? this : null;
};
ChartArea.prototype.onMouseMove = function (x, y) {
  return null;
};
ChartArea.prototype.onMouseLeave = function (x, y) {
};
ChartArea.prototype.onMouseDown = function (x, y) {
  return null;
};
ChartArea.prototype.onMouseUp = function (x, y) {
  return null;
};
var MainArea = create_class(ChartArea);
MainArea.prototype.__construct = function (name) {
  MainArea.__super.__construct.call(this, name);
  this._dragStarted = false;
  this._oldX = 0;
  this._oldY = 0;
  this._passMoveEventToToolManager = true;
};
MainArea.prototype.onMouseMove = function (x, y) {
  var mgr = ChartManager.getInstance();
  if (mgr._capturingMouseArea == this) {
    if (this._dragStarted == false) {
      if (Math.abs(this._oldX - x) > 1 || Math.abs(this._oldY - y) > 1) {
        this._dragStarted = true;
      }
    }
  }
  if (this._dragStarted) {
    mgr.hideCursor();
    if (mgr.onToolMouseDrag(this.getFrameName(), x, y)) {
      return this;
    }
    mgr.getTimeline(this.getDataSourceName()).move(x - this._oldX);
    return this;
  }
  if (this._passMoveEventToToolManager && mgr.onToolMouseMove(this.getFrameName(), x, y)) {
    mgr.hideCursor();
    return this;
  }
  switch (mgr._drawingTool) {
    case ChartManager.DrawingTool.Cursor:
      mgr.showCursor();
      break;
    case ChartManager.DrawingTool.CrossCursor:
      if (mgr.showCrossCursor(this, x, y)) {
        mgr.hideCursor();
      } else {
        mgr.showCursor();
      }
      break;
    default:
      mgr.hideCursor();
      break;
  }
  return this;
};
MainArea.prototype.onMouseLeave = function (x, y) {
  this._dragStarted = false;
  this._passMoveEventToToolManager = true;
};
MainArea.prototype.onMouseDown = function (x, y) {
  var mgr = ChartManager.getInstance();
  mgr.getTimeline(this.getDataSourceName()).startMove();
  this._oldX = x;
  this._oldY = y;
  this._dragStarted = false;
  if (mgr.onToolMouseDown(this.getFrameName(), x, y)) {
    this._passMoveEventToToolManager = false;
  }
  return this;
};
MainArea.prototype.onMouseUp = function (x, y) {
  var mgr = ChartManager.getInstance();
  var ret = null;
  if (this._dragStarted) {
    this._dragStarted = false;
    ret = this;
  }
  if (mgr.onToolMouseUp(this.getFrameName(), x, y)) {
    ret = this;
  }
  this._passMoveEventToToolManager = true;
  return ret;
};
var IndicatorArea = create_class(ChartArea);
IndicatorArea.prototype.__construct = function (name) {
  IndicatorArea.__super.__construct.call(this, name);
  this._dragStarted = false;
  this._oldX = 0;
  this._oldY = 0;
};
IndicatorArea.prototype.onMouseMove = function (x, y) {
  var mgr = ChartManager.getInstance();
  if (mgr._capturingMouseArea == this) {
    if (this._dragStarted == false) {
      if (this._oldX != x || this._oldY != y) {
        this._dragStarted = true;
      }
    }
  }
  if (this._dragStarted) {
    mgr.hideCursor();
    mgr.getTimeline(this.getDataSourceName()).move(x - this._oldX);
    return this;
  }
  switch (mgr._drawingTool) {
    case ChartManager.DrawingTool.CrossCursor:
      if (mgr.showCrossCursor(this, x, y)) {
        mgr.hideCursor();
      } else {
        mgr.showCursor();
      }
      break;
    default:
      mgr.showCursor();
      break;
  }
  return this;
};
IndicatorArea.prototype.onMouseLeave = function (x, y) {
  this._dragStarted = false;
};
IndicatorArea.prototype.onMouseDown = function (x, y) {
  var mgr = ChartManager.getInstance();
  mgr.getTimeline(this.getDataSourceName()).startMove();
  this._oldX = x;
  this._oldY = y;
  this._dragStarted = false;
  return this;
};
IndicatorArea.prototype.onMouseUp = function (x, y) {
  if (this._dragStarted) {
    this._dragStarted = false;
    return this;
  }
  return null;
};
var MainRangeArea = create_class(ChartArea);
MainRangeArea.prototype.__construct = function (name) {
  MainRangeArea.__super.__construct.call(this, name);
};
MainRangeArea.prototype.onMouseMove = function (x, y) {
  ChartManager.getInstance().showCursor();
  return this;
};
var IndicatorRangeArea = create_class(ChartArea);
IndicatorRangeArea.prototype.__construct = function (name) {
  IndicatorRangeArea.__super.__construct.call(this, name);
};
IndicatorRangeArea.prototype.onMouseMove = function (x, y) {
  ChartManager.getInstance().showCursor();
  return this;
};
var TimelineArea = create_class(ChartArea);
TimelineArea.prototype.__construct = function (name) {
  TimelineArea.__super.__construct.call(this, name);
};
TimelineArea.prototype.onMouseMove = function (x, y) {
  ChartManager.getInstance().showCursor();
  return this;
};
var ChartAreaGroup = create_class(ChartArea);
ChartAreaGroup.prototype.__construct = function (name) {
  ChartAreaGroup.__super.__construct.call(this, name);
  this._areas = [];
  this._highlightedArea = null;
  this._selectedArea = null;
};
ChartAreaGroup.prototype.contains = function (x, y) {
  var areas;
  var a, i, cnt = this._areas.length;
  for (i = 0; i < cnt; i++) {
    a = this._areas[i];
    areas = a.contains(x, y);
    if (areas != null) {
      areas.push(this);
      return areas;
    }
  }
  return ChartAreaGroup.__super.contains(x, y);
};
ChartAreaGroup.prototype.getAreaCount = function () {
  return this._areas.length;
};
ChartAreaGroup.prototype.getAreaAt = function (index) {
  if (index < 0 || index >= this._areas.length) {
    return null;
  }
  return this._areas[index];
};
ChartAreaGroup.prototype.addArea = function (area) {
  this._areas.push(area);
};
ChartAreaGroup.prototype.removeArea = function (area) {
  var i, cnt = this._areas.length;
  for (i = 0; i < cnt; i++) {
    if (area == this._areas[i]) {
      this._areas.splice(i);
      this.setChanged(true);
      break;
    }
  }
};
ChartAreaGroup.prototype.getGridColor = function () {
  return this._gridColor;
};
ChartAreaGroup.prototype.setGridColor = function (c) {
  this._gridColor = c;
};
ChartAreaGroup.prototype.getHighlightedArea = function () {
  if (this._highlightedArea != null) {
    return this._highlightedArea.getHighlightedArea();
  }
  return null;
};
ChartAreaGroup.prototype.highlight = function (area) {
  this._highlightedArea = null;
  var e, i, cnt = this._areas.length;
  for (i = 0; i < cnt; i++) {
    e = this._areas[i].highlight(area);
    if (e != null) {
      this._highlightedArea = e;
      return this;
    }
  }
  return null;
};
ChartAreaGroup.prototype.getSelectedArea = function () {
  if (this._selectedArea != null) {
    return this._selectedArea.getSelectedArea();
  }
  return null;
};
ChartAreaGroup.prototype.select = function (area) {
  this._selectedArea = null;
  var e, i, cnt = this._areas.length;
  for (i = 0; i < cnt; i++) {
    e = this._areas[i].select(area);
    if (e != null) {
      this._selectedArea = e;
      return this;
    }
  }
  return null;
};
ChartAreaGroup.prototype.onMouseLeave = function (x, y) {
  var i, cnt = this._areas.length;
  for (i = 0; i < cnt; i++) {
    this._areas[i].onMouseLeave(x, y);
  }
};
ChartAreaGroup.prototype.onMouseUp = function (x, y) {
  var a, i, cnt = this._areas.length;
  for (i = 0; i < cnt; i++) {
    a = this._areas[i].onMouseUp(x, y);
    if (a != null) {
      return a;
    }
  }
  return null;
};
var TableLayout = create_class(ChartAreaGroup);
TableLayout.prototype.__construct = function (name) {
  TableLayout.__super.__construct.call(this, name);
  this._nextRowId = 0;
  this._focusedRowIndex = -1;
};
TableLayout.prototype.getNextRowId = function () {
  return this._nextRowId++;
};
TableLayout.prototype.measure = function (context, width, height) {
  this.setMeasuredDimension(width, height);
  var rowH, prevH = 0, totalH = 0;
  var h, rows;
  var rh = [];
  var i, cnt = this._areas.length;
  for (i = 0; i < cnt; i += 2) {
    rowH = this._areas[i].getHeight();
    if (rowH == 0) {
      if (i == 0) {
        rows = (cnt + 1) >> 1;
        var n = (rows * 2) + 5;
        var nh = ((height / n) * 2) << 0;
        h = height;
        for (i = rows - 1; i > 0; i--) {
          rh.unshift(nh);
          h -= nh;
        }
        rh.unshift(h);
        break;
      } else if (i == 2) {
        rowH = prevH / 3;
      } else {
        rowH = prevH;
      }
    }
    totalH += rowH;
    prevH = rowH;
    rh.push(rowH);
  }
  if (totalH > 0) {
    var rate = height / totalH;
    rows = (cnt + 1) >> 1;
    h = height;
    for (i = rows - 1; i > 0; i--) {
      rh[i] *= rate;
      h -= rh[i];
    }
    rh[0] = h;
  }
  var nw = 8;
  var minRW = 64;
  var maxRW = Math.min(240, width >> 1);
  var rw = minRW;
  var mgr = ChartManager.getInstance();
  var timeline = mgr.getTimeline(this.getDataSourceName());
  if (timeline.getFirstIndex() >= 0) {
    var firstIndexes = [];
    for (rw = minRW; rw < maxRW; rw += nw) {
      firstIndexes.push(timeline.calcFirstIndex(timeline.calcColumnCount(width - rw)));
    }
    var lastIndex = timeline.getLastIndex();
    var dpNames = [".main", ".secondary"];
    var minmaxes = new Array(firstIndexes.length);
    var iArea, iIndex;
    for (iArea = 0, iIndex = 0, rw = minRW;
         iArea < this._areas.length && iIndex < firstIndexes.length;
         iArea += 2) {
      var area = this._areas[iArea];
      var plotter = mgr.getPlotter(area.getName() + "Range.main");
      for (var iDp in dpNames) {
        var dp = mgr.getDataProvider(area.getName() + dpNames[iDp]);
        if (dp == undefined) {
          continue;
        }
        dp.calcRange(firstIndexes, lastIndex, minmaxes, null);
        while (iIndex < firstIndexes.length) {
          var minW = plotter.getRequiredWidth(context, minmaxes[iIndex].min);
          var maxW = plotter.getRequiredWidth(context, minmaxes[iIndex].max);
          if (Math.max(minW, maxW) < rw) {
            break;
          }
          iIndex++;
          rw += nw;
        }
      }
    }
  }
  for (i = 1; i < this._areas.length; i += 2) {
    this._areas[i].measure(context, rw, rh[i >> 1]);
  }
  var lw = width - rw;
  for (i = 0; i < this._areas.length; i += 2) {
    this._areas[i].measure(context, lw, rh[i >> 1]);
  }
};
TableLayout.prototype.layout = function (left, top, right, bottom, forceChange) {
  TableLayout.__super.layout.call(this, left, top, right, bottom, forceChange);
  if (this._areas.length < 1) {
    return;
  }
  var area;
  var center = left + this._areas[0].getMeasuredWidth();
  var t = top, b;
  if (!forceChange) {
    forceChange = this.isChanged();
  }
  var i, cnt = this._areas.length;
  for (i = 0; i < cnt; i++) {
    area = this._areas[i];
    b = t + area.getMeasuredHeight();
    area.layout(left, t, center, b, forceChange);
    i++;
    area = this._areas[i];
    area.layout(center, t, this.getRight(), b, forceChange);
    t = b;
  }
  this.setChanged(false);
};
TableLayout.prototype.drawGrid = function (context) {
  if (this._areas.length < 1) {
    return;
  }
  var mgr = ChartManager.getInstance();
  var theme = mgr.getTheme(this.getFrameName());
  context.fillStyle = theme.getColor(Theme.Color.Grid1);
  context.fillRect(this._areas[0].getRight(), this.getTop(), 1, this.getHeight());
  var i, cnt = this._areas.length - 2;
  for (i = 0; i < cnt; i += 2) {
    context.fillRect(this.getLeft(), this._areas[i].getBottom(), this.getWidth(), 1);
  }
  if (!mgr.getCaptureMouseWheelDirectly()) {
    for (i = 0, cnt += 2; i < cnt; i += 2) {
      if (this._areas[i].isSelected()) {
        context.strokeStyle = theme.getColor(Theme.Color.Indicator1);
        context.strokeRect(
          this.getLeft() + 0.5, this.getTop() + 0.5,
          this.getWidth() - 1, this.getHeight() - 1);
        break;
      }
    }
  }
};
TableLayout.prototype.highlight = function (area) {
  this._highlightedArea = null;
  var e, i, cnt = this._areas.length;
  for (i = 0; i < cnt; i++) {
    e = this._areas[i];
    if (e == area) {
      i &= ~1;
      e = this._areas[i];
      e.highlight(e);
      this._highlightedArea = e;
      i++;
      e = this._areas[i];
      e.highlight(null);
      e.highlight(e);
    } else {
      e.highlight(null);
    }
  }
  return this._highlightedArea != null ? this : null;
};
TableLayout.prototype.select = function (area) {
  this._selectedArea = null;
  var e, i, cnt = this._areas.length;
  for (i = 0; i < cnt; i++) {
    e = this._areas[i];
    if (e == area) {
      i &= ~1;
      e = this._areas[i];
      e.select(e);
      this._selectedArea = e;
      i++;
      e = this._areas[i];
      e.select(e);
    } else {
      e.select(null);
    }
  }
  return this._selectedArea != null ? this : null;
};
TableLayout.prototype.onMouseMove = function (x, y) {
  if (this._focusedRowIndex >= 0) {
    var upper = this._areas[this._focusedRowIndex];
    var lower = this._areas[this._focusedRowIndex + 2];
    var d = y - this._oldY;
    if (d == 0) {
      return this;
    }
    var upperBottom = this._oldUpperBottom + d;
    var lowerTop = this._oldLowerTop + d;
    if (upperBottom - upper.getTop() >= 60 && lower.getBottom() - lowerTop >= 60) {
      upper.setBottom(upperBottom);
      lower.setTop(lowerTop);
    }
    return this;
  }
  var i, cnt = this._areas.length - 2;
  for (i = 0; i < cnt; i += 2) {
    var b = this._areas[i].getBottom();
    if (y >= b - 4 && y < b + 4) {
      ChartManager.getInstance().showCursor('n-resize');
      return this;
    }
  }
  return null;
};
TableLayout.prototype.onMouseLeave = function (x, y) {
  this._focusedRowIndex = -1;
};
TableLayout.prototype.onMouseDown = function (x, y) {
  var i, cnt = this._areas.length - 2;
  for (i = 0; i < cnt; i += 2) {
    var b = this._areas[i].getBottom();
    if (y >= b - 4 && y < b + 4) {
      this._focusedRowIndex = i;
      this._oldY = y;
      this._oldUpperBottom = b;
      this._oldLowerTop = this._areas[i + 2].getTop();
      return this;
    }
  }
  return null;
};
TableLayout.prototype.onMouseUp = function (x, y) {
  if (this._focusedRowIndex >= 0) {
    this._focusedRowIndex = -1;
    var i, cnt = this._areas.length;
    var height = [];
    for (i = 0; i < cnt; i += 2) {
      height.push(this._areas[i].getHeight());
    }
    ChartSettings.get().charts.areaHeight = height;
    ChartSettings.save();
  }
  return this;
};
var DockableLayout = create_class(ChartAreaGroup);
DockableLayout.prototype.__construct = function (name) {
  DockableLayout.__super.__construct.call(this, name);
};
DockableLayout.prototype.measure = function (context, width, height) {
  DockableLayout.__super.measure.call(this, context, width, height);
  width = this.getMeasuredWidth();
  height = this.getMeasuredHeight();
  for (var i in this._areas) {
    var area = this._areas[i];
    area.measure(context, width, height);
    switch (area.getDockStyle()) {
      case ChartArea.DockStyle.left:
      case ChartArea.DockStyle.Right:
        width -= area.getMeasuredWidth();
        break;
      case ChartArea.DockStyle.Top:
      case ChartArea.DockStyle.Bottom:
        height -= area.getMeasuredHeight();
        break;
      case ChartArea.DockStyle.Fill:
        width = 0;
        height = 0;
        break;
    }
  }
};
DockableLayout.prototype.layout = function (left, top, right, bottom, forceChange) {
  DockableLayout.__super.layout.call(this, left, top, right, bottom, forceChange);
  left = this.getLeft();
  top = this.getTop();
  right = this.getRight();
  bottom = this.getBottom();
  var w, h;
  if (!forceChange) {
    forceChange = this.isChanged();
  }
  for (var i in this._areas) {
    var area = this._areas[i];
    switch (area.getDockStyle()) {
      case ChartArea.DockStyle.left:
        w = area.getMeasuredWidth();
        area.layout(left, top, left + w, bottom, forceChange);
        left += w;
        break;
      case ChartArea.DockStyle.Top:
        h = area.getMeasuredHeight();
        area.layout(left, top, right, top + h, forceChange);
        top += h;
        break;
      case ChartArea.DockStyle.Right:
        w = area.getMeasuredWidth();
        area.layout(right - w, top, right, bottom, forceChange);
        right -= w;
        break;
      case ChartArea.DockStyle.Bottom:
        h = area.getMeasuredHeight();
        area.layout(left, bottom - h, right, bottom, forceChange);
        bottom -= h;
        break;
      case ChartArea.DockStyle.Fill:
        area.layout(left, top, right, bottom, forceChange);
        left = right;
        top = bottom;
        break;
    }
  }
  this.setChanged(false);
};
DockableLayout.prototype.drawGrid = function (context) {
  var mgr = ChartManager.getInstance();
  var theme = mgr.getTheme(this.getFrameName());
  var left = this.getLeft();
  var top = this.getTop();
  var right = this.getRight();
  var bottom = this.getBottom();
  context.fillStyle = theme.getColor(this._gridColor);
  for (var i in this._areas) {
    var area = this._areas[i];
    switch (area.getDockStyle()) {
      case ChartArea.DockStyle.Left:
        context.fillRect(area.getRight(), top, 1, bottom - top);
        left += area.getWidth();
        break;
      case ChartArea.DockStyle.Top:
        context.fillRect(left, area.getBottom(), right - left, 1);
        top += area.getHeight();
        break;
      case ChartArea.DockStyle.Right:
        context.fillRect(area.getLeft(), top, 1, bottom - top);
        right -= area.getWidth();
        break;
      case ChartArea.DockStyle.Bottom:
        context.fillRect(left, area.getTop(), right - left, 1);
        bottom -= area.getHeight();
        break;
    }
  }
};
var ChartManager = create_class();
ChartManager.DrawingTool = {
  Cursor: 0,
  CrossCursor: 1,
  DrawLines: 2,
  DrawFibRetrace: 3,
  DrawFibFans: 4,
  SegLine: 5,
  StraightLine: 6,
  ArrowLine: 7,
  RayLine: 8,
  HoriStraightLine: 9,
  HoriRayLine: 10,
  HoriSegLine: 11,
  VertiStraightLine: 12,
  PriceLine: 13,
  BiParallelLine: 14,
  BiParallelRayLine: 15,
  TriParallelLine: 16,
  BandLine: 17
};
ChartManager._instance = null;
ChartManager.getInstance = function () {
  if (ChartManager._instance == null) {
    ChartManager._instance = new ChartManager()
  }
  return ChartManager._instance
};
ChartManager.prototype.__construct = function () {
  this._dataSources = {};
  this._dataSourceCache = {};
  this._dataProviders = {};
  this._frames = {};
  this._areas = {};
  this._timelines = {};
  this._ranges = {};
  this._plotters = {};
  this._themes = {};
  this._titles = {};
  this._frameMousePos = {};
  this._dsChartStyle = {};
  this._dragStarted = false;
  this._oldX = 0;
  this._fakeIndicators = {};
  this._captureMouseWheelDirectly = true;
  this._chart = {};
  this._chart.defaultFrame = new Chart();
  this._drawingTool = ChartManager.DrawingTool.CrossCursor;
  this._beforeDrawingTool = this._drawingTool;
  this._language = 'zh-cn';
  this._mainCanvas = null;
  this._overlayCanvas = null;
  this._mainContext = null;
  this._overlayContext = null;
};
/**
 * redraw.
 * @param layer "all", "main", "overlay"
 */
ChartManager.prototype.redraw = function (layer, refresh) {
  if (layer == undefined || refresh) {
    layer = "All";
  }
  if (layer == "All" || layer == "MainCanvas") {
    if (refresh) {
      this.getFrame("frame0").setChanged(true);
    }
    this.layout(this._mainContext, "frame0", 0, 0, this._mainCanvas.width, this._mainCanvas.height);
    this.drawMain("frame0", this._mainContext);
  }
  if (layer == "All" || layer == "OverlayCanvas") {
    this._overlayContext.clearRect(0, 0, this._overlayCanvas.width, this._overlayCanvas.height);
    this.drawOverlay("frame0", this._overlayContext);
  }
};
/**
 * bindCanvas.
 * @param layer
 * "main", "overlay"
 */
ChartManager.prototype.bindCanvas = function (layer, canvas) {
  if (layer == "main") {
    this._mainCanvas = canvas;
    this._mainContext = canvas.getContext("2d");
  } else if (layer == "overlay") {
    this._overlayCanvas = canvas;
    this._overlayContext = canvas.getContext("2d");
    if (this._captureMouseWheelDirectly)
      $(this._overlayCanvas).bind('mousewheel', mouseWheel);
  }
};
ChartManager.prototype.getCaptureMouseWheelDirectly = function () {
  return this._captureMouseWheelDirectly;
};
ChartManager.prototype.setCaptureMouseWheelDirectly = function (v) {
  this._captureMouseWheelDirectly = v;
  if (v) {
    $(this._overlayCanvas).bind('mousewheel', mouseWheel);
  } else {
    $(this._overlayCanvas).unbind('mousewheel');
  }
};
ChartManager.prototype.getChart = function (nouseParam) {
  return this._chart["defaultFrame"];
};
ChartManager.prototype.init = function () {
  delete this._ranges['frame0.k0.indic1'];
  delete this._ranges['frame0.k0.indic1Range'];
  delete this._areas['frame0.k0.indic1'];
  delete this._areas['frame0.k0.indic1Range'];
  DefaultTemplate.loadTemplate("frame0.k0", "freeWillex");
  this.redraw('All', true);
  alert(1111);
};
ChartManager.prototype.setCurrentDrawingTool = function (paramTool) {
  // "Cursor" // "CrossCursor" // "DrawFibRetrace" // "DrawFibFans"
  // "SegLine" // "StraightLine" // "ArrowLine" // "RayLine"
  // "HoriStraightLine" // "HoriRayLine" // "HoriSegLine" // "VertiStraightLine"
  // "BiParallelLine" // "BiParallelRayLine" // "TriParallelLine"
  this._drawingTool = ChartManager.DrawingTool[paramTool];
  this.setRunningMode(this._drawingTool);
};
/**
 * Property: Language.
 * @param lang: "en-us" "zh-cn" "zh-tw"
 */
ChartManager.prototype.getLanguage = function () {
  return this._language;
};
ChartManager.prototype.setLanguage = function (lang) {
  this._language = lang;
};
/**
 * Property: ThemeName.
 * @param lang: "Dark" "Light"
 */
ChartManager.prototype.setThemeName = function (frameName, themeName) {
  if (themeName == undefined)
    themeName = "Dark";
  var theme;
  switch (themeName) {
    case "Light":
      theme = new LightTheme();
      break;
    default:
      themeName = "Dark";
      theme = new DarkTheme();
      break;
  }
  this._themeName = themeName;
  this.setTheme(frameName, theme);
  this.getFrame(frameName).setChanged(true);
};
/**
 * Property: ChartStyle.
 * @param style: "CandleStick" "CandleStickHLC" "OHLC"
 */
ChartManager.prototype.getChartStyle = function (dsName) {
  var chartStyle = this._dsChartStyle[dsName];
  if (chartStyle == undefined)
    return "CandleStick";
  return chartStyle;
};
ChartManager.prototype.setChartStyle = function (dsName, style) {
  if (this._dsChartStyle[dsName] == style) {
    return;
  }
  var areaName = dsName + ".main";
  var dpName = areaName + ".main";
  var plotterName = areaName + ".main";
  var dp, plotter;
  switch (style) {
    case "CandleStick":
    case "CandleStickHLC":
    case "OHLC":
      dp = this.getDataProvider(dpName);
      if (dp == undefined || !is_instance(dp, MainDataProvider)) {
        dp = new MainDataProvider(dpName);
        this.setDataProvider(dpName, dp);
        dp.updateData();
      }
      this.setMainIndicator(dsName, ChartSettings.get().charts.mIndic);
      switch (style) {
        case "CandleStick":
          plotter = new CandlestickPlotter(plotterName);
          break;
        case "CandleStickHLC":
          plotter = new CandlestickHLCPlotter(plotterName);
          break;
        case "OHLC":
          plotter = new OHLCPlotter(plotterName);
          break;
      }
      this.setPlotter(plotterName, plotter);
      plotter = new MinMaxPlotter(areaName + ".decoration");
      this.setPlotter(plotter.getName(), plotter);
      break;
    case "Line":
      dp = new IndicatorDataProvider(dpName);
      this.setDataProvider(dp.getName(), dp);
      dp.setIndicator(new HLCIndicator());
      this.removeMainIndicator(dsName);
      plotter = new IndicatorPlotter(plotterName);
      this.setPlotter(plotterName, plotter);
      this.removePlotter(areaName + ".decoration");
      break;
  }
  this.getArea(plotter.getAreaName()).setChanged(true);
  this._dsChartStyle[dsName] = style;
};
ChartManager.prototype.setNormalMode = function () {
  this._drawingTool = this._beforeDrawingTool;
  $(".chart_dropdown_data").removeClass("chart_dropdown-hover");
  $("#chart_toolpanel .chart_toolpanel_button").removeClass("selected");
  $("#chart_CrossCursor").parent().addClass("selected");
  if (this._drawingTool == ChartManager.DrawingTool.Cursor) {
    this.showCursor();
    $("#mode a").removeClass("selected");
    $("#chart_toolpanel .chart_toolpanel_button").removeClass("selected");
    $("#chart_Cursor").parent().addClass("selected");
  } else {
    this.hideCursor();
  }
};
ChartManager.prototype.setRunningMode = function (mode) {
  var pds = this.getDataSource("frame0.k0");
  var curr_o = pds.getCurrentToolObject();
  if (curr_o != null && curr_o.state != CToolObject.state.AfterDraw) {
    pds.delToolObject();
  }
  if (pds.getToolObjectCount() > 10) {
    this.setNormalMode();
    return;
  }
  this._drawingTool = mode;
  if (mode == ChartManager.DrawingTool.Cursor) {
    this.showCursor();
  } else {
  }
  switch (mode) {
    case ChartManager.DrawingTool.Cursor: {
      this._beforeDrawingTool = mode;
      break;
    }
    case ChartManager.DrawingTool.ArrowLine: {
      pds.addToolObject(new CArrowLineObject("frame0.k0"));
      break;
    }
    case ChartManager.DrawingTool.BandLine: {
      pds.addToolObject(new CBandLineObject("frame0.k0"));
      break;
    }
    case ChartManager.DrawingTool.BiParallelLine: {
      pds.addToolObject(new CBiParallelLineObject("frame0.k0"));
      break;
    }
    case ChartManager.DrawingTool.BiParallelRayLine: {
      pds.addToolObject(new CBiParallelRayLineObject("frame0.k0"));
      break;
    }
    case ChartManager.DrawingTool.CrossCursor: {
      this._beforeDrawingTool = mode;
      break;
    }
    case ChartManager.DrawingTool.DrawFibFans: {
      pds.addToolObject(new CFibFansObject("frame0.k0"));
      break;
    }
    case ChartManager.DrawingTool.DrawFibRetrace: {
      pds.addToolObject(new CFibRetraceObject("frame0.k0"));
      break;
    }
    case ChartManager.DrawingTool.DrawLines: {
      pds.addToolObject(new CStraightLineObject("frame0.k0"));
      break;
    }
    case ChartManager.DrawingTool.HoriRayLine: {
      pds.addToolObject(new CHoriRayLineObject("frame0.k0"));
      break;
    }
    case ChartManager.DrawingTool.HoriSegLine: {
      pds.addToolObject(new CHoriSegLineObject("frame0.k0"));
      break;
    }
    case ChartManager.DrawingTool.HoriStraightLine: {
      pds.addToolObject(new CHoriStraightLineObject("frame0.k0"));
      break;
    }
    case ChartManager.DrawingTool.PriceLine: {
      pds.addToolObject(new CPriceLineObject("frame0.k0"));
      break;
    }
    case ChartManager.DrawingTool.RayLine: {
      pds.addToolObject(new CRayLineObject("frame0.k0"));
      break;
    }
    case ChartManager.DrawingTool.SegLine: {
      pds.addToolObject(new CSegLineObject("frame0.k0"));
      break;
    }
    case ChartManager.DrawingTool.StraightLine: {
      pds.addToolObject(new CStraightLineObject("frame0.k0"));
      break;
    }
    case ChartManager.DrawingTool.TriParallelLine: {
      pds.addToolObject(new CTriParallelLineObject("frame0.k0"));
      break;
    }
    case ChartManager.DrawingTool.VertiStraightLine: {
      pds.addToolObject(new CVertiStraightLineObject("frame0.k0"));
      break;
    }
  }
};
ChartManager.prototype.getTitle = function (dsName) {
  return this._titles[dsName];
};
ChartManager.prototype.setTitle = function (dsName, title) {
  this._titles[dsName] = title;
};
ChartManager.prototype.setCurrentDataSource = function (dsName, dsAlias) {
  var cached = this.getCachedDataSource(dsAlias);
  if (cached != null) {
    this.setDataSource(dsName, cached, true);
  } else {
    var ds = this.getDataSource(dsName);
    if (ds != null) {
      if (is_instance(ds, MainDataSource)) {
        cached = new MainDataSource(dsAlias);
      } else if (is_instance(ds, CLiveOrderDataSource)) {
        cached = new CLiveOrderDataSource(dsAlias);
      } else if (is_instance(ds, CLiveTradeDataSource)) {
        cached = new CLiveTradeDataSource(dsAlias);
      }
      this.setDataSource(dsName, cached, true);
      this.setCachedDataSource(dsAlias, cached);
    }
  }
};
ChartManager.prototype.getDataSource = function (name) {
  return this._dataSources[name];
};
ChartManager.prototype.setDataSource = function (name, ds, forceRefresh) {
  this._dataSources[name] = ds;
  if (forceRefresh) {
    this.updateData(name, null);
  }
};
ChartManager.prototype.getCachedDataSource = function (name) {
  return this._dataSourceCache[name];
};
ChartManager.prototype.setCachedDataSource = function (name, ds) {
  this._dataSourceCache[name] = ds;
};
ChartManager.prototype.getDataProvider = function (name) {
  return this._dataProviders[name];
};
ChartManager.prototype.setDataProvider = function (name, dp) {
  this._dataProviders[name] = dp;
};
ChartManager.prototype.removeDataProvider = function (name) {
  delete this._dataProviders[name];
};
ChartManager.prototype.getFrame = function (name) {
  return this._frames[name];
};
ChartManager.prototype.setFrame = function (name, frame) {
  this._frames[name] = frame;
};
ChartManager.prototype.removeFrame = function (name) {
  delete this._frames[name];
};
ChartManager.prototype.getArea = function (name) {
  return this._areas[name];
};
ChartManager.prototype.setArea = function (name, area) {
  this._areas[name] = area;
};
ChartManager.prototype.removeArea = function (name) {
  delete this._areas[name];
};
ChartManager.prototype.getTimeline = function (name) {
  return this._timelines[name];
};
ChartManager.prototype.setTimeline = function (name, timeline) {
  this._timelines[name] = timeline;
};
ChartManager.prototype.removeTimeline = function (name) {
  delete this._timelines[name];
};
ChartManager.prototype.getRange = function (name) {
  return this._ranges[name];
};
ChartManager.prototype.setRange = function (name, range) {
  this._ranges[name] = range;
};
ChartManager.prototype.removeRange = function (name) {
  delete this._ranges[name];
};
ChartManager.prototype.getPlotter = function (name) {
  return this._plotters[name];
};
ChartManager.prototype.setPlotter = function (name, plotter) {
  this._plotters[name] = plotter;
};
ChartManager.prototype.removePlotter = function (name) {
  delete this._plotters[name];
};
ChartManager.prototype.getTheme = function (name) {
  return this._themes[name];
};
ChartManager.prototype.setTheme = function (name, theme) {
  this._themes[name] = theme;
};
ChartManager.prototype.getFrameMousePos = function (name, point) {
  if (this._frameMousePos[name] != undefined) {
    point.x = this._frameMousePos[name].x;
    point.y = this._frameMousePos[name].y;
  } else {
    point.x = -1;
    point.y = -1;
  }
};
ChartManager.prototype.setFrameMousePos = function (name, px, py) {
  this._frameMousePos[name] = {x: px, y: py};
};
ChartManager.prototype.drawArea = function (context, area, plotterNames) {
  var areaName = area.getNameObject().getCompAt(2);
  if (areaName == "timeline") {
    if (area.getHeight() < 20) {
      return;
    }
  } else {
    if (area.getHeight() < 30) {
      return;
    }
  }
  if (area.getWidth() < 30) {
    return;
  }
  areaName = area.getName();
  var plotter;
  var i, cnt = plotterNames.length;
  for (i = 0; i < cnt; i++) {
    plotter = this._plotters[areaName + plotterNames[i]];
    if (plotter != undefined) {
      plotter.Draw(context);
    }
  }
};
ChartManager.prototype.drawAreaMain = function (context, area) {
  var ds = this._dataSources[area.getDataSourceName()];
  var plotterNames;
  if (ds.getDataCount() < 1) {
    plotterNames = [".background"];
  } else {
    plotterNames = [".background", ".grid", ".main", ".secondary"];
  }
  this.drawArea(context, area, plotterNames);
  area.setChanged(false);
};
ChartManager.prototype.drawAreaOverlay = function (context, area) {
  var ds = this._dataSources[area.getDataSourceName()];
  var plotterNames;
  if (ds.getDataCount() < 1) {
    plotterNames = [".selection"];
  } else {
    plotterNames = [".decoration", ".selection", ".info", ".tool"];
  }
  this.drawArea(context, area, plotterNames);
};

ChartManager.prototype.drawMain = function (frameName, context) {
  drawn = false;
  if (!drawn) {
    for (var it in this._areas) {
      if (this._areas[it].getFrameName() == frameName && !is_instance(this._areas[it], ChartAreaGroup)) {
        this.drawAreaMain(context, this._areas[it]);
      }
    }
  }
  var e;
  for (var i in this._timelines) {
    e = this._timelines[i];
    if (e.getFrameName() == frameName) {
      e.setUpdated(false);
    }
  }
  for (var i in this._ranges) {
    e = this._ranges[i];
    if (e.getFrameName() == frameName) {
      e.setUpdated(false);
    }
  }
  for (var i in this._areas) {
    e = this._areas[i];
    if (e.getFrameName() == frameName) {
      e.setChanged(false);
    }
  }
};
ChartManager.prototype.drawOverlay = function (frameName, context) {
  for (var n in this._areas) {
    var area = this._areas[n];
    if (is_instance(area, ChartAreaGroup)) {
      if (area.getFrameName() == frameName) {
        area.drawGrid(context);
      }
    }
  }
  for (var n in this._areas) {
    var area = this._areas[n];
    if (is_instance(area, ChartAreaGroup) == false) {
      if (area.getFrameName() == frameName) {
        this.drawAreaOverlay(context, area);
      }
    }
  }
};
ChartManager.prototype.updateData = function (dsName, data) {
  var ds = this.getDataSource(dsName);
  if (ds == undefined) {
    return;
  }
  if (data != null) {
    var flag = ds.update(data);
    if (!flag) {
      return false;
    }
    if (ds.getUpdateMode() == DataSource.UpdateMode.DoNothing) {
      return true;
    }
  } else {
    ds.setUpdateMode(DataSource.UpdateMode.Refresh);
  }
  var timeline = this.getTimeline(dsName);
  if (timeline != undefined) {
    timeline.update();
  }
  if (ds.getDataCount() < 1) {
    return true;
  }
  var dpNames = [".main", ".secondary"];
  var area, areaName;
  for (var n in this._areas) {
    area = this._areas[n];
    if (is_instance(area, ChartAreaGroup)) {
      continue;
    }
    if (area.getDataSourceName() != dsName) {
      continue;
    }
    areaName = area.getName();
    for (var i = 0; i < dpNames.length; i++) {
      var dp = this.getDataProvider(areaName + dpNames[i]);
      if (dp != undefined) {
        dp.updateData();
      }
    }
  }
  return true;
};
ChartManager.prototype.updateRange = function (dsName) {
  var ds = this.getDataSource(dsName);
  if (ds.getDataCount() < 1) {
    return;
  }
  var dpNames = [".main", ".secondary"];
  var area, areaName;
  for (var n in this._areas) {
    area = this._areas[n];
    if (is_instance(area, ChartAreaGroup)) {
      continue;
    }
    if (area.getDataSourceName() != dsName) {
      continue;
    }
    areaName = area.getName();
    for (var i = 0; i < dpNames.length; i++) {
      var dp = this.getDataProvider(areaName + dpNames[i]);
      if (dp != undefined) {
        dp.updateRange();
      }
    }
    var timeline = this.getTimeline(dsName);
    if (timeline != undefined && timeline.getMaxItemCount() > 0) {
      var range = this.getRange(areaName);
      if (range != undefined) {
        range.update();
      }
    }
  }
};
ChartManager.prototype.layout = function (context, frameName, left, top, right, bottom) {
  var frame = this.getFrame(frameName);
  frame.measure(context, right - left, bottom - top);
  frame.layout(left, top, right, bottom);
  for (var n in this._timelines) {
    var e = this._timelines[n];
    if (e.getFrameName() == frameName) {
      e.onLayout();
    }
  }
  for (var n in this._dataSources) {
    if (n.substring(0, frameName.length) == frameName) {
      this.updateRange(n);
    }
  }
};
ChartManager.prototype.SelectRange = function (pArea, y) {
  var it;
  for (var ee in this._ranges) {
    var _1 = this._ranges[ee].getAreaName();
    var _2 = pArea.getName();
    if (_1 == _2) {
      this._ranges[ee].selectAt(y);
    } else {
      this._ranges[ee].unselect();
    }
  }
};
ChartManager.prototype.scale = function (s) {
  if (this._highlightedFrame == null) {
    return;
  }
  var hiArea = this._highlightedFrame.getHighlightedArea();
  if (this.getRange(hiArea.getName()) != undefined) {
    var dsName = hiArea.getDataSourceName();
    var timeline = this.getTimeline(dsName);
    if (timeline != null) {
      timeline.scale(s);
      this.updateRange(dsName);
    }
  }
};
ChartManager.prototype.showCursor = function (cursor) {
  if (cursor === undefined) {
    cursor = 'default';
  }
  this._mainCanvas.style.cursor = cursor;
  this._overlayCanvas.style.cursor = cursor;
};
ChartManager.prototype.hideCursor = function () {
  this._mainCanvas.style.cursor = 'none';
  this._overlayCanvas.style.cursor = 'none';
};
ChartManager.prototype.showCrossCursor = function (area, x, y) {
  var e = this.getRange(area.getName());
  if (e != undefined) {
    e.selectAt(y);
    e = this.getTimeline(area.getDataSourceName());
    if (e != undefined) {
      if (e.selectAt(x)) {
        return true;
      }
    }
  }
  return false;
};
ChartManager.prototype.hideCrossCursor = function (exceptTimeline) {
  if (exceptTimeline != null) {
    for (var n in this._timelines) {
      var e = this._timelines[n];
      if (e != exceptTimeline) {
        e.unselect();
      }
    }
  } else {
    for (var n in this._timelines) {
      this._timelines[n].unselect();
    }
  }
  for (var n in this._ranges) {
    this._ranges[n].unselect();
  }
};
ChartManager.prototype.clearHighlight = function () {
  if (this._highlightedFrame != null) {
    this._highlightedFrame.highlight(null);
    this._highlightedFrame = null;
  }
};
ChartManager.prototype.onToolMouseMove = function (frameName, x, y) {
  var ret = false;
  frameName += ".";
  for (var n in this._dataSources) {
    if (n.indexOf(frameName) == 0) {
      var ds = this._dataSources[n];
      if (is_instance(ds, MainDataSource)) {
        if (ds.toolManager.acceptMouseMoveEvent(x, y)) {
          ret = true;
        }
      }
    }
  }
  return ret;
};
ChartManager.prototype.onToolMouseDown = function (frameName, x, y) {
  var ret = false;
  frameName += ".";
  for (var n in this._dataSources) {
    if (n.indexOf(frameName) == 0) {
      var ds = this._dataSources[n];
      if (is_instance(ds, MainDataSource)) {
        if (ds.toolManager.acceptMouseDownEvent(x, y)) {
          ret = true;
        }
      }
    }
  }
  return ret;
};
ChartManager.prototype.onToolMouseUp = function (frameName, x, y) {
  var ret = false;
  frameName += ".";
  for (var n in this._dataSources) {
    if (n.indexOf(frameName) == 0) {
      var ds = this._dataSources[n];
      if (is_instance(ds, MainDataSource)) {
        if (ds.toolManager.acceptMouseUpEvent(x, y)) {
          ret = true;
        }
      }
    }
  }
  return ret;
};
ChartManager.prototype.onToolMouseDrag = function (frameName, x, y) {
  var ret = false;
  frameName += ".";
  for (var n in this._dataSources) {
    if (n.indexOf(frameName) == 0) {
      var ds = this._dataSources[n];
      if (is_instance(ds, MainDataSource)) {
        if (ds.toolManager.acceptMouseDownMoveEvent(x, y)) {
          ret = true;
        }
      }
    }
  }
  return ret;
};
ChartManager.prototype.onMouseMove = function (frameName, x, y, drag) {
  var frame = this.getFrame(frameName);
  if (frame === undefined) {
    return;
  }
  this.setFrameMousePos(frameName, x, y);
  this.hideCrossCursor();
  if (this._highlightedFrame != frame) {
    this.clearHighlight();
  }
  if (this._capturingMouseArea != null) {
    this._capturingMouseArea.onMouseMove(x, y);
    return;
  }
  var areas = frame.contains(x, y);
  if (areas == null) {
    return;
  }
  var a, i, cnt = areas.length;
  for (i = cnt - 1; i >= 0; i--) {
    a = areas[i];
    a = a.onMouseMove(x, y);
    if (a != null) {
      if (!is_instance(a, ChartAreaGroup)) {
        frame.highlight(a);
        this._highlightedFrame = frame;
      }
      return;
    }
  }
};
ChartManager.prototype.onMouseLeave = function (frameName, x, y, move) {
  var frame = this.getFrame(frameName);
  if (frame == undefined) {
    return;
  }
  this.setFrameMousePos(frameName, x, y);
  this.hideCrossCursor();
  this.clearHighlight();
  if (this._capturingMouseArea != null) {
    this._capturingMouseArea.onMouseLeave(x, y);
    this._capturingMouseArea = null;
  }
  this._dragStarted = false;
};
ChartManager.prototype.onMouseDown = function (frameName, x, y) {
  var frame = this.getFrame(frameName);
  if (frame == undefined) {
    return;
  }
  var areas = frame.contains(x, y);
  if (areas == null) {
    return;
  }
  var a, i, cnt = areas.length;
  for (i = cnt - 1; i >= 0; i--) {
    a = areas[i];
    a = a.onMouseDown(x, y);
    if (a != null) {
      this._capturingMouseArea = a;
      return;
    }
  }
};
ChartManager.prototype.onMouseUp = function (frameName, x, y) {
  var frame = this.getFrame(frameName);
  if (frame == undefined) {
    return;
  }
  if (this._capturingMouseArea) {
    if (this._capturingMouseArea.onMouseUp(x, y) == null && this._dragStarted == false) {
      if (this._selectedFrame != null && this._selectedFrame != frame) {
        this._selectedFrame.select(null);
      }
      if (this._capturingMouseArea.isSelected()) {
        if (!this._captureMouseWheelDirectly) {
          $(this._overlayCanvas).unbind('mousewheel');
        }
        frame.select(null);
        this._selectedFrame = null;
      } else {
        if (this._selectedFrame != frame) {
          if (!this._captureMouseWheelDirectly) {
            $(this._overlayCanvas).bind('mousewheel', mouseWheel);
          }
        }
        frame.select(this._capturingMouseArea);
        this._selectedFrame = frame;
      }
    }
    this._capturingMouseArea = null;
    this._dragStarted = false;
  }
};
ChartManager.prototype.deleteToolObject = function () {
  var pDPTool = this.getDataSource("frame0.k0");
  var selectObject = pDPTool.getSelectToolObjcet();
  if (selectObject != null) {
    pDPTool.delSelectToolObject();
  }
  var currentObject = pDPTool.getCurrentToolObject();
  if (currentObject != null && currentObject.getState() != CToolObject.state.AfterDraw) {
    pDPTool.delToolObject();
  }
  this.setNormalMode();
};
ChartManager.prototype.unloadTemplate = function (frameName) {
  var frame = this.getFrame(frameName);
  if (frame == undefined) {
    return;
  }
  for (var n in this._dataSources) {
    if (n.match(frameName + ".")) {
      delete this._dataSources[n];
    }
  }
  for (var n in this._dataProviders) {
    if (this._dataProviders[n].getFrameName() == frameName) {
      delete this._dataProviders[n];
    }
  }
  delete this._frames[frameName];
  for (var n in this._areas) {
    if (this._areas[n].getFrameName() == frameName) {
      delete this._areas[n];
    }
  }
  for (var n in this._timelines) {
    if (this._timelines[n].getFrameName() == frameName) {
      delete this._timelines[n];
    }
  }
  for (var n in this._ranges) {
    if (this._ranges[n].getFrameName() == frameName) {
      delete this._ranges[n];
    }
  }
  for (var n in this._plotters) {
    if (this._plotters[n].getFrameName() == frameName) {
      delete this._plotters[n];
    }
  }
  delete this._themes[frameName];
  delete this._frameMousePos[frameName];
};
ChartManager.prototype.createIndicatorAndRange = function (areaName, indicName, notLoadSettings) {
  var indic, range;
  switch (indicName) {
    case "MA":
      indic = new MAIndicator();
      range = new PositiveRange(areaName);
      break;
    case "EMA":
      indic = new EMAIndicator();
      range = new PositiveRange(areaName);
      break;
    case "VOLUME":
      indic = new VOLUMEIndicator();
      range = new ZeroBasedPositiveRange(areaName);
      break;
    case "MACD":
      indic = new MACDIndicator();
      range = new ZeroCenteredRange(areaName);
      break;
    case "DMI":
      indic = new DMIIndicator();
      range = new PercentageRange(areaName);
      break;
    case "DMA":
      indic = new DMAIndicator();
      range = new Range(areaName);
      break;
    case "TRIX":
      indic = new TRIXIndicator();
      range = new Range(areaName);
      break;
    case "BRAR":
      indic = new BRARIndicator();
      range = new Range(areaName);
      break;
    case "VR":
      indic = new VRIndicator();
      range = new Range(areaName);
      break;
    case "OBV":
      indic = new OBVIndicator();
      range = new Range(areaName);
      break;
    case "EMV":
      indic = new EMVIndicator();
      range = new Range(areaName);
      break;
    case "RSI":
      indic = new RSIIndicator();
      range = new PercentageRange(areaName);
      break;
    case "WR":
      indic = new WRIndicator();
      range = new PercentageRange(areaName);
      break;
    case "SAR":
      indic = new SARIndicator();
      range = new PositiveRange(areaName);
      break;
    case "KDJ":
      indic = new KDJIndicator();
      range = new PercentageRange(areaName);
      break;
    case "ROC":
      indic = new ROCIndicator();
      range = new Range(areaName);
      break;
    case "MTM":
      indic = new MTMIndicator();
      range = new Range(areaName);
      break;
    case "BOLL":
      indic = new BOLLIndicator();
      range = new Range(areaName);
      break;
    case "PSY":
      indic = new PSYIndicator();
      range = new Range(areaName);
      break;
    case "StochRSI":
      indic = new STOCHRSIIndicator();
      range = new PercentageRange(areaName);
      break;
    default:
      return null;
  }
  if (!notLoadSettings) {
    indic.setParameters(ChartSettings.get().indics[indicName]);
  }
  return {"indic": indic, "range": range};
};
ChartManager.prototype.setMainIndicator = function (dsName, indicName) {
  var areaName = dsName + ".main";
  var dp = this.getDataProvider(areaName + ".main");
  if (dp == undefined || !is_instance(dp, MainDataProvider)) {
    return false;
  }
  var indic;
  switch (indicName) {
    case "MA":
      indic = new MAIndicator();
      break;
    case "EMA":
      indic = new EMAIndicator();
      break;
    case "BOLL":
      indic = new BOLLIndicator();
      break;
    case "SAR":
      indic = new SARIndicator();
      break;
    default:
      return false;
  }
  indic.setParameters(ChartSettings.get().indics[indicName]);
  var indicDpName = areaName + ".secondary";
  var indicDp = this.getDataProvider(indicDpName);
  if (indicDp == undefined) {
    indicDp = new IndicatorDataProvider(indicDpName);
    this.setDataProvider(indicDp.getName(), indicDp);
  }
  indicDp.setIndicator(indic);
  var plotter = this.getPlotter(indicDpName);
  if (plotter == undefined) {
    plotter = new IndicatorPlotter(indicDpName);
    this.setPlotter(plotter.getName(), plotter);
  }
  this.getArea(areaName).setChanged(true);
  return true;
};
ChartManager.prototype.setIndicator = function (areaName, indicName) {
  var area = this.getArea(areaName);
  if (area == undefined || area.getNameObject().getCompAt(2) == "main") {
    return false;
  }
  var dp = this.getDataProvider(areaName + ".secondary");
  if (dp == undefined || !is_instance(dp, IndicatorDataProvider)) {
    return false;
  }
  var ret = this.createIndicatorAndRange(areaName, indicName);
  if (ret == null) {
    return false;
  }
  var indic = ret.indic;
  var range = ret.range;
  this.removeDataProvider(areaName + ".main");
  this.removePlotter(areaName + ".main");
  this.removeRange(areaName);
  this.removePlotter(areaName + "Range.decoration");
  dp.setIndicator(indic);
  this.setRange(areaName, range);
  range.setPaddingTop(20);
  range.setPaddingBottom(4);
  range.setMinInterval(20);
  if (is_instance(indic, VOLUMEIndicator)) {
    var plotter = new LastVolumePlotter(areaName + "Range.decoration");
    this.setPlotter(plotter.getName(), plotter);
  } else if (is_instance(indic, BOLLIndicator) || is_instance(indic, SARIndicator)) {
    var dp = new MainDataProvider(areaName + ".main");
    this.setDataProvider(dp.getName(), dp);
    dp.updateData();
    var plotter = new OHLCPlotter(areaName + ".main");
    this.setPlotter(plotter.getName(), plotter);
  }
  return true;
};
ChartManager.prototype.removeMainIndicator = function (dsName) {
  var areaName = dsName + ".main";
  var indicDpName = areaName + ".secondary";
  var indicDp = this.getDataProvider(indicDpName);
  if (indicDp == undefined || !is_instance(indicDp, IndicatorDataProvider)) {
    return;
  }
  this.removeDataProvider(indicDpName);
  this.removePlotter(indicDpName);
  this.getArea(areaName).setChanged(true);
};
ChartManager.prototype.removeIndicator = function (areaName) {
  var area = this.getArea(areaName);
  if (area == undefined || area.getNameObject().getCompAt(2) == "main") {
    return;
  }
  var dp = this.getDataProvider(areaName + ".secondary");
  if (dp == undefined || !is_instance(dp, IndicatorDataProvider)) {
    return;
  }
  var rangeAreaName = areaName + "Range";
  var rangeArea = this.getArea(rangeAreaName);
  if (rangeArea == undefined) {
    return;
  }
  var tableLayout = this.getArea(area.getDataSourceName() + ".charts");
  if (tableLayout == undefined) {
    return;
  }
  tableLayout.removeArea(area);
  this.removeArea(areaName);
  tableLayout.removeArea(rangeArea);
  this.removeArea(rangeAreaName);
  for (var n in this._dataProviders) {
    if (this._dataProviders[n].getAreaName() == areaName) {
      this.removeDataProvider(n);
    }
  }
  for (var n in this._ranges) {
    if (this._ranges[n].getAreaName() == areaName) {
      this.removeRange(n);
    }
  }
  for (var n in this._plotters) {
    if (this._plotters[n].getAreaName() == areaName) {
      this.removePlotter(n);
    }
  }
  for (var n in this._plotters) {
    if (this._plotters[n].getAreaName() == rangeAreaName) {
      this.removePlotter(n);
    }
  }
};
/**
 * getIndicatorParameters
 *     获取指标的ParamExpr数组
 * @param indicName
 * @returns {*}
 */
ChartManager.prototype.getIndicatorParameters = function (indicName) {
  var indic = this._fakeIndicators[indicName];
  if (indic == undefined) {
    var ret = this.createIndicatorAndRange("", indicName);
    if (ret == null) {
      return null;
    }
    this._fakeIndicators[indicName] = indic = ret.indic;
  }
  var params = [];
  var i, cnt = indic.getParameterCount();
  for (i = 0; i < cnt; i++) {
    params.push(indic.getParameterAt(i));
  }
  return params;
};
ChartManager.prototype.setIndicatorParameters = function (indicName, params) {
  var n, indic;
  for (n in this._dataProviders) {
    var dp = this._dataProviders[n];
    if (is_instance(dp, IndicatorDataProvider) == false) {
      continue;
    }
    indic = dp.getIndicator();
    if (indic.getName() == indicName) {
      indic.setParameters(params);
      dp.refresh();
      this.getArea(dp.getAreaName()).setChanged(true);
    }
  }
  indic = this._fakeIndicators[indicName];
  if (indic == undefined) {
    var ret = this.createIndicatorAndRange("", indicName, true);
    if (ret == null) {
      return;
    }
    this._fakeIndicators[indicName] = indic = ret.indic;
  }
  indic.setParameters(params);
};
ChartManager.prototype.getIndicatorAreaName = function (dsName, index) {
  var tableLayout = this.getArea(dsName + ".charts");
  var cnt = tableLayout.getAreaCount() >> 1;
  if (index < 0 || index >= cnt) {
    return "";
  }
  return tableLayout.getAreaAt(index << 1).getName();
};
var Timeline = create_class(NamedObject);
Timeline._ItemWidth = [1, 3, 3, 5, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29];
Timeline._SpaceWidth = [1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 7, 7, 7];
Timeline.PADDING_LEFT = 4;
Timeline.PADDING_RIGHT = 8;
Timeline.prototype.__construct = function (name) {
  Timeline.__super.__construct.call(this, name);
  this._updated = false;
  this._innerLeft = 0;
  this._innerWidth = 0;
  this._firstColumnLeft = 0;
  this._scale = 3;
  this._lastScale = -1;
  this._maxItemCount = 0;
  this._maxIndex = 0;
  this._firstIndex = -1;
  this._selectedIndex = -1;
  this._savedFirstIndex = -1;
};
Timeline.prototype.isLatestShown = function () {
  return this.getLastIndex() == this._maxIndex;
};
Timeline.prototype.isUpdated = function () {
  return this._updated;
};
Timeline.prototype.setUpdated = function (v) {
  this._updated = v;
};
Timeline.prototype.getItemWidth = function () {
  return Timeline._ItemWidth[this._scale];
};
Timeline.prototype.getSpaceWidth = function () {
  return Timeline._SpaceWidth[this._scale];
};
Timeline.prototype.getColumnWidth = function () {
  return this.getSpaceWidth() + this.getItemWidth();
};
Timeline.prototype.getInnerWidth = function () {
  return this._innerWidth;
};
Timeline.prototype.getItemLeftOffset = function () {
  return this.getSpaceWidth();
};
Timeline.prototype.getItemCenterOffset = function () {
  return this.getSpaceWidth() + (this.getItemWidth() >> 1);
};
Timeline.prototype.getFirstColumnLeft = function () {
  return this._firstColumnLeft;
};
Timeline.prototype.getMaxItemCount = function () {
  return this._maxItemCount;
};
Timeline.prototype.getFirstIndex = function () {
  return this._firstIndex;
};
Timeline.prototype.getLastIndex = function () {
  return Math.min(this._firstIndex + this._maxItemCount, this._maxIndex);
};
Timeline.prototype.getSelectedIndex = function () {
  return this._selectedIndex;
};
Timeline.prototype.getMaxIndex = function () {
  return this._maxIndex;
};
Timeline.prototype.calcColumnCount = function (w) {
  return Math.floor(w / this.getColumnWidth()) << 0;
};
Timeline.prototype.calcFirstColumnLeft = function (maxItemCount) {
  return this._innerLeft + this._innerWidth - (this.getColumnWidth() * maxItemCount);
};
Timeline.prototype.calcFirstIndexAlignRight = function (oldFirstIndex, oldMaxItemCount, newMaxItemCount) {
  return Math.max(0, oldFirstIndex + Math.max(oldMaxItemCount, 1) - Math.max(newMaxItemCount, 1));
};
Timeline.prototype.calcFirstIndex = function (newMaxItemCount) {
  return this.validateFirstIndex(this.calcFirstIndexAlignRight(this._firstIndex, this._maxItemCount, newMaxItemCount), newMaxItemCount);
};
Timeline.prototype.updateMaxItemCount = function () {
  var newMaxItemCount = this.calcColumnCount(this._innerWidth);
  var newFirstIndex;
  if (this._maxItemCount < 1) {
    newFirstIndex = this.calcFirstIndex(newMaxItemCount);
  } else if (this._lastScale == this._scale) {
    newFirstIndex = this.validateFirstIndex(this._firstIndex - (newMaxItemCount - this._maxItemCount));
  } else {
    var focusedIndex = (this._selectedIndex >= 0) ? this._selectedIndex : this.getLastIndex() - 1;
    newFirstIndex = this.validateFirstIndex(focusedIndex -
      Math.round((focusedIndex - this._firstIndex) * newMaxItemCount / this._maxItemCount));
  }
  this._lastScale = this._scale;
  if (this._firstIndex != newFirstIndex) {
    if (this._selectedIndex == this._firstIndex) {
      this._selectedIndex = newFirstIndex;
    }
    this._firstIndex = newFirstIndex;
    this._updated = true;
  }
  if (this._maxItemCount != newMaxItemCount) {
    this._maxItemCount = newMaxItemCount;
    this._updated = true;
  }
  this._firstColumnLeft = this.calcFirstColumnLeft(newMaxItemCount);
};
Timeline.prototype.validateFirstIndex = function (firstIndex, maxItemCount) {
  if (this._maxIndex < 1) {
    return -1;
  }
  if (firstIndex < 0) {
    return 0;
  }
  var lastFirst = Math.max(0, this._maxIndex - 1/*maxItemCount*/);
  if (firstIndex > lastFirst) {
    return lastFirst;
  }
  return firstIndex;
};
Timeline.prototype.validateSelectedIndex = function () {
  if (this._selectedIndex < this._firstIndex) {
    this._selectedIndex = -1;
  } else if (this._selectedIndex >= this.getLastIndex()) {
    this._selectedIndex = -1;
  }
};
Timeline.prototype.onLayout = function () {
  var mgr = ChartManager.getInstance();
  var area = mgr.getArea(this.getDataSourceName() + ".main");
  if (area != null) {
    this._innerLeft = area.getLeft() + Timeline.PADDING_LEFT;
    var w = Math.max(0, area.getWidth() - (Timeline.PADDING_LEFT + Timeline.PADDING_RIGHT));
    if (this._innerWidth != w) {
      this._innerWidth = w;
      this.updateMaxItemCount();
    }
  }
};
Timeline.prototype.toIndex = function (x) {
  return this._firstIndex + this.calcColumnCount(x - this._firstColumnLeft);
};
Timeline.prototype.toColumnLeft = function (index) {
  return this._firstColumnLeft + (this.getColumnWidth() * (index - this._firstIndex));
};
Timeline.prototype.toItemLeft = function (index) {
  return this.toColumnLeft(index) + this.getItemLeftOffset();
};
Timeline.prototype.toItemCenter = function (index) {
  return this.toColumnLeft(index) + this.getItemCenterOffset();
};
Timeline.prototype.selectAt = function (x) {
  this._selectedIndex = this.toIndex(x);
  this.validateSelectedIndex();
  return (this._selectedIndex >= 0);
};
Timeline.prototype.unselect = function () {
  this._selectedIndex = -1;
};
Timeline.prototype.update = function () {
  var mgr = ChartManager.getInstance();
  var ds = mgr.getDataSource(this.getDataSourceName());
  var oldMaxIndex = this._maxIndex;
  this._maxIndex = ds.getDataCount();
  switch (ds.getUpdateMode()) {
    case DataSource.UpdateMode.Refresh:
      if (this._maxIndex < 1) {
        this._firstIndex = -1;
      } else {
        this._firstIndex = Math.max(this._maxIndex - this._maxItemCount, 0);
      }
      this._selectedIndex = -1;
      this._updated = true;
      break;
    case DataSource.UpdateMode.Append:
      var lastIndex = this.getLastIndex();
      var erasedCount = ds.getErasedCount();
      if (lastIndex < oldMaxIndex) {
        if (erasedCount > 0) {
          this._firstIndex = Math.max(this._firstIndex - erasedCount, 0);
          if (this._selectedIndex >= 0) {
            this._selectedIndex -= erasedCount;
            this.validateSelectedIndex();
          }
          this._updated = true;
        }
      } else if (lastIndex == oldMaxIndex) {
        this._firstIndex += (this._maxIndex - oldMaxIndex);
        if (this._selectedIndex >= 0) {
          this._selectedIndex -= erasedCount;
          this.validateSelectedIndex();
        }
        this._updated = true;
      }
      break;
  }
};
Timeline.prototype.move = function (x) {
  if (this.isLatestShown()) {
    ChartManager.getInstance().getArea(this.getDataSourceName() + ".mainRange").setChanged(true);
  }
  this._firstIndex = this.validateFirstIndex(this._savedFirstIndex - this.calcColumnCount(x), this._maxItemCount);
  this._updated = true;
  if (this._selectedIndex >= 0) {
    this.validateSelectedIndex();
  }
};
Timeline.prototype.startMove = function () {
  this._savedFirstIndex = this._firstIndex;
};
Timeline.prototype.scale = function (s) {
  this._scale += s;
  if (this._scale < 0) {
    this._scale = 0;
  } else if (this._scale >= Timeline._ItemWidth.length) {
    this._scale = Timeline._ItemWidth.length - 1;
  }
  this.updateMaxItemCount();
  if (this._selectedIndex >= 0) {
    this.validateSelectedIndex();
  }
};
var Range = create_class(NamedObject);
Range.prototype.__construct = function (name) {
  Range.__super.__construct.call(this, name);
  this._updated = true;
  this._minValue = Number.MAX_VALUE;
  this._maxValue = -Number.MAX_VALUE;
  this._outerMinValue = Number.MAX_VALUE;
  this._outerMaxValue = -Number.MAX_VALUE;
  this._ratio = 0;
  this._top = 0;
  this._bottom = 0;
  this._paddingTop = 0;
  this._paddingBottom = 0;
  this._minInterval = 36;
  this._selectedPosition = -1;
  this._selectedValue = -Number.MAX_VALUE;
  this._gradations = [];
};
Range.prototype.isUpdated = function () {
  return this._updated;
};
Range.prototype.setUpdated = function (v) {
  this._updated = v;
};
Range.prototype.getMinValue = function () {
  return this._minValue;
};
Range.prototype.getMaxValue = function () {
  return this._maxValue;
};
Range.prototype.getRange = function () {
  return this._maxValue - this._minValue;
};
Range.prototype.getOuterMinValue = function () {
  return this._outerMinValue;
};
Range.prototype.getOuterMaxValue = function () {
  return this._outerMaxValue;
};
Range.prototype.getOuterRange = function () {
  return this._outerMaxValue - this._outerMinValue;
};
Range.prototype.getHeight = function () {
  return Math.max(0, this._bottom - this._top);
};
Range.prototype.getGradations = function () {
  return this._gradations;
};
Range.prototype.getMinInterval = function () {
  return this._minInterval;
};
Range.prototype.setMinInterval = function (v) {
  this._minInterval = v;
};
Range.prototype.getSelectedPosition = function () {
  if (this._selectedPosition >= 0) {
    return this._selectedPosition;
  }
  if (this._selectedValue > -Number.MAX_VALUE) {
    return this.toY(this._selectedValue);
  }
  return -1;
};
Range.prototype.getSelectedValue = function () {
  if (this._selectedValue > -Number.MAX_VALUE) {
    return this._selectedValue;
  }
  var mgr = ChartManager.getInstance();
  var area = mgr.getArea(this.getAreaName());
  if (area == null) {
    return -Number.MAX_VALUE;
  }
  if (this._selectedPosition < area.getTop() + 12 || this._selectedPosition >= area.getBottom() - 4) {
    return -Number.MAX_VALUE;
  }
  return this.toValue(this._selectedPosition);
};
Range.prototype.setPaddingTop = function (p) {
  this._paddingTop = p;
};
Range.prototype.setPaddingBottom = function (p) {
  this._paddingBottom = p;
};
Range.prototype.toValue = function (y) {
  return this._maxValue - (y - this._top) / this._ratio;
};
Range.prototype.toY = function (value) {
  if (this._ratio > 0) {
    return this._top + Math.floor((this._maxValue - value) * this._ratio + 0.5);
  }
  return this._top;
};
Range.prototype.toHeight = function (value) {
  return Math.floor(value * this._ratio + 1.5);
};
Range.prototype.update = function () {
  var min = Number.MAX_VALUE;
  var max = -Number.MAX_VALUE;
  var mgr = ChartManager.getInstance();
  var dp, dpNames = [".main", ".secondary"];
  for (var i = 0; i < dpNames.length; i++) {
    dp = mgr.getDataProvider(this.getName() + dpNames[i]);
    if (dp != null) {
      min = Math.min(min, dp.getMinValue());
      max = Math.max(max, dp.getMaxValue());
    }
  }
  var r = {"min": min, "max": max};
  this.preSetRange(r);
  this.setRange(r.min, r.max);
};
Range.prototype.select = function (v) {
  this._selectedValue = v;
  this._selectedPosition = -1;
};
Range.prototype.selectAt = function (y) {
  this._selectedPosition = y;
  this._selectedValue = -Number.MAX_VALUE;
};
Range.prototype.unselect = function () {
  this._selectedPosition = -1;
  this._selectedValue = -Number.MAX_VALUE;
};
Range.prototype.preSetRange = function (r) {
  if (r.min == r.max) {
    r.min = -1.0;
    r.max = 1.0;
  }
};
Range.prototype.setRange = function (minValue, maxValue) {
  var mgr = ChartManager.getInstance();
  var area = mgr.getArea(this.getAreaName());
  if (this._minValue == minValue && this._maxValue == maxValue && !area.isChanged()) {
    return;
  }
  this._updated = true;
  this._minValue = minValue;
  this._maxValue = maxValue;
  this._gradations = [];
  var top = area.getTop() + this._paddingTop;
  var bottom = area.getBottom() - (this._paddingBottom + 1);
  if (top >= bottom) {
    this._minValue = this._maxValue;
    return;
  }
  this._top = top;
  this._bottom = bottom;
  if (this._maxValue > this._minValue) {
    this._ratio = (bottom - top) / (this._maxValue - this._minValue);
  } else {
    this._ratio = 1;
  }
  this._outerMinValue = this.toValue(area.getBottom());
  this._outerMaxValue = this.toValue(area.getTop());
  this.updateGradations();
};
Range.prototype.calcInterval = function () {
  var H = this.getHeight();
  var h = this.getMinInterval();
  if ((H / h) <= 1) {
    h = H >> 1;
  }
  var d = this.getRange();
  var i = 0;
  while (i > -2 && Math.floor(d) < d) {
    d *= 10.0;
    i--;
  }
  var m, c;
  for (; ; i++) {
    c = Math.pow(10.0, i);
    m = c;
    if (this.toHeight(m) > h) {
      break;
    }
    m = 2.0 * c;
    if (this.toHeight(m) > h) {
      break;
    }
    m = 5.0 * c;
    if (this.toHeight(m) > h) {
      break;
    }
  }
  return m;
};
Range.prototype.updateGradations = function () {
  this._gradations = [];
  var interval = this.calcInterval();
  if (interval <= 0.0) {
    return;
  }
  var v = Math.floor(this.getMaxValue() / interval) * interval;
  do {
    this._gradations.push(v);
    v -= interval;
  } while (v > this.getMinValue());
};
var PositiveRange = create_class(Range);
PositiveRange.prototype.__construct = function (name) {
  PositiveRange.__super.__construct.call(this, name);
};
PositiveRange.prototype.preSetRange = function (r) {
  if (r.min < 0) {
    r.min = 0;
  }
  if (r.max < 0) {
    r.max = 0;
  }
};
var ZeroBasedPositiveRange = create_class(Range);
ZeroBasedPositiveRange.prototype.__construct = function (name) {
  ZeroBasedPositiveRange.__super.__construct.call(this, name);
};
ZeroBasedPositiveRange.prototype.preSetRange = function (a) {
  a.min = 0;
  if (a.max < 0) {
    a.max = 0
  }
};
var MainRange = create_class(Range);
MainRange.prototype.__construct = function (name) {
  MainRange.__super.__construct.call(this, name);
};
MainRange.prototype.preSetRange = function (r) {
  var mgr = ChartManager.getInstance();
  var timeline = mgr.getTimeline(this.getDataSourceName());
  var dIndex = timeline.getMaxIndex() - timeline.getLastIndex();
  if (dIndex < 25) {
    var ds = mgr.getDataSource(this.getDataSourceName());
    var data = ds.getDataAt(ds.getDataCount() - 1);
    var d = ((r.max - r.min) / 4) * (1 - (dIndex / 25));
    r.min = Math.min(r.min, Math.max(data.low - d, 0));
    r.max = Math.max(r.max, data.high + d);
  }
  if (r.min > 0) {
    var a = r.max / r.min;
    if (a < 1.016) {
      var m = (r.max + r.min) / 2.0;
      var c = (a - 1.0) * 1.5;
      r.max = m * (1.0 + c);
      r.min = m * (1.0 - c);
    } else if (a < 1.048) {
      var m = (r.max + r.min) / 2.0;
      r.max = m * 1.024;
      r.min = m * 0.976;
    }
  }
  if (r.min < 0) {
    r.min = 0;
  }
  if (r.max < 0) {
    r.max = 0;
  }
};
var ZeroCenteredRange = create_class(Range);
ZeroCenteredRange.prototype.__construct = function (name) {
  ZeroCenteredRange.__super.__construct.call(this, name);
};
ZeroCenteredRange.prototype.calcInterval = function (area) {
  var h = this.getMinInterval();
  if (area.getHeight() / h < 2) {
    return 0.0;
  }
  var r = this.getRange();
  var i;
  for (i = 3; ; i += 2) {
    if (this.toHeight(r / i) <= h) {
      break;
    }
  }
  i -= 2;
  return r / i;
};
ZeroCenteredRange.prototype.updateGradations = function () {
  this._gradations = [];
  var mgr = ChartManager.getInstance();
  var area = mgr.getArea(this.getAreaName());
  var interval = this.calcInterval(area);
  if (interval <= 0.0) {
    return;
  }
  var v = interval / 2.0;
  do {
    this._gradations.push(v);
    this._gradations.push(-v);
    v += interval;
  } while (v <= this.getMaxValue());
};
ZeroCenteredRange.prototype.preSetRange = function (r) {
  var abs = Math.max(Math.abs(r.min), Math.abs(r.max));
  r.min = -abs;
  r.max = abs;
};
var PercentageRange = create_class(Range);
PercentageRange.prototype.__construct = function (name) {
  PercentageRange.__super.__construct.call(this, name);
};
PercentageRange.prototype.updateGradations = function () {
  this._gradations = [];
  var mgr = ChartManager.getInstance();
  var area = mgr.getArea(this.getAreaName());
  var interval = 10.0;
  var h = Math.floor(this.toHeight(interval));
  if ((h << 2) > area.getHeight()) {
    return;
  }
  var v = Math.ceil(this.getMinValue() / interval) * interval;
  if (v == 0.0) {
    v = 0;
  }
  if ((h << 2) < 24) {
    if ((h << 1) < 8) {
      return;
    }
    do {
      if (v == 20.0 || v == 80.0) {
        this._gradations.push(v);
      }
      v += interval;
    } while (v < this.getMaxValue());
  } else {
    do {
      if (h < 8) {
        if (v == 20.0 || v == 50.0 || v == 80.0) {
          this._gradations.push(v);
        }
      } else {
        if (v == 0.0 || v == 20.0 || v == 50.0 || v == 80.0 || v == 100.0) {
          this._gradations.push(v);
        }
      }
      v += interval;
    } while (v < this.getMaxValue());
  }
};
var DataSource = create_class(NamedObject);
DataSource.prototype.__construct = function (name) {
  DataSource.__super.__construct.call(this, name);
};
DataSource.UpdateMode = {DoNothing: 0, Refresh: 1, Update: 2, Append: 3};
DataSource.prototype.getUpdateMode = function () {
  return this._updateMode;
};
DataSource.prototype.setUpdateMode = function (mode) {
  this._updateMode = mode;
};
DataSource.prototype.getCacheSize = function () {
  return 0;
};
DataSource.prototype.getDataCount = function () {
  return 0;
};
var MainDataSource = create_class(DataSource);
MainDataSource.prototype.__construct = function (name) {
  MainDataSource.__super.__construct.call(this, name);
  this._erasedCount = 0;
  this._dataItems = [];
  this._decimalDigits = 0;
  this.toolManager = new CToolManager(name);
};
MainDataSource.prototype.getCacheSize = function () {
  return this._dataItems.length;
};
MainDataSource.prototype.getDataCount = function () {
  return this._dataItems.length;
};
MainDataSource.prototype.getUpdatedCount = function () {
  return this._updatedCount;
};
MainDataSource.prototype.getAppendedCount = function () {
  return this._appendedCount;
};
MainDataSource.prototype.getErasedCount = function () {
  return this._erasedCount;
};
MainDataSource.prototype.getDecimalDigits = function () {
  return this._decimalDigits;
}
MainDataSource.prototype.calcDecimalDigits = function (v) {
  var str = "" + v;
  var i = str.indexOf('.');
  if (i < 0) {
    return 0;
  }
  return (str.length - 1) - i;
}
MainDataSource.prototype.getLastDate = function () {
  var count = this.getDataCount();
  if (count < 1) {
    return -1;
  }
  return this.getDataAt(count - 1).date;
};
MainDataSource.prototype.getDataAt = function (index) {
  return this._dataItems[index];
};
MainDataSource.prototype.update = function (c) {
  this._updatedCount = 0;
  this._appendedCount = 0;
  this._erasedCount = 0;
  var h = this._dataItems.length;
  if (h > 0) {
    var g = h - 1;// 所有数据最后一条记录
    var l = this._dataItems[g];// 当前数据、计数、最新记录条数
    var j, f, b = c.length;
    for (f = 0; f < b; f++) {
      j = c[f];// 最新数据
      if (j[0] == l.date) {
        if (l.open == j[1] && l.high == j[2] && l.low == j[3] && l.close == j[4] && l.volume == j[5]) {
          this.setUpdateMode(DataSource.UpdateMode.DoNothing)
        } else {
          this.setUpdateMode(DataSource.UpdateMode.Update);
          this._dataItems[g] = {date: j[0], open: j[1], high: j[2], low: j[3], close: j[4], volume: j[5]};
          this._updatedCount++
        }
        f++;
        if (f < b) {
          this.setUpdateMode(DataSource.UpdateMode.Append);
          for (; f < b; f++, this._appendedCount++) {
            j = c[f];
            this._dataItems.push({date: j[0], open: j[1], high: j[2], low: j[3], close: j[4], volume: j[5]})
          }
        }
        return true
      }
    }
    if (b < 1000) {
      this.setUpdateMode(DataSource.UpdateMode.DoNothing);
      return false
    }
  }
  this.setUpdateMode(DataSource.UpdateMode.Refresh);
  this._dataItems = [];
  var k, a, j, f, b = c.length;
  for (f = 0; f < b; f++) {
    j = c[f];
    for (a = 1; a <= 4; a++) {
      k = this.calcDecimalDigits(j[a]);
      if (this._decimalDigits < k) {
        this._decimalDigits = k
      }
    }
    this._dataItems.push({date: j[0], open: j[1], high: j[2], low: j[3], close: j[4], volume: j[5]})
  }
  return true;
};
MainDataSource.prototype.select = function (id) {
  this.toolManager.selecedObject = id;
};
MainDataSource.prototype.unselect = function () {
  this.toolManager.selecedObject = -1;
};
MainDataSource.prototype.addToolObject = function (toolObject) {
  this.toolManager.addToolObject(toolObject);
};
MainDataSource.prototype.delToolObject = function () {
  this.toolManager.delCurrentObject();
};
MainDataSource.prototype.getToolObject = function (index) {
  return this.toolManager.getToolObject(index);
};
MainDataSource.prototype.getToolObjectCount = function () {
  return this.toolManager.toolObjects.length;
};
MainDataSource.prototype.getCurrentToolObject = function () {
  return this.toolManager.getCurrentObject();
};
MainDataSource.prototype.getSelectToolObjcet = function () {
  return this.toolManager.getSelectedObject();
};
MainDataSource.prototype.delSelectToolObject = function () {
  this.toolManager.delSelectedObject();
};
var DataProvider = create_class(NamedObject);
DataProvider.prototype.__construct = function (name) {
  DataProvider.__super.__construct.call(this, name);
  this._minValue = 0;
  this._maxValue = 0;
  this._minValueIndex = -1;
  this._maxValueIndex = -1;
};
DataProvider.prototype.getMinValue = function () {
  return this._minValue;
};
DataProvider.prototype.getMaxValue = function () {
  return this._maxValue;
};
DataProvider.prototype.getMinValueIndex = function () {
  return this._minValueIndex;
};
DataProvider.prototype.getMaxValueIndex = function () {
  return this._maxValueIndex;
};
DataProvider.prototype.calcRange = function (firstIndexes, lastIndex, minmaxes, indexes) {
  var min = Number.MAX_VALUE;
  var max = -Number.MAX_VALUE;
  var minIndex = -1;
  var maxIndex = -1;
  var minmax = {};
  var i = lastIndex - 1;
  var n = firstIndexes.length - 1;
  for (; n >= 0; n--) {
    var first = firstIndexes[n];
    if (i < first) {
      minmaxes[n] = {"min": min, "max": max};
    } else {
      for (; i >= first; i--) {
        if (this.getMinMaxAt(i, minmax) == false) {
          continue;
        }
        if (min > minmax.min) {
          min = minmax.min;
          minIndex = i;
        }
        if (max < minmax.max) {
          max = minmax.max;
          maxIndex = i;
        }
      }
      minmaxes[n] = {"min": min, "max": max};
    }
    if (indexes != null) {
      indexes[n] = {"minIndex": minIndex, "maxIndex": maxIndex};
    }
  }
};
DataProvider.prototype.updateRange = function () {
  var mgr = ChartManager.getInstance();
  var timeline = mgr.getTimeline(this.getDataSourceName());
  var firstIndexes = [timeline.getFirstIndex()];
  var minmaxes = [{}];
  var indexes = [{}];
  this.calcRange(firstIndexes, timeline.getLastIndex(), minmaxes, indexes);
  this._minValue = minmaxes[0].min;
  this._maxValue = minmaxes[0].max;
  this._minValueIndex = indexes[0].minIndex;
  this._maxValueIndex = indexes[0].maxIndex;
};
var MainDataProvider = create_class(DataProvider);
MainDataProvider.prototype.__construct = function (name) {
  MainDataProvider.__super.__construct.call(this, name);
  this._candlestickDS = null;
};
MainDataProvider.prototype.updateData = function () {
  var mgr = ChartManager.getInstance();
  var ds = mgr.getDataSource(this.getDataSourceName());
  if (!is_instance(ds, MainDataSource)) {
    return;
  }
  this._candlestickDS = ds;
};
MainDataProvider.prototype.getMinMaxAt = function (index, minmax) {
  var data = this._candlestickDS.getDataAt(index);
  minmax.min = data.low;
  minmax.max = data.high;
  return true;
};
var IndicatorDataProvider = create_class(DataProvider);
IndicatorDataProvider.prototype.getIndicator = function () {
  return this._indicator;
};
IndicatorDataProvider.prototype.setIndicator = function (v) {
  this._indicator = v;
  this.refresh();
};
IndicatorDataProvider.prototype.refresh = function () {
  var mgr = ChartManager.getInstance();
  var ds = mgr.getDataSource(this.getDataSourceName());
  if (ds.getDataCount() < 1) {
    return;
  }
  var indic = this._indicator;
  var i, last = ds.getDataCount();
  indic.clear();
  indic.reserve(last);
  for (i = 0; i < last; i++) {
    indic.execute(ds, i);
  }
};
IndicatorDataProvider.prototype.updateData = function () {
  var mgr = ChartManager.getInstance();
  var ds = mgr.getDataSource(this.getDataSourceName());
  if (ds.getDataCount() < 1) {
    return;
  }
  var indic = this._indicator;
  var mode = ds.getUpdateMode();
  switch (mode) {
    case DataSource.UpdateMode.Refresh: {
      this.refresh();
      break;
    }
    case DataSource.UpdateMode.Append: {
      indic.reserve(ds.getAppendedCount());
    }
    case DataSource.UpdateMode.Update: {
      var i, last = ds.getDataCount();
      var cnt = ds.getUpdatedCount() + ds.getAppendedCount();
      for (i = last - cnt; i < last; i++) {
        indic.execute(ds, i);
      }
      break;
    }
  }
};
IndicatorDataProvider.prototype.getMinMaxAt = function (index, minmax) {
  minmax.min = Number.MAX_VALUE;
  minmax.max = -Number.MAX_VALUE;
  var result, valid = false;
  var i, cnt = this._indicator.getOutputCount();
  for (i = 0; i < cnt; i++) {
    result = this._indicator.getOutputAt(i).execute(index);
    if (isNaN(result) == false) {
      valid = true;
      if (minmax.min > result) {
        minmax.min = result;
      }
      if (minmax.max < result) {
        minmax.max = result;
      }
    }
  }
  return valid;
};
var theme_color_id = 0;
var theme_font_id = 0;
var Theme = create_class();
Theme.prototype.getColor = function (which) {
  return this._colors[which];
};
Theme.prototype.getFont = function (which) {
  return this._fonts[which];
};
Theme.Color = {
  Positive: theme_color_id++,
  Negative: theme_color_id++,
  PositiveDark: theme_color_id++,
  NegativeDark: theme_color_id++,
  Unchanged: theme_color_id++,
  Background: theme_color_id++,
  Cursor: theme_color_id++,
  RangeMark: theme_color_id++,
  Indicator0: theme_color_id++,
  Indicator1: theme_color_id++,
  Indicator2: theme_color_id++,
  Indicator3: theme_color_id++,
  Indicator4: theme_color_id++,
  Indicator5: theme_color_id++,
  Grid0: theme_color_id++,
  Grid1: theme_color_id++,
  Grid2: theme_color_id++,
  Grid3: theme_color_id++,
  Grid4: theme_color_id++,
  TextPositive: theme_color_id++,
  TextNegative: theme_color_id++,
  Text0: theme_color_id++,
  Text1: theme_color_id++,
  Text2: theme_color_id++,
  Text3: theme_color_id++,
  Text4: theme_color_id++,
  LineColorNormal: theme_color_id++,
  LineColorSelected: theme_color_id++,
  CircleColorFill: theme_color_id++,
  CircleColorStroke: theme_color_id++
};
Theme.Font = {
  Default: theme_font_id++
};
var DarkTheme = create_class(Theme);
DarkTheme.prototype.__construct = function () {
  this._colors = [];
  this._colors[Theme.Color.Positive] = Config.kline.dark.Positive;// 涨 #19b34c
  this._colors[Theme.Color.Negative] = Config.kline.dark.Negative; // 跌 #990e0e
  this._colors[Theme.Color.PositiveDark] = "#004718";
  this._colors[Theme.Color.NegativeDark] = "#3b0e08";
  this._colors[Theme.Color.Unchanged] = "#fff";
  this._colors[Theme.Color.Background] = "#0a0a0a";
  this._colors[Theme.Color.Cursor] = "#aaa";
  this._colors[Theme.Color.RangeMark] = "#f9ee30";
  this._colors[Theme.Color.Indicator0] = "#ddd";
  this._colors[Theme.Color.Indicator1] = "#f9ee30";

  this._colors[Theme.Color.Indicator2] = "#f600ff";
  this._colors[Theme.Color.Indicator3] = "#6bf";
  this._colors[Theme.Color.Indicator4] = "#a5cf81";
  this._colors[Theme.Color.Indicator5] = "#e18b89";
  this._colors[Theme.Color.Grid0] = "#333";
  this._colors[Theme.Color.Grid1] = "#444";
  this._colors[Theme.Color.Grid2] = "#666";
  this._colors[Theme.Color.Grid3] = "#888";
  this._colors[Theme.Color.Grid4] = "#aaa";
  this._colors[Theme.Color.TextPositive] = Config.kline.dark.Positive;// #1bd357
  this._colors[Theme.Color.TextNegative] = Config.kline.dark.Negative;// #ff6f5e
  this._colors[Theme.Color.Text0] = "#444";
  this._colors[Theme.Color.Text1] = "#666";
  this._colors[Theme.Color.Text2] = "#888";
  this._colors[Theme.Color.Text3] = "#aaa";
  this._colors[Theme.Color.Text4] = "#ccc";
  this._colors[Theme.Color.LineColorNormal] = "#a6a6a6";
  this._colors[Theme.Color.LineColorSelected] = "#ffffff";
  this._colors[Theme.Color.CircleColorFill] = "#000000";
  this._colors[Theme.Color.CircleColorStroke] = "#ffffff";
  this._fonts = [];
  this._fonts[Theme.Font.Default] = "12px Tahoma";
};
var LightTheme = create_class(Theme);
LightTheme.prototype.__construct = function () {
  this._colors = [];
  this._colors[Theme.Color.Positive] = Config.kline.light.Positive; // 涨#53b37b
  this._colors[Theme.Color.Negative] = Config.kline.light.Negative; // 跌#db5542
  this._colors[Theme.Color.PositiveDark] = "#66d293";
  this._colors[Theme.Color.NegativeDark] = "#ffadaa";
  this._colors[Theme.Color.Unchanged] = "#fff";
  this._colors[Theme.Color.Background] = "#fff";
  this._colors[Theme.Color.Cursor] = "#aaa";
  this._colors[Theme.Color.RangeMark] = "#f27935";
  this._colors[Theme.Color.Indicator0] = "#2fd2b2";
  this._colors[Theme.Color.Indicator1] = "#ffb400";
  this._colors[Theme.Color.Indicator2] = "#e849b9";
  this._colors[Theme.Color.Indicator3] = "#1478c8";
  this._colors[Theme.Color.Grid0] = "#eee";
  this._colors[Theme.Color.Grid1] = "#afb1b3";
  this._colors[Theme.Color.Grid2] = "#ccc";
  this._colors[Theme.Color.Grid3] = "#bbb";
  this._colors[Theme.Color.Grid4] = "#aaa";
  this._colors[Theme.Color.TextPositive] = Config.kline.light.Positive; // 涨#53b37b
  this._colors[Theme.Color.TextNegative] = Config.kline.light.Negative; // 跌#db5542
  this._colors[Theme.Color.Text0] = "#ccc";
  this._colors[Theme.Color.Text1] = "#aaa";
  this._colors[Theme.Color.Text2] = "#888";
  this._colors[Theme.Color.Text3] = "#666";
  this._colors[Theme.Color.Text4] = "#444";
  this._colors[Theme.Color.LineColorNormal] = "#8c8c8c";
  this._colors[Theme.Color.LineColorSelected] = "#393c40";
  this._colors[Theme.Color.CircleColorFill] = "#ffffff";
  this._colors[Theme.Color.CircleColorStroke] = "#393c40";
  this._fonts = [];
  this._fonts[Theme.Font.Default] = "12px Tahoma";
};
var TemplateMeasuringHandler = create_class();
TemplateMeasuringHandler.onMeasuring = function (sender, args) {
  var width = args.Width;
  var height = args.Height;
  var areaName = sender.getNameObject().getCompAt(2);
  if (areaName == "timeline") {
    sender.setMeasuredDimension(width, 22);
  }
};
var Template = create_class();
Template.displayVolume = true;
Template.createCandlestickDataSource = function (dsAlias) {
  return new MainDataSource(dsAlias);
};
Template.createLiveOrderDataSource = function (dsAlias) {
  return new CLiveOrderDataSource(dsAlias);
};
Template.createLiveTradeDataSource = function (dsAlias) {
  return new CLiveTradeDataSource(dsAlias);
};
Template.createDataSource = function (dsName, dsAlias, createFunc) {
  var mgr = ChartManager.getInstance();
  if (mgr.getCachedDataSource(dsAlias) == null) {
    mgr.setCachedDataSource(dsAlias, createFunc(dsAlias));
  }
  mgr.setCurrentDataSource(dsName, dsAlias);
  mgr.updateData(dsName, null);
};
Template.createTableComps = function (dsName) {
  Template.createMainChartComps(dsName);
  if (Template.displayVolume) {
    Template.createIndicatorChartComps(dsName, "VOLUME");
  }
  Template.createTimelineComps(dsName);
};
Template.createMainChartComps = function (dsName) {
  var mgr = ChartManager.getInstance();
  var tableLayout = mgr.getArea(dsName + ".charts");
  var areaName = dsName + ".main";
  var rangeAreaName = areaName + "Range";
  var area = new MainArea(areaName);
  mgr.setArea(areaName, area);
  tableLayout.addArea(area);
  var rangeArea = new MainRangeArea(rangeAreaName);
  mgr.setArea(rangeAreaName, rangeArea);
  tableLayout.addArea(rangeArea);
  var dp = new MainDataProvider(areaName + ".main");
  mgr.setDataProvider(dp.getName(), dp);
  mgr.setMainIndicator(dsName, "MA");
  var range = new MainRange(areaName);
  mgr.setRange(range.getName(), range);
  range.setPaddingTop(28);
  range.setPaddingBottom(12);
  var plotter = new MainAreaBackgroundPlotter(areaName + ".background");
  mgr.setPlotter(plotter.getName(), plotter);
  plotter = new CGridPlotter(areaName + ".grid");
  mgr.setPlotter(plotter.getName(), plotter);
  plotter = new CandlestickPlotter(areaName + ".main");
  mgr.setPlotter(plotter.getName(), plotter);
  plotter = new MinMaxPlotter(areaName + ".decoration");
  mgr.setPlotter(plotter.getName(), plotter);
  plotter = new MainInfoPlotter(areaName + ".info");
  mgr.setPlotter(plotter.getName(), plotter);
  plotter = new SelectionPlotter(areaName + ".selection");
  mgr.setPlotter(plotter.getName(), plotter);
  plotter = new CDynamicLinePlotter(areaName + ".tool");
  mgr.setPlotter(plotter.getName(), plotter);
  plotter = new RangeAreaBackgroundPlotter(areaName + "Range.background");
  mgr.setPlotter(plotter.getName(), plotter);
  plotter = new COrderGraphPlotter(areaName + "Range.grid");
  mgr.setPlotter(plotter.getName(), plotter);
  plotter = new RangePlotter(areaName + "Range.main");
  mgr.setPlotter(plotter.getName(), plotter);
  plotter = new RangeSelectionPlotter(areaName + "Range.selection");
  mgr.setPlotter(plotter.getName(), plotter);
  plotter = new LastClosePlotter(areaName + "Range.decoration");
  mgr.setPlotter(plotter.getName(), plotter);
};
Template.createIndicatorChartComps = function (dsName, indicName) {
  var mgr = ChartManager.getInstance();
  var tableLayout = mgr.getArea(dsName + ".charts");
  var areaName = dsName + ".indic" + tableLayout.getNextRowId();
  var rangeAreaName = areaName + "Range";
  var area = new IndicatorArea(areaName);
  mgr.setArea(areaName, area);
  tableLayout.addArea(area);
  var rowIndex = tableLayout.getAreaCount() >> 1;
  var heights = ChartSettings.get().charts.areaHeight;
  if (heights.length > rowIndex) {
    var a, i;
    for (i = 0; i < rowIndex; i++) {
      a = tableLayout.getAreaAt(i << 1);
      a.setTop(0);
      a.setBottom(heights[i]);
    }
    area.setTop(0);
    area.setBottom(heights[rowIndex]);
  }
  var rangeArea = new IndicatorRangeArea(rangeAreaName);
  mgr.setArea(rangeAreaName, rangeArea);
  tableLayout.addArea(rangeArea);
  var dp = new IndicatorDataProvider(areaName + ".secondary");
  mgr.setDataProvider(dp.getName(), dp);
  if (mgr.setIndicator(areaName, indicName) == false) {
    mgr.removeIndicator(areaName);
    return;
  }
  var plotter = new MainAreaBackgroundPlotter(areaName + ".background");
  mgr.setPlotter(plotter.getName(), plotter);
  plotter = new CGridPlotter(areaName + ".grid");
  mgr.setPlotter(plotter.getName(), plotter);
  plotter = new IndicatorPlotter(areaName + ".secondary");
  mgr.setPlotter(plotter.getName(), plotter);
  plotter = new IndicatorInfoPlotter(areaName + ".info");
  mgr.setPlotter(plotter.getName(), plotter);
  plotter = new SelectionPlotter(areaName + ".selection");
  mgr.setPlotter(plotter.getName(), plotter);
  plotter = new RangeAreaBackgroundPlotter(areaName + "Range.background");
  mgr.setPlotter(plotter.getName(), plotter);
  plotter = new RangePlotter(areaName + "Range.main");
  mgr.setPlotter(plotter.getName(), plotter);
  plotter = new RangeSelectionPlotter(areaName + "Range.selection");
  mgr.setPlotter(plotter.getName(), plotter);
};
Template.createTimelineComps = function (dsName) {
  var mgr = ChartManager.getInstance();
  var plotter;
  var timeline = new Timeline(dsName);
  mgr.setTimeline(timeline.getName(), timeline);
  plotter = new TimelineAreaBackgroundPlotter(dsName + ".timeline.background");
  mgr.setPlotter(plotter.getName(), plotter);
  plotter = new TimelinePlotter(dsName + ".timeline.main");
  mgr.setPlotter(plotter.getName(), plotter);
  plotter = new TimelineSelectionPlotter(dsName + ".timeline.selection");
  mgr.setPlotter(plotter.getName(), plotter);
};
Template.createLiveOrderComps = function (dsName) {
  var mgr = ChartManager.getInstance();
  var plotter;
  plotter = new BackgroundPlotter(dsName + ".main.background");
  mgr.setPlotter(plotter.getName(), plotter);
  plotter = new CLiveOrderPlotter(dsName + ".main.main");
  mgr.setPlotter(plotter.getName(), plotter);
};
Template.createLiveTradeComps = function (dsName) {
  var mgr = ChartManager.getInstance();
  var plotter;
  plotter = new BackgroundPlotter(dsName + ".main.background");
  mgr.setPlotter(plotter.getName(), plotter);
  plotter = new CLiveTradePlotter(dsName + ".main.main");
  mgr.setPlotter(plotter.getName(), plotter);
};
var DefaultTemplate = create_class(Template);
DefaultTemplate.loadTemplate = function (dsName, dsAlias, dsNameOrder, dsAliasOrder, dsNameTrade, dsAliasTrade) {
  var mgr = ChartManager.getInstance();
  var settings = ChartSettings.get();
  var frameName = (new CName(dsName)).getCompAt(0);
  mgr.unloadTemplate(frameName);
  Template.createDataSource(dsName, dsAlias, Template.createCandlestickDataSource);
  var frame = new DockableLayout(frameName);
  mgr.setFrame(frame.getName(), frame);
  mgr.setArea(frame.getName(), frame);
  frame.setGridColor(Theme.Color.Grid1);
  var area = new TimelineArea(dsName + ".timeline");
  mgr.setArea(area.getName(), area);
  frame.addArea(area);
  area.setDockStyle(ChartArea.DockStyle.Bottom);
  area.Measuring.addHandler(area, TemplateMeasuringHandler.onMeasuring);
  var tableLayout = new TableLayout(dsName + ".charts");
  mgr.setArea(tableLayout.getName(), tableLayout);
  tableLayout.setDockStyle(ChartArea.DockStyle.Fill);
  frame.addArea(tableLayout);
  Template.createTableComps(dsName);
  mgr.setThemeName(frameName, settings.theme);
  return mgr;
};
var Plotter = create_class(NamedObject);
Plotter.prototype.__construct = function (name) {
  Plotter.__super.__construct.call(this, name);
};
Plotter.isChrome = (navigator.userAgent.toLowerCase().match(/chrome/) != null);
Plotter.drawLine = function (context, x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo((x1 << 0) + 0.5, (y1 << 0) + 0.5);
  context.lineTo((x2 << 0) + 0.5, (y2 << 0) + 0.5);
  context.stroke();
};
Plotter.drawLines = function (context, points) {
  var i, cnt = points.length;
  context.beginPath();
  context.moveTo(points[0].x, points[0].y);
  for (i = 1; i < cnt; i++) {
    context.lineTo(points[i].x, points[i].y);
  }
  if (Plotter.isChrome) {
    context.moveTo(points[0].x, points[0].y);
    for (i = 1; i < cnt; i++) {
      context.lineTo(points[i].x, points[i].y);
    }
  }
  context.stroke();
};
Plotter.drawDashedLine = function (context, x1, y1, x2, y2, dashLen, dashSolid) {
  if (dashLen < 2) {
    dashLen = 2;
  }
  var dX = x2 - x1;
  var dY = y2 - y1;
  context.beginPath();
  if (dY == 0) {
    var count = (dX / dashLen + 0.5) << 0;
    for (var i = 0; i < count; i++) {
      context.rect(x1, y1, dashSolid, 1);
      x1 += dashLen;
    }
    context.fill();
  } else {
    var count = (Math.sqrt(dX * dX + dY * dY) / dashLen + 0.5) << 0;
    dX = dX / count;
    dY = dY / count;
    var dashX = dX * dashSolid / dashLen;
    var dashY = dY * dashSolid / dashLen;
    for (var i = 0; i < count; i++) {
      context.moveTo(x1 + 0.5, y1 + 0.5);
      context.lineTo(x1 + 0.5 + dashX, y1 + 0.5 + dashY);
      x1 += dX;
      y1 += dY;
    }
    context.stroke();
  }
};
Plotter.createHorzDashedLine = function (context, x1, x2, y, dashLen, dashSolid) {
  if (dashLen < 2) {
    dashLen = 2;
  }
  var dX = x2 - x1;
  var count = (dX / dashLen + 0.5) << 0;
  for (var i = 0; i < count; i++) {
    context.rect(x1, y, dashSolid, 1);
    x1 += dashLen;
  }
};
Plotter.createRectangles = function (context, rects) {
  context.beginPath();
  var e, i, cnt = rects.length;
  for (i = 0; i < cnt; i++) {
    e = rects[i];
    context.rect(e.x, e.y, e.w, e.h);
  }
};
Plotter.createPolygon = function (context, points) {
  context.beginPath();
  context.moveTo(points[0].x + 0.5, points[0].y + 0.5);
  var i, cnt = points.length;
  for (i = 1; i < cnt; i++) {
    context.lineTo(points[i].x + 0.5, points[i].y + 0.5);
  }
  context.closePath();
};
Plotter.drawString = function (context, str, rect) {
  var w = context.measureText(str).width;
  if (rect.w < w) {
    return false;
  }
  context.fillText(str, rect.x, rect.y);
  rect.x += w;
  rect.w -= w;
  return true;
};
var BackgroundPlotter = create_class(Plotter);
BackgroundPlotter.prototype.__construct = function (name) {
  BackgroundPlotter.__super.__construct.call(this, name);
  this._color = Theme.Color.Background;
};
BackgroundPlotter.prototype.getColor = function () {
  return this._color;
};
BackgroundPlotter.prototype.setColor = function (c) {
  this._color = c;
};
BackgroundPlotter.prototype.Draw = function (context) {
  var mgr = ChartManager.getInstance();
  var area = mgr.getArea(this.getAreaName());
  var theme = mgr.getTheme(this.getFrameName());
  context.fillStyle = theme.getColor(this._color);
  context.fillRect(area.getLeft(), area.getTop(), area.getWidth(), area.getHeight());
};
var MainAreaBackgroundPlotter = create_class(BackgroundPlotter);
MainAreaBackgroundPlotter.prototype.__construct = function (name) {
  MainAreaBackgroundPlotter.__super.__construct.call(this, name);
};
MainAreaBackgroundPlotter.prototype.Draw = function (context) {
  var mgr = ChartManager.getInstance();
  var area = mgr.getArea(this.getAreaName());
  var timeline = mgr.getTimeline(this.getDataSourceName());
  var range = mgr.getRange(this.getAreaName());
  var theme = mgr.getTheme(this.getFrameName());
  var rect = area.getRect();
  if (!area.isChanged() && !timeline.isUpdated() && !range.isUpdated()) {
    var first = timeline.getFirstIndex();
    var last = timeline.getLastIndex() - 2;
    var start = Math.max(first, last);
    rect.X = timeline.toColumnLeft(start);
    rect.Width = area.getRight() - rect.X;
  }
  context.fillStyle = theme.getColor(this._color);
  context.fillRect(rect.X, rect.Y, rect.Width, rect.Height);
};
var RangeAreaBackgroundPlotter = create_class(BackgroundPlotter);
RangeAreaBackgroundPlotter.prototype.__construct = function (name) {
  RangeAreaBackgroundPlotter.__super.__construct.call(this, name);
};
RangeAreaBackgroundPlotter.prototype.Draw = function (context) {
  var mgr = ChartManager.getInstance();
  var areaName = this.getAreaName();
  var area = mgr.getArea(areaName);
  var range = mgr.getRange(areaName.substring(0, areaName.lastIndexOf("Range")));
  var isMainRange = range.getNameObject().getCompAt(2) == "main";
  if (isMainRange) {
  } else {
    if (!area.isChanged() && !range.isUpdated()) {
      return;
    }
  }
  var theme = mgr.getTheme(this.getFrameName());
  context.fillStyle = theme.getColor(this._color);
  context.fillRect(area.getLeft(), area.getTop(), area.getWidth(), area.getHeight());
};
var TimelineAreaBackgroundPlotter = create_class(BackgroundPlotter);
TimelineAreaBackgroundPlotter.prototype.__construct = function (name) {
  TimelineAreaBackgroundPlotter.__super.__construct.call(this, name);
};
TimelineAreaBackgroundPlotter.prototype.Draw = function (context) {
  var mgr = ChartManager.getInstance();
  var area = mgr.getArea(this.getAreaName());
  var timeline = mgr.getTimeline(this.getDataSourceName());
  if (!area.isChanged() && !timeline.isUpdated()) {
    return;
  }
  var theme = mgr.getTheme(this.getFrameName());
  context.fillStyle = theme.getColor(this._color);
  context.fillRect(area.getLeft(), area.getTop(), area.getWidth(), area.getHeight());
};
var CGridPlotter = create_class(NamedObject);
CGridPlotter.prototype.__construct = function (name) {
  CGridPlotter.__super.__construct.call(this, name);
};
CGridPlotter.prototype.Draw = function (context) {
  var mgr = ChartManager.getInstance();
  var area = mgr.getArea(this.getAreaName());
  var timeline = mgr.getTimeline(this.getDataSourceName());
  var range = mgr.getRange(this.getAreaName());
  var clipped = false;
  if (!area.isChanged() && !timeline.isUpdated() && !range.isUpdated()) {
    var first = timeline.getFirstIndex();
    var last = timeline.getLastIndex();
    var start = Math.max(first, last - 2);
    var left = timeline.toColumnLeft(start);
    context.save();
    context.rect(left, area.getTop(), area.getRight() - left, area.getHeight());
    context.clip();
    clipped = true;
  }
  var theme = mgr.getTheme(this.getFrameName());
  context.fillStyle = theme.getColor(Theme.Color.Grid0);
  context.beginPath();
  var dashLen = 12, dashSolid = 3;
  if (Plotter.isChrome) {
    dashLen = 4;
    dashSolid = 1;
  }
  var gradations = range.getGradations();
  for (var n in gradations) {
    Plotter.createHorzDashedLine(context, area.getLeft(), area.getRight(), range.toY(gradations[n]), dashLen, dashSolid);
  }
  context.fill();
  if (clipped) {
    context.restore();
  }
};
var CandlestickPlotter = create_class(NamedObject);
CandlestickPlotter.prototype.__construct = function (name) {
  CandlestickPlotter.__super.__construct.call(this, name);
};
/**
 * 阳线画出最低价
 * @param c
 * @constructor
 */
CandlestickPlotter.prototype.Draw = function (context) {
  var mgr = ChartManager.getInstance();
  var ds = mgr.getDataSource(this.getDataSourceName());
  if (ds.getDataCount() < 1) {
    return;
  }
  var area = mgr.getArea(this.getAreaName());
  var timeline = mgr.getTimeline(this.getDataSourceName());
  var range = mgr.getRange(this.getAreaName());
  if (range.getRange() == 0.0) {
    return;
  }
  var theme = mgr.getTheme(this.getFrameName());
  var dark = is_instance(theme, DarkTheme);
  var first = timeline.getFirstIndex();
  var last = timeline.getLastIndex();
  var start;
  if (area.isChanged() || timeline.isUpdated() || range.isUpdated()) {
    start = first;
  } else {
    start = Math.max(first, last - 2);
  }
  var cW = timeline.getColumnWidth();
  var iW = timeline.getItemWidth();
  var left = timeline.toItemLeft(start);
  var center = timeline.toItemCenter(start);
  var strokePosRects = [];
  var fillPosRects = [];
  var fillUchRects = [];
  var fillNegRects = [];
  for (var i = start; i < last; i++) {
    var data = ds.getDataAt(i);
    var high = range.toY(data.high);
    var low = range.toY(data.low);
    var open = data.open;
    var close = data.close;
    if (close > open) {
      var top = range.toY(close);
      var bottom = range.toY(open);
      var iH = Math.max(bottom - top, 1);
      if (iH > 1 && iW > 1 && dark) {
        strokePosRects.push({x: left + 0.5, y: top + 0.5, w: iW - 1, h: iH - 1});
      } else {
        fillPosRects.push({x: left, y: top, w: Math.max(iW, 1), h: Math.max(iH, 1)});
      }
      if (data.high > close) {
        high = Math.min(high, top - 1);
        fillPosRects.push({x: center, y: high, w: 1, h: top - high});
      }
      if (open > data.low) {
        low = Math.max(low, bottom + 1);
        fillPosRects.push({x: center, y: bottom, w: 1, h: low - bottom});
      }
    } else if (close == open) {
      var top = range.toY(close);
      fillUchRects.push({x: left, y: top, w: Math.max(iW, 1), h: 1});
      if (data.high > close) {
        high = Math.min(high, top - 1);
      }
      if (open > data.low) {
        low = Math.max(low, top + 1);
      }
      if (high < low) {
        fillUchRects.push({x: center, y: high, w: 1, h: low - high});
      }
    } else {
      var top = range.toY(open);
      var bottom = range.toY(close);
      var iH = Math.max(bottom - top, 1);
      fillNegRects.push({x: left, y: top, w: Math.max(iW, 1), h: Math.max(iH, 1)});
      if (data.high > open) {
        high = Math.min(high, top - 1);
      }
      if (close > data.low) {
        low = Math.max(low, bottom + 1);
      }
      if (high < low) {
        fillNegRects.push({x: center, y: high, w: 1, h: low - high});
      }
    }
    left += cW;
    center += cW;
  }
  if (strokePosRects.length > 0) {
    context.strokeStyle = theme.getColor(Theme.Color.Positive);
    Plotter.createRectangles(context, strokePosRects);
    context.stroke();
  }
  if (fillPosRects.length > 0) {
    context.fillStyle = theme.getColor(Theme.Color.Positive);
    Plotter.createRectangles(context, fillPosRects);
    context.fill();
  }
  if (fillUchRects.length > 0) {
    context.fillStyle = theme.getColor(Theme.Color.Negative);
    Plotter.createRectangles(context, fillUchRects);
    context.fill();
  }
  if (fillNegRects.length > 0) {
    context.fillStyle = theme.getColor(Theme.Color.Negative);
    Plotter.createRectangles(context, fillNegRects);
    context.fill();
  }
};
var CandlestickHLCPlotter = create_class(Plotter);
CandlestickHLCPlotter.prototype.__construct = function (name) {
  CandlestickHLCPlotter.__super.__construct.call(this, name);
};
CandlestickHLCPlotter.prototype.Draw = function (context) {
  var mgr = ChartManager.getInstance();
  var ds = mgr.getDataSource(this.getDataSourceName());
  if (!is_instance(ds, MainDataSource) || ds.getDataCount() < 1) {
    return;
  }
  var area = mgr.getArea(this.getAreaName());
  var timeline = mgr.getTimeline(this.getDataSourceName());
  var range = mgr.getRange(this.getAreaName());
  if (range.getRange() == 0.0) {
    return;
  }
  var theme = mgr.getTheme(this.getFrameName());
  var dark = is_instance(theme, DarkTheme);
  var first = timeline.getFirstIndex();
  var last = timeline.getLastIndex();
  var start;
  if (area.isChanged() || timeline.isUpdated() || range.isUpdated()) {
    start = first;
  } else {
    start = Math.max(first, last - 2);
  }
  var cW = timeline.getColumnWidth();
  var iW = timeline.getItemWidth();
  var left = timeline.toItemLeft(start);
  var center = timeline.toItemCenter(start);
  var strokePosRects = [];
  var fillPosRects = [];
  var fillUchRects = [];
  var fillNegRects = [];
  for (var i = start; i < last; i++) {
    var data = ds.getDataAt(i);
    var high = range.toY(data.high);
    var low = range.toY(data.low);
    var open = data.open;
    if (i > 0) {
      open = ds.getDataAt(i - 1).close;
    }
    var close = data.close;
    if (close > open) {
      var top = range.toY(close);
      var bottom = range.toY(open);
      var iH = Math.max(bottom - top, 1);
      if (iH > 1 && iW > 1 && dark) {
        strokePosRects.push({x: left + 0.5, y: top + 0.5, w: iW - 1, h: iH - 1});
      } else {
        fillPosRects.push({x: left, y: top, w: Math.max(iW, 1), h: Math.max(iH, 1)});
      }
      if (data.high > close) {
        high = Math.min(high, top - 1);
        fillPosRects.push({x: center, y: high, w: 1, h: top - high});
      }
      if (open > data.low) {
        low = Math.max(low, bottom + 1);
        fillPosRects.push({x: center, y: bottom, w: 1, h: low - bottom});
      }
    } else if (close == open) {
      var top = range.toY(close);
      fillUchRects.push({x: left, y: top, w: Math.max(iW, 1), h: 1});
      if (data.high > close) {
        high = Math.min(high, top - 1);
      }
      if (open > data.low) {
        low = Math.max(low, top + 1);
      }
      if (high < low) {
        fillUchRects.push({x: center, y: high, w: 1, h: low - high});
      }
    }
    else {
      var top = range.toY(open);
      var bottom = range.toY(close);
      var iH = Math.max(bottom - top, 1);
      fillNegRects.push({x: left, y: top, w: Math.max(iW, 1), h: Math.max(iH, 1)});
      if (data.high > open) {
        high = Math.min(high, top - 1);
      }
      if (close > data.low) {
        low = Math.max(low, bottom + 1);
      }
      if (high < low) {
        fillNegRects.push({x: center, y: high, w: 1, h: low - high});
      }
    }
    left += cW;
    center += cW;
  }
  if (strokePosRects.length > 0) {
    context.strokeStyle = theme.getColor(Theme.Color.Positive);
    Plotter.createRectangles(context, strokePosRects);
    context.stroke();
  }
  if (fillPosRects.length > 0) {
    context.fillStyle = theme.getColor(Theme.Color.Positive);
    Plotter.createRectangles(context, fillPosRects);
    context.fill();
  }
  if (fillUchRects.length > 0) {
    context.fillStyle = theme.getColor(Theme.Color.Negative);
    Plotter.createRectangles(context, fillUchRects);
    context.fill();
  }
  if (fillNegRects.length > 0) {
    context.fillStyle = theme.getColor(Theme.Color.Negative);
    Plotter.createRectangles(context, fillNegRects);
    context.fill();
  }
};
var OHLCPlotter = create_class(Plotter);
OHLCPlotter.prototype.__construct = function (name) {
  OHLCPlotter.__super.__construct.call(this, name);
};
OHLCPlotter.prototype.Draw = function (context) {
  var mgr = ChartManager.getInstance();
  var ds = mgr.getDataSource(this.getDataSourceName());
  if (!is_instance(ds, MainDataSource) || ds.getDataCount() < 1) {
    return;
  }
  var area = mgr.getArea(this.getAreaName());
  var timeline = mgr.getTimeline(this.getDataSourceName());
  var range = mgr.getRange(this.getAreaName());
  if (range.getRange() == 0.0) {
    return;
  }
  var theme = mgr.getTheme(this.getFrameName());
  var first = timeline.getFirstIndex();
  var last = timeline.getLastIndex();
  var start;
  if (area.isChanged() || timeline.isUpdated() || range.isUpdated()) {
    start = first;
  } else {
    start = Math.max(first, last - 2);
  }
  var cW = timeline.getColumnWidth();
  var iW = (timeline.getItemWidth() >> 1) + 1;
  var left = timeline.toItemLeft(start) - 1;
  var center = timeline.toItemCenter(start);
  var right = center + 1;
  var fillPosRects = [];
  var fillUchRects = [];
  var fillNegRects = [];
  for (var i = start; i < last; i++) {
    var data = ds.getDataAt(i);
    var high = range.toY(data.high);
    var low = range.toY(data.low);
    var iH = Math.max(low - high, 1);
    if (data.close > data.open) {
      var top = range.toY(data.close);
      var bottom = range.toY(data.open);
      fillPosRects.push({x: center, y: high, w: 1, h: iH});
      fillPosRects.push({x: left, y: bottom, w: iW, h: 1});
      fillPosRects.push({x: right, y: top, w: iW, h: 1});
    } else if (data.close == data.open) {
      var y = range.toY(data.close);
      fillUchRects.push({x: center, y: high, w: 1, h: iH});
      fillUchRects.push({x: left, y: y, w: iW, h: 1});
      fillUchRects.push({x: right, y: y, w: iW, h: 1});
    } else {
      var top = range.toY(data.open);
      var bottom = range.toY(data.close);
      fillNegRects.push({x: center, y: high, w: 1, h: iH});
      fillNegRects.push({x: left, y: top, w: iW, h: 1});
      fillNegRects.push({x: right, y: bottom, w: iW, h: 1});
    }
    left += cW;
    center += cW;
    right += cW;
  }
  if (fillPosRects.length > 0) {
    context.fillStyle = theme.getColor(Theme.Color.Positive);
    Plotter.createRectangles(context, fillPosRects);
    context.fill();
  }
  if (fillUchRects.length > 0) {
    context.fillStyle = theme.getColor(Theme.Color.Negative);
    Plotter.createRectangles(context, fillUchRects);
    context.fill();
  }
  if (fillNegRects.length > 0) {
    context.fillStyle = theme.getColor(Theme.Color.Negative);
    Plotter.createRectangles(context, fillNegRects);
    context.fill();
  }
};
var MainInfoPlotter = create_class(Plotter);

MainInfoPlotter.prototype.__construct = function (name) {
  MainInfoPlotter.__super.__construct.call(this, name);
};
function format_time(v) {
  return (v < 10) ? "0" + v.toString() : v.toString();
}
/**
 * 绘制开高低收等指标信息
 * @param context
 * @constructor
 */
MainInfoPlotter.prototype.Draw = function (context) {
  var mgr = ChartManager.getInstance();
  var area = mgr.getArea(this.getAreaName());
  var timeline = mgr.getTimeline(this.getDataSourceName());
  var ds = mgr.getDataSource(this.getDataSourceName());
  var theme = mgr.getTheme(this.getFrameName());
  context.font = theme.getFont(Theme.Font.Default);
  context.textAlign = "left";
  context.textBaseline = "top";
  context.fillStyle = theme.getColor(Theme.Color.Text4);
  var rect = {
    x: area.getLeft() + 4,
    y: area.getTop() + 2,
    w: area.getWidth() - 8,
    h: 20
  };
  var selIndex = timeline.getSelectedIndex();
  if (selIndex < 0) {
    return;
  }
  var data = ds.getDataAt(selIndex);
  var digits = ds.getDecimalDigits();
  var time = new Date(data.date);
  var year = time.getFullYear();
  var month = format_time(time.getMonth() + 1);
  var date = format_time(time.getDate());
  var hour = format_time(time.getHours());
  var minute = format_time(time.getMinutes());
  var lang = mgr.getLanguage();
  if (lang == "zh-cn") {
    if (!Plotter.drawString(context, '时间: ' + year + '-' + month + '-' + date + '  ' + hour + ':' + minute, rect)) {
      return;
    }
    if (!Plotter.drawString(context, '  开: ' + data.open.toFixed(digits), rect)) {
      return;
    }
    if (!Plotter.drawString(context, '  高: ' + data.high.toFixed(digits), rect)) {
      return;
    }
    if (!Plotter.drawString(context, '  低: ' + data.low.toFixed(digits), rect)) {
      return;
    }
    if (!Plotter.drawString(context, '  收: ' + data.close.toFixed(digits), rect)) {
      return;
    }
  } else if (lang == "en-us") {
    if (!Plotter.drawString(context, 'DATE: ' + year + '-' + month + '-' + date + '  ' + hour + ':' + minute, rect)) {
      return;
    }
    if (!Plotter.drawString(context, '  O: ' + data.open.toFixed(digits), rect)) {
      return;
    }
    if (!Plotter.drawString(context, '  H: ' + data.high.toFixed(digits), rect)) {
      return;
    }
    if (!Plotter.drawString(context, '  L: ' + data.low.toFixed(digits), rect)) {
      return;
    }
    if (!Plotter.drawString(context, '  C: ' + data.close.toFixed(digits), rect)) {
      return;
    }
  } else if (lang == "zh-tw") {
    if (!Plotter.drawString(context, '時間: ' + year + '-' + month + '-' + date + '  ' + hour + ':' + minute, rect)) {
      return;
    }
    if (!Plotter.drawString(context, '  開: ' + data.open.toFixed(digits), rect)) {
      return;
    }
    if (!Plotter.drawString(context, '  高: ' + data.high.toFixed(digits), rect)) {
      return;
    }
    if (!Plotter.drawString(context, '  低: ' + data.low.toFixed(digits), rect)) {
      return;
    }
    if (!Plotter.drawString(context, '  收: ' + data.close.toFixed(digits), rect)) {
      return;
    }
  }
  if (selIndex > 0) {
    if (lang == "zh-cn") {
      if (!Plotter.drawString(context, '  涨幅: ', rect)) {
        return;
      }
    } else if (lang == "en-us") {
      if (!Plotter.drawString(context, '  CHANGE: ', rect)) {
        return;
      }
    } else if (lang == "zh-tw") {
      if (!Plotter.drawString(context, '  漲幅: ', rect)) {
        return;
      }
    }
    var prev = ds.getDataAt(selIndex - 1);
    var change = (data.close - prev.close) / prev.close * 100.0;
    if (change >= 0) {
      change = ' ' + change.toFixed(2);
      context.fillStyle = theme.getColor(Theme.Color.TextPositive);
    } else {
      change = change.toFixed(2);
      context.fillStyle = theme.getColor(Theme.Color.TextNegative);
    }
    if (!Plotter.drawString(context, change, rect)) {
      return;
    }
    context.fillStyle = theme.getColor(Theme.Color.Text4);
    if (!Plotter.drawString(context, ' %', rect)) {
      return;
    }
  }
  var amplitude = (data.high - data.low) / data.low * 100.0;
  if (lang == "zh-cn") {
    if (!Plotter.drawString(context, '  振幅: ' + amplitude.toFixed(2) + ' %', rect)) {
      return;
    }
    if (!Plotter.drawString(context, '  量: ' + data.volume.toFixed(2), rect)) {
      return;
    }
  } else if (lang == "en-us") {
    if (!Plotter.drawString(context, '  AMPLITUDE: ' + amplitude.toFixed(2) + ' %', rect)) {
      return;
    }
    if (!Plotter.drawString(context, '  V: ' + data.volume.toFixed(2), rect)) {
      return;
    }
  } else if (lang == "zh-tw") {
    if (!Plotter.drawString(context, '  振幅: ' + amplitude.toFixed(2) + ' %', rect)) {
      return;
    }
    if (!Plotter.drawString(context, '  量: ' + data.volume.toFixed(2), rect)) {
      return;
    }
  }
  var dp = mgr.getDataProvider(this.getAreaName() + ".secondary");
  if (dp == undefined) {
    return;
  }
  var indic = dp.getIndicator();
  var n, cnt = indic.getOutputCount();
  for (n = 0; n < cnt; n++) {
    var out = indic.getOutputAt(n);
    var v = out.execute(selIndex);
    if (isNaN(v)) {
      continue;
    }
    var info = "  " + out.getName() + ": " + v.toFixed(digits);
    var color = out.getColor();
    if (color === undefined) {
      color = Theme.Color.Indicator0 + n;
    }
    context.fillStyle = theme.getColor(color);
    if (!Plotter.drawString(context, info, rect)) {
      return;
    }
  }
};
var IndicatorPlotter = create_class(NamedObject);
IndicatorPlotter.prototype.__construct = function (name) {
  IndicatorPlotter.__super.__construct.call(this, name);
};
IndicatorPlotter.prototype.Draw = function (context) {
  var mgr = ChartManager.getInstance();
  var area = mgr.getArea(this.getAreaName());
  var timeline = mgr.getTimeline(this.getDataSourceName());
  var range = mgr.getRange(this.getAreaName());
  if (range.getRange() == 0.0) {
    return;
  }
  var dp = mgr.getDataProvider(this.getName());
  if (!is_instance(dp, IndicatorDataProvider)) {
    return;
  }
  var theme = mgr.getTheme(this.getFrameName());
  var cW = timeline.getColumnWidth();
  var first = timeline.getFirstIndex();
  var last = timeline.getLastIndex();
  var start;
  if (area.isChanged() || timeline.isUpdated() || range.isUpdated()) {
    start = first;
  } else {
    start = Math.max(first, last - 2);
  }
  var indic = dp.getIndicator();
  var out, n, outCount = indic.getOutputCount();
  for (n = 0; n < outCount; n++) {
    out = indic.getOutputAt(n);
    var style = out.getStyle();
    if (style == OutputStyle.VolumeStick) {
      this.drawVolumeStick(context, theme, mgr.getDataSource(this.getDataSourceName()), start, last, timeline.toItemLeft(start), cW, timeline.getItemWidth(), range);
    } else if (style == OutputStyle.MACDStick) {
      this.drawMACDStick(context, theme, out, start, last, timeline.toItemLeft(start), cW, timeline.getItemWidth(), range);
    } else if (style == OutputStyle.SARPoint) {
      this.drawSARPoint(context, theme, out, start, last, timeline.toItemCenter(start), cW, timeline.getItemWidth(), range);
    }
  }
  var left = timeline.toColumnLeft(start);
  var center = timeline.toItemCenter(start);
  context.save();
  context.rect(left, area.getTop(), area.getRight() - left, area.getHeight());
  context.clip();
  context.translate(0.5, 0.5);
  for (n = 0; n < outCount; n++) {
    var x = center;
    out = indic.getOutputAt(n);
    if (out.getStyle() == OutputStyle.Line) {
      var v, points = [];
      if (start > first) {
        v = out.execute(start - 1);
        if (isNaN(v) == false) {
          points.push({"x": x - cW, "y": range.toY(v)});
        }
      }
      for (var i = start; i < last; i++, x += cW) {
        v = out.execute(i);
        if (isNaN(v) == false) {
          points.push({"x": x, "y": range.toY(v)});
        }
      }
      if (points.length > 0) {
        var color = out.getColor();
        if (color == undefined) {
          color = Theme.Color.Indicator0 + n;
        }
        context.strokeStyle = theme.getColor(color);
        Plotter.drawLines(context, points);
      }
    }
  }
  context.restore();
};
IndicatorPlotter.prototype.drawVolumeStick =
  function (context, theme, ds, first, last, startX, cW, iW, range) {
    var dark = is_instance(theme, DarkTheme);
    var left = startX;
    var bottom = range.toY(0);
    var strokePosRects = [];
    var fillPosRects = [];
    var fillNegRects = [];
    for (var i = first; i < last; i++) {
      var data = ds.getDataAt(i);
      var top = range.toY(data.volume);
      var iH = range.toHeight(data.volume);
      if (data.close > data.open) {
        if (iH > 1 && iW > 1 && dark) {
          strokePosRects.push({x: left + 0.5, y: top + 0.5, w: iW - 1, h: iH - 1});
        } else {
          fillPosRects.push({x: left, y: top, w: Math.max(iW, 1), h: Math.max(iH, 1)});
        }
      } else if (data.close == data.open) {
        if (i > 0 && data.close >= ds.getDataAt(i - 1).close) {
          if (iH > 1 && iW > 1 && dark) {
            strokePosRects.push({x: left + 0.5, y: top + 0.5, w: iW - 1, h: iH - 1});
          } else {
            fillPosRects.push({x: left, y: top, w: Math.max(iW, 1), h: Math.max(iH, 1)});
          }
        } else {
          fillNegRects.push({x: left, y: top, w: Math.max(iW, 1), h: Math.max(iH, 1)});
        }
      } else {
        fillNegRects.push({x: left, y: top, w: Math.max(iW, 1), h: Math.max(iH, 1)});
      }
      left += cW;
    }
    if (strokePosRects.length > 0) {
      context.strokeStyle = theme.getColor(Theme.Color.Positive);
      Plotter.createRectangles(context, strokePosRects);
      context.stroke();
    }
    if (fillPosRects.length > 0) {
      context.fillStyle = theme.getColor(Theme.Color.Positive);
      Plotter.createRectangles(context, fillPosRects);
      context.fill();
    }
    if (fillNegRects.length > 0) {
      context.fillStyle = theme.getColor(Theme.Color.Negative);
      Plotter.createRectangles(context, fillNegRects);
      context.fill();
    }
  };
IndicatorPlotter.prototype.drawMACDStick = function (context, theme, output, first, last, startX, cW, iW, range) {
  var left = startX;
  var middle = range.toY(0);
  var strokePosRects = [];
  var strokeNegRects = [];
  var fillPosRects = [];
  var fillNegRects = [];
  var prevMACD = (first > 0) ? output.execute(first - 1) : NaN;
  for (var i = first; i < last; i++) {
    var MACD = output.execute(i);
    if (MACD >= 0) {
      var iH = range.toHeight(MACD);
      if ((i == 0 || MACD >= prevMACD) && iH > 1 && iW > 1) {
        strokePosRects.push({x: left + 0.5, y: middle - iH + 0.5, w: iW - 1, h: iH - 1});
      } else {
        fillPosRects.push({x: left, y: middle - iH, w: Math.max(iW, 1), h: Math.max(iH, 1)});
      }
    } else {
      var iH = range.toHeight(-MACD);
      if ((i == 0 || MACD >= prevMACD) && iH > 1 && iW > 1) {
        strokeNegRects.push({x: left + 0.5, y: middle + 0.5, w: iW - 1, h: iH - 1});
      } else {
        fillNegRects.push({x: left, y: middle, w: Math.max(iW, 1), h: Math.max(iH, 1)});
      }
    }
    prevMACD = MACD;
    left += cW;
  }
  if (strokePosRects.length > 0) {
    context.strokeStyle = theme.getColor(Theme.Color.Positive);
    Plotter.createRectangles(context, strokePosRects);
    context.stroke();
  }
  if (strokeNegRects.length > 0) {
    context.strokeStyle = theme.getColor(Theme.Color.Negative);
    Plotter.createRectangles(context, strokeNegRects);
    context.stroke();
  }
  if (fillPosRects.length > 0) {
    context.fillStyle = theme.getColor(Theme.Color.Positive);
    Plotter.createRectangles(context, fillPosRects);
    context.fill();
  }
  if (fillNegRects.length > 0) {
    context.fillStyle = theme.getColor(Theme.Color.Negative);
    Plotter.createRectangles(context, fillNegRects);
    context.fill();
  }
};
IndicatorPlotter.prototype.drawSARPoint = function (context, theme, output, first, last, startX, cW, iW, range) {
  var r = iW >> 1;
  if (r < 0.5) {
    r = 0.5;
  }
  if (r > 4) {
    r = 4;
  }
  var center = startX;
  var right = center + r;
  var endAngle = 2 * Math.PI;
  context.save();
  context.translate(0.5, 0.5);
  context.strokeStyle = theme.getColor(Theme.Color.Indicator3);
  context.beginPath();
  for (var i = first; i < last; i++) {
    var y = range.toY(output.execute(i));
    context.moveTo(right, y);
    context.arc(center, y, r, 0, endAngle);
    center += cW;
    right += cW;
  }
  context.stroke();
  context.restore();
};
var IndicatorInfoPlotter = create_class(Plotter);
IndicatorInfoPlotter.prototype.__construct = function (name) {
  IndicatorInfoPlotter.__super.__construct.call(this, name);
};
IndicatorInfoPlotter.prototype.Draw = function (context) {
  var mgr = ChartManager.getInstance();
  var area = mgr.getArea(this.getAreaName());
  var timeline = mgr.getTimeline(this.getDataSourceName());
  var dp = mgr.getDataProvider(this.getAreaName() + ".secondary");
  var theme = mgr.getTheme(this.getFrameName());
  context.font = theme.getFont(Theme.Font.Default);
  context.textAlign = "left";
  context.textBaseline = "top";
  context.fillStyle = theme.getColor(Theme.Color.Text4);
  var rect = {
    x: area.getLeft() + 4,
    y: area.getTop() + 2,
    w: area.getWidth() - 8,
    h: 20
  };
  var indic = dp.getIndicator();
  var title;
  switch (indic.getParameterCount()) {
    case 0:
      title = indic.getName();
      break;
    case 1:
      title = indic.getName() + "(" + indic.getParameterAt(0).getValue() + ")";
      break;
    case 2:
      title = indic.getName() + "(" + indic.getParameterAt(0).getValue() + "," + indic.getParameterAt(1).getValue() + ")";
      break;
    case 3:
      title = indic.getName() + "(" + indic.getParameterAt(0).getValue() + "," + indic.getParameterAt(1).getValue() + "," + indic.getParameterAt(2).getValue() + ")";
      break;
    case 4:
      title = indic.getName() + "(" + indic.getParameterAt(0).getValue() + "," + indic.getParameterAt(1).getValue() + "," + indic.getParameterAt(2).getValue() + "," + indic.getParameterAt(3).getValue() + ")";
      break;
    default:
      return;
  }
  if (!Plotter.drawString(context, title, rect)) {
    return;
  }
  var selIndex = timeline.getSelectedIndex();
  if (selIndex < 0) {
    return;
  }
  var out, v, info, color;
  var n, cnt = indic.getOutputCount();
  for (n = 0; n < cnt; n++) {
    out = indic.getOutputAt(n);
    v = out.execute(selIndex);
    if (isNaN(v)) {
      continue;
    }
    info = "  " + out.getName() + ": " + v.toFixed(2);
    color = out.getColor();
    if (color === undefined) {
      color = Theme.Color.Indicator0 + n;
    }
    context.fillStyle = theme.getColor(color);
    if (!Plotter.drawString(context, info, rect)) {
      return;
    }
  }
};
var MinMaxPlotter = create_class(NamedObject);
MinMaxPlotter.prototype.__construct = function (name) {
  MinMaxPlotter.__super.__construct.call(this, name);
};
MinMaxPlotter.prototype.Draw = function (context) {
  var mgr = ChartManager.getInstance();
  var ds = mgr.getDataSource(this.getDataSourceName());
  if (ds.getDataCount() < 1) {
    return;
  }
  var timeline = mgr.getTimeline(this.getDataSourceName());
  if (timeline.getInnerWidth() < timeline.getColumnWidth()) {
    return;
  }
  var range = mgr.getRange(this.getAreaName());
  if (range.getRange() == 0) {
    return;
  }
  var dp = mgr.getDataProvider(this.getAreaName() + ".main");
  var first = timeline.getFirstIndex();
  var center = (first + timeline.getLastIndex()) >> 1;
  var theme = mgr.getTheme(this.getFrameName());
  context.font = theme.getFont(Theme.Font.Default);
  context.textBaseline = "middle";
  context.fillStyle = theme.getColor(Theme.Color.Text4);
  context.strokeStyle = theme.getColor(Theme.Color.Text4);
  var digits = ds.getDecimalDigits();
  this.drawMark(context, dp.getMinValue(), digits, range.toY(dp.getMinValue()), first, center, dp.getMinValueIndex(), timeline);
  this.drawMark(context, dp.getMaxValue(), digits, range.toY(dp.getMaxValue()), first, center, dp.getMaxValueIndex(), timeline);
};
MinMaxPlotter.prototype.drawMark = function (context, v, digits, y, first, center, index, timeline) {
  var arrowStart, arrowStop, _arrowStop;
  var textStart;
  if (index > center) {
    context.textAlign = "right";
    arrowStart = timeline.toItemCenter(index) - 4;
    arrowStop = arrowStart - 7;
    _arrowStop = arrowStart - 3;
    textStart = arrowStop - 4;
  } else {
    context.textAlign = "left";
    arrowStart = timeline.toItemCenter(index) + 4;
    arrowStop = arrowStart + 7;
    _arrowStop = arrowStart + 3;
    textStart = arrowStop + 4;
  }
  Plotter.drawLine(context, arrowStart, y, arrowStop, y);
  Plotter.drawLine(context, arrowStart, y, _arrowStop, y + 2);
  Plotter.drawLine(context, arrowStart, y, _arrowStop, y - 2);
  context.fillText(String.fromFloat(v, digits), textStart, y);
};
var TimelinePlotter = create_class(Plotter);
TimelinePlotter.prototype.__construct = function (name) {
  TimelinePlotter.__super.__construct.call(this, name);
};
TimelinePlotter.TP_MINUTE = 60 * 1000;
TimelinePlotter.TP_HOUR = 60 * TimelinePlotter.TP_MINUTE;
TimelinePlotter.TP_DAY = 24 * TimelinePlotter.TP_HOUR;
TimelinePlotter.TIME_INTERVAL = [
  5 * TimelinePlotter.TP_MINUTE,
  10 * TimelinePlotter.TP_MINUTE,
  15 * TimelinePlotter.TP_MINUTE,
  30 * TimelinePlotter.TP_MINUTE,
  TimelinePlotter.TP_HOUR,
  2 * TimelinePlotter.TP_HOUR,
  3 * TimelinePlotter.TP_HOUR,
  6 * TimelinePlotter.TP_HOUR,
  12 * TimelinePlotter.TP_HOUR,
  TimelinePlotter.TP_DAY,
  2 * TimelinePlotter.TP_DAY
];
TimelinePlotter.MonthConvert = {
  1: "Jan.",
  2: "Feb.",
  3: "Mar.",
  4: "Apr.",
  5: "May.",
  6: "Jun.",
  7: "Jul.",
  8: "Aug.",
  9: "Sep.",
  10: "Oct.",
  11: "Nov.",
  12: "Dec."
};
TimelinePlotter.prototype.Draw = function (context) {
  var mgr = ChartManager.getInstance();
  var area = mgr.getArea(this.getAreaName());
  var timeline = mgr.getTimeline(this.getDataSourceName());
  if (!area.isChanged() && !timeline.isUpdated()) {
    return;
  }
  var ds = mgr.getDataSource(this.getDataSourceName());
  if (ds.getDataCount() < 2) {
    return;
  }
  var timeInterval = ds.getDataAt(1).date - ds.getDataAt(0).date;
  var n, cnt = TimelinePlotter.TIME_INTERVAL.length;
  for (n = 0; n < cnt; n++) {
    if (timeInterval < TimelinePlotter.TIME_INTERVAL[n]) {
      break;
    }
  }
  for (; n < cnt; n++) {
    if (TimelinePlotter.TIME_INTERVAL[n] % timeInterval == 0) {
      if ((TimelinePlotter.TIME_INTERVAL[n] / timeInterval) * timeline.getColumnWidth() > 60) {
        break;
      }
    }
  }
  var first = timeline.getFirstIndex();
  var last = timeline.getLastIndex();
  var d = new Date();
  var local_utc_diff = d.getTimezoneOffset() * 60 * 1000;
  var theme = mgr.getTheme(this.getFrameName());
  context.font = theme.getFont(Theme.Font.Default);
  context.textAlign = "center";
  context.textBaseline = "middle";
  var lang = mgr.getLanguage();
  var gridRects = [];
  var top = area.getTop();
  var middle = area.getMiddle();
  for (var i = first; i < last; i++) {
    var utcDate = ds.getDataAt(i).date;
    var localDate = utcDate - local_utc_diff;
    var time = new Date(utcDate);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var date = time.getDate();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var text = "";
    if (n < cnt) {
      var m = Math.max(TimelinePlotter.TP_DAY, TimelinePlotter.TIME_INTERVAL[n]);
      if (localDate % m == 0) {
        if (lang == "zh-cn") {
          text = month.toString() + "月" + date.toString() + "日";
        } else if (lang == "zh-tw") {
          text = month.toString() + "月" + date.toString() + "日";
        } else if (lang == "en-us") {
          text = TimelinePlotter.MonthConvert[month] + " " + date.toString();
        }
        context.fillStyle = theme.getColor(Theme.Color.Text4);
      } else if (localDate % TimelinePlotter.TIME_INTERVAL[n] == 0) {
        var strMinute = minute.toString();
        if (minute < 10) {
          strMinute = "0" + strMinute;
        }
        text = hour.toString() + ":" + strMinute;
        context.fillStyle = theme.getColor(Theme.Color.Text2);
      }
    } else if (date == 1 && (hour < (timeInterval / TimelinePlotter.TP_HOUR))) {
      if (month == 1) {
        text = year.toString();
        if (lang == "zh-cn") {
          text += "年";
        } else if (lang == "zh-tw") {
          text += "年";
        }
      } else {
        if (lang == "zh-cn") {
          text = month.toString() + "月";
        } else if (lang == "zh-tw") {
          text = month.toString() + "月";
        } else if (lang == "en-us") {
          text = TimelinePlotter.MonthConvert[month];
        }
      }
      context.fillStyle = theme.getColor(Theme.Color.Text4);
    }
    if (text.length > 0) {
      var x = timeline.toItemCenter(i);
      gridRects.push({x: x, y: top, w: 1, h: 4});
      context.fillText(text, x, middle);
    }
  }
  if (gridRects.length > 0) {
    context.fillStyle = theme.getColor(Theme.Color.Grid1);
    Plotter.createRectangles(context, gridRects);
    context.fill();
  }
};
var RangePlotter = create_class(NamedObject);
RangePlotter.prototype.__construct = function (name) {
  RangePlotter.__super.__construct.call(this, name);
};
RangePlotter.prototype.getRequiredWidth = function (context, v) {
  var mgr = ChartManager.getInstance();
  var theme = mgr.getTheme(this.getFrameName());
  context.font = theme.getFont(Theme.Font.Default);
  return context.measureText((Math.floor(v) + 0.88).toString()).width + 16;
};
RangePlotter.prototype.Draw = function (context) {
  var mgr = ChartManager.getInstance();
  var areaName = this.getAreaName();
  var area = mgr.getArea(areaName);
  var rangeName = areaName.substring(0, areaName.lastIndexOf("Range"));
  var range = mgr.getRange(rangeName);
  if (range.getRange() == 0.0) {
    return;
  }
  var isMainRange = range.getNameObject().getCompAt(2) == "main";
  if (isMainRange) {
  } else {
    if (!area.isChanged() && !range.isUpdated())
      return;
  }
  var gradations = range.getGradations();
  if (gradations.length == 0) {
    return;
  }
  var left = area.getLeft();
  var right = area.getRight();
  var center = area.getCenter();
  var theme = mgr.getTheme(this.getFrameName());
  context.font = theme.getFont(Theme.Font.Default);
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = theme.getColor(Theme.Color.Text2);
  var gridRects = [];
  for (var n in gradations) {
    var y = range.toY(gradations[n]);
    gridRects.push({x: left, y: y, w: 6, h: 1});
    gridRects.push({x: right - 6, y: y, w: 6, h: 1});
    context.fillText(String.fromFloat(gradations[n], 2), center, y);
  }
  if (gridRects.length > 0) {
    context.fillStyle = theme.getColor(Theme.Color.Grid1);
    Plotter.createRectangles(context, gridRects);
    context.fill();
  }
};
var COrderGraphPlotter = create_class(NamedObject);
COrderGraphPlotter.prototype.__construct = function (name) {
  COrderGraphPlotter.__super.__construct.call(this, name);
};
COrderGraphPlotter.prototype.Draw = function (context) {
  return this._Draw_(context);
};
COrderGraphPlotter.prototype._Draw_ = function (context) {
  if (this.Update() == false) {
    return
  }
  if (this.updateData() == false) {
    return
  }
  this.m_top = this.m_pArea.getTop();
  this.m_bottom = this.m_pArea.getBottom();
  this.m_left = this.m_pArea.getLeft();
  this.m_right = this.m_pArea.getRight();
  context.save();
  context.rect(this.m_left, this.m_top, this.m_right - this.m_left, this.m_bottom - this.m_top);
  context.clip();
  var all = ChartManager.getInstance().getChart()._depthData;
  this.x_offset = 0;
  this.y_offset = 0;
  var ask_tmp = {};
  var bid_tmp = {};
  ask_tmp.x = this.m_left + all.array[this.m_ask_si].amounts * this.m_Step;
  ask_tmp.y = this.m_pRange.toY(all.array[this.m_ask_si].rate);
  bid_tmp.x = this.m_left + all.array[this.m_bid_si].amounts * this.m_Step;
  bid_tmp.y = this.m_pRange.toY(all.array[this.m_bid_si].rate);
  if (Math.abs(ask_tmp.y - bid_tmp.y) < 1) {
    this.y_offset = 1;
  }
  this.x_offset = 1;
  this.DrawBackground(context);
  this.UpdatePoints();
  this.FillBlack(context);
  this.DrawGradations(context);
  this.DrawLine(context);
  context.restore();
};
COrderGraphPlotter.prototype.DrawBackground = function (context) {
  context.fillStyle = this.m_pTheme.getColor(Theme.Color.Background);
  context.fillRect(this.m_left, this.m_top, this.m_right - this.m_left, this.m_bottom - this.m_top);
  var all = ChartManager.getInstance().getChart()._depthData;
  if (this.m_mode == 0) {
    var ask_bottom = this.m_pRange.toY(all.array[this.m_ask_si].rate) - this.y_offset;
    var bid_top = this.m_pRange.toY(all.array[this.m_bid_si].rate) + this.y_offset;
    var ask_gradient = context.createLinearGradient(this.m_left, 0, this.m_right, 0);
    ask_gradient.addColorStop(0, this.m_pTheme.getColor(Theme.Color.Background));
    ask_gradient.addColorStop(1, this.m_pTheme.getColor(Theme.Color.PositiveDark));
    context.fillStyle = ask_gradient;
    context.fillRect(this.m_left, this.m_top, this.m_right - this.m_left, ask_bottom - this.m_top);
    var bid_gradient = context.createLinearGradient(this.m_left, 0, this.m_right, 0);
    bid_gradient.addColorStop(0, this.m_pTheme.getColor(Theme.Color.Background));
    bid_gradient.addColorStop(1, this.m_pTheme.getColor(Theme.Color.NegativeDark));
    context.fillStyle = bid_gradient;
    context.fillRect(this.m_left, bid_top, this.m_right - this.m_left, this.m_bottom - bid_top);
  } else if (this.m_mode == 1) {
    var ask_gradient = context.createLinearGradient(this.m_left, 0, this.m_right, 0);
    ask_gradient.addColorStop(0, this.m_pTheme.getColor(Theme.Color.Background));
    ask_gradient.addColorStop(1, this.m_pTheme.getColor(Theme.Color.PositiveDark));
    context.fillStyle = ask_gradient;
    context.fillRect(this.m_left, this.m_top, this.m_right - this.m_left, this.m_bottom - this.m_top);
  } else if (this.m_mode == 2) {
    var bid_gradient = context.createLinearGradient(this.m_left, 0, this.m_right, 0);
    bid_gradient.addColorStop(0, this.m_pTheme.getColor(Theme.Color.Background));
    bid_gradient.addColorStop(1, this.m_pTheme.getColor(Theme.Color.NegativeDark));
    context.fillStyle = bid_gradient;
    context.fillRect(this.m_left, this.m_top, this.m_right - this.m_left, this.m_bottom - this.m_top);
  }
};
COrderGraphPlotter.prototype.DrawLine = function (context) {
  if (this.m_mode == 0 || this.m_mode == 1) {
    context.strokeStyle = this.m_pTheme.getColor(Theme.Color.Positive);
    context.beginPath();
    context.moveTo(Math.floor(this.m_ask_points[0].x) + 0.5, Math.floor(this.m_ask_points[0].y) + 0.5);
    for (var i = 1; i < this.m_ask_points.length; i++) {
      context.lineTo(Math.floor(this.m_ask_points[i].x) + 0.5, Math.floor(this.m_ask_points[i].y) + 0.5);
    }
    context.stroke();
  }
  if (this.m_mode == 0 || this.m_mode == 2) {
    context.strokeStyle = this.m_pTheme.getColor(Theme.Color.Negative);
    context.beginPath();
    context.moveTo(this.m_bid_points[0].x + 0.5, this.m_bid_points[0].y + 0.5);
    for (var i = 1; i < this.m_bid_points.length; i++) {
      context.lineTo(this.m_bid_points[i].x + 0.5, this.m_bid_points[i].y + 0.5);
    }
    context.stroke();
  }
};
COrderGraphPlotter.prototype.UpdatePoints = function () {
  var all = ChartManager.getInstance().getChart()._depthData;
  this.m_ask_points = [];
  var index_ask = {};
  index_ask.x = Math.floor(this.m_left);
  index_ask.y = Math.floor(this.m_pRange.toY(all.array[this.m_ask_si].rate) - this.y_offset);
  this.m_ask_points.push(index_ask);
  var ask_p_i = 0;
  for (var i = this.m_ask_si; i >= this.m_ask_ei; i--) {
    var index0 = {};
    var index1 = {};
    if (i == this.m_ask_si) {
      index0.x = Math.floor(this.m_left + all.array[i].amounts * this.m_Step + this.x_offset);
      index0.y = Math.floor(this.m_pRange.toY(all.array[i].rate) - this.y_offset);
      this.m_ask_points.push(index0);
      ask_p_i = 1;
    } else {
      index0.x = Math.floor(this.m_left + all.array[i].amounts * this.m_Step + this.x_offset);
      index0.y = Math.floor(this.m_ask_points[ask_p_i].y);
      index1.x = Math.floor(index0.x);
      index1.y = Math.floor(this.m_pRange.toY(all.array[i].rate) - this.y_offset);
      this.m_ask_points.push(index0);
      ask_p_i++;
      this.m_ask_points.push(index1);
      ask_p_i++;
    }
  }
  this.m_bid_points = [];
  var index_bid = {};
  index_bid.x = Math.floor(this.m_left);
  index_bid.y = Math.ceil(this.m_pRange.toY(all.array[this.m_bid_si].rate) + this.y_offset);
  this.m_bid_points.push(index_bid);
  var bid_p_i = 0;
  for (var i = this.m_bid_si; i <= this.m_bid_ei; i++) {
    var index0 = {};
    var index1 = {};
    if (i == this.m_bid_si) {
      index0.x = Math.floor(this.m_left + all.array[i].amounts * this.m_Step + this.x_offset);
      index0.y = Math.ceil(this.m_pRange.toY(all.array[i].rate) + this.y_offset);
      this.m_bid_points.push(index0);
      bid_p_i = 1;
    } else {
      index0.x = Math.floor(this.m_left + all.array[i].amounts * this.m_Step + this.x_offset);
      index0.y = Math.ceil(this.m_bid_points[bid_p_i].y);
      index1.x = Math.floor(index0.x);
      index1.y = Math.ceil(this.m_pRange.toY(all.array[i].rate) + this.x_offset);
      this.m_bid_points.push(index0);
      bid_p_i++;
      this.m_bid_points.push(index1);
      bid_p_i++;
    }
  }
};
COrderGraphPlotter.prototype.updateData = function () {
  var all = ChartManager.getInstance().getChart()._depthData;
  if (all.array == null) {
    return false;
  }
  if (all.array.length <= 100) {
    return false;
  }
  var minRange = this.m_pRange.getOuterMinValue();
  var maxRange = this.m_pRange.getOuterMaxValue();
  this.m_ask_si = all.asks_si;
  this.m_ask_ei = all.asks_si;
  for (var i = all.asks_si; i >= all.asks_ei; i--) {
    if (all.array[i].rate < maxRange) {
      this.m_ask_ei = i;
    } else {
      break;
    }
  }
  this.m_bid_si = all.bids_si;
  this.m_bid_ei = all.bids_si;
  for (var i = all.bids_si; i <= all.bids_ei; i++) {
    if (all.array[i].rate > minRange) {
      this.m_bid_ei = i;
    } else {
      break;
    }
  }
  if (this.m_ask_ei == this.m_ask_si) {
    this.m_mode = 2;
  } else if (this.m_bid_ei == this.m_bid_si) {
    this.m_mode = 1;
  } else {
    this.m_mode = 0;
  }
  this.m_Step = this.m_pArea.getWidth();
  if (this.m_mode == 0) {
    /*
     * View: B     --------    T
     * Data: Lo      -----     Hi
     */
    if (this.m_ask_ei == all.asks_ei && this.m_bid_ei == all.bids_ei) {
      this.m_Step /= Math.min(all.array[this.m_ask_ei].amounts, all.array[this.m_bid_ei].amounts);
    }
    /*
     * View: B     --------     T
     * Data: Lo         -----   Hi
     */
    else if (this.m_ask_ei != all.asks_ei && this.m_bid_ei == all.bids_ei) {
      this.m_Step /= all.array[this.m_bid_ei].amounts;
    }
    /*
     * View: B     --------    T
     * Data: Lo  -----         Hi
     */
    else if (this.m_ask_ei == all.asks_ei && this.m_bid_ei != all.bids_ei) {
      this.m_Step /= all.array[this.m_ask_ei].amounts;
    }
    /*
     * View: B     --------    T
     * Data: Lo  ------------  Hi
     */
    else if (this.m_ask_ei != all.asks_ei && this.m_bid_ei != all.bids_ei) {
      this.m_Step /= Math.max(all.array[this.m_ask_ei].amounts,
        all.array[this.m_bid_ei].amounts);
    }
  }
  else if (this.m_mode == 1) {
    this.m_Step /= all.array[this.m_ask_ei].amounts;
  }
  else if (this.m_mode == 2) {
    this.m_Step /= all.array[this.m_bid_ei].amounts;
  }
  return true;
};
COrderGraphPlotter.prototype.Update = function () {
  this.m_pMgr = ChartManager.getInstance();
  var areaName = this.getAreaName();
  this.m_pArea = this.m_pMgr.getArea(areaName);
  if (this.m_pArea == null) {
    return false;
  }
  var rangeName = areaName.substring(0, areaName.lastIndexOf("Range"));
  this.m_pRange = this.m_pMgr.getRange(rangeName);
  if (this.m_pRange == null || this.m_pRange.getRange() == 0.0) {
    return false;
  }
  this.m_pTheme = this.m_pMgr.getTheme(this.getFrameName());
  if (this.m_pTheme == null) {
    return false;
  }
  return true;
};
COrderGraphPlotter.prototype.DrawGradations = function (context) {
  var mgr = ChartManager.getInstance();
  var areaName = this.getAreaName();
  var area = mgr.getArea(areaName);
  var rangeName = areaName.substring(0, areaName.lastIndexOf("Range"));
  var range = mgr.getRange(rangeName);
  if (range.getRange() == 0.0) {
    return;
  }
  var gradations = range.getGradations();
  if (gradations.length == 0) {
    return;
  }
  var left = area.getLeft();
  var right = area.getRight();
  var gridRects = [];
  for (var n in gradations) {
    var y = range.toY(gradations[n]);
    gridRects.push({x: left, y: y, w: 6, h: 1});
    gridRects.push({x: right - 6, y: y, w: 6, h: 1});
  }
  if (gridRects.length > 0) {
    var theme = mgr.getTheme(this.getFrameName());
    context.fillStyle = theme.getColor(Theme.Color.Grid1);
    Plotter.createRectangles(context, gridRects);
    context.fill();
  }
};
COrderGraphPlotter.prototype.FillBlack = function (context) {
  var ask_point = this.m_ask_points;
  var bid_point = this.m_bid_points;
  var ask_first_add = {};
  var ask_last_add = {};
  ask_first_add.x = this.m_right;
  ask_first_add.y = ask_point[0].y;
  ask_last_add.x = this.m_right;
  ask_last_add.y = ask_point[ask_point.length - 1].y;
  var bid_first_add = {};
  var bid_last_add = {};
  bid_first_add.x = this.m_right;
  bid_first_add.y = bid_point[0].y - 1;
  bid_last_add.x = this.m_right;
  bid_last_add.y = bid_point[bid_point.length - 1].y;
  ask_point.unshift(ask_first_add);
  ask_point.push(ask_last_add);
  bid_point.unshift(bid_first_add);
  bid_point.push(bid_last_add);
  context.fillStyle = this.m_pTheme.getColor(Theme.Color.Background);
  context.beginPath();
  context.moveTo(Math.floor(ask_point[0].x) + 0.5, Math.floor(ask_point[0].y) + 0.5);
  for (var i = 1; i < ask_point.length; i++) {
    context.lineTo(Math.floor(ask_point[i].x) + 0.5, Math.floor(ask_point[i].y) + 0.5);
  }
  context.fill();
  context.beginPath();
  context.moveTo(Math.floor(bid_point[0].x) + 0.5, Math.floor(bid_point[0].y) + 0.5);
  for (var i = 1; i < bid_point.length; i++) {
    context.lineTo(Math.floor(bid_point[i].x) + 0.5, Math.floor(bid_point[i].y) + 0.5);
  }
  context.fill();
  ask_point.shift();
  ask_point.pop();
  bid_point.shift();
  bid_point.pop();
};
COrderGraphPlotter.prototype.DrawTickerGraph = function (context) {
  return;
  var mgr = ChartManager.getInstance();
  var ds = mgr.getDataSource(this.getDataSourceName());
  var ticker = ds._dataItems[ds._dataItems.length - 1].close;
  var p1x = this.m_left + 1;
  var p1y = this.m_pRange.toY(ticker);
  var p2x = p1x + 5;
  var p2y = p1y + 2.5;
  var p3x = p1x + 5;
  var p3y = p1y - 2.5;
  context.fillStyle = this.m_pTheme.getColor(Theme.Color.Mark);
  context.strokeStyle = this.m_pTheme.getColor(Theme.Color.Mark);
};
var LastVolumePlotter = create_class(Plotter);
LastVolumePlotter.prototype.__construct = function (name) {
  LastVolumePlotter.__super.__construct.call(this, name);
};
LastVolumePlotter.prototype.Draw = function (context) {
  var mgr = ChartManager.getInstance();
  var timeline = mgr.getTimeline(this.getDataSourceName());
  var areaName = this.getAreaName();
  var area = mgr.getArea(areaName);
  var rangeName = areaName.substring(0, areaName.lastIndexOf("Range"));
  var range = mgr.getRange(rangeName);
  if (range.getRange() == 0.0) {
    return;
  }
  var ds = mgr.getDataSource(this.getDataSourceName());
  if (ds.getDataCount() < 1) {
    return;
  }
  var theme = mgr.getTheme(this.getFrameName());
  context.font = theme.getFont(Theme.Font.Default);
  context.textAlign = "left";
  context.textBaseline = "middle";
  context.fillStyle = theme.getColor(Theme.Color.RangeMark);
  context.strokeStyle = theme.getColor(Theme.Color.RangeMark);
  var v = ds.getDataAt(ds.getDataCount() - 1).volume;
  var y = range.toY(v);
  var left = area.getLeft() + 1;
  Plotter.drawLine(context, left, y, left + 7, y);
  Plotter.drawLine(context, left, y, left + 3, y + 2);
  Plotter.drawLine(context, left, y, left + 3, y - 2);
  context.fillText(String.fromFloat(v, 2), left + 10, y);
};
var LastClosePlotter = create_class(Plotter);
LastClosePlotter.prototype.__construct = function (name) {
  LastClosePlotter.__super.__construct.call(this, name);
};
LastClosePlotter.prototype.Draw = function (context) {
  var mgr = ChartManager.getInstance();
  var timeline = mgr.getTimeline(this.getDataSourceName());
  var areaName = this.getAreaName();
  var area = mgr.getArea(areaName);
  var rangeName = areaName.substring(0, areaName.lastIndexOf("Range"));
  var range = mgr.getRange(rangeName);
  if (range.getRange() == 0.0) {
    return;
  }
  var ds = mgr.getDataSource(this.getDataSourceName());
  if (ds.getDataCount() < 1) {
    return;
  }
  var v = ds._dataItems[ds._dataItems.length - 1].close;
  if (v <= range.getMinValue() || v >= range.getMaxValue()) {
    return;
  }
  var theme = mgr.getTheme(this.getFrameName());
  context.font = theme.getFont(Theme.Font.Default);
  context.textAlign = "left";
  context.textBaseline = "middle";
  context.fillStyle = theme.getColor(Theme.Color.RangeMark);
  context.strokeStyle = theme.getColor(Theme.Color.RangeMark);
  var y = range.toY(v);
  var left = area.getLeft() + 1;
  Plotter.drawLine(context, left, y, left + 7, y);
  Plotter.drawLine(context, left, y, left + 3, y + 2);
  Plotter.drawLine(context, left, y, left + 3, y - 2);
  context.fillText(String.fromFloat(v, ds.getDecimalDigits()), left + 10, y);
};
var SelectionPlotter = create_class(Plotter);
SelectionPlotter.prototype.__construct = function (name) {
  SelectionPlotter.__super.__construct.call(this, name);
};
SelectionPlotter.prototype.Draw = function (context) {
  var mgr = ChartManager.getInstance();
  if (mgr._drawingTool != ChartManager.DrawingTool.CrossCursor) {
    return;
  }
  var area = mgr.getArea(this.getAreaName());
  var timeline = mgr.getTimeline(this.getDataSourceName());
  if (timeline.getSelectedIndex() < 0) {
    return;
  }
  var range = mgr.getRange(this.getAreaName());
  var theme = mgr.getTheme(this.getFrameName());
  context.strokeStyle = theme.getColor(Theme.Color.Cursor);
  var x = timeline.toItemCenter(timeline.getSelectedIndex());
  Plotter.drawLine(context, x, area.getTop() - 1, x, area.getBottom());
  var pos = range.getSelectedPosition();
  if (pos >= 0) {
    Plotter.drawLine(context, area.getLeft(), pos, area.getRight(), pos);
  }
};
var TimelineSelectionPlotter = create_class(NamedObject);
TimelineSelectionPlotter.MonthConvert = {
  1: "Jan.",
  2: "Feb.",
  3: "Mar.",
  4: "Apr.",
  5: "May.",
  6: "Jun.",
  7: "Jul.",
  8: "Aug.",
  9: "Sep.",
  10: "Oct.",
  11: "Nov.",
  12: "Dec."
};
TimelineSelectionPlotter.prototype.__construct = function (name) {
  TimelineSelectionPlotter.__super.__construct.call(this, name);
};
TimelineSelectionPlotter.prototype.Draw = function (context) {
  var mgr = ChartManager.getInstance();
  var area = mgr.getArea(this.getAreaName());
  var timeline = mgr.getTimeline(this.getDataSourceName());
  if (timeline.getSelectedIndex() < 0) {
    return;
  }
  var ds = mgr.getDataSource(this.getDataSourceName());
  if (!is_instance(ds, MainDataSource)) {
    return;
  }
  var theme = mgr.getTheme(this.getFrameName());
  var lang = mgr.getLanguage();
  var x = timeline.toItemCenter(timeline.getSelectedIndex());
  context.fillStyle = theme.getColor(Theme.Color.Background);
  context.fillRect(x - 52.5, area.getTop() + 2.5, 106, 18);
  context.strokeStyle = theme.getColor(Theme.Color.Grid3);
  context.strokeRect(x - 52.5, area.getTop() + 2.5, 106, 18);
  context.font = theme.getFont(Theme.Font.Default);
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = theme.getColor(Theme.Color.Text4);
  var time = new Date(ds.getDataAt(timeline.getSelectedIndex()).date);
  var month = time.getMonth() + 1;
  var date = time.getDate();
  var hour = time.getHours();
  var minute = time.getMinutes();
  var strMonth = month.toString();
  var strDate = date.toString();
  var strHour = hour.toString();
  var strMinute = minute.toString();
  if (minute < 10) {
    strMinute = "0" + strMinute;
  }
  var text = "";
  if (lang == "zh-cn") {
    text = strMonth + "月" + strDate + "日  " + strHour + ":" + strMinute;
  } else if (lang == "zh-tw") {
    text = strMonth + "月" + strDate + "日  " + strHour + ":" + strMinute;
  } else if (lang == "en-us") {
    text = TimelineSelectionPlotter.MonthConvert[month] + " " + strDate + "  " + strHour + ":" + strMinute;
  }
  context.fillText(text, x, area.getMiddle());
};
var RangeSelectionPlotter = create_class(NamedObject);
RangeSelectionPlotter.prototype.__construct = function (name) {
  RangeSelectionPlotter.__super.__construct.call(this, name);
};
RangeSelectionPlotter.prototype.Draw = function (context) {
  var mgr = ChartManager.getInstance();
  var areaName = this.getAreaName();
  var area = mgr.getArea(areaName);
  var timeline = mgr.getTimeline(this.getDataSourceName());
  if (timeline.getSelectedIndex() < 0) {
    return;
  }
  var rangeName = areaName.substring(0, areaName.lastIndexOf("Range"));
  var range = mgr.getRange(rangeName);
  if (range.getRange() == 0.0 || range.getSelectedPosition() < 0) {
    return;
  }
  var v = range.getSelectedValue();
  if (v == -Number.MAX_VALUE) {
    return;
  }
  var y = range.getSelectedPosition();
  Plotter.createPolygon(context, [
    {"x": area.getLeft(), "y": y},
    {"x": area.getLeft() + 5, "y": y + 10},
    {"x": area.getRight() - 3, "y": y + 10},
    {"x": area.getRight() - 3, "y": y - 10},
    {"x": area.getLeft() + 5, "y": y - 10}
  ]);
  var theme = mgr.getTheme(this.getFrameName());
  context.fillStyle = theme.getColor(Theme.Color.Background);
  context.fill();
  context.strokeStyle = theme.getColor(Theme.Color.Grid4);
  context.stroke();
  context.font = theme.getFont(Theme.Font.Default);
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = theme.getColor(Theme.Color.Text3);
  var digits = 2;
  if (range.getNameObject().getCompAt(2) == "main") {
    digits = mgr.getDataSource(this.getDataSourceName()).getDecimalDigits();
  }
  context.fillText(String.fromFloat(v, digits), area.getCenter(), y);
};
var ChartSettings = {};
ChartSettings.checkVersion = function () {
  if (ChartSettings._data.ver < 2) {
    ChartSettings._data.ver = 2;
    var charts = ChartSettings._data.charts;
    charts.period_weight = {};
    charts.period_weight.line = 8;
    charts.period_weight["1min"] = 7;
    charts.period_weight["5min"] = 6;
    charts.period_weight["15min"] = 5;
    charts.period_weight["30min"] = 4;
    charts.period_weight["1hour"] = 3;
    charts.period_weight["1day"] = 2;
    charts.period_weight["1week"] = 1;
    charts.period_weight["3min"] = 0;
    charts.period_weight["2hour"] = 0;
    charts.period_weight["4hour"] = 0;
    charts.period_weight["6hour"] = 0;
    charts.period_weight["12hour"] = 0;
    charts.period_weight["3day"] = 0
  }
  if (ChartSettings._data.ver < 3) {
    ChartSettings._data.ver = 3;
    var charts = ChartSettings._data.charts;
    charts.areaHeight = [];
  }
};
ChartSettings.get = function () {
  if (ChartSettings._data == undefined) {
    ChartSettings.init();
    ChartSettings.load();
    ChartSettings.checkVersion();
  }
  return ChartSettings._data;
}
ChartSettings.init = function () {
  var _indic_param = {};
  var _name = new Array('MA', 'EMA', 'VOLUME', 'MACD', 'KDJ', 'StochRSI', 'RSI', 'DMI', 'OBV', 'BOLL', 'DMA', 'TRIX', 'BRAR', 'VR', 'EMV', 'WR', 'ROC', 'MTM', 'PSY');
  for (var i = 0; i < _name.length; i++) {
    var _value = ChartManager.getInstance().createIndicatorAndRange('', _name[i], true);
    if (_value == null) {
      continue;
    }
    _indic_param[_name[i]] = [];
    var param = _value.indic.getParameters();
    for (var j = 0; j < param.length; j++) {
      _indic_param[_name[i]].push(param[j]);
    }
  }
  var _chart_style = 'CandleStick';
  var _m_indic = 'MA';
  var _indic = new Array('VOLUME', 'MACD');
  var _time = 'line';
  var _frame = {};
  _frame.chartStyle = _chart_style;
  _frame.mIndic = _m_indic;
  _frame.indics = _indic;
  _frame.indicsStatus = 'close';
  _frame.period = _time;
  ChartSettings._data = {
    ver: 1,
    charts: _frame,
    indics: _indic_param,
    theme: "Dark"
  };
  ChartSettings.checkVersion();
};
/**
 * 读取cookie
 */
ChartSettings.load = function () {
  if (document.cookie.length <= 0) {
    return;
  }
  var start = document.cookie.indexOf("chartCookie=");
  if (start == -1) {
    return;
  }
  start += "chartCookie=".length;
  var end = document.cookie.indexOf(";", start);
  if (end == -1) {
    end = document.cookie.length;
  }
  var json = unescape(document.cookie.substring(start, end));
  ChartSettings._data = JSON.parse(json);
}
/**
 * 保存cookie
 */
ChartSettings.save = function () {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + 365);
  document.cookie = "chartCookie=" + escape(JSON.stringify(ChartSettings._data)) + ";expires=" + exdate.toGMTString();
}
var CPoint = create_class(NamedObject);
CPoint.state = {
  Hide: 0, Show: 1, Highlight: 2
};
CPoint.prototype.__construct = function (name) {
  CPoint.__super.__construct.call(this, name);
  this.pos = {index: -1, value: -1};
  this.state = CPoint.state.Hide;
};
CPoint.prototype.getChartObjects = function () {
  var ppMgr = ChartManager.getInstance();
  var ppCDS = ppMgr.getDataSource("frame0.k0");
  if (ppCDS == null || !is_instance(ppCDS, MainDataSource)) {
    return null;
  }
  var ppTimeline = ppMgr.getTimeline("frame0.k0");
  if (ppTimeline == null) {
    return null;
  }
  var ppRange = ppMgr.getRange("frame0.k0.main");
  if (ppRange == null) {
    return null;
  }
  return {pMgr: ppMgr, pCDS: ppCDS, pTimeline: ppTimeline, pRange: ppRange};
};
CPoint.prototype.setPosXY = function (x, y) {
  var pObj = this.getChartObjects();
  var i = pObj.pTimeline.toIndex(x);
  var v = pObj.pRange.toValue(y);
  var result = this.snapValue(i, v);
  if (result != null) {
    v = result;
  }
  this.setPosIV(i, v);
};
CPoint.prototype.setPosXYNoSnap = function (x, y) {
  var pObj = this.getChartObjects();
  var i = pObj.pTimeline.toIndex(x);
  var v = pObj.pRange.toValue(y);
  this.setPosIV(i, v);
};
CPoint.prototype.setPosIV = function (b, a) {
  this.pos = {
    index: b,
    value: a
  }
};
CPoint.prototype.getPosXY = function () {
  var c = this.getChartObjects();
  var b = c.pTimeline.toItemCenter(this.pos.index);
  var a = c.pRange.toY(this.pos.value);
  return {
    x: b,
    y: a
  }
};
CPoint.prototype.getPosIV = function () {
  return {
    i: this.pos.index,
    v: this.pos.value
  }
};
CPoint.prototype.setState = function (s) {
  this.state = s;
};
CPoint.prototype.getState = function () {
  return this.state;
};
CPoint.prototype.isSelected = function (x, y) {
  var xy = this.getPosXY();
  if (x < xy.x - 4 || x > xy.x + 4 || y < xy.y - 4 || y > xy.y + 4) {
    return false;
  }
  this.setState(CPoint.state.Highlight);
  return true;
};
CPoint.prototype.snapValue = function (i, v) {
  var pObj = this.getChartObjects();
  var result = null;
  var first = Math.floor(pObj.pTimeline.getFirstIndex());
  var last = Math.floor(pObj.pTimeline.getLastIndex());
  if (i < first || i > last) {
    return result;
  }
  var y = pObj.pRange.toY(v);
  var pData = pObj.pCDS.getDataAt(i);
  if (pData == null || pData == undefined) {
    return result;
  }
  var pDataPre = null;
  if (i > 0) {
    pDataPre = pObj.pCDS.getDataAt(i - 1);
  } else {
    pDataPre = pObj.pCDS.getDataAt(i);
  }
  var candleStickStyle = pObj.pMgr.getChartStyle(pObj.pCDS.getFrameName());
  var open = pObj.pRange.toY(pData.open);
  var high = pObj.pRange.toY(pData.high);
  var low = pObj.pRange.toY(pData.low);
  var close = pObj.pRange.toY(pData.close);
  if (candleStickStyle === "CandleStickHLC") {
    open = pObj.pRange.toY(pDataPre.close);
  }
  var dif_open = Math.abs(open - y);
  var dif_high = Math.abs(high - y);
  var dif_low = Math.abs(low - y);
  var dif_close = Math.abs(close - y);
  if (dif_open <= dif_high && dif_open <= dif_low && dif_open <= dif_close) {
    if (dif_open < 6) {
      result = pData.open;
    }
  }
  if (dif_high <= dif_open && dif_high <= dif_low && dif_high <= dif_close) {
    if (dif_high < 6) {
      result = pData.high;
    }
  }
  if (dif_low <= dif_open && dif_low <= dif_high && dif_low <= dif_close) {
    if (dif_low < 6) {
      result = pData.low;
    }
  }
  if (dif_close <= dif_open && dif_close <= dif_high && dif_close <= dif_low) {
    if (dif_close < 6) {
      result = pData.close;
    }
  }
  return result;
};
var CToolObject = create_class(NamedObject);
CToolObject.state = {
  BeforeDraw: 0,
  Draw: 1,
  AfterDraw: 2
};
CToolObject.prototype.__construct = function (name) {
  CToolObject.__super.__construct.call(this, name);
  this.drawer = null;
  this.state = CToolObject.state.BeforeDraw;
  this.points = [];
  this.step = 0;
};
CToolObject.prototype.getChartObjects = function () {
  var ppMgr = ChartManager.getInstance();
  var ppCDS = ppMgr.getDataSource("frame0.k0");
  if (ppCDS == null || !is_instance(ppCDS, MainDataSource)) {
    return null;
  }
  var ppTimeline = ppMgr.getTimeline("frame0.k0");
  if (ppTimeline == null) {
    return null;
  }
  var ppArea = ppMgr.getArea('frame0.k0.main');
  if (ppArea == null) {
    return null;
  }
  var ppRange = ppMgr.getRange("frame0.k0.main");
  if (ppRange == null) {
    return null;
  }
  return {pMgr: ppMgr, pCDS: ppCDS, pTimeline: ppTimeline, pArea: ppArea, pRange: ppRange};
};
CToolObject.prototype.isValidMouseXY = function (x, y) {
  var pObj = this.getChartObjects();
  var areaPos = {
    left: pObj.pArea.getLeft(),
    top: pObj.pArea.getTop(),
    right: pObj.pArea.getRight(),
    bottom: pObj.pArea.getBottom()
  };
  if (x < areaPos.left || x > areaPos.right || y < areaPos.top || y > areaPos.bottom) {
    return false;
  }
  return true;
};
CToolObject.prototype.getPlotter = function () {
  return this.drawer;
};
CToolObject.prototype.setState = function (s) {
  this.state = s;
};
CToolObject.prototype.getState = function () {
  return this.state;
};
CToolObject.prototype.addPoint = function (point) {
  this.points.push(point);
};
CToolObject.prototype.getPoint = function (i) {
  return this.points[i];
};
CToolObject.prototype.acceptMouseMoveEvent = function (x, y) {
  if (this.isValidMouseXY(x, y) == false) {
    return false;
  }
  if (this.state == CToolObject.state.BeforeDraw) {
    this.setBeforeDrawPos(x, y);
  } else if (this.state == CToolObject.state.Draw) {
    this.setDrawPos(x, y);
  } else if (this.state == CToolObject.state.AfterDraw) {
    this.setAfterDrawPos(x, y);
  }
  return true;
};
CToolObject.prototype.acceptMouseDownEvent = function (x, y) {
  if (this.isValidMouseXY(x, y) == false) {
    return false;
  }
  if (this.state == CToolObject.state.BeforeDraw) {
    this.setDrawPos(x, y);
    this.setState(CToolObject.state.Draw);
  } else if (this.state == CToolObject.state.Draw) {
    this.setAfterDrawPos(x, y);
    if (this.step == 0)
      this.setState(CToolObject.state.AfterDraw);
  } else if (this.state == CToolObject.state.AfterDraw) {
    if (CToolObject.prototype.isSelected.call(this, x, y)) {
      this.setDrawPos(x, y);
      this.setState(CToolObject.state.Draw);
    } else {
      this.oldx = x;
      this.oldy = y;
    }
  }
  return true;
};
CToolObject.prototype.acceptMouseDownMoveEvent = function (x, y) {
  if (this.isValidMouseXY(x, y) == false) {
    return false;
  }
  if (this.state == CToolObject.state.Draw) {
    this.setDrawPos(x, y);
  } else if (this.state == CToolObject.state.AfterDraw) {
    var pObj = this.getChartObjects();
    var _width = pObj.pTimeline.getItemWidth();
    var _height = pObj.pRange;
    if (Math.abs(x - this.oldx) < _width && Math.abs(y - this.oldy) == 0) {
      return true;
    }
    var _old_x = pObj.pTimeline.toIndex(this.oldx);
    var _old_y = pObj.pRange.toValue(this.oldy);
    var _new_x = pObj.pTimeline.toIndex(x);
    var _new_y = pObj.pRange.toValue(y);
    this.oldx = x;
    this.oldy = y;
    var _dif_x = _new_x - _old_x;
    var _dif_y = _new_y - _old_y;
    for (var index in this.points) {
      this.points[index].pos.index += _dif_x;
      this.points[index].pos.value += _dif_y;
    }
  }
  return true;
};
CToolObject.prototype.acceptMouseUpEvent = function (x, y) {
  if (this.isValidMouseXY(x, y) == false) {
    return false;
  }
  if (this.state == CToolObject.state.Draw) {
    this.setAfterDrawPos(x, y);
    if (this.step == 0) {
      this.setState(CToolObject.state.AfterDraw);
    }
    return true;
  }
  return false;
};
CToolObject.prototype.setBeforeDrawPos = function (x, y) {
  for (var index in this.points) {
    this.points[index].setPosXY(x, y);
    this.points[index].setState(CPoint.state.Show);
  }
};
CToolObject.prototype.setDrawPos = function (x, y) {
  for (var index in this.points) {
    if (this.points[index].getState() == CPoint.state.Highlight) {
      this.points[index].setPosXY(x, y);
    }
  }
};
CToolObject.prototype.setAfterDrawPos = function (x, y) {
  if (this.step != 0) {
    this.step -= 1;
  }
  for (var index in this.points) {
    this.points[index].setState(CPoint.state.Hide);
  }
  if (this.step == 0) {
    var pObj = this.getChartObjects();
    pObj.pMgr.setNormalMode();
  }
};
CToolObject.prototype.isSelected = function (x, y) {
  var isFind = false;
  for (var index in this.points) {
    if (this.points[index].isSelected(x, y)) {
      this.points[index].setState(CPoint.state.Highlight);
      isFind = true;
      break;
    }
  }
  if (isFind == true) {
    this.select();
    return true;
  }
  return false;
};
CToolObject.prototype.select = function () {
  for (var index in this.points) {
    if (this.points[index].getState() == CPoint.state.Hide) {
      this.points[index].setState(CPoint.state.Show);
    }
  }
};
CToolObject.prototype.unselect = function () {
  for (var index in this.points) {
    if (this.points[index].getState() != CPoint.state.Hide) {
      this.points[index].setState(CPoint.state.Hide);
    }
  }
};
CToolObject.prototype.calcDistance = function (point1, point2, point3) {
  var xa = point1.getPosXY().x;
  var ya = point1.getPosXY().y;
  var xb = point2.getPosXY().x;
  var yb = point2.getPosXY().y;
  var xc = point3.getPosXY().x;
  var yc = point3.getPosXY().y;
  var a1 = xa - xc;
  var a2 = ya - yc;
  var b1 = xb - xc;
  var b2 = yb - yc;
  var area = Math.abs(a1 * b2 - a2 * b1);
  var len = Math.sqrt(Math.pow((xb - xa), 2) + Math.pow((yb - ya), 2));
  return area / len;
};
CToolObject.prototype.calcGap = function (r, x, y) {
  var xa = r.sx;
  var ya = r.sy;
  var xb = r.ex;
  var yb = r.ey;
  var xc = x;
  var yc = y;
  var a1 = xa - xc;
  var a2 = ya - yc;
  var b1 = xb - xc;
  var b2 = yb - yc;
  var area = Math.abs(a1 * b2 - a2 * b1);
  var len = Math.sqrt(Math.pow((xb - xa), 2) + Math.pow((yb - ya), 2));
  return area / len;
};
CToolObject.prototype.isWithRect = function (point1, point2, point3) {
  var sx = point1.getPosXY().x;
  var sy = point1.getPosXY().y;
  var ex = point2.getPosXY().x;
  var ey = point2.getPosXY().y;
  var x = point3.getPosXY().x;
  var y = point3.getPosXY().y;
  if (sx > ex) {
    sx += 4;
    ex -= 4;
  } else {
    sx -= 4;
    ex += 4;
  }
  if (sy > ey) {
    sy += 4;
    ey -= 4;
  } else {
    sy -= 4;
    ey += 4;
  }
  if (sx <= x && ex >= x && sy <= y && ey >= y) {
    return true;
  }
  if (sx >= x && ex <= x && sy <= y && ey >= y) {
    return true;
  }
  if (sx <= x && ex >= x && sy >= y && ey <= y) {
    return true;
  }
  if (sx >= x && ex <= x && sy >= y && ey <= y) {
    return true;
  }
  return false;
};
CBiToolObject = create_class(CToolObject);
CBiToolObject.prototype.__construct = function (name) {
  CBiToolObject.__super.__construct.call(this, name);
  this.addPoint(new CPoint(name));
  this.addPoint(new CPoint(name));
};
CBiToolObject.prototype.setBeforeDrawPos = function (x, y) {
  this.step = 1;
  CBiToolObject.__super.setBeforeDrawPos.call(this, x, y);
  this.getPoint(0).setState(CPoint.state.Show);
  this.getPoint(1).setState(CPoint.state.Highlight);
};
CTriToolObject = create_class(CToolObject);
CTriToolObject.prototype.__construct = function (name) {
  CTriToolObject.__super.__construct.call(this, name);
  this.addPoint(new CPoint(name));
  this.addPoint(new CPoint(name));
  this.addPoint(new CPoint(name));
};
CTriToolObject.prototype.setBeforeDrawPos = function (x, y) {
  this.step = 2;
  CBiToolObject.__super.setBeforeDrawPos.call(this, x, y);
  this.getPoint(0).setState(CPoint.state.Show);
  this.getPoint(1).setState(CPoint.state.Show);
  this.getPoint(2).setState(CPoint.state.Highlight);
};
CTriToolObject.prototype.setAfterDrawPos = function (x, y) {
  if (this.step != 0) {
    this.step -= 1;
  }
  if (this.step == 0) {
    for (var index in this.points) {
      this.points[index].setState(CPoint.state.Hide);
    }
  } else {
    this.getPoint(0).setState(CPoint.state.Show);
    this.getPoint(1).setState(CPoint.state.Highlight);
    this.getPoint(2).setState(CPoint.state.Show);
  }
  if (this.step == 0) {
    var pObj = this.getChartObjects();
    pObj.pMgr.setNormalMode();
  }
};
var CBandLineObject = create_class(CBiToolObject);
CBandLineObject.prototype.__construct = function (name) {
  CBandLineObject.__super.__construct.call(this, name);
  this.drawer = new DrawBandLinesPlotter(name, this);
};
CBandLineObject.prototype.isSelected = function (x, y) {
  if (CBandLineObject.__super.isSelected.call(this, x, y) == true) {
    return true;
  }
  var c = new CPoint("frame0.k0");
  c.setPosXY(x, y);
  var sx = this.getPoint(0).getPosXY().x;
  var sy = this.getPoint(0).getPosXY().y;
  var ex = this.getPoint(1).getPosXY().x;
  var ey = this.getPoint(1).getPosXY().y;
  var fibSequence = [100.0, 87.5, 75.0, 62.5, 50.0, 37.5, 25.0, 12.5, 0.0];
  for (var i = 0; i < fibSequence.length; i++) {
    var stage_y = sy + (100 - fibSequence[i]) / 100 * (ey - sy);
    if (stage_y < y + 4 && stage_y > y - 4) {
      this.select();
      return true;
    }
  }
  return false;
};
var CBiParallelLineObject = create_class(CTriToolObject);
CBiParallelLineObject.prototype.__construct = function (name) {
  CBiParallelLineObject.__super.__construct.call(this, name);
  this.drawer = new DrawBiParallelLinesPlotter(name, this);
};
CBiParallelLineObject.prototype.isSelected = function (x, y) {
  if (CTriParallelLineObject.__super.isSelected.call(this, x, y) == true) {
    return true;
  }
  var _0x = this.getPoint(0).getPosXY().x;
  var _0y = this.getPoint(0).getPosXY().y;
  var _1x = this.getPoint(1).getPosXY().x;
  var _1y = this.getPoint(1).getPosXY().y;
  var _2x = this.getPoint(2).getPosXY().x;
  var _2y = this.getPoint(2).getPosXY().y;
  var _a = {x: _0x - _1x, y: _0y - _1y};
  var _b = {x: _0x - _2x, y: _0y - _2y};
  var _c = {x: _a.x + _b.x, y: _a.y + _b.y};
  var _3x = _0x - _c.x;
  var _3y = _0y - _c.y;
  var r1 = {sx: _0x, sy: _0y, ex: _2x, ey: _2y};
  var r2 = {sx: _1x, sy: _1y, ex: _3x, ey: _3y};
  if (this.calcGap(r1, x, y) > 4 && this.calcGap(r2, x, y) > 4) {
    return false;
  }
  return true;
};
var CBiParallelRayLineObject = create_class(CTriToolObject);
CBiParallelRayLineObject.prototype.__construct = function (name) {
  CBiParallelRayLineObject.__super.__construct.call(this, name);
  this.drawer = new DrawBiParallelRayLinesPlotter(name, this);
};
CBiParallelRayLineObject.prototype.isSelected = function (x, y) {
  if (CTriParallelLineObject.__super.isSelected.call(this, x, y) == true) {
    return true;
  }
  var _0x = this.getPoint(0).getPosXY().x;
  var _0y = this.getPoint(0).getPosXY().y;
  var _1x = this.getPoint(1).getPosXY().x;
  var _1y = this.getPoint(1).getPosXY().y;
  var _2x = this.getPoint(2).getPosXY().x;
  var _2y = this.getPoint(2).getPosXY().y;
  var _a = {x: _0x - _1x, y: _0y - _1y};
  var _b = {x: _0x - _2x, y: _0y - _2y};
  var _c = {x: _a.x + _b.x, y: _a.y + _b.y};
  var _3x = _0x - _c.x;
  var _3y = _0y - _c.y;
  var r1 = {sx: _0x, sy: _0y, ex: _2x, ey: _2y};
  var r2 = {sx: _1x, sy: _1y, ex: _3x, ey: _3y};
  if ((r1.ex > r1.sx && x > r1.sx - 4) || (r1.ex < r1.sx && x < r1.sx + 4) ||
    (r2.ex > r2.sx && x > r2.sx - 4) || (r2.ex < r2.sx && x < r2.sx + 4)) {
    if (this.calcGap(r1, x, y) > 4 && this.calcGap(r2, x, y) > 4) {
      return false;
    }
  } else {
    return false;
  }
  this.select();
  return true;
};
var CFibFansObject = create_class(CBiToolObject);
CFibFansObject.prototype.__construct = function (name) {
  CFibFansObject.__super.__construct.call(this, name);
  this.drawer = new DrawFibFansPlotter(name, this);
};
CFibFansObject.prototype.isSelected = function (x, y) {
  if (CFibFansObject.__super.isSelected.call(this, x, y) == true) {
    return true;
  }
  var c = new CPoint("frame0.k0");
  c.setPosXY(x, y);
  var sx = this.getPoint(0).getPosXY().x;
  var sy = this.getPoint(0).getPosXY().y;
  var ex = this.getPoint(1).getPosXY().x;
  var ey = this.getPoint(1).getPosXY().y;
  var pObj = this.getChartObjects();
  var areaPos = {
    left: pObj.pArea.getLeft(),
    top: pObj.pArea.getTop(),
    right: pObj.pArea.getRight(),
    bottom: pObj.pArea.getBottom()
  };
  var fibFansSequence = [0, 38.2, 50, 61.8];
  for (var i = 0; i < fibFansSequence.length; i++) {
    var stageY = sy + (100 - fibFansSequence[i]) / 100 * (ey - sy);
    var tempStartPt = {x: sx, y: sy};
    var tempEndPt = {x: ex, y: stageY};
    var crossPt = getRectCrossPt(areaPos, tempStartPt, tempEndPt);
    var lenToStartPt = Math.pow((crossPt[0].x - sx), 2) + Math.pow((crossPt[0].y - sy), 2);
    var lenToEndPt = Math.pow((crossPt[0].x - ex), 2) + Math.pow((crossPt[0].y - ey), 2);
    var tempCrossPt = lenToStartPt > lenToEndPt ? {x: crossPt[0].x, y: crossPt[0].y} : {
      x: crossPt[1].x,
      y: crossPt[1].y
    };
    if (tempCrossPt.x > sx && x < sx) {
      continue;
    }
    if (tempCrossPt.x < sx && x > sx) {
      continue;
    }
    var a = new CPoint("frame0.k0");
    a.setPosXY(sx, sy);
    var b = new CPoint("frame0.k0");
    b.setPosXY(tempCrossPt.x, tempCrossPt.y);
    if (this.calcDistance(a, b, c) > 4) {
      continue;
    }
    this.select();
    return true;
  }
  return false;
};
var CFibRetraceObject = create_class(CBiToolObject);
CFibRetraceObject.prototype.__construct = function (name) {
  CFibRetraceObject.__super.__construct.call(this, name);
  this.drawer = new DrawFibRetracePlotter(name, this);
};
CFibRetraceObject.prototype.isSelected = function (x, y) {
  if (CFibRetraceObject.__super.isSelected.call(this, x, y) == true) {
    return true;
  }
  var c = new CPoint("frame0.k0");
  c.setPosXY(x, y);
  var sx = this.getPoint(0).getPosXY().x;
  var sy = this.getPoint(0).getPosXY().y;
  var ex = this.getPoint(1).getPosXY().x;
  var ey = this.getPoint(1).getPosXY().y;
  var fibSequence = [100.0, 78.6, 61.8, 50.0, 38.2, 23.6, 0.0];
  for (var i = 0; i < fibSequence.length; i++) {
    var stage_y = sy + (100 - fibSequence[i]) / 100 * (ey - sy);
    if (stage_y < y + 4 && stage_y > y - 4) {
      this.select();
      return true;
    }
  }
  return false;
};
var CHoriRayLineObject = create_class(CBiToolObject);
CHoriRayLineObject.prototype.__construct = function (name) {
  CHoriRayLineObject.__super.__construct.call(this, name);
  this.drawer = new DrawHoriRayLinesPlotter(name, this);
};
CHoriRayLineObject.prototype.setDrawPos = function (x, y) {
  if (this.points[0].getState() == CPoint.state.Highlight) {
    this.points[0].setPosXY(x, y);
    this.points[1].setPosXYNoSnap(this.points[1].getPosXY().x, this.points[0].getPosXY().y);
    return;
  }
  if (this.points[1].getState() == CPoint.state.Highlight) {
    this.points[1].setPosXY(x, y);
    this.points[0].setPosXYNoSnap(this.points[0].getPosXY().x, this.points[1].getPosXY().y);
  }
};
CHoriRayLineObject.prototype.isSelected = function (x, y) {
  if (CHoriRayLineObject.__super.isSelected.call(this, x, y) == true) {
    return true;
  }
  var c = new CPoint("frame0.k0");
  c.setPosXY(x, y);
  var sy = this.getPoint(0).getPosXY().y;
  var sx = this.getPoint(0).getPosXY().x;
  var ex = this.getPoint(1).getPosXY().x;
  if (y > sy + 4 || y < sy - 4) {
    return false;
  }
  if (ex > sx && x < sx - 4) {
    return false;
  }
  if (ex < sx && x > sx + 4) {
    return false;
  }
  this.select();
  return true;
};
var CHoriSegLineObject = create_class(CBiToolObject);
CHoriSegLineObject.prototype.__construct = function (name) {
  CHoriSegLineObject.__super.__construct.call(this, name);
  this.drawer = new DrawHoriSegLinesPlotter(name, this);
};
CHoriSegLineObject.prototype.setDrawPos = function (x, y) {
  if (this.points[0].getState() == CPoint.state.Highlight) {
    this.points[0].setPosXY(x, y);
    this.points[1].setPosXYNoSnap(this.points[1].getPosXY().x, this.points[0].getPosXY().y);
    return;
  }
  if (this.points[1].getState() == CPoint.state.Highlight) {
    this.points[1].setPosXY(x, y);
    this.points[0].setPosXYNoSnap(this.points[0].getPosXY().x, this.points[1].getPosXY().y);
  }
};
CHoriSegLineObject.prototype.isSelected = function (x, y) {
  if (CHoriSegLineObject.__super.isSelected.call(this, x, y) == true) {
    return true;
  }
  var c = new CPoint("frame0.k0");
  c.setPosXY(x, y);
  var sy = this.getPoint(0).getPosXY().y;
  var sx = this.getPoint(0).getPosXY().x;
  var ex = this.getPoint(1).getPosXY().x;
  if (y > sy + 4 || y < sy - 4) {
    return false;
  }
  if (sx > ex && (x > sx + 4 || x < ex - 4)) {
    return false;
  }
  if (sx < ex && (x < sx - 4 || x > ex + 4)) {
    return false;
  }
  this.select();
  return true;
};
var CHoriStraightLineObject = create_class(CBiToolObject);
CHoriStraightLineObject.prototype.__construct = function (name) {
  CHoriStraightLineObject.__super.__construct.call(this, name);
  this.drawer = new DrawHoriStraightLinesPlotter(name, this);
};
CHoriStraightLineObject.prototype.setDrawPos = function (x, y) {
  for (var index in this.points) {
    this.points[index].setPosXY(x, y);
  }
};
CHoriStraightLineObject.prototype.isSelected = function (x, y) {
  if (CHoriStraightLineObject.__super.isSelected.call(this, x, y) == true) {
    return true;
  }
  var c = new CPoint("frame0.k0");
  c.setPosXY(x, y);
  var sy = this.getPoint(0).getPosXY().y;
  if (y > sy + 4 || y < sy - 4) {
    return false;
  }
  this.select();
  return true;
};
var CRayLineObject = create_class(CBiToolObject);
CRayLineObject.prototype.__construct = function (name) {
  CRayLineObject.__super.__construct.call(this, name);
  this.drawer = new DrawRayLinesPlotter(name, this);
};
CRayLineObject.prototype.isSelected = function (x, y) {
  if (CRayLineObject.__super.isSelected.call(this, x, y) == true) {
    return true;
  }
  var c = new CPoint("frame0.k0");
  c.setPosXY(x, y);
  var sx = this.getPoint(0).getPosXY().x;
  var ex = this.getPoint(1).getPosXY().x;
  if (ex > sx && x < sx - 4) {
    return false;
  }
  if (ex < sx && x > sx + 4) {
    return false;
  }
  if (this.calcDistance(this.getPoint(0), this.getPoint(1), c) < 4) {
    this.select();
    return true;
  }
  return false;
};
var CSegLineObject = create_class(CBiToolObject);
CSegLineObject.prototype.__construct = function (name) {
  CSegLineObject.__super.__construct.call(this, name);
  this.drawer = new DrawSegLinesPlotter(name, this);
};
CSegLineObject.prototype.isSelected = function (x, y) {
  if (CSegLineObject.__super.isSelected.call(this, x, y) == true) {
    return true;
  }
  var c = new CPoint("frame0.k0");
  c.setPosXY(x, y);
  if (this.isWithRect(this.getPoint(0), this.getPoint(1), c) == false) {
    return false;
  }
  if (this.calcDistance(this.getPoint(0), this.getPoint(1), c) < 4) {
    this.select();
    return true;
  }
  return false;
};
var CStraightLineObject = create_class(CBiToolObject);
CStraightLineObject.prototype.__construct = function (name) {
  CStraightLineObject.__super.__construct.call(this, name);
  this.drawer = new DrawStraightLinesPlotter(name, this);
};
CStraightLineObject.prototype.isSelected = function (x, y) {
  if (CStraightLineObject.__super.isSelected.call(this, x, y) == true) {
    return true;
  }
  var c = new CPoint("frame0.k0");
  c.setPosXY(x, y);
  if (this.calcDistance(this.getPoint(0), this.getPoint(1), c) < 4) {
    this.select();
    return true;
  }
  return false;
};
var CTriParallelLineObject = create_class(CTriToolObject);
CTriParallelLineObject.prototype.__construct = function (name) {
  CTriParallelLineObject.__super.__construct.call(this, name);
  this.drawer = new DrawTriParallelLinesPlotter(name, this);
};
CTriParallelLineObject.prototype.isSelected = function (x, y) {
  if (CTriParallelLineObject.__super.isSelected.call(this, x, y) == true) {
    return true;
  }
  var pObj = this.getChartObjects();
  var _0x = this.getPoint(0).getPosXY().x;
  var _0y = this.getPoint(0).getPosXY().y;
  var _1x = this.getPoint(1).getPosXY().x;
  var _1y = this.getPoint(1).getPosXY().y;
  var _2x = this.getPoint(2).getPosXY().x;
  var _2y = this.getPoint(2).getPosXY().y;
  var _a = {x: _0x - _1x, y: _0y - _1y};
  var _b = {x: _0x - _2x, y: _0y - _2y};
  var _c = {x: _a.x + _b.x, y: _a.y + _b.y};
  var _3x = _0x - _c.x;
  var _3y = _0y - _c.y;
  var r1 = {sx: _0x, sy: _0y, ex: _2x, ey: _2y};
  var r2 = {sx: _1x, sy: _1y, ex: _3x, ey: _3y};
  var _i = {x: _0x - _1x, y: _0y - _1y};
  var _j = {x: _2x - _3x, y: _2y - _3y};
  var _ri = {x: _1x - _0x, y: _1y - _0y};
  var _rj = {x: _3x - _2x, y: _3y - _2y};
  var _4x = Math.abs(_ri.x - _0x);
  var _4y = Math.abs(_ri.y - _0y);
  var _5x = Math.abs(_rj.x - _2x);
  var _5y = Math.abs(_rj.y - _2y);
  var r3 = {sx: _4x, sy: _4y, ex: _5x, ey: _5y};
  if (this.calcGap(r1, x, y) > 4 && this.calcGap(r2, x, y) > 4 && this.calcGap(r3, x, y) > 4) {
    return false;
  }
  this.select();
  return true;
};
var CVertiStraightLineObject = create_class(CBiToolObject);
CVertiStraightLineObject.prototype.__construct = function (name) {
  CVertiStraightLineObject.__super.__construct.call(this, name);
  this.drawer = new DrawVertiStraightLinesPlotter(name, this);
};
CVertiStraightLineObject.prototype.setDrawPos = function (x, y) {
  for (var index in this.points) {
    this.points[index].setPosXY(x, y);
  }
};
CVertiStraightLineObject.prototype.isSelected = function (x, y) {
  if (CVertiStraightLineObject.__super.isSelected.call(this, x, y) == true) {
    return true;
  }
  var c = new CPoint("frame0.k0");
  c.setPosXY(x, y);
  var sx = this.getPoint(0).getPosXY().x;
  if (x > sx + 4 || x < sx - 4) {
    return false;
  }
  this.select();
  return true;
};
var CPriceLineObject = create_class(CSegLineObject);
CPriceLineObject.prototype.__construct = function (name) {
  CPriceLineObject.__super.__construct.call(this, name);
  this.drawer = new DrawPriceLinesPlotter(name, this);
};
CPriceLineObject.prototype.setDrawPos = function (x, y) {
  for (var index in this.points) {
    this.points[index].setPosXY(x, y);
  }
};
CPriceLineObject.prototype.isSelected = function (x, y) {
  if (CFibRetraceObject.__super.isSelected.call(this, x, y) == true) {
    return true;
  }
  var c = new CPoint("frame0.k0");
  c.setPosXY(x, y);
  var sx = this.getPoint(0).getPosXY().x;
  var sy = this.getPoint(0).getPosXY().y;
  var ex = this.getPoint(1).getPosXY().x;
  var ey = this.getPoint(1).getPosXY().y;
  if (x < sx - 4) {
    return false;
  }
  if (y >= sy + 4 || y <= sy - 4) {
    return false;
  }
  this.select();
  return true;
};
var CArrowLineObject = create_class(CSegLineObject);
CArrowLineObject.prototype.__construct = function (name) {
  CArrowLineObject.__super.__construct.call(this, name);
  this.drawer = new DrawArrowLinesPlotter(name, this);
};
var CToolManager = create_class(NamedObject);
CToolManager.prototype.__construct = function (name) {
  CToolManager.__super.__construct.call(this, name);
  this.selectedObject = -1;
  this.toolObjects = [];
};
CToolManager.prototype.getToolObjectCount = function () {
  return this.toolObjects.length;
};
CToolManager.prototype.addToolObject = function (o) {
  this.toolObjects.push(o);
};
CToolManager.prototype.getToolObject = function (i) {
  if (i < this.toolObjects.length && i >= 0) {
    return this.toolObjects[i];
  }
  return null;
};
CToolManager.prototype.getCurrentObject = function () {
  return this.getToolObject(this.getToolObjectCount() - 1);
};
CToolManager.prototype.getSelectedObject = function () {
  return this.getToolObject(this.selectedObject);
};
CToolManager.prototype.delCurrentObject = function () {
  this.toolObjects.splice(this.getToolObjectCount() - 1, 1);
};
CToolManager.prototype.delSelectedObject = function () {
  this.toolObjects.splice(this.selectedObject, 1);
  this.selectedObject = -1;
};
CToolManager.prototype.acceptMouseMoveEvent = function (x, y) {
  if (this.selectedObject == -1) {
    var curr = this.toolObjects[this.getToolObjectCount() - 1];
    if (curr != null && curr.getState() != CToolObject.state.AfterDraw) {
      return curr.acceptMouseMoveEvent(x, y);
    }
  } else {
    var sel = this.toolObjects[this.selectedObject];
    if (sel.getState() == CToolObject.state.Draw) {
      return sel.acceptMouseMoveEvent(x, y);
    }
    sel.unselect();
    this.selectedObject = -1;
  }
  for (var index in this.toolObjects) {
    if (this.toolObjects[index].isSelected(x, y)) {
      this.selectedObject = index;
      return false;
    }
  }
  return false;
};
CToolManager.prototype.acceptMouseDownEvent = function (x, y) {
  this.mouseDownMove = false;
  if (this.selectedObject == -1) {
    var curr = this.toolObjects[this.getToolObjectCount() - 1];
    if (curr != null && curr.getState() != CToolObject.state.AfterDraw) {
      return curr.acceptMouseDownEvent(x, y);
    }
  } else {
    var sel = this.toolObjects[this.selectedObject];
    if (sel.getState() != CToolObject.state.BeforeDraw) {
      return sel.acceptMouseDownEvent(x, y);
    }
  }
  return false;
};
CToolManager.prototype.acceptMouseDownMoveEvent = function (x, y) {
  this.mouseDownMove = true;
  if (this.selectedObject == -1) {
    var curr = this.toolObjects[this.getToolObjectCount() - 1];
    if (curr != null && curr.getState() == CToolObject.state.Draw) {
      return curr.acceptMouseDownMoveEvent(x, y);
    }
    return false;
  } else {
    var sel = this.toolObjects[this.selectedObject];
    if (sel.getState() != CToolObject.state.BeforeDraw) {
      if (sel.acceptMouseDownMoveEvent(x, y) == true) {
        var point = this.toolObjects[this.selectedObject].points;
        for (var i = 0; i < point.length; i++) {
          if (point[i].state == CPoint.state.Highlight || point[i].state == CPoint.state.Show) {
            return true;
          }
        }
      }
      return true;
    }
  }
};
CToolManager.prototype.acceptMouseUpEvent = function (x, y) {
  if (this.mouseDownMove == true) {
    if (this.selectedObject == -1) {
      var curr = this.toolObjects[this.getToolObjectCount() - 1];
      if (curr != null && curr.getState() == CToolObject.state.Draw) {
        return curr.acceptMouseUpEvent(x, y);
      }
      return true;
    } else {
      var sel = this.toolObjects[this.selectedObject];
      if (sel.getState() != CToolObject.state.BeforeDraw) {
        return sel.acceptMouseUpEvent(x, y);
      }
    }
  }
  if (this.selectedObject != -1) {
    return true;
  }
  var curr = this.toolObjects[this.getToolObjectCount() - 1];
  if (curr != null) {
    if (curr.getState() == CToolObject.state.Draw) {
      return true;
    }
    if (!curr.isValidMouseXY(x, y)) {
      return false;
    }
    if (curr.isSelected(x, y)) {
      return true;
    }
  }
  return false;
};
var CToolPlotter = create_class(NamedObject);
CToolPlotter.prototype.__construct = function (name, toolObject) {
  CToolPlotter.__super.__construct.call(this, name);
  this.toolObject = toolObject;
  var pMgr = ChartManager.getInstance();
  var pArea = pMgr.getArea('frame0.k0.main');
  if (pArea == null) {
    this.areaPos = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return;
  }
  this.areaPos = {
    left: pArea.getLeft(),
    top: pArea.getTop(),
    right: pArea.getRight(),
    bottom: pArea.getBottom()
  };
  this.crossPt = {};
  this.normalSize = 4;
  this.selectedSize = 6;
  this.cursorLen = 4;
  this.cursorGapLen = 3;
  this.theme = ChartManager.getInstance().getTheme(this.getFrameName());
};
CToolPlotter.prototype.drawCursor = function (context) {
  this.drawCrossCursor(context);
};
CToolPlotter.prototype.drawCrossCursor = function (context) {
  context.strokeStyle = this.theme.getColor(Theme.Color.LineColorNormal);
  context.fillStyle = this.theme.getColor(Theme.Color.LineColorNormal);
  var tempPt = this.toolObject.getPoint(0).getPosXY();
  if (tempPt == null) {
    return;
  }
  var x = tempPt.x;
  var y = tempPt.y;
  var cursorLen = this.cursorLen;
  var cursorGapLen = this.cursorGapLen;
  context.fillRect(x, y, 1, 1);
  Plotter.drawLine(context, x - cursorLen - cursorGapLen, y, x - cursorGapLen, y);
  Plotter.drawLine(context, x + cursorLen + cursorGapLen, y, x + cursorGapLen, y);
  Plotter.drawLine(context, x, y - cursorLen - cursorGapLen, x, y - cursorGapLen);
  Plotter.drawLine(context, x, y + cursorLen + cursorGapLen, x, y + cursorGapLen);
};
CToolPlotter.prototype.drawCircle = function (context, center, radius) {
  var centerX = center.x;
  var centerY = center.y;
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  context.fillStyle = this.theme.getColor(Theme.Color.CircleColorFill);
  context.fill();
  context.stroke();
};
CToolPlotter.prototype.drawCtrlPt = function (context) {
  context.strokeStyle = this.theme.getColor(Theme.Color.CircleColorStroke);
  for (var i = 0; i < this.ctrlPtsNum; i++) {
    this.drawCircle(context, this.ctrlPts[1][i], this.normalSize);
  }
};
CToolPlotter.prototype.highlightCtrlPt = function (context) {
  context.strokeStyle = this.theme.getColor(Theme.Color.CircleColorStroke);
  for (var i = 0; i < this.ctrlPtsNum; i++) {
    if (this.toolObject.getPoint(i).getState() == CPoint.state.Highlight) {
      this.drawCircle(context, this.ctrlPts[1][i], this.selectedSize);
    }
  }
};
CToolPlotter.prototype.drawFibRayLines = function (context, startPoint, endPoint) {
  for (var i = 0; i < this.fiboFansSequence.length; i++) {
    var stageY = startPoint.y + (100 - this.fiboFansSequence[i]) / 100 * (endPoint.y - startPoint.y);
    var tempStartPt = {x: startPoint.x, y: startPoint.y};
    var tempEndPt = {x: endPoint.x, y: stageY};
    this.drawRayLines(context, tempStartPt, tempEndPt);
  }
};
CToolPlotter.prototype.drawRayLines = function (context, startPoint, endPoint) {
  this.getAreaPos();
  var tempStartPt = {x: startPoint.x, y: startPoint.y};
  var tempEndPt = {x: endPoint.x, y: endPoint.y};
  var crossPt = getRectCrossPt(this.areaPos, tempStartPt, tempEndPt);
  var tempCrossPt;
  if (endPoint.x == startPoint.x) {
    if (endPoint.y == startPoint.y) {
      tempCrossPt = endPoint;
    } else {
      tempCrossPt = endPoint.y > startPoint.y ? {x: crossPt[1].x, y: crossPt[1].y} : {x: crossPt[0].x, y: crossPt[0].y}
    }
  } else {
    tempCrossPt = endPoint.x > startPoint.x ? {x: crossPt[1].x, y: crossPt[1].y} : {x: crossPt[0].x, y: crossPt[0].y}
  }
  Plotter.drawLine(context, startPoint.x, startPoint.y, tempCrossPt.x, tempCrossPt.y);
};
CToolPlotter.prototype.lenBetweenPts = function (pt1, pt2) {
  return Math.sqrt(Math.pow((pt2.x - pt1.x), 2) + Math.pow((pt2.y - pt1.y), 2));
};
CToolPlotter.prototype.getCtrlPts = function () {
  for (var i = 0; i < this.ctrlPtsNum; i++) {
    this.ctrlPts[0][i] = this.toolObject.getPoint(i);
  }
};
CToolPlotter.prototype.updateCtrlPtPos = function () {
  for (var i = 0; i < this.ctrlPtsNum; i++) {
    this.ctrlPts[1][i] = this.ctrlPts[0][i].getPosXY();
  }
};
CToolPlotter.prototype.getAreaPos = function () {
  var pMgr = ChartManager.getInstance();
  var pArea = pMgr.getArea('frame0.k0.main');
  if (pArea == null) {
    this.areaPos = {left: 0, top: 0, right: 0, bottom: 0};
    return;
  }
  this.areaPos = {
    left: Math.floor(pArea.getLeft()),
    top: Math.floor(pArea.getTop()),
    right: Math.floor(pArea.getRight()),
    bottom: Math.floor(pArea.getBottom())
  };
};
CToolPlotter.prototype.updateDraw = function (context) {
  context.strokeStyle = this.theme.getColor(Theme.Color.LineColorNormal);
  this.draw(context);
  this.drawCtrlPt(context);
};
CToolPlotter.prototype.finishDraw = function (context) {
  context.strokeStyle = this.theme.getColor(Theme.Color.LineColorNormal);
  this.draw(context);
};
CToolPlotter.prototype.highlight = function (context) {
  context.strokeStyle = this.theme.getColor(Theme.Color.LineColorSelected);
  this.draw(context);
  this.drawCtrlPt(context);
  this.highlightCtrlPt(context);
};
var DrawStraightLinesPlotter = create_class(CToolPlotter);
DrawStraightLinesPlotter.prototype.__construct = function (name, toolObject) {
  DrawStraightLinesPlotter.__super.__construct.call(this, name, toolObject);
  this.toolObject = toolObject;
  this.ctrlPtsNum = 2;
  this.ctrlPts = new Array(new Array(this.ctrlPtsNum), new Array(2));
  this.getCtrlPts();
};
DrawStraightLinesPlotter.prototype.draw = function (context) {
  this.updateCtrlPtPos();
  this.getAreaPos();
  this.startPoint = this.ctrlPts[1][0];
  this.endPoint = this.ctrlPts[1][1];
  if (this.startPoint.x == this.endPoint.x && this.startPoint.y == this.endPoint.y) {
    Plotter.drawLine(context, this.areaPos.left, this.startPoint.y, this.areaPos.right, this.startPoint.y);
  } else {
    this.crossPt = getRectCrossPt(this.areaPos, this.startPoint, this.endPoint);
    Plotter.drawLine(context, this.crossPt[0].x, this.crossPt[0].y, this.crossPt[1].x, this.crossPt[1].y);
  }
};
var DrawSegLinesPlotter = create_class(CToolPlotter);
DrawSegLinesPlotter.prototype.__construct = function (name, toolObject) {
  DrawSegLinesPlotter.__super.__construct.call(this, name, toolObject);
  this.toolObject = toolObject;
  this.ctrlPtsNum = 2;
  this.ctrlPts = new Array(new Array(this.ctrlPtsNum), new Array(2));
  this.getCtrlPts();
};
DrawSegLinesPlotter.prototype.draw = function (context) {
  this.updateCtrlPtPos();
  this.startPoint = this.ctrlPts[1][0];
  this.endPoint = this.ctrlPts[1][1];
  if (this.startPoint.x == this.endPoint.x && this.startPoint.y == this.endPoint.y) {
    this.endPoint.x += 1;
  }
  Plotter.drawLine(context, this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
};
var DrawRayLinesPlotter = create_class(CToolPlotter);
DrawRayLinesPlotter.prototype.__construct = function (name, toolObject) {
  DrawRayLinesPlotter.__super.__construct.call(this, name);
  this.toolObject = toolObject;
  this.ctrlPtsNum = 2;
  this.ctrlPts = new Array(new Array(this.ctrlPtsNum), new Array(2));
  this.getCtrlPts();
};
DrawRayLinesPlotter.prototype.draw = function (context) {
  this.updateCtrlPtPos();
  this.getAreaPos();
  this.startPoint = this.ctrlPts[1][0];
  this.endPoint = this.ctrlPts[1][1];
  if (this.startPoint.x == this.endPoint.x && this.startPoint.y == this.endPoint.y) {
    this.endPoint.x += 1;
  }
  this.drawRayLines(context, this.startPoint, this.endPoint);
};
var DrawArrowLinesPlotter = create_class(CToolPlotter);
DrawArrowLinesPlotter.prototype.__construct = function (name, toolObject) {
  DrawArrowLinesPlotter.__super.__construct.call(this, name, toolObject);
  this.toolObject = toolObject;
  this.arrowSizeRatio = 0.03;
  this.arrowSize = 4;
  this.crossPt = {x: -1, y: -1};
  this.ctrlPtsNum = 2;
  this.ctrlPts = new Array(new Array(this.ctrlPtsNum), new Array(2));
  this.getCtrlPts();
};
DrawArrowLinesPlotter.prototype.drawArrow = function (context, startPoint, endPoint) {
  var len = this.lenBetweenPts(startPoint, endPoint);
  var vectorA = [endPoint.x - startPoint.x, endPoint.y - startPoint.y];
  this.crossPt.x = startPoint.x + (1 - this.arrowSize / len) * vectorA[0];
  this.crossPt.y = startPoint.y + (1 - this.arrowSize / len) * vectorA[1];
  var vectorAautho = [-vectorA[1], vectorA[0]];
  var Aautho = {x: vectorAautho[0], y: vectorAautho[1]};
  var origin = {x: 0, y: 0};
  vectorAautho[0] = this.arrowSize * Aautho.x / this.lenBetweenPts(Aautho, origin);
  vectorAautho[1] = this.arrowSize * Aautho.y / this.lenBetweenPts(Aautho, origin);
  var arrowEndPt = [this.crossPt.x + vectorAautho[0], this.crossPt.y + vectorAautho[1]];
  Plotter.drawLine(context, endPoint.x, endPoint.y, arrowEndPt[0], arrowEndPt[1]);
  arrowEndPt = [this.crossPt.x - vectorAautho[0], this.crossPt.y - vectorAautho[1]];
  Plotter.drawLine(context, endPoint.x, endPoint.y, arrowEndPt[0], arrowEndPt[1]);
};
DrawArrowLinesPlotter.prototype.draw = function (context) {
  this.updateCtrlPtPos();
  this.startPoint = this.ctrlPts[1][0];
  this.endPoint = this.ctrlPts[1][1];
  if (this.startPoint.x == this.endPoint.x && this.startPoint.y == this.endPoint.y) {
    this.endPoint.x += 1;
  }
  Plotter.drawLine(context, this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
  this.drawArrow(context, this.startPoint, this.endPoint);
};
var DrawHoriStraightLinesPlotter = create_class(CToolPlotter);
DrawHoriStraightLinesPlotter.prototype.__construct = function (name, toolObject) {
  DrawHoriStraightLinesPlotter.__super.__construct.call(this, name);
  this.toolObject = toolObject;
  this.ctrlPtsNum = 1;
  this.ctrlPts = new Array(new Array(this.ctrlPtsNum), new Array(2));
  this.getCtrlPts();
};
DrawHoriStraightLinesPlotter.prototype.draw = function (context) {
  this.updateCtrlPtPos();
  this.getAreaPos();
  this.startPoint = this.ctrlPts[1][0];
  Plotter.drawLine(context, this.areaPos.left, this.startPoint.y, this.areaPos.right, this.startPoint.y);
};
var DrawHoriRayLinesPlotter = create_class(CToolPlotter);
DrawHoriRayLinesPlotter.prototype.__construct = function (name, toolObject) {
  DrawHoriRayLinesPlotter.__super.__construct.call(this, name);
  this.toolObject = toolObject;
  this.ctrlPtsNum = 2;
  this.ctrlPts = new Array(new Array(this.ctrlPtsNum), new Array(2));
  this.getCtrlPts();
};
DrawHoriRayLinesPlotter.prototype.draw = function (context) {
  this.updateCtrlPtPos();
  this.getAreaPos();
  this.startPoint = this.ctrlPts[1][0];
  this.endPoint = this.ctrlPts[1][1];
  if (this.startPoint.x == this.endPoint.x) {
    Plotter.drawLine(context, this.startPoint.x, this.startPoint.y, this.areaPos.right, this.startPoint.y);
  } else {
    var tempEndPt = {x: this.endPoint.x, y: this.startPoint.y};
    this.drawRayLines(context, this.startPoint, tempEndPt);
  }
};
var DrawHoriSegLinesPlotter = create_class(CToolPlotter);
DrawHoriSegLinesPlotter.prototype.__construct = function (name, toolObject) {
  DrawHoriSegLinesPlotter.__super.__construct.call(this, name, toolObject);
  this.toolObject = toolObject;
  this.ctrlPtsNum = 2;
  this.ctrlPts = new Array(new Array(this.ctrlPtsNum), new Array(2));
  this.getCtrlPts();
};
DrawHoriSegLinesPlotter.prototype.draw = function (context) {
  this.updateCtrlPtPos();
  this.startPoint = this.ctrlPts[1][0];
  this.endPoint = this.ctrlPts[1][1];
  this.endPoint.y = this.startPoint.y;
  if (this.startPoint.x == this.endPoint.x && this.startPoint.y == this.endPoint.y) {
    Plotter.drawLine(context, this.startPoint.x, this.startPoint.y, this.endPoint.x + 1, this.startPoint.y);
  } else {
    Plotter.drawLine(context, this.startPoint.x, this.startPoint.y, this.endPoint.x, this.startPoint.y);
  }
};
var DrawVertiStraightLinesPlotter = create_class(CToolPlotter);
DrawVertiStraightLinesPlotter.prototype.__construct = function (name, toolObject) {
  DrawVertiStraightLinesPlotter.__super.__construct.call(this, name);
  this.toolObject = toolObject;
  this.ctrlPtsNum = 1;
  this.ctrlPts = new Array(new Array(this.ctrlPtsNum), new Array(2));
  this.getCtrlPts();
};
DrawVertiStraightLinesPlotter.prototype.draw = function (context) {
  this.updateCtrlPtPos();
  this.getAreaPos();
  this.startPoint = this.ctrlPts[1][0];
  Plotter.drawLine(context, this.startPoint.x, this.areaPos.top, this.startPoint.x, this.areaPos.bottom);
};
var DrawPriceLinesPlotter = create_class(CToolPlotter);
DrawPriceLinesPlotter.prototype.__construct = function (name, toolObject) {
  DrawPriceLinesPlotter.__super.__construct.call(this, name);
  this.toolObject = toolObject;
  this.ctrlPtsNum = 1;
  this.ctrlPts = new Array(new Array(this.ctrlPtsNum), new Array(2));
  this.getCtrlPts();
};
DrawPriceLinesPlotter.prototype.draw = function (context) {
  context.font = "12px Tahoma";
  context.textAlign = "left";
  context.fillStyle = this.theme.getColor(Theme.Color.LineColorNormal);
  this.updateCtrlPtPos();
  this.getAreaPos();
  this.startPoint = this.ctrlPts[1][0];
  var text = this.ctrlPts[0][0].getPosIV().v;
  Plotter.drawLine(context, this.startPoint.x, this.startPoint.y, this.areaPos.right, this.startPoint.y);
  context.fillText(text.toFixed(2), this.startPoint.x + 2, this.startPoint.y - 15);
};
var ParallelLinesPlotter = create_class(CToolPlotter);
ParallelLinesPlotter.prototype.__construct = function (name, toolObject) {
  ParallelLinesPlotter.__super.__construct.call(this, name);
  this.toolObject = toolObject;
};
ParallelLinesPlotter.prototype.getParaPt = function () {
  var vectorA = [];
  vectorA[0] = this.endPoint.x - this.startPoint.x;
  vectorA[1] = this.endPoint.y - this.startPoint.y;
  var vectorB = [];
  vectorB[0] = this.paraStartPoint.x - this.startPoint.x;
  vectorB[1] = this.paraStartPoint.y - this.startPoint.y;
  this.paraEndPoint = {x: -1, y: -1};
  this.paraEndPoint.x = vectorA[0] + vectorB[0] + this.startPoint.x;
  this.paraEndPoint.y = vectorA[1] + vectorB[1] + this.startPoint.y;
};
var DrawBiParallelLinesPlotter = create_class(ParallelLinesPlotter);
DrawBiParallelLinesPlotter.prototype.__construct = function (name, toolObject) {
  DrawBiParallelLinesPlotter.__super.__construct.call(this, name, toolObject);
  this.toolObject = toolObject;
  this.ctrlPtsNum = 3;
  this.ctrlPts = new Array(new Array(this.ctrlPtsNum), new Array(2));
  this.getCtrlPts();
};
DrawBiParallelLinesPlotter.prototype.draw = function (context) {
  this.updateCtrlPtPos();
  this.getAreaPos();
  this.startPoint = this.ctrlPts[1][0];
  this.paraStartPoint = this.ctrlPts[1][1];
  this.endPoint = this.ctrlPts[1][2];
  this.getParaPt();
  this.getAreaPos();
  this.crossPt0 = getRectCrossPt(this.areaPos, this.startPoint, this.endPoint);
  Plotter.drawLine(context, this.crossPt0[0].x, this.crossPt0[0].y, this.crossPt0[1].x, this.crossPt0[1].y);
  this.crossPt1 = getRectCrossPt(this.areaPos, this.paraStartPoint, this.paraEndPoint);
  Plotter.drawLine(context, this.crossPt1[0].x, this.crossPt1[0].y, this.crossPt1[1].x, this.crossPt1[1].y);
};
var DrawBiParallelRayLinesPlotter = create_class(ParallelLinesPlotter);
DrawBiParallelRayLinesPlotter.prototype.__construct = function (name, toolObject) {
  DrawBiParallelRayLinesPlotter.__super.__construct.call(this, name, toolObject);
  this.toolObject = toolObject;
  this.ctrlPtsNum = 3;
  this.ctrlPts = new Array(new Array(this.ctrlPtsNum), new Array(2));
  this.getCtrlPts();
};
DrawBiParallelRayLinesPlotter.prototype.draw = function (context) {
  this.updateCtrlPtPos();
  this.getAreaPos();
  this.startPoint = this.ctrlPts[1][0];
  this.paraStartPoint = this.ctrlPts[1][1];
  this.endPoint = this.ctrlPts[1][2];
  if (this.startPoint.x == this.endPoint.x && this.startPoint.y == this.endPoint.y) {
    this.endPoint.x += 1;
  }
  this.getParaPt();
  this.drawRayLines(context, this.startPoint, this.endPoint);
  this.drawRayLines(context, this.paraStartPoint, this.paraEndPoint);
};
var DrawTriParallelLinesPlotter = create_class(ParallelLinesPlotter);
DrawTriParallelLinesPlotter.prototype.__construct = function (name, toolObject) {
  DrawTriParallelLinesPlotter.__super.__construct.call(this, name, toolObject);
  this.toolObject = toolObject;
  this.ctrlPtsNum = 3;
  this.ctrlPts = new Array(new Array(this.ctrlPtsNum), new Array(2));
  this.getCtrlPts();
};
DrawTriParallelLinesPlotter.prototype.draw = function (context) {
  this.updateCtrlPtPos();
  this.getAreaPos();
  this.startPoint = this.ctrlPts[1][0];
  this.paraStartPoint = this.ctrlPts[1][1];
  this.endPoint = this.ctrlPts[1][2];
  var vectorA = [];
  vectorA[0] = this.endPoint.x - this.startPoint.x;
  vectorA[1] = this.endPoint.y - this.startPoint.y;
  var vectorB = [];
  vectorB[0] = this.paraStartPoint.x - this.startPoint.x;
  vectorB[1] = this.paraStartPoint.y - this.startPoint.y;
  this.para1EndPoint = {x: -1, y: -1};
  this.para2EndPoint = {x: -1, y: -1};
  this.para2StartPoint = {x: -1, y: -1};
  this.para1EndPoint.x = vectorA[0] + vectorB[0] + this.startPoint.x;
  this.para1EndPoint.y = vectorA[1] + vectorB[1] + this.startPoint.y;
  this.para2StartPoint.x = this.startPoint.x - vectorB[0];
  this.para2StartPoint.y = this.startPoint.y - vectorB[1];
  this.para2EndPoint.x = this.endPoint.x - vectorB[0];
  this.para2EndPoint.y = this.endPoint.y - vectorB[1];
  this.getAreaPos();
  this.crossPt0 = getRectCrossPt(this.areaPos, this.startPoint, this.endPoint);
  Plotter.drawLine(context, this.crossPt0[0].x, this.crossPt0[0].y, this.crossPt0[1].x, this.crossPt0[1].y);
  this.crossPt1 = getRectCrossPt(this.areaPos, this.paraStartPoint, this.para1EndPoint);
  Plotter.drawLine(context, this.crossPt1[0].x, this.crossPt1[0].y, this.crossPt1[1].x, this.crossPt1[1].y);
  this.crossPt2 = getRectCrossPt(this.areaPos, this.para2StartPoint, this.para2EndPoint);
  Plotter.drawLine(context, this.crossPt2[0].x, this.crossPt2[0].y, this.crossPt2[1].x, this.crossPt2[1].y);
};
var BandLinesPlotter = create_class(CToolPlotter);
BandLinesPlotter.prototype.__construct = function (name, toolObject) {
  BandLinesPlotter.__super.__construct.call(this, name);
  this.toolObject = toolObject;
  this.ctrlPtsNum = 2;
  this.ctrlPts = new Array(new Array(this.ctrlPtsNum), new Array(2));
  this.getCtrlPts();
};
BandLinesPlotter.prototype.drawLinesAndInfo = function (context, startPoint, endPoint) {
  context.font = "12px Tahoma";
  context.textAlign = "left";
  context.fillStyle = this.theme.getColor(Theme.Color.LineColorNormal);
  var text;
  if (this.toolObject.state == CToolObject.state.Draw) {
    this.startPtValue = this.toolObject.getPoint(0).getPosIV().v;
    this.endPtValue = this.toolObject.getPoint(1).getPosIV().v;
  }
  this.getAreaPos();
  for (var i = 0; i < this.fiboSequence.length; i++) {
    var stageY = startPoint.y + (100 - this.fiboSequence[i]) / 100 * (endPoint.y - startPoint.y);
    if (stageY > this.areaPos.bottom) {
      continue;
    }
    var stageYvalue = this.startPtValue + (100 - this.fiboSequence[i]) / 100 * (this.endPtValue - this.startPtValue);
    Plotter.drawLine(context, this.areaPos.left, stageY, this.areaPos.right, stageY);
    text = this.fiboSequence[i].toFixed(1) + '% ' + stageYvalue.toFixed(1);
    context.fillText(text, this.areaPos.left + 2, stageY - 15);
  }
};
BandLinesPlotter.prototype.draw = function (context) {
  this.updateCtrlPtPos();
  this.getAreaPos();
  this.startPoint = this.ctrlPts[1][0];
  this.endPoint = this.ctrlPts[1][1];
  this.drawLinesAndInfo(context, this.startPoint, this.endPoint);
};
var DrawFibRetracePlotter = create_class(BandLinesPlotter);
DrawFibRetracePlotter.prototype.__construct = function (name, toolObject) {
  DrawFibRetracePlotter.__super.__construct.call(this, name, toolObject);
  this.toolObject = toolObject;
  this.fiboSequence = [100.0, 78.6, 61.8, 50.0, 38.2, 23.6, 0.0];
};
var DrawBandLinesPlotter = create_class(BandLinesPlotter);
DrawBandLinesPlotter.prototype.__construct = function (name, toolObject) {
  DrawBandLinesPlotter.__super.__construct.call(this, name, toolObject);
  this.toolObject = toolObject;
  this.fiboSequence = [0, 12.5, 25, 37.5, 50, 62.5, 75, 87.5, 100];
};
var DrawFibFansPlotter = create_class(CToolPlotter);
DrawFibFansPlotter.prototype.__construct = function (name, toolObject) {
  DrawFibFansPlotter.__super.__construct.call(this, name);
  this.toolObject = toolObject;
  this.fiboFansSequence = [0, 38.2, 50, 61.8];
  this.ctrlPtsNum = 2;
  this.ctrlPts = new Array(new Array(this.ctrlPtsNum), new Array(2));
  this.getCtrlPts();
};
DrawFibFansPlotter.prototype.drawLinesAndInfo = function (context, startPoint, endPoint) {
  this.drawFibRayLines(context, startPoint, endPoint);
};
DrawFibFansPlotter.prototype.draw = function (context) {
  this.updateCtrlPtPos();
  this.getAreaPos();
  this.startPoint = this.ctrlPts[1][0];
  this.endPoint = this.ctrlPts[1][1];
  if (this.startPoint.x == this.endPoint.x && this.startPoint.y == this.endPoint.y) {
    this.endPoint.x += 1;
  }
  this.drawLinesAndInfo(context, this.startPoint, this.endPoint);
};
var CDynamicLinePlotter = create_class(NamedObject);
CDynamicLinePlotter.prototype.__construct = function (name) {
  CDynamicLinePlotter.__super.__construct.call(this, name);
  this.flag = true;
  this.context = ChartManager.getInstance()._overlayContext;
};
CDynamicLinePlotter.prototype.getAreaPos = function () {
  var pMgr = ChartManager.getInstance();
  var pArea = pMgr.getArea('frame0.k0.main');
  if (pArea == null) {
    this.areaPos = {left: 0, top: 0, right: 0, bottom: 0};
    return;
  }
  this.areaPos = {
    left: Math.floor(pArea.getLeft()),
    top: Math.floor(pArea.getTop()),
    right: Math.floor(pArea.getRight()),
    bottom: Math.floor(pArea.getBottom())
  };
};
CDynamicLinePlotter.prototype.Draw = function (context) {
  this.getAreaPos();
  var pMgr = ChartManager.getInstance();
  var pTDP = pMgr.getDataSource(this.getDataSourceName());
  if (pTDP == null || !is_instance(pTDP, MainDataSource)) {
    return;
  }
  this.context.save();
  this.context.rect(this.areaPos.left, this.areaPos.top, this.areaPos.right - this.areaPos.left, this.areaPos.bottom - this.areaPos.top);
  this.context.clip();
  var count = pTDP.getToolObjectCount();
  for (var i = 0; i < count; i++) {
    var toolObject = pTDP.getToolObject(i);
    var state = toolObject.getState();
    switch (state) {
      case CToolObject.state.BeforeDraw:
        toolObject.getPlotter().theme = ChartManager.getInstance().getTheme(this.getFrameName());
        toolObject.getPlotter().drawCursor(this.context);
        break;
      case CToolObject.state.Draw:
        toolObject.getPlotter().theme = ChartManager.getInstance().getTheme(this.getFrameName());
        toolObject.getPlotter().updateDraw(this.context);
        break;
      case CToolObject.state.AfterDraw:
        toolObject.getPlotter().theme = ChartManager.getInstance().getTheme(this.getFrameName());
        toolObject.getPlotter().finishDraw(this.context);
        break;
      default :
        break;
    }
  }
  var sel = pTDP.getSelectToolObjcet();
  if (sel != null && sel != CToolObject.state.Draw) {
    sel.getPlotter().highlight(this.context);
  }
  this.context.restore();
  return;
};
function KLineMouseEvent() {
  $(document).ready(function () {
    function __resize() {
      if (navigator.userAgent.indexOf('Firefox') >= 0) {
        setTimeout(on_size, 200);
      } else {
        on_size();
      }
    }

    __resize();
    $(window).resize(__resize);
    $('#chart_overlayCanvas').bind("contextmenu", function (e) {
      e.cancelBubble = true;
      e.returnValue = false;
      e.preventDefault();
      e.stopPropagation();
      return false;
    });
    $('#chart_input_interface').submit(function (e) {
      e.preventDefault();
      var text = $('#chart_input_interface_text').val();
      var json_text = JSON.parse(text);
      var command = json_text.command;
      var content = json_text.content;
      switch (command) {
        case 'set current depth':
          ChartManager.getInstance().getChart().updateDepth(content);
          break;
        case 'set current future':
          break;
        case 'set current language':
          chart_switch_language(content);
          break;
        case 'set current theme':
          break;
        default:
          break;
      }
    });
    $("#chart_container .chart_dropdown .chart_dropdown_t").mouseover(function () {
      var container = $("#chart_container");
      var title = $(this);
      var dropdown = title.next();
      var containerLeft = container.offset().left;
      var titleLeft = title.offset().left;
      var containerWidth = container.width();
      var titleWidth = title.width();
      var dropdownWidth = dropdown.width();
      var d = ((dropdownWidth - titleWidth) / 2) << 0;
      if (titleLeft - d < containerLeft + 4) {
        d = titleLeft - containerLeft - 4;
      } else if (titleLeft + titleWidth + d > containerLeft + containerWidth - 4) {
        d += titleLeft + titleWidth + d - (containerLeft + containerWidth - 4) + 19;
      } else {
        d += 4;
      }
      dropdown.css({"margin-left": -d});
      title.addClass("chart_dropdown-hover");
      dropdown.addClass("chart_dropdown-hover");
    }).mouseout(function () {
      $(this).next().removeClass("chart_dropdown-hover");
      $(this).removeClass("chart_dropdown-hover");
    });
    $(".chart_dropdown_data").mouseover(function () {
      $(this).addClass("chart_dropdown-hover");
      $(this).prev().addClass("chart_dropdown-hover");
    }).mouseout(function () {
      $(this).prev().removeClass("chart_dropdown-hover");
      $(this).removeClass("chart_dropdown-hover");
    });
    $("#chart_btn_parameter_settings").click(function () {
      $('#chart_parameter_settings').addClass("clicked");
      $(".chart_dropdown_data").removeClass("chart_dropdown-hover");
      $("#chart_parameter_settings").find("th").each(function () {
        var name = $(this).html();
        var index = 0;
        var tmp = ChartSettings.get();
        var value = tmp.indics[name];
        $(this.nextElementSibling).find("input").each(function () {
          if (value != null && index < value.length) {
            $(this).val(value[index]);
          }
          index++;
        });
      });
    });
    $("#close_settings").click(function () {
      $('#chart_parameter_settings').removeClass("clicked");
    });
    $("#chart_container .chart_toolbar_tabgroup a").click(function () {
      switch_period($(this).parent().attr('name'));
    });
    /*$("#chart_toolbar_periods_vert ul a").click(function () {
     switch_period($(this).parent().attr('name'));
     });*/
    /*$(".market_chooser ul a").click(function () {
     switch_market($(this).attr("name"));
     });*/
    /*$("#chart_show_tools").click(function () {
     if ($(this).hasClass("selected")) {
     switch_tools("off");
     } else {
     switch_tools("on");
     }
     });*/
    $("#chart_toolpanel .chart_toolpanel_button").click(function () {
      $(".chart_dropdown_data").removeClass("chart_dropdown-hover");
      $("#chart_toolpanel .chart_toolpanel_button").removeClass("selected");
      $(this).addClass("selected");
      var name = $(this).children().attr('name');
      GLOBAL_VAR.chartMgr.setRunningMode(ChartManager.DrawingTool[name]);
    });
    $('#chart_show_indicator').click(function () {
      if ($(this).hasClass('selected')) {
        switch_indic('off');
      } else {
        switch_indic('on');
      }
    });
    $("#chart_tabbar li a").click(function () {
      $("#chart_tabbar li a").removeClass('selected');
      $(this).addClass('selected');
      var name = $(this).attr('name');
      var tmp = ChartSettings.get();
      tmp.charts.indics[1] = name;
      ChartSettings.save();
      if (Template.displayVolume == false) {
        ChartManager.getInstance().getChart().setIndicator(1, name);
      } else {
        ChartManager.getInstance().getChart().setIndicator(2, name);
      }
    });
    $("#chart_select_chart_style a").click(function () {
      $("#chart_select_chart_style a").removeClass('selected');
      $(this).addClass("selected");
      var tmp = ChartSettings.get();
      tmp.charts.chartStyle = $(this)[0].innerHTML;
      ChartSettings.save();
      var mgr = ChartManager.getInstance();
      mgr.setChartStyle("frame0.k0", $(this).html());
      mgr.redraw();
    });
    $('#chart_dropdown_themes li').click(function () {
      $('#chart_dropdown_themes li a').removeClass('selected');
      var name = $(this).attr('name');
      if (name == 'chart_themes_dark') {
        switch_theme('dark');
      } else if (name == 'chart_themes_light') {
        switch_theme('light');
      }
    });
    $("#chart_select_main_indicator a").click(function () {
      $("#chart_select_main_indicator a").removeClass('selected');
      $(this).addClass("selected");
      var name = $(this).attr('name');
      var tmp = ChartSettings.get();
      tmp.charts.mIndic = name;
      ChartSettings.save();
      var mgr = ChartManager.getInstance();
      if (!mgr.setMainIndicator("frame0.k0", name)) {
        mgr.removeMainIndicator("frame0.k0");
      }
      mgr.redraw();
    });
    $('#chart_toolbar_theme a').click(function () {
      $('#chart_toolbar_theme a').removeClass('selected');
      if ($(this).attr('name') == 'dark') {
        switch_theme('dark');
      } else if ($(this).attr('name') == 'light') {
        switch_theme('light');
      }
    });
    $('#chart_select_theme li a').click(function () {
      $('#chart_select_theme a').removeClass('selected');
      if ($(this).attr('name') == 'dark') {
        switch_theme('dark');
      } else if ($(this).attr('name') == 'light') {
        switch_theme('light');
      }
    });
    /*$('#chart_enable_tools li a').click(function () {
     $('#chart_enable_tools a').removeClass('selected');
     if ($(this).attr('name') == 'on') {
     switch_tools('on');
     } else if ($(this).attr('name') == 'off') {
     switch_tools('off');
     }
     });*/
    $('#chart_enable_indicator li a').click(function () {
      $('#chart_enable_indicator a').removeClass('selected');
      if ($(this).attr('name') == 'on') {
        switch_indic('on');
      } else if ($(this).attr('name') == 'off') {
        switch_indic('off');
      }
    });
    /*$("#chart_language_setting_div li a").click(function () {
     $("#chart_language_setting_div a").removeClass("selected");
     if ($(this).attr("name") == "zh-cn") {
     chart_switch_language("zh-cn")
     } else {
     if ($(this).attr("name") == "en-us") {
     chart_switch_language("en-us")
     } else {
     if ($(this).attr("name") == "zh-tw") {
     chart_switch_language("zh-tw")
     }
     }
     }
     });*/
    $(document).keyup(function (b) {
      if (b.keyCode == 46) {
        ChartManager.getInstance().deleteToolObject();
        ChartManager.getInstance().redraw('OverlayCanvas', false);
      }
    });
    $("#clearCanvas").click(function () {
      var d = ChartManager.getInstance().getDataSource("frame0.k0");
      var b = d.getToolObjectCount();
      for (var c = 0; c < b; c++) {
        d.delToolObject()
      }
      ChartManager.getInstance().redraw("OverlayCanvas", false)
    });
    $("#chart_overlayCanvas").mousemove(function (e) {
      var r = e.target.getBoundingClientRect();
      var x = e.clientX - r.left;
      var y = e.clientY - r.top;
      var mgr = ChartManager.getInstance();
      if (GLOBAL_VAR.button_down == true) {
        mgr.onMouseMove("frame0", x, y, true);
        mgr.redraw("All", false);
      } else {
        mgr.onMouseMove("frame0", x, y, false);
        mgr.redraw("OverlayCanvas");
      }
    }).mouseleave(function (e) {
      var r = e.target.getBoundingClientRect();
      var x = e.clientX - r.left;
      var y = e.clientY - r.top;
      var mgr = ChartManager.getInstance();
      mgr.onMouseLeave("frame0", x, y, false);
      mgr.redraw("OverlayCanvas");
    }).mouseup(function (e) {
      if (e.which != 1) {
        return;
      }
      GLOBAL_VAR.button_down = false;
      var r = e.target.getBoundingClientRect();
      var x = e.clientX - r.left;
      var y = e.clientY - r.top;
      var mgr = ChartManager.getInstance();
      mgr.onMouseUp("frame0", x, y);
      mgr.redraw("All");
    }).mousedown(function (e) {
      if (e.which != 1) {
        ChartManager.getInstance().deleteToolObject();
        ChartManager.getInstance().redraw('OverlayCanvas', false);
        return;
      }
      GLOBAL_VAR.button_down = true;
      var r = e.target.getBoundingClientRect();
      var x = e.clientX - r.left;
      var y = e.clientY - r.top;
      ChartManager.getInstance().onMouseDown("frame0", x, y);
    });
    $("#chart_parameter_settings :input").change(function () {
      var name = $(this).attr("name");
      var index = 0;
      var valueArray = [];
      var mgr = ChartManager.getInstance();
      $("#chart_parameter_settings :input").each(function () {
        if ($(this).attr("name") == name) {
          if ($(this).val() != "" && $(this).val() != null && $(this).val() != undefined) {
            var i = parseInt($(this).val());
            valueArray.push(i);
          }
          index++;
        }
      });
      if (valueArray.length != 0) {
        mgr.setIndicatorParameters(name, valueArray);
        var value = mgr.getIndicatorParameters(name);
        var cookieArray = [];
        index = 0;
        $("#chart_parameter_settings :input").each(function () {
          if ($(this).attr("name") == name) {
            if ($(this).val() != "" && $(this).val() != null && $(this).val() != undefined) {
              $(this).val(value[index].getValue());
              cookieArray.push(value[index].getValue());
            }
            index++;
          }
        });
        var tmp = ChartSettings.get();
        tmp.indics[name] = cookieArray;
        ChartSettings.save();
        mgr.redraw('All', false);
      }
    });
    $("#chart_parameter_settings button").click(function () {
      var name = $(this).parents("tr").children("th").html();
      var index = 0;
      var value = ChartManager.getInstance().getIndicatorParameters(name);
      var valueArray = [];
      $(this).parent().prev().children('input').each(function () {
        if (value != null && index < value.length) {
          $(this).val(value[index].getDefaultValue());
          valueArray.push(value[index].getDefaultValue());
        }
        index++;
      });
      ChartManager.getInstance().setIndicatorParameters(name, valueArray);
      var tmp = ChartSettings.get();
      tmp.indics[name] = valueArray;
      ChartSettings.save();
      ChartManager.getInstance().redraw('All', false);
    });
  });
}
var refresh_counter = 0;
var refresh_handler = setInterval(refresh_function, 1000);
function refresh_function() {
  refresh_counter++;
  var b = ChartManager.getInstance().getLanguage();
  //if (refresh_counter > 3600) {
  //    var a = new Number(refresh_counter / 3600);
  //    if (b == "en-us") {
  //        $("#chart_updated_time_text").html(a.toFixed(0) + "h")
  //    } else {
  //        $("#chart_updated_time_text").html(a.toFixed(0) + "小时")
  //    }
  //} else {
  //    if (refresh_counter > 60 && refresh_counter <= 3600) {
  //        var a = new Number(refresh_counter / 60);
  //        if (b == "en-us") {
  //            $("#chart_updated_time_text").html(a.toFixed(0) + "m")
  //        } else {
  //            $("#chart_updated_time_text").html(a.toFixed(0) + "分钟")
  //        }
  //    } else {
  //        if (refresh_counter <= 60) {
  //            if (b == "en-us") {
  //                $("#chart_updated_time_text").html(refresh_counter + "s")
  //            } else {
  //                $("#chart_updated_time_text").html(refresh_counter + "秒")
  //            }
  //        }
  //    }
  //}
}
function clear_refresh_counter() {
  window.clearInterval(refresh_handler);
  refresh_counter = 0;
  var a = ChartManager.getInstance().getLanguage();
  //if (a == "en-us") {
  //    $("#chart_updated_time_text").html(refresh_counter + "s")
  //} else
  //    $("#chart_updated_time_text").html(refresh_counter + "秒")
  //}
  refresh_handler = setInterval(refresh_function, 1000)
}

var RequestData = function (showLoading) {
  AbortRequest();
  window.clearTimeout(GLOBAL_VAR.TimeOutId);
  if (showLoading == true) {
    $("#chart_loading").addClass("activated");
  }
  $(document).ready(GLOBAL_VAR.G_HTTP_REQUEST = $.ajax({
    type: "post",
    url: GLOBAL_VAR.url,
    dataType: 'jsonp',
    data: GLOBAL_VAR.requestParam,
    timeout: 30000,
    created: Date.now(),
    beforeSend: function () {
      this.time = GLOBAL_VAR.time_type;
      this.market = GLOBAL_VAR.market_from;
    },
    success: function (json) {

      json = JSON.parse(json);
      console.log(json);
      //console.log(json);
      if (GLOBAL_VAR.G_HTTP_REQUEST) {
        if (this.time != GLOBAL_VAR.time_type || this.market != GLOBAL_VAR.market_from) {
          GLOBAL_VAR.TimeOutId = setTimeout(RequestData, 1000);
          return;
        }
        if (!json) {
          return;
        }
        GLOBAL_VAR.market_from_name = "freeWillex";
        var chart = ChartManager.getInstance().getChart();
        chart._contract_unit = 'BTC';
        chart._money_type = json.code;
        GLOBAL_VAR.KLineData = eval(json.data);
        try {
          var flag = GLOBAL_VAR.chartMgr.updateData("frame0.k0", GLOBAL_VAR.KLineData);
          if (!flag) {
            GLOBAL_VAR.requestParam = setHttpRequestParam(GLOBAL_VAR.market_from, GLOBAL_VAR.time_type, GLOBAL_VAR.limit, null);
            GLOBAL_VAR.TimeOutId = setTimeout(RequestData, 1000);
            return;
          }
          clear_refresh_counter();
        } catch (err) {
          if (err == "data error") {
            GLOBAL_VAR.requestParam = setHttpRequestParam(GLOBAL_VAR.market_from, GLOBAL_VAR.time_type, GLOBAL_VAR.limit, null);
            GLOBAL_VAR.TimeOutId = setTimeout(RequestData, 1000);
            return;
          }
        }
        GLOBAL_VAR.TimeOutId = setTimeout(TwoSecondThread, 10 * 1000);
        $("#chart_loading").removeClass("activated");
        ChartManager.getInstance().redraw("All", false)
      }
    },
    error: function (xhr, textStatus, errorThrown) {
      //alert('error' + JSON.stringify(xhr) + textStatus + errorThrown);

      if (xhr.status == 200 && xhr.readyState == 4) {
        return;
      }
      GLOBAL_VAR.TimeOutId = setTimeout(function () {
        RequestData(true)
      }, 1000)
    },
    complete: function () {
      //alert('complete');

      GLOBAL_VAR.market_from_name = "freeWillex";
      var chart = ChartManager.getInstance().getChart();
      chart._contract_unit = 'BTC';
      chart._money_type = testData.code;
      GLOBAL_VAR.KLineData = eval(testData.data);
      try {
        var flag = GLOBAL_VAR.chartMgr.updateData("frame0.k0", GLOBAL_VAR.KLineData);
        if (!flag) {
          GLOBAL_VAR.requestParam = setHttpRequestParam(GLOBAL_VAR.market_from, GLOBAL_VAR.time_type, GLOBAL_VAR.limit, null);
          GLOBAL_VAR.TimeOutId = setTimeout(RequestData, 1000);
          return;
        }
        clear_refresh_counter();
      } catch (err) {
        if (err == "data error") {
          GLOBAL_VAR.requestParam = setHttpRequestParam(GLOBAL_VAR.market_from, GLOBAL_VAR.time_type, GLOBAL_VAR.limit, null);
          GLOBAL_VAR.TimeOutId = setTimeout(RequestData, 1000);
          return;
        }
      }
      GLOBAL_VAR.TimeOutId = setTimeout(TwoSecondThread, 10 * 1000);
      $("#chart_loading").removeClass("activated");
      ChartManager.getInstance().redraw("All", false)

      GLOBAL_VAR.G_HTTP_REQUEST = null
    }
  }));
};
function AbortRequest() {
  if (GLOBAL_VAR.G_HTTP_REQUEST && GLOBAL_VAR.G_HTTP_REQUEST.readyState != 4) {
    GLOBAL_VAR.G_HTTP_REQUEST.abort();
  }
}
function TwoSecondThread() {
  var lastDataTime = GLOBAL_VAR.chartMgr.getDataSource("frame0.k0").getLastDate(); // 获取最后一条数据的时间
  //console.log(lastDataTime);
  if (lastDataTime == -1) {
    GLOBAL_VAR.requestParam = setHttpRequestParam(GLOBAL_VAR.market_from, GLOBAL_VAR.time_type, GLOBAL_VAR.limit, null)
  } else {
    GLOBAL_VAR.requestParam = setHttpRequestParam(GLOBAL_VAR.market_from, GLOBAL_VAR.time_type, null, lastDataTime.toString())
  }
  RequestData();
}

/**
 * 推送最新数据
 * @param data
 */
function wsTicker(data) {
  var dataTemp = [];
  var ticker = data['ticker'][(GLOBAL_VAR.time_type == 'line' ? 'MIN1' : GLOBAL_VAR.time_type)];
  if (!_.isUndefined(ticker)) {
    var titleTemp = document.title.split("-");
    document.title = '฿:' + (Config.currency === 'CNY' ? '¥' : '$') + ticker[4] + "-" + titleTemp[1] + "-" + titleTemp[2];
    var lastDataTime = GLOBAL_VAR.chartMgr.getDataSource("frame0.k0").getLastDate(); // 获取最后一条数据的时间
    if (lastDataTime == -1) {// 获取历史数据
      GLOBAL_VAR.requestParam = setHttpRequestParam(GLOBAL_VAR.market_from, GLOBAL_VAR.time_type, GLOBAL_VAR.limit, null)
    } else {
      dataTemp.push(ticker);
    }
    /*else if (ticker[0] != lastDataTime) {// 判断时间是否相等，不相同获取上一周期最后一条数据
     var index = GLOBAL_VAR.chartMgr.getDataSource("frame0.k0").getDataCount();
     //var lastData = GLOBAL_VAR.chartMgr.getDataSource("frame0.k0").getDataAt(index - 1);
     //dataTemp.push(_.values(lastData));
     dataTemp.push(ticker);
     }*/
    //else {
    //    dataTemp.push(ticker);
    //}
    GLOBAL_VAR.KLineData = JSON.parse(JSON.stringify(dataTemp).replace(new RegExp(/(")/g), ''));
    try {
      var flag = GLOBAL_VAR.chartMgr.updateData("frame0.k0", GLOBAL_VAR.KLineData); // 为false重新获取历史数据，否则
      if (!flag) {
        GLOBAL_VAR.requestParam = setHttpRequestParam(GLOBAL_VAR.market_from, GLOBAL_VAR.time_type, GLOBAL_VAR.limit, null);
        GLOBAL_VAR.TimeOutId = setTimeout(RequestData, 1000);
        return;
      }
      clear_refresh_counter();
    } catch (err) {
      if (err == "data error") {
        GLOBAL_VAR.requestParam = setHttpRequestParam(GLOBAL_VAR.market_from, GLOBAL_VAR.time_type, GLOBAL_VAR.limit, null);
        GLOBAL_VAR.TimeOutId = setTimeout(RequestData, 1000);
        return;
      }
    }
    $("#chart_loading").removeClass("activated");
    ChartManager.getInstance().redraw("All", false);// 重新画图
  }
}


function readCookie() {
  ChartSettings.get();
  ChartSettings.save();
  var tmp = ChartSettings.get();
  ChartManager.getInstance().setChartStyle('frame0.k0', tmp.charts.chartStyle);
  var e = tmp.charts.market_from;
  if (!GLOBAL_VAR.init) {
    //e = kline.symbol;
    e = CODE;
    GLOBAL_VAR.init = true;
  }
  GLOBAL_VAR.market_from = e;
  //switch_market_selected(e);
  var period = tmp.charts.period;
  switch_period(period);
  $('#chart_period_' + period + '_v a').addClass('selected');
  $('#chart_period_' + period + '_h a').addClass('selected');
  if (tmp.charts.indicsStatus == 'close') {
    switch_indic('off');
  } else if (tmp.charts.indicsStatus == 'open') {
    switch_indic('on');
  }
  var main_indic = $('#chart_select_main_indicator');
  main_indic.find('a').each(function () {
    if ($(this).attr('name') == tmp.charts.mIndic) {
      $(this).addClass('selected');
    }
  });
  var chart_style = $('#chart_select_chart_style');
  chart_style.find('a').each(function () {
    if ($(this)[0].innerHTML == tmp.charts.chartStyle) {
      $(this).addClass('selected');
    }
  });
  ChartManager.getInstance().getChart().setMainIndicator(tmp.charts.mIndic);
  ChartManager.getInstance().setThemeName('frame0', tmp.theme);
  //switch_tools('off');
  if (tmp.theme == 'Dark') {
    switch_theme('dark');
  } else if (tmp.theme == 'Light') {
    switch_theme('light');
  }
  chart_switch_language(tmp.language || "zh-cn")
}

var main = function () {
  window._setMarketFrom = function (a) {
    Template.displayVolume = false;
    refreshTemplate();
    readCookie();
    ChartManager.getInstance().getChart().setMarketFrom(a)
  };
  window._set_current_language = function (a) {
    chart_switch_language(a)
  };
  window._set_current_depth = function (a) {
    ChartManager.getInstance().getChart().updateDepth(a)
  };
  window._set_current_url = function (a) {
    GLOBAL_VAR.url = a
  };
  window._set_current_contract_unit = function (a) {
    ChartManager.getInstance().getChart().setCurrentContractUnit(a)
  };
  window._set_money_type = function (a) {
    ChartManager.getInstance().getChart().setCurrentMoneyType(a)
  };
  window._set_usd_cny_rate = function (a) {
    ChartManager.getInstance().getChart()._usd_cny_rate = a
  };
  window._setCaptureMouseWheelDirectly = function (a) {
    ChartManager.getInstance().setCaptureMouseWheelDirectly(a)
  };
  window._current_future_change = new MEvent();
  window._current_theme_change = new MEvent();
  KLineMouseEvent();
  ChartManager.getInstance().bindCanvas("main", document.getElementById("chart_mainCanvas"));
  ChartManager.getInstance().bindCanvas("overlay", document.getElementById("chart_overlayCanvas"));
  refreshTemplate();
  on_size();
  readCookie();
  $("#chart_container").css({visibility: "visible"})
}();

/**
 * 设置参数
 * @param mark_from 币种
 * @param time_type 周期
 * @param size 条数
 * @param since 时间
 * @returns {string}
 */
function setHttpRequestParam(mark_from, time_type, size, since) {
  var param = "needTickers=1&symbol=" + mark_from + "&type=" + time_type;
  if (size != null) {// 查询所有
    param += "&size=" + size
  } else {// 查询一条
    param += "&since=" + since
  }
  return param;
}
function refreshTemplate() {
  GLOBAL_VAR.chartMgr = DefaultTemplate.loadTemplate("frame0.k0", "freeWillex");
  ChartManager.getInstance().redraw("All", true)
}
function getRectCrossPt(h, c, f) {
  var b;
  var i = {x: -1, y: -1};
  var a = {x: -1, y: -1};
  var g = f.x - c.x;
  var d = f.y - c.y;
  if (Math.abs(g) < 2) {
    i = {x: c.x, y: h.top};
    a = {x: f.x, y: h.bottom};
    b = [i, a];
    return b
  }
  var e = d / g;
  a.x = h.right;
  a.y = c.y + (h.right - c.x) * e;
  i.x = h.left;
  i.y = c.y + (h.left - c.x) * e;
  b = [i, a];
  return b
}
/**
 * 设置语言
 * @param b
 */
function chart_switch_language(b) {
  var a = b.replace(/-/, "_");
  $("#chart_language_switch_tmp").find("span").each(function () {
    var d = $(this).attr("name");
    var c = $(this).attr(a);
    d = "." + d;
    var e = $(d)[0];
    if (!e) {
      return
    }
    $(d).each(function () {
      $(this)[0].innerHTML = c
    })
  });
  $("#chart_language_setting_div li a[name='" + b + "']").addClass("selected");
  ChartManager.getInstance().setLanguage(b);
  ChartManager.getInstance().getChart().setTitle();
  var a = ChartSettings.get();
  a.language = b;
  ChartSettings.save()
}

// 重置宽度和高度
function on_size() {
  var innerWidth = $("#chart_option").width() - 5;// 返回窗口的文档显示区的宽度
  var innerHeight = $("#chart_option").height() - 5;//返回窗口的文档显示区的高度
  var chartContainer = $("#chart_container");
  chartContainer.css({width: innerWidth + "px", height: innerHeight + "px"});
  var toolbar = $("#chart_toolbar");// 工具栏
  var toolpanel = $("#chart_toolpanel");// 左侧画线栏
  var canvasGroup = $("#chart_canvasGroup");// 主图区域
  var tabbar = $("#chart_tabbar");// 指标列表
  var G = toolpanel[0].style.display != "inline" ? false : true;
  var n = tabbar[0].style.display != "block" ? false : true;
  var v = {};
  v.x = 0;
  v.y = 0;
  v.w = innerWidth;
  v.h = 29;
  var f = {};
  f.x = 0;
  f.y = v.h + 1;
  f.w = G ? 32 : 0;
  f.h = innerHeight - f.y;
  var A = {};
  A.w = G ? innerWidth - (f.w + 1) : innerWidth;
  A.h = n ? 22 : -1;
  A.x = innerWidth - A.w;
  A.y = innerHeight - (A.h + 1);
  var w = {};
  w.x = A.x;
  w.y = f.y;
  w.w = A.w;
  w.h = A.y - f.y;
  toolbar.css({left: v.x + "px", top: v.y + "px", width: v.w + "px", height: v.h + "px"});
  if (G) {
    toolpanel.css({left: f.x + "px", top: f.y + "px", width: f.w + "px", height: f.h + "px"})
  }
  canvasGroup.css({left: w.x + "px", top: w.y + "px", width: w.w + "px", height: w.h + "px"});
  var logoImg = $(".fw_market_logo img").height();
  var logoImgH = (w.h - logoImg) / 2 - logoImg / 2;
  $(".fw_market_logo").css({width: w.w + "px", height: w.h + "px"});
  $(".fw_market_logo img").css({top: logoImgH});
  var x = $("#chart_mainCanvas")[0];
  var g = $("#chart_overlayCanvas")[0];
  x.width = w.w;
  x.height = w.h;
  g.width = w.w;
  g.height = w.h;
  if (n) {
    tabbar.css({left: A.x + "px", top: A.y + "px", width: A.w + "px", height: A.h + "px"})
  }
  var indicatorDialog = $("#chart_parameter_settings");// 指标参数
  indicatorDialog.css({
    left: (innerWidth - indicatorDialog.width()) >> 1,
    top: (innerHeight - indicatorDialog.height()) >> 1
  });
  var chartLoading = $("#chart_loading");
  chartLoading.css({left: (innerWidth - chartLoading.width()) >> 1, top: (innerHeight - chartLoading.height()) >> 2});
  var cacheTools = $("#chart_dom_elem_cache"); // 隐藏后的toolbar存放到此处
  //var themeTools = $("#chart_select_theme")[0]; // 显示/隐藏主题选择
  //var lineTools = $("#chart_enable_tools")[0];// 显示/隐藏画线工具栏
  //var indicatorSHTools = $("#chart_enable_indicator")[0]; // 显示/隐藏指标tabbar
  //var p_v = $("#chart_toolbar_periods_vert"); // 下拉周期
  var D = $("#chart_toolbar_periods_horz")[0];// 显示的周期
  var indicatorTools = $("#chart_show_indicator")[0];// 指标参数div
  //var tabbarTools = $("#chart_show_tools")[0];// toolbar画线div
  // var toolbaTheme = $("#chart_toolbar_theme")[0]; // toolbar 主题选择div
  var k = $("#chart_dropdown_settings");
  //var b = p_v[0].offsetWidth;
  var y = D.offsetWidth;// 替换下拉周期去掉 var y = b + D.offsetWidth;
  var m = y + indicatorTools.offsetWidth + 4;
  //var F = m + tabbarTools.offsetWidth + 4;
  // var C = F + toolbaTheme.offsetWidth;
  var d = k.find(".chart_dropdown_t")[0].offsetWidth + 150;// toolbar显示周期列表
  //b += d;
  y += d;
  m += d;
  //F += d;
  // C += d;
  if (innerWidth < y) {
    cacheTools.append(D);
  } else {
    //p_v.after(D);
  }
  /*if (innerWidth < F) {// 画线div
   cacheTools.append(tabbarTools);
   lineTools.style.display = "";
   } else {
   k.before(tabbarTools);
   lineTools.style.display = "none";
   }*/
  /*if (innerWidth < m) {// 指标参数
   cacheTools.append(indicatorTools);
   indicatorSHTools.style.display = "";
   } else {
   k.before(indicatorTools);
   indicatorSHTools.style.display = "none";
   }*/
  /*if (innerWidth < C) {// 主题选择
   cacheTools.append(e);
   themeTools.style.display = ""
   } else {
   k.before(e);
   themeTools.style.display = "none"
   }*/
  /*if (innerWidth < 1050) {
   $("#chart_updated_time").css("display", "none")
   } else {
   $("#chart_updated_time").css("display", "")
   }*/
  if (innerWidth < 900) {
    $("#chart_language_setting_div").css("display", "none");
  } else {
    $("#chart_language_setting_div").css("display", "");
  }
  if (innerWidth < 280) {
    $("#chart_exchanges_setting_div").css("display", "none");
  } else {
    $("#chart_exchanges_setting_div").css("display", "");
  }
  ChartManager.getInstance().redraw("All", true);
}

/**
 * 鼠标滑轮时间(大于0向前,小于0向后)
 * @param event
 * @param type
 * @returns {boolean}
 */
function mouseWheel(event, type) {
  ChartManager.getInstance().scale(type > 0 ? 1 : -1);
  ChartManager.getInstance().redraw("All", true);
  return false
}

/**
 * 主题颜色切换
 * @param theme
 */
function switch_theme(theme) {
  $("#chart_toolbar_theme a").removeClass("selected");
  $("#chart_select_theme a").removeClass("selected");
  $("#chart_toolbar_theme").find("a").each(function () {
    if ($(this).attr("name") == theme) {
      $(this).addClass("selected")
    }
  });
  $("#chart_select_theme a").each(function () {
    if ($(this).attr("name") == theme) {
      $(this).addClass("selected")
    }
  });
  $("#chart_container").attr("class", theme);
  $(".marketName_ a").attr("class", theme);
  if (theme == "dark") {
    $("#trade_container").addClass("dark").removeClass("light");
    $("#markettop").addClass("dark").removeClass("light");
    ChartManager.getInstance().setThemeName("frame0", "Dark");
    var chartSettings = ChartSettings.get();
    chartSettings.theme = "Dark";
    ChartSettings.save()
  } else {
    if (theme == "light") {
      $("#trade_container").addClass("light").removeClass("dark");
      $("#markettop").addClass("light").removeClass("dark");
      ChartManager.getInstance().setThemeName("frame0", "Light");
      var chartSettings = ChartSettings.get();
      chartSettings.theme = "Light";
      ChartSettings.save()
    }
  }
  var themeTemp = {};
  themeTemp.command = "set current theme";
  themeTemp.content = theme;
  $("#chart_output_interface_text").val(JSON.stringify(themeTemp));
  $("#chart_output_interface_submit").submit();
  window._current_theme_change.raise(theme);
  ChartManager.getInstance().redraw()
}

/**
 * 画线工具切换(显示/隐藏)
 * @param onOff
 */
/*function switch_tools(onOff) {
 $(".chart_dropdown_data").removeClass("chart_dropdown-hover");
 $("#chart_toolpanel .chart_toolpanel_button").removeClass("selected");
 $("#chart_enable_tools a").removeClass("selected");
 if (onOff == "on") {
 $("#chart_show_tools").addClass("selected");
 $("#chart_enable_tools a").each(function () {
 if ($(this).attr("name") == "on") {
 $(this).addClass("selected")
 }
 });
 $("#chart_toolpanel")[0].style.display = "inline";
 if (ChartManager.getInstance()._drawingTool == ChartManager.DrawingTool.Cursor) {
 $("#chart_Cursor").parent().addClass("selected")
 } else {
 if (ChartManager.getInstance()._drawingTool == ChartManager.DrawingTool.CrossCursor) {
 $("#chart_CrossCursor").parent().addClass("selected")
 }
 }
 } else if (onOff == "off") {
 $("#chart_show_tools").removeClass("selected");
 $("#chart_enable_tools a").each(function () {
 if ($(this).attr("name") == "off") {
 $(this).addClass("selected")
 }
 });
 $("#chart_toolpanel")[0].style.display = "none";
 ChartManager.getInstance().setRunningMode(ChartManager.getInstance()._beforeDrawingTool);
 ChartManager.getInstance().redraw("All", true)
 }
 on_size();
 }*/

/**
 * 技术指标参数切换(显示/隐藏)
 * @param onOff
 */
function switch_indic(onOff) {
  $("#chart_tabbar a").removeClass("selected");
  //$("#chart_enable_indicator a[name='" + onOff + "']").addClass("selected");
  var chartSettings = ChartSettings.get();
  if (onOff == "on") {
    $("#chart_show_indicator").addClass("selected");
    chartSettings.charts.indicsStatus = "open";
    var indics = chartSettings.charts.indics[1];
    if (Template.displayVolume == false) {
      ChartManager.getInstance().getChart().setIndicator(2, indics)
    } else {
      ChartManager.getInstance().getChart().setIndicator(2, indics)
    }
    $("#chart_tabbar").find("a").each(function () {
      if ($(this).attr("name") == indics) {
        $(this).addClass("selected")
      }
    });
    $("#chart_tabbar")[0].style.display = "block";
  } else if (onOff == "off") {
    $("#chart_show_indicator").removeClass("selected");
    ChartManager.getInstance().getChart().setIndicator(2, "NONE");
    chartSettings.charts.indicsStatus = "close";
    $("#chart_tabbar")[0].style.display = "none";
    $("#chart_tabbar a").removeClass("selected");
  }
  ChartSettings.save();
  on_size();
}

/**
 * 周期切换
 * @param period
 */
var wsInit = 0;
function switch_period(period) {
  var periodTemp = GLOBAL_VAR.periodMap[GLOBAL_VAR.tagMapPeriod[period]];
  if (wsInit > 0) {
    WS.params['ticker'] = [
      {"code": CODE, "period": "DAY"}
    ];
    periodTemp == "DAY" ? "" : (_.isUndefined(periodTemp) ? (WS.params['ticker']).push({
      "code": CODE,
      "period": 'MIN1'
    }) : (WS.params['ticker']).push({"code": CODE, "period": periodTemp}));
    WS.socketEmit('request', WS.params)
  } else {
    wsInit++;
  }
  $("#chart_container .chart_toolbar_tabgroup a").removeClass("selected");
  //$("#chart_toolbar_periods_vert ul a").removeClass("selected");
  $("#chart_container .chart_toolbar_tabgroup a").each(function () {
    if ($(this).parent().attr("name") == period) {
      $(this).addClass("selected")
    }
  });
  /*$("#chart_toolbar_periods_vert ul a").each(function () {
   if ($(this).parent().attr("name") == period) {
   $(this).addClass("selected")
   }
   });*/
  ChartManager.getInstance().showCursor();
  calcPeriodWeight(period);
  if (period == "line") {
    ChartManager.getInstance().getChart().strIsLine = true;
    ChartManager.getInstance().setChartStyle("frame0.k0", "Line");
    ChartManager.getInstance().getChart().setCurrentPeriod("01m");// 默认分钟线显示数据
    var periodSetting = ChartSettings.get();
    periodSetting.charts.period = period;
    ChartSettings.save();
    return
  }
  ChartManager.getInstance().getChart().strIsLine = false;
  var currentPeriod = GLOBAL_VAR.tagMapPeriod[period];
  ChartManager.getInstance().setChartStyle("frame0.k0", ChartSettings.get().charts.chartStyle);
  ChartManager.getInstance().getChart().setCurrentPeriod(currentPeriod);
  var periodSetting = ChartSettings.get();
  periodSetting.charts.period = period;// 设置当前周期
  ChartSettings.save();// 保存设置
}
//function switch_market_selected(b) {
//    kline.reset(b);
//    $(".market_chooser ul a").removeClass("selected");
//    $(".market_chooser ul a[name='" + b + "']").addClass("selected");
//    ChartManager.getInstance().getChart()._market_from = b;
//    var a = ChartSettings.get();
//    a.charts.market_from = b;
//    ChartSettings.save()
//}
/*function switch_market(b) {
 switch_market_selected(b);
 var a = ChartSettings.get();
 if (a.charts.period == "line") {
 ChartManager.getInstance().getChart().strIsLine = true;
 ChartManager.getInstance().setChartStyle("frame0.k0", "Line")
 } else {
 ChartManager.getInstance().getChart().strIsLine = false;
 ChartManager.getInstance().setChartStyle("frame0.k0", ChartSettings.get().charts.chartStyle)
 }
 ChartManager.getInstance().getChart().setMarketFrom(b)
 }
 function IsSupportedBrowers() {
 function a() {
 var b = document.createElement("canvas");
 return !!(b.getContext && b.getContext("2d"))
 }

 if (!a()) {
 return false
 }
 return true
 }*/
/**
 * 计算周期的权重
 */
function calcPeriodWeight(period) {
  if (period != "line") {
    period = GLOBAL_VAR.periodMap[GLOBAL_VAR.tagMapPeriod[period]]
  }
  // 获取周期权重
  var c = ChartSettings.get().charts.period_weight;
  for (var b in c) {
    if (c[b] > c[period]) {
      c[b] -= 1
    }
  }
  c[period] = 8;
  ChartSettings.save();
  $("#chart_toolbar_periods_horz").find("li").each(function () {
    var e = $(this).attr("name");
    var f = e;
    if (e != "line") {
      f = GLOBAL_VAR.periodMap[GLOBAL_VAR.tagMapPeriod[e]]
    }
    if (c[f] == 0) {
      $(this).css("display", "none")
    } else {
      $(this).css("display", "inline-block")
    }
  })
};
