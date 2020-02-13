/**
 *
 * Main roles index
 */

import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  authCode: "",
  authLoading: false,
  login: false,
  level: 0
};

export default {
  state,
  actions,
  mutations,
  getters
};
