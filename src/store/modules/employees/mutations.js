/**
 *
 * Main roles mutations
 */

export default {
  FETCH_EMPLOYEES(state, data) {
    state.employees = data;
  },

  createEmployee(state, data) {
    state.employees.unshift(data);
  },

  CREATE_EMPLOYEE_LOADING(state, data) {
    state.processLoad = data;
  }
};
