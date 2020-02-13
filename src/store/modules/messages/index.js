/**
 *
 * Main roles index
 */

import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  messages: [],
  chatUser: "",
  chatBoxOpen: false,
  findingMessages: false
};

export default {
  state,
  actions,
  mutations,
  getters
};
