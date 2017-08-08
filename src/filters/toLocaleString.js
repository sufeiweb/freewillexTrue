export const toLocaleString=(str)=>{
  var dd;
  if((parseFloat(str).toString().split('.')[1])===undefined){
    dd=undefined;
  }else {
    dd=(parseFloat(str).toString().split('.')[1])
  }
  if(dd=== undefined){
    return parseFloat(str).toLocaleString()+'.00';
  }else if(dd.length ===1){
    return parseFloat(str).toLocaleString()+'0';
  }else {
    return parseFloat(str).toLocaleString()
  }
};
