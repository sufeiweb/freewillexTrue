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
  }
}
