/**
 *
 * Main roles index
 */

import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  clients: [],
  creatingClient: false
};

export default {
  state,
  actions,
  mutations,
  getters
};
