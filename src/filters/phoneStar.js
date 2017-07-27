export const phoneStar=(str)=>{
  let start = str.slice(0,3);

  let end = str.slice(-3);

  return `${start}*****${end}`;
};
// 手机号码过滤器
