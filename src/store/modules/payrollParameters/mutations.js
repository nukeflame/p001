/**
 *
 * Main roles mutations
 */
// import { extend } from "lodash";

export default {
  FETCH_PAYROLL_PAR(state, data) {
    state.payrolPars = data;
  },

  CREATE_PAYROLL_PAR(state, data) {
    state.payrolPars.unshift(data);
  },

  UPDATING_STAFF_PAR(state, loading) {
    state.updatingPayrolPar = loading;
  },

  UPDATE_STAFF_PAR(state, data) {
    state.parData = data;
  },

  GET_STAFF_PAR(state, data) {
    state.parData = data;
  },

  DESTROY_STAFF_PAR(state, data) {
    state.parData.splice(state.parData.indexOf(data), 1);
  }
};
