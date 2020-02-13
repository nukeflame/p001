/**
 *
 * Main attendance actions
 */

import baseurl from "../../../config/baseUrl";
import toastr from "toastr";

export default {
  fetchPeriods({ commit }) {
    return new Promise((resolve, reject) => {
      baseurl
        .get("api/periods")
        .then(res => {
          commit("fetchPeriods", res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  createPeriod({ commit }, data) {
    const periodData = {
      id: data.id,
      begining_date: data.beginingDate,
      ending_date: data.endingDate,
      is_current: data.isCurrent,
      pay_month: data.payMonth,
      pay_year: data.payYear
    };

    return new Promise(resolve => {
      commit("creatingPeriod", true);
      baseurl
        .post("api/periods/store", periodData)
        .then(response => {
          commit("createPeriod", response.data);
          toastr["success"]("New period record added successfully!");
          resolve(response);
        })
        .catch(error => {
          if (error.response.status === 422) {
            const err = error.response.data.errors;
            if (err.pay_year) {
              toastr["error"](err.pay_year);
            } else if (err.pay_month) {
              toastr["error"](err.pay_month);
            } else if (err.begining_date) {
              toastr["error"](err.begining_date);
            } else if (err.ending_date) {
              toastr["error"](err.ending_date);
            }
          }
        })
        .finally(() => {
          commit("creatingPeriod", false);
        });
    });
  }
};
