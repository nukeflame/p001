/**
 *
 * Main roles index
 */

import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  users: [],
  authUser: {},
  unreadNotf: [],
  notifications: [],
  onlineUsers: [],
  usersLoading: true,
  userRole: {
    admin: false,
    manager: false,
    attendance_officer: false,
    payroll_officer: false,
    reports_officer: false,
    guest: false
  },
  bankData: {
    id: "",
    name: ""
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
