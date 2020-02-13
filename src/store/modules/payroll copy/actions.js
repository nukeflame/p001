/**
 *
 * Main roles actions
 */

import baseurl from "../../../config/baseUrl";
import toastr from "toastr";

export default {
  fetchPayroll({ commit }) {
    return new Promise((resolve, reject) => {
      baseurl
        .get("api/payroll")
        .then(res => {
          commit("FETCH_PAYROLLS", res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  findStaffPeriod({ commit }, Id) {
    return new Promise((resolve, reject) => {
      baseurl
        .get(`api/payroll/${Id}`)
        .then(res => {
          commit("STAFF_PERIOD", res.data);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  generatePayslip({ commit }, data) {
    return new Promise(resolve => {
      commit("PROCCESS_PAYSLIP", true);
      baseurl
        .post("api/payroll", data)
        .then(res => {
          console.log(res.data);
          toastr["success"](
            `Successfully generated (${res.data.length}) payslips.`
          );
          commit("GENERATE_PAYSLIP", res.data);
          resolve(res);
        })
        .catch(error => {
          if (error.res.status == 404) {
            toastr["error"](error.res.data);
          }
        })
        .finally(() => {
          commit("PROCCESS_PAYSLIP", false);
        });
    });
  }
};
