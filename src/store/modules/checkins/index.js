/**
 *
 * Main attendance index
 */

import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  checkins: [],
  findingStaff: false,
  checkedEmployee: null
};

export default {
  state,
  actions,
  mutations,
  getters
};
