/**
 * Created by User on 2017/7/17.
 */
import * as types from './types';
export default {
  showHeader: ({
                 commit, state
               }) => {
    commit(types.HEADER_SHOW);
  },
  hideHeader: ({
                 commit, state
               }) => {
    commit(types.HEADER_HIDE);
  },
  showFooter: ({
                 commit, state
               }) => {
    commit(types.FOOTER_SHOW);
  },
  hideFooter: ({
                 commit, state
               }) => {
    commit(types.FOOTER_HIDE);
  }
}
