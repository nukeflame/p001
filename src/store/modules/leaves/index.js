/**
 *
 * Main attendance index
 */

import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  leaves: [],
  leaveTypes: [],
  creatingLeave: false
};

export default {
  state,
  actions,
  mutations,
  getters
};
