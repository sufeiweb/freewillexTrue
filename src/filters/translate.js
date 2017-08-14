export const translate = (str) => {
  switch (str) {
    case 'B':
      return '买';
      break;
    case 'S':
      return '卖';
      break;
    case 'LIMITED':
      return '限价';
      break;
    case 'MARKET':
      return '市价';
      break;
    case 'DELEGATE':
      return '委托中';
      break;
    case 'PART_TRANSACTED':
      return '部分成交';
      break;
    case 'SUCCESS_TRADE':
      return '完全成交';
      break;
    case 'UNDONE':
      return '已撤销';
      break;
    case 'OVERDUE':
      return '过期';
      break;
    case 'INVALID':
      return '无效';
      break;
    case 'WEB':
      return 'web端';
      break;
    case 'ANDROID':
      return 'Android端';
      break;
    case 'IOS':
      return 'Ios端';
      break;
    case 'API':
      return '接口端';
      break;
    case 'SYSTEM':
      return '系统内部';
      break;
    case 'BTC':
      return '比特币';
      break;
    case 'LTC':
      return '莱特币';
      break;
    case 'ETH':
      return '以太坊';
      break;
    case 'ETC':
      return '以太经典';
      break;
    case false:
      return '未完成';
      break;
    case true:
      return '已完成';
      break;
  }
};
//字段翻译
