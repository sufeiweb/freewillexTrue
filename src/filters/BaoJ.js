export const BaoJ = (str) => {
      if(Number(str)===0){
        return '00.00%';
      }else {
        return (str*100).toFixed(2)+'%';
      }
};


