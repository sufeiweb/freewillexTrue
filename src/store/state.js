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

}
