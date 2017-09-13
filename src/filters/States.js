export const States = (str) => {
  let arr;
  switch (str) {
    case 0:
      arr = '待审核';
      break;
    case 1:
      arr = '初审通过';
      break;
    case 2:
      arr = '复审通过';
      break;
    case 3:
      arr = '过期';
      break;
    case 4:
      arr = '作废';
      break;
  }
  return arr;
}
