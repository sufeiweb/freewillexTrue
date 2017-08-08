export const toLocaleString8=(str)=>{
  var dd;
  if((parseFloat(str).toString().split('.')[1])===undefined){
    dd=undefined;
  }else {
    dd=(parseFloat(str).toString().split('.')[1])
  }
  if(dd=== undefined){
    return parseFloat(str).toLocaleString()+'.00000000';
  }else if(dd.length ===1){
    return parseFloat(str).toLocaleString()+'0000000';
  }else if(dd.length ===2){
    return parseFloat(str).toLocaleString()+'000000';
  }else if(dd.length===3){
    return parseFloat(str).toLocaleString()+'00000';
  }else if(dd.length===4){
    return parseFloat(str).toLocaleString()+'0000';
  }else if(dd.length===5){
    return parseFloat(str).toLocaleString()+'000';
  }else if(dd.length===6){
    return parseFloat(str).toLocaleString()+'00';
  }else if(dd.length===7){
    return parseFloat(str).toLocaleString()+'0';
  }else{
    return parseFloat(str).toLocaleString();
  }
};
