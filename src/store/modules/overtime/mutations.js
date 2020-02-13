/**
 *
 * Main attendance mutations
 */
import { extend } from "lodash";

export default {
  FETCH_OVERTIME(state, overtimes) {
    state.overtimes = overtimes;
  },

  CREATE_OVERTIME(state, overtimes) {
    state.overtimes.unshift(overtimes);
  },

  UPDATE_OVERTIME(state, overtime) {
    const data = state.overtimes.find(field => {
      return field.id == overtime.id;
    });

    extend(data, overtime);
  },

  ADDING_OVERTIME(state, loading) {
    state.addingOvertime = loading;
  },

  UPDATING_OVERTIME(state, loading) {
    state.addingOvertime = loading;
  }
};
