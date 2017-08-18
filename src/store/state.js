/**
 * Created by User on 2017/7/17.
 */
export default {
  topHeaderStyle: true,//网页头部控制显示隐藏
  footerStyle: true,//网页尾部控制显示隐藏
  registerE: {
    checkStyleE: false,
    username: false,
    userpsd: false,
    userpsds: false,
    YZCode: true
  },//邮箱注册逻辑控制
  registerM: {
    checkStyleM: false,
    username: false,
    userpsd: false,
    userpsds: false,
    YZCode: true
  },//手机注册逻辑判断控制
  login: {
    username: false,
    userpsd: false,
    remember: false
  },//登录逻辑控制
  loginState: false, //登录状态
  phoneR: {
    username: false,
    usercord: true,
    userpsd: false,
    userpsds: false
  },//手机找回密码逻辑控制
  emailR: {
    username: false,
    usercord: true,
    userpsd: false,
    userpsds: false
  },//邮箱找回密码逻辑控制
  realName: {
    userName: false,
    userEmail: false,
    userEmailNum: '',
    userPhone: false,
    userPhoneNum: '',
    userPsd: false,
    userMoneyPsd: false
  },//实名四要素
  realNeed: {
    city: true,
    name: false,
    IdCard: false,
    bankId: false,
    bankNum: false,
    bankAdr: false,
    phone: false,
    Yz: false,
    phoneY: true,
    checkbox: false
  },//逻辑控制
  token: '',//存放token
  bankId: {
    alipay: '',
    BOC: '',
    ICBC: '',
    CCB: '',
    ABC: ''
  },//存放银行id
  bindEmailNum: {
    email: false,
    YZ: false,
    EYZ: true
  },//邮箱绑定
  bindPhoneNum: {
    phone: false,
    YZ: false,
    EYZ: true
  },//邮箱绑定
  bindFullPsd: {
    fullPsd: false,
    fullPsds: false,
    YZCord: true
  },//设置资金密码
  modifyPsd: {
    oldPsd: false,
    newPsd: false,
    newPsds: false,
    YZCord: true
  },//修改密码
  modifyFullPsd: {
    oldPsd: false,
    newPsd: false,
    newPsds: false,
    YZCord: true
  },//修改密码
  addBankCard: {
    bankNo: false,
    bankNum: false,
    bankAdr: false,
    phone:false,
    YZ: false,
    serverYZ: true
  },//绑定银行卡控制
  loginTrue:false,//登录状态
  TKShow:false,//登录弹窗状态,
  Account:'',//当前账户
  Currency:'',//当前币种
  ErrorMessage:'',//错误码
  ErrorState:false,//提示错误状态
  ErrorState1:false,//提示错误状态

  LatestPrice:'',//最新价
  trades:[],//交易流水
  depth:'',//盘口信息
  Quotation:'',//行情数据
  ShowOrHide:false,//gotop显示隐藏
}
