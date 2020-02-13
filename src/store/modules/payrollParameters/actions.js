/**
 *
 * Main roles actions
 */

import baseurl from "../../../config/baseUrl";
import toastr from "toastr";

export default {
  fetchPayrollParameter({ commit }) {
    return new Promise((resolve, reject) => {
      baseurl
        .get("api/payroll_pars")
        .then(res => {
          commit("FETCH_PAYROLL_PAR", res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  createPayrolParameter({ commit }, data) {
    return new Promise((resolve, reject) => {
      baseurl
        .post("api/payroll_pars", data)
        .then(res => {
          toastr["success"]("New record added successfuly!");
          commit("CREATE_PAYROLL_PAR", res.data);
          resolve(res);
        })
        .catch(error => {
          if (parseInt(error.response.status) == 422) {
            const err = error.response.data.errors;
            if (err.name) {
              toastr["error"](err.name);
            } else if (err.categoryId) {
              toastr["error"](err.categoryId);
            } else if (err.defValue) {
              toastr["error"](err.defValue);
            }
          }
          reject(error);
        });
    });
  },

  updateStaffParameter({ commit }, data) {
    commit("UPDATING_STAFF_PAR", true);
    return new Promise((resolve, reject) => {
      baseurl
        .put(`api/payroll_pars/${data.staffId}`, data)
        .then(res => {
          commit("UPDATE_STAFF_PAR", res.data);
          resolve(res);
        })
        .catch(error => {
          reject(error);
        })
        .finally(() => {
          commit("UPDATING_STAFF_PAR", false);
        });
    });
  },

  destroyStaffParameter({ commit }, data) {
    return new Promise((resolve, reject) => {
      baseurl
        .delete(`api/payroll_pars/${data}`)
        .then(res => {
          commit("DESTROY_STAFF_PAR", res.data);
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
