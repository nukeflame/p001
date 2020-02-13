/**
 *
 * Main roles index
 */

import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  creatingRole: false,
  roles: [],
  userRole: {
    admin: false,
    manager: false,
    attendance_officer: false,
    payroll_officer: false,
    reports_officer: false,
    guest: false
  },
  showRole: [],
  rolesLoading: true
};

export default {
  state,
  actions,
  mutations,
  getters
};
