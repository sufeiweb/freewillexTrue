export const bankNo = (str) => {
  if (str.length === 16) {
    return '**** **** **** ' + str.substr(-4)
  } else if (str.length === 19) {
    return '**** **** **** **** ' + str.substr(-3)
  }
};
// 手机号码过滤器

