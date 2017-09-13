/**
 * Created by User on 2017/7/17.
 */
export default {
  TopHeaderStyle(state) {
    return state.topHeaderStyle;
  },
  FooterStyle(state) {
    return state.footerStyle;
  },
  LoginState(state) {
    return state.loginState;
  },
  ErrorState(state) {
    return state.ErrorState;
  },
  ErrorState1(state) {
    return state.ErrorState1;
  },
  ErrorMessage(state) {
    return state.ErrorMessage;
  },
  LatestPrice(state) {
    return state.LatestPrice;
  },
  trades(state) {
    return state.trades;
  },
  depth(state) {
    return state.depth;
  },
  Quotation(state) {
    return state.Quotation;
  },
  ShowOrHide(state) {
    return state.ShowOrHide;
  },
  chaPrice(state) {
    return state.chaPrice
  },
  entrust(state) {
    return state.weiTuo;
  },
  businessPrice(state) {
    return state.businessPrice.data;
  },
  bankImgUrl(state){
    return state.bankImgUrl;
  },
  signShowOrHide(state){
    return state.signLogState;
  }
}
