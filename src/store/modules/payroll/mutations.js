/**
 *
 * Main roles mutations
 */

import { extend } from "lodash";

export default {
  FETCH_PAYROLLS(state, payroll) {
    state.payroll = payroll;
  },

  addPayroll(state, payroll) {
    state.payrolls.unshift(payroll);
  },

  payrollData(state, data) {
    state.dataPay = {
      id: data.id,
      name: data.name,
      user_id: data.user_id,
      days_in: data.days_in,
      id_no: data.id_no
    };
  },

  STAFF_PERIOD(state, data) {
    state.staffPeriod = data;
  },

  PROCCESS_PAYSLIP(state, loading) {
    state.proccessPayslip = loading;
  },

  GENERATE_PAYSLIP(state, periods) {
    const items = state.staffPeriod;
    if (items.length > 0) {
      for (let i = 0; i < periods.length; i++) {
        const data = items.find(f => f.id === periods[i]);
        extend(data, periods);
      }
    }
  }
};
