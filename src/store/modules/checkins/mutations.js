/**
 *
 * Main attendance mutations
 */

import { extend } from "lodash";

export default {
  fetchCheckins(state, data) {
    state.checkins = data;
  },

  FIND_EMPLOYEE(state, data) {
    state.checkedEmployee = data;
  },

  CHECK_IN_EMPLOYEE(state, data) {
    state.checkins.unshift(data);
  },

  CHECK_OUT_EMPLOYEE(state, data) {
    const item = state.checkins.find(field => {
      return field.id === data.id;
    });
    extend(item, data);
  },

  FINDING_EMPLOYEE(state, loading) {
    state.findingStaff = loading;
  },

  DEL_CHECKIN(state, data) {
    state.checkins.splice(state.checkins.indexOf(data), 1);
  }
};
