export  const errorLog=(str)=>{
  switch (str){
    case 'Request failed with status code 401':
      return '请求失败';
      break;
    default:
      return str;
      break;
  }
}
