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
  },
  loginStateTrue: ({
                     commit, state
                   }) => {
    commit(types.LOGINSTATE_TRUE);
  },
  loginStateFalse: ({
                      commit, state
                    }) => {
    commit(types.LOGINSTATE_FALSE);
  },
  errorShow: ({
                commit, state
              }) => {
    commit(types.ERROR_SHOW)
  },
  errorHide: ({
                commit, state
              }) => {
    commit(types.ERROR_HIDE)
  },
  errorShow1: ({
                 commit, state
               }) => {
    commit(types.ERROR_SHOW1)
  },
  errorHide1: ({
                 commit, state
               }) => {
    commit(types.ERROR_HIDE1)
  },
  signLogShow: ({
                  commit, state
                }) => {
    commit(types.SING_LOG_SHOW)
  },
  signLogHide: ({
                  commit, state
                }) => {
    commit(types.SING_LOG_HIDE)
  }
}
