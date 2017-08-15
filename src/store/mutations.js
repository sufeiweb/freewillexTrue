/**
 * Created by User on 2017/7/17.
 */
import * as types from './types';
export default {
  [types.HEADER_SHOW]: (state) => {
    state.topHeaderStyle = true;
  },
  [types.HEADER_HIDE]: (state) => {
    state.topHeaderStyle = false;
  },
  [types.FOOTER_SHOW]: (state) => {
    state.footerStyle = true;
  },
  [types.FOOTER_HIDE]: (state) => {
    state.footerStyle = false;
  },
  [types.LOGINSTATE_TRUE]: (state) => {
    state.loginState = true;
  },
  [types.LOGINSTATE_FALSE]: (state) => {
    state.loginState = false;
  },
  [types.ERROR_CHULI]: (state) => {
    state.ErrorState = true;
  }
}
